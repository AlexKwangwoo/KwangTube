import React from "react";
import VideoItem from "../video_item/video_item";
import VideoItemS from "../video_item_selected/video_itemS";
import styles from "./video_list.module.css";

const VideoList = ({ videos, onVideoClick, display, youtube, searchOn }) => {
  console.log(videos);
  console.log("리스트온오프");
  console.log(searchOn);
  return (
    <ul className={styles.videos}>
      {videos.map((video) =>
        display === "grid" ? (
          <VideoItem
            key={video.id}
            video={video}
            onVideoClick={onVideoClick}
            display={display}
            youtube={youtube}
            searchOn={searchOn}
          />
        ) : (
          <VideoItemS
            key={video.id}
            video={video}
            onVideoClick={onVideoClick}
            display={display}
            youtube={youtube}
            searchOn={searchOn}
          />
        )
      )}
    </ul>
  );
};

export default VideoList;
