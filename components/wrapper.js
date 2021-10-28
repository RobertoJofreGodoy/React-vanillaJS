import { Component } from "../lib/react.js"

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
