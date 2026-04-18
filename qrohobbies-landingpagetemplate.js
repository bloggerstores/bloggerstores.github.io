/* ================================================================================================

    ¡Advertencia!

===================================================================================================

    Modificar o eliminar este archivo puede provocar:

    1. Daños o errores en la plantilla
    2. Eliminación de la función de actualización/reparación automática de la plantilla
    3. Pérdida de soporte/asistencia nuestra

    Gracias.

    Última actualización: 13/11/2024 a las 16:44

================================================================================================ */

window.onload = function () {
  custom();
  pop();
  popwin();
  shortcode();
  lazyload();
  timeago();
  main();
};
function main() {
  $(window).click(function () {
    $("#chat").removeClass("show");
  });
  $("#chat figure").on("click", function (_0xf780fd) {
    _0xf780fd.stopPropagation();
    $("#chat").addClass("show");
    $("#chat figure figcaption").hide();
  });
  $("#chat .wrap").on('click', function (_0x10a6b8) {
    _0x10a6b8.stopPropagation();
  });
  $(".link").each(function () {
    var _0x48029b = $(this).attr('href');
    $(this).attr('href', _0x48029b.split('|')[0x1]).text(_0x48029b.split('|')[0x0]);
  });
  $(window).on("beforeunload", function () {
    $("body").addClass("loading");
    setTimeout(function () {
      $("body").removeClass("loading");
    }, 0x7d0);
  });
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 0x0) {
      $("#header").addClass("shadow");
    } else {
      $("#header").removeClass("shadow");
    }
  });
  if ($("[data-feed]").length) {
    $('[data-feed]').each(function () {
      var _0xf77462 = $(this);
      var _0x13740a = $(this).attr('data-feed');
      _0xf77462.addClass("loading");
      _0xf77462.load(_0x13740a + " .is_loop", function () {
        var _0x166606 = $(this).html();
        _0xf77462.html(_0x166606);
        var _0xa3f4f0 = _0xf77462.closest("article").attr('id');
        if (_0xa3f4f0) {
          if (_0xf77462.find("article#" + _0xa3f4f0).length) {
            _0xf77462.find("article#" + _0xa3f4f0).remove();
          } else {
            _0xf77462.find("article:last-of-type").remove();
          }
        }
        lazyload();
        timeago();
        _0xf77462.removeClass("loading");
      });
    });
  }
  $(".faq-item h2").on("click", function () {
    $(this).closest(".faq-item").toggleClass("open");
    $(this).next('p').slideToggle(0xc8);
  });
  $(".faq-item:first h2").trigger("click");
  $("#pop-bagikan .copy button").on("click", function (_0x1d4600) {
    var _0x34a389 = $(this);
    _0x34a389.siblings("input").select();
    document.execCommand("copy");
    _0x34a389.text("¡Copiado!");
    setTimeout(function () {
      _0x34a389.text("Copiar");
    }, 0x7d0);
  });
  if (window.location.hash) {
    if ($(window.location.hash).length) {
      var _0x55fcd2 = $("#header").outerHeight();
      var _0x4cd679 = $(".is_single article .attr-sticky").outerHeight();
      setTimeout(function () {
        $("html, body").stop().animate({
          'scrollTop': $(window.location.hash).offset().top - _0x55fcd2 - _0x4cd679 - 0x14
        }, 0x1f4);
        $(window.location.hash).addClass("focus");
        setTimeout(function () {
          $(window.location.hash).removeClass("focus");
        }, 0x7d0);
      }, 0x1f4);
    }
  }
  $(document).on('click', "a[href*=\"#\"]", function (_0x25ed8a) {
    var _0x4b5fd8 = $(this).attr("href").split('#')[0x0];
    var _0x573c84 = '#' + $(this).attr('href').split('#')[0x1];
    if (!_0x4b5fd8) {
      if ($(_0x573c84).length) {
        _0x25ed8a.preventDefault();
        var _0x16c48b = $("#header").outerHeight();
        var _0x34a66b = $(".is_single article .attr-sticky").outerHeight();
        if (_0x34a66b) {
          $("html, body").stop().animate({
            'scrollTop': $(_0x573c84).offset().top - _0x16c48b - _0x34a66b - 0x14
          }, 0x1f4);
        } else {
          $("html, body").stop().animate({
            'scrollTop': $(_0x573c84).offset().top - _0x16c48b - 0x14
          }, 0x1f4);
        }
        $(_0x573c84).addClass("focus");
        setTimeout(function () {
          $(_0x573c84).removeClass("focus");
        }, 0x7d0);
      }
    }
  });
  if ($(window).scrollTop() > 0x0) {
    $("#header").addClass("onScroll");
  } else {
    $("#header").removeClass("onScroll");
  }
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 0x0) {
      $("#header").addClass("onScroll");
    } else {
      $("#header").removeClass("onScroll");
    }
    if ($(this).scrollTop() > $(window).height() / 0x2) {
      $("#chat").addClass("open");
    } else {
      $("#chat").removeClass('open');
    }
  });
  $(document).on("click", ".loadmore-btn", function (_0x33c5db) {
    _0x33c5db.preventDefault();
    let _0x55fdf3 = $(this).attr("href");
    let _0x55a358 = $("#blog-pager .loadmore-btn");
    if (_0x55fdf3) {
      $.ajax({
        'url': _0x55fdf3,
        'beforeSend': function () {
          _0x55a358.addClass('loading');
        },
        'complete': function () {
          _0x55a358.removeClass('loading');
        },
        'success': function (_0x14be83) {
          let _0x51141c = $(_0x14be83).find('.is_loop').html();
          let _0x361258 = $(_0x14be83).find(".loadmore-btn").attr("href");
          $(".is_loop").append(_0x51141c);
          _0x55a358.show();
          lazyload();
          timeago();
          if (_0x361258) {
            _0x55a358.attr('href', _0x361258);
          } else {
            _0x55a358.fadeOut();
          }
        }
      });
    }
  });
  if ($_config.url.view == "single") {
    var _0x3da461 = $("a.blog-pager-older-link").text();
    var _0x32b8ce = $("a.blog-pager-older-link").attr("href");
    $("a.blog-pager-older-link").load(_0x32b8ce + " article h1", function () {
      var _0x1f8b44 = $("a.blog-pager-older-link").text();
      $("a.blog-pager-older-link").html("<figure class=\"loading\"></figure><div class=\"flex left\"><div class=\"wrap\"><small><b>" + _0x3da461 + "</b></small><h3>" + _0x1f8b44 + "</h3></div></div>");
      $("a.blog-pager-older-link > figure").load(_0x32b8ce + " article .post-body img:first-of-type", function () {
        var _0x1f279b = $(this).html();
        var _0x46ae5c = _0x1f279b.split("src=\"")[0x1];
        var _0x457dab = _0x46ae5c.split("\"")[0x0];
        if (_0x457dab.indexOf("blogger.googleusercontent.com") >= 0x0) {
          $resize = _0x457dab.split('=')[0x0] + "=w100-h100-c";
        } else {
          var _0x2ac90f = _0x457dab.split('/')[0x7];
          $resize = _0x457dab.replace("1.bp.", '2.bp.').replace(_0x2ac90f, "w100-h100-c");
        }
        $("a.blog-pager-older-link > figure").html("<img src=\"" + $resize + "\"/>").removeClass("loading");
      });
    });
    var _0x5b3bf6 = $('a.blog-pager-newer-link').text();
    var _0x229569 = $('a.blog-pager-newer-link').attr("href");
    $("a.blog-pager-newer-link").load(_0x229569 + " article h1", function () {
      var _0xc07e92 = $("a.blog-pager-newer-link").text();
      $("a.blog-pager-newer-link").html("<figure class=\"loading\"></figure><div class=\"flex right\"><div class=\"wrap\"><small><b>" + _0x5b3bf6 + '</b></small><h3>' + _0xc07e92 + '</h3></div></div>');
      $("a.blog-pager-newer-link > figure").load(_0x229569 + " article .post-body img:first-of-type", function () {
        var _0x32fb4f = $(this).html();
        var _0x22a05b = _0x32fb4f.split("src=\"")[0x1];
        var _0x38112b = _0x22a05b.split("\"")[0x0];
        if (_0x38112b.indexOf("blogger.googleusercontent.com") >= 0x0) {
          $resize = _0x38112b.split('=')[0x0] + "=w100-h100-c";
        } else {
          var _0x1c25bc = _0x38112b.split('/')[0x7];
          $resize = _0x38112b.replace("1.bp.", '2.bp.').replace(_0x1c25bc, "w100-h100-c");
        }
        $("a.blog-pager-newer-link > figure").html("<img src=\"" + $resize + "\"/>").removeClass("loading");
      });
    });
  }
  var _0x42b51a = document.createElement("link");
  _0x42b51a.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
  _0x42b51a.rel = 'stylesheet';
  document.body.appendChild(_0x42b51a);
  var _0x1dff80 = document.createElement("script");
  _0x1dff80.src = "https://unpkg.com/aos@2.3.1/dist/aos.js";
  _0x1dff80.type = "text/javascript";
  document.body.appendChild(_0x1dff80);
  _0x1dff80.onload = function () {
    AOS.init();
  };
}
function lazyload() {
  $("[data-src]").each(function () {
    var _0x1f1584 = $(this).attr("data-src");
    $(this).attr('src', _0x1f1584).removeAttr("data-src");
  });
}
function timeago() {
  $("[datetime]:not(.timeago)").each(function () {
    var _0x2605b0 = $(this);
    var _0x5828ba = _0x2605b0.attr("datetime");
    _0x2605b0.addClass('timeago');
    if (!_0x2605b0.attr("title")) {
      _0x2605b0.attr("title", _0x5828ba);
    }
    _0x2605b0.text(_0x4dd8bd(_0x5828ba));
  });
  function _0x4dd8bd(_0xe2c9f3) {
    var _0x54e179 = "hace";
    var _0x41c071 = "segundo";
    var _0x5ee066 = "minuto";
    var _0x5d7850 = "hora";
    var _0x273307 = "día";
    var _0x5a17de = "mes";
    var _0x349aff = "año";
    if ($_config.language == 'in') {
      _0x54e179 = "hace";
      _0x41c071 = "segundo";
      _0x5ee066 = "minuto";
      _0x5d7850 = "hora";
      _0x273307 = "día";
      _0x5a17de = "mes";
      _0x349aff = "año";
    }
    var _0x2ba68b = new Date(_0xe2c9f3);
    var _0x5cd89b = _0x54e179;
    var _0x1789f8 = new Date() - _0x2ba68b;
    return _0x1789f8 < 0xea60 ? Math.round(_0x1789f8 / 0x3e8) + " " + _0x41c071 + " " + _0x5cd89b : _0x1789f8 < 0x36ee80 ? Math.round(_0x1789f8 / 0xea60) + " " + _0x5ee066 + " " + _0x5cd89b : _0x1789f8 < 86400000 ? Math.round(_0x1789f8 / 0x36ee80) + " " + _0x5d7850 + " " + _0x5cd89b : _0x1789f8 < 2592000000 ? Math.round(_0x1789f8 / 86400000) + " " + _0x273307 + " " + _0x5cd89b : _0x1789f8 < 31536000000 ? Math.round(_0x1789f8 / 2592000000) + " " + _0x5a17de + " " + _0x5cd89b : Math.round(_0x1789f8 / 31536000000) + " " + _0x349aff + " " + _0x5cd89b;
  }
  $("#comments .datetime a:not(.timeago)").each(function () {
    var _0x47c06e = $(this);
    var _0x215f2f = _0x47c06e.text();
    _0x47c06e.attr("datetime", _0x215f2f);
    var _0x4a0216 = _0x47c06e.attr("datetime");
    _0x47c06e.addClass("timeago");
    _0x47c06e.attr("title", _0x4a0216);
    _0x47c06e.text(_0x4dd8bd(_0x4a0216));
  });
}
function pop() {
  if ($('[target=pop-video]').length) {
    $pop_video_html = "        <div id=\"pop-video\" data-pop-title=\"Video\" data-pop-width=\"960\">            <div class=\"video\">                <iframe allowfullscreen=\"true\"></iframe>            </div>        </div>        ";
    $($pop_video_html).appendTo("body");
  }
  $("[id*=\"pop-\"]:not(\".pop-loaded\")").each(function () {
    var _0x4ecb1f = $(this);
    var _0x57a1b6 = _0x4ecb1f.attr("data-pop-title");
    var _0x1ea4ae = _0x4ecb1f.attr('data-pop-width');
    _0x4ecb1f.wrap("<div class=\"pop\"></div>");
    _0x4ecb1f.wrap("<div class=\"pop-wrap\"></div>");
    _0x4ecb1f.addClass("pop-content pop-loaded");
    var _0x4b746e = "            <header class=\"pop-header\">                <div class=\"pop-title\">                    <h3>                        " + _0x57a1b6 + "                    </h3>                </div>                <div class=\"pop-close\">                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z\"/></svg>                </div>            </header>        ";
    _0x4ecb1f.closest('.pop-wrap').prepend(_0x4b746e);
    if (_0x1ea4ae) {
      _0x4ecb1f.closest(".pop-wrap").css("width", _0x1ea4ae);
    }
  });
  $(".pop-close").on("click", function () {
    $(this).closest('.pop').removeClass('open');
    $("body").removeClass("pop-open");
    if ($("[id=pop-video] iframe").length) {
      $("[id=pop-video] iframe").attr("src", '');
    }
  });
  $(document).on("click", "[target*=\"pop-\"]", function (_0x3b65d3) {
    _0x3b65d3.preventDefault();
    var _0x329fb2 = $(this);
    var _0x16af05 = _0x329fb2.attr("target");
    var _0x5bc22d = _0x329fb2.attr("data-pop-title") ? _0x329fb2.attr('data-pop-title') : $('#' + _0x16af05).attr('data-pop-title');
    _0x329fb2.closest('.pop').removeClass("open");
    $("body").removeClass("pop-open");
    if ($('#' + _0x16af05).length) {
      $("body").addClass('pop-open');
      $('#' + _0x16af05).closest(".pop").addClass('open');
      if (_0x329fb2.closest(".pop-content").length) {
        $back_id = _0x329fb2.closest(".pop-content").attr('id');
        _0x5bc22d = "<a target=\"" + $back_id + "\"><i class=\"pop-back\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z\"/></svg></i></a>" + _0x5bc22d;
      }
      if (_0x5bc22d) {
        $('#' + _0x16af05).closest('.pop').find(".pop-title h3").html(_0x5bc22d);
      }
      $("[data-src]").each(function () {
        var _0xa058a5 = $(this).attr('data-src');
        $(this).attr("src", _0xa058a5).removeAttr("data-src");
      });
    }
    if (_0x16af05 == "pop-video") {
      $href = $(this).attr("href");
      var _0x3cfb79 = $href.split('/')[0x3];
      if ($href.indexOf("https://www.youtube.com/watch?v=") >= 0x0) {
        _0x3cfb79 = get_url_parameter('v', $href);
      }
      $("[id=pop-video] iframe").attr('src', "https://www.youtube.com/embed/" + _0x3cfb79 + "?autoplay=1&showinfo=0");
    }
  });
  $(document).on("click", ".pop.open", function () {
    $(this).find('.pop-close').trigger('click');
  });
  $(document).on("click", ".pop-wrap", function (_0x2a53f0) {
    _0x2a53f0.stopPropagation();
  });
}
function popwin() {
  $(document).on("click", "[target=\"_popwin\"]", function (_0x2b5463) {
    _0x2b5463.stopPropagation();
    _0x2b5463.preventDefault();
    var _0x3cc2de = $(this).attr("href");
    var _0x52e8ef = $(this).attr("data-popwin-width");
    var _0x2a4ef4 = $(this).attr("data-popwin-height");
    var _0x556285 = 0x3c0;
    if (_0x52e8ef) {
      _0x556285 = _0x52e8ef;
    }
    var _0x1ce85f = 0x21c;
    if (_0x2a4ef4) {
      _0x1ce85f = _0x2a4ef4;
    }
    var _0x370054 = Number(screen.width / 0x2 - _0x556285 / 0x2);
    var _0x23644b = Number(screen.height / 0x2 - _0x1ce85f / 0x2);
    var _0xe34c6e = window.open(_0x3cc2de, '', "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=" + _0x556285 + ", height=" + _0x1ce85f + ", top=" + _0x23644b + ", left=" + _0x370054);
    _0xe34c6e.focus();
  });
}
function shortcode() {
  $(".post-body").each(function () {
    $(this).html($(this).html().replace(/\[youtube\]/g, "<div class=\"video\"><iframe allowfullscreen=\"true\" data-shortcode=\"youtube\" data-src=\"").replace(/\[\/youtube\]/g, "\"></iframe></div>").replace(/\[code\]/g, "<pre data-shortcode=\"code\"><code>").replace(/\[\/code\]/g, "</code></pre>").replace(/\[img\]/g, "<img style=\"display:block;width:100%;border-radius:10px;\" data-shortcode=\"img\" src=\"").replace(/\[\/img\]/g, "\" alt=\"image\"/>").replace(/\[url\]/g, "<a data-shortcode=\"url\" href=\"").replace(/\[\/url\]/g, "\" target=\"_blank\" rel=\"nofollow external\">Ver Enlace</a>"));
  });
  $('[data-shortcode]').each(function () {
    var _0x37db33 = $(this).attr("data-shortcode");
    if (_0x37db33 == 'img') {
      var _0x3dbbf5 = $(this).attr("src");
      $(this).wrap("<a class=\"lightbox\" href=\"" + _0x3dbbf5 + "\"></a>");
    }
    if (_0x37db33 == "youtube") {
      var _0x392bff = $(this).attr("data-src");
      var _0x351daf = _0x392bff.split('/')[0x3];
      if (_0x392bff.indexOf('https://www.youtube.com/watch?v=') >= 0x0) {
        _0x351daf = get_url_parameter('v', _0x392bff);
      }
      $(this).attr("data-src", "https://www.youtube.com/embed/" + _0x351daf + '?autoplay=1&rel=0');
    }
  });
}
