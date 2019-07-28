/**
*  Aouth: huaicheng151201@163.com
*  Time: 2019/07/01 : 13:30:23
*  Summary: H5本地存储api（模仿微信存储api风格）
*/

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
