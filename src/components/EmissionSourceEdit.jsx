import React, { useState, useEffect } from "react";
import "./EmissionSourceEdit.css";

const EmissionSourceEdit = ({ emissionName, year, company, onClose }) => {
  const [sources, setSources] = useState([]);
  const [formData, setFormData] = useState({
    sourceName: "",
    sourceType: "",
    description: "",
    isActive: true,
    estimatedEmission: "",
    unit: "kg CO2e",
    category: "直接排放",
    facility: "",
    equipment: "",
    fuelType: "",
    remarks: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // 模擬排放源數據
  useEffect(() => {
    loadEmissionSources();
  }, [emissionName, year, company]);

  const loadEmissionSources = () => {
    // 模擬 API 調用
    const mockData = [
      {
        id: 1,
        sourceName: "汽油發電機組 #1",
        sourceType: "固定燃燒",
        description: "主要發電機組",
        isActive: true,
        estimatedEmission: "2500.5",
        unit: "kg CO2e",
        category: "直接排放",
        facility: "主廠房",
        equipment: "發電機組-001",
        fuelType: "汽油",
        remarks: "定期維護中",
      },
      {
        id: 2,
        sourceName: "柴油堆高機",
        sourceType: "移動燃燒",
        description: "倉庫運輸設備",
        isActive: true,
        estimatedEmission: "850.2",
        unit: "kg CO2e",
        category: "直接排放",
        facility: "倉庫區",
        equipment: "堆高機-FT-002",
        fuelType: "柴油",
        remarks: "",
      },
    ];
    setSources(mockData);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // 更新現有排放源
      setSources((prev) =>
        prev.map((source) =>
          source.id === editingId ? { ...formData, id: editingId } : source
        )
      );
    } else {
      // 新增排放源
      const newSource = {
        ...formData,
        id: Date.now(), // 簡單的 ID 生成
      };
      setSources((prev) => [...prev, newSource]);
    }

    resetForm();
  };

  const handleEdit = (source) => {
    setFormData(source);
    setIsEditing(true);
    setEditingId(source.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("確定要刪除此排放源嗎？")) {
      setSources((prev) => prev.filter((source) => source.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      sourceName: "",
      sourceType: "",
      description: "",
      isActive: true,
      estimatedEmission: "",
      unit: "kg CO2e",
      category: "直接排放",
      facility: "",
      equipment: "",
      fuelType: "",
      remarks: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const sourceTypes = ["固定燃燒", "移動燃燒", "製程排放", "逸散排放"];

  const fuelTypes = ["汽油", "柴油", "天然氣", "液化石油氣", "重油", "其他"];

  const units = ["kg CO2e", "tonne CO2e", "m³", "L", "kWh"];

  return (
    <div className="emission-source-edit">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>排放源鑑別 - {emissionName}</h2>
            <div className="modal-info">
              <span className="info-item">年份: {year}</span>
              <span className="info-item">公司: {company}</span>
            </div>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="modal-body">
            {/* 新增/編輯表單 */}
            <div className="form-section">
              <h3>{isEditing ? "編輯排放源" : "新增排放源"}</h3>
              <form onSubmit={handleSubmit} className="emission-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="sourceName">排放源名稱 *</label>
                    <input
                      type="text"
                      id="sourceName"
                      name="sourceName"
                      value={formData.sourceName}
                      onChange={handleInputChange}
                      required
                      placeholder="請輸入排放源名稱"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="sourceType">排放源類型 *</label>
                    <select
                      id="sourceType"
                      name="sourceType"
                      value={formData.sourceType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">請選擇類型</option>
                      {sourceTypes.map((type) => (
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
                    <label htmlFor="equipment">設備編號</label>
                    <input
                      type="text"
                      id="equipment"
                      name="equipment"
                      value={formData.equipment}
                      onChange={handleInputChange}
                      placeholder="請輸入設備編號"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="fuelType">燃料類型</label>
                    <select
                      id="fuelType"
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                    >
                      <option value="">請選擇燃料類型</option>
                      {fuelTypes.map((fuel) => (
                        <option key={fuel} value={fuel}>
                          {fuel}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="estimatedEmission">預估排放量</label>
                    <input
                      type="number"
                      id="estimatedEmission"
                      name="estimatedEmission"
                      value={formData.estimatedEmission}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="unit">單位</label>
                    <select
                      id="unit"
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                    >
                      {units.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">排放類別</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="直接排放">直接排放 (Scope 1)</option>
                      <option value="間接排放">間接排放 (Scope 2)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="description">描述</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="請輸入排放源描述..."
                    rows="3"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="remarks">備註</label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    placeholder="請輸入備註..."
                    rows="2"
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
                    啟用此排放源
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

            {/* 排放源列表 */}
            <div className="list-section">
              <h3>現有排放源清單</h3>
              <div className="table-responsive">
                <table className="emission-table">
                  <thead>
                    <tr>
                      <th>排放源名稱</th>
                      <th>類型</th>
                      <th>設施位置</th>
                      <th>燃料類型</th>
                      <th>預估排放量</th>
                      <th>狀態</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sources.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="no-data">
                          尚無排放源資料
                        </td>
                      </tr>
                    ) : (
                      sources.map((source) => (
                        <tr key={source.id}>
                          <td>
                            <div className="source-name">
                              {source.sourceName}
                              {source.equipment && (
                                <small>({source.equipment})</small>
                              )}
                            </div>
                          </td>
                          <td>{source.sourceType}</td>
                          <td>{source.facility || "-"}</td>
                          <td>{source.fuelType || "-"}</td>
                          <td>
                            {source.estimatedEmission
                              ? `${parseFloat(
                                  source.estimatedEmission
                                ).toLocaleString()} ${source.unit}`
                              : "-"}
                          </td>
                          <td>
                            <span
                              className={`status ${
                                source.isActive ? "active" : "inactive"
                              }`}
                            >
                              {source.isActive ? "啟用" : "停用"}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn btn-sm btn-edit"
                                onClick={() => handleEdit(source)}
                                title="編輯"
                              >
                                ✏️
                              </button>
                              <button
                                className="btn btn-sm btn-delete"
                                onClick={() => handleDelete(source.id)}
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
              <span>總計排放源: {sources.length} 項</span>
              <span>啟用中: {sources.filter((s) => s.isActive).length} 項</span>
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

export default EmissionSourceEdit;
