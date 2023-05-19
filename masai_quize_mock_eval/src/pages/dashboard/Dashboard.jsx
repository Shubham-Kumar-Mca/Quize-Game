import React, { useEffect } from 'react';
import "./dashboard.css"
import { useDispatch, useSelector } from 'react-redux';
import { getUsrDataFromAPI } from '../../redux/action';
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state)
    const navigate = useNavigate()

    const updateData = data.sort((a,b)=>Math.floor(b.score * 100 / b.quizeQuestion.length) - Math.floor(a.score * 100 / a.quizeQuestion.length))

    useEffect(() => {
        dispatch(getUsrDataFromAPI())
    }, [dispatch])
    return (
        <div className='dashboard'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>category</th>
                        <th>dificulty</th>
                        <th>Number Of Quize</th>
                        <th>Score</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        updateData && updateData.map(user=>(
                            <tr key={user.id}>
                                <td>{user.userName}</td>
                                <td>{user.category}</td>
                                <td>{user.dificulty}</td>
                                <td>{user.numberOfQuize}</td>
                                <td>{user.score}</td>
                                <td>{Math.floor(user.score * 100 / user.quizeQuestion.length)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button onClick={()=>navigate("/")}>Go to Home Page</button>
        </div>
    )
}

export default Dashboard