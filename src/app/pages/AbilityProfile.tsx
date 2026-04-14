import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Brain,
  Target,
  TrendingUp,
  Download,
  ChevronRight,
  Zap,
  CheckCircle2,
  Circle,
  Star,
  AlertTriangle,
  Calendar,
  BarChart3,
  ChevronDown,
  Clock,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const radarData = [
  { subject: "沟通表达", current: 85, avg: 72 },
  { subject: "产品知识", current: 74, avg: 78 },
  { subject: "需求挖掘", current: 68, avg: 70 },
  { subject: "情绪管理", current: 90, avg: 75 },
  { subject: "成交技巧", current: 61, avg: 65 },
  { subject: "合规意识", current: 88, avg: 80 },
];

const trendData = [
  { week: "第1周", 沟通: 72, 产品: 68, 需求: 60, 情绪: 80, 成交: 55, 合规: 78 },
  { week: "第2周", 沟通: 75, 产品: 71, 需求: 63, 情绪: 83, 成交: 57, 合规: 82 },
  { week: "第3周", 沟通: 79, 产品: 73, 需求: 65, 情绪: 87, 成交: 59, 合规: 85 },
  { week: "第4周", 沟通: 82, 产品: 74, 需求: 68, 情绪: 90, 成交: 61, 合规: 88 },
];

const weekPlan = [
  {
    day: "周一",
    task: "存款到期客户转化话术",
    duration: "15 min",
    done: true,
    score: 88,
  },
  {
    day: "周二",
    task: "SPIN 需求挖掘实战",
    duration: "12 min",
    done: true,
    score: 76,
  },
  {
    day: "周三",
    task: "成交时机识别与推进",
    duration: "18 min",
    done: false,
    current: true,
  },
  {
    day: "周四",
    task: "理财产品异议处理",
    duration: "15 min",
    done: false,
  },
  {
    day: "周五",
    task: "合规话术综合演练",
    duration: "20 min",
    done: false,
  },
];

const weakLevels = [
  { title: "开口成交时机把握", chapter: "成交推进", difficulty: 3, match: "成交技巧弱项" },
  { title: "SPIN 提问法实战", chapter: "需求挖掘", difficulty: 2, match: "需求挖掘弱项" },
  { title: "产品知识综合强化", chapter: "产品知识", difficulty: 2, match: "产品知识短板" },
];

const dimDetails = [
  {
    name: "成交技巧",
    score: 61,
    color: "#FF6B35",
    level: "需强化",
    diagnosis: "临门一脚意识弱，未能在客户意向提升时把握成交时机，促成话术不足",
    rootCause: "训练次数不足，成交场景练习仅完成 40%，缺乏系统性强化",
    actions: ["完成「开口成交」系列 3 个关卡", "学习标准成交话术库", "每日 1 次成交场景练习"],
  },
  {
    name: "需求挖掘",
    score: 68,
    color: "#A855F7",
    level: "有提升空间",
    diagnosis: "提问频率偏低，倾向于直接推产品，缺少深度需求探索，SPIN 法应用不熟练",
    rootCause: "对客户财富目标的探索止于表面，未建立系统化提问习惯",
    actions: ["强化 SPIN 提问法练习", "增加 3 次需求挖掘场景训练", "记录并分析优秀提问案例"],
  },
  {
    name: "产品知识",
    score: 74,
    color: "#F59E0B",
    level: "接近达标",
    diagnosis: "基础知识掌握较好，但产品间横向对比能力弱，适配推荐理由不够充分",
    rootCause: "产品学习以记忆为主，缺乏实战场景中的灵活应用",
    actions: ["完成学习中心产品模块课程", "练习产品对比话术", "参加下周产品知识考核"],
  },
];

