import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,TouchableOpacity,AsyncStorage,ActivityIndicator,StatusBar,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';


let SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name:'MyApp.db', createFromLocation:'~MyAppDB2.db'},this.openCB, this.errorCB)

class CheckIn extends Component {
    constructor(props){
        super(props);
        this.state={TenCongNhan:''};
        db.transaction(tx => {
            var sql = 'select TenCongNhan FROM Employee,Users WHERE Users.TenTaiKhoan=\''+this.props.navigation.state.params.TenTaiKhoan+'\'  and Users.MaCongNhan=Employee.MaCongNhan '
            console.log("Query completed");
            tx.executeSql(sql, [], (tx, results) => {
                var row = results.rows.item(0);
                console.log('row',row)
                {                  
                    this.setState({TenCongNhan: row.TenCongNhan});
                }
            });
          });
    }
    _confirm = () => {
        this.props.navigation.navigate('Login')
      }
render(){
    return(
        <ImageBackground style={styles.containerLogin } source={require('/home/quangtom/MyApp/assets/SC1d8J.jpg')}>
           <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        />
        <View style={{flex:1,justifyContent:'flex-end',alignItems:'center',marginTop:60}}>
        <Icon2 name={"checkcircleo"} size={100} color={"white"}/>
        </View>
        <View style={{flex:2,flexDirection:'column',justifyContent:'flex-start',alignItems:'center',paddingTop:40}}>
       

    <Text style={{fontSize:22, color:'white'}}>Xin chào bạn {this.state.TenCongNhan}</Text>
        <Text style={{fontSize:22, color:'white', paddingTop:10}}>Chúc bạn một ngày làm việc tốt lành!!!</Text>
         <TouchableOpacity style= {styles.buttonLogin} onPress={this._confirm}>
          <Text style={styles.buttonLoginText}>XÁC NHẬN</Text>
        </TouchableOpacity>
        </View>

        </ImageBackground>
    )
}
}
const styles = StyleSheet.create({
    containerLogin: {
        flex: 1,
        justifyContent: 'center',
        opacity: 1,
        backgroundColor: 'rgba(255,0,0,1)'
      },
      buttonLoginView: {
        marginTop: 10,
        marginBottom: 20,
        flexDirection: 'column',
        alignItems: 'center',
      },
      buttonLogin: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#336699',
        alignItems: 'center',
        height: 50,
        width: 200,
        borderRadius: 10,
        marginTop:40,
      },
      buttonLoginText: {
      
        color: 'white',
        fontWeight: 'normal',
        fontSize: 20,
      },
})
export default CheckIn;
