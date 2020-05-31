import React from 'react'
import styled from 'styled-components'
import Search from './search'
import { Region as FilterByRegion } from './Region'
import Wrapper from './wrapper'

const ActionListStyled = styled.div`
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 40px;
  }
`

function ActionList() {
  return (
    <ActionListStyled>
      <Wrapper>
        <div className="grid">
          <Search />
          <FilterByRegion />
        </div>
      </Wrapper>
    </ActionListStyled>
  )
}

export default ActionList
