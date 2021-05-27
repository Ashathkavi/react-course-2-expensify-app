const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//console.log(path.join(__dirname, 'public'))



module.exports = {
    //const CSSExtract = new MiniCssExtractPlugin('styles.css')
    entry:'./src/app.js',
    output:{
        path:path.join(__dirname, 'public'),
        filename:'bundle.js'
    },
    plugins: [new MiniCssExtractPlugin()],
    module:{
        rules:[{
            loader:'babel-loader',
            test:/\.js$/,
            exclude:/node_modules/
        },{
            test:/\.s?css$/,
            use: [
                {
                    loader:MiniCssExtractPlugin.loader
                }, {
                    loader:'css-loader',
                    options:{
                        sourceMap:true
                    }
                },{
                    loader:'sass-loader',
                    options:{
                        sourceMap:true
                    }
                }
            ]
        }]
    }
}
