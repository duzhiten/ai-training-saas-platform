import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  Users,
  Bot,
  BookOpen,
  MessageSquare,
  FileText,
  BarChart3,
  Settings,
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Download,
  Upload,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  ChevronDown,
  Star,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const users = [
  { id: 1, name: "张晓明", dept: "零售银行部", role: "员工", status: true, score: 83.4, lastActive: "今天" },
  { id: 2, name: "李小燕", dept: "零售银行部", role: "员工", status: true, score: 96.8, lastActive: "今天" },
  { id: 3, name: "王建国", dept: "财富管理部", role: "主管", status: true, score: 95.1, lastActive: "今天" },
  { id: 4, name: "陈美华", dept: "对公业务部", role: "员工", status: true, score: 91.2, lastActive: "昨天" },
  { id: 5, name: "赵大伟", dept: "零售银行部", role: "员工", status: false, score: 72.1, lastActive: "3天前" },
  { id: 6, name: "刘晓芳", dept: "信用卡中心", role: "员工", status: true, score: 88.3, lastActive: "今天" },
];

const aiCustomers = [
  { id: 1, name: "陈女士 · 企业主", personality: "理性保守", emotion: "中性", scenes: 12, status: true },
  { id: 2, name: "李先生 · 退休人员", personality: "感性友好", emotion: "积极", scenes: 8, status: true },
  { id: 3, name: "王女士 · 年轻白领", personality: "果断直接", emotion: "急躁", scenes: 10, status: true },
  { id: 4, name: "张先生 · 私营业主", personality: "强势犹豫", emotion: "负面", scenes: 6, status: false },
];

const chartData = [
  { dept: "零售银行", completion: 92, avgScore: 82, violation: 4 },
  { dept: "财富管理", completion: 88, avgScore: 85, violation: 2 },
  { dept: "对公业务", completion: 75, avgScore: 78, violation: 6 },
  { dept: "信用卡", completion: 96, avgScore: 80, violation: 3 },
];

const trendData = [
  { week: "W1", training: 186, pass: 142, violation: 28 },
  { week: "W2", training: 210, pass: 168, violation: 22 },
  { week: "W3", training: 198, pass: 155, violation: 18 },
  { week: "W4", training: 228, pass: 185, violation: 15 },
];

