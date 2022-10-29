import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Animated, Text } from "react-native"
import { NotificationsStack, HomeStack, MyEventsStack, ProfileStack, CreateEventStack } from "./Stacks"
import { CurvedBottomBar, setVisible } from 'react-native-curved-bottom-bar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors, typography } from '../utils'
import { useNavigation } from '@react-navigation/native'
import { useAppSettingsContext } from '../context/AppSettingsContext'

const HomeTab = () => {
    const { navigate } = useNavigation()
    const { appSettings, dispatchAppSettings } = useAppSettingsContext()
    const tabRef = React.useRef(null)

    useEffect(() => {
        dispatchAppSettings({ type: 'SET_APP_SETTINGS', payload: { setVisibleTabBottom: tabRef.current.setVisible } })
    }, [])

    const circleHandler = () => {
        navigate('CreateEventStack')
        appSettings.setVisibleTabBottom(false)
    }

    const _renderIcon = (routeName, selectedTab) => {
        let icon = '';
        let name = '';
        const color = selectedTab === routeName ? colors.primary.main : colors.gray[500];
        switch (routeName) {
            case 'HomeStack':
                icon = routeName === selectedTab ? 'home' : 'home-outline';
                name = 'الرئيسية';
                break;
            case 'MyEventsStack':
                icon = routeName === selectedTab ? 'calendar' : 'calendar-outline';
                name = 'مناسباتي';
                break;
            case 'NotificationsStack':
                icon = routeName === selectedTab ? 'notifications' : 'notifications-outline';
                name = 'الإشعارات';
                break;
            case 'ProfileStack':
                icon = routeName === selectedTab ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
                name = 'المزيد';
                break;
        }

        return (
            <View style={styles.tabContainer}>
                <Ionicons name={icon} size={25}
                    color={color}
                />
                <Text style={{ color: color, ...typography.XS.regular, fontSize: 10 }}>{name}</Text>
            </View>
        );
    };

    const renderTabBar = ({ routeName, selectedTab, navigate }) => {
        return (
            <TouchableOpacity
                onPress={() => navigate(routeName)}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                {_renderIcon(routeName, selectedTab)}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <CurvedBottomBar.Navigator
                ref={tabRef}
                initialRouteName="HomeStack"
                style={styles.bottomBar}
                strokeWidth={0.5}
                strokeColor="#DDDDDD"
                height={55}
                circleWidth={55}
                bgColor="white"
                borderTopLeftRight
                screenOptions={{ headerShown: false }}
                renderCircle={({ selectedTab, navigate }) => (
                    <Animated.View style={styles.btnCircle}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                            onPress={circleHandler}>
                            <Ionicons name={'add'} color={colors.gray[500]} size={35} />
                        </TouchableOpacity>
                    </Animated.View>
                )}
                tabBar={renderTabBar}>
                <CurvedBottomBar.Screen
                    name="HomeStack"
                    component={HomeStack}
                    position="LEFT"
                />
                <CurvedBottomBar.Screen
                    name="MyEventsStack"
                    component={MyEventsStack}
                    position="LEFT"
                />
                <CurvedBottomBar.Screen
                    name="CreateEventStack"
                    component={CreateEventStack}
                />
                <CurvedBottomBar.Screen
                    name="NotificationsStack"
                    component={NotificationsStack}
                    position="RIGHT"
                />
                <CurvedBottomBar.Screen
                    name="ProfileStack"
                    component={ProfileStack}
                    position="RIGHT"
                />
            </CurvedBottomBar.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnCircle: {
        width: 60,
        height: 60,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,
        bottom: 30,
    },
    tabContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default HomeTab