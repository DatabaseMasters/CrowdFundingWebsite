/* globals process */
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

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
