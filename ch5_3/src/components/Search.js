// import { useReducer } from 'react';
import Table from './Table';
import { useReducer, useState } from 'react';
import useSearch from '../lib/useSearch';

const Search = () => {
  const [url] = useState('http://localhost:5000/search');
  const [terms, onChange] = useReducer((_, e) => e?.target?.value);
  const { data, loading, error } = useSearch(url, terms);

  return (
    <>
      <h1>Search me, Babel</h1>
      <input placeholder="Search..." type="text" onChange={onChange} />
      {error ? (
        <p>Error: {error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : data && data.length ? (
        <Table data={data} />
      ) : (
        <p>No data</p>
      )}
    </>
  );
};

export default Search;
