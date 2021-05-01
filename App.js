import makeUseFs from "./useFullscreen.js";
const YOUTUBE_VID_ID = "bmVKaAV_7-A"; // "eGD_zPZD8-A"; //

export default (_, hooks) => {
  const { useRef } = hooks;
  const useFullscreen = makeUseFs(hooks);
  // Initialize htm with Preact
  const Player = (props) => {
    const { isFullscreen, requestFs } = props;
    const baseWidth = 560;
    const baseHeight = 315;
    const ASPECT_RATIO = baseWidth / baseHeight;
    return html`
      <div id="youtube-player">
        <div
          style=${{
            position: "relative",
            height: 0,
            width: "100%",
            paddingTop: `${(1 / ASPECT_RATIO) * 100}%`,
            backgroundColor: "rgba(255,255,255,0.3)",
          }}
        >
          <div
            style=${{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              display: "flex",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/${YOUTUBE_VID_ID}?controls=1"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              style=${{ flex: 1 }}
            ></iframe>
          </div>
        </div>
        <div id="theatre-mode">
          <button onClick=${requestFs}>
            ${isFullscreen ? "Exit theater mode" : "Theater mode"}
          </button>
        </div>
      </div>
    `;
  };

  const Chat = () => {
    return html`
      <iframe
        src="https://www.youtube.com/live_chat?v=${YOUTUBE_VID_ID}&embed_domain=thereignofkindo.com&live=true"
        frameborder="0"
        title="YouTube chat"
      ></iframe>
    `;
  };

  function App() {
    const ref = useRef();
    const { requestFs, isFullscreen } = useFullscreen(ref);
    return html`
      <h1 className="title">LIVE STREAM CONCERT</h1>
      <div className="react-container" ref=${ref}>
        <div>
          <div>
            <${Player} requestFs=${requestFs} isFullscreen=${isFullscreen} />
            <${Chat} />
          </div>
        </div>
      </div>
    `;
  }

  return App;
};
