let utility = {
    toJsonString: (obj) => JSON.stringify(obj),
    toJson: (jsonString) => JSON.parse(jsonString),
    strTrim: (str) => str.replace(/^\s+|\s+$/g, ""),
    getQs: (name) => {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return (r[2]); return null;
    },
    stringFormat: (str, col) => {
        col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);
        return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
            if (m == "{{") { return "{"; }
            if (m == "}}") { return "}"; }
            return col[n];
        });
    },
    timestampToTime: (timestamp, dateType) => {
        if (timestamp) {
            let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
            let h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
            let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
            return dateType ? (Y + M + D) : (Y + M + D + " " + h + m + s);
        } else {
            return "";
        }
    },
    regPhone: (tel) => /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(tel),
};
export default utility;