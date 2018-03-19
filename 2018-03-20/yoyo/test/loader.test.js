const compiler = require('./compiler.js');
test('Inserts name and outputs JavaScript', async() => {
    const stats = await compiler('example.txt');
    const output = stats.toJson().modules[0].source;
    expect(output).toBe(`module.exports = "Hey Alice!\\n"`);
});