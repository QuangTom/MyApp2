import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,BackHandler,AsyncStorage,ActivityIndicator,StoryList,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/MaterialIcons';
import deviceStorage from '../services/deviceStorage';


class Exit extends Component {
    constructor(props){
        super(props);
        this.state = {}}
    render(){
        return(
            deviceStorage.deleteJWT(),
            BackHandler.exitApp()
        )
    }
}

export default Exit;