import styled from 'styled-components'

const Button = styled.button`
  position: relative;
  display: block;
  margin: 0 auto 5px;
  width: ${props => (props.small ? 20 : 25)}px;
  height: ${props => (props.small ? 10 : 20)}px;
  top: ${props => (props.pressed ? '0px' : '-1px')};
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid #111;
  background: ${props => (props.pressed ? props.theme.secondaryColour : `#333`)};
  box-shadow: ${props =>
    props.pressed
      ? `0 0 13px 1px rgba(0, 0, 0, .5) inset, 1px 1px 1px 0 rgba(255, 255, 255, .2) inset`
      : `0 0 13px 1px #222 inset, 1px 1px 0px 0px rgba(255, 255, 255, .4) inset, 0px 1px 0px 1px rgba(0,0,0,0.5)`};
  transition: top 125ms, box-shadow 125ms, background 525ms;

  &:active,
  &:focus {
    outline: none;
  }
`

export { Button }
