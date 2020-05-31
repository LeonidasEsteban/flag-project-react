import React from 'react'
import styled from 'styled-components'

const WrapperStyled = styled.div`
  max-width: 1312px;
  margin: auto;
  padding: 0 1rem;
`

function Wrapper({ children }) {
  return (
    <WrapperStyled>
      {children}
    </WrapperStyled>
  )
}

export default Wrapper
