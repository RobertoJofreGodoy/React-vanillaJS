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
por motivos didacticos antes de intentar implementar esta función en nuestra aplicación vamos a utilizarla para crear un "h1" que contenga "Hola Mundo" y la clase "Title", esto lo haremos dede *components/app.js*

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


# Render createElement
Para renderizar el elemento creado anteriormente debemos refactorizar la función **render()** de **react-dom.js**.  

cambiamos *container.innerHTML = element.render()* por **container.append(element.render())**, debido a que como nuestro elemento ya es un elemento HTML solo necesitamos pasarlo al contenedor

y ya podemos renderizar los elemento de **createElement**.

# Children
Ahora tenemos el problema de que no podemos renderizar componentes dentro de un componente, para solucionarlo vamos a **ReactElement.js**.
Debemos validar las props recibidas en **createElement** ya que no todas son atributos, para ello agregamos una validación en **setProperties()**, si la **prop** es **children** vamos a ejecutar una nueva función que renderice childrens, esta se llamará **renderChildren()** y al igual que **render** de **react-dom.js** esta recibe un elemento a renderizar y el contenedor del mismo:

```JS
function setProperties(prop, value, element) {
    // Soporte para Childrens
    if (prop === 'children') {
        return renderChildren(value, element)
    }

    // Soporte para atributos
    const attribute = value
    return element.setAttribute(prop, attribute)
}
```
Ahora, esta lógica ya la tenemos en la aplicación, es la misma de render() de react-dom.js, así que vamos a importarlo y utilizaro en **renderChildren()**

```JS
import { render } from "../../react-dom.js"

function renderChildren(children, container){
    return render(children, container)
}
```
Si vamos a app.js e intentamos renderizar lo siguiente, Tendremos un error:
```JS
export default class App extends Component {
  render() {
    return createElement(
      "div",
      {
        class: "app",
        children: createElement("h1", { class: "title" }, "Hola"),
      },
      "esta es la app"
    )
  }
}
```
Esto se debe a que nuestro componente hijo no tiene el método *render()* que se ejecuta en **react-dom.js**.  
Si nos vamos a ReactJS veremos que react-dom acepta **clases**, **elementos HTML** y **strings**, y de momento nuestro render() solo renderiza clases con el método render(), así que hagamos unas validaciones para saber que tipo de elemento está recibiendo nuestro **render()**:
```JS
export function render(element, container) {
  if (typeof element === 'string' || element instanceof Element) {
    return container.append(element)
    
  }
  const childElement = element.render()
  container.append(childElement)
}
```
- **typeof element === 'string'**: nos permite saber si el elemento es un string
- **element instanceof Element**: nos permite saber si el elemento es una instancia de un elemento HTML
Si cualquiera de esas condiciones se cumple, renderizamos el elemento tal cual, sino, lo hacemos con el método render().  

Si volvemos a renderizar lo que teniamos en app.js ahora si que podremos ver el componente con su componente hijo.

# Multiples Childrens
¿Que pasa si queremos renderizar multiples hijos dentro de un componente?
```JS
export default class App extends Component {
  render() {
    return createElement(
      "div",
      {
        class: "app",
        children: [
          createElement("h1", { class: "title" }, "Hola"), 
          createElement("h1", { class: "title" }, "Mundo"), 
        ],
      },
      "esta es la app"
    )
  }
}
```
SPOILER: no funciona.  
esto se debe a que en nuestra funcion **renderChildren()** no tenemos en cuenta que podemos recibir un Array de children, pero esto se soluciona con una validación muy simple:
```JS
function renderChildren(children, container){
    if (Array.isArray(children)) {
        return children.forEach( (child) => {
            render(child, container)
        })
    }
    return render(children, container)
}
```
**Array.isArray()** nos permite saber si un elemento es un Array, si es así, lo iteramos y rendrizamos cada elemento, de esta manera podemos renderizar multiples childrens dentro de un componente.

Ahora refactorizamos los componentes **user.js** y **wrapper.js** para crearlos con createElement.

> NOTA: para ver el código hasta este momento ir al commit "Render createElement y Childrens"

# Eventos
En ReactJS los eventos siempre comienzan por 'on...' ej: onClick, onChange...y estos son declarador en las **props** del componente y permiten ejecutar una función.
Para poder hacer esto posible, debemos dar soporte a los eventos al momento de asignar las props en **ReactElement**, ya que hasta el momento solo soportamos *children y atributos*.  
Para ello en **setProperties()** debemos seguir los siguientes pasos:
- validamos si la prop empieza por **'on'**, esta es la convención que indica que es un **evento**.
- debemos convertir el string **'onClick'** a **'click'** (puede ser cualquier evento en realidad)
  - reemplazamos el texto 'on' por ''
  - pasamos a minuscula lo restante
