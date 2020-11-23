import './Chart.scss'
import Nav from './Nav'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function Chart(props) {
    const login = useSelector (state => state.dataReducer.login)
    if(!login) {
        alert("로그인을 해주세요.")
        props.history.push("/")
    }
    const data = useSelector(state => state.dataReducer.data)
    const keys = Object.keys(data).filter(i => i !== "empty").sort((a,b) => b-a)
    const [num, setNum] = useState(0)
    let array = Array(12).fill([])
    Object.keys(data[keys[num]]).forEach((key) => array[key-1] = data[keys[num]][key])
    const chart = () => {
        let gArray = Array(12).fill(0)
        let rArray = Array(12).fill(0)
        array.forEach((arr, idx) => {
            let gSum = 0
            let rSum = 0
            arr.forEach((item) => {
                if(item.type === "g") gSum += item.price
                else rSum += item.price
            })
            gArray[idx] = gSum/10000
            rArray[idx] = rSum/10000
        })
        const options = {
            chart: {
                type: 'column',
                zoomType: 'x'
            },
            title: {
                text: keys[num] + "년"
            },
            xAxis: {
                categories: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '저축 (만원)'
                }
            }, {
                title: {
                    text: '지출 (만원)'
                },
                opposite: true
            }],
            legend: {
                shadow: false
            },
            plotOptions: {
                column: {
                    grouping: false,
                    shadow: true,
                    borderWidth: 0,
                    borderRadius: 5
                }
            },
            credits: {
                enabled: false
              },
            series: [{
                name: '저축',
                color: '#50976a',
                data: gArray,
                pointPadding: 0.4,
                pointPlacement: -0.2,
                tooltip: {
                    valueSuffix: ' 만원'
                },
            }, {
                name: '지출',
                color: '#da463c',
                data: rArray,
                pointPadding: 0.4,
                pointPlacement: 0.2,
                yAxis: 1,
                tooltip: {
                    valueSuffix: ' 만원'
                },
            }]
        }
        return (
            <div className="chart_area">
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        )
    }
    const selectBx = () => {
        return (
            <div className="selectBx">
                <select value={num} onChange={(e) => setNum(e.target.value)}>
                    {keys.map((item, idx) => <option value={idx} key={idx}>{item}</option>)}
                </select>
            </div>
        )
    }
    return (
        <div>
            <Nav number={2} history={props.history}></Nav>
            <section className="chart">
                <div className="chart_container">
                    {chart()}
                    {selectBx()}
                </div>
            </section>
        </div>
    )

}