function gaussianPDF(x, mean, variance) {
    const stdDev = Math.sqrt(variance);
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * 
            Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
}

function gaussianPDF2D(x, y, meanX, meanY, covMatrix) {
    const detCov = covMatrix[0][0] * covMatrix[1][1] - covMatrix[0][1] * covMatrix[1][0];
    const invCov = [
        [covMatrix[1][1] / detCov, -covMatrix[0][1] / detCov],
        [-covMatrix[1][0] / detCov, covMatrix[0][0] / detCov]
    ];
    const dx = x - meanX;
    const dy = y - meanY;
    const exponent = -0.5 * (dx * (invCov[0][0] * dx + invCov[0][1] * dy) + dy * (invCov[1][0] * dx + invCov[1][1] * dy));
    return (1 / (2 * Math.PI * Math.sqrt(detCov))) * Math.exp(exponent);
}

function linspace(start, stop, num) {
    const step = (stop - start) / (num - 1);
    return Array(num).fill(0).map((_, i) => start + step * i);
}

// Function to calculate responsive dimensions based on container
function getPlotDimensions() {
    const container = document.querySelector('.box-question');
    if (!container) return { width: 450, height: 450 };
    
    // Get the actual container width and subtract padding/margins
    const containerWidth = container.clientWidth;
    // Calculate the width for each plot (2 plots per row)
    const plotWidth = Math.min((containerWidth - 80) / 2, 450);
    
    return { width: plotWidth, height: plotWidth };
}

// 1D Gaussian Chart
const ctx1D = document.getElementById('gaussianChart1D').getContext('2d');
const chart1D = new Chart(ctx1D, {
    type: 'line',
    data: {
        datasets: [{
            label: '1D Gaussian PDF',
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'x'
                },
                min: -10,
                max: 10
            },
            y: {
                title: {
                    display: true,
                    text: 'Probability Density'
                },
                min: 0,
                max: 0.5
            }
        }
    }
});

function update1DChart() {
    const mean = parseFloat(document.getElementById('meanSlider').value);
    const variance = parseFloat(document.getElementById('varianceSlider').value);
    
    document.getElementById('meanValue').textContent = mean.toFixed(1);
    document.getElementById('varianceValue').textContent = variance.toFixed(1);

    const xValues = [];
    const yValues = [];

    for (let x = -10; x <= 10; x += 0.1) {
        xValues.push(x);
        yValues.push(gaussianPDF(x, mean, variance));
    }

    chart1D.data.labels = xValues;
    chart1D.data.datasets[0].data = yValues;
    chart1D.update();
}

document.getElementById('meanSlider').addEventListener('input', update1DChart);
document.getElementById('varianceSlider').addEventListener('input', update1DChart);
document.addEventListener('DOMContentLoaded', () => {
    update1DChart();
});

function update2DPlot() {
    const meanX = parseFloat(document.getElementById('meanX').value);
    const meanY = parseFloat(document.getElementById('meanY').value);
    const covXX = parseFloat(document.getElementById('covXX').value);
    const covXY = parseFloat(document.getElementById('covXY').value);
    const covYX = parseFloat(document.getElementById('covYX').value);
    const covYY = parseFloat(document.getElementById('covYY').value);

    const covMatrix = [[covXX, covXY], [covYX, covYY]];

    const xRange = linspace(-10, 10, 100);
    const yRange = linspace(-10, 10, 100);
    const z = [];

    for (let i = 0; i < yRange.length; i++) {
        const row = [];
        for (let j = 0; j < xRange.length; j++) {
            row.push(gaussianPDF2D(xRange[j], yRange[i], meanX, meanY, covMatrix));
        }
        z.push(row);
    }

    const dimensions = getPlotDimensions();

    const surfaceData = [{
        z: z,
        x: xRange,
        y: yRange,
        type: 'surface',
        colorscale: 'Viridis',
        showscale: false
    }];

    const contourData = [{
        z: z,
        x: xRange,
        y: yRange,
        type: 'contour',
        colorscale: 'Viridis',
        showscale: false,
        contours: {
            start: 0,
            end: Math.max(...z.flat()),
            size: (Math.max(...z.flat()) - 0) / 10
        }
    }];

    const layout3D = {
        title: {
            text: '3D Gaussian PDF',
            y: 0.95
        },
        scene: {
            xaxis: {title: 'x', range: [-10, 10]},
            yaxis: {title: 'y', range: [-10, 10]},
            zaxis: {
                title: 'Probability Density',
                range: [0, Math.max(...z.flat())]
            },
            camera: {
                eye: {x: 1.5, y: 1.5, z: 1.2},
                center: {x: 0, y: 0, z: -0.1}
            },
            aspectratio: {x: 1, y: 1, z: 0.7}
        },
        width: dimensions.width,
        height: dimensions.height,
        margin: {l: 0, r: 0, b: 0, t: 30},
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
    };

    const layout2D = {
        title: {
            text: 'Contour Plot of Gaussian PDF',
            y: 0.95
        },
        xaxis: {
            title: 'x',
            range: [-10, 10],
            constrain: 'domain'
        },
        yaxis: {
            title: 'y',
            range: [-10, 10],
            scaleanchor: 'x',
            scaleratio: 1
        },
        width: dimensions.width,
        height: dimensions.height,
        margin: {l: 50, r: 30, b: 50, t: 30},
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
    };

    // Create container divs if they don't exist
    const plotContainer = document.querySelector('.plots-container') || createPlotContainers();

    // Update the plots
    Plotly.newPlot('gaussianPlot3D', surfaceData, layout3D, {
        displayModeBar: false,
        responsive: true
    });
    
    Plotly.newPlot('gaussianContourPlot', contourData, layout2D, {
        displayModeBar: false,
        responsive: true
    });
}

