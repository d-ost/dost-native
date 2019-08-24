import React , {Component} from 'react';
import { View , Text , TextInput } from 'react-native';

import TouchableButton from '../theme/components/TouchableButton';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import Theme from '../theme/styles';
import { withNavigation } from 'react-navigation';

class WalletInputs extends Component {

    constructor(props){
        super(props); 

        this.state = {
            username : null, 
            pin: '', 
            publicAddress: null,

            usernameError: false , 
            pinError: false, 
            publicAddressError: false     
        }
    }

    onUserNameFocus = () => {
        if(this.props.searchUser){
            this.props.navigation.push("Userlist" ,  { onUsername : this.onUserNameChange }); 
        }
    }

    onUserNameChange = (val) => {
        this.setState({username: val});
    }

    onPin = (val) => {
       this.setState({pin: val});
    }

    onPublicAddress = (val) => {
        this.setState({publicAddress: val});
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
            <View style={{flex:1 , marginTop: 20,  paddingHorizontal:30}}>

                <TextInput placeholder={"Username"} 
                    onFocus={this.onUserNameFocus}
                    textContentType="none"
                    returnKeyType="done"
                    returnKeyLabel="Done"
                    placeholderTextColor="#ababab"
                    onChangeText={this.onUserNameChange} 
                    style={[Theme.TextInput.textInputStyle, this.state.usernameError ?  Theme.Errors.errorBorder : null]}  />
                {this.state.usernameError && ( <Text style={Theme.Errors.errorText}>Please enter a valid username</Text> )}

                <TextInput  placeholder={"Safe Wallet Address"} 
                            onChangeText={this.onPublicAddress} 
                            placeholderTextColor="#ababab"
                            returnKeyType="done"
                            returnKeyLabel="Done"
                            style={[Theme.TextInput.textInputStyle,
                                     this.state.publicAddressError ? Theme.Errors.errorBorder : null]}  />
                {this.state.publicAddressError && ( <Text style={Theme.Errors.errorText}>Please enter a valid public address</Text> )}

                <Text style={{marginTop:10}}></Text> 
                <SmoothPinCodeInput
                    codeLength={6}
                    cellSize={50}
                    cellStyleFocused={{  borderColor: '#A9A9A9' }}
                    mask="*"
                    password
                    value={this.state.pin}
                    onTextChange={this.onPin}
                />
                {this.state.pinError && ( <Text style={Theme.Errors.errorText}>Please enter a valid Pin</Text> )}

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