import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

type dataType = {
    title: String,
    imgUrl: string,
    btnText: String,
    btnClick: VoidFunction
}

const Card = ({ title, imgUrl, btnText, btnClick }: dataType) => {
    return (
        <View style={CardStyle.container}>
            <Image
                style={CardStyle.Img}
                resizeMode="contain"
                source={{
                    uri: imgUrl
                }}
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
        padding: 2,
        alignItems: "center",
        width: 170,
        marginRight: 13
    },
    Img: {
        width: 175,
        height: 125,
    },
    text: {
        marginTop: -10,
        fontWeight: "600",
        fontSize: 20
    },
    Btn:{
        marginTop: 7,
        backgroundColor: "#2cff02",
        alignItems: "center",
        justifyContent:"center",
        padding: 5,
        borderRadius: 7,
    },
    BtnText:{
        fontWeight: "600",
        color: "#FFF",
        fontSize: 20
    }
})

