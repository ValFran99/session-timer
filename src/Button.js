function Button(props){
  return(
    <div onClick={() => props.clickHandler(props.keyValue)} id={props.buttonId} className="button">
      <i className={props.icon}></i>
    </div>
  )
}

export default Button;