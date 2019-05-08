import { config } from '../config.js'
//http_code
//error_code
const tips = {
    1: "抱歉，出现了一个错误",
    1005: "appkey 错误",
    3000: "期刊数据不存在"
}

class Http {

    request({ url, data = {}, method = "GET" }) {
        const promise = new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method)
        })

        return promise
    }

    _request(url, resolve, reject, data = {}, method = "GET") {
        wx.request({
            url: config.api_base_url + url,
            method: method,
            header:
            {
                "content-type": "application/json",
                "appkey": config.appkey
            },
            data: data,
            success: (res) => {
                let code = res.statusCode.toString()
                if (code.startsWith('2')) {
                    //ok 执行回调函数返回data
                    resolve(res.data)
                } else {
                    reject()
                    this._show_error(res.data.error_code)
                }
            },
            fail: (err) => {
                reject()
                this._show_error(1)
            }
        })
    }

    _show_error(error_code) {
        if (!error_code) error_code = 1
        wx.showToast({
            title: tips[error_code] ? tips[error_code] : tips[1],
            icon: 'none',
            duration: 2000
        })
    }
}

export { Http }