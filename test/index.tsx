import React from "react";
import {
  Tab
} from "@alife/next";
import "./index.scss";
import Tier1 from "./components/tier1";
import Tier2 from "./components/tier2";

import { useNavigate } from 'react-router-dom';

const tab_map = {
  1: '/governance/riskAudit/brandKeywordAudit/tier1',
  2: '/governance/riskAudit/brandKeywordAudit/tier2'
}

const BrandKeywordAudit = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(window.location.hash.includes(tab_map[2]) ? 2 : 1);
  return (
    <div
      data-spm="c-governace-brand_keyword_audit_list"
      className="aplus-auto-exp route-content keyword-audit"
    >
      <div className="seller-title">Brand Search Keyword Audit</div>
      <div className="home-box">
        <Tab
          onChange={(key) => {
            setActiveTab(key);
            navigate(tab_map[key])
          }}
          activeKey={activeTab}
        >
          <Tab.Item title="Tier 1" key="1">
            <Tier1 />
          </Tab.Item>
          <Tab.Item title="Tier 2" key="2">
            <Tier2 />
          </Tab.Item>
        </Tab>
      </div>
    </div>
  );
};

export default BrandKeywordAudit;
