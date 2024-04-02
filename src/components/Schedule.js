import React from "react";
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
import { colors, fonts } from "./base/theme";

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

const Schedule = ({ navigation }) => {
    return (
        <SafeAreaView style={{

            backgroundColor: colors.white,
            height: '100%',
            flex: 1, // Make SafeAreaView take up entire screen
        }}>
            <ScrollView style={{ height: '100%', flex: 1, padding: 24 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <BackButton
                        navigation={navigation}
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
                            source={require('../assets/images/image5.png')}
                        />
                        <View style={{
                            marginLeft: 16
                        }}>
                            <Text style={{
                                fontFamily: fonts.Inter_SemiBold,
                                fontSize: 16,
                                color: colors.black
                            }}>Dr. Sebastian Koch</Text>
                            <Text style={{
                                fontFamily: fonts.Inter_Regular,
                                fontSize: 12,
                                color: '#757575'
                            }}>Neurologist</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.Inter_Regular,
                                    fontSize: 16,
                                    marginTop: 6,
                                    color: colors.black
                                }}>4.5</Text>
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
                                }}>(152)</Text>
                            </View>
                        </View>

                    </View>
                    <Text style={{
                        fontFamily: fonts.Inter_Regular,
                        fontSize: 16,
                        color: colors.black,
                        marginVertical: 18
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis at ligula nec tincidunt. Duis luctus neque in tellus rutrum ultrices. Aenean finibus, ipsum id varius bibendum, tortor nibh lobortis ipsum, in eleifend diam quam non ligula. Praesent sit amet porta nisl.
                    </Text>
                </View>
                <Text style={{
                    fontFamily: fonts.Inter_SemiBold,
                    fontSize: 14,
                    marginTop: 28,
                    color: colors.black
                }}>Available Timing</Text>
                <View>
                    <Slot
                        date="Mon, Feb 6"
                        slot1="09:30 AM"
                        slot2="12:30 PM"
                    />
                    <Slot
                        date="Mon, Feb 6"
                        slot1="09:30 AM"
                        slot2="12:30 PM"
                    />
                    <Slot
                        date="Mon, Feb 6"
                        slot1="09:30 AM"
                        slot2="12:30 PM"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Schedule;