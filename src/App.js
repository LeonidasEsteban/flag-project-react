import React from 'react';
import './App.css';
import CountryList from './country-list'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer'
import ActionList from './action-list'
import Header from './header'
import CountryPage from './country-page'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

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
      <Router>
        <Header />
        <Switch>
          <Route path="/country/:id" component={CountryPage} />
          <Route path="/">
            <ActionList />
            <CountryList />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
