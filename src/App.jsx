import { useState, useRef } from "react";

const CHECKLIST_DATA = [
  {
    id: "S1",
    section: "1. Management Commitment & Food Safety Culture",
    standards: ["FSSC 22000 V6", "BRCGS Cl.1.1"],
    color: "#1a5276",
    items: [
      { id: "1.1", text: "Senior management demonstrates commitment to food safety, quality, and the FSMS policy", standards: ["FSSC", "BRCGS"] },
      { id: "1.2", text: "Food safety and quality policy is documented, communicated and reviewed annually", standards: ["FSSC", "BRCGS", "GMP"] },
      { id: "1.3", text: "Food safety culture plan is established, implemented, and monitored with measurable objectives", standards: ["FSSC", "BRCGS"] },
      { id: "1.4", text: "Organizational chart with clear roles, responsibilities and authorities is available and current", standards: ["FSSC", "BRCGS", "GMP"] },
      { id: "1.5", text: "Management review is conducted at least annually; records are maintained", standards: ["FSSC", "BRCGS"] },
      { id: "1.6", text: "Confidential reporting system for staff to raise concerns on food safety/quality is in place", standards: ["BRCGS Cl.1.1.6"] },
      { id: "1.7", text: "Site is aware of and reviews relevant legislative, scientific and technical developments", standards: ["BRCGS", "GMP"] },
      { id: "1.8", text: "Resources (human and financial) are provided to ensure safe, legal, quality products", standards: ["FSSC", "BRCGS"] },
    ],
  },
  {
    id: "S2",
    section: "2. HACCP System",
    standards: ["BRCGS Cl.2", "FSSC ISO 22000:2018 Cl.8", "Codex"],
    color: "#117a65",
    items: [
      { id: "2.1", text: "Multi-disciplinary HACCP team is established; team leader competence is evidenced", standards: ["BRCGS 2.1.1", "FSSC"] },
      { id: "2.2", text: "Scope of each HACCP plan (products/processes covered) is clearly defined", standards: ["BRCGS 2.1.2", "FSSC"] },
      { id: "2.3", text: "Full product descriptions (composition, pH, aw, shelf life, packaging, intended use) are documented", standards: ["BRCGS 2.3", "FSSC 8.5.1"] },
      { id: "2.4", text: "Intended use and consumer groups including vulnerable populations are identified", standards: ["FSSC", "HACCP"] },
      { id: "2.5", text: "Flow diagrams are documented and verified on-site for all products/processes", standards: ["BRCGS 2.5", "FSSC 8.5.1"] },
      { id: "2.6", text: "Hazard analysis covers biological, chemical, physical and radiological hazards at each process step", standards: ["FSSC 8.5.2", "HACCP P2"] },
      { id: "2.7", text: "Control measures are selected and validated (CCPs and OPRPs identified with scientific basis)", standards: ["FSSC 8.5.4", "HACCP P3"] },
      { id: "2.8", text: "Critical limits for each CCP are established, validated and documented", standards: ["FSSC 8.5.4", "HACCP P4"] },
      { id: "2.9", text: "Monitoring systems for CCPs and OPRPs are defined (method, frequency, responsibility)", standards: ["FSSC 8.5.4", "HACCP P5"] },
      { id: "2.10", text: "Corrective actions for CCP deviations are documented and implemented", standards: ["FSSC 8.9", "HACCP P6"] },
      { id: "2.11", text: "Verification activities (including CCP records review, testing, audits) are scheduled and performed", standards: ["FSSC 8.8", "HACCP P7"] },
      { id: "2.12", text: "HACCP plan is reviewed at least annually and upon any product/process changes", standards: ["BRCGS 2.12.3", "FSSC"] },
      { id: "2.13", text: "HACCP documentation and records are maintained and sufficient for verification", standards: ["BRCGS 2.13.1", "HACCP P7"] },
    ],
  },
  {
    id: "S3",
    section: "3. Food Safety & Quality Management System",
    standards: ["BRCGS Cl.3", "FSSC ISO 22000 Cl.7"],
    color: "#7d6608",
    items: [
      { id: "3.1", text: "Food safety and quality manual is documented, implemented and accessible to relevant staff", standards: ["BRCGS 3.1"] },
      { id: "3.2", text: "Document control procedure is in place; only current version documents are in use", standards: ["BRCGS 3.2", "FSSC 7.5"] },
      { id: "3.3", text: "Record retention periods are defined; records are legible, accessible and protected from damage", standards: ["BRCGS 3.3", "FSSC 7.5"] },
      { id: "3.4", text: "Internal audit programme is scheduled and covers all areas; corrective actions are tracked", standards: ["BRCGS 3.4", "FSSC 9.2"] },
      { id: "3.5", text: "Supplier approval and performance monitoring procedure is established and implemented", standards: ["BRCGS 3.5", "FSSC 7.1.6"] },
      { id: "3.6", text: "Specifications for raw materials, packaging, and finished products are maintained and current", standards: ["BRCGS 3.6", "GMP"] },
      { id: "3.7", text: "Corrective action and non-conformance procedure addresses root cause and prevention of recurrence", standards: ["BRCGS 3.7", "FSSC 10.1"] },
      { id: "3.8", text: "Complaint management system is in place; trends are analyzed and reported to management", standards: ["BRCGS 3.9", "FSSC"] },
    ],
  },
  {
    id: "S4",
    section: "4. Site Standards & GMP – Premises & Environment",
    standards: ["BRCGS Cl.4", "GMP", "ISO/TS 22002-1"],
    color: "#6e2f8f",
    items: [
      { id: "4.1", text: "Site security and perimeter controls are in place; unauthorized access is prevented", standards: ["BRCGS 4.2", "GMP"] },
      { id: "4.2", text: "Production risk zoning (ambient, high-care, high-risk) is defined and maintained", standards: ["BRCGS 4.3", "FSSC"] },
      { id: "4.3", text: "Building fabric (walls, floors, ceilings, drainage) is in good condition and easily cleanable", standards: ["BRCGS 4.4", "GMP", "ISO/TS 22002-1"] },
      { id: "4.4", text: "Lighting is adequate in all work, inspection and storage areas", standards: ["GMP", "BRCGS 4.4"] },
      { id: "4.5", text: "Ventilation and temperature/humidity control are adequate and monitored", standards: ["BRCGS 4.5", "GMP"] },
      { id: "4.6", text: "Planned preventive maintenance programme covers all food safety related equipment and structures", standards: ["BRCGS 4.6", "GMP"] },
      { id: "4.7", text: "Calibration programme is in place for all monitoring and measuring equipment", standards: ["BRCGS 4.7", "FSSC 8.7"] },
      { id: "4.8", text: "Raw material, in-process, finished goods, packaging and chemical storage areas are appropriate and segregated", standards: ["GMP", "BRCGS 4.15"] },
    ],
  },
  {
    id: "S5",
    section: "5. Cleaning & Sanitation",
    standards: ["BRCGS Cl.4.11", "GMP", "ISO/TS 22002-1 Cl.11"],
    color: "#1a5276",
    items: [
      { id: "5.1", text: "Cleaning and disinfection schedules (SOPs) are documented for all areas and equipment", standards: ["BRCGS 4.11", "GMP"] },
      { id: "5.2", text: "Cleaning chemicals are approved, correctly labelled and stored separately from food areas", standards: ["BRCGS 4.11", "GMP"] },
      { id: "5.3", text: "Cleaning effectiveness is verified through inspection, swabbing and/or ATP monitoring", standards: ["BRCGS 4.11", "FSSC"] },
      { id: "5.4", text: "Environmental monitoring programme (microbiological) is in place and results are reviewed", standards: ["FSSC 2.5.12", "BRCGS"] },
      { id: "5.5", text: "Cleaning equipment is dedicated by zone, colour-coded and maintained in good condition", standards: ["GMP", "BRCGS"] },
    ],
  },
  {
    id: "S6",
    section: "6. Pest Control",
    standards: ["BRCGS Cl.4.14", "GMP", "ISO/TS 22002-1 Cl.12"],
    color: "#117a65",
    items: [
      { id: "6.1", text: "Pest control programme is documented and carried out by a competent contractor or trained staff", standards: ["BRCGS 4.14", "GMP"] },
      { id: "6.2", text: "Pest control maps showing bait station locations are current and accurate", standards: ["BRCGS 4.14"] },
      { id: "6.3", text: "Pest activity trends are analyzed; corrective actions are timely and documented", standards: ["BRCGS 4.14", "GMP"] },
      { id: "6.4", text: "Proofing of all entry points is maintained to prevent pest ingress", standards: ["GMP", "BRCGS 4.14"] },
    ],
  },
  {
    id: "S7",
    section: "7. Personnel – Hygiene, Training & Welfare",
    standards: ["BRCGS Cl.7", "GMP", "ISO/TS 22002-1 Cl.13"],
    color: "#7d6608",
    items: [
      { id: "7.1", text: "Personal hygiene rules (hand washing, jewelry, nail polish, eating/drinking) are documented, posted and enforced", standards: ["BRCGS 7.2", "GMP"] },
      { id: "7.2", text: "Medical screening and illness/injury reporting procedures are in place for food handlers", standards: ["BRCGS 7.3", "GMP"] },
      { id: "7.3", text: "PPE/workwear policy is defined; workwear is managed to prevent contamination", standards: ["BRCGS 7.4", "GMP"] },
      { id: "7.4", text: "Training needs analysis is performed; induction and ongoing training records are maintained", standards: ["BRCGS 7.1", "FSSC 7.2"] },
      { id: "7.5", text: "Competence of personnel performing food safety critical activities is assessed and documented", standards: ["FSSC 7.2", "BRCGS 7.1"] },
      { id: "7.6", text: "Adequate welfare facilities (toilets, changing rooms, canteen) are provided and maintained", standards: ["GMP", "BRCGS 7.5"] },
      { id: "7.7", text: "Visitor and contractor hygiene rules are communicated and enforced", standards: ["GMP", "BRCGS 7.4"] },
    ],
  },
  {
    id: "S8",
    section: "8. Allergen Management",
    standards: ["BRCGS Cl.5.3", "FSSC 2.5.8"],
    color: "#922b21",
    items: [
      { id: "8.1", text: "Allergen risk assessment is performed covering all raw materials, processing aids and packaging", standards: ["BRCGS 5.3", "FSSC 2.5.8"] },
      { id: "8.2", text: "Allergen segregation, dedicated equipment or validated cleaning changeover procedures are in place", standards: ["BRCGS 5.3", "FSSC"] },
      { id: "8.3", text: "Product labels accurately declare all allergens as required by legislation", standards: ["BRCGS 5.2", "GMP"] },
      { id: "8.4", text: "Allergen testing is carried out to validate cleaning effectiveness where applicable", standards: ["BRCGS 5.3", "FSSC"] },
    ],
  },
  {
    id: "S9",
    section: "9. Traceability & Product Control",
    standards: ["BRCGS Cl.3.9", "FSSC 8.3", "GMP"],
    color: "#1a5276",
    items: [
      { id: "9.1", text: "Traceability system enables identification of raw materials to finished product and vice versa (lot/batch)", standards: ["BRCGS 3.9", "FSSC 8.3"] },
      { id: "9.2", text: "Traceability exercise is conducted at least annually and completed within 4 hours", standards: ["BRCGS 3.9"] },
      { id: "9.3", text: "Product release procedure is defined; product is only released after all checks are satisfied", standards: ["GMP", "BRCGS 5.6"] },
      { id: "9.4", text: "Non-conforming product is identified, segregated, assessed and dispositioned with records", standards: ["FSSC 8.9", "BRCGS 3.7"] },
      { id: "9.5", text: "Product recall/withdrawal procedure is documented, tested and contacts are current", standards: ["BRCGS 3.11", "FSSC 8.9.5"] },
    ],
  },
  {
    id: "S10",
    section: "10. Food Defense, Food Fraud & Authenticity",
    standards: ["FSSC 2.5.3 / 2.5.4", "BRCGS Cl.5.4 / 5.5"],
    color: "#6e2f8f",
    items: [
      { id: "10.1", text: "Food defense threat assessment is conducted and documented; mitigation measures are in place", standards: ["FSSC 2.5.3", "BRCGS 5.4"] },
      { id: "10.2", text: "Food fraud vulnerability assessment covers all raw materials; mitigation plan is implemented", standards: ["FSSC 2.5.4", "BRCGS 5.5"] },
      { id: "10.3", text: "Authenticity of key raw materials is verified (certificates, testing, supplier audits)", standards: ["BRCGS 5.5", "FSSC"] },
    ],
  },
  {
    id: "S11",
    section: "11. Environmental Sustainability & Additional FSSC Requirements",
    standards: ["FSSC 22000 V6 Additional Requirements"],
    color: "#117a65",
    items: [
      { id: "11.1", text: "Environmental/sustainability policy and objectives are established and monitored (FSSC V6 new)", standards: ["FSSC 2.5.15"] },
      { id: "11.2", text: "Food safety culture objectives are set, communicated and progress reviewed with management", standards: ["FSSC 2.5.1"] },
      { id: "11.3", text: "PRP verification (monthly site inspections/checks) is performed and records maintained", standards: ["FSSC 2.5.12"] },
      { id: "11.4", text: "Product design and development procedure is established including hazard reassessment for new products", standards: ["FSSC 2.5.13", "BRCGS 5.1"] },
    ],
  },
];