- Ejecutamos una nueva función, **setEvents()** que recibirá 3 parámetros:
  - **element**: el elemento al que se le asignará el evento
  - **event**: el evento, ej: 'click', 'change'...
  - **value**: que será la función a ejecutar, osea, el **callback**.

En **setEvents()** solo debemos tomar el elemento en cuestión, agregarle un **addEventListener** con el **evento** a escuchar y el **callback**:
```JS
function setEvents(element, event, callback) {
  return element.addEventListener(event, callback)
}

function setProperties(prop, value, element) {
  // Soporte para Eventos
  if (prop.startsWith('on')) {
    const event = prop.replace('on', '').toLowerCase()
    return setEvents(element, event, value )
  }

  // Soporte para Childrens
  //...
  //..

  // Soporte para atributos
  //...
  //..
}
```
Agreguemos un onClick al componente User:
```JS
export default class User extends Component {

  handleClick = (event) => {
    console.log(this.props.name)
  }

  render() {
    const { avatar, name } = this.props

    return createElement(
      "div",
      { 
        onClick: this.handleClick,
        class: "user",
        children: [
          createElement('div', { 
            class: 'avatar', 
            children: createElement('img', { src: avatar},)
        }, '' ),
        createElement('h2', {}, name )
        ]
      }, ''
    )
  }
}
```
Y LISTO

> NOTA: para ver el código hasta este momento ir al commit "Eventos como props"

# SetState
Ahora, ya somos capaces de crear componentes con clases, eventos, props, hijos... nos falta hacerlos dinámicos, tener un estado y que al modificarlo el elemento se reRenderice, al fin y al cabo, esa es la magia de ReactJS...  

Para ello nos vamos a nuestra clase base a nuestro **React.js**, para agregarle el método **setSate** ya que es un método que tendrán todos los componentes.  

**setState nos devolverá un nuevo estado**, que es el que le llagará por parámetro, y este nuevo estado debe actualizar el estado actual.  

Por lo tanto, debemos tener un **estado original**, asi que en el constructor vamos a crear este estado... al igual que las props no sabemos que tendrá el estado por lo que lo iniciamos como un *Objeto* vacio.  
Luego en **setState**, debemos modificar el estado actual para sumarle lo que venga en el nuevo estado, recordemos que el **state** es un **Objeto**, por lo que puede guardar multiples propiedades... y como no sabemos qué propiedad es la que se ha actualizado, **setState** siempre debe **guardar el state anterior y agregar o modificar solo las propiedades afectadas**, suena complejo, pero con los **Spread Operator** esto queda en 2 simples lineas:
```JS
export class Component {
  constructor(props = {}, state = {}) {
    this.props = props
    this.state = state
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState
    }
  }
}
```
Con esto ya podemos hacer referencia al **state** dentro de cualquier componente y actualizarlo, pero nos falta que el componente se reRenderice. Para ello nos vamos a **react-dom**:  

Recordemos que **react-dom** es el encargado final de renderizar cualquier elemento de nuestra app.
Vamos a crear la función **reRender()** que recibirá el componente modificado con el nuevo **state** y lo reemplazará por el componente "viejo". Además el *nuevo componente* debe pasar a ser el *viejo componente* para poder volver a ejecutar esta lógica.
Esta función la guardaremos dentro de un método del elemento (que aún no hemos creado), para que el elemento pueda utilizar esta función y actualizarse por su cuenta, el método lo llamaremos **update**:

```JS
export function render(element, container) {
  if (typeof element === 'string' || element instanceof Element) {
    return container.append(element)
  }
  
  function reRender(newChild){
    container.replaceChild(newChild, childElement)
    childElement = newChild
  }
  //guardamos la funcion reRender dentro del método update del elemento
  element.update = reRender

  let childElement = element.render()
  container.append(childElement)
}
```
Ahora al modificar el **state** debemos llamar al **update** que contiene el **reRender**, pero estamos modificando el componente mismo, por lo que necesiamos poder hacerlo de manera segura, privada, para ello vamos a crear un método privado, esto se hace agregando el simbolo # en el nombre del método, el nuevo método privado se llamará **#update** que sçolo podrá ser accedido desde el mismo componente y será el encargado de llamar a **update** y pasarle como parámetro el nuevo componente a renderizar... Ejecutaremos **#update()** cada vez que se modifique el **state**:

