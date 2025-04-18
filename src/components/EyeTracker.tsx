// EyeTracker.tsx
import React, { useEffect } from "react";

/* -------------------------------------------------
   The original file pulled its CSS & JS from CDNs.
   In React you normally add those <link>/<script>
   tags inside public/index.html, BUT to keep this
   translation “line‑by‑line” we inject them from
   the component at runtime.  Nothing else changes.
---------------------------------------------------*/

// tell TypeScript there’s a global EyeGestures
declare global {
  interface Window {
    EyeGestures: new (videoId: string, cb: (p: number[], c: any) => void) => {
      start: () => void;
    };
  }
}

const EyeTracker: React.FC = () => {
  useEffect(() => {
    /* wait until EyeGestures is available before running the rest */
    const waiter = setInterval(() => {
      if (window.EyeGestures) {
        clearInterval(waiter);

        // ---- Original inline‑script code starts here ----
        let currentGazeDirection = { horizontal: null as string | null, vertical: null as string | null };

        function detectGazeDirection(point: [number, number]) {
          const x = point[0];
          const y = point[1];
          const screenCenter = window.innerWidth / 2;
          const screenMiddle = window.innerHeight / 2;

          const horizontal = x < screenCenter ? "left" : "right";
          const vertical   = y < screenMiddle ? "top" : "bottom";

          console.log(`Gaze direction - Vertical: ${vertical}, Horizontal: ${horizontal}`);
          return { horizontal, vertical };
        }

        function onPoint(point: number[], calibration: any) {
          if (point.length === 2) {
            console.log("Gaze position:", point[0], point[1]);
            currentGazeDirection = detectGazeDirection([point[0], point[1]]);
          } else {
            console.error("Invalid gaze point data:", point);
          }
        }

        /* Initialize EyeGesturesLite */
        const gestures = new window.EyeGestures("video", onPoint);
        gestures.start();
        // ---- Original inline‑script code ends here ----
      }
    }, 300);

    /* clean up on unmount */
    return () => clearInterval(waiter);
  }, []);

  /* JSX mirrors original body exactly (hidden video + status/error) */
  return (
    <div style={{ margin: 0, backgroundColor: "#383c45", height: "100vh" }}>
        <p>HI</p>
      <video id="video" width={640} height={480} autoPlay style={{ display: "none" }} />
      <div id="status" style={{ display: "none" }}>Initializing...</div>
      <div id="error"  style={{ display: "none" }}></div>
    </div>
  );
};

export default EyeTracker;
