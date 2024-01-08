import React from 'react'
import {useSelector,useDispatch} from "react-redux";
import { useEffect } from 'react';
import axios from "axios";
import {setData} from "../store";
import "./Detail.css";
import {Link} from "react-router-dom";


const Detail = () => {
    const dispatch = useDispatch();
    const {data,searchTerm,categories} = useSelector((store)=>store.form)

    useEffect(()=>{
        const getData=async()=>{
            const resp =  await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchTerm}`);
            dispatch(setData(resp.data.meals))
        }
        getData()
    },[dispatch,searchTerm])

    let render = "";
    let renderHeader="";
    if(categories){
        const findItem = categories.find((item)=>item.strCategory===searchTerm)

        renderHeader = <div>
                    <h1>{findItem?.strCategory}</h1>
                    <img src={findItem?.strCategoryThumb} alt=""/>
                    <p>{findItem?.strCategoryDescription}</p>
            </div>
    }
    else{

    }

    if(data){
            render = data?.map((item)=>{
            return <Link key={item.idMeal} className='each-item' to={`/meal/detail/${item.idMeal}`} onClick={()=>{
                window.scroll({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
                
            }}>
                <img src={item.strMealThumb} alt=""/>
                <p>{item.strMeal}</p>
            </Link>
        })
    }
    else{

    }

    return (
    <div className='detail'>
        <div className='detail-header'>
            {renderHeader}
        </div>
        <h1>Results for {searchTerm}</h1>
        <div className='detail-list'>
        {render}
        </div>
    </div>
    )
}

export default Detail