import React, { Component } from 'react';
import services from '../services/services'
import { NavLink } from 'react-router-dom';

class HouseItem extends Component {
  state = {
    house: '',
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    services.getHouseById(id)
      .then(item =>
        this.setState({
          house: item,
        }),
      );
  }

  render() {
    const selectedHouse = this.state.house ? (
      <div>
        <div>House id:  {this.state.house.id} , House Price: {this.state.house.price}</div>
      </div>
    ) : (
        <h1> No house with this ID</h1>
      );
    return <div>
      <h1>The House you choose </h1>
      {selectedHouse}
      <br></br>
      <NavLink className="Nav_link" to="/">Back to Home Page</NavLink>
    </div>;
  }
}

export default HouseItem;