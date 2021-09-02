import React, { useState, useEffect, CanvasHTMLAttributes, SetStateAction, Dispatch } from 'react';
import logo from './logo.svg';
import './App.css';
import { queryByLabelText } from '@testing-library/react';

const canavasSize = {
    width: 1000, height: 600
}

function App() {

    const [start, setStart] = useState(300000);
    const [monthly, setMonthly] = useState(10000);
    const [interest, setInterest] = useState(7);
    const [years, setYears] = useState(10);
    const [maxMoney, setMaxMoney] = useState(5000000);
    const [endMoney, setEndMoney] = useState(9);

    useEffect(() => {
        drawOnCanvas(start, monthly, interest, years, maxMoney, setEndMoney);
    }, [start, monthly, interest, years, maxMoney]);

    return (
        <div className="App">
            <canvas id='theCanvas' width={canavasSize.width} height={canavasSize.height}>

            </canvas>
            <div className='main-grid'>
                <div className='control-grid'>
                    <label>Start</label>
                    <input step="10000" min="0" max="1000000" type="range" onChange={e => setStart(Number(e.target.value))} />
                    <input type='number' value={start} readOnly />
                    <label>Monthy</label>
                    <input step="500" type="range" min="0" max="20000" value={monthly} onChange={e => setMonthly(Number(e.target.value))} />
                    <input type='number' value={monthly} readOnly />
                    <label>Interest</label>
                    <input step="1" type="range" min="-2" max="15" value={interest} onChange={e => setInterest(Number(e.target.value))} />
                    <input type='number' value={interest} readOnly />
                    <label>Years</label>
                    <input step="1" type="range" min="1" max="30" value={years} onChange={e => setYears(Number(e.target.value))} />
                    <input type='number' value={years} readOnly />
                    <label>Max Money</label>
                    <input step="1000000" type="range" min="1000000" max="30000000" value={maxMoney} onChange={e => setMaxMoney(Number(e.target.value))} />
                    <input type='number' value={maxMoney} readOnly />
                </div>
                <div className='pension-grid'>
                    <label>money at retirement</label>
                    <input readOnly value={"ש\"ח " + endMoney.toFixed(0)} />
                    <label>money per month without damaging pension money</label>
                    <input readOnly value={ "ש\"ח " + ((endMoney * (interest / 100)) / 12).toFixed(0)} />
                    <label>net after tax</label>
                    <input readOnly value={ "ש\"ח " + ((endMoney * (interest / 100)) / 12 * (3/4)).toFixed(0)} />
                </div>
            </div>
        </div>
    );
}

export default App;

function drawOnCanvas(start: number, monthly: number, interest: number, years: number, maxMoney: number, setEndMoney: Dispatch<SetStateAction<number>>) {
    const theCanvas: HTMLCanvasElement = document.getElementById('theCanvas')! as any;

    const ctx = theCanvas.getContext('2d')!;
    ctx.font = '14px Tahoma';

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canavasSize.width, canavasSize.height);

    const yearSize = (canavasSize.width) / years;

    for (let i = 0; i < years; i++) {
        ctx.strokeStyle = "rgba(100, 0, 255, 0.4)";
        ctx.beginPath();
        ctx.moveTo(i * yearSize, canavasSize.height);
        ctx.lineTo(i * yearSize, 0);
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillText(i.toString(), i * yearSize + 3, canavasSize.height - 5);
    }
    const totalMoney = maxMoney;
    const moneyLines = 20;
    const moneyGap = canavasSize.height / moneyLines;
    for (let i = 0; i < moneyLines; i++) {
        ctx.strokeStyle = "rgba(100, 0, 255, 0.4)";
        ctx.beginPath();
        ctx.moveTo(0, i * moneyGap);
        ctx.lineTo(canavasSize.width, i * moneyGap);
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillText(((moneyLines - i) * (totalMoney / moneyLines)).toString(), 3, i * moneyGap);
    }



    let money = start;
    let onlyInterestEarning = 0;

    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0, canavasSize.height);

    for (let i = 0; i < years; i++) {

        const y = canavasSize.height - ((money / totalMoney) * canavasSize.height);
        const x = i * yearSize;
        ctx.lineTo(x, y);

        money += (monthly * 12);
        const yearlyInterest = money * (interest / 100);
        money += yearlyInterest;
        onlyInterestEarning += yearlyInterest;

    }

    console.log(onlyInterestEarning);
    console.log(onlyInterestEarning * 0.25);
    console.log((money - onlyInterestEarning * 0.25) / 12);

    ctx.stroke();


    money = start;
    for (let i = 0; i < years; i++) {
        const y = canavasSize.height - ((money / totalMoney) * canavasSize.height);
        const x = i * yearSize;

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.fillText(money.toFixed(0), x + 10, y + 12);

        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.ellipse(x, y, 2, 2, 0, 0, 2 * Math.PI);
        ctx.fill();

        money += (monthly * 12);
        const yearlyInterest = money * (interest / 100);
        money += yearlyInterest;

    }

    setEndMoney(money)

    ctx.stroke();

    // theCanvas.addEventListener('mousemove', e => {

    //     const money = canavasSize.width / e.offsetX * totalMoney;
    //     const year = canavasSize.height / (canavasSize.height - e.offsetY) * years;
    //     // e.offsetX
    //     console.log(money.toFixed(0), year.toFixed(0));

    //     // ctx.fillStyle = 'black';
    //     // ctx.fillText(money.toString() + " - " + year, e.offsetX, e.offsetY);

    // })
}
