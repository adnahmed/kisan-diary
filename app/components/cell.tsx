import React from "react";
export interface CellProps {
    style?
    value
}
export default function Cell(props) {
    return (
        <div
            className="Cell"
            style={{
                display: 'inline-block',
                padding: 'auto',
                textAlign: 'center',
                borderWidth: '1px',
                ...props.style, // this but for overriding properties below.
            }}
        >
            {props.value}
        </div>
    )
}