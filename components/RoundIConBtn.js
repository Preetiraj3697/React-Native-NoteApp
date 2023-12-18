import { StyleSheet, Text, View } from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import colors from './misc/colors'

const RoundIConBtn = ({antIconName,size,color,style,onPress}) => {
  return <AntDesign name={antIconName} size={size || 24} color={color || colors.LIGHT} style={[styles.icon, {...style}]} 
  onPress={onPress}
  />
}



const styles = StyleSheet.create({
    icon:{
        backgroundColor:colors.PRIMARY,
        padding:15,
        borderRadius:50,
        elevation:5,
        width:50,
        alignSelf:'center',
    }
})



export default RoundIConBtn