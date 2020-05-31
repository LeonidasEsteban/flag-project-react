import React, { useEffect } from 'react'
import styled from 'styled-components'
import Country from './country'
import { useSelector, useDispatch } from 'react-redux'
import Wrapper from './wrapper'

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
  const dispatch = useDispatch()

  const countryListByName = useSelector((state) => state.countryListByName)

  const countryList = useSelector((state) => {
    if (state.filterByRegion !== '' && countryListByName.length === 0) {
      return state.coutryFilteredByRegion;
    }
    if (countryListByName.length > 0) {
      return countryListByName
    }

    return state.countryList;
  })

  console.log('el estado total de mi app es', countryList)
  // const [countryList, setCountryList] = useState([])
  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        return response.json()
      })
      .then((list) => {
        dispatch({
          type: 'SET_COUNTRY_LIST',
          payload: list
        })
        // setCountryList(data)
        console.log(list.length)
      })
      .catch(() => {
        console.log('hubo un error, que dolor que dolo que pena')
      })
  }, [dispatch])

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
