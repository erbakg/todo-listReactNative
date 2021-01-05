import React, { useState } from 'react';
import {
  FlatList,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import TodoItem from './TodoItem';
import ArchiveScreen from './ArchiveList';
export default function TodoList() {
  const [actionList, setActionList] = useState(() => [
    { id: Date.now().toString(), title: 'Задача 1', status: false },
  ]);
  const [archiveList, setArchiveList] = useState([]);
  const [openedArchive, setOpenedArchive] = useState(true);
  const [openedModal, setOpenedModal] = useState(false);
  const [inputText, setInputText] = useState('');
  const [editableID, setEditableID] = useState('');

  const showModal = () => {
    setOpenedModal(true);
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
  const updateText = () => {
    const newTitle = actionList.map((item) => {
      if (item.id === editableID) {
        item.title = inputText;
        return item;
      }
      return item;
    });
    setActionList(newTitle);
  };

  const removeActions = (id) =>
    setActionList(actionList.filter((item) => item.id !== id));

  const removeActionsToArchive = (id) => {
    const itemToArchive = actionList.find((item) => item.id === id);
    setArchiveList(archiveList.concat(itemToArchive));
    setArchiveList([...archiveList, itemToArchive]);
  };
  const changeText = (text) => setInputText(text);

  const completeAction = (id) =>
    setActionList(
      actionList.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TouchableOpacity
        style={styles.linkToArchive}
        onPress={() => setOpenedArchive(!openedArchive)}
      >
        <Text style={styles.linkTxt}>
          {openedArchive ? 'Archive' : 'Actions'}
        </Text>
      </TouchableOpacity>
      <View style={openedArchive ? { display: 'none' } : { flex: 1 }}>
        <ArchiveScreen archiveList={archiveList} />
      </View>
      <View style={openedArchive ? { flex: 1 } : { display: 'none' }}>
        <TouchableOpacity style={styles.addActionBtn} onPress={addAction}>
          <AntDesign name="pluscircleo" size={24} color="#fff" />
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
