import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils";
import styles from "./reply_detail.module.css";

const ReplyDetail = ({ reply, youtube }) => {
  const [channel, setChannel] = useState(null);
  const replyContent = reply.snippet.topLevelComment.snippet;
  const channelID = replyContent.authorChannelId.value;
  useEffect(() => {
    youtube //
      .channel(channelID)
      .then((response) => setChannel(response));
  }, [youtube, channelID]);

  return (
    <div className={styles.replyBox}>
      <div>
        {channel && (
          <img
            className={styles.thumbnail}
            src={channel[0].snippet.thumbnails.default.url}
            alt="nicephoto"
          ></img>
        )}
      </div>
      <div className={styles.meta}>
        <div className={styles.userName}>
          {channel && channel[0].snippet.title}
          <span className={styles.date}>
            {formatDate(replyContent.updatedAt)}
          </span>
        </div>
        <div>{replyContent.textDisplay}</div>
      </div>
    </div>
  );
};

export default ReplyDetail;
