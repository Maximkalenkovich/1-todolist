import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';


type AddItemFormProps = {
    callBack: (title: string) => void
}

export const AddItemForm = memo((props: AddItemFormProps) => {
    console.log('addItemForm')
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error)setError(null)
        if (e.charCode === 13) {
            addTask();
        }
    }

    return (
        <div>
            <TextField value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       variant={"outlined"}
                       error={!!error}
                       helperText={error ? 'Incorrect entry.': ''}
            />
            <IconButton onClick={addTask} color={"primary"}>
                <AddIcon/>
            </IconButton>

        </div>
    );
}) ;

