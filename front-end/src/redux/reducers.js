import logo from '../util/imgs/logo.png'
import dtbn from '../util/imgs/dtbn.svg'
import dtbn_ from '../util/imgs/dtbn.png'

const initialStorage = {
	// login / register modz
	are_we_logging_in:false,
	register_msg:'Register',
	login_msg:'Login',
	// login / register modz


	// logged in user
			
	user:(window.sessionStorage.dtb_user || window.localStorage.dtb_user) || '{}',
	// logged in user

	// images
	logo:logo,
	dtbn:dtbn,
	dtbn_:dtbn_,
	// images



	// ip tools modz
	ip:'',
	url_ip:null,
	url_or_ip_msg:null,
	url_or_ip_data:{},

	// ip tools modz

	// url shortener response , otherwise null
	short_url:null,
	// url shortener response , otherwise null

	// notes from the users account, otherwise empty(load spinner)
	notes:null,
	will_upd:false,
	upd_obj:{},
	// notes from the users account, otherwise empty(load spinner)



}






const reducer = (state=initialStorage,action) =>{
	switch(action.type){
		case "TOGGLE_FORMS":
			return {
				...state,
				are_we_logging_in:action.payload || !state.are_we_logging_in
			}

		case "REGISTER_MSG":
			return {
				...state,
				register_msg:action.payload
			}


		case "LOGIN_MSG":
			return {
				...state,
				login_msg:action.payload.msg,
				user:JSON.stringify(action.payload.obj)
			}


		case "GET_IP":
			return {
				...state,
				ip:action.payload
			}
		
		case "URL_IP":
			return {
				...state,
				url_ip:action.payload
			}

		case "GEO_CREDZ":
			return {
				...state,
				url_or_ip_msg:action.payload.msg,
				url_or_ip_data:action.payload.data
			}


		case "SHORT_URL":
			return {
				...state,
				short_url:action.payload
			}


		case "NOTE_PAD":
			return {
				...state,
				notes:action.payload
			} 
		

		case "NOTE_UPD_OBJ":
			let b = action.payload.bool
			delete action.payload.bool
			return {
				...state,
				will_upd:b,
				upd_obj:action.payload
			} 



		default:
			return state
	}
}





export default reducer