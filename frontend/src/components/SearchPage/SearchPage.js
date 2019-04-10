import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

import CourseItem from './CourseItem';
import ProfessorItem from './ProfessorItem';
import { useDebouncedEffect } from '../../utils/fetchingUtils';

export const BACKEND_BASE_URL = '/backend/api';
export const SEARCH_ITEM_TYPES = {
  PROF: 'prof',
  COURSE: 'course',
};

const SearchPageContainer = styled.div`
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 64px;
  letter-spacing: .1em;
  text-transform: uppercase;
  padding: 65px 14% 30px;
  line-height: normal;
  color: #fff;
`;

const SearchBarContainer = styled.div`
  margin: 20px 14%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchBar = styled.input`
  border: none;
  background-color: #C1423E;
  color: #fff;
  font-size: 2em;
  padding: .25em;
  border-radius: 5px;
  margin-left: 5px;
`;

const SearchItemsContainer = styled.div`
  margin: 50px 14%;
  > * {
    margin-bottom: 15px;
  }
`;

const Footer = styled.div`
  color: #fff;
  padding: 20px 14%;
`;

const GithubLink = styled.a`
  text-decoration: none;
  color: #fff;
`;

const SearchPage = (props) => {
  const [query, setQuery] = useState('');
  const [searchItems, setSearchItems] = useState([]);
  const { auth } = props;
  const authed = auth.isAuthenticated();

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      auth.login();
    }
  }, []);

  useDebouncedEffect(() => {
    const headers = new Headers();
    if (localStorage.getItem('access_token')) {
      headers.append('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    }
    fetch(
      `${BACKEND_BASE_URL}/search?q=${query}`, { headers },
    ).then((response) => {
      response.json().then((data) => {
        setSearchItems(data);
      });
    }).catch(error => console.error(error));
  }, [query], 200);

  const searchInput = useRef(null);

  const handleInitiateSearch = () => {
    const interval = setInterval(() => {
      if (searchInput.current != null) {
        searchInput.current.focus();
        clearInterval(interval);
      }
    }, 100);
  };
  
  useEffect(() => {
    handleInitiateSearch();
  }, []);

  return (
    <SearchPageContainer>
      <Title>
        SEARCH
        <br />
        TRACE.
      </Title>
      <SearchBarContainer>
        <FontAwesome
          name="search"
          size="3x"
          style={{
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '10px',
          }}
          onClick={handleInitiateSearch}
        />
        <SearchBar
          type="text"
          ref={searchInput}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

      </SearchBarContainer>
      <SearchItemsContainer>
        {searchItems.map((searchItem) => {
          if (searchItem.type === SEARCH_ITEM_TYPES.PROF) {
            return (
              <ProfessorItem
                key={searchItem.id}
                name={searchItem.name}
                metrics={searchItem.metrics}
                authed={authed}
              />
            );
          } if (searchItem.type === SEARCH_ITEM_TYPES.COURSE) {
            return (
              <CourseItem
                key={searchItem.UID}
                UID={searchItem.UID}
                name={searchItem.name}
                code={searchItem.code}
                professors={searchItem.profs}
                metrics={searchItem.metrics}
                authed={authed}
              />
            );
          } else {
            console.error(`Unrecognized search item type "${searchItem.type}".`)
            return null;
          }
        })}
      </SearchItemsContainer>
      <Footer>
        By
        {' '}
        <GithubLink href="github.com/dajinchu">Da-Jin</GithubLink>
,&nbsp;
        <GithubLink href="github.com/ryandrew14">Ryan</GithubLink>
,&nbsp;
        <GithubLink href="github.com/talusvyatsky">Tal</GithubLink>
, and&nbsp;
        <GithubLink href="github.com/sauhardar">Sauharda</GithubLink>
.
      </Footer>
    </SearchPageContainer>
  );
};

export default SearchPage;
