import React, { useState, useEffect } from "react";
import "./CompanyManager.css";

function CompanyManager({ onClose }) {
  const [formData, setFormData] = useState({
    company_id: "",
    company_code: "",
    company_cn: "",
    control_group: "Yes",
    shares_ratio: 100,
    enable_date: "",
    disable_date: "",
    company_note: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState("");

  // 模擬載入公司資料
  const loadCompany = (companyId) => {
    // 這裡應該調用實際的 API
    console.log("Loading company data for ID:", companyId);
    // 模擬資料載入
    setFormData({
      company_id: companyId,
      company_code: "COMP001",
      company_cn: "仁寶電腦工業股份有限公司",
      control_group: "Yes",
      shares_ratio: 100,
      enable_date: "2024-01-01",
      disable_date: "",
      company_note: "測試公司資料",
    });
    setIsEditMode(true);
  };

  // 清空表單資料
  const clearFormData = () => {
    setFormData({
      company_id: "",
      company_code: "",
      company_cn: "",
      control_group: "Yes",
      shares_ratio: 100,
      enable_date: "",
      disable_date: "",
      company_note: "",
    });
    setIsEditMode(false);
    setMessage("");
  };

  // 處理表單輸入變更
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 新增公司資料
  const handleAddCompany = async () => {
    try {
      // 這裡應該調用實際的 API
      console.log("Adding company data:", formData);
      
      // 模擬成功回應
      setMessage("新增公司資料成功");
      clearFormData();
      
      // 實際 API 調用應該像這樣：
      /*
      const response = await fetch('/api/company/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      if (result.status === "PASS") {
        setMessage("新增公司資料成功");
        clearFormData();
      } else {
        setMessage("新增公司資料失敗: " + result.message);
      }
      */
    } catch (error) {
      setMessage("新增公司資料失敗: " + error.message);
    }
  };

  // 更新公司資料
  const handleUpdateCompany = async () => {
    try {
      // 這裡應該調用實際的 API
      console.log("Updating company data:", formData);
      
      // 模擬成功回應
      setMessage("更新公司資料成功");
      
      // 實際 API 調用應該像這樣：
      /*
      const response = await fetch('/api/company/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      if (result.status === "PASS") {
        setMessage("更新公司資料成功");
        onClose();
      } else {
        setMessage("更新公司資料失敗: " + result.message);
      }
      */
    } catch (error) {
      setMessage("更新公司資料失敗: " + error.message);
    }
  };

  // 儲存按鈕點擊處理
  const handleSave = () => {
    if (isEditMode) {
      handleUpdateCompany();
    } else {
      handleAddCompany();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>公司基本資料維護</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">

          <div className="form-area">
            <div className="company-form-row">
              <div className="form-group company-col-lg-4 company-col-md-4 company-col-sm-4 company-col-xs-12" style={{ display: "none" }}>
                <label htmlFor="companyID">公司代號</label>
                <input
                  type="text"
                  className="form-control"
                  id="text_company_id"
                  name="company_id"
                  value={formData.company_id}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
              <div className="form-group company-col-lg-4 company-col-md-4 company-col-sm-4 company-col-xs-12">
                <label htmlFor="companyCode">公司代號</label>
                <input
                  type="text"
                  className="form-control"
                  id="text_company_code"
                  name="company_code"
                  value={formData.company_code}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group company-col-lg-8 company-col-md-8 company-col-sm-8 company-col-xs-12">
                <label htmlFor="companyCN">公司名稱</label>
                <input
                  type="text"
                  className="form-control"
                  id="text_company_cn"
                  name="company_cn"
                  value={formData.company_cn}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <br />
            <div className="company-form-row">
              <div className="form-group company-col-lg-4 company-col-md-4 company-col-sm-4 company-col-xs-12">
                <label htmlFor="control_group">控制權</label>
                <select
                  id="text_control_group"
                  name="control_group"
                  className="form-select"
                  value={formData.control_group}
                  onChange={handleInputChange}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="form-group company-col-lg-4 company-col-md-4 company-col-sm-4 company-col-xs-12">
                <label htmlFor="shares_ratio">股份</label>
                <input
                  type="number"
                  className="form-control"
                  id="text_shares_ratio"
                  name="shares_ratio"
                  value={formData.shares_ratio}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <br />
            <div className="company-form-row company-align-items-center">
              <div className="form-group company-col-lg-4 company-col-md-4 company-col-sm-4 company-col-xs-12">
                <label htmlFor="enable_date">啟用日</label>
                <input
                  type="date"
                  className="form-control"
                  id="text_enable_date"
                  name="enable_date"
                  value={formData.enable_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group company-col-lg-4 company-col-md-4 company-col-sm-4 company-col-xs-12">
                <label htmlFor="disable_date">關閉日</label>
                <input
                  type="date"
                  className="form-control"
                  id="text_disable_date"
                  name="disable_date"
                  value={formData.disable_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="company_note">備註</label>
              <textarea
                className="form-control"
                id="text_company_note"
                name="company_note"
                value={formData.company_note}
                onChange={handleInputChange}
                rows="3"
              ></textarea>
            </div>
            <div className="company-col-12">
              <div className="company-d-flex company-justify-content-center company-p-3">
                <button
                  type="button"
                  id="btnModifyDataSave"
                  className="btn btn-success"
                  style={{ width: "6rem" }}
                  onClick={handleSave}
                >
                  儲存
                </button>
              </div>
              {message && (
                <div className="form-group">
                  <label htmlFor="note" id="returnMessage" className="message">
                    {message}
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyManager; 