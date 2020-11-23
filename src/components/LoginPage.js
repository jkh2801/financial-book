import { useDispatch} from 'react-redux'
import './LoginPage.scss'

export default function LoginPage(props) {
    console.log("loginPage")
    const dispatch = useDispatch()
    const login = () => {
        dispatch({type:"LOGIN"})
        alert("환영합니다.")
        props.history.push("/")
    }
    return (
        <div>
            <header className="header"></header>
            <section className="loginpage">
                <div className="loginButton" onClick={login}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Sample Login
                </div>
            </section>
        </div>
    )
}