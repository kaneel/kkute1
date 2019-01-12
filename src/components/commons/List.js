import React, { PureComponent } from 'react'
import styled from 'styled-components'

const StyledList = styled.div`
  select,
  label {
    display: block;
  }
`

class List extends PureComponent {
  onChange = ({ target: { value } }) => {
    const { id, update, max_value, min_value } = this.props
    update(Number(value))
  }

  render() {
    const { id, items, name, value } = this.props
    const htmlId = `list-${id}`

    return (
      <StyledList>
        <label htmlFor={htmlId}>{name}</label>
        <select onChange={this.onChange} value={value} id={htmlId}>
          {items.map((item, i) => (
            <option key={i} value={i}>
              {item}
            </option>
          ))}
        </select>
      </StyledList>
    )
  }
}

export default List
