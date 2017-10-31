import { BMI_UPDATE_PROP, BMI_UPDATE_FETCH_PREVIOUS } from "./types"

export const bmiUpdateInput = ({prop, value}) =>{
    return {
        type: BMI_UPDATE_PROP,
        payload: {prop, value}
    }
}

export const bmiFetch = () => {
    return {
        type: BMI_UPDATE_FETCH_PREVIOUS
    }
}