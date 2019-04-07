import React from 'react';
import FontAwesome from 'react-fontawesome'
import styled from 'styled-components';

const VALUE_OUT_OF = {
  STANDARD: 5,
  HOURS: 20,
};

const RING_RADIUS = 36;

const ProfessorItemContainer = styled.div`
  background-color: #F7F7F7;
  border-radius: 5px;
  padding: 20px 30px;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.5);
  display: flex;
`;

const LeftColumn = styled.div`
  width: 33%;
`;

const RightColumn = styled.div`
  width: 67%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  > * {
    margin-left: 30px;
  }
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

const CourseMetric = styled.div`
  text-align: center;
`;

const CourseMetricSubtext = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: .1em;
  color: #A3874A;
  text-transform: uppercase;
  margin-top: 10px;
`;

const Metric = ({name, value, valueOutOf}) => {
  let percentOfCircumfrence = value / valueOutOf;
  let circumfrence = 2 * RING_RADIUS * 3.14 * (1 - percentOfCircumfrence);
  return (
    <CourseMetric>
      <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="60" cy="60" r={`${RING_RADIUS}`} fill="none" stroke="#E6E6E6" strokeWidth="7" />
        <circle cx="60" cy="60" r={`${RING_RADIUS}`} fill="none" stroke="#A3874A" strokeWidth="7"
          strokeDasharray={`${2 * 3.14 * RING_RADIUS}`} strokeDashoffset={circumfrence} />
      </svg>
      <CourseMetricSubtext>{name}</CourseMetricSubtext>
    </CourseMetric>
  );
};

const ProfessorItem = ({ name, email, homepage, metrics }) => {
  const displayMetrics = Object.entries(metrics).filter(m => 
    m[0] === 'workload' || m[0] === 'overall' || m[0] === 'personality');
  return (
    <ProfessorItemContainer>
      <LeftColumn>
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
          <a href={/*`mailto:${email ||*/ `systems@ccs.neu.edu`}>
            <FontAwesome name='reply' style={{
              marginRight: '10px',
              color: '#A3874A',
            }} />
          </a>
          {email}
        </ProfessorInfo>
        <ProfessorInfo>
          <a href={/*homepage || */'https://khoury.northeastern.edu'}>
            <FontAwesome name='globe' style={{
              marginRight: '10px',
              width: '14px',
              color: '#A3874A',
            }} />
          </a>
          {homepage}
        </ProfessorInfo>
      </LeftColumn>
      <RightColumn>
        {displayMetrics.map(metric => {
          const [name, value] = metric;
          return (
            <Metric
              name={name}
              key={name}
              value={value}
              valueOutOf={name === 'workload'
                ? VALUE_OUT_OF.HOURS
                : VALUE_OUT_OF.STANDARD
              }
            />
          )
        })}
      </RightColumn>
    </ProfessorItemContainer>
  )
};

export default ProfessorItem;