import { useState } from 'react';
import Splash from './component/SplashScreen';
import { ThemeProvider } from 'styled-components';

const LightTheme = {
  pageBackground: 'white',
  titleColor: '#dc658b',
  tagLineColor: 'black',
};

const DarkTheme = {
  pageBackground: '#BCAAA4',
  titleColor: 'lightpink',
  tagLineColor: 'lavender',
};

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeProvider theme={themes[theme]}>
      <Splash theme={theme} setTheme={setTheme} />
    </ThemeProvider>
  );
}

export default App;
