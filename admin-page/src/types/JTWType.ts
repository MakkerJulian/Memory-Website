export type JTWType = {
    sub: number;
    roles: string[];
    username: string;
    exp: number;
}

export type JTWResponse = {
    token: string;
}