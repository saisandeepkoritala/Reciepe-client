import React, {useState,useEffect} from 'react';
import { ImCancelCircle} from "react-icons/im";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import {useDispatch} from "react-redux";
import {changeSearchTerm, setCategories} from "../store";

const Sidebar = () => {

    const dispatch = useDispatch();

    const[categories,Setcategories]=useState([]);
    useEffect(()=>{
        const getData=async()=>{
            const resp = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
            Setcategories(resp.data.categories)
            dispatch(setCategories(resp.data.categories))
        }
        getData();
    },[dispatch])
    const[isSidebarOpen,SetisSidebarOpen]=useState(true);
    
    const closeSidebar=(e)=>{
        SetisSidebarOpen(!isSidebarOpen)
    }

    const handleClick = (item)=>{
        closeSidebar();
        window.scroll({
            top: window.innerHeight,
            behavior: 'smooth'
        });
        dispatch(changeSearchTerm(item))
    }

    if(isSidebarOpen){
        return <FaBars size = {24} className='bars' color="white" onClick={()=>closeSidebar()}/>
    }
    return (
        <nav className='sidebar'>
            <button type = 'button' className='navbar-hide-btn' onClick={() => closeSidebar()}>
                <ImCancelCircle size = {24} />
            </button>
            <div className='side-content'>
                <ul className='side-nav'>
                    {
                        categories.map(category => (
                            <li className='side-item' key = {category.idCategory}>
                                <Link to = {`/meal/category/${category.strCategory}`} className='side-link' onClick={() => handleClick(category.strCategory)}>
                                    {category.strCategory}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar