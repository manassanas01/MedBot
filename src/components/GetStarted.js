import React from 'react';
import { Image, SafeAreaView, Text, useColorScheme, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
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
                marginBottom: 18,
                marginLeft: 18,
                marginRight: 18
            }}>
                <Text style={{
                    fontFamily: fonts.Inter_Bold,
                    fontSize: 36,
                    color: colors.black
                }}>Transforming Healthcare</Text>
                <View>
                    {/* Get Started Buttons */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                        {Platform.OS === 'android' ?
                            <TouchableRipple
                                onPress={() => { }}
                                rippleColor="rgba(0, 0, 0, .32)"
                                style={[{
                                    backgroundColor: '#1c1c1c',
                                    height: 56,
                                    borderRadius: 24,
                                    paddingHorizontal: 16,
                                    justifyContent: 'center',
                                    flex: 1
                                }, isDarkMode ? { backgroundColor: '#1c1c1c' } : { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#cccccc' }]}>
                                <Text style={[{
                                    fontFamily: 'Inter_Regular',
                                    color: '#f5f5f5',
                                    fontSize: 16,
                                }, isDarkMode ? { color: '#f5f5f5' } : { color: '#000000' }]}>Sign In</Text>
                            </TouchableRipple>
                            :
                            <TouchableOpacity
                                onPress={() => { }}
                                style={[{
                                    backgroundColor: '#1c1c1c',
                                    height: 56,
                                    borderRadius: 24,
                                    paddingHorizontal: 16,
                                    justifyContent: 'center'
                                }, isDarkMode ? { backgroundColor: '#1c1c1c' } : { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#cccccc' }]}>
                                <Text style={[{
                                    fontFamily: 'Inter_Regular',
                                    color: '#f5f5f5',
                                    fontSize: 16,
                                }, isDarkMode ? { color: '#f5f5f5' } : { color: '#000000' }]}>Sign In</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default GetStarted;
