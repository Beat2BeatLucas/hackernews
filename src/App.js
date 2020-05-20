import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org',
    author: 'Jordan Walke',
    num_coments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org',
    author: 'Dan Abramov, Andrew Clark',
    num_coments: 2,
    points: 5,
    objectID: 1,
  }
];

const isSearched = searchTerm => item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase());


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      list,
      searchTerm: '',
    }

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value,
    });
  }

  render() {
    const { list, searchTerm } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
        </div>
        <Table 
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

export default App;

const Search= ({ value, onChange, children }) =>
  <form>
    {children} <input 
        type="text"
        value={value}
        onChange={onChange} 
      />
      
    </form>



const Table= ({ list, pattern, onDismiss }) => 
  <div className="table">
    { list.filter(isSearched(pattern)).map(item => 
        <div key={item.objectID} className="table-row">
          <span style={{ width: '40%'}}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={{ width: '30%'}}>
            {item.author}
          </span>
          <span style={{ width: '10%'}}>
            {item.num_coments}
          </span>
          <span style={{ width: '10%'}}>
            {item.points}
          </span>
          <span style={{ width: '10%'}}>
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
    )}
  </div>


class Button extends Component {
  render() {
    const { 
      onClick, 
      className='', 
      children 
    } = this.props;
    
      return (
        <button
          type="button"
          onClick={onClick}
          className={className}
        >
          {children}
        </button>
      );
  }
}