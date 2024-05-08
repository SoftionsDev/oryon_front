export const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT || 'dev'

const PROXY_HTTP = 'https://cors-anywhere.herokuapp.com/'
export const API_URL = (ENVIRONMENT === 'prod') ? `${PROXY_HTTP}${process.env.REACT_APP_BACKEND_URL}` : (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001');

const baseRoutes = {
        users: 'api/users',
        stores: 'api/stores',
        cities: 'api/stores/cities',
        regions: 'api/stores/regions',
        products: 'api/products',
        sales: 'api/sales',
        commercials: 'api/commercials',
        rules: 'api/rules/percentages',
        formulas: 'api/rules/formula',
        commissions: 'api/commissions',
        userCommissions: 'api/commercials/commissions',
        login: 'api/users/token/',
        fields: 'api/utils/fields'
}

export const BACKEND_ROUTES = {
    base: {...baseRoutes},
    dev: { ...baseRoutes },
    prod: { ...baseRoutes }
};


export const ROLES = {
    Admin: 1,
    Manager: 2,
    Colaborador: 3
};

export const GOALS_TYPES = {
    Mensual: 'M',
    Bimensual: 'BM',
    Trimestral: 'T',
    Semestral: 'S',
    Anual: 'A'
}

export const POSITIONS = {
    MANAGER: 'Gerente',
    DIRECTOR: 'Director',
    ADVISER: 'Asesor',
    ASSISTANT: 'Asistente',
}

export const COMMISSIONS_TYPES = {
    SALE: 'venta',
    DELIVERY: 'entrega',
    OTHER: 'otra'
}

export const SALES_TYPES = {
    SELF: 'propia',
    DELIVERY: 'entrega',
    REFERRED: 'referido',
    OTHER: 'otra'
}

