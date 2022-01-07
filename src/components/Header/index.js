import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MENU } from "../../constants/index";
import LogoIcon from "../../assets/images/quai-rounded-logo.svg";

function Header() {
    const { pathname } = useLocation();
    console.log({pathname})
    return (
        <div className="px-3 py-1 flex justify-between items-center">
            <img src={LogoIcon} alt="logo" width="100" />
            <div>
                {MENU?.map(item => {
                    return (
                        <Link className={`mx-8 font-semibold text-base rounded-full px-4 py-2 hover:bg-gray-200 hover:text-black ${pathname === item.path ? 'bg-gray-300 text-black' : ''}`} to={item.path} key={item.name}>{item.name}</Link>
                    )
                })}
            </div>
            <div />
        </div>
    )
}

export default Header
