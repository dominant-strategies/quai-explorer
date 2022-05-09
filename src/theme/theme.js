import { extendTheme } from '@chakra-ui/react'

import { globalStyles } from './styles'
import { font } from './foundations/fonts'
import { breakpoints } from './foundations/breakpoints'

import { buttonStyles } from './components/button'
import { badgeStyles } from './components/badge'
import { linkStyles } from './components/link'
import { drawerStyles } from './components/drawer'

import { CardStyle } from './additions/card/Card'
import { CardBodyStyle } from './additions/card/CardBody'
import { CardHeaderStyle } from './additions/card/CardHeader'

import { MainPanelStyle } from './additions/layout/MainPanel'
import { PanelContentStyle } from './additions/layout/PanelContent'
import { PanelContainerStyle } from './additions/layout/PanelContainer'

export default extendTheme(
    globalStyles,
    font,
    { breakpoints },
    {
        colors: {
            brand: {
                300: '#ec4d37',
            },
            paxosRed: {
                100: '#EE6363',
                200: '#C73D3D',
                300: '#A11616',
            },
            cyprusGreen: {
                100: '#8DD181',
                200: '#74B768',
                300: '#5A9E4E',
            },
            hydraBlue: {
                100: '#5A75AD',
                200: '#415C94',
                300: '#27427A',
            },
        },
    },

    buttonStyles,
    badgeStyles,
    linkStyles,
    drawerStyles,

    CardStyle,
    CardBodyStyle,
    CardHeaderStyle,
    MainPanelStyle,
    PanelContentStyle,
    PanelContainerStyle,
)
