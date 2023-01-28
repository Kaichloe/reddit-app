import React, { useEffect, useState } from "react";
import {
  fetchAccessToken,
  revokeAccessToken,
  fetchData,
} from "../API/redditAPI";
import RedditItem from "./redditItem";
import "../css/redditItemsContainer.css";
import RedditBanner from "./redditBanner";

const RedditPostsContainer = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState();
  const [nextPageKey, setNextPageKey] = useState("");

  useEffect(() => {
    fetchToken();
    const fetchTokenInterval = setInterval(() => {
      fetchToken();
    }, 86399);

    return () => {
      revokeAccessToken(fetchToken);
      setToken("");
      clearInterval(fetchTokenInterval);
    };
  }, []);

  const fetchToken = () => {
    fetchAccessToken().then((data) => {
      setToken(data);
      fetchDataFunc(data.access_token);
    });
  };

  const fetchDataFunc = (token) => {
    fetchData(token).then((data) => {
      setNextPageKey(data.data.after);
      setData(data);
    });
  };

  const renderRedditItemsList = () => {
    if (data) {
      return data.data.children.map((item) => {
        return <RedditItem data={item.data} key={item.data.id} />;
      });
    }
  };

  return (
    <div className="page-container">
      <RedditBanner />
      {renderRedditItemsList()}
      <button onClick={() => console.log(token)}>HELLO</button>
      <button onClick={() => console.log(data)}>BYE</button>
    </div>
  );
};

export default RedditPostsContainer;
