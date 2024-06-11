function SearchBar() {
  return (
    <div className="sticky top-0 bg-white py-2">
      <input 
      type="text" 
      placeholder="Search" 
      className="bg-gray-100 border border-gray-200 rounded-3xl text-sm w-full px-4 py-2" 
      />
    </div>
  )
}

export default SearchBar