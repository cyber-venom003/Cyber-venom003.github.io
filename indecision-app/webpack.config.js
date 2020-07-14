const path = require('path');

module.exports = (env) => {
    const isProduction = env === 'production';
    return {
        entry: "./src/app.js",
        mode: "development",
        output: {
            path: path.join(__dirname , "public"),
            filename: "bundle.js"
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            } , {
                test: /\.s?css$/,
                use: ["style-loader" , "css-loader" , "sass-loader"]
            }]
        },
        devtool: isProduction? 'source-map' : 'eval-cheap-module-source-map',
        devServer: {
            contentBase: path.join(__dirname , 'public')
        }
    };
};