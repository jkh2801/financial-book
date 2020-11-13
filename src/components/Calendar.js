import './Calendar.scss'
import moment, {Moment as MomentTypes} from 'moment'

export default function Calendar() {
    const today = moment()
    console.log(today)
    const start = today.clone().startOf('month')
    const end = today.clone().endOf('month')
    const strWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    const date = () => {
        const week = strWeek.map((w, idx) => {
            return(
                <div className="week" key={idx}><span>{w}</span></div>
            )
        })
        const days = () => {
            const week = []
            for(let w = (end.week() - start.week() == 5? start.week():start.week()-1); w <= end.week(); w++) {
                week.push(w)
            }
            console.log(week)
            return (
                week.map((w, idx) => {
                    return(
                    <div key={idx} className="row">
                        {Array(7).fill(0).map((n, idx) => {
                            let current = today.clone().week(w).startOf('week').add(n+idx,'day')
                            let isCurrent = current.format('MM') === today.format('MM') ? '' : 'grayed';
                            return(
                            <div className={`day ${isCurrent}`} key={idx}>
                                <span>{current.format('D')}</span>
                            </div>
                            )
                        })}
                        </div>
                    )
                })
                )
            }
            return(
            <div className="dates">
                <div className="row">{week}</div>
                {days()}
            </div>
        )
    }
    return (
        <div>
            <header className="header">
                <div className="header_container">

                </div>
            </header>
            <section className="cal">
                <div className="cal_container">
                    <div className="calendar">
                        <div className="settings"></div>
                        {date()}
                    </div>
                    <div className="box">
                        
                    </div>
                </div>
            </section>
        </div>
    )
}