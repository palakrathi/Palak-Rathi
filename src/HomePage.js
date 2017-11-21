import React, { Component } from "react";
import {connect} from 'react-redux';
class HomePage extends Component {
  componentWillMount(){
    if(!this.props.verify){
    this.props.history.replace({pathname:'/login'})
    }
  }
  render(){
    return(
      <div className="App" style={{display:'flex'}}>
      Welcome {this.props.name}
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    name:state.name,
    verify:state.verify
  }
}
export default connect(mapStateToProps)(HomePage);
