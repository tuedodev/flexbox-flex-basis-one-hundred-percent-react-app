import React, { useState, useEffect } from 'react';
import DisplayInterval from './DisplayInterval'

function Card({className, handler}) {
    const [basis, setBasis] = useState(100);
    
    const increase = () => { if (basis < 300) {
        setBasis(prevState => prevState + 10)
    }}
    const decrease = () => {
        if (basis > 30) {
            setBasis(prevState => prevState - 10)
        }
    }

    const basisReset = () => {
        setBasis(100)
    }

    useEffect(() => {
        if (handler){
            handler(basis);
        }
        
     }, [basis]);
    
    
    return (
        <li className={(className? `${className} `:``) + 'card shadow'} style={{flexBasis: `${basis}%`}}>
            <p className="small-text">Flex-basis:</p>
                
            <p className="big-text">
                <DisplayInterval newNumber={basis} symbol='%'/>
            </p>
            <div className="button-container">
                <button className="btn" type="button" onClick={decrease}>-</button>
                <button className="btn" type="button" onClick={increase}>+</button>
                <button className="btn" type="button" onClick={basisReset}>&#8634;</button>
            </div>
        </li>
    )
}

export default Card
