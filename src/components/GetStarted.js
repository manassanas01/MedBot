import React from 'react';
import { Image, SafeAreaView, Text, useColorScheme, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'tailwind-react-native-classnames';
import { colors, fonts } from './base/theme';

const GetStarted = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaView style={[isDarkMode ? { backgroundColor: colors.dark } : { backgroundColor: colors.white }, tw`flex-1`]}>
            <Image
                source={require('../assets/images/group150.png')}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover', // or resizeMode: 'stretch' for stretching the image
                    position: 'absolute'
                }}
            />
            <View style={{
                marginTop: 'auto',
                marginBottom: 32,
                marginLeft: 24,
                marginRight: 24
            }}>
                <Text style={{
                    fontFamily: fonts.Inter_Bold,
                    fontSize: 36,
                    color: colors.black
                }}>Transforming Healthcare</Text>
                <View>
                    {/* Get Started Buttons */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                                style={[{
                                    backgroundColor: '#1c1c1c',
                                    height: 52,
                                    borderRadius: 36,
                                    paddingHorizontal: 48,
                                    justifyContent: 'center',
                                    marginRight: 8
                                }, isDarkMode ? { backgroundColor: '#1c1c1c' } : { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#cccccc' }]}>
                                <Text style={[{
                                    fontFamily: 'Inter_Regular',
                                    color: '#f5f5f5',
                                    fontSize: 16,
                                }, isDarkMode ? { color: '#f5f5f5' } : { color: '#000000' }]}>Sign In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { }}
                                style={[{
                                    backgroundColor: '#1c1c1c',
                                    height: 52,
                                    borderRadius: 36,
                                    paddingHorizontal: 48,
                                    justifyContent: 'center',
                                    marginLeft: 8
                                }, isDarkMode ? { backgroundColor: '#1c1c1c' } : { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#cccccc' }]}>
                                <Text style={[{
                                    fontFamily: 'Inter_Regular',
                                    color: '#f5f5f5',
                                    fontSize: 16,
                                }, isDarkMode ? { color: '#f5f5f5' } : { color: '#000000' }]}>Sign Up</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default GetStarted;