function createPlotContainers() {
    // Create a container for both plots
    const container = document.createElement('div');
    container.className = 'plots-container';
    container.style.cssText = 'display: flex; justify-content: center; align-items: start; gap: 20px; width: 100%;';
    
    // Create containers for each plot with proper sizing
    const plot3DContainer = document.getElementById('gaussianPlot3D') || document.createElement('div');
    const contourPlotContainer = document.getElementById('gaussianContourPlot') || document.createElement('div');
    
    plot3DContainer.id = 'gaussianPlot3D';
    contourPlotContainer.id = 'gaussianContourPlot';
    
    const dimensions = getPlotDimensions();
    const plotStyle = `width: ${dimensions.width}px; height: ${dimensions.height}px;`;
    
    plot3DContainer.style.cssText = plotStyle;
    contourPlotContainer.style.cssText = plotStyle;
    
    container.appendChild(plot3DContainer);
    container.appendChild(contourPlotContainer);
    
    // Find the box-question container and append the plots container
    const boxQuestion = document.querySelector('.box-question');
    if (boxQuestion) {
        boxQuestion.appendChild(container);
    }
    
    return container;
}

// Add window resize handler
window.addEventListener('resize', debounce(() => {
    const dimensions = getPlotDimensions();
    const plotContainers = document.querySelectorAll('#gaussianPlot3D, #gaussianContourPlot');
    plotContainers.forEach(container => {
        container.style.width = `${dimensions.width}px`;
        container.style.height = `${dimensions.height}px`;
    });
    update2DPlot();
},  250));

// Debounce function to prevent too many resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize plots when the page loads
document.addEventListener('DOMContentLoaded', () => {
    update2DPlot();
});

// Add event listener for the update button
document.getElementById('update2DButton')?.addEventListener('click', update2DPlot);

function resetPlots() {
    // Reset input values to defaults
    document.getElementById('meanX').value = '0';
    document.getElementById('meanY').value = '0';
    document.getElementById('covXX').value = '1';
    document.getElementById('covXY').value = '0';
    document.getElementById('covYX').value = '0';
    document.getElementById('covYY').value = '1';

    // Update plots with default values
    update2DPlot();
}

// Add these event listeners in the DOMContentLoaded section:
document.addEventListener('DOMContentLoaded', () => {
    // Initialize plots
    update2DPlot();
    
    // Add event listeners for buttons
    document.getElementById('update2DButton')?.addEventListener('click', update2DPlot);
    document.getElementById('resetButton')?.addEventListener('click', resetPlots);
    
    // Add input validation and sync for covariance matrix
    const covXY = document.getElementById('covXY');
    const covYX = document.getElementById('covYX');
    
    // Ensure covariance matrix stays symmetric
    covXY?.addEventListener('input', () => {
        if (covYX) covYX.value = covXY.value;
    });
    
    covYX?.addEventListener('input', () => {
        if (covXY) covXY.value = covYX.value;
    });

    // Add validation for all numeric inputs
    const numericInputs = document.querySelectorAll('.numeric-input');
    numericInputs.forEach(input => {
        input.addEventListener('input', () => {
            // Ensure the matrix remains positive definite
            const covXX = parseFloat(document.getElementById('covXX').value);
            const covYY = parseFloat(document.getElementById('covYY').value);
            const covXY = parseFloat(document.getElementById('covXY').value);
            
            // Check if determinant is positive
            const det = covXX * covYY - covXY * covXY;
            
            if (det <= 0 || covXX <= 0 || covYY <= 0) {
                alert('Warning: Covariance matrix must be positive definite. Resetting to default values.');
                resetPlots();
                return;
            }
        });
    });
});