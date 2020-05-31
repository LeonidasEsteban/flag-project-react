import React from 'react';
import './App.css';
import CountryList from './country-list'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const initialState = {
  countryList: [],
  countryListByName:[]
}

function reducer(state, action) {
  console.log(action)
  switch (action.type) {
    case 'SET_COUNTRY_LIST': {
      console.log('voy a actualizar la lista de paises')
      return { ...state, countryList: action.payload }
    }
    case 'GET_COUNTRY':
      let countryListByName =state.countryList.filter((country)=>{
        return country.name.startsWith(action.payload)
      })
      return{...state,countryListByName}
    case 'GET_COUNTRIES_BY_REGION':
      let countryListByRegion =state.countryList.filter((country)=>{
        return country.region === action.payload
      })
      return{...state,countryListByRegion}
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
