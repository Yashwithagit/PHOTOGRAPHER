import React from "react";
import styled from "styled-components";

const NoData: React.FC = () => {
  return <DataContainer>No Data Found</DataContainer>;
};

export default React.memo(NoData);

const DataContainer = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
`;
