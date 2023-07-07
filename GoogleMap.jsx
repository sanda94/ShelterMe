import React, { useEffect } from "react";

function GoogleMap({ longitude, latitude }) {
  useEffect(() => {
    const ifameData = document.getElementById("iframeId");
    const lat = latitude;
    const lon = longitude;
    ifameData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`;
  });
  return (
    <div>
      <iframe id="iframeId" height="500px" width="100%"></iframe>
    </div>
  );
}
export default GoogleMap;
