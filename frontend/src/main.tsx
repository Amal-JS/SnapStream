import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";
import { store} from '../src/Redux/store.ts'
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
    <Provider store={store}>
    <App />
    </Provider>
    </NextUIProvider>
  </React.StrictMode>,
)
