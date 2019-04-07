import React from 'react';
import FontAwesome from 'react-fontawesome'
import styled from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';

const ProfessorItemContainer = styled.div`
  background-color: #F7F7F7;
  border-radius: 5px;
  padding: 20px 30px;
`;

const Column = styled.div`
  max-width: 33%;
`;

const Header = styled.h1`
  font-size: 18px;
  letter-spacing: .1em;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderLine = styled.hr`
  border: none;
  border-bottom: 2px solid #A3874A;
  margin-left: 10px;
  width: 80%;
`;

const TitleText = styled.span`
`;

const ProfessorInfo = styled.div`
  font-size: 14px;
  margin: 10px 0;

`;

const ProfessorName = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
`;

const ProfessorItem = ({ name, email, homepage, metrics }) => {
  return (
    <ProfessorItemContainer>
      <Column>
        <Header>
          <TitleText>
            PROFESSOR
        </TitleText>
          <HeaderLine />
        </Header>
        <ProfessorName>
          {name}
        </ProfessorName>
        <ProfessorInfo>
          <a href={`mailto:${email}`}>
            <FontAwesome name='reply' style={{
              marginRight: '10px',
              color: '#A3874A',
            }}/>
          </a>
          {email}
        </ProfessorInfo>
        <ProfessorInfo>
          <a href={`${homepage}`}>
            <FontAwesome name='globe' style={{
              marginRight: '10px',
              width: '14px',
              color: '#A3874A',
            }}/>
          </a>
          {homepage}
        </ProfessorInfo>
      </Column>
    </ProfessorItemContainer>
  )
};

export default ProfessorItem;