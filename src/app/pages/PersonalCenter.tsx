import { useState } from "react";
import { useNavigate } from "react-router";
import {
  User,
  Trophy,
  Clock,
  Target,
  Star,
  Flame,
  Bell,
  Lock,
  Monitor,
  HelpCircle,
  ChevronRight,
  Edit3,
  CheckCircle2,
  Shield,
  Smartphone,
} from "lucide-react";

const badges = [
  { id: 1, emoji: "🔥", name: "坚持不懈", desc: "连续训练 14 天", earned: true },
  { id: 2, emoji: "🏆", name: "团队之星", desc: "月度排名前 3", earned: true },
  { id: 3, emoji: "⚡", name: "闪电出击", desc: "10次以上满分", earned: true },
  { id: 4, emoji: "🎯", name: "百发百中", desc: "连续 5 关通关", earned: true },
  { id: 5, emoji: "📚", name: "学霸达人", desc: "学习资料收藏 20+", earned: false },
  { id: 6, emoji: "💎", name: "钻石精英", desc: "综合评分超 95", earned: false },
  { id: 7, emoji: "🦁", name: "无畏挑战", desc: "完成全部专家关卡", earned: false },
  { id: 8, emoji: "🌟", name: "全能冠军", desc: "六维度均达 90 分", earned: false },
];

const stats = [
  { label: "累计训练次数", value: "286", unit: "次", icon: <Target size={18} />, color: "#2B6EFB", bg: "#EFF4FF" },
  { label: "累计训练时长", value: "142", unit: "h", icon: <Clock size={18} />, color: "#10B981", bg: "#ECFDF5" },
  { label: "平均得分", value: "83.4", unit: "分", icon: <Star size={18} />, color: "#F59E0B", bg: "#FFFBEB" },
  { label: "连续训练天数", value: "14", unit: "天", icon: <Flame size={18} />, color: "#FF6B35", bg: "#FFF3F0" },
  { label: "章节通关数", value: "29", unit: "关", icon: <CheckCircle2 size={18} />, color: "#A855F7", bg: "#FAF5FF" },
  { label: "团队排名", value: "#3", unit: "", icon: <Trophy size={18} />, color: "#FFD700", bg: "#FFFBEB" },
];

