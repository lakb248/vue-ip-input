<template>
    <div class="ip-input-container">
        <div class="ip-segment" v-for="segment in segments" track-by="$index">
            <input type="text" maxlength="3" class="ip-segment-input" v-model="segment"
                v-on:keydown="onInputKeydown($event, $index)"
                v-on:input="onInput($event, $index)"
                v-on:blur="onInputBlur()">
            <i v-show="$index != segments.length - 1">.</i>
        </div>
    </div>
</template>

<script>
    /* global document*/
    /**
     * get the cursor position of the element
     * @param  {Element} el the element
     * @return {Integer}    the position fo the cursor
     */
    function getRange(el) {
        var cuRange;
        var tbRange;
        var headRange;
        var range;
        var dupRange;
        var ret = {};
        if (el.setSelectionRange) {
            // standard
            ret.begin = el.selectionStart;
            ret.end = el.selectionEnd;
            ret.result = el.value.substring(ret.begin, ret.end);
        } else if (document.selection) {
            // ie
            if (el.tagName.toLowerCase() === 'input') {
                cuRange = document.selection.createRange();
                tbRange = el.createTextRange();
                tbRange.collapse(true);
                tbRange.select();
                headRange = document.selection.createRange();
                headRange.setEndPoint('EndToEnd', cuRange);
                ret.begin = headRange.text.length - cuRange.text.length;
                ret.end = headRange.text.length;
                ret.result = cuRange.text;
                cuRange.select();
            } else if (el.tagName.toLowerCase() === 'textarea') {
                range = document.selection.createRange();
                dupRange = range.duplicate();
                dupRange.moveToElementText(el);
                dupRange.setEndPoint('EndToEnd', range);
                ret.begin = dupRange.text.length - range.text.length;
                ret.end = dupRange.text.length;
                ret.result = range.text;
            }
        }
        el.focus();
        return ret;
    }
    export default {
        props: {
            ip: {
                type: String,
                required: true
            },
            onChange: Function,
            onBlur: Function
        },
        data() {
            return {
                segments: ['', '', '', '']
            };
        },
        methods: {
            onInputKeydown(event, index, type) {
                var keyCode = event.keyCode || event.which;
                var value = event.target.value;
                if (keyCode <= 57 && keyCode >= 48) {
                    // number input
                    // segment is the value after keydown
                    var segment = Number(value + (keyCode - 48));
                    // prevent NaN input or zero or bigger than 1000
                    if (isNaN(segment) || segment === 0 || segment >= 1000) {
                        event.preventDefault();
                    } else if (segment <= 999 && segment > 255) {
                        // set the segment to 255 if out of ip range
                        this.segments.$set(index, 255);
                    }
                } else if (keyCode === 8 || keyCode === 37) {
                    // move the cursor to previous input if backspace and left arrow is pressed at the begin of one input
                    if ((value.length === 0 || getRange(event.target).end === 0) &&
                        index > 0) {
                        this.$el.getElementsByTagName('input')[index - 1].focus();
                    }
                } else if (keyCode === 39) {
                    if (getRange(event.target).end === value.length &&
                        index < 3) {
                        // move to cursor to the next input if right arrow is pressed at the end of one input
                        this.$el.getElementsByTagName('input')[index + 1].focus();
                    }
                } else {
                    event.preventDefault();
                }
            },
            onInput(event, index) {
                var value = event.target.value;
		// jump to next input
                if (value.length === 3 && index < 3) {
                    this.$el.getElementsByTagName('input')[index + 1].focus();
                }
            },
            onInputBlur() {
                setTimeout(() => {
                    var className = document.activeElement.className;
                    if (className.indexOf('ip-segment-input') === -1) {
                        if (this.onBlur) {
                            this.onBlur(this.segments.join('.'));
                        }
                    }
                }, 50);
            }
        },
        ready() {
            var ip = this.ip;
            if (ip && ip.indexOf('.') !== -1) {
                ip.split('.').map((segment, index) => {
                    segment = Number(segment);
                    if (isNaN(segment) || segment < 0 || segment > 255) {
                        segment = 255;
                    }
                    this.segments.$set(index, segment);
                    return segment;
                });
            }
            this.$watch(() => {
                return this.segments.join('.');
            }, (val, oldValue) => {
                if (val !== oldValue) {
                    if (val === '...') {
                        val = '';
                    }
                    this.ip = val;
                    if (this.onChange) {
                        this.onChange(val);
                    }
                }
            });
        }
    };
</script>

<style lang="sass" scoped>
    .ip-input-container {
        display: inline-block;
        height: 28px;
        line-height: normal;
        border: 1px solid #ccc;
        box-sizing: border-box;
        background-color: #fff;
    }
    .ip-segment {
        display: inline-block;
        width: 39px;
        height: 26px;
        line-height: normal;
        input {
            width: 30px;
            height: 26px;
            line-height: normal;
            border: none;
            outline: none;
            text-align: center;
            text-indent: 0px;
            margin: 0px;
            padding: 0px;
            background-color: transparent;
        }
        i {
            display: inline-block;
            font-size: 18px;
        }
    }
</style>
