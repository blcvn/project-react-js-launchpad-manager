import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "antd";
import logo3 from "../../assets/images/Google__G__Logo.svg.png";
import { loginWithGoogle } from "../../stores/features/auth/slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(
        loginWithGoogle({
          token: tokenResponse.access_token,
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setTimeout(() => {
            history.push("/profile");
          }, 100);
        }
      });
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
