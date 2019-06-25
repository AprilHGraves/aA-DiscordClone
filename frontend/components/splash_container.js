import { connect } from "react-redux";
import Splash from "./splash";


const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)