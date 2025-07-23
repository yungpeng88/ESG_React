import React, { useState, useEffect } from "react";
import "./EmissionActivityReport.css";

const EmissionActivityReport = ({ emissionName, year, company, onClose }) => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "month",
    direction: "asc",
  });
  const [filterConfig, setFilterConfig] = useState({
    location: "all",
    status: "all",
    minEmission: "",
    maxEmission: "",
  });

  // 模擬報告數據
  const generateMockData = () => {
    const months = [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ];

    const locations = [
      "總部大樓",
      "製造廠房A",
      "製造廠房B",
      "辦公大樓C",
      "倉儲中心",
    ];
    const equipments = [
      "鍋爐#1",
      "鍋爐#2",
      "發電機A",
      "發電機B",
      "加熱器#1",
      "加熱器#2",
    ];

    return months.map((month, index) => {
      const baseConsumption = Math.random() * 5000 + 2000;
      const emissionFactor = emissionName === "Fuel" ? 2.31 : 1.89; // kg CO2e/L or kg CO2e/m³
      const totalEmission = baseConsumption * emissionFactor;

      return {
        id: index + 1,
        month: month,
        period: `${year}/${String(index + 1).padStart(2, "0")}`,
        location: locations[Math.floor(Math.random() * locations.length)],
        equipment: equipments[Math.floor(Math.random() * equipments.length)],
        consumption: baseConsumption,
        unit: emissionName === "Fuel" ? "公升" : "立方公尺",
        emissionFactor: emissionFactor,
        co2Emission: totalEmission,
        dataQuality:
          Math.random() > 0.7
            ? "measured"
            : Math.random() > 0.4
            ? "calculated"
            : "estimated",
        status: Math.random() > 0.1 ? "verified" : "pending",
        verifiedBy: Math.random() > 0.3 ? "環保部門" : "",
        verifiedDate:
          Math.random() > 0.3
            ? `${year}/${String(index + 1).padStart(2, "0")}/28`
            : "",
        notes:
          Math.random() > 0.7
            ? "設備維護期間數據"
            : Math.random() > 0.5
            ? "包含緊急發電用量"
            : "",
        carbonCredit: Math.random() > 0.8 ? Math.random() * 100 + 50 : 0,
      };
    });
  };

  useEffect(() => {
    setLoading(true);
    // 模擬 API 調用延遲
    setTimeout(() => {
      const data = generateMockData();
      setReportData(data);
      setLoading(false);
    }, 1000);
  }, [emissionName, year, company]);

  // 排序函數
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // 過濾和排序數據
  const getFilteredAndSortedData = () => {
    let filteredData = [...reportData];

    // 期間過濾
    if (selectedPeriod !== "all") {
      const currentMonth = new Date().getMonth() + 1;
      if (selectedPeriod === "quarter1") {
        filteredData = filteredData.filter((item) => {
          const month = parseInt(item.period.split("/")[1]);
          return month >= 1 && month <= 3;
        });
      } else if (selectedPeriod === "quarter2") {
        filteredData = filteredData.filter((item) => {
          const month = parseInt(item.period.split("/")[1]);
          return month >= 4 && month <= 6;
        });
      } else if (selectedPeriod === "quarter3") {
        filteredData = filteredData.filter((item) => {
          const month = parseInt(item.period.split("/")[1]);
          return month >= 7 && month <= 9;
        });
      } else if (selectedPeriod === "quarter4") {
        filteredData = filteredData.filter((item) => {
          const month = parseInt(item.period.split("/")[1]);
          return month >= 10 && month <= 12;
        });
      } else if (selectedPeriod === "ytd") {
        filteredData = filteredData.filter((item) => {
          const month = parseInt(item.period.split("/")[1]);
          return month <= currentMonth;
        });
      }
    }

    // 地點過濾
    if (filterConfig.location !== "all") {
      filteredData = filteredData.filter(
        (item) => item.location === filterConfig.location
      );
    }

    // 狀態過濾
    if (filterConfig.status !== "all") {
      filteredData = filteredData.filter(
        (item) => item.status === filterConfig.status
      );
    }

    // 排放量範圍過濾
    if (filterConfig.minEmission) {
      filteredData = filteredData.filter(
        (item) => item.co2Emission >= parseFloat(filterConfig.minEmission)
      );
    }
    if (filterConfig.maxEmission) {
      filteredData = filteredData.filter(
        (item) => item.co2Emission <= parseFloat(filterConfig.maxEmission)
      );
    }

    // 排序
    filteredData.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortConfig.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filteredData;
  };

  // 計算統計數據
  const getStatistics = () => {
    const filteredData = getFilteredAndSortedData();
    const totalConsumption = filteredData.reduce(
      (sum, item) => sum + item.consumption,
      0
    );
    const totalEmission = filteredData.reduce(
      (sum, item) => sum + item.co2Emission,
      0
    );
    const avgEmission =
      filteredData.length > 0 ? totalEmission / filteredData.length : 0;
    const verifiedCount = filteredData.filter(
      (item) => item.status === "verified"
    ).length;
    const verificationRate =
      filteredData.length > 0 ? (verifiedCount / filteredData.length) * 100 : 0;
    const totalCarbonCredit = filteredData.reduce(
      (sum, item) => sum + (item.carbonCredit || 0),
      0
    );

    return {
      totalConsumption: totalConsumption.toFixed(2),
      totalEmission: totalEmission.toFixed(2),
      avgEmission: avgEmission.toFixed(2),
      verificationRate: verificationRate.toFixed(1),
      totalCarbonCredit: totalCarbonCredit.toFixed(2),
      dataCount: filteredData.length,
    };
  };

  // 導出報告
  const handleExport = (format) => {
    const data = getFilteredAndSortedData();
    const statistics = getStatistics();

    if (format === "csv") {
      // CSV 導出邏輯
      const csvContent = [
        [
          "期間",
          "地點",
          "設備",
          "消耗量",
          "單位",
          "排放係數",
          "CO2排放量(kgCO2e)",
          "數據品質",
          "驗證狀態",
          "驗證人員",
          "驗證日期",
          "備註",
        ].join(","),
        ...data.map((item) =>
          [
            item.period,
            item.location,
            item.equipment,
            item.consumption.toFixed(2),
            item.unit,
            item.emissionFactor,
            item.co2Emission.toFixed(2),
            item.dataQuality,
            item.status,
            item.verifiedBy,
            item.verifiedDate,
            item.notes,
          ].join(",")
        ),
      ].join("\n");

      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${emissionName}_年度活動清單_${year}.csv`;
      link.click();
    } else if (format === "pdf") {
      // PDF 導出提示
      alert("PDF 導出功能開發中...");
    }
  };

  const filteredData = getFilteredAndSortedData();
  const statistics = getStatistics();

  return (
    <div className="emission-activity-report">
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>年度活動清單 - {emissionName}</h2>
            <div className="modal-info">
              <div className="info-item">年度: {year}</div>
              <div className="info-item">公司: {company}</div>
              <div className="info-item total-emission">
                總排放量: {statistics.totalEmission} kgCO₂e
              </div>
            </div>
            <button className="close-btn" onClick={onClose}>
              &times;
            </button>
          </div>

          <div className="modal-body">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>載入年度活動數據中...</p>
              </div>
            ) : (
              <>
                {/* 統計摘要 */}
                <div className="statistics-section">
                  <h3>統計摘要</h3>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-value">
                        {statistics.totalConsumption}
                      </div>
                      <div className="stat-label">
                        總消耗量 ({filteredData[0]?.unit || "單位"})
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">
                        {statistics.totalEmission}
                      </div>
                      <div className="stat-label">總排放量 (kgCO₂e)</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">{statistics.avgEmission}</div>
                      <div className="stat-label">平均月排放量 (kgCO₂e)</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">
                        {statistics.verificationRate}%
                      </div>
                      <div className="stat-label">驗證完成率</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">
                        {statistics.totalCarbonCredit}
                      </div>
                      <div className="stat-label">碳權抵減 (kgCO₂e)</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">{statistics.dataCount}</div>
                      <div className="stat-label">數據筆數</div>
                    </div>
                  </div>
                </div>

                {/* 過濾控制 */}
                <div className="filter-section">
                  <h3>篩選與排序</h3>
                  <div className="filter-controls">
                    <div className="filter-group">
                      <label>報告期間:</label>
                      <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                      >
                        <option value="all">全年度</option>
                        <option value="quarter1">第一季 (1-3月)</option>
                        <option value="quarter2">第二季 (4-6月)</option>
                        <option value="quarter3">第三季 (7-9月)</option>
                        <option value="quarter4">第四季 (10-12月)</option>
                        <option value="ytd">年初至今</option>
                      </select>
                    </div>

                    <div className="filter-group">
                      <label>地點:</label>
                      <select
                        value={filterConfig.location}
                        onChange={(e) =>
                          setFilterConfig({
                            ...filterConfig,
                            location: e.target.value,
                          })
                        }
                      >
                        <option value="all">全部地點</option>
                        <option value="總部大樓">總部大樓</option>
                        <option value="製造廠房A">製造廠房A</option>
                        <option value="製造廠房B">製造廠房B</option>
                        <option value="辦公大樓C">辦公大樓C</option>
                        <option value="倉儲中心">倉儲中心</option>
                      </select>
                    </div>

                    <div className="filter-group">
                      <label>驗證狀態:</label>
                      <select
                        value={filterConfig.status}
                        onChange={(e) =>
                          setFilterConfig({
                            ...filterConfig,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="all">全部狀態</option>
                        <option value="verified">已驗證</option>
                        <option value="pending">待驗證</option>
                      </select>
                    </div>

                    <div className="filter-group">
                      <label>排放量範圍 (kgCO₂e):</label>
                      <div className="range-inputs">
                        <input
                          type="number"
                          placeholder="最小值"
                          value={filterConfig.minEmission}
                          onChange={(e) =>
                            setFilterConfig({
                              ...filterConfig,
                              minEmission: e.target.value,
                            })
                          }
                        />
                        <span>至</span>
                        <input
                          type="number"
                          placeholder="最大值"
                          value={filterConfig.maxEmission}
                          onChange={(e) =>
                            setFilterConfig({
                              ...filterConfig,
                              maxEmission: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="action-buttons">
                      <button
                        className="btn btn-secondary"
                        onClick={() =>
                          setFilterConfig({
                            location: "all",
                            status: "all",
                            minEmission: "",
                            maxEmission: "",
                          })
                        }
                      >
                        清除篩選
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleExport("csv")}
                      >
                        📊 導出 CSV
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleExport("pdf")}
                      >
                        📄 導出 PDF
                      </button>
                    </div>
                  </div>
                </div>

                {/* 數據表格 */}
                <div className="data-section">
                  <h3>詳細數據</h3>
                  <div className="table-responsive">
                    <table className="report-table">
                      <thead>
                        <tr>
                          <th
                            onClick={() => handleSort("period")}
                            className="sortable"
                          >
                            期間{" "}
                            {sortConfig.key === "period" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th
                            onClick={() => handleSort("location")}
                            className="sortable"
                          >
                            地點{" "}
                            {sortConfig.key === "location" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th
                            onClick={() => handleSort("equipment")}
                            className="sortable"
                          >
                            設備{" "}
                            {sortConfig.key === "equipment" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th
                            onClick={() => handleSort("consumption")}
                            className="sortable"
                          >
                            消耗量{" "}
                            {sortConfig.key === "consumption" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th>單位</th>
                          <th>排放係數</th>
                          <th
                            onClick={() => handleSort("co2Emission")}
                            className="sortable"
                          >
                            CO₂排放量{" "}
                            {sortConfig.key === "co2Emission" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th>數據品質</th>
                          <th
                            onClick={() => handleSort("status")}
                            className="sortable"
                          >
                            驗證狀態{" "}
                            {sortConfig.key === "status" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th>驗證資訊</th>
                          <th>碳權抵減</th>
                          <th>備註</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((item) => (
                          <tr key={item.id}>
                            <td className="period-cell">{item.period}</td>
                            <td>{item.location}</td>
                            <td>{item.equipment}</td>
                            <td className="number-cell">
                              {item.consumption.toFixed(2)}
                            </td>
                            <td>{item.unit}</td>
                            <td className="number-cell">
                              {item.emissionFactor}
                            </td>
                            <td className="emission-cell">
                              {item.co2Emission.toFixed(2)}
                            </td>
                            <td>
                              <span
                                className={`quality-badge ${item.dataQuality}`}
                              >
                                {item.dataQuality === "measured"
                                  ? "實測"
                                  : item.dataQuality === "calculated"
                                  ? "計算"
                                  : "估算"}
                              </span>
                            </td>
                            <td>
                              <span className={`status ${item.status}`}>
                                {item.status === "verified"
                                  ? "已驗證"
                                  : "待驗證"}
                              </span>
                            </td>
                            <td className="verification-info">
                              {item.verifiedBy && (
                                <div>
                                  <div className="verified-by">
                                    👤 {item.verifiedBy}
                                  </div>
                                  <div className="verified-date">
                                    📅 {item.verifiedDate}
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="carbon-credit">
                              {item.carbonCredit > 0
                                ? `${item.carbonCredit.toFixed(2)} kgCO₂e`
                                : "-"}
                            </td>
                            <td className="notes-cell">{item.notes || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {filteredData.length === 0 && (
                      <div className="no-data">📊 目前篩選條件下無數據</div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="modal-footer">
            <div className="footer-info">
              <div className="info-item">數據筆數: {statistics.dataCount}</div>
              <div className="info-item">
                總消耗量: {statistics.totalConsumption}{" "}
                {filteredData[0]?.unit || "單位"}
              </div>
              <div className="info-item total-emission-footer">
                總排放量: {statistics.totalEmission} kgCO₂e
              </div>
              <div className="info-item">
                驗證完成率: {statistics.verificationRate}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmissionActivityReport;
