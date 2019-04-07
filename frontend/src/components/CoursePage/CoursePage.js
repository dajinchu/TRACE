import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Professor from './Professor'
import { BACKEND_BASE_URL } from '../SearchPage/SearchPage'

const CoursePageContainer = styled.div`
  padding: 1em 14%;
`;

const NavHeader = styled.div`
  background-color: #B12E2A;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const HeaderText = styled.span`
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
  color: #fff;
  letter-spacing: .1em;
`;

const Header = styled.div`
  display: flex;
  align-items: last baseline;
  justify-content: space-between;
  padding: 40px 0;
`;

const Title = styled.h1`
  max-width: 50%;
  font-size: 48px;
  font-weight: 500;
  color: #fff;
`;

const CourseNumber = styled.h2`
  font-size: 28px;
  font-weight: 500;
  color: #fff;
`;

const CoursesTable = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  > *:not(:last-child) {
    margin-bottom: 15px;
  }
`;

const CoursePage = ({ UID }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`${BACKEND_BASE_URL}/course`).then(response => {
      response.json().then(response => {
        setData(response);
      });
    }).catch(error => {
      console.error(error)
    });
  }, [data]);


  return (
    <CoursePageContainer>
      <NavHeader>
        <StyledLink to="/"><HeaderText>SEARCH<br />TRACE.</HeaderText></StyledLink>
      </NavHeader>
      <Header>
        <Title>
          {(data || {}).name}
        </Title>
        <CourseNumber>
          {(data || {}).code}
        </CourseNumber>
      </Header>
      <CoursesTable>
        {((data || {}).profs || []).map(prof => {
          return (
            <Professor
              name={prof.name}
              key={prof.name}
              metrics={prof.semesters[0].metrics}
            />
          );
        })}
      </CoursesTable>
    </CoursePageContainer>
 );
};

export default CoursePage;