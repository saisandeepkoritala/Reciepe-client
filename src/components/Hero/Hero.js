import React from 'react'
import "./Hero.css"
import { CiSearch } from "react-icons/ci";
import {useSelector,useDispatch} from "react-redux";
import { changeInputTerm } from '../store';
import {useNavigate} from "react-router-dom";

const Hero = () => { 

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {inputTerm} = useSelector((store)=>store.form);
    
    const handleChange=(e)=>{
      dispatch(changeInputTerm(e.target.value))
    }  

    const handleSubmit=(e)=>{
      e.preventDefault();
      navigate(`/search/${inputTerm}`);
      dispatch(changeInputTerm(""));
      window.scroll({
        top: window.innerHeight,
        behavior: 'smooth'
      });
      
    }

  return (
    <div className='hero'>

      <div className='inpt-btn'>
        <input placeholder='Search recipes here ...' value={inputTerm}
        onChange={handleChange}/>
        <CiSearch size={20} className='btn' onClick={handleSubmit}/>
      </div>

      <div className='text'>
        <h2>What are your favorite cuisines ?</h2>
        <p>Personalize your experience</p>
      </div>
    </div>
  )
}

export default Hero