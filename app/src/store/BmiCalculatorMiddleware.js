import { BMI_UPDATE_PROP, CLEAR_USER_INFO, BMI_UPDATE_FETCH_PREVIOUS } from "../actions/types"

import { AsyncStorage } from "react-native"

export default store => next => action => {
    switch (action.type) {
    case BMI_UPDATE_FETCH_PREVIOUS:
        AsyncStorage.getItem('bmi').then((storedBmi) => {
            console.log(storedBmi)
            next({ ...action, payload: storedBmi ? JSON.parse(storedBmi) : {} })
        }
        )
        break
    case BMI_UPDATE_PROP: {
        next(action)
        const state = store.getState()
        AsyncStorage.setItem('bmi', JSON.stringify(state.bmiForm))
        break
    }
    case CLEAR_USER_INFO: {
        next(action)
        AsyncStorage.removeItem('bmi')
        break
    }

    default: 
        next(action)
        break
    }
}