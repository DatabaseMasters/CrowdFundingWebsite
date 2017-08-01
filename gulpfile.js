/* globals process */
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const server = require('./server');
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
            '!./config/**/*.js',
            './data/**/*.js',
            './db/**/*.js',
            './models/**/*.js',
        ]) // to exclude folders '!./static/**'
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests-all', ['pre-test'], (done) => {
    return gulp.src([
            './tests/unit/**/*.js',
            './tests/integration/**/*.js',
        ])
        .pipe(mocha({
            reporter: 'spec',
            timeout: 3000,
        }))
        .pipe(istanbul.writeReports({
            dir: './coverage/all',
        }))
        .on('error', () => process.exit(1))
        .on('end', () => {
            process.exit();
        });
});

gulp.task('tests-unit', ['pre-test'], () => {
    return gulp.src([
            './tests/unit/**/*.js',
        ])
        .pipe(mocha({
            reporter: 'spec',
            timeout: 3000,
        }))
        .pipe(istanbul.writeReports({
            dir: './coverage/unit',
        }))
        .on('error', () => process.exit(1))
        .on('end', () => {
            process.exit();
        });
});

gulp.task('tests-integration', ['pre-test'], () => {
    return gulp.src([
            './tests/integration/**/*.js',
        ])
        .pipe(mocha({
            reporter: 'spec',
            timeout: 3000,
        }))
        .pipe(istanbul.writeReports({
            dir: './coverage/integration',
        }))
        .on('error', () => process.exit(1))
        .on('end', () => {
            process.exit();
        });
});

const testConfig = {
    connectionString: 'mongodb://localhost/crowdfunding-db-test',
    port: 3002,
};
const mongoClient = require('mongodb');

gulp.task('server-start', () => {
    return server(testConfig);
});


gulp.task('server-stop', () => {
    return mongoClient.connect(testConfig.connectionString)
        .then((db) => {
            return db.dropDatabase();
        });
});

gulp.task('tests:browser', ['server-start'], () => {
    return gulp.src('./tests/browser/**/*.js')
        .pipe(mocha({
            reporter: 'spec',
            timeout: 10000,
        }))
        .once('error', (er) => {
            console.log(er);
            process.exit(1);
        })
        .once('end', () => {
            gulp.start('server-stop');
            process.exit();
        });
});
