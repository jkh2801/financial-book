import './Calendar.scss'
import moment from 'moment'
import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import Nav from './Nav'

export default function Calendar(props) {
    console.log("calendar")
    const login = useSelector (state => state.dataReducer.login)
    if(!login) {
        alert("로그인을 해주세요.")
        props.history.push("/")
    }
    const dispatch = useDispatch()
    const [today, setToday] = useState(moment())
    const [select, setSelect] = useState(today.clone())
    const [year, setYear] = useState(today.clone().year())
    const [isDatepick, setisDatepick] = useState(false)
    const start = today.clone().startOf('month')
    const end = today.clone().endOf('month')
    const strWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    const week = strWeek.map((w, idx) => {
        return(
            <div className="week" key={idx}><span>{w}</span></div>
        )
    })
    const data = useSelector(state => {
        console.log(year)
        console.log("state")
        console.log(state)
        if(state.dataReducer.data[year] === undefined || state.dataReducer.data[year][today.clone().month()+1] === undefined) return (state.dataReducer.data.empty)
        return (state.dataReducer.data[year][today.clone().month()+1])
    })
    console.log(data)
    const array = Array(32).fill(null)
    data.forEach((n) => {
        if(array[n.day] === null) array[n.day] = []
        array[n.day].push(n)
    })
    console.log(array)
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
        return (
            week.map((w, idx) => {
                return(
                <div key={idx} className="row">
                    {Array(7).fill(0).map((n, idx) => {
                        let current = today.clone().week(w).startOf('week').add(n+idx,'day')
                        let isCurrent = current.format('MM') === today.format('MM') ? '' : 'grayed'
                        let isSelect = current.format('YYYY-MM-DD') === select.format('YYYY-MM-DD') ? 'selected' : ''
                        let price = 0
                        if(array[current.date()] != null) array[current.date()].forEach((n) => {
                            if(n.type === "g") price += n.price
                            else price -= n.price
                        })
                        const checkDay = () => {
                            if(!isCurrent) setSelect(current.clone())
                        }
                        return(
                        <div className={`day ${isCurrent} ${isSelect}`} key={idx} onClick={checkDay}>
                            <span>{current.format('D')}</span>
                            <div className={`${price >= 0 ? "green" : "red"} ${isCurrent}`}>{price === 0 ? '': Math.abs(price)}</div>
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
            <div className={`datepicker ${isDatepick? 'selected':''}`}>
                <div className="dateText" onClick={() => setisDatepick(!isDatepick)}><span>{today.year()}</span>&nbsp;&nbsp;-&nbsp;&nbsp;<span>{today.month()+1}</span></div>
                <div className="picker">
                    <div className="year">
                        <div className="arrow"><i className="fa fa-angle-left" onClick={() => setYear(year-1)} ></i></div>
                        <div>{year}</div>
                        <div className="arrow"><i className="fa fa-angle-right" onClick={() => setYear(year+1)}></i></div>
                    </div>
                    <div className="months">
                        {Array(12).fill(1).map((n, idx) => <div key={idx} className={n+idx === today.clone().month()+1? 'selected' : ''} onClick={() => {
                            setToday(today.clone().year(year).month(n+idx-1))
                            setisDatepick(!isDatepick)
                            }}>{n+idx}</div>)}
                    </div>
                </div>
            </div>
        )
    }
    const [active, setActive] = useState(false)
    const [radio, setRadio] = useState(false)
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [isWrite, setisWrite] = useState(false)
    const [id, setID] = useState(0)
    const box = () => {
        if(array[select.date()] === null) array[select.date()] = []
        let submitType = "submit"
        const openBx = (data) => {
            setisWrite(true)
            setActive(true)
            setCategory(data.category)
            setPrice(data.price)
            data.type === "r" ? setRadio(true) : setRadio(false)
            setID(data.id)
        }

        const handleSubmit = (e, type) => {
            e.preventDefault();
            if(type === "submit") {
                const addData = {
                    id : data.length+1,
                    month : select.clone().month()+1,
                    day : select.clone().date(),
                    category : e.target.category.value,
                    type : e.target.radio.value === "green" ? "g" : "r",
                    price : Number(e.target.price.value)
                }
                dispatch({type:"ADD", data: addData, year: year, month: select.clone().month()+1})
            }
            if(type === "update" || type === "delete")  {
                const addData = {
                    id : id,
                    month : select.clone().month()+1,
                    day : select.clone().date(),
                    category : e.target.category.value,
                    type : e.target.radio.value === "green" ? "g" : "r",
                    price : Number(e.target.price.value)
                }
                console.log(addData)
                if(type === "update" ) dispatch({type:"UPDATE", data: addData, id: id, year: year, month: select.clone().month()+1})
                else dispatch({type:"DELETE", data: addData, id: id, year: year, month: select.clone().month()+1})
            }
            setActive(!active)
            setCategory("")
            setPrice("") 
            setRadio(false)
            setisWrite(false)
        }


        return (
            <div className="box">
                <div className="setBx"><div className="chartBx" onClick={() => {
                    setchartToggle(!chartToggle)
                    setTypeToggle(false)
                    }}>Chart</div>{select.format('D')+"일"}</div>
                <div className="infoBx">
                    {array[select.date()].map((n, idx) => <div className="info" key={idx} onClick={() => openBx(n)}><span>{n.category}</span><span>{(n.type === "r" ? "-" : "+")+n.price+"원"}</span></div>)}
                </div>
                <div className="btnBx">
                    <div className={`cBx ${active ? 'active' : ''}`}>
                        <form onSubmit={(e) => handleSubmit(e, submitType)}>
                            <div className="row"><label>카테고리</label><input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)}></input></div>
                            <div className="row radioBx"><label onClick={() => setRadio(!radio)} className={`${!radio? "checked": ""}`}><input type="radio" name="radio" value="green" checked={!radio? "checked": ""} onChange={() => setRadio(false)}></input>저축</label><label onClick={() => setRadio(!radio)} className={`${radio? "checked": ""}`}><input type="radio" name="radio" value="red" checked={radio? "checked": ""} onChange={() => setRadio(true)}></input>지출</label></div>
                            <div className="row"><label>금액</label><input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)}></input></div>
                            <div className="row">
                                <button type="submit" className={!isWrite? "":"none"} onClick={() => submitType = "submit"}>추가</button>
                                <button type="submit" className={isWrite? "":"none"} onClick={() => submitType = "update"}>수정</button>
                                <button type="submit" className={isWrite? "":"none"} onClick={() => submitType = "delete"}>삭제</button>
                                <button type="submit" onClick={() => submitType = "close"}>닫기</button>
                            </div>
                        </form>
                    </div>
                    <button onClick={() => setActive(!active)}>추가</button>
                </div>
            </div>
        )
    }
    const [chartToggle, setchartToggle] = useState(false)
    const [typeToggle, setTypeToggle] = useState(false)
    const chart = () => {
        let rArr = {
            total : 0, arr: []
        }
        let gArr = {
            total : 0, arr: []
        }
        data.forEach(item => {
            if(item.type === "r") {
                const arrData = rArr.arr.find((r) => r.category === item.category)
                if(arrData === undefined) rArr.arr.push({category: item.category, type: "r", price: item.price})
                else arrData.price += item.price
                rArr.total += item.price
            } else {
                const arrData = gArr.arr.find((r) => r.category === item.category)
                if(arrData === undefined) gArr.arr.push({category: item.category, type: "g", price: item.price})
                else arrData.price += item.price
                gArr.total += item.price
            }
        })
        rArr.arr.sort((a,b) => b.price - a.price)
        gArr.arr.sort((a,b) => b.price - a.price)
        console.log(rArr)
        console.log(gArr)
        const chartData = (data) => {
            let arr = []
            data.arr.forEach((i) => arr.push({name: i.category, sliced: true, y: (i.price/data.total), price: i.price, tot: data.total}))
            return arr
        }
        const options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                backgroundColor: 'transparent'
            },
            title: {
                text: today.clone().year() + " - " + (today.clone().month()+1),
                style: {fontSize: '25px', color: '#fff'}
            },
            tooltip: {
                pointFormat: '<b>{point.price}원 / {point.tot}원</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            credits: {
                enabled: false
              },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                colorByPoint: true,
                data: chartData(!typeToggle? gArr : rArr)
            }]
        }
        return (
            <div className={`chart ${chartToggle ? "active" : ""}`}>
                <span className="btnBx">
                    <span className={`btn ${!typeToggle? "active" : ""}`} onClick={() => setTypeToggle(!typeToggle)}>저축</span>
                    <span className={`btn ${typeToggle? "active" : ""}`} onClick={() => setTypeToggle(!typeToggle)}>지출</span>
                </span>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        )
    }
    
    return (
        <div>
        <Nav number={1} history={props.history}></Nav>
        <section className="cal">
            <div className="cal_container">
                <div className="calendar">
                    {chart()}
                    <div className="settings">
                        <div className="arrow"><i className="fa fa-chevron-left" onClick={() => {
                            setToday(today.clone().subtract(1, 'months'))
                            setYear(today.clone().subtract(1, 'months').year())
                            setSelect(today.clone().subtract(1, 'months'))
                            }}></i></div>
                            {picker()}
                        <div className="arrow"><i className="fa fa-chevron-right" onClick={() => {
                            setToday(today.clone().add(1, 'months'))
                            setYear(today.clone().add(1, 'months').year())
                            setSelect(today.clone().add(1, 'months'))
                            }}></i></div>
                    </div>
                    <div className="dates">
                        <div className="row">{week}</div>
                        {days()}
                    </div>
                </div>
                {box()}
            </div>
        </section>
        </div>
    )
}