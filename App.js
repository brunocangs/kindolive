export default (preact, hooks) => {
  const { useState } = hooks;
  // Initialize htm with Preact
  const Player = () => {
    const baseWidth = 560;
    const baseHeight = 315;
    const ASPECT_RATIO = baseWidth / baseHeight;
    const targetWidth = 600;
    return html`
      <div style=${{ flex: 3, display: "flex" }} id="youtube-player">
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
              src="https://www.youtube.com/embed/bmVKaAV_7-A?controls=0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              style=${{ flex: 1 }}
            ></iframe>
          </div>
          <div></div>
        </div>
      </div>
    `;
  };

  const Chat = () => {
    return html`
      <iframe
        src="https://www.youtube.com/live_chat?v=bmVKaAV_7-A&embed_domain=thereignofkindo.com&live=true"
        frameborder="0"
        title="YouTube chat"
        style=${{ alignSelf: "stretch" }}
        height="550"
      ></iframe>
    `;
  };

  function App() {
    const [setTest, setSetTest] = useState(0);
    return html`
      <h1 className="title">LIVE STREAM CONCERT</h1>
      <div className="react-container" onClick=${() => setSetTest(setTest + 1)}>
        <div>
          <div>
            <${Player} />
            <${Chat} />
          </div>
        </div>
      </div>
    `;
  }

  return App;
};
