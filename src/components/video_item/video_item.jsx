import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./video_item.module.css";

const VideoItem = memo(
  ({ video, video: { snippet }, onVideoClick, display, youtube }) => {
    const displayType = display === "list" ? styles.list : styles.grid;
    const [channel, setChannel] = useState([]);
    useEffect(() => {
      youtube //
        .channel(snippet.channelId)
        .then((channel) => setChannel(channel));
    });
    console.log("채널정보");
    console.log(channel);

    return (
      <Link
        to={`/video_detail/${video.id}`}
        className={`${styles.container} ${displayType}`}
        onClick={() => onVideoClick(video)}
      >
        {/* <li
          //app에서 부터 가져온다! grid인지list인지
          onClick={() => onVideoClick(video)}
          className={styles.li}
        > */}
        <div className={styles.video}>
          <img
            className={styles.thumbnail}
            src={snippet.thumbnails.medium.url}
            alt="video thumbnail"
          />
          <div className={styles.metadata}>
            {/* <div>
              {channel.snippet.thumbnails && (
                <img src={channel.snippet.thumbnails} alt= />
              )}
            </div> */}
            <div>
              <p className={styles.title}>{snippet.title}</p>
              <p className={styles.channel}>{snippet.channelTitle}</p>
            </div>
          </div>
        </div>
        {/* </li> */}
      </Link>
    );
  }
);

export default VideoItem;
