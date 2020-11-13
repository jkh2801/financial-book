import React, {useState} from 'react'
import './Nav.scss'
import {Link} from 'react-router-dom'

export default function Nav() {
    console.log("nav")
    const [menu, setMenu] = useState(false)
    return(
        <div className={"nav " + (menu? "open":"")}>
            <div className="menu" onClick={() => setMenu(!menu)}></div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/calendar">Calendar</Link></li>
                <li><Link to="/chart">Chart</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>
        </div>
    )
}