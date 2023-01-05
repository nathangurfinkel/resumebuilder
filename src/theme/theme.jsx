// theme.jsx is the file where you can add your custom theme

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config, components: { Switch: switchTheme } })

export default theme
