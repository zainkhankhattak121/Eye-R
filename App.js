  import { createStackNavigator } from '@react-navigation/stack';
  import { NavigationContainer } from '@react-navigation/native';
  import HomeScreen from './Screens/HomeScreen';
  import ColorblindTestScreen from './Screens/ColorblindTestScreen';  
  import CameraScreen from './Screens/ColorIdentificationScreen';  
  import ColorIdentificationScreen from './Screens/ColorIdentificationScreen';  
  import ImageRecognitionScreen from './Screens/ImageRecognitionScreen';   
  import main_auth from './Auth_folder/main_auth.js';
  import SignUp2 from './Auth_folder/SignUp2';
  import ScreenEmailLogin2 from './Auth_folder/ScreenEmailLogin2';
  import ForgetPasswordScreen2 from './Auth_folder/Forget';
  import FrontPage  from './Screens/FrontPage';


  const Stack = createStackNavigator();

  function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="main_auth">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ColorblindTest" component={ColorblindTestScreen} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen name="ColorIdentification" component={ColorIdentificationScreen} />
          <Stack.Screen name="ImageRecognition" component={ImageRecognitionScreen} />
          <Stack.Screen name="main_auth" component={main_auth} options={{ headerShown: false }} />
          <Stack.Screen name="ForgetPasswordScreen2" component={ForgetPasswordScreen2} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp2" component={SignUp2} options={{ headerShown: false }} />
          <Stack.Screen name="EmailLogin2" component={ScreenEmailLogin2} options={{ headerShown: false }} />
          <Stack.Screen name="FrontPage" component={FrontPage} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  export default App;
