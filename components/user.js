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
