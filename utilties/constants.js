 const constantVariable  = {
    ALLOW_CORS_ORIGINS: [process.env.ELASTIC_IP ?? 'http://localhost:1234', process.env.DOMAIN_NAME] || '*',
    ALLOW_CORS_METHODS: "GET,POST,PATCH,PUT",
    PORT: 3000,
    BODY_LIMIT: '5mb'
}
export default constantVariable;