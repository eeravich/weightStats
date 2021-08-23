import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';

import { CHART_COLORS, transparentize } from '../../utils';
import {
    addNewData,
    deleteData,
    returnDefault,
    setFilter,
    clearFilter
} from './canvasSlice';

const showDoughnutChart = (chart, items) => {
    const vzv1StartW = items
        .filter((item) => item.vzv === 1)
        .map((item) => item.startWeight)
        .reduce((a, b) => a + b, 0);
    const vzv2StartW = items
        .filter((item) => item.vzv === 2)
        .map((item) => item.startWeight)
        .reduce((a, b) => a + b, 0);

    const vzv1CurrentW = items
        .filter((item) => item.vzv === 1)
        .map((item) => item.currentWeight)
        .reduce((a, b) => a + b, 0);
    const vzv2CurrentW = items
        .filter((item) => item.vzv === 2)
        .map((item) => item.currentWeight)
        .reduce((a, b) => a + b, 0);

    chart.config.type = 'doughnut';
    chart.config.data.labels = ['1vz', '2vz'];
    chart.config.data.datasets = [
        {
            label: 'start weight',
            data: [vzv1StartW, vzv2StartW],
            backgroundColor: [CHART_COLORS.orange, CHART_COLORS.purple]
        },
        {
            label: 'current weight',
            data: [vzv1CurrentW, vzv2CurrentW],
            backgroundColor: [CHART_COLORS.orange, CHART_COLORS.purple]
        }
    ];
    chart.config.options.plugins.title.text = 'Summary weight';
    chart.config.options.plugins.tooltip = {
        enabled: true,
        callbacks: {
            title: (context) => {
                return context[0].dataset.label || '';
            },
            label: (context) => {
                const sum = context.dataset.data.reduce((a, b) => a + b, 0);
                const percent = ((context.parsed / sum) * 100).toFixed(2);
                return `${context.label}: ${context.formattedValue} (${percent}%)`;
            }
        }
    };
    chart.update();
};

const showBarChart = (chart, items) => {
    chart.config.type = 'bar';
    chart.config.data.labels = items.map((item) => item.name);
    chart.config.data.datasets = [
        {
            label: 'startWeight',
            data: items.map((item) => item.startWeight),
            borderColor: CHART_COLORS.red,
            backgroundColor: transparentize(CHART_COLORS.red, 0.5)
        },
        {
            label: 'currentWeight',
            data: items.map((item) => item.currentWeight),
            borderColor: CHART_COLORS.blue,
            backgroundColor: transparentize(CHART_COLORS.blue, 0.5)
        }
    ];
    chart.config.options.plugins.title.text = 'Bar chart';
    chart.config.options.plugins.tooltip = {
        enabled: true
    };
    chart.update();
};

const Canvas = () => {
    const canvasRef = useRef(null);
    const items = useSelector((state) => {
        let filteredItems = state.canvas.items;
        const filters = state.canvas.filters;

        if (filters.isOnlyOld) {
            filteredItems = filteredItems.filter((item) => !item.isYoung);
        }

        if (filters.isOneVzv) {
            filteredItems = filteredItems.filter(
                (item) => item.vzv === filters.vzvNum
            );
        }

        return filteredItems;
    });
    const currentPage = useSelector((state) => state.nav.currentPage);
    const dispatch = useDispatch();
    let myChart = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current;
        myChart.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: items.map((item) => item.name),
                datasets: [
                    {
                        label: 'startWeight',
                        data: items.map((item) => item.startWeight),
                        borderColor: CHART_COLORS.red,
                        backgroundColor: transparentize(CHART_COLORS.red, 0.5)
                    },
                    {
                        label: 'currentWeight',
                        data: items.map((item) => item.currentWeight),
                        borderColor: CHART_COLORS.blue,
                        backgroundColor: transparentize(CHART_COLORS.blue, 0.5)
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Bar Chart'
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        });
    }, []);

    useEffect(() => {
        myChart.current.config.data = {
            labels: items.map((item) => item.name),
            datasets: [
                {
                    label: 'startWeight',
                    data: items.map((item) => item.startWeight),
                    borderColor: CHART_COLORS.red,
                    backgroundColor: transparentize(CHART_COLORS.red, 0.5)
                },
                {
                    label: 'currentWeight',
                    data: items.map((item) => item.currentWeight),
                    borderColor: CHART_COLORS.blue,
                    backgroundColor: transparentize(CHART_COLORS.blue, 0.5)
                }
            ]
        };
        myChart.current.update();
    }, [items]);

    useEffect(() => {
        if (currentPage === 0) {
            showBarChart(myChart.current, items);
        } else if (currentPage === 1) {
            showDoughnutChart(myChart.current, items);
        }
    }, [currentPage]);

    return (
        <div>
            <button onClick={() => dispatch(addNewData())}>add</button>
            <button onClick={() => dispatch(deleteData())}>del</button>
            <button onClick={() => dispatch(returnDefault())}>restore</button>

            <button
                onClick={() =>
                    dispatch(setFilter({ name: 'isOnlyOld', value: true }))
                }
            >
                onlyOld
            </button>
            <button
                onClick={() =>
                    dispatch(
                        setFilter({ name: 'isOneVzv', value: true, vzvNum: 1 })
                    )
                }
            >
                only1vzv
            </button>
            <button
                onClick={() =>
                    dispatch(
                        setFilter({ name: 'isOneVzv', value: true, vzvNum: 2 })
                    )
                }
            >
                only2vzv
            </button>
            <button onClick={() => dispatch(clearFilter())}>clearFilter</button>

            <canvas ref={canvasRef} width="400" height="400" />
        </div>
    );
};

export default Canvas;
