import React, { useState, useEffect } from "react";
import "./EmissionActivityEdit.css";

const EmissionActivityEdit = ({ emissionName, year, company, onClose }) => {
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({
    activityName: "",
    activityType: "",
    dataSource: "",
    consumptionAmount: "",
    unit: "L",
    activityPeriod: "monthly",
    startDate: "",
    endDate: "",
    facility: "",
    equipment: "",
    dataQuality: "measured",
    carbonFactor: "",
    calculationMethod: "direct",
    remarks: "",
    isActive: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [totalEmission, setTotalEmission] = useState(0);

  // 模擬活動數據
  useEffect(() => {
    loadActivityData();
  }, [emissionName, year, company]);

  const loadActivityData = () => {
    // 模擬 API 調用
    const mockData = [
      {
        id: 1,
        activityName: "發電機組燃油消耗",
        activityType: "燃料使用",
        dataSource: "油料採購發票",
        consumptionAmount: "1250.5",
        unit: "L",
        activityPeriod: "monthly",
        startDate: "2025-01-01",
        endDate: "2025-01-31",
        facility: "主廠房",
        equipment: "發電機組-001",
        dataQuality: "measured",
        carbonFactor: "2.31",
        calculationMethod: "direct",
        calculatedEmission: 2888.66,
        remarks: "每月定期記錄",
        isActive: true,
      },
      {
        id: 2,
        activityName: "堆高機柴油消耗",
        activityType: "燃料使用",
        dataSource: "加油站收據",
        consumptionAmount: "350.0",
        unit: "L",
        activityPeriod: "weekly",
        startDate: "2025-01-01",
        endDate: "2025-01-07",
        facility: "倉庫區",
        equipment: "堆高機-FT-002",
        dataQuality: "measured",
        carbonFactor: "2.61",
        calculationMethod: "direct",
        calculatedEmission: 913.5,
        remarks: "每週加油記錄",
        isActive: true,
      },
    ];
    setActivities(mockData);
    calculateTotalEmission(mockData);
  };

  const calculateTotalEmission = (activityList) => {
    const total = activityList
      .filter((activity) => activity.isActive)
      .reduce((sum, activity) => sum + (activity.calculatedEmission || 0), 0);
    setTotalEmission(total);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const calculateEmission = () => {
    const consumption = parseFloat(formData.consumptionAmount) || 0;
    const factor = parseFloat(formData.carbonFactor) || 0;
    return consumption * factor;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const calculatedEmission = calculateEmission();
    const activityData = {
      ...formData,
      calculatedEmission,
    };

    if (isEditing) {
      // 更新現有活動
      const updatedActivities = activities.map((activity) =>
        activity.id === editingId
          ? { ...activityData, id: editingId }
          : activity
      );
      setActivities(updatedActivities);
      calculateTotalEmission(updatedActivities);
    } else {
      // 新增活動
      const newActivity = {
        ...activityData,
        id: Date.now(),
      };
      const updatedActivities = [...activities, newActivity];
      setActivities(updatedActivities);
      calculateTotalEmission(updatedActivities);
    }

    resetForm();
  };

  const handleEdit = (activity) => {
    setFormData(activity);
    setIsEditing(true);
    setEditingId(activity.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("確定要刪除此活動數據嗎？")) {
      const updatedActivities = activities.filter(
        (activity) => activity.id !== id
      );
      setActivities(updatedActivities);
      calculateTotalEmission(updatedActivities);
    }
  };

  const resetForm = () => {
    setFormData({
      activityName: "",
      activityType: "",
      dataSource: "",
      consumptionAmount: "",
      unit: "L",
      activityPeriod: "monthly",
      startDate: "",
      endDate: "",
      facility: "",
      equipment: "",
      dataQuality: "measured",
      carbonFactor: "",
      calculationMethod: "direct",
      remarks: "",
      isActive: true,
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const activityTypes = [
    "燃料使用",
    "電力消耗",
    "製程活動",
    "運輸活動",
    "其他",
  ];

  const units = ["L", "kg", "m³", "kWh", "tonne", "gallon"];

  const dataSources = [
    "發票/收據",
    "電表讀數",
    "流量計",
    "估算",
    "供應商報告",
    "其他",
  ];

  const dataQualityOptions = [
    { value: "measured", label: "實測數據" },
    { value: "calculated", label: "計算數據" },
    { value: "estimated", label: "估算數據" },
  ];

  const calculationMethods = [
    { value: "direct", label: "直接計算法" },
    { value: "mass_balance", label: "質量平衡法" },
    { value: "emission_factor", label: "排放係數法" },
  ];

  return (
    <div className="emission-activity-edit">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>活動數據蒐集 - {emissionName}</h2>
            <div className="modal-info">
              <span className="info-item">年份: {year}</span>
              <span className="info-item">公司: {company}</span>
              <span className="info-item total-emission">
                總排放量: {totalEmission.toLocaleString()} kg CO₂e
              </span>
            </div>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="modal-body">
            {/* 新增/編輯表單 */}
            <div className="form-section">
              <h3>{isEditing ? "編輯活動數據" : "新增活動數據"}</h3>
              <form onSubmit={handleSubmit} className="activity-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="activityName">活動名稱 *</label>
                    <input
                      type="text"
                      id="activityName"
                      name="activityName"
                      value={formData.activityName}
                      onChange={handleInputChange}
                      required
                      placeholder="請輸入活動名稱"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="activityType">活動類型 *</label>
                    <select
                      id="activityType"
                      name="activityType"
                      value={formData.activityType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">請選擇類型</option>
                      {activityTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="facility">設施位置</label>
                    <input
                      type="text"
                      id="facility"
                      name="facility"
                      value={formData.facility}
                      onChange={handleInputChange}
                      placeholder="請輸入設施位置"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="equipment">設備名稱</label>
                    <input
                      type="text"
                      id="equipment"
                      name="equipment"
                      value={formData.equipment}
                      onChange={handleInputChange}
                      placeholder="請輸入設備名稱"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="consumptionAmount">消耗量 *</label>
                    <input
                      type="number"
                      id="consumptionAmount"
                      name="consumptionAmount"
                      value={formData.consumptionAmount}
                      onChange={handleInputChange}
                      required
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="unit">單位 *</label>
                    <select
                      id="unit"
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      required
                    >
                      {units.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="carbonFactor">碳排放係數</label>
                    <input
                      type="number"
                      id="carbonFactor"
                      name="carbonFactor"
                      value={formData.carbonFactor}
                      onChange={handleInputChange}
                      placeholder="kg CO₂e/單位"
                      step="0.001"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="calculatedEmission">計算排放量</label>
                    <input
                      type="number"
                      value={calculateEmission().toFixed(2)}
                      readOnly
                      className="calculated-field"
                      placeholder="自動計算"
                    />
                    <small>消耗量 × 碳排放係數</small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="startDate">開始日期</label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="endDate">結束日期</label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dataSource">數據來源</label>
                    <select
                      id="dataSource"
                      name="dataSource"
                      value={formData.dataSource}
                      onChange={handleInputChange}
                    >
                      <option value="">請選擇數據來源</option>
                      {dataSources.map((source) => (
                        <option key={source} value={source}>
                          {source}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="dataQuality">數據品質</label>
                    <select
                      id="dataQuality"
                      name="dataQuality"
                      value={formData.dataQuality}
                      onChange={handleInputChange}
                    >
                      {dataQualityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="remarks">備註</label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    placeholder="請輸入備註..."
                    rows="3"
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    納入排放計算
                  </label>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? "更新" : "新增"}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetForm}
                    >
                      取消編輯
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* 活動數據列表 */}
            <div className="list-section">
              <h3>活動數據清單</h3>
              <div className="table-responsive">
                <table className="activity-table">
                  <thead>
                    <tr>
                      <th>活動名稱</th>
                      <th>類型</th>
                      <th>消耗量</th>
                      <th>碳排放係數</th>
                      <th>計算排放量</th>
                      <th>數據期間</th>
                      <th>數據品質</th>
                      <th>狀態</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="no-data">
                          尚無活動數據
                        </td>
                      </tr>
                    ) : (
                      activities.map((activity) => (
                        <tr
                          key={activity.id}
                          className={!activity.isActive ? "inactive-row" : ""}
                        >
                          <td>
                            <div className="activity-name">
                              {activity.activityName}
                              {activity.equipment && (
                                <small>({activity.equipment})</small>
                              )}
                            </div>
                          </td>
                          <td>{activity.activityType}</td>
                          <td>
                            {parseFloat(
                              activity.consumptionAmount
                            ).toLocaleString()}{" "}
                            {activity.unit}
                          </td>
                          <td>
                            {activity.carbonFactor
                              ? `${activity.carbonFactor} kg CO₂e/${activity.unit}`
                              : "-"}
                          </td>
                          <td className="emission-value">
                            {activity.calculatedEmission
                              ? `${activity.calculatedEmission.toLocaleString()} kg CO₂e`
                              : "-"}
                          </td>
                          <td>
                            {activity.startDate && activity.endDate
                              ? `${activity.startDate} ~ ${activity.endDate}`
                              : "-"}
                          </td>
                          <td>
                            <span
                              className={`quality-badge ${activity.dataQuality}`}
                            >
                              {
                                dataQualityOptions.find(
                                  (q) => q.value === activity.dataQuality
                                )?.label
                              }
                            </span>
                          </td>
                          <td>
                            <span
                              className={`status ${
                                activity.isActive ? "active" : "inactive"
                              }`}
                            >
                              {activity.isActive ? "納入計算" : "未納入"}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn btn-sm btn-edit"
                                onClick={() => handleEdit(activity)}
                                title="編輯"
                              >
                                ✏️
                              </button>
                              <button
                                className="btn btn-sm btn-delete"
                                onClick={() => handleDelete(activity.id)}
                                title="刪除"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <div className="footer-info">
              <span>總計活動: {activities.length} 項</span>
              <span>
                納入計算: {activities.filter((a) => a.isActive).length} 項
              </span>
              <span className="total-emission-footer">
                總排放量: {totalEmission.toLocaleString()} kg CO₂e
              </span>
            </div>
            <button className="btn btn-secondary" onClick={onClose}>
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmissionActivityEdit;
