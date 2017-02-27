var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
 
gulp.task('sprite', function () {
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    padding:20
    //PS：rem单位下在不同设备中可能出现图片中出现了雪碧图中其他图的边边角角，
    //所以这里需要设置图片合成的时候彼此之间有一定的间隙，这个只要是gulpfile中设置下padding:20即可。
   
    // cssName:'sprite.scss',
    // cssFormat:'scss'
  }));
  return spriteData.pipe(gulp.dest('dist/'));
});

//压缩

gulp.task('sprite:images', function() {
  return gulp.src(configs.spritesOutputPath + '/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(imagemin({interlaced: true}))
 
});