export function AbilityProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "detail" | "plan">("overview");
  const [activeDim, setActiveDim] = useState(0);
  const [diagnosisOpen, setDiagnosisOpen] = useState(true);

  const overallScore = Math.round(radarData.reduce((a, d) => a + d.current, 0) / radarData.length);

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "#1A2035" }}>能力画像</h1>
          <p className="text-sm" style={{ color: "#94A3B8" }}>基于 286 次训练数据的 AI 智能诊断</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80"
          style={{ background: "#F0F4FA", color: "#64748B", border: "1px solid #E0E8F7" }}
        >
          <Download size={15} />
          导出报告
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: "overview", label: "总览" },
          { id: "detail", label: "弱项诊断" },
          { id: "plan", label: "训练计划" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{
              background: activeTab === tab.id ? "linear-gradient(135deg, #2B6EFB, #5B8BFF)" : "#fff",
              color: activeTab === tab.id ? "#fff" : "#64748B",
              border: `1px solid ${activeTab === tab.id ? "transparent" : "#E0E8F7"}`,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-12 gap-5">
          {/* Left */}
          <div className="col-span-12 lg:col-span-8 space-y-5">
            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "综合评分", value: `${overallScore}`, sub: "较上月 +4.2", icon: <Star size={18} />, color: "#2563EB", bg: "#EFF4FF" },
                { label: "连续训练天数", value: "14天", sub: "本月最长", icon: <Clock size={18} />, color: "#D97706", bg: "#FFFBEB" },
                { label: "章节通关率", value: "68%", sub: "29/58 关已通", icon: <CheckCircle2 size={18} />, color: "#059669", bg: "#ECFDF5" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4 flex items-center gap-3"
                  style={{
                    background: "#fff",
                    border: "1px solid #EEF2FF",
                    boxShadow: "0 1px 4px rgba(37,99,235,0.05), 0 4px 16px rgba(37,99,235,0.04)",
                  }}
                >
                  <div
                    className="rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ width: 40, height: 40, background: s.bg }}
                  >
                    <span style={{ color: s.color }}>{s.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.04em", lineHeight: 1.1 }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: s.color, display: "flex", alignItems: "center", gap: 2 }}>
                        <TrendingUp size={10} />{s.sub}
                      </div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: "#64748B", marginTop: 2 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Radar */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold" style={{ color: "#1A2035" }}>六大维度能力雷达</h3>
              </div>

              <div className="flex items-center gap-8">
                {/* Left - Radar Chart */}
                <div className="flex-1">
                  {/* Legend at top center */}
                  <div className="flex items-center justify-center gap-8 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full" style={{ width: 10, height: 10, background: "#2B6EFB" }} />
                      <span className="text-sm font-medium" style={{ color: "#64748B" }}>我的能力</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full" style={{ width: 10, height: 10, background: "#10B981" }} />
                      <span className="text-sm font-medium" style={{ color: "#64748B" }}>团队平均</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={260}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#E8F0FF" strokeWidth={1.5} />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 13, fill: "#64748B", fontWeight: 500 }} />
                      <Radar name="我的能力" dataKey="current" stroke="#2B6EFB" fill="#2B6EFB" fillOpacity={0.15} strokeWidth={3} />
                      <Radar name="团队平均" dataKey="avg" stroke="#10B981" fill="#10B981" fillOpacity={0.08} strokeWidth={2} strokeDasharray="4 2" />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Right - Dimension List */}
                <div className="flex-shrink-0 flex flex-col justify-center" style={{ minWidth: 200 }}>
                  {radarData.map((d) => (
                    <div key={d.subject} className="flex items-center gap-3 py-2">
                      <div className="text-sm w-16 text-right font-medium" style={{ color: "#64748B" }}>{d.subject}</div>
                      <div className="rounded-full overflow-hidden" style={{ width: 80, height: 5, background: "#E2E8F0" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${d.current}%`,
                            background: d.current < 70 ? "#FF4D4F" : d.current < 80 ? "#F59E0B" : "#2B6EFB",
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold w-6" style={{ color: d.current < 70 ? "#FF4D4F" : "#1A2035" }}>{d.current}</span>
                      {d.current < d.avg && (
                        <span className="text-xs" style={{ color: "#FF4D4F" }}>↓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trend chart */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
            >
              <h3 className="font-semibold mb-4" style={{ color: "#1A2035" }}>各维度历史变化趋势（近 4 周）</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trendData}>
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E8F0FF", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="沟通" stroke="#2B6EFB" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="需求" stroke="#A855F7" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="成交" stroke="#FF6B35" strokeWidth={2} dot={false} strokeDasharray="4 2" />
                  <Line type="monotone" dataKey="合规" stroke="#06B6D4" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right */}
          <div className="col-span-12 lg:col-span-4 space-y-5">
            {/* AI diagnosis summary */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
            >
              {/* Collapsible header */}
              <button
                className="w-full flex items-center justify-between px-5 py-4 transition-colors hover:bg-white/30"
                onClick={() => setDiagnosisOpen((v) => !v)}
              >
                <div className="flex items-center gap-2">
                  <Brain size={15} color="#2B6EFB" />
                  <span style={{ fontWeight: 600, color: "#1A2035", fontSize: 14 }}>AI 弱项诊断</span>
                </div>
                <ChevronDown
                  size={15}
                  color="#2B6EFB"
                  style={{
                    transform: diagnosisOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.22s ease",
                  }}
                />
              </button>

              {/* Collapsible body */}
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: diagnosisOpen ? 600 : 0,
                  transition: "max-height 0.3s ease",
                }}
              >
                <div className="px-5 pb-5 space-y-3">
                  <div className="p-3 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E8F0FF" }}>
                    <div className="text-xs font-medium mb-1" style={{ color: "#FF4D4F" }}>🎯 核心弱项</div>
                    <p className="text-xs leading-relaxed" style={{ color: "#334155" }}>
                      成交技巧（61分）是当前最大短板，训练场景覆盖不足，建议本周重点强化成交推进章节。
                    </p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E8F0FF" }}>
                    <div className="text-xs font-medium mb-1" style={{ color: "#F59E0B" }}>📈 提升路径</div>
                    <p className="text-xs leading-relaxed" style={{ color: "#334155" }}>
                      按照当前进度，预计 3 周内需求挖掘可达 80 分，成交技巧需要至少 15 次专项练习。
                    </p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E8F0FF" }}>
                    <div className="text-xs font-medium mb-1" style={{ color: "#10B981" }}>✅ 优势保持</div>
                    <p className="text-xs leading-relaxed" style={{ color: "#334155" }}>
                      情绪管理（90分）和合规意识（88分）表现优秀，保持当前训练频率即可。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Expected improvement */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={15} color="#10B981" />
                <h3 className="font-semibold" style={{ color: "#1A2035" }}>提升预期效果</h3>
              </div>
              <div className="space-y-3">
                {[
                  { dim: "成交技巧", current: 61, target: 75, weeks: 3 },
                  { dim: "需求挖掘", current: 68, target: 80, weeks: 2 },
                  { dim: "产品知识", current: 74, target: 85, weeks: 2 },
                ].map((d, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm" style={{ color: "#1A2035" }}>{d.dim}</span>
                      <span className="text-xs" style={{ color: "#94A3B8" }}>预计 {d.weeks} 周</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 rounded-full overflow-hidden relative" style={{ height: 6, background: "#E2E8F0" }}>
                        <div
                          className="absolute h-full rounded-full"
                          style={{ width: `${d.current}%`, background: "#2B6EFB" }}
                        />
                        <div
                          className="absolute h-full rounded-full opacity-30"
                          style={{ width: `${d.target}%`, background: "#2B6EFB", left: 0 }}
                        />
                      </div>
                      <span className="text-xs w-14 flex-shrink-0" style={{ color: "#94A3B8" }}>
                        {d.current} → <span style={{ color: "#10B981" }}>{d.target}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak-matched levels */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold" style={{ color: "#1A2035" }}>弱项推荐关卡</h3>
                <button className="text-xs flex items-center gap-1" style={{ color: "#2B6EFB" }} onClick={() => navigate("/training")}>
                  更多 <ChevronRight size={12} />
                </button>
              </div>
              <div className="space-y-3">
                {weakLevels.map((l, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:shadow-md transition-all"
                    style={{ background: "#F8FAFF", border: "1px solid #E8F0FF" }}
                    onClick={() => navigate(`/training/prep/${i + 101}`)}
                  >
                    <div
                      className="rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ width: 36, height: 36, background: "linear-gradient(135deg, #EFF4FF, #E8F0FF)" }}
                    >
                      <Zap size={16} color="#2B6EFB" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: "#1A2035" }}>{l.title}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs" style={{ color: "#94A3B8" }}>{l.chapter}</span>
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-full"
                          style={{ background: "#FFF3F0", color: "#FF4D4F" }}
                        >
                          {l.match}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={14} color="#94A3B8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "detail" && (
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-4">
            <div className="space-y-3">
              {dimDetails.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDim(i)}
                  className="w-full p-4 rounded-2xl text-left transition-all"
                  style={{
                    background: activeDim === i ? "linear-gradient(135deg, #EFF4FF, #E8F0FF)" : "#fff",
                    border: `1px solid ${activeDim === i ? "#2B6EFB" : "rgba(43,110,251,0.08)"}`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold" style={{ color: "#1A2035" }}>{d.name}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: d.score < 70 ? "#FFF3F0" : "#FFFBEB",
                        color: d.score < 70 ? "#FF4D4F" : "#D97706",
                      }}
                    >
                      {d.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 rounded-full overflow-hidden" style={{ height: 4, background: "#E2E8F0" }}>
                      <div className="h-full rounded-full" style={{ width: `${d.score}%`, background: d.color }} />
                    </div>
                    <span className="text-sm font-bold" style={{ color: d.color }}>{d.score}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div
              className="rounded-2xl p-6"
              style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
            >
              <h3 className="font-bold mb-5" style={{ color: "#1A2035" }}>
                {dimDetails[activeDim].name} · 深度诊断报告
              </h3>

              <div className="space-y-5">
                <div className="p-4 rounded-xl" style={{ background: "#FFF3F0", border: "1px solid #FFD0CC" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={14} color="#FF4D4F" />
                    <span className="text-sm font-medium" style={{ color: "#FF4D4F" }}>问题诊断</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#334155" }}>{dimDetails[activeDim].diagnosis}</p>
                </div>

                <div className="p-4 rounded-xl" style={{ background: "#FFFBEB", border: "1px solid #FDE68A" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 size={14} color="#D97706" />
                    <span className="text-sm font-medium" style={{ color: "#D97706" }}>根源分析</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#334155" }}>{dimDetails[activeDim].rootCause}</p>
                </div>

                <div className="p-4 rounded-xl" style={{ background: "#ECFDF5", border: "1px solid #B7EB8F" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Target size={14} color="#10B981" />
                    <span className="text-sm font-medium" style={{ color: "#10B981" }}>提升行动</span>
                  </div>
                  <div className="space-y-2">
                    {dimDetails[activeDim].actions.map((a, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="rounded-full flex-shrink-0" style={{ width: 6, height: 6, background: "#10B981" }} />
                        <span className="text-sm" style={{ color: "#334155" }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate("/training")}
                  className="w-full py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #2B6EFB, #5B8BFF)", color: "#fff" }}
                >
                  <Zap size={15} />
                  开始专项强化训练
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "plan" && (
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-8">
            <div
              className="rounded-2xl p-5"
              style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Calendar size={16} color="#2B6EFB" />
                  <h3 className="font-semibold" style={{ color: "#1A2035" }}>本周训练计划</h3>
                </div>
                <div className="text-xs" style={{ color: "#94A3B8" }}>2/5 完成</div>
              </div>

              <div className="rounded-full overflow-hidden mb-5" style={{ height: 6, background: "#E2E8F0" }}>
                <div className="h-full rounded-full" style={{ width: "40%", background: "linear-gradient(90deg, #2B6EFB, #10B981)" }} />
              </div>

              <div className="space-y-3">
                {weekPlan.map((w, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all"
                    style={{
                      background: w.current ? "#EFF4FF" : w.done ? "#F8FAFF" : "#F8FAFF",
                      border: `1px solid ${w.current ? "#2B6EFB" : w.done ? "#E8F0FF" : "#E8F0FF"}`,
                    }}
                  >
                    <div
                      className="rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        width: 40,
                        height: 40,
                        background: w.done ? "#ECFDF5" : w.current ? "#2B6EFB" : "#F0F4FA",
                      }}
                    >
                      {w.done ? (
                        <CheckCircle2 size={18} color="#10B981" />
                      ) : w.current ? (
                        <Zap size={18} color="#fff" />
                      ) : (
                        <Circle size={18} color="#94A3B8" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium" style={{ color: w.done ? "#94A3B8" : w.current ? "#2B6EFB" : "#1A2035" }}>
                          {w.day}
                        </span>
                        {w.current && (
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#2B6EFB", color: "#fff" }}>今日</span>
                        )}
                      </div>
                      <div className="text-sm" style={{ color: w.done ? "#94A3B8" : "#1A2035" }}>{w.task}</div>
                      <div className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>{w.duration}</div>
                    </div>

                    {w.done ? (
                      <span className="text-sm font-bold" style={{ color: "#10B981" }}>{w.score}分</span>
                    ) : w.current ? (
                      <button
                        onClick={() => navigate("/training")}
                        className="px-4 py-2 rounded-xl text-sm font-medium"
                        style={{ background: "#2B6EFB", color: "#fff" }}
                      >
                        开始
                      </button>
                    ) : (
                      <span className="text-xs" style={{ color: "#94A3B8" }}>待解锁</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-4">
            <div
              className="rounded-2xl p-5"
              style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
            >
              <h3 className="font-semibold mb-4" style={{ color: "#1A2035" }}>计划完成情况</h3>
              <div className="space-y-3">
                {[
                  { label: "本周任务", value: "2/5", color: "#2B6EFB" },
                  { label: "本月任务", value: "14/20", color: "#10B981" },
                  { label: "平均得分", value: "83.4", color: "#F59E0B" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "#F8FAFF" }}>
                    <span className="text-sm" style={{ color: "#64748B" }}>{s.label}</span>
                    <span className="font-bold" style={{ color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}