import 'style-components/native';
import theme from '';

declare module 'styled-components' {
    type ThemeType = typeof theme;
    export interface DefaultTheme extends ThemeType {}  
}