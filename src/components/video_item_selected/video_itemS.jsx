import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { trimText, formatDate } from "../../utils";
import styles from "./video_itemS.module.css";

const VideoItemS = memo(
  ({
    video,
    video: { snippet, statistics },
    onVideoClick,
    display,
    youtube,
    searchOn,
  }) => {
    const displayType = display === "list" ? styles.list : styles.grid;
    const [channel, setChannel] = useState(null);
    // const response = youtube //
    //     .channel(snippet.channelId);
    // setChannel(response);
    const [searhedVideo, setSearhedVideo] = useState(null);
    console.log(channel);
    useEffect(() => {
      youtube //
        .searchVideoDetail(video.id)
        .then((response) => setSearhedVideo(response[0]));
    }, [youtube, video.id]);

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
      }
    }, [youtube, snippet.channelId]);

    return searchOn ? (
      searhedVideo && (
        <Link
          to={`/video_detail/${searhedVideo.id}`}
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
              <div>
                <p className={`${styles.title} ${displayType}`}>
                  {trimText(searhedVideo.snippet.title, 45)}
                </p>
                <p className={`${styles.channel} ${displayType}`}>
                  {searhedVideo.snippet.channelTitle}
                </p>
                <p className={`${styles.static} ${displayType}`}>
                  Views {searhedVideo.statistics.viewCount}{" "}
                  {formatDate(searhedVideo.snippet.publishedAt)}
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
            <div>
              <p className={`${styles.title} ${displayType}`}>
                {trimText(snippet.title, 45)}
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

export default VideoItemS;
