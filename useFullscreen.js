const useFullscreen = (hooks) => (ref) => {
  const { useState, useCallback, useEffect } = hooks;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const requestFs = useCallback(() => {
    if (ref.current) {
      if (!isFullscreen) ref.current.requestFullscreen();
      else {
        try {
          document.exitFullscreen();
        } catch (e) {
          // Not fullscreen
          setIsFullscreen(false);
          ref.current.requestFullscreen();
        }
      }
    }
  }, [ref, isFullscreen, setIsFullscreen]);
  useEffect(() => {
    const changeHandler = (e) => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", changeHandler);
    document.addEventListener("webkitfullscreenchange", changeHandler);
    document.addEventListener("mozfullscreenchange", changeHandler);
    return () => {
      document.removeEventListener("fullscreenchange", changeHandler);
      document.removeEventListener("webkitfullscreenchange", changeHandler);
      document.removeEventListener("mozfullscreenchange", changeHandler);
    };
  }, [ref, isFullscreen, setIsFullscreen]);
  return { requestFs, isFullscreen };
};

export default useFullscreen;
