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
import { colors, fonts } from './base/theme';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const Appointments = ({ navigation }) => {
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
                    <Doctorcard
                        name="Dr. Sebastian Koch"
                        category="Neurologist"
                        starrating="4.8"
                        reviews="152"
                        onPress={() => navigation.navigate('Schedule')}
                        style={{
                            marginVertical: 18
                        }}
                    />
                    <Doctorcard
                        name="Dr. Jessica Lee"
                        category="Cardiologist"
                        starrating="4.8"
                        reviews="152"
                        onPress={() => navigation.navigate('Schedule')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Appointments;