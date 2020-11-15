import './Calendar.scss'
import moment from 'moment'
import {useState} from 'react'

export default function Calendar() {
    console.log("calendar")
    const [today, setToday] = useState(moment())
    const [select, setSelect] = useState(today.clone())
    const [year, setYear] = useState(today.clone().year())
    console.log(select)
    console.log(today)
    const start = today.clone().startOf('month')
    const end = today.clone().endOf('month')
    console.log(start)
    console.log(end)
    const strWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    const week = strWeek.map((w, idx) => {
        return(
            <div className="week" key={idx}><span>{w}</span></div>
        )
    })
    const days = () => {
        const week = []
        for(let w = (end.week() - start.week() === 5? start.week():start.week()-1); w <= (end.week() - start.week() === 3? end.week()+1 : end.week()); w++) {
            week.push(w)
        }
        if(end.week() < start.week()) {
            for (let w = start.week() === 48 ? 48 : start.week()-1; w <= 53; w++){
                week.push(w)
            }
        }
        console.log(week)
        return (
            week.map((w, idx) => {
                return(
                <div key={idx} className="row">
                    {Array(7).fill(0).map((n, idx) => {
                        let current = today.clone().week(w).startOf('week').add(n+idx,'day')
                        let isCurrent = current.format('MM') === today.format('MM') ? '' : 'grayed'
                        let isSelect = current.format('YYYY-MM-DD') === select.format('YYYY-MM-DD') ? 'selected' : ''
                        return(
                        <div className={`day ${isCurrent} ${isSelect}`} key={idx} onClick={() => setSelect(current.clone())}>
                            <span>{current.format('D')}</span>
                        </div>
                        )
                    })}
                    </div>
                )
            })
            )
        }
    const picker = () => {
        return (
            <div className="datepicker">
                <div className="dateText"><span>{today.year()}</span>&nbsp;&nbsp;-&nbsp;&nbsp;<span>{today.month()+1}</span></div>
                <div className="picker">
                    <div className="year">
                        <div className="arrow"><i className="fa fa-angle-left" onClick={() => setYear(year-1)} ></i></div>
                        <div>{year}</div>
                        <div className="arrow"><i className="fa fa-angle-right" onClick={() => setYear(year+1)}></i></div>
                    </div>
                    <div className="months">
                        {Array(12).fill(1).map((n, idx) => <div key={idx} className={n+idx === today.clone().month()+1? 'selected' : ''} onClick={() => setToday(today.clone().year(year).month(n+idx-1))}>{n+idx}</div>)}
                    </div>
                </div>
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
                        <div className="settings">
                            <div className="arrow"><i className="fa fa-chevron-left" onClick={() => setToday(today.clone().subtract(1, 'months'))}></i></div>
                                {picker()}
                            <div className="arrow"><i className="fa fa-chevron-right" onClick={() => setToday(today.clone().add(1, 'months'))}></i></div>
                        </div>
                        <div className="dates">
                            <div className="row">{week}</div>
                            {days()}
                        </div>
                    </div>
                    <div className="box">
                    
                    </div>
                </div>
            </section>
        </div>
    )
}