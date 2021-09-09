import styled from 'styled-components';

export const CollectionPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CollectionTitle = styled.h2`
  display: flex;
  font-size: 38px;
  margin: 0 auto 30px;
  padding-left: 180px;
`;

export const CollectionSortButtonContainer = styled.p`
  top: 0;
  right: 0;
`;

export const CollectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
`;

export const CollectionItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  padding-left: 15px;
  & > div {
    margin-bottom: 30px;
  }
`;
