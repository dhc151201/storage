function Storage(){

    //同步版本

    /**
     *
     *
     * @param {string} key
     * @param {any} data
     * @param {boolean} isSession
     */
    this.setStorageSync = function(key, data, isSession){

        let _data = {};

        _data.type = this.getDataType(data);
        _data.data = data;

        window[ isSession ? 'sessionStorage' : 'localStorage' ].setItem(key, JSON.stringify(_data));

    }

    /**
     *
     *
     * @param {string} key
     * @param {boolean} isSession
     * @returns
     */
    this.getStorageSync = function(key, isSession){

        let _data = window[ isSession ? 'sessionStorage' : 'localStorage' ].getItem(key);

        if (_data){
            return JSON.parse(_data).data;
        }
        return undefined;

    }

    /**
     *
     *
     * @param {string} key
     * @param {boolean} isSession
     * @returns
     */
    this.removeStorageSync = function(key, isSession){

        window[ isSession ? 'sessionStorage' : 'localStorage' ].removeItem(key);

    }

    /**
     *
     *
     * @param {string} key
     * @param {boolean} isSession
     * @returns
     */
    this.clearStorageSync = function(isSession){

        window[ isSession ? 'sessionStorage' : 'localStorage' ].clear();

    }

    //异步版本

    /**
     *
     *
     * @param {key:string, data: any, isSession:boolean, success:function, fail:function, complete:function } object
     */
    this.setStorage = function(object){
        let _this = this;

        if (object.key && this.getDataType(object.key) === 'string'){

            setTimeout(function(){

                try {
                    _this.setStorageSync(object.key, object.data, object.isSession);
                    _this.isFunction(object.success) && object.success();
                } catch (e){
                    _this.isFunction(object.error) && object.error();
                } finally {
                    _this.isFunction(object.complete) && object.complete();
                }

            }, 0)
        }

    }

    /**
     *
     *
     * @param {key:string, isSession:boolean, success:function, fail:function, complete:function } object
     */
    this.getStorage = function(object){
        let _this = this;

        if (object.key && this.getDataType(object.key) === 'string'){

            setTimeout(function(){

                try {
                    _this.isFunction(object.success) && object.success( _this.getStorageSync(object.key, object.isSession) );
                } catch (e){
                    _this.isFunction(object.error) && object.error();
                } finally {
                    _this.isFunction(object.complete) && object.complete();
                }

            }, 0)
        }

    }

    /**
     *
     *
     * @param {key:string, isSession:boolean, success:function, fail:function, complete:function } object
     */
    this.removeStorage = function(object){
        let _this = this;

        if (object.key && this.getDataType(object.key) === 'string'){

            setTimeout(function(){

                try {
                    _this.removeStorageSync(object.key, object.isSession);
                    _this.isFunction(object.success) && object.success();
                } catch (e){
                    _this.isFunction(object.error) && object.error();
                } finally {
                    _this.isFunction(object.complete) && object.complete();
                }

            }, 0)
        }

    }

    /**
     *
     *
     * @param {isSession:boolean, success:function, fail:function, complete:function } object
     */
    this.clearStorage = function(object){

        let _this = this;

        setTimeout(function(){

            try {
                _this.clearStorageSync(object.isSession);
                _this.isFunction(object.success) && object.success();
            } catch (e){
                _this.isFunction(object.error) && object.error();
            } finally {
                _this.isFunction(object.complete) && object.complete();
            }

        }, 0)


    }

}


Storage.prototype.getDataType = function(data){

    let result = '';

    let type = typeof data;

    if ( type === 'boolean' ||
        type === 'string' ||
        type === 'number' ||
        type === 'undefined' ||
        type === 'function' ||
        type === 'symbol'
    ){
        result = type;
    } else if (data === null) {
        result = 'null';
    } else if (data instanceof Array ) {
        result = 'array';
    } else if (data instanceof Object ) {
        result = 'object';
    }


    return result;

}

Storage.prototype.isFunction = function(val){
    return typeof val === 'function';
}


export default Storage;


// //用法示例
// var t = new Storage();
// //同步存储
// t.setStorageSync("test", {a: 123});
// //同步读取，返回存储值
// var r = t.getStorageSync("test");
// console.log(r)

// //异步存储
// t.setStorage({
//     key: "test1",
//     data: {a: 11111},
//     success: function(){
//         console.log("异步存储成功")
//     }
// })
// //异步读取，success回调函数接收存储值
// t.getStorage({
//     key: "test1",
//     success: function(res){
//         console.log("异步读取数据成功，", res)
//     }
// })

// t.setStorageSync("test", "我是一张弓！！！", true);
// var q = t.getStorageSync("test", true);
// console.log("来自 sessionStorage 的数据，", q);

// t.setStorage({
//     key: "test1",
//     data: {a: 9999999999999},
//     isSession: true,
//     success: function(){
//         console.log("异步存储成功")
//     }
// })
// //异步读取，success回调函数接收存储值
// t.getStorage({
//     key: "test1",
//     isSession: true,
//     success: function(res){
//         console.log("来自 sessionStorage 异步读取数据成功，", res)
//     }
// })