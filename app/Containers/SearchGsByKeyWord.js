'use strict';

import React, {
    Component
} from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Navigator,
    Text,
    TextInput,
    Image,
    Platform,
    BackAndroid
} from 'react-native';
import Dimensions from 'Dimensions';
var iWidth = Dimensions.get('window').width;
import {Images} from '../Themes';

class SearchGsByKeyWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:''
        };
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
                <View style={styles.titleBar}>
                    <View style={styles.inputViewStyle}>
                        <Image
                            source={Images.searchQingIcon}
                            style={styles.searchStyle}
                        />
                        <TextInput style={styles.inputStyle}
                                   onChangeText={(text) => this.setState({text})}
                                   value={this.state.text}
                                   autoFocus={true}
                                   keyboardType={'default'}
                                   placeholder={"搜索高手专业、擅长科目"}
                                   placeholderTextColor={"#A6A6A6"}
                                   underlineColorAndroid={'transparent'}
                        />
                    </View>
                    <Text style={styles.cancelStyle} onPress={()=>{this.onBackAndroid()}}>取消</Text>
                </View>
            </View>
        );
    }

    componentDidMount() {

    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        const {navigator} = this.props;
        const routers = navigator.getCurrentRoutes();
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为
        }
        return false;//默认行为

    };
}

const styles = StyleSheet.create({
    titleBar: {
        width: iWidth,
        height: 44,
        backgroundColor: '#41D9CC',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    cancelStyle: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        width: 44,
        height: 44,
        textAlignVertical: 'center'
    },
    inputViewStyle:{
        flex:1,
        height:32,
        backgroundColor:'#ffffff',
        marginLeft:10,
        borderRadius: 16,
        flexDirection:'row',
        alignItems:'center'
    },
    inputStyle:{
        flex:1,
        height:32,
        marginRight:10,

        padding:0,
        color:'#333333'
    },
    searchStyle: {
        width: 20,
        height: 20,
        marginLeft:10,
        marginRight:10,
    },
});


export default SearchGsByKeyWord;