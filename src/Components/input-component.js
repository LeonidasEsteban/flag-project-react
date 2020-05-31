import React from "react";
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 35px;
  outline: 0
`;

const InputComponent = ({ send, ...input }) => {
  const handleChange = (event) => {
    send("UPDATE_SEARCH", {
      search: event.target.value
    });
  };
  return <Input onChange={handleChange} placeholder="Search..." {...input} />;
};

export default InputComponent;
