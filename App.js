
import { StyleSheet} from 'react-native';
import Intro from './components/screens/Intro';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteScreen from './components/screens/NoteScreen';
import { createStackNavigator } from '@react-navigation/stack';
import NoteDetails from './components/NoteDetails';
import { NavigationContainer } from '@react-navigation/native';
import NoteProvider from './components/context/NoteProvider';

const Stack = createStackNavigator();
export default function App() {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result === null) return setIsAppFirstTimeOpen(true);
    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };

  useEffect(() => {
    findUser();
  }, []);

  const RenderNoteScreen = props => <NoteScreen {...props} user={user} />;

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;
  return <NavigationContainer>
    <NoteProvider>
  <Stack.Navigator  screenOptions={{ headerTitle: '', headerTransparent: true }}>
    <Stack.Screen component={RenderNoteScreen} name="NoteScreen"/>
    <Stack.Screen component={NoteDetails} name="NoteDetails"/>
  </Stack.Navigator>
  </NoteProvider>
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
