import react from 'react'
import {notepad_action,send_note_obj_to_form} from '../../../../redux/actions'
import {connect} from 'react-redux'



class Notes extends react.Component{
	constructor(props){
		super(props)
		this.state={
		}



	}



	componentDidUpdate(){
	}


	render(){
		return (


<article onMouseDown={()=>{this.props.focused_on(this.props.obj,this.props.obj.key)}}>
	<header className='note-header'>
	<h5 style={{display:'flex'}}>
	<i className="fa-brands fa-battle-net"></i>{this.props.obj.title}
	</h5>
	
	<i className=' dtb-danger fa-solid fa-circle-xmark' onClick={()=>{if(this.props.obj.err){return false};return this.props.notepad_action('Delete',this.props.obj.id,{amt:0})}}>
	
	</i>
	</header>
	<hr/>
	<i className="fa-brands fa-hive"></i>
	<section>
	<p>
	{this.props.obj.body}
	</p>
	<i className=' dtb-info fa-solid fa-pen-to-square' onClick={()=>{ if(this.props.obj.err){return false};this.props.send_note_obj_to_form({...this.props.obj,bool:true});return this.props.toggle_form()}}>
	</i>
	</section>

	</article>


			)
	}
}

const mapStateToProps = state =>{
	return {
	}
}


export default connect(
	mapStateToProps,
	{notepad_action,send_note_obj_to_form}
	)(Notes)