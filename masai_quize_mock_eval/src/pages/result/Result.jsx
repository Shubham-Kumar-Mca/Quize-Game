import React, { useEffect } from 'react';
import "./result.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsrDataFromAPI } from '../../redux/action';

const Result = () => {
    const {data} = useSelector(state => state)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const startAgain = () => {
        navigate("/quize")
    }

    useEffect(()=>{
        dispatch(getUsrDataFromAPI())
    },[dispatch])
    return (
        <div className='result'>
            <div className='container__result'>
                <div>
                    <p>Correct answers count : </p>
                    <p>{data[data.length-1]?.score}</p>
                </div>
                <div>
                    <p>Incorrect answers count : </p>
                    <p>{Number(data[data.length-1]?.quizeQuestion.length) - Number(data[data.length-1]?.score)}</p>
                </div>
                <div>
                    <p>Total score : </p>
                    <p>{data[data.length-1]?.score}</p>
                </div>
                <div>
                    <p>Percentage : </p>
                    <p>{Math.floor(Number(data[data.length-1]?.score) * 100 / Number(data[data.length-1]?.quizeQuestion.length))}</p>
                </div>
            </div>

            <div className='btn__container'>
                <button type="button" className="btn-tryagain" onClick={startAgain}>Start Again</button>
            </div>

            <div className='rank__btn'>
                <button onClick={()=>{
                    alert("Show my Position in score list!")
                    navigate("/dashboard")
                }}>Check Your Rank</button>
            </div>

        </div>
    )
}

export default Result