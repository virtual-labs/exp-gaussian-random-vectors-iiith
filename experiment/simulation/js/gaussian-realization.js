let gaussianChart;
const sampleSlider = document.getElementById("sampleSlider");
const sampleValueLabel = document.getElementById("sampleValue");

function generateGaussian(mean = 0, stdDev = 1) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function initChart() {
    const ctx = document.getElementById('gaussianChart').getContext('2d');
    const gaussianPoints = Array.from({length: 81}, (_, i) => {
        const x = -4 + i * 0.1;
        return { x: x, y: (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-(x * x) / 2) };
    });

    gaussianChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                { label: 'Gaussian PDF', data: gaussianPoints, borderColor: '#3273dc', borderWidth: 2, showLine: true, pointRadius: 0 },
                { label: '-2σ', data: [{ x: -2, y: 0 }, { x: -2, y: 0.45 }], borderColor: 'rgba(50, 50, 50, 0.7)', borderDash: [5, 5], borderWidth: 2, showLine: true, pointRadius: 0 },
                { label: '2σ', data: [{ x: 2, y: 0 }, { x: 2, y: 0.45 }], borderColor: 'rgba(50, 50, 50, 0.7)', borderDash: [5, 5], borderWidth: 2, showLine: true, pointRadius: 0 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { type: 'linear', position: 'bottom', min: -4, max: 4, title: { display: true, text: 'Standard Deviations (σ)' }},
                y: { min: 0, max: 0.45, title: { display: true, text: 'Probability Density' }}
            }
        }
    });
    generateSamplesFromSlider();
}

function generateSamples(count) {
    const samples = Array.from({ length: count }, () => generateGaussian(0, 1));
    const inRangeCount = samples.filter(x => x >= -2 && x <= 2).length;
    const percentage = (inRangeCount / count) * 100;

    document.getElementById('stats').innerHTML = `Samples within (-2σ, 2σ): ${percentage.toFixed(2)}% (Expected: 95.45%)`;

    const datasets = gaussianChart.data.datasets.slice(0, 3); // Keep PDF and sigma lines

    samples.forEach(sample => {
        const inRange = sample >= -2 && sample <= 2;
        const color = inRange ? 'rgba(46, 164, 79, 0.5)' : 'rgba(211, 47, 47, 0.5)'; // Green for in, Red for out
        datasets.push({
            data: [{ x: sample, y: 0 }, { x: sample, y: 0.4 }],
            borderColor: color,
            borderWidth: 1.5,
            showLine: true,
            pointRadius: 0,
            label: 'sample'
        });
    });

    gaussianChart.data.datasets = datasets;
    gaussianChart.update();
    
    updateObservations(count, percentage);
}

function generateSamplesFromSlider() {
    const numberOfSamples = parseInt(sampleSlider.value);
    generateSamples(numberOfSamples);
}

function updateObservations(count, percentage) {
    const observations = document.getElementById("observations");
    let obsText = "";
    if (count < 100) {
        obsText = `<p class="warning">With a small number of samples (${count}), the observed percentage (${percentage.toFixed(2)}%) can vary significantly from the theoretical value of 95.45% due to random chance.</p>`;
    } else {
        obsText = `<p class="info">As you increase the number of samples (${count}), notice how the observed percentage (${percentage.toFixed(2)}%) gets closer to the theoretical value. This demonstrates the <strong>Law of Large Numbers</strong>.</p>`;
    }
    observations.innerHTML = obsText;
}

document.addEventListener('DOMContentLoaded', initChart);
sampleSlider.addEventListener("input", () => {
    sampleValueLabel.textContent = sampleSlider.value;
});