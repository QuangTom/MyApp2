import React, { Component } from 'react';
import { FlatList, Platform, StyleSheet, Text, View, UIManager, StatusBar, ImageBackground, LayoutAnimation, TouchableOpacity, Dimensions, Modal, BackHandler } from 'react-native';
import IconE from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconI from 'react-native-vector-icons/Ionicons';
import IconO from 'react-native-vector-icons/Octicons';
import { ScrollView } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown'

let test = [{
  value: 'Ca 1',
}, {
  value: 'Ca 2',
}, {
  value: 'Ca 3',
}];

let test2 = [{
  value: 'Pha chế dạng kem',
}, {
  value: 'Vệ sinh hết lô 2 phòng + thiết bị',
}, {
  value: 'Đóng tuýp',
}]
class ListSLK extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      loading: false,
      token: '',
      data: [],
      newData: [],
      test: [],
      error: '',
      refreshing: false,
      expanded: false,
      value: 'Chọn ca',
      value2: 'Chọn công việc',
      modalVisible: false,
    }
 
  }

  _addemployees() {
    this.props.navigation.navigate('AddEmployees')
  }

  handleRefresh=()=> {
    this.setState({
      refreshing: true,
      value: 'Chọn ca',
      value2: 'Chọn công việc',
    },
      () => { this.componentDidMount(); }
    )
  }
  setModalVisible() {
    const modalVisible = this.state.modalVisible
    this.setState({
      modalVisible: !modalVisible,
    })
  }
  hideModalVisible() {
    this.setState({
      modalVisible: false,
    })
  }
  handleCloseModal() {
    this.setState({
      modalVisible: false
    })
  }
  clearAll() {
    this.setState({
      value: 'Chọn ca',
      value2: 'Chọn công việc',
    })
  }
  // filter() {
  //     const newData =   this.state.data.filter(item => {
  //     const value = this.state.value
  //     const itemData = item.works.shifts.name.toLowerCase();
  //     const textData = value.toLowerCase();
  //     if (textData != 'chọn ca') {
  //       return itemData.toLowerCase().indexOf(textData) > -1;
  //     }
  //   })
  //   console.log('value',this.state.value)
  //   this.setState({ newData: newData })
  // }
  onClick() {
    const temp = this.state.data.slice()
    temp[index].value = !temp[index].value
    this.setState({ data: temp })

    console.log('temp', this.state.data)
  }
  toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded })
  }
  componentDidMount() {
    AsyncStorage.getItem("id_token").then((value) => {
      this.setState({ "token": value });
    })
      .then(res => {
        const headers = {
          'Authorization': this.state.token
        };
        axios({
          method: 'GET',
          url: 'http://192.168.1.8:8083/api/workAssignments/assignDate/2020-06-07?page=0&size=10',
          // 'http://192.168.43.20:8083/api/workAssignments/assignDate/${assignDate}?page=0&size=10'
          headers: headers,
        }).then((response) => {

          this.setState({
            data: response.data.data.content.sort((a, b) => a.works.shifts.name.localeCompare(b.works.shifts.name)),
            newData: response.data.data.content.sort((a, b) => a.works.shifts.name.localeCompare(b.works.shifts.name)),
            loading: false,
            refreshing: false,
          });
          console.log('data', this.state.data)
        }).catch((error) => {
          this.setState({
            error: 'Error retrieving data',
            loading: false,
            refreshing: false,
          });
        });
      });
  }
  render() {
    const data = this.state.data
    const newData = this.state.newData
    return (
      <ImageBackground style={styles.containerLogin} source={require('/home/quangtom/MyApp/assets/SC1d8J.jpg')}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'light-content'}
        />
        <View style={styles.headstyles}>

          <IconE style={{ fontSize: 30, color: 'white' }} name='menu' onPress={() => this.props.navigation.openDrawer()} />

          <Text style={styles.headertext}>DANH SÁCH KHOÁN TRONG NGÀY</Text>

          <IconE style={{ fontSize: 30, color: 'white' }} name='plus' onPress={() => this._addemployees()} />

        </View>
        <View>
          <IconM style={{ fontSize: 30, color: '#537791', marginLeft: 3, marginTop: 4, marginRight: 5.5, marginBottom: 20 }} name='filter-list' onPress={() => this.setModalVisible()} />
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.hideModalVisible()
          }}
        >
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', height: '100%' }}>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: 'row', backgroundColor: '#336699', width: '100%' }}>
              <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 4 }}>
                <IconM style={{ fontSize: 20, marginTop: 4 }} name={'filter-list'} color='white' />
                <Text style={{ color: 'white', fontWeight: 'normal', fontSize: 20 }}>Bộ lọc</Text>
              </View>
              <TouchableOpacity style={{ flexDirection: 'row', marginRight: 10 }}>
                <Text style={styles.buttonLoginText} onPress={() => this.clearAll()}>Xóa hết</Text>
                <IconM style={{ fontSize: 20, marginTop: 4, marginLeft: 4 }} color={'white'} name={'delete'} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 6, justifyContent: 'space-around', alignItems: 'center' }}>
              <View style={{ marginBottom: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 5, width: '100%', height: 33 }}>
                <Dropdown
                  value={this.state.value}
                  data={test}
                  containerStyle={styles.dropdown}
                  onChangeText={(value) => {
                    this.setState({
                      value
                    });
                  }}
                  fontSize={20}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 5, width: '100%', height: 33 }}>
                <Dropdown
                  value={this.state.value2}
                  data={test2}
                  containerStyle={styles.dropdown}
                  onChangeText={(value2) => {
                    this.setState({
                      value2
                    });
                  }}
                  fontSize={20}
                />
              </View>
              <TouchableOpacity style={styles.buttonLogin} onPress={() => this.hideModalVisible()}>
                <Text style={styles.buttonLoginText} >Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* <TouchableOpacity style={styles.row2} onPress={this.toggleExpand.bind(this)}>
                  <View style={{ flexDirection: "row" }}>
                    <IconM style={{ fontSize: 20, color: '#537791', marginLeft: 0.5, marginTop: 4, marginRight: 4 }} name='description' />
                   
                    <Text style={styles.text}>
                      Ca làm việc    : {data.filter(item=>item.id)}
                      </Text>
                     
                  </View>
                  </TouchableOpacity> */}
        <ScrollView style={{ flex: 1 }} showsHorizontalScrollIndicator={false} horizontal={false}>
          <FlatList
            contentContainerStyle={{ height: '100%', marginBottom: 40 }}
            keyExtractor={item => item.id}
            extraData={data}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            data={newData}
            renderItem={({ item, index }) =>
              <View style={styles.container}>
                <TouchableOpacity style={styles.row2} onPress={() => this.toggleExpand(index)}>
                  <View style={{ flexDirection: "row" }}>
                    <IconM style={{ fontSize: 20, color: '#537791', marginLeft: 0.5, marginTop: 4, marginRight: 4 }} name='description' />

                    <Text style={styles.text2} >
                      Ca làm việc    : {item.works.shifts.name}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: 'row' }}>
                      <IconFA5 style={{ fontSize: 16, color: '#537791', marginLeft: 3, marginTop: 4, marginRight: 5.5 }} name='tasks' />
                      <Text style={{ fontSize: 20, fontWeight: '100' }}>
                        Tên công việc:
                    </Text>
                    </View>
                    <Text style={{ marginLeft: 6, fontSize: 20, fontWeight: '100', justifyContent: 'flex-start' }}>
                      {item.works.name.substring(0, 20)}...
                    </Text>

                  </View>
                  <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: "row" }}>
                      <IconFA style={{ fontSize: 20, color: '#537791', marginLeft: 3, marginTop: 4, marginRight: 5 }} name='sticky-note-o' />
                      <Text style={styles.text2}>
                        Mô tả              : {item.description}
                      </Text>
                    </View>
                    <View style={{ backgroundColor: 'yellow', marginLeft: 20, height: 30, width: 100, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 10 }}>Còn trống : {Math.floor(Math.random() * 20) + 1} người</Text>
                    </View>
                    
                  </View>

                  {/* {
                    this.state.expanded &&
                    <View style={{ backgroundColor: 'white',borderBottomStartRadius:20, borderBottomEndRadius: 20,borderTopWidth:3 }}>
                      <View style={{ flexDirection: "row" }}>
                        <IconI style={{ fontSize: 20, color: '#537791', marginLeft: 3, marginTop: 4, marginRight: 8 }} name='md-person' />
                        <Text style={styles.text2}>
                          Tên nhân viên: {item.employees.fullName}
                        </Text>
                      </View>
                    </View>
                  } */}

                </TouchableOpacity>
              </View>
            }
          />

        </ScrollView>

      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({

  headertext: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  headstyles: { height: 50, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', marginTop: 20 },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: 'white' },
  btn: {},
  btnText: { textAlign: 'center', fontWeight: 'bold', fontSize: 15 },
  containerLogin: { flex: 1, justifyContent: 'flex-start', opacity: 1, backgroundColor: 'rgba(255,0,0,1)' },
  container: {
    flexDirection: 'column',
    marginTop: 5,
    marginBottom: 5,

  },
  container_text: {
    backgroundColor: 'white',

  },
  text2: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '100'
  },
  row2: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  dropdown: {
    width: '80%',
    justifyContent: 'center',
  },
  buttonLogin: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#336699',
    alignItems: 'center',
    height: 50,
    width: 200,
    borderRadius: 10,
    marginTop: 50
  },
  buttonLoginText: {

    color: 'white',
    fontWeight: 'normal',
    fontSize: 20,
  },
});
export default ListSLK;