import React from 'react';
import '../css/redditItem.css';

const RedditPost = (props) => {
    const { data } = props;

    return (
        <div className="reddit-item">
            <div className="item-header">
                <div className="item-author">{`Posted by u/${data.author}`}</div>
                <div className="item-title">{data.title}</div>
                <video height='500px'controls> 
                <source src={'https://v.redd.it/hk5h52g72mea1/DASH_1080.mp4?source=fallback'} type="video/mp4" />
                </video>
            </div>
        </div>
    );
};

export default RedditPost;