// rawData = [{ open: number, high: number, low: number, close: number }]
const toScale = 1.1354;

function scaleDown(step) { // normalize
    return step.close / toScale
}

function scaleUp(step) { // denormalize
    return step.close * toScale
}

const scaledData = rawData.map(scaleDown);

const trainingData = [
    { input: scaledData.slice(0, 5), output: ['buy']},
    { input: scaledData.slice(5, 10), output: ['sell']},
    { input: scaledData.slice(10, 15), output: ['sell']},
    { input: scaledData.slice(15, 20), output: ['buy']},
];
console.group('training');
console.log(trainingData);
console.groupEnd();

const net = new brain.recurrent.LSTMTimeStep();

net.train(trainingData, {
    learningRate: 0.005,
    errorThresh: 0.02,
    // log: (stats) => console.log(stats)
});

// console.log(scaleUp(net.run(trainingData[0])));

const prev = net.forecast([
    trainingData[0][0],
	trainingData[0][1],
], 3).map(scaleUp)

console.log('previsao:', prev);


const net = new brain.NeuralNetwork();

net.train([{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},
           {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},
           {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}]);

const output = net.run({ r: 1, g: 0.4, b: 0 });