import React from 'react';
import Paper from '@material-ui/core/Paper';
import Nav from './features/nav/navComponent.jsx';

import Modules from './modules/modules.jsx';

export default function App() {
    return (
        <Paper>
            <Nav />
            <Modules />
        </Paper>
    );
}
