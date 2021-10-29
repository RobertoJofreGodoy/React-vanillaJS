import { Component, createElement } from "../lib/react/index.js"

export default class User extends Component {

  state = { 
    age: 10
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
          createElement('div', { 
            class: 'avatar', 
            children: createElement('img', { src: avatar},)
        }, '' ),
        createElement('h2', {}, `Hola soy ${name} y tengo ${age} años` )
        ]
      }, ''
    )
  }
}
