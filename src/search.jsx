const [searchQuery, setSearchQuery] = useState("");
const [filteredData, setFilteredData] = useState([]);
const handleSearchQueryChange = (event) => {
  const query = event.target.value;
  setSearchQuery(query);

  const filteredData = originalData.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  setFilteredData(filteredData);
};
return (
  <div>
    <input type="text" value={searchQuery} onChange={handleSearchQueryChange} />
    {filteredData.map((item) => (
      <div key={item.id}>{item.name}</div>
    ))}
  </div>
);
