import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,Dimensions,processColor,StatusBar,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {BarChart    } from 'react-native-charts-wrapper';
import {Picker} from '@react-native-community/picker';


let SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name:'MyApp.db', createFromLocation:'~MyAppDB2.db'},this.openCB, this.errorCB)
const datavalue=['Thống kê lượng công việc theo ngày',
                  'Thống kê lượng công việc theo tháng',
                  'Thống kê lượng công việc theo quý',
                  'Thống kê lượng công việc theo năm'];
class Charts extends Component {
    constructor(props){
        super(props);
        this.state = { bar: {
            detail: { 
              time_value_list: ['18/05', 
              '19/05', '20/05', '21/05', '22/05'],
              legend_list: ['Bá Quang'],
              dataset: {
                'Bá Quang': {
                  '18/05': 10,
                  '19/05': 20,
                  '20/05': 15,
                  '21/05': 40,
                  '22/05': 30,
          
                },
              }
            }
          },
          selected:'',
        }
    }
    
    getRandomColor () {
      var letters = '0123456789ABCDEF'.split('');
        var color = '#'
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * letters.length)]
        }
        return color
      }
      
    renderPicker(){
      
      items=[];
      for(let item of datavalue){
        items.push(<Picker.Item key={item} label={item} value={item}/>)
      }
      return items;
    }
    renderBar () {
        const style1 = {
          barWidth: 0.1,
          groupSpace: 0.1
        }
        const style2 = {
          barWidth: 0.1,
          groupSpace: 0.1
        }
        const style3 = {
          barWidth: 0.1,
          groupSpace: 0.1
        }
    
        const time = this.state.bar.detail.time_value_list
        const legend = this.state.bar.detail.legend_list
        const dataset = this.state.bar.detail.dataset
    
        var dataSetsValue = []
        var dataStyle = {}
        var legendStyle = {}
        var descStyle = {}
        var xAxisStyle = {}
        var yAxisStyle = {}
        var chooseStyle = {}
        var valueLegend = []
        var colorLegend = []
    
        if (legend.length === 4) {
          chooseStyle = style1
        } else if (legend.length === 3) {
          chooseStyle = style2
        } else if (legend.length === 2) {
          chooseStyle = style3
        }
    
        legend.map((legendValue) => {
          var valueLegend = []
    
          time.map((timeValue) => {
            const datasetValue = dataset[legendValue]
            const datasetTimeValue = datasetValue[timeValue]
    
            valueLegend.push(parseInt(datasetTimeValue))
          })
    
          const datasetObject = {
            values: valueLegend,
            label: legendValue,
            config: {
              drawValues: false,
              colors: [processColor(this.getRandomColor())]
            }
          }
          dataSetsValue.push(datasetObject)
        })
    
        legendStyle = {
          enabled: true,
          textSize: 14,
          form: 'SQUARE',
          formSize: 14,
          xEntrySpace: 10,
          yEntrySpace: 5,
          wordWrapEnabled: true,
        }
        dataStyle = {
          dataSets: dataSetsValue,
          config: {
            barWidth: chooseStyle.barWidth, // 0.1
            group: {
              fromX: 0,
              groupSpace: chooseStyle.groupSpace, // 0.2
              barSpace: 0.1
            }
          }
        }
        xAxisStyle = {
          valueFormatter: time,
          granularityEnabled: true,
          granularity: 1,
          axisMaximum: 5,
          axisMinimum: 0,
          centerAxisLabels: true,
        }

        return (
          <BarChart
            style={styles.bar}
            xAxis={xAxisStyle}
            chartDescription={{ text: '' }}
            data={dataStyle}
            legend={legendStyle}
            drawValueAboveBar={false}
          />
        )
      }
      render(){
        return (
          <ImageBackground style={styles.containerLogin} source={require('/home/quangtom/MyApp/assets/SC1d8J.jpg')}>
             <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        />
            <View style={styles.headstyles}>
            <View style={{marginLeft:5}}>
            <Icon style= {{fontSize: 30, color:'white'}} name='menu' onPress={()=>this.props.navigation.openDrawer()}/>
            </View>
            <Text style={styles.headertext}>Biểu đồ thống kê</Text>
            </View >
            <View style={{backgroundColor:'white',paddingLeft:5,height:70}}>
            <Picker 
            mode='dropdown'
            selectedValue={this.state.selected}
            onValueChange={(value)=>this.setState({selected:value})}>
              {this.renderPicker()}
            </Picker>
              </View>
            <ScrollView style={{backgroundColor: 'white'}}>
          {this.renderBar()}
          </ScrollView>
          </ImageBackground>
        );
      }

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    bar: {
      marginTop: 10,
      height: Dimensions.get('window').height *5/7,
      width: Dimensions.get('window').width,
      padding: 10,
      
    },
    containerLogin: {
      flex: 1,
      justifyContent: 'center',
      opacity: 1,
      backgroundColor: 'rgba(255,0,0,1)',
    },
    headstyles: {  height: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row',marginTop:20},
    headertext: { fontSize: 20, fontWeight: 'bold', color: 'white', marginRight: 120},
  });
  
export default Charts;
