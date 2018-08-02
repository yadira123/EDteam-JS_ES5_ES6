import gulp from 'gulp';
import babel from 'gulp-babel';


/*metodos que debo de conocer:
gulp:task(); <- define una tarea
gulp.src(); <- indica un directorio en el cual GULP va a buscar archivos con los cuales va a trabajar
gulp.dest(); <- define un directorio en el cual GULP va a dejar los archivos ya procesados
gulp.watch(); <- esta mirando los cambios en un directorio o en un archivo especifico y cuando haiga un cambio automaticamente ejecuta la tarea q yo le haiga indicado.
Las tareas se hacen a traves de plugings 
*/


//-----------	creando una TAREA	---

/*task('nombreTarea', (funcion donde va a estar el cuerpo de la tarea) => {
	gulp.src('rutaABuscar')
	.pipe(nombrePlugin)
	.pipe(gulp.dest('rutaDestino'))
})
*/
gulp.task('es6', () => {
	gulp.src('./es6/*.js')
	.pipe(babel())
	.pipe(gulp.dest('./es5'))
});


//tarea para watch(mirar)
/*
default para evitar escribir nombre d esta tarea
gulp.watch('rutaDondeVaAMirar',[arrayDeTareasAEjecutarCuandoCambieElArchivo])
*/
gulp.task('default', () => {
	gulp.watch('./es6/*.js',['es6'])
});








