import React,{useEffect, useState} from 'react'
import {  GoDotFill } from "react-icons/go";
import { IoIosCheckboxOutline } from "react-icons/io";
import {GiSpoon } from "react-icons/gi";
import {useParams} from "react-router-dom";
import axios from "axios";
import "./FoodDetail.css";

const FoodDetail = () => {

  const id= useParams()
  const [data,Setdata] = useState([]);

  useEffect(()=>{
    const getData=async()=>{

      const resp = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id.id}`)

      Setdata(resp.data.meals)
  }
  getData();
  },[id])

  let render="";
  let renderIngred=[];
  let renderItems="";
  let renderMeasure=[];
  let renderQuantity="";
  let instructions=[];
  let renderInst="";
  let renderInfo="";

  if(data){
    render = <div>
                <img src={data[0]?.strMealThumb} alt=""/>
            </div>

    renderInfo = <div className='info'>
      <p className='big'><strong>{data[0]?.strMeal}</strong></p>
      <p><strong>Category : </strong>{data[0]?.strCategory}</p>
      <p><strong>Source : </strong>{data[0]?.strYoutube}</p>
      <p><strong>Ingredients :</strong></p>
    </div>

    for(let i in data[0]){
      if(i.startsWith("strIngredient") && data[0][i]){
        renderIngred.push(data[0][i])
      }
      if(i.startsWith("strMeasure") && data[0][i]!==" "){
        renderMeasure.push(data[0][i])
      }
    }

    renderItems = renderIngred?.map((item,i)=>{
      return <div key={i} className='food-items'>
        <p>< GoDotFill color="orange"/>{item}</p>
      </div>
    })
    console.log(renderMeasure)
    renderQuantity = renderMeasure?.map((item,i)=>{
      if(item){
        return <div key={i}>
        <p><GiSpoon color='orange'/>{renderIngred[i]} - {item}</p>
      </div>
      }
      else{
        return []
      }
    })

    instructions = data[0]?.strInstructions.split("\r\n\r\n");

    renderInst = instructions?.map((item,i)=>{
      return <div key={i}>
        <p><IoIosCheckboxOutline color='orange'/>{item}</p>
      </div>
    })
  }
  else{
    renderInst="";
  }

  return (
    <div className='fooddetail'>
      <div className='food-header'>
          <div className='food-img'>
          {render}
          </div>
          <div className='food-ing'>
              {renderInfo}
              <div className='ing'>
              {renderItems}
              </div>
          </div>
      </div>
      <div className='food-footer'>
      <h1>Quantity :</h1>
        <div className='quantity'>
        {renderQuantity}
        </div>
        <h1>Instructions :</h1> 
        <div className='inst'>
        {renderInst}
        </div>
      </div>
    </div>
  )
}

export default FoodDetail