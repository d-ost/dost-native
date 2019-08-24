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
        this.props.navigation.navigate('CreateWallet');
    }

    onWalletRecovery = () => {
        this.props.navigation.navigate('RecoverWallet');
    }
 
    render (){
        return (
            <View style={{flex:1}}>
                <Text style={{marginTop: 50, textAlign: "center" , fontSize: 30}}>Wellcome to Dost</Text>
                <View  style={{marginTop: 50,  paddingHorizontal: 50}} >
                    <TouchableButton
                        TouchableStyles={[Theme.Button.btnPink]}
                        TextStyles={[Theme.Button.btnPinkText]}
                        text="Create Wallet"
                        onPress={this.onWalletCreate}
                    />
                    <TouchableButton
                        TouchableStyles={[Theme.Button.btnPink, {marginTop: 50}]}
                        TextStyles={[Theme.Button.btnPinkText]}
                        text="Recover Wallet"
                        onPress={this.onWalletRecovery}
                    />
                </View>  
            </View>
        )
    }

}

export default Landing ; 
