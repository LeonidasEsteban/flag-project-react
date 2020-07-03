import React, { useState, useEffect } from 'react';
import './App.css';
import CountryList from './country-list'
import ActionList from './action-list'
import Header from './header'
import CountryPage from './country-page'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'


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
    </main>
  );
}

export default App;
