import react from 'react'
import {connect} from 'react-redux'
import {url_shortener} from '../../../../redux/actions'
import {Button} from 'reactstrap'


class UrlShortener extends react.Component{
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
				return this.props.url_shortener({url:this.state.url})
			}else{
				this.setState({isValid:false,err_msg:'Cannot Send This URL'})
			}
		
	}
	




	render(){
			return (



<form className="container-ipt justify-content-center mt-5 border-left border-right" onSubmit={this.send_url}>
   
    <div className="d-flex justify-content-center py-2 small_url_blx">
    <code>
    <small>NO API KEY ADDED</small>
    </code>
        <div className="second-ipt py-2 px-2 ip-blox"> <span className="ip-details1-ipt">Shorten A URL</span>
           
           <span className="ip-details1-ipt">{this.state.err_msg || this.props.short_url}</span>
            <div className="d-flex justify-content-between py-1 pt-2">
                <div><img src={this.props.logo} alt='digital-tool-box.com' width="18"/>
                <input type='text' className="ip-inps" minLength={5} value={this.state.url} onChange={(e)=>{this.setState({url:e.target.value});setTimeout(()=>{return this.check_url()},500)}} required/></div>
         <i className={`fa-solid fa-circle-${this.state.isValid?'check ip-valid':'xmark ip-unvalid'}`}></i>
            </div>
            <Button type='submit' className='ip-btn'>Shorten URL</Button>
        </div>
    </div>

   
</form>
			)
	}
}




const mapStateToProps = state =>{
	return {//pull in 'logo' and 'short_url' fetch returns only
		logo:state.logo,
		short_url:state.short_url,
	}
}

export default connect(mapStateToProps,{url_shortener})(UrlShortener)