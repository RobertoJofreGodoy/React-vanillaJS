# React-dom
creamos el archivo **react-dom.js** dentro de la carpeta *lib*

exportamos la función **render**, que recive 2 parámetros:
 - **element**: que es el componente que se va a renderizar
 - **container**: que es dónde se va a renderizar el componente

En **index.js** llamamos a la función **render**, y le pasamos como container el elemento con id **'#root'**.
de momento todavia no tenemos ningún componente que renderizar...

# React
Creamos el archivo **react.js** dentro de la carpeta *lib*

> NOTA: para una mejor comprensión de la lógica que existe detrás de ReactJS en este ejercicio crearemos los componentes en clases y no con funciones

creamos la clase **Compoment** que será la clase padre de todos los componentes.
Esta clase permite recibir **props** en su constructor.

# Components
Creamos la carpeta *components* que será la encargada de almacenar todos nuestros componentes.

creamos el archivo **user.js** que contiene la clase **User** que se extiende de **Component**, esto permite a **User** recivir **props**.
Además, todos los componentes deben tener el método **render()** que será el encargado de **devolver el HTML** que queremos renderizar.

dentro de render() podemos rescatar las **props** y llamarlas dentro del Template Literal que devuelve el componente

# FUNCIONA
Ahora en *index.js* llamamos al componente **User** y creamos una nueva instancia del mismo al pasarlo como parámetro del **render()** de **react-dom**.
Aqui es donde podemos indicar las **props** que podrá utilizar el conponente.

> NOTA: para ver el código hasta este momento ir a "first commit"