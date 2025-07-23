import React, { useState, useEffect } from "react";
import "./App.css";
import EmissionSourceEdit from "./components/EmissionSourceEdit";
import EmissionActivityEdit from "./components/EmissionActivityEdit";
import EmissionActivityReport from "./components/EmissionActivityReport";

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
  const [username] = useState("Albert Peng");
  const [currentLanguage, setCurrentLanguage] = useState("TW");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showYearMenu, setShowYearMenu] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(1);
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const [showEmissionSourceEdit, setShowEmissionSourceEdit] = useState(false);
  const [showEmissionActivityEdit, setShowEmissionActivityEdit] =
    useState(false);
  const [showEmissionActivityReport, setShowEmissionActivityReport] =
    useState(false);
  const [emissionEditParams, setEmissionEditParams] = useState({
    emissionName: "",
    year: null,
    company: "",
  });

  const languages = {
    TW: "繁中",
    CN: "简中",
    VN: "Tiếng Việt",
    EN: "English",
  };
  const company = {
    1: "000-1 仁寶電腦工業股份有限公司",
    2: "000-2 仁寶電腦工業股份有限公司(平鎮廠) (PCP)",
    3: "048 仁寶視訊電子(昆山)有限公司(CDE) (仁寶視訊) (KSD)",
    4: "040 仁寶電子科技(昆山)有限公司 (CET) (KS1)",
    5: "041 仁寶資訊工業(昆山)有限公司 (CIC) (KS2)",
    6: "042 仁寶信息技術(昆山)有限公司 (CIT) (KS345)",
    7: "045 仁寶數碼科技(昆山)有限公司 (CDT) (TCO)",
  };
  const currentCompany = company[1]; // 假設當前公司為 000-1 仁寶電腦工業股份有限公司
  // 生成年份選項 (當前年份 -1 到 +3)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let i = currentYear - 1; i <= currentYear + 3; i++) {
    yearOptions.push(i);
  }

  // 點擊外部關閉選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLangMenu && !event.target.closest(".language-selector")) {
        setShowLangMenu(false);
      }
      if (showYearMenu && !event.target.closest(".year-selector")) {
        setShowYearMenu(false);
      }
      if (showCompanyMenu && !event.target.closest(".company-selector")) {
        setShowCompanyMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showLangMenu, showYearMenu, showCompanyMenu]);

  // 處理排放源鑑別連結點擊
  const handleEmissionSourceEdit = (emissionName) => {
    setEmissionEditParams({
      emissionName: emissionName,
      year: selectedYear,
      company: company[selectedCompany],
    });
    setShowEmissionSourceEdit(true);
  };

  // 處理活動數據蒐集連結點擊
  const handleEmissionActivityEdit = (emissionName) => {
    setEmissionEditParams({
      emissionName: emissionName,
      year: selectedYear,
      company: company[selectedCompany],
    });
    setShowEmissionActivityEdit(true);
  };

  // 處理年度活動清單連結點擊
  const handleEmissionActivityReport = (emissionName) => {
    setEmissionEditParams({
      emissionName: emissionName,
      year: selectedYear,
      company: company[selectedCompany],
    });
    setShowEmissionActivityReport(true);
  };

  const closeEmissionSourceEdit = () => {
    setShowEmissionSourceEdit(false);
  };

  const closeEmissionActivityEdit = () => {
    setShowEmissionActivityEdit(false);
  };

  const closeEmissionActivityReport = () => {
    setShowEmissionActivityReport(false);
  };

  const emissionData = {
    scope12: [
      {
        id: "fuel",
        titleZh: "燃料",
        titleEn: "Fuel",
        icon: oilIcon,
        links: [
          {
            text: "排放源鑑別",
            href: "#",
            onClick: () => handleEmissionSourceEdit("Fuel"),
          },
          {
            text: "活動數據蒐集",
            href: "#",
            onClick: () => handleEmissionActivityEdit("Fuel"),
          },
          {
            text: "年度活動清單",
            href: "#",
            onClick: () => handleEmissionActivityReport("Fuel"),
          },
        ],
      },
      {
        id: "fuelgas",
        titleZh: "燃氣",
        titleEn: "Fuel Gas",
        icon: liquefiedGasIcon,
        links: [
          {
            text: "排放源鑑別",
            href: "#",
            onClick: () => handleEmissionSourceEdit("Gas"),
          },
          {
            text: "活動數據蒐集",
            href: "#",
            onClick: () => handleEmissionActivityEdit("Gas"),
          },
          {
            text: "年度活動清單",
            href: "#",
            onClick: () => handleEmissionActivityReport("Gas"),
          },
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
              <a
                key={index}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
              >
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
      {/* 左上角年份選擇器 */}
      <div className="year-bar">
        <div className="year-selector">
          <div
            className="year-current"
            onClick={() => setShowYearMenu(!showYearMenu)}
          >
            📅 {selectedYear}
            <span className="dropdown-arrow">▼</span>
          </div>
          {showYearMenu && (
            <div className="year-menu">
              {yearOptions.map((year) => (
                <div
                  key={year}
                  className={`year-item ${
                    selectedYear === year ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedYear(year);
                    setShowYearMenu(false);
                  }}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 公司選擇器 */}
        <div className="company-selector">
          <div
            className="company-current"
            onClick={() => setShowCompanyMenu(!showCompanyMenu)}
          >
            🏢 {company[selectedCompany]}
            <span className="dropdown-arrow">▼</span>
          </div>
          {showCompanyMenu && (
            <div className="company-menu">
              {Object.entries(company).map(([id, name]) => (
                <div
                  key={id}
                  className={`company-item ${
                    selectedCompany === parseInt(id) ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedCompany(parseInt(id));
                    setShowCompanyMenu(false);
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 右上角使用者資訊和語系選擇 */}
      <div className="top-bar">
        {/* 語系選擇 */}
        <div className="language-selector">
          <div
            className="language-current"
            onClick={() => setShowLangMenu(!showLangMenu)}
          >
            🌐 {languages[currentLanguage]}
            <span className="dropdown-arrow">▼</span>
          </div>
          {showLangMenu && (
            <div className="language-menu">
              {Object.entries(languages).map(([code, name]) => (
                <div
                  key={code}
                  className={`language-item ${
                    currentLanguage === code ? "active" : ""
                  }`}
                  onClick={() => {
                    setCurrentLanguage(code);
                    setShowLangMenu(false);
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 使用者資訊 */}
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <span className="username">{username}</span>
        </div>
      </div>

      <div className="slogan-a">ESG Portal</div>
      <p className="slogan-b">There is no planet B</p>
      {/* 主內容區域 */}
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
              id="tabfive"
              checked={activeTab === "setup"}
              onChange={() => setActiveTab("setup")}
            />
            <label htmlFor="tabfive">Setup</label>
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

      {/* 排放源鑑別模態框 */}
      {showEmissionSourceEdit && (
        <EmissionSourceEdit
          emissionName={emissionEditParams.emissionName}
          year={emissionEditParams.year}
          company={emissionEditParams.company}
          onClose={closeEmissionSourceEdit}
        />
      )}

      {/* 活動數據蒐集模態框 */}
      {showEmissionActivityEdit && (
        <EmissionActivityEdit
          emissionName={emissionEditParams.emissionName}
          year={emissionEditParams.year}
          company={emissionEditParams.company}
          onClose={closeEmissionActivityEdit}
        />
      )}

      {/* 年度活動清單模態框 */}
      {showEmissionActivityReport && (
        <EmissionActivityReport
          emissionName={emissionEditParams.emissionName}
          year={emissionEditParams.year}
          company={emissionEditParams.company}
          onClose={closeEmissionActivityReport}
        />
      )}
    </div>
  );
}

export default App;
