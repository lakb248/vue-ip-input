/* global window, document, describe, it, expect */
import Vue from 'vue';
import IpInput from '../src/vue-ip-input.vue';

var initIpInput = config => {
    return new Vue({
        template: '<div><vue-ip-input :ip.sync="ip"' +
            'v-ref:ip-input :on-change="onChange"' +
            ' :on-blur="onBlur"></vue-ip-input></div>',
        components: {
            'vue-ip-input': IpInput
        },
        data() {
            return {
                ip: config.ip
            };
        },
        methods: {
            onChange(ip) {
                if (config.onChange) {
                    config.onChange(ip);
                }
            },
            onBlur(ip) {
                if (config.onBlur) {
                    config.onBlur(ip);
                }
            }
        }
    }).$mount().$appendTo('body');
};

var triggerKeydown = (elem, keyCode) => {
    var keyEvent = document.createEvent('Event');
    keyEvent.initEvent('keydown', true, true, window, false, false,
        false, false, 50, 50);
    keyEvent.keyCode = keyCode;
    elem.dispatchEvent(keyEvent);
};

describe('vue-ip-input.vue', () => {
    it('should have correct default ip', () => {
        expect(IpInput.data().segments.join(',')).toBe(',,,');
    });

    it('should render correct ip', () => {
        var vm = initIpInput({
            ip: '127.0.0.1'
        });
        expect(vm.$refs.ipInput.segments.join('.')).toBe('127.0.0.1');
    });

    it('should render correct if the ip is invalid', () => {
        var vm = initIpInput({
            ip: '333.123.123.123'
        });
        expect(vm.$refs.ipInput.segments.join('.')).toBe('255.123.123.123');
    });
    it('should update the ip if the input change', done => {
        var vm = initIpInput({
            ip: '127.0.0.1'
        });
        vm.$refs.ipInput.segments.$set(0, 255);
        Vue.nextTick(() => {
            expect(vm.ip).toBe('255.0.0.1');
            done();
        });
    });
    it('should update the up to empty string if the input is epmty', done => {
        var vm = initIpInput({
            ip: '127.0.0.1'
        });
        var segments = vm.$refs.ipInput.segments;
        segments.$set(0, '');
        segments.$set(1, '');
        segments.$set(2, '');
        segments.$set(3, '');
        Vue.nextTick(() => {
            expect(vm.ip).toBe('');
            done();
        });
    });
    it('should call onChange if the input is changed', done => {
        var onChangeCalled = false;
        var vm = initIpInput({
            ip: '127.0.0.1',
            onChange: () => {
                onChangeCalled = true;
            }
        });
        var segments = vm.$refs.ipInput.segments;
        segments.$set(0, '');
        Vue.nextTick(() => {
            expect(onChangeCalled).toBe(true);
            done();
        });
    });
    it('should call onBlur if the input is blur', done => {
        var onBlurCalled = false;
        var vm = initIpInput({
            ip: '127.0.0.1',
            onBlur: () => {
                onBlurCalled = true;
            }
        });
        var input = vm.$refs.ipInput.$el.querySelector('input');
        input.focus();
        input.blur();
        Vue.nextTick(() => {
            setTimeout(() => {
                expect(onBlurCalled).toBe(true);
                done();
            }, 100);
        });
    });
    // it('should update the ip if keydown(Number 2)', done => {
    //     var vm = initIpInput({
    //         ip: '127.0.0.1'
    //     });
    //     var ipInput = vm.$refs.ipInput;
    //     var input = ipInput.$el.querySelector('input');
    //     triggerKeydown(input, 50);
    //     Vue.nextTick(() => {
    //         expect(vm.ip).toBe('2.0.0.1');
    //         done();
    //     });
    // });
    it('should prevent the event if incorrect keydown(Alphabat a)', done => {
        var vm = initIpInput({
            ip: '127.0.0.1'
        });
        var ipInput = vm.$refs.ipInput;
        var input = ipInput.$el.querySelector('input');
        triggerKeydown(input, 58);
        Vue.nextTick(() => {
            expect(vm.ip).toBe('127.0.0.1');
            done();
        });
    });
});
