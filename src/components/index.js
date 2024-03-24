import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    Text
} from 'react-native';
import { navigationRef } from './base/RootNavigation';
import { AuthContext } from './base/context';
import { colors } from './base/theme';
import RemotePushController from './services/RemotePushController';

import GetStarted from './GetStarted';
import Home from './Home';
import Login from './Login';

const AuthStack = createStackNavigator();
const Stack = createStackNavigator();

const App = () => {
    const [appVersion, setappVersion] = React.useState('')
    //Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = React.useState(false)
    const [user, setUser] = React.useState()

    const authcontext = React.useMemo(() => ({
        signIn: (token, appversion) => {
            setuserToken(token)
            setappVersion(appversion)
        },
        signOut: () => {
            auth().signOut()
            setUser()
        }
    }));

    //Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        //_cleardata('user');
        //_storedata('user', user);
        if (initializing) setInitializing(false);
    }

    React.useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

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
            <AuthContext.Provider value={authcontext}>
                <StatusBar
                    backgroundColor={colors.primary}
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
                                children={Home}
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