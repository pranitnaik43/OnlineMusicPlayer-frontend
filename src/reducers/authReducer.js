import Cookies from 'js-cookie'

export const SET = "SET";
export const EMPTY = "EMPTY";

export const authReducer = (state={accessToken: null, isAdmin: false}, action) => {
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