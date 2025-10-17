// --- GLOBAL VARIABLES & CHART SETUP ---
const meanSlider = document.getElementById('meanSlider');
const varianceSlider = document.getElementById('varianceSlider');
const sampleSlider = document.getElementById("sampleSlider");
const meanValueLabel = document.getElementById('meanValue');
const varianceValueLabel = document.getElementById('varianceValue');
const sampleValueLabel = document.getElementById("sampleValue");
const observationsDiv = document.getElementById("observations");
const statsDiv = document.getElementById('stats');

let chart; // To hold the single Chart.js instance

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initChart();
    updateChart(); // Draw the initial state
});

/**
 * Creates the initial Chart.js instance with placeholder data.
 */
function initChart() {
    const ctx = document.getElementById('gaussianChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'scatter', // Use scatter to allow vertical lines for samples
        data: {
            datasets: [
                // Dataset 0: The main PDF curve
                { label: 'Gaussian PDF', borderColor: '#3273dc', borderWidth: 3, showLine: true, pointRadius: 0, tension: 0.1, fill: true, backgroundColor: 'rgba(50, 115, 220, 0.2)' },
                // Dataset 1: -2 sigma line
                { label: '-2σ', borderColor: 'rgba(50, 50, 50, 0.7)', borderDash: [5, 5], borderWidth: 2, showLine: true, pointRadius: 0 },
                // Dataset 2: +2 sigma line
                { label: '+2σ', borderColor: 'rgba(50, 50, 50, 0.7)', borderDash: [5, 5], borderWidth: 2, showLine: true, pointRadius: 0 }
                // Sample datasets will be added starting from index 3
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { type: 'linear', position: 'bottom', title: { display: true, text: 'x' }, min: -10, max: 10 },
                y: { min: 0, max: 1.0, title: { display: true, text: 'Probability Density' }}
            }
        }
    });
}


// --- CORE LOGIC ---

/**
 * Main function to update the PDF curve and sigma lines based on slider values.
 */
function updateChart() {
    const mean = parseFloat(meanSlider.value);
    const variance = parseFloat(varianceSlider.value);
    const stdDev = Math.sqrt(variance);

    // Update labels
    meanValueLabel.textContent = mean.toFixed(1);
    varianceValueLabel.textContent = variance.toFixed(1);

    // Generate data points for the PDF curve
    const xMin = mean - 5 * stdDev;
    const xMax = mean + 5 * stdDev;
    const xValues = Array.from({ length: 201 }, (_, i) => xMin + i * (xMax - xMin) / 200);
    const yValues = xValues.map(x => ({ x: x, y: gaussianPDF(x, mean, variance) }));

    // Update chart datasets
    chart.data.datasets[0].data = yValues; // PDF curve
    chart.data.datasets[1].data = [{ x: mean - 2 * stdDev, y: 0 }, { x: mean - 2 * stdDev, y: 1.0 }]; // -2 sigma line
    chart.data.datasets[2].data = [{ x: mean + 2 * stdDev, y: 0 }, { x: mean + 2 * stdDev, y: 1.0 }]; // +2 sigma line
    
    // Dynamically adjust axis limits
    chart.options.scales.x.min = Math.min(-10, xMin);
    chart.options.scales.x.max = Math.max(10, xMax);
    chart.options.scales.y.max = Math.max(0.4, 1 / (stdDev * Math.sqrt(2 * Math.PI)) * 1.1);


    chart.update();
    updatePDFObservations(mean, variance);
}

/**
 * Generates random samples and overlays them on the existing chart.
 */
