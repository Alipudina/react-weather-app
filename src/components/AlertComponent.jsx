import React from "react";

function AlertComponent({ onWrongCity }) {
  return (
    <div className="alertComponent">
      <h1 className="animate__animated animate__fadeInRightBig">
        Please enter the city name correctly!
        <span onClick={onWrongCity}>X</span>
      </h1>
    </div>
  );
}

export default AlertComponent;
