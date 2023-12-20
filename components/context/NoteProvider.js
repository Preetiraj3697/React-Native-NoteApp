import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState} from 'react'
// import { StyleSheet, Text, View } from 'react-native'

const NoteContext = createContext()

export default function NoteProvider({children}) {
    const [notes,setNotes] = useState([]);
    const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes');
        // console.log('result is', result);
        if(result !== null) setNotes(JSON.parse(result));
      }
      useEffect(()=>{
          findNotes();
          
      },[]);
    return (
    <NoteContext.Provider value={{notes, setNotes, findNotes}}>
        {children}
    </NoteContext.Provider>
  )
}
