import { SIGNIN_START, SIGNIN_SUCCESS, SIGNIN_FAIL, SIGNOUT_START, SIGNOUT_FAIL, SIGNOUT_SUCCESS } from "../actions/types"

const INITIAL_STATE = {
    isLoading: false,
    isSigningOut: false,
    error: '',
    user: null
}

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
    case SIGNIN_START:
        return {...state, isLoading: true , error: null}
    case SIGNIN_SUCCESS:
        return {...state, isLoading: false, error: null, user: action.payload}
    case SIGNIN_FAIL:
        return {...state, isLoading: false, error: action.payload}
    case SIGNOUT_SUCCESS:
        return {...state, isSigningOut: false, user: null}
    case SIGNOUT_START:
        return {...state, isSigningOut: true}
    case SIGNOUT_FAIL:
        return {...state, isSigningOut: false, user: null}
    default:
        return state
    }
}