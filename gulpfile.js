/**
 * Created by alexei on 27/05/16.
 */
var gulp = require('gulp');
var webpack = require('webpack-stream');
var nodemon = require('gulp-nodemon');


gulp.task('compile', function() {
    return gulp.src('src/app.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('build/'));
});



gulp.task('dev:server',function(){
    nodemon({
        script: 'server.js',
        ext: 'js',
        ignore:['src*','build*']
    });
});


gulp.task('dev',['compile','dev:server']);