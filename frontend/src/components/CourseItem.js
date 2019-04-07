import React from 'react';
import styled from 'styled-components';
import CollegeTag from './CollegeTag';

const CourseContainer = styled.div`
  display: grid;
  margin-top: 1em;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 10px;
  grid-template-rows: repeat(10, 1fr);
  width: 1017px;
  height: 390px;

  background: #F6F6F6;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;
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
`;

const Line = styled.div`
  margin-top: 1.2em;
  margin-left: -1em;
  grid-row:1;
  grid-column: 2;
  width: 164px;
  height: 0px;
  left: 326px;
  top: 663px;
  border: 0.2px solid #000000;
`;
const CourseTitle = styled.div`
  grid-column: 1/3;
  grid-row: 1/2;
  margin-top: 1.5em;  
  margin-left: 10px;
  max-width: 462px;
  height: 62px;
  left: 233px;
  top: 687px;
  font-size: 32px;
  line-height: normal;
  color: #000000;
`
const CourseCode = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  grid-column: 1;
  grid-row: 2;
  font-size: 14px;
  line-height: normal;
  letter-spacing: 0.05em;
  color: #828282;
`
const ProfessorRatings = styled.div`
  grid-row: 1/10;
  grid-column: 7/8;
  margin: 1em;
  width: 630px;
  height: 320px;
  left: 540px;
  top: 652px;

  background: #E5E5E5;
  border-radius: 5px;
`;
const InnerProfRatings = styled.div`
  
`;

const ProfessorTable = styled.table`
  table-layout: fixed;
  width: 90%;
  height: 100%;
  border-collapse: collapse;
  border: 0px;
`

const ProfessorCol = styled.th`
  text-align: left;
  width: 50%;
  padding: 1em 0em 0em 1.3em;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: normal;
  letter-spacing: 0.1em;
  color: #000000;
`;
const EachProf = styled.th`
  text-align: left;
  width: 70%;
  padding: 1em 0em 0em 1em;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: normal;
`;
const TableHead = styled.th`
  font-size: 18px;
  line-height: normal;
  letter-spacing: 0.1em;
  text-align: right;
`;

const TableDetail = styled.td`
  color: ${(props) => (props.value>0) ? '#368D20' : (props.value<0) ? "#8D2720" : "black"};
  text-align: right;
  padding-right: 12px;
`;

const CourseItem = ({ name, code, professors, collegeTag }) => {
  
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
      <CollegeTag>
        {collegeTag}
      </CollegeTag>
      <ProfessorRatings>
        <InnerProfRatings>
          <ProfessorTable>
            <thead>
              <tr>
                <ProfessorCol>PROFESSOR</ProfessorCol>
                <TableHead>AVG</TableHead>
                <TableHead>LRN</TableHead>
                <TableHead>DIF</TableHead>
              </tr>
            </thead>
            <tbody>
                {professors.map((prof) =>
                <tr>
                  <EachProf>{prof.name}</EachProf>
                  <TableDetail value={prof.effectiveness}>{(prof.effectiveness>0) ? "+" + prof.effectiveness : (prof.effectiveness<0) ? "-" + prof.effectiveness : prof.effectiveness}</TableDetail>
                  <TableDetail value={prof.personality}>{(prof.personality>0) ? "+" + prof.personality : (prof.personality<0) ? "-" + prof.effectiveness : prof.effectiveness}</TableDetail>
                  <TableDetail value={prof.challenge}>{(prof.challenge>0) ? "+" + prof.challenge : (prof.challenge<0) ? "-" + prof.challenge : prof.challenge}</TableDetail>
                </tr>
                )}
            </tbody>
          </ProfessorTable>
        </InnerProfRatings>
      </ProfessorRatings>
    </CourseContainer>
  );
}

export default CourseItem;