import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoard from "./screens/OnboardLogin/OnBoard.js"
import Register from "./screens/OnboardLogin/Register.js"
import Login from "./screens/OnboardLogin/Login.js"
import Dashboard from "./screens/Dashboard/Dashboard.js"
import Account from "./screens/Account/Account.js"
import Note from "./screens/Note/Note.js"
import Reminders from "./screens/Reminders/Reminders.js"
import Lecture from "./screens/Lecture/Lecture.js"
import EachDay from "./screens/Lecture/EachDay.js"
import AddLecture from "./screens/Lecture/AddLecture"
import AddReminder from "./screens/Reminders/AddReminder"
import Theme from "./screens/Account/Themes"
import About from "./screens/Account/About"
import EditReminders from "./screens/Reminders/EditReminders"

import 'react-native-url-polyfill/auto'; // Polyfills URL and URLSearchParams
import 'react-native-get-random-values'; // Ensures crypto.getRandomValues() works
import { decode, encode } from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoard">
        <Stack.Screen component={OnBoard} name="OnBoard" options={{headerShown: false}} />
        <Stack.Screen component={Register} name="Register" options={{headerShown: false}} />
        <Stack.Screen component={Login} name="Login" options={{headerShown: false}} />
        <Stack.Screen component={Dashboard} name="Dashboard" options={{headerShown: false}} />
        <Stack.Screen component={Account} name="Account" options={{headerShown: false}} />
        <Stack.Screen component={Note} name="Note" options={{headerShown: false}} />
        <Stack.Screen component={Reminders} name="Reminders" options={{headerShown: false}} />
        <Stack.Screen component={Lecture} name="Lecture" options={{headerShown: false}} />
        <Stack.Screen component={EachDay} name="EachDay" options={{headerShown: false}} />
        <Stack.Screen component={AddLecture} name="AddLecture" options={{headerShown: false}} />
        <Stack.Screen component={AddReminder} name="AddReminder" options={{headerShown: false}} />
        <Stack.Screen component={Theme} name="Theme" options={{headerShown: false}} />
        <Stack.Screen component={About} name="About" options={{headerShown: false}} />
        <Stack.Screen component={EditReminders} name="EditReminders" options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
