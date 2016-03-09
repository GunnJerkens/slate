/*
 * slate - a framework for creating touchscreen applications
 *
 * Built using Backbone.js for Gunn/Jerkens
 */

/* global window,_,Backbone,jQuery,Handlebars */

(function (window,_,Bb,$,Handlebars,undefined) {
  "use strict";

  var Slate = function(views) {

    var slate = this;

    slate.views = views;
    slate.mainView = new slate.MainView();

    $(document).on('click', '.change-view', slate.changeViewListener);

    _.each(slate.views, function(menuItem) {
      var menuView = new slate.MenuView(menuItem);
      $('#menu-container').append(menuView.el);
    });

  };

  Slate.prototype = {

    /**
     * Instantiates the menu view on the left column
     *
     * @return void
     */
    MenuView: Bb.View.extend({
      tagName: "li",
      events: {},

      initialize: function(view) {
        this.view = view || {};

        if (this.view.hidden) {
          this.$el.addClass('hidden');
        }

        this.render();
      },

      render: function(){
        var markup, template;

        markup   = $('#hb-menu').html();
        template = Handlebars.compile(markup);

        $(this.el).html(template(this.view));
        return this;
      },

      changeView: function(e){
        e.stopPropagation();
        var view = $(e.currentTarget).attr('data-view');
        slate.mainView.render(view);
      }
    }),

    /**
     * Extends backbone and renders the main #content window
     *
     * @return void
     */
    MainView: Bb.View.extend({
      el: "#main-container",

      initialize: function() {},

      render: function(slug, params) {
        var _this = this;

        slate.viewParams = params;

        _this.$el.empty();

        $.ajax({
          url: "partials/" + slug + ".html",
        }).done(function(templateSource) {
          console.log(templateSource);

          $(_this.el).html(templateSource);
          $('#content').removeClass();
          $('#content').addClass(slug);
        });

        return _this;
      }
    }),

    /**
     * This handles the swap state of our views, for a
     * href to use the "change-view" class to activate
     *
     * @param e object (event)
     *
     * @return void
     */
    changeViewListener: function(e) {
      var target, view, paramsQuery, viewParams;

      e.stopPropagation();

      target = $(e.currentTarget);
      view = target.attr('data-view');
      paramsQuery = target.attr('data-view-params');

      if ($('.info-overlay').length > 0) {
        $('.info-overlay').remove();
      }

      if ( paramsQuery ) {
        viewParams = _
          .chain(paramsQuery.split('&'))
          .map(function(params) {
            var p = params.split('=');
            return [p[0], decodeURIComponent(p[1])];
          })
          .object()
          .value();
      }

      slate.applyActiveStates(target, view, viewParams);
      slate.mainView.render(view, viewParams);
    },

    /**
     * Use this method to apply active states to your menu classes
     * via jQuery, passed in are the active target element that was
     * clicked, which view is being rendered, and any parameters that
     * are being passed to said view.
     *
     * @param target object (jQuery)
     * @param view string
     * @param parameters object
     *
     * @return void
     */
    applyActiveStates: function(target, view, parameters) {
      return false;
    },

    /**
     * Utility method that makes our slugs easier to work with.
     * They return lowercased, without spaces or white space
     * (replaced by a '-')
     *
     * @param text string
     *
     * @return string
     */
    convertToSlug: function(text) {
      return text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w\-]+/g,'');
    }

  };

  window.Slate = Slate;

}(window,_,Backbone,jQuery,Handlebars));
