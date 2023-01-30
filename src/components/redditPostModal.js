import React, { useEffect, useState } from "react";
import "../css/redditPostModal.css";
import useRedditItems from "../hooks/getRedditItems";
import { fetchDataFromLink } from "../API/redditAPIs";
import RedditItem from "./redditItem";
import TopComments from "./topComments";
const RedditPostModal = ({ openModal, onClose, link, itemData, checkIfVideo }) => {
  const { token, data, isLoading } = useRedditItems();
  const [postData, setPostData] = useState();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(() => {
    if (!token) return;
    fetchDataFromLink(token.access_token, link).then((data) => {
      setPostData(data);
    });
  }, [token]);
  return (
    <>
      <div onClick={onClose} className="overlay" />
      <div
        id="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="modal-header">
          <p className="close-button" onClick={() => onClose()}>
            X
          </p>
        </div>
        <RedditItem data={itemData} type={'post'}/>
        {!postData && <p className="loadingMsg">Loading Data!</p>}
        {postData && <TopComments data={postData[1].data.children.slice(0,10)} />}
      </div>
    </>
  );
};

export default RedditPostModal;
