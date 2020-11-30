import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { trimText, formatDate } from "../../utils";
import styles from "./video_item.module.css";
import VideoItemDetail from "./video_item_detail.jsx";

const VideoItem = memo(
  ({
    video,
    video: { snippet, statistics },
    onVideoClick,
    display,
    youtube,
    searchOn,
  }) => {
    console.log("서치온오프?");
    console.log(searchOn);
    const displayType = display === "list" ? styles.list : styles.grid;
    const [channel, setChannel] = useState(null);
    // const response = youtube //
    //     .channel(snippet.channelId);
    // setChannel(response);
    const [searhedVideo, setSearhedVideo] = useState(null);

    useEffect(() => {
      youtube //
        .searchVideoDetail(video.id)
        .then((response) => setSearhedVideo(response[0]));
    }, [searchOn, youtube, video.id]);

    useEffect(() => {
      if (searchOn === false) {
        youtube //
          .channel(snippet.channelId)
          .then((response) => setChannel(response));
      } else {
        searhedVideo &&
          youtube //
            .channel(searhedVideo.snippet.channelId)
            .then((response) => setChannel(response));
        console.log("서치된거채널변경!");
      }
    }, [youtube, snippet.channelId, searhedVideo, searchOn]);

    return searchOn ? (
      searhedVideo && (
        <Link
          to={`/video_detail/${video.id}`}
          className={`${styles.container} ${displayType}`}
          onClick={() => onVideoClick(searhedVideo)}
        >
          <div className={`${styles.video} ${displayType}`}>
            <img
              className={`${styles.thumbnail} ${displayType}`}
              src={searhedVideo.snippet.thumbnails.medium.url}
              alt="video thumbnail"
            />
            <div className={`${styles.metadata} ${displayType}`}>
              <div className={`${styles.thumb} ${displayType}`}>
                {channel && <VideoItemDetail channel={channel} />}
              </div>
              <div>
                <p className={`${styles.title} ${displayType}`}>
                  {trimText(searhedVideo.snippet.title, 50)}
                </p>
                <p className={`${styles.channel} ${displayType}`}>
                  {searhedVideo.snippet.channelTitle}
                </p>
                <p className={`${styles.static} ${displayType}`}>
                  Views {searhedVideo.statistics.viewCount}{" "}
                  {formatDate(snippet.publishedAt)}
                </p>
              </div>
            </div>
          </div>
        </Link>
      )
    ) : (
      <Link
        to={`/video_detail/${video.id}`}
        className={`${styles.container} ${displayType}`}
        onClick={() => onVideoClick(video)}
      >
        <div className={`${styles.video} ${displayType}`}>
          <img
            className={`${styles.thumbnail} ${displayType}`}
            src={snippet.thumbnails.medium.url}
            alt="video thumbnail"
          />
          <div className={`${styles.metadata} ${displayType}`}>
            <div className={`${styles.thumb} ${displayType}`}>
              {channel && <VideoItemDetail channel={channel} />}
            </div>
            <div>
              <p className={`${styles.title} ${displayType}`}>
                {trimText(snippet.title, 50)}
              </p>
              <p className={`${styles.channel} ${displayType}`}>
                {snippet.channelTitle}
              </p>
              <p className={`${styles.static} ${displayType}`}>
                Views {statistics.viewCount} {formatDate(snippet.publishedAt)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
);

export default VideoItem;
