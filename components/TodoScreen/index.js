import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
} from 'react-native';
import TodoList from './TodoList';

const { height } = Dimensions.get('window').height;

export default function TodoScreen() {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: '5%' }}>
        <View>
          <Text style={styles.mainTxt}>My tasks</Text>
        </View>
      </View>
      <ScrollView>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <TodoList />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02732A',
    height,
  },
  mainTxt: {
    marginTop: '5%',
    fontSize: 24,
    color: '#fff',
    alignSelf: 'center',
  },
});
