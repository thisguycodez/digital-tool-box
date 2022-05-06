import react from 'react'
import '../../../../util/css/notepad.css'
import {connect} from 'react-redux'
import {notepad_action,send_note_obj_to_form} from '../../../../redux/actions'
import Notes from './notes'
import InfoTab from './info_tab'
import Form from './form'
import uuid from 'uuid-random'

class NotePad extends react.Component{
	constructor(props){
		super(props)
		this.state={
				error_obj:{
					title:'A Title Here',
					body:'You dont have any notes added here yet. Feel free to add any.',
					last_saved:String(new Date()).slice(0,15),
					note_pad_id:uuid(),
					err:true
				},

			show_form:0,

			// notes key cacher form less func calling(recruision protection)
			cur_key:0
		}


		this.toggle_form=this.toggle_form.bind(this)
		this.prepare_action=this.prepare_action.bind(this)
		this.focused_on=this.focused_on.bind(this)
	}

	focused_on(obj,key){
		if(this.state.cur_key!==key){
				return this.props.send_note_obj_to_form(obj)
			}
			this.setState({cur_key:key})

	}

	toggle_form(){
		// add features in here to give the form the right idea what CRUD
		// Im doing before it shows
	
		return this.setState({show_form:!this.state.show_form})
	}	

	prepare_action(){
		return true
	}

		
componentDidMount(){
  this.props.notepad_action('Read',null,{})
}





	render(){
			return (

  <div className="tool-box tbnp">

  <Form show_form={this.state.show_form} toggle_form={this.toggle_form} />

  <div className="np-header">
  <button className='btn btn-success' onClick={this.toggle_form}>
  <i className='fa-solid fa-circle-plus'></i>
  </button>
  </div>


	<div className="np-content">
	{this.props.notes===null?<><i className="fa-solid fa-spinner lg-spn"></i><span>Loading...</span></>:this.props.notes.length?this.props.notes.map((obj,i)=>{
			return (<div key={(i+1)} className="note_n_tab"><InfoTab obj={obj}/><Notes focused_on={this.focused_on} obj={{...obj,key:(i+1)}} toggle_form={this.toggle_form}/></div>)
	}):<Notes focused_on={this.focused_on} obj={this.state.error_obj} toggle_form={this.toggle_form}/>

}
  </div>
  </div>
			)
	}
}




const mapStateToProps = state =>{
	return {
		notes:state.notes,
		will_upd:state.will_upd,
		upd_obj:state.upd_obj
	}
}

export default connect(mapStateToProps,{notepad_action,send_note_obj_to_form})(NotePad)