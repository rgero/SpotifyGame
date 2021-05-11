
export const setToken = ( newToken='' ) => ({
    type: "SET_TOKEN",
    newToken
})

export const setExtended = ( extended=true ) => ({
    type: "SET_EXTENDED",
    extended
})