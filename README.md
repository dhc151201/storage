# storage
H5本地存储api，模仿微信小程序存储的api风格，不再关心数据类型问题，直接存取。

----

### 同步存储api
+ setStorageSync(key: string, object: any, [isSession: boolearn])
+ getStorageSync(key: string, [isSession: boolearn])
+ removeStorageSync(key: string, [isSession: boolearn])
+ clearStorageSync([isSession: boolearn])

### 异步存储api

+ setStorage(object), object配置项：
    * key:  string, 
    * data: any, 
    * isSession:  boolean, 
    * success: function, 
    * fail: function, 
    * complete:   function
    
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
