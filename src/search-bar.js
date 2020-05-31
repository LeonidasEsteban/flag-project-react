import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

const SearchBarStyled = styled.div`
`


function SearchBar() {
    const dispatch = useDispatch()
    const searchFilter = useSelector((state) => state.searchFilter)

    const onChangeSearch = (event) => {
        const value = event.target.value
        dispatch({
            type: 'FILTER_BY_SEARCH',
            payload: value
        })
    }

    return (
        <SearchBarStyled>
            <input type="text" onKeyUp={onChangeSearch} defaultValue={searchFilter}></input>
        </SearchBarStyled>
    )
}
export default SearchBar