import react from 'react'
import '../../../../util/css/ip_tools.css'
import {connect} from 'react-redux'
import {get_ip} from '../../../../redux/actions'
import GetUrlIp from './Url_lookup'
import GeoCredz from './Get_geo_credz'


class IpTools extends react.Component{
	constructor(props){
		super(props)
		this.state={
				

		}


		this.bind_channel=this.bind_channel.bind(this)
	}


	bind_channel(){
		return true
	}

		
componentDidMount(){
  this.props.get_ip()
}


	





	render(){
			return (

  <div className="container-ipt tool-box">
  <h3>
  	Ip-Tools
  </h3>

  <div className="container-ipt justify-content-center mt-5 border-left border-right">
   
    <div className="d-flex justify-content-center py-2">
<span className="ip-details1-ipt">Your public ip:</span>
                <div><span className="ip-details2-ipt">{this.props.ip}</span></div>
    </div>

   
</div>

<GetUrlIp/>
<GeoCredz/>
  </div>
			)
	}
}




const mapStateToProps = state =>{
	return {
		logo:state.logo,
		ip:state.ip,
	}
}

export default connect(mapStateToProps,{get_ip})(IpTools)