import React from "react"
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"

type dataType = {
    title: String,
    imgUrl: string,
    btnText: String,
    btnClick: VoidFunction
}

const Card = ({ title, imgUrl, btnText, btnClick }: dataType) => {
    return (
        <View style={CardStyle.container}>
            <ImageBackground
                style={CardStyle.Img}
                source={{
                    uri: imgUrl
                }}
                resizeMode="cover"
            />

            <Text style={CardStyle.text}>{title}</Text>
            <TouchableOpacity onPress={btnClick} style={CardStyle.Btn}>
                <Text style={CardStyle.BtnText}>{btnText}</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Card

const CardStyle = StyleSheet.create({
    container: {
        flex: 1,
        height: 220,
        width: 307,
        marginHorizontal: 15,
        backgroundColor: "white",
        borderRadius: 35,
        overflow: "hidden",
        marginBottom: 30,
    },
    Img: {
        flex: 1,
        justifyContent: "center",
    },
    desc: {
        alignItems: "center",
        marginTop: 15
    },
    text: {
        color: "white",
        fontSize: 22,
        lineHeight: 24,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a2",
    },
    Btn: {
        backgroundColor: "#2cff02",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderRadius: 7,
    },
    BtnText: {
        fontWeight: "600",
        color: "#FFF",
        fontSize: 20
    }
})

