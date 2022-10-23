import { element } from 'prop-types';
import React, { useState } from 'react';

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";


const myFetch= (tareas)=>{

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	
	
	var raw = JSON.stringify(tareas.map((element)=>{
		return {"label":element,"done":false}
	}));
	
	var requestOptions = {
	  method: 'PUT',
	  headers: myHeaders,
	  redirect: 'follow',
	  body: raw
	};

	fetch("https://assets.breatheco.de/apis/fake/todos/user/mireyaCR", requestOptions)
	.then(response => {
		console.log(response)
		return response.json()
	})
	.then(resp=>{
		console.log(resp)
	})
	.catch(error => console.log('error', error));
}


const Home = () => {
	

	const [tareas, setTareas] = useState([]);
// myFetch(setTareas)
	return (
		<div className="container h-25 mt-5 p-5">
			<h3>Tasks</h3>
			<input className="form-control sm mb-3"type="text" placeholder='What needs to be done?' onKeyDown={(event)=>{
				if (event.key === 'Enter') {
					setTareas([...tareas, event.target.value])
					myFetch([...tareas, event.target.value])
					event.target.value=""
				}
			}} />
			<ul className="list-group list-group-flush">
				{tareas.map((element, index) => <li key={index+'li'} className="list-group-item"
				onMouseEnter={(event)=>{
					event.target.childNodes[1].style.visibility="visible"
				}}
				onMouseLeave={(event)=>{
					event.target.childNodes[1].style.visibility="hidden"
				}}>{element}
				<button className="btn btn-outline-danger btn-close" key={index} onClick={(event)=>{
					tareas.splice(index,1)
					setTareas([...tareas])
					myFetch([...tareas])
				}}></button>
				</li>)}	
			</ul>
			<p><small>{tareas.length} Task</small></p>
		</div>
)};


export default Home;