```JS
export class Component {
  constructor(props = {}, state = {}) {
    this.props = props
    this.state = state
  }
  //update alamcena reRender()
  update() {}

  #updater() {
    this.update(this.render())
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    }
    this.#updater()
  }
}
```
Vamos a agregarle un **state** a *user.js* que almacene la edad y al hacer click en el elemento aumente la edad en 1
```JS
export default class User extends Component {
  //propiedad state de User 
  state = { 
    age: 10
  }

  handleClick = (event) => {
    this.setState({
      //sumamos 1 a la edad que ya teniamos
      age: this.state.age + 1,
    })
  }

  render() {
    const { avatar, name } = this.props
    //llamamos al state
    const { age } = this.state

    return createElement(
      "div",
      { 
        onClick: this.handleClick,
        class: "user",
        children: [
          createElement('div', { 
            class: 'avatar', 
            children: createElement('img', { src: avatar},)
        }, '' ),
        //mostramos nuestro state en pantalla
        createElement('h2', {}, `Hola soy ${name} y tengo ${age} años` )
        ]
      }, ''
    )
  }
}
```
Y LISTO, al hacer click en el componente se actualiza la edad de Ash! Tenemos el pequeño inconveniente de que se reRenderiza el componente completo y no solo la edad, pero es un gran avance!

> NOTA: para ver el código hasta este momento ir al commit "Actualizando el estado del componente - SetState"

# ciclo de vida de un componente
Otra de las carácteristicas de ReactJS es que cada componente tiene varios “métodos de ciclo de vida” que permiten ejecutar código en momentos particulares del proceso del componente.  
Vamos a implementar 3 momento del ciclo de vida de un componente:
- **componentWillMount**: Método que se llama antes de que se renderice el componente.
- **componentDidMount**: Método que se llama cuando el componente se pinta en el navegador.
- **componentDidUpdate**: Método que se llama cuando el componente se actualiza.

Estos métodos los declaramos en la clase **Component** de nuestro **React.js** e irán vacios, con el objetivo de poder sobreescribirlos para ejecutar algo cuando nuestro componente haga algo.

Nuestro objetivo es llamar a cada uno de estos métodos en el momento exacto.
Empecemos con **componentWillMount()**
### componentWillMount 
Debemos llamar a este método antes de que el componente se renderice, pero sabiendo que se va a renderizar.
Nuestros componentes se renderizan en el **react-dom.js** con el método **render()**.
Entonces, creemos un nuevo método intermedio, al que llamaremos **build()** que llamará al método **render()** de nuestro **Component** y que será llamado por nuestro **react-dom**.
Dentro de **build()** ejecutaremos **componentWillMount()** antes de ejecutar el **render()** 

### componentDidMount 
Debemos llamar a este método después de que se renderice nuestro componente.
Para este caso lo tenemos más fácil, simplemente llamamos al método al final de nuestro **react-dom**.

### componentDidUpdate 
Debemos llamar a este método cuando se haga una actualización en el componente.
Por lo ejecutaremos en el método privado **#update()** despues del **reRender**

```JS
export class Component {
  constructor(props = {}, state = {}) {
    this.props = props
    this.state = state
  }
  update() {}

  #updater() {
    this.update(this.render())
    this.componentDidUpdate()
  }

  //Método que se llama antes de que se renderice el componente
  componentWillMount() {}

  //Método que se llama cuando el componente se pinta en el navegador
  componentDidMount() {}

  //Método que se llama cuando el componente se actualiza
  componentDidUpdate() {}

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    }
    this.#updater()
  }

  build() {
    this.componentWillMount()
    return this.render()
  }
}
```

Ahora desde cualquier componente podemos acceder a estos métodos y ejecutar algo cuando estos sean llamados dentro del ciclo de vida del componente:

```JS
import { Component, createElement } from "../lib/react/index.js"

export default class User extends Component {
  displayName = "User"
  state = {
    age: 10,
  }

  componentWillMount() {
    console.log(`el componente ${this.displayName} se va a renderizar por primera vez`)
  }

  componentDidMount() {
    console.log(`el componente ${this.displayName} se renderizó`)
  }

  componentDidUpdate() {
    console.log(`el componente ${this.displayName} se actualizó`)
  }

  handleClick = (event) => {
    this.setState({
      age: this.state.age + 1,
    })
  }

  render() {
    const { avatar, name } = this.props
    const { age } = this.state

    return createElement(
      "div",
      {
        onClick: this.handleClick,
        class: "user",
        children: [
          createElement(
            "div",
            {
              class: "avatar",
              children: createElement("img", { src: avatar }),
            },
            ""
          ),
          createElement("h2", {}, `Hola soy ${name} y tengo ${age} años`),
        ],
      },
      ""
    )
  }
}
```

Y Ya tenemos ciclo de vida en los componentes!

> NOTA: para ver el código hasta este momento ir al commit "Añadiendo el ciclo de vida"