import Otp from "./Components/Otp";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Otp otpLength={6} />
    </div>
  );
}
