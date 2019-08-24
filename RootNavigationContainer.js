import React from 'react';
import { View , Text  } from 'react-native';

import { Root } from 'native-base';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

import Loading from "./src/Loading";
import Landing from "./src/Landing"; 
import CreateWallet from "./src/CreateWallet"; 
import RecoverWallet from "./src/RecoverWallet";
import Userlist from "./src/Userlist";

import Colors from './src/theme/styles/Colors';

const WalletStack = createStackNavigator(
  {
    Landing: Landing,
    CreateWallet: CreateWallet,
    RecoverWallet: RecoverWallet,
    Userlist: Userlist
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
      Loading, 
      WalletStack
    },
    {
      initialRouteName: 'Loading'
    }
  )
);

const RootNavigationContainer = () => (
  <Root>
    <AppContainer/>
  </Root>
);

export default RootNavigationContainer;
