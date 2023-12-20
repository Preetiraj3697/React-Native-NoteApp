import { StatusBar } from 'expo-status-bar'
import { FlatList, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import colors from '../misc/colors'
import { useEffect, useState } from 'react'
import SearchBar from '../SearchBar';
import RoundIConBtn from '../RoundIConBtn';
import NoteInputModal from '../NoteInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Note from '../Note';



export default function NoteScreen({user, navigation}) {
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
    
    const hanldeOnSubmit = async (title, desc) => {
     const time = new Date().getTime();
     const note = {id:Date.now(),title,desc, time};
     const updatedNotes = [...notes, note];
     setNotes(updatedNotes);
     await AsyncStorage.setItem("notes",JSON.stringify(updatedNotes));
    }
    const openNote = note => {
      navigation.navigate('NoteDetails', { note });
    };
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT}/>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
      {notes.length? <SearchBar containerStyle={{marginVertical:15}} /> : null}
      <FlatList data={notes} 
      numColumns={2}
      columnWrapperStyle={{justifyContent:'space-between', marginBottom:15}}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <Note item={item} onPress={() => openNote(item)}/> } />
      {!notes.length ? (
        <View  style={[
          StyleSheet.absoluteFillObject,
          styles.emptyHeaderContainer,
        ]}>
  <Text style={styles.emptyHeader}>Add Notes</Text>
</View>
      ): null}
    </View>
    </TouchableWithoutFeedback>
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