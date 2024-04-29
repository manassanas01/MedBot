import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Image, RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import tw from 'tailwind-react-native-classnames';
import icomoonConfig from '../assets/fonts/icomoon/selection.json';
import { BottomBar, CustomIconButton, Doctorcard } from './base/CustomComponents';
import { apiurl, colors, fonts } from './base/theme';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const Home = ({ navigation }) => {
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [name, setname] = React.useState('Joe')
    const [data, setdata] = useState(null)
    const [imageUri, setImageUri] = React.useState(null);

    const fch = (current_user) => {
        const body = JSON.stringify({
            "structuredQuery": {
                "select": {
                    "fields": [
                        {
                            "fieldPath": "category"
                        },
                        {
                            "fieldPath": "imageURL"
                        },
                        {
                            "fieldPath": "loation"
                        },
                        {
                            "fieldPath": "name"
                        },
                        {
                            "fieldPath": "no_review"
                        },
                        {
                            "fieldPath": "star"
                        }
                    ]
                },
                "from": [
                    {
                        "collectionId": "doctors"
                    }
                ],
                "limit": 2
            }
        })
        fetch(apiurl + ":runQuery", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + current_user
            },
            body: body
        })
            .then((response) => response.json())
            .then((response) => {
                setdata(response);
                console.log(response)
            })
            .catch((error) => console.error(error))
            .finally(() => setisLoading(false))
    }

    React.useEffect(() => {
        const current_user = auth().currentUser;
        setname(current_user.displayName);
        setImageUri(current_user.photoURL);
        auth().currentUser.getIdToken().then((uid) => {
            fch(uid);
        })
    }, [])

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
                            onPress={() => navigation.navigate('Appointments')}
                            iconName="heart-pulse-regular"
                            text="Checkup"
                            backgroundColor={colors.Royal_Blue}
                            textcolor={colors.white}
                            width={145}
                        />
                        <CustomIconButton
                            onPress={() => navigation.navigate('ChatBox')}
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
                    { data ? (data.map((x, index) => (
                        <Doctorcard
                            key={index}
                            imageURL={x.document.fields.imageURL.stringValue}
                            name={x?.document?.fields?.name.stringValue}
                            category={x?.document?.fields?.category.stringValue}
                            starrating={x?.document?.fields?.star.stringValue}
                            reviews={x?.document?.fields?.no_review.stringValue}
                            onPress={() => navigation.navigate('Schedule', { idURL: x?.document?.name })}
                            style={{
                                margin: 18
                            }}
                        />
                    ))) : (
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