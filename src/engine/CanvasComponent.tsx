import React, { useEffect, useRef } from "react";

function CanvasComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef(0);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        requestIdRef.current = requestAnimationFrame(tick);
      }
      return () => {
        cancelAnimationFrame(requestIdRef.current);
      };
    }
  }, []);
  const renderFrame = () => {};
  const tick = () => {
    if (!canvasRef.current) return;
    renderFrame();
    requestIdRef.current = requestAnimationFrame(tick);
  };
  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      style={{ backgroundColor: "#000" }}
    />
  );
}

export default CanvasComponent;
