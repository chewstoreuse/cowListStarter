import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import Add from './Add.jsx';
import Spotlight from './Spotlight.jsx';
import CowList from './CowList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cows: [],
      spotlight: []
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.onSpotlightClick = this.onSpotlightClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.get('/getCows')
      .then(response => {
        this.setState({
          cows: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSearch(name) {
    console.log(name);
    axios.get(`/findCow?name=${name}`)
      .then(cow => {
        console.log(cow);
        this.setState({
          cows: cow.data
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleAdd(name, description) {
    axios.post('/addCow', {
      name: name,
      description: description
    })
      .then(response => {
        return axios.get('/getCows');
      })
      .then(cows => {
        this.setState({
          cows: cows.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onSpotlightClick(name) {
    axios.get(`/findCow?name=${name}`)
      .then(cow => {
        // console.log(cow.data);
        this.setState({
          spotlight: cow.data
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleEdit(name) {
    let newDescription = prompt(`What is the new description for ${name}?`);
    axios.put(`/editCow?name=${name}&description=${newDescription}`)
      .then(response => {
        return axios.get('/getCows');
      })
      .then(cows => {
        this.setState({
          cows: cows.data
        });
      })
      .then(response => {
        this.onSpotlightClick(name);
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleDelete(name) {
    // console.log(name)
    axios.delete('/deleteCow', {
      data: { name: name }
    })
      .then(response => {
        return axios.get('/getCows');
      })
      .then(cows => {
        this.setState({
          cows: cows.data,
          spotlight: []
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <h1>The Infamous, Cow List!</h1>
        <Search handleSearch={this.handleSearch} />
        <Add handleAdd={this.handleAdd} />
        <Spotlight cow={this.state.spotlight} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
        <CowList cows={this.state.cows} onSpotlightClick={this.onSpotlightClick} />
      </div>
    );
  }
}

export default App;