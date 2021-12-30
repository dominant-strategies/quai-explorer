import React from 'react'

function DropDown({value, setValue, items}) {
    return (<div class="dropdown">
    <div tabindex="0" class="m-1 btn">{value}</div> 
    <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box">
      {items.map(item=><li onClick={()=>setValue(item)}>
        <a>{item}</a>
      </li> )}
    </ul>
  </div>

    )
}

export default DropDown
