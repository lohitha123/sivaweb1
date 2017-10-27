# Angular 2 Image Zoom On Hover [![npm version](https://img.shields.io/npm/v/ng2-image-hover-zoom.svg)](https://www.npmjs.com/package/ng2-image-hover-zoom) [![npm monthly downloads](https://img.shields.io/npm/dm/ng2-image-hover-zoom.svg?style=flat-square)](https://www.npmjs.com/package/ng2-image-hover-zoom)
Angular2 component shows the Zoomed Image on Hover

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Dependency Status](https://david-dm.org/mohammedubaid/ng2-image-hover-zoom.svg)](https://david-dm.org/mohammedubaid/ng2-image-hover-zoom)
[![devDependency Status](https://david-dm.org/mohammedubaid/ng2-image-hover-zoom/dev-status.svg)](https://david-dm.org/mohammedubaid/ng2-image-hover-zoom#info=devDependencies)
[![Known Vulnerabilities](https://snyk.io/test/github/mohammedubaid/ng2-image-hover-zoom/badge.svg)](https://snyk.io/test/github/mohammedubaid/ng2-image-hover-zoom)

_Some of these APIs and Components are not final and are subject to change!_

## Installation

```sh
npm install ng2-image-hover-zoom --save
```

## Usage

If you use SystemJS to load your files, you might have to update your config:

```js
System.config({
    map: {
        'ng2-image-hover-zoom': 'node_modules/ng2-image-hover-zoom/bundles/index.umd.js'
    }
});
```

## Examples
First, import the ImageZoom Module

```typescript
import {ImageZoomModule} from 'ng2-image-hover-zoom';
```

Then, add ImageZoom to your modules import array

```typescript
@NgModule({
    imports : [CommonModule, ImageZoomModule, ...],
})
```
Then just add the [imageZoom] tag to your img element

```html
<img src="smallImageSrc" imageZoom="zoomedImageSrc">
```
# License
 [MIT](/LICENSE)
