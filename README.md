# Slate

Slate is an opinionated boilerplate for touchscreen applications built at Gunn/Jerkens. In its simplicity it is geared towards a 1920x1080 device, though this could be modified to be any size.

## usage

Out of the box point your webserver (apache/nginx/etc) at the `/public/` directory and the basic demo page should load. The general structure is that the project is built in a modules fashion using the Slate class as a controller. Pages are contained in the `/partials/` directory and should mostly be handlebars templates with a jQuery extended method (`$.fn.method`) that fires when the partial is loaded into the DOM.

### menus

The different types of displayed menu items is based off your views which include normal text, image, menu with submenu, and hidden items. Sub menu items accept parameters to utilize the same slug but display different information.

```
var views = [
  {
    "slug"    : "home",
    "name"    : "Home",
    "image"   : false,
    "subMenu" : false,
    "hidden"  : true
  },
  {
    "slug"    : "example",
    "name"    : "Example",
    "image"   : false,
    "subMenu" : [
      {
        "slug"    : "example",
        "name"    : "Submenu 1",
        "param"   : 1
      },
      {
        "slug"  : "example",
        "name"  : "Submenu 2",
        "param" : 2
      },
    ],
    "hidden"  : false
  },
  {
    "slug"    : "kittens",
    "name"    : "Kittens",
    "image"   : "http://placekitten.com/g/250/150",
    "subMenu" : false,
    "hidden"  : false
  }
];
```

### views

Any href that has the class `change-view` with trigger Slate to change the `#content` view.

```
<a href="#" class="change-view" data-view="example" data-view-params="slug=42">Example 42</a>
```

To access params passed through slate into the view you can log out the viewParams object. 

```
if (typeof slate.viewParams != "undefined") {
  console.log(slate.viewParams);  // { "slug": "42" }
}
```

## requirements

- Node/NPM  
- Ruby (for SASS/SCSS gems)  

## libraries

All libraries located in `public/js/src/vendor/` follow their specific license.

- [backbone.js](https://github.com/jashkenas/backbone)  
- [handlebars.js](https://github.com/wycats/handlebars.js)  
- [jquery](https://github.com/jquery/jquery)  
- [jquery-ui](https://github.com/jquery/jquery-ui)  
- [jquery-ui touch-punch](https://github.com/furf/jquery-ui-touch-punch)  
- [raphael](https://github.com/DmitryBaranovskiy/raphael)  
- [underscore.js](https://github.com/jashkenas/underscore)  

## license

MIT
