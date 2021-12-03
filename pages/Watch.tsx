import React from 'react'
import { StyleSheet, View, Text, Dimensions, StatusBar } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { Video } from 'expo-av'
import Header from '../widgets/Header';

const { width, height } = Dimensions.get('window')

export default function Watch() {

    const route = useRoute()
    const { title, videoUrl }:any = route.params;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Header />
            <View style={styles.videoContainer}>
            <Video
                style={styles.video}
                source={{
                    uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay={false}
                isLooping={false}
                useNativeControls
            />
            <Text style={{fontSize: 21, fontWeight: "bold"}}>
                {title}
            </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    videoContainer:{
        marginTop: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    video: {
        width: width,
        height: height / 3
    },
});
