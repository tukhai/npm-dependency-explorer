import React from 'react';
import { Link } from 'react-router-dom';

import PackageResultTable from './components/PackageResultTable.js';

const TIMES_OF_TRYING_MULTIPLE_CHAIN = 20;

class PackageOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packageResultData: []
    }
  }

  multipleFetch(urls) {
    return new Promise((resolve, reject) => {
      var remainingPackages = [];

      var fetchArr = [];
      urls.map(url => {
        fetchArr.push(
          fetch(`https://npm-registry-proxy.glitch.me/${url}/latest`, {method: 'GET'})
        );
      });

      Promise.all(fetchArr)
      .then(responses => {
        return Promise.all(
          responses.map(res => {
            return res.json();
          })
        );
      })
      .then(responses => {
        responses.map(res => {
            if (res.dependencies) {
              Object.keys(res.dependencies).map(i => {
                if (this.state.packageResultData.indexOf(i) === -1) {
                  this.setState({
                    packageResultData: [...this.state.packageResultData, i]
                  });
                  remainingPackages.push(i);
                }
              });
            }
        });

        if (remainingPackages && remainingPackages.length > 0) {
          resolve(remainingPackages);
        } else {
          reject(new Error("No more remaining packages"));
        }
      });
    });
  }

  repeatFunction(tries, values) {
    if (tries === 0 || !values) {
      return Promise.resolve();
    }
    return this.multipleFetch(values).then((values) => {
      if (!values) {
        return this.repeatFunction(tries - 1, values);
      }
    });
  }

  componentDidMount() {
    var fetchUrl = `https://npm-registry-proxy.glitch.me/react/latest`;

    fetch(fetchUrl,
    {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var packagesArr = [];
      Object.keys(responseJson.dependencies).map(i => {
        packagesArr.push(i);
      });

      this.setState({
        packageResultData: packagesArr
      });

      return packagesArr;
    })
    .then(urls => {
      // Repeat chaining multiple fetching
      this.repeatFunction(TIMES_OF_TRYING_MULTIPLE_CHAIN, urls);

    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
        <div className="App">
          <h4 className="back-to-home-page"><Link to="/">DEPENDENCY EXPLORER</Link></h4>

          <div className="main-container">
            <h2>PACKAGE OVERVIEW</h2>
            <div className="package-name">React</div>

            <h4 className="package-result-counter">Found XX dependencies for "react"</h4>

            <PackageResultTable
              dependenciesData = {this.state.packageResultData}
            />
          </div>
        </div>
      );
  }
}
export default PackageOverview