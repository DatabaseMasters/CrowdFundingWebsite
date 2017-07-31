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
        script: 'index.js',
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

gulp.task('tests-all', ['pre-test'], () => {
    return gulp.src([
            './tests/unit/**/*.js',
            './tests/integration/**/*.js',
        ])
        .pipe(mocha({
            reporter: 'spec',
        }))
        .pipe(istanbul.writeReports({
            dir: './coverage/all',
        }))
        .once('error', process.exit(1));
});

gulp.task('tests-unit', ['pre-test'], () => {
    return gulp.src([
            './tests/unit/**/*.js',
        ])
        .pipe(mocha({
            reporter: 'spec',
        }))
        .pipe(istanbul.writeReports({
            dir: './coverage/unit',
        }))
        .once('error', process.exit(1));
});

gulp.task('tests-integration', ['pre-test'], () => {
    return gulp.src([
            './tests/integration/**/*.js',
        ])
        .pipe(mocha({
            reporter: 'spec',
        }))
        .pipe(istanbul.writeReports({
            dir: './coverage/integration',
        }))
        .once('error', process.exit(1));
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
