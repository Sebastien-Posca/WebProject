export default function setUserToken(token) {
    return { type: 'user_token', token: token };
}