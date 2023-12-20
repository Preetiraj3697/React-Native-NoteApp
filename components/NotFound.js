import { StyleSheet, Text, View } from 'react-native'
import {AntDesign} from '@expo/vector-icons'

export default function NotFound() {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
     <AntDesign color='black' name='frowno' size={90} />
     <Text style={styles.text}>Result not Found</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        opacity:0.5,
        zIndex:-1,
    },
    text:{
     marginTop:20,
     fontSize:20
    }
})