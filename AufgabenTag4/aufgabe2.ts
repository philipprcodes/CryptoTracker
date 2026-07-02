interface User {
    readonly id: number;
    name: string;
    readonly createdAt: Date;
}

const u:User ={id: 1, name: "Anna", createdAt: new Date()};
