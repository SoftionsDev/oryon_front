import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { Loading } from '@/app/components';
import { API_URL } from '@/constants';


const LOGIN_SERVICE = import.meta.env.VITE_LOGIN_SERVICE ? `${API_URL}${import.meta.env.VITE_LOGIN_SERVICE}` : '/api/auth/login'


const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const decodeToken = (accessToken) => {
    if (!accessToken) {
        return null
    }
    const decodedToken = jwtDecode(accessToken)
    const user = {
        email: decodedToken.email,
        firstName: decodedToken.first_name,
        lastName: decodedToken.last_name,
        position: decodedToken.position,
        is_active: decodedToken.is_active,
        groups: decodedToken.groups,
    }
    return user
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user

            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (email, password) => {
        const response = await axios.post(`${LOGIN_SERVICE}`, {
            email,
            password,
        })
        const { access } = response.data
        const user = decodeToken(access)

        setSession(access)
        dispatch({
            type: 'LOGIN',
            payload: { user }
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ; (async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken)
                    const user = decodeToken(accessToken)

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <Loading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
