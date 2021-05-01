const useFullscreen = (hooks) => (ref) => {
  const { useState, useCallback, useEffect } = hooks;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const requestFs = useCallback(() => {
    if (ref.current) {
      if (!isFullscreen) ref.current.requestFullscreen();
      else document.exitFullscreen();
    }
  }, [ref, isFullscreen, setIsFullscreen]);
  useEffect(() => {
    const changeHandler = () => {
      console.log("FULLSCREEN CHANGING >>>>>>>", isFullscreen);
      setIsFullscreen((prev) => !prev);
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
