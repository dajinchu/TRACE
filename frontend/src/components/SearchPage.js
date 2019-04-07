import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CourseItem from './CourseItem'

export const BACKEND_BASE_URL = 'https://trace.dajinchu.now.sh/backend/api';
export const SEARCH_ITEM_TYPES = {
  PROF: 'prof',
  COURSE: 'course',
}

const SearchPageContainer = styled.div`
  background-color: #B12E2A;
  height: 100vh;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 64px;
  letter-spacing: .1em;
  text-transform: uppercase;
  padding: 65px 14%;
  line-height: normal;
  color: #fff;
`;

const SearchBar = styled.input`
  
`;

const SearchItemsContainer = styled.div`
  margin: 50px 20%;
`;

const SearchPage = (props) => {
  const [query, setQuery] = useState('');
  const [searchItems, setSearchItems] = useState([])

  useEffect(() => {
    fetch(
      `${BACKEND_BASE_URL}/search?q=${query}`,
    ).then(response => {
      response.json().then((data) => {
        setSearchItems(data);
      });
    }).catch(error => console.error(error));
    
    console.log(searchItems)
  }, [query]);

  return (
    <SearchPageContainer>
      <Title>
        SEARCH<br/>TRACE.
      </Title>
      <SearchBar
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <SearchItemsContainer>
        {searchItems.map(searchItem => {
          if (searchItem.type === SEARCH_ITEM_TYPES.PROF) {
            return null; // PROFITEM
          } else if (searchItem.type === SEARCH_ITEM_TYPES.COURSE) {
            return (
              <CourseItem 
                name={searchItem.name}
                code={searchItem.code}
                professors={searchItem.profs}
              />
            ); // COURSEITEM
          } else {
            console.error(`Unrecognized search item type "${searchItem.type}".`)
            return null;
          }
        })}
      </SearchItemsContainer>
    </SearchPageContainer>
  );
};

export default SearchPage;
