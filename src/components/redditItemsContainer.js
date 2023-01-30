import React, { useEffect, useState, useCallback, useRef } from "react";
import RedditItem from "./redditItem";
import "../css/redditItemsContainer.css";
import RedditBanner from "./redditBanner";
import useRedditItems from "../hooks/getRedditItems";

const RedditPostsContainer = () => {
  const [pageNum, setPageNum] = useState(1);
  const { token, data, isLoading, hasMore } = useRedditItems(pageNum);
  const intObserver = useRef();
  const lastPostElementRef = useCallback(
    (post) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasMore) {
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasMore]
  );

  const renderRedditItemsList = () => {
    if (data) {
      return data.map((post, index) => {
        if (data.length === index + 1) {
          return (
            <RedditItem
              ref={lastPostElementRef}
              data={post.data}
              key={post.data.id}
              type={"list"}
            />
          );
        } else {
          return (
            <RedditItem data={post.data} key={post.data.id} type={"list"} />
          );
        }
      });
    }
  };

  return (
    <div className="page-container">
      <RedditBanner />
      <div className="wrapper">
        <div className="post-list-container">
          {renderRedditItemsList()}
          {data && isLoading && (
            <p className="loading-title">Loading More Posts...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RedditPostsContainer;
