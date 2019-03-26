import React from 'react';
import { Line } from 'rc-progress';

const RemainingBar = (props) => (
    <div>
        <p id="remaining-text"  className="green-text">
           ${props.income - props.spent}/${props.income}
        </p>
        <Line 
        id="remaining-bar" 
        trailWidth="8" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeColor="rgb(20, 180, 20)" 
        percent = {props.remainingPercent > 0 ? props.remainingPercent : 0}/>
    </div>
)

export default RemainingBar;