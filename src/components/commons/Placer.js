import styled from 'styled-components'

const Placer = styled.div`
  position: absolute;
  ${({ x, y }) => `
    top: ${y || 0};
    left: ${x || 0};
  `}
`

export default Placer
