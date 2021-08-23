import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector } from 'react-redux';

export default function ListModule() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150
        },
        {
            field: 'startWeight',
            headerName: 'Weight Start',
            type: 'number',
            width: 200
        },
        {
            field: 'currentWeight',
            headerName: 'Weight Now',
            type: 'number',
            width: 200
        },
        {
            field: 'difference',
            headerName: 'Difference',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) => {
                const value =
                    (params.getValue(params.id, 'currentWeight') || 0) -
                    (params.getValue(params.id, 'startWeight') || 0);

                const percent = (
                    (value / params.getValue(params.id, 'startWeight')) *
                    100
                ).toFixed(2);

                if (value < 0 || value === 0) {
                    return `${value} (${percent}%)`;
                } else {
                    return `+${value} (${percent}%)`;
                }
            }
        }
    ];

    const items = useSelector((state) => state.canvas.items);

    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid rows={items} columns={columns} pageSize={10} />
        </div>
    );
}
