import React , {Component} from 'react';
import WalletInputs from "../CommonComponents/WalletInputs";
 
class CreateWallet extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
          title: "Create Wallet Recovery",
          headerBackTitle: null
        };
      };

    constructor(props){
        super(props); 
    }

   
    render (){
        return <WalletInputs/>
    }

}

export default CreateWallet ; 