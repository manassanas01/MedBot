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
import { BackButton } from './base/CustomComponents';
import { colors, fonts } from './base/theme';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const Summary = ({ navigation }) => {
    return (
        <SafeAreaView style={{
            backgroundColor: colors.white
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
                        }}>Summary</Text>
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
                </View>

                {/* Downlaod Reports Button */}
                <TouchableOpacity
                    onPress={() => { }}
                    style={{
                        backgroundColor: colors.black,
                        borderRadius: 36,
                        marginVertical: 8,
                        paddingVertical: 18
                    }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="download-regular" size={20} color={colors.white} />
                            <Text style={{
                                fontFamily: fonts.Inter_Medium,
                                fontSize: 14,
                                color: colors.white,
                                marginLeft: 6
                            }}> Download Summary and Reports </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View
                    style={{
                        marginTop: 24,
                        padding: 18,
                        paddingTop: 24,
                        backgroundColor: colors.lightgrey,
                        borderRadius: 50,
                    }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Image
                            style={{
                                width: 62,
                                height: 69,
                                borderRadius: 20,
                                resizeMode: 'contain',
                                alignSelf: 'center',
                                backgroundColor: colors.white
                            }}
                            source={require('../assets/images/ctscan.png')}
                        />
                        <View style={{
                            marginLeft: 12
                        }}>
                            <Text style={{
                                fontFamily: fonts.Inter_SemiBold,
                                fontSize: 16,
                                color: colors.black
                            }}>CT scan of head</Text>
                            <Text style={{
                                fontFamily: fonts.Inter_Regular,
                                fontSize: 14,
                                color: colors.black
                            }}>No evidence of intracerebral hemorrhage</Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 24,
                        padding: 18,
                        paddingTop: 32,
                        paddingBottom: 32,
                        backgroundColor: colors.lightgrey,
                        borderRadius: 50,

                    }}>
                    <Text style={{
                        color: colors.black,
                        fontFamily: fonts.Inter_SemiBold,
                        fontSize: 16,
                    }}>Medications</Text>
                    { /*  Loop Div */}
                    <View style={{ marginTop: 18 }}>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.Inter_SemiBold,
                            fontSize: 16
                        }}>Reduce sodium intake</Text>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.Inter_Regular,
                            fontSize: 14
                        }}>
                            Stop taking Advil until medically cleared by your primary care physician. {"\n \n"}
                            Durantion: For 14 days (May 1st, 2023)
                        </Text>
                    </View>
                    { /* End Loop */}
                    {/** Remove this */}
                    <View style={{ marginTop: 18 }}>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.Inter_SemiBold,
                            fontSize: 16
                        }}>Start taking Benazepril</Text>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.Inter_Regular,
                            fontSize: 14
                        }}>
                            10 mg every morning with food. We sent you home with 14 days supply. Checkin with cardiologist in 14 days. {"\n \n"}
                            Quantity: 1 pill per day in morning{"\n"}
                            Duration: For 14 days (May 1st, 2023)
                        </Text>
                    </View>
                    {/** End Remove */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Summary;