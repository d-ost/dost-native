import React from 'react';
import { View , Text  } from 'react-native';

import { Root } from 'native-base';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

import Landing from "./src/Landing"; 
import CreateWallet from "./src/CreateWallet"; 
import RecoverWallet from "./src/RecoverWallet";

import Colors from './src/theme/styles/Colors';

const WalletStack = createStackNavigator(
  {
    CreateWallet: CreateWallet,
    RecoverWallet: RecoverWallet
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerTitleStyle: {
        color: Colors.dark,
        flex: 1,
        textAlign: 'center'
      },
      headerStyle: {
        backgroundColor: Colors.white
      },
      headerRight: <View />
    }
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Landing,
      WalletStack
    },
    {
      initialRouteName: 'Landing'
    }
  )
);

const RootNavigationContainer = () => (
  <Root>
    <AppContainer/>
  </Root>
);

export default RootNavigationContainer;
