import auth from '@react-native-firebase/auth';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../assets/fonts/icomoon/selection.json';
import { BackButton, Doctorcard } from './base/CustomComponents';
import { apiurl, colors, fonts } from './base/theme';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const Appointments = ({ navigation }) => {
    const [data, setdata] = React.useState();

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
                ]
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
            })
            .catch((error) => console.error(error))
    }

    React.useEffect(() => {
        auth().currentUser.getIdToken().then((uid) => {
            fch(uid);
        })
    }, [])

    return (
        <SafeAreaView style={{
            backgroundColor: colors.white,
            height: '100%'
        }}>
            <ScrollView contentContainerStyle={{ padding: 24 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <BackButton
                        onPress={() => navigation.goBack()}
                    />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{
                            fontFamily: fonts.Inter_SemiBold,
                            fontSize: 16,
                            color: colors.black,
                            marginRight: '25%'
                        }}>Find Care</Text>
                    </View>
                </View>

                <View style={{
                    marginTop: 24,
                    paddingHorizontal: 8,
                    backgroundColor: colors.white,
                    borderRadius: 18,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 0.8,
                    borderColor: colors.black
                }}>
                    <Icon
                        name="magnifying-glass-solid"
                        size={20}
                        color={colors.black}
                        style={{
                            marginHorizontal: 4
                        }}
                    />
                    <TextInput
                        style={{
                            fontFamily: fonts.Inter_Regular,
                            fontSize: 16,
                            padding: 4,
                            width: '75%',
                            borderWidth: 0,
                            color: colors.black
                        }}
                        placeholder="Search"
                        placeholderTextColor={colors.black}
                        onChangeText={() => { }}
                    />
                    <TouchableOpacity
                        style={{
                            borderColor: colors.white,
                            borderWidth: 3,
                            borderRadius: 56,
                            height: 48,
                            width: 48,
                            backgroundColor: colors.white,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => { }}>
                        <Icon
                            name="filter-regular"
                            size={20}
                            color={colors.black}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{
                    marginTop: 18
                }}>
                    {
                        data ? (data.map((x, index) => (
                            <Doctorcard
                                imageURL={x.document.fields.imageURL.stringValue}
                                name={x.document.fields.name.stringValue}
                                category={x.document.fields.category.stringValue}
                                starrating={x.document.fields.star.stringValue}
                                reviews={x.document.fields.no_review.stringValue}
                                onPress={() => navigation.navigate('Schedule', { idURL: x.document.name })}
                                style={{
                                    marginVertical: 18
                                }}
                                key={index}
                            />
                        ))) : null
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Appointments;