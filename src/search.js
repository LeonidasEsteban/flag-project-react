import React, { useState } from 'react'
import styled from 'styled-components'
import Input from './input'
import useStore from "./store";

const SearchStyled = styled.div`
  display: flex;
  position: relative;
  .close {
    position: absolute;
    right: 1em;
    top: 1em;
    border-radius: 50%;
    border: none;
    box-shadow: 0 2px 9px 0 rgba(0,0,0,.05);
  }
`

function Search() {
  const { filterByName: filterByNameAction } = useStore();
  const [inputValue, setInputValue] = useState('')

  const filterByName = (e) => {
    const { value } = e.target;
    setInputValue(value)
    filterByNameAction(value)
  }
  const clearInput = () => {
    setInputValue('')
    filterByNameAction('')
  }
  return (
    <SearchStyled>
      {
        inputValue &&
        <i className="fas fa-times close" onClick={clearInput}></i>
      }
      <Input placeholder="Search for a country..." value={inputValue} onChange={filterByName} />
    </SearchStyled>
  )
}

export default Search
