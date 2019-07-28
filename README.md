# storage
H5同步异步本地存储api，模仿微信小程序存储的api风格，不再关心数据类型问题，直接存取。

----

### 同步存储api
+ setStorageSync(key: string, object: any, [isSession: boolearn])
    * key: 键名
    * object: 数据
    * isSession: 存储位置是否是sessionStorage
+ getStorageSync(key: string, [isSession: boolearn])
+ removeStorageSync(key: string, [isSession: boolearn])
+ clearStorageSync([isSession: boolearn])

### 异步存储api

+ setStorage(object), object配置项：
    * key:  string, 键名
    * data: any, 数据
    * isSession:  boolean, 存储位置是否是sessionStorage
    * success: function, 存储成功回调函数
    * fail: function, 存储失败回调函数
    * complete:   function 存储完成回调函数
    
+ getStorage(object), object配置项：
    * key: string, 
    * isSession: boolean, 
    * success:   function, 
    * fail:   function, 
    * complete:  function
    
+ removeStorage(object), object配置项：
    * key: string, 
    * isSession: boolean, 
    * success:   function, 
    * fail:   function, 
    * complete:  function

+ clearStorage(object), object配置项：
    * isSession: boolean, 
    * success:   function, 
    * fail:   function, 
    * complete:  function
