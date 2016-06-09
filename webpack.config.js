module.exports = {
    watch:true,
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['react-html-attrs', 'transform-decorators-legacy'],
            }
        }]
    },
    output: {
    filename: 'app.bundle.js'
}
};