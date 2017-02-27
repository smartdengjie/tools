
gulp.spritesmith修改px为rem单位
====
移动端开发中，使用gulp.spritesmith进行小图sprite并生成样式，但由于spritesmith默认是以px为单位，
所以就把插件的内容修改了下让生成rem单位并且能把background-size设置为雪碧图的宽高。

### 1.首先修改gulp.spritesmith\node_modules\spritesheet-templates\lib\spritesheet-templates.js

    ['x', 'y', 'offset_x', 'offset_y', 'height', 'width', 'total_height', 'total_width'].forEach(function (key) {
    if (item[key] !== undefined) {
      px[key] = item[key]/75 + 'rem';
    }
  });
修改的地方是item[key]/75+'rem';这句，我的是设置了750px宽度，所以这里除以75来转换得到rem值。

### 2.修改gulp.spritesmith\node_modules\spritesheet-templates\lib\templates\css.template.handlebars

在模板页中加入生成background-size内容

复制代码
    {{/block}}
      {{#block "sprites"}}
      .cicon {
      display: inline-block;
      background-size: {{spritesheet.px.width}} {{spritesheet.px.height}};
    }
    {{#each sprites}}
    {{{selector}}} {
    background-image: url({{{escaped_image}}});
    background-position: {{px.offset_x}} {{px.offset_y}};
    width: {{px.width}};
    height: {{px.height}};
    }
    {{/each}}
    {{/block}}
复制代码
主要添加了加粗的代码行。以上两点修改完成就可以把spritesmith生成的px转换成rem，增加background-size主要是因为px单位下图片背景位置跟大小默认就是雪碧图中的大小，所以转换成rem后需要进行修改。

PS：rem单位下在不同设备中可能出现图片中出现了雪碧图中其他图的边边角角，所以这里需要设置图片合成的时候彼此之间有一定的间隙，这个只要是gulpfile中设置下padding:10即可。

    var spriteData = gulp.src(base_url+'_images/icons/*.+(jpeg|jpg|png)').pipe(spritesmith({
    imgName: 'icons_sprite.png',
    cssName: 'icons_sprite.css',
    cssFormat: 'css',
    padding: 10
    }));