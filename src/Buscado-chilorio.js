import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Country from './country'
import { useSelector, useDispatch } from 'react-redux'

const CountryListStyled = styled.div`

`

function CountryList() {
  const [textBus, setTextBus] = useState('')
  const dispatch = useDispatch()
  const countryList = useSelector((state) => state.countryList)

  const bus = (e) => {
    setTextBus(e)
    let newData = ''
    let text = e.target.value
    newData = countryList.filter(function(item){
      
      const name = item.name.toUpperCase();
      const campo = name+" "
      const textData = text.toUpperCase();
      return campo.indexOf(textData) > -1
  })
  console.log(newData)
    dispatch({
      type: "BUSCADOR_CHILO",
      payload: newData
    })
  }
  // const [countryList, setCountryList] = useState([])

  return (
    <div>
      <input type="text"
        onChange={(e)=>bus(e)}
        name={textBus}
      />
    </div>
  )
}

export default CountryList
