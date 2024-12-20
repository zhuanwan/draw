/**
 * 节流
 * @param {type:function, desc: 要被执行的函数（必填）} fn
 * @param {type:number, desc: 延迟时间} delay
 * @return {type:function}
 */
export const throttle = (fn, delay = 500) => {
    let last = 0;
    return (...args) => {
        const now = Date.now();
        if (now - last > delay) {
            last = now;
            fn.apply(this, args);
        }
    };
};

/**
 * 防抖
 * @param {type:function, desc: 要被执行的函数（必填）} fn
 * @param {type:number, desc: 延迟时间}
 * @return {type:function}
 */
export const debounce = (fn, delay = 500) => {
    let timer;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};

/**
 *  blob 转 base64 图片
 */
export const blobToBase64 = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // 获取到base64格式图片
            resolve(reader.result);
        };
    });
};