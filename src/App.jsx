import React, { useState } from "react";
import "./App.css";

// 導入所有圖示
import oilIcon from "/assets/img/oil.svg";
import liquefiedGasIcon from "/assets/img/liquefied_gas.svg";
import septicTankIcon from "/assets/img/septic_tank.svg";
import fireexIcon from "/assets/img/fireex.svg";
import refrigerantIcon from "/assets/img/refrigerant.svg";
import electricityIcon from "/assets/img/electricity.svg";
import waterIcon from "/assets/img/water.svg";
import wasteIcon from "/assets/img/waste.svg";
import businessTravelIcon from "/assets/img/business_travel.svg";

function App() {
  const [activeTab, setActiveTab] = useState("scope12");

  const emissionData = {
    scope12: [
      {
        id: "fuel",
        titleZh: "燃料",
        titleEn: "Fuel",
        icon: oilIcon,
        links: [
          { text: "排放源鑑別", href: "#" },
          { text: "活動數據蒐集", href: "#" },
          { text: "年度活動清單", href: "#" },
        ],
      },
      {
        id: "fuelgas",
        titleZh: "燃氣",
        titleEn: "Fuel Gas",
        icon: liquefiedGasIcon,
        links: [
          { text: "排放源鑑別", href: "#" },
          { text: "活動數據蒐集", href: "#" },
          { text: "年度活動清單", href: "#" },
        ],
      },
      {
        id: "sewage",
        titleZh: "化糞池",
        titleEn: "Septic Tank",
        icon: septicTankIcon,
        links: [
          { text: "排放源鑑別", href: "#" },
          { text: "活動數據蒐集", href: "#" },
          { text: "年度活動清單", href: "#" },
        ],
      },
      {
        id: "fireex",
        titleZh: "滅火器",
        titleEn: "Fire Extinguisher",
        icon: fireexIcon,
        links: [
          { text: "排放源鑑別", href: "#" },
          { text: "活動數據蒐集", href: "#" },
          { text: "年度活動清單", href: "#" },
        ],
      },
      {
        id: "refrigerant",
        titleZh: "冷媒",
        titleEn: "Refrigerant",
        icon: refrigerantIcon,
        links: [
          { text: "排放源鑑別", href: "#" },
          { text: "活動數據蒐集", href: "#" },
          { text: "年度活動清單", href: "#" },
        ],
      },
      {
        id: "electricity",
        titleZh: "電力",
        titleEn: "Electricity",
        icon: electricityIcon,
        links: [
          { text: "排放源鑑別", href: "#" },
          { text: "活動數據蒐集", href: "#" },
          { text: "年度活動清單", href: "#" },
        ],
      },
    ],
    scope3: [
      {
        id: "water",
        titleZh: "水",
        titleEn: "Water",
        icon: waterIcon,
        links: [
          { text: "排放源鑑別", href: "#" },
          { text: "活動數據蒐集", href: "#" },
          { text: "年度活動清單", href: "#" },
        ],
      },
      {
        id: "waste",
        titleZh: "廢棄物",
        titleEn: "Waste",
        icon: wasteIcon,
        links: [
          { text: "排放源鑑別", href: "#" },
          { text: "活動數據蒐集", href: "#" },
          { text: "年度活動清單", href: "#" },
        ],
      },
      {
        id: "businesstravel",
        titleZh: "商務旅行",
        titleEn: "Business Travel",
        icon: businessTravelIcon,
        links: [
          { text: "排放源鑑別", href: "#" },
          { text: "活動數據蒐集", href: "#" },
          { text: "年度活動清單", href: "#" },
        ],
      },
    ],
    other: [
      {
        id: "affairs",
        titleZh: "環保經費支出",
        titleEn: "Affairs",
        icon: "🏢", // 使用 emoji 作為臨時圖示
        links: [
          { text: "環保事務經費支出", href: "#" },
          { text: "地點資料", href: "#" },
        ],
      },
    ],
    report: [
      {
        id: "inventory",
        titleZh: "碳排清冊",
        titleEn: "inventory",
        icon: "🏢", // 使用 emoji 作為臨時圖示
        links: [
          { text: "碳排清冊", href: "#" },
          { text: "公司廢棄物清冊", href: "#" },
          { text: "碳排佐證檔下載", href: "#" },
          { text: "碳排清冊檔下載", href: "#" },
        ],
      },
      {
        id: "inventorySummary",
        titleZh: "碳排清冊總表",
        titleEn: "inventorySummary",
        icon: "🏢", // 使用 emoji 作為臨時圖示
        links: [{ text: "碳排清冊總表", href: "#" }],
      },
    ],
    setup: [
      {
        id: "company",
        titleZh: "公司設定",
        titleEn: "Company",
        icon: "🏢", // 使用 emoji 作為臨時圖示
        links: [
          { text: "公司資料", href: "#" },
          { text: "地點資料", href: "#" },
        ],
      },
      {
        id: "account",
        titleZh: "帳號管理",
        titleEn: "Account",
        icon: "👤", // 使用 emoji 作為臨時圖示
        links: [
          { text: "使用者管理", href: "#" },
          { text: "權限設定", href: "#" },
          { text: "角色配置", href: "#" },
        ],
      },
      {
        id: "config",
        titleZh: "系統設定",
        titleEn: "Config",
        icon: "⚙️", // 使用 emoji 作為臨時圖示
        links: [
          { text: "參數設定", href: "#" },
          { text: "碳係數管理", href: "#" },
          { text: "排放源監別", href: "#" },
        ],
      },
      {
        id: "monitor",
        titleZh: "監控面板",
        titleEn: "Monitor",
        icon: "📊", // 使用 emoji 作為臨時圖示
        links: [
          { text: "系統監控", href: "#" },
          { text: "效能分析", href: "#" },
          { text: "報表設定", href: "#" },
        ],
      },
    ],
  };

  const EmissionCard = ({ item }) => (
    <div className="col-lg-4 col-sm-6" id={item.id}>
      <div className="card">
        <div className="face face1">
          <div className="content">
            <div className="title1">{item.titleZh}</div>
            {item.links.map((link, index) => (
              <a key={index} href={link.href}>
                {link.text}
              </a>
            ))}
          </div>
        </div>
        <div className="face face2">
          {typeof item.icon === "string" && item.icon.length <= 2 ? (
            <div className="emoji-icon">{item.icon}</div>
          ) : (
            <img src={item.icon} alt={item.titleEn} />
          )}
          <div className="title">
            {item.titleZh}
            <p className="sfont">{item.titleEn}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="snippet-body" id="body-pd">
      <div className="slogan-a">ESG Portal</div>
      <p className="slogan-b">There is no planet B</p>
      <div className="container">
        <div className="tabs">
          <div className="tabs-header">
            <input
              type="radio"
              name="tabs"
              id="tabone"
              checked={activeTab === "scope12"}
              onChange={() => setActiveTab("scope12")}
            />
            <label htmlFor="tabone">Scope 1+2</label>

            <input
              type="radio"
              name="tabs"
              id="tabtwo"
              checked={activeTab === "scope3"}
              onChange={() => setActiveTab("scope3")}
            />
            <label htmlFor="tabtwo">Scope 3</label>

            <input
              type="radio"
              name="tabs"
              id="tabthree"
              checked={activeTab === "other"}
              onChange={() => setActiveTab("other")}
            />
            <label htmlFor="tabthree">Other</label>
            <input
              type="radio"
              name="tabs"
              id="tabfour"
              checked={activeTab === "report"}
              onChange={() => setActiveTab("report")}
            />
            <label htmlFor="tabfour">Report</label>

            <input
              type="radio"
              name="tabs"
              id="tabfour"
              checked={activeTab === "setup"}
              onChange={() => setActiveTab("setup")}
            />
            <label htmlFor="tabfour">Setup</label>
          </div>

          <div className="tab">
            <div className="row g-0">
              {activeTab === "scope12" &&
                emissionData.scope12.map((item) => (
                  <EmissionCard key={item.id} item={item} />
                ))}
              {activeTab === "scope3" &&
                emissionData.scope3.map((item) => (
                  <EmissionCard key={item.id} item={item} />
                ))}
              {activeTab === "setup" &&
                emissionData.setup.map((item) => (
                  <EmissionCard key={item.id} item={item} />
                ))}
              {activeTab === "other" &&
                emissionData.other.map((item) => (
                  <EmissionCard key={item.id} item={item} />
                ))}
              {activeTab === "report" &&
                emissionData.report.map((item) => (
                  <EmissionCard key={item.id} item={item} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
