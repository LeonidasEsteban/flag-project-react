// Modules
import React from "react";
import { useMachine } from "@xstate/react";

// Styles
import "./App.css";

// Components
import CountryList from "./Components/country-list";

// State machine
import { initialContext, countriesMachine } from "./Machines/countries";

const App = () => {
  const [state, send] = useMachine(
    countriesMachine.withContext({
      ...initialContext,
    })
  );
  const { countries, searchValue } = state.context;

  return (
    <div className="App">
      <CountryList
        searchValue={searchValue}
        send={send}
        countries={countries}
        state={state}
      />
    </div>
  );
};

export default App;
