import React from "react";
import styled from "styled-components";
import Country from "./country";
import { useMachine } from "@xstate/react";

// State machine
import countriesMachine from "./Machines/countries";

const CountryListStyled = styled.div`
  display: grid;
  grid-row-gap: 2.3em;
  /* grid-template-columns: 1fr 1fr 1fr; */
  background: var(--background);
  justify-content: center;
  border: 1px solid red;
  padding: 4em 2em;
`;

const CountryList = () => {
  const [state, send] = useMachine(countriesMachine.withContext());
  const { countries } = state.context;

  return (
    <CountryListStyled>
      {state.matches("loading") ? (
        <p>Loading..</p>
      ) : (
        countries.map(({ name, flag, population, capital, region }) => {
          return (
            <Country
              flag={flag}
              name={name}
              key={name}
              population={population}
              region={region}
              capital={capital}
            />
          );
        })
      )}
    </CountryListStyled>
  );
};

export default CountryList;
