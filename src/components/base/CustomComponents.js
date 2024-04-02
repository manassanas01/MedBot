import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../assets/fonts/icomoon/selection.json';

import { colors, fonts } from "./theme";

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

const BackButton = ({ onPress, style }) => (
    <TouchableOpacity
        style={[{
            backgroundColor: colors.black,
            borderColor: colors.white,
            borderWidth: 3,
            borderRadius: 20,
            width: 58,
            height: 58,
            justifyContent: 'center', // Center vertically
            alignItems: 'center', // Center horizontally
        }, style]}
        onPress={onPress}>
        <Icon
            name="angle-left-solid"
            size={20}
            color={colors.white}
        />
    </TouchableOpacity>
)

const TextBox = ({ label, value, placeholder, secureTextEntry, onChangeText, keyboardType, containerStyle, labelStyle, style }) => (
    <View style={containerStyle}>
        <Text style={[{
            fontSize: 14,
            fontFamily: fonts.Inter_Regular,
            color: colors.black,
            marginLeft: 6
        }, labelStyle]}>{label}</Text>
        <TextInput
            style={[{
                fontFamily: fonts.Inter_Regular,
                fontSize: 16,
                padding: 6,
                width: '100%',
                borderWidth: 0,
                borderBottomWidth: 0.8,
                borderColor: colors.black,
                color: colors.black
            }, style]}
            placeholder={placeholder}
            value={value}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
        />
    </View>
)

const Doctorcard = ({ name, category, starrating, reviews, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            margin: 18,
            padding: 18,
            flexDirection: 'row',
            backgroundColor: colors.lightgrey,
            borderRadius: 50
        }}>
        <View>
            <Image
                style={{
                    width: 82,
                    height: 92,
                    borderRadius: 30,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    backgroundColor: colors.white
                }}
                source={require('../../assets/images/image5.png')}
            />
        </View>
        <View style={{
            marginLeft: 18
        }}>
            <Text style={{
                fontFamily: fonts.Inter_SemiBold,
                fontSize: 16,
                color: colors.black
            }}>{name}</Text>
            <Text style={{
                fontFamily: fonts.Inter_Regular,
                fontSize: 12,
                color: '#757575'
            }}>{category}</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontFamily: fonts.Inter_Regular,
                    fontSize: 16,
                    marginTop: 6,
                    color: colors.black
                }}>{starrating}</Text>
                <Icon
                    name="star-solid"
                    size={10}
                    color={colors.black}
                    style={{
                        marginTop: 4,
                        marginLeft: 2,
                        marginRight: 4
                    }}
                />
                <Text style={{
                    fontFamily: fonts.Inter_Regular,
                    fontSize: 16,
                    marginTop: 6,
                    color: colors.black
                }}>({reviews})</Text>
            </View>
        </View>
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
    CustomIconButton, Doctorcard, TextBox
};

