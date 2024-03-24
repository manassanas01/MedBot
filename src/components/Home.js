import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    useColorScheme
} from 'react-native';
import tw from 'tailwind-react-native-classnames';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../assets/fonts/icomoon/selection.json';
import { colors, fonts } from './base/theme';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const Home = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    
    return (
        <SafeAreaView style={[isDarkMode ? { backgroundColor: colors.dark } : { backgroundColor: colors.white }, tw`h-full`]}>
            <Text>Home Hii</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    note: [{
        padding: 12,
        width: 144
    }, tw`rounded-md`],
    note_title: [{
        fontFamily: fonts.Nunito_Medium
    }, tw`text-lg text-black`],
    note_text: [{
        fontFamily: fonts.Nunito_Regular
    }, tw`text-sm text-black`]
})

export default Home;