import gulpClean from "gulp-clean";
import gulp from "gulp";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import imageMin from "gulp-imagemin";
import autoPrefixer from "gulp-autoprefixer";
import GulpCleanCss from "gulp-clean-css";
import bc from "browser-sync";

const browserSync = bc.create();
const sass = gulpSass(dartSass);

const html = () => gulp.src("./*.html").pipe(gulp.dest("build"));
const img = () => gulp.src("./img/**/*").pipe(imageMin()).pipe(gulp.dest("build/img"));
const clean = () => gulp.src("build", {allowEmpty: true}).pipe(gulpClean());
const scss = () => gulp.src("./styles/**/*.scss").pipe(sass().on('error', sass.logError)).pipe(autoPrefixer({overrideBrowserslist: ['last 2 versions'],
cascade: false})).pipe(GulpCleanCss()).pipe(gulp.dest("build"))
const serve = () => {
    browserSync.init({
        server: "./build"
    });
    gulp.watch("./*.html", html).on("change", browserSync.reload)
    gulp.watch("./styles/**/*.scss", scss).on("change", browserSync.reload)
} 


gulp.task("build", gulp.series(clean, html, img, scss, serve));