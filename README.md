# vue-ip-input
[![Build Status](https://travis-ci.org/lakb248/vue-ip-input.svg?branch=next)](https://travis-ci.org/lakb248/vue-ip-input)
[![codecov](https://codecov.io/gh/lakb248/vue-ip-input/branch/next/graph/badge.svg)](https://codecov.io/gh/lakb248/vue-ip-input)

> An ip input implement by vuejs

## Demo

[Demo](https://lakb248.github.io/vue-ip-input)

## Usage

### Install

```bash
npm install vue-ip-input --save
```

### CommonJS

```javascript
var VueIpInput = require('vue-ip-input');

new Vue({
    components: {
        'vue-ip-input': VueIpInput
    },
    data: function () {
        return {
            ip: '127.0.0.1'
        };
    },
    methods: {
        onIpChange: function(ip) {
            console.log('ip input change:', ip);
        },
        onIpBlur: function (ip) {
            console.log('ip input blur:', ip);
        }
    },
    template: '<vue-ip-input :ip="ip" :on-change="onIpChange" :on-blur="onIpBlur"></vue-ip-input>'
});
```

### ES6
```javascript
import VueIpInput from 'vue-ip-input';

new Vue({
    components: {
        'vue-ip-input': VueIpInput
    },
    data() {
        return {
            ip: '127.0.0.1'
        };
    },
    methods: {
        onIpChange(ip) {
            console.log('ip input change:', ip);
        },
        onIpBlur(ip) {
            console.log('ip input blur:', ip);
        }
    },
    template: '<vue-ip-input :ip="ip" :on-change="onIpChange" :on-blur="onIpBlur"></vue-ip-input>'
})
```

### Props
| Property | Description |
|:--|:--|
| ip | the value of ip input |
| onChange | trigger when the ip change |
| onBlur | trigger when the input blur |

## License

[MIT](http://opensource.org/licenses/MIT)
