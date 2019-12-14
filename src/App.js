import React, { Component } from "react";
import apiKey from "./config";
import { BrowserRouter, Route } from "react-router-dom";
import Nav from "./Nav";
import NotFound from "./NotFound";
import SearchForm from "./SearchForm";
import PhotoContainer from "./PhotoContainer";
import Photo from "./Photo";

class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      query: "bus"
    };
  }

  componentDidMount() {
    //Perform a search using default query
    this.performSearch(this.state.query);
  }

  performSearch(query) {
    //Request using my APIKEY and a query from search form
    const request = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;

    fetch(request)
      .then(response => {
        if (!response.ok) {
          console.log("Error fetching data: Status Code: ", response.status);
        } else {
          console.log("RESPONSE OK");
        }
        return response.json();
      })
      .then(data => {
        this.setState({ photos: data.photos.photo });
      });
  }

  handleSearch = search => {
    this.setState({ query: search });
    this.performSearch(search);
  };

  render() {
    return (
      <BrowserRouter>
        <SearchForm search={this.handleSearch} />
        <Nav />
        {this.state.photos.length > 0 ? (
          <PhotoContainer photos={this.state.photos} title={this.state.query} />
        ) : (
          <NotFound />
        )}
      </BrowserRouter>
    );
  }
}

export default App;
