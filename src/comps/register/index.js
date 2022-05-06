import react from 'react'
import {connect} from 'react-redux'
import {register_user} from '../../redux/actions'

class Register extends react.Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      psk:''
    }

    this.update_inps = this.update_inps.bind(this)
    this.registrate_user = this.registrate_user.bind(this)
  }


update_inps(e){
    return this.setState({
      [e.target.name]:e.target.value
    })
}

registrate_user(e){
  e.preventDefault();
  e.target.reset()
  return this.props.register_user(this.state)
}



  render(){
  return (
    <div className="container dtb-c">
  <form onSubmit={this.registrate_user} method='post'>
    <p>{this.props.register_msg}</p>
    <input type="text" name='username' minLength={5} maxLength={18} onChange={this.update_inps} placeholder="Username" required/><br/>
    <input type="password" name='psk'  minLength={5} maxLength={55} onChange={this.update_inps}  placeholder="Password" required/><br/>
    <input type="submit" value="Create Account"/><br/>
    <span onClick={()=>{return this.props.tog(true)}}>Login?</span>
  </form>

</div>
  );
  }
}





const mapStateToProps = state =>{
  return {
    register_msg:state.register_msg
  }
}

export default connect(
  mapStateToProps
  ,{register_user}
  )(Register);

