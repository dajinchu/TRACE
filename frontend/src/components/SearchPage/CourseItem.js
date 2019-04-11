import React from 'react';
import FA from 'react-fontawesome';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { round } from '../../utils/parsingUtils';

const COURSE_ITEM_LIST_LENGTH = 4;

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
`;
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
`;

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

const blocked = (component, size = '5px') => styled(component)`filter: blur(${size});`;

const CourseMetricSubtext = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: .1em;
`;

const PlusWrapper = styled.span`
  margin-left: 5px;
  color: rgb(0,97,0);
`;

const fakeMetric = (min = 1, max = 5) => min + (max - min) * Math.random();

const PlusIndicator = ({ value }) => (
  <PlusWrapper>
    <FA name="arrow-up" style={{ marginRight: '5px' }} />
    {value}
  </PlusWrapper>
);

const MinusWrapper = styled.span`
  margin-left: 5px;
  color: rgb(156,0,6);
`;

const MinusIndicator = ({ value }) => (
  <MinusWrapper>
    <FA name="arrow-down" style={{ marginRight: '5px' }} />
    {Math.abs(value)}
  </MinusWrapper>
);

const getDifferenceIndicator = (difToAverage) => {
  if (Math.abs(difToAverage) < 0.3) {
    return null;
  }
  if (difToAverage > 0) {
    return <PlusIndicator value={difToAverage} />;
  }
  return <MinusIndicator value={difToAverage} />;
};

const CourseItem = ({
  name, code, professors, metrics, UID, authed,
}) => {
  let newProfessors = professors;
  if (authed) {
    newProfessors = professors.map(prof => ({
      ...prof,
      metrics: Object.entries(prof.metrics).reduce((x, y) => {
        const newMetric = { value: y[1] };
        newMetric.difToAverage = y[1] - metrics[y[0]];
        return { ...x, [y[0]]: newMetric };
      }, {}),
    }));
    newProfessors.sort(prof => prof.metrics.difToAverage);
  }
  const CourseMetricReal = authed ? CourseMetric : blocked(CourseMetric, '7px');
  const TableDetailReal = authed ? TableDetail : blocked(TableDetail, '3px');
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
            <CourseMetricReal>
              {round(authed ? metrics.overall : fakeMetric(), 1)}
              <br />
              <CourseMetricSubtext>AVERAGE</CourseMetricSubtext>
            </CourseMetricReal>
            <CourseMetricReal>
              {round(authed ? metrics.workload : fakeMetric(4, 20), 0)}
h
              <CourseMetricSubtext>WORKLOAD</CourseMetricSubtext>
            </CourseMetricReal>
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
              {newProfessors.slice(0, COURSE_ITEM_LIST_LENGTH).map(prof => (
                <tr key={prof.name}>
                  <EachProf>{prof.name}</EachProf>
                  <TableDetailReal>
                    {round(authed ? prof.metrics.overall.value : fakeMetric(), 1)}
                    {authed ? getDifferenceIndicator(round(prof.metrics.overall.difToAverage, 1)) : null}
                  </TableDetailReal>
                  <TableDetailReal>
                    {round(authed ? prof.metrics.learning.value : fakeMetric(), 1)}
                    {authed ? getDifferenceIndicator(round(prof.metrics.learning.difToAverage, 1)) : null}
                  </TableDetailReal>
                  <TableDetailReal>
                    {round(authed ? prof.metrics.challenge.value : fakeMetric(), 1)}
                    {authed ? getDifferenceIndicator(round(prof.metrics.challenge.difToAverage, 1)) : null}
                  </TableDetailReal>
                </tr>
              ))}
            </tbody>
          </ProfessorTable>
        </InnerProfRatings>
      </ProfessorRatings>
    </CourseContainer>
  );
};

export default CourseItem;
