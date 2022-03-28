import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cow: ''
    }
  }

  onChange(event) {
    this.setState({
      cow: event.target.value
    });
  }

  render() {
    return (
      <div>
        <input onChange={(e) => this.onChange(e)} placeholder='search...' />
        <button onClick={() => this.props.handleSearch(this.state.cow)}>Search</button>
      </div>
    );
  }
}

export default Search;