import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer,
  CollectionHeader,
  CollectionSortButtonContainer,
} from './collection.styles';

const CollectionPage = () => {
  const { collectionId } = useParams();
  const collection = useSelector((state) =>
    selectCollection(collectionId)(state)
  );

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

      // FIXME: Sorting currently doesn't actually handle sorting by name, it just resets the sort to the default sort. Also, consider a better way to handle sorting?
      if (sortProperty === 'priceDescending') {
        setData(
          [...collection.items].sort(
            (a, b) => b[sortPropertyString] - a[sortPropertyString]
          )
        );
      } else {
        setData(
          [...collection.items].sort(
            (a, b) => a[sortPropertyString] - b[sortPropertyString]
          )
        );
      }
    };

    sortCollection(sortType);
  }, [collection.items, sortType]);

  return (
    <CollectionPageContainer>
      <CollectionHeader>
        <CollectionTitle>{collection.title}</CollectionTitle>
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

export default CollectionPage;
