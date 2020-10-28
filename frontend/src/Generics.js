import jwt from  'jsonwebtoken'

class Generics {


  static getRefreshToken() {
    return localStorage.getItem('refresh_token')
  }

  static getPayload() {
    return jwt.decode(this.getRefreshToken())
  }

  static isAuthenticated() {
    const payload = this.getPayload()
    const now = Math.round(Date.now() / 1000)
    return payload && now < payload.exp
  }

}

export default Generics