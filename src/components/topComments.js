import React from "react";
import "../css/topComments.css";

const TopComments = ({ data }) => {
  const commentGrabber = () => {
    if (data.length === 0) {
      return <p>No comments yet</p>;
    }

    return data.map((data, index) => {
      return (
        <div className="commentWrapper" key={`${data.data.author} ${index}`}>
          <p className="comment">{`${data.data.body} - u/${data.data.author}`}</p>
        </div>
      );
    });
  };

  return <div className="commentsContainer">{commentGrabber()}</div>;
};

export default TopComments;
