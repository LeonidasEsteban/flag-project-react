import React, { useState, useEffect } from 'react';
import './App.css';
import CountryList from './country-list'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Server, Model } from "miragejs"
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

new Server({
  models: {
    country: Model,
  },

  seeds(server) {
    server.create("country", {
        "name": "Afghanistan",
        "topLevelDomain": [
          ".af"
        ],
        "alpha2Code": "AF",
        "alpha3Code": "AFG",
        "callingCodes": [
          "93"
        ],
        "capital": "Kabul",
        "altSpellings": [
          "AF",
          "Afġānistān"
        ],
        "region": "Asia",
        "subregion": "Southern Asia",
        "population": 27657145,
        "latlng": [
          33.0,
          65.0
        ],
        "demonym": "Afghan",
        "area": 652230.0,
        "gini": 27.8,
        "timezones": [
          "UTC+04:30"
        ],
        "borders": [
          "IRN",
          "PAK",
          "TKM",
          "UZB",
          "TJK",
          "CHN"
        ],
        "nativeName": "افغانستان",
        "numericCode": "004",
        "currencies": [
          {
            "code": "AFN",
            "name": "Afghan afghani",
            "symbol": "؋"
          }
        ],
        "languages": [
          {
            "iso639_1": "ps",
            "iso639_2": "pus",
            "name": "Pashto",
            "nativeName": "پښتو"
          },
          {
            "iso639_1": "uz",
            "iso639_2": "uzb",
            "name": "Uzbek",
            "nativeName": "Oʻzbek"
          },
          {
            "iso639_1": "tk",
            "iso639_2": "tuk",
            "name": "Turkmen",
            "nativeName": "Türkmen"
          }
        ],
        "translations": {
          "de": "Afghanistan",
          "es": "Afganistán",
          "fr": "Afghanistan",
          "ja": "アフガニスタン",
          "it": "Afghanistan",
          "br": "Afeganistão",
          "pt": "Afeganistão",
          "nl": "Afghanistan",
          "hr": "Afganistan",
          "fa": "افغانستان"
        },
        "flag": "https://restcountries.eu/data/afg.svg",
        "regionalBlocs": [
          {
            "acronym": "SAARC",
            "name": "South Asian Association for Regional Cooperation",
            "otherAcronyms": [

            ],
            "otherNames": [

            ]
          }
        ],
        "cioc": "AFG"
      })
  },
  routes() {
    this.get("https://restcountries.eu/rest/v2/all", (schema, request) => {
      return schema.countries.all();
    })
    this.patch("https://restcountries.eu/rest/v2/:id", (schema, request) => {
      const newAttrs = JSON.parse(request.requestBody);
      const id = request.params.id;
      const country = schema.countries.find(id);
      const updated = country.update({
        name: newAttrs
      });
      return updated;
    })
  },
})
function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [checked, setChecked] = useState(false)
  const mainClass = darkMode ? 'is-dark-mode' : 'is-light-mode'

  function changeMedia(mq) {
    setDarkMode(mq.matches)
    setChecked(mq.matches)
  }

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addListener(changeMedia)
    setDarkMode(mq.matches)
    setChecked(mq.matches)
    return () => {
      mq.removeListener(changeMedia)
    }
  }, [])
  return (
    <main className={mainClass}>
      <Provider store={store}>
        <Router>
          <Header setDarkMode={setDarkMode} darkMode={darkMode} />
          <Switch>
            <Route path="/country/:id" component={CountryPage} />
            <Route path="/">
              <ActionList />
              <CountryList />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </main>
  );
}

export default App;
