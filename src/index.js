import React from 'react';
import radium from 'radium';

const styles = {
  container: {
    background: '#F5F5F5',
    borderRadius: 5,
    padding: 25,
    width: 400,
    fontFamily: 'sans-serif',
  },
  highlight: {
    background: '#FBFFB9',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: 20,
    paddingRight: 20,
  },
  li: {
    cursor: 'pointer',
    margin: '15px 0',
  },
  input: {
    width: '100%',
    height: 35,
    borderRadius: 20,
    border: 'none',
    paddingLeft: 20,
    paddingRight: 20,
    boxSizing: 'border-box',
    fontSize: '1.25rem',
    ':focus': {
      outline: 'none',
    },
  },
  divider: {
    height: 1,
    width: '100%',
    background: '#e0e0e0',
    margin: '15px 0',
  },
};

const Divider = <div style={styles.divider}></div>;

class Typeahead extends React.Component {
  constructor(props) {
    super(props);

    this._onSearchUpdate = this._onSearchUpdate.bind(this);
    this._onClick = this._onClick.bind(this);

    this.state = {
      searchVal: props.initialSearchVal,
    };
  }

  _onSearchUpdate(evt) {
    const newSearchVal = evt.target.value;

    this.setState({
      searchVal: newSearchVal,
    });
  }

  _onClick(val) {
    return () => {
      this.setState({
        searchVal: val,
      });
    };
  }

  render() {
    const { list, showOnEmpty } = this.props;
    const { searchVal } = this.state;

    const filter =
      (val) => {
        return searchVal ? val.toLowerCase().startsWith(searchVal.toLowerCase()) : showOnEmpty;
      };

    const map = (val, i, arr) => {
      let divider = i < arr.length - 1 && Divider;
      return (
        <li
          onClick={this._onClick(val)}
          style={styles.li}
        >

          <span style={styles.highlight}>
            {val.substr(0, searchVal.length)}
          </span>
          {val.substr(searchVal.length)}
          {divider}
        </li>
      );
    };

    const results = list.filter(filter).map(map);

    const resultsElem =
      results.length > 0 || !searchVal
      ? (
        <ul style={styles.list}>
          { results }
        </ul>
      )
      : (<span>Sorry, no matching results.</span>);

    return (
      <div style={styles.container}>
        <input
          type="text"
          placeholder="Search"
          style={styles.input}
          value={this.state.searchVal}
          onChange={this._onSearchUpdate}
        />
        <ul style={styles.list}>
          { resultsElem }
        </ul>
      </div>
    );
  }
}

Typeahead.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  initialSearchVal: React.PropTypes.string,
  showOnEmpty: React.PropTypes.bool,
};

Typeahead.defaultProps = {
  list: [],
  initialSearchVal: '',
  showOnEmpty: false,
};

export default radium(Typeahead);
