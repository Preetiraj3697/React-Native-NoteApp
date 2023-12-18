import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import colors from './misc/colors'

export default function SearchBar({containerStyle}) {
  return (
    <View style={[styles.container, {...containerStyle}]}>
      <TextInput style={styles.searchBar} placeholder='Search me'/>
    </View>
  )
}

const styles = StyleSheet.create({
    searchBar: {
        borderWidth: 0.5,
        borderColor: colors.PRIMARY,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 20,
      },
      container: {
        justifyContent: 'center',
      },
      clearIcon: {
        position: 'absolute',
        right: 10,
      },
})