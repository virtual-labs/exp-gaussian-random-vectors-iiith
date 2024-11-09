// // Sub Experiment 2: Gaussian RV Realizations
// const ctxHistogram = document.getElementById('histogramChart').getContext('2d');
// const histogramChart = new Chart(ctxHistogram, {
//     type: 'bar',
//     data: {
//         datasets: [{
//             label: 'Histogram',
//             backgroundColor: 'rgba(75, 192, 192, 0.5)',
//             borderColor: 'rgb(75, 192, 192)',
//             borderWidth: 1
//         }]
//     },
//     options: {
//         responsive: true,
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Value'
//                 }
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Frequency'
//                 }
//             }
//         }
//     }
// });

// function generateGaussianRealizations() {
//     const numPoints = parseInt(document.getElementById('numPoints').value);
//     const sigma = parseFloat(document.getElementById('sigma').value);
    
//     const realizations = Array.from({ length: numPoints }, () => randomNormal(0, sigma));
//     const pointsInRange = realizations.filter(x => x >= -2 * sigma && x <= 2 * sigma).length;
//     const percentageInRange = (pointsInRange / numPoints) * 100;

//     document.getElementById('pointsInRange').textContent = pointsInRange;
//     document.getElementById('percentageInRange').textContent = percentageInRange.toFixed(2);

//     const binCount = Math.ceil(Math.sqrt(numPoints));
//     const histogramData = calculateHistogram(realizations, binCount);

//     histogramChart.data.labels = histogramData.map(bin => bin.x);
//     histogramChart.data.datasets[0].data = histogramData.map(bin => bin.y);
//     histogramChart.update();
// }

// function calculateHistogram(data, binCount) {
//     const min = Math.min(...data);
//     const max = Math.max(...data);
//     const binWidth = (max - min) / binCount;

//     const bins = Array.from({ length: binCount }, (_, i) => ({
//         x: min + i * binWidth + binWidth / 2,
//         y: 0
//     }));

//     data.forEach(value => {
//         const index = Math.min(Math.floor((value - min) / binWidth), binCount - 1);
//         bins[index].y++;
//     });

//     return bins;
// }

// function randomNormal(mean, stdDev) {
//     let u = 0, v = 0;
//     while (u === 0) u = Math.random();
//     while (v === 0) v = Math.random();
//     return mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
// }

// document.getElementById('generateButton').addEventListener('click', generateGaussianRealizations);

// // Tab handling
// document.addEventListener('DOMContentLoaded', () => {
//     const tabs = document.querySelectorAll('.v-tabs li');
//     const contents = document.querySelectorAll('.v-content');

//     tabs.forEach((tab, index) => {
//         tab.addEventListener('click', () => {
//             tabs.forEach(t => t.classList.remove('is-active'));
//             contents.forEach(c => c.classList.remove('is-active'));

//             tab.classList.add('is-active');
//             contents[index].classList.add('is-active');

//             // Trigger chart updates when switching tabs
//             if (index === 0) {
//                 update1DChart();
//                 update2DPlot();
//             } else if (index === 1) {
//                 generateGaussianRealizations();
//             }
//         });
//     });
// });


// document.addEventListener('DOMContentLoaded', () => {
//     generateGaussianRealizations();
// });

// --------------------------------------------------------------------

// // Initialize chart
// const ctx = document.getElementById('gaussianChart').getContext('2d');
// let gaussianChart;

// // Box-Muller transform for generating Gaussian random numbers
// function generateGaussian(mean = 0, stdDev = 1) {
//     let u = 0, v = 0;
//     while (u === 0) u = Math.random();
//     while (v === 0) v = Math.random();
//     return mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
// }

// // Initialize the chart
// function initChart() {
//     const data = {
//         datasets: [{
//             label: 'Gaussian PDF',
//             data: generateGaussianCurve(),
//             borderColor: 'rgb(75, 192, 192)',
//             borderWidth: 2,
//             type: 'line',
//             pointRadius: 0
//         }]
//     };

//     const config = {
//         type: 'scatter',
//         data: data,
//         options: {
//             responsive: true,
//             scales: {
//                 x: {
//                     type: 'linear',
//                     position: 'bottom',
//                     min: -4,
//                     max: 4,
//                     title: {
//                         display: true,
//                         text: 'Standard Deviations (σ)'
//                     }
//                 },
//                 y: {
//                     min: 0,
//                     max: 0.5,
//                     title: {
//                         display: true,
//                         text: 'Probability Density'
//                     }
//                 }
//             },
//             plugins: {
//                 annotation: {
//                     annotations: {
//                         line1: {
//                             type: 'line',
//                             yMin: 0,
//                             yMax: 0.5,
//                             xMin: -2,
//                             xMax: -2,
//                             borderColor: 'rgb(255, 99, 132)',
//                             borderWidth: 2,
//                             label: {
//                                 content: '-2σ',
//                                 enabled: true
//                             }
//                         },
//                         line2: {
//                             type: 'line',
//                             yMin: 0,
//                             yMax: 0.5,
//                             xMin: 2,
//                             xMax: 2,
//                             borderColor: 'rgb(255, 99, 132)',
//                             borderWidth: 2,
//                             label: {
//                                 content: '2σ',
//                                 enabled: true
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     };

