import React, { Component } from "react"
import { View, KeyboardAvoidingView, ScrollView  } from 'react-native'
import { connect } from 'react-redux'

import { Card, FormLabel, FormInput, FormValidationMessage, Text } from "react-native-elements"

import { bmiUpdateInput } from '../actions/BmiCalculatorActions'

const BmiCalculatorScreen = ({ height, weight, bmi, bmiUpdateInput }) => {
    return (
        <ScrollView>
            <Card title='BMI'>
                <Text h1 style={styles.bmiText}>{bmi}</Text>
            </Card>
            <Card>
                <FormLabel>Height</FormLabel>
                <FormInput 
                    value={height} 
                    onChangeText={(value) => bmiUpdateInput({ prop: 'height', value })}
                    keyboardType='numeric'
                ></FormInput>
                <FormLabel>Weight</FormLabel>
                <FormInput 
                    value={weight} 
                    onChangeText={(value) => bmiUpdateInput({ prop: 'weight', value })}
                    keyboardType='numeric'
                ></FormInput>
            </Card>
        </ScrollView>
    )
}

const styles = {
    bmiText: {
        textAlign: 'center'
    }
}

const mapStateToProp = ({ bmiForm }) => {
    return { ...bmiForm }
}

export default connect(mapStateToProp, { bmiUpdateInput })(BmiCalculatorScreen)
