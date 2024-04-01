import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    useColorScheme
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import tw from 'tailwind-react-native-classnames';
import icomoonConfig from '../assets/fonts/icomoon/selection.json';
import { BackButton, CustomButton, TextBox } from './base/CustomComponents';
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
            webClientId: '149615571443-hv173mr747iupqojf71mni5p7i0rac13.apps.googleusercontent.com',
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
            <BackButton
                navigation={navigation}
                style={{
                    marginTop: 14,
                    marginBottom: 8
                }}
            />
            <Text style={[tw`mb-1 mt-8`, {
                fontFamily: fonts.Inter_Medium,
                fontSize: 24,
            }, { color: colors.black }]}>Sign In</Text>
            <View style={tw`py-2`}>
                {/*<View style={tw`py-4`}>
                    <Text style={[tw`text-sm font-medium ml-2`, tw`text-gray-700`]}>Email</Text>
                    <TextInput
                        style={[tw`my-1 text-base p-2 w-full`,
                        {
                            borderWidth: 0,
                            borderBottomWidth: 0.8,
                            borderColor: colors.black,
                            color: colors.black
                        }
                        ]}
                        keyboardType='email-address'
                        onChangeText={text => setemail(text)}
                    />
                    </View>*/}
                <TextBox
                    containerStyle={{ paddingVertical: 16 }}
                    label="Email"
                    keyboardType='email-address'
                    onChangeText={text => setemail(text)}
                />
                <TextBox
                    containerStyle={{ paddingVertical: 16 }}
                    label="Password"
                    secureTextEntry={true}
                    onChangeText={text => setpassword(text)}
                />
            </View>
            {/* Sign In Button */}
            <CustomButton
                onPress={() => login(email, password)}
                iconName="heart-pulse-regular"
                text="Sign In"
                backgroundColor={colors.Royal_Blue}
                textcolor={colors.white}
                btnstyle={{
                    marginLeft: 'auto'
                }}
            />

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
                    style={[tw`my-4 py-2.5`, { backgroundColor: colors.black, borderRadius: 36 }]}>
                    <View style={tw`self-center`}>
                        {isLoading ?
                            <ActivityIndicator size="small" color={colors.Royal_Blue} />
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

export default Login;