// Function to create a new user
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'
const SERVICE = 'comercials'
const ERROR_MESSAGE = "An error has occurred"


//Create user

export const createApiComercial = async (userData) => {
    const response = await fetch(`${API_URL}/${SERVICE}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (response.status !== 201) {
        throw new Error(data.body || ERROR_MESSAGE);
    }
    return data;
};

// Function to update an existing user

export const updateApiComercial = async (userId, userData) => {
    const response = await fetch(`${API_URL}/${SERVICE}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(data.body || ERROR_MESSAGE);
    }
    return data;
};

// Function to delete an existing user
export const deleteApiComercial = async (userId) => {
    const response = await fetch(`${API_URL}/${SERVICE}/${userId}`, {
        method: 'DELETE'
    });
    
    const data = await response.json();
    if (response.status >= 400 && response.status <= 500) {
        throw new Error(data || ERROR_MESSAGE);
    }
    return data;
};

// Function to retrieve a single user
export const getApiComercial = async (userId) => {
    const response = await fetch(`${API_URL}/${SERVICE}/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(data.body || ERROR_MESSAGE);
    }
    return data;
};


// Function to retrieve all user
export const getAllApiComercial = async () => {
    const URL = `${API_URL}/${SERVICE}`
    const response = await fetch(`${URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(data || ERROR_MESSAGE);
    }
    return data;
};


