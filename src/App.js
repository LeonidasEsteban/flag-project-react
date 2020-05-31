import React from 'react';
import './App.css';
import CountryList from './country-list'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const initialState = {
  countryList: [],
  countryListByName: {},
  countryListByRegion: []
}

function reducer(state, action) {
  console.log(action)
  switch (action.type) {
    case 'SET_COUNTRY_LIST': {
      console.log('voy a actualizar la lista de paises')
      return { ...state, countryList: action.payload }
    }
    case 'GET_COUNTRY_BY_NAME': {
      console.log('voy a buscar un pais')
      return {
        ...state,
        countryListByName: state.countryList.filter(country => country.name === action.payload)[0]
      }
    }
    case 'GET_COUNTRIES_BY_REGION': {
      console.log('voy a buscar los paises de una region')
      return {
        ...state,
        countryListByRegion: state.countryList.filter(country => country.region === action.payload)
      }
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
