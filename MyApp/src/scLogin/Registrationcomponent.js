import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, TouchableOpacity, Alert, Image, ToastAndroid, ImageBackground, BackHandler } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import IconE from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconI from 'react-native-vector-icons/Ionicons';
import IconO from 'react-native-vector-icons/Octicons';
import { ScrollView } from 'react-native-gesture-handler';


class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = { numberHolder: 1, username: '', macn: '', password: '', repassword: '' }

  }
  render() {
    return (
      <ImageBackground style={styles.containerLogin} source={require('/home/quangtom/MyApp/assets/SC1d8J.jpg')}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'light-content'}
        />
        <View style={styles.headstyles}>
          <IconE style={{ fontSize: 30, color: 'white',marginLeft:5}} name='menu' onPress={() => this.props.navigation.openDrawer()} />
          <Text style={styles.headertext}>THÊM TÀI KHOẢN NHÂN VIÊN</Text>
        </View>
        <View style={{flex:1,backgroundColor:'white',paddingTop:50}}>
        <TextInput style={styles.textInput}
          placeholder="Tên đăng nhập"
          placeholderTextColor="#336699"
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username} />
        <TextInput style={styles.textInput}
          placeholder="Mã công nhân"
          placeholderTextColor="#336699"
          onChangeText={(macn) => this.setState({ macn })}
          value={this.state.macn} />
        <TextInput style={styles.textInput}
          placeholder="Mật khẩu"
          placeholderTextColor="#336699"
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry={true} />
        <TextInput style={styles.textInput}
          placeholder="Nhập lại mật khẩu"
          placeholderTextColor="#336699"
          onChangeText={(repassword) => this.setState({ repassword })}
          value={this.state.repassword}
          secureTextEntry={true}
        />
        <View style={{marginTop:70}}>
        <View style={styles.buttonLoginView}>
          <TouchableOpacity style={styles.buttonLogin} onPress={this._regis}>
            <Text style={styles.buttonLoginText}>ĐĂNG KÝ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonLoginView}>
          <TouchableOpacity style={styles.buttonExit} onPress={()=>this.props.navigation.goBack()}>
            <Text style={styles.buttonLoginText}>QUAY LẠI</Text>
          </TouchableOpacity>
        </View>
        </View>
        </View>
      </ImageBackground>
    );
  }
  _regis =()=>{

  }
  componentDidMount() {
    var randomNumber = Math.floor(Math.random() * 100) + 1;
    this.setState({ numberHolder: randomNumber })
    console.log('numberholder', this.state.numberHolder)
  }



}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLogin: { flex: 1, justifyContent: 'flex-start', opacity: 1, backgroundColor: 'rgba(255,0,0,1)' },
  containerFeedBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textInput: {
    margin: 15,
    height: 40,
    padding: 5,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#336699',
    color: 'white'

  },
  buttonLogin: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#336699',
    alignItems: 'center',
    height: 50,
    width: 200,
    borderRadius: 10,
  },
  buttonExit: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#336699',
    alignItems: 'center',
    height: 50,
    width: 140,
    borderRadius: 10,
  },

  buttonLoginText: {
    color: 'white',
    fontWeight: 'normal',
    fontSize: 20,
  },
  buttonLoginView: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },

  headertext: { fontSize: 20, fontWeight: 'bold', color: 'white' ,marginRight:50},
  headstyles: {height: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 20 },
});
export default Registration;
