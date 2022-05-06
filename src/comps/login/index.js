import react from 'react'
import {connect} from 'react-redux'
import {user_login} from '../../redux/actions'
import {withRouter} from 'react-router'



class Login extends react.Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      psk:''
    }

    this.update_inps = this.update_inps.bind(this)
    this.attempt_login = this.attempt_login.bind(this)
  }


update_inps(e){
    return this.setState({
      [e.target.name]:e.target.value
    })
}

attempt_login(e){
  e.preventDefault();
  e.target.reset()
  this.props.user_login(this.state)
  return setTimeout(()=>{return this.props.history.push(`/home/ip_tools`)},500)
}




componentDidUpdate(){
}

  render(){
  return (
    <div className="container dtb-c">
  <form onSubmit={this.attempt_login} method='post'>
    <p>{this.props.login_msg}</p>
    <input type="text" name='username' minLength={5} maxLength={18} onChange={this.update_inps} placeholder="Username" required/><br/>
    <input type="password" name='psk'  minLength={5} maxLength={55} onChange={this.update_inps}  placeholder="Password" required/><br/>
    <input type="submit" value="Login"/><br/>
    <span onClick={()=>{return this.props.tog(false)}}>Register?</span>
  </form>

</div>
  );
  }
}





const mapStateToProps = state =>{
  return {
    login_msg:state.login_msg
  }
}

export default withRouter(connect(
  mapStateToProps
  ,{user_login}
  )(Login));

