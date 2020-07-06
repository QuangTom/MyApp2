import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';

import React, {Component} from 'react';
import {View,ScrollView,SafeAreaView,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Fontisto'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import Icon4 from 'react-native-vector-icons/FontAwesome'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'

import Login from './src/scLogin/Logincomponent';
import ListSLK from '/home/quangtom/MyApp/src/scListSLK/ListSLKcomponent';
import AddEmployees from '/home/quangtom/MyApp/src/scAddEmployees/AddEmployeescomponent';
import Addworks from '/home/quangtom/MyApp/src/scAddWorks/Addworkscomponent.js';
import Registration from './src/scLogin/Registrationcomponent';
import Profile from './src/scProfile/Profilecomponent';
import Filter from '/home/quangtom/MyApp/src/scFilter/Filtercomponent';
import Exit from './src/scLogin/Exitcomponent';
import CheckIn from './src/scCheckIn/Checkincomponent';
import Charts from './src/scCharts/Chartscomponent';

console.disableYellowBox = true;


const StackNavigator = createStackNavigator({
  ListSLK: {screen: ListSLK},
  Login: {screen: Login},
  AddEmployees: {screen: AddEmployees},
  Addworks: {screen: Addworks},
  CheckIn: {screen: CheckIn},
  Filter: {screen: Filter},
},
  {
    initialRouteName:'Filter',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
});

const CustomDrawerComponent = (props)=>(
  <SafeAreaView style={{flex:1,marginTop:40}}>
    <View style={{ backgroundColor:'white',alignItems:'center',justifyContent:'center',marginBottom: 15}}>
      <Image source={require('/home/quangtom/MyApp/assets/lo-tanca.png')} style={{height:60,width:60, borderRadius:60}}/>
    </View>
    <ScrollView>
      <DrawerItems {...props}/>
      </ScrollView>
  </SafeAreaView>
)
 
const AppNavigation = createDrawerNavigator({
  Home : {screen: StackNavigator,
    navigationOptions : {
     drawerLabel: 'Danh sách khoán trong ngày',
     drawerIcon:({tintColor})=>(<Icon2 name = 'list-2' size = {23} color={tintColor}/>)}},
  Registration: {screen: Registration,
    navigationOptions : {
      drawerLabel: 'Thêm tài khoản nhân viên',
      drawerIcon:({tintColor})=>(<IconM name = 'account-box' size = {26} color={tintColor}/>)}
    },
  Filter: {screen: Filter,
    navigationOptions : {
      drawerLabel: 'Tìm kiếm nâng cao',
      drawerIcon:({tintColor})=>(<Icon2 name = 'search' size = {24} color={tintColor}/>)}
  },
  Charts: {screen: Charts,
    navigationOptions : {
      drawerLabel: 'Biểu đồ thống kê',
      drawerIcon:({tintColor})=>(<Icon4 name = 'bar-chart' size = {24} color={tintColor}/>)}
  },
  Profile: {screen: Profile,
    navigationOptions : {
     drawerLabel: 'Thông tin cá nhân',
     labelStyle: {color: 'red'},
     drawerIcon:({tintColor})=>(<Icon name = 'user' size = {24} color={tintColor}/>)}},
  
  Exit: {screen: Exit,
    navigationOptions : {
      drawerLabel: 'Thoát',
      drawerIcon:({tintColor})=>(<Icon3 name = 'exit-to-app' size = {24} color={tintColor}/>)}},
},
{
   initialRouteName:'Home',
   contentComponent: CustomDrawerComponent,
   drawerOpenRoute:'DrawerOpen',
   drawerCloseRoute:'DrawerClose',
   drawerToggleRoute:'DrawerToggle',
});

const App = createAppContainer(AppNavigation);




export default App;