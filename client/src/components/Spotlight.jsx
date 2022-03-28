import React from 'react';
import axios from 'axios';

class Spotlight extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.cow.length) {
      return (
        <div className='spotlight'>
          <h2>Name: {this.props.cow[0].name}</h2>
          <h3>Description: {this.props.cow[0].description}</h3>
          <button onClick={() => this.props.handleEdit(this.props.cow[0].name)}>Edit</button>
          <button onClick={() => this.props.handleDelete(this.props.cow[0].name)}>Delete</button>
        </div>
      );
    }

    return (
      <div className='spotlight'>
        <h2>Select a cow below to learn more about them!</h2>
      </div>
    );
  }
}

export default Spotlight;