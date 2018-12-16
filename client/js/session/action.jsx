const createSession = (token) => {
  return {
    token,
    type: 'CREATE_SESSION',
  }
}

const destroySession = () => {
  return {
    type: 'DESTROY_SESSION',
  }
}

module.exports.createSession = createSession;
module.exports.destroySession = destroySession;
