import axios from 'axios'
import Cookie from 'js-cookie'
// api url/uri tunnel
const api = "https://digital-tool-box-app.herokuapp.com"





// toggle between register an login form
export const toggle_form = (bool) => dispatch =>{

	return dispatch({type:'TOGGLE_FORMS',payload:bool})
}





// register just username an psk then login
export const register_user = (user) => dispatch =>{

	return axios.post(`${api}/register`,user)
		.then((res)=>{
			return dispatch({type:'REGISTER_MSG',payload:res.data})
		})

		.catch((err)=>{
			return dispatch({type:'REGISTER_MSG',payload:err})
		})
}

// loggin into the app
// if true back end should handle server side sessions
export const user_login = (user) => dispatch =>{

	return axios.post(`${api}/login`,user)
		.then((res)=>{
			
			// if its message
			if(typeof(res.data) == 'string'){
				return dispatch({type:"LOGIN_MSG",payload:{msg:res.data}})
			}
			// if its obj
			else if(typeof(res.data) == 'object'){
			// if its an object then its the users object
			// for right now while im editing I will set Cookies(server handles it though for deployment[code for this wont be here])
			window.sessionStorage.setItem('dtb_usr',JSON.stringify(res.data))
			window.localStorage.setItem('dtb_usr',JSON.stringify(res.data))
			return dispatch({type:"LOGIN_MSG",payload:{msg:`Logged in as: ${res.data.username}`,obj:res.data}})
			}
			 
		})

		.catch((err)=>{
			const regi_no_connection = new RegExp('Network Error','gi')
			if(regi_no_connection.test(String(err))){
			return dispatch({type:"LOGIN_MSG",payload:'Check Your Connection'})

			}
			else return dispatch({type:"LOGIN_MSG",payload:'server overloaded, try again later.'})
		})
}












// ip loockup tools 
 // get ip
 export const get_ip = () => dispatch =>{
 	return axios.get(`${api}/get_ip`)
 		.then((res)=>{
 			return dispatch({type:"GET_IP",payload:res.data})
 		})

 		.catch((err)=>{return dispatch({type:"GET_IP",payload:'127.0.0.1 - Check Connection'})})
 }


 // get ip for url input
 export const get_url_ip = (url) => dispatch =>{
 	return axios.post(`${api}/get_url_ip`,url)
 		.then((res)=>{
 			return dispatch({type:"URL_IP",payload:res.data})
 		})
 		.catch((err)=>{
 			return dispatch({type:"URL_IP",payload:'check your connection'})
 		})
 }

// geo creds 'post'
// rename this to get_geo_credz
export const get_geo_credz = (obj) => dispatch =>{
	return axios.post(`${api}/geo_credz`,obj)
		.then((res)=>{
			return dispatch({type:"GEO_CREDZ",payload:{msg:res.data.msg,data:JSON.parse(res.data.data)}})
		})
		.catch((err)=>{
			return dispatch({type:"GEO_CREDZ",payload:{msg:'Check connection or try again later.',data:{}}})
		})
}







// shorten a url 
export const url_shortener = (obj) => dispatch =>{
	return axios.post(`${api}/shorten_url`,obj)
		.then((res)=>{

			return dispatch({type:"SHORT_URL",payload:res.data})
		})

		.catch((err)=>{
			return dispatch({type:"SHORT_URL",payload:'cannot short this url, please check the link ypu typed in.'})

		})
}










// NOTE PAD ACTIONS (CRUD)
export const notepad_action = (act,id=null,obj=null) => dispatch =>{
	
	const token = Cookie.get('dtb_usr')



	const user = JSON.parse(window.localStorage.dtb_usr)

	obj.username = user.username
	obj.npid = user.note_pad_id

	if(token)

	switch(act){
		case 'Create':
			
			
			return axios.post(`${api}/notepad/add`,obj)
				.then((res)=>{
					return dispatch({type:"NOTE_PAD",payload:res.data})
				})
			
				.catch((err)=>{
					return dispatch({type:"NOTE_PAD",payload:[]})
				})


		case 'Read':
			

			return axios.post(`${api}/notepad/get`,obj)
				.then((res)=>{
					return dispatch({type:"NOTE_PAD",payload:res.data})
				})

				.catch((err)=>{
					return dispatch({type:"NOTE_PAD",payload:[]})
				})

		case 'Update':
			// add id in obj
			obj.id = id
			return axios.post(`${api}/notepad/update`,obj)
				.then((res)=>{
					return dispatch({type:"NOTE_PAD",payload:res.data})
				})

				.catch((err)=>{
					return dispatch({type:"NOTE_PAD",payload:[]})
				})

		case 'Delete':
			obj.id = id
			return axios.post(`${api}/notepad/delete`,obj)
				.then((res)=>{
					return dispatch({type:"NOTE_PAD",payload:res.data})
				})

				.catch((err)=>{
					return dispatch({type:"NOTE_PAD",payload:[]})
				})


		default:
		// or finesse an obj to display an lone wolf error msg
			return dispatch({type:"NOTE_PAD",payload:[]})
	}
}



export const send_note_obj_to_form = (obj) => dispatch =>{
	return dispatch({type:"NOTE_UPD_OBJ",payload:obj})
}








