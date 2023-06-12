const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');


class Helper {
  constructor() { }

  generateToken(): string {
    return Math.random().toString(32).substring(2) + Date.now().toString(32)
  }

  generateJWT(id: string) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "3d"
    })
  }

  async validatePassword(enteredPassword: string, password: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, password)
  }

}

export default new Helper()