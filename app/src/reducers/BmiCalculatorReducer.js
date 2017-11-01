import { BMI_UPDATE_PROP, BMI_UPDATE_FETCH_PREVIOUS } from "../actions/types"

const INITIAL_STATE = {
    weight: '',
    height: '',
    bmi: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case BMI_UPDATE_PROP: {
        const nextState = { ...state, [action.payload.prop]: action.payload.value }

        const w = parseFloat(nextState.weight)
        const h = parseFloat(nextState.height)

        const bmi = (w != null && h != null && w > 0 && h > 0) ? ((w / (h * h / 10000)).toFixed(2)).toString() : ''
        return { ...nextState, bmi: bmi.toString() }
    }
    case BMI_UPDATE_FETCH_PREVIOUS: {
        return {...state, ...action.payload}
    }
    default:
        return state
    }
}

