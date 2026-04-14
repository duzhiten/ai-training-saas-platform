import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ClipboardCheck,
  Play,
  User,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  BarChart3,
  Star,
  ChevronRight,
  AlertTriangle,
  Monitor,
  Users,
} from "lucide-react";

const assessmentTypes = [
  {
    id: "online",
    title: "在线场景化考核",
    desc: "AI 模拟真实客户，独立完成完整销售流程考核",
    icon: <Monitor size={24} />,
    color: "#2B6EFB",
    bg: "linear-gradient(135deg, #EFF4FF, #E0ECFF)",
    border: "#BAD0FF",
    available: true,
    duration: "45 min",
  },
  {
    id: "human",
    title: "人工考官监考",
    desc: "由资深考官实时监看，更贴近正式考核标准",
    icon: <Users size={24} />,
    color: "#A855F7",
    bg: "linear-gradient(135deg, #FAF5FF, #F0E8FF)",
    border: "#E9D5FF",
    available: true,
    duration: "60 min",
  },
];

const historyRecords = [
  { id: 1, name: "Q1 客户经理综合能力考核", time: "2026-03-28", score: 88, pass: true, status: "已评分", comment: "整体表现优秀，合规意识强，成交推进需进一步提升" },
  { id: 2, name: "理财产品销售合规考核", time: "2026-03-15", score: 72, pass: true, status: "已评分", comment: "合规理解准确，但话术灵活性不足" },
  { id: 3, name: "客户服务流程专项考核", time: "2026-02-20", score: 65, pass: false, status: "已评分", comment: "异议处理环节失分较多，建议加强针对性训练" },
  { id: 4, name: "年度综合能力评估（模拟）", time: "2026-01-10", score: 79, pass: true, status: "已评分", comment: "整体能力均衡，需重点提升成交环节" },
];

const deptStats = [
  { dept: "零售银行部", completion: 92, avgScore: 82.4, weakness: "成交推进" },
  { dept: "财富管理部", completion: 88, avgScore: 85.1, weakness: "合规话术" },
  { dept: "对公业务部", completion: 75, avgScore: 78.3, weakness: "需求挖掘" },
  { dept: "信用卡中心", completion: 96, avgScore: 80.7, weakness: "产品知识" },
];

const rankList = [
  { rank: 1, name: "李小燕", score: 96.8 },
  { rank: 2, name: "王建国", score: 95.1 },
  { rank: 3, name: "张晓明", score: 93.4, isMe: true },
  { rank: 4, name: "陈美华", score: 91.2 },
  { rank: 5, name: "赵大伟", score: 89.7 },
  { rank: 6, name: "刘晓芳", score: 88.3 },
  { rank: 7, name: "周志强", score: 86.5 },
  { rank: 8, name: "吴小敏", score: 84.9 },
];