//     gaussianChart = new Chart(ctx, config);
// }

// // Generate points for the Gaussian curve
// function generateGaussianCurve() {
//     const points = [];
//     for (let x = -4; x <= 4; x += 0.1) {
//         points.push({
//             x: x,
//             y: (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-(x * x) / 2)
//         });
//     }
//     return points;
// }

// // Generate and display samples
// function generateSamples(count) {
//     // Generate new samples
//     const samples = Array.from({ length: count }, () => generateGaussian(0, 1));
    
//     // Calculate percentage within 2 sigma
//     const inRange = samples.filter(x => x >= -2 && x <= 2).length;
//     const percentage = (inRange / count) * 100;

//     // Update stats display
//     document.getElementById('stats').innerHTML = `
//         Number of samples: ${count}<br>
//         Samples within ±2σ: ${percentage.toFixed(2)}% (Expected: 95%)
//     `;

//     // Update chart
//     gaussianChart.data.datasets = [
//         // Keep the Gaussian PDF curve
//         {
//             label: 'Gaussian PDF',
//             data: generateGaussianCurve(),
//             borderColor: 'rgb(75, 192, 192)',
//             borderWidth: 2,
//             type: 'line',
//             pointRadius: 0
//         },
//         // Add sample lines
//         ...samples.map((sample, index) => ({
//             label: `Sample ${index + 1}`,
//             data: [{ x: sample, y: 0 }, { x: sample, y: 0.4 }],
//             borderColor: `rgba(54, 162, 235, 0.3)`,
//             borderWidth: 1,
//             type: 'line',
//             showLine: true,
//             pointRadius: 0
//         }))
//     ];

//     gaussianChart.update();
// }

// // Initialize the chart when the page loads
// document.addEventListener('DOMContentLoaded', initChart);

// ----------------------------------------------------------------

let gaussianChart;

function generateGaussian(mean = 0, stdDev = 1) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function initChart() {
    const ctx = document.getElementById('gaussianChart').getContext('2d');
    
    // Generate points for the Gaussian curve
    const gaussianPoints = [];
    for (let x = -4; x <= 4; x += 0.1) {
        gaussianPoints.push({
            x: x,
            y: (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-(x * x) / 2)
        });
    }

    gaussianChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    // Gaussian PDF curve
                    label: 'Gaussian PDF',
                    data: gaussianPoints,
                    borderColor: 'rgb(255, 0, 0)',
                    borderWidth: 2,
                    showLine: true,
                    pointRadius: 0,
                },
                {
                    // -2σ line
                    label: '-2σ',
                    data: [{ x: -2, y: 0 }, { x: -2, y: 0.4 }],
                    borderColor: 'black',
                    borderWidth: 2,
                    showLine: true,
                    pointRadius: 0,
                },
                {
                    // +2σ line
                    label: '2σ',
                    data: [{ x: 2, y: 0 }, { x: 2, y: 0.4 }],
                    borderColor: 'black',
                    borderWidth: 2,
                    showLine: true,
                    pointRadius: 0,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false // Hide the legend
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: -4,
                    max: 4,
                    title: {
                        display: true,
                        text: 'Standard Deviations (σ)'
                    }
                },
                y: {
                    min: 0,
                    max: 0.5,
                    title: {
                        display: true,
                        text: 'Probability Density'
                    }
                }
            }
        }
    });
}

function generateSamples(count) {
    // Generate new samples
    const samples = Array.from({ length: count }, () => generateGaussian(0, 1));
    
    // Calculate percentage within 2 sigma
    const inRange = samples.filter(x => x >= -2 && x <= 2).length;
    const percentage = (inRange / count) * 100;

    // Update stats display
    document.getElementById('stats').innerHTML = `
        Samples within (-2σ, 2σ): ${percentage.toFixed(2)}% (Expected: 95%)
    `;

    // Create new datasets array starting with the original curves
    const datasets = [
        // Gaussian PDF curve
        {
            label: 'Gaussian PDF',
            data: gaussianChart.data.datasets[0].data,
            borderColor: 'rgb(255, 0, 0)',
            borderWidth: 2,
            showLine: true,
            pointRadius: 0,
        },
        // -2σ line
        {
            label: '-2σ',
            data: [{ x: -2, y: 0 }, { x: -2, y: 0.4 }],
            borderColor: 'black',
            borderWidth: 2,
            showLine: true,
            pointRadius: 0,
        },
        // +2σ line
        {
            label: '2σ',
            data: [{ x: 2, y: 0 }, { x: 2, y: 0.4 }],
            borderColor: 'black',
            borderWidth: 2,
            showLine: true,
            pointRadius: 0,
        }
    ];

    // Add sample lines
    samples.forEach(sample => {
        datasets.push({
            data: [{ x: sample, y: 0 }, { x: sample, y: 0.4 }],
            borderColor: 'rgba(54, 162, 235, 0.3)',
            borderWidth: 1.5,
            showLine: true,
            pointRadius: 0
        });
    });

    gaussianChart.data.datasets = datasets;
    gaussianChart.update();
}

// Initialize the chart when the page loads
document.addEventListener('DOMContentLoaded', initChart);