import React , {Component} from 'react';
import { View , Text , TextInput } from 'react-native';

import TouchableButton from '../theme/components/TouchableButton';

import Theme from '../theme/styles';

class CreateWallet extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
          header: null,
          headerBackTitle: null
        };
      };

    constructor(props){
        super(props)
    }

    onUserNameChange = ( val ) => {

    }

    onPin = ( val ) => {

    }

    onPublicAddress = ( val ) => {

    }

    onWalletCreate = () => {

    }

    onCancle = () => {
        this.props.navigation.navigate("Landing");
    }

    render (){
        return (
            <View style={{flex:1 , paddingHorizontal:50}}>

                <Text style={{marginTop: 50, textAlign: "center" , fontSize: 30}}>CreateWallet</Text>

                <TextInput placeholder={"Username"} onChangeText={this.onUserNameChange} 
                    style={[Theme.TextInput.textInputStyle]}  />

                <TextInput placeholder={"Pin"} onChangeText={this.onPin} 
                    style={[Theme.TextInput.textInputStyle]}  />

                <TextInput placeholder={"Public Address"} onChangeText={this.onPublicAddress} 
                    style={[Theme.TextInput.textInputStyle]}  />


                <TouchableButton
                    TouchableStyles={[Theme.Button.btnPink ,  {marginTop: 20}]}
                    TextStyles={[Theme.Button.btnPinkText]}
                    text="Confrim"
                    onPress={this.onWalletCreate}
                />

                <TouchableButton
                    TouchableStyles={[Theme.Button.btnSecondary, {marginTop: 20}]}
                    TextStyles={[Theme.Button.btnSecondaryText]}
                    text="Cancle"
                    onPress={this.onCancle}
                />  

            </View>
        )
    }

}

export default CreateWallet ; 