import React from 'react';
import './App.css';
import CountryList from './country-list'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import SearchBar from './search-bar'

const initialState = {
  countryList: [],
  countryListFilter: [],
  searchFilter: ''
}

function reducer(state, action) {
  console.log(action)
  switch (action.type) {
    case 'SET_COUNTRY_LIST': {
      console.log('voy a actualizar la lista de paises')
      return { ...state, countryList: action.payload }
    }
    case 'FILTER_BY_SEARCH': {
      const searchFilter = action.payload
      console.log(state)
      if(searchFilter.length > 0) {
        const countryListFilter = state.countryList.filter((country) => {
          return country.name.toLowerCase().includes(searchFilter.toLowerCase());
        })
        return {...state, countryListFilter, searchFilter}
      }
      return {...state, countryListFilter: [], searchFilter: ''}

    }
    default: {
      return state
    }
  }
}

const store = createStore(reducer, initialState)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SearchBar />
        <CountryList />
      </div>
    </Provider>
  );
}

export default App;
