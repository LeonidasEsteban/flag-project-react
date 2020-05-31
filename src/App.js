import React from "react";
import "./App.css";
import CountryList from "./country-list";
import { Provider } from "react-redux";
import { createStore } from "redux";

const initialState = {
  countryList: [],
  countryListRegion: [],
};

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "SET_COUNTRY_LIST": {
      console.log("voy a actualizar la lista de paises");
      return { ...state, countryList: action.payload };
    }
    case "GET_COUNTRY_LIST_REGION": {
      let newCountryList = state.countryList;
      let countryListRegion = newCountryList.filter(
        (item) => item.region === action.payload
      );
      return { ...state, countryListRegion: countryListRegion };
    }
    default: {
      return state;
    }
  }
}

const store = createStore(reducer, initialState);

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
