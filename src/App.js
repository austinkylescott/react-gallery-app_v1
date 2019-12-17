import React, { Component } from "react";
import apiKey from "./config";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import NotFound from "./NotFound";
import SearchForm from "./SearchForm";
import PhotoContainer from "./PhotoContainer";
import PageNotFound from "./PageNotFound";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      busPhotos: [],
      carPhotos: [],
      trainPhotos: [],
      query: "bus",
      loading: true,
      defaultsLoaded: false
    };
  }

  componentDidMount() {
    //Initial default photo grab
    this.performSearch("car");
    this.performSearch("train");
    this.performSearch("bus");

    //Perform a search using default query
    this.performSearch(this.state.query);
  }

  performSearch(query) {
    //Request using my APIKEY and a query from search form
    const request = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;
    this.setState({ loading: true });
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
        if (!this.state.defaultsLoaded) {
          switch (query.toLowerCase()) {
            case "bus":
              this.setState({ busPhotos: data.photos.photo, loading: false });
              break;
            case "car":
              this.setState({ carPhotos: data.photos.photo, loading: false });
              break;
            case "train":
              this.setState({ trainPhotos: data.photos.photo, loading: false });
              break;
            default:
              this.setState({ photos: data.photos.photo, loading: false });
              break;
          }
          // this.setState({ photos: data.photos.photo, loading: false });
          if (
            this.state.busPhotos.length > 0 &&
            this.state.carPhotos.length > 0 &&
            this.state.trainPhotos.length > 0
          ) {
            this.setState({ defaultsLoaded: true });
          }
        } else {
          switch (query.toLowerCase()) {
            case "bus":
              this.setState({ photos: this.state.busPhotos, loading: false });
              break;
            case "car":
              this.setState({ photos: this.state.carPhotos, loading: false });
              break;
            case "train":
              this.setState({ photos: this.state.trainPhotos, loading: false });
              break;
            default:
              this.setState({ photos: data.photos.photo, loading: false });
              break;
          }
        }
      });
  }

  handleSearch = search => {
    this.setState({ query: search });
    this.performSearch(search);
  };

  render() {
    return (
      <BrowserRouter>
        <SearchForm search={this.handleSearch} history={this.props.history} />
        <Nav />
        {this.state.loading ? (
          <p>Loading...</p>
        ) : this.state.photos.length > 0 ? (
          <Switch>
            <Route
              exact
              path="/search/car"
              render={routeProps => (
                <PhotoContainer
                  {...routeProps}
                  photos={this.state.carPhotos}
                  title={"car"}
                />
              )}
            />
            <Route
              exact
              path="/search/bus"
              render={routeProps => (
                <PhotoContainer
                  {...routeProps}
                  photos={this.state.busPhotos}
                  title={"bus"}
                />
              )}
            />
            <Route
              exact
              path="/search/train"
              render={routeProps => (
                <PhotoContainer
                  {...routeProps}
                  photos={this.state.trainPhotos}
                  title={"train"}
                />
              )}
            />
            <Route
              exact
              path="/search/:query"
              render={routeProps => (
                <PhotoContainer
                  {...routeProps}
                  photos={this.state.photos}
                  title={this.state.query}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={routeProps => (
                <PhotoContainer
                  {...routeProps}
                  photos={this.state.photos}
                  title={this.state.query}
                />
              )}
            />
            <Route component={PageNotFound} />
          </Switch>
        ) : (
          <NotFound />
        )}
      </BrowserRouter>
    );
  }
}

export default App;
