const baseUrl="";
export const login = async (values) => {
    const response = await fetch(new Request(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values, null, 2)
    }))
    if (response.ok) {
        const result = await response.json()
        return result
    }
    // const errMsg = await response.text()
    throw new Error("Invalid username or password")
}

export const register = async (values) => {
    const response = await fetch(new Request(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values, null, 2)
    }))
    if (response.ok) {
        const result = await response.json()
        return result
    }
    const errMsg = await response.text()
    throw new Error(errMsg)
}

export const logout = async (token) => {
    const response = await fetch(new Request(`${baseUrl}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    }))
    if (response.ok) {
        const result = await response.text()
        return result
    }
    const errMsg = await response.text()
    throw new Error(errMsg)
}
