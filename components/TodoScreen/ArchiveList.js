import React from 'react';
import { View, FlatList } from 'react-native';

import TodoItem from './TodoItem';

export default function ArchiveList({ archiveList, remove, complete }) {
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={archiveList}
        renderItem={({ item }) => (
          <TodoItem
            title={item.title}
            status={item.status}
            id={item.id}
            remove={() => removeActions(item.id)}
            complete={() => completeAction(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
