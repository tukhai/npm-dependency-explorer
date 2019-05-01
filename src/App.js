import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="main-container">
        <h2>Dependency Explorer</h2>

        <div className="search-container">
          <input 
            type={"text"}
            // id={"myInput"}
            className={"main-search"}
            // onkeyup={"myFunction()"}
            placeholder={"Keywords for NPM Packages"}
            title={"Type in a name"}
          />

          <div className="auto-complete-items">
            <div>react</div>
            <div>react-router</div>
            <div>react</div>
            <div>react-router</div>
          </div>
        </div>

        <button className={"search-button"}>
          Search
        </button>
        

        {/* <div className="auto-complete-items">
          <div>react</div>
          <div>react-router</div>
          <div>react</div>
          <div>react-router</div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
