import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
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

const CustomButton = ({ onPress, text, backgroundColor, textcolor }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            backgroundColor: backgroundColor,
            borderRadius: 36,
            paddingVertical: 13,
            width: 145,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2.5,
            borderColor: colors.white
        }}>
        <Text style={{
            fontFamily: 'Inter_Regular',
            color: textcolor,
            fontSize: 16,
            marginLeft: 6,
        }}>{text}</Text>
    </TouchableOpacity>
);

const Profile = ({ navigation }) => {
    const [isLoading, setisLoading] = React.useState(true);
    const [isbtnLoading, setisbtnLoading] = React.useState(false);
    const [btnDisabled, setbtnDisabled] = React.useState(true);
    const [name, setname] = React.useState('go');
    const [email, setemail] = React.useState('');
    const [user, setuser] = React.useState()
    const isDarkMode = useColorScheme() === 'light';
    const { signOut } = React.useContext(AuthContext);

    const onupdateProfile = () => {
        setisbtnLoading(true);
        setbtnDisabled(true);
        const current_user = auth().currentUser;
        current_user.updateProfile({
            displayName: name
        });
        //current_user.updateEmail(email);
        setbtnDisabled(false);
        setisbtnLoading(false);
        Snackbar.show({
            text: "Save Successful!",
            duration: Snackbar.LENGTH_LONG,
            textColor: colors.white,
            backgroundColor: '#4bb543'
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            const current_user = auth().currentUser;
            setuser(current_user);
            setname(current_user.displayName);
            setemail(current_user.email);
            setisLoading(false);
            return () => {
                current_user;
            }
        }, [])
    );

    useEffect(() => {
        const current_user = auth().currentUser;
        setTimeout(() => {
            setuser(current_user);
            setname(current_user.displayName);
            setemail(current_user.email);
            setisLoading(false);
        }, 1000);
        return () => {
            current_user;
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <SafeAreaView style={[isDarkMode ? { backgroundColor: colors.dark } : { backgroundColor: colors.white }, tw`p-6 h-full`]}>
                <ActivityIndicator
                    color={isDarkMode ? colors.white : colors.primary}
                    size="large"
                    style={{
                        marginTop: 10
                    }}
                />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={[{ backgroundColor: colors.white }, tw`p-6 h-full`]}>
            <TouchableOpacity
                style={[tw`self-start my-4 px-1.5 py-4 rounded-2xl`, { backgroundColor: colors.black }]}
                onPress={() => navigation.replace('Home')}>
                <Icon
                    name="angle-left-solid"
                    size={20}
                    color={colors.white}
                    style={tw`mx-3.5`}
                />
            </TouchableOpacity>
            <View style={tw`py-2`}>
                <View style={tw`py-4`}>
                    <Text style={[tw`text-sm font-medium  ml-2`, tw`text-gray-700`]}>Name</Text>
                    <TextInput
                        style={[tw`my-1 text-base p-2 w-full border-gray-300 rounded-md`, { borderWidth: 0, borderBottomWidth: 2, color: colors.black }]}
                        keyboardType='default'
                        placeholder='John Doe'
                        value={name}
                        onChangeText={text => { setname(text); setbtnDisabled(false); }}
                    />
                </View>
                <View style={tw`py-4`}>
                    <Text style={[tw`text-sm font-medium`, isDarkMode ? tw`text-white` : tw`text-gray-700`]}>Email</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('UpdateEmail')} style={tw`my-1 text-base p-2 w-full border-2 border-gray-300 rounded-md`}>
                        <Text style={[tw`text-base`, { fontFamily: fonts.Nunito_Regular }, isDarkMode ? tw`text-white` : tw`text-black`]}>{email}</Text>
                    </TouchableOpacity>
                </View>
                <View style={tw`py-4`}>
                    <Text style={[tw`text-sm font-medium`, isDarkMode ? tw`text-white` : tw`text-gray-700`]}>Password</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('UpdatePassword')} style={tw`my-1 text-base p-2 w-full border-2 border-gray-300 rounded-md`}>
                        <Text style={[tw`text-base`, { fontFamily: fonts.Nunito_Regular }, isDarkMode ? tw`text-white` : tw`text-black`]}>********</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <CustomButton
                            onPress={() => onupdateProfile()}
                            iconName="heart-pulse-regular"
                            text="Save"
                            backgroundColor={colors.lightgrey}
                            textcolor={colors.black}
                        />
                        <CustomButton
                            onPress={() => signOut()}
                            iconName="comment-regular"
                            text="Sign Out"
                            backgroundColor={colors.Royal_Blue}
                            textcolor={colors.white}
                        />
                    </View>
        </SafeAreaView>
    )
}

export default Profile;