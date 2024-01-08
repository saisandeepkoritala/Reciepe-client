import React from 'react'
import "./Header.css";
import { VscHome } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
    <div className='header' onClick={()=>navigate("/")}>
        <VscHome  size={24}/>
        <h3>FastEat</h3>
    </div>
    )
}

export default Header