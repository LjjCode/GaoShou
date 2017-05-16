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
    Image,
    ListView,
    InteractionManager
} from 'react-native';
import Dimensions from 'Dimensions';
var iWidth = Dimensions.get('window').width;
import SearchInfoByKeyWord from './SearchInfoByKeyWord';
import {Images} from '../Themes';
import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import InfoData from '../Data/InfoData.json';
import InfoDetail from './InfoDetail';

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true,
            index: 0,
            routes: [
                {key: '1', title: '政策新闻'},
                {key: '2', title: '招生简章'},
                {key: '3', title: '专业目录'},
                {key: '4', title: '报录信息'},
                {key: '5', title: '学习资料'},
                {key: '6', title: '备考指导'},
                {key: '7', title: '复试调剂'},
                {key: '8', title: '其他资讯'},
            ],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }).cloneWithRows(InfoData),
        };
        this._pressItem = this._pressItem.bind(this);
        this.renderData = this.renderData.bind(this);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
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
                    <Text style={styles.titleBar}>看资讯</Text>
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
        switch (route.key) {
            case '1':
                return (
                    <View style={styles.page}>
                        <View style={styles.headerStyle}>
                            <Text style={styles.headerPressButton}>全部</Text>
                            <Text style={styles.headerButton}>教育厅</Text>
                            <Text style={styles.headerButton}>目标院校</Text>
                            <Text style={styles.headerButton}>社会群体</Text>
                        </View>
                        <ListView style={styles.listStyle}
                                  dataSource={this.state.dataSource}
                                  renderRow={this.renderData}
                        />
                    </View>
                );
            case '2':
                return (
                    <View style={styles.page}>
                        <View style={styles.headerStyle}>
                            <Text style={styles.headerPressButton}>全部</Text>
                            <Text style={styles.headerButton}>目标院校</Text>
                        </View>
                        <ListView style={styles.listStyle}
                                  dataSource={this.state.dataSource}
                                  renderRow={this.renderData}
                        />
                    </View>
                );
            case '3':
                return (
                    <View style={styles.page}>
                        <View style={styles.headerStyle}>
                            <Text style={styles.headerPressButton}>全部</Text>
                            <Text style={styles.headerButton}>目标院校</Text>
                        </View>
                        <ListView style={styles.listStyle}
                                  dataSource={this.state.dataSource}
                                  renderRow={this.renderData}
                        />
                    </View>
                );
            case '4':
                return (
                    <View style={styles.page}>
                        <View style={styles.headerStyle}>
                            <Text style={styles.headerPressButton}>全部</Text>
                            <Text style={styles.headerButton}>目标院校</Text>
                        </View>
                        <ListView style={styles.listStyle}
                                  dataSource={this.state.dataSource}
                                  renderRow={this.renderData}
                        />
                    </View>
                );
            case '5':
                return (
                    <View style={styles.page}>
                        <View style={styles.headerStyle}>
                            <Text style={styles.headerPressButton}>全部</Text>
                            <Text style={styles.headerButton}>综合</Text>
                            <Text style={styles.headerButton}>目标院校</Text>
                        </View>
                        <ListView style={styles.listStyle}
                                  dataSource={this.state.dataSource}
                                  renderRow={this.renderData}
                        />
                    </View>
                );
            case '6':
                return (
                    <View style={styles.page}>
                        <View style={styles.headerStyle}>
                            <Text style={styles.headerPressButton}>全部</Text>
                            <Text style={styles.headerButton}>综合</Text>
                            <Text style={styles.headerButton}>政治</Text>
                            <Text style={styles.headerButton}>外语</Text>
                            <Text style={styles.headerButton}>数学</Text>
                            <Text style={styles.headerButton}>专业课</Text>
                        </View>
                        <ListView style={styles.listStyle}
                                  dataSource={this.state.dataSource}
                                  renderRow={this.renderData}
                        />
                    </View>
                );
            case '7':
                return (
                    <View style={styles.page}>
                        <View style={styles.headerStyle}>
                            <Text style={styles.headerPressButton}>全部</Text>
                            <Text style={styles.headerButton}>综合</Text>
                            <Text style={styles.headerButton}>目标院校</Text>
                        </View>
                        <ListView style={styles.listStyle}
                                  dataSource={this.state.dataSource}
                                  renderRow={this.renderData}
                        />
                    </View>
                );
            case '8':
                return (
                    <View style={styles.page}>
                        <ListView style={styles.listStyle}
                                  dataSource={this.state.dataSource}
                                  renderRow={this.renderData}
                        />
                    </View>
                );
            default:
                return null;
        }
    };

    _pressItem(data) {
        const {
            navigator
        } = this.props;
        if (navigator) {
            navigator.push({
                name: 'InfoDetail',
                component: InfoDetail,
                params: {
                    data: data,
                }

            })
        }
    };

    renderData(data) {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._pressItem(data)}}>
                <View style={styles.listItemStyle}>
                    <Text numberOfLines={2} style={styles.titleStyle}>{data.title}</Text>
                    <Text style={styles.dateStyle}>{data.addTime}</Text>
                </View>
            </TouchableOpacity>
        );
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
            <TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onRequestChangeTab={this._handleChangeTab}
            />
        );
    }

    _renderPlaceholderView() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.loadingStyle}>Loading...</Text>
            </View>
        );
    }


    _searchItem() {
        const {
            navigator
        } = this.props;
        if (navigator) {
            navigator.push({
                name: 'SearchInfoByKeyWord',
                component: SearchInfoByKeyWord,
            })
        }
    };

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
    titleBar: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        textAlignVertical: 'center'
    },
    titleView: {
        width: iWidth,
        height: 44,
        backgroundColor: '#41D9CC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
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
    },
    tabbarStyle: {
        backgroundColor: 'white',
        height: 44,
        alignItems: 'center',

    },
    tabStyle: {
        width: 80,
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
    headerStyle:{
        width:iWidth,
        height:44,
        backgroundColor:'#f7f7f7',
        flexDirection:'row',
        alignItems:'center'
    },
    headerPressButton:{
        height:30,
        borderColor:'#41D9CC',
        borderWidth:1,
        borderRadius:15,
        textAlignVertical:'center',
        textAlign:'center',
        fontSize:14,
        color:'#41D9CC',
        flex:1,
        marginHorizontal:5,
    },
    headerButton:{
        height:30,
        textAlignVertical:'center',
        textAlign:'center',
        fontSize:14,
        color:'#808080',
        flex:1,
        marginHorizontal:5,
    },
    listItemStyle: {
        backgroundColor: 'white',
        justifyContent:'center',
        padding:10,
    },
    titleStyle:{
        fontSize:16,
        color:'black',
        textAlignVertical:'center',
    },
    dateStyle:{
        fontSize:10,
        color:'#b2b2b2',
        textAlignVertical:'center',
        marginTop:5
    },
    loadingStyle:{
        fontSize:17,
        color:'#b2b2b2',
        width:iWidth,
        textAlignVertical:'center',
        textAlign:'center',
    }
});


export default Info;