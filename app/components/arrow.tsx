import React, {useState} from "react";
export interface ArrowProps {
}
export default function Arrow(props: ArrowProps) {
    const [fillColor, setFillColor] = useState('black')
    const onMouseEnter = (currentTarget) => {
        setFillColor('blue')
    }
    const onMouseLeave = (currentTarget) => {
        setFillColor('black')
    }
    return (
        <svg width="1em" height="1em" className="Arrow" viewBox="0 0 492 492" onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}
             fill={fillColor}>
            <path
                d="M484.13 124.99l-16.11-16.23a26.72 26.72 0 00-19.04-7.86c-7.2 0-13.96 2.79-19.03 7.86L246.1 292.6 62.06 108.55c-5.07-5.06-11.82-7.85-19.03-7.85s-13.97 2.79-19.04 7.85L7.87 124.68a26.94 26.94 0 000 38.06l219.14 219.93c5.06 5.06 11.81 8.63 19.08 8.63h.09c7.2 0 13.96-3.57 19.02-8.63l218.93-219.33A27.18 27.18 0 00492 144.1c0-7.2-2.8-14.06-7.87-19.12z"></path>
        </svg>
    )
}