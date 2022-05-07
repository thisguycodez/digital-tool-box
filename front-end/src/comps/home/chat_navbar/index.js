import react from 'react'
import '../../../util/css/navbar.css'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router'


class Chat extends react.Component{
	constructor(props){
		super(props)
		this.state={}
		this.logout=this.logout.bind(this)
	}



	logout(){
		// when logging out remove the only thing allowing us in
		// 'Cookies'...but only the 'dtb_usr' token set
		// doing this because this is not a real website so ...
		// im not going to leave visitors with scars lol
		window.sessionStorage.removeItem('dtb_usr')
		window.localStorage.removeItem('dtb_usr')
		return Cookies.remove('dtb_usr',{path:'/'})
	}

	render(){

			return (

  <div className="chat_bar">



 <Link to='/'>
  <button className='btn btn-danger dtb-dangerx' onClick={this.logout}>Logout</button>
  </Link>
  </div>
			)
	}
}






export default withRouter(Chat)