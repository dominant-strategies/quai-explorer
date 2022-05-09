function DropDown({ value, setValue, items }) {
    return (
        <div className="dropdown">
            {/* eslint-disable-next-line */}
            <div tabIndex="0" className="m-1 btn">
                {value}
            </div>
            <ul
                // eslint-disable-next-line
                tabIndex="0"
                className="p-2 shadow menu dropdown-content bg-base-100 rounded-box"
            >
                {items.map((item) => (
                    // eslint-disable-next-line
                    <li onClick={() => setValue(item)}>
                        {/* eslint-disable-next-line */}
                        <a>{item}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DropDown
