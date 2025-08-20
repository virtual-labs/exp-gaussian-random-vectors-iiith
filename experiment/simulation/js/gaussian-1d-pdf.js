function checkAnswer() {
    const variance = parseFloat(document.getElementById("varianceSlider").value);
    const heightInput = parseFloat(document.getElementById("height").value);
    const observations = document.getElementById("observations");

    if (isNaN(variance) || isNaN(heightInput)) {
        observations.innerHTML = "<p class='incorrect'>Please enter a valid number for the height.</p>";
        return;
    }

    if (heightInput <= 0) {
        observations.innerHTML = "<p class='incorrect'>Height must be a positive number.</p>";
        return;
    }

    const expectedHeight = 1 / Math.sqrt(2 * Math.PI * variance);
    const tolerance = 0.1; // Increased tolerance as requested

    if (Math.abs(heightInput - expectedHeight) <= tolerance) {
        observations.innerHTML = `<p class='correct'>Correct! The calculated height is approximately ${expectedHeight.toFixed(3)}.</p>`;
    } else {
        observations.innerHTML = `<p class='incorrect'>Not quite. The correct height is ${expectedHeight.toFixed(3)}. Remember the formula for the peak of a Gaussian PDF is 1 / (σ * sqrt(2π)).</p>`;
    }
}

function gaussianPDF(x, mean, variance) {
    const stdDev = Math.sqrt(variance);
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * 
            Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
}

// 1D Gaussian Chart Setup
const ctx1D = document.getElementById('gaussianChart1D').getContext('2d');
const chart1D = new Chart(ctx1D, {
    type: 'line',
    data: {
        datasets: [{
            label: '1D Gaussian PDF',
            borderColor: '#3273dc',
            backgroundColor: 'rgba(50, 115, 220, 0.2)',
            fill: true,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: { display: true, text: 'x' },
                min: -10,
                max: 10
            },
            y: {
                title: { display: true, text: 'Probability Density' },
                min: 0,
                max: 1.0
            }
        }
    }
});

function update1DChart() {
    const mean = parseFloat(document.getElementById('meanSlider').value);
    const variance = parseFloat(document.getElementById('varianceSlider').value);
    
    document.getElementById('meanValue').textContent = mean.toFixed(1);
    document.getElementById('varianceValue').textContent = variance.toFixed(1);

    const xValues = Array.from({length: 201}, (_, i) => -10 + i * 0.1);
    const yValues = xValues.map(x => gaussianPDF(x, mean, variance));

    chart1D.data.labels = xValues;
    chart1D.data.datasets[0].data = yValues;
    chart1D.update();
    
    update1DObservations(mean, variance);
}

function update1DObservations(mean, variance) {
    const observations = document.getElementById("observations");
    let obsText = "<ul>";
    obsText += "<li>The <strong>mean (μ)</strong> determines the center of the distribution. Notice how the peak shifts to " + mean.toFixed(1) + " on the x-axis.</li>";
    if (variance < 1.0) {
        obsText += "<li>A small <strong>variance (σ²)</strong> like " + variance.toFixed(1) + " results in a tall, narrow curve. This indicates that the data points are very close to the mean.</li>";
    } else if (variance > 2.5) {
        obsText += "<li>A large <strong>variance (σ²)</strong> like " + variance.toFixed(1) + " results in a short, wide curve. This signifies greater uncertainty, with data points spread further from the mean.</li>";
    } else {
        obsText += "<li>The <strong>variance (σ²)</strong> of " + variance.toFixed(1) + " controls the spread of the distribution. Try increasing it to see the curve flatten and widen, and decreasing it to see it become sharper and narrower.</li>";
    }
    obsText += "</ul>";
    observations.innerHTML = obsText;
}


document.getElementById('meanSlider').addEventListener('input', update1DChart);
document.getElementById('varianceSlider').addEventListener('input', update1DChart);
document.addEventListener('DOMContentLoaded', update1DChart);