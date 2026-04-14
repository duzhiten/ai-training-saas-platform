import { useState, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  Home,
  Sword,
  Brain,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Zap,
  LogOut,
  Trophy,
  Users,
  Bot,
  FileText,
  MessageSquare,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";

const navGroups = [
  {
    label: "训练",
    items: [
      { path: "/",           icon: Home,          label: "首页",    badge: null },
      { path: "/training",   icon: Sword,         label: "训练中心", badge: "3" },
      { path: "/ability",    icon: Brain,         label: "能力画像", badge: null },
    ],
  },
  {
    label: "成长",
    items: [
      { path: "/data",       icon: BarChart3,     label: "数据中心", badge: null },
      { path: "/learning",   icon: BookOpen,      label: "学习中心", badge: "5" },
      { path: "/assessment", icon: ClipboardCheck,label: "考核中心", badge: null },
      { path: "/profile",    icon: User,          label: "个人中心", badge: null },
    ],
  },
  {
    label: "系统",
    items: [
      { path: "/admin", icon: Settings, label: "管理后台", badge: null, hasSubmenu: true },
    ],
  },
];

const adminSubItems = [
  { id: "users",     label: "用户管理",  icon: <Users size={14} /> },
  { id: "ai",        label: "数字人管理", icon: <Bot size={14} /> },
  {
    id: "chapters",
    label: "章节关卡",
    icon: <BookOpen size={14} />,
    subItems: [
      { id: "chapters-list", label: "关卡列表" },
      { id: "chapters-create", label: "创建关卡" },
      { id: "chapters-sort", label: "排序管理" },
    ]
  },
  {
    id: "phrases",
    label: "话术管理",
    icon: <MessageSquare size={14} />,
    subItems: [
      { id: "phrases-lib", label: "话术库" },
      { id: "phrases-template", label: "模板管理" },
    ]
  },
  {
    id: "content",
    label: "内容管理",
    icon: <FileText size={14} />,
    subItems: [
      { id: "content-article", label: "文章管理" },
      { id: "content-media", label: "媒体资源" },
    ]
  },
  { id: "dashboard", label: "数据看板",  icon: <LayoutDashboard size={14} /> },
  {
    id: "system",
    label: "系统设置",
    icon: <Settings size={14} />,
    subItems: [
      { id: "system-basic", label: "基础设置" },
      { id: "system-security", label: "安全配置" },
      { id: "system-permission", label: "权限管理" },
    ]
  },
];

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [adminSubmenuOpen, setAdminSubmenuOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState("dashboard");
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(null);
  const adminHoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const adminButtonRef = useRef<HTMLDivElement>(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0 });
  const navigate  = useNavigate();
  const location  = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const openSubmenu = () => {
    if (adminHoverTimer.current) clearTimeout(adminHoverTimer.current);
    if (adminButtonRef.current) {
      const rect = adminButtonRef.current.getBoundingClientRect();
      setSubmenuPosition({ top: rect.top + rect.height / 2 });
    }
    setAdminSubmenuOpen(true);
  };
  const closeSubmenu = () => {
    adminHoverTimer.current = setTimeout(() => setAdminSubmenuOpen(false), 200);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: "#EEF2FA" }}>
      {/* Floating Admin Submenu */}
      {adminSubmenuOpen && (
        <div
          className="fixed z-50 rounded-xl overflow-hidden"
          style={{
            left: collapsed ? 88 : 234,
            top: submenuPosition.top,
            transform: "translateY(-50%)",
            width: 180,
            background: "#fff",
            boxShadow: "0 8px 32px rgba(37,99,235,0.15), 0 2px 8px rgba(0,0,0,0.08)",
            border: "1px solid rgba(37,99,235,0.12)",
          }}
          onMouseEnter={openSubmenu}
          onMouseLeave={closeSubmenu}
        >
          <div className="px-4 py-3" style={{ borderBottom: "1px solid #F0F4FF" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em" }}>管理后台</div>
          </div>
          <div className="py-2">
            {adminSubItems.map((sub) => {
              const hasSubItems = sub.subItems && sub.subItems.length > 0;
              const isExpanded = expandedSubMenu === sub.id;
              const isActive = activeAdminTab === sub.id || (hasSubItems && sub.subItems?.some((s: any) => activeAdminTab === s.id));

              return (
                <div key={sub.id}>
                  <button
                    onClick={() => {
                      if (hasSubItems) {
                        setExpandedSubMenu(isExpanded ? null : sub.id);
                      } else {
                        setActiveAdminTab(sub.id);
                        navigate(`/admin?tab=${sub.id}`);
                        setAdminSubmenuOpen(false);
                      }
                    }}
                    className="w-full flex items-center justify-between px-4 py-2.5 transition-all text-left"
                    style={{
                      background: isActive ? "#EEF4FF" : "transparent",
                      color: isActive ? "#2563EB" : "#475569",
                      fontWeight: isActive ? 600 : 400,
                      fontSize: 13,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.background = "#F6F8FF";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span style={{ color: isActive ? "#2563EB" : "#94A3B8" }}>{sub.icon}</span>
                      {sub.label}
                    </div>
                    {hasSubItems && (
                      <ChevronDown
                        size={13}
                        style={{
                          color: isActive ? "#2563EB" : "#94A3B8",
                          transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
                          transition: "transform 0.2s"
                        }}
                      />
                    )}
                  </button>

                  {/* Sub items */}
                  {hasSubItems && isExpanded && (
                    <div className="py-1" style={{ background: "#F8FAFF" }}>
                      {sub.subItems?.map((subItem: any) => (
                        <button
                          key={subItem.id}
                          onClick={() => {
                            setActiveAdminTab(subItem.id);
                            navigate(`/admin?tab=${subItem.id}`);
                            setAdminSubmenuOpen(false);
                            setExpandedSubMenu(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm transition-all"
                          style={{
                            color: activeAdminTab === subItem.id ? "#2563EB" : "#64748B",
                            fontWeight: activeAdminTab === subItem.id ? 600 : 400,
                            background: activeAdminTab === subItem.id ? "#EFF4FF" : "transparent",
                            paddingLeft: 40,
                          }}
                          onMouseEnter={(e) => {
                            if (activeAdminTab !== subItem.id) (e.currentTarget as HTMLElement).style.background = "#EEF4FF";
                          }}
                          onMouseLeave={(e) => {
                            if (activeAdminTab !== subItem.id) (e.currentTarget as HTMLElement).style.background = "transparent";
                          }}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className="flex flex-col h-full transition-all duration-300 relative z-20 flex-shrink-0 m-3 rounded-2xl"
        style={{
          width: collapsed ? "64px" : "210px",
          background: "#fff",
          boxShadow: "0 4px 24px rgba(37,99,235,0.09), 0 1px 4px rgba(37,99,235,0.06)",
          border: "1px solid rgba(37,99,235,0.07)",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center px-4 flex-shrink-0"
          style={{
            height: 64,
            borderBottom: "1px solid #F0F4FF",
            gap: collapsed ? 0 : 10,
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{
              width: 34,
              height: 34,
              background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
              boxShadow: "0 4px 12px rgba(37,99,235,0.35)",
            }}
          >
            <Zap size={17} color="#fff" fill="#fff" />
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", letterSpacing: "0.01em" }}>AI 陪练</div>
              <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 1 }}>Sales Pro</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-1">
              {!collapsed && (
                <div
                  className="px-4 mb-1 mt-3"
                  style={{ fontSize: 10, fontWeight: 600, color: "#B0BDCF", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  {group.label}
                </div>
              )}
              {collapsed && <div style={{ height: 8 }} />}

              {group.items.map((item) => {
                const Icon   = item.icon;
                const active = isActive(item.path);
                const isAdmin = (item as any).hasSubmenu;

                if (isAdmin) {
                  return (
                    <div
                      key={item.path}
                      ref={adminButtonRef}
                      className="px-2.5 relative"
                      onMouseEnter={openSubmenu}
                      onMouseLeave={closeSubmenu}
                    >
                      <button
                        onClick={() => navigate(item.path)}
                        className="w-full flex items-center rounded-xl transition-all duration-150 relative"
                        style={{
                          padding: collapsed ? "9px 0" : "9px 10px",
                          background: active ? "#EEF4FF" : "transparent",
                          justifyContent: collapsed ? "center" : "flex-start",
                          gap: collapsed ? 0 : 10,
                          marginBottom: 2,
                        }}
                        onMouseEnter={(e) => {
                          if (!active) (e.currentTarget as HTMLElement).style.background = "#F6F8FF";
                        }}
                        onMouseLeave={(e) => {
                          if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                      >
                        <Icon size={17} style={{ color: active ? "#2563EB" : "#94A3B8", flexShrink: 0 }} />
                        {!collapsed && (
                          <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#2563EB" : "#475569", flex: 1, textAlign: "left", whiteSpace: "nowrap" }}>
                            {item.label}
                          </span>
                        )}
                      </button>


                    </div>
                  );
                }

                return (
                  <div key={item.path} className="px-2.5">
                    <button
                      onClick={() => navigate(item.path)}
                      className="w-full flex items-center rounded-xl transition-all duration-150 relative"
                      style={{
                        padding: collapsed ? "9px 0" : "9px 10px",
                        background: active ? "#EEF4FF" : "transparent",
                        justifyContent: collapsed ? "center" : "flex-start",
                        gap: collapsed ? 0 : 10,
                        marginBottom: 2,
                      }}
                      onMouseEnter={(e) => {
                        if (!active) (e.currentTarget as HTMLElement).style.background = "#F6F8FF";
                      }}
                      onMouseLeave={(e) => {
                        if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      <Icon size={17} style={{ color: active ? "#2563EB" : "#94A3B8", flexShrink: 0 }} />
                      {!collapsed && (
                        <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#2563EB" : "#475569", flex: 1, textAlign: "left", whiteSpace: "nowrap" }}>
                          {item.label}
                        </span>
                      )}
                      {!collapsed && item.badge && (
                        <span style={{ fontSize: 10, fontWeight: 700, background: active ? "#2563EB" : "#EEF4FF", color: active ? "#fff" : "#2563EB", borderRadius: 20, padding: "1px 6px", minWidth: 18, textAlign: "center" }}>
                          {item.badge}
                        </span>
                      )}
                      {collapsed && item.badge && (
                        <span className="absolute rounded-full flex items-center justify-center" style={{ width: 12, height: 12, background: "#EF4444", top: 6, right: 6, fontSize: 8, color: "#fff", fontWeight: 700 }}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User area */}
        <div style={{ borderTop: "1px solid #F0F4FF", padding: "10px 10px" }}>
          {collapsed ? (
            <div
              className="flex items-center justify-center rounded-xl mx-auto cursor-pointer"
              style={{ width: 38, height: 38, background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}
              onClick={() => navigate("/profile")}
            >
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>张</span>
            </div>
          ) : (
            <div
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 cursor-pointer transition-all"
              style={{ background: "#F8FAFF" }}
              onClick={() => navigate("/profile")}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#EEF4FF"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F8FAFF"; }}
            >
              <div
                className="flex items-center justify-center rounded-lg flex-shrink-0"
                style={{ width: 30, height: 30, background: "linear-gradient(135deg, #2563EB, #1D4ED8)", fontSize: 12, fontWeight: 700, color: "#fff" }}
              >
                张
              </div>
              <div className="flex-1 overflow-hidden">
                <div style={{ fontSize: 12, fontWeight: 600, color: "#0F172A", whiteSpace: "nowrap" }}>张晓明</div>
                <div style={{ fontSize: 10, color: "#94A3B8", whiteSpace: "nowrap" }}>零售银行部</div>
              </div>
              <LogOut size={12} style={{ color: "#CBD5E1", flexShrink: 0 }} />
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-16 flex items-center justify-center rounded-full border transition-all hover:scale-110 z-30"
          style={{
            width: 22,
            height: 22,
            background: "#fff",
            borderColor: "#E0E8F7",
            boxShadow: "0 2px 8px rgba(37,99,235,0.13)",
          }}
          aria-label={collapsed ? "展开侧边栏" : "收起侧边栏"}
        >
          {collapsed ? <ChevronRight size={11} color="#2563EB" /> : <ChevronLeft size={11} color="#2563EB" />}
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header
          className="flex items-center justify-between px-6 flex-shrink-0 mx-3 mt-3 mb-0 rounded-2xl"
          style={{
            height: 58,
            background: "#fff",
            border: "1px solid rgba(37,99,235,0.07)",
            boxShadow: "0 2px 12px rgba(37,99,235,0.06)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 rounded-xl px-3.5 py-2"
              style={{ background: "#F6F8FF", border: "1px solid #ECF0FF" }}
            >
              <Search size={13} color="#A0AECB" />
              <input
                placeholder="搜索关卡、话术、课程..."
                className="bg-transparent border-none outline-none"
                style={{ color: "#334155", fontSize: 12, width: 200 }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5" style={{ background: "#FFF9EC", border: "1px solid #FFE49A" }}>
              <span style={{ fontSize: 12 }}>🔥</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#B45309" }}>连续第 14 天</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5" style={{ background: "#EFF4FF", border: "1px solid #C7D9FF" }}>
              <Trophy size={12} color="#2563EB" />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#2563EB" }}>排名 #3</span>
            </div>
            <button
              className="relative flex items-center justify-center rounded-xl transition-colors"
              style={{ width: 36, height: 36, border: "1px solid #ECF0FF", background: "#F6F8FF" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#EEF4FF"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F6F8FF"; }}
              aria-label="通知"
            >
              <Bell size={15} color="#64748B" />
              <span className="absolute rounded-full" style={{ width: 6, height: 6, background: "#EF4444", top: 8, right: 8 }} />
            </button>
            <div
              className="flex items-center justify-center rounded-xl cursor-pointer text-white text-sm font-bold"
              style={{ width: 36, height: 36, background: "linear-gradient(135deg, #2563EB, #1D4ED8)", boxShadow: "0 2px 8px rgba(37,99,235,0.3)", fontSize: 13 }}
              onClick={() => navigate("/profile")}
            >
              张
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}