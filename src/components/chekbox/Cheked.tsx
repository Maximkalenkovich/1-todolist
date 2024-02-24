import Checkbox from "@mui/material/Checkbox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, {ChangeEvent} from "react";

type ChekboxType = {
    checked: boolean
    callback: (checked:boolean)=>void
}
export const CheckBox = (props:ChekboxType) => {


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        let newIsDoneValue = e.currentTarget.checked;

        props.callback(newIsDoneValue)

    }

    return (
        <Checkbox
            checked={props.checked}
            onChange={onChangeHandler}
            icon={<FavoriteBorderIcon />}
            checkedIcon={<FavoriteIcon />}
        />
    )

}