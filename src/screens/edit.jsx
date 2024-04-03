import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/input';
import RadioInput from '../components/radio-input';
import Button from '../components/Button';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { showMessage } from 'react-native-flash-message';

const noteColorOption = ["red", "blue", "green"];

export default function Create({ navigation, route, user }) {
  const noteItem = route.params.item;
  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [noteColor, setNoteColor] = useState(noteItem.color);
  const [loading, setLoading] = useState(false);

  const onPressEdit = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "notes", noteItem.id), {
        title: title,
        description: description,
        color: noteColor
      });
      setLoading(false);
      showMessage({
        message: "Note updated successfully",
        type: "success"
      });
      navigation.goBack();
    } catch (err) {
      console.error("Error updating note:", err);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ marginHorizontal: 20, flex: 1 }}>
      <Input 
        onChangeText={(text) => setTitle(text)}
        placeholder="Set the title"
        value={title} 
      />
      <Input 
        placeholder="Set the description" 
        onChangeText={(text) => setDescription(text)}
        value={description}
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
          <ActivityIndicator/>
        ) : (
          <Button
            title="Submit"
            customStyles={{ alignSelf: "center", margin: 20 }}
            onPress={onPressEdit}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
