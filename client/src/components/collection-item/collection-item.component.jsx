import React from 'react';
import { useDispatch } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';

import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer,
} from './collection-item.styles';

const CollectionItem = ({ item }) => {
  const { name, price, imageUrl } = item;

  const dispatch = useDispatch();
  const handleAddItem = (item) => dispatch(addItem(item));

  return (
    <CollectionItemContainer>
      <BackgroundImage style={{ backgroundImage: `url(${imageUrl})` }} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton
        className='custom-button'
        onClick={() => handleAddItem(item)}
        inverted
      >
        Add to cart
      </AddButton>
    </CollectionItemContainer>
  );
};

export default CollectionItem;
