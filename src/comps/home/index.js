import react from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Switch} from 'react-router-dom'
import '../../util/css/home.css'
import {PrivateRouter} from '../privateRoute/'
import IpTools from './content/ip_tools/'
import UrlShortener from './content/url_shortener/'
import NotePad from './content/notepad/'


import NavBar from './navbar/'
import ChatNav from './chat_navbar/'

class Home extends react.Component {
  constructor(props){
    super(props)
    this.state={
    
    }

    
  }






componentDidUpdate(){
}

  render(){
  return (
    <div className="container home-page">
    <ChatNav/>
    <NavBar/>


    <Switch>
      <PrivateRouter exact path='/home/ip_tools' component={IpTools}/>
      <PrivateRouter exact path='/home/url_shortener' component={UrlShortener}/>
      <PrivateRouter exact path='/home/note_pad' component={NotePad}/>
   
    </Switch>
  
</div>
  );
  }
}





const mapStateToProps = state =>{
  return {
    Home_msg:state.Home_msg
  }
}

export default withRouter(connect(
  mapStateToProps
  ,{}
  )(Home));

