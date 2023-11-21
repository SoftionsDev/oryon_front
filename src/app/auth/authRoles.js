export const authRoles = {
    admin: ['SA'], // Only Super Admin has access
    manager: ['SA', 'ADMIN'], // Only SA & Admin has access
    collaborador: ['SA', 'ADMIN', 'EDITOR'], // Only SA & Admin & Editor has access
}
