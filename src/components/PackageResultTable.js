import React from 'react';

class SearchPanel extends React.Component {

  render() {
    var dependenciesData = this.props.dependenciesData;

    var dependenciesDataUI = () => {
      return dependenciesData.map((i, index) => {
        return (
          <div key={index}>
            <li><div>{i}</div></li>
          </div>
        );
      });
    }

    return (
      <div>
        <ul id="myUL">
          {dependenciesDataUI()}
        </ul>
      </div>
    );
  }
}

 export default SearchPanel;