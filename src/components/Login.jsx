import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    domain: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 這裡應該調用實際的登入 API
      console.log("Login attempt:", formData);

      // 檢查必填欄位
      if (!formData.username || !formData.password || !formData.domain) {
        setError("請填寫所有必填欄位");
        setLoading(false);
        return;
      }

      // 模擬 API 調用延遲
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch(
        `http://localhost:58740/LDAPService.aspx?domain=${encodeURIComponent(
          formData.domain
        )}&uid=${encodeURIComponent(
          formData.username
        )}&pwd=${encodeURIComponent(formData.password)}`,
        {
          method: "GET",
        }
      );

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      // 檢查響應是否成功
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 先獲取文本，再嘗試解析 JSON
      const responseText = await response.text();
      console.log("Response text:", responseText);

      let result;
      let UserInfo;
      try {
        result = JSON.parse(responseText);
        UserInfo = JSON.parse(result.anything); // 假設服務返回的數據包含用戶信息
      } catch (jsonError) {
        console.error("JSON parse error:", jsonError);
        throw new Error("伺服器返回的數據格式無效");
      }

      console.log("Parsed result:", result);

      // 檢查您的服務返回的狀態
      if (result.Status !== true) {
        setError(result.message || "登入失敗，請檢查您的憑證");
        return;
      }

      // 登入成功
      onLogin({
        username: formData.username,
        domain: formData.domain,
        isAuthenticated: true,
        additionalData: result.anything, // 如果服務返回額外數據
      });
    } catch (error) {
      console.error("Login error:", error);

      // 提供更詳細的錯誤信息
      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        setError("無法連接到登入服務，請檢查網絡連接或聯繫系統管理員");
      } else if (error.message.includes("JSON")) {
        setError("伺服器返回數據格式錯誤，請聯繫系統管理員");
      } else if (error.message.includes("HTTP error")) {
        setError(`伺服器錯誤 (${error.message})，請稍後再試`);
      } else {
        setError(error.message || "登入失敗，請檢查您的憑證");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // 這裡可以導向忘記密碼頁面或打開模態框
    alert("忘記密碼功能開發中...");
  };

  const handleRegisterAccount = () => {
    // 這裡可以導向註冊頁面或打開模態框
    alert("線上申請帳戶功能開發中...");
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-card">
          <div className="login-header">
            <div className="logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="logo-svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="#4caf50"
                  stroke="#2d5016"
                  strokeWidth="2"
                />
                <text
                  x="50"
                  y="60"
                  fontFamily="Arial, sans-serif"
                  fontSize="24"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="white"
                >
                  ESG
                </text>
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  opacity="0.3"
                />
              </svg>
            </div>
            <h1>ESG Portal</h1>
            <p className="slogan">There is no planet B</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">用戶名</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="請輸入用戶名"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="domain">網域</label>
              <select
                id="domain"
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
                required
              >
                <option value="">請選擇網域</option>
                <option value="compal.com">compal.com</option>
                <option value="compal.com.cn">compal.com.cn</option>
                <option value="compal.com.vn">compal.com.vn</option>
                <option value="compal.com.br">compal.com.br</option>
                <option value="compal.com.de">compal.com.de</option>
                <option value="compal.com.pl">compal.com.pl</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="password">密碼</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="請輸入密碼"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner"></div>
                  登入中...
                </>
              ) : (
                "登入"
              )}
            </button>
          </form>

          <div className="login-links">
            <a href="#" onClick={handleForgotPassword} className="link">
              忘記密碼？
            </a>
            <a href="#" onClick={handleRegisterAccount} className="link">
              線上申請帳戶
            </a>
          </div>

          <div className="login-footer">
            <p>© 2024 Compal Electronics, Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
