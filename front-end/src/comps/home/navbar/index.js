import react from 'react'
import '../../../util/css/navbar.css'
import {Link,withRouter} from 'react-router-dom'
import {HashLink} from 'react-router-hash-link'




class Naviola extends react.Component{
	constructor(props){
		super(props)
		this.state={
        }

	}




	render(){

			return (

  <div className="naviola">
  
  <HashLink to={`${this.props.history.location.pathname}#`}>
  <i className="fa-solid fa-tachograph-digital"></i>
  </HashLink>
  
  <Link to='/home/ip_tools'>
  IP
  </Link>

  <Link to='/home/url_shortener'>
  <small><sub>small</sub></small> URL
  </Link>


  <Link to='/home/note_pad'>
  Notes
  </Link>






  </div>
			)
	}
}






export default withRouter(Naviola)