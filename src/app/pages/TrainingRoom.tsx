import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Pause,
  RotateCcw,
  Send,
  Mic,
  MicOff,
  Zap,
  AlertTriangle,
  Clock,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Brain,
  Target,
  Heart,
  Trophy,
  Shield,
  X,
  Lightbulb,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const INITIAL_MESSAGES = [
  {
    id: 1,
    from: "ai",
    content:
      "您好，我之前在这里存了 50 万，快到期了。我想问问现在有没有什么好的理财产品，收益能比存款高一些的？",
    time: "00:10",
  },
];

const aiResponses = [
  "哦，听起来不错，但是风险呢？我之前买过一次理财，亏了不少，现在对这些东西有点怕。",
  "年化 3.8%？感觉也不是很高啊，余额宝都有 2.5% 了。有没有收益更高一点的？",
  "这些产品具体怎么运作的？你能保证这个收益吗？",
  "嗯，我再想想吧，我家里还有事，下次再来？",
  "那你说的这个产品最近有没有亏过？能不能稳赚的？",
];

const quickPhrases = [
  "非常理解您的顾虑，风险控制确实非常重要...",
  "根据您的情况，我建议您考虑低风险产品...",
  "这款产品的历史业绩表现稳健，但收益并不保证...",
  "我来为您详细介绍一下产品的风险等级...",
];

const coachTips = [
  "💡 客户提到过去的亏损经历，建议先共情再推产品",
  "📋 记得向客户完整说明产品风险等级",
  "⚡ 可尝试开放式提问了解更多需求",
  "🎯 把握到期存款金额，适机提出解决方案",
];

const scoreDims = [
  { name: "沟通表达", score: 85, fullMark: 100 },
  { name: "需求挖掘", score: 72, fullMark: 100 },
  { name: "产品知识", score: 88, fullMark: 100 },
  { name: "情绪管理", score: 90, fullMark: 100 },
  { name: "成交技巧", score: 65, fullMark: 100 },
  { name: "合规意识", score: 92, fullMark: 100 },
];

function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      if (ref.current) clearInterval(ref.current);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return { time: fmt(seconds), running, setRunning };
}

