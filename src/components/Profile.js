import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    useColorScheme
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import tw from 'tailwind-react-native-classnames';
import icomoonConfig from '../assets/fonts/icomoon/selection.json';
import { BackButton, CustomButton, TextBox } from './base/CustomComponents';
import { AuthContext } from './base/context';
import { colors, fonts } from './base/theme';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const Profile = ({ navigation }) => {
    const [isLoading, setisLoading] = React.useState(true);
    const [isbtnLoading, setisbtnLoading] = React.useState(false);
    const [btnDisabled, setbtnDisabled] = React.useState(true);
    const [name, setname] = React.useState('go');
    const [email, setemail] = React.useState('');
    const [user, setuser] = React.useState();
    const [imageUri, setImageUri] = React.useState(null);
    //const [base64Image, setBase64Image] = React.useState(null);
    const isDarkMode = useColorScheme() === 'light';
    const { signOut } = React.useContext(AuthContext);

    const chooseImage = () => {
        launchImageLibrary({
            //includeBase64: true,
            mediaType: 'photo'
        }, response => {
            //console.log(response)
            if (response.assets[0]) {
                setImageUri(response.assets[0].uri);
                //setBase64Image(response.base64);
            }
        })
    }

    const onupdateProfile = async () => {
        const current_user = auth().currentUser;
        const uid = current_user.uid;
        
        // Get the file extension from the image URI
        const fileExtension = imageUri.split('.').pop();
        // Set the image name as the user's UID + file extension
        const imageName = `${uid}.${fileExtension}`;
        const reference = storage().ref('doctors/' + imageName); // Set your desired path

        try {
            await reference.putFile(imageUri)
            const url = await reference.getDownloadURL();
            setImageUri(url);
            console.log('Image uploaded successfully!')
        } catch (error) {
            console.error('Error uploading image: ', error)
        }

        setisbtnLoading(true);
        setbtnDisabled(true);
        current_user.updateProfile({
            displayName: name,
            photoURL: imageUri
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
            setImageUri(current_user.photoURL);
            console.log(current_user.photoURL);
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
        <SafeAreaView style={[{ backgroundColor: colors.white }, tw`h-full`]}>
            {/* Top Bar */}
            <View style={{
                padding: 24,
                backgroundColor: colors.lightgrey,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <BackButton
                        navigation={navigation}
                    />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{
                            fontFamily: fonts.Inter_SemiBold,
                            fontSize: 16,
                            color: colors.black,
                        }}>Profile</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            borderColor: colors.white,
                            borderWidth: 3,
                            borderRadius: 56,
                            paddingVertical: 18,
                            paddingHorizontal: 5,
                            backgroundColor: colors.lightgrey,
                        }}
                        onPress={() => { }}>
                        <Icon
                            name="bell-regular"
                            size={20}
                            color={colors.black}
                            style={tw`mx-3.5`}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                        width: 130,
                        height: 130,
                        marginBottom: -80,
                        resizeMode: 'contain',
                        borderWidth: 6,
                        borderRadius: 80,
                        borderColor: colors.white,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => chooseImage()}>
                    <Image
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 80,
                        }}
                        //source={require('../assets/images/profile-pic.png')}
                        source={{
                            uri: imageUri
                        }}
                    />
                </TouchableOpacity>
            </View>

            <View style={{
                margin: 24,
                padding: 8,
                marginTop: 56
            }}>
                {/*<View style={tw`py-4`}>
                    <Text style={[tw`text-sm font-medium  ml-2`, tw`text-gray-700`]}>Name</Text>
                    <TextInput
                        style={[tw`my-1 text-base p-2 w-full border-gray-300 rounded-md`,
                        { borderWidth: 0, borderBottomWidth: 2, color: colors.black }]}
                        keyboardType='default'
                        placeholder='John Doe'
                        value={name}
                        onChangeText={text => { setname(text); setbtnDisabled(false); }}
                    />
        </View>*/}
                <TextBox
                    containerStyle={{ paddingVertical: 16 }}
                    label="Name"
                    value={name}
                    placeholder='John Doe'
                    keyboardType='default'
                    onChangeText={text => { setname(text); setbtnDisabled(false); }}
                />
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
                margin: 24,
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