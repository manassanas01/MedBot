import React from "react";
import { Image, Text, View } from "react-native";
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../assets/fonts/icomoon/selection.json';
import { colors, fonts } from "./theme";

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const Doctorcard = ({ name, category, starrating, reviews }) => {
    return (
        <View style={{
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
        </View>
    )
}

export default Doctorcard;