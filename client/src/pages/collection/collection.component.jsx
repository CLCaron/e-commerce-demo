import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer,
  CollectionHeader,
  CollectionSortButtonContainer,
} from './collection.styles';

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;

  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState('name');

  useEffect(() => {
    const sortCollection = (type) => {
      const types = {
        name: 'name',
        priceAscending: 'price',
        priceDescending: 'price',
      };

      const sortProperty = type;
      const sortPropertyString = types[type];

      if (sortProperty === 'priceDescending') {
        setData(
          [...items].sort(
            (a, b) => b[sortPropertyString] - a[sortPropertyString]
          )
        );
      } else {
        setData(
          [...items].sort(
            (a, b) => a[sortPropertyString] - b[sortPropertyString]
          )
        );
      }
    };

    sortCollection(sortType);
  }, [items, sortType]);

  return (
    <CollectionPageContainer>
      <CollectionHeader>
        <CollectionTitle>{title}</CollectionTitle>
        <CollectionSortButtonContainer>
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value='name'>Name</option>
            <option value='priceAscending'>Price low to high</option>
            <option value='priceDescending'>Price high to low</option>
          </select>
        </CollectionSortButtonContainer>
      </CollectionHeader>
      <CollectionItemsContainer>
        {data.map((item) => {
          return <CollectionItem key={item.id} item={item} />;
        })}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
