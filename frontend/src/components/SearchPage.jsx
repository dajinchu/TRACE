import React, { Component } from 'react';
import styled from 'styled-components';

const SearchPageContainer = styled.div`
  background-color: #B12E2A;
  height: 100vh;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 64px;
`;

const SearchPage = (props) => {
  return (
    <SearchPageContainer>
      <Title>
        Search
        Trace
      </Title>
    </SearchPageContainer>
  );
};

export default SearchPage;
