import auth from '@react-native-firebase/auth';
import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../assets/fonts/icomoon/selection.json';

import { BackButton } from "./base/CustomComponents";
import { apiurl, colors, fonts, url } from "./base/theme";

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const Slot = ({ date, slot1, slot2, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            backgroundColor: colors.black,
            borderRadius: 36,
            marginVertical: 8,
            paddingVertical: 18
        }}>
        <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{
                    fontFamily: fonts.Inter_Medium,
                    fontSize: 14,
                    color: colors.white
                }}>{date} </Text>
                <Text style={{
                    fontFamily: fonts.Inter_Regular,
                    fontSize: 14,
                    color: colors.white
                }}>{slot1} -> {slot2}</Text>
            </View>
        </View>
    </TouchableOpacity>
)

const Schedule = ({ navigation, route }) => {
    const [data, setdata] = React.useState();
    const [timeslots, settimeslot] = React.useState();

    const fchslot = (current_user) => {
        fetch(apiurl + '/slot_timings', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + current_user
            }
        })
            .then((response) => response.json())
            .then((response) => {
                settimeslot(response.documents);
            })
            .catch((error) => console.error(error))
    }

    const fch = (current_user) => {
        fetch(url + route.params.idURL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + current_user
            }
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
            fchslot(uid);
        })
    }, [])

    return (
        <SafeAreaView style={{

            backgroundColor: colors.white, // Make SafeAreaView take up entire screen
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
                        }}>Schedule</Text>
                    </View>
                </View>

                <View
                    style={{
                        marginTop: 24,
                        padding: 18,
                        paddingTop: 24,
                        backgroundColor: colors.lightgrey,
                        borderRadius: 50
                    }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Image
                            style={{
                                width: 115,
                                height: 130,
                                borderRadius: 30,
                                resizeMode: 'contain',
                                alignSelf: 'center',
                                backgroundColor: colors.white
                            }}
                            source={{ uri: data?.fields?.imageURL?.stringValue }}
                        />
                        <View style={{
                            marginLeft: 16
                        }}>
                            <Text style={{
                                fontFamily: fonts.Inter_SemiBold,
                                fontSize: 16,
                                color: colors.black
                            }}>{data?.fields?.name?.stringValue}</Text>
                            <Text style={{
                                fontFamily: fonts.Inter_Regular,
                                fontSize: 12,
                                color: '#757575'
                            }}>{data?.fields?.category?.stringValue}</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.Inter_Regular,
                                    fontSize: 16,
                                    marginTop: 6,
                                    color: colors.black
                                }}>{data?.fields?.star?.stringValue}</Text>
                                <Icon
                                    name="star-solid"
                                    size={10}
                                    color={colors.black}
                                    style={{
                                        marginTop: 4,
                                        marginLeft: 2,
                                        marginRight: 4
                                    }}
                                />
                                <Text style={{
                                    fontFamily: fonts.Inter_Regular,
                                    fontSize: 16,
                                    marginTop: 6,
                                    color: colors.black
                                }}>({data?.fields?.no_review?.stringValue})</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{
                        fontFamily: fonts.Inter_Regular,
                        fontSize: 16,
                        color: colors.black,
                        marginVertical: 18
                    }}>
                        {data?.fields?.desc?.stringValue}
                    </Text>
                </View>
                <Text style={{
                    fontFamily: fonts.Inter_SemiBold,
                    fontSize: 14,
                    marginTop: 28,
                    marginBottom: 12,
                    color: colors.black
                }}>Available Timing</Text>
                <View>
                    {
                        timeslots?.map((x, index) => (
                            <Slot
                                key={index}
                                date={x.fields.day.stringValue + ", " + x.fields.date.stringValue}
                                slot1={x.fields.timefrom.stringValue}
                                slot2={x.fields.timeto.stringValue}
                                onPress={() => navigation.navigate('ChatBox2', { docidURL: route.params.idURL })}
                            />
                        ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Schedule;