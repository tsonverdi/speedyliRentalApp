import TabNavigator from './screens/navigations/tab-navigator';
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import MyContext from './store';
import { useEffect, useState } from 'react';
import colors from './utils/constants/colors';
import { en, registerTranslation } from 'react-native-paper-dates';
import Toast from 'react-native-toast-message';
import * as SecureStore from "expo-secure-store";
import { getUser } from './api/user-service';

registerTranslation("en", en);

export default function App() {
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [myUser, setMyUser] = useState();

  const theme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.color1,
      secondary: colors.color2,
      tertiary: colors.color3
    }
  }

  const getData = async () => {
    // LOAD USER INFO
    const token = await SecureStore.getItemAsync("token");
    
    if (token) {
      const responseUser = await getUser();
      setMyUser(responseUser.data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <MyContext.Provider value={{
      searchBarVisible,
      setSearchBarVisible,
      myUser,
      setMyUser
    }}>
      <PaperProvider theme={theme}>
        <TabNavigator />
        <Toast />
      </PaperProvider>
    </MyContext.Provider>
  );
}