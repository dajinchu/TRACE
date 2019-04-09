import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Professor from './Professor';
import { BACKEND_BASE_URL } from '../SearchPage/SearchPage';
// App.js

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

const ProfessorItemContainer = styled.div`
  display: flex;
  justify-content: space-around;
  > *:not(:last-child) {
    border-right: 1px solid #000;
  }
`;

const CommentHeader = styled.h1`
  font-size: 24px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Info = styled.div`
  background-color: #F7F7F7;
  border-radius: 5px;
  padding: 20px 30px;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.5);
  margin-bottom: 13px;
`;

const CommentBlurb = styled.div`
  flex-grow: 1;
  text-align: center;
`;

const CoursePage = (props) => {
  const [data, setData] = useState({});

  const { auth } = props;

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      auth.login();
    }
  });

  useEffect(() => {
    const headers = new Headers();
    if (localStorage.getItem('access_token')) {
      headers.append('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    }
    fetch(
      `${BACKEND_BASE_URL}/course?id=${props.match.params.UID}`, { headers },
    ).then((response) => {
      response.json().then((response) => {
        setData(response);
      });
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <CoursePageContainer>
      <NavHeader>
        <StyledLink to="/">
          <HeaderText>
SEARCH
            <br />
TRACE.
          </HeaderText>

        </StyledLink>
      </NavHeader>
      <Header>
        <Title>
          {(data || {}).name}
        </Title>
        <CourseNumber>
          {(data || {}).code}
        </CourseNumber>
      </Header>
      <Info>
        <CommentHeader>
          Course Comments
        </CommentHeader>
        <ProfessorItemContainer>
          {(data.comments || []).map(comment => {
            return (
              <CommentBlurb key={comment}>
                {`"${comment}"`}
              </CommentBlurb>
            )
          })}
        </ProfessorItemContainer>
      </Info>
      <CoursesTable>
        {((data || {}).profs || []).map(prof => (
          <Professor
            name={prof.name}
            key={prof.name}
            metrics={prof.metrics}
          />
        ))}
      </CoursesTable>
    </CoursePageContainer>
  );
};

export default CoursePage;
