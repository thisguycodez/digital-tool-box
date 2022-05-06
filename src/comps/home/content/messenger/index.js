import react from 'react'
import {connect} from 'react-redux'
import socket from 'socket.io-client'
import Sender from './Send'
import Message from './Message'



// save socket module to variable 'sock'		
const sock = socket.connect('https://digital-tool-box-database.herokuapp.com/')




class Messenger extends react.Component{
	constructor(props){
		super(props)
		this.state={
				// socket will be null until component mounts
				socket:null,
				// keep track of messages only while component is rendered
				msgs:[],

				// the '0' and '1' 'false' and 'true' method im following here below
				// is really just to make sure they get called when a solid action
				// has taken place - like the component mounting, connecting to chatroom,
				// sending a msg manually or when one has entered or left the chatroom.
				// not when users are typing or any suttle things like that.
				is_connected:0,
				has_checkedMsg:0

		}
		// avoid some memory leaks with this mounting reset trick
		// resetting the code for this component
		this._isMounted = false
		this.keep_up_with_msgs=this.keep_up_with_msgs.bind(this)
	}






	keep_up_with_msgs(){

			// if socket is active an exist
			if(this.state.socket){
				// is the connection check called at all if not call it once
				if(!this.state.is_connected){
					// if socket module is active then make the connection
					this.state.socket && this.state.socket.on('connect',()=>{
						// socket connecting to open box room
						// send a message informing the room this client has joined
						this.state.socket.send({msg:`${this.props.user.username} join the box.`,joined:true})
					})
					// make the connection 'true' to prevent msg sending on 'render(2) & all lifecycle methods'
					this.setState({is_connected:1})
				}

				// if the msg check is on 0 then fetch messages once
				if(!this.state.has_checkedMsg){
					// if socket module is active then connect to the socket 'message' thread setup
					// on the back end and fetch the current msgs coming in
						this.state.socket && this.state.socket.on('message',(msg)=>{
							// hold msgs to components state (not saving msgs)
							return this.setState({
								msgs:[...this.state.msgs,msg]
							})
						})
						// make the msg check 'true' to prevent msg re-displaying on 'render(2) & all lifecycle methods'
						this.setState({has_checkedMsg:1})
				}
		}

	}


	// when component mounts, this method runs
	componentDidMount(){
		this._isMounted = true;
		// when component mounts , set socket to the module socket-client imported
		return this.setState({socket:sock})




	}


	


	// when anything on this component changes, this method runs
	componentDidUpdate(){
		this._isMounted = true;


		// when component updates , it resets the on-component state
		// so the 'is_connected' & 'has_newMsg' count will be 0 again
		// we call this function, this way it only checks once per action and server call.
		this.keep_up_with_msgs()

	}


componentWillUnmount() {
   this._isMounted = false;
}




	render(){

			return (

  <div className="tool-box-chat">
  <h3>
  	Open Box
  </h3>

  <div className="container-ipt justify-content-center mt-5 border-left border-right">
  		<div className="card-header msg_head">
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src={this.props.logo} alt='www.digitaltoolbox.com' className="rounded-circle user_img" width='70'/>
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
									<span>{this.props.user.username}</span>
									<p>1767 Messages</p>
								</div>
								
							</div>
							<span id="action_menu_btn">
							<i className="fas fa-ellipsis-v"></i>
							</span>

							<div className="action_menu">
								<ul>
									<li><i className="fas fa-user-circle"></i> View profile</li>
									<li><i className="fas fa-users"></i> Add to close friends</li>
									<li><i className="fas fa-plus"></i> Add to group</li>
									<li><i className="fas fa-ban"></i> Block</li>
								</ul>
							</div>

						</div>
  <div className="messages-list">

  {
  	this.state.msgs.map((msg,i)=>{return msg.joined?<span key={i}>{msg.msg}</span>: typeof(msg) == 'object' && msg.user.length?<Message key={i} user={msg.user} msg={msg.msg} time={msg.time} obj={this.props.user}/>:true})
  }
  </div>
 { this.state.socket ? (
        <div className="chat-container">
          <Sender socket={this.state.socket} user={this.props.user.username}/>
        </div>
      ) : (
        <div>Not Connected</div>
      )}
   
</div>
  </div>
			)
	}
}




const mapStateToProps = state =>{
	return {
		// pull in the user data from state
		user:JSON.parse(state.user),
		logo:state.logo
	}
}

export default connect(mapStateToProps,{})(Messenger)




