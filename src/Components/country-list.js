import React from "react";
import styled from "styled-components";
import Country from "../country";

// Components
import InputComponent from "./input-component";

const CountryListStyled = styled.div`
  display: grid;
  grid-row-gap: 2.3em;
  background: var(--background);
  justify-content: center;
  padding: 4em 2em;
`;

const CountryList = ({ countries, send, state }) => {
  return (
    <CountryListStyled>
      <InputComponent send={send} />
      {state.matches("loading") && "Loading..."}
      {state.matches("failure")
        ? "Not Found"
        : countries.map(({ name, flag, population, capital, region }) => {
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
          })}
    </CountryListStyled>
  );
};

export default CountryList;
