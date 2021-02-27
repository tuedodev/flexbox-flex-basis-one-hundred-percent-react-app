import React, { useState, useEffect, useRef } from 'react';
import Card from './Card'
import ColumnDisplay from './ColumnDisplay'
import { v4 as uuidv4 } from 'uuid';

function App() {
    const maxNumber = 8;
    const [number, setNumber] = useState(1);
    const [entry, setEntry] = useState(null);
    const idArr = useRef(Array.from({length: maxNumber}, x => uuidv4()));
    const html = document.documentElement;
    
    const addNumber = () => { if (number < maxNumber){
        setNumber(prevState => prevState + 1);
        setEntry(true);
        }
    }
    
    const subNumber = () => {
        if (number > 1) {
            setNumber(prevState => prevState - 1);
            setEntry(false);
        }
    }
    
    const handlerFlexBasis = (basis) => {
        if (Number.isInteger(basis)){
            if (html){
                html.style.setProperty("--flexBasisStart", `${basis}%`);
            }
        }
    }

    let cardArray = Array.from({length: number-1}, x => ({}));

    if (entry !== null){
        if (entry){
            cardArray.push({className: 'entry', handler: handlerFlexBasis})
        } else {
            cardArray.push({})
            cardArray.push({className: 'exit', handler: handlerFlexBasis})
        }
    } else {
        cardArray.push({handler: handlerFlexBasis})
    }

    useEffect(() => {
        if (entry !== null){
            let dur = entry ? 400:350;
            setTimeout(function(){
                setEntry(null);
            }, dur)
        }
    },[number]);

    useEffect(()=>{
        return ()=>{
            let elem = document.querySelector(`.card-container>li:nth-child(${number})`);
            if (elem && elem.style.flexBasis){
                let fb = elem.style.flexBasis;
                html.style.setProperty("--flexBasisStart", fb);
            } 
        }
    })

    return (
        <>
            <div className="container-fluid px-4">
                <div className="row">
                    <div className="col">
                        <div className="info-container">
                            <h1 className="bg-card">Flexbox: Equal width columns with wonderful flex-basis 100 percent</h1>
                            <p className="info bg-card">The child attribute <code>flex-basis</code> with the value <code>100%</code> in interaction with the flex parent is an ideal way to implement several columns of equal width in one design.</p>
                            <p className="info bg-card">Kudos to Kevin Powell on his <a href="https://youtu.be/vQAvjof1oe4">Youtube channel</a> for this useful tip.</p>
                            <p className="display-columns-container bg-card">Columns: <ColumnDisplay number={number}/></p>
                        </div>
                        <ul className="mb-4 card-container" style={{display: 'flex', flexDirection: 'row',}}>
                        {
                            cardArray.map((cardItem, index) => <Card {...cardItem} key={idArr.current[index]}/>)
                        }
                        </ul>
                        <div className="controls-container">
                            <button disabled={entry!==null} className="btn btn-primary btn-lg" type="button" onClick={subNumber}>-</button>
                            <button disabled={entry!==null} className="btn btn-primary btn-lg" type="button" onClick={addNumber}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
