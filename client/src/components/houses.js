import React, { Component } from 'react';
import services from '../services/services'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


class Houses extends Component {
  state = {
    houses: [],
    loading: false,
    error: false,
    SearchCriteria: {
      max_price: 100000000,
      min_price: 0,
      location_country: "",
      location_city: "",
      room_num: 1,
      living_area: 5,
      order: 'price_value_asc',
      page: 1,
    },
    price_value: '',
    total: '',
    per_page: ''
  };


  componentDidMount() {
    this.setState({
      loading: true,
    });
    services.getHouseList()
      .then(({ housesList, total }) =>
        this.setState({
          loading: false,
          houses: housesList,
          total: total,
          error: false
        })).catch(() => {
          this.setState({ error: true, loading: false });
        })
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      SearchCriteria: {
        ...this.state.SearchCriteria,
        [name]: value
      }
    });
  }

  onFilterHouses = (e) => {
    const { SearchCriteria } = this.state;

    const queryString = Object.keys(SearchCriteria)
      .reduce((query, field) => {
        const value = SearchCriteria[field];
        if (value !== null && value !== '') {
          query.push(`${field}=${encodeURI(value)}`);
        }
        return query;
      }, [])
      .join('&');

    // const queryString1 = encodeURIComponent(JSON.stringify(SearchCriteria))
    // console.log(queryString1)

    this.props.history.push(this.props.location.pathname + '?' + queryString);

    this.setState({
      loading: true,
    });
    services.filterHouseList(queryString)
      .then(({ housesList, total, per_page }) => {
        console.log(total)
        this.setState({
          loading: false,
          houses: housesList,
          total: total,
          per_page: per_page,
          error: false
        })
      }).catch(() => {
        this.setState({ error: true, loading: false });
      })
    e.preventDefault();
  }


  render() {
    const { houses, loading, error, total } = this.state;


    const housesLIst = !error && houses.length > 0 ? houses.map(house => {
      return (
        <div key={house.id} className="Nav_link">
          <Link to={'/houses/' + house.id}>
            <div>House id:  {house.id}   ,   Price: {house.price_value} , country : {house.location_country},
             city : {house.location_city}
            </div>
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
          <form onSubmit={this.onFilterHouses}>
            price:
            <br></br>
            from:
            <input type='text' name="min_price" value={this.state.SearchCriteria.min_price} placeholder='minimum price' onChange={this.onChange} />
            <br></br>
            to:
            <input type='text' name="max_price" value={this.state.SearchCriteria.max_price} placeholder='maximum price ' onChange={this.onChange} />
            <br></br>
            country:
            <br></br>
            <input type='text' name="location_country" value={this.state.SearchCriteria.country} placeholder='country' onChange={this.onChange} />
            <br></br>
            city:
            <br></br>
            <input type='text' name="location_city" value={this.state.SearchCriteria.city} placeholder='city' onChange={this.onChange} />
            <br></br>
            rooms number:
            <br></br>
            <input type='text' name="room_num" value={this.state.SearchCriteria.room_num} placeholder='room_num' onChange={this.onChange} />
            <br></br>
            living area size:
            <br></br>
            <input type='text' name="living_area" value={this.state.SearchCriteria.living_area} placeholder='living area size' onChange={this.onChange} />
            <br></br>
            <select name="order" value={this.state.SearchCriteria.order} onChange={this.onChange}>
              <option value="price_value_asc"> Price Asc </option>
              <option value="price_value_desc"> Price Desc </option>
              <option value="location_country_asc"> country Name Asc </option>
              <option value="location_country_asc"> country Name Asc </option>
            </select>
            <br></br>
            <input type='submit' value='filter' />
          </form>
          <br></br>

          <NavLink className="Nav_link" to="/">Back to Home Page</NavLink>
        </div>
      </>
    );
  }
}

export default Houses;