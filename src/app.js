import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./app.module.css";
import SearchHeader from "./components/search_header/search_header";
import VideoDetail from "./components/video_detail/video_detail";
import VideoList from "./components/video_list/video_list";

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
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
    },
    [youtube]
  ); //써야할때만 쓰면된다.. 메모리에 저장이되기에..

  // useEffect(() => {
  //   // window.location.reload();
  // });

  // const youtubeLoading = ()=>{
  //   youtube //
  //     .mostPopular()
  //     .then((videos) => setVideos(videos));
  // }

  useEffect(() => {
    youtube //
      .mostPopular()
      .then((videos) => setVideos(videos));
  }, [youtube]);
  // console.log(videos);
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
              {selectedVideo && (
                <div className={styles.detail}>
                  <VideoDetail video={selectedVideo} />
                </div>
              )}
              <div className={styles.list}>
                <VideoList
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
