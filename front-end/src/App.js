import react from 'react'
import './util/css/App.css';
import './util/css/form.css';
import {connect} from 'react-redux'
import Forms from './comps/'
import Home from './comps/home/'
import {PrivateRouter} from './comps/privateRoute/'
import {Switch, Route} from 'react-router-dom'





class App extends react.Component {
  constructor(props){
    super(props)
    this.state={}
  }


  render(){
  return (
    <div className="App">
     <h1>Digital Tool Box</h1>
    <div className="context">
</div>



{/*throw div in negative z-index and write animation */}
<div className="area" >
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
              
            </div >
            


            <Switch>
          {/*LOGIN OR REGISTER BY DEFAULT - USER NEEDS ACCOUNT TO USE APP*/}

          <PrivateRouter exact path={['/home','/home/ip_tools','/home/chat_room','/home/url_shortener','/home/note_pad']} component={Home}/>
          
            <Route component={Forms}/>  

            </Switch>
         
    </div>
  );
  }
}





const mapStateToProps = state =>{
  return {
    are_we_logging_in:state.are_we_logging_in
  }
}

export default connect(
  mapStateToProps
  ,{}
  )(App);

