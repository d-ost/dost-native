import React , {Component} from 'react';
import { ActivityIndicator  } from 'react-native';

class Loading extends Component {

    constructor(props){
        super(props);
        this.init(); 
    }

    init = () => {
        setTimeout( ()=>{
            this.props.navigation.navigate("Landing");
        } , 100 )
    }

    render() {
        return <ActivityIndicator/> 
    }
    
}

export default Loading;