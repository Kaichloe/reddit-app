import { useState, useEffect } from "react";
import {
  fetchAccessToken,
  revokeAccessToken,
  fetchData,
} from "../API/redditAPIs";

const useRedditItems = (pageNum, permaLink) => {
  const [token, setToken] = useState("");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState("");
  const [hasMore, setHasMore] = useState(false);

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


  useEffect(() => {
    setIsLoading(true);
    if (pageNum > 1 && nextPageToken !== "") {
      fetchData(token.access_token, nextPageToken).then((data) => {
        setData((prevData) => {
          return [...prevData, ...data.data.children];
        });
        if (data.data.after) {
          setNextPageToken(data.data.after);
          setHasMore(true);
        } else {
          setNextPageToken("");
          setHasMore(false);
        }

        setIsLoading(false);
      });
    }
  }, [pageNum]);

  const fetchToken = () => {
    setIsLoading(true);
    fetchAccessToken().then((data) => {
      setToken(data);
      fetchData(data.access_token).then((data) => {
        setData([...data.data.children]);
        if (data.data.after) {
          setNextPageToken(data.data.after);
          setHasMore(true);
        } else {
          setNextPageToken("");
          setHasMore(false);
        }

      });
      setIsLoading(false);
    });
  };

  return { token, data, isLoading, hasMore}
};

export default useRedditItems;
