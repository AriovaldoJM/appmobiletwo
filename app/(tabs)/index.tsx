import { StatusBar} from 'react-native';
import { ThemeProvider } from "styled-components/native";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from '@/src/components/Loading';

import theme from '../../src/theme';
import { Players } from '@screens/Players';

export default function Home() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent" 
      />
      { fontsLoaded ? <Players/> : <Loading /> }
    </ThemeProvider>
  );
}


