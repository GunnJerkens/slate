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

    _.each(slate.views, function(menuItem) {
      var menuView = new slate.MenuView(menuItem);
      $('#menu-container').append(menuView.el);
    });

  };

  Slate.prototype = {
    // Menu views
    MenuView: Bb.View.extend({
      tagName: "li",
      events: {},

      initialize: function(view) {
        this.view = view || {};
        // Set a hidden class
        if(this.view.hidden) this.$el.addClass('hidden');
        this.render();
      },

      render: function(){
        var markup = '', template;

        markup += '<a href="#" class="menu-item{{#if subMenu}} parent-item{{/if}} change-view {{slug}}" data-view="{{slug}}">{{#if image}}<img src="{{{image}}}">{{else}}{{{name}}}{{/if}}</a>';

        if(this.view.subMenu !== false) {
          markup += '<ul class="sub-menu {{slug}}">';
          _.each(this.view.subMenu, function(item) {
            markup += '<li><a href="#" class="sub-menu-item change-view ' + item.slug + '" data-view="' + item.slug + '" data-view-params="slug=' + item.param + '">' + item.name + '</a></li>';
          });
          markup += '</ul>';
        }

        template = Handlebars.compile(markup);
        console.log(this.view);
        $(this.el).html(template(this.view));
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
        $(self.el).html(templateSource);

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
