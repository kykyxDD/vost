'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer')
const del = require('del');
const rigger = require('gulp-rigger');
var minifycss = require('gulp-minify-css');

const path = {
	src: {
		css: './src/styles/main.scss',
		cssTour: './src/styles/tour-page.scss',
		html: './src/{index,tour,order}.html',
		js: './src/js/{main, tour}.js',
	},
	watch: {
		scss: './src/styles/*.scss',
		assets: './src/assets/**',
		html: './src/**/*.html',
		js: './src/js/*.js',
	},
	build: {
		css: './build/css/',
		assets: './build/assets/',
		js: './build/js',
	},
	clean: './build/'
}

function taskStyle(src, new_file){
	return gulp.src(src) // Gets all src ending with .scss in app/scss and children dirs
	.pipe(sourcemaps.init())
	.pipe(sass.sync().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(minifycss())
	.pipe(sourcemaps.write('.'))
	.pipe(concat(new_file))
.pipe(gulp.dest(path.build.css))
}

gulp.task('scss', taskStyle.bind(this, path.src.css, 'main.css'));

gulp.task('scss-tour', taskStyle.bind(this, path.src.cssTour, 'tour-page.css'));

gulp.task('html', function () {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest('build/'));
});

gulp.task('js', function () {
    return gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        // .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        // .pipe(reload({stream: true})); //И перезагрузим сервер
});

// gulp.task('watch', function(){
//   gulp.watch(path.watch.scss, ['sass']); 
//   // Other watchers
// })

gulp.task('assets', function(){
	return gulp.src(path.watch.assets, {since: gulp.lastRun('assets')})
	.pipe(gulp.dest(path.build.assets))
})

gulp.task('clean', function() {
	return del('build')
});

gulp.task('build',  gulp.series('clean', gulp.parallel('scss', 'js', 'assets', 'html')));
gulp.task('watch', function() {
	gulp.watch(path.watch.scss, gulp.series('scss'))
	// gulp.watch(path.watch.scss, gulp.series('scss-tour'))
	gulp.watch(path.watch.js, gulp.series('js'))
	gulp.watch(path.watch.assets, gulp.series('assets'))
	gulp.watch(path.watch.html, gulp.series('html'))
})

gulp.task('default',  gulp.series('build', 'watch'));

