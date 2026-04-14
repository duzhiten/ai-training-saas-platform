import { useState } from "react";
import { useNavigate } from "react-router";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Trophy,
  Download,
  Search,
  Filter,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Target,
  Brain,
  Star,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";

const trendData7 = [
  { day: "4/7", score: 75 },
  { day: "4/8", score: 80 },
  { day: "4/9", score: 77 },
  { day: "4/10", score: 84 },
  { day: "4/11", score: 82 },
  { day: "4/12", score: 88 },
  { day: "4/13", score: 85 },
];

const trendData30 = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  score: 65 + Math.floor(Math.random() * 25) + i * 0.6,
}));

const dimTrendData = [
  { week: "W1", 沟通: 72, 产品: 68, 需求: 60, 情绪: 80, 成交: 55 },
  { week: "W2", 沟通: 75, 产品: 71, 需求: 64, 情绪: 83, 成交: 57 },
  { week: "W3", 沟通: 79, 产品: 73, 需求: 65, 情绪: 87, 成交: 58 },
  { week: "W4", 沟通: 82, 产品: 74, 需求: 68, 情绪: 90, 成交: 61 },
];

const chapterStats = [
  { name: "新手入门", passRate: 100, avgScore: 87, count: 8 },
  { name: "客户破冰", passRate: 95, avgScore: 83, count: 10 },
  { name: "需求挖掘", passRate: 72, avgScore: 76, count: 12 },
  { name: "异议处理", passRate: 65, avgScore: 71, count: 10 },
  { name: "成交推进", passRate: 40, avgScore: 65, count: 5 },
  { name: "合规服务", passRate: 0, avgScore: 0, count: 0 },
];

const records = [
  { id: 1, scene: "存款客户需求挖掘", chapter: "需求挖掘", time: "2026-04-13 10:23", duration: "12min", score: 88, status: "passed", mode: "语音" },
  { id: 2, scene: "基金定投异议处理", chapter: "异议处理", time: "2026-04-13 09:10", duration: "18min", score: 76, status: "passed", mode: "文字" },
  { id: 3, scene: "保险产品合规推介", chapter: "合规服务", time: "2026-04-12 17:30", duration: "15min", score: 62, status: "failed", mode: "语音" },
  { id: 4, scene: "信用卡客户挽留", chapter: "客户破冰", time: "2026-04-12 15:12", duration: "10min", score: 91, status: "passed", mode: "热线" },
  { id: 5, scene: "大额存单到期转化", chapter: "成交推进", time: "2026-04-11 11:00", duration: "14min", score: 79, status: "passed", mode: "文字" },
  { id: 6, scene: "VIP 客户资产配置", chapter: "需求挖掘", time: "2026-04-11 09:45", duration: "22min", score: 85, status: "passed", mode: "语音" },
  { id: 7, scene: "理财产品风险揭示", chapter: "合规服务", time: "2026-04-10 16:30", duration: "8min", score: 72, status: "passed", mode: "文字" },
  { id: 8, scene: "开口成交时机把握", chapter: "成交推进", time: "2026-04-10 14:00", duration: "20min", score: 58, status: "failed", mode: "语音" },
];

const behaviorStats = [
  { label: "平均响应时长", value: "8.2s", sub: "↓ 比上月快 1.3s", color: "#2B6EFB", icon: <Clock size={18} /> },
  { label: "提示使用率", value: "34%", sub: "↓ 较上月降低 8%", color: "#10B981", icon: <Brain size={18} /> },
  { label: "训练完成率", value: "92%", sub: "↑ 较上月提升 5%", color: "#F59E0B", icon: <CheckCircle2 size={18} /> },
  { label: "中途退出率", value: "6%", sub: "↓ 较上月降低 2%", color: "#A855F7", icon: <XCircle size={18} /> },
];

