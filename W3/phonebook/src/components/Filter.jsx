const Filter = ({ searchTerm, handleSearchTerm }) => {
  return (
    <div>
      Filter contacts: <input value={searchTerm} onChange={handleSearchTerm} />
    </div>
  )
}

export default Filter