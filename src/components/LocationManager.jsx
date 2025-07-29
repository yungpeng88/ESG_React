import React, { useState, useEffect } from "react";
import "./LocationManager.css";

function LocationManager({ onClose }) {
  const [formData, setFormData] = useState({
    location_id: "",
    location_type: "",
    country_id: "",
    location_name: "",
    location_address1: "",
    location_address2: "",
    enable_date: "",
    disable_date: "",
    location_note: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState("");

  // 地點類別選項
  const locationTypes = [
    { value: "", label: "" },
    { value: "辦公室", label: "辦公室" },
    { value: "廠區", label: "廠區" },
    { value: "倉儲", label: "倉儲" },
    { value: "宿舍", label: "宿舍" },
  ];

  // 國家選項
  const countries = [
    { value: "", label: "" },
    { value: "TW", label: "TW 台灣" },
    { value: "CN", label: "CN 中國" },
    { value: "VN", label: "VN 越南" },
    { value: "US", label: "US 美國" },
    { value: "BR", label: "BR 巴西" },
    { value: "DE", label: "DE 德國" },
    { value: "PL", label: "PL 波蘭" },
  ];

  // 模擬載入地點資料
  const loadLocationData = (locationId) => {
    // 這裡應該調用實際的 API
    console.log("Loading location data for ID:", locationId);
    // 模擬資料載入
    setFormData({
      location_id: locationId,
      location_type: "辦公室",
      country_id: "TW",
      location_name: "台北總部",
      location_address1: "台北市內湖區瑞光路399號",
      location_address2: "台北市內湖區瑞光路399號",
      enable_date: "2024-01-01",
      disable_date: "",
      location_note: "測試地點資料",
    });
    setIsEditMode(true);
  };

  // 清空表單資料
  const clearFormData = () => {
    setFormData({
      location_id: "",
      location_type: "",
      country_id: "",
      location_name: "",
      location_address1: "",
      location_address2: "",
      enable_date: "",
      disable_date: "",
      location_note: "",
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

  // 新增地點資料
  const handleAddLocation = async () => {
    try {
      // 這裡應該調用實際的 API
      console.log("Adding location data:", formData);
      
      // 模擬成功回應
      setMessage("新增地點資料成功");
      clearFormData();
      
      // 實際 API 調用應該像這樣：
      /*
      const response = await fetch('/api/location/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      if (result.status === "PASS") {
        setMessage("新增地點資料成功");
        clearFormData();
      } else {
        setMessage("新增地點資料失敗: " + result.message);
      }
      */
    } catch (error) {
      setMessage("新增地點資料失敗: " + error.message);
    }
  };

  // 更新地點資料
  const handleUpdateLocation = async () => {
    try {
      // 這裡應該調用實際的 API
      console.log("Updating location data:", formData);
      
      // 模擬成功回應
      setMessage("更新地點資料成功");
      
      // 實際 API 調用應該像這樣：
      /*
      const response = await fetch('/api/location/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      if (result.status === "PASS") {
        setMessage("更新地點資料成功");
        onClose();
      } else {
        setMessage("更新地點資料失敗: " + result.message);
      }
      */
    } catch (error) {
      setMessage("更新地點資料失敗: " + error.message);
    }
  };

  // 儲存按鈕點擊處理
  const handleSave = () => {
    if (isEditMode) {
      handleUpdateLocation();
    } else {
      handleAddLocation();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>公司地點資料維護</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="form-area">
            <div className="location-form-row">
              <div className="form-group location-col-lg-3 location-col-md-3 location-col-sm-3 location-col-xs-12">
                <label htmlFor="locationID">Location ID:</label>
                <input
                  type="text"
                  className="form-control"
                  id="new_location_id"
                  name="location_id"
                  value={formData.location_id}
                  onChange={handleInputChange}
                  disabled={isEditMode}
                />
              </div>
              <div className="form-group location-col-lg-3 location-col-md-3 location-col-sm-3 location-col-xs-12">
                <label htmlFor="type">類別</label>
                <select
                  className="form-control"
                  id="new_location_type"
                  name="location_type"
                  value={formData.location_type}
                  onChange={handleInputChange}
                >
                  {locationTypes.map((type, index) => (
                    <option key={index} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group location-col-lg-3 location-col-md-3 location-col-sm-3 location-col-xs-12">
                <label htmlFor="country">國家</label>
                <select
                  className="form-control"
                  id="countryID"
                  name="country_id"
                  value={formData.country_id}
                  onChange={handleInputChange}
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group location-col-lg-3 location-col-md-3 location-col-sm-3 location-col-xs-12">
                <label htmlFor="location">地點</label>
                <input
                  type="text"
                  className="form-control"
                  id="new_location_name"
                  name="location_name"
                  value={formData.location_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="locationAddress">英文地址</label>
              <input
                type="text"
                className="form-control"
                id="new_location_address1"
                name="location_address1"
                value={formData.location_address1}
                onChange={handleInputChange}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="locationAddress">中文地址</label>
              <input
                type="text"
                className="form-control"
                id="new_location_address2"
                name="location_address2"
                value={formData.location_address2}
                onChange={handleInputChange}
              />
            </div>
            <br />
            <div className="location-form-row location-align-items-center">
              <div className="form-group location-col-lg-4 location-col-md-4 location-col-sm-4 location-col-xs-12">
                <label htmlFor="enable_date">啟用日</label>
                <input
                  type="date"
                  className="form-control"
                  id="new_enable_date"
                  name="enable_date"
                  value={formData.enable_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group location-col-lg-4 location-col-md-4 location-col-sm-4 location-col-xs-12">
                <label htmlFor="disable_date">關閉日</label>
                <input
                  type="date"
                  className="form-control"
                  id="new_disable_date"
                  name="disable_date"
                  value={formData.disable_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="note">備註</label>
              <input
                type="text"
                className="form-control"
                id="new_location_note"
                name="location_note"
                value={formData.location_note}
                onChange={handleInputChange}
              />
            </div>
            <div className="location-col-12">
              <div className="location-d-flex location-justify-content-center location-p-3">
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

export default LocationManager; 