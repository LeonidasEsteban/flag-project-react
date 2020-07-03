import React, { useEffect } from 'react'
import styled from 'styled-components'
import Country from './country'
import Wrapper from './wrapper'
import useStore from './store';

const CountryListStyled = styled.div`
  display: grid;
  grid-row-gap: 2.3em;
  grid-auto-flow: columns;
  grid-column-gap: 66px;
  grid-template-columns: repeat(auto-fill, 270px);
  background: var(--background);
  justify-content: center;
  padding: 3em 0;
`

function CountryList() {
  const { filteredCountries: countryList, fetchCountryList } = useStore();

  console.log('el estado total de mi app es', countryList)
  // const [countryList, setCountryList] = useState([])

  useEffect(() => {
    fetchCountryList();
  }, [])

  return (
    <Wrapper>
      <CountryListStyled>
        {
          countryList.map(({ name, flag, population, capital, region, nativeName, cioc, alpha2Code }) => {
            return (
              <Country
                flag={flag}
                name={name}
                key={name}
                population={population}
                region={region}
                capital={capital}
                nativeName={nativeName}
                cioc={cioc}
                alpha2Code={alpha2Code}
              />
            )
          })
        }
      </CountryListStyled>
    </Wrapper>
  )
}

export default CountryList
