import React, { Component } from 'react';
import './App.css';

import SearchPanel from './components/SearchPanel.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeywords: "",
      searchSuggestionPackagesData: []
    }
    this.handleOnChangeKeywords = this.handleOnChangeKeywords.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    this.handleSelectSuggestion = this.handleSelectSuggestion.bind(this);
  }

  handleOnChangeKeywords(value) {
    this.setState({
      searchKeywords: value
    });

    if (value !== "") {
      var fetchUrl = `https://npm-registry-proxy.glitch.me/search/suggestions?q=${value}`;

      fetch(fetchUrl,
      {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({
          searchSuggestionPackagesData: responseJson
        });
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      this.setState({
        searchSuggestionPackagesData: []
      });
    }
  }

  handleSelectSuggestion(suggestionName) {
    this.setState({
      searchKeywords: suggestionName,
      searchSuggestionPackagesData: []
    });
  }

  handleSearchButtonClick() {
    console.log("page level search button click", this.state.searchKeywords);
    this.setState({
      searchSuggestionPackagesData: []
    });

    var finalSearchKeywords = this.state.searchKeywords || "";
    this.props.history.push(`/package-overview/${finalSearchKeywords}`);
  }

  render() {
    return (
      <div className="App">
        <div className="main-container">
          <h2>DEPENDENCY EXPLORER</h2>

          <SearchPanel
            onOnChangeKeywords = {this.handleOnChangeKeywords}
            onSearchButtonClick = {this.handleSearchButtonClick}
            searchSuggestionPackagesData = {this.state.searchSuggestionPackagesData}
            onSelectSuggestion = {this.handleSelectSuggestion}
            searchKeywords = {this.state.searchKeywords}
          />
        </div>
      </div>
    );
  }
}

export default App;