export function DataCenter() {
  const navigate = useNavigate();
  const [trendPeriod, setTrendPeriod] = useState<"7" | "30">("7");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecords = records.filter((r) =>
    !searchQuery || r.scene.includes(searchQuery) || r.chapter.includes(searchQuery)
  );

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "#1A2035" }}>数据中心</h1>
          <p className="text-sm" style={{ color: "#94A3B8" }}>全量训练数据分析与能力成长报告</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80"
          style={{ background: "#F0F4FA", color: "#64748B", border: "1px solid #E0E8F7" }}
        >
          <Download size={15} />
          导出报告
        </button>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "训练总次数", value: "286", sub: "本月 +24", color: "#2B6EFB", bg: "#EFF4FF", icon: <Target size={20} /> },
          { label: "平均得分", value: "83.4", sub: "↑ 4.2 pts", color: "#F59E0B", bg: "#FFFBEB", icon: <Star size={20} /> },
          { label: "累计时长", value: "142h", sub: "本月 12.5h", color: "#10B981", bg: "#ECFDF5", icon: <Clock size={20} /> },
          { label: "团队排名", value: "#3", sub: "全部 28 人", color: "#A855F7", bg: "#FAF5FF", icon: <Trophy size={20} /> },
        ].map((s, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 flex items-center gap-4"
            style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
          >
            <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: 44, height: 44, background: s.bg }}>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <div>
              <div className="text-xs mb-1" style={{ color: "#94A3B8" }}>{s.label}</div>
              <div className="text-2xl font-bold" style={{ color: "#1A2035" }}>{s.value}</div>
              <div className="text-xs" style={{ color: s.color }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-5 mb-5">
        {/* Score trend */}
        <div
          className="col-span-12 lg:col-span-8 rounded-2xl p-5"
          style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: "#1A2035" }}>综合得分成长趋势</h3>
            <div className="flex gap-2">
              {(["7", "30"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setTrendPeriod(p)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: trendPeriod === p ? "#2B6EFB" : "#F0F4FA",
                    color: trendPeriod === p ? "#fff" : "#64748B",
                    border: `1px solid ${trendPeriod === p ? "#2B6EFB" : "#E0E8F7"}`,
                  }}
                >
                  近 {p} 天
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendPeriod === "7" ? trendData7 : trendData30}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2B6EFB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2B6EFB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F4FA" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis domain={[55, 100]} tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E8F0FF", borderRadius: 8, fontSize: 12 }} formatter={(v) => [`${Number(v).toFixed(1)}分`, "综合得分"]} />
              <Area type="monotone" dataKey="score" stroke="#2B6EFB" strokeWidth={2.5} fill="url(#scoreGrad)" dot={{ fill: "#2B6EFB", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Behavior stats */}
        <div
          className="col-span-12 lg:col-span-4 rounded-2xl p-5"
          style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
        >
          <h3 className="font-semibold mb-4" style={{ color: "#1A2035" }}>行为分析</h3>
          <div className="space-y-4">
            {behaviorStats.map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: 40, height: 40, background: "#F8FAFF" }}>
                  <span style={{ color: b.color }}>{b.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs" style={{ color: "#94A3B8" }}>{b.label}</span>
                    <span className="font-bold" style={{ color: b.color }}>{b.value}</span>
                  </div>
                  <div className="text-xs" style={{ color: "#94A3B8" }}>{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 mb-5">
        {/* Dim trend */}
        <div
          className="col-span-12 lg:col-span-7 rounded-2xl p-5"
          style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
        >
          <h3 className="font-semibold mb-4" style={{ color: "#1A2035" }}>各维度能力历史变化</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dimTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F4FA" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E8F0FF", borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="沟通" stroke="#2B6EFB" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="产品" stroke="#10B981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="需求" stroke="#A855F7" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="情绪" stroke="#F59E0B" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="成交" stroke="#FF4D4F" strokeWidth={2} dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chapter stats */}
        <div
          className="col-span-12 lg:col-span-5 rounded-2xl p-5"
          style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
        >
          <h3 className="font-semibold mb-4" style={{ color: "#1A2035" }}>章节通关率统计</h3>
          <div className="space-y-3">
            {chapterStats.map((c, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm" style={{ color: "#334155" }}>{c.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: "#94A3B8" }}>均分 {c.avgScore || "-"}</span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: c.passRate >= 80 ? "#10B981" : c.passRate >= 50 ? "#F59E0B" : "#FF4D4F" }}
                    >
                      {c.passRate}%
                    </span>
                  </div>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: 4, background: "#E2E8F0" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${c.passRate}%`,
                      background: c.passRate >= 80 ? "#10B981" : c.passRate >= 50 ? "#F59E0B" : c.passRate > 0 ? "#FF4D4F" : "transparent",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Training records */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold" style={{ color: "#1A2035" }}>全量训练记录</h3>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: "#F0F4FA", border: "1px solid #E0E8F7" }}
            >
              <Search size={14} color="#A0AECB" />
              <input
                placeholder="搜索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-32"
                style={{ color: "#334155" }}
              />
            </div>
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm"
              style={{ background: "#F0F4FA", color: "#64748B", border: "1px solid #E0E8F7" }}
            >
              <Filter size={13} />
              筛选
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm"
              style={{ background: "#F0F4FA", color: "#64748B", border: "1px solid #E0E8F7" }}
            >
              <Download size={13} />
              导出
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0F4FA" }}>
                {["场景名称", "所属章节", "训练时间", "时长", "模式", "得分", "状态", "操作"].map((h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-3 text-xs font-medium"
                    style={{ color: "#94A3B8" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((r, i) => (
                <tr
                  key={r.id}
                  className="hover:bg-blue-50/30 transition-colors cursor-pointer"
                  style={{ borderBottom: "1px solid #F8FAFF" }}
                  onClick={() => navigate(`/training/review/${r.id}`)}
                >
                  <td className="py-3 px-3">
                    <span className="text-sm font-medium" style={{ color: "#1A2035" }}>{r.scene}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#EFF4FF", color: "#2B6EFB" }}>
                      {r.chapter}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs" style={{ color: "#94A3B8" }}>{r.time}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs" style={{ color: "#94A3B8" }}>{r.duration}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs" style={{ color: "#64748B" }}>{r.mode}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className="text-sm font-bold"
                      style={{ color: r.score >= 80 ? "#10B981" : r.score >= 60 ? "#F59E0B" : "#FF4D4F" }}
                    >
                      {r.score}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: r.status === "passed" ? "#ECFDF5" : "#FFF3F0",
                        color: r.status === "passed" ? "#10B981" : "#FF4D4F",
                      }}
                    >
                      {r.status === "passed" ? "通关" : "未过"}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <button
                      className="text-xs px-2 py-1 rounded-lg hover:opacity-80 transition-opacity"
                      style={{ background: "#EFF4FF", color: "#2B6EFB" }}
                      onClick={(e) => { e.stopPropagation(); navigate(`/training/review/${r.id}`); }}
                    >
                      复盘
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Monthly summary */}
      <div
        className="mt-5 rounded-2xl p-5"
        style={{ background: "linear-gradient(130deg, #1a3fc7 0%, #2563EB 60%, #3B82F6 100%)", border: "none" }}
      >
        <div className="flex items-start gap-4">
          <div
            className="rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ width: 48, height: 48, background: "rgba(255,255,255,0.2)" }}
          >
            <Brain size={22} color="#fff" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white font-semibold">AI 月度训练总结</span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>2026年4月</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
              本月你共完成 24 次训练，累计 12.5 小时，综合得分提升 4.2 分至 83.4 分。
              <span className="text-yellow-300 font-medium">情绪管理（+10分）</span> 提升最为显著，
              <span style={{ color: "#FF8C6B" }}>成交技巧（61分）</span> 仍是核心弱项，建议下月重点强化成交推进章节的 5 个关卡。
              团队排名从第 5 名上升至第 3 名，整体趋势向好，请继续保持！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}