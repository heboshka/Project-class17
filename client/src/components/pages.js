import React from 'react';

export default class Pages extends React.Component {
  state = {
    page: 1,
    per_page: 2,
    total: 0,
    lastPage: 1
  }


  choosePage = (e) => {
    const pageChoosed = e.target.value;
    this.setState({ ...this.state, page: pageChoosed })
    this.props.onPageChoose(pageChoosed, e);
  }

  render() {
    const { page, per_page, total } = this.props;
    const pagesNum = Math.ceil(total / per_page);
    let pagesArray = [];
    for (let i = 1; i <= pagesNum; i++) {
      pagesArray.push(<button value={i} onClick={this.choosePage}>{i}</button>);
    }

    return (
      <div>
        {pagesArray}
      </div>
    );
  }
}
