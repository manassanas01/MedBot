import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const _storedata = async (key, val) => {
    try{
        await AsyncStorage.setItem(key, JSON.stringify(val))
    } catch (e) {
        console.log(e)
    }
}

const _retrivedata = async (key, callback) => {
    try{
        const value = await AsyncStorage.getItem(key);
        callback(value)
    } catch (e) {
        console.log(e)
    }
}

const _cleardata = async (key) => {
    try{
        await AsyncStorage.removeItem(key)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

export {
    _storedata,
    _retrivedata,
    _cleardata
}