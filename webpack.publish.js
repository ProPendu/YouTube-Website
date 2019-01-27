const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const themeConfig = require("./webpack.theme");


const publisherConfig = {
    mode: "development",
    target: "node",
    node: {
        __dirname: false,
        __filename: false,
    },
    entry: {
        "index": ["./src/startup.publish.ts"]
    },
    output: {
        filename: "./[name].js",
        path: path.resolve(__dirname, "dist/publisher"),
        library: "publisher",
        libraryTarget: "commonjs2"
    },
    externals: {
        "firebase-admin": "firebase-admin"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" },
                    { loader: "postcss-loader" },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.html$/,
                loader: "html-loader?exportAsEs6Default"
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.liquid$/,
                loader: "raw-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["dist/publisher"]),
        new MiniCssExtractPlugin({ filename: "[name].css", chunkFilename: "[id].css" }),
        new CopyWebpackPlugin([
            { from: `./src/data/demo.json`, to: `./data/demo.json` },
            { from: `./src/config.publish.json`, to: `./config.json` },
            { from: `./src/config.runtime.json`, to: `./assets/config.json` }
        ])
    ],
    optimization: {
        concatenateModules: true //ModuleConcatenationPlugin
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".html", ".scss"]
    }
};


themeConfig.output.path = path.resolve(__dirname, "dist/publisher"),

    module.exports = [publisherConfig, themeConfig];