import React from 'react';
import './App.css';
import CountryList from './country-list'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const initialState = {
  countryList: [],
  countryListByName: []
}

function reducer(state, action) {
  console.log(action)
  switch (action.type) {
    case 'SET_COUNTRY_LIST': {
      console.log('voy a actualizar la lista de paises')
      return { ...state, countryList: action.payload }
    }
    case 'SET_COUNTRY_BY_NAME': {
      const countryListByName = (state.countryList || [])
      .filter(country => country.name.toLowerCase().includes(action.payload.toLowerCase()))
      return {...state, countryListByName }
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
