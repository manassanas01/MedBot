import '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StatusBar, Text } from 'react-native';
import { navigationRef } from './base/RootNavigation';
import { AuthContext } from './base/context';
import { colors } from './base/theme';
import RemotePushController from './services/RemotePushController';

import GetStarted from './GetStarted';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Schedule from './Schedule';
import Summary from './Summary';

const AuthStack = createStackNavigator();
const Stack = createStackNavigator();

const App = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const [appVersion, setAppVersion] = useState('');

    const authContext = useMemo(() => ({
        signIn: (token, appversion) => {
            setUserToken(token);
            setAppVersion(appversion);
        },
        signOut: () => {
            auth().signOut();
            setUser(null);
        }
    }), []);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return () => subscriber(); // unsubscribe on unmount
    }, []);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    if (initializing) {
        return (
            <ActivityIndicator
                size="large"
                color={colors.primary}
            />
        )
    }

    return (
        <>
            <RemotePushController />
            <AuthContext.Provider value={authContext}>
                <StatusBar
                    backgroundColor={colors.black}
                    barStyle="light-content"
                />
                <NavigationContainer ref={navigationRef} fallback={<Text>Loading...</Text>}>
                    {user ? (
                        <Stack.Navigator
                            screenOptions={{
                                headerShown: false
                            }}
                        >
                            <Stack.Screen
                                name="Home"
                                component={Home}
                            />
                            <Stack.Screen
                                name="Profile"
                                component={Profile}
                            />
                            <Stack.Screen
                                name="Schedule"
                                component={Schedule}
                            />
                            <Stack.Screen
                                name="Summary"
                                component={Summary}
                            />
                        </Stack.Navigator>
                    ) : (
                        <AuthStack.Navigator
                            screenOptions={{
                                headerShown: false
                            }}
                        >
                            <AuthStack.Screen
                                name="Get Started"
                                component={GetStarted}
                            />
                            <AuthStack.Screen
                                name="Login"
                                component={Login}
                            />
                        </AuthStack.Navigator>
                    )}
                </NavigationContainer>
            </AuthContext.Provider>
        </>
    )
}

export default App;