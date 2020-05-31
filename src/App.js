import React from 'react';
import './App.css';
import CountryList from './country-list'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer'
import ActionList from './action-list'
import Header from './header'

const initialState = {
  countryList: [],
  countryListByName: [],
  coutryFilteredByRegion: [],
  filterByRegion: '',

}

const store = createStore(reducer, initialState)

function App() {
  return (
    <Provider store={store}>
      <Header />
      <ActionList />
      <CountryList />
    </Provider>
  );
}

export default App;
