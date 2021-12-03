import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import Card from '../widgets/Card'
import { useNavigation } from "@react-navigation/native"
import Header from '../widgets/Header'
import { useStateValue } from '../StateProvider'

export default function Home() {

    const navigator = useNavigation()

    const [search, setSearch] = useState("")

    const [{ basket }, dispatch] = useStateValue()

    const addToBasket = (id:number,title: String, price: number, imgUrl: String, type: String) => {
        // dispatch the item into the data layer
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id:id,
                title: title,
                price: price,
                imgUrl: imgUrl,
                type: type
            },
        });
    };

    const [filmsDT, setFilmsDT] = useState<Array<any>>()
    const [servicesDT, setServicesDT] = useState<Array<any>>()
    const [productsDT, setProductsDT] = useState<Array<any>>()

    const [films, setFilms] = useState<Array<any>>()
    const [services, setServices] = useState<Array<any>>()
    const [products, setProducts] = useState<Array<any>>()

    useEffect(() => {
        axios.get('http://localhost:8000/main/films/')
            .then(res => setFilmsDT(res.data))
            .catch(err => console.log(err))

        axios.get('http://localhost:8000/main/services/')
            .then(res => setServicesDT(res.data))
            .catch(err => console.log(err))

        axios.get('http://localhost:8000/main/products/')
            .then(res => setProductsDT(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        setFilms(filmsDT?.filter(filmD => filmD.title.includes(search)))
        setServices(servicesDT?.filter(serviceD => serviceD.title.includes(search)))
        setProducts(productsDT?.filter(productD => productD.title.includes(search)))
    }, [search, filmsDT, servicesDT, productsDT])

    return (
        <View style={HomeStyle.container}>
            <StatusBar barStyle="light-content" />
            <Header />
            <View style={HomeStyle.SearchContainer}>
                <TextInput
                    onChangeText={value => setSearch(value)}
                    value={search}
                    style={HomeStyle.SearchField}
                    placeholderTextColor="#444"
                    placeholder="Search ..."
                    autoCapitalize="none"
                    keyboardType="default"
                    textContentType="name"
                    autoFocus={false}
                />
                <TouchableOpacity style={HomeStyle.SearchIcon}>
                    <Icon
                        tvParallaxProperties
                        name='search'
                        type='font-awesome'
                        onPress={() => { }} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={{ marginTop: 15 }}>
                    <Text style={HomeStyle.ListTitle}>Films</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyboardShouldPersistTaps="always">
                        {films?.map(film => (
                            <Card
                                title={film['title']}
                                imgUrl={`http://localhost:8000${film["image"]}`}
                                btnText="watch"
                                btnClick={() => navigator.navigate("Watch", {
                                    title: film['title'],
                                    videoUrl: `http://localhost:8000${film["video"]}`
                                })}
                            />
                        ))}
                    </ScrollView>
                </View>

                <View style={{ marginTop: 15 }}>
                    <Text style={HomeStyle.ListTitle}>Services</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyboardShouldPersistTaps="always">
                        {services?.map(service => (
                            <Card
                                title={service['title']}
                                imgUrl={`http://localhost:8000${service["image"]}`}
                                btnText={`Buy ${service["price"]}$`}
                                btnClick={
                                    () => addToBasket(
                                        service["id"],
                                        service["title"],
                                        service["price"],
                                        `http://localhost:8000${service["image"]}`,
                                        "service"
                                    )
                                }
                            />
                        ))}
                    </ScrollView>
                </View>

                <View style={{ marginTop: 15 }}>
                    <Text style={HomeStyle.ListTitle}>Products</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyboardShouldPersistTaps="always">
                        {products?.map(product => (
                            <Card
                                title={product['title']}
                                imgUrl={`http://localhost:8000${product["image"]}`}
                                btnText={`Buy ${product["price"]}$`}
                                btnClick={
                                    () => addToBasket(
                                        product["id"],
                                        product['title'],
                                        product["price"],
                                        `http://localhost:8000${product["image"]}`,
                                        "product"
                                    )
                                }
                            />
                        ))}
                    </ScrollView>
                </View>

            </ScrollView>
        </View>
    )
}

const HomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 0
    },
    SearchContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        marginTop: 14,
        marginBottom: 7,
        borderRadius: 7,
        borderWidth: 0.2
    },
    SearchField: {
        padding: 12,
        flexGrow: 1,
    },
    SearchIcon: {
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
        padding: 12,
        backgroundColor: "#f0b363"
    },
    ListTitle: {
        fontSize: 19,
        fontWeight: "bold",
        marginLeft: 15,
    }
})
