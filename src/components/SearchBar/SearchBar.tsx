import {MagnifyingGlass} from '@phosphor-icons/react/dist/ssr'

function SearchBar() {
  return (
    <div className="sticky top-0 px-4 py-2 bg-white">
      <div 
      className="flex gap-3 items-center bg-gray-100 border border-gray-200 rounded-3xl text-sm w-full p-2"
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
    </div>
  
  )
}

export default SearchBar