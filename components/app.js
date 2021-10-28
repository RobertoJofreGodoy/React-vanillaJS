import { Component, createElement } from "../lib/react/index.js"

import Wrapper from "./wrapper.js"
import User from "./user-styled.js"

const element = createElement(
  "h1",
  { class: "title" },
  "hola mundo desde create element"
)

console.log(element)

export default class App extends Component {
  render() {
    return `
        <div class="app">
            ${new Wrapper({
              children: `
                ${new User({ 
                    avatar: "./images/ash.jpg",
                    name: "Ash Ketchum",
                }).render()}
                `,
            }).render()}
        </div>
        `
  }
}
