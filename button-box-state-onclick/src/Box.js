import React from "react";

const Box = ({ isOn }) => (
  <div className={`m-5 p-5 h1 ${isOn ? "bg-info" : "bg-warning"}`}>
    HELLO I AM BOX{" "}
    <p className="h6 text-muted"> And Button is {isOn ? " ON " : " OFF"}</p>
  </div>
);

export default Box;
