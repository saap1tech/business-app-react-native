import React from 'react'
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'
import { Icon } from 'react-native-elements'
import { useNavigation } from "@react-navigation/native"
import { loggoutUser } from '../auth'
import { useStateValue } from '../StateProvider'

const Header = () => {

    const navigator = useNavigation()

    const home: any = "Home"
    const checkout: any = "Checkout"

    const logout = () => {
        const login: any = "Login"
        loggoutUser()
        navigator.navigate(login)
    }

    const [{ basket }] = useStateValue()

    return (
        <View style={styles.header}>
            <View style={styles.headerTop}>
                <View style={styles.headerTopLeft}>
                    <TouchableOpacity
                        onPress={logout}>
                        <Ionicons
                            name="log-out-outline"
                            color="white"
                            size={30}
                            style={{ marginBottom: 10 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigator.navigate(home)}>
                        <Ionicons
                            name="home-outline"
                            color="white"
                            size={30}
                            style={{ marginBottom: 10, marginLeft: 20 }}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.headerTopRight}
                    onPress={() => navigator.navigate(checkout)}>
                    <Ionicons
                        name="md-basket-outline"
                        size={28}
                        color="white"
                    />
                    <Text style={{ color: 'white', paddingLeft: 10, fontSize: 15 }}>
                        {basket.length}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#131921',
        zIndex: 100
    },
    headerTop: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        paddingTop: 43,
    },
    headerTopLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    headerTopRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 5
    }
})