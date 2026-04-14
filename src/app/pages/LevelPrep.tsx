import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ChevronLeft,
  Star,
  Clock,
  Target,
  MessageSquare,
  Mic,
  Phone,
  Briefcase,
  TrendingUp,
  Swords,
  Lightbulb,
  CheckCircle2,
  Info,
} from "lucide-react";

const levelData = {
  chapter: "需求挖掘",
  title: "存款客户深度需求挖掘",
  difficulty: 3,
  duration: "15 min",
  objectives: [
    "运用 SPIN 提问法挖掘客户潜在需求",
    "识别客户财富管理痛点与目标",
    "完成产品匹配与初步方案建议",
    "全程保持合规表达，无违禁话术",
  ],
  passScore: 70,
  customer: {
    name: "陈美玲",
    avatar: "陈",
    level: 3,
    age: 45,
    job: "企业主",
    assets: "50万",
    demand: "寻求比存款更高收益但风险可控的理财方式，同时考虑养老金准备",
    personality: "理性分析型、略显谨慎、重视安全感",
  },
  player: {
    name: "张晓明",
    avatar: "张",
    exp: 650,
    expTotal: 1000,
    level: 8,
    title: "资深客户经理",
    advice: "该客户偏保守，重点强调风险控制，避免激进推销",
  },
};

const modeOptions = [
  {
    id: "text",
    icon: <MessageSquare size={16} />,
    title: "文字",
    recommended: false,
    desc: "纯文本对话训练，适合打磨话术逻辑、规避合规红线。",
  },
  {
    id: "voice",
    icon: <Mic size={16} />,
    title: "语音",
    recommended: true,
    desc: "实时语音交互，模拟面对面沟通，练习语气与节奏把控。",
  },
  {
    id: "hotline",
    icon: <Phone size={16} />,
    title: "热线",
    recommended: false,
    desc: "还原真实电话场景，训练无视觉辅助下的表达与客户感知能力。",
  },
];

function StarLevel({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          fill={s <= level ? "#FACC15" : "transparent"}
          color={s <= level ? "#FACC15" : "#E2E8F0"}
        />
      ))}
    </div>
  );
}

