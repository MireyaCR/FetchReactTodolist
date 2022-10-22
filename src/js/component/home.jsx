
import React, { useState,useEffect} from 'react';
import { getTodoList } from '../../services/getTodoList';
import { updateTodoList } from '../../services/updateTodoList';
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const Home = () => {
	const [tareas, setTareas] = useState([]);
	useEffect(() => { 
		getTodoList().then(response =>setTodoList(response))
	},[]);
	useEffect(() =>{
		updateTodoList(tareas);
	},[tareas] )
	
	return (
		<div className="container h-25 mt-5 p-5">
			<h3>Tasks</h3>
			<input className="form-control sm mb-3"type="text" placeholder='What needs to be done?' onKeyDown={(event)=>{
				if (event.key === 'Enter') {
					setTareas([...tareas, event.target.value])
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
				}}></button>
				</li>)}	
			</ul>
			<p><small>{tareas.length} Task</small></p>
		</div>
)};


export default Home;
