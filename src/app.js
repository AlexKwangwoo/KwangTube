import React, { useEffect, useState } from "react";
import "./app.css";
import VideoList from "./components/video_list/video_list";

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyCOwxWSYSna12eFNDI6M9OyouzQH-sqiPs",
      requestOptions
    ) //fetch가 이루어지면.. 반응을 text로 전환하고
      // .then((response) => response.text())
      //변환된 택스트 출력! 에러면 에러 출력 text보다 json이편함
      .then((response) => response.json())
      .then((result) => setVideos(result.items)) //비동기로 업데이트!
      .catch((error) => console.log("error", error));
  }, []);
  // console.log(videos);
  return <VideoList videos={videos} />;
}

export default App;
