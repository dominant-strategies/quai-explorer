import React from 'react'

function DropDown({value, setValue, items}) {
    return (
    <div className="dropdown">
      <div tabindex="0" className="m-1 btn">{value}</div> 
      <ul tabindex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box">
        {items.map(item=><li onClick={()=>setValue(item)}>
          <a>{item}</a>
        </li> )}
      </ul>
  </div>

    )
}

export default DropDown