function generateSamples() {
    const mean = parseFloat(meanSlider.value);
    const variance = parseFloat(varianceSlider.value);
    const stdDev = Math.sqrt(variance);
    const count = parseInt(sampleSlider.value);

    // Clear any previously generated samples (datasets from index 3 onwards)
    chart.data.datasets.splice(3, chart.data.datasets.length - 3);

    const lowerBound = mean - 2 * stdDev;
    const upperBound = mean + 2 * stdDev;
    let inRangeCount = 0;

    for (let i = 0; i < count; i++) {
        const sample = generateGaussianSample(mean, stdDev);
        const inRange = sample >= lowerBound && sample <= upperBound;
        if (inRange) inRangeCount++;

        const color = inRange ? 'rgba(46, 164, 79, 0.6)' : 'rgba(211, 47, 47, 0.6)';
        
        // Add each sample as a new dataset (a vertical line)
        chart.data.datasets.push({
            data: [{ x: sample, y: 0 }, { x: sample, y: chart.options.scales.y.max * 0.9 }],
            borderColor: color,
            borderWidth: 1.5,
            showLine: true,
            pointRadius: 0,
            label: `sample_${i}`
        });
    }
    
    const percentage = (inRangeCount / count) * 100;
    statsDiv.innerHTML = `Samples within [μ-2σ, μ+2σ]: <strong>${percentage.toFixed(2)}%</strong> (Expected: ~95.45%)`;

    chart.update();
    updateSampleObservations(count, percentage);
}


// --- HELPER & UTILITY FUNCTIONS ---

/**
 * Calculates the PDF value for a given x.
 */
function gaussianPDF(x, mean, variance) {
    const stdDev = Math.sqrt(variance);
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
        Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
}

/**
 * Generates a single random sample from a Gaussian distribution.
 */
function generateGaussianSample(mean, stdDev) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

/**
 * Task: Checks the user's calculated height of the PDF.
 */
function checkAnswer() {
    const variance = parseFloat(varianceSlider.value);
    const heightInput = parseFloat(document.getElementById("height").value);

    if (isNaN(variance) || isNaN(heightInput)) {
        observationsDiv.innerHTML = "<p class='incorrect'>Please enter a valid number for the height.</p>";
        return;
    }
    const expectedHeight = 1 / Math.sqrt(2 * Math.PI * variance);
    const tolerance = 0.01;
    
    if (Math.abs(heightInput - expectedHeight) <= tolerance) {
        observationsDiv.innerHTML = `<p class='correct'>Correct! The expected height is ${expectedHeight.toFixed(3)}, and your answer is within the acceptable tolerance.</p>`;
    } else {
        observationsDiv.innerHTML = `<p class='incorrect'>Not quite. The correct height for a variance of ${variance.toFixed(1)} is approximately ${expectedHeight.toFixed(3)}.</p>`;
    }
}

/**
 * Updates the observations panel with feedback about the PDF shape.
 */
function updatePDFObservations(mean, variance) {
    let obsText = "<ul>";
    obsText += `<li>The <strong>mean (μ=${mean.toFixed(1)})</strong> sets the center of the distribution.</li>`;
    if (variance < 1.0) {
        obsText += `<li>A small <strong>variance (σ²=${variance.toFixed(1)})</strong> results in a tall, narrow curve, indicating data is tightly clustered around the mean.</li>`;
    } else {
        obsText += `<li>A larger <strong>variance (σ²=${variance.toFixed(1)})</strong> results in a short, wide curve, indicating data is more spread out.</li>`;
    }
    obsText += "</ul>";
    
    // Don't overwrite correct/incorrect feedback from checkAnswer
    if (!observationsDiv.innerHTML.includes('Correct!')) {
        observationsDiv.innerHTML = obsText;
    }
}

/**
 * Updates the observations panel with feedback about the generated samples.
 */
function updateSampleObservations(count, percentage) {
    let obsText = "";
    // MODIFIED: This function has been updated to match the styling of checkAnswer()
     if (count < 150) {
        obsText = `<p class="warning"><strong>Expected Variance:</strong> With a small sample size (${count}), the observed percentage (${percentage.toFixed(2)}%) can differ significantly from the theoretical 95.45% due to random chance.</p>`;
    } else {
        obsText = `<p class="correct"><strong>With many samples (${count}), the observed percentage (${percentage.toFixed(2)}%) is very close to the theoretical value.</p>`;
    }
    observationsDiv.innerHTML = obsText;
}


// --- EVENT LISTENERS ---
meanSlider.addEventListener('input', updateChart);
varianceSlider.addEventListener('input', updateChart);
sampleSlider.addEventListener("input", () => {
    sampleValueLabel.textContent = sampleSlider.value;
});