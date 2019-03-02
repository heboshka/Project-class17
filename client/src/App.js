import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home'
import houses from './components/houses'
import houseItem from './components/houseItem'
import error from './components/error'
import addHouses from './components/addHouses';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/houses" component={houses}></Route>
            <Route exact path="/houses/:id" component={houseItem}></Route>
            <Route exact path="/contribute" component={addHouses}></Route>
            <Route component={error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
