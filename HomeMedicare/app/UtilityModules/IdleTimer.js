import React from "react";
import IdleTimer from "react-idle-timer";

function IdleTimerContainer() {
  const idleTimerRef = useRef(null);

  const onIdle = () => {
    console.log("User is Idle");
  };
  return (
    <IdleTimer
      ref={idleTimerRef}
      timeout={5 * 1000}
      onIdle={onIdle}
    ></IdleTimer>
  );
}

export default IdleTimerContainer;
