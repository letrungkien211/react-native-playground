import React, { Component } from "react"

import { SearchBar, Card, Text, List, ListItem } from "react-native-elements"
import { View, ScrollView, FlatList } from 'react-native'

import { connect } from "react-redux"

import { Spinner } from "../components/common";

import { search, updateKeyword } from "../actions/OxfordDictActions"

const RenderCategory = ({ item, index }) => {
    return <Card
        title={item.lexicalCategory}>
        <FlatList
            keyExtractor={(item, index) => index}
            data={item.defs}
            renderItem={RenderDef}
        />
    </Card>
}

const RenderDef = ({ item, index }) => {
    const { definitionsContainer, definitionStyle, indexStyle, exampleStyle } = styles;
    return <View>
        <View style={definitionsContainer}>
            <Text style={indexStyle}>{(index + 1).toString()}.</Text>
            <Text style={definitionStyle}>{item.definitions.join(';')}</Text>
        </View>
        <Text style={exampleStyle}>{item.examples.map(x => x.text).join(';')}</Text>
    </View>
}

const GoogleTranslateScreen = ({ keyword, lexicalEntries, search, updateKeyword, isSearching, errorMessage }) => {
    const main = isSearching ?
        <Spinner size='large' /> :
        errorMessage ? <Text style={styles.errorTextStyle}>{errorMessage}</Text> :
            <FlatList
                data={lexicalEntries}
                renderItem={RenderCategory}
                keyExtractor={(item, index) => index}
            />

    return <ScrollView>
        <SearchBar
            value={keyword}
            onChangeText={updateKeyword}
            onSubmitEditing={() => search(keyword)}
            clearButtonMode='while-editing'
        />
        {main}
    </ScrollView>
}


const mapStateToProps = ({ googleTranslateForm }) => {
    const { keyword, result, isSearching, error } = googleTranslateForm
    let lexicalEntries = null
    let errorMessage = null

    if (result && result.results && result.results.length) {
        lexicalEntries = result.results[0].lexicalEntries.reduce((filtered, { lexicalCategory, entries }) => {
            if (entries) {
                let cat = filtered.find(element => element.lexicalCategory == lexicalCategory)
                if (!cat) {
                    cat = { lexicalCategory, defs: [] }
                    filtered.push(cat)
                }
                const { defs } = cat
                entries.forEach(entry => {
                    if (entry.senses) {
                        entry.senses.forEach(sense => {
                            const { definitions, examples } = sense
                            if (definitions) {
                                defs.push({ definitions, examples: examples || [] })
                            }
                        })
                    }
                });
            }
            return filtered
        }, [])
    }
    else if (error) {
        if (error.response && error.response.status == '404') {
            errorMessage = 'NOT FOUND'
        }
        else {
            errorMessage = 'Unknown error has occurred!'
        }
    }
    return { keyword, result, isSearching, lexicalEntries, errorMessage }
}

const styles = {
    definitionsContainer: {
        flexDirection: 'row'
    },
    indexStyle: {
        paddingRight: 10,
        fontWeight: 'bold'
    },
    definitionStyle: {
        fontWeight: 'bold'
    },
    exampleStyle: {
        fontStyle: 'italic'
    },
    errorTextStyle: {
        color: 'red',
        alignSelf: 'center'
    }
}

export default connect(mapStateToProps, { search, updateKeyword })(GoogleTranslateScreen)