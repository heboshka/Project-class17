import React from 'react';
import Report from './Report';

export default class addHouses extends React.Component {

  state = {
    error: null,
    report: null
  }


  SubmitNewHouse = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/api/houses', {
      method: 'POST',
      body: this.dataInput.value,
      headers: { 'content-type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ error: data.error, report: data })
      }).catch((err) => {
        this.setState({ error: err.message });
      })
  }

  render() {
    const { error, report } = this.state;

    return (
      <div>
        <form onSubmit={this.SubmitNewHouse}>
          <textarea ref={input => this.dataInput = input}
            style={{
              width: '90%',
              height: '200px',
              display: 'block',
              margin: '10px',
            }}
          ></textarea>
          <br />
          {error && (<div>{error}</div>)}
          <br />
          <button type='submit'>Add New Houses</button>
          <br />
          <br />
          {!!report && <Report report={report} />}
        </form>
      </div>
    );
  }
}