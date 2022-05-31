import React from "react";

const TextInput_text = ({className, initValue, title, password, set}) => {
	
	(password == null || password === false) ? password = 'text': password = 'password' 
	
	return (
		<div className={className}>
			<h4>{title}</h4>
			<input onChange={(event) => set(event.target.value)}
			type='text' value={initValue}/>
		</div>
	)
}

export default TextInput_text