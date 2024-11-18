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
    generateSamplesFromSlider();
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

// Function to generate samples using the value from the slider
function generateSamplesFromSlider() {
    const numberOfSamples = parseInt(sampleSlider.value);
    document.getElementById("observations1").innerHTML = "<p>"+numberOfSamples+" samples generated</p>";
    document.getElementById("observations1").style.color = "black";
    generateSamples(numberOfSamples);
}


// Initialize the chart when the page loads
document.addEventListener('DOMContentLoaded', initChart);
const slider = document.getElementById("sampleSlider");
const valueLabel = document.getElementById("sampleValue");

// Function to update the label with the current slider value
const updateSliderValue = () => {
    valueLabel.textContent = slider.value;
};

// Event listener for input event to update the value in real-time
slider.addEventListener("input", updateSliderValue);
