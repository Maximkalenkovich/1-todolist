import React, {ChangeEvent, memo, useState} from 'react';

import {TextField} from "@mui/material";

type EditableSpanProps = {
    oldTitle: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = memo((props: EditableSpanProps) => {
    console.log('span')
    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.oldTitle)

    const editFoo = () => {
        setEdit(!edit)
        if(edit)addTask()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callBack(newTitle)
    }

    return (
        edit
            ? <TextField value={newTitle} onBlur={editFoo} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={editFoo}>{props.oldTitle}</span>
    );
});

