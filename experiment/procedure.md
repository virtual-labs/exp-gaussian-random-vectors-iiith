## Procedure for the Experiments

This section contains three sub-experiments designed to enhance the student's understanding of Gaussian Random Variables/Vectors and their properties.

### Experiment 1: 1D Gaussian PDF Visualization

This experiment helps visualize the Probability Density Function (PDF) of a one-dimensional Gaussian random variable and demonstrates how its parameters affect the shape of the curve.

- **Procedure:**
    1.  The user is presented with a plot of the 1D Gaussian PDF.
    2.  Use the **"Mean (μ)"** slider to shift the distribution's center along the x-axis.
    3.  Use the **"Variance (σ²)"** slider to control the spread of the distribution. Observe how the PDF becomes narrower and taller for smaller variances, and wider and shorter for larger variances.
    4.  The user is also given an input field to calculate the height of the Gaussian peak. This value corresponds to the PDF's value at x=μ.
    5.  After entering the calculated height, click **"Check Answer"**. The answer is considered correct if it falls within a 1% tolerance of the true value.
    6.  Feedback on the answer and real-time observations about the curve's parameters are displayed in the **"Observations"** section.

### Experiment 2: 2D Gaussian PDF Visualization

This experiment extends the visualization to a bi-variate (2D) Gaussian random vector, showing how the mean vector and covariance matrix define its form in 3D space.

- **Procedure:**
    1.  Input the desired center of the distribution into the two fields of the **"Mean Vector"**.
    2.  Input the four values for the 2x2 **"Covariance Matrix"**. Note that this matrix must be symmetric and positive-definite for a valid PDF.
    3.  Click the **"Update 2D Gaussian"** button to render the distribution.
    4.  Two plots are generated: a 3D surface plot and a 2D contour plot. The user can click and drag to rotate the 3D plot and use the scroll wheel to zoom.
    5.  Observe how changing the mean vector repositions the entire distribution, while adjusting the covariance matrix values changes its shape, spread, and orientation.
    6.  Any input errors or parameter observations will be displayed in the **"Observations"** section.

### Experiment 3: Generate Realizations of a Standard Normal RV

This experiment demonstrates a key property of the Standard Normal Distribution (μ=0, σ²=1) and the Law of Large Numbers. It shows that a vast majority of random samples will lie close to the mean.

- **Procedure:**
    1.  The user is shown a plot of the Standard Normal PDF with vertical lines indicating the **-2σ** and **+2σ** boundaries.
    2.  Use the slider to select the desired **"Number of Samples"** to generate, from 10 to 1000.
    3.  Click the **"Generate Samples"** button. The generated random samples are drawn as vertical lines on the plot.
    4.  The application calculates the actual percentage of samples that fall within the -2σ to +2σ range and displays this statistic.
    5.  Theoretically, this percentage should converge to **95.45%**. Observe how this approximation becomes more accurate as you increase the number of generated samples.