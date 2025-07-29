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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 這裡應該調用實際的登入 API
      console.log("Login attempt:", formData);
      
      // 模擬 API 調用延遲
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模擬登入成功
      if (formData.username && formData.password) {
        onLogin({
          username: formData.username,
          domain: formData.domain,
          isAuthenticated: true
        });
      } else {
        setError("請輸入用戶名和密碼");
      }
    } catch (error) {
      setError("登入失敗，請檢查您的憑證");
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="logo-svg">
                <circle cx="50" cy="50" r="45" fill="#4caf50" stroke="#2d5016" strokeWidth="2"/>
                <text x="50" y="60" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" textAnchor="middle" fill="white">ESG</text>
                <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="1" opacity="0.3"/>
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

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
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