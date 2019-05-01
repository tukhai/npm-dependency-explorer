import React from 'react';

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnChangeKeywords = this.handleOnChangeKeywords.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
  }

  handleOnChangeKeywords(e) {
    var eventTargetValue = "";
    if (e.target && e.target.value) {
      eventTargetValue = e.target.value;
    }

    if (typeof this.props.onOnChangeKeywords === "function") {
      this.props.onOnChangeKeywords(eventTargetValue);
    }
  }

  handleSearchButtonClick() {
    if (typeof this.props.onSearchButtonClick === "function") {
      this.props.onSearchButtonClick();
    }
  }
  
  handleSelectSuggestion(suggestionName) {
    if (typeof this.props.onSelectSuggestion === "function") {
      this.props.onSelectSuggestion(suggestionName);
    }
  }

  render() {
    var searchSuggestions = this.props.searchSuggestionPackagesData || [];

    var searchSuggestionsUI = () => {
      return searchSuggestions.map((i, index) => {
        return (
          <div key={index} onClick={() => this.handleSelectSuggestion(i.name)}>
            {i.name}
          </div>
        );
      });
    }

    return (
      <div>
        <div className="search-container">
          <input 
            type={"text"}
            // id={"myInput"}
            className={"main-search"}
            onChange={this.handleOnChangeKeywords}
            placeholder={"Keywords for NPM Packages"}
            title={"Type in a name"}
            value={this.props.searchKeywords}
          />

          {searchSuggestions && searchSuggestions.length > 0 &&
            <div className="auto-complete-items">
              {searchSuggestionsUI()}
            </div>
          }
        </div>

        <button className={"search-button"} onClick={this.handleSearchButtonClick}>
          Search
        </button>
      </div>
    );
  }
}

 export default SearchPanel;