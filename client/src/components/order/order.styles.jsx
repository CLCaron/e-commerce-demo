import styled from 'styled-components';

export const OrderContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 50% 50%;
  border: 1px solid black;
  padding: 20px;
`;

export const OrderProductsContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
`;

export const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;

  img {
    width: 100%;
  }

  .details-div {
    padding: 10px;
  }
`;

export const ProductDetailsHeader = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

export const CustomerDetailsHeader = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

export const CustomerDetailsContainer = styled.div`
  .total {
    padding-top: 20px;
    font-weight: bold;
    font-size: 20px;
  }
`;
