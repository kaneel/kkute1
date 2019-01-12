import { connect } from 'react-redux'
import { LED } from '../commons'

const mapStateToProps = (state, ownProps) => ({
  active: state[ownProps.id]
})

export default connect(mapStateToProps)(LED)
