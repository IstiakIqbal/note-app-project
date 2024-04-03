import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../src/firebase.config';
import Input from '../components/input';

export default function Signin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Signed in successfully", user);
      })
      .catch((error) => {
        setError(error.message);
        console.error('Error signing in:', error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image source={require('../../assets/empty-state.png')} style={{ alignSelf: "center" }} />
      <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Never forget your notes</Text>
      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input
          autoCapitalize={'none'}
          placeholder='Email Address'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder='Password'
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
      <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginBottom: 60,
            borderRadius: 30,
            width: 165,
            height: 45,
            backgroundColor: '#FFE600',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleLogin}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text>Don't have an account? <Text style={{ color: "green", fontWeight: "bold" }}>Sign up</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
