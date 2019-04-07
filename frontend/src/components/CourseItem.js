import React from 'react';
import styled from 'styled-components';

const CourseContainer = styled.div`
  margin-top: 1em;
  display: flex;
  background: #F7F7F7;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;

const Column = styled.div`
  max-width: 33%;
  min-width: 33%;
  padding-left: 30px;
  flex-grow: 1;
`;

const Header = styled.h1`
  padding: 20px 0;
  font-size: 18px;
  letter-spacing: .1em;
  display: flex;
  align-items: center;
`;

const ItemType = styled.div`
  font-size: 18px;
  line-height: normal;
  letter-spacing: 0.1em;
  color: #000000;
`;

const CourseTitle = styled.div`
  font-size: 32px;
  line-height: normal;
  color: #000000;
  max-width: 70%;
`
const CourseCode = styled.div`
  margin: 10px 0px;
  font-size: 14px;
  line-height: normal;
  letter-spacing: 0.05em;
  color: #828282;
`;

const ProfessorRatings = styled.div`
  margin: 1em;
  background: #E5E5E5;
  border-radius: 5px;
`;

const HeaderLine = styled.hr`
  border: none;
  border-bottom: 2px solid #A3874A;
  margin-left: 10px;
  width: 80%;
`;

const InnerProfRatings = styled.div`
  
`;

const ProfessorTable = styled.table`
  table-layout: fixed;
  width: 90%;
  height: 100%;
  border-collapse: collapse;
  border: 0px;
  > tbody {
    > tr {
      > th {
        padding: 0 1em .7em;
      }
    }
  } 
`

const ProfessorCol = styled.th`
  text-align: left;
  width: 50%;
  padding: 1em 0em 1em 1.3em;
  font-size: 18px;
  line-height: normal;
  letter-spacing: 0.1em;
  color: #000000;
`;

const EachProf = styled.th`
  text-align: left;
  width: 70%;
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
  color: ${(props) => (props.value > 0) ? '#368D20' : (props.value < 0) ? "#8D2720" : "black"};
  text-align: right;
  padding-right: 12px;
  min-height: 40px;
`;

const CourseItem = ({ name, code, professors, collegeTag }) => {

  return (
    <CourseContainer>
      <Column>
        <Header>
          <ItemType>
            COURSE
        </ItemType>
          <HeaderLine />
        </Header>

        <CourseTitle>
          {name}
        </CourseTitle>
        <CourseCode>
          {code}
        </CourseCode>

      </Column>
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
                  <TableDetail value={prof.effectiveness}>{(prof.effectiveness > 0) ? "+" + prof.effectiveness : (prof.effectiveness < 0) ? "-" + prof.effectiveness : prof.effectiveness}</TableDetail>
                  <TableDetail value={prof.personality}>{(prof.personality > 0) ? "+" + prof.personality : (prof.personality < 0) ? "-" + prof.effectiveness : prof.effectiveness}</TableDetail>
                  <TableDetail value={prof.challenge}>{(prof.challenge > 0) ? "+" + prof.challenge : (prof.challenge < 0) ? "-" + prof.challenge : prof.challenge}</TableDetail>
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