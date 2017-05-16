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
    ScrollView,
    ListView,
    Image,
    RefreshControl,
} from 'react-native';
import Banner from 'react-native-banner';
import {Images} from '../Themes';
import recommendGsData from '../Data/recommendGsData.json';
import Dimensions from 'Dimensions';
var iWidth = Dimensions.get('window').width;
import SearchGs from './SearchGs';
import Info from './Info';
import Book from './Book';
import GsDetail from './GsDetail';

class Home extends Component {
    constructor(props) {
        super(props);
        this.banners = [
            {
                image: "https://gaoshou.wanxue.cn/console/static/upload/dataFileDown/2016-10/10934_1476093430422.png",
            },
            {
                image: "https://gaoshou.wanxue.cn/console/static/upload/dataFileDown/2016-10/80576_1477620608458.png",
            },
            {
                image: "https://gaoshou.wanxue.cn/console/static/upload/dataFileDown/2016-11/96741_1478516605290.png",
            },
        ]
        this.iosMarginTop = Platform.OS == 'ios' ? {marginTop: 20} : {};

        this.state = {
            clickTitle: 'You can try clicking beauty',
            defaultIndex: 0,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }).cloneWithRows(recommendGsData),
            isRefreshing: false,
        }
        this.defaultIndex = 0;
        this.renderData = this.renderData.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
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
            <View style={[styles.container, this.iosMarginTop]}>
                <Text style={styles.titleBar}>首页</Text>
                <ScrollView showsVerticalScrollIndicator={false}
                            refreshControl={ <RefreshControl refreshing={this.state.isRefreshing}
                                                               onRefresh={this._onRefresh}
                                                               tintColor="#ff0000"
                                                               title="Loading..."
                                                               titleColor="#00ff00"
                                                               colors={['#ff0000', '#00ff00', '#0000ff']}
                                                               progressBackgroundColor="#ffffff"
          />
        }
                >
                    {this.renderHeader()}
                    <ListView style={styles.listStyle}
                              dataSource={this.state.dataSource}
                              renderRow={this.renderData}

                    />
                </ScrollView>
            </View>
        );
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.setState({isRefreshing: false});
        }, 5000);
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
                                <Text style={styles.name}>{data.nickName}</Text>
                                <Text style={styles.role}>高手</Text>
                                <View style={styles.numView}>
                                    <Text style={styles.num}>{data.chatNum}人约过</Text>
                                </View>
                            </View>
                            <View style={styles.rightSecondLine}>
                                <Text style={styles.school}>{data.masterS}</Text>
                                <Text style={styles.subject}>{data.masterSubject}</Text>
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

    renderHeader() {
        return (
            <View style={styles.headerStyle}>
                <Banner
                    banners={this.banners}
                    defaultIndex={this.defaultIndex}
                    onMomentumScrollEnd={this.onMomentumScrollEnd.bind(this)}
                    intent={this.clickListener.bind(this)}
                    style={styles.bannerStyle}
                />
                <View style={styles.tabViewStyle}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._searchBtn()}}>
                        <View style={styles.itemOtherStyle}>
                            <Image
                                style={styles.imageStyle}
                                source={Images.homeSearch}
                            />
                            <Text style={styles.itemTextStyle}>约高手</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._infoBtn()}}>
                        <View style={styles.itemOtherStyle}>
                            <Image
                                style={styles.imageStyle}
                                source={Images.homeInfo}
                            />
                            <Text style={styles.itemTextStyle}>看资讯</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._bookBtn()}}>
                        <View style={styles.itemOtherStyle}>
                            <Image
                                style={styles.imageStyle}
                                source={Images.homeBook}
                            />
                            <Text style={styles.itemTextStyle}>背考点</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.dividerStyle}>
                    <Text style={styles.dividerTextStyle}>最受欢迎高手</Text>
                </View>
            </View>
        );
    }

    _searchBtn() {
        const {
            navigator
        } = this.props;
        if (navigator) {
            navigator.push({
                name: 'SearchGs',
                component: SearchGs,
            })
        }
    };

    _infoBtn() {
        const {
            navigator
        } = this.props;
        if (navigator) {
            navigator.push({
                name: 'Info',
                component: Info,
            })
        }
    };

    _bookBtn() {
        const {
            navigator
        } = this.props;
        if (navigator) {
            navigator.push({
                name: 'Book',
                component: Book,
            })
        }
    };

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

    clickListener(index) {
        this.setState({
            clickTitle: this.banners[index].title ? `you click ${this.banners[index].title}` : 'this banner has no title',
        })
    }

    onMomentumScrollEnd(event, state) {
        console.log(`--->onMomentumScrollEnd page index:${state.index}, total:${state.total}`);
        this.defaultIndex = state.index;
    }

    componentDidMount() {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    bannerStyle: {
        height: 135,
        width: iWidth,
    },
    titleBar: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        width: iWidth,
        height: 44,
        backgroundColor: '#41D9CC',
        textAlignVertical: 'center'
    },
    headerStyle: {
        backgroundColor: '#F7F7F7',
        height: 240,
    },
    listStyle: {
        backgroundColor: '#F7F7F7',
    },
    tabViewStyle: {
        height: 75,
        width: iWidth,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    itemStyle: {
        backgroundColor: 'white',
        width: iWidth,
        height: 44,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },
    itemOtherStyle: {
        backgroundColor: 'white',
        height: 75,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        width: 35,
        height: 35,
    },
    itemTextStyle: {
        fontSize: 12,
        color: '#808080',
        marginTop: 8,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    dividerStyle: {
        backgroundColor: 'transparent',
        width: iWidth,
        height: 30,
    },
    dividerTextStyle: {
        fontSize: 12,
        color: '#808080',
        marginTop: 8,
        marginLeft: 10,
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
    listItemStyle: {
        backgroundColor: 'white',
        width: iWidth,
        height: 110,
    },
    listItemUpStyle: {
        backgroundColor: 'white',
        width: iWidth,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    name: {
        fontSize: 17,
        color: '#333333',
        textAlignVertical: 'center',
        marginLeft: 10,
    },
    role: {
        fontSize: 12,
        backgroundColor: '#ffffff',
        color: '#41D9CC',
        borderColor: '#41D9CC',
        borderWidth: 1,
        borderRadius: 9,
        width: 36,
        height: 18,
        textAlignVertical: 'center',
        marginLeft: 5,
        textAlign: 'center',
    },
    num: {
        fontSize: 12,
        backgroundColor: '#ffffff',
        color: '#41D9CC',
        height: 18,
        textAlignVertical: 'center',
        marginRight: 10,
    },
    school: {
        fontSize: 14,
        color: '#808080',
        textAlignVertical: 'center',
        marginLeft: 10,
    },
    subject: {
        fontSize: 14,
        color: '#808080',
        textAlignVertical: 'center',
        marginLeft: 18,
    },
    avatarStyle: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        marginLeft: 10,
        borderRadius: 30,
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    numView: {
        flex: 1,
        height: 36,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',

    },
});


export default Home;