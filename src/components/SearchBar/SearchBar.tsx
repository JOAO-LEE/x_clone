import {MagnifyingGlass} from '@phosphor-icons/react/dist/ssr'

function SearchBar() {
  return (
    <div 
    className="flex gap-4 items-center sticky top-0 bg-gray-100 border border-gray-200 rounded-3xl text-sm w-full px-4 py-2"
    >
      <MagnifyingGlass 
      size={20} 
      className="text-gray-950"
      />
      <input 
      type="text" 
      placeholder="Search" 
      className="bg-gray-100 focus:outline-none" 
      />
    </div>
  )
}

export default SearchBar