export type JWT = {
  iss: string, // issuer
  sub: string, // subject (user)
  aud: string[], // valid audiences
  iat: number, // issued at time
  exp: number, // expiration time
  azp: string, // client id
  scope: string // scope
}