export type Upgrade = {
    image: string;
    imageAlt: string;
    name: string;
    desc:string;
    price: number
    id: number;
    buyCallback: (id: number) => void;
}
