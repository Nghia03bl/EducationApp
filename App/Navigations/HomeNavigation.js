import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Pages/Login';
import Home from '../Pages/Home'; 

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
