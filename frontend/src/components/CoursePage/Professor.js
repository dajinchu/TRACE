import React from 'react';
import styled from 'styled-components';

const capitalize = (word) => 
  word.replace(/\b\w/g, l => l.toUpperCase());

const ProfessorTitle = styled.h2`
  font-size: 28px;
  padding-bottom: 15px;
`;

const ProfessorMetricsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  text-align: center;
  > :not(:last-child) {
    margin-bottom: 10px;
  }
`;

const ProfessorContainer = styled.div`
  padding: 20px 30px;
  background: #F7F7F7;
  border-radius: 5px;
`;

const Professor = ({ name, metrics }) => {
  return (
    <ProfessorContainer>
    <ProfessorTitle>
      {name}
    </ProfessorTitle>
    <ProfessorMetricsContainer>
      {Object.entries(metrics).map(metric => {
        return (
          <Column key={metric[0] + metric[1]}>
            <div>{capitalize(metric[0])}</div>
            <div>{metric[1]}</div>
          </Column>
        );
      })}
    </ProfessorMetricsContainer>
    </ProfessorContainer>
  );
};

export default Professor;