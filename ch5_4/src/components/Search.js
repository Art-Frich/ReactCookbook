import Table from './Table';
import { useDispatch, useSelector } from 'react-redux';

const Search = () => {
  const searchData = useSelector((state) => state.searchData);
  const dispatch = useDispatch();

  const { data, error, loading } = searchData;
  const handleChangeInput = (e) => {
    dispatch({
      type: 'SEARCH',
      payload: e.target.value,
    });
  };

  return (
    <>
      <h1>Search me, Babel</h1>
      <input placeholder="Search..." type="text" onChange={handleChangeInput} />
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
