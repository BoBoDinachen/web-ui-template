/** 所有 api 接口的响应数据都应该准守该格式 */
type Status = 'success' | 'error' | 'warning'
type Code = '00000' | '11111'
interface IApiResponseData<T> {
    status: Status
    code: Code
    message: string
    data: T
}