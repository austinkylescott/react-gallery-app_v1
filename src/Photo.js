import React from "react";

const Photo = props => {
  return (
    <li>
      <img src={props.src} alt={props.alt}></img>
    </li>
  );
};

export default Photo;
