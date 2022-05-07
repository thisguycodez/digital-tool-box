import react from 'react'
import {connect} from 'react-redux'







class InfoTab extends react.Component{
	constructor(props){
		super(props)
		this.state={}

	}



	render(){
		return(
	<div className="card info-card">
        <div className="d-flex flex-row text-center img-npc"> 
        <img src={this.props.dtbn} alt='digital-tool-box' width="70"/>
         
        </div>
    <hr className="line"/> 
    <span>ID: {this.props.obj.id}</span>
    <span className="text-white">Date: {this.props.obj.last_saved}</span>
 
</div>


			)
	}
}




const mapStateToProps = state =>{
	return {
		dtbn:state.dtbn,	
		dtbn_:state.dtbn_	
	}
}

export default connect(mapStateToProps,{})(InfoTab)