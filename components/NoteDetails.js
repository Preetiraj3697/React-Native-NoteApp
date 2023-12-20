import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements';
import colors from './misc/colors';
import RoundIConBtn from './RoundIConBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from './context/NoteProvider';
import NoteInputModal from './NoteInputModal';
import { useState } from 'react';

const formatDate = ms => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date. getMonth()+1;
    const year = date. getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`
}

export default function NoteDetails(props) {
    // const {note} = props.route.params;
    const [note, setNote] = useState(props.route.params.note)
    const [showModal, setShowModal] = useState(false);
    const headerHeight = useHeaderHeight();
    const {setNotes} = useNotes();
    const [isEdit, setIsEdit] = useState(false);

    
    const deleteNote = async () => {
      const result = await AsyncStorage.getItem('notes');
      console.log(result);
      let notes = [];
      if (result !== null) notes = JSON.parse(result);
      const newNotes = notes.filter(n => n.id !== note.id);
      setNotes(newNotes);
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      props.navigation.goBack();
    }
    const displayDeleteAlert = () => {
        Alert.alert("Are you sure!", "This action will delete your note parmanetly!", [
            {
                text:"Delete", 
                onPress: deleteNote
            },
            {
                text:'No Thanks', 
                onPress: () => console.log('No Thanks!')
            },
            {
                cancelable:true,
            }
        ])
    };

    const handleUpdate = async (title,desc,time) => {
     const res = await AsyncStorage.getItem('notes');
     let notes = [];
     if(res !== null) notes = JSON.parse(res);

    const newNotes =  notes.filter( n => {
        if(n.id === note.id){
          n.title = title;
          n.desc = desc;
          n.isUpdate = true;
          n.time = time;

          setNote(n)
        }
        return n;
     });
     setNotes(newNotes);
     await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
    };
    const handleOnClose = () => {
     setShowModal(false)
    }
    const openEditModal = () => {
      setIsEdit(true);
      setShowModal(true);
    }
  return (
    <>
    <ScrollView style={[styles.container, {paddingTop: headerHeight}]}>
      <Text style={styles.time}>{note.isUpdate ? `Updated At ${formatDate(note.time)}`
      :
       `Created At ${formatDate(note.time)}`}</Text>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.desc}>{note.desc}</Text>
    </ScrollView>
    
    <View style={styles.btnContainer}>
    <RoundIConBtn antIconName='delete' 
     style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
     onPress={displayDeleteAlert}
     />
    <RoundIConBtn antIconName='edit'
    onPress={openEditModal}
    />
  </View>
  <NoteInputModal isEdit={isEdit} note={note} onClose={handleOnClose} onSubmit={handleUpdate} visible={showModal} />
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingHorizontal: 20,
        paddingVertical:20,
      },
      title: {
        fontSize: 30,
        color: colors.PRIMARY,
        fontWeight: 'bold',
      },
      desc: {
        fontSize: 20,
        opacity: 0.6,
      },
      time: {
        textAlign: 'right',
        fontSize: 12,
        opacity: 0.5,
      },
      btnContainer: {
        position: 'absolute',
        right: 15,
        bottom:50,
      },
})