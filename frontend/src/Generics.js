import jwt from  'jsonwebtoken'
class Generics{
    static isAuthenticated() {
        const payload = jwt.decode(localStorage.getItem('refresh_token'))
        const now = Math.round(Date.now() / 1000)
        return payload && now < payload.exp
    }
}
export default Generics