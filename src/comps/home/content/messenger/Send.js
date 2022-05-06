import react from 'react';
import '../../../../util/css/chat.css';

class Sender extends react.Component{
  constructor(props){
    super(props)
    this.state={
      value:''
    }

    this.submitForm=this.submitForm.bind(this)
  }
   submitForm (e){
    e.preventDefault();
    this.props.socket.emit('message', {user:this.props.user,msg:this.state.value});
    this.setState({value:''})
  };
render(){
  return (
    <form onSubmit={this.submitForm} className='chat-dtb'>
      <button type='button' className='btn'>
              <i className="fas fa-ellipsis-v"></i>
      </button>
      <input className='chat-dtb'
        autoFocus
        value={this.state.value}
        placeholder="Type your message"
        onChange={(e) => {
          this.setState({value:e.target.value});
        }}
        minLength={5}
        maxLength={320}
      required/>
      <button type='submit' className='msg-btn'>
      <i className='fa-solid fa-paper-plane'></i>
      </button>
    </form>
  );}
};









export default Sender