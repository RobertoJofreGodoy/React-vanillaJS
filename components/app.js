import { Component } from "../lib/react.js"
import Wrapper from "./wrapper.js"
import User from "./user-styled.js"

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
