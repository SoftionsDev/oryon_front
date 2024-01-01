
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
