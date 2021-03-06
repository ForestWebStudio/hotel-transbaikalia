const { src, dest, series, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const sourcemaps = require('gulp-sourcemaps');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revDel = require('gulp-rev-delete-original');
const htmlmin = require('gulp-htmlmin');
const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const image = require('gulp-image');
const { readFileSync } = require('fs');
const pug = require('gulp-pug');

let isProd = false; // dev by default

const clean = () => {
    return del(['app/*'])
}

//svg sprite
const svgSprites = () => {
    return src('./src/img/svg/**.svg')
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg" //sprite file name
                }
            },
        }))
        .pipe(dest('./app/img/svg'));
}

const styles = () => {
    return src(['./src/sass/main.sass', './src/sass/media.sass'])
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass().on("error", notify.onError()))
        .pipe(autoprefixer({
            cascade: false,
        }))
        // .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
        .pipe(gulpif(!isProd, sourcemaps.write('.')))
        .pipe(dest('./app/css/'))
        .pipe(browserSync.stream());
};

const scripts = () => {
    return src(
        ['./src/js/main.js'])
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
        .pipe(gulpif(!isProd, sourcemaps.write('.')))
        .pipe(dest('./app/js'))
        .pipe(browserSync.stream());
}

const resources = () => {
    return src('./src/resources/**')
        .pipe(dest('./app'))
}

const fonts = () => {
    return src('./src/fonts/**')
        .pipe(dest('./app/fonts'))
}

const images = () => {
    return src([
        './src/img/**.jpg',
        './src/img/**.png',
        './src/img/**.jpeg',
        './src/img/*.svg',
        './src/img/**/*.jpg',
        './src/img/**/*.png',
        './src/img/**/*.jpeg'
    ])
        .pipe(gulpif(isProd, image()))
        .pipe(dest('./app/img'))
};

const htmlInclude = () => {
    return src('./src/pug/pages/*.pug')
        .pipe(
            pug({
                pretty: true,
            })
        )
        .pipe(dest('./app'))
        .pipe(browserSync.stream());
}

const libs = () => {
    return src(['./src/libs/*.js', './src/libs/*.css'])
        .pipe(dest('./app/libs'))
        .pipe(browserSync.stream());
}

const favicon = () => {
    return src(['./src/favicon/*.png', './src/favicon/*.xml', './src/favicon/*.ico', './src/favicon/*.json'])
        .pipe(dest('./app/favicon'))
        .pipe(browserSync.stream());
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: "./app"
        },
    });

    watch('./src/libs/*.css', libs);
    watch('./src/libs/*.js', libs);
    watch('./src/sass/**/*.sass', styles);
    watch('./src/js/**/*.js', scripts);
    watch('./src/pug/**/*.pug', htmlInclude);
    watch('./src/pug/pages/*.pug', htmlInclude);
    watch('./src/resources/**', resources);
    watch('./src/fonts/**', fonts);
    watch('./src/img/*.{jpg,jpeg,png,svg}', images);
    watch('./src/img/**/*.{jpg,jpeg,png}', images);
    watch('./src/img/svg/**.svg', svgSprites);
}

const cache = () => {
    return src('app/**/*.{css,js,svg,png,jpg,jpeg,woff2}', {
        base: 'app'
    })
        .pipe(rev())
        .pipe(revDel())
        .pipe(dest('app'))
        .pipe(rev.manifest('rev.json'))
        .pipe(dest('app'));
};

const rewrite = () => {
    const manifest = readFileSync('app/rev.json');
    src('app/css/*.css')
        .pipe(revRewrite({
            manifest
        }))
        .pipe(dest('app/css'));
    return src('app/**/*.html')
        .pipe(revRewrite({
            manifest
        }))
        .pipe(dest('app'));
}

const htmlMinify = () => {
    return src('app/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('app'));
}

const toProd = (done) => {
    isProd = true;
    done();
};

exports.default = series(clean, htmlInclude, scripts, styles, libs, fonts, resources, images, svgSprites, favicon, watchFiles);

exports.build = series(toProd, htmlInclude, scripts, styles, libs, fonts, resources, images, svgSprites, favicon);

exports.cache = series(cache, rewrite);
