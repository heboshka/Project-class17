import React from 'react';
import error from '../error.jpg';

export default class Error extends React.Component {

  render() {


    return (
      <div className='main-page'>
        <h1>Sorry Wrong URL</h1>
        <img src={error} alt="error" />
      </div>
    )
  }
}