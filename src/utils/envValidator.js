const requiredEnvVars = ['PORT', 'DATABASE_URL', 'JWT_SECRET'];

function validateEnv() {
    const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    if (missingVars.length > 0) {
        console.error(`Missing required environment variables: ${ missingVars.join(', ') }`);
        process.exit(1);
    }
}

module.exports = { validateEnv };