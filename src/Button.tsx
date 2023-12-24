import React from 'react';

type ButtonPropsType = {
    title: string
    onClickHanger?: ()=>void
}
export const Button = (props: ButtonPropsType) =>{
    return (
        <button onClick={props.onClickHanger}>{props.title}</button>
    )
}

