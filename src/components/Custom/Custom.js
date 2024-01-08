import React ,{useState,useEffect}from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import {RotatingLines} from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import "./Custom.css";

const Custom = () => {
    const id = useParams();
    const navigate = useNavigate();
    const[categories,Setcategories]=useState([]);

    useEffect(()=>{
        const getData=async()=>{
        const resp = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${id.id}`)
        Setcategories(resp.data.meals)
    }
    getData();
    },[id])

    let render = "";
    if(categories){
            render = categories?.map((item)=>{
            return <div key={item.idMeal} className='each-item'>
                <img src={item.strMealThumb} alt="" onClick={()=>{
                    navigate(`/meal/detail/${item.idMeal}`)
                }}/>
                <p>{item.strMeal}</p>
                <h4 className='highlight'>{item.strCategory}</h4>
            </div>
        })
    }
    else{
        render = <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    }

    return (
        <div className='custom'>
            <h1>Results for {id.id}</h1>
            <div className='custom-items'>
            {render}
            </div>
        </div>
    )
}

export default Custom