export function TrainingRoom() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { time, running, setRunning } = useTimer();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [showCoach, setShowCoach] = useState(true);
  const [coachExpanded, setCoachExpanded] = useState(true);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [complianceAlert, setComplianceAlert] = useState<string | null>(null);
  const [currentTip, setCurrentTip] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const aiResIdx = useRef(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const msg = text || inputText.trim();
    if (!msg) return;

    const userMsg = { id: Date.now(), from: "user" as const, content: msg, time };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Check compliance
    if (msg.includes("保证") || msg.includes("稳赚") || msg.includes("绝对")) {
      setComplianceAlert("⚠️ 检测到违规词汇：禁止使用\"保证\"等承诺词语");
      setTimeout(() => setComplianceAlert(null), 3000);
    }

    setAiThinking(true);
    setCurrentTip((prev) => (prev + 1) % coachTips.length);

    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        from: "ai" as const,
        content: aiResponses[aiResIdx.current % aiResponses.length],
        time,
      };
      aiResIdx.current++;
      setMessages((prev) => [...prev, aiMsg]);
      setAiThinking(false);
    }, 1500 + Math.random() * 800);
  };

  const customerMood = Math.min(100, 65 + messages.filter((m) => m.from === "user").length * 3);
  const satisfaction = Math.min(100, 50 + messages.filter((m) => m.from === "user").length * 5);

  return (
    <div className="flex h-full overflow-hidden" style={{ background: "#F0F4FA" }}>
      {/* Main training area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ background: "#fff", borderBottom: "1px solid rgba(43,110,251,0.08)" }}
        >
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm font-semibold" style={{ color: "#1A2035" }}>存款客户深度需求挖掘</div>
              <div className="text-xs" style={{ color: "#94A3B8" }}>需求挖掘 · 挑战难度</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: "#F0F4FA", border: "1px solid #E0E8F7" }}
            >
              <Clock size={14} color={running ? "#2B6EFB" : "#94A3B8"} />
              <span className="font-mono text-sm font-bold" style={{ color: running ? "#2B6EFB" : "#94A3B8" }}>{time}</span>
            </div>

            <button
              onClick={() => setRunning(!running)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm transition-all hover:opacity-80"
              style={{ background: "#F0F4FA", border: "1px solid #E0E8F7", color: "#64748B" }}
            >
              <Pause size={14} />
              {running ? "暂停" : "继续"}
            </button>

            <button
              onClick={() => { setMessages(INITIAL_MESSAGES); aiResIdx.current = 0; }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm transition-all hover:opacity-80"
              style={{ background: "#F0F4FA", border: "1px solid #E0E8F7", color: "#64748B" }}
            >
              <RotateCcw size={14} />
              重新作答
            </button>

            <button
              onClick={() => setShowEndConfirm(true)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #2B6EFB, #5B8BFF)", color: "#fff" }}
            >
              结束训练
            </button>
          </div>
        </div>

        {/* Compliance alert */}
        {complianceAlert && (
          <div
            className="flex items-center gap-3 px-5 py-3"
            style={{ background: "#FFF3F0", borderBottom: "1px solid #FFD0CC" }}
          >
            <AlertTriangle size={16} color="#FF4D4F" />
            <span className="text-sm flex-1" style={{ color: "#CF1322" }}>{complianceAlert}</span>
            <button onClick={() => setComplianceAlert(null)}>
              <X size={14} color="#94A3B8" />
            </button>
          </div>
        )}

        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Chat area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Customer info strip */}
            <div
              className="flex items-center gap-6 px-5 py-3 flex-shrink-0"
              style={{ background: "#F8FAFF", borderBottom: "1px solid #E8F0FF" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ width: 40, height: 40, background: "linear-gradient(135deg, #3B82F6, #2563EB)" }}
                >
                  <span className="text-white font-bold">陈</span>
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "#1A2035" }}>陈女士 · 企业主</div>
                </div>
              </div>

              {/* Aligned mood and satisfaction */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: "#64748B", width: 36 }}>情绪</span>
                  <div className="rounded-full overflow-hidden" style={{ width: 80, height: 6, background: "#E2E8F0" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${customerMood}%`, background: "linear-gradient(90deg, #F59E0B, #10B981)" }} />
                  </div>
                  <span className="text-xs font-medium" style={{ color: "#10B981", width: 32 }}>{customerMood}%</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: "#64748B", width: 36 }}>满意度</span>
                  <div className="rounded-full overflow-hidden" style={{ width: 80, height: 6, background: "#E2E8F0" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${satisfaction}%`, background: "linear-gradient(90deg, #2B6EFB, #10B981)" }} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: "#2B6EFB", width: 32 }}>{satisfaction}%</span>
                </div>
              </div>

              <div className="flex gap-2 ml-auto">
                {["理性分析型", "略显谨慎", "重视安全感"].map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#F1F5F9", color: "#64748B", border: "1px solid #E2E8F0" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.from === "ai" ? (
                    <div
                      className="rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{ width: 36, height: 36, background: "linear-gradient(135deg, #3B82F6, #2563EB)" }}
                    >
                      <span className="text-white text-sm font-bold">陈</span>
                    </div>
                  ) : (
                    <div
                      className="rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{ width: 36, height: 36, background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}
                    >
                      <span className="text-white text-sm font-bold">我</span>
                    </div>
                  )}
                  <div className={`max-w-[65%] ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div
                      className="rounded-2xl px-4 py-3 text-sm leading-relaxed"
                      style={{
                        background: msg.from === "ai" ? "#fff" : "linear-gradient(135deg, #2B6EFB, #5B8BFF)",
                        color: msg.from === "ai" ? "#334155" : "#fff",
                        border: msg.from === "ai" ? "1px solid #E8F0FF" : "none",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      }}
                    >
                      {msg.content}
                    </div>
                    <span className="text-xs" style={{ color: "#94A3B8" }}>{msg.time}</span>
                  </div>
                </div>
              ))}

              {aiThinking && (
                <div className="flex gap-3">
                  <div
                    className="rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ width: 36, height: 36, background: "linear-gradient(135deg, #3B82F6, #2563EB)" }}
                  >
                    <span className="text-white text-sm font-bold">陈</span>
                  </div>
                  <div
                    className="rounded-2xl px-4 py-3 flex items-center gap-1"
                    style={{ background: "#fff", border: "1px solid #E8F0FF" }}
                  >
                    {[0, 0.2, 0.4].map((d, i) => (
                      <div
                        key={i}
                        className="rounded-full animate-bounce"
                        style={{ width: 6, height: 6, background: "#A0AECB", animationDelay: `${d}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick phrases */}
            <div className="px-5 py-2 overflow-x-auto flex-shrink-0" style={{ borderTop: "1px solid #E8F0FF" }}>
              <div className="flex gap-2">
                {quickPhrases.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(p)}
                    className="flex-shrink-0 text-xs px-3 py-2 rounded-xl transition-all hover:opacity-80 whitespace-nowrap max-w-48 truncate"
                    style={{ background: "#EFF4FF", color: "#2B6EFB", border: "1px solid #BAD0FF" }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Input area */}
            <div
              className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
              style={{ background: "#fff", borderTop: "1px solid #E8F0FF" }}
            >
              <button
                onClick={() => setIsRecording(!isRecording)}
                className="flex items-center justify-center rounded-xl transition-all hover:opacity-80 flex-shrink-0"
                style={{
                  width: 44,
                  height: 44,
                  background: isRecording ? "#FF4D4F" : "#EFF4FF",
                  border: `1px solid ${isRecording ? "#FF4D4F" : "#BAD0FF"}`,
                }}
              >
                {isRecording ? <MicOff size={18} color="#fff" /> : <Mic size={18} color="#2B6EFB" />}
              </button>

              <div
                className="flex-1 flex items-center rounded-xl px-4 py-2.5"
                style={{ background: "#F8FAFF", border: "1px solid #E0E8F7" }}
              >
                <input
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                  style={{ color: "#334155" }}
                  placeholder="输入你的回答..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                />
              </div>

              <button
                onClick={() => sendMessage()}
                disabled={!inputText.trim()}
                className="flex items-center justify-center rounded-xl transition-all hover:opacity-90 flex-shrink-0 disabled:opacity-40"
                style={{
                  width: 44,
                  height: 44,
                  background: "linear-gradient(135deg, #2B6EFB, #5B8BFF)",
                }}
              >
                <Send size={18} color="#fff" />
              </button>
            </div>
          </div>

          {/* Right panel */}
          <div
            className="flex-shrink-0 flex flex-col overflow-hidden"
            style={{ width: 280, borderLeft: "1px solid rgba(43,110,251,0.08)", background: "#F8FAFF" }}
          >
            {/* Real-time scores - Radar Chart */}
            <div className="p-4 flex-shrink-0" style={{ borderBottom: "1px solid #E8F0FF" }}>
              <div className="text-sm font-semibold mb-3" style={{ color: "#1A2035" }}>实时评分</div>
              
              {/* Radar Chart */}
              <div style={{ width: "100%", height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={scoreDims}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis
                      dataKey="name"
                      tick={{ fill: "#64748B", fontSize: 10 }}
                    />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="当前得分"
                      dataKey="score"
                      stroke="#2B6EFB"
                      strokeWidth={2}
                      fill="#2B6EFB"
                      fillOpacity={0.2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Overall */}
              <div
                className="mt-2 p-3 rounded-xl text-center"
                style={{ background: "linear-gradient(135deg, #EFF4FF, #E8F0FF)", border: "1px solid #BAD0FF" }}
              >
                <div className="text-xs mb-1" style={{ color: "#64748B" }}>当前综合评分</div>
                <div className="text-2xl font-bold" style={{ color: "#2B6EFB" }}>
                  {Math.round(scoreDims.reduce((a, d) => a + d.score, 0) / scoreDims.length)}
                </div>
              </div>
            </div>

            {/* AI Coach */}
            <div className="flex-1 overflow-y-auto p-4">
              <button
                className="flex items-center justify-between w-full mb-3"
                onClick={() => setCoachExpanded(!coachExpanded)}
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-lg flex items-center justify-center" style={{ width: 24, height: 24, background: "#EFF4FF" }}>
                    <Zap size={13} color="#2B6EFB" />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "#1A2035" }}>AI 教练建议</span>
                </div>
                {coachExpanded ? <ChevronUp size={14} color="#94A3B8" /> : <ChevronDown size={14} color="#94A3B8" />}
              </button>

              {coachExpanded && (
                <div className="space-y-2">
                  <div
                    className="p-3 rounded-xl"
                    style={{ background: "#EFF4FF", border: "1px solid #BAD0FF" }}
                  >
                    <div className="flex items-start gap-2">
                      <Lightbulb size={13} color="#2B6EFB" className="flex-shrink-0 mt-0.5" />
                      <p className="text-xs leading-relaxed" style={{ color: "#1A3472" }}>
                        {coachTips[currentTip]}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs font-medium mb-2 mt-3" style={{ color: "#64748B" }}>流程指引</div>
                  {[
                    { step: 1, text: "建立信任与亲切感", done: true },
                    { step: 2, text: "了解背景与资金情况", done: true },
                    { step: 3, text: "挖掘痛点与目标需求", done: false, current: true },
                    { step: 4, text: "匹配推荐产品方案", done: false },
                    { step: 5, text: "处理异议并促成", done: false },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-2 py-1.5">
                      <div
                        className="rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{
                          width: 20,
                          height: 20,
                          background: s.done ? "#10B981" : s.current ? "#2B6EFB" : "#E2E8F0",
                        }}
                      >
                        <span className="text-xs font-bold" style={{ color: s.done || s.current ? "#fff" : "#94A3B8" }}>
                          {s.step}
                        </span>
                      </div>
                      <span
                        className="text-xs"
                        style={{ color: s.done ? "#10B981" : s.current ? "#2B6EFB" : "#94A3B8" }}
                      >
                        {s.text}
                      </span>
                      {s.current && (
                        <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full" style={{ background: "#EFF4FF", color: "#2B6EFB" }}>
                          进行中
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Compliance reminder */}
              <div className="mt-4">
                <div className="text-xs font-medium mb-2" style={{ color: "#64748B" }}>合规提示</div>
                <div className="p-3 rounded-xl" style={{ background: "#FFF3F0", border: "1px solid #FFD0CC" }}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={12} color="#FF4D4F" className="flex-shrink-0 mt-0.5" />
                    <div className="text-xs leading-relaxed" style={{ color: "#CF1322" }}>
                      客户询问是否保证收益，请注意合规表达，不得使用承诺性语言。
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End confirm modal */}
      {showEndConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
          <div className="rounded-2xl p-8 max-w-sm w-full mx-4" style={{ background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-2xl flex items-center justify-center" style={{ width: 64, height: 64, background: "#EFF4FF" }}>
                  <Trophy size={28} color="#2B6EFB" />
                </div>
              </div>
              <h3 className="font-bold mb-2" style={{ color: "#1A2035" }}>确认结束训练？</h3>
              <p className="text-sm" style={{ color: "#64748B" }}>结束后将进入训练复盘，查看详细得分与改进建议</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEndConfirm(false)}
                className="flex-1 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                style={{ background: "#F0F4FA", color: "#64748B" }}
              >
                继续训练
              </button>
              <button
                onClick={() => navigate(`/training/review/${id}`)}
                className="flex-1 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #2B6EFB, #5B8BFF)", color: "#fff" }}
              >
                结束并复盘
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
