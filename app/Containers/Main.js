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
    Image
} from 'react-native';
import Home from './Home';
import Message from './Message';
import Mine from './Mine';
import {Images} from '../Themes';
import TabNavigator from 'react-native-tab-navigator';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
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

    renderItem(title, iconSrc, selectedIconSrc, selecteTab, childView,badgeText) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selecteTab}
                title={title}
                renderIcon={() => <Image source={iconSrc} style={styles.iconStyle}/>}
                renderSelectedIcon={() => <Image source={selectedIconSrc} style={styles.iconStyle}/>}
                onPress={() => this.setState({selectedTab: selecteTab})}
                selectedTitleStyle={styles.selectedTitleStyle}
                badgeText={badgeText}
                >
                {childView}
            </TabNavigator.Item>
        );
    }

    render() {
        return (
            <TabNavigator>
                {this.renderItem("首页", Images.homeTab, Images.homeTabed, 'home', <Home {...this.props}/>)}
                {this.renderItem("消息", Images.messageTab, Images.messageTabed, 'message',<Message {...this.props}/>,'3')}
                {this.renderItem("我的", Images.mineTab, Images.mineTabed, 'mine',<Mine {...this.props}/>)}
            </TabNavigator>
        );
    }


    componentDidMount() {

    }
}

const styles = StyleSheet.create({
    iconStyle: {
        width: 20,
        height: 20,
    },
    selectedTitleStyle: {
        color: '#41D9CC',
    }

});


export default Main;