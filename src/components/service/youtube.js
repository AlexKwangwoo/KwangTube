import axios from "axios";

class Youtube {
  constructor(key) {
    this.youtube = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: key },
    });
  }

  async channel(id) {
    const response = await this.youtube.get("channels", {
      params: {
        part: "snippet,statistics",
        id: id,
      },
    });
    return response.data.items;
  }

  async mostPopular() {
    const response = await this.youtube.get("videos", {
      params: {
        part: "snippet,statistics",
        chart: "mostPopular",
        maxResults: 42,
      },
    });
    return response.data.items; //data로 준다! data안의 items로 주면됨!
    // fetch는 전체적인 url을 작성했던 반면에
    // params 파트 나누어 가능!

    // return (
    //   fetch(
    //     `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${this.key}`,
    //     this.getRequestOptions
    //   ) //fetch가 이루어지면.. 반응을 text로 전환하고
    //     // .then((response) => response.text())
    //     //변환된 택스트 출력! 에러면 에러 출력 text보다 json이편함
    //     .then((response) => response.json())
    //     .then((result) => result.items)
    // );
    // .then((result) => setVideos(result.items)); //비동기로 업데이트!
  }

  async search(query) {
    const response = await this.youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 42,
        type: "video",
        q: query,
      },
    });
    return response.data.items.map((item) => ({
      ...item,
      id: item.id.videoId,
    }));

    // const response = await fetch(
    //   `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${this.key}`,
    //   this.getRequestOptions
    // );
    // const result = await response.json();
    // return result.items.map((item) => ({ ...item, id: item.id.videoId }));
  }
}

export default Youtube;
