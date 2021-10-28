# React-dom
creamos el archivo **react-dom.js** dentro de la carpeta *lib*

exportamos la función **render**, que recibe 2 parámetros:
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

creamos el archivo **user.js** que contiene la clase **User** que se extiende de **Component**, esto permite a **User** recibir **props**.
Además, todos los componentes deben tener el método **render()** que será el encargado de **devolver el HTML** que queremos renderizar.

dentro de render() podemos rescatar las **props** y llamarlas dentro del Template Literal que devuelve el componente

# FUNCIONA
Ahora en *index.js* llamamos al componente **User** y creamos una nueva instancia del mismo al pasarlo como parámetro del **render()** de **react-dom**.
Aqui es donde podemos indicar las **props** que podrá utilizar el conponente.

> NOTA: para ver el código hasta este momento ir a "first commit"

# Renderizar componentes dentro de componentes
Para poner a prueba la escalabilidad de la aplicación veremos si con lo hecho hasta ahora es posible renderizar componentes dentro de otros componentes al igual que hace React

Para no llamar al componente *User* desde *index.js* vamos a crear un nuevo componente que envuelva a todos los demás, lo llamaremos **App**

Este componente **App** tiene la misma sintaxis que el componente **User**, es una clase que se extiende de **Component** y que contiene el método **render()**.  

Desde *App* llamamos al componente *User* y lo llamamos dentro del *Template Literal* que devuelve el *render()*

```JS
import { Component } from "../lib/react/index.js"
import User from "./user.js"

export default class App extends Component {
  render() {
    return `
        <div class="app">
            ${new User({
                avatar: "./images/ash.jpg",
                name: "Ash",
            }).render()}
        </div>
        `
  }
}
```
La lógica es la misma, se crea una **nueva instancia de User** que nos permite enviarle **props**, con la diferencia de que **debemos ejecutar el método render()** de *User* al momento de llamarlo

Ahora en *index.js* solo llamamos al componente **App** y todo sigue funcionando igual

# Children
Una de las convenciones que tiene ReactJS es que un componente puede recibir otro componente como parametro, a este se le llama **children**.

Este componente **children** iria como una **prop** del componente padre

> NOTA: no es obligatorio que el componente hijo vaya a una prop llamada children, pero es una convención, se recomienda utilizar la palabra **children**.

Para llevar esto a prueba, vamos a crear el componente **Wrapper** que se encargará de envolver a otros componentes y darles un ancho máximo mediante una clase de css llamada *wrapper*

Al igual que los componentes anteriores, este será una clase que se extiende de Component y que contiene el método render()

Ahora mediante las props podemos extraer el **children** que debe renderizar en su interior

```JS
import { Component } from "../lib/react/index.js"

export default class Wrapper extends Component {
  render() {
    const { children } = this.props
    return `
        <div class="wrapper">
            ${children}
        </div>
        `
  }
}
```
**Wrapper no sabe que componente hijo tiene que renderizar**, por lo que no llamamos a ningún otro componente directamente, este irá dentro del **prop children**.

Llamamos a **Wrapper** desde **App** y creamos una nueva instancia de este componente, pero este **tendrá una prop llamada children** que contiene una nueva isntancia del componente **User** con sus propias props:

```JS
import { Component } from "../lib/react/index.js"
import User from "./user.js"
import Wrapper from "./wrapper.js"

export default class App extends Component {
  render() {
    return `
        <div class="app">
            ${new Wrapper({
              children: `
                ${new User({
                  avatar: "./images/ash.jpg",
                  name: "Ash",
                }).render()}
                `,
            }).render()}
        </div>
    `
  }
}
```

De esta manera podemos renderizar componentes dentro de componentes y crear componentes agnosticos de los componentes hijos que tendrán que renderizar

> NOTA: para ver el código hasta este momento ir al commit "components within components and childrens"


# ReactJS createElement
Dadas las limitaciones de nuestra primera versión de ReactVanilla vamos a refactorizar el proyecto, e implementaremos la función **createElement()** que utiliza ReactJS para crear elementos...  

