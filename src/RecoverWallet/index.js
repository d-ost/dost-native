import React , {Component} from 'react';
import WalletInputs from "../CommonComponents/WalletInputs"

class RecoverWallet extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
          title: "Recover Wallet",
          headerBackTitle: null
        };
      };

    constructor(props){
        super(props)
    }

    render (){
        return <WalletInputs searchUser={true}/>
    }

}

export default RecoverWallet ; 