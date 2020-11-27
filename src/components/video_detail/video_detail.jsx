import React, { useState } from "react";
import { formatDate, trimText } from "../../utils";
import ReplyDetail from "../reply/reply_detail";
import styles from "./video_detail.module.css";

const VideoDetail = ({
  video,
  video: { snippet, statistics },
  channel,
  replies,
  youtube,
}) => {
  const [detail, setDetail] = useState(false);

  console.log("선택비디오정보!!디테일!!");
  console.log(video);
  console.log("채널정보!!디테일!!");
  console.log(channel);
  console.log("리플정보!!디테일!!");
  console.log(replies);

  const onClick = () => {
    setDetail(!detail);
  };

  return (
    <section className={styles.detail}>
      <iframe
        className={styles.video}
        title="ytplayer"
        type="text/html"
        width="1280"
        height="720"
        src={`https://www.youtube.com/embed/${video.id}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className={styles.title}>{snippet.title}</div>
      <div className={styles.static}>
        <div className={styles.view}>
          {channel[0].statistics.viewCount} views •
        </div>
        <div className={styles.date}>{formatDate(snippet.publishedAt)}</div>
      </div>
      <div className={styles.meta}>
        <div className={styles.channelInfo}>
          <img
            className={styles.thumbnail}
            src={channel[0].snippet.thumbnails.default.url}
          ></img>
          <div className={styles.channelInfoRight}>
            <div className={styles.channelTitle}>{snippet.channelTitle}</div>
            <div className={styles.subscribers}>
              {channel[0].statistics.subscriberCount} subscribers
            </div>
          </div>
        </div>
        <div className={styles.description}>
          {detail
            ? `${snippet.description}`
            : `${trimText(snippet.description, 200)}`}

          <button className={styles.button} onClick={onClick}>
            {detail ? "SHOW LESS" : "SHOW MORE"}
          </button>
        </div>
      </div>
      <div>
        <div className={styles.comment}>{statistics.commentCount} Comments</div>
        <div className={styles.replies}>
          {replies.map((reply) => (
            <ReplyDetail reply={reply} youtube={youtube} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoDetail;
