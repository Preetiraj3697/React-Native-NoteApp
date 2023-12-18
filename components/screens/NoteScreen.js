import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../misc/colors'
import { useEffect, useState } from 'react'
import SearchBar from '../SearchBar';
import RoundIConBtn from '../RoundIConBtn';
import NoteInputModal from '../NoteInputModal';

export default function NoteScreen({user}) {
    const [greet,setGreet] = useState('Evening');
    const [modalVisible, setModalVisible] =useState(false);
    const findGreet = () => {
        const hrs = new Date().getHours();
        console.log(hrs);
        if(hrs === 0 || hrs < 12) return setGreet("Morning");
        if(hrs === 1 || hrs < 12) return setGreet("Afternoon");
        setGreet("Evening");
    }
    useEffect(()=>{
        findGreet();
    },[]);
    
    const hanldeOnSubmit = (title, desc) => {
    console.log(title,desc)
    }
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT}/>
    <View style={styles.container}>
      <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
      <SearchBar containerStyle={{marginVertical:15}} />
      <View  style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}>
        <Text style={styles.emptyHeader}>Add Notes</Text>
      </View>
    </View>
    <RoundIConBtn onPress={() => setModalVisible(true)} antIconName="plus" style={styles.addBtn} />
    <NoteInputModal visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={hanldeOnSubmit}/>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  addBtn: {
    position: 'absolute',
    right: 15,
    bottom: 50,
    zIndex: 1,
  },
});