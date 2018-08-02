//let saludar = name => `Hola ${name}`; 
//
//saludar('daniel');
//
//saludar('yadira');


class Task{
	
	constructor(name){
		this.name=name;
		this.isComplete=false;//si la tarea esta completa o no?
	}
	
	
	//metodo que complete la tarea
	complete(){
		this.isComplete=!this.isComplete;//el nuevo valor de isComplete va a ser el opuesto al q ya tenia
	}
}





//------------------------
class TaskList{
	
	constructor(name){
		this.name=name;//nombre tarea
		this.tasks=[];//tareas 
	}
	
	
	//metodos
	//agregarTarea(tarea,elemento)
	addTask(task,element){
		this.tasks.push(task);//cogo la tarea q le pase por param a esta funcion y la meto al array tasks
		this.renderTasks(element);//renderizando la tarea
	}
	
	//i=indice
	removeTask(i, element){
		this.tasks.splice(i,1);//eliminar 1 tarea del indice i
		this.renderTask(element);//dibujarlo en pantalla(render)	
	}
	
	//renderizar las tareas en el nave
	renderTasks(element){
		let tasks = this.tasks.map( task => `
		<li class="task">
			<input type="checkbox" class="task__complete-button">
			<span class="task__name">${task.name}</span>
			<a href="#" class="task__remove-button">X</a>
		</li>
		`);
		element.innerHTML = tasks.reduce( (a,b) => a + b);//metelo como un html interno
	}
}


//------------------------------------------------------
//Trabajando con el DOM
//1 obtener los elementos con el q vamos a  trabajar 
const addTaskElement = document.getElementById('add-task');
const taskContainerElement = document.getElementById('tasks-container');
const inbox = new TaskList('inbox');


//Añadir tarea desde el DOM
//esta funcion capturara el texto q escribire en el input luego debera de crear una tarea instanciandola de la clase Task 
function addDOMTask(e, list=inbox) {
	//1. obtener el texto del  input
	if(e.key=='Enter'){
		//capturara el contenido del input
		let task = new Task(this.value);//this.value <- este elemento osea input.valor
		
		//3. añadir la tarea a la lista
		list.addTask(task,taskContainerElement);
		
		// borrar el texto del input
		this.value="";
	}
	
}

addTaskElement.addEventListener('keyup', addDOMTask);


//Obtener indice de la tarea actual
function getTaskIndex(e){
	let taskItem = e.target.parentElement,
		tasksItems = [...taskContainerElement.querySelector('li')];
	return tasksItems.indexOf(taskItem);
}



//Eliminar tarea desde el DOM
function removeDOMTask(e, list = inbox){
//	console.log('remove');
	//1.detectar si he hecho click a una etiqueta a
	if(e.target.tagName==='A'){
		//remover tarea de la lista(se necesita el indice, elemento a eliminar)
		list.removeTask(getTaskIndex(e),taskContainerElement);
	}
}
taskContainerElement.addEventListener('click', removeDOMTask);


//Completar la tarea
function completeDOMTask(e, list = inbox){
//	console.log('remove');
	//1.detectar si he hecho click a una etiqueta a
	if(e.target.tagName === 'INPUT'){
		//completar la tarea de la lista(se necesita el indice, elemento a eliminar)
		list.tasks[getTaskIndex(e)].complete();
		//en el navegador podre ve si la tarea se completo gracias a css
		e.target.parentElement.classList.toggle('complete');
		console.table(list.tasks);
	}
}
taskContainerElement.addEventListener('click', completeDOMTask);



