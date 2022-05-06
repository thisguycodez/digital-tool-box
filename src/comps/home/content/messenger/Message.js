import react from 'react'
import '../../../../util/css/msg.css';








class Message extends react.Component{
	constructor(props){
		super(props)
		this.state={

		}


	}

	render(){


			return (

    <details className={`tool-box-msg ${this.props.user===this.props.obj.username?'cli-usr':'other-usr'}`} open>
        <summary className={`${this.props.user===this.props.obj.username?'cli-usr-header':'other-usr-header'}`}>
            {this.props.user}
            <small>
        <sub>
        {this.props.time}
        </sub>
        </small>
        </summary>
        <div>
            {this.props.msg}
        </div>
        
    </details>
   
			)
	}
}




export default Message




