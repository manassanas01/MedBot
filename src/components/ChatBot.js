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
import { BackButton } from './base/CustomComponents';
import { colors, fonts } from './base/theme';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const Msg1 = ({ text }) => (
    <View style={{
        backgroundColor: colors.Royal_Blue,
        borderRadius: 50,
        maxWidth: '95%',
        padding: 24,
        marginVertical: 12
    }}>
        <Text style={{
            color: colors.white,
            fontFamily: fonts.Inter_Regular,
            fontSize: 14
        }}>
            {text}
        </Text>
    </View>
)

const Msg2 = ({ text }) => (
    <View style={{
        backgroundColor: colors.lightgrey,
        borderRadius: 50,
        maxWidth: '95%',
        padding: 20,
        marginVertical: 12,
        marginLeft: 'auto'
    }}>
        <Text style={{
            color: colors.black,
            fontFamily: fonts.Inter_Regular,
            fontSize: 14
        }}>
            {text}
        </Text>
    </View>
)

const ChatBot = ({ navigation }) => {
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
                        }}>Summary</Text>
                    </View>
                </View>
                <View style={{
                    marginTop: 18
                }}>
                    <Msg1
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id lobortis urna?"
                    />
                    <Msg2
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id lobortis urna. Nullam eget aliquet enim, a facilisis ex. Donec accumsan hendrerit nisl sit amet efficitur."
                    />
                </View>
            </ScrollView>
            <View style={{
                margin: 12,
                padding: 8,
                backgroundColor: colors.lightgrey,
                borderRadius: 18,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <TextInput
                    style={{
                        fontFamily: fonts.Inter_Regular,
                        fontSize: 16,
                        padding: 4,
                        width: '75%',
                        borderWidth: 0,
                        borderBottomWidth: 0.8,
                        borderColor: colors.black,
                        color: colors.black
                    }}
                    placeholder="Type here ..."
                    placeholderTextColor={colors.black}
                    onChangeText={() => { }}
                />
                <TouchableOpacity
                    style={{
                        borderColor: colors.white,
                        borderWidth: 3,
                        borderRadius: 56,
                        height: 56,
                        width: 56,
                        backgroundColor: colors.Royal_Blue,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => { }}>
                    <Icon
                        name="paper-plane-regular"
                        size={20}
                        color={colors.white}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ChatBot;