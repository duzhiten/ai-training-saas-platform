import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ChevronLeft,
  Star,
  Trophy,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  ArrowRight,
  FileText,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Brain,
  Target,
  Heart,
  Shield,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const radarData = [
  { subject: "沟通表达", score: 85 },
  { subject: "产品知识", score: 88 },
  { subject: "需求挖掘", score: 72 },
  { subject: "情绪管理", score: 90 },
  { subject: "成交技巧", score: 65 },
  { subject: "合规意识", score: 92 },
];

const dimScores = [
  { name: "沟通表达", score: 85, max: 20, icon: <MessageSquare size={14} />, color: "#2B6EFB", feedback: "语言流畅，表达清晰" },
  { name: "产品知识", score: 88, max: 20, icon: <Brain size={14} />, color: "#10B981", feedback: "产品介绍准确完整" },
  { name: "需求挖掘", score: 72, max: 25, icon: <Target size={14} />, color: "#A855F7", feedback: "提问次数偏少，建议多用SPIN法" },
  { name: "情绪管理", score: 90, max: 15, icon: <Heart size={14} />, color: "#F59E0B", feedback: "共情表达自然，把控得当" },
  { name: "成交技巧", score: 65, max: 10, icon: <Trophy size={14} />, color: "#FF6B35", feedback: "缺乏临门一脚，时机把握弱" },
  { name: "合规意识", score: 92, max: 10, icon: <Shield size={14} />, color: "#06B6D4", feedback: "1次违规提醒，及时纠正" },
];

const dialogComparisons = [
  {
    round: 3,
    scene: "客户提到曾经亏损，产生抵触情绪",
    myAnswer: "您放心，这个产品比较稳健，一般不会亏损的...",
    standardAnswer: "我非常理解您的感受，投资有风险是客观存在的...",
    score: 65,
    issues: ["使用了暗示性语言", "缺少有效共情"],
  },
  {
    round: 5,
    scene: "客户询问产品是否能稳赚",
    myAnswer: "这个产品收益还是比较稳定的，基本上都能赚钱...",
    standardAnswer: "任何投资产品都存在一定风险，无法保证稳赚不赔...",
    score: 40,
    issues: ["构成收益承诺", "未主动揭示风险"],
  },
];

const improvements = [
  { priority: "高", issue: "成交时机把握能力弱", suggestion: "当客户情绪积极、提问增多时是成交信号", tag: "成交技巧" },
  { priority: "高", issue: "需求挖掘深度不足", suggestion: "多运用开放式问题，至少5次有效提问", tag: "需求挖掘" },
  { priority: "中", issue: "合规用词需强化", suggestion: "避免使用模糊承诺性语言", tag: "合规意识" },
];

