import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
const headingTheme = defineStyle({
    color: 'yellow.500',
    fontFamily: 'mono',
    fontWeight: 'semibold',
    _dark: {
        color: 'yellow.300'
    }
})
export default headingTheme;