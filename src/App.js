import React from 'react';
import './App.css';
import CountryList from './country-list'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const initialState = {
  countryList: [],
  filteredCountryList : []
}

function reducer(state, action) {
  console.log(action)
  switch (action.type) {
    case 'SET_COUNTRY_LIST': {
      console.log('voy a actualizar la lista de paises')
      return { ...state, countryList: action.payload, filteredCountryList: action.payload }
    }
    case 'FILTER_BY_NAME': {
      let countryListByName = state.countryList.filter(country => country.name.includes(action.payload))
      return { ...state, filteredCountryList: countryListByName }
    }
    case 'FILTER_BY_REGION': {
      let countryListByRegion = state.countryList.filter(country => country.region === action.payload)
      return { ...state, filteredCountryList: countryListByRegion }
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
        <CountryList />
      </div>
    </Provider>
  );
}

export default App;
