'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//let saludar = name => `Hola ${name}`; 
//
//saludar('daniel');
//
//saludar('yadira');


var Task = function () {
	function Task(name) {
		_classCallCheck(this, Task);

		this.name = name;
		this.isComplete = false; //si la tarea esta completa o no?
	}

	//metodo que complete la tarea


	_createClass(Task, [{
		key: 'complete',
		value: function complete() {
			this.isComplete = !this.isComplete; //el nuevo valor de isComplete va a ser el opuesto al q ya tenia
		}
	}]);

	return Task;
}();

//------------------------


var TaskList = function () {
	function TaskList(name) {
		_classCallCheck(this, TaskList);

		this.name = name; //nombre tarea
		this.tasks = []; //tareas 
	}

	//metodos
	//agregarTarea(tarea,elemento)


	_createClass(TaskList, [{
		key: 'addTask',
		value: function addTask(task, element) {
			this.tasks.push(task); //cogo la tarea q le pase por param a esta funcion y la meto al array tasks
			this.renderTasks(element); //renderizando la tarea
		}

		//i=indice

	}, {
		key: 'removeTask',
		value: function removeTask(i, element) {
			this.tasks.splice(i, 1); //eliminar 1 tarea del indice i
			this.renderTask(element); //dibujarlo en pantalla(render)	
		}

		//renderizar las tareas en el nave

	}, {
		key: 'renderTasks',
		value: function renderTasks(element) {
			var tasks = this.tasks.map(function (task) {
				return '\n\t\t<li class="task">\n\t\t\t<input type="checkbox" class="task__complete-button">\n\t\t\t<span class="task__name">' + task.name + '</span>\n\t\t\t<a href="#" class="task__remove-button">X</a>\n\t\t</li>\n\t\t';
			});
			element.innerHTML = tasks.reduce(function (a, b) {
				return a + b;
			}); //metelo como un html interno
		}
	}]);

	return TaskList;
}();

//------------------------------------------------------
//Trabajando con el DOM
//1 obtener los elementos con el q vamos a  trabajar 


var addTaskElement = document.getElementById('add-task');
var taskContainerElement = document.getElementById('tasks-container');
var inbox = new TaskList('inbox');

//Añadir tarea desde el DOM
//esta funcion capturara el texto q escribire en el input luego debera de crear una tarea instanciandola de la clase Task 
function addDOMTask(e) {
	var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : inbox;

	//1. obtener el texto del  input
	if (e.key == 'Enter') {
		//capturara el contenido del input
		var task = new Task(this.value); //this.value <- este elemento osea input.valor

		//3. añadir la tarea a la lista
		list.addTask(task, taskContainerElement);

		// borrar el texto del input
		this.value = "";
	}
}

addTaskElement.addEventListener('keyup', addDOMTask);

//Obtener indice de la tarea actual
function getTaskIndex(e) {
	var taskItem = e.target.parentElement,
	    tasksItems = [].concat(_toConsumableArray(taskContainerElement.querySelector('li')));
	return tasksItems.indexOf(taskItem);
}

//Eliminar tarea desde el DOM
function removeDOMTask(e) {
	var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : inbox;

	//	console.log('remove');
	//1.detectar si he hecho click a una etiqueta a
	if (e.target.tagName === 'A') {
		//remover tarea de la lista(se necesita el indice, elemento a eliminar)
		list.removeTask(getTaskIndex(e), taskContainerElement);
	}
}
taskContainerElement.addEventListener('click', removeDOMTask);

//Completar la tarea
function completeDOMTask(e) {
	var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : inbox;

	//	console.log('remove');
	//1.detectar si he hecho click a una etiqueta a
	if (e.target.tagName === 'INPUT') {
		//completar la tarea de la lista(se necesita el indice, elemento a eliminar)
		list.tasks[getTaskIndex(e)].complete();
		//en el navegador podre ve si la tarea se completo gracias a css
		e.target.parentElement.classList.toggle('complete');
		console.table(list.tasks);
	}
}
taskContainerElement.addEventListener('click', completeDOMTask);