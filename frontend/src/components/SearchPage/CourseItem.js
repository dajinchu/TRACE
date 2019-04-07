import React from 'react';
import FA from 'react-fontawesome';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-bottom: 15px;
`;

const CourseContainer = styled.div`
  padding: 20px 30px;
  display: flex;
  background: #F7F7F7;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;

const Column = styled.div`
  max-width: 33%;
  min-width: 33%;
  flex-grow: 1;
`;

const Header = styled.h1`
  padding: 0 0 20px;
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
  margin: 15px 0px;
  font-size: 18px;
  line-height: normal;
  letter-spacing: 0.05em;
  color: #828282;
`;

const ProfessorRatings = styled.div`
  margin: 1em 0em 1em 1.5em;
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

const CourseMetrics = styled.div`
  font-weight: 600;
  font-size: 48px;
  color: #A3874A;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-around;
  > *:not(:last-child) {
    padding-right: 10px;
  }
`;

const CourseMetric = styled.div`
  text-align: center;
`;

const CourseMetricSubtext = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: .1em;
`;

const CourseItem = ({ name, code, professors, metrics, key }) => {
  metrics = {average: 4.2, workload: 16}
  return (
    <CourseContainer>
        <Column>
      <StyledLink to={`course/${key}`}>
          <Header>
            <ItemType>
              COURSE
            </ItemType>
            <HeaderLine />
          </Header>
          <CourseTitle>
            {name}
            <FA name="external-link-alt" />
          </CourseTitle>
          <CourseCode>
            {code}
          </CourseCode>
          <CourseMetrics>
            <CourseMetric>
              {metrics.average}<br/>
              <CourseMetricSubtext>AVERAGE</CourseMetricSubtext>
            </CourseMetric>
            <CourseMetric>
              {metrics.workload}h
              <CourseMetricSubtext>WORKLOAD</CourseMetricSubtext>
            </CourseMetric>
          </CourseMetrics>
      </StyledLink>
        </Column>
      <ProfessorRatings>
        <InnerProfRatings>
          <ProfessorTable>
            <thead>
              <tr>
                <ProfessorCol>PROFESSOR</ProfessorCol>
                <TableHead>OVR</TableHead>
                <TableHead>LRN</TableHead>
                <TableHead>DIF</TableHead>
              </tr>
            </thead>
            <tbody>
              {professors.map((prof) =>
                <tr key={prof.name}>
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