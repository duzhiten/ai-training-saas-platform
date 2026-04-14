import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  BookOpen,
  Search,
  MessageSquare,
  Send,
  Bookmark,
  Star,
  Clock,
  ChevronRight,
  FileText,
  Video,
  Headphones,
  Zap,
  CheckCircle2,
  PenLine,
  Folder,
  Filter,
} from "lucide-react";

const categories = ["全部", "话术技巧", "产品知识", "合规要求", "需求挖掘", "成交方法"];

const resources = [
  { id: 1, type: "video", title: "SPIN 销售提问法完全指南", category: "需求挖掘", duration: "28min", views: 1240, rating: 4.8, bookmarked: true, tag: "弱项推荐" },
  { id: 2, type: "article", title: "理财产品合规话术标准手册", category: "合规要求", duration: "15min", views: 980, rating: 4.6, bookmarked: false, tag: "合规必学" },
  { id: 3, type: "audio", title: "顶级客户经理销售录音精讲", category: "话术技巧", duration: "42min", views: 756, rating: 4.9, bookmarked: true, tag: "专家经验" },
  { id: 4, type: "article", title: "开口成交的 7 个关键时机", category: "成交方法", duration: "10min", views: 1560, rating: 4.7, bookmarked: false, tag: "弱项推荐" },
  { id: 5, type: "video", title: "基金产品全系列讲解", category: "产品知识", duration: "35min", views: 620, rating: 4.5, bookmarked: false, tag: "" },
  { id: 6, type: "article", title: "客户异议处理百科话术库", category: "话术技巧", duration: "20min", views: 890, rating: 4.6, bookmarked: true, tag: "" },
];

const phraseCategories = [
  {
    name: "标准话术库",
    color: "#2B6EFB",
    bg: "#EFF4FF",
    count: 248,
    examples: ["您好，我来为您介绍一下这款产品...", "根据您的风险偏好，我推荐...", "非常理解您的顾虑，这款产品..."],
  },
  {
    name: "禁用话术库",
    color: "#FF4D4F",
    bg: "#FFF3F0",
    count: 67,
    examples: ["这个产品绝对稳赚不赔...", "保证年化收益 8%...", "现在不买以后没有机会了..."],
  },
];

const chatHistory = [
  { from: "user", content: "基金定投有什么优势？" },
  {
    from: "ai",
    content:
      "基金定投（定期定额投资）的主要优势包括：\n1. **降低投资门槛**：每月小额即可参与\n2. **平滑成本**：通过时间分散降低市场波动风险（摊薄成本法）\n3. **强制储蓄**：养成长期投资习惯\n4. **适合普通投资者**：不需要择时，减少情绪化决策\n\n注意：定投同样存在市场风险，需向客户充分揭示，不得承诺收益。",
  },
];

const typeIcons: Record<string, React.ReactNode> = {
  video: <Video size={14} />,
  article: <FileText size={14} />,
  audio: <Headphones size={14} />,
};

const typeColors: Record<string, string> = {
  video: "#A855F7",
  article: "#2B6EFB",
  audio: "#10B981",
};

const notes = [
  { title: "SPIN 提问法学习笔记", date: "2026-04-12", excerpt: "S-背景问题，P-难点问题，I-暗示问题，N-需求回报问题..." },
  { title: "成交话术总结", date: "2026-04-10", excerpt: "开口成交的时机：客户主动询问价格、频繁点头认同时..." },
];

