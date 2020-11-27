import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./app.module.css";
import SearchHeader from "./components/search_header/search_header";
import VideoDetail from "./components/video_detail/video_detail";
import VideoList from "./components/video_list/video_list";

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [channel, setChannel] = useState(null);
  const [replies, setReplies] = useState(null);
  const [searchOn, setSearchOn] = useState(false);
  console.log(youtube);
  const selectVideo = (video) => {
    setSelectedVideo(video);
  };
  // window.location.reload();

  const search = useCallback(
    (query) => {
      //useCallback을 통해.. 한번만든 함수
      // props가 바뀌지 않는 이상 호출되지 않게 한다!
      youtube //
        .search(query)
        .then((videos) => {
          setVideos(videos);
          setSelectedVideo(null);
        });
      setSearchOn(true);
    },
    [youtube]
  ); //써야할때만 쓰면된다.. 메모리에 저장이되기에..

  useEffect(() => {
    console.log(selectedVideo);
    if (selectedVideo) {
      youtube //
        .channel(selectedVideo.snippet.channelId)
        .then((response) => setChannel(response));
    }
  }, [youtube, selectedVideo]);

  useEffect(() => {
    youtube //
      .mostPopular()
      .then((videos) => {
        console.log(videos);
        setVideos(videos);
      });
  }, [youtube]);

  useEffect(() => {
    if (selectedVideo) {
      youtube //
        .replies(selectedVideo.id)
        .then((response) => setReplies(response));
    }
  }, [youtube, selectedVideo]);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <SearchHeader onSearch={search} />
            <section className={styles.content}>
              {/* {selectedVideo && (
                <div className={styles.detail}>
                  <VideoDetail video={selectedVideo} />
                </div>
              )} */}
              <div className={styles.list_basic}>
                <VideoList
                  searchOn={searchOn}
                  videos={videos}
                  onVideoClick={selectVideo}
                  display={selectedVideo ? "list" : "grid"}
                  youtube={youtube}
                />
              </div>
            </section>
          </Route>
          <Route path="/video_detail/:video">
            <SearchHeader onSearch={search} />
            <section className={styles.content}>
              {selectedVideo && channel && replies && (
                <div className={styles.detail}>
                  <VideoDetail
                    video={selectedVideo}
                    channel={channel}
                    replies={replies}
                    youtube={youtube}
                  />
                </div>
              )}
              <div className={styles.list}>
                <div className={styles.topText}>NEXT VIDEO</div>
                <VideoList
                  searchOn={searchOn}
                  videos={videos}
                  onVideoClick={selectVideo}
                  display={selectedVideo ? "list" : "grid"}
                  youtube={youtube}
                />
              </div>
            </section>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
