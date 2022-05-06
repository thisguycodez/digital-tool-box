import react from 'react'
import {connect} from 'react-redux'
import {get_url_ip} from '../../../../redux/actions'
import {Button} from 'reactstrap'


class UrlLookup extends react.Component{
	constructor(props){
		super(props)
		this.state={
			// save the url,whether its valid or not, and error msg if any 
				url:'http://',
				isValid:false,
				err_msg:null

		}

		// bind functions to component
		this.check_url=this.check_url.bind(this)
		this.send_url=this.send_url.bind(this)
	}


	check_url(){
		// use regex from stack overflow
		let regi = /^(ftp|http|https?:\/\/)?\w+\.(com|net|org)/gi
		let regi_ = /^(ftp|http|https?:\/\/)?w{3}\.\w+\.(com|net|org)/gi
		
		// test it - if true adjust state to reflect that and return true for 'send_url' function (VISE VERSA)
		if(regi.test(this.state.url) || regi_.test(this.state.url)){ this.setState({isValid:true});return true}
		else {this.setState({isValid:false});return false}
	}

		send_url(e){
			// block form fetching(using axios)
			e.preventDefault()
			// double check url validations,send to api(python will triple check url and return relevant answer) else error msg
			if(this.check_url()){
				this.setState({isValid:true,err_msg:null})
				return this.props.get_url_ip({url:this.state.url})
			}else{
				this.setState({isValid:false,err_msg:'Cannot Send This URL'})
			}
		
	}
	




	render(){
			return (



<form className="container-ipt justify-content-center mt-5 border-left border-right" onSubmit={this.send_url}>
   
    <div className="d-flex justify-content-center py-2">
        <div className="second-ipt py-2 px-2 ip-blox"> <span className="ip-details1-ipt">Get URL ip</span>
           
           <span className="ip-details1-ipt">{this.state.err_msg || this.props.url_ip}</span>
            <div className="d-flex justify-content-between py-1 pt-2">
                <div><img src={this.props.logo} alt='digital-tool-box.com' width="18"/>
                <input type='text' className="ip-inps" minLength={5} value={this.state.url} onChange={(e)=>{this.setState({url:e.target.value});setTimeout(()=>{return this.check_url()},500)}} required/></div>
         <i className={`fa-solid fa-circle-${this.state.isValid?'check ip-valid':'xmark ip-unvalid'}`}></i>
            </div>
            <Button type='submit' className='ip-btn'>Submit URL</Button>
        </div>
    </div>

   
</form>
			)
	}
}




const mapStateToProps = state =>{
	return {//pull in 'logo' and 'url_ip' fetch returns only
		logo:state.logo,
		url_ip:state.url_ip,
	}
}

export default connect(mapStateToProps,{get_url_ip})(UrlLookup)