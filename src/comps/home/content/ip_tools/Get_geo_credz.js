import react from 'react'
import {connect} from 'react-redux'
import {get_geo_credz} from '../../../../redux/actions'
import {Button} from 'reactstrap'


class GeoCredz extends react.Component{
	constructor(props){
		super(props)
		this.state={
			// save the url(false) or ip(true),whether they're valid or not, and error msg if any 
				url_or_ip:false,
				url:'http://',
				ip:'',
				isValid:false,
				err_msg:''

		}

		// bind functions to component
		this.check_url_or_ip=this.check_url_or_ip.bind(this)
		this.send_url_or_ip=this.send_url_or_ip.bind(this)
	}


	check_url_or_ip(){


		if (!this.state.url_or_ip){
			// use regex from stack overflow

		let regi = /^(ftp|http|https?:\/\/)?\w+\.(com|net|org)/gi
		let regi_ = /^(ftp|http|https?:\/\/)?w{3}\.\w+\.(com|net|org)/gi
		// test it - if true adjust state to reflect that and return true for 'send_url' function (VISE VERSA)
		if(regi.test(this.state.url) || regi_.test(this.state.url)){ return this.setState({isValid:true})}
		else {return this.setState({isValid:false})}
		}

		else{
		// use regex from stack overflow
		let regi = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
		// test it - if true adjust state to reflect that and return true for 'send_url' function (VISE VERSA)
		if(regi.test(this.state.ip)){ return this.setState({isValid:true})}
		else {return this.setState({isValid:false})}
		}
		
	}

		send_url_or_ip(e){
			// block form fetching(using axios)
			e.preventDefault()
			// double check url validations,send to api(python will triple check url and return relevant answer) else error msg
			this.check_url_or_ip()
			if(this.state.isValid){
				this.setState({isValid:true,err_msg:null})
				return this.props.get_geo_credz({address:this.state[this.state.url_or_ip?'ip':'url']})
			}else{
				this.setState({isValid:false,err_msg:`Cannot Send This ${this.state[this.state.url_or_ip?'ip':'url']}`})
			}
		
	}
	



	render(){
			return (



<form className="container-ipt justify-content-center mt-5 border-left border-right" onSubmit={this.send_url_or_ip}>
   <details open={this.props.url_or_ip_msg}>
	<summary>
	{this.state.url_or_ip?'IP':'Url'} Info:
	</summary>

	<p>
	{this.state.err_msg || this.props.url_or_ip_msg}
	<br/>
	{Object.entries(this.props.url_or_ip_data).length?(
		Object.entries(this.props.url_or_ip_data).map((key_n_value,i)=>{
			return <span key={i}>{key_n_value[0]}:{key_n_value[1]}<br/></span>
		})

		):""}
	</p>
	</details>
    <div className="d-flex justify-content-center py-2">
        <div className="second-ipt py-2 px-2 ip-blox"> <span className="ip-details1-ipt">Get Geo Credentials For a {this.state.url_or_ip?'IP':'Url\'s IP'}</span>
           
           <span className="ip-details1-ipt">{this.props.url_or_ip_msg}</span>

          <div className="form-group">  
  <span className="switch switch-sm">
    <input type="checkbox" className="switch" id="switch-sm" onChange={(e)=>{this.setState({url_or_ip:!this.state.url_or_ip})}}/>
    <label htmlFor="switch-sm">{this.state.url_or_ip?'IP':'Url'}</label>
  </span>

</div>

            <div className=" py-1 pt-2 extrhlp">
                <div><img src={this.props.logo} alt='digital-tool-box.com' width="18"/>
                <input type='text' className="ip-inps" minLength={5} value={this.state.url_or_ip?this.state.ip:this.state.url} onChange={(e)=>{this.setState({[this.state.url_or_ip?'ip':'url']:e.target.value});setTimeout(()=>{return this.check_url_or_ip()},100) }} required/>

         <i className={`fa-solid fa-circle-${this.state.isValid?'check ip-valid':'xmark ip-unvalid'}`}></i>
                </div>
            </div>
            <Button type='submit' className='ip-btn'>Submit {this.state.url_or_ip?'IP':'Url'}</Button>
        </div>
    </div>

   
</form>
			)
	}
}




const mapStateToProps = state =>{
	return {//pull in 'logo' and 'url_or_ip' fetch returns only
		logo:state.logo,
		url_or_ip_msg:state.url_or_ip_msg,
		url_or_ip_data:state.url_or_ip_data
	}
}

export default connect(mapStateToProps,{get_geo_credz})(GeoCredz)







