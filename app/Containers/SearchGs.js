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
    Image
} from 'react-native';
import Dimensions from 'Dimensions';
var iWidth = Dimensions.get('window').width;
import {Images} from '../Themes';
import recommendGsData from '../Data/recommendGsData.json';
import GsDetail from './GsDetail';
import SearchGsByKeyWord from './SearchGsByKeyWord';

class SearchGs extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            defaultIndex: 0,
            dataSource: ds.cloneWithRows(recommendGsData),
        };
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


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{this.onBackAndroid()}}>
                        <Image
                            source={Images.returnArrow}
                            style={styles.backStyle}
                        />
                    </TouchableOpacity>
                    <Text style={styles.titleBar}>约高手</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._searchItem()}}>
                    <Image
                        source={Images.searchIcon}
                        style={styles.searchStyle}
                    />
                    </TouchableOpacity>
                </View>
                <View style={styles.searchView}>
                    <View style={styles.searchBar}>
                        <Text style={styles.searchText}>筛选学校</Text>
                        <Image
                            source={Images.arrowDownIcon}
                            style={styles.arrowStyle}
                        />
                    </View>
                    <View style={styles.searchBar}>
                        <Text style={styles.searchText}>筛选专业</Text>
                        <Image
                            source={Images.arrowDownIcon}
                            style={styles.arrowStyle}
                        />
                    </View>
                </View>
                <ListView style={styles.listStyle}
                          dataSource={this.state.dataSource}
                          renderRow={this.renderData}
                />
            </View>
        );
    }

    renderData(data) {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._pressItem(data)}}>
                <View style={styles.listItemStyle}>
                    <View style={styles.listItemUpStyle}>
                        <Image
                            source={{uri: data.avatar}}
                            style={styles.avatarStyle}
                        />
                        <View style={styles.rightContainer}>
                            <View style={styles.rightFirstLine}>
                                <Text style={styles.school}>{data.masterS}</Text>
                                <Text style={styles.subject}>{data.masterSubject}</Text>
                            </View>
                            <View style={styles.rightSecondLine}>
                                <Text style={styles.name}>{data.nickName}</Text>
                            </View>
                            <View style={styles.rightSecondLine}>
                                <Text style={styles.des} numberOfLines={2}>{data.description}</Text>
                            </View>

                        </View>
                    </View>
                    <View style={styles.centerLine}/>
                    <View style={styles.downViewStyle}>
                        <Text style={styles.downTextStyle}>擅长：{data.adept}</Text>
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
                name: 'GsDetail',
                component: GsDetail,
                params: {
                    data: data,
                }

            })
        }
    };
    _searchItem() {
        const {
            navigator
        } = this.props;
        if (navigator) {
            navigator.push({
                name: 'SearchGsByKeyWord',
                component: SearchGsByKeyWord,
            })
        }
    };

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
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    titleView: {
        width: iWidth,
        height: 44,
        backgroundColor: '#41D9CC',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backStyle: {
        width: 25,
        height: 25,
        marginLeft: 10,
    },
    arrowStyle: {
        width: 6,
        height: 6,
        marginLeft: 5,
    },
    searchStyle: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    titleBar: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        textAlignVertical: 'center'
    },
    searchView: {
        width: iWidth,
        height: 44,
        backgroundColor: '#F5FCFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchText: {
        color: '#333333',
        textAlign: 'center',
        fontSize: 14,
        textAlignVertical: 'center'
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listStyle: {
        backgroundColor: '#F7F7F7',
    },
    listItemStyle: {
        backgroundColor: 'white',
        width: iWidth,
        height: 130,
    },
    listItemUpStyle: {
        backgroundColor: 'white',
        width: iWidth,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    des: {
        fontSize: 12,
        color: '#808080',
        textAlignVertical: 'center',
        marginLeft: 10,
        marginRight: 10,
        flexWrap:'wrap',
    },
    name: {
        fontSize: 14,
        color: '#808080',
        textAlignVertical: 'center',
        marginLeft: 10,
    },
    school: {
        fontSize: 16,
        color: '#333333',
        textAlignVertical: 'center',
        marginLeft: 10,
    },
    subject: {
        fontSize: 16,
        color: '#333333',
        textAlignVertical: 'center',
        marginLeft: 20,
    },
    avatarStyle: {
        width: 50,
        height: 50,
        marginTop:-10,
        marginLeft: 10,
        borderRadius: 25,
    },
    centerLine: {
        width: iWidth,
        height: 1,
        backgroundColor: '#D9D9D9',
        marginLeft: 10,
    },
    dividerLine: {
        width: iWidth,
        height: 1,
        backgroundColor: '#D9D9D9',
    },
    rightFirstLine: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightSecondLine: {
        justifyContent: 'center',
        marginTop:5,
    },
    numView: {
        flex: 1,
        height: 36,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',

    },
    downViewStyle: {
        backgroundColor: 'white',
        width: iWidth,
        height: 28,
        justifyContent: 'center',
    },
    downTextStyle: {
        fontSize: 12,
        color: '#999999',
        textAlignVertical: 'center',
        marginLeft: 10,
    },
});


export default SearchGs;