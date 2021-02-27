import React from 'react'

const ColumnDisplay = ({number}) => {
    return (
        <>
             { [...Array(number)].map((_, index) => (
                <span className="column-display" key={index}>&#9607;</span>
             ))}
        </>
    )
}

export default ColumnDisplay
