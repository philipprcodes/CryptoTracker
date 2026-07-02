interface User {
    id: number;
    name: string;
    email: string;
}

type User2 = {
    id: number;
    name: string;
    email: string;
}

interface extendedUsers  extends User {
    role: string;
}

type extendedUsers2 = User2 & {
    role: string;
}

type Status = "active" | "inactive" | "pending";

