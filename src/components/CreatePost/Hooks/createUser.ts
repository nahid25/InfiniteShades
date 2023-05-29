export const createUser = (name: string) => {
    const user = {
      id : name.slice(0, 3) + Math.random().toString(36).substr(2, 3),
      name: name,
    };
  
    console.log(user);
  }
  