export function Admin() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userSearch, setUserSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  // Read tab from URL query params
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const filteredUsers = users.filter((u) =>
    !userSearch || u.name.includes(userSearch) || u.dept.includes(userSearch)
  );

  return (
    <div className="flex h-full overflow-hidden">
      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6" style={{ background: "#F0F4FA" }}>
        {activeTab === "dashboard" && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold" style={{ color: "#1A2035" }}>数据看板</h2>

            {/* KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "本月训练总次数", value: "1,286", change: "+18%", color: "#2B6EFB", bg: "#EFF4FF" },
                { label: "平均完成率", value: "87.8%", change: "+5%", color: "#10B981", bg: "#ECFDF5" },
                { label: "团队平均分", value: "81.2", change: "+3.4", color: "#F59E0B", bg: "#FFFBEB" },
                { label: "合规违规率", value: "3.2%", change: "-1.2%", color: "#EF4444", bg: "#FFF3F0" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5"
                  style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                >
                  <div className="text-xs mb-2" style={{ color: "#94A3B8" }}>{s.label}</div>
                  <div className="text-2xl font-bold mb-1" style={{ color: "#1A2035" }}>{s.value}</div>
                  <div className="text-xs font-medium" style={{ color: s.color }}>较上月 {s.change}</div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <h3 className="font-semibold mb-4" style={{ color: "#1A2035" }}>部门训练对比</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData} barSize={20}>
                    <XAxis dataKey="dept" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E8F0FF", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="completion" name="完成率%" fill="#2B6EFB" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="avgScore" name="平均分" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <h3 className="font-semibold mb-4" style={{ color: "#1A2035" }}>训练趋势（近4周）</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F4FA" />
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E8F0FF", borderRadius: 8, fontSize: 12 }} />
                    <Line type="monotone" dataKey="training" name="训练次数" stroke="#2B6EFB" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="pass" name="通关次数" stroke="#10B981" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="violation" name="违规次数" stroke="#FF4D4F" strokeWidth={2} dot={false} strokeDasharray="4 2" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Dept table */}
            <div className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <h3 className="font-semibold mb-4" style={{ color: "#1A2035" }}>部门详情统计</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #F0F4FA" }}>
                      {["部门", "完成率", "平均得分", "违规率", "通关数", "薄弱项"].map((h) => (
                        <th key={h} className="text-left py-3 px-3 text-xs font-medium" style={{ color: "#94A3B8" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.map((d, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #F8FAFF" }}>
                        <td className="py-3 px-3 text-sm font-medium" style={{ color: "#1A2035" }}>{d.dept}部</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full overflow-hidden" style={{ width: 60, height: 4, background: "#E2E8F0" }}>
                              <div className="h-full rounded-full" style={{ width: `${d.completion}%`, background: "#2B6EFB" }} />
                            </div>
                            <span className="text-xs font-medium" style={{ color: "#2B6EFB" }}>{d.completion}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-sm" style={{ color: d.avgScore >= 85 ? "#10B981" : d.avgScore >= 75 ? "#F59E0B" : "#FF4D4F" }}>{d.avgScore}</td>
                        <td className="py-3 px-3 text-sm" style={{ color: d.violation > 5 ? "#FF4D4F" : "#F59E0B" }}>{d.violation}%</td>
                        <td className="py-3 px-3 text-xs" style={{ color: "#94A3B8" }}>218</td>
                        <td className="py-3 px-3">
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#FFF3F0", color: "#FF4D4F" }}>成交推进</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ color: "#1A2035" }}>用户管理</h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: "#F0F4FA", color: "#64748B", border: "1px solid #E0E8F7" }}>
                  <Upload size={14} /> 批量导入
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: "#F0F4FA", color: "#64748B", border: "1px solid #E0E8F7" }}>
                  <Download size={14} /> 导出
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: "linear-gradient(135deg, #2B6EFB, #5B8BFF)", color: "#fff" }}>
                  <Plus size={14} /> 新增用户
                </button>
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 rounded-xl px-3 py-2 flex-1 max-w-xs" style={{ background: "#F0F4FA", border: "1px solid #E0E8F7" }}>
                  <Search size={14} color="#A0AECB" />
                  <input
                    placeholder="搜索用户..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm flex-1"
                    style={{ color: "#334155" }}
                  />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm" style={{ background: "#F0F4FA", color: "#64748B", border: "1px solid #E0E8F7" }}>
                  <Filter size={13} /> 筛选部门
                </button>
              </div>

              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid #F0F4FA" }}>
                    <th className="py-3 px-3 text-left">
                      <input type="checkbox" className="rounded" />
                    </th>
                    {["姓名", "部门", "角色", "状态", "平均得分", "最近活跃", "操作"].map((h) => (
                      <th key={h} className="text-left py-3 px-3 text-xs font-medium" style={{ color: "#94A3B8" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-blue-50/30 transition-colors" style={{ borderBottom: "1px solid #F8FAFF" }}>
                      <td className="py-3 px-3">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ width: 32, height: 32, background: "linear-gradient(135deg, #2B6EFB, #5B8BFF)" }}
                          >
                            <span className="text-white text-xs font-bold">{u.name[0]}</span>
                          </div>
                          <span className="text-sm font-medium" style={{ color: "#1A2035" }}>{u.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-sm" style={{ color: "#64748B" }}>{u.dept}</td>
                      <td className="py-3 px-3">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: u.role === "主管" ? "#FAF5FF" : "#F0F4FA", color: u.role === "主管" ? "#A855F7" : "#64748B" }}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="rounded-full transition-colors cursor-pointer"
                            style={{ width: 36, height: 20, background: u.status ? "#2B6EFB" : "#E2E8F0", position: "relative" }}
                          >
                            <span
                              className="absolute rounded-full"
                              style={{ width: 14, height: 14, background: "#fff", top: 3, left: u.status ? 19 : 3, boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
                            />
                          </div>
                          <span className="text-xs" style={{ color: u.status ? "#10B981" : "#94A3B8" }}>
                            {u.status ? "启用" : "禁用"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-sm font-bold" style={{ color: u.score >= 85 ? "#10B981" : u.score >= 70 ? "#F59E0B" : "#FF4D4F" }}>
                        {u.score}
                      </td>
                      <td className="py-3 px-3 text-xs" style={{ color: "#94A3B8" }}>{u.lastActive}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <button className="text-xs px-2 py-1 rounded-lg" style={{ background: "#EFF4FF", color: "#2B6EFB" }}>
                            <Edit size={12} />
                          </button>
                          <button className="text-xs px-2 py-1 rounded-lg" style={{ background: "#FFF3F0", color: "#FF4D4F" }}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "ai" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ color: "#1A2035" }}>数字人管理</h2>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: "linear-gradient(135deg, #2B6EFB, #5B8BFF)", color: "#fff" }}>
                <Plus size={14} /> 新建数字人
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiCustomers.map((ai) => (
                <div
                  key={ai.id}
                  className="rounded-2xl p-5"
                  style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="rounded-xl flex items-center justify-center"
                        style={{ width: 48, height: 48, background: "linear-gradient(135deg, #667EEA, #764BA2)" }}
                      >
                        <Bot size={22} color="#fff" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm" style={{ color: "#1A2035" }}>{ai.name}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs" style={{ color: "#94A3B8" }}>性格: {ai.personality}</span>
                          <span className="text-xs" style={{ color: "#94A3B8" }}>情绪: {ai.emotion}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="rounded-full"
                        style={{ width: 8, height: 8, background: ai.status ? "#10B981" : "#E2E8F0" }}
                      />
                      <span className="text-xs" style={{ color: ai.status ? "#10B981" : "#94A3B8" }}>
                        {ai.status ? "启用" : "禁用"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs" style={{ color: "#94A3B8" }}>关联场景: <strong style={{ color: "#1A2035" }}>{ai.scenes} 个</strong></span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs" style={{ background: "#EFF4FF", color: "#2B6EFB" }}>
                      <Edit size={12} /> 编辑配置
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs" style={{ background: "#F0F4FA", color: "#64748B" }}>
                      <Eye size={12} /> 预览对话
                    </button>
                    <button className="flex items-center justify-center py-2 px-3 rounded-xl" style={{ background: "#FFF3F0" }}>
                      <Trash2 size={12} color="#FF4D4F" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "chapters" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ color: "#1A2035" }}>章节与关卡管理</h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: "#F0F4FA", color: "#64748B", border: "1px solid #E0E8F7" }}>
                  新建章节
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: "linear-gradient(135deg, #2B6EFB, #5B8BFF)", color: "#fff" }}>
                  <Plus size={14} /> 新建关卡
                </button>
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <p className="text-sm" style={{ color: "#64748B" }}>拖拽排序支持 · 章节下可展开查看关卡列表</p>
              <div className="mt-4 space-y-2">
                {["新手入门", "客户破冰", "需求挖掘", "异议处理", "成交推进", "合规服务"].map((ch, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl cursor-grab"
                    style={{ background: "#F8FAFF", border: "1px solid #E8F0FF" }}
                  >
                    <span className="text-gray-300">⠿⠿</span>
                    <span className="text-sm font-medium flex-1" style={{ color: "#1A2035" }}>{ch}</span>
                    <span className="text-xs" style={{ color: "#94A3B8" }}>8 个关卡</span>
                    <div className="flex gap-2">
                      <button className="text-xs px-2 py-1 rounded-lg" style={{ background: "#EFF4FF", color: "#2B6EFB" }}>编辑</button>
                      <button className="text-xs px-2 py-1 rounded-lg" style={{ background: "#FFF3F0", color: "#FF4D4F" }}>下架</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "system" && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold" style={{ color: "#1A2035" }}>系统设置</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { title: "企业信息", fields: ["企业名称", "Logo", "联系方式"] },
                { title: "界面样式", fields: ["主题色", "字体大小", "侧边栏模式"] },
                { title: "安全设置", fields: ["登录策略", "密码强度", "会话超时"] },
                { title: "权限配置", fields: ["角色管理", "功能权限", "数据权限"] },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5"
                  style={{ background: "#fff", border: "1px solid rgba(43,110,251,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                >
                  <h3 className="font-semibold mb-4" style={{ color: "#1A2035" }}>{s.title}</h3>
                  <div className="space-y-3">
                    {s.fields.map((f, j) => (
                      <div key={j} className="flex items-center justify-between py-2" style={{ borderBottom: j < s.fields.length - 1 ? "1px solid #F0F4FA" : "none" }}>
                        <span className="text-sm" style={{ color: "#64748B" }}>{f}</span>
                        <button className="text-xs px-3 py-1 rounded-lg" style={{ background: "#EFF4FF", color: "#2B6EFB" }}>设置</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!["dashboard", "users", "ai", "chapters", "system"].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center h-64" style={{ color: "#94A3B8" }}>
            <FileText size={40} className="mb-3 opacity-40" />
            <p className="text-sm">该模块内容正在完善中...</p>
          </div>
        )}
      </main>
    </div>
  );
}
