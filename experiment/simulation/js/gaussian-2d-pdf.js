function gaussianPDF2D(x, y, meanX, meanY, covMatrix) {
    const detCov = covMatrix[0][0] * covMatrix[1][1] - covMatrix[0][1] * covMatrix[1][0];
    if (detCov <= 0) return 0;

    const invCov = [
        [covMatrix[1][1] / detCov, -covMatrix[0][1] / detCov],
        [-covMatrix[1][0] / detCov, covMatrix[0][0] / detCov]
    ];
    const dx = x - meanX;
    const dy = y - meanY;
    const exponent = -0.5 * (dx * (invCov[0][0] * dx + invCov[0][1] * dy) + dy * (invCov[1][0] * dx + invCov[1][1] * dy));
    return (1 / (2 * Math.PI * Math.sqrt(detCov))) * Math.exp(exponent);
}

function update2DPlot() {
    const meanX = parseFloat(document.getElementById('meanX').value);
    const meanY = parseFloat(document.getElementById('meanY').value);
    const covXX = parseFloat(document.getElementById('covXX').value);
    const covXY = parseFloat(document.getElementById('covXY').value);
    const covYY = parseFloat(document.getElementById('covYY').value);
    const observations = document.getElementById('observations');

    if (isNaN(meanX) || isNaN(meanY) || isNaN(covXX) || isNaN(covXY) || isNaN(covYY)) {
        observations.innerHTML = "<p class='incorrect'>Error: All inputs must be valid numbers.</p>";
        Plotly.purge('gaussianPlot3D');
        Plotly.purge('gaussianContourPlot');
        return;
    }

    const det = covXX * covYY - covXY * covXY;
    if (covXX <= 0 || covYY <= 0 || det <= 0) {
        observations.innerHTML = "<p class='incorrect'><strong>Invalid Covariance Matrix!</strong><br>The matrix must be positive-definite. This requires:<br>1. σx² > 0 and σy² > 0.<br>2. Determinant (σx²σy² - σxy²) > 0.</p>";
        Plotly.purge('gaussianPlot3D');
        Plotly.purge('gaussianContourPlot');
        return;
    }
    
    const covMatrix = [[covXX, covXY], [covXY, covYY]];

    const displaySpan = 12; // Dynamic range for recentering
    const xMin = meanX - displaySpan / 2, xMax = meanX + displaySpan / 2;
    const yMin = meanY - displaySpan / 2, yMax = meanY + displaySpan / 2;

    const xRange = Array.from({length: 51}, (_, i) => xMin + i * (displaySpan / 50));
    const yRange = Array.from({length: 51}, (_, i) => yMin + i * (displaySpan / 50));
    const z = yRange.map(y => xRange.map(x => gaussianPDF2D(x, y, meanX, meanY, covMatrix)));
    
    updatePlots(xRange, yRange, z, [xMin, xMax], [yMin, yMax]);
    update2DObservations(meanX, meanY, covXX, covYY, covXY);
}

function updatePlots(x, y, z, xPlotRange, yPlotRange) {
    const container = document.querySelector('.white-boxed-panel');
    const plotWidth = Math.max(250, container.clientWidth / 2 - 20);

    const surfaceData = [{ z: z, x: x, y: y, type: 'surface', colorscale: 'Viridis' }];
    const contourData = [{ z: z, x: x, y: y, type: 'contour', colorscale: 'Viridis' }];

    const layout3D = {
        title: '3D Surface Plot',
        scene: {
            xaxis: {title: 'x', range: xPlotRange}, yaxis: {title: 'y', range: yPlotRange}, zaxis: {title: 'Density'}
        },
        autosize: false, width: plotWidth, height: plotWidth, margin: {l: 10, r: 10, b: 10, t: 40}
    };

    const layout2D = {
        title: 'Contour Plot',
        xaxis: { title: 'x', range: xPlotRange, constrain: 'domain' },
        yaxis: { title: 'y', range: yPlotRange, scaleanchor: 'x', scaleratio: 1 },
        autosize: false, width: plotWidth, height: plotWidth, margin: {l: 40, r: 10, b: 40, t: 40}
    };
    
    Plotly.newPlot('gaussianPlot3D', surfaceData, layout3D, {responsive: true});
    Plotly.newPlot('gaussianContourPlot', contourData, layout2D, {responsive: true});
}

function update2DObservations(meanX, meanY, varX, varY, covXY) {
    const observations = document.getElementById("observations");
    let obsText = "<ul>";
    obsText += `<li>The mean vector [${meanX}, ${meanY}] has shifted the center of the distribution.</li>`;
    obsText += `<li>The variances σx²=${varX} and σy²=${varY} control the spread along each axis.`;

    if (Math.abs(covXY) < 0.1) {
        obsText += `<li>With covariance σxy ≈ 0, the variables are uncorrelated. The contour ellipses are aligned with the x and y axes.</li>`;
    } else if (covXY > 0) {
        obsText += `<li>A positive covariance σxy = ${covXY} indicates a positive correlation. As x increases, y tends to increase. This tilts the ellipses upwards.</li>`;
    } else {
        obsText += `<li>A negative covariance σxy = ${covXY} indicates a negative correlation. As x increases, y tends to decrease. This tilts the ellipses downwards.</li>`;
    }
    obsText += "</ul>";
    observations.innerHTML = obsText;
}

document.addEventListener('DOMContentLoaded', () => {
    update2DPlot();
    const covXY = document.getElementById('covXY');
    const covYX = document.getElementById('covYX');
    
    covXY?.addEventListener('input', () => { if (covYX) covYX.value = covXY.value; });
    covYX?.addEventListener('input', () => { if (covXY) covXY.value = covYX.value; });
});
document.getElementById('update2DButton')?.addEventListener('click', update2DPlot);
window.addEventListener('resize', update2DPlot);