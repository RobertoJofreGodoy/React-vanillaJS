import styled from "../lib/styled-components.js"
import { Component } from "../lib/react.js"

const userStyled = styled.setStyle`
  background-image: linear-gradient(
    to bottom,
    #f9f9f9 0%,
    #f9f9f9 130px,
    rgba(0, 0, 0, 0.15) 130px,
    rgba(0, 0, 0, 0.15) 131px,
    white 131px,
    white 100%
  );
  text-align: center;
  overflow: hidden;
  padding: 20px;
  font-family: system-ui;
  border-radius: 0.3rem;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  user-select: none;
`

const avatarStyled = styled.setStyle`
  max-width: 150px;
  border-radius: 50%;
  border: 5px solid white;
  box-shadow: 0 0 2px black;
`

export default class User extends Component {
  render() {
    const { avatar, name } = this.props

    return `
        ${userStyled(`
            <div>
                ${avatarStyled(avatar, "img")}
            </div>
            <h2>${name}</h2>
            `, 
            "div"
        )}`
  }
}
