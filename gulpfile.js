// Todo esto para automatizar la compilación de sass

const {src, dest, watch, parallel} = require ("gulp"); //Extraemos toda la funcionalidad de gulp. En este caso extraemos src (identifica archivo) y dest (almacena)

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css (done){
    src('src/scss/**/*.scss') //Identificar el archivo de SASS
        .pipe(plumber())
        .pipe( sass() ) //Compilarla
        .pipe(dest("build/css")); //Almacenar

    done(); // Callback que avisa a gulp de la finalización de la función
}


//Con esta función, con el paquete gulp-imagemin v.7.1.0 lo que hacemos es optimizar los jpg para que pesen menos

function imagenes (done) {
    const opciones = {
        optimizationLevel: 3
    }
    src ('img/**/*.{png,jpg}')
    .pipe( cache (imagemin(opciones)))
    .pipe(dest("build/img"));

    done();

}

//Con esto automatizamos la conversión de todas las imágenes jpg y png a formato webp

function versionWebp (done) {
    const opciones = {
        quality: 50
    };
    src ('img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest("build/img"));

    done();
}

function versionAvif (done) {
    const opciones = {
        quality: 50
    };
    src ('img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest("build/img"));

    done();
}

function javascript ( done) {
    src ('src/js/**/*.js')
        .pipe(dest('build/js'));

    done();
}

function dev (done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev); 

