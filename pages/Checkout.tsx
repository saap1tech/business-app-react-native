import React from "react"
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getBasketTotal } from "../reducer";
import { useStateValue } from "../StateProvider";
import { CheckoutCard } from "../widgets/CheckoutCard";
import Header from "../widgets/Header";

export default function Checkout() {

    const [{ basket }] = useStateValue()

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Header />
            {basket.length > 0 ? (
                <ScrollView>
                    {basket.map(item => (
                        <CheckoutCard
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            imgUrl={item.imgUrl}
                            type={item.type}
                        />
                    ))}
                    <TouchableOpacity style={styles.btn}>
                        <Text style={{fontSize:22,fontWeight:"500",textAlign:"center"}}>
                            {`Subtotal $${getBasketTotal(basket)}`}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            ) : (
                <Text style={{ margin: 20, fontWeight: "500", fontSize: 22, textAlign: "center" }}>
                    There is no product in your basket
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 0
    },
    btn: {
        backgroundColor: "#f0984b",
        margin: 10,
        padding: 7,
        borderRadius: 20,
        color: "#111",
        shadowOpacity:0.2
    }
})