export function LearningCenter() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"resources" | "phrases" | "qa" | "notes">("resources");
  const [activeCategory, setActiveCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [qaInput, setQaInput] = useState("");
  const [qaMessages, setQaMessages] = useState(chatHistory);
  const [qaLoading, setQaLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const filteredResources = resources.filter((r) => {
    if (activeCategory !== "全部" && r.category !== activeCategory) return false;
    if (searchQuery && !r.title.includes(searchQuery)) return false;
    return true;
  });

  const sendQA = () => {
    if (!qaInput.trim()) return;
    const userMsg = { from: "user", content: qaInput };
    setQaMessages((prev) => [...prev, userMsg]);
    setQaInput("");
    setQaLoading(true);
    setTimeout(() => {
      setQaMessages((prev) => [
        ...prev,
        {
          from: "ai",
          content:
            "根据您的问题，这里有几点专业建议：\n\n1. 在与客户沟通时，建议先了解客户的基本情况和风险承受能力\n2. 产品推荐应基于客户实际需求，避免主观销售\n3. 全程保持合规意识，重要提示必须完整告知\n\n如需了解更多，可以参考学习中心的相关课程资料。",
        },
      ]);
      setQaLoading(false);
    }, 1500);
  };

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "#1A2035" }}>学习中心</h1>
          <p className="text-sm" style={{ color: "#94A3B8" }}>专业知识库 · 话术参考 · AI 智能问答</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {[
          { id: "resources", label: "学习资料", icon: <BookOpen size={14} /> },
          { id: "phrases", label: "话术库", icon: <MessageSquare size={14} /> },
          { id: "qa", label: "AI 问答", icon: <Zap size={14} /> },
          { id: "notes", label: "学习笔记", icon: <PenLine size={14} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex-shrink-0"
            style={{
              background: activeTab === tab.id ? "linear-gradient(135deg, #2B6EFB, #5B8BFF)" : "#fff",
              color: activeTab === tab.id ? "#fff" : "#64748B",
              border: `1px solid ${activeTab === tab.id ? "transparent" : "#E0E8F7"}`,
            }}
          >
            <span style={{ color: activeTab === tab.id ? "#fff" : "#94A3B8" }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "resources" && (
        <div>
          {/* Weak-point recommendation banner */}
          <div
            className="rounded-2xl p-4 mb-5 flex items-center gap-4"
            style={{ background: "linear-gradient(135deg, #EFF4FF, #E8F0FF)", border: "1px solid #BAD0FF" }}
          >
            <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: 44, height: 44, background: "#2B6EFB" }}>
              <Zap size={20} color="#fff" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm mb-0.5" style={{ color: "#1A2035" }}>基于弱项推荐 · 成交技巧 + 需求挖掘</div>
              <div className="text-xs" style={{ color: "#64748B" }}>AI 根据您的训练数据，为您推荐以下 6 个学习资源，优先提升弱项能力</div>
            </div>
            <ChevronRight size={16} color="#2B6EFB" />
          </div>

          {/* Search and filter */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div
              className="flex items-center gap-2 rounded-xl px-4 py-2 flex-1 min-w-48"
              style={{ background: "#fff", border: "1px solid #E0E8F7" }}
            >
              <Search size={15} color="#A0AECB" />
              <input
                placeholder="搜索学习资料..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm flex-1"
                style={{ color: "#334155" }}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex-shrink-0"
                  style={{
                    background: activeCategory === c ? "#2B6EFB" : "#fff",
                    color: activeCategory === c ? "#fff" : "#64748B",
                    border: `1px solid ${activeCategory === c ? "#2B6EFB" : "#E0E8F7"}`,
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Resource cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredResources.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl p-5 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-lg flex items-center justify-center"
                      style={{ width: 32, height: 32, background: `${typeColors[r.type]}15` }}
                    >
                      <span style={{ color: typeColors[r.type] }}>{typeIcons[r.type]}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#F0F4FA", color: "#64748B" }}>{r.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {r.tag && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: r.tag.includes("弱项") ? "#FFF3F0" : r.tag.includes("合规") ? "#FFFBEB" : "#FAF5FF",
                          color: r.tag.includes("弱项") ? "#FF4D4F" : r.tag.includes("合规") ? "#D97706" : "#A855F7",
                        }}
                      >
                        {r.tag}
                      </span>
                    )}
                    <button onClick={(e) => e.stopPropagation()}>
                      <Bookmark size={15} fill={r.bookmarked ? "#2B6EFB" : "transparent"} color="#2B6EFB" />
                    </button>
                  </div>
                </div>

                <h4 className="text-sm font-semibold mb-3" style={{ color: "#1A2035" }}>{r.title}</h4>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs flex items-center gap-1" style={{ color: "#94A3B8" }}>
                      <Clock size={11} /> {r.duration}
                    </span>
                    <span className="text-xs" style={{ color: "#94A3B8" }}>{r.views} 次学习</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={11} fill="#FFD700" color="#FFD700" />
                    <span className="text-xs font-medium" style={{ color: "#D97706" }}>{r.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "phrases" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {phraseCategories.map((pc, i) => (
            <div
              key={i}
              className="rounded-2xl p-5"
              style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl flex items-center justify-center" style={{ width: 40, height: 40, background: pc.bg }}>
                    <MessageSquare size={18} color={pc.color} />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: "#1A2035" }}>{pc.name}</div>
                    <div className="text-xs" style={{ color: "#94A3B8" }}>{pc.count} 条话术</div>
                  </div>
                </div>
                <button className="text-xs px-3 py-1.5 rounded-lg" style={{ background: pc.bg, color: pc.color }}>
                  查看全部
                </button>
              </div>
              <div className="space-y-2">
                {pc.examples.map((ex, j) => (
                  <div
                    key={j}
                    className="p-3 rounded-xl text-sm"
                    style={{
                      background: i === 0 ? "#F8FAFF" : "#FFF8F8",
                      border: `1px solid ${i === 0 ? "#E8F0FF" : "#FFE8E8"}`,
                      color: "#334155",
                    }}
                  >
                    {i === 1 && <span className="text-xs font-medium mr-2" style={{ color: "#FF4D4F" }}>❌</span>}
                    {i === 0 && <span className="text-xs font-medium mr-2" style={{ color: "#10B981" }}>✅</span>}
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div
            className="col-span-1 md:col-span-2 rounded-2xl p-5"
            style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Folder size={16} color="#A855F7" />
              <h3 className="font-semibold" style={{ color: "#1A2035" }}>优秀案例库 & 专家经验库</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { title: "月冠军对话录音", type: "audio", color: "#10B981", bg: "#ECFDF5" },
                { title: "高净值客户经典案例", type: "video", color: "#A855F7", bg: "#FAF5FF" },
                { title: "复杂异议处理全程", type: "audio", color: "#2B6EFB", bg: "#EFF4FF" },
                { title: "资深经理经验分享", type: "video", color: "#F59E0B", bg: "#FFFBEB" },
              ].map((item, j) => (
                <div
                  key={j}
                  className="p-4 rounded-xl cursor-pointer transition-all hover:shadow-md text-center"
                  style={{ background: item.bg, border: "1px solid rgba(0,0,0,0.04)" }}
                >
                  <div className="text-2xl mb-2">{item.type === "audio" ? "🎵" : "🎬"}</div>
                  <div className="text-sm font-medium" style={{ color: "#1A2035" }}>{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "qa" && (
        <div>
          <div
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
          >
            {/* Chat header */}
            <div
              className="flex items-center gap-3 p-4"
              style={{ background: "linear-gradient(130deg, #1a3fc7 0%, #2563EB 60%, #3B82F6 100%)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="rounded-xl flex items-center justify-center" style={{ width: 40, height: 40, background: "rgba(43,110,251,0.4)" }}>
                <Zap size={20} color="#fff" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">AI 智能问答助手</div>
                <div className="text-white/50 text-xs">业务知识 · 产品规则 · 合规要求 · 话术指导</div>
              </div>
            </div>

            {/* Messages */}
            <div className="overflow-y-auto p-5 space-y-4" style={{ background: "#F8FAFF", height: "540px" }}>
              {qaMessages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.from === "ai" ? (
                    <div className="rounded-xl flex-shrink-0 flex items-center justify-center" style={{ width: 32, height: 32, background: "linear-gradient(135deg, #2B6EFB, #5B8BFF)" }}>
                      <Zap size={14} color="#fff" />
                    </div>
                  ) : (
                    <div className="rounded-xl flex-shrink-0 flex items-center justify-center" style={{ width: 32, height: 32, background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}>
                      <span className="text-white text-xs font-bold">我</span>
                    </div>
                  )}
                  <div
                    className="max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                    style={{
                      background: msg.from === "ai" ? "#fff" : "linear-gradient(135deg, #2B6EFB, #5B8BFF)",
                      color: msg.from === "ai" ? "#334155" : "#fff",
                      border: msg.from === "ai" ? "1px solid #E8F0FF" : "none",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {qaLoading && (
                <div className="flex gap-3">
                  <div className="rounded-xl flex-shrink-0 flex items-center justify-center" style={{ width: 32, height: 32, background: "linear-gradient(135deg, #2B6EFB, #5B8BFF)" }}>
                    <Zap size={14} color="#fff" />
                  </div>
                  <div className="rounded-2xl px-4 py-3 flex items-center gap-1" style={{ background: "#fff", border: "1px solid #E8F0FF" }}>
                    {[0, 0.2, 0.4].map((d, i) => (
                      <div key={i} className="rounded-full animate-bounce" style={{ width: 6, height: 6, background: "#A0AECB", animationDelay: `${d}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggested questions */}
            <div className="px-4 py-3 overflow-x-auto flex gap-2" style={{ borderTop: "1px solid #E8F0FF" }}>
              {["基金定投优势？", "合规话术规范？", "如何处理客户异议？", "存款到期转化技巧？"].map((q) => (
                <button
                  key={q}
                  onClick={() => { setQaInput(q); }}
                  className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80 whitespace-nowrap"
                  style={{ background: "#EFF4FF", color: "#2B6EFB", border: "1px solid #BAD0FF" }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-3 p-4" style={{ borderTop: "1px solid #E8F0FF" }}>
              <input
                placeholder="输入你的问题..."
                value={qaInput}
                onChange={(e) => setQaInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendQA()}
                className="flex-1 rounded-xl px-4 py-2.5 text-sm border-none outline-none"
                style={{ background: "#F8FAFF", border: "1px solid #E0E8F7", color: "#334155" }}
              />
              <button
                onClick={sendQA}
                disabled={!qaInput.trim()}
                className="flex items-center justify-center rounded-xl transition-all hover:opacity-90 disabled:opacity-40"
                style={{ width: 44, height: 44, background: "linear-gradient(135deg, #2B6EFB, #5B8BFF)" }}
              >
                <Send size={18} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "notes" && (
        <div className="max-w-3xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: "#1A2035" }}>我的学习笔记</h3>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
              style={{ background: "linear-gradient(135deg, #2B6EFB, #5B8BFF)", color: "#fff" }}
            >
              <PenLine size={14} />
              新建笔记
            </button>
          </div>
          <div className="space-y-4">
            {notes.map((n, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl cursor-pointer transition-all hover:shadow-md"
                style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold" style={{ color: "#1A2035" }}>{n.title}</h4>
                  <span className="text-xs" style={{ color: "#94A3B8" }}>{n.date}</span>
                </div>
                <p className="text-sm" style={{ color: "#64748B" }}>{n.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}