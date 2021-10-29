import { Component, createElement } from "../lib/react/index.js"

import Wrapper from "./wrapper.js"
import User from "./user.js"

export default class App extends Component {
  render() {
    return createElement(
      "div",
      {
        class: "app",
        children: new Wrapper({
          children: new User({ 
            avatar: "./images/ash.jpg",
            name: "Ash Ketchum",
          })
        }),
      },
    )
  }
}
