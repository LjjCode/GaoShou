/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ViewPagerAndroid,
    Image,
    Button,
    Alert,
    TouchableOpacity,
    Navitagor,
    AsyncStorage
} from 'react-native';

import Dimensions from 'Dimensions';
import Main from './Main';
import {Images} from '../Themes';


var iWidth = Dimensions.get('window').width;
var iHeight = Dimensions.get('window').height;

export default class Guide extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    _onEnterHome() {
        this.saveFirstData();
        const {
            navigator
        } = this.props;
        if (navigator) {
            navigator.push({
                name: 'Main',
                component: Main,
            })
        };
    };


    saveFirstData() {
        let isFirst = {
            isFirstEnter: false,
        };
        AsyncStorage.setItem('FirstLogin', JSON.stringify(isFirst))
            .then()
            .catch()
            .done();
    }


    render() {

        return (
            <ViewPagerAndroid
                style={styles.viewPager}
                initialPage={0}>
                <View style={styles.pageStyle}>
                    <Image
                        style={styles.imageStyle}
                        source={Images.indexOne}
                    />

                </View>
                <View style={styles.pageStyle}>
                    <Image
                        style={styles.imageStyle}
                        source={Images.indexTwo}
                    />
                </View>
                <View style={styles.pageStyle}>
                    <Image
                        style={styles.imageStyle}
                        source={Images.indexThree}
                    />
                    <TouchableOpacity
                        style={styles.buttonViewStyle}
                        onPress={this._onEnterHome.bind(this)}
                    >
                        <Text style={styles.buttonStyle}>开始体验</Text>

                    </TouchableOpacity>
                </View>
            </ViewPagerAndroid>
        );
    }


}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },
    pageStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: iWidth,
        height: iHeight,
    },
    buttonStyle: {
        color: 'white',
        fontSize: 15,
        backgroundColor: '#41D9CC',
    },
    buttonViewStyle: {
        width: iWidth * 0.4,
        height: 36,
        marginLeft: iWidth * 0.3,
        borderRadius: 18,
        backgroundColor: '#41D9CC',
        position: 'absolute',
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
