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