export function TrainingReview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [expandedDialog, setExpandedDialog] = useState<number | null>(0);
  const totalScore = 82;
  const passed = totalScore >= 70;
  const stars = totalScore >= 90 ? 3 : totalScore >= 75 ? 2 : totalScore >= 60 ? 1 : 0;

  return (
    <div className="p-6 w-full">
      {/* Back */}
      <button
        onClick={() => navigate("/training")}
        className="flex items-center gap-2 mb-5 text-sm hover:opacity-70 transition-opacity"
        style={{ color: "#64748B" }}
      >
        <ChevronLeft size={16} />
        返回关卡列表
      </button>

      {/* Result header */}
      <div
        className="rounded-2xl p-6 mb-6 relative overflow-hidden"
        style={{
          background: passed
            ? "linear-gradient(135deg, #064E3B 0%, #065F46 50%, #10B981 100%)"
            : "linear-gradient(135deg, #7F1D1D 0%, #991B1B 50%, #EF4444 100%)",
          boxShadow: passed ? "0 8px 32px rgba(16,185,129,0.3)" : "0 8px 32px rgba(239,68,68,0.3)",
        }}
      >
        <div className="absolute top-0 right-0 rounded-full opacity-10" style={{ width: 300, height: 300, background: "#fff", transform: "translate(80px, -100px)" }} />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white/70 text-sm">需求挖掘</span>
              <span className="text-white/70 text-sm">·</span>
              <span className="text-white text-sm font-medium">存款客户深度需求挖掘</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[1, 2, 3].map((s) => (
                  <Star key={s} size={24} fill={s <= stars ? "#FFD700" : "transparent"} color={s <= stars ? "#FFD700" : "rgba(255,255,255,0.3)"} />
                ))}
              </div>
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold"
                style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
              >
                {passed ? "✅ 通关成功" : "❌ 未达通关"}
              </span>
            </div>

            <div className="text-white/70 text-sm">本次表现比上次提升了 <span className="text-yellow-300 font-bold">+6.2 分</span></div>
          </div>

          <div className="text-center">
            <div className="text-white/60 text-sm mb-1">综合得分</div>
            <div className="text-6xl font-bold text-white">{totalScore}</div>
            <div className="text-white/60 text-sm mt-1">满分 100</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Left */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
          {/* Dimension scores - 3x2 Grid Layout */}
          <div
            className="rounded-2xl p-5 flex-1"
            style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)", height: 261 }}
          >
            <h3 className="font-semibold mb-4" style={{ color: "#1A2035" }}>各维度得分详情</h3>
            <div className="grid grid-cols-3 gap-4">
              {dimScores.map((d) => (
                <div key={d.name} className="p-4 rounded-xl flex flex-col justify-center" style={{ background: "#F8FAFF", border: "1px solid #E8F0FF", minHeight: 90 }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span style={{ color: d.color }}>{d.icon}</span>
                      <span className="text-sm font-medium" style={{ color: "#1A2035" }}>{d.name}</span>
                    </div>
                    <span className="text-base font-bold" style={{ color: d.score >= 80 ? d.color : d.score >= 60 ? "#F59E0B" : "#FF4D4F" }}>
                      {d.score}
                    </span>
                  </div>
                  <div className="rounded-full overflow-hidden mb-2" style={{ height: 5, background: "#E2E8F0" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${d.score}%`,
                        background: d.score >= 80 ? d.color : d.score >= 60 ? "#F59E0B" : "#FF4D4F",
                      }}
                    />
                  </div>
                  <p className="text-xs" style={{ color: "#64748B" }}>{d.feedback}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dialog comparisons - Simplified */}
          <div
            className="rounded-2xl p-5 flex-1"
            style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={16} color="#2B6EFB" />
              <h3 className="font-semibold" style={{ color: "#1A2035" }}>回答对比分析</h3>
            </div>

            <div className="space-y-3">
              {dialogComparisons.map((d, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{ border: "1px solid #E8F0FF" }}
                >
                  <button
                    className="w-full flex items-center justify-between p-4"
                    style={{ background: "#F8FAFF" }}
                    onClick={() => setExpandedDialog(expandedDialog === i ? null : i)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          width: 32,
                          height: 32,
                          background: d.score >= 70 ? "#ECFDF5" : "#FFF3F0",
                        }}
                      >
                        <span className="text-sm font-bold" style={{ color: d.score >= 70 ? "#10B981" : "#FF4D4F" }}>
                          {d.score}
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium" style={{ color: "#1A2035" }}>第 {d.round} 轮 · {d.scene}</div>
                      </div>
                    </div>
                    {expandedDialog === i ? <ChevronUp size={16} color="#94A3B8" /> : <ChevronDown size={16} color="#94A3B8" />}
                  </button>

                  {expandedDialog === i && (
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg text-sm" style={{ background: "#FFF3F0", color: "#334155", border: "1px solid #FFD0CC" }}>
                          <span style={{ color: "#FF4D4F" }}>我的回答：</span>{d.myAnswer}
                        </div>
                        <div className="p-3 rounded-lg text-sm" style={{ background: "#ECFDF5", color: "#334155", border: "1px solid #B7EB8F" }}>
                          <span style={{ color: "#10B981" }}>标准话术：</span>{d.standardAnswer}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {d.issues.map((issue, j) => (
                          <span key={j} className="text-xs px-2 py-1 rounded" style={{ background: "#FFF3F0", color: "#FF4D4F" }}>
                            {issue}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons - White background */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => navigate(`/training/room/${id}`)}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium transition-all hover:shadow-md"
              style={{ background: "#fff", color: "#2B6EFB", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
            >
              <RotateCcw size={16} />
              再次挑战
            </button>
            <button
              onClick={() => navigate("/training")}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium transition-all hover:shadow-md"
              style={{ background: "#fff", color: "#64748B", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
            >
              <ChevronLeft size={16} />
              章节列表
            </button>
            <button
              onClick={() => navigate("/data")}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium transition-all hover:shadow-md"
              style={{ background: "#fff", color: "#64748B", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
            >
              <FileText size={16} />
              完整报告
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          {/* Radar */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)", height: 261 }}
          >
            <h3 className="font-semibold mb-3" style={{ color: "#1A2035" }}>能力雷达图</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E8F0FF" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#94A3B8" }} />
                <Radar name="得分" dataKey="score" stroke="#2B6EFB" fill="#2B6EFB" fillOpacity={0.2} strokeWidth={2} dot={{ fill: "#2B6EFB", r: 3 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Violation records */}
          <div
            className="rounded-2xl p-5 flex-1"
            style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={16} color="#F59E0B" />
              <h3 className="font-semibold" style={{ color: "#1A2035" }}>违规记录</h3>
              <span className="px-2 py-0.5 rounded text-xs" style={{ background: "#FFF3F0", color: "#FF4D4F" }}>1 次</span>
            </div>
            <div className="p-3 rounded-lg text-sm" style={{ background: "#FFF3F0", border: "1px solid #FFD0CC", color: "#CF1322" }}>
              第 5 轮使用「基本上都能赚钱」涉及收益承诺，扣 3 分。
            </div>
          </div>

          {/* Improvement suggestions */}
          <div
            className="rounded-2xl p-5 flex-1"
            style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} color="#10B981" />
              <h3 className="font-semibold" style={{ color: "#1A2035" }}>改进建议</h3>
            </div>
            <div className="space-y-3">
              {improvements.map((imp, i) => (
                <div key={i} className="p-3 rounded-lg" style={{ background: "#F8FAFF", border: "1px solid #E8F0FF" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{
                        background: imp.priority === "高" ? "#FFF3F0" : "#FFFBEB",
                        color: imp.priority === "高" ? "#FF4D4F" : "#D97706",
                      }}
                    >
                      {imp.priority}
                    </span>
                    <span className="text-sm" style={{ color: "#1A2035" }}>{imp.issue}</span>
                  </div>
                  <p className="text-sm" style={{ color: "#64748B" }}>{imp.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
