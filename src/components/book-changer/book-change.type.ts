export type Paragraf = {
    name: string,

    page: number
};

export type BookChangeType = {
    name: string,

    img: string,

    path: string,

    paragrafs: Paragraf[]
};