Para ello vamos a modificar la estructura de las carpetas:  
Hasta ahora *react.js* se encontraba en la carpeta *./lib*, ahora react tendrá su propia carpeta y una subcarpeta src: *./lib/react/src/* aquñi moveremos el archivo *react.js* y pasará a llamarse **React.js**
> esto provocará errores las importaciones, pero las arreglaremos en el siguiente paso

Dentro de esta misma carpeta creamos el archivo **ReactElement.js** que será el encargado de tener nuestro **createElement()**:
```JS
export function createElement() {
  return ''
}
```
Antes de seguir, vamos a crear un archivo intermedio que importe y exporte **React.js** y **ReactElement.js**, para poder llamarlos desde un solo lugar, este archivo será index.js y estará en **./lib/react/** a la misma altura de *src*, el contenido será el siguiente:
```JS
export { Component } from "./src/React.js"
export { createElement } from "./src/ReactElement.js"
```
> con esto importamos y exportamos en solo una sentencia

Ahora todas las importaciones que teniamos de **lib/react.js** las cambiamos a **lib/react/index.js** y listo, la aplicación sigue funcionando igual.  

## creando createElement
Ahora podemos seguir en el archivo **ReactElement.js**.   
**createElement()** es una función que nos permitirá crear elementos en el DOM, para ello recibe 3 parámetros:
- **type**: que elemento vamos a crear... ej: h1, div, img...
- **props**: las propiedades que tendrá el elemento.
- **content**: el contenido del elemento  

```JS
export function createElement(type, props, content) {
  return ''
}
```
por motivos didacticos antes de intentar implementar esta función en nuestra aplicación vamos a utilizarla para crear un <h1> que contenga "Hola Mundo" y la clase "Title", esto lo haremos dede *components/app.js*

```JS
import { Component, createElement } from "../lib/react/index.js"

const element = createElement(
  "h1",
  { class: "title" },
  "hola mundo"
)
```
Ahora, las **props** son un Objeto, y además estas pueden contener cualquier cosa, no solo las clases...
De momento vamos a implementar solo las clases, pero antes debemos poder **iterar props** para poder separar las diferentes propiedades, para ello utilizaremos el método **Object.keys()** que al pasarle un Objeto nos devuelve un Array con los nombres de las llaves, ej:  
```JS
const props = { class: 'title', name: 'Ash', age: 10}
Object.keys(props) // => [ 'class', 'name', 'age' ]
```
Para agregar la clase al elemento crearemos una funcion que reciba otros 3 parámetros:
- **prop**: la propiedes, en este caso 'class' 
- **value**: el valor de la propiedad, en este caso 'title'
- **element**: el elemento al que le queremos asignar el atributo

```JS
function setProperties(prop, value, element) {
    const attribute = value
    //setAttribute coo indica su nombre nos permite agregar un atributo a un elemento, este recibe el atributo y su valor, en este caso 'class' y 'title'
    return element.setAttribute(prop, attribute) 
}
```
Ahora con todo lo anterior, terminemos el **createElement()**:
```JS

function setProperties(prop, value, element) {
    const attribute = value
    return element.setAttribute(prop, attribute) 
}

export function createElement(type, props, content) {
  //Creando tipo de elemento
  const element = document.createElement(type)

  //Contenido
  if (content) {
    element.textContent = content
  }

  // Propiedades
  //Recorremos las props y le pasamos a setProperties: 
  // 1- el nombre de la propiedad
  // 2- el valor, como props es un Objeto y prop es la key con 'props[prop]' traemos el valor
  // 3- el elemento
  Object.keys(props).forEach((prop) =>
    setProperties(prop, props[prop], element)
  )

  return element
}
```

Y LISTO, si desde app.js corremos el siguiente codigo veremos en consola el elemento completo!

```JS
import { Component, createElement } from "../lib/react/index.js"

const element = createElement(
  "h1",
  { class: "title" },
  "hola mundo desde create element"
)

console.log(element)
```

> NOTA: para ver el código hasta este momento ir al commit "refactor y createElement"
