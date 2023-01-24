import { element } from 'prop-types';
import React, { useState,useEffect, isValidElement } from 'react';
import { putTask, getTask} from '../myfetch';

const Home = () => {

	const EMPTY = 'There is no pending task';

	useEffect(()=>{getTask().then(async response=>{
		const rest=await response.json()
		setTareas(rest.map(element=>element.label))
	},[])})

	const [tareas, setTareas] = useState([]);

	const handleKeydown = async (event) =>{
		if (event.target.value !== '' && event.key === 'Enter') {
			let nuevasTareas=tareas
			if (nuevasTareas.length === 1 && nuevasTareas[0] === EMPTY)
				nuevasTareas = []
			nuevasTareas = [...nuevasTareas, event.target.value]
			await putTask(nuevasTareas)
			event.target.value = ''
		}
	}

	return (

		<div className="container h-25 mt-5 p-5">
			<h3>Tasks</h3>
			<input className="form-control sm mb-3" type="text" placeholder='What needs to be done?' onKeyDown={handleKeydown}/>
			<ul className="list-group list-group-flush ">
				{tareas.map((element, index) => <li key={index+'li'} className="list-group-item "
				onMouseEnter={(event)=>{
					const cmp = event.target.childNodes[1];
					if (cmp.localName=='button')
						cmp.style.visibility="visible"
				}}
				onMouseLeave={(event)=>{
					const cmp = event.target.childNodes[1];
					if (cmp.localName=='button')
						cmp.style.visibility="hidden"
				}}>{element}
				{element != EMPTY? 
					(<button className="btn fa fa-times justify-content-around" style={{visibility:'hidden',color:'red'}} key={index} onClick={async(event)=>{
						tareas.splice(index,1)	
						if (tareas.length==0){
							tareas.push(EMPTY)
						}
						await putTask([...tareas])
					}}></button>):""
				}
				
				</li>)}	
			</ul>
			<p><small>{tareas[0]===EMPTY?0:tareas.length} Task</small></p>
		</div>
	);
			}
export default Home;
