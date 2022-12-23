const cleanString = (u: unknown) => typeof u === "string" ? u.trim().replace(/\s\s+/g, " ") : u
export default cleanString;