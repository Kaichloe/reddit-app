import React, { useEffect, useState, useCallback, useRef } from "react";
import RedditItem from "./redditItem";
import "../css/redditItemsContainer.css";
import RedditBanner from "./redditBanner";
import useRedditItems from "../hooks/getRedditItems";

const RedditPostsContainer = () => {
  const [pageNum, setPageNum] = useState(1);
  const { token, data, isLoading, hasMore } =
    useRedditItems(pageNum);
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
            />
          );
        } else {
          return <RedditItem data={post.data} key={post.data.id} />;
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
          <button onClick={() => console.log(token)}>HELLO</button>
          <button onClick={() => console.log(data)}>BYE</button>
          <button onClick={() => console.log(hasMore)}>BYE</button>
          {data && isLoading && (
            <p className="loading-title">Loading More Posts...</p>
          )}
          {data && !isLoading && (
            <p className="back-to-top-button-title">
              <a className="back-to-top-link" href="#top">
                Back to Top
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RedditPostsContainer;
