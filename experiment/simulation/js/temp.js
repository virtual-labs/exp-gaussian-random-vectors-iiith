// const ctx = document.getElementById('gaussianChart').getContext('2d');
// const chart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         datasets: [{
//             label: 'Gaussian PDF',
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1
//         }]
//     },
//     options: {
//         responsive: true,
//         scales: {
//             x: {
//                 type: 'linear',
//                 position: 'bottom',
//                 title: {
//                     display: true,
//                     text: 'x'
//                 },
//                 min: -10,
//                 max: 10
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Probability Density'
//                 },
//                 min: 0,
//                 max: 0.5
//             }
//         }
//     }
// });

// function gaussianPDF(x, mean, variance) {
//     const stdDev = Math.sqrt(variance);
//     return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * 
//             Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
// }

// function updateChart() {
//     const mean = parseFloat(document.getElementById('meanSlider').value);
//     const variance = parseFloat(document.getElementById('varianceSlider').value);
    
//     document.getElementById('meanValue').textContent = mean.toFixed(1);
//     document.getElementById('varianceValue').textContent = variance.toFixed(1);

//     const xValues = [];
//     const yValues = [];

//     for (let x = -10; x <= 10; x += 0.1) {
//         xValues.push(x);
//         yValues.push(gaussianPDF(x, mean, variance));
//     }

//     chart.data.labels = xValues;
//     chart.data.datasets[0].data = yValues;
//     chart.update();
// }

// document.getElementById('meanSlider').addEventListener('input', updateChart);
// document.getElementById('varianceSlider').addEventListener('input', updateChart);

// updateChart();

// // Utility functions
// function gaussianPDF(x, mean, variance) {
//     const stdDev = Math.sqrt(variance);
//     return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * 
//             Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
// }

// function generate2DGaussian(meanX, meanY, varianceX, varianceY, numPoints) {
//     const points = [];
//     for (let i = 0; i < numPoints; i++) {
//         const x = randomNormal(meanX, Math.sqrt(varianceX));
//         const y = randomNormal(meanY, Math.sqrt(varianceY));
//         points.push({ x, y });
//     }
//     return points;
// }

// function randomNormal(mean, stdDev) {
//     let u = 0, v = 0;
//     while (u === 0) u = Math.random();
//     while (v === 0) v = Math.random();
//     return mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
// }

// // Sub Experiment 1: 1D Gaussian
// const ctx1D = document.getElementById('gaussianChart1D').getContext('2d');
// const chart1D = new Chart(ctx1D, {
//     type: 'line',
//     data: {
//         datasets: [{
//             label: '1D Gaussian PDF',
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1
//         }]
//     },
//     options: {
//         responsive: true,
//         scales: {
//             x: {
//                 type: 'linear',
//                 position: 'bottom',
//                 title: {
//                     display: true,
//                     text: 'x'
//                 },
//                 min: -10,
//                 max: 10
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Probability Density'
//                 },
//                 min: 0,
//                 max: 0.5
//             }
//         }
//     }
// });

// function update1DChart() {
//     const mean = parseFloat(document.getElementById('meanSlider').value);
//     const variance = parseFloat(document.getElementById('varianceSlider').value);
    
//     document.getElementById('meanValue').textContent = mean.toFixed(1);
//     document.getElementById('varianceValue').textContent = variance.toFixed(1);

//     const xValues = [];
//     const yValues = [];

//     for (let x = -10; x <= 10; x += 0.1) {
//         xValues.push(x);
//         yValues.push(gaussianPDF(x, mean, variance));
//     }

//     chart1D.data.labels = xValues;
//     chart1D.data.datasets[0].data = yValues;
//     chart1D.update();
// }

// document.getElementById('meanSlider').addEventListener('input', update1DChart);
// document.getElementById('varianceSlider').addEventListener('input', update1DChart);

// // Sub Experiment 1: 2D Gaussian
// const ctx2D = document.getElementById('gaussianChart2D').getContext('2d');
// const chart2D = new Chart(ctx2D, {
//     type: 'scatter',
//     data: {
//         datasets: [{
//             label: '2D Gaussian Distribution',
//             backgroundColor: 'rgba(75, 192, 192, 0.5)'
//         }]
//     },
//     options: {
//         responsive: true,
//         scales: {
//             x: {
//                 type: 'linear',
//                 position: 'bottom',
//                 title: {
//                     display: true,
//                     text: 'X'
//                 }
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Y'
//                 }
//             }
//         }
//     }
// });

// function update2DChart() {
//     const meanX = parseFloat(document.getElementById('meanX').value);
//     const meanY = parseFloat(document.getElementById('meanY').value);
//     const varianceX = parseFloat(document.getElementById('varianceX').value);
//     const varianceY = parseFloat(document.getElementById('varianceY').value);

//     const points = generate2DGaussian(meanX, meanY, varianceX, varianceY, 1000);

//     chart2D.data.datasets[0].data = points;
//     chart2D.update();
// }

// document.getElementById('meanX').addEventListener('input', update2DChart);
// document.getElementById('meanY').addEventListener('input', update2DChart);
// document.getElementById('varianceX').addEventListener('input', update2DChart);
// document.getElementById('varianceY').addEventListener('input', update2DChart);

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

// document.getElementById('generateButton').addEventListener('click', generateGaussianRealizations);

// // Tab and step navigation
// const tabButtons = document.querySelectorAll('.tab-button');
// const tabContents = document.querySelectorAll('.tab-content');

// tabButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const tabId = button.getAttribute('data-tab');
        
//         tabButtons.forEach(btn => btn.classList.remove('active'));
//         tabContents.forEach(content => content.classList.remove('active'));
        
//         button.classList.add('active');
//         document.getElementById(tabId).classList.add('active');
//     });
// });

// const prevButton1 = document.getElementById('prevButton1');
// const nextButton1 = document.getElementById('nextButton1');
// const steps = document.querySelectorAll('#subexp1 .step');
// let currentStep = 0;

// function updateStepVisibility() {
//     steps.forEach((step, index) => {
//         step.classList.toggle('active', index === currentStep);
//     });
//     prevButton1.style.display = currentStep > 0 ? 'inline-block' : 'none';
//     nextButton1.style.display = currentStep < steps.length - 1 ? 'inline-block' : 'none';
// }

// prevButton1.addEventListener('click', () => {
//     if (currentStep > 0) {
//         currentStep--;
//         updateStepVisibility();
//     }
// });

// nextButton1.addEventListener('click', () => {
//     if (currentStep < steps.length - 1) {
//         currentStep++;
//         updateStepVisibility();
//     }
// });

// // Initialize
// update1DChart();
// update2DChart();
// generateGaussianRealizations();
// updateStepVisibility();