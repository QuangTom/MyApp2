import AsyncStorage from '@react-native-community/async-storage'

const deviceStorage = {
  
    async saveJWT (key,value){
        try {
            await AsyncStorage.setItem(key,value);
        }catch (error){
            console.log('AsyncStorage Error:' + error.message)
        }
    },
    async deleteJWT() {
        try{
          await AsyncStorage.removeItem('id_token')
          return true;
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      }    
};
export default deviceStorage;