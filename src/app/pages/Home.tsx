import { useNavigate } from "react-router";
import {
  Target,
  Clock,
  Star,
  TrendingUp,
  ChevronRight,
  Play,
  Trophy,
  BookOpen,
  BarChart3,
  ClipboardCheck,
  CheckCircle2,
  Lock,
  Flame,
  ArrowUpRight,
  Sparkles,
  Zap,
  MessageCircle,
  Package,
  Search,
  HelpCircle,
  Handshake,
  ShieldCheck,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const radarData = [
  { subject: "沟通表达", A: 82 },
  { subject: "产品知识", A: 74 },
  { subject: "需求挖掘", A: 68 },
  { subject: "情绪管理", A: 90 },
  { subject: "成交技巧", A: 61 },
  { subject: "合规意识", A: 88 },
];

const trendData = [
  { day: "周一", score: 72 },
  { day: "周二", score: 78 },
  { day: "周三", score: 75 },
  { day: "周四", score: 82 },
  { day: "周五", score: 85 },
  { day: "周六", score: 80 },
  { day: "今天", score: 88 },
];

const recentRecords = [
  { scene: "存款客户需求挖掘", time: "今天 10:23", score: 88, passed: true, duration: "12min" },
  { scene: "基金定投异议处理", time: "今天 09:10", score: 76, passed: true, duration: "18min" },
  { scene: "保险产品合规推介", time: "昨天 17:30", score: 62, passed: false, duration: "15min" },
];

const rankList = [
  { rank: 1, name: "李小燕", dept: "零售银行部", score: 96.8 },
  { rank: 2, name: "王建国", dept: "财富管理部", score: 95.1 },
  { rank: 3, name: "张晓明", dept: "零售银行部", score: 93.4, isMe: true },
  { rank: 4, name: "陈美华", dept: "对公业务部", score: 91.2 },
];

// Growth path stages with curved positions
const growthStages = [
  { id: 1, name: "基础问候", chapter: "新手入门", status: "done", score: 95, difficulty: 1, ability: "沟通表达", icon: <MessageCircle size={14} /> },
  { id: 2, name: "产品介绍", chapter: "新手入门", status: "done", score: 88, difficulty: 1, ability: "产品知识", icon: <Package size={14} /> },
  { id: 3, name: "需求识别", chapter: "客户破冰", status: "done", score: 82, difficulty: 2, ability: "需求挖掘", icon: <Search size={14} /> },
  { id: 4, name: "SPIN提问", chapter: "需求挖掘", status: "current", difficulty: 2, ability: "需求挖掘", icon: <HelpCircle size={14} /> },
  { id: 5, name: "异议处理", chapter: "异议处理", status: "locked", difficulty: 3, ability: "情绪管理", icon: <MessageCircle size={14} /> },
  { id: 6, name: "成交推进", chapter: "成交推进", status: "locked", difficulty: 3, ability: "成交技巧", icon: <Handshake size={14} /> },
  { id: 7, name: "合规服务", chapter: "合规服务", status: "locked", difficulty: 2, ability: "合规意识", icon: <ShieldCheck size={14} /> },
];

// Today's recommended tasks (prioritize weak skills)
const todayRecommendations = [
  { id: 4, name: "SPIN提问法实战", difficulty: 2, duration: "15min", ability: "需求挖掘", isCurrent: true },
  { id: 8, name: "成交技巧专项训练", difficulty: 3, duration: "20min", ability: "成交技巧", recommended: "弱项" },
  { id: 9, name: "产品知识强化", difficulty: 2, duration: "12min", ability: "产品知识", recommended: "巩固" },
];

const chapters = [
  { name: "新手入门", total: 8, passed: 8, locked: false },
  { name: "客户破冰", total: 10, passed: 10, locked: false },
  { name: "需求挖掘", total: 12, passed: 7, locked: false },
  { name: "异议处理", total: 10, passed: 3, locked: false },
  { name: "成交推进", total: 10, passed: 1, locked: false },
  { name: "合规服务", total: 8, passed: 0, locked: true },
];

// Stat card
function StatCard({ icon, label, value, sub, color, bg }: {
  icon: React.ReactNode; label: string; value: string; sub?: string; color: string; bg: string;
}) {
  return (
    <div
      className="rounded-2xl p-5 flex items-start gap-3 group cursor-default"
      style={{
        background: "#fff",
        border: "1px solid rgba(70,89,255,0.08)",
        boxShadow: "0 1px 4px rgba(70,89,255,0.04), 0 4px 16px rgba(70,89,255,0.03)"
      }}
    >
      <div className="rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ width: 42, height: 42, background: bg }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <div className="mb-0.5" style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500, letterSpacing: "0.02em" }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{value}</div>
        {sub && <div className="mt-1 flex items-center gap-1" style={{ fontSize: 11, color: color }}>
          <TrendingUp size={10} />{sub}
        </div>}
      </div>
    </div>
  );
}

// Score pill
function ScorePill({ score }: { score: number }) {
  const color = score >= 80 ? "#059669" : score >= 60 ? "#D97706" : "#DC2626";
  const bg = score >= 80 ? "#ECFDF5" : score >= 60 ? "#FFFBEB" : "#FEF2F2";
  return (
    <span style={{ fontSize: 12, fontWeight: 700, color, background: bg, padding: "2px 8px", borderRadius: 20 }}>
      {score}
    </span>
  );
}

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="pb-28">
      <div className="p-6 w-full">

        {/* ── HERO BANNER ── */}
        <div
          className="relative rounded-2xl p-6 mb-5 overflow-hidden"
          style={{
            background: "linear-gradient(130deg, #3847d9 0%, #4659FF 55%, #5c6dff 100%)",
            boxShadow: "0 8px 40px rgba(70,89,255,0.28)",
          }}
        >
          {/* Decorative blobs */}
          <div className="absolute" style={{ width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.06)", top: -100, right: -60, pointerEvents: "none" }} />
          <div className="absolute" style={{ width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.05)", bottom: -60, right: 200, pointerEvents: "none" }} />

          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center rounded-2xl flex-shrink-0"
                style={{ width: 52, height: 52, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)", fontSize: 22, color: "#fff", fontWeight: 700 }}
              >
                张
              </div>
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 2 }}>早上好</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>张晓明</div>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1.5">
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80" }} />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>零售银行部 · 客户经理</span>
                  </div>
                  <div
                    className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
                    style={{ background: "rgba(251,191,36,0.2)", border: "1px solid rgba(251,191,36,0.3)" }}
                  >
                    <Flame size={11} color="#FCD34D" />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#FCD34D" }}>连续训练 14 天</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Level & Experience */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>等级</span>
                    <span style={{ fontSize: 20, fontWeight: 800, color: "#FCD34D", letterSpacing: "-0.02em" }}>Lv.8</span>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <div className="rounded-full overflow-hidden" style={{ width: 120, height: 6, background: "rgba(255,255,255,0.2)" }}>
                      <div className="h-full rounded-full" style={{ width: "65%", background: "linear-gradient(90deg, #FCD34D, #FBBF24)" }} />
                    </div>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>650/1000</span>
                  </div>
                </div>
              </div>

              <div className="w-px h-12 bg-white opacity-20" />

              {[
                { label: "积分", value: "2,450", icon: <Star size={11} color="#FCD34D" fill="#FCD34D" /> },
                { label: "排名", value: "#3", icon: <Trophy size={11} color="#FCD34D" /> },
              ].map((s, i) => (
                <div
                  key={i}
                  className="text-center rounded-2xl px-4 py-3 cursor-pointer transition-all hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", minWidth: 80 }}
                  onClick={() => i === 0 ? navigate("/profile") : null}
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {s.icon}
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{s.label}</span>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue training - inside hero banner */}
          <div
            className="mt-5 pt-4 flex items-center justify-between cursor-pointer transition-all hover:opacity-80"
            style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
            onClick={() => navigate("/training/room/4")}
          >
            <div className="flex items-center gap-3">
              <div
                className="rounded-lg flex items-center justify-center"
                style={{ width: 32, height: 32, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <Play size={16} color="#fff" fill="#fff" />
              </div>
              <div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>继续上次训练</div>
                <div className="text-sm font-semibold" style={{ color: "#fff" }}>SPIN提问法实战 · 已完成 40%</div>
              </div>
            </div>
            <ChevronRight size={20} color="rgba(255,255,255,0.6)" />
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          <StatCard icon={<Target size={18} />} label="累计训练次数" value="286" sub="本月 +24 次" color="#4659FF" bg="#EFF4FF" />
          <StatCard icon={<Star size={18} />} label="综合能力平均分" value="77.2" sub="需提升" color="#D97706" bg="#FFFBEB" />
          <StatCard icon={<Clock size={18} />} label="累计训练时长" value="142h" sub="本月 12.5h" color="#059669" bg="#ECFDF5" />
          <StatCard icon={<Trophy size={18} />} label="团队排名" value="#3" sub="共 28 人" color="#7C3AED" bg="#F5F3FF" />
        </div>

        {/* ── GROWTH PATH (FULL WIDTH - HORIZONTAL STRAIGHT LINE) ── */}
        <div className="rounded-2xl overflow-hidden mb-5" style={{ background: "#fff", border: "1px solid rgba(70,89,255,0.08)", boxShadow: "0 1px 4px rgba(70,89,255,0.04), 0 4px 16px rgba(70,89,255,0.03)" }}>
          <div className="flex items-center justify-between px-5 pt-5 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg flex items-center justify-center" style={{ width: 32, height: 32, background: "#EFF4FF" }}>
                <Target size={18} color="#4659FF" />
              </div>
              <span className="text-base font-semibold" style={{ color: "#0F172A" }}>成长闯关地图</span>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{ background: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0" }}
              >
                {growthStages.filter(s => s.status === 'done').length}/{growthStages.length} 完成
              </span>
            </div>
            <button
              className="flex items-center gap-0.5 transition-opacity hover:opacity-70 text-sm font-medium"
              style={{ color: "#4659FF" }}
              onClick={() => navigate("/training")}
            >
              全部关卡 <ChevronRight size={16} />
            </button>
          </div>

          {/* Horizontal straight path with stages - Full width */}
          <div className="px-5 pb-6">
            <div className="relative flex items-center justify-between" style={{ height: 160, marginTop: 10 }}>
              {/* Background connecting line - positioned at card center, behind cards */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "92%",
                  height: 4,
                  background: "linear-gradient(90deg, #E0E7FF 0%, #C7D2FE 50%, #E0E7FF 100%)",
                  top: "50%",
                  left: "4%",
                  zIndex: 0,
                  opacity: 0.6,
                  transform: "translateY(-50%)",
                }}
              />

              {/* Stage nodes - Horizontal layout with same top position */}
              {growthStages.map((stage, index) => {
                const isDone = stage.status === "done";
                const isCurrent = stage.status === "current";
                const isLocked = stage.status === "locked";

                return (
                  <div
                    key={stage.id}
                    className="relative z-10 flex flex-col items-center"
                    style={{ flex: 1 }}
                    onClick={() => !isLocked && navigate(isCurrent ? `/training/prep/${stage.id}` : `/training/review/${stage.id}`)}
                  >
                    {/* Pulsing glow for current stage */}
                    {isCurrent && (
                      <div
                        className="absolute"
                        style={{
                          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                          background: "radial-gradient(circle, rgba(70,89,255,0.3) 0%, rgba(70,89,255,0) 70%)",
                          width: 120,
                          height: 120,
                          top: 60,
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 0,
                        }}
                      />
                    )}

                    {/* Stage card - unified size */}
                    <div
                      className="relative z-10 rounded-2xl p-3 transition-all cursor-pointer hover:scale-105"
                      style={{
                        width: 115,
                        height: 150,
                        background: isDone
                          ? "linear-gradient(135deg, #D1FAE5, #A7F3D0)"
                          : isCurrent
                          ? "linear-gradient(135deg, #4659FF, #5c6dff)"
                          : "#F8FAFF",
                        border: isDone
                          ? "1.5px solid #10B981"
                          : isCurrent
                          ? "1.5px solid #fff"
                          : "1.5px solid #E0E7FF",
                        boxShadow: isCurrent
                          ? "0 8px 24px rgba(70,89,255,0.4), 0 0 0 4px rgba(70,89,255,0.15)"
                          : isDone
                          ? "0 4px 12px rgba(16,185,129,0.2)"
                          : "0 2px 8px rgba(70,89,255,0.08)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        paddingTop: 16,
                      }}
                    >
                      {/* Top icon - smaller size with custom icon */}
                      <div
                        className="flex items-center justify-center rounded-lg flex-shrink-0"
                        style={{
                          width: 28,
                          height: 28,
                          background: isDone
                            ? "#10B981"
                            : isCurrent
                            ? "rgba(255,255,255,0.25)"
                            : "#E0E7FF",
                          margin: "0 auto 12px auto",
                        }}
                      >
                        {isDone ? (
                          <span style={{ color: "#fff" }}>{stage.icon}</span>
                        ) : isLocked ? (
                          <Lock size={14} color="#94A3B8" />
                        ) : (
                          <span style={{ color: "#fff" }}>{stage.icon}</span>
                        )}
                      </div>

                      {/* Stage name */}
                      <div
                        className="text-center mb-1 text-xs font-semibold flex-shrink-0"
                        style={{
                          color: isCurrent ? "#fff" : isDone ? "#065F46" : "#0F172A",
                          lineHeight: 1.3,
                        }}
                      >
                        {stage.name}
                      </div>

                      {/* Chapter tag */}
                      <div
                        className="text-center mb-1 text-[10px] font-medium flex-shrink-0"
                        style={{
                          color: isCurrent ? "rgba(255,255,255,0.8)" : isDone ? "#059669" : "#94A3B8",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {stage.chapter}
                      </div>

                      {/* Difficulty stars */}
                      <div className="flex items-center justify-center gap-0.5 flex-shrink-0">
                        {"★".repeat(stage.difficulty).split("").map((_, si) => (
                          <span key={si} style={{ fontSize: 10, color: isCurrent ? "#FCD34D" : isDone ? "#FBBF24" : "#CBD5E1" }}>★</span>
                        ))}
                      </div>

                      {/* Score for completed */}
                      {isDone && stage.score && (
                        <div className="text-center mt-1 flex-shrink-0">
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                            style={{
                              background: "#ECFDF5",
                              color: "#059669",
                            }}
                          >
                            {stage.score} 分
                          </span>
                        </div>
                      )}

                      {/* Current indicator - placeholder to maintain height */}
                      {isCurrent && (
                        <div className="text-center mt-1 flex-shrink-0">
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                            style={{
                              background: "rgba(255,255,255,0.25)",
                              color: "#fff",
                            }}
                          >
                            进行中
                          </span>
                        </div>
                      )}
                      
                      {/* Spacer for locked cards to maintain consistent height */}
                      {isLocked && <div style={{ height: 18 }} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── BOTTOM GRID: LEFT COLUMN (Recent Records + Team Ranking) & RIGHT COLUMN (Ability + Score) ── */}
        <div className="grid grid-cols-12 gap-5">
          {/* Left column: Recent records + Team ranking */}
          <div className="col-span-12 lg:col-span-5 space-y-4">
            {/* Recent records - height aligned with Ability radar */}
            <div className="rounded-2xl p-5 flex flex-col" style={{ background: "#fff", border: "1px solid rgba(70,89,255,0.08)", boxShadow: "0 1px 4px rgba(70,89,255,0.04), 0 4px 16px rgba(70,89,255,0.03)", height: 293 }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-semibold" style={{ color: "#0F172A" }}>最近训练记录</span>
                <button
                  className="flex items-center gap-0.5 transition-opacity hover:opacity-70 text-sm font-medium"
                  style={{ color: "#4659FF" }}
                  onClick={() => navigate("/data")}
                >
                  查看全部 <ChevronRight size={16} />
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                {recentRecords.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-4 rounded-xl cursor-pointer transition-colors hover:bg-[#F8FAFF]"
                    onClick={() => navigate(`/training/review/${i + 1}`)}
                  >
                    <div
                      className="rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ width: 40, height: 40, background: r.passed ? "#ECFDF5" : "#FEF2F2" }}
                    >
                      {r.passed
                        ? <CheckCircle2 size={20} color="#16A34A" />
                        : <Target size={20} color="#DC2626" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: "#0F172A" }}>{r.scene}</div>
                      <div className="text-xs mt-1" style={{ color: "#94A3B8" }}>{r.time} · {r.duration}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <ScorePill score={r.score} />
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{
                          background: r.passed ? "#ECFDF5" : "#FEF2F2",
                          color: r.passed ? "#16A34A" : "#DC2626",
                          border: `1px solid ${r.passed ? "#BBF7D0" : "#FECACA"}`,
                        }}
                      >
                        {r.passed ? "通关" : "未过"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team ranking - height aligned with Score trend */}
            <div className="rounded-2xl p-5 flex flex-col" style={{ background: "#fff", border: "1px solid rgba(70,89,255,0.08)", boxShadow: "0 1px 4px rgba(70,89,255,0.04), 0 4px 16px rgba(70,89,255,0.03)", height: 249 }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy size={16} color="#D97706" />
                  <span className="text-base font-semibold" style={{ color: "#0F172A" }}>团队排名</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                {rankList.map((r) => (
                  <div
                    key={r.rank}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                    style={{
                      background: r.isMe ? "#EFF4FF" : "transparent",
                    }}
                  >
                    <div
                      className="flex items-center justify-center rounded flex-shrink-0"
                      style={{
                        width: 28, height: 28,
                        background:
                          r.rank === 1 ? "linear-gradient(135deg,#FBBF24,#F59E0B)"
                          : r.rank === 2 ? "linear-gradient(135deg,#D1D5DB,#9CA3AF)"
                          : r.rank === 3 ? "linear-gradient(135deg,#D97706,#B45309)"
                          : "#F1F5F9",
                        fontSize: 12,
                        fontWeight: 700,
                        color: r.rank <= 3 ? "#fff" : "#94A3B8",
                      }}
                    >
                      {r.rank <= 3 ? ["🥇","🥈","🥉"][r.rank - 1] : r.rank}
                    </div>
                    <span className="text-sm font-medium" style={{ color: r.isMe ? "#4659FF" : "#0F172A" }}>{r.name}</span>
                    <span className="text-sm font-bold ml-auto" style={{ color: r.isMe ? "#4659FF" : "#1E293B" }}>{r.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Ability radar + Score trend - same width */}
          <div className="col-span-12 lg:col-span-7 space-y-4">
            {/* Ability radar */}
            <div className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid rgba(70,89,255,0.08)", boxShadow: "0 1px 4px rgba(70,89,255,0.04), 0 4px 16px rgba(70,89,255,0.03)" }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-semibold" style={{ color: "#0F172A" }}>能力画像</span>
                <button
                  className="flex items-center gap-0.5 transition-opacity hover:opacity-70 text-sm font-medium"
                  style={{ color: "#4659FF" }}
                  onClick={() => navigate("/ability")}
                >
                  详情 <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="flex items-center gap-6">
                <ResponsiveContainer width="50%" height={200}>
                  <RadarChart data={radarData} margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
                    <PolarGrid stroke="#E0E7FF" strokeWidth={1.5} />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "#64748B", fontWeight: 500 }} />
                    <Radar name="能力" dataKey="A" stroke="#4659FF" fill="#4659FF" fillOpacity={0.15} strokeWidth={2.5} />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  {radarData.map((d) => (
                    <div key={d.subject} className="text-center rounded-xl py-3" style={{ background: "#F8FAFF" }}>
                      <div className="text-lg font-bold" style={{ color: d.A < 70 ? "#DC2626" : "#4659FF" }}>{d.A}</div>
                      <div className="text-sm mt-1" style={{ color: "#94A3B8" }}>{d.subject}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Score trend - full width of right column */}
            <div className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid rgba(70,89,255,0.08)", boxShadow: "0 1px 4px rgba(70,89,255,0.04), 0 4px 16px rgba(70,89,255,0.03)" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-semibold" style={{ color: "#0F172A" }}>近 7 天得分</span>
                <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#059669" }}>
                  <TrendingUp size={16} />+8.3%
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={trendData} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4659FF" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#4659FF" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickCount={6} ticks={[0, 20, 40, 60, 80, 100]} />
                  <Tooltip
                    contentStyle={{ background: "#fff", border: "1px solid #E0E7FF", borderRadius: 10, fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                    formatter={(v) => [`${v}分`, "得分"]}
                  />
                  <Area type="monotone" dataKey="score" stroke="#4659FF" strokeWidth={2.5} fill="url(#scoreGrad)" dot={{ fill: "#4659FF", r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: "#4659FF" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes for pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
