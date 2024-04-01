import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../assets/fonts/icomoon/selection.json';

import { colors } from "./theme";

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const CustomButton = ({ onPress, text, backgroundColor, textcolor, btnstyle }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[{
            backgroundColor: backgroundColor,
            borderRadius: 36,
            paddingVertical: 13,
            width: 145,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2.5,
            borderColor: colors.white
        }, btnstyle]}>
        <Text style={{
            fontFamily: 'Inter_Regular',
            color: textcolor,
            fontSize: 16,
            marginLeft: 6,
        }}>{text}</Text>
    </TouchableOpacity>
);

const CustomIconButton = ({ onPress, iconName, text, backgroundColor, textcolor, width }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            backgroundColor: backgroundColor,
            borderRadius: 36,
            paddingVertical: 13,
            borderWidth: 2.5,
            borderColor: colors.white,
            width: width,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <Icon name={iconName} size={20} color={textcolor} />
        <Text style={{
            fontFamily: 'Inter_Regular',
            color: textcolor,
            fontSize: 16,
            marginLeft: 6,
        }}>{text}</Text>
    </TouchableOpacity>
);

const BackButton = ({ navigation }) => (
    <TouchableOpacity
        style={{
            backgroundColor: colors.black,
            borderColor: colors.white,
            borderWidth: 3,
            borderRadius: 18,
            width: 60,
            height: 60,
            justifyContent: 'center', // Center vertically
            alignItems: 'center', // Center horizontally
        }}
        onPress={() => navigation.replace('Home')}>
        <Icon
            name="angle-left-solid"
            size={20}
            color={colors.white}
        />
    </TouchableOpacity>
)

const BottomBar = ({ navigation }) => (
    <View style={{
        position: 'relative',
        marginBottom: 18,
        marginLeft: 18,
        marginRight: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }}>
        <CustomIconButton
            onPress={() => { }}
            iconName="home-regular"
            text="Home"
            backgroundColor={colors.black}
            textcolor={colors.white}
            width={138}
        />
        <TouchableOpacity
            style={{
                borderColor: colors.white,
                backgroundColor: colors.lightgrey,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2.5,
                borderRadius: 56,
                width: 56,
                height: 56
            }}
            onPress={() => navigation.navigate('Home')}>
            <Icon
                name="clock-regular"
                size={20}
                color={colors.black}
            />
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                borderColor: colors.white,
                backgroundColor: colors.lightgrey,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2.5,
                borderRadius: 56,
                width: 56,
                height: 56
            }}
            onPress={() => navigation.navigate('Profile')}>
            <Icon
                name="user-regular"
                size={20}
                color={colors.black}
            />
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                borderColor: colors.white,
                backgroundColor: colors.lightgrey,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2.5,
                borderRadius: 56,
                width: 56,
                height: 56
            }}
            onPress={() => { }}>
            <Icon
                name="menu-regular"
                size={20}
                color={colors.black}
            />
        </TouchableOpacity>
    </View>
)

export {
    BackButton, BottomBar, CustomButton,
    CustomIconButton
};

