import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    useColorScheme
} from 'react-native';
import {
    Drawer
} from 'react-native-paper';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import tw from 'tailwind-react-native-classnames';
import icomoonConfig from '../../assets/fonts/icomoon/selection.json';
import { AuthContext } from './context';
import { colors, fonts } from './theme';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const DrawerContent = (props) => {
    const isDarkMode = useColorScheme() === 'dark';
    const { signOut } = React.useContext(AuthContext);

    return (
        <View style={[{ flex: 1 }, isDarkMode ? { backgroundColor: colors.dark } : { backgroundColor: colors.white }]}>
            <DrawerContentScrollView {...props}>
                <View>
                    <View>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain',
                                alignSelf: 'center',
                                marginBottom: 12,
                                marginTop: 24
                            }}
                            source={require('../../assets/icon/icon.png')}
                        />
                    </View>
                    <Text style={[tw`self-center text-2xl mb-12`, {fontFamily: fonts.Nunito_SemiBold}, isDarkMode ? tw`text-white` : {color: colors.primary}]}>Notes</Text>
                </View>
                <View>
                    <DrawerItem
                        icon={({ size }) => (
                            <Icon
                                name="user-solid"
                                size={24}
                                color={ isDarkMode ? colors.white : colors.dark}
                            />
                        )}
                        label="Profile"
                        labelStyle={ isDarkMode ? styles.label_dark : styles.label}
                        onPress={() => { props.navigation.navigate('Profile') }}
                    />
                    <DrawerItem
                        icon={({ size }) => (
                            <Icon
                                name="hammer-solid"
                                size={24}
                                color={ isDarkMode ? colors.white : colors.dark}
                            />
                        )}
                        label="Settings"
                        labelStyle={ isDarkMode ? styles.label_dark : styles.label}
                        onPress={() => { props.navigation.navigate('Setting') }}
                    />
                </View>
                {/*<View style={{ borderBottomWidth: 1, borderColor: colors.grey, marginLeft: 18, marginRight: 18 }}></View>
                <View>
                    <DrawerItem
                        icon={({ size }) => (
                            <Icon
                                name="tag-solid"
                                size={24}
                                color={ isDarkMode ? colors.white : colors.dark}
                            />
                        )}
                        label="Create New Team"
                        labelStyle={ isDarkMode ? styles.label_dark : styles.label}
                        onPress={() => props.navigation.navigate('Profile')}
                    />
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: colors.grey, marginLeft: 18, marginRight: 18 }}></View>
                <View>
                    <DrawerItem
                        icon={({ size }) => (
                            <Icon
                                name="hammer-solid"
                                size={24}
                                color={ isDarkMode ? colors.white : colors.dark}
                            />
                        )}
                        label="Settings"
                        labelStyle={ isDarkMode ? styles.label_dark : styles.label}
                        onPress={() => { props.navigation.navigate('Profile') }}
                    />
                    <DrawerItem
                        icon={({ size }) => (
                            <Icon
                                name="circle-question-solid"
                                size={24}
                                color={ isDarkMode ? colors.white : colors.dark}
                            />
                        )}
                        label="Help and Feedback"
                        labelStyle={ isDarkMode ? styles.label_dark : styles.label}
                        onPress={() => { props.navigation.navigate('Profile') }}
                    />
                        </View>*/}
            </DrawerContentScrollView>
            <Drawer.Section style={styles.drawerBottom}>
                <DrawerItem
                    icon={({ size }) => (
                        <Icon
                            name="right-from-bracket-solid"
                            size={24}
                            color={ isDarkMode ? colors.white : colors.dark}
                        />
                    )}
                    label="Sign Out"
                    labelStyle={ isDarkMode ? styles.label_dark : styles.label}
                    onPress={() => { signOut(); }}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerBottom: tw`mt-14`,
    label: [{
        fontFamily: fonts.Nunito_Regular,
        color: colors.black
    }, tw`text-base`],
    label_dark: [{
        fontFamily: fonts.Nunito_Regular,
        color: colors.white
    }, tw`text-base`]
});

export default DrawerContent;