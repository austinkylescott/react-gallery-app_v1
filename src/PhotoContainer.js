import React, { Component } from "react";
import Photo from "./Photo";

class PhotoContainer extends Component {
  render() {
    const photoData = this.props.photos;
    let photoComponents = photoData.map(photo => {
      return (
        <Photo
          key={photo.id}
          src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
        />
      );
    });

    return (
      <div className="photo-container">
        <h2>Results for "{this.props.title}"</h2>
        <ul>{photoComponents}</ul>
      </div>
    );
  }
}

export default PhotoContainer;
