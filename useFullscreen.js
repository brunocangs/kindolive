const useFullscreen = (hooks) => (ref) => {
  const { useState, useCallback, useEffect } = hooks;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const requestFs = useCallback(() => {
    if (ref.current) {
      if (!isFullscreen) ref.current.requestFullscreen();
    }
  }, [ref]);
  useEffect(() => {
    const changeHandler = () => {
      //NB the following line requrires the libary from John Dyer
      var fs = !!window.fullScreenElement;
      setIsFullscreen(fs);
    };
    document.addEventListener("fullscreenchange", changeHandler);
    document.addEventListener("webkitfullscreenchange", changeHandler);
    document.addEventListener("mozfullscreenchange", changeHandler);
    return () => {
      document.removeEventListener("fullscreenchange", changeHandler);
      document.removeEventListener("webkitfullscreenchange", changeHandler);
      document.removeEventListener("mozfullscreenchange", changeHandler);
      setIsFullscreen(false);
    };
  }, [ref]);
  return { requestFs, isFullscreen };
};

export default useFullscreen;
