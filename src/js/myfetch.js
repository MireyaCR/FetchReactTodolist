export const putTask= (tareas)=>{
    
	const nuevastareas = tareas.map((element)=>{
		return {"label":element,"done":false}
	})
	const raw = JSON.stringify(nuevastareas);
	
	const requestOptions = {
	  method: 'PUT',
	  headers: {'Content-Type':'application/json'},
	  redirect: 'follow',
	  body: raw
	};

	return fetch("https://assets.breatheco.de/apis/fake/todos/user/mireyaCR", requestOptions)
	.then(async response => {
		return await response.json()
	})
	.catch(error => console.log('error', error));

}
export const getTask= async ()=>{
    return fetch("https://assets.breatheco.de/apis/fake/todos/user/mireyaCR")
}

