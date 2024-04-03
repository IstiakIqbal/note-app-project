import { View, Text, Pressable, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { QuerySnapshot, collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase.config';

export default function Home({navigation, route, user}) {
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const q = query(collection(db, 'notes'), where ("uid", "==", user.uid));
    const notesListenerSubscription = onSnapshot(q, (QuerySnapshot) => {
      // console.log("QuerySnapshot--> ", QuerySnapshot)
      const list = [];
      QuerySnapshot.forEach((doc) => {
        list.push({...doc.data(), id: doc.id});
      });
      setNotes(list)
      setLoading(false);
    });
    return notesListenerSubscription;
  }, [])
  console.log("Notes --> ",notes);
  
  const renderItem = ({item}) => {
    const {title, description, color} = item;
    return(
      <Pressable
      style={{backgroundColor: color, marginBottom: 25, borderRadius: 16, padding: 15}}
      onPress={()=> {
        navigation.navigate("Edit", {item})
      }}>
        <Pressable style={{position: 'absolute', alignSelf: 'flex-end', padding: 15, zIndex: 4}}
        onPress={() => {
          deleteDoc(doc(db, "notes", item.id))
        }}
        >
        <MaterialIcons name="delete" size={24} color="black" />
        </Pressable>
        <Text
        style={{color: "white", fontSize: 24}}>
          {title}
        </Text>
        <Text
        style={{color: "white", fontSize: 18, marginTop: 8}}>
          {description}
        </Text>
      </Pressable>
    )
  }
  const onPressCreate = () => {
    navigation.navigate("Create");
  }
  if(loading){
    return (
      <SafeAreaView
      style = {{ flex: 1, justifyContent: "center", alignItems: "center"}}
      >
        <ActivityIndicator/>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1}}>
      <View
      style={{
        flexDirection: 'row', justifyContent: 'space-between', padding: 20  }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#18B18D' }}>
                    My Notes
                </Text>
                <Pressable onPress={onPressCreate}>
                   <AntDesign name="pluscircleo" size={24} color="black" />
                </Pressable>
                </View>
                <FlatList
                        data={notes}
                        keyExtractor={(item) => item.title}
                        renderItem={renderItem}
                        contentContainerStyle={{ padding: 20 }}

                    />
            
    </SafeAreaView>
  )
}