/*
 * Slate.js - a framework for creating touchscreen applications
 * Built using Backbone.js
 * Authors: Christopher Lovejoy (github.com/monking) and Andrew Kostka (github.com/apkostka)
 *
 */
/* global window,_,Backbone,jQuery,Handlebars */

(function (window,_,Bb,$,Handlebars,undefined){
  "use strict";

  var Slate = function(views){

    var slate = this;

    slate.views = views;
    slate.mainView = new slate.MainView();

    $(document).on('click', '.change-view', slate.changeViewListener);

    _.each(slate.views, function(v, i){
      var menu_view = new slate.MenuView({ name: v, slug: i });
      $('#menu-container').append(menu_view.el);
    });

  };

  Slate.prototype = {
    // Menu views
    MenuView: Bb.View.extend({

      tagName: "li",
      template: Handlebars.compile('<a href="#" class="menu-item change-view {{slug}}" data-view="{{slug}}">{{{name}}}</a>'),

      events: {
        // "click .change-view" : "changeView"
      },

      initialize: function(view) {
        this.view = view;
        this.render();
      },

      render: function(){
        $(this.el).html(this.template(this.view));
        return this;
      },

      changeView: function(e){
        e.stopPropagation();
        var view = $(e.currentTarget).attr('data-view');
        slate.mainView.render(view);
      }
    }),

    // Main content view
    MainView: Bb.View.extend({
      el: "#main-container",

      initialize: function() {
      },

      render: function(slug, params) {
        var self = this, templateSource;

        slate.viewParams = params;

        self.$el.empty();

        templateSource = $.ajax({ url: "partials/" + slug + ".html", async: false }).responseText;
        // self.template = Handlebars.compile(templateSource);
        $(self.el).html(templateSource);

        // XXX - :19 already delegates this
        // $(self.el).on("click", ".change-view", function(e){
        //   e.preventDefault();
        //   self.render($(e.currentTarget).attr('data-view'));
        // });

        $('#menu-container li a:not(.'+ slug +')').closest('li').removeClass('active');
        $('#menu-container li a.'+ slug).closest('li').addClass('active');

        $('#content').removeClass();
        $('#content').addClass(slug);

        return this;
      }
    }),

    changeViewListener: function(e){
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

      slate.mainView.render(view, viewParams);
    },

    //Utilities
    convertToSlug: function(text){
      return text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w\-]+/g,'')
        ;
    }
  };

  window.Slate = Slate;

}(window,_,Backbone,jQuery,Handlebars));
