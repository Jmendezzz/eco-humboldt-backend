export const AUTH_CONSTRAINT = {
    PASSWORD: {
        MIN_LENGTH: 6
    },
    ALLOWED_EMAIL_DOMAINS: ["cue.edu.co", "unihumboldt.edu.co"]
}


export const AUTH_EXCEPTION = {
    EMAIL_ALREADY_IN_USE: {
        MESSAGE: "El email ya está en uso.",
        CODE: "EMAIL_ALREADY_IN_USE"
    },
    INVALID_EMAIL_DOMAIN: {
        MESSAGE: "El email no es el institucional.",
        CODE: "INVALID_EMAIL_DOMAIN"
    },
    INVALID_CREDENTIALS: {
        MESSAGE: "Credenciales incorrectas",
        CODE: "INVALID_CREDENTIALS"
    }
}

export const AUTH_API_ENTRY_POINT = {
    BASE: "/auth",
    REGISTER: "/register",
    LOGIN: "/login",
    ME: "/me"
}