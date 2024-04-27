const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>City</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r, i) => (
          <tr key={r + i}>
            <td>{r['name']}</td>
            <td>{r['state']}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
