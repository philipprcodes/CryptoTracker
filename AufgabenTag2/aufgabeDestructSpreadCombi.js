const user = { id: 1, name: "Anna", email: "a@x.de", role: "admin"};

function withoutEmail(user){
    const { email, ...rest} = user;
    return rest;
}
const safe = withoutEmail(user);
console.log(safe);
console.log(user);
