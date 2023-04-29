import { useState } from "react";

const ScreenRefresher = () => {
  const [isDataDownload, setIsDataDownload] = useState(false);
  return {
    isDataDownload: isDataDownload,
    setIsDataDownload: setIsDataDownload,
  };
};
export default ScreenRefresher;
