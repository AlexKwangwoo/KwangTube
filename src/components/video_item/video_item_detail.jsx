import React from "react";
import styles from "./video_item_detail.module.css";

const VideoItemDetail = ({ channel }) => {
  console.log("디테일");
  console.log(channel);
  return (
    <>
      {/* <p>{channel.snippet.country}</p> */}
      {channel ? (
        <img
          className={styles.thumImg}
          src={channel[0].snippet.thumbnails.default.url}
          alt="channelPic"
        />
      ) : null}
    </>
  );
};

export default VideoItemDetail;
