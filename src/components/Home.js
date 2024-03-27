import React, { useState } from 'react';
import { Image, RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import tw from 'tailwind-react-native-classnames';
import icomoonConfig from '../assets/fonts/icomoon/selection.json';
import { colors, fonts } from './base/theme';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const BottomBar = () => (
    <View style={{
        position: 'relative',
        marginBottom: 18,
        marginLeft: 18,
        marginRight: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }}>
        <TouchableOpacity
            onPress={() => { }}
            style={{
                backgroundColor: colors.black,
                borderRadius: 36,
                paddingVertical: 13,
                width: 138,
                borderWidth: 2.5,
                borderColor: colors.white,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Icon name="home-regular" size={20} color={colors.white} />
            <Text style={{
                fontFamily: 'Inter_Regular',
                color: colors.white,
                fontSize: 16,
                marginLeft: 6,
            }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                borderColor: colors.white,
                backgroundColor: colors.lightgrey,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2.5,
                borderRadius: 56,
                width: 56,
                height: 56
            }}
            onPress={() => { }}>
            <Icon
                name="clock-regular"
                size={20}
                color={colors.black}
            />
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                borderColor: colors.white,
                backgroundColor: colors.lightgrey,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2.5,
                borderRadius: 56,
                width: 56,
                height: 56
            }}
            onPress={() => { }}>
            <Icon
                name="user-regular"
                size={20}
                color={colors.black}
            />
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                borderColor: colors.white,
                backgroundColor: colors.lightgrey,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2.5,
                borderRadius: 56,
                width: 56,
                height: 56
            }}
            onPress={() => { }}>
            <Icon
                name="menu-regular"
                size={20}
                color={colors.black}
            />
        </TouchableOpacity>
    </View>
)

const CustomButton = ({ onPress, iconName, text, backgroundColor, textcolor }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            backgroundColor: backgroundColor,
            borderRadius: 36,
            paddingVertical: 13,
            width: 145,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2.5,
            borderColor: colors.white
        }}>
        <Icon name={iconName} size={20} color={textcolor} />
        <Text style={{
            fontFamily: 'Inter_Regular',
            color: textcolor,
            fontSize: 16,
            marginLeft: 6,
        }}>{text}</Text>
    </TouchableOpacity>
);

const Home = ({ navigation }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const onRefresh = () => { };

    return (
        <SafeAreaView style={[{ backgroundColor: colors.white }, tw`h-full`]}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh.bind(this)}
                        colors={[colors.primary]}
                        title="Pull to Refresh"
                        titleColor={colors.blue}
                    />
                }>
                <View style={[{
                    backgroundColor: colors.lightgrey,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                }, tw`p-6`]}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Profile')}
                            >
                                <Image
                                    style={{
                                        width: 48,
                                        height: 48,
                                        resizeMode: 'contain'
                                    }}
                                    source={require('../assets/images/ellipse1.png')}
                                />
                            </TouchableOpacity>
                            <Text style={{
                                color: colors.black,
                                fontFamily: fonts.Inter_Regular,
                                fontSize: 16,
                                marginLeft: 12,
                            }}>Hello, Joe</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                borderColor: colors.whitesmoke,
                                borderWidth: 3,
                                borderRadius: 56,
                                paddingVertical: 18,
                                paddingHorizontal: 5,
                                backgroundColor: colors.lightgrey,
                            }}
                            onPress={() => { }}>
                            <Icon
                                name="bell-regular"
                                size={20}
                                color={colors.black}
                                style={tw`mx-3.5`}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        fontFamily: fonts.Inter_Medium,
                        fontSize: 34,
                        marginTop: 36,
                        marginBottom: 36
                    }}>
                        How Are You Feeling Today?
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <CustomButton
                            onPress={() => { }}
                            iconName="heart-pulse-regular"
                            text="Checkup"
                            backgroundColor={colors.Royal_Blue}
                            textcolor={colors.white}
                        />
                        <CustomButton
                            onPress={() => { }}
                            iconName="comment-regular"
                            text="Consult"
                            textcolor={colors.black}
                        />
                    </View>
                </View>
                <View>
                    <Text style={{
                        fontFamily: fonts.Inter_SemiBold,
                        fontSize: 14,
                        marginLeft: 28,
                        marginTop: 28
                    }}>Recent</Text>
                    <Image
                        style={{
                            width: 260,
                            height: 260,
                            resizeMode: 'contain',
                            alignSelf: 'center'
                        }}
                        source={require('../assets/images/stethoscope.png')}
                    />
                    <Text style={{
                        fontFamily: fonts.Inter_Regular,
                        fontSize: 18,
                        alignSelf: 'center'
                    }}>
                        No Recent Doctors
                    </Text>
                </View>
            </ScrollView>
            <BottomBar />
        </SafeAreaView>
    );
};

export default Home;