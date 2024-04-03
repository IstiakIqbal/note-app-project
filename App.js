import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Signup from './src/screens/signup';
import Edit from './src/screens/edit';
import Create from './src/screens/create';    
import Signin from './src/screens/signin';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './src/firebase.config';
import FlashMessage from "react-native-flash-message";


const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  }
};
const Stack = createNativeStackNavigator();
export default function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  
  // useEffect(() => {
  //   signOut(auth)
  // })
  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user)
        setLoading(false)
      }
      else{
        setUser(null)
        setLoading(false)
      }
    })
    return authSubscription;
  }, []);
  
  if(loading) {
    return (
      <View style={{ flex:1, justifyContent: 'center', alignItems: "center"}}>
        <ActivityIndicator color="yellow" size="large"/>
      </View>
    )
  }
  
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {user ? (
          <>
          <Stack.Screen name="Home"  options={{ headerShown: false }}>
            {props => <Home {...props} user={user} />}
          </Stack.Screen>
          <Stack.Screen name="Create">
            {props => <Create {...props} user={user} />}
          </Stack.Screen>
          <Stack.Screen name="Edit" component={Edit} />
        </>
        ) : (
          <>
          <Stack.Screen
          name="Signin"
          component={Signin}
          options={{ headerShown: false }}
          />     
          <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" /> 
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
