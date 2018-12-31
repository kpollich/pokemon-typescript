import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
`;

const Header: React.FunctionComponent = () => (
  <Wrapper>Pokemon Type Matchup Checker</Wrapper>
);

export default Header;
