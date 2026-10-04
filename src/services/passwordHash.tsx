export const saltGenerate = (): string =>{
    const salt=crypto.getRandomValues(new Uint8Array(16));

    return Array.from(salt).map((byte) => byte.toString(16).padStart(2, '0')).join(""); 
}

export const hashPassword = async (
    password: string,
    salt: string,
): Promise<string> => {
    
    const encoder = new TextEncoder();
    const passwordHash = encoder.encode(password+salt);
    const hashBuffer = await crypto.subtle.digest('SHA-256', passwordHash);

    return Array.from(new Uint8Array(hashBuffer))
    .map((byte)=> byte.toString(16).padStart(2,'0')).join("");
}