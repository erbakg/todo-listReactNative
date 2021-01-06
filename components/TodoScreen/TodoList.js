import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AntDesign } from '@expo/vector-icons';

import TodoItem from './TodoItem';
import ArchiveScreen from './ArchiveList';

export default function TodoList() {
  useEffect(() => {
    loadToStorage();
    loadArchivesToStorage();
  }, []);
  const [actionList, setActionList] = useState([
    { id: Math.random().toString(12), title: 'Задача 1', status: false },
  ]);
  const [archiveList, setArchiveList] = useState([]);
  const [openedArchive, setOpenedArchive] = useState(true);
  const [openedModal, setOpenedModal] = useState(false);
  const [inputText, setInputText] = useState('');
  const [editableID, setEditableID] = useState('');

  const saveToStorage = async () => {
    try {
      await AsyncStorage.setItem('todoList', JSON.stringify(actionList));
    } catch (error) {
      alert('saving data error');
    }
  };
  const saveArchivesToStorage = async () => {
    try {
      await AsyncStorage.setItem('archiveList', JSON.stringify(archiveList));
    } catch (error) {
      alert('saving archives data error');
    }
  };

  const loadToStorage = async () => {
    try {
      let todo = await AsyncStorage.getItem('todoList');
      let todoObj = JSON.parse(todo);
      actionList.map((item) => {
        if (item.title !== null) {
          setActionList(todoObj);
        }
      });
    } catch (error) {
      alert('loading data error');
    }
  };
  const loadArchivesToStorage = async () => {
    try {
      let todo = await AsyncStorage.getItem('archiveList');
      let archivesList = JSON.parse(todo);
      setArchiveList(archivesList);
    } catch (error) {
      alert('loading archives data error');
    }
  };

  const showModal = () => {
    setOpenedModal(true);
  };
  const clearStorage = async () => {
    AsyncStorage.clear();
  };
  const addAction = () => {
    setActionList([
      ...actionList,
      {
        id: Date.now().toString(),
        title: '',
        status: false,
      },
    ]);
  };
  const showTxt = (id) => {
    const items = actionList;
    items.map((item) => {
      if (item.id === id) {
        setInputText(item.title);
      }
    });
  };
  const handleID = (id) => {
    setEditableID(id);
  };
  const updateText = async () => {
    const newTitle = actionList.map((item) => {
      if (item.id === editableID) {
        item.title = inputText;
        return item;
      }
      return item;
    });
    await saveToStorage();
    setActionList(newTitle);
  };

  const removeActions = async (id) => {
    try {
      let todoList = await AsyncStorage.getItem('todoList');
      let todosArr = JSON.parse(todoList);
      let deletedTodo = todosArr.filter((item) => item.id !== id);
      AsyncStorage.setItem('todoList', JSON.stringify(deletedTodo));
      setActionList(deletedTodo);
    } catch (error) {
      alert('removing error');
    }
  };

  const removeActionsToArchive = async (id) => {
    const itemToArchive = actionList.find((item) => item.id === id);
    setArchiveList(archiveList.concat(itemToArchive));
    setArchiveList([...archiveList, itemToArchive]);
    await saveArchivesToStorage();
  };

  const changeText = (text) => setInputText(text);

  const completeAction = async (id) => {
    setActionList(
      actionList.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
    await saveToStorage();
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TouchableOpacity
        style={styles.linkToArchive}
        onPress={() => {
          setOpenedArchive(!openedArchive), saveToStorage;
        }}
      >
        <Text style={styles.linkTxt}>
          {openedArchive ? 'Archive' : 'Action'}
        </Text>
      </TouchableOpacity>
      <View style={openedArchive ? { display: 'none' } : { flex: 1 }}>
        <ArchiveScreen archiveList={archiveList} />
      </View>
      <View style={openedArchive ? { flex: 1 } : { display: 'none' }}>
        <TouchableOpacity style={styles.addActionBtn} onPress={addAction}>
          <AntDesign name="pluscircleo" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: '#000',
            width: '30%',
            height: 40,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
          onPress={clearStorage}
        >
          <Text>Clear</Text>
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={actionList}
            renderItem={({ item }) => (
              <TodoItem
                title={item.title}
                status={item.status}
                id={item.id}
                showModal={() => showModal()}
                showTxt={() => showTxt(item.id)}
                handleID={() => handleID(item.id)}
                remove={() => removeActions(item.id)}
                complete={() => completeAction(item.id)}
                removeToArchive={() => removeActionsToArchive(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <Modal
          animationType="fade"
          visible={openedModal ? true : false}
          onRequestClose={() => setOpenedModal(false)}
        >
          <View style={styles.modalView}>
            <TextInput
              style={styles.textInput}
              editable={true}
              defaultValue={inputText}
              onChangeText={changeText}
            />
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => (setOpenedModal(false), updateText())}
            >
              <Text style={styles.saveBtnTxt}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  linkToArchive: {
    marginTop: '2%',
    width: '25%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#03A63C',
  },
  linkTxt: {
    color: '#fff',
  },
  addActionBtn: {
    marginLeft: '5%',
    marginTop: '2%',
  },
  modalView: {
    height: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  textInput: {
    width: '90%',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    borderColor: '#fff',
    borderBottomWidth: 2,
    fontSize: 25,
    color: '#fff',
  },
  saveBtn: {
    width: '30%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnTxt: {
    fontSize: 20,
    color: '#fff',
  },
});
