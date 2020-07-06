import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar, Modal, ImageBackground, ImageEditor, Dimensions } from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconA from 'react-native-vector-icons/AntDesign'
import IconE from 'react-native-vector-icons/Entypo'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown'
import { SearchBar } from 'react-native-elements';

let test2 = [{
  value: 'Pha chế',
}, {
  value: 'Phân liêu + HT1',
}, {
  value: 'HT2',
}, {
  value: 'Vệ sinh môi trường'
}];

class AddEmployees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      token: '',
      data: props.data,
      test: [],
      error: '',
      refreshing: false,
      expanded: false,
      value: 'Chọn tổ',
      newData: [],
      text: '',
      modalVisible: false,
    }
  }

  _addworks() {
    this.props.navigation.navigate('Addworks')
  }
  _listSLK() {
    this.props.navigation.navigate('ListSLK')
  }
  handleRefresh = () => {
    this.setState({
      refreshing: true,
      value: 'Chọn tổ',
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
  _searchFilterFunction = text => {
    this.setState({ text });
    console.log('text', text)
    const newData = this.state.data.filter(item => {
      const itemData = `${item.fullName}`;
      const textData = text.toLowerCase();
      return itemData.toLowerCase().indexOf(textData) > -1;
    });

    this.setState({ newData: newData })
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
          url: 'http://192.168.1.8:8083/api/employee/getAll?page=0&size=10',
          headers: headers,
        }).then((response) => {

          this.setState({
            data: response.data.data.content,
            newData: response.data.data.content.filter(item=>(item.id)),
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
  onClick = (index) => {
    const temp = this.state.data.slice()
    temp[index].value = !temp[index].value
    this.setState({ data: temp })

    console.log('temp', this.state.data)
  }
  render() {
    const text = this.state
    const data = this.state.data
    const newData = this.state.newData;

    return (

      <ImageBackground style={styles.containerLogin} source={require('/home/quangtom/MyApp/assets/SC1d8J.jpg')}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'light-content'}
        />
        <View style={styles.headstyles}>
          <Text style={styles.headertext}>THÊM CÔNG NHÂN</Text>
        </View>
        <SearchBar
          inputStyle={{ backgroundColor: 'white', color: 'black' }}
          inputContainerStyle={{ backgroundColor: 'white' }}
          containerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5 }}
          placeholder="Nhập tên công nhân để tìm kiếm..."
          onChangeText={this._searchFilterFunction}
          value={text}
          autoCorrect={false} />
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
                <Text style={styles.buttonLoginText}>Xóa hết</Text>
                <IconM style={{ fontSize: 20, marginTop: 4, marginLeft: 4 }} color={'white'} name={'delete'} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 6, justifyContent: 'space-around', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 5, width: '70%', height: 33, marginBottom: 20 }}>
                <Dropdown
                  value={this.state.value}
                  data={test2}
                  containerStyle={styles.dropdown}
                  onChangeText={(value) => {
                    this.setState({
                      value
                    });
                  }}
                  fontSize={20}
                />
              </View>

              <TouchableOpacity style={styles.buttonLogin} onPress={() => this.hideModalVisible()}>
                <Text style={styles.buttonLoginText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <ScrollView style={{ flex: 1 }} showsHorizontalScrollIndicator={false} horizontal={true}>
          <FlatList
            extraData={data}
            keyExtractor={item => item.id}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            data={newData}
            renderItem={({ item, index }) =>
              <View style={styles.container}>
                <TouchableOpacity style={item.value ? styles.btnActive : styles.btnInActive} onPress={() => this.onClick(index)}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <IconA style={{ fontSize: 20, color: '#537791', marginLeft: 3, marginTop: 4, marginRight: 5.5 }} name='idcard' />
                        <Text style={styles.itemInActive} >Mã công nhân :</Text>
                        <Text style={styles.itemInActive} > {item.id}</Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <IconI style={{ fontSize: 20, color: '#537791', marginLeft: 3, marginTop: 4, marginRight: 8 }} name='md-person' />
                        <Text style={styles.itemInActive} >Họ và tên </Text>
                        <Text style={{ fontSize: 20, color: 'black', marginLeft: 3.5 }} >        : {item.fullName}</Text>
                      </View >
                      {/* <View style={{flexDirection:'row'}}>
                  <Text style={styles.itemInActive} >Ngày sinh :</Text>
                  <Text style={styles.itemInActive} >{item.birthday}</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                  <Text style={styles.itemInActive} >Giới tính :</Text>
                  <Text style={styles.itemInActive} >{item.sex}</Text>
                  </View> */}

                      {/* <Text style={styles.itemInActive} >{item.department}</Text> */}

                    </View >
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 10 }}>
                      <IconM name={'check-circle'} size={24} color={item.value ? 'green' : 'darkgray'} />
                    </View>
                  </View>

                </TouchableOpacity>
              </View>
            } />

        </ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ justifyContent: 'flex-start', flexDirection: 'row' }} onPress={() => this._listSLK()}>
            <IconI name={"ios-arrow-back"} size={60} color="white" />
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, color: "white" }}>Quay lại</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ justifyContent: 'flex-end', flexDirection: 'row' }} placeholder onPress={() => this._addworks()}>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, color: "white" }}>Xác nhận</Text>
            </View>
            <IconI name={"ios-arrow-forward"} size={60} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }

}
const styles = StyleSheet.create({

  headertext: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  headstyles: { height: 50, alignItems: "center", justifyContent: 'center', marginTop: 20 },
  container: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    width: '100%',

  },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: 'white' },
  btn: {},
  btnText: { textAlign: 'center', fontWeight: 'bold', fontSize: 15 },
  containerLogin: { flex: 1, justifyContent: 'center', opacity: 1, backgroundColor: 'rgba(255,0,0,1)' },
  btnActive: {
    alignItems: 'flex-start',
    fontSize: 20,
    backgroundColor: 'lightgreen',
    width: Dimensions.get('window').width,
    borderRadius: 10,
  },
  btnInActive: {
    alignItems: 'flex-start',
    fontSize: 20,
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    borderRadius: 10,
  },
  itemActive: {
    fontSize: 20,
    color: 'red',
  },
  itemInActive: {
    fontSize: 20,
    color: 'black',
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
export default AddEmployees;