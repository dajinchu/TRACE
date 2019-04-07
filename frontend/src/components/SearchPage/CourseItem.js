import React from 'react';
import FA from 'react-fontawesome';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { round } from '../../utils/parsingUtils';

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
  width: 40%;
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
  text-align: center;
`;

const TableDetail = styled.td`
  text-align: center;
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

const PlusWrapper = styled.span`
  margin-left: 5px;
  color: rgb(0,97,0);
`;

const PlusIndicator = ({ value }) => {
  return (
    <PlusWrapper>
      <FA name="arrow-up" style={{ marginRight: '5px' }} />
      {value}
    </PlusWrapper>
  );
}

const MinusWrapper = styled.span`
  margin-left: 5px;
  color: rgb(156,0,6);
`;

const MinusIndicator = ({ value }) => {
  return (
    <MinusWrapper>
      <FA name="arrow-down" style={{ marginRight: '5px' }} />
      {Math.abs(value)}
    </MinusWrapper>
  );
}

const getDifferenceIndicator = difToAverage => {
  if (Math.abs(difToAverage) < .3) {
    return null;
  }
  if (difToAverage > 0) {
    return <PlusIndicator value={difToAverage} />;
  } else {
    return <MinusIndicator value={difToAverage} />;
  }
}

const CourseItem = ({ name, code, professors, metrics, UID }) => {
  let newProfessors = professors.map((prof) => ({
    ...prof,
    metrics: Object.entries(prof.metrics).reduce((x, y) => {
      let newMetric = { value: y[1] };
      newMetric.difToAverage = y[1] - metrics[y[0]];
      return { ...x, [y[0]]: newMetric };
    }, {})
  }));
  newProfessors.sort(prof => prof.metrics.difToAverage);
  return (
    <CourseContainer>
        <Column>
      <StyledLink to={`course/${UID}`}>
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
              {round(metrics.overall, 1)}<br/>
              <CourseMetricSubtext>AVERAGE</CourseMetricSubtext>
            </CourseMetric>
            <CourseMetric>
              {round(metrics.workload, 0)}h
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
              {newProfessors.map((prof, index) => index < 3 ?
                <tr key={prof.name}>
                  <EachProf>{prof.name}</EachProf>
                  <TableDetail>
                    {round(prof.metrics.overall.value, 1)}
                    {getDifferenceIndicator(round(prof.metrics.overall.difToAverage, 1))}
                  </TableDetail>
                  <TableDetail>
                    {round(prof.metrics.learning.value, 1)}
                    {getDifferenceIndicator(round(prof.metrics.learning.difToAverage, 1))}
                  </TableDetail>
                  <TableDetail>
                    {round(prof.metrics.challenge.value, 1)}
                    {getDifferenceIndicator(round(prof.metrics.challenge.difToAverage, 1))}
                  </TableDetail>
                </tr>
                : null
              )}
            </tbody>
          </ProfessorTable>
        </InnerProfRatings>
      </ProfessorRatings>
    </CourseContainer>
  );
}

export default CourseItem;