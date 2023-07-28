const env: string = "prod"
const devOptions = {
    admin: {
        host: 'localhost',
        port: 8001,
    },
    communication: {
        host: 'localhost',
        port: 8002,
    },
    diagnosis: {
        host: 'localhost',
        port: 8003,
    },
    user_management: {
        host: 'localhost',
        port: 8004,
    }
}

const prodOptions = {
    admin: {
        host: 'admin',
        port: 8001,
    },
    communication: {
        host: 'communication',
        port: 8002,
    },
    diagnosis: {
        host: 'diagnosis',
        port: 8003,
    },
    user_management: {
        host: 'user_management',
        port: 8004,
    }
}
export const options = env === "dev" ? devOptions : prodOptions

export const routes = {
    admin: ["admin", "moderator"],
    communication: ["pack", 'contact', 'assistance', 'article', 'ads'],
    diagnosis: ['reservation', 'reclamation', 'rapport', 'avis', 'notification', 'stats'],
    user_management: ['payment', 'expert', 'client', 'auth', 'disponibilte', "models", "mark"]
}