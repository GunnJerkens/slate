# slate

Slate is an opinionated boilerplate for touchscreen applications built at Gunn/Jerkens. In its simplicity it is geared towards a 1920x1080 device, though this could be modified to be any size.

## usage

Out of the box point your webserver (apache/nginx/etc) at the `/public/` directory and the basic demo page should load. The general structure is that the project is built in a modules fashion using the Slate class as a controller. Pages are contained in the `/partials/` directory and should mostly be handlebars templates with a jQuery extended method (`$.fn.method`) that fires when the partial is loaded into the DOM.

[TODO] - Document a detailed project setup

### menus
### views

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
