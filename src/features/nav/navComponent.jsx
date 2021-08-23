import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { changeValue } from './navSlice';

const Nav = () => {
    const currentPage = useSelector((state) => state.nav.currentPage);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (event, value) => {
        if (value === 2) {
            history.push('/list');
        } else {
            history.push('/');
        }
        dispatch(changeValue(value));
    };

    return (
        <Paper>
            <Tabs
                value={currentPage}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Bar" />
                <Tab label="Doughnut" />
                <Tab label="Table" />
            </Tabs>
        </Paper>
    );
};

export default Nav;
