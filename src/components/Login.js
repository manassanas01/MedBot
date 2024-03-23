import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import tw from 'tailwind-react-native-classnames';
import icomoonConfig from '../assets/fonts/icomoon/selection.json';
import { AuthContext } from './base/context';

import { colors, fonts } from './base/theme';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const Login = ({ navigation }) => {
    const [email, setemail] = React.useState(null);
    const [password, setpassword] = React.useState(null);
    const [isLoading, setisLoading] = React.useState(false);
    const isDarkMode = useColorScheme() === 'dark';

    const { signIn } = React.useContext(AuthContext);

    const google_auth = async () => {
        setisLoading(true);
        GoogleSignin.configure({
            webClientId: '440064675261-091lsp0m00fg75llat81efc8b5354q8b.apps.googleusercontent.com',
          });
        // Get the users ID token
        //const { idToken } = await GoogleSignin.signIn();
        const data = await GoogleSignin.signIn();
        console.log(data);
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
        // Sign-in the user with the credential
        auth().signInWithCredential(googleCredential)
            .then(() => {
                console.log('Login Success');
                setisLoading(true)
            })
    }

    const login = (email, password) => {
        setisLoading(true);
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Login Success')
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    Snackbar.show({
                        text: "Email address is already in use!",
                        duration: Snackbar.LENGTH_LONG,
                        textColor: colors.white,
                        backgroundColor: '#d9534f'
                    });
                }
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    Snackbar.show({
                        text: "Email address or Password is invalid!",
                        duration: Snackbar.LENGTH_LONG,
                        textColor: colors.white,
                        backgroundColor: '#d9534f'
                    });
                }
                if (error.code === 'auth/wrong-password') {
                    console.log('That email address is invalid!');
                    Snackbar.show({
                        text: "Email address or Password is invalid!",
                        duration: Snackbar.LENGTH_LONG,
                        textColor: colors.white,
                        backgroundColor: '#d9534f'
                    });
                }
                console.error(error);
                setisLoading(false);
            })
    }

    return (
        <SafeAreaView style={[isDarkMode ? { backgroundColor: colors.dark } : { backgroundColor: colors.white }, tw`p-6 h-full`]}>
            {Platform.OS === 'android' ?
                <TouchableRipple
                    style={[tw`self-start my-4 px-1.5 py-4 rounded-2xl`, isDarkMode ? { backgroundColor: colors.dark_2 } : { backgroundColor: colors.primary }]}
                    rippleColor="rgba(0, 0, 0, .32)"
                    onPress={() => navigation.goBack()}>
                    <Icon
                        name="angle-left-solid"
                        size={20}
                        color={colors.white}
                        style={tw`mx-3.5`}
                    />
                </TouchableRipple>
                :
                <TouchableOpacity
                    style={[tw`self-start my-4 px-1.5 py-4 rounded-2xl`, isDarkMode ? { backgroundColor: colors.dark_2 } : { backgroundColor: colors.primary }]}
                    onPress={() => navigation.goBack()}>
                    <Icon
                        name="angle-left-solid"
                        size={20}
                        color={colors.white}
                        style={tw`mx-3.5`}
                    />
                </TouchableOpacity>
            }
            <Text style={[tw`my-1`, {
                fontFamily: fonts.Nunito_SemiBold,
                fontSize: 36,
            }, isDarkMode ? { color: colors.white } : { color: colors.primary }]}>Notes 101</Text>
            <View style={tw`py-2`}>
                <View style={tw`py-4`}>
                    <Text style={[tw`text-sm font-medium`, isDarkMode ? tw`text-white` : tw`text-gray-700`]}>Email</Text>
                    <TextInput
                        style={tw`my-1 text-base p-2 w-full border-2 border-gray-300 rounded-md`}
                        keyboardType='email-address'
                        placeholder='john.doe@example.com'
                        onChangeText={text => setemail(text)}
                    />
                </View>
                <View style={tw`py-4`}>
                    <Text style={[tw`text-sm font-medium text-gray-700`, isDarkMode ? tw`text-white` : tw`text-gray-700`]}>Password</Text>
                    <TextInput
                        style={tw`my-1 p-2 w-full text-base border-2 border-gray-300 rounded-md`}
                        secureTextEntry={true}
                        onChangeText={text => setpassword(text)}
                    />
                </View>
            </View>
            {Platform.OS === 'android' ?
                <TouchableRipple
                    rippleColor="rgba(0, 0, 0, .32)"
                    onPress={() => login(email, password)}
                    style={[tw`my-4 py-3 rounded-md`, isDarkMode ? { backgroundColor: colors.dark_2 } : { backgroundColor: colors.primary }]}>
                    {isLoading ?
                        <ActivityIndicator size="small" color={colors.white} />
                        :
                        <Text style={[tw`text-base text-white self-center`, { fontFamily: fonts.Nunito_Regular }]}>Sign In</Text>
                    }
                </TouchableRipple>
                :
                <TouchableOpacity
                    rippleColor="rgba(0, 0, 0, .32)"
                    onPress={() => login(email, password)}
                    style={[tw`my-4 py-3 rounded-md`, isDarkMode ? { backgroundColor: colors.dark_2 } : { backgroundColor: colors.primary }]}>
                    {isLoading ?
                        <ActivityIndicator size="small" color={colors.white} />
                        :
                        <Text style={[tw`text-base text-white self-center`, { fontFamily: fonts.Nunito_Regular }]}>Sign In</Text>
                    }
                </TouchableOpacity>
            }
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 12, alignSelf: 'center' }}>
                <Text style={[tw`text-sm`, { fontFamily: fonts.Nunito_Regular }, isDarkMode ? { color: colors.white } : { color: colors.dark }]}>Don’t have an Account? </Text>
                <TouchableOpacity><Text style={[tw`text-sm`, { fontFamily: fonts.Nunito_Regular }, isDarkMode ? { color: colors.white } : { color: colors.primary }]}>Sign Up</Text></TouchableOpacity>
            </View>
            <View style={{
                alignItems: 'center',
                marginTop: 12
            }}>
                <TouchableOpacity><Text style={[tw`text-sm`, { fontFamily: fonts.Nunito_Regular }, isDarkMode ? { color: colors.white } : { color: colors.primary }]}>Forgot Password?</Text></TouchableOpacity>
            </View>
            <View style={tw`my-4`}>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <View
                        style={{
                            borderBottomColor: colors.grey,
                            borderBottomWidth: 1,
                            margin: 12,
                            width: '40%'
                        }}
                    />
                    <Text style={[{ fontFamily: fonts.Poppins_Regular, fontSize: 14 }, isDarkMode ? { color: colors.white } : { color: colors.dark }]}>OR</Text>
                    <View
                        style={{
                            borderBottomColor: colors.grey,
                            borderBottomWidth: 1,
                            margin: 12,
                            width: '40%'
                        }}
                    />
                </View>
            </View>
            <View>
                {Platform.OS === 'android' ?
                    <TouchableRipple
                        rippleColor="rgba(0, 0, 0, .32)"
                        onPress={() => google_auth()}
                        style={[tw`my-4 py-2.5 rounded-md`, isDarkMode ? { backgroundColor: colors.dark_2 } : { backgroundColor: colors.white, borderWidth: 1, borderColor: '#cccccc' }]}>
                        <View style={tw`self-center`}>
                            {isLoading ?
                                <ActivityIndicator size="small" color={ isDarkMode ? colors.white : colors.primary } />
                                :
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../assets/images/Google-icon/icon_google.png')} style={{ width: 24, resizeMode: 'contain', alignSelf: 'center' }} />
                                    <Text style={[tw`ml-2 text-base text-white self-center`, { fontFamily: fonts.Nunito_Regular }, isDarkMode ? tw`text-white`: tw`text-black`]}>Google</Text>
                                </View>
                            }
                        </View>
                    </TouchableRipple>
                    :
                    <TouchableOpacity
                        onPress={() => google_auth()}
                        style={[tw`my-4 py-3 rounded-md`, isDarkMode ? { backgroundColor: colors.dark_2 } : { backgroundColor: colors.white, borderWidth: 1, borderColor: '#cccccc' }]}>
                        <View style={tw`self-center`}>
                            {isLoading ?
                                <ActivityIndicator size="small" color={ isDarkMode ? colors.white : colors.primary } />
                                :
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../assets/images/Google-icon/icon_google.png')} style={{ width: 24, resizeMode: 'contain', alignSelf: 'center' }} />
                                    <Text style={[tw`ml-2 text-base text-white self-center`, { fontFamily: fonts.Inter_Regular }, isDarkMode ? tw`text-white`: tw`text-black`]}>Google</Text>
                                </View>
                            }
                        </View>
                    </TouchableOpacity>
                }
            </View>
            
        </SafeAreaView>
    )
}
/*
const getdeviceinfo = () => {
    let deviceJSON = {}
    deviceJSON.uid = DeviceInfo.getUniqueId()
    deviceJSON.model = DeviceInfo.getModel()
    deviceJSON.ip = DeviceInfo.getIpAddressSync()
    deviceJSON.os = Platform.OS;
    return deviceJSON;
}*/

//const styles = StyleSheet.create({})

export default Login