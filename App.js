
import { StyleSheet, Text, View } from 'react-native';
import Intro from './components/screens/Intro';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteScreen from './components/screens/NoteScreen';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import NoteDetails from './components/NoteDetails';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
export default function App() {
  const [user, setUser] = useState({});
  // const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    console.log(result);
    if (result !==null){
      setUser(JSON.parse(result));
    }
  };

  useEffect(() => {
    findUser();
    // AsyncStorage.clear(); // clear the asyncStorage data
  }, []);
  const RenderNoteScreen = props => <NoteScreen {...props} user={user}/>
  if(!user.name) return <Intro onFinish={findUser} />
  return <NavigationContainer>
  <Stack.Navigator  screenOptions={{ headerTitle: '', headerTransparent: true }}>
    <Stack.Screen component={RenderNoteScreen} name="NoteScreen"/>
    <Stack.Screen component={NoteDetails} name="NoteDetails"/>
  </Stack.Navigator>
  </NavigationContainer>
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:60, 
  },
});
