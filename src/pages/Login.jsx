import "./Login.css";

import { supabase } from "../lib/supabase";

import traceflowText from "../assets/traceflow text.svg";
import purpleRectangle from "../assets/purple rectangle.svg";

function Login({ language = "en" }) {
  const text = {
    en: {
      google: "Continue with Google",
      signin: "Sign in to continue",
    },
    ar: {
      google: "المتابعة باستخدام Google",
      signin: "سجّل الدخول للمتابعة",
    },
  };

  const currentText = text[language] || text.en;

 const handleGoogleLogin = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
    },
  });
};

  return (
    <main className="login-page">
      <img className="login-title" src={traceflowText} alt="TraceFlow" />

      <div className="login-character">
        <img src={purpleRectangle} alt="" />
      </div>

      <div className="login-options">
        <div className="login-note">{currentText.signin}</div>

        <button className="google-btn" type="button" onClick={handleGoogleLogin}>
          <span className="google-icon">G</span>
          {currentText.google}
        </button>
      </div>
    </main>
  );
}

export default Login;