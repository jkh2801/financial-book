import './Home.scss'
import Nav from './Nav'


export default function Home(props) {
    return (
        <div>
            <Nav number={0} history={props.history}></Nav>
            <section className="home">
                <div className="textBx"><div data-text="Financial-">Financial-</div><div data-text="Book">Book</div></div>
            </section>
        </div>
    )

}