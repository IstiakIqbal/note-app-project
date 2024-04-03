import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/input';
import RadioInput from '../components/radio-input';
import Button from '../components/Button';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase.config';
import { showMessage } from 'react-native-flash-message';

const noteColorOption = ["red", "blue", "green"];

export default function Create({ navigation, user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteColor, setNoteColor] = useState("blue");
  const [loading, setLoading] = useState(false);

  const onPressCreate = async () => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        title: title,
        description: description,
        color: noteColor,
        uid: user.uid
      });
      console.log("Succeeded my note upload");
      setLoading(false);
      showMessage({
        message: "Note created successfully",
        type: 'success',
      });
      navigation.goBack();
    } catch (err) {
      console.log('error', err);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ marginHorizontal: 20, flex: 1 }}>
      <Input
        onChangeText={(text) => setTitle(text)}
        placeholder="Set the title"
      />
      <Input
        placeholder="Set the description"
        onChangeText={(text) => setDescription(text)}
        multiline={true}
      />
      <View style={{ marginTop: 20 }}>
        <Text style={{ marginBottom: 15, fontSize: 18 }}>
          Select your note color
        </Text>
        {noteColorOption.map((option, index) => (
          <RadioInput
            key={index}
            label={option}
            value={noteColor}
            setValue={setNoteColor}
            size="big"
          />
        ))}
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title="Submit"
            customStyles={{ alignSelf: "center", margin: 20 }}
            onPress={onPressCreate}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
