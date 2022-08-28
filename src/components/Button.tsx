import React from "react";

type ButtonPropsType = {
  buttonNick: string;
  callBack: () => void;
  
};

export function Button(props: ButtonPropsType) {
  
const onClickHadler =()=>{
  props.callBack()
}


  return <button 
  onClick={onClickHadler}>
    {props.buttonNick}
    </button>;
}
