import React, { useEffect, useRef, useState } from "react";

interface OtpProps {
  otpLength?: number;
}

const Otp: React.FC<OtpProps> = ({ otpLength = 6 }) => {
  const [otpValues, setOtpValues] = useState<string[]>(
    Array(otpLength).fill("")
  );
  const ref = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    ref.current[0]?.focus();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    if (!/^\d?$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < otpLength - 1) {
      ref.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = "";
      setOtpValues(newOtpValues);

      if (index > 0) {
        ref.current[index - 1]?.focus();
      }
    } else if (event.key === "ArrowLeft") {
      // Move focus to the previous input field if available
      if (index > 0) {
        ref.current[index - 1]?.focus();
      }
    } else if (event.key === "ArrowRight") {
      // Move focus to the next input field if available
      if (index < otpLength - 1) {
        ref.current[index + 1]?.focus();
      }
    }
  };

  return (
    <div className="container">
      {otpValues.map((value, index) => (
        <input
          key={index}
          ref={(el) => (ref.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(event) => handleChange(event, index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        />
      ))}
    </div>
  );
};

export default Otp;
