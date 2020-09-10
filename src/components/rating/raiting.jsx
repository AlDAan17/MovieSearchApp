import React from "react";
import './rating.css';

function Rating({value}) {
    let color;
    if (value >= 0 && value <= 3) color = '#E90000';
    if (value > 3 && value <= 5) color = '#E97E00';
    if (value > 5 && value <= 7) color = '#E9D100';
    if (value > 7) color = '#66E900';

    const style = {
        border: `2px solid ${color}`
    }

    return(
        <div style={style} className="rating">{value}</div>
    );
}

export default Rating;