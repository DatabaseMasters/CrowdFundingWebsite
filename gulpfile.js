/* globals process */
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

// HACK not recommended
// set port
// eslint-disable-next-line no-process-env
// const port = process.env.PORT || 3001;

gulp.task('dev', () => {
    console.log('dev -------------------');
    return nodemon({
        ext: 'js',
        script: 'server.js',
    }).on('restart', () => {
        console.log('restarted -------------------');
    });
});

gulp.task('pre-test', () => {
    return gulp.src([
            './server.js',
            './app/**/*.js',
            './config/**/*.js',
            './data/**/*.js',
            './db/**/*.js',
            './models/**/*.js',
        ]) // to exclude folders '!./static/**'
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests-unit', ['pre-test'], () => {
    return gulp.src('./tests/unit/**/*.js') // can accept an array of locations to test, inlcude integraiton too
        .pipe(mocha({
            reporter: 'spec', // optional
        }))
        .pipe(istanbul.writeReports());
});

// gulp.task('serve', () => {
//     console.log('serving -------------------');
//     const app = require('./app');
//     app.listen(port, () => console.log(`--- Server working at ${port} ---`));
// });

// // !! Error: listen EADDRINUSE :::3001 if the tasks property is on
// gulp.task('dev', ['serve'], () => {
//     console.log('dev -------------------');
//     return nodemon({
//         ext: 'js pug',
//         tasks: ['serve'],
//         script: 'server.js',
//     }).on('restart', () => {
//         console.log('restarted -------------------');
//     });
// });
