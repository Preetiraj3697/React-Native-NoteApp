import { StyleSheet, Text, TextInput, View } from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import React from 'react'
import colors from './misc/colors'

export default function SearchBar({containerStyle, value, onClear, onChangeText}) {
  return (
    <View style={[styles.container, {...containerStyle}]}>
      <TextInput value={value} onChangeText={onChangeText} style={styles.searchBar} placeholder='Search me'/>
      {value ? <AntDesign name='close' size={20} color={colors.PRIMARY} onPress={onClear} style={styles.clearIcon} /> : null}
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