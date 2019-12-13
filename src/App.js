import React, { Component } from "react";
import apiKey from "./config";
import Nav from "./Nav";
import NotFound from "./NotFound";
import SearchForm from "./SearchForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <SearchForm />
        <Nav />
        <NotFound />
      </React.Fragment>
    );
  }
}

export default App;
