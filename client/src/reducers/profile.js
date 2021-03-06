import * as types from '../actions/types'
const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
}

const profile = (state=initialState, action) => {
    const {type, payload} = action
    switch(type) {
        case types.GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case types.PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case types.CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false,
            }
        default:
            return state
    }
}

export default profile