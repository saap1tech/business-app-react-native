import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { isUserLogged, storeUserSession } from '../auth'
import { useNavigation } from "@react-navigation/native"
import axios from 'axios'

export default function Login() {

    const navigator = useNavigation()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const home: any = "Home"
    const register: any = "Register"

    const checkLogged = async () => {
        if (await isUserLogged()) {
            navigator.navigate(home)
        }
    }

    const loginAction = () => {
        axios.post("http://127.0.0.1:8000/auth/signIn/", {
            username: username,
            password: password
        }).then(res => {
            if (res.data.username.length > 0) {
                storeUserSession({
                    id: res.data.id, username: res.data.username, email: res.data.email
                })
            }
            checkLogged()
        })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        checkLogged()
    }, [])

    return (
        <View style={LoginStyle.Container}>
            <View style={LoginStyle.Header}>
                <Text style={LoginStyle.HeaderTitle}>Login</Text>
            </View>

            <View style={LoginStyle.Form}>

                <View style={LoginStyle.InputField}>
                    <TextInput
                        onChangeText={e => setUsername(e)}
                        value={username}
                        placeholderTextColor="#444"
                        placeholder="Username ..."
                        autoCapitalize="none"
                        keyboardType="default"
                        textContentType="name"
                        autoFocus={true}
                    />
                </View>

                <View style={LoginStyle.InputField}>
                    <TextInput
                        onChangeText={e => setPassword(e)}
                        value={password}
                        placeholderTextColor="#444"
                        placeholder="Password ..."
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        textContentType="password"
                    />
                </View>

                <TouchableOpacity style={LoginStyle.Btn} onPress={loginAction}>
                    <Text style={LoginStyle.BtnText}>Log In</Text>
                </TouchableOpacity>

                <View style={LoginStyle.RegContainer}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigator.navigate(register)}>
                        <Text style={{ color: "#6BB" }}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const LoginStyle = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 50,
        paddingHorizontal: 12,
    },
    Header: {
        marginTop: 120,
        alignItems: "center",
    },
    HeaderTitle: {
        fontSize: 24,
        fontWeight: "bold"
    },
    Form: {
        marginTop: 80,
    },
    InputField: {
        borderRadius: 5,
        padding: 12,
        backgroundColor: "#FAFAFA",
        marginBottom: 10,
        borderWidth: 0.2
    },
    Btn: {
        backgroundColor: "#00dcd8",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 42,
        borderRadius: 5,
        margin: 30
    },
    BtnText: {
        fontWeight: "600",
        color: "#FFF",
        fontSize: 20
    },
    RegContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        marginTop: 50
    }
})
