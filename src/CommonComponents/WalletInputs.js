import React , {Component} from 'react';
import { View , Text , TextInput } from 'react-native';

import TouchableButton from '../theme/components/TouchableButton';

import Theme from '../theme/styles';
import { withNavigation } from 'react-navigation';

class WalletInputs extends Component {

    constructor(props){
        super(props); 

        this.state = {
            username : null, 
            pin: null, 
            publicAddress: null,

            usernameError: false , 
            pinError: false, 
            publicAddressError: false     
        }
    }

    onUserNameChange = (val) => {
        this.state.username = val ; 
    }

    onPin = (val) => {
        this.state.pin = val ; 
    }

    onPublicAddress = (val) => {
        this.state.publicAddress = val ; 
    }

    isValid = () => {
        let usernameError =  false , pinError =  false , publicAddressError = false ; 
        if(!this.state.username){
            usernameError = true ;
        }

        if(!this.state.pin || String(this.state.pin).length < 6){
            pinError = true ;
        }

        if(!this.state.publicAddress){
            publicAddressError =  true ;
        }

        this.setState({ usernameError , pinError , publicAddressError});
        return !usernameError && !pinError &&  !publicAddressError;
    } 

    onWalletCreate = () => {
       if(  !this.isValid() )  return ;
       //TODO 
    }

    onCancle = () => {
        this.props.navigation.goBack();
    }

    render (){
        return (
            <View style={{flex:1 , marginTop: 20,  paddingHorizontal:50}}>

                <TextInput placeholder={"Username"} 
                    textContentType="none"
                    returnKeyType="done"
                    returnKeyLabel="Done"
                    placeholderTextColor="#ababab"
                    onChangeText={this.onUserNameChange} 
                    style={[Theme.TextInput.textInputStyle, this.state.usernameError ?  Theme.Errors.errorBorder : null]}  />
                {this.state.usernameError && ( <Text style={Theme.Errors.errorText}>Please enter a valid username</Text> )}

                <TextInput  placeholder={"Pin"} 
                            onChangeText={this.onPin} 
                            returnKeyType="done"
                            returnKeyLabel="Done"
                            keyboardType="numeric"
                            placeholderTextColor="#ababab"
                            style={[Theme.TextInput.textInputStyle , this.state.pinError ? Theme.Errors.errorBorder : null]}  />
                {this.state.pinError && ( <Text style={Theme.Errors.errorText}>Please enter a valid Pin</Text> )}

                <TextInput  placeholder={"Public Address"} 
                            onChangeText={this.onPublicAddress} 
                            placeholderTextColor="#ababab"
                            returnKeyType="done"
                            returnKeyLabel="Done"
                            style={[Theme.TextInput.textInputStyle, this.state.publicAddressError ? Theme.Errors.errorBorder : null]}  />
                {this.state.publicAddressError && ( <Text style={Theme.Errors.errorText}>Please enter a valid public address</Text> )}

                <TouchableButton
                    TouchableStyles={[Theme.Button.btnPink ,  {marginTop: 20}]}
                    TextStyles={[Theme.Button.btnPinkText]}
                    text="Confrim"
                    onPress={this.onWalletCreate}
                />

                <TouchableButton
                    TouchableStyles={[Theme.Button.btnPinkSecondary, {marginTop: 20}]}
                    TextStyles={[Theme.Button.btnPinkSecondaryText]}
                    text="Cancel"
                    onPress={this.onCancle}
                />  

            </View>
        )
    }

}

export default withNavigation( WalletInputs ); 