export function Assessment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"entry" | "history" | "dept">("entry");

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "#1A2035" }}>考核中心</h1>
        <p className="text-sm" style={{ color: "#94A3B8" }}>正式场景化考核 · 评估专业能力 · 获取综合认证</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: "entry", label: "考核入口" },
          { id: "history", label: "历史记录" },
          { id: "dept", label: "部门统计" },
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

      {activeTab === "entry" && (
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-8 space-y-5">
            {/* Assessment types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assessmentTypes.map((type) => (
                <div
                  key={type.id}
                  className="rounded-2xl p-6 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: type.bg, border: `1px solid ${type.border}` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="rounded-2xl flex items-center justify-center"
                      style={{ width: 56, height: 56, background: "rgba(255,255,255,0.8)", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                    >
                      <span style={{ color: type.color }}>{type.icon}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.7)" }}>
                      <Clock size={12} color={type.color} />
                      <span className="text-xs font-medium" style={{ color: type.color }}>{type.duration}</span>
                    </div>
                  </div>

                  <h3 className="font-bold mb-2" style={{ color: "#1A2035" }}>{type.title}</h3>
                  <p className="text-sm mb-5" style={{ color: "#64748B" }}>{type.desc}</p>

                  <button
                    onClick={() => navigate(`/training/room/1`)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all hover:opacity-90"
                    style={{ background: type.color, color: "#fff" }}
                  >
                    <Play size={15} fill="#fff" />
                    开始考核
                  </button>
                </div>
              ))}
            </div>

            {/* Notice */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={16} color="#F59E0B" />
                <h3 className="font-semibold" style={{ color: "#1A2035" }}>考核须知</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: "📋", title: "考核形式", desc: "采用 AI 模拟客户对话，每次考核随机抽取 3 个场景" },
                  { icon: "⏱️", title: "时间限制", desc: "每个场景限时 15 分钟，超时自动提交" },
                  { icon: "📊", title: "评分标准", desc: "六大维度综合评分，合规维度不达标直接不通过" },
                  { icon: "🏆", title: "通过条件", desc: "综合得分 ≥ 75 分，且合规维度 ≥ 80 分" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ background: "#F8FAFF" }}>
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="text-sm font-medium mb-0.5" style={{ color: "#1A2035" }}>{item.title}</div>
                      <div className="text-xs" style={{ color: "#64748B" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
            >
              <h3 className="font-semibold mb-4" style={{ color: "#1A2035" }}>我的考核概览</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "综合评分", value: "83.4", color: "#2B6EFB" },
                  { label: "考核通过率", value: "75%", color: "#10B981" },
                  { label: "平均排名", value: "#3", color: "#F59E0B" },
                ].map((s, i) => (
                  <div key={i} className="text-center p-4 rounded-xl" style={{ background: "#F8FAFF" }}>
                    <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-xs" style={{ color: "#94A3B8" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Ranking */}
          <div className="col-span-12 lg:col-span-4 space-y-5">
            <div
              className="rounded-2xl p-5"
              style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={16} color="#F59E0B" />
                <h3 className="font-semibold" style={{ color: "#1A2035" }}>本次考核排行榜</h3>
              </div>
              <div className="space-y-3">
                {rankList.map((r) => (
                  <div
                    key={r.rank}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: r.isMe ? "#EFF4FF" : "transparent", border: r.isMe ? "1px solid #BAD0FF" : "1px solid transparent" }}
                  >
                    <div
                      className="flex items-center justify-center rounded-lg flex-shrink-0 text-sm font-bold"
                      style={{
                        width: 28, height: 28,
                        background: r.rank === 1 ? "#FFD700" : r.rank === 2 ? "#C0C0C0" : r.rank === 3 ? "#CD7F32" : "#F0F4FA",
                        color: r.rank <= 3 ? "#fff" : "#94A3B8",
                      }}
                    >
                      {r.rank}
                    </div>
                    <span className="flex-1 text-sm font-medium" style={{ color: r.isMe ? "#2B6EFB" : "#1A2035" }}>
                      {r.name} {r.isMe && <span className="text-xs ml-1 px-1.5 py-0.5 rounded-full" style={{ background: "#2B6EFB", color: "#fff" }}>我</span>}
                    </span>
                    <span className="text-sm font-bold" style={{ color: "#1A2035" }}>{r.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-4">
          {historyRecords.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl p-5 transition-all hover:shadow-md cursor-pointer"
              style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className="rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 48, height: 48,
                      background: r.pass ? "#ECFDF5" : "#FFF3F0",
                    }}
                  >
                    {r.pass ? <CheckCircle2 size={22} color="#10B981" /> : <XCircle size={22} color="#FF4D4F" />}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: "#1A2035" }}>{r.name}</h4>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs" style={{ color: "#94A3B8" }}>{r.time}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "#EFF4FF", color: "#2B6EFB" }}
                      >
                        {r.status}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: "#64748B" }}>考官评语：{r.comment}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: r.score >= 80 ? "#10B981" : r.score >= 60 ? "#F59E0B" : "#FF4D4F" }}
                  >
                    {r.score}
                  </div>
                  <div className="text-xs mb-2" style={{ color: "#94A3B8" }}>综合得分</div>
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: r.pass ? "#ECFDF5" : "#FFF3F0",
                      color: r.pass ? "#10B981" : "#FF4D4F",
                      border: `1px solid ${r.pass ? "#B7EB8F" : "#FFD0CC"}`,
                    }}
                  >
                    {r.pass ? "通过" : "未通过"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "dept" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {deptStats.map((d, i) => (
              <div
                key={i}
                className="rounded-2xl p-5"
                style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                <h4 className="font-semibold mb-3" style={{ color: "#1A2035" }}>{d.dept}</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs" style={{ color: "#94A3B8" }}>完成率</span>
                      <span className="text-sm font-bold" style={{ color: "#2B6EFB" }}>{d.completion}%</span>
                    </div>
                    <div className="rounded-full overflow-hidden" style={{ height: 4, background: "#E2E8F0" }}>
                      <div className="h-full rounded-full" style={{ width: `${d.completion}%`, background: "#2B6EFB" }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "#94A3B8" }}>平均得分</span>
                    <span className="font-bold" style={{ color: "#1A2035" }}>{d.avgScore}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "#94A3B8" }}>薄弱项</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#FFF3F0", color: "#FF4D4F" }}>{d.weakness}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
