import React from 'react'
import DropDown from '../DropDown'

function Pagination({currentPage, setCurrentPage, limit, setLimit, totalPage}) {
    return (
        <nav aria-label="Page navigation" className="flex justify-end items-center px-3">
            <ul class="inline-flex space-x-2 justify-center items-center">
                <li>
                    <button class="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100" onClick={()=> currentPage > 1 && setCurrentPage(currentPage - 1)}>
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                    </button>
                </li>
                <div className="flex items-center justify-center">
                    <p>Page</p>
                    <input className="w-6 h-6 mx-2 bg-gray-200 text-black rounded-md flex justify-center items-center text-center" value={currentPage} onChange={(e)=>setCurrentPage(parseInt(e.target.value))} />
                    <p>of {totalPage}</p>
                </div>
                <li>
                    <button class="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100" onClick={()=>currentPage < totalPage && setCurrentPage(currentPage+1)}>
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                    </button>
                </li>
                <div className="flex items-center justify-center">
                    <DropDown value={limit} setValue={setLimit} items={[5, 10, 20, 30, 40, 50]} />
                    <p>per page</p>
                </div>
            </ul>
            
        </nav>
    )
}

export default Pagination
