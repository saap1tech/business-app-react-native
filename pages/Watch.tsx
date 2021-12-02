import React, { useRef, useState } from 'react'
import { StyleSheet, Button, View } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { Video, AVPlaybackStatus } from 'expo-av'

export default function Watch() {

    const route = useRoute()

    return (
        <View style={styles.container}>
            <Video
                style={{ width:500, height: 300 }}
                source={{
                    uri: "http://localhost:8000/media/butterfly.mp4"
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 50,
        paddingHorizontal: 12,
    },
    video: {
        flexGrow: 1
    },
});
