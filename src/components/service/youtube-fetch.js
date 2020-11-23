class YoutubeFetch {
  constructor(key) {
    this.key = key;
    this.getRequestOptions = {
      method: "GET",
      redirect: "follow",
    };
  }

  mostPopular() {
    return (
      fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${this.key}`,
        this.getRequestOptions
      ) //fetch가 이루어지면.. 반응을 text로 전환하고
        // .then((response) => response.text())
        //변환된 택스트 출력! 에러면 에러 출력 text보다 json이편함
        .then((response) => response.json())
        .then((result) => result.items)
    );
    // .then((result) => setVideos(result.items)); //비동기로 업데이트!
  }
  //async 차이점!
  async search(query) {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${this.key}`,
      this.getRequestOptions
    );
    const result = await response.json();
    return result.items.map((item) => ({ ...item, id: item.id.videoId }));
  }
}

export default YoutubeFetch;
