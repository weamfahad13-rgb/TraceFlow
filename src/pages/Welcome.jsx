import "./Welcome.css";

import traceflowText from "../assets/traceflow text.svg";
import logo from "../assets/logo.svg";
import light from "../assets/light.svg";
import getStartedButton from "../assets/get started button.svg";

function Welcome({ onGetStarted }) {
  return (
    <main className="welcome">
      <img className="traceflow-text" src={traceflowText} alt="TraceFlow" />
      <img className="light" src={light} alt="" />
      <img className="logo" src={logo} alt="" />

      <button className="get-started-btn" type="button" onClick={onGetStarted}>
        <img src={getStartedButton} alt="Get Started" />
      </button>
    </main>
  );
}

export default Welcome;