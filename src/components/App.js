import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Provider as ReduxProvider } from 'react-redux'

import { theme, GlobalStyles } from '../styled'
import { default as store } from '../store'
import { GUI } from './'
import { MidiAccessWithSettings, KeyboardProvider } from '../contexts'

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <GlobalStyles />
          <KeyboardProvider>
            <GUI />
          </KeyboardProvider>
        </ReduxProvider>
      </ThemeProvider>
    )
  }
}

export default App
