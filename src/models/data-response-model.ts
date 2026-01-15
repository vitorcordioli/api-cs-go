export default interface DataResponseModel<T> {
    statusCode: number;
    body: T | T[] | string | null;
}