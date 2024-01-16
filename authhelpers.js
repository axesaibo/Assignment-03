import bcrypt from "bcrypt"

export const hashpassward = async (passward) => {

    try {
        const saltround = 10;
        const hashedpassward = await bcrypt.hash(passward, saltround);

    }
    catch (error) {
        console.log(error);
    }
}

export const comparepassward = async (passward, hashedpassward) => {
    return bcrypt.compare(passward, hashedpassward)
}



