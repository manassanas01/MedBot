import auth from '@react-native-firebase/auth';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    useColorScheme
} from 'react-native';
import tw from 'tailwind-react-native-classnames';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../assets/fonts/icomoon/selection.json';
import DrawerContent from './base/DrawerContent';
import { apiurl, colors, fonts } from './base/theme';

const Icon = createIconSetFromIcoMoon(icomoonConfig);
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
    return (
        <Drawer.Navigator
            useLegacyImplementation={true}
            initialRouteName="Home"
            drawerType='front'
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={{
                headerTitleStyle: { color: colors.white },
                headerStyle: { backgroundColor: colors.blue },
                headerTintColor: colors.white,
            }}
            drawerStyle={{
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                width: '75%'
            }}>
            <Drawer.Screen
                name="Homef"
                component={Home}
                options={{
                    headerShown: false
                }}
            />
        </Drawer.Navigator>
    )
}

const Home = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [daymoment, setdaymoment] = React.useState('');
    const [isRefreshing, setisRefreshing] = React.useState(true);
    const [searchText, setsearchText] = React.useState();
    const [isFound, setisFound] = React.useState(false);
    const [data, setdata] = React.useState();
    const [user, setuser] = React.useState();
    const [displayName, setdisplayName] = React.useState();

    const setdaymo = () => {
        let today = new Date()
        let curHr = today.getHours()

        if (curHr < 12) {
            setdaymoment('Good Morning')
        } else if (curHr < 18) {
            setdaymoment('Good Afternoon')
        } else {
            setdaymoment('Good Evening')
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            const current_user = auth().currentUser;
            setdaymo();
            setuser(current_user);
            setdisplayName(current_user.displayName);
            let unsubscribeApi;
            current_user.getIdToken(true).then((idtoken) => {
                const body = JSON.stringify({
                    "structuredQuery": {
                        "select": {
                            "fields": [
                                {
                                    "fieldPath": "title"
                                },
                                {
                                    "fieldPath": "body"
                                },
                                {
                                    "fieldPath": "user_UID"
                                }
                            ]
                        },
                        "from": [
                            {
                                "collectionId": "Note_Master"
                            }
                        ],
                        "where": {
                            "fieldFilter": {
                                "field": {
                                    "fieldPath": "user_UID"
                                },
                                "op": "EQUAL",
                                "value": {
                                    "stringValue": current_user.uid
                                }
                            }
                        },
                        "orderBy": [
                            { "field": 
                                { "fieldPath": 'updated' 
                            }, "direction": 'DESCENDING' }
                        ]
                    }
                })
                unsubscribeApi = fetch(apiurl + ":runQuery", {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + idtoken
                    },
                    body: body
                })
                    .then((response) => response.json())
                    .then((response) => {
                        setdata(response);
                        setisFound(true);
                    })
                    .catch((error) => console.error(error))
                    .finally(() => setisRefreshing(false));
            })
            return () => {
                current_user;
                unsubscribeApi;
            }
        }, [])
    );

    const onRefresh = () => {
        setisRefreshing(true);
        search(searchText);
        setisRefreshing(false);
    }

    const search = (search) => {
        setisRefreshing(true);
        const current_user = auth().currentUser;
        current_user.getIdToken(true).then((idtoken) => {
            let body = JSON.stringify({
                "structuredQuery": {
                    "select": {
                        "fields": [
                            {
                                "fieldPath": "title"
                            },
                            {
                                "fieldPath": "body"
                            },
                            {
                                "fieldPath": "user_UID"
                            }
                        ]
                    },
                    "from": [
                        {
                            "collectionId": "Note_Master"
                        }
                    ],
                    "where": {
                        "compositeFilter": {
                            "op": "AND",
                            "filters": [
                                {
                                    "fieldFilter": {
                                        "field": {
                                            "fieldPath": "user_UID"
                                        },
                                        "op": "EQUAL",
                                        "value": {
                                            "stringValue": current_user.uid
                                        }
                                    }
                                },
                                {
                                    "fieldFilter": {
                                        "field": {
                                            "fieldPath": "title"
                                        },
                                        "op": "GREATER_THAN_OR_EQUAL",
                                        "value": {
                                            "stringValue": search
                                        }
                                    }
                                },
                                {
                                    "fieldFilter": {
                                        "field": {
                                            "fieldPath": "title"
                                        },
                                        "op": "LESS_THAN",
                                        "value": {
                                            "stringValue": search + "z"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            })
            if (search == "" || search == undefined || search == null) {
                body = JSON.stringify({
                    "structuredQuery": {
                        "select": {
                            "fields": [
                                {
                                    "fieldPath": "title"
                                },
                                {
                                    "fieldPath": "body"
                                },
                                {
                                    "fieldPath": "user_UID"
                                }
                            ]
                        },
                        "from": [
                            {
                                "collectionId": "Note_Master"
                            }
                        ],
                        "where": {
                            "fieldFilter": {
                                "field": {
                                    "fieldPath": "user_UID"
                                },
                                "op": "EQUAL",
                                "value": {
                                    "stringValue": current_user.uid
                                }
                            }
                        },
                        "orderBy": [
                            { "field": 
                                { "fieldPath": 'updated' 
                            }, "direction": 'DESCENDING' }
                        ]
                    }
                })
            }
            fetch(apiurl + ":runQuery", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + idtoken
                },
                body: body
            })
                .then((response) => response.json())
                .then((response) => {
                    setdata(response);
                    //console.log(response);
                    if (!response[0].hasOwnProperty("document")) {
                        setisFound(false);
                    } else {
                        setisFound(true);
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => {
                    setisRefreshing(false)
                });
        })
    }

    React.useEffect(() => {
        const current_user = auth().currentUser;
        let unsubscribeApi;
        current_user.getIdToken(true).then((idtoken) => {
            const body = JSON.stringify({
                "structuredQuery": {
                    "select": {
                        "fields": [
                            {
                                "fieldPath": "title"
                            },
                            {
                                "fieldPath": "body"
                            },
                            {
                                "fieldPath": "user_UID"
                            },
                            { 
                                "fieldPath": 'updateTime' 
                            }
                        ]
                    },
                    "from": [
                        {
                            "collectionId": "Note_Master"
                        }
                    ],
                    "where": {
                        "fieldFilter": {
                            "field": {
                                "fieldPath": "user_UID"
                            },
                            "op": "EQUAL",
                            "value": {
                                "stringValue": current_user.uid
                            }
                        }
                    },
                    "orderBy": [
                        { "field": 
                            { "fieldPath": 'updated' 
                        }, "direction": 'DESCENDING' }
                    ],
                }
            })
            unsubscribeApi = fetch(apiurl + ":runQuery", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + idtoken
                },
                body: body
            })
                .then((response) => response.json())
                .then((response) => {
                    setdata(response);
                    setisFound(true);
                })
                .catch((error) => console.error(error))
                .finally(() => setisRefreshing(false));
        })
        return () => {
            current_user;
            unsubscribeApi;
        }
    }, []);

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

export default DrawerNav;