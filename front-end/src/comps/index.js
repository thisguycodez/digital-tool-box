import react from 'react'
import Login from './login/'
import {toggle_form} from '../redux/actions'
import {connect} from 'react-redux'
import Register from './register/'





class Forms extends react.Component{
	render(){return (
		<div>

		<h1>Welcome, Please login or register.</h1>
		{!this.props.are_we_logging_in?(<Register tog={this.props.toggle_form}/>):(<Login tog={this.props.toggle_form}/>)}

		</div>
		)


	}
}







const mapStateToProps = state =>{
	return {
		are_we_logging_in:state.are_we_logging_in
	}
}

export default connect(
	mapStateToProps,
	{toggle_form}
	)(Forms)
