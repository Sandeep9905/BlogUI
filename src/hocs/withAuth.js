import React,{Component} from 'react';
import {connect} from 'react-redux';

export default function withAuth(ComponentToBeRendered){
  class Authenticate extends Component{
    componentWillMount(){
        if(this.props.isAuthenticated === false){
            window.history.go(-1);
        }
    }
    componentWillUpdate(nextProps){
        if(nextProps.isAuthenticated === false){
            window.history.go(-1);
        }
    }
    render(){
        return <ComponentToBeRendered {...this.props}/>
    }
  }
  
  function mapStateToProps(state){
    return{
      isAuthenticated:state.currentUser.isAuthenticated
    }
  }

return connect(mapStateToProps)(Authenticate);
}
