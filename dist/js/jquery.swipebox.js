! function (e, i, t, s) {
  t.swipebox = function (o, a) {
    var n, p, r = {
        useCSS: !0
        , useSVG: !0
        , initialIndexOnArray: 0
        , removeBarsOnMobile: !0
        , hideCloseButtonOnMobile: !1
        , hideBarsDelay: 3e3
        , videoMaxWidth: 1140
        , vimeoColor: "cccccc"
        , beforeOpen: null
        , afterOpen: null
        , afterClose: null
        , afterMedia: null
        , nextSlide: null
        , prevSlide: null
        , loopAtEnd: !1
        , autoplayVideos: !1
        , queryStringData: {}
        , toggleClassOnLoad: ""
        , selector: null
      }
      , l = this
      , d = []
      , f = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i)
      , c = null !== f || i.createTouch !== s || "ontouchstart" in e || "onmsgesturechange" in e || navigator.msMaxTouchPoints
      , b = !!i.createElementNS && !!i.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
      , u = e.innerWidth ? e.innerWidth : t(e).width()
      , h = e.innerHeight ? e.innerHeight : t(e).height()
      , g = 0
      , w = '<div id="swipebox-overlay">					<div id="swipebox-container">						<div id="swipebox-slider"></div>						<div id="swipebox-top-bar">							<div id="swipebox-title"></div>						</div>						<div id="swipebox-bottom-bar">							<div id="swipebox-arrows">								<a id="swipebox-prev"></a>								<a id="swipebox-next"></a>							</div>						</div>						<a id="swipebox-close"></a>					</div>			</div>';
    l.settings = {}, t.swipebox.close = function () {
      n.closeSlide()
    }, t.swipebox.extend = function () {
      return n
    }, l.init = function () {
      l.settings = t.extend({}, r, a), t.isArray(o) ? (d = o, n.target = t(e), n.init(l.settings.initialIndexOnArray)) : t(o).on("click", l.settings.selector, function (e) {
        if ("slide current" === e.target.parentNode.className) return !1;
        n.destroy(), p = null === l.settings.selector ? t(o) : t(o).find(l.settings.selector), d = [];
        var i, s, a;
        a || (s = "data-rel", a = t(this).attr(s)), a || (s = "rel", a = t(this).attr(s)), a && "" !== a && "nofollow" !== a && (p = p.filter("[" + s + '="' + a + '"]')), p.each(function () {
          var e = null
            , i = null;
          t(this).attr("title") && (e = t(this).attr("title")), t(this).attr("href") && (i = t(this).attr("href")), d.push({
            href: i
            , title: e
          })
        }), i = p.index(t(this)), e.preventDefault(), e.stopPropagation(), n.target = t(e.target), n.init(i)
      })
    }, n = {
      init: function (e) {
        l.settings.beforeOpen && l.settings.beforeOpen(), this.target.trigger("swipebox-start"), t.swipebox.isOpen = !0, this.build(), this.openSlide(e), this.openMedia(e), this.preloadMedia(e + 1), this.preloadMedia(e - 1), l.settings.afterOpen && l.settings.afterOpen(e)
      }
      , build: function () {
        var i, e = this;
        t("body").append(w), b && l.settings.useSVG === !0 && (i = t("#swipebox-close").css("background-image"), i = i.replace("png", "svg"), t("#swipebox-prev, #swipebox-next, #swipebox-close").css({
          "background-image": i
        })), f && l.settings.removeBarsOnMobile && t("#swipebox-bottom-bar, #swipebox-top-bar").remove(), t.each(d, function () {
          t("#swipebox-slider").append('<div class="slide"></div>')
        }), e.setDim(), e.actions(), c && e.gesture(), e.keyboard(), e.animBars(), e.resize()
      }
      , setDim: function () {
        var i, s, o = {};
        "onorientationchange" in e ? e.addEventListener("orientationchange", function () {
          0 === e.orientation ? (i = u, s = h) : (90 === e.orientation || -90 === e.orientation) && (i = h, s = u)
        }, !1) : (i = e.innerWidth ? e.innerWidth : t(e).width(), s = e.innerHeight ? e.innerHeight : t(e).height()), o = {
          width: i
          , height: s
        }, t("#swipebox-overlay").css(o)
      }
      , resize: function () {
        var i = this;
        t(e).resize(function () {
          i.setDim()
        }).resize()
      }
      , supportTransition: function () {
        var t, e = "transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition".split(" ");
        for (t = 0; t < e.length; t++)
          if (i.createElement("div").style[e[t]] !== s) return e[t];
        return !1
      }
      , doCssTrans: function () {
        return l.settings.useCSS && this.supportTransition() ? !0 : void 0
      }
      , gesture: function () {
        var i, s, o, a, n, r, e = this
          , l = !1
          , p = !1
          , f = 10
          , c = 50
          , b = {}
          , h = {}
          , w = t("#swipebox-top-bar, #swipebox-bottom-bar")
          , m = t("#swipebox-slider");
        w.addClass("visible-bars"), e.setTimeout(), t("body").bind("touchstart", function (e) {
          return t(this).addClass("touching"), i = t("#swipebox-slider .slide").index(t("#swipebox-slider .slide.current")), h = e.originalEvent.targetTouches[0], b.pageX = e.originalEvent.targetTouches[0].pageX, b.pageY = e.originalEvent.targetTouches[0].pageY, t("#swipebox-slider").css({
            "-webkit-transform": "translate3d(" + g + "%, 0, 0)"
            , transform: "translate3d(" + g + "%, 0, 0)"
          }), t(".touching").bind("touchmove", function (e) {
            if (e.preventDefault(), e.stopPropagation(), h = e.originalEvent.targetTouches[0], !p && (n = o, o = h.pageY - b.pageY, Math.abs(o) >= c || l)) {
              var w = .75 - Math.abs(o) / m.height();
              m.css({
                top: o + "px"
              }), m.css({
                opacity: w
              }), l = !0
            }
            a = s, s = h.pageX - b.pageX, r = 100 * s / u, !p && !l && Math.abs(s) >= f && (t("#swipebox-slider").css({
              "-webkit-transition": ""
              , transition: ""
            }), p = !0), p && (s > 0 ? 0 === i ? t("#swipebox-overlay").addClass("leftSpringTouch") : (t("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"), t("#swipebox-slider").css({
              "-webkit-transform": "translate3d(" + (g + r) + "%, 0, 0)"
              , transform: "translate3d(" + (g + r) + "%, 0, 0)"
            })) : 0 > s && (d.length === i + 1 ? t("#swipebox-overlay").addClass("rightSpringTouch") : (t("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"), t("#swipebox-slider").css({
              "-webkit-transform": "translate3d(" + (g + r) + "%, 0, 0)"
              , transform: "translate3d(" + (g + r) + "%, 0, 0)"
            }))))
          }), !1
        }).bind("touchend", function (i) {
          if (i.preventDefault(), i.stopPropagation(), t("#swipebox-slider").css({
              "-webkit-transition": "-webkit-transform 0.4s ease"
              , transition: "transform 0.4s ease"
            }), o = h.pageY - b.pageY, s = h.pageX - b.pageX, r = 100 * s / u, l)
            if (l = !1, Math.abs(o) >= 2 * c && Math.abs(o) > Math.abs(n)) {
              var d = o > 0 ? m.height() : -m.height();
              m.animate({
                top: d + "px"
                , opacity: 0
              }, 300, function () {
                e.closeSlide()
              })
            }
            else m.animate({
              top: 0
              , opacity: 1
            }, 300);
          else p ? (p = !1, s >= f && s >= a ? e.getPrev() : -f >= s && a >= s && e.getNext()) : w.hasClass("visible-bars") ? (e.clearTimeout(), e.hideBars()) : (e.showBars(), e.setTimeout());
          t("#swipebox-slider").css({
            "-webkit-transform": "translate3d(" + g + "%, 0, 0)"
            , transform: "translate3d(" + g + "%, 0, 0)"
          }), t("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"), t(".touching").off("touchmove").removeClass("touching")
        })
      }
      , setTimeout: function () {
        if (l.settings.hideBarsDelay > 0) {
          var i = this;
          i.clearTimeout(), i.timeout = e.setTimeout(function () {
            i.hideBars()
          }, l.settings.hideBarsDelay)
        }
      }
      , clearTimeout: function () {
        e.clearTimeout(this.timeout), this.timeout = null
      }
      , showBars: function () {
        var e = t("#swipebox-top-bar, #swipebox-bottom-bar");
        this.doCssTrans() ? e.addClass("visible-bars") : (t("#swipebox-top-bar").animate({
          top: 0
        }, 500), t("#swipebox-bottom-bar").animate({
          bottom: 0
        }, 500), setTimeout(function () {
          e.addClass("visible-bars")
        }, 1e3))
      }
      , hideBars: function () {
        var e = t("#swipebox-top-bar, #swipebox-bottom-bar");
        this.doCssTrans() ? e.removeClass("visible-bars") : (t("#swipebox-top-bar").animate({
          top: "-50px"
        }, 500), t("#swipebox-bottom-bar").animate({
          bottom: "-50px"
        }, 500), setTimeout(function () {
          e.removeClass("visible-bars")
        }, 1e3))
      }
      , animBars: function () {
        var e = this
          , i = t("#swipebox-top-bar, #swipebox-bottom-bar");
        i.addClass("visible-bars"), e.setTimeout(), t("#swipebox-slider").click(function () {
          i.hasClass("visible-bars") || (e.showBars(), e.setTimeout())
        }), t("#swipebox-bottom-bar").hover(function () {
          e.showBars(), i.addClass("visible-bars"), e.clearTimeout()
        }, function () {
          l.settings.hideBarsDelay > 0 && (i.removeClass("visible-bars"), e.setTimeout())
        })
      }
      , keyboard: function () {
        var i = this;
        t(e).bind("keyup", function (e) {
          e.preventDefault(), e.stopPropagation(), 37 === e.keyCode ? i.getPrev() : 39 === e.keyCode ? i.getNext() : 27 === e.keyCode && i.closeSlide()
        })
      }
      , actions: function () {
        var e = this
          , i = "touchend click";
        d.length < 2 ? (t("#swipebox-bottom-bar").hide(), s === d[1] && t("#swipebox-top-bar").hide()) : (t("#swipebox-prev").bind(i, function (i) {
          i.preventDefault(), i.stopPropagation(), e.getPrev(), e.setTimeout()
        }), t("#swipebox-next").bind(i, function (i) {
          i.preventDefault(), i.stopPropagation(), e.getNext(), e.setTimeout()
        })), t("#swipebox-close").bind(i, function () {
          e.closeSlide()
        })
      }
      , setSlide: function (e, i) {
        i = i || !1;
        var s = t("#swipebox-slider");
        g = 100 * -e, this.doCssTrans() ? s.css({
          "-webkit-transform": "translate3d(" + 100 * -e + "%, 0, 0)"
          , transform: "translate3d(" + 100 * -e + "%, 0, 0)"
        }) : s.animate({
          left: 100 * -e + "%"
        }), t("#swipebox-slider .slide").removeClass("current"), t("#swipebox-slider .slide").eq(e).addClass("current"), this.setTitle(e), i && s.fadeIn(), t("#swipebox-prev, #swipebox-next").removeClass("disabled"), 0 === e ? t("#swipebox-prev").addClass("disabled") : e === d.length - 1 && l.settings.loopAtEnd !== !0 && t("#swipebox-next").addClass("disabled")
      }
      , openSlide: function (i) {
        t("html").addClass("swipebox-html"), c ? (t("html").addClass("swipebox-touch"), l.settings.hideCloseButtonOnMobile && t("html").addClass("swipebox-no-close-button")) : t("html").addClass("swipebox-no-touch"), t(e).trigger("resize"), this.setSlide(i, !0)
      }
      , preloadMedia: function (e) {
        var i = this
          , t = null;
        d[e] !== s && (t = d[e].href), i.isVideo(t) ? i.openMedia(e) : setTimeout(function () {
          i.openMedia(e)
        }, 1e3)
      }
      , openMedia: function (e) {
        var o, a, i = this;
        return d[e] !== s && (o = d[e].href), 0 > e || e >= d.length ? !1 : (a = t("#swipebox-slider .slide").eq(e), void(i.isVideo(o) ? (a.html(i.getVideo(o)), l.settings.afterMedia && l.settings.afterMedia(e)) : (a.addClass("slide-loading"), i.loadMedia(o, function () {
          a.removeClass("slide-loading"), a.html(this), l.settings.afterMedia && l.settings.afterMedia(e)
        }))))
      }
      , setTitle: function (e) {
        var i = null;
        t("#swipebox-title").empty(), d[e] !== s && (i = d[e].title), i ? (t("#swipebox-top-bar").show(), t("#swipebox-title").append(i)) : t("#swipebox-top-bar").hide()
      }
      , isVideo: function (e) {
        if (e) {
          if (e.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || e.match(/vimeo\.com\/([0-9]*)/) || e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/)) return !0;
          if (e.toLowerCase().indexOf("swipeboxvideo=1") >= 0) return !0
        }
      }
      , parseUri: function (e, s) {
        var o = i.createElement("a")
          , a = {};
        return o.href = decodeURIComponent(e), o.search && (a = JSON.parse('{"' + o.search.toLowerCase().replace("?", "").replace(/&/g, '","').replace(/=/g, '":"') + '"}')), t.isPlainObject(s) && (a = t.extend(a, s, l.settings.queryStringData)), t.map(a, function (e, i) {
          return e && e > "" ? encodeURIComponent(i) + "=" + encodeURIComponent(e) : void 0
        }).join("&")
      }
      , getVideo: function (e) {
        var i = ""
          , t = e.match(/((?:www\.)?youtube\.com|(?:www\.)?youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/)
          , s = e.match(/(?:www\.)?youtu\.be\/([a-zA-Z0-9\-_]+)/)
          , o = e.match(/(?:www\.)?vimeo\.com\/([0-9]*)/)
          , a = "";
        return t || s ? (s && (t = s), a = n.parseUri(e, {
          autoplay: l.settings.autoplayVideos ? "1" : "0"
          , v: ""
        }), i = '<iframe width="560" height="315" src="//' + t[1] + "/embed/" + t[2] + "?" + a + '" frameborder="0" allowfullscreen></iframe>') : o ? (a = n.parseUri(e, {
          autoplay: l.settings.autoplayVideos ? "1" : "0"
          , byline: "0"
          , portrait: "0"
          , color: l.settings.vimeoColor
        }), i = '<iframe width="560" height="315"  src="//player.vimeo.com/video/' + o[1] + "?" + a + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>') : i = '<iframe width="560" height="315" src="' + e + '" frameborder="0" allowfullscreen></iframe>', '<div class="swipebox-video-container" style="max-width:' + l.settings.videoMaxWidth + 'px"><div class="swipebox-video">' + i + "</div></div>"
      }
      , loadMedia: function (e, i) {
        if (0 === e.trim().indexOf("#")) i.call(t("<div>", {
          "class": "swipebox-inline-container"
        }).append(t(e).clone().toggleClass(l.settings.toggleClassOnLoad)));
        else if (!this.isVideo(e)) {
          var s = t("<img>").on("load", function () {
            i.call(s)
          });
          s.attr("src", e)
        }
      }
      , getNext: function () {
        var i, e = this
          , s = t("#swipebox-slider .slide").index(t("#swipebox-slider .slide.current"));
        s + 1 < d.length ? (i = t("#swipebox-slider .slide").eq(s).contents().find("iframe").attr("src"), t("#swipebox-slider .slide").eq(s).contents().find("iframe").attr("src", i), s++, e.setSlide(s), e.preloadMedia(s + 1), l.settings.nextSlide && l.settings.nextSlide(s)) : l.settings.loopAtEnd === !0 ? (i = t("#swipebox-slider .slide").eq(s).contents().find("iframe").attr("src"), t("#swipebox-slider .slide").eq(s).contents().find("iframe").attr("src", i), s = 0, e.preloadMedia(s), e.setSlide(s), e.preloadMedia(s + 1), l.settings.nextSlide && l.settings.nextSlide(s)) : (t("#swipebox-overlay").addClass("rightSpring"), setTimeout(function () {
          t("#swipebox-overlay").removeClass("rightSpring")
        }, 500))
      }
      , getPrev: function () {
        var i, e = t("#swipebox-slider .slide").index(t("#swipebox-slider .slide.current"));
        e > 0 ? (i = t("#swipebox-slider .slide").eq(e).contents().find("iframe").attr("src"), t("#swipebox-slider .slide").eq(e).contents().find("iframe").attr("src", i), e--, this.setSlide(e), this.preloadMedia(e - 1), l.settings.prevSlide && l.settings.prevSlide(e)) : (t("#swipebox-overlay").addClass("leftSpring"), setTimeout(function () {
          t("#swipebox-overlay").removeClass("leftSpring")
        }, 500))
      }
      , nextSlide: function (e) {}
      , prevSlide: function (e) {}
      , closeSlide: function () {
        t("html").removeClass("swipebox-html"), t("html").removeClass("swipebox-touch"), t(e).trigger("resize"), this.destroy()
      }
      , destroy: function () {
        t(e).unbind("keyup"), t("body").unbind("touchstart"), t("body").unbind("touchmove"), t("body").unbind("touchend"), t("#swipebox-slider").unbind(), t("#swipebox-overlay").remove(), t.isArray(o) || o.removeData("_swipebox"), this.target && this.target.trigger("swipebox-destroy"), t.swipebox.isOpen = !1, l.settings.afterClose && l.settings.afterClose()
      }
    }, l.init()
  }, t.fn.swipebox = function (e) {
    if (!t.data(this, "_swipebox")) {
      var i = new t.swipebox(this, e);
      this.data("_swipebox", i)
    }
    return this.data("_swipebox")
  }
}(window, document, jQuery);