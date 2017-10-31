import React, { Component } from "react"

import { TabNavigator, StackNavigator } from "react-navigation"

import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { 
    SignInScreen, 
    SignoutScreen, 
    ToolsScreen, 
    SettingsScreen, 
    BmiCalculatorScreen,
    OxfordDictScreen
} from "../screens"

const ToolsTab = ({ navigation }) => {
    return <ToolsScreen navigation={navigation} />
}

const SettingsTab = ({ navigation }) => {
    return <SettingsScreen navigation={navigation} />
}

const RootTabs = TabNavigator(
    {
        ToolsTab: {
            screen: ToolsTab,
            path: '/tools',
            navigationOptions: {
                title: 'Tools',
                tabBarLabel: 'Tools',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Entypo
                        name='tools'
                        size={26}
                        style={{ color: tintColor }}
                    />
                )
            }
        },
        SettingsTab: {
            screen: SettingsTab,
            path: '/settings',
            navigationOptions: {
                title: 'Settings',
                tabBarLabel: 'Settings',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name='md-settings'
                        size={26}
                        style={{ color: tintColor }}
                    />
                )
            }
        }
    }
)

export default StackNavigator(
    {
        SignInScreen: {
            screen: SignInScreen,
            navigationOptions: {
                header: null
            }
        },
        SignoutScreen: {
            screen: SignoutScreen,
            path: '/signout',
            navigationOptions: {
                title: 'Sign Out',
                header: null
            }
        },
        RootTabs: {
            screen: RootTabs
        },
        SettingsScreen: {
            screen: SettingsScreen,
            path: '/',
            navigationOptions: {
                title: 'Settings'
            }
        },
        ToolsScreen: {
            screen: ToolsScreen,
            path: '/',
            navigationOptions: {
                title: 'Tools'
            }
        },
        BmiCalculatorScreen: {
            screen: BmiCalculatorScreen,
            path: '/BMI',
            navigationOptions: {
                title: 'BMI Calculator'
            }
        },
        OxfordDictScreen: {
            screen: OxfordDictScreen,
            path: '/oxforddict',
            navigationOptions: {
                title: 'Oxford Dictionary'
            }            
        }
    }
)