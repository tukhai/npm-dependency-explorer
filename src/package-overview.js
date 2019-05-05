import React from 'react';
import { Link } from 'react-router-dom';

import PackageResultTable from './components/PackageResultTable.js';

const TIMES_OF_TRYING_MULTIPLE_CHAIN = 20;
const PROXY_CORS_PREFIX = "https://cors-anywhere.herokuapp.com/";

class PackageOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packageResultData: [],
      packageName: "",
      isFetchingCompleted: false
    }
  }

  multipleFetch(urls) {
    return new Promise((resolve, reject) => {
      var remainingPackages = [];

      var fetchArr = [];
      urls.map(url => {
        if (url[0] !== "@") { // Skip the private package
          fetchArr.push(
            fetch(PROXY_CORS_PREFIX + `https://npm-registry-proxy.glitch.me/${url}/latest`, 
            {
              method: 'GET'
            })
          );
        }
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
          reject("Stop Chaining!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    });
  }

  repeatFunction(tries, values) {
    console.log("tries outside", tries);
    if (tries === 0 || !values) {
      return Promise.resolve();
    }
    return this.multipleFetch(values).then((chain_values) => {
      console.log("tries inside", tries, chain_values);
      if (tries > 0 && chain_values) {
        return this.repeatFunction(tries - 1, chain_values);
      }
    }).catch((error) => {
      console.error(error);
      console.clear();
    });
  }

  componentDidMount() {
    var packageNameFromUrl = "react";
    if (this.props.location && this.props.location.pathname) {
      packageNameFromUrl = this.props.location.pathname.replace("/package-overview/", "");

      if (packageNameFromUrl[0] === "@") {
        alert("Unable to access the private package - Redirect to home page");
        window.location.href = "/";
      }
    }
    this.setState({packageName: packageNameFromUrl});

    var fetchUrl = PROXY_CORS_PREFIX + `https://npm-registry-proxy.glitch.me/${packageNameFromUrl}/latest`;

    fetch(fetchUrl,
    {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var packagesArr = [];

      if (responseJson && responseJson.dependencies) {
        Object.keys(responseJson.dependencies).map(i => {
          packagesArr.push(i);
        });

        this.setState({
          packageResultData: packagesArr
        });
      }

      return packagesArr;
    })
    .then(urls => {
      // Repeat chaining multiple fetching
      if (urls.length > 0) {
        this.repeatFunction(TIMES_OF_TRYING_MULTIPLE_CHAIN, urls)
        .then(() => this.setState({isFetchingCompleted: true}))
        .catch((error) => {
          console.error(error);
        });
      } else {
        this.setState({isFetchingCompleted: true}); // This is to remove loading fetch 
      }
    })
    .catch((error) => {
      console.error(error);
      this.setState({isFetchingCompleted: true});
    });
  }

  render() {
    var dependenciesCouter = 0;
    if (this.state.packageResultData && this.state.packageResultData.length > 0) {
      dependenciesCouter = this.state.packageResultData.length;
    }

    return (
        <div className="App">
          <h4 className="back-to-home-page"><Link to="/">DEPENDENCY EXPLORER</Link></h4>

          <div className="main-container">
            <h2>PACKAGE OVERVIEW</h2>
            <div className="package-name">{this.state.packageName}</div>

            <h4 className="package-result-counter">
              {this.state.isFetchingCompleted ?
                <div>Found {dependenciesCouter} dependencies for "{this.state.packageName}"</div>
                :
                <div className="loading-icon-container">
                  <i id="loading" className="material-icons">autorenew</i>
                  <div className="fetching-text">Fetching..</div>
                </div>
              }
            </h4>

            <div className="clear-both"></div>

            <PackageResultTable
              dependenciesData = {this.state.packageResultData}
            />
          </div>
        </div>
      );
  }
}
export default PackageOverview