export default function setUserToken(token) {
    return { type: 'user_token', action: token };
}