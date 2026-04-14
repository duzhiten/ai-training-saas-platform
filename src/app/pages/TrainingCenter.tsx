import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Star,
  Clock,
  Play,
  CheckCircle2,
  Lock,
  Mic,
  MessageSquare,
  Phone,
  Target,
  Zap,
  BookOpen,
  AlertCircle,
  Shield,
  TrendingUp,
  Heart,
  Package,
  Users,
} from "lucide-react";

const chapters = [
  { id: "intro",      name: "新手入门", count: 8 },
  { id: "icebreak",   name: "客户破冰", count: 10 },
  { id: "discover",   name: "需求挖掘", count: 12 },
  { id: "objection",  name: "异议处理", count: 10 },
  { id: "close",      name: "成交推进", count: 10 },
  { id: "compliance", name: "合规服务", count: 8 },
];

const allLevels: Record<string, Array<{
  id: number;
  title: string;
  difficulty: number;
  duration: string;
  focus: string[];
  status: "passed" | "failed" | "unlocked" | "locked";
  score?: number;
  mode: string[];
  type: string;
}>> = {
  intro: [
    { id: 1, title: "基础问候与自我介绍", difficulty: 1, duration: "8 min", focus: ["沟通表达"], status: "passed", score: 95, mode: ["文字", "语音"], type: "基础" },
    { id: 2, title: "客户信息核实话术", difficulty: 1, duration: "10 min", focus: ["合规意识"], status: "passed", score: 88, mode: ["文字"], type: "合规" },
    { id: 3, title: "柜台业务引导开场", difficulty: 2, duration: "12 min", focus: ["沟通表达", "情绪管理"], status: "passed", score: 82, mode: ["文字", "语音"], type: "服务" },
    { id: 4, title: "客户等待安抚处理", difficulty: 2, duration: "10 min", focus: ["情绪管理"], status: "passed", score: 90, mode: ["文字", "语音", "热线"], type: "服务" },
    { id: 5, title: "产品简介话术入门", difficulty: 1, duration: "8 min", focus: ["产品知识"], status: "passed", score: 76, mode: ["文字"], type: "产品" },
    { id: 6, title: "VIP 客户专属问候", difficulty: 2, duration: "12 min", focus: ["沟通表达", "情绪管理"], status: "passed", score: 85, mode: ["语音", "热线"], type: "服务" },
    { id: 7, title: "服务结束礼貌送别", difficulty: 1, duration: "6 min", focus: ["沟通表达"], status: "passed", score: 92, mode: ["文字"], type: "基础" },
    { id: 8, title: "投诉接待初级处理", difficulty: 3, duration: "15 min", focus: ["情绪管理", "合规意识"], status: "passed", score: 68, mode: ["文字", "语音"], type: "合规" },
  ],
  discover: [
    { id: 101, title: "SPIN 提问法实战应用", difficulty: 2, duration: "12 min", focus: ["需求挖掘"], status: "passed", score: 85, mode: ["文字", "语音"], type: "销售" },
    { id: 102, title: "存款客户深度需求挖掘", difficulty: 2, duration: "15 min", focus: ["需求挖掘", "产品知识"], status: "passed", score: 72, mode: ["语音"], type: "产品" },
    { id: 103, title: "理财客户风险偏好识别", difficulty: 3, duration: "18 min", focus: ["需求挖掘", "合规意识"], status: "failed", score: 58, mode: ["文字", "语音"], type: "合规" },
    { id: 104, title: "高净值客户财富目标探索", difficulty: 4, duration: "20 min", focus: ["需求挖掘", "情绪管理"], status: "locked", mode: ["语音", "热线"], type: "销售" },
  ],
  objection: [
    { id: 201, title: "利率异议处理话术", difficulty: 3, duration: "15 min", focus: ["产品知识", "沟通表达"], status: "passed", score: 91, mode: ["文字", "语音"], type: "产品" },
    { id: 202, title: "风险顾虑化解技巧", difficulty: 3, duration: "18 min", focus: ["情绪管理", "产品知识"], status: "passed", score: 65, mode: ["语音"], type: "销售" },
    { id: 203, title: "价格敏感客户应对", difficulty: 4, duration: "20 min", focus: ["成交技巧", "沟通表达"], status: "failed", score: 55, mode: ["文字", "语音", "热线"], type: "销售" },
    { id: 204, title: "犹豫型客户推进策略", difficulty: 4, duration: "22 min", focus: ["成交技巧", "情绪管理"], status: "locked", mode: ["语音"], type: "销售" },
  ],
  close: [
    { id: 301, title: "开口成交时机把握", difficulty: 3, duration: "15 min", focus: ["成交技巧"], status: "passed", score: 83, mode: ["文字", "语音"], type: "销售" },
    { id: 302, title: "促单话术实战演练", difficulty: 4, duration: "20 min", focus: ["成交技巧", "沟通表达"], status: "failed", score: 52, mode: ["语音", "热线"], type: "销售" },
  ],
  icebreak: [
    { id: 401, title: "初次见面破冰开场", difficulty: 1, duration: "8 min", focus: ["沟通表达"], status: "passed", score: 96, mode: ["文字", "语音"], type: "服务" },
    { id: 402, title: "老客户关系维护话术", difficulty: 2, duration: "10 min", focus: ["情绪管理"], status: "passed", score: 78, mode: ["文字"], type: "服务" },
    { id: 403, title: "转介绍场景破冰技巧", difficulty: 2, duration: "12 min", focus: ["沟通表达", "成交技巧"], status: "passed", score: 61, mode: ["语音"], type: "销售" },
  ],
  compliance: [
    { id: 501, title: "合规免责话术标准", difficulty: 2, duration: "10 min", focus: ["合规意识"], status: "passed", score: 87, mode: ["文字"], type: "合规" },
    { id: 502, title: "风险揭示话术演练", difficulty: 2, duration: "12 min", focus: ["合规意识", "产品知识"], status: "failed", score: 48, mode: ["文字", "语音"], type: "合规" },
  ],
};

const modeIcons: Record<string, React.ReactNode> = {
  "文字": <MessageSquare size={10} />,
  "语音": <Mic size={10} />,
  "热线": <Phone size={10} />,
};

const difficultyColors = ["", "#22C55E", "#3B82F6", "#F59E0B", "#EF4444"];
const difficultyLabels = ["", "入门", "进阶", "挑战", "专家"];
const starColor = "#FACC15"; // 统一黄色星星

// Icon per type category
const typeIcons: Record<string, React.ReactNode> = {
  "基础": <BookOpen size={18} />,
  "合规": <Shield size={18} />,
  "产品": <Package size={18} />,
  "销售": <TrendingUp size={18} />,
  "服务": <Heart size={18} />,
};
const typeColors: Record<string, { color: string; bg: string }> = {
  "基础": { color: "#2563EB", bg: "#EFF4FF" },
  "合规": { color: "#059669", bg: "#ECFDF5" },
  "产品": { color: "#7C3AED", bg: "#F5F3FF" },
  "销售": { color: "#D97706", bg: "#FFFBEB" },
  "服务": { color: "#DB2777", bg: "#FDF2F8" },
};

function LevelCard({ level, onClick }: { level: any; onClick: () => void }) {
  const isLocked  = level.status === "locked";
  const isPassed  = level.status === "passed";
  const isFailed  = level.status === "failed";
  const typeStyle = typeColors[level.type] || { color: "#2563EB", bg: "#EFF4FF" };
  const icon      = typeIcons[level.type] || <Target size={18} />;

  return (
    <div
      className="p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
      style={{
        background: isLocked ? "#FAFAFA" : "#fff",
        border: `1px solid ${isLocked ? "#F1F5F9" : "#EEF2FF"}`,
        boxShadow: "0 1px 4px rgba(37,99,235,0.04)",
        opacity: isLocked ? 0.65 : 1,
      }}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {/* Type icon */}
        <div
          className="rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            width: 44, height: 44,
            background: isLocked ? "#F1F5F9" : typeStyle.bg,
          }}
        >
          <span style={{ color: isLocked ? "#CBD5E1" : typeStyle.color }}>{icon}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h4 style={{ fontSize: 13, fontWeight: 600, color: isLocked ? "#94A3B8" : "#0F172A", lineHeight: 1.4 }}>
              {level.title}
            </h4>
            {level.score !== undefined && (
              <span
                style={{
                  fontSize: 13, fontWeight: 700, flexShrink: 0,
                  color: level.score >= 80 ? "#22C55E" : level.score >= 60 ? "#F59E0B" : "#EF4444",
                }}
              >
                {level.score}
              </span>
            )}
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4].map((s) => (
                <Star
                  key={s}
                  size={10}
                  fill={s <= level.difficulty ? starColor : "transparent"}
                  color={s <= level.difficulty ? starColor : "#E2E8F0"}
                />
              ))}
              <span style={{ fontSize: 10, marginLeft: 2, color: difficultyColors[level.difficulty], fontWeight: 600 }}>
                {difficultyLabels[level.difficulty]}
              </span>
            </div>
            <span style={{ fontSize: 11, color: "#CBD5E1" }}>·</span>
            <span style={{ fontSize: 11, color: "#94A3B8", display: "flex", alignItems: "center", gap: 3 }}>
              <Clock size={10} /> {level.duration}
            </span>
            <span
              className="px-1.5 py-0.5 rounded"
              style={{ fontSize: 10, background: "#F1F5F9", color: "#0F172A", fontWeight: 500 }}
            >
              {level.type}
            </span>
            {/* Status badge */}
            {isPassed && (
              <span style={{ fontSize: 10, fontWeight: 600, background: "#F1F5F9", color: "#0F172A", padding: "1px 6px", borderRadius: 10 }}>
                已通关
              </span>
            )}
            {isFailed && (
              <span style={{ fontSize: 10, fontWeight: 600, background: "#F1F5F9", color: "#64748B", padding: "1px 6px", borderRadius: 10 }}>
                未通过
              </span>
            )}
          </div>

          {/* Focus tags + modes */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1 flex-wrap">
              {level.focus.map((f: string) => (
                <span key={f} style={{ fontSize: 10, padding: "1px 7px", borderRadius: 20, background: "#F1F5F9", color: "#0F172A" }}>
                  {f}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {level.mode.map((m: string) => (
                <span key={m} style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 10, padding: "1px 6px", borderRadius: 6, background: "#F8FAFF", color: "#64748B" }}>
                  {modeIcons[m]} {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action button */}
      {!isLocked && (
        <button
          className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90"
          style={{
            background: isPassed
              ? "#F1F5F9"
              : "linear-gradient(135deg, #1d4ed8, #3B82F6)",
            color: isPassed ? "#0F172A" : "#fff",
          }}
        >
          <Play size={13} fill={isPassed ? "#0F172A" : "#fff"} color={isPassed ? "#0F172A" : "#fff"} />
          {isPassed ? "再次挑战" : isFailed ? "重新挑战" : "开始训练"}
        </button>
      )}
    </div>
  );
}

export function TrainingCenter() {
  const navigate = useNavigate();
  const [activeChapter, setActiveChapter] = useState("intro");
  const [searchQuery,   setSearchQuery]   = useState("");
  const [typeFilter,    setTypeFilter]    = useState<string | null>(null);

  const allTypes = ["全部", "基础", "合规", "产品", "销售", "服务"];

  const currentLevels = allLevels[activeChapter] || allLevels["intro"];
  const filteredLevels = currentLevels.filter((l) => {
    if (searchQuery && !l.title.includes(searchQuery)) return false;
    if (typeFilter && l.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="mb-5">
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>训练中心</h1>
        <p style={{ fontSize: 13, color: "#94A3B8" }}>AI 模拟真实客户对话，系统性提升业务能力</p>
      </div>

      {/* Special entries — colored cards based on status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {[
          { icon: <AlertCircle size={20} />, title: "错题强化练习", count: 12, status: "warning", color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A", iconBg: "#FEF3C7" },
          { icon: <Mic size={20} />, title: "专家录音复训", count: 8, status: "info", color: "#2563EB", bg: "#EFF4FF", border: "#C7D2FE", iconBg: "#DBEAFE" },
          { icon: <Zap size={20} />, title: "弱项专项强化", count: 5, status: "danger", color: "#DC2626", bg: "#FEF2F2", border: "#FECACA", iconBg: "#FEE2E2" },
        ].map((item, i) => (
          <button
            key={i}
            className="flex items-center justify-between p-5 rounded-2xl text-left transition-all hover:shadow-md hover:-translate-y-0.5"
            style={{ background: item.bg, border: `1px solid ${item.border}`, boxShadow: "0 1px 4px rgba(37,99,235,0.04)", minHeight: 90 }}
          >
            <div className="flex items-center gap-3">
              <div
                className="rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ width: 48, height: 48, background: item.iconBg }}
              >
                <span style={{ color: item.color }}>{item.icon}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{item.title}</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: item.color, letterSpacing: "-0.03em", lineHeight: 1 }}>{item.count}</div>
          </button>
        ))}
      </div>

      {/* Chapter navigation */}
      <div
        className="rounded-2xl p-4 mb-4"
        style={{ background: "#fff", border: "1px solid rgba(37,99,235,0.08)", boxShadow: "0 2px 12px rgba(37,99,235,0.06)" }}
      >
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {chapters.map((ch) => {
            const levels = allLevels[ch.id] || [];
            const passed = levels.filter((l) => l.status === "passed").length;
            const active = activeChapter === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(ch.id)}
                className="flex-shrink-0 flex flex-col items-center gap-1 px-5 py-3 rounded-xl transition-all"
                style={{
                  background: active ? "linear-gradient(135deg, #1d4ed8, #3B82F6)" : "#F8FAFF",
                  border: `1px solid ${active ? "transparent" : "#E8F0FF"}`,
                  minWidth: 90,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 500, color: active ? "#fff" : "#0F172A" }}>{ch.name}</span>
                <span style={{ fontSize: 11, color: active ? "rgba(255,255,255,0.7)" : "#94A3B8" }}>
                  {passed}/{ch.count}
                </span>
                <div className="w-full rounded-full overflow-hidden" style={{ height: 2, background: active ? "rgba(255,255,255,0.3)" : "#E2E8F0" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(passed / ch.count) * 100}%`, background: active ? "#fff" : "#3B82F6" }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category tabs + Search row */}
      <div className="flex items-center justify-between gap-4 mb-5">
        {/* Type tabs on the left */}
        <div className="flex items-center gap-2 flex-wrap">
          {allTypes.map((t) => {
            const isActive = (t === "全部" && typeFilter === null) || typeFilter === t;
            return (
              <button
                key={t}
                onClick={() => setTypeFilter(t === "全部" ? null : t)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: isActive ? "#EFF4FF" : "#F8FAFF",
                  color: isActive ? "#2563EB" : "#64748B",
                  border: isActive ? "1px solid #2563EB" : "1px solid #E8F0FF",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Search on the right */}
        <div
          className="flex items-center gap-2 rounded-xl px-4 py-2"
          style={{ background: "#fff", border: "1px solid #E0E8F7", minWidth: 240 }}
        >
          <Search size={15} color="#94A3B8" />
          <input
            placeholder="搜索关卡..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm flex-1"
            style={{ color: "#334155" }}
          />
        </div>
      </div>

      {/* Level cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredLevels.map((level) => (
          <LevelCard
            key={level.id}
            level={level}
            onClick={() => !level.status.includes("locked") && navigate(`/training/prep/${level.id}`)}
          />
        ))}
        {filteredLevels.length === 0 && (
          <div className="col-span-3 flex flex-col items-center justify-center py-20" style={{ color: "#94A3B8" }}>
            <BookOpen size={40} className="mb-3 opacity-40" />
            <p>暂无匹配的关卡</p>
          </div>
        )}
      </div>
    </div>
  );
}
