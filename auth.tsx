import AsyncStorage from '@react-native-async-storage/async-storage'

type dataType = {
    id: number,
    username: String,
    email: String,
}

export const storeUserSession = async ({ id, username, email }: dataType) => {
    try {
        await AsyncStorage.setItem("user_session",
            JSON.stringify({
                id: id,
                username: username,
                email: email
            })
        )
        // Congrats! You've just stored your first value!
        return true
    } catch (error) {
        // There was an error on the native side
        return false
    }
}

export const isUserLogged =  () => {
    const session = AsyncStorage.getItem("user_session");

    let result:boolean = false 
    session.then(res=>{
        if(res !== null){
            result = true
        }else{
            result = false
        }
    })
    return result
}

export const loggoutUser = async () => {
    try {
        await AsyncStorage.removeItem("user_session");
        // Congrats! You've just removed your first value!
        return true
    } catch (error) {
        // There was an error on the native side
        return false
    }
}