export function LevelPrep() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedMode, setSelectedMode] = useState("voice");
  const [showStamp, setShowStamp] = useState(false);
  const c = levelData.customer;
  const p = levelData.player;

  const currentMode = modeOptions.find((m) => m.id === selectedMode);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStamp(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 w-full">
      <button
        onClick={() => navigate("/training")}
        className="flex items-center gap-2 mb-5 text-sm hover:opacity-70 transition-opacity"
        style={{ color: "#64748B" }}
      >
        <ChevronLeft size={16} />
        返回关卡列表
      </button>

      <div
        className="rounded-2xl p-6 mb-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(130deg, #1a3fc7 0%, #2563EB 55%, #3B82F6 100%)",
          boxShadow: "0 8px 32px rgba(37,99,235,0.25)",
        }}
      >
        <div className="absolute top-0 right-0 rounded-full opacity-10" style={{ width: 240, height: 240, background: "#5B8BFF", transform: "translate(60px, -80px)" }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)" }}>
              {levelData.chapter}
            </span>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>/</span>
            <span className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
              需求挖掘
            </span>
          </div>
          <h1 className="text-xl font-bold text-white mb-3">{levelData.title}</h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((s) => (
                <Star key={s} size={14} fill={s <= levelData.difficulty ? "#FFD700" : "transparent"} color={s <= levelData.difficulty ? "#FFD700" : "rgba(255,255,255,0.3)"} />
              ))}
              <span className="text-sm ml-1" style={{ color: "rgba(255,255,255,0.8)" }}>挑战难度</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} color="rgba(255,255,255,0.6)" />
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>预计 {levelData.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Target size={13} color="rgba(255,255,255,0.6)" />
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>通关分数 ≥ {levelData.passScore}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="rounded-3xl overflow-hidden mb-5"
        style={{
          background: "#fff",
          border: "1px solid #E2E8F0",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <div
          className="px-6 py-4 flex items-center justify-center gap-4"
          style={{
            background: "linear-gradient(90deg, #DBEAFE 0%, #BFDBFE 50%, #DBEAFE 100%)",
            borderBottom: "1px solid #BFDBFE",
          }}
        >
          <Swords size={18} color="#3B82F6" />
          <span className="text-lg font-bold tracking-wide" style={{ color: "#2563EB" }}>
            对战准备
          </span>
          <Swords size={18} color="#3B82F6" style={{ transform: "scaleX(-1)" }} />
        </div>

        <div className="p-6">
          <div className="flex items-stretch justify-between gap-4">
            <div className="flex-1">
              <div
                className="rounded-2xl p-5 relative h-full flex flex-col"
                style={{
                  background: "linear-gradient(135deg, #EFF4FF 0%, #DBEAFE 100%)",
                  border: "1px solid #BFDBFE",
                }}
              >
                <div
                  className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ background: "#BFDBFE", color: "#1E40AF" }}
                >
                  我方
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div
                    className="rounded-2xl flex items-center justify-center relative flex-shrink-0"
                    style={{
                      width: 64,
                      height: 64,
                      background: "linear-gradient(135deg, #60A5FA, #3B82F6)",
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#fff",
                      border: "2px solid #fff",
                      boxShadow: "0 2px 8px rgba(59,130,246,0.2)",
                    }}
                  >
                    {p.avatar}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-semibold" style={{ color: "#1E40AF" }}>{p.name}</span>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ background: "#BFDBFE", color: "#1E40AF" }}
                      >
                        Lv.{p.level}
                      </span>
                    </div>
                    <div className="text-sm mb-2" style={{ color: "#3B82F6" }}>{p.title}</div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 rounded-full overflow-hidden" style={{ height: 6, background: "#BFDBFE" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(p.exp / p.expTotal) * 100}%`, background: "linear-gradient(90deg, #FCD34D, #FBBF24)" }}
                        />
                      </div>
                      <span className="text-xs font-medium" style={{ color: "#B45309" }}>{p.exp}/{p.expTotal}</span>
                    </div>
                  </div>
                </div>

                <div
                  className="mt-4 rounded-lg p-3 flex items-start gap-2 flex-grow"
                  style={{ background: "#fff", border: "1px solid #BFDBFE" }}
                >
                  <Lightbulb size={14} color="#3B82F6" className="flex-shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed" style={{ color: "#475569" }}>{p.advice}</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                  border: "2px solid #fff",
                  boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
                  animation: showStamp ? "vsPulse 0.6s ease-out" : "none",
                }}
              >
                <span className="text-lg font-bold text-white">VS</span>
              </div>
            </div>

            <div className="flex-1">
              <div
                className="rounded-2xl p-5 relative h-full flex flex-col"
                style={{
                  background: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
                  border: "1px solid #8B5CF6",
                }}
              >
                <div
                  className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ background: "rgba(255,255,255,0.3)", color: "#fff" }}
                >
                  客户
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div
                    className="rounded-2xl flex items-center justify-center relative flex-shrink-0"
                    style={{
                      width: 64,
                      height: 64,
                      background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#fff",
                      border: "2px solid #fff",
                      boxShadow: "0 2px 8px rgba(139,92,246,0.3)",
                    }}
                  >
                    {c.avatar}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-semibold text-white">{c.name}</span>
                      <span className="text-sm text-white/80">{c.age}岁</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <StarLevel level={c.level} />
                      <span className="text-xs text-white/70">VIP</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Briefcase size={12} color="rgba(255,255,255,0.7)" />
                        <span className="text-xs text-white/80">{c.job}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp size={12} color="rgba(255,255,255,0.7)" />
                        <span className="text-xs text-white/80">{c.assets}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 flex-grow">
                  <div
                    className="rounded-lg p-2.5 flex items-start gap-2"
                    style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
                  >
                    <Target size={12} color="rgba(255,255,255,0.8)" className="flex-shrink-0 mt-0.5" />
                    <span className="text-xs leading-relaxed text-white/90">{c.demand}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/60">性格:</span>
                    <span className="text-xs text-white/80">{c.personality}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="rounded-2xl p-6 mb-5"
        style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
      >
        <div className="mb-6">
          <h3 className="font-semibold mb-4" style={{ color: "#1A2035", fontSize: 14 }}>训练目标</h3>
          <div className="grid grid-cols-2 gap-3">
            {levelData.objectives.map((o, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="rounded-full flex-shrink-0 mt-0.5" style={{ width: 18, height: 18, background: "#EFF4FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckCircle2 size={12} color="#2563EB" />
                </div>
                <span className="text-sm leading-relaxed" style={{ color: "#334155" }}>{o}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 mb-6"></div>

        <div>
          <h3 className="font-semibold mb-4" style={{ color: "#1A2035", fontSize: 14 }}>选择训练模式</h3>
          <div className="flex items-center gap-3">
            {modeOptions.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMode(m.id)}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all flex-1"
                style={{
                  border: `1.5px solid ${selectedMode === m.id ? "#2563EB" : "#E0E8F7"}`,
                  background: selectedMode === m.id ? "#EFF4FF" : "#F8FAFF",
                }}
              >
                {m.recommended && selectedMode !== m.id && (
                  <span
                    className="absolute -top-2 -right-1 text-xs px-1.5 py-0.5 rounded-full"
                    style={{ background: "#2563EB", color: "#fff", fontSize: 9, fontWeight: 700 }}
                  >
                    荐
                  </span>
                )}
                <span style={{ color: selectedMode === m.id ? "#2563EB" : "#94A3B8" }}>{m.icon}</span>
                <div style={{ fontSize: 14, fontWeight: 600, color: selectedMode === m.id ? "#2563EB" : "#334155" }}>{m.title}</div>
              </button>
            ))}
          </div>
          <div className="rounded-lg px-4 py-3 flex items-start gap-3 mt-4" style={{ background: "#EFF4FF", border: "1px solid #BFDBFE" }}>
            <Info size={16} color="#2563EB" className="flex-shrink-0 mt-0.5" />
            <span style={{ fontSize: 13, color: "#1E40AF", lineHeight: 1.6 }}>
              {currentMode?.desc}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate("/training")}
          className="flex-1 py-3.5 rounded-xl font-medium text-sm transition-all hover:shadow-md"
          style={{ background: "#fff", color: "#64748B", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
        >
          返回关卡列表
        </button>
        <button
          onClick={() => navigate(`/training/room/${id}`)}
          className="flex-2 px-10 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #1d4ed8, #3B82F6)",
            color: "#fff",
            flex: 2,
            boxShadow: "0 4px 16px rgba(37,99,235,0.4)",
          }}
        >
          <Swords size={16} />
          开始对战
        </button>
      </div>

      <style>{`
        @keyframes vsPulse {
          0% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(0.95);
          }
          75% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
