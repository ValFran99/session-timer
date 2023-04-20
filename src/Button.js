function Button(props){
  return(
    <div onClick={() => props.clickHandler(props.keyValue)} id={props.buttonId} className={"button " + props.icon}></div>
  )
}

export default Button;