import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import TodoScreen from '../TodoScreen';
import ArchiveScreen from '../TodoScreen/ArchiveList';

const screens = {
  TodoScreen: {
    screen: TodoScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Archive: {
    screen: ArchiveScreen,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
