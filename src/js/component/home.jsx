import { element } from 'prop-types';
import React, { useState,useEffect } from 'react';
import { putTask, getTask} from '../myfetch';

const Home = () => {
	useEffect(()=>{getTask().then(Response=>(setTareas(Response)),[])})
	const [tareas, setTareas] = useState([]);

	const handleKeydown = async (event) =>{
	
	if (event.key === 'Enter') {
		setTareas([...tareas, event.target.value])
		await putTask(tareas)
	}}

	return (

		<div className="container h-25 mt-5 p-5">
			<h3>Tasks</h3>
			<input className="form-control sm mb-3"type="text" placeholder='What needs to be done?' onKeyDown={handleKeydown} />
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
	);
			}
export default Home;
