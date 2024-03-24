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
        <SafeAreaView style={[{ backgroundColor: colors.lightgrey }, tw`m-1 p-6 h-full`]}>
            <TouchableOpacity
                style={[
                    tw`self-start my-4 px-1.5 py-4 rounded-2xl`,
                    { borderColor: colors.whitesmoke, borderWidth: 2, backgroundColor: colors.black }]}
                onPress={() => navigation.goBack()}>
                <Icon
                    name="angle-left-solid"
                    size={20}
                    color={colors.white}
                    style={tw`mx-3.5`}
                />
            </TouchableOpacity>
            <Text style={[tw`mb-1 mt-8`, {
                fontFamily: fonts.Inter_Medium,
                fontSize: 24,
            }, { color: colors.black }]}>Sign In</Text>
            <View style={tw`py-2`}>
                <View style={tw`py-4`}>
                    <Text style={[tw`text-sm font-medium ml-2`, tw`text-gray-700`]}>Email</Text>
                    <TextInput
                        style={[tw`my-1 text-base p-2 w-full border-gray-300 rounded-md`,
                        { borderWidth: 0, borderBottomWidth: 2, color: colors.black }
                        ]}
                        keyboardType='email-address'
                        onChangeText={text => setemail(text)}
                    />
                </View>
                <View style={tw`py-4`}>
                    <Text style={[tw`text-sm font-medium  ml-2`, tw`text-gray-700`]}>Password</Text>
                    <TextInput
                        style={[tw`my-1 text-base p-2 w-full border-gray-300 rounded-md`,
                        { borderWidth: 0, borderBottomWidth: 2, color: colors.black }
                        ]}
                        secureTextEntry={true}
                        onChangeText={text => setpassword(text)}
                    />
                </View>
            </View>
            {/* Sign In Button */}
            <TouchableOpacity
                onPress={() => login(email, password)}
                style={[{
                    backgroundColor: '#1c1c1c',
                    borderRadius: 36,
                    paddingHorizontal: 48,
                    paddingVertical: 16,
                    justifyContent: 'center',
                    marginLeft: 'auto'
                }, isDarkMode ? { backgroundColor: colors.Royal_Blue } : { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#cccccc' }]}>
                <Text style={[{
                    fontFamily: 'Inter_Regular',
                    color: '#f5f5f5',
                    fontSize: 16,
                }, isDarkMode ? { color: '#f5f5f5' } : { color: '#000000' }]}>Sign In</Text>
            </TouchableOpacity>

            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 28, alignSelf: 'center' }}>
                <Text style={[tw`text-sm`, { fontFamily: fonts.Nunito_Regular }, { color: colors.dark }]}>Don’t have an Account? </Text>
                <TouchableOpacity><Text style={[tw`text-sm`, { fontFamily: fonts.Nunito_Regular }, { color: colors.primary }]}>Sign Up</Text></TouchableOpacity>
            </View>
            <View style={{
                alignItems: 'center',
                marginTop: 12
            }}>
                <TouchableOpacity><Text style={[tw`text-sm`, { fontFamily: fonts.Nunito_Regular }, { color: colors.primary }]}>Forgot Password?</Text></TouchableOpacity>
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
                    <Text style={[{ fontFamily: fonts.Poppins_Regular, fontSize: 14 }, { color: colors.dark }]}>OR</Text>
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
                <TouchableOpacity
                    onPress={() => google_auth()}
                    style={[tw`my-4 py-3`, { backgroundColor: colors.black, borderRadius: 36 }]}>
                    <View style={tw`self-center`}>
                        {isLoading ?
                            <ActivityIndicator size="small" color={ colors.Royal_Blue } />
                            :
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/images/Google-icon/icon_google.png')} style={{ width: 24, resizeMode: 'contain', alignSelf: 'center' }} />
                                <Text style={[tw`ml-2 text-base text-white self-center`, { fontFamily: fonts.Inter_Regular }, tw`text-white`]}>Google</Text>
                            </View>
                        }
                    </View>
                </TouchableOpacity>
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