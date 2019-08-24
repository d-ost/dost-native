import React , {Component} from 'react';
import { View , Text  } from 'react-native';

import TouchableButton from '../theme/components/TouchableButton';

import Theme from '../theme/styles';

class Landing extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
          header: null,
          headerBackTitle: null
        };
      };

    constructor(props){
        super(props); 
    }

    onWalletCreate = () => {
        this.props.navigation.push('CreateWallet');
    }

    onWalletRecovery = () => {
        this.props.navigation.push('RecoverWallet');
    }
 
    render (){
        return (
            <View style={{flex:1}}>
                <Text style={{marginTop: 100, textAlign: "center" , fontSize: 30}}>Wellcome to Dost</Text>
                <View style={{marginTop: 50,  paddingHorizontal: 50 , flex:0.98}} >
                    <TouchableButton
                        TouchableStyles={[Theme.Button.btnPink]}
                        TextStyles={[Theme.Button.btnPinkText]}
                        text="Create Wallet"
                        onPress={this.onWalletCreate}
                    />
                    <TouchableButton
                        TouchableStyles={[Theme.Button.btnPinkSecondary, {marginTop: 30}]}
                        TextStyles={[Theme.Button.btnPinkSecondaryText]}
                        text="Recover Wallet"
                        onPress={this.onWalletRecovery}
                    />
                </View>  
                <Text style={{textAlign: "center" , fontSize: 10, color: Theme.Colors.greyLite}}>
                    App is under development, please use at your own risk.</Text>
            </View>
        )
    }

}

export default Landing ; 
