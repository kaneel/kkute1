import React, { PureComponent, createContext } from 'react'

const { Provider, Consumer: KeyboardConsumer } = createContext({ state: [] })

class KeyboardProvider extends PureComponent {
  static toListen = ['ControlLeft', 'ControlRight']
  state = {
    keys: []
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)
  }

  onKeyDown = ({ code }) => {
    const { keys } = this.state

    // avoid listening to things already there and avoid listening keys we don't care about
    if (!!~keys.indexOf(code) || !~KeyboardProvider.toListen.indexOf(code)) return null

    this.setState({ keyboard: keys.concat(code) })
  }

  onKeyUp = ({ code }) => {
    const { keys } = this.state

    if (!~keys.indexOf(code)) return null

    this.setState({ keyboard: copy.filter(item => item !== code) })
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

const withKeyboardContext = Component => props => (
  <KeyboardConsumer>{ctx => <Component keyboard={ctx} {...props} />}</KeyboardConsumer>
)

export { KeyboardProvider, KeyboardConsumer, withKeyboardContext }
