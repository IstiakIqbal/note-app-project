import { View, Text ,SafeAreaView, Image, TextInput, StyleSheet, Pressable, selected, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, { useEffect } from 'react'
import Input from '../components/input'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth, db} from "../../src/firebase.config"
import {addDoc, collection, getDocs, doc, onSnapshot, query, where} from "firebase/firestore"

const genderOptions = ["Male", "Female"]

export default function Signup() {
 const [gender, setGender] = React.useState(null)
 const [email, setEmail] = React.useState("")
 const [password, setPassword] = React.useState("")
 const [age, setAge] = React.useState("")
 const [name, setName] = React.useState("")
 const [loading, setLoading] = React.useState(false)

 const signup = async () => {
  setLoading(true);
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log("result -->", result);
    await addDoc(collection(db, 'users'), {
      name: name,
      email: email,
      age: age,
      gender: gender,
      uid: result.user.uid
    });
    setLoading(false)

  
  } catch (error){
    console.log("error --->", error);

    setLoading(false);
  }
}



//  const signup = () => {
//   createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
//     const user = userCredential.user;
//     console.log("user created", user)
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(error)
//   });
//   console.log(email, password)
//  };

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input placeholder='Email Address' autoCapitalize={'none'} onChangeText={(text) => setEmail(text)}/>
        <Input placeholder='Password' secureTextEntry
        onChangeText={(text) => setPassword(text)}/>
        <Input placeholder='Full Name' autoCapitalize={"words"} onChangeText={(text) => setName(text)}/>
        <Input placeholder='Age' onChangeText={(text) => setAge(text)}/>
        <View style={{marginVertical: 20}}>
          <Text>Select Gender</Text>
        </View>
        

        {genderOptions.map((option) =>{
          const selected = option === gender;
          return(
            <Pressable
            onPress={() => setGender(option)}
            key={option}
            style={styles.radioContainer}>
          <View
          style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
            <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]}/>
          </View>
          <Text style={styles.radioText}>
            {option}
          </Text>
          </Pressable>
          )
  })}
      </View>
      <View style={{flex: 1, justifyContent: "flex-end", alignItems: "center"}}>
      {/* <Button title={"Submit"} customStyles={{alignSelf:"center", marginBottom: 60 }} onPress={signup}/> */}
  
      <TouchableOpacity style={
        {alignSelf:"center", marginBottom: 60, borderRadius: 30,
        width: 165,
        height: 45,
        backgroundColor: '#FFE600',
        justifyContent: 'center',
        alignItems: 'center', }} customStyles={{alignSelf:"center", marginBottom: 60 }} onPress={signup}>
        <Text>Submit</Text>
      </TouchableOpacity>

        <Pressable>
        <Text>Already have an account? {" "}
          <Text style={{color:"green", fontWeight: "bold"}}>
            Sign in
          </Text>
        </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create(
  {
    input: {
      height: 48,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      marginBottom: 25,
    },
    radioContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    outerCircle: {
      height: 30,
      width: 30,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "#cfcfcf",

      alignItems: "center",
      justifyContent: "center"
    },
    innerCircle: {
      height: 15,
      width: 15,
      borderRadius: 7.5,
      borderWidth: 1,
      borderColor: "#cfcfcf",
    },
    radioText: {
      marginLeft: 10,
    },
    selectedOuterCircle: {
      borderColor: "orange",
    },
    selectedInnerCircle: {
      backgroundColor: "orange",
      borderColor: "orange",
    }
  }
)