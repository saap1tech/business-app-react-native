import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useStateValue } from '../StateProvider'

const { width } = Dimensions.get('window')

export const CheckoutCard = ({ id, imgUrl, title, price, type }: any) => {

    const [{ basket }, dispatch] = useStateValue()

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        });
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image}
                source={{ uri: imgUrl }}
                resizeMode="cover" />

            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.price}>
                    <Text style={styles.mdTxt}>{type} with $</Text>
                    <Text style={styles.mdTxt}>{price}</Text>
                </View>

                <TouchableOpacity style={styles.btn} onPress={removeFromBasket}>
                    <Text style={styles.mdTxt}> Remove from Basket</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f0f0f0",
        display: "flex",
        flexDirection: "row",
        borderRadius: 30,
        margin: 10,
        padding: 5,
        width: width - 10,
    },
    image: {
        width: (width - 10) / 2,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
    },
    info: {
        width: (width - 35) / 2,
        marginLeft: 12,
    },
    title: {
        fontSize: 19,
        fontWeight: "800",
    },
    price: {
        display: "flex",
        flexDirection: "row",
    },
    mdTxt: {
        fontSize: 15,
        fontWeight: "500",
        textAlign:"center"
    },
    btn: {
        backgroundColor: "#f0c14b",
        marginTop: 10,
        padding: 7,
        width: 170,
        borderRadius: 20,
        color: "#111",
    }
})