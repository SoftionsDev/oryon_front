// Function to create a new store

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'
const SERVICE = 'stores'
const REGISTER = 'users'
const ERROR_MESSAGE = "An error has occurred"

export const createApiStore = async (storeData) => {
    const response = await fetch(`${API_URL}/${SERVICE}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(storeData)
    });
    const data = await response.json();
    if (response.status !== 201) {
        throw new Error(data.body || ERROR_MESSAGE);
    }
    return data;
};

// Function to update an existing store
export const updateApiStore = async (storeId, storeData) => {
    const response = await fetch(`${API_URL}/${SERVICE}/${storeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(storeData)
    });
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(data.body || ERROR_MESSAGE);
    }
    return data;
};

// Function to delete an existing store
export const deleteApiStore = async (storeId) => {
    const response = await fetch(`${API_URL}/${SERVICE}/${storeId}`, {
        method: 'DELETE'
    });
    
    const data = await response.json();
    if (response.status >= 400 && response.status <= 500) {
        throw new Error(data || ERROR_MESSAGE);
    }
    return data;
};

// Function to retrieve a single store
export const getApiStore = async (storeId) => {
    const response = await fetch(`${API_URL}/${SERVICE}/${storeId}`, {
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

// Function to retrieve all stores
export const getAllApiStores = async () => {
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

//Create user

export const createApiUser = async (userData) => {
    const response = await fetch(`${API_URL}/${REGISTER}`, {
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

export const updateApiUser = async (userId, userData) => {
    const response = await fetch(`${API_URL}/${REGISTER}/${userId}`, {
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
export const deleteApiUser = async (userId) => {
    const response = await fetch(`${API_URL}/${REGISTER}/${userId}`, {
        method: 'DELETE'
    });
    
    const data = await response.json();
    if (response.status >= 400 && response.status <= 500) {
        throw new Error(data || ERROR_MESSAGE);
    }
    return data;
};

// Function to retrieve a single user
export const getApiUser = async (userId) => {
    const response = await fetch(`${API_URL}/${REGISTER}/${userId}`, {
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
export const getAllApiUser = async () => {
    const URL = `${API_URL}/${REGISTER}`
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


