import React from 'react'
import './Nav.scss'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function Nav(props) {
    const login = useSelector (state => state.dataReducer.login)
    const dispatch = useDispatch()
    const logout = () => {
        dispatch({type:"LOGOUT"})
        alert("로그아웃 되었습니다.")
        props.history.push("/")
    }
    return(
        <header className="header">
            <div className={`notice ${props.number === 2 ? "hide" : ""}`}>
                <div className="text">{props.number === 0 ? "서비스를 이용하시려면 로그인을 해주세요." : props.number === 1 ? "2018년 9월 ~ 2020년 6월에 샘플 데이터가 들어 있습니다." : ""}</div>
                <div className="text text2">{props.number === 0 ? "서비스를 이용하시려면 로그인을 해주세요." : props.number === 1 ? "2018년 9월 ~ 2020년 6월에 샘플 데이터가 들어 있습니다." : ""}</div>
            </div>
            <div className="nav">
                <ul>
                    <li className={`${props.number === 0 ? "active" : ""}`} ><Link to="/">Home</Link></li>
                    <li className={`${props.number === 1 ? "active" : ""}`} onClick={() => login ? '' : alert('로그인을 해주세요.')}><Link to={login ? "/calendar" : "/"}>Calendar</Link></li>
                    <li className={`${props.number === 2 ? "active" : ""}`} onClick={() => login ? '' : alert('로그인을 해주세요.')}><Link to={login ? "/chart" : "/"}>Chart</Link></li>
                </ul>
            </div>
            <div className="loginForm">
                {login ? <div className="logout" onClick={logout}>Log-out</div> : <Link to="/loginpage">Log-in</Link>}
            </div>
        </header>
        
    )
}