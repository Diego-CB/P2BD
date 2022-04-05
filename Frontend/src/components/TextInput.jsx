import React from "react";

const TextInput = ({className, initValue, title, password, set}) => {
	
	(password == null || password === false) ? password = 'text': password = 'password' 
	
	return (
		<div className={className}>
			<h4>{title}</h4>
			<input onChange={(event) => set(event.target.value)}
			type={password} value={initValue}/> 
		</div>		
	)
}

export default TextInput