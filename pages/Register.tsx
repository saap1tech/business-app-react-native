import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import { isUserLogged, storeUserSession } from '../auth'
import axios from 'axios'

export default function Register() {

    const navigator = useNavigation()

    const home: any = "Home"
    const login: any = "Login"

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const checkLogged = async () => {
        if (await isUserLogged()) {
            navigator.navigate(home)
        }
    }

    const registerAction = () => {
        axios.post("http://127.0.0.1:8000/auth/signUp/", {
            username: username,
            email: email,
            password: password,
            password2: password2
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
        <View style={RegisterStyle.Container}>
            <View style={RegisterStyle.Header}>
                <Text style={RegisterStyle.HeaderTitle}>Register</Text>
            </View>

            <View style={RegisterStyle.Form}>

                <View style={RegisterStyle.InputField}>
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

                <View style={RegisterStyle.InputField}>
                    <TextInput
                        onChangeText={e => setEmail(e)}
                        value={email}
                        placeholderTextColor="#444"
                        placeholder="Email ..."
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoFocus={true}
                    />
                </View>

                <View style={RegisterStyle.InputField}>
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

                <View style={RegisterStyle.InputField}>
                    <TextInput
                        onChangeText={e => setPassword2(e)}
                        value={password2}
                        placeholderTextColor="#444"
                        placeholder="Confirm Password ..."
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        textContentType="password"
                    />
                </View>

                <TouchableOpacity
                    onPress={registerAction}
                    style={RegisterStyle.Btn}>
                    <Text style={RegisterStyle.BtnText}>Create Account</Text>
                </TouchableOpacity>

                <View style={RegisterStyle.RegContainer}>
                    <Text>Do you have an account? </Text>
                    <TouchableOpacity onPress={() => navigator.navigate(login)}>
                        <Text style={{ color: "#6BB" }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const RegisterStyle = StyleSheet.create({
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
