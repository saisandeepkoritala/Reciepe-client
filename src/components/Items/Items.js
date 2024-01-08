import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import {changeSearchTerm} from "../store";
import axios from 'axios';
import "./Items.css";

const Items = () => {

  const[categories,Setcategories]=useState([]);
  const dispatch = useDispatch();

  useEffect(()=>{
    const getData=async()=>{
      const resp = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
      Setcategories(resp.data.categories)
  }
  getData();
  },[])

  let render = "";
  if(categories){
          render = categories?.map((item)=>{
          return <Link key={item.idCategory} className='each-item' to={`/meal/category/${item.strCategory}`} 
          onClick={()=>{dispatch(changeSearchTerm(item.strCategory))
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
            }}>
              <img src={item.strCategoryThumb} alt=""/>
              <p>{item.strCategory }</p>
          </Link>
      })
  }
  else{

  }

  return (
    <div className='items'>
      {render}
    </div>
  )
}

export default Items