import React, { useEffect, useRef } from "react";
import Application from "../../engine/Application";
import Player from "../../engine/Player";

function Game() {
  const appRef = useRef<Application>(null);

  useEffect(() => {
    const obj = new Player();
    obj.position.y = 100;
    if (appRef.current) {
      appRef.current.addChild(obj);
    }
  }, []);
  return (
    <div>
      <Application ref={appRef} width={1500} height={300} color={"#93BBEC"} />
    </div>
  );
}

export default Game;
