import React, { useEffect, useState, useReducer } from 'react'
import styled from 'styled-components'
import Country from './country'
import { useSelector, useDispatch } from 'react-redux'

const CountryListStyled = styled.div`
  display: grid;
  grid-row-gap: 2.3em;
  /* grid-template-columns: 1fr 1fr 1fr; */
  background: var(--background);
  justify-content: center;
  border: 1px solid red;
  padding: 4em 2em;
`
const CountryListStyledDark = styled.div`
  display: grid;
  grid-row-gap: 2.3em;
  /* grid-template-columns: 1fr 1fr 1fr; */
  background: var(--backgound-dark);
  justify-content: center;
  border: 1px solid red;
  padding: 4em 2em;
  color:var(--white)
`
function CountryList() {
  const dispatch = useDispatch()
  const countryList = useSelector((state) => state.countryList)
  const countryListFiltered = useSelector((state) => state.countryListByName)
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
  let handlerFilter = (e) =>{
    dispatch({
      type:'GET_COUNTRY',
      payload:e.target.value
    })
    console.log(countryListFiltered)
  }
  return (
    <CountryListStyledDark>
      <input type="text" onChange={handlerFilter}></input>
      {
        (countryListFiltered) && countryListFiltered.map(({ name, flag, population, capital, region, }) => {
          return (
            <Country
              flag={flag}
              name={name}
              key={name}
              population={population}
              region={region}
              capital={capital}
            />
          )
        })
      }
    </CountryListStyledDark>
  )
}

export default CountryList
