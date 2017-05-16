'use strict';

import React, {
    Component
} from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Navigator,
    Text
} from 'react-native';
import Dimensions from 'Dimensions';
var iWidth = Dimensions.get('window').width;

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _pressButton() {
        const {
            navigator
        } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }


    render() {
        return (
            <View>
                    <Text style={styles.titleBar}>消息</Text>
            </View>
        );
    }

    componentDidMount() {

    }
}

const styles = StyleSheet.create({
    titleBar:{
        color:'#ffffff',
        textAlign:'center',
        fontSize:20,
        width:iWidth,
        height:44,
        backgroundColor:'#41D9CC',
        textAlignVertical:'center'
    }
});


export default Message;