const STANDARD_COLORS = {
  FSSC: "#1a6b3c",
  BRCGS: "#1a3a6b",
  GMP: "#6b4e1a",
  HACCP: "#6b1a1a",
};

function Badge({ label }) {
  const key = Object.keys(STANDARD_COLORS).find(k => label.startsWith(k));
  const bg = key ? STANDARD_COLORS[key] : "#444";
  return (
    <span style={{
      background: bg,
      color: "#fff",
      fontSize: "0.62rem",
      fontFamily: "'DM Mono', monospace",
      fontWeight: 600,
      padding: "2px 6px",
      borderRadius: "3px",
      letterSpacing: "0.03em",
      whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

const STATUS_OPTIONS = ["✓ Compliant", "✗ Non-Conformance", "~ Partial", "N/A"];
const STATUS_COLORS = {
  "✓ Compliant": "#1e8449",
  "✗ Non-Conformance": "#c0392b",
  "~ Partial": "#d4ac0d",
  "N/A": "#888",
};

export default function AuditChecklist() {
  const [statuses, setStatuses] = useState({});
  const [notes, setNotes] = useState({});
  const [collapsed, setCollapsed] = useState({});
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showExport, setShowExport] = useState(false);
  const [exportText, setExportText] = useState("");
  const [auditInfo, setAuditInfo] = useState({
    facility: "Silk Food Ceylon (Pvt) Ltd",
    auditor: "",
    date: new Date().toISOString().slice(0, 10),
    ref: "IA-" + new Date().getFullYear() + "-001",
  });

  const totalItems = CHECKLIST_DATA.flatMap(s => s.items).length;
  const answered = Object.keys(statuses).length;
  const compliant = Object.values(statuses).filter(v => v === "✓ Compliant").length;
  const nc = Object.values(statuses).filter(v => v === "✗ Non-Conformance").length;
  const partial = Object.values(statuses).filter(v => v === "~ Partial").length;

  const pct = Math.round((compliant / totalItems) * 100);

  const setStatus = (id, val) => setStatuses(p => ({ ...p, [id]: val }));
  const setNote = (id, val) => setNotes(p => ({ ...p, [id]: val }));
  const toggleSection = (id) => setCollapsed(p => ({ ...p, [id]: !p[id] }));

  const filteredData = CHECKLIST_DATA.map(section => ({
    ...section,
    items: section.items.filter(item => {
      const matchSearch = search === "" || item.text.toLowerCase().includes(search.toLowerCase());
      if (!matchSearch) return false;
      if (filter === "All") return true;
      if (filter === "Pending") return !statuses[item.id];
      if (filter === "NC") return statuses[item.id] === "✗ Non-Conformance";
      if (filter === "Partial") return statuses[item.id] === "~ Partial";
      return true;
    }),
  })).filter(s => s.items.length > 0);

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#f4f6f8",
      minHeight: "100vh",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0d2137 0%, #1a3a6b 60%, #1a6b3c 100%)",
        padding: "28px 32px 20px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
              {["FSSC 22000 V6", "BRCGS Issue 9", "GMP", "HACCP"].map(s => (
                <span key={s} style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontSize: "0.7rem",
                  fontFamily: "'DM Mono', monospace",
                  padding: "2px 10px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.25)",
                  letterSpacing: "0.05em",
                }}>{s}</span>
              ))}
            </div>
            <h1 style={{ color: "#fff", margin: 0, fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Integrated Internal Audit Checklist
            </h1>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem", marginTop: 2 }}>
              FSSC 22000 V6 · BRCGS Issue 9 · GMP · HACCP — Combined Food Safety System
            </div>
          </div>
          {/* Score */}
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#fff", fontSize: "2.2rem", fontWeight: 800, lineHeight: 1 }}>{pct}%</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.7rem" }}>Compliance Score</div>
            <div style={{ display: "flex", gap: 12, marginTop: 6, justifyContent: "flex-end", flexWrap: "wrap" }}>
              <span style={{ color: "#2ecc71", fontSize: "0.75rem", fontWeight: 600 }}>✓ {compliant}</span>
              <span style={{ color: "#e74c3c", fontSize: "0.75rem", fontWeight: 600 }}>✗ {nc}</span>
              <span style={{ color: "#f1c40f", fontSize: "0.75rem", fontWeight: 600 }}>~ {partial}</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>{totalItems - answered} pending</span>
            </div>
          </div>
        </div>

        {/* Audit Info Row */}
        <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
          {[
            { label: "Facility", key: "facility" },
            { label: "Auditor", key: "auditor" },
            { label: "Date", key: "date", type: "date" },
            { label: "Ref No.", key: "ref" },
          ].map(f => (
            <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <label style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.62rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em" }}>{f.label.toUpperCase()}</label>
              <input
                type={f.type || "text"}
                value={auditInfo[f.key]}
                onChange={e => setAuditInfo(p => ({ ...p, [f.key]: e.target.value }))}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "0.78rem",
                  padding: "4px 10px",
                  outline: "none",
                  minWidth: 140,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 14, background: "rgba(255,255,255,0.12)", borderRadius: 8, height: 6, overflow: "hidden" }}>
          <div style={{ width: `${(answered / totalItems) * 100}%`, background: "linear-gradient(90deg, #27ae60, #2ecc71)", height: "100%", borderRadius: 8, transition: "width 0.4s ease" }} />
        </div>
        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.65rem", marginTop: 3 }}>{answered}/{totalItems} items assessed</div>
      </div>

      {/* Filters */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e0e0e0", padding: "10px 24px", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <input
          placeholder="🔍 Search checklist items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ border: "1px solid #d0d0d0", borderRadius: 6, padding: "5px 12px", fontSize: "0.8rem", outline: "none", minWidth: 220, fontFamily: "inherit" }}
        />
        <div style={{ display: "flex", gap: 6 }}>
          {["All", "Pending", "NC", "Partial"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? "#1a3a6b" : "#f0f0f0",
              color: filter === f ? "#fff" : "#555",
              border: "none",
              borderRadius: 6,
              padding: "5px 14px",
              fontSize: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}>{f}</button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", fontSize: "0.72rem", color: "#888" }}>
          {filteredData.reduce((a, s) => a + s.items.length, 0)} items shown
        </div>
      </div>

      {/* Legend */}
      <div style={{ padding: "8px 24px", display: "flex", gap: 16, background: "#fafafa", borderBottom: "1px solid #eee", flexWrap: "wrap" }}>
        {Object.entries(STANDARD_COLORS).map(([k, c]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: c, display: "inline-block" }} />
            <span style={{ fontSize: "0.7rem", color: "#555", fontFamily: "'DM Mono', monospace" }}>{k}</span>
          </div>
        ))}
        <div style={{ marginLeft: 16, display: "flex", gap: 12 }}>
          {STATUS_OPTIONS.map(s => (
            <span key={s} style={{ fontSize: "0.7rem", color: STATUS_COLORS[s], fontWeight: 600 }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div style={{ padding: "16px 16px 40px", maxWidth: 1100, margin: "0 auto" }}>
        {filteredData.map(section => {
          const sCompliant = section.items.filter(i => statuses[i.id] === "✓ Compliant").length;
          const isOpen = !collapsed[section.id];
          return (
            <div key={section.id} style={{ marginBottom: 14, borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #e8e8e8" }}>
              {/* Section Header */}
              <div
                onClick={() => toggleSection(section.id)}
                style={{
                  background: section.color,
                  padding: "12px 18px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.92rem" }}>{section.section}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                    {section.standards.map(s => (
                      <span key={s} style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.65rem", fontFamily: "'DM Mono', monospace" }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 700 }}>{sCompliant}/{section.items.length}</div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.65rem" }}>compliant</div>
                  </div>
                  <span style={{ color: "#fff", fontSize: "1.1rem" }}>{isOpen ? "▲" : "▼"}</span>
                </div>
              </div>

              {/* Items */}
              {isOpen && (
                <div style={{ background: "#fff" }}>
                  {section.items.map((item, idx) => {
                    const status = statuses[item.id];
                    const note = notes[item.id] || "";
                    const rowBg = idx % 2 === 0 ? "#fff" : "#f9fafc";
                    return (
                      <div key={item.id} style={{
                        background: status === "✗ Non-Conformance" ? "#fff5f5" : status === "~ Partial" ? "#fffcf0" : status === "✓ Compliant" ? "#f5fff8" : rowBg,
                        borderBottom: "1px solid #eef0f3",
                        padding: "10px 18px",
                        transition: "background 0.2s",
                      }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
                          {/* Item ID */}
                          <span style={{
                            minWidth: 36,
                            color: section.color,
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            paddingTop: 2,
                          }}>{item.id}</span>

                          {/* Text */}
                          <div style={{ flex: 1, minWidth: 220 }}>
                            <div style={{ fontSize: "0.83rem", color: "#1a1a2e", lineHeight: 1.5 }}>{item.text}</div>
                            <div style={{ display: "flex", gap: 4, marginTop: 5, flexWrap: "wrap" }}>
                              {item.standards.map(s => <Badge key={s} label={s} />)}
                            </div>
                          </div>

                          {/* Status select */}
                          <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 170 }}>
                            <select
                              value={status || ""}
                              onChange={e => setStatus(item.id, e.target.value)}
                              style={{
                                border: `2px solid ${status ? STATUS_COLORS[status] : "#d0d0d0"}`,
                                borderRadius: 6,
                                padding: "4px 8px",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: status ? STATUS_COLORS[status] : "#888",
                                background: "#fff",
                                cursor: "pointer",
                                outline: "none",
                                fontFamily: "inherit",
                              }}
                            >
                              <option value="">— Select Status —</option>
                              {STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                            <input
                              placeholder="Notes / Evidence ref..."
                              value={note}
                              onChange={e => setNote(item.id, e.target.value)}
                              style={{
                                border: "1px solid #e0e0e0",
                                borderRadius: 6,
                                padding: "3px 8px",
                                fontSize: "0.72rem",
                                color: "#555",
                                outline: "none",
                                fontFamily: "inherit",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* NC Summary */}
        {nc > 0 && (
          <div style={{ background: "#fff5f5", border: "2px solid #e74c3c", borderRadius: 12, padding: "18px 22px", marginTop: 20 }}>
            <div style={{ color: "#c0392b", fontWeight: 700, fontSize: "0.9rem", marginBottom: 10 }}>
              ✗ Non-Conformances Raised ({nc})
            </div>
            {CHECKLIST_DATA.flatMap(s => s.items).filter(i => statuses[i.id] === "✗ Non-Conformance").map(item => (
              <div key={item.id} style={{ marginBottom: 6, display: "flex", gap: 10, fontSize: "0.8rem" }}>
                <span style={{ color: "#e74c3c", fontFamily: "'DM Mono', monospace", fontWeight: 700, minWidth: 36 }}>{item.id}</span>
                <span style={{ color: "#333" }}>{item.text}</span>
                {notes[item.id] && <span style={{ color: "#888", fontStyle: "italic" }}>— {notes[item.id]}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Export Panel */}
        {showExport && (
          <div style={{ marginTop: 16, background: "#fff", borderRadius: 12, border: "2px solid #1a3a6b", padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontWeight: 700, color: "#1a3a6b", fontSize: "0.85rem" }}>
                📋 Audit Report — Select All &amp; Copy, then paste into Word / Notepad / Excel
              </div>
              <button onClick={() => setShowExport(false)} style={{ background: "none", border: "none", fontSize: "1.1rem", cursor: "pointer", color: "#888" }}>✕</button>
            </div>
            <textarea
              readOnly
              value={exportText}
              onClick={e => e.target.select()}
              style={{
                width: "100%",
                height: 320,
                fontFamily: "'Courier New', monospace",
                fontSize: "0.72rem",
                border: "1px solid #ddd",
                borderRadius: 6,
                padding: "10px",
                resize: "vertical",
                color: "#222",
                background: "#fafafa",
                boxSizing: "border-box",
              }}
            />
            <div style={{ fontSize: "0.7rem", color: "#888", marginTop: 6 }}>
              💡 Click inside the box → Ctrl+A to select all → Ctrl+C to copy → Paste into Word or Notepad → File → Save / Print
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 24, background: "#fff", borderRadius: 12, padding: "16px 22px", border: "1px solid #e8e8e8", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: "0.75rem", color: "#888" }}>
            Integrated Internal Audit Checklist | FSSC 22000 V6 · BRCGS Issue 9 · GMP · HACCP<br />
            Ref: {auditInfo.ref} | {auditInfo.facility} | {auditInfo.date} | Auditor: {auditInfo.auditor || "—"}
          </div>
          <button
            onClick={() => {
              const allItems = CHECKLIST_DATA.flatMap(s => s.items.map(i => ({ ...i, sectionTitle: s.section })));
              const ncItems = allItems.filter(i => statuses[i.id] === "✗ Non-Conformance");
              const partialItems = allItems.filter(i => statuses[i.id] === "~ Partial");
              const sym = (id) => {
                const s = statuses[id];
                if (!s) return "[ ]";
                return { "✓ Compliant": "[C] ", "✗ Non-Conformance": "[NC]", "~ Partial": "[P] ", "N/A": "[NA]" }[s] || "[ ]";
              };
              const lines = [];
              lines.push("=".repeat(70));
              lines.push("  INTEGRATED INTERNAL AUDIT REPORT");
              lines.push("  FSSC 22000 V6 | BRCGS Issue 9 | GMP | HACCP");
              lines.push("=".repeat(70));
              lines.push(`  Facility : ${auditInfo.facility}`);
              lines.push(`  Auditor  : ${auditInfo.auditor || "—"}`);
              lines.push(`  Date     : ${auditInfo.date}`);
              lines.push(`  Ref No.  : ${auditInfo.ref}`);
              lines.push(`  Generated: ${new Date().toLocaleString()}`);
              lines.push("-".repeat(70));
              lines.push(`  SUMMARY  Compliant: ${compliant}  |  NC: ${nc}  |  Partial: ${partial}  |  Not Assessed: ${totalItems - answered}  |  Score: ${pct}%`);
              lines.push("=".repeat(70));
              lines.push("");
              CHECKLIST_DATA.forEach(section => {
                lines.push(">>> " + section.section.toUpperCase());
                lines.push("    Standards: " + section.standards.join(" | "));
                lines.push("-".repeat(70));
                section.items.forEach(item => {
                  const note = notes[item.id] ? `\n    Note: ${notes[item.id]}` : "";
                  lines.push(`${sym(item.id)} ${item.id.padEnd(5)} ${item.text}${note}`);
                });
                lines.push("");
              });
              if (ncItems.length > 0) {
                lines.push("=".repeat(70));
                lines.push("  NON-CONFORMANCES RAISED (" + ncItems.length + ")");
                lines.push("=".repeat(70));
                ncItems.forEach(item => {
                  lines.push(`[NC] ${item.id.padEnd(5)} ${item.text}`);
                  if (notes[item.id]) lines.push(`     Note: ${notes[item.id]}`);
                });
                lines.push("");
              }
              if (partialItems.length > 0) {
                lines.push("=".repeat(70));
                lines.push("  PARTIAL COMPLIANCE ITEMS (" + partialItems.length + ")");
                lines.push("=".repeat(70));
                partialItems.forEach(item => {
                  lines.push(`[P]  ${item.id.padEnd(5)} ${item.text}`);
                  if (notes[item.id]) lines.push(`     Note: ${notes[item.id]}`);
                });
                lines.push("");
              }
              lines.push("=".repeat(70));
              lines.push("  Legend: [C]=Compliant  [NC]=Non-Conformance  [P]=Partial  [NA]=Not Applicable  [ ]=Not Assessed");
              lines.push("=".repeat(70));
              const text = lines.join("\n");
              setExportText(text);
              setShowExport(true);
              // Also try clipboard
              if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).catch(() => {});
              }
              // Scroll to export panel
              setTimeout(() => {
                document.getElementById("export-panel")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            style={{
              background: "#1a3a6b",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 20px",
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >📋 Export Report</button>
        </div>
      </div>
    </div>
  );
}
