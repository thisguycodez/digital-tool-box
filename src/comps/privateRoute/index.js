import {Route, Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'




export const PrivateRouter = ({component:Component,...rest}) =>{
	const token = Cookie.get('dtb_usr')

		return (

				<Route render={(props)=>{
					if(token){
						return <Component {...props}/>
					}

					else return <Redirect to='/' />

				}}/>

			)

}



