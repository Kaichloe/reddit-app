import React from "react";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  auth: {
    username: "ba4BlcntxGphQOFxSw-5TA",
    password: "tCbVDwjveeGdGFwj05zopE9h1s9yuw",
  },
};

//refreshToken does not expire
const refreshToken = "30070716-3Xq5rnbRrdkiTQ1npbjxYQHiFee_YQ";

//redditAPI needs this as POST data and set to application/x-www-form-urlencoded
const encodedParams = new URLSearchParams();
encodedParams.append("grant_type", "refresh_token");
encodedParams.append("refresh_token", refreshToken);

//baseURL for reddit API calls
export const fetchDataApi = axios.create({
  baseURL: "https://oauth.reddit.com",
});

//baseURL for getting access token to make api calls
export const fetchTokenApi = axios.create({
  baseURL: "https://www.reddit.com",
});

//baseURL for revoking access token
export const revokeTokenApi = axios.create({
  baseURL: "https://www.reddit.com",
});

//need to use this to fetch access/bearer token as they expire every 24hours
export const fetchAccessToken = async () => {
  const response = await fetchTokenApi.post('/api/v1/access_token',encodedParams, config);
  return response.data;
};

//when user exits from my app will revoke access token
export const revokeAccessToken = async (accessToken) => {
  const encodedParams = new URLSearchParams();
  encodedParams.append("token", accessToken);
  encodedParams.append("token_type_hint", "access_token");
  const response = await revokeTokenApi.post('/api/v1/revoke_token',encodedParams, config);
  return response;
};

export const fetchData = async(bearerToken, after = '') => {
    let nextPage = "";
    after !== "" ? (nextPage = `/r/aww/hot?after=${after}`) : (nextPage = "/r/aww/hot");
    const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Bearer ${bearerToken}`
        },
    }
    const response = await fetchDataApi.get(nextPage, config);
    return response.data;
}
