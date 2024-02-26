import React, {memo} from "react";
import Button, {ButtonProps} from "@mui/material/Button";



interface MyButtonProps extends ButtonProps{
    title: string
}
export const MyButton = memo(({variant,color,onClick,title,...rest}:MyButtonProps) => {

  return(
      <Button color={color} variant={variant}
              onClick={onClick}  {...rest} >{title}
      </Button>
  )
})