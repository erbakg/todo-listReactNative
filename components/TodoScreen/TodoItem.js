import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function TodoItem({
  title,
  status,
  id,
  showModal,
  showTxt,
  handleID,
  remove,
  complete,
  removeToArchive,
}) {
  return (
    <View style={styles.container} key={id}>
      <View style={styles.txtBox}>
        <View style={styles.actionTxtBox}>
          <Text style={status ? styles.madeActionTxt : styles.actionTxt}>
            {title}
          </Text>
          <TouchableOpacity
            style={styles.archiveBtn}
            onPress={(id) => removeToArchive(id)}
          >
            <AntDesign name="folderopen" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={remove}>
            <AntDesign name="delete" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.btnBox}>
          <TouchableOpacity
            style={styles.bottomBtns}
            onPress={(id) => {
              showTxt(id), showModal(), handleID(id);
            }}
          >
            <Entypo
              style={{ alignSelf: 'center' }}
              name="pencil"
              size={24}
              color="#fff"
            />
            <Text style={styles.bottomBtnsTxt}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBtns} onPress={complete}>
            <AntDesign
              style={{ alignSelf: 'center' }}
              name="checkcircleo"
              size={24}
              color="#fff"
            />
            <Text style={styles.bottomBtnsTxt}>Finished</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtBox: {
    marginTop: '10%',
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#03a63c',
    borderColor: '#fff',
  },
  actionTxtBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTxt: {
    width: '80%',
    paddingVertical: '5%',
    padding: '3%',
    alignSelf: 'center',
    color: '#fff',
    borderBottomWidth: 1,
    fontSize: 18,
    backgroundColor: '#03a63c',
  },
  madeActionTxt: {
    width: '80%',
    paddingVertical: '5%',
    padding: '3%',
    alignSelf: 'center',
    color: '#000',
    borderBottomWidth: 1,
    fontSize: 18,
    backgroundColor: '#03a63c',
    textDecorationLine: 'line-through',
  },
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '85%',
    alignItems: 'center',
  },
  archiveBtn: {
    marginRight: '2%',
  },
  bottomBtns: {
    width: '40%',
    height: 50,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#03a63c',
  },
  activeBtn: {
    width: '40%',
    height: 40,
    flexDirection: 'row',
    marginTop: '1%',
    marginBottom: '1%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D0D0D',
  },
  bottomBtnsTxt: {
    fontSize: 17,
    lineHeight: 20,
    marginLeft: '5%',
    alignSelf: 'center',
    color: '#fff',
  },
});
