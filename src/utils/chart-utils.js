
export function calculateMaxValue(data, series) {
    // HACK: Yeah, nested reduces
    return series.reduce((a, b) => {
        return Math.max(a, parseInt(b.data.reduce((c, d) => Math.max(c, d), 0)));
    }, 0);
}

export function calculateStepValue(range, stepCount) {
    // Get the closest half-power of 10 e.g. for 35 or 75 it would be 50
    let maxUpper = parseInt(
        "5" + Array.prototype.join.call({ length: range.toString().length }, "0")
    );
    // Start with the naive step value
    let step = range / stepCount;
    // Make it a decimal value and round it up
    step = Math.ceil(step / (maxUpper / 10));
    // If the step would be a multiple of 3, 7 or 9, round it up to the next even number (for aesthetic purposes)
    if (step === 3 || step === 7 || step === 9) {
        step = step + (step % 2);
    }
    // Convert the step back from the decimal value
    step = step * (maxUpper / 10);
    return step;
}

export function calculateStepLabels(stepCount, stepValue) {
    // Calculate the step value and labels
    const newStepLabels = [];
    for (var i = 0; i < stepCount + 1; i++) {
        newStepLabels.push(stepValue * i);
    }
    return newStepLabels;
}

export function calculateItemWidth(width, chartLeft, labels) {
    return (width - chartLeft) / labels.length;
}

export function calculateValueHeight(chartBottom, textHeight, stepValue, stepCount) {
    return (chartBottom - textHeight) / (stepValue * stepCount);
}

export function calculateChartBottom(xLabel, height, textHeight) {
    return xLabel ? height - textHeight * 2 : height - textHeight;
}

export function calculateChartLeft(
    stepLabels,
    yLabel,
    textHeight,
    textWidth
) {
    // Get the longest label width
    const maxLabelWidth = stepLabels.reduce((a, b) => {
        return Math.max(a.toString().length, b.toString().length);
    }, 0);
    let theChartLeft = yLabel ? textHeight * 1.5 : textHeight / 2;
    theChartLeft += maxLabelWidth * textWidth;
    return theChartLeft;
}
