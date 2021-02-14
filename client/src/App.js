import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AllMemes from "./components/screens/AllMemes";
import SpecificMeme from "./components/screens/SpecificMeme";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/memes/:id">
            <SpecificMeme />
          </Route>
          <Route path="/">
            <AllMemes />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
