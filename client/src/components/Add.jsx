import React from 'react';

class Add extends React.Component {
  constructor(props) {
    super(props);

    this.State = {
      name: '',
      description: ''
    }
  }

  handleChange(event) {
    console.log('handleChange', event.target.name, event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className='add-cow'>
        <input onChange={(e) => this.handleChange(e)} placeholder='cow name' name='name' />
        <input onChange={(e) => this.handleChange(e)} placeholder='cow description' name='description' />
        <div>
          <button onClick={() => this.props.handleAdd(this.state.name, this.state.description)}>Add</button>
        </div>
      </div>
    );
  }
}

export default Add;