import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Image, RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import tw from 'tailwind-react-native-classnames';
import icomoonConfig from '../assets/fonts/icomoon/selection.json';
import { BottomBar, CustomIconButton, Doctorcard } from './base/CustomComponents';
import { colors, fonts } from './base/theme';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const Home = ({ navigation }) => {
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [name, setname] = React.useState('Joe')
    const [data, setdata] = useState("dw")
    const [imageUri, setImageUri] = React.useState(null);

    const onRefresh = () => { };

    React.useEffect(
        React.useCallback(() => {
            const current_user = auth().currentUser;
            setname(current_user.displayName);
            setImageUri(current_user.photoURL);
            return () => {
                current_user;
            }
        }, [])
    );

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
                            {imageUri ? (
                                <Image
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 30,
                                        borderWidth: 3,
                                        borderColor: colors.white,
                                        resizeMode: 'contain'
                                    }}
                                    source={{ uri: imageUri }} />
                            ) : null}
                            <Text style={{
                                color: colors.black,
                                fontFamily: fonts.Inter_Regular,
                                fontSize: 16,
                                marginLeft: 12,
                            }}>Hello, {name}</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                borderColor: colors.white,
                                borderWidth: 3,
                                borderRadius: 56,
                                height: 56,
                                width: 56,
                                backgroundColor: colors.lightgrey,
                                justifyContent: 'center',
                                alignItems: 'center'
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
                        <CustomIconButton
                            onPress={() => { }}
                            iconName="heart-pulse-regular"
                            text="Checkup"
                            backgroundColor={colors.Royal_Blue}
                            textcolor={colors.white}
                            width={145}
                        />
                        <CustomIconButton
                            onPress={() => { }}
                            iconName="comment-regular"
                            text="Consult"
                            textcolor={colors.black}
                            width={145}
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
                    {data ? (
                        <Doctorcard
                            name="Dr. Sebastian Koch"
                            category="Neurologist"
                            starrating="4.8"
                            reviews="152"
                            onPress={() => navigation.navigate('Schedule')}
                        />
                    ) : (
                        <>
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
                        </>
                    )
                    }
                </View>
            </ScrollView>
            <BottomBar
                navigation={navigation}
            />
        </SafeAreaView >
    );
};

export default Home;