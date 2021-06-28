import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import Layout from "./template/Layout";
import {ConfigureStore} from "./redux/configureStore";

const store = ConfigureStore();


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Layout/>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;