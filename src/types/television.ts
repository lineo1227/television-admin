export interface TelevisionFormType extends TelevisionChooseType<string> {
    name: string,
    desc: string,
    isHot: boolean,
}
export type TelevisionChooseType<T> = {
    kind: T,
    type: T | T[],
    year: T,
    language: T,
    region: T,
    tariff: T
}