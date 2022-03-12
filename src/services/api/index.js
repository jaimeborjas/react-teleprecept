const API = "https://teleprecept.herokuapp.com";

const endPoints = {
    base: API,
    auth: {
        login: `${API}/auth/login`,
        signup: `${API}/auth/signup`,
        profile: `${API}/userinfo`
    }
};

export default endPoints;
