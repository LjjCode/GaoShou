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
    Platform,
    BackAndroid,
    ListView,
    Image,
    InteractionManager
} from 'react-native';
import Dimensions from 'Dimensions';
var iWidth = Dimensions.get('window').width;
import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import BookDetail from './BookDetail';
import SearchBookByKeyWord from './SearchBookByKeyWord';
import PoliticsBookData from '../Data/PoliticsBookData.json';
import EnglishBookData from '../Data/EnglishBookData.json';
import MathBookData from '../Data/MathBookData.json';
import ProfessionBookData from '../Data/ProfessionBookData.json';
import ZhBookData from '../Data/ZhBookData.json';
import {Images} from '../Themes';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true,
            index: 0,
            routes: [
                {key: '1', title: '英语'},
                {key: '2', title: '数学'},
                {key: '3', title: '政治'},
                {key: '4', title: '专业课'},
                {key: '5', title: '综合'},
            ],
        };
        this._pressItem = this._pressItem.bind(this);
        this.renderData = this.renderData.bind(this);
    }

    _pressButton() {
        const {
            navigator
        } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _handleChangeTab = (index) => {
        this.setState({index});
    };

    _renderHeader = (props) => {
        return (
            <View>
                <View style={styles.titleView}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{this.onBackAndroid()}}>
                        <Image
                            source={Images.returnArrow}
                            style={styles.backStyle}
                        />
                    </TouchableOpacity>
                    <Text style={styles.titleBar}>背考点</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._searchItem()}}>
                        <Image
                            source={Images.searchIcon}
                            style={styles.searchStyle}
                        />
                    </TouchableOpacity>
                </View>
                <TabBar
                    {...props}
                    style={styles.tabbarStyle}
                    scrollEnabled={true}
                    tabStyle={styles.tabStyle}
                    indicatorStyle={styles.indicatorStyle}
                    onTabPress={this._tabPress}
                    renderLabel={this._renderLabel}
                    pressOpacity={1}
                />
            </View>

        );
    };

    _searchItem() {
        const {
            navigator
        } = this.props;
        if (navigator) {
            navigator.push({
                name: 'SearchBookByKeyWord',
                component: SearchBookByKeyWord,
            })
        }
    };

    _tabPress() {

    }

    _renderLabel = (scene) => {
        const label = this.state.routes[scene.index].title;
        if (this.state.index == scene.index) {
            return <Text style={styles.labelPressStyle}>{label}</Text>;
        } else {
            return <Text style={styles.labelStyle}>{label}</Text>;
        }
    };
    _renderScene = ({route}) => {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        switch (route.key) {
            case '1':
                return (
                    <View style={styles.page}>
                        <ListView style={styles.listStyle}
                                  dataSource={ds.cloneWithRows(EnglishBookData)}
                                  renderRow={this.renderData}
                        />
                    </View>
                );
            case '2':
                return (
                    <View style={styles.page}>
                        <ListView style={styles.listStyle}
                                  dataSource={ds.cloneWithRows(MathBookData)}
                                  renderRow={this.renderData}
                        />
                    </View>
                );
            case '3':
                return (
                    <View style={styles.page}>
                        <ListView style={styles.listStyle}
                                  dataSource={ds.cloneWithRows(PoliticsBookData)}
                                  renderRow={this.renderData}
                        />
                    </View>
                );
            case '4':
                return (
                    <View style={styles.page}>
                        <ListView style={styles.listStyle}
                                  dataSource={ds.cloneWithRows(ProfessionBookData)}
                                  renderRow={this.renderData}
                        />
                    </View>
                );
            case '5':
                return (
                    <View style={styles.page}>
                        <ListView style={styles.listStyle}
                                  dataSource={ds.cloneWithRows(ZhBookData)}
                                  renderRow={this.renderData}
                        />
                    </View>
                );
        }



    };

    renderData(data) {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._pressItem(data)}}>
                <View style={styles.listItemStyle}>
                    <View style={styles.listItemUpStyle}>
                        <Image
                            source={{uri:data.imgUrl}}
                            style={styles.avatarStyle}
                        />
                        <Text style={styles.bookName} numberOfLines={1}>《{data.bookName}》</Text>
                    </View>
                    <View style={styles.dividerLine}/>
                </View>
            </TouchableOpacity>
        );
    }

    _pressItem(data) {
        const {
            navigator
        } = this.props;
        if (navigator) {
            navigator.push({
                name: 'BookDetail',
                component: BookDetail,
                params: {
                    data: data,
                }

            })
        }
    };


    render() {
        return (
            <TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onRequestChangeTab={this._handleChangeTab}
            />
        );
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }

    _renderPlaceholderView() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.loadingStyle}>Loading...</Text>
            </View>
        );
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
    container: {
        flex: 1,
        backgroundColor:'#f7f7f7'
    },
    titleView: {
        width: iWidth,
        height: 44,
        backgroundColor: '#41D9CC',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleBar: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        textAlignVertical: 'center'
    },
    backStyle: {
        width: 25,
        height: 25,
        marginLeft: 10,
    },
    searchStyle: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    page: {
        flex: 1,
        backgroundColor:'#F7F7F7',
    },
    tabbarStyle: {
        backgroundColor: 'white',
        height: 44,
        alignItems: 'center',

    },
    tabStyle: {
        width: iWidth / 5,
        paddingHorizontal: 5,
        alignItems: 'center',
        opacity: 1,
    },
    indicatorStyle: {
        backgroundColor: '#41D9CC',
        paddingHorizontal: 5,
    },
    labelStyle: {
        color: '#808080',
        fontSize: 14,
        paddingHorizontal: 5,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    labelPressStyle: {
        color: '#41D9CC',
        fontSize: 14,
        paddingHorizontal: 5,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    listItemStyle: {
        backgroundColor: 'white',

        height: 71,
    },
    listItemUpStyle: {
        backgroundColor: 'white',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dividerLine: {
        width: iWidth,
        height: 1,
        backgroundColor: '#D9D9D9',
        marginLeft:10,
    },
    avatarStyle: {
        width: 50,
        height: 50,
        marginLeft: 10,
    },
    bookName:{
        fontSize:14,
        color:'#333333',
        marginLeft:10,
        textAlignVertical:'center',
        flex:1
    },
    loadingStyle:{
        fontSize:17,
        color:'#b2b2b2',
        width:iWidth,
        textAlignVertical:'center',
        textAlign:'center',
    }
});


export default Book;