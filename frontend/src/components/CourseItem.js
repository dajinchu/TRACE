import React from 'react';
import styled from 'styled-components';

const CourseContainer = styled.div`
  display: grid;
  margin-top: 1em;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 10px;
  grid-template-rows: repeat(10, 1fr);
  width: 1017px;
  height: 390px;
  left: 203px;
  top: 630px;

  background: #F6F6F6;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`
const ItemType = styled.div`
margin: 10px;
grid-row: 1;
grid-column: 1;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: normal;
letter-spacing: 0.1em;
color: #000000;
`

const Line = styled.div`
  margin-top: 1em;
  margin-left: -1em;
  grid-row:1;
  grid-column: 2;
  width: 164px;
  height: 0px;
  left: 326px;
  top: 663px;
  border: 1px solid #000000;
`

const CourseTitle = styled.div`
  grid-column: 1/3;
  grid-row: 2;
  margin-top: 1em;  
  margin-left: 10px;
  width: 462px;
  height: 62px;
  left: 233px;
  top: 687px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: normal;

  color: #000000;
`
const CourseCode = styled.div`
  margin-left: 10px;
  grid-column: 1;
  grid-row: 3;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: normal;
  letter-spacing: 0.05em;

  color: #828282;
`
const ProfessorRatings = styled.div`
  position: absolute;
  width: 650px;
  height: 320px;
  left: 540px;
  top: 652px;

  background: #E5E5E5;
  border-radius: 5px;
`

const CourseItem = ({ name, code, professors }) => {
  return (
    <CourseContainer>
      <ItemType>
        COURSE
      </ItemType>
      <Line />
      <CourseTitle>
        {name}
      </CourseTitle>
      <CourseCode>
        {code}
      </CourseCode>
      <ProfessorRatings />
    </CourseContainer>
  );
}

export default CourseItem;