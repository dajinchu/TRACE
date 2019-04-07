import React from 'react';
import styled from 'styled-components';

const CollegeBox = styled.div`
    width: 45px;
    height: 17.17px;
    background: #E50000;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 5px;
`;

const CollegeBoxText = styled.p`
    padding-top: 2%;
    font-style: normal;
    font-weight: bold;
    font-size: 11px;
    line-height: normal;
    text-align: center;
    color: #FFFFFF;
`;

const CollegeTag = ({ college }) => {
  return (
    <CollegeBox>
        <CollegeBoxText>
            {college}
        </CollegeBoxText>
    </CollegeBox>
  );
};

export default CollegeTag;