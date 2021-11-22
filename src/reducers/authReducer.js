import Cookies from 'js-cookie'

export const SET = "SET";
export const EMPTY = "EMPTY";

let accessToken = Cookies.get("accessToken"); 
if(!accessToken) accessToken = null;

let isAdmin = Cookies.get("isAdmin");
if(!isAdmin) isAdmin = false;

export const authReducer = (state={accessToken: accessToken, isAdmin: isAdmin}, action) => {
  switch(action.type) {
    case SET: {
      if(action.data) {
        if(action.data.accessToken) {
          let accessToken = action.data.accessToken;
          state.accessToken = accessToken
          //set cookie (expires in 2 days)
          Cookies.set('accessToken', accessToken, { expires: 2 })
        }
        if(action.data.isAdmin===true) {
          let isAdmin = action.data.isAdmin;
          state.isAdmin = true;
          //set cookie (expires in 2 days)
          Cookies.set('isAdmin', isAdmin, { expires: 2 })
        }
      }
      return { ...state };
    }

    case EMPTY: {
      return {accessToken: null, isAdmin: false};
    }

    default: {
      return state;
    }
      
  }
}