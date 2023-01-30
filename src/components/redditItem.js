import React, { useState } from "react";
import "../css/redditItem.css";
import RedditPostModal from "./redditPostModal";
const RedditItem = React.forwardRef(({ data, type }, ref) => {
  const [openModal, setOpenModal] = useState(false);

  const checkIfVideo = (data) => {
    if (data.secure_media) {
      if (data.secure_media.reddit_video) {
        //for reddit uploaded videos
        return (
          <video controls>
            <source
              src={data.secure_media.reddit_video.fallback_url}
              type="video/mp4"
            />
          </video>
        );
      } else {
        return (
          //for videos/gifs uploaded from other sites
          <video controls>
            <source
              src={data.preview.reddit_video_preview.fallback_url}
              type="video/mp4"
            />
          </video>
        );
      }
    } else if (
      data.url.split(".").includes("png") ||
      data.url.split(".").includes("jpg")
    ) {
      //for where the post is an image with PNG or JPG
      return <img className="image png" src={data.url} />;
    } else {
      //edge case for post where there is a gallery of images so instead of showing
      //nothing will show thumbnail
      return <img className="image thumbnail" src={data.thumbnail} />;
    }
  };

  const openOriginalPost = () => {
    if (type === 'post' ) return;
    setOpenModal(true);
  };

  return (
    <div className="reddit-item">
      <div className="item-header">
        <div className="item-author">{`Posted by u/${data.author} to r/aww`}</div>
        {ref ? (
          <div ref={ref} className="item-title">
            {data.title}
          </div>
        ) : (
          <div className="item-title" onClick={() => openOriginalPost()}>
            {data.title}
          </div>
        )}
        {openModal && type === 'list' &&
          <RedditPostModal
            openModal={openModal}
            onClose={() => setOpenModal(false)}
            itemData={data}
            link={data.permalink}
            checkIfVideo={checkIfVideo}
          />
        }
        {checkIfVideo(data)}

      </div>
    </div>
  );
});

export default RedditItem;
