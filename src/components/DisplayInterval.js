import React, {useState, useEffect, useRef} from 'react'

const DisplayInterval = ({newNumber, duration=200, symbol=''}) => {
    
    const prevNumberRef = useRef();
    const prevNumber = usePrevious(newNumber);
    const [currentNumber, setCurrentNumber] = useState(newNumber);
    
    const requestRef = useRef();
    const startTimeRef = useRef();
    
    function usePrevious(value) {
        
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;

    }

    const animate = (timestamp) => {

        if (startTimeRef.current == null) {
          startTimeRef.current = timestamp;
        }
        
        const deltaTime = timestamp - startTimeRef.current; 
        const numberGap = newNumber - prevNumberRef.current;
        const sign = numberGap >= 0 ? 1 : -1;
        const updatedNumber = Math.min(prevNumberRef.current + sign * Math.round(deltaTime / (duration / Math.abs(numberGap))), newNumber);
        setCurrentNumber(updatedNumber);
        
        if ((timestamp - startTimeRef.current) < duration){
            requestRef.current = requestAnimationFrame(animate);
        } else {
            startTimeRef.current = null;
        }

    }

    useEffect(()=>{
        
        prevNumberRef.current = prevNumber || 0;
        
        if (prevNumber !== newNumber){
            requestRef.current = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(requestRef.current);
        }

    },[newNumber])

    return <span>{currentNumber}{symbol}</span> 

}

export default DisplayInterval
