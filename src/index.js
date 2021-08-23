import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import store from './store';

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <StrictMode>
                <App />
            </StrictMode>
        </BrowserRouter>
    </Provider>,
    rootElement
);
