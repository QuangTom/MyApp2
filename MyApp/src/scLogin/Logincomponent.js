import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,TouchableOpacity,Alert,BackHandler, ImageBackground,Dimensions,StatusBar} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import moment from 'moment'

class Login extends Component{
    constructor(props){
      super(props);
      this.state = {
        username:'',password:'', error: '',loading: false, 
      }

      this._signIn = this._signIn.bind(this);
      this._signInFail = this._signInFail.bind(this);
    }
    render(){
      const today = this.state.currentDate;
      const day = moment(today).format("dddd");
      const date = moment(today).format("MMMM D, YYYY");
      return(
        
          <ImageBackground style={styles.containerLogin } source={require('/home/quangtom/MyApp/assets/SC1d8J.jpg')}>
           <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        />
          <View style={{alignItems:'flex-end',paddingBottom:50,paddingRight:10}}>
           <Text style={styles.day}>
              {day}
           </Text>
           <Text style={styles.day}>
              {date}
           </Text>
            </View>
          <View style={{flexDirection:'row',justifyContent:'center',}}>
          <Image source={require('/home/quangtom/MyApp/assets/lo-tanca.png')} style={{height:100,width:100, borderRadius:60 }}/>
          </View>
          <Text style ={{fontSize: 28, textAlign: 'center',marginTop: 30,color: 'white'}}>NHẬT KÝ</Text>
          <Text style ={styles.login}>SẢN LƯỢNG KHOÁN</Text>
          <TextInput style={styles.textInput} 
          placeholder="Tên đăng nhập"
          placeholderTextColor= "#336699"
          onChangeText={(username)=>this.setState({username})} 
          value={this.state.username}
         
          />
          <TextInput style={styles.textInput} 
          placeholder="Mật khẩu" 
          placeholderTextColor= "#336699"
          onChangeText={(password)=>this.setState({password})} 
          value={this.state.password}
          secureTextEntry={true}/>
           <View>
        </View>
       <View style = {styles.buttonLoginView}>
        <TouchableOpacity style= {styles.buttonLogin} onPress={this._signIn}>
          <Text style={styles.buttonLoginText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        </View>
        <View style = {styles.buttonLoginView}>
        <TouchableOpacity style= {styles.buttonExit} onPress={this._backPressed}>
        <Text style={styles.buttonLoginText}>THOÁT</Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>
      );
    }
   _backPressed = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn thoát ứng dụng không ?',
      [
        {text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Có', onPress: () => BackHandler.exitApp()},
      ],
      { cancelable: false });
      return true;
  }
  _signIn = ()=> {
    const { username, password } = this.state;
    this.setState({ error: '', loading: true });
    axios.post("http://192.168.1.8:8083/api/account/token",{
        email: username,
        password: password
    })
    .then((response) => {
      deviceStorage.saveJWT("id_token", response.data.data);
      Alert.alert("Thông báo","Bạn đã đăng nhập thành công",[{text:"OK",onPress:()=>this.props.navigation.navigate('ListSLK')}])

      console.log('id_token_value',response.data.data)
    })
    .catch((error) => {
      Alert.alert("Thông báo","Không đăng nhập thành công. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu");
      console.log(error);
    });
    }

    _signInFail() {
      this.setState({
        error: 'Login Failed',
        loading: false
      });
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    containerLogin: {
      flex: 1,
      justifyContent: 'center',
      opacity: 1,
      backgroundColor: 'rgba(255,0,0,1)'
    },
    containerFeedBack: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerFeedBack2: {
      justifyContent: 'flex-start',
    },
    containerCatchUp: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      
    },
    header: {
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#f2c252',
      justifyContent: 'space-between',
    
    },
    headerNewStories: {
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: '#f2c252',
      justifyContent: 'space-between',
    },
    headerMyProfile:{
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: '#f2c252',
      justifyContent: 'flex-start',
    },
    headerTitle: {
      flexDirection: 'column',
      
    },
    headerListButton: {
      width: 55,
      justifyContent :'center',
      alignItems:'center',
    },
    headerSearchButton: {
      // width: 40,
      justifyContent :'center',
      alignItems:'center',
  
    },
    headerMoreButton: {
      // width: 40,
      justifyContent :'center',
      alignItems:'center',
    },
    content: {
      flexDirection: 'row',
      backgroundColor: '#edf2ef',
      borderTopWidth: 0.5,
      borderTopColor: 'white',
    },
    content1: {
      flex: 1,
      paddingLeft: 3,
  
    },
    contentText1: {
      fontSize: 17,
      flex: 1,
      fontWeight:'500',
    },
    contentText2: {
      fontSize: 13,
      fontStyle: 'italic',
      flex: 1,
    },
    contentText3: {
      fontSize: 13,
      flex: 1,
    },
    title: {
      alignSelf: 'flex-start',
      fontWeight: '600',  
      fontSize: 18,
    },
    title2: {
      alignSelf: 'flex-start',
      fontWeight: '400',
      fontSize: 16,
    },
    top: {
    },
    bottom: {
      flex: 1,
    },
    icon: {
      alignItems: 'center',
    },
    areas: {
      width: 60,
      backgroundColor: '#f7dfa8',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentNearText: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
    },
    screenStyles: {
    },
    textInput: {
      margin: 15,
      height: 40,
      padding: 5,
      fontSize: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#336699',
      color:'white'
      
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
    login: {
      fontSize: 28,
      textAlign: 'center',
      margin: 10,
      fontWeight: 'bold',
      color: 'white'
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
    buttonFeedBackView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }, 
    feedbackText:{
      fontSize: 20,
      textAlign:'center',
    },
    day:{
      fontSize: 20,
      color: "#fff",
      textAlign:"right",
      fontWeight: 'bold'
     },
     small:{
      fontSize: 20,
      color: "#fff",
      fontWeight: 'bold'
     }
  });
  export default Login;
