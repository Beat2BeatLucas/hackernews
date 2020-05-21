import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
console.log(url);

const isSearched = searchTerm => item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase());


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    }

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({ 
      result: { ...this.state.result, hits: updatedHits } 
    });
  }

  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value,
    });
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  render() {
    const { result, searchTerm } = this.state;

    if(!result) { return null; }

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
          list={result.hits}
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