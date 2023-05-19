import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./home.css"
import { useDispatch } from 'react-redux'
import { userPostToAPI } from '../../redux/action'
import { reactQuestion } from '../../questionCategory/reactQuestion'
import { sportsQuestion } from '../../questionCategory/sportQuestion'
import { javaScriptQuestion } from '../../questionCategory/jsvscriptQuestion'

const initialState = {
    userName: "",
    category: "",
    dificulty: "",
    numberOfQuize: "",
    quizeQuestion: []
}

const Home = () => {
    const [userInfo, setUserInfo] = useState(initialState);
    const dispatch = useDispatch()

    const handelInputChange = (e) => {
        let { name, value } = e.target
        if (name === "dificulty") {
            if (userInfo.category === "React") {
                if (value === "Easy") {
                    userInfo.quizeQuestion = reactQuestion.esayQuestion
                } else if (value === "Medium") {
                    userInfo.quizeQuestion = reactQuestion.mediumQuestion
                } else {
                    userInfo.quizeQuestion = reactQuestion.hardQuestion
                }
            } else if (userInfo.category === "jsvascript") {
                if (value === "Easy") {
                    userInfo.quizeQuestion = javaScriptQuestion.esayQuestion
                } else if (value === "Medium") {
                    userInfo.quizeQuestion = javaScriptQuestion.mediumQuestion
                } else {
                    userInfo.quizeQuestion = javaScriptQuestion.hardQuestion
                }
            } else {
                if (value === "Easy") {
                    userInfo.quizeQuestion = sportsQuestion.esayQuestion
                } else if (value === "Medium") {
                    userInfo.quizeQuestion = sportsQuestion.mediumQuestion
                } else {
                    userInfo.quizeQuestion = sportsQuestion.hardQuestion
                }

            }
        }
        setUserInfo({ ...userInfo, [name]: value })
    }
    const navigate = useNavigate()

    const handelQuizeStartFormSubmit = (e) => {
        e.preventDefault()
        dispatch(userPostToAPI(userInfo));
        alert("User Created Sucessfully!")
        navigate("/quize")
    }
    return (
        <div className='container'>
            <h1>Set up your Quize</h1>
            <form onSubmit={handelQuizeStartFormSubmit}>
                <input required name='userName' value={userInfo.userName} onChange={handelInputChange} type="text" placeholder='Enter Your Name' />
                <select required name='category' value={userInfo.category} onChange={handelInputChange} >
                    <option>Select Category</option>
                    <option value="jsvascript">JavaScript</option>
                    <option value="Sports">Sports</option>
                    <option value="React">React</option>
                </select>
                <select required name='dificulty' value={userInfo.dificulty} onChange={handelInputChange} >
                    <option>Select Dificulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <input required name='numberOfQuize' value={userInfo.numberOfQuize} onChange={handelInputChange} type="text" placeholder='Choose Number of question' />
                <input type="submit" value="START QUIZE" />
            </form>
        </div>
    )
}

export default Home