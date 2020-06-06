import './config/reactotron'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Error from './components/ErrorBox'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Player from './components/Player'

import GlobalStyle from './styles/global'
import { Wrapper, Container, Content } from './styles/components'

import store from './store'
import Routes from './routes'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Wrapper>
                    <GlobalStyle />
                    <Container>
                        <Sidebar />
                        <Content>
                            <Error />
                            <Header />
                            <Routes />
                        </Content>
                    </Container>
                    <Player />
                </Wrapper>
            </BrowserRouter>
        </Provider>
    )
}

export default App
