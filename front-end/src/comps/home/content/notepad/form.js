import react from 'react'
import '../../../../util/css/notes_form.css'
import {connect} from 'react-redux'
import {notepad_action,send_note_obj_to_form} from '../../../../redux/actions'



class Form extends react.Component{
	constructor(props){
		super(props)
		this.state={
			title:'',
			body:'',
			upd_checker:0
		}

		this.make_action=this.make_action.bind(this)
		this.changing_inps=this.changing_inps.bind(this)
	}


	make_action(e){
		e.preventDefault()
		try{
			if(this.props.will_upd){
			return this.props.notepad_action('Update',this.props.upd_obj.id,{title:this.state.title,body:this.state.body})

		}else{	
			return this.props.notepad_action('Create',null,{title:this.state.title,body:this.state.body})
		}
		}

		catch(err){
			// error handled within redux actions
			return true
		}

		finally{
			this.setState({
				title:'',
				body:'',
				upd_checker:0
			})
			return this.props.toggle_form()
		}
		
	}



	changing_inps(e){
		return this.setState({[e.target.name]:e.target.value})
	}



	componentDidUpdate(){

			if(!this.state.upd_checker && this.props.will_upd){
			this.setState({
				title:this.props.upd_obj.title,
				body:this.props.upd_obj.body,
				upd_checker:!this.state.upd_checker
			})
			}
	}






	render(){
		return (

<div className="dtb-n-form-holder" style={{display:!this.props.show_form?'none':'block'}}>
<div className="dtb-n-form">
  <h2>{this.props.will_upd?'Update Note':'Add Note'}</h2>
  <form onSubmit={this.make_action}>
<i className="fa-solid fa-xmark close-note-from-window" onClick={()=>{this.setState({title:'',body:'',upd_checker:0}); this.props.send_note_obj_to_form({bool:false});return this.props.toggle_form()}}></i>
    <div className="user-box">
      <input type="text" name="title" value={this.state.title} onChange={this.changing_inps}  required/>
      <label>Title:</label>
    </div>
    <div className="user-box">
      <textarea type="bio" name="body" value={this.state.body} onChange={this.changing_inps} required/>
      <label>Note:</label>
    </div>
    <button type="submit">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </button>
  </form>
</div>
</div>

			)
	}
}

const mapStateToProps = state =>{
	return {
	will_upd:state.will_upd,
	upd_obj:state.upd_obj
	}
}


export default connect(
	mapStateToProps,
	{notepad_action,send_note_obj_to_form}

	)(Form)