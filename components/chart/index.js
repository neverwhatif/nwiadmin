/*
import React, { Component } from 'react';
import ChartJS from 'chart.js';

class Chart extends Component {
    componentDidMount() {
        const ctx = this.canvas.getContext('2d');
        const myChart = new ChartJS(ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                }],
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }
    render() {
        return (
            <canvas ref={(c) => { this.canvas = c; }} />
        );
    }
}

export default Chart;
*/
