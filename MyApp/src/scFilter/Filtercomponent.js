import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, UIManager, StatusBar, ImageBackground, LayoutAnimation, TouchableOpacity, FlatList, Modal } from 'react-native';
import { SearchBar } from 'react-native-elements';
import IconE from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconI from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { Dropdown } from 'react-native-material-dropdown'

let test2 = [{
  value: 'Ca 1',
}, {
  value: 'Ca 2',
}, {
  value: 'Ca 3',
}];
class Filter extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {
      loading: false,
      token: '',
      data: [],
      test: [],
      error: '',
      refreshing: false,
      expanded: false,
      newData: [],
      text: '',
      isVisible: false,
      choosenDate: moment(new Date()).format('DD/MM/YYYY'),
      value: 'Chọn ca',
      modalVisible: false ,
    }


  }
  _searchFilterFunction = text => {
    this.setState({ text });
    console.log('text', text)
    const newData = this.state.data.filter(item => {
      const itemData = `${item.employees.fullName}`;
      const textData = text.toLowerCase();
      return itemData.toLowerCase().indexOf(textData) > -1;
    });

    this.setState({ newData: newData })
  }
  handleRefresh = () => {
    this.setState({
      refreshing: true,
      value: 'Chọn ca',
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
  checkWorkId() {
    const newData = this.state.newData
    for (var x = 0; x <= Object.keys(newData).length; x++) {
      for (var y = 0; y <= Object.keys(newData).length; y++) {
        if (newData[x].works.id == newData[y].works.id) {
          // var newfullName = "fullName";
          // newData[x].employees[newfullName] = newData[y].employees.fullName;
          // delete newData[y];
          newData = [...newData]
        }
      }
    }

  }
  handlePicker = (date) => {
    this.setState({
      isVisible: false,
      choosenDate: moment(date).format('DD/MM/YYYY')
    })
  }
  hidePicker = () => {
    this.setState({
      isVisible: false,
    })
  }
  showPicker = () => {
    this.setState({
      isVisible: true,
    })
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
            newData: response.data.data.content.reduce((r,a)=>{
              r[a.works.id]=[...r[a.works.id] || [],a];
              return r;
            }),
            // newData: response.data.data.content.filter(item => item.id),
            loading: false,
            refreshing: false,

          });
          console.log('data', this.state.data)
          console.log('newData',this.state.newData)
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
          <View style={{ marginLeft: 5 }}>
            <IconE style={{ fontSize: 30, color: 'white' }} name='menu' onPress={() => this.props.navigation.openDrawer()} />
          </View>
          <Text style={styles.headertext}>Tìm kiếm nâng cao</Text>
        </View >
        <SearchBar
          inputStyle={{ backgroundColor: 'white', color: 'black' }}
          inputContainerStyle={{ backgroundColor: 'white' }}
          containerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5 }}
          placeholder="Nhập tên công nhân để tìm kiếm..."
          onChangeText={this._searchFilterFunction}
          value={text}
          autoCorrect={false} />
        <View>
          <IconM style={{ fontSize: 30, color: '#537791', marginLeft: 3, marginTop: 4, marginRight: 5.5 }} name='filter-list' onPress={() => this.setModalVisible()} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
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
              <View style={{ flex:6,flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                <View style={{flex:2, flexDirection: 'column', justifyContent: 'space-around'}}>
                  <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 5, width: Dimensions.get('screen').width*9/10, height: 33 }} onPress={this.showPicker}>
                    <Text style={{ color: 'black', fontSize: 20 }}>
                      {this.state.choosenDate}
                    </Text>
                  </TouchableOpacity>

                  <DateTimePickerModal
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlePicker}
                    onCancel={this.hidePicker}
                    mode={'date'}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 5, width: '100%', height: 33 }}>
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
                </View>
                <View style={{flex:1}}>
                <TouchableOpacity style={{ justifyContent: 'center',flexDirection: 'row',backgroundColor: '#336699',alignItems: 'center',height: 50,width: 200,borderRadius: 10,marginTop: 20}} onPress={() => this.hideModalVisible()}>
                <Text style={styles.buttonLoginText}>Xác nhận</Text>
                </TouchableOpacity>
                </View>
              </View>

            </View>
          </Modal>
        </View>

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
                    <IconM name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color='#537791' />
                  </View>
                  {
                    this.state.expanded &&
                    <View style={{ backgroundColor: 'white', borderBottomStartRadius: 20, borderBottomEndRadius: 20, borderTopWidth: 3 }}>
                      <View style={{ flexDirection: "row" }}>
                        <IconI style={{ fontSize: 20, color: '#537791', marginLeft: 3, marginTop: 4, marginRight: 8 }} name='md-person' />
                        <Text style={styles.text2}>
                          Tên nhân viên: {item.employees.fullName}
                        </Text>
                      </View>
                    </View>
                  }

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
  headerSearchButton: { justifyContent: 'center', alignItems: 'center' },
  headertext: { fontSize: 20, fontWeight: 'bold', color: 'white', marginRight: 110 },
  headstyles: { height: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 20 },
  containerLogin: { flex: 1, justifyContent: 'center', opacity: 1, backgroundColor: 'rgba(255,0,0,1)' },
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
    marginTop: 20
  },
  buttonLoginText: {

    color: 'white',
    fontWeight: 'normal',
    fontSize: 20,
  },
});
export default Filter;
