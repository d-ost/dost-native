import React, { PureComponent } from 'react';
import {View, Text, TouchableOpacity , TextInput , FlatList} from 'react-native';

import Theme from '../theme/styles';

class Userlist extends PureComponent {

    static navigationOptions = ({ navigation }) => {
        return {
          title: "Friends"
        };
      };

    constructor(props){
        super(props);
        this.state ={
          data: []
        };
    }

    fetchUsers = ( keyword ) => {
      clearTimeout( this.reqTimer ) ;
      this.reqTimer = setTimeout( () => {
        if( keyword ){
            this.setState({data : [{displayText: "Ashutosh"} , {displayText: "Deepesh"} ,{displayText: "Ben"}]});
        }else{
            this.setState({data : []})
        }
      } ,  300)
    }
    
    onChangeText = (val) => { 
     this.fetchUsers( val );
     this.props.onUsername && this.props.onUsername(val);
    }

    _keyExtractor = (item, index) => `id_${item.id}` ;

    _renderItem = ({ item }) => {
      return (
        <TouchableOpacity style={{padding: 10}}
         onPress={() => this.onSuggestionTap(item)}>
          <Text>{`#${item.displayText}`}</Text>
        </TouchableOpacity>
      )
    }
  
    onSuggestionTap( item ) {
     
    }


    render() {
      return (
        <View style={{paddingHorizontal:20 , paddingTop: 10}}>
         
         <TextInput placeholder={"Username"} 
                    textContentType="none"
                    returnKeyType="done"
                    returnKeyLabel="Done"
                    placeholderTextColor="#ababab"
                    onChangeText={this.onChangeText} 
                    style={[Theme.TextInput.textInputStyle, this.state.usernameError ?  Theme.Errors.errorBorder : null]}  />
                {this.state.usernameError && ( <Text style={Theme.Errors.errorText}>Please enter a valid username</Text> )}

          <FlatList
            style={{marginTop: 10}}
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />

        </View>
      )
    }
  }


  export default Userlist;
