export { default as theme } from './theme'
import { normalize, version } from 'styled-normalize'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  html {
    font-size: 100%;
    height: 100%;
    overflow: hidden;
    background: ${props => props.theme.backgroundColour};
    color: ${props => props.theme.textColour};
  }

  .--blocked {
    position: fixed;
    overflow: hidden;
    width: 100%;
    height: 100%; 
  }

  body {
    margin: 0;
    padding: 0;
    font: 16px/1.6 Helvetica;
    height: 100%;
    transition: background 500ms, color 500ms;
    -webkit-font-smoothing: antialiased;
  }

  * { user-select: none; }

  #app {
    margin: 0 auto;
    min-height: 100%;
  }

  .js #app {
    // opacity: 0;
    transition: opacity 250ms;
  }

  .ready #app {
    opacity: 1;
  }

  a, a:hover, a:visited {
    text-decoration: none;
  }
  
  h1, h2 {
    font-weight: 100;
    line-height: 1.3;
  }
  
  h3, h4 {
    font-weight: 300;
    line-height: 1.3;
  }

  p {
    font-weight: 500;
    line-height: 1.3;
  }
`
