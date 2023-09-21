const verifyJwtToken = async (token: string) => {
  const payload = getPayload(token)
  const exp = payload.exp
  const now = Date.now() / 1000
  if (now > exp) {
    return false
  }
  return true
}

const getPayload = (token: string) => {
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
}

const getRoles = (token: string) => {
  const payload = getPayload(token)
  return payload.roles
}

export { verifyJwtToken, getPayload, getRoles };