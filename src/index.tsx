// REACT IMPORT
import React from 'react'

// REACT-DOM IMPORT
import ReactDOM from 'react-dom/client'

// REDUX IMPORTS
import { Provider } from 'react-redux'
import { store } from './redux/store/store'

// APP IMPORT
import App from './App'

// STYLES IMPORTS
import './styles/index.scss'

const rootElement = document.getElementById('root')
if (rootElement == null) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
