import User from '../router/checkUser'

export default (app) =>{
    app.post('/api/user',User)
}


