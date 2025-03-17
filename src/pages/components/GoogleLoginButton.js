import { useGoogleLogin } from "@react-oauth/google";
import logo3 from "../../assets/images/Google__G__Logo.svg.png";
import { Button } from "antd";
const GoogleLoginButton = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Access Token:", tokenResponse.access_token);

      // Fetch user profile data from Google API
      fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
      )
        .then((res) => res.json())
        .then((user) => console.log("Google User Info:", user))
        .catch((err) => console.error("Error fetching user info:", err));
    },
    onError: () => console.log("Google Login Failed"),
  });

  return (
    <Button
      onClick={() => googleLogin()}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "110px",
        height: "80px",
      }}
    >
      <img
        src={logo3}
        alt="Google Logo"
        style={{ width: 20, marginBottom: 2 }}
      />
      <span>Google</span>
    </Button>
  );
};

export default GoogleLoginButton;
