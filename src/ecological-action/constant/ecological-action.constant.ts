export const ECOLOGICAL_ACTION_API_ENTRY_POINT = {
    BASE: "/ecological-actions",
    CREATE: "/create",
    UPDATE: "/:id/update",
    GET_ALL: "/all",
    GET_BY_ID: "/:id",
    DELETE: "/:id/delete",
}

export const ECOLOGICAL_ACTION_EXCEPTION = {
    NOT_FOUND: {
        MESSAGE: "No se encontró la acción ecológica",
        CODE: "ECOLOGICAL_ACTION_NOT_FOUND"
    }
}