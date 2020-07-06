import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,AsyncStorage,ActivityIndicator,Image,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {TextInput} from 'react-native-gesture-handler';

let SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name:'MyApp.db', createFromLocation:'~MyAppDB2.db'},this.openCB, this.errorCB)

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={ChucVu:'',PhongBan:'',TenCongNhan:'',MaCongNhan:''};
        
        // \''+this.props.navigation.state.params.TenTaiKhoan+'\'
        db.transaction(tx => {
            var sql = 'select ChucVu,PhongBan,TenCongNhan,Employee.MaCongNhan as MaCongNhan FROM Employee,Users WHERE Users.TenTaiKhoan = "Admin" and Users.MaCongNhan=Employee.MaCongNhan '
            console.log("Query completed");
            tx.executeSql(sql, [], (tx, results) => {
                var row = results.rows.item(0);
                console.log('row',row)
                {
                    this.setState({ChucVu: row.ChucVu}) ;
                    this.setState({PhongBan: row.PhongBan}) ;
                    this.setState({TenCongNhan: row.TenCongNhan});
                    this.setState({MaCongNhan: row.MaCongNhan}) ;
                }
                console.log(this.state.ChucVu)
            });
          });
    }
    
    errorCB(err) {
        ToastAndroid.show("SQL Error: "+ err, ToastAndroid.SHORT)
      }
    
      successCB() {
        ToastAndroid.show("SQL executed: ", ToastAndroid.SHORT)
      }
    
      openCB() {
        console.log("Open database");
      }
    render(){
        return(
            <ImageBackground style={styles.containerLogin} source={require('/home/quangtom/MyApp/assets/SC1d8J.jpg')}>
             <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        />
            <View style={styles.headstyles}>
            <View style={{ marginRight: 40}}>
            <Icon style= {{fontSize: 30, color:'white'}} name='menu' onPress={()=>this.props.navigation.openDrawer()}/>
            </View>
            <Text style={styles.headertext}>THÔNG TIN CÁ NHÂN</Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style = {styles.aroundtext}>
                    <Text style={styles.text}>Mã công nhân   : {this.state.MaCongNhan}</Text>
                </View>
                <View style = {styles.aroundtext}>
                    <Text style={styles.text}>Họ tên                : {this.state.TenCongNhan}</Text>
                </View>
                <View style={styles.aroundtext}>
                    <Text style={styles.text}>Giới tính             : Nam</Text>
                </View>
                
                <View style={styles.aroundtext}>
                    <Text style={styles.text}>Ngày sinh          : 15/04/1997</Text>
                </View> 
                <View style={styles.aroundtext}>
                    <Text style={styles.text}>Số điện thoại    : 0707123456</Text>
                </View>
                <View style = {styles.aroundtext}>
                     <Text style={styles.text}>Phòng ban        : {this.state.PhongBan}</Text>
                </View>
                <View style={styles.aroundtext}>
                     <Text style={styles.text}>Chức vụ             : {this.state.ChucVu}</Text>
                </View>
                
               
                <View style={styles.aroundtext}>
                    <Text style={styles.text}>Email                  : LHBQuang@gmail.com</Text>
                </View>
                <View style={styles.aroundtext}>
                    <Text style={styles.text}>Địa chỉ                : Hoàng Quốc Việt, Hà Nội</Text>
                </View>
                
            </View>

            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
   
    headertext: { fontSize: 20, fontWeight: 'bold', color: 'white', marginRight: 100},
    headstyles: {  height: 50, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row',marginTop:20},
    text: { alignItems: 'flex-start', fontWeight: '100' , fontSize: 18, marginLeft: 10},
    aroundtext: {backgroundColor: 'white', borderColor: '#dadde3',height:50, justifyContent: 'center'},
    containerLogin: {flex: 1,justifyContent: 'center',opacity: 1,backgroundColor: 'rgba(255,0,0,1)'},
  });
export default Profile;