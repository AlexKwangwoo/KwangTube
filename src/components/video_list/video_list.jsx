import React from "react";
import VideoItem from "../video_item/videos_item";

const VideoList = (props) => {
  // const []
  console.log(props);
  return (
    <ul>
      {props.videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </ul>
  );
};

export default VideoList;