export function PersonalCenter() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "badges" | "settings">("profile");
  const [notifications, setNotifications] = useState({
    training: true,
    assessment: true,
    rank: false,
    tips: true,
  });

  return (
    <div className="p-6 w-full">
      {/* Header card */}
      <div
        className="rounded-2xl p-6 mb-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(130deg, #1a3fc7 0%, #2563EB 55%, #3B82F6 100%)",
          boxShadow: "0 8px 40px rgba(37,99,235,0.28)",
        }}
      >
        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg,rgba(255,255,255,0.04) 0,rgba(255,255,255,0.04) 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,rgba(255,255,255,0.04) 0,rgba(255,255,255,0.04) 1px,transparent 1px,transparent 32px)",
          }}
        />
        {/* Decorative blobs */}
        <div className="absolute" style={{ width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.06)", top: -100, right: -60, pointerEvents: "none" }} />
        <div className="absolute" style={{ width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.05)", bottom: -40, right: 240, pointerEvents: "none" }} />

        <div className="relative z-10 flex items-center gap-5">
          <div className="relative">
            <div
              className="rounded-2xl flex items-center justify-center"
              style={{ width: 80, height: 80, background: "linear-gradient(135deg, #2B6EFB, #5B8BFF)", boxShadow: "0 4px 20px rgba(43,110,251,0.4)" }}
            >
              <span className="text-white text-3xl font-bold">张</span>
            </div>
            <button
              className="absolute -bottom-1 -right-1 rounded-full flex items-center justify-center"
              style={{ width: 24, height: 24, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
            >
              <Edit3 size={11} color="#2B6EFB" />
            </button>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold mb-1">张晓明</h2>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-white/70 text-sm">零售银行部 · 客户经理</span>
              <span className="text-white/70 text-sm">·</span>
              <span className="text-white/70 text-sm">2024年3月入职</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-full" style={{ background: "rgba(255,215,0,0.2)", border: "1px solid rgba(255,215,0,0.3)" }}>
                <span className="text-sm" style={{ color: "#FFD700" }}>🏆 团队 TOP 3</span>
              </div>
              <div className="px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>🔥 连续 14 天</span>
              </div>
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-white/50 text-xs mb-0.5">账号 ID</div>
            <div className="text-white/70 text-sm">ZXM_2024_0312</div>
            <div className="text-white/50 text-xs mt-1">zhang.xiaoming@bank.com</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: "profile", label: "训练统计" },
          { id: "badges", label: "成就徽章" },
          { id: "settings", label: "账号设置" },
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

      {activeTab === "profile" && (
        <div className="space-y-5">
          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 flex items-center gap-3"
                style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: 44, height: 44, background: s.bg }}>
                  <span style={{ color: s.color }}>{s.icon}</span>
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: "#1A2035" }}>
                    {s.value}<span className="text-sm ml-0.5" style={{ color: "#94A3B8" }}>{s.unit}</span>
                  </div>
                  <div className="text-xs" style={{ color: "#94A3B8" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent earned badges */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: "#1A2035" }}>最近获得成就</h3>
              <button className="text-xs flex items-center gap-1 hover:opacity-80" style={{ color: "#2B6EFB" }} onClick={() => setActiveTab("badges")}>
                全部 <ChevronRight size={12} />
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-1">
              {badges.filter((b) => b.earned).map((b) => (
                <div key={b.id} className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div
                    className="rounded-2xl flex items-center justify-center"
                    style={{ width: 60, height: 60, background: "linear-gradient(135deg, #EFF4FF, #E8F0FF)", border: "2px solid #BAD0FF" }}
                  >
                    <span className="text-2xl">{b.emoji}</span>
                  </div>
                  <span className="text-xs text-center" style={{ color: "#334155" }}>{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "badges" && (
        <div
          className="rounded-2xl p-5"
          style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
        >
          <h3 className="font-semibold mb-5" style={{ color: "#1A2035" }}>
            全部成就徽章 <span className="text-sm font-normal" style={{ color: "#94A3B8" }}>4 / 8 已获得</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((b) => (
              <div
                key={b.id}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl transition-all"
                style={{
                  background: b.earned ? "linear-gradient(135deg, #EFF4FF, #E8F0FF)" : "#F8FAFC",
                  border: `2px solid ${b.earned ? "#BAD0FF" : "#E2E8F0"}`,
                  opacity: b.earned ? 1 : 0.5,
                }}
              >
                <div
                  className="rounded-2xl flex items-center justify-center"
                  style={{
                    width: 64, height: 64,
                    background: b.earned ? "linear-gradient(135deg, #fff, #EFF4FF)" : "#F0F4FA",
                    boxShadow: b.earned ? "0 4px 12px rgba(43,110,251,0.15)" : "none",
                  }}
                >
                  <span className="text-3xl">{b.emoji}</span>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold" style={{ color: b.earned ? "#1A2035" : "#94A3B8" }}>{b.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>{b.desc}</div>
                </div>
                {b.earned && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#2B6EFB", color: "#fff" }}>已获得</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-4">
          {/* Password */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Lock size={16} color="#2B6EFB" />
              <h3 className="font-semibold" style={{ color: "#1A2035" }}>密码修改</h3>
            </div>
            <div className="space-y-3">
              {["当前密码", "新密码", "确认新密码"].map((label) => (
                <div key={label}>
                  <div className="text-xs mb-1.5 font-medium" style={{ color: "#64748B" }}>{label}</div>
                  <input
                    type="password"
                    placeholder="请输入..."
                    className="w-full rounded-xl px-4 py-2.5 text-sm border-none outline-none"
                    style={{ background: "#F8FAFF", border: "1px solid #E0E8F7", color: "#334155" }}
                  />
                </div>
              ))}
              <button
                className="w-full py-2.5 rounded-xl text-sm font-medium mt-2 transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #2B6EFB, #5B8BFF)", color: "#fff" }}
              >
                确认修改
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Bell size={16} color="#2B6EFB" />
              <h3 className="font-semibold" style={{ color: "#1A2035" }}>消息通知</h3>
            </div>
            <div className="space-y-4">
              {[
                { key: "training", label: "训练提醒", desc: "每日训练提醒与计划推送" },
                { key: "assessment", label: "考核通知", desc: "考核安排与结果通知" },
                { key: "rank", label: "排名变动", desc: "团队排名变化提醒" },
                { key: "tips", label: "学习建议", desc: "AI 个性化学习建议推送" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid #F0F4FA" }}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "#1A2035" }}>{item.label}</div>
                    <div className="text-xs" style={{ color: "#94A3B8" }}>{item.desc}</div>
                  </div>
                  <button
                    onClick={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                    className="rounded-full transition-all"
                    style={{
                      width: 48, height: 26,
                      background: notifications[item.key as keyof typeof notifications] ? "#2B6EFB" : "#E2E8F0",
                      position: "relative",
                    }}
                  >
                    <span
                      className="absolute rounded-full transition-all"
                      style={{
                        width: 20, height: 20, background: "#fff",
                        top: 3, left: notifications[item.key as keyof typeof notifications] ? 25 : 3,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Other settings */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 12px rgba(43,110,251,0.06)" }}
          >
            {[
              { icon: <Monitor size={16} />, label: "多端同步设置", desc: "手机/电脑数据同步", path: null },
              { icon: <Shield size={16} />, label: "隐私与安全", desc: "账号安全设置", path: null },
              { icon: <HelpCircle size={16} />, label: "帮助中心", desc: "使用指南与常见问题", path: null },
            ].map((item, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-4 py-4 transition-colors hover:bg-blue-50/30 rounded-xl px-2"
                style={{ borderBottom: i < 2 ? "1px solid #F0F4FA" : "none" }}
              >
                <div className="rounded-lg flex items-center justify-center" style={{ width: 36, height: 36, background: "#EFF4FF" }}>
                  <span style={{ color: "#2B6EFB" }}>{item.icon}</span>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium" style={{ color: "#1A2035" }}>{item.label}</div>
                  <div className="text-xs" style={{ color: "#94A3B8" }}>{item.desc}</div>
                </div>
                <ChevronRight size={16} color="#94A3B8" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}