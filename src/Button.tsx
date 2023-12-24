import React from 'react';
import {isDisabled} from "@testing-library/user-event/dist/utils";

type ButtonPropsType = {
    title: string
    onClickHandler?: () => void
    isDisabled?: boolean
}
export const Button = (props: ButtonPropsType) => {
    return (
        <button
            onClick={props.onClickHandler}
            disabled={props.isDisabled}>{props.title}</button>
    )
}

