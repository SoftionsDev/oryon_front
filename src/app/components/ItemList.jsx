// ItemList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import { API_URL } from '../../constants';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    axios.get = API_URL
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
