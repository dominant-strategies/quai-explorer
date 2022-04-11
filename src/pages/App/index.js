import { useCallback, useMemo, useState } from 'react'
import { ChakraProvider, Portal, Divider } from '@chakra-ui/react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import theme from '../../theme/theme'
import MainPanel from '../../components/Layout/MainPanel'
import PanelContainer from '../../components/Layout/PanelContainer'
import PanelContent from '../../components/Layout/PanelContent'
import NavBar from '../../components/NavBar/NavBar'

import FloatingButton from '../../components/FloatingButton/FloatingButton'

import { routes } from '../../constants/routes'

import Footer from '../../components/Footer/Footer'

import AppContext from '../../components/AppContext/AppContext'

export default function App() {
    // GLOBAL STATE

    const [blocksMiniTableisLoading, setBlocksMiniTableIsLoading] =
        useState(false)

    const toggleBlocksMiniTableIsLoading = useCallback(() => {
        setBlocksMiniTableIsLoading(!blocksMiniTableisLoading)
    }, [setBlocksMiniTableIsLoading, blocksMiniTableisLoading])

    const showBlocksMiniTableIsLoading = useCallback(() => {
        setBlocksMiniTableIsLoading(true)
    }, [setBlocksMiniTableIsLoading])

    const [transactionsMiniTableisLoading, setTransactionsMiniTableisLoading] =
        useState(false)
    const toggleTransactionsMiniTableisLoading = useCallback(() => {
        setTransactionsMiniTableisLoading(!transactionsMiniTableisLoading)
    }, [setTransactionsMiniTableisLoading, transactionsMiniTableisLoading])

    const globalState = useMemo(
        () => ({
            blocksMiniTableisLoading,
            setBlocksMiniTableIsLoading,
            toggleBlocksMiniTableIsLoading,
            showBlocksMiniTableIsLoading,
            transactionsMiniTableisLoading,
            setTransactionsMiniTableisLoading,
            toggleTransactionsMiniTableisLoading,
        }),
        [
            blocksMiniTableisLoading,
            setBlocksMiniTableIsLoading,
            toggleBlocksMiniTableIsLoading,
            showBlocksMiniTableIsLoading,
            transactionsMiniTableisLoading,
            setTransactionsMiniTableisLoading,
            toggleTransactionsMiniTableisLoading,
        ],
    )

    return (
        <AppContext.Provider value={globalState}>
            <ChakraProvider theme={theme} resetCss={false}>
                <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
                    <MainPanel
                        w={{
                            base: '100%',
                            xl: 'calc(100% - 50px)',
                        }}
                    >
                        <Portal>
                            <NavBar />
                        </Portal>

                        <PanelContent>
                            <PanelContainer>
                                <Routes>
                                    {routes.map((route) => (
                                        <Route
                                            path={route.path}
                                            element={route.component}
                                            key={route.id}
                                        />
                                    ))}
                                </Routes>
                            </PanelContainer>
                        </PanelContent>

                        <Divider maxWidth="calc(100vw - 100px)" />

                        <Portal>
                            <Footer />
                        </Portal>

                        <Portal>
                            <FloatingButton />
                        </Portal>
                    </MainPanel>
                </BrowserRouter>
            </ChakraProvider>
        </AppContext.Provider>
    )
}
