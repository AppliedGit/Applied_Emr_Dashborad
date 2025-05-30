import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.js'
import { Provider } from 'react-redux'
import store from "./StoreIndex"



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)