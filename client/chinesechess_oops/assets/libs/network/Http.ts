/*
 * @Author: dgflash
 * @Date: 2022-09-01 18:00:28
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-09 18:10:50
 */
import { error, warn } from "cc";

/**
 * 使用流程文档可参考、简化与服务器对接、使用新版API体验，可进入下面地址获取新版本，替换network目录中的内容
 * https://store.cocos.com/app/detail/5877
 */

/** 当前请求地址集合 */
var urls: any = {};
/** 请求参数 */
var reqparams: any = {};

type HttpCallback = (ret: HttpReturn) => void;

/** 请求事件 */
export enum HttpEvent {
    /** 断网 */
    NO_NETWORK = "http_request_no_network",
    /** 未知错误 */
    UNKNOWN_ERROR = "http_request_unknown_error",
    /** 请求超时 */
    TIMEOUT = "http_request_timout"
}

/**
 * HTTP请求返回值
 */
export class HttpReturn {
    /** 是否请求成功 */
    code: number = 0;
    /** 请求返回数据 */
    body?: any;
    /** 请求错误数据 */
    err?: any;
}

/** HTTP请求 */
export class HttpRequest {
    /** 服务器地址 */
    server: string = "http://127.0.0.1/";
    /** 请求超时时间 */
    timeout: number = 10000;
    /** 自定义请求头信息 */
    private header: Map<string, string> = new Map<string, string>();

    /**
     * 添加自定义请求头信息
     * @param name  信息名
     * @param value 信息值
     */
    addHeader(name: string, value: string) {
        this.header.set(name, value);
    }

    /**
     * HTTP GET请求
     * @param name                  协议名
     * @param onComplete            请求完整回调方法
     * @param params                查询参数
     * @example
    var param = '{"uid":12345}'
    var complete = (ret: HttpReturn) => {
        console.log(ret.res);
    }
    oops.http.getWithParams(name, complete, param);
     */
    get(name: string, onComplete: HttpCallback, params: any = null) {
        this.sendRequest(name, params, false, onComplete)
    }

    /**
     * HTTP GET请求
     * @param name                  协议名
     * @param params                查询参数
     * @example 
    var txt = await oops.http.getAsync(name);
    if (txt.isSucc) {
        console.log(txt.res);
    }
     */
    getAsync(name: string, params: any = null): Promise<HttpReturn> {
        return new Promise((resolve, reject) => {
            this.sendRequest(name, params, false, (ret: HttpReturn) => {
                resolve(ret);
            })
        });
    }

    /**
     * HTTP GET请求非文本格式数据
     * @param name                  协议名
     * @param onComplete            请求完整回调方法
     * @param params                查询参数
     */
    getByArraybuffer(name: string, onComplete: HttpCallback, params: any = null) {
        this.sendRequest(name, params, false, onComplete, 'arraybuffer', false);
    }

    /**
     * HTTP GET请求非文本格式数据
     * @param name                  协议名
     * @param params                查询参数
     * @returns Promise<any>
     */
    getAsyncByArraybuffer(name: string, params: any = null): Promise<HttpReturn> {
        return new Promise((resolve, reject) => {
            this.sendRequest(name, params, false, (ret: HttpReturn) => {
                resolve(ret);
            }, 'arraybuffer', false);
        });
    }

    /**
     * HTTP POST请求
     * @param name                  协议名
     * @param params                查询参数
     * @param onComplete      请求完整回调方法
     * @example
    var param = '{"LoginCode":"donggang_dev","Password":"e10adc3949ba59abbe56e057f20f883e"}'
    var complete = (ret: HttpReturn) => {
        console.log(ret.res);
    }
    oops.http.post(name, complete, param);
     */
    post(name: string, onComplete: HttpCallback, params: any = null) {
        this.sendRequest(name, params, true, onComplete);
    }

    /**
     * HTTP POST请求
     * @param name                  协议名
     * @param params                查询参数
     */
    postAsync(name: string, params: any = null): Promise<HttpReturn> {
        return new Promise((resolve, reject) => {
            this.sendRequest(name, params, true, (ret: HttpReturn) => {
                resolve(ret);
            });
        });
    }

    /**
     * 取消请求中的请求
     * @param name     协议名
     */
    abort(name: string) {
        var xhr = urls[this.server + name];
        if (xhr) {
            xhr.abort();
        }
    }

    /**
     * 获得字符串形式的参数
     * @param params 参数对象
     * @returns 参数字符串
     */
    private getParamString(params: any) {
        return JSON.stringify(params);
    }

    /** 
     * Http请求 
     * @param name(string)              请求地址
     * @param params(JSON)              请求参数
     * @param isPost(boolen)            是否为POST方式
     * @param callback(function)        请求成功回调
     * @param responseType(string)      响应类型
     * @param isOpenTimeout(boolean)    是否触发请求超时错误
     */
    private sendRequest(name: string,
        params: any,
        isPost: boolean,
        onComplete: HttpCallback,
        responseType?: string,
        isOpenTimeout: boolean = true) {
        if (name == null || name == '') {
            error("请求地址不能为空");
            return;
        }

        var url: string, paramsStr: string = "";
        if (name.toLocaleLowerCase().indexOf("http") == 0) {
            url = name;
        }
        else {
            url = this.server + name;
        }

        if (params) {
            paramsStr = this.getParamString(params);
        }

        if (urls[url] != null && reqparams[url] == paramsStr) {
            warn(`地址【${url}】已正在请求中，不能重复请求`);
            return;
        }

        var xhr = new XMLHttpRequest();

        // 防重复请求功能
        urls[url] = xhr;
        reqparams[url] = paramsStr;

        if (isPost) {
            xhr.open("POST", url);
        }
        else {
            xhr.open("GET", url);
        }

        // 添加自定义请求头信息
        for (const [key, value] of this.header) {
            xhr.setRequestHeader(key, value);
        }
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        // xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        var data: any = {};
        data.url = url;
        data.params = params;

        // 请求超时
        if (isOpenTimeout) {
            xhr.timeout = this.timeout;
            xhr.ontimeout = () => {
                this.deleteCache(url);

                ret.code = 0;
                ret.err = HttpEvent.TIMEOUT;                // 超时
                onComplete(data);
            }
        }

        // 响应结果
        var ret: HttpReturn = new HttpReturn();

        xhr.onloadend = () => {
            if (xhr.status == 500) {
                this.deleteCache(url);

                ret.code = 0;
                ret.err = HttpEvent.NO_NETWORK;             // 断网
                onComplete(ret);
            }
        }

        xhr.onerror = () => {
            this.deleteCache(url);

            ret.code = 0;
            if (xhr.readyState == 0 || xhr.readyState == 1 || xhr.status == 0) {
                ret.err = HttpEvent.NO_NETWORK;             // 断网
            }
            else {
                ret.err = HttpEvent.UNKNOWN_ERROR;          // 未知错误
            }

            onComplete(ret);
        };

        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;

            this.deleteCache(url);

            if (xhr.status == 200 && onComplete) {
                ret.code = xhr.status;
                ret.body = JSON.parse(xhr.response);
                
                onComplete(ret);
            }
        };

        // 发送请求
        if (params == null || params == "") {
            xhr.send();
        }
        else {
            xhr.send(paramsStr);
        }
    }

    private deleteCache(url: string) {
        delete urls[url];
        delete reqparams[url];
    }
}