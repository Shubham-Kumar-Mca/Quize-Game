import React, { useState } from 'react';
import "./quize.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUsrDataFromAPI, scoreUpdateToAPI } from '../../redux/action';

const Quize = () => {
  const {data} = useSelector(state => state)
  const [QuestionData, setQuestionData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState([])
  const [scrore, setScore] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch()


  //Click an Option
  const handelOptionClick = (isCorrect, answerIndex, questionIndex) => {
    if (isCorrect) {
      setScore(scrore + 1);
    }

    setSelectedAnswer((prevAnswers)=>{
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers
    });
  };


  // Clicking Previous Button
  const handelPrev = () => {
    const nextQuestion = currentQuestion - 1;
    if (nextQuestion < 0) {
      return
    } else {
      setCurrentQuestion(nextQuestion);
    }
  }


  //Click Next Button
  const handelNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < QuestionData.length) {
      setCurrentQuestion(nextQuestion);
    } 
  }

  const handelShowResult = () =>{
    dispatch(scoreUpdateToAPI(data[data.length-1].id, {...data[data.length-1], score : scrore, quizeQuestion : QuestionData}))
    alert("Submit Your Quize Sucessfully!")
    navigate("/result")
  }



  //Getting Only Question-Answer (option) Array
  useEffect(() => {
    const actualQuizeArr = data[data?.length - 1]?.quizeQuestion.splice(0, data[data?.length - 1].numberOfQuize);
    setQuestionData(actualQuizeArr)
    setSelectedAnswer(Array(actualQuizeArr?.length)?.fill(null))
  }, [data])

  useEffect(() => {
    dispatch(getUsrDataFromAPI())
  }, [dispatch])




  return (
    <div className='quize-container'>
      {
        data.length > 0 ? <div className='singleQuestionContainer'>

        <div className="question-section">
          <div className="question-text">
            {currentQuestion + 1}. {" "}
            {QuestionData && QuestionData[currentQuestion]?.questionText}
          </div>
          <div className="question-count">
            <span>Question {currentQuestion + 1} </span> / {QuestionData && QuestionData.length}
          </div>
        </div>

        <div className="answer-section">
          {QuestionData && QuestionData[currentQuestion]?.answerOption?.map((answerOption, index) => (
            <p
              key={index}
              onClick={() => handelOptionClick(answerOption.isCorrect, index, currentQuestion)}
              style={{ backgroundColor: selectedAnswer && selectedAnswer[currentQuestion] === index ? answerOption.isCorrect ? "#5dc291" : "#c55787" : "" }}
            >
              {answerOption.anserText}
            </p>
          ))}
        </div>


        <div className='next__and__prev__btn'>
          <button onClick={handelPrev}>Previous</button>
          {
            currentQuestion === QuestionData?.length - 1 ? <button onClick={handelShowResult}>Submit</button> :<button onClick={handelNext}>Next</button>
          }
          
        </div>
      </div>:<div className='initialInfo'>
        <h2>Set Up Your Quize</h2>
        <button onClick={()=>navigate("/")}>Go to Home</button>
      </div>
      }
    </div>
  )
}

export default Quize