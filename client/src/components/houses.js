import React, { Component } from 'react';
import services from '../services/services'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

class Houses extends Component {
  state = {
    houses: [],
    loading: false,
    error: false,
    price: ''
  };


  componentDidMount() {
    this.setState({
      loading: true,
    });
    services.getHouseList()
      .then(houses =>
        this.setState({
          loading: false,
          houses: houses,
          error: false
        })).catch(() => {
          this.setState({ error: true, loading: false });
        })
  }

  onChange = (e) => {

    this.setState({ price: e.target.value });

  }

  addHouse = (e) => {
    const re = /^[0-9\b]+$/;
    if (this.state.price === '' || re.test(this.state.price)) {
      services.addHouse({
        'price': this.state.price
      })
        .then(item => {
          const newHouses = [...this.state.houses];
          newHouses.push({ id: item.id, price: item.price });
          this.setState({ houses: newHouses, loading: false });
        })
      e.preventDefault();
      this.setState({ price: '' })
    }
    else {
      alert('please enter valid price')
    }
  }


  render() {
    const { houses, loading, error } = this.state;
    const housesLIst = !error && houses.length > 0 ? houses.map(house => {
      return (
        <div key={house.id} className="Nav_link">
          <Link to={'/houses/' + house.id}>
            <div>House id:  {house.id}   ,   Price: {house.price}</div>
          </Link>
        </div>
      );
    }) : <h1>No houses yet </h1>

    return (
      <>
        <h1>Houses</h1>
        <div>
          {loading ? (
            <div> Loading houses please wait</div>
          ) :
            <div> {housesLIst}</div>
          }
          <form onSubmit={this.addHouse}>
            <input type='text' value={this.state.price} placeholder='Add price here' onChange={this.onChange} />
            <input type='submit' value='Add New House' />
          </form>
          <br></br>
          <NavLink className="Nav_link" to="/">Back to Home Page</NavLink>
        </div>
      </>
    );
  }
}

export default Houses;