/* TDV ERP - clickable UI prototype (Admin & Moderator). Plain JS, hash routing, demo data in localStorage. */
(function () {
  'use strict';

  // ---------- State ----------
  var STORE = 'tdv_proto_state_v1', ROLE = 'tdv_proto_role';
  var S = load();
  var role = safeGet(ROLE);
  var ui = { tab: {}, filter: {}, dropdown: null };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  function load() { try { var s = localStorage.getItem(STORE); if (s) return JSON.parse(s); } catch (e) {} return clone(window.SEED); }
  function save() { safeSet(STORE, JSON.stringify(S)); }
  function me() { return S.users[role]; }
  function isAdmin() { return role === 'admin'; }

  // ---------- Helpers ----------
  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(n) { return '৳ ' + Number(n || 0).toLocaleString('en-IN'); }
  function short(n) { n = Number(n || 0); if (n >= 10000000) return '৳ ' + (n / 10000000).toFixed(2) + ' Cr'; if (n >= 100000) return '৳ ' + (n / 100000).toFixed(1) + ' L'; return money(n); }
  function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }
  function date(d) { if (!d || d === '-') return '-'; var x = new Date(d + 'T00:00:00'); return isNaN(x) ? d : x.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); }
  function initials(n) { return String(n).split(' ').map(function (p) { return p[0]; }).slice(0, 2).join('').toUpperCase(); }
  function today() { return '2026-11-08'; }
  function project(id) { return S.projects.filter(function (p) { return p.id === id; })[0]; }
  function pname(id) { var p = project(id); return p ? p.name : id; }
  function nextId(prefix, list, key, pad) { var max = 0; list.forEach(function (x) { var m = String(x[key || 'id']).match(/(\d+)$/); if (m) max = Math.max(max, +m[1]); }); return prefix + String(max + 1).padStart(pad || 4, '0'); }

  var BADGE = {
    ok: ['Completed', 'Approved', 'Active', 'Present', 'Operational', 'Done', 'Final', 'Paid', 'Available', 'In use', 'Submitted'],
    warn: ['Pending', 'Pending approval', 'Late', 'Delayed', 'On leave', 'Returned', 'Needs repair', 'Under review', 'Maintenance', 'Medium', 'Review', 'Under repair', 'Assigned'],
    bad: ['Rejected', 'Absent', 'Blacklisted', 'High', 'Disabled', 'Emergency', 'Expired'],
    info: ['Ongoing', 'In progress', 'Scheduled', 'In field', 'Planned', 'Deadline'],
    violet: ['Draft', 'On hold', 'Notice', 'Announcement']
  };
  function badge(s) { var c = ''; Object.keys(BADGE).forEach(function (k) { if (BADGE[k].indexOf(s) > -1) c = k; }); return '<span class="badge ' + c + '">' + esc(s) + '</span>'; }
  function barHtml(p, cls) { p = Math.max(0, Math.min(100, p)); return '<div class="bar"><i class="' + (cls || '') + '" style="width:' + p + '%"></i></div>'; }
  function burnCls(p) { return p > 95 ? 'bad' : p > 85 ? 'warn' : ''; }
  function daysTo(d) { return Math.round((new Date(d + 'T00:00:00') - new Date(today() + 'T00:00:00')) / 86400000); }

  // ---------- Icons ----------
  var IC = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
    check: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    kanban: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7v7M12 7v4M16 7v9"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    wallet: '<path d="M20 12V8H6a2 2 0 0 1 0-4h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>',
    cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
    truck: '<path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7 12 12l8.7-5M12 22V12"/>',
    coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18M7 6h1v4M16.71 13.88l.7.71-2.82 2.82"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    map: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
    mega: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    car: '<path d="M5 17h14M5 17a2 2 0 1 1-4 0v-5l2-5h14l4 5v5a2 2 0 1 1-4 0"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    cog: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    menu: '<path d="M3 12h18M3 6h18M3 18h18"/>',
    down: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    swap: '<path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>',
    ok: '<path d="M20 6 9 17l-5-5"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
    dn: '<path d="m6 9 6 6 6-6"/>',
    trash: '<path d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
    refresh: '<path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    phone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
  };
  function ic(n, cls) { return '<svg class="svg ' + (cls || '') + '" viewBox="0 0 24 24">' + (IC[n] || '') + '</svg>'; }

  // ---------- Navigation / permissions ----------
  var NAV = [
    { sec: 'Overview' },
    { id: 'dashboard', label: 'Dashboard', icon: 'home', roles: 'am' },
    { id: 'approvals', label: 'Approvals', icon: 'check', roles: 'am', count: true },
    { sec: 'Projects' },
    { id: 'projects', label: 'Projects', icon: 'folder', roles: 'am' },
    { id: 'programs', label: 'Programs', icon: 'layers', roles: 'am' },
    { id: 'distributions', label: 'Distributions', icon: 'box', roles: 'am' },
    { id: 'tasks', label: 'Tasks', icon: 'kanban', roles: 'am' },
    { sec: 'People' },
    { id: 'staff', label: 'Staff', icon: 'users', roles: 'am' },
    { id: 'attendance', label: 'Attendance & Leave', icon: 'clock', roles: 'am' },
    { id: 'payroll', label: 'Payroll', icon: 'wallet', roles: 'a' },
    { sec: 'Operations' },
    { id: 'procurement', label: 'Procurement', icon: 'cart', roles: 'am' },
    { id: 'suppliers', label: 'Suppliers', icon: 'truck', roles: 'am' },
    { id: 'inventory', label: 'Inventory', icon: 'box', roles: 'am' },
    { id: 'finance', label: 'Finance & Accounts', icon: 'coins', roles: 'a' },
    { id: 'documents', label: 'Documents', icon: 'file', roles: 'am' },
    { sec: 'Field & Reporting' },
    { id: 'field', label: 'Field & Facilities', icon: 'map', roles: 'am' },
    { id: 'reports', label: 'M&E Reports', icon: 'chart', roles: 'am' },
    { id: 'communication', label: 'Communication', icon: 'mega', roles: 'am' },
    { id: 'assets', label: 'Vehicles & Assets', icon: 'car', roles: 'am' },
    { sec: 'Administration', roles: 'a' },
    { id: 'users', label: 'Users & Roles', icon: 'key', roles: 'a' },
    { id: 'workflow', label: 'Approval Workflows', icon: 'list', roles: 'a' },
    { id: 'audit', label: 'Audit Log', icon: 'shield', roles: 'a' },
    { id: 'settings', label: 'Settings', icon: 'cog', roles: 'a' }
  ];
  function canSee(id) { var n = NAV.filter(function (x) { return x.id === id; })[0]; if (!n) return true; return n.roles.indexOf(role === 'admin' ? 'a' : 'm') > -1; }
  function navLabel(id) { var n = NAV.filter(function (x) { return x.id === id; })[0]; return n ? n.label : ''; }

  // Who acts on which approval step
  var MOD_STEPS = ['Project Coordinator'];
  function curStep(a) { return a.chain[a.step]; }
  function canAct(a) { if (a.status !== 'Pending') return false; var s = curStep(a); return isAdmin() ? MOD_STEPS.indexOf(s) === -1 : MOD_STEPS.indexOf(s) > -1; }
  function myQueue() { return S.approvals.filter(canAct); }

  // ---------- Rendering ----------
  var app = document.getElementById('app');

  function route() {
    var h = location.hash.replace(/^#\/?/, '');
    var q = '';
    if (h.indexOf('?') > -1) { q = decodeURIComponent(h.split('?')[1].replace(/^q=/, '')); h = h.split('?')[0]; }
    var parts = h.split('/');
    return { page: parts[0] || 'dashboard', id: parts[1] ? decodeURIComponent(parts[1]) : null, q: q };
  }

  function render() {
    closeOverlay();
    if (!role || !S.users[role]) { app.innerHTML = loginPage(); return; }
    var r = route();
    var html;
    if (!canSee(r.page)) html = lockPage(r.page);
    else if (r.page === 'project' && r.id) html = projectDetail(r.id);
    else if (PAGES[r.page]) html = PAGES[r.page](r);
    else html = PAGES.dashboard(r);
    app.innerHTML = shell(r.page === 'project' ? 'projects' : r.page, html);
    window.scrollTo(0, 0);
  }

  function shell(active, body) {
    var u = me(), q = myQueue().length, nav = '';
    NAV.forEach(function (n) {
      if (n.sec) { if (!n.roles || n.roles.indexOf(isAdmin() ? 'a' : 'm') > -1) nav += '<h6>' + n.sec + '</h6>'; return; }
      if (!canSee(n.id)) return;
      nav += '<a href="#/' + n.id + '" class="' + (active === n.id ? 'on' : '') + '">' + ic(n.icon) + '<span>' + n.label + '</span>' + (n.count && q ? '<span class="cnt">' + q + '</span>' : '') + '</a>';
    });
    return '<div class="shell">' +
      '<aside class="side" id="side"><div class="brandbox"><img src="assets/logo.png" alt="TDV logo"><div><b>TDV ERP</b><span>Bangladesh Operations</span></div></div>' +
      '<nav class="nav">' + nav + '</nav><div class="side-foot">Clickable prototype · demo data<br>Top5Way · v0.1</div></aside>' +
      '<div class="main"><header class="top">' +
      '<button class="menu-btn" data-act="menu" aria-label="Open menu">' + ic('menu') + '</button>' +
      '<label class="search">' + ic('search') + '<input id="gsearch" placeholder="Search projects, staff, approvals..." value="' + esc(route().q) + '"></label>' +
      '<div class="spacer"></div>' +
      '<span class="role-chip ' + role + '">' + ic(isAdmin() ? 'shield' : 'users') + (isAdmin() ? 'Admin' : 'Moderator') + '</span>' +
      '<button class="icon-btn" data-act="notif" aria-label="Notifications">' + ic('bell') + '<span class="dot"></span></button>' +
      '<button class="me" data-act="usermenu"><span class="avatar">' + u.initials + '</span><span class="who"><b>' + esc(u.name) + '</b><span>' + esc(u.title) + '</span></span></button>' +
      '</header><main class="content">' + body + '</main></div></div>';
  }

  function head(title, sub, actions, crumbs) {
    return (crumbs ? '<div class="crumbs">' + crumbs + '</div>' : '') +
      '<div class="page-head"><div><h1>' + title + '</h1>' + (sub ? '<p>' + sub + '</p>' : '') + '</div><div class="spacer"></div><div class="row wrap">' + (actions || '') + '</div></div>';
  }

  function table(cols, rows, opts) {
    opts = opts || {};
    if (!rows.length) return '<div class="empty">' + (opts.empty || 'Nothing to show.') + '</div>';
    var h = '<div class="table-wrap"><table class="t"><thead><tr>' + cols.map(function (c) { return '<th class="' + (c.cls || '') + '">' + c.t + '</th>'; }).join('') + '</tr></thead><tbody>';
    rows.forEach(function (r, i) {
      var link = opts.link ? opts.link(r, i) : null;
      h += '<tr class="' + (link || opts.rowAct ? 'click' : '') + '"' + (link ? ' data-act="go" data-href="' + esc(link) + '"' : '') + (opts.rowAct ? ' data-act="' + opts.rowAct + '" data-i="' + (opts.rowKey ? esc(r[opts.rowKey]) : i) + '"' : '') + '>' +
        cols.map(function (c) { return '<td class="' + (c.cls || '') + '">' + c.v(r, i) + '</td>'; }).join('') + '</tr>';
    });
    return h + '</tbody></table></div>';
  }

  function tabs(key, list, def) {
    var cur = ui.tab[key] || def || list[0][0];
    return { cur: cur, html: '<div class="tabs">' + list.map(function (t) { return '<button data-act="tab" data-k="' + key + '" data-v="' + esc(t[0]) + '" class="' + (cur === t[0] ? 'on' : '') + '">' + esc(t[1] || t[0]) + (t[2] != null ? '<span class="c">' + t[2] + '</span>' : '') + '</button>'; }).join('') + '</div>' };
  }

  function kpi(icon, cls, label, value, note, href) {
    return '<div class="card kpi" data-act="go" data-href="' + (href || '#/') + '"><div class="ic ' + cls + '">' + ic(icon) + '</div><div><small>' + label + '</small><b class="num">' + value + '</b><em>' + note + '</em></div></div>';
  }

  // ---------- Pages ----------
  function loginPage() {
    var sel = ui.loginRole || 'admin';
    function opt(r, icon, t, d) { return '<button class="role-opt ' + (sel === r ? 'on' : '') + '" data-act="pickrole" data-r="' + r + '"><span class="ic">' + ic(icon) + '</span><span><b>' + t + '</b><span>' + d + '</span></span></button>'; }
    return '<div class="login"><section class="login-hero"><div><img src="assets/logo.png" alt="Türkiye Diyanet Vakfı logo">' +
      '<h1>Humanitarian ERP for<br>TDV Bangladesh Operations</h1><p>Projects, approvals, people, procurement, stock, finance and field operations in one place, with every transaction linked to a project, donor and camp.</p>' +
      '<div class="facts"><div><b>14</b><span>modules</span></div><div><b>10</b><span>approval processes</span></div><div><b>1</b><span>source of truth</span></div></div></div>' +
      '<div class="small" style="opacity:.8">Clickable prototype prepared by Top5Way · sample data only</div></section>' +
      '<section class="login-form"><div class="login-card"><h2>Sign in to TDV ERP</h2><p class="muted" style="margin:0">Choose a role to explore the prototype.</p>' +
      '<div class="role-pick">' +
      opt('admin', 'shield', 'Admin (HQ / Country Office)', 'Full access: all modules, finance, payroll, users, roles, approval workflows and audit log.') +
      opt('moderator', 'users', 'Moderator (Project Coordinator)', 'Field level: projects, tasks, distributions, team leave, purchase requests and first-level approvals.') +
      '</div><div class="field" style="margin-bottom:12px"><label>Email</label><input class="input" value="' + esc(S.users[sel].email) + '" readonly></div>' +
      '<div class="field" style="margin-bottom:18px"><label>Password</label><input class="input" type="password" value="demo-password" readonly></div>' +
      '<button class="btn primary" style="width:100%;justify-content:center;padding:11px" data-act="login">Sign in as ' + (sel === 'admin' ? 'Admin' : 'Moderator') + '</button>' +
      '<p class="small muted" style="text-align:center;margin-top:14px">Bangla + English, 2FA for finance and admin users in the final system.</p></div></section></div>';
  }

  function lockPage(page) {
    return '<div class="lock card card-b"><div class="ic">' + ic('lock') + '</div><h2 style="margin:0 0 6px">No access</h2><p class="muted">The <b>' + esc(navLabel(page) || page) + '</b> module is only available to Admin users. Moderators see the modules their role allows.</p><a class="btn primary" href="#/dashboard">Back to dashboard</a></div>';
  }

  var PAGES = {};

  PAGES.dashboard = function () {
    var u = me(), q = myQueue();
    var active = S.projects.filter(function (p) { return p.status === 'Ongoing'; });
    var budget = S.projects.reduce(function (s, p) { return s + p.budget; }, 0), spent = S.projects.reduce(function (s, p) { return s + p.spent; }, 0);
    var low = S.stock.filter(function (s) { return s.qty < s.min; });
    var delayed = S.activities.filter(function (a) { return a.status === 'Delayed'; });
    var bens = S.projects.reduce(function (s, p) { return s + p.beneficiaries; }, 0);
    var h = head('Good morning, ' + esc(u.name.split(' ')[0]), isAdmin() ? 'Country-wide overview for all programs, projects and departments.' : 'Your projects in Cox\'s Bazar camps and what needs your attention today.',
      isAdmin() ? '<button class="btn" data-act="toast" data-msg="Dashboard exported to PDF (demo)">' + ic('down') + 'Export</button><button class="btn primary" data-act="newProject">' + ic('plus') + 'New project</button>'
        : '<button class="btn" data-act="newLeave">' + ic('cal') + 'Leave request</button><button class="btn primary" data-act="newPR">' + ic('plus') + 'Purchase request</button>');

    h += '<div class="grid g4" style="margin-bottom:16px">';
    if (isAdmin()) {
      h += kpi('folder', '', 'Active projects', active.length, S.projects.length + ' total, 4 programs', '#/projects');
      h += kpi('coins', 'warn', 'Budget used', pct(spent, budget) + '%', short(spent) + ' of ' + short(budget), '#/finance');
      h += kpi('check', 'bad', 'Waiting for you', q.length, S.approvals.filter(function (a) { return a.status === 'Pending'; }).length + ' pending in total', '#/approvals');
      h += kpi('users', 'ok', 'Beneficiaries reached', bens.toLocaleString('en-IN'), 'across 6 camps', '#/reports');
    } else {
      h += kpi('check', 'bad', 'Approvals for you', q.length, 'first-level approvals', '#/approvals');
      h += kpi('alert', 'warn', 'Delayed activities', delayed.length, 'need follow-up', '#/projects');
      h += kpi('box', 'warn', 'Stock alerts', low.length, 'items below minimum', '#/inventory');
      h += kpi('users', 'ok', 'Team present today', S.attendance.filter(function (a) { return a.status === 'Present' || a.status === 'Late'; }).length + '/' + S.attendance.length, '1 on leave, 1 absent', '#/attendance');
    }
    h += '</div><div class="grid g3">';

    // Budget vs actual
    h += '<div class="card span2"><div class="card-h"><h3>Budget vs actual by project</h3><div class="spacer"></div><div class="legend"><span><i style="background:var(--brand-100)"></i>Budget</span><span><i style="background:var(--brand)"></i>Spent</span></div></div><div class="card-b bars">';
    var max = Math.max.apply(null, S.projects.map(function (p) { return p.budget; }));
    S.projects.filter(function (p) { return p.spent > 0; }).forEach(function (p) {
      var bp = p.budget / max * 100, ap = p.spent / max * 100, over = p.spent / p.budget > .9;
      h += '<div class="r" data-act="go" data-href="#/project/' + p.id + '" style="cursor:pointer"><span title="' + esc(p.name) + '" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(p.name) + '</span><div class="two"><i class="b" style="width:' + bp + '%"></i><i class="a ' + (over ? 'over' : '') + '" style="width:' + ap + '%"></i></div><span class="v num muted small">' + short(p.spent) + ' / ' + short(p.budget) + '</span></div>';
    });
    h += '</div></div>';

    // Approval queue
    h += '<div class="card"><div class="card-h"><h3>Waiting for your approval</h3><div class="spacer"></div><a href="#/approvals" class="small">View all</a></div>';
    h += q.length ? q.slice(0, 5).map(function (a) { return '<div class="list-item" data-act="openApproval" data-id="' + a.id + '"><span class="avatar sm">' + initials(a.requester) + '</span><div style="min-width:0;flex:1"><div class="t1" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(a.title) + '</div><div class="t2">' + a.type + ' · ' + esc(a.requester) + (a.amount ? ' · ' + money(a.amount) : '') + '</div></div>' + (a.priority === 'High' ? badge('High') : '') + '</div>'; }).join('') : '<div class="empty">All caught up.</div>';
    h += '</div>';

    // Delayed activities + stock alerts
    h += '<div class="card"><div class="card-h"><h3>Delayed activities</h3></div>' + delayed.map(function (a) { return '<div class="list-item" data-act="go" data-href="#/project/' + a.project + '"><div style="flex:1"><div class="t1">' + esc(a.name) + '</div><div class="t2">' + esc(pname(a.project)) + ' · due ' + date(a.due) + ' · ' + esc(a.owner) + '</div></div>' + badge('Delayed') + '</div>'; }).join('') + '</div>';
    h += '<div class="card"><div class="card-h"><h3>Stock alerts</h3><div class="spacer"></div><a href="#/inventory" class="small">Inventory</a></div>' + low.map(function (s) { return '<div class="list-item" data-act="go" data-href="#/inventory"><div style="flex:1"><div class="t1">' + esc(s.item) + '</div><div class="t2">' + esc(s.wh) + ' · ' + s.qty + ' / min ' + s.min + ' ' + s.unit + '</div></div>' + badge('Low stock') + '</div>'; }).join('') + '</div>';

    // Program donut (admin) or tasks (moderator)
    if (isAdmin()) {
      var tb = S.programs.reduce(function (s, p) { return s + p.budget; }, 0), cols = ['#008dd2', '#17915a', '#e0a020', '#5b5bd6'], acc = 0, stops = [];
      S.programs.forEach(function (p, i) { var a = acc; acc += p.budget / tb * 100; stops.push(cols[i] + ' ' + a + '% ' + acc + '%'); });
      h += '<div class="card"><div class="card-h"><h3>Budget by program</h3></div><div class="card-b row" style="gap:18px;align-items:center"><div class="donut" style="background:conic-gradient(' + stops.join(',') + ')"><div><span><b>' + short(tb).replace('৳ ', '') + '</b><span class="small muted">total</span></span></div></div><div style="display:grid;gap:8px;font-size:12.5px">' +
        S.programs.map(function (p, i) { return '<div><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:' + cols[i] + ';margin-right:6px"></i>' + esc(p.name) + '<div class="muted small" style="margin-left:16px">' + short(p.budget) + '</div></div>'; }).join('') + '</div></div></div>';
    } else {
      var mine = S.tasks.filter(function (t) { return t.col !== 'Done'; }).slice(0, 4);
      h += '<div class="card"><div class="card-h"><h3>Open tasks</h3><div class="spacer"></div><a href="#/tasks" class="small">Board</a></div>' + mine.map(function (t) { return '<div class="list-item" data-act="go" data-href="#/tasks"><div style="flex:1"><div class="t1">' + esc(t.title) + '</div><div class="t2">' + esc(t.owner) + ' · due ' + date(t.due) + '</div></div>' + badge(t.col) + '</div>'; }).join('') + '</div>';
    }
    h += '</div>';
    return h;
  };

  PAGES.approvals = function () {
    var all = S.approvals;
    var t = tabs('apr', [['mine', 'Waiting for me', myQueue().length], ['Pending', 'All pending', all.filter(function (a) { return a.status === 'Pending'; }).length], ['Approved', 'Approved'], ['Returned', 'Returned'], ['Rejected', 'Rejected']], 'mine');
    var type = ui.filter.aprType || '';
    var list = (t.cur === 'mine' ? myQueue() : all.filter(function (a) { return a.status === t.cur; })).filter(function (a) { return !type || a.type === type; });
    var types = ['Purchase', 'Payment', 'Leave', 'Project', 'Budget', 'Activity', 'Recruitment'];
    var h = head('Approvals', 'One approval engine for leave, purchase, payment, project, budget, activity and recruitment requests.', '', '');
    h += '<div class="notice" style="margin-bottom:14px">' + ic('shield') + '<span>' + (isAdmin() ? 'As <b>Admin</b> you act on Finance, Country Director, HQ and RRRC steps. First-level (Project Coordinator) steps belong to moderators.' : 'As <b>Moderator</b> you approve first-level requests from your team. Higher steps move to Finance, Country Director and HQ automatically.') + '</span></div>';
    h += t.html + '<div class="card"><div class="toolbar"><select class="select" data-act="filter" data-k="aprType"><option value="">All types</option>' + types.map(function (x) { return '<option ' + (x === type ? 'selected' : '') + '>' + x + '</option>'; }).join('') + '</select><span class="muted small">' + list.length + ' requests</span></div>';
    h += table([
      { t: 'Request', v: function (a) { return '<b>' + esc(a.title) + '</b><div class="small muted">' + a.id + ' · ' + date(a.date) + '</div>'; } },
      { t: 'Type', v: function (a) { return '<span class="tag">' + a.type + '</span>'; } },
      { t: 'Requester', v: function (a) { return esc(a.requester); } },
      { t: 'Amount', cls: 'right num', v: function (a) { return a.amount ? money(a.amount) : '-'; } },
      { t: 'Current step', v: function (a) { return a.status === 'Pending' ? esc(curStep(a)) + ' <span class="muted small">(' + (a.step + 1) + '/' + a.chain.length + ')</span>' : '-'; } },
      { t: 'Status', v: function (a) { return badge(a.status) + (canAct(a) ? ' <span class="badge info">Your turn</span>' : ''); } }
    ], list, { rowAct: 'openApproval', rowKey: 'id', empty: 'No requests here.' }) + '</div>';
    return h;
  };

  PAGES.projects = function () {
    var st = ui.filter.prjStatus || '', q = (ui.filter.prjQ || '').toLowerCase();
    var list = S.projects.filter(function (p) { return (!st || p.status === st) && (!q || (p.name + p.id + p.donor).toLowerCase().indexOf(q) > -1); });
    var h = head('Projects', 'Every transaction links back to a project, donor and camp.', '<button class="btn" data-act="toast" data-msg="Project list exported to Excel (demo)">' + ic('down') + 'Excel</button><button class="btn primary" data-act="newProject">' + ic('plus') + 'New project</button>');
    h += '<div class="card"><div class="toolbar"><input class="input" placeholder="Search by name, code or donor" data-act="filterInput" data-k="prjQ" value="' + esc(ui.filter.prjQ || '') + '" style="width:260px">' +
      '<select class="select" data-act="filter" data-k="prjStatus"><option value="">All statuses</option>' + ['Draft', 'Pending approval', 'Ongoing', 'On hold', 'Completed'].map(function (x) { return '<option ' + (x === st ? 'selected' : '') + '>' + x + '</option>'; }).join('') + '</select><span class="muted small">' + list.length + ' projects</span></div>';
    h += table([
      { t: 'Project', v: function (p) { return '<b>' + esc(p.name) + '</b><div class="small muted">' + p.id + ' · ' + p.camps.join(', ') + '</div>'; } },
      { t: 'Donor', v: function (p) { return esc(p.donor); } },
      { t: 'Budget', cls: 'right num', v: function (p) { return short(p.budget); } },
      { t: 'Spent', v: function (p) { var b = pct(p.spent, p.budget); return '<div class="row" style="min-width:140px">' + barHtml(b, burnCls(b)) + '<span class="small num">' + b + '%</span></div>'; } },
      { t: 'Progress', v: function (p) { return '<div class="row" style="min-width:120px">' + barHtml(p.progress, 'ok') + '<span class="small num">' + p.progress + '%</span></div>'; } },
      { t: 'Manager', v: function (p) { return esc(p.manager); } },
      { t: 'Status', v: function (p) { return badge(p.status); } }
    ], list, { link: function (p) { return '#/project/' + p.id; } }) + '</div>';
    return h;
  };

  function projectDetail(id) {
    var p = project(id);
    if (!p) return head('Project not found', '', '<a class="btn" href="#/projects">Back</a>');
    var prog = S.programs.filter(function (x) { return x.id === p.program; })[0];
    var t = tabs('prj', [['overview', 'Overview'], ['budget', 'Budget'], ['activities', 'Activities', S.activities.filter(function (a) { return a.project === id; }).length], ['dist', 'Beneficiaries & distribution'], ['docs', 'Documents'], ['history', 'Approval history']]);
    var actions = '<button class="btn" data-act="toast" data-msg="Project completion report generated (demo)">' + ic('file') + 'Report</button>';
    if (p.status === 'Draft') actions += '<button class="btn primary" data-act="submitProject" data-id="' + p.id + '">Submit for approval</button>';
    else actions += '<button class="btn primary" data-act="newActivity" data-id="' + p.id + '">' + ic('plus') + 'Activity</button>';
    var h = head(esc(p.name) + ' ' + badge(p.status), p.id + ' · ' + esc(prog ? prog.name : '') + ' · ' + esc(p.donor), actions, '<a href="#/projects">Projects</a> / ' + p.id);
    h += t.html;
    var b = pct(p.spent, p.budget);
    if (t.cur === 'overview') {
      h += '<div class="grid g4" style="margin-bottom:16px">' +
        kpi('coins', 'warn', 'Budget used', b + '%', short(p.spent) + ' of ' + short(p.budget), '#/project/' + id) +
        kpi('chart', 'ok', 'Progress', p.progress + '%', 'activities completed', '#/project/' + id) +
        kpi('users', '', 'Beneficiaries', p.beneficiaries.toLocaleString('en-IN'), 'target ' + p.target.toLocaleString('en-IN'), '#/project/' + id) +
        kpi('alert', p.risk === 'High' ? 'bad' : 'warn', 'Risk level', p.risk, 'from monitoring', '#/project/' + id) + '</div>';
      h += '<div class="grid g2"><div class="card"><div class="card-h"><h3>Project details</h3></div><div class="card-b"><dl class="kv">' +
        '<dt>Program</dt><dd>' + esc(prog ? prog.name : '-') + '</dd><dt>Donor</dt><dd>' + esc(p.donor) + '</dd><dt>Camps</dt><dd>' + p.camps.map(function (c) { return '<span class="tag">' + c + '</span>'; }).join(' ') + '</dd>' +
        '<dt>Duration</dt><dd>' + date(p.start) + ' to ' + date(p.end) + '</dd><dt>Manager</dt><dd>' + esc(p.manager) + '</dd><dt>Approvals</dt><dd>HQ ✓ · RRRC ' + (p.status === 'Ongoing' || p.status === 'Completed' ? '✓' : 'pending') + '</dd></dl></div></div>' +
        '<div class="card"><div class="card-h"><h3>Monitoring</h3></div><div class="card-b"><div class="section-t" style="margin-top:0">Beneficiary target</div><div class="row">' + barHtml(pct(p.beneficiaries, p.target), 'ok') + '<span class="small num">' + pct(p.beneficiaries, p.target) + '%</span></div>' +
        '<div class="section-t">Budget burn vs time</div><div class="row">' + barHtml(b, burnCls(b)) + '<span class="small num">' + b + '%</span></div>' +
        '<div class="section-t">Latest updates</div><div class="timeline"><div><b>Distribution completed</b> in Camp 8E<div class="small muted">26 Oct 2026 · Sabina Akter</div></div><div><b>PR-0457</b> raised for 3,000 baskets<div class="small muted">06 Nov 2026 · Tanvir Ahmed</div></div><div><b>Monthly report</b> drafted<div class="small muted">06 Nov 2026 · Nadia Rahman</div></div></div></div></div></div>';
    } else if (t.cur === 'budget') {
      var lines = [['Food items', .62], ['Transport & logistics', .1], ['Staff cost', .14], ['Monitoring & evaluation', .04], ['Admin overhead (7%)', .07], ['Contingency', .03]];
      h += '<div class="card">' + table([
        { t: 'Budget line', v: function (l) { return '<b>' + l[0] + '</b>'; } },
        { t: 'Budget', cls: 'right num', v: function (l) { return money(Math.round(p.budget * l[1])); } },
        { t: 'Actual', cls: 'right num', v: function (l, i) { return money(Math.round(p.spent * l[1] * (i === 1 ? 1.25 : .97))); } },
        { t: 'Variance', cls: 'right num', v: function (l, i) { var v = Math.round(p.budget * l[1] - p.spent * l[1] * (i === 1 ? 1.25 : .97)); return '<span style="color:' + (v < 0 ? 'var(--bad)' : 'var(--ok)') + '">' + money(v) + '</span>'; } },
        { t: 'Used', v: function (l, i) { var u = Math.round(p.spent * (i === 1 ? 1.25 : .97) / p.budget * 100); return '<div class="row">' + barHtml(u, burnCls(u)) + '<span class="small">' + u + '%</span></div>'; } }
      ], lines) + '</div>' + (isAdmin() ? '' : '<p class="small muted">Moderators can view the budget. Budget revisions go through Finance and HQ approval.</p>');
    } else if (t.cur === 'activities') {
      h += '<div class="card">' + table([
        { t: 'Activity', v: function (a) { return '<b>' + esc(a.name) + '</b>'; } },
        { t: 'Owner', v: function (a) { return esc(a.owner); } },
        { t: 'Due', v: function (a) { return date(a.due); } },
        { t: 'Status', v: function (a) { return badge(a.status); } },
        { t: '', cls: 'right', v: function (a) { return a.status !== 'Done' ? '<button class="btn sm" data-act="doneActivity" data-n="' + esc(a.name) + '">Mark done</button>' : ''; } }
      ], S.activities.filter(function (a) { return a.project === id; }), { empty: 'No activities yet. Add the first one.' }) + '</div>';
    } else if (t.cur === 'dist') {
      var d = S.distributions.filter(function (x) { return x.project === id; });
      h += '<div class="grid g3" style="margin-bottom:16px">' + kpi('users', 'ok', 'Households reached', p.beneficiaries.toLocaleString('en-IN'), 'target ' + p.target.toLocaleString('en-IN'), '#/project/' + id) + kpi('box', '', 'Distributions', d.length, d.filter(function (x) { return x.status === 'Completed'; }).length + ' completed', '#/project/' + id) + kpi('map', 'warn', 'Camps', p.camps.length, p.camps.join(', '), '#/project/' + id) + '</div>';
      h += '<div class="card"><div class="card-h"><h3>Distributions</h3><div class="spacer"></div><button class="btn sm primary" data-act="newDistribution" data-id="' + id + '">' + ic('plus') + 'Plan distribution</button></div>' + distTable(d) + '</div>';
    } else if (t.cur === 'docs') {
      var docs = S.documents.filter(function (x) { return x.project === id; });
      h += '<div class="card card-b">' + (docs.length ? docs.map(function (x) { return '<div class="file">' + ic('file') + '<b>' + esc(x.name) + '</b><span class="muted small">' + x.version + ' · ' + esc(x.type) + '</span><div class="spacer"></div>' + expBadge(x.expiry) + '</div>'; }).join('') : '<div class="empty">No documents yet.</div>') + '<button class="btn" data-act="toast" data-msg="Upload dialog would open here (demo)">' + ic('plus') + 'Upload document</button></div>';
    } else {
      var ap = S.approvals.filter(function (a) { return a.project === id; });
      h += '<div class="card">' + table([
        { t: 'Request', v: function (a) { return '<b>' + esc(a.title) + '</b><div class="small muted">' + a.id + '</div>'; } },
        { t: 'Date', v: function (a) { return date(a.date); } },
        { t: 'Status', v: function (a) { return badge(a.status); } }
      ], ap, { rowAct: 'openApproval', rowKey: 'id', empty: 'No approvals for this project yet.' }) + '</div>';
    }
    return h;
  }

  function distTable(d) {
    return table([
      { t: 'ID', v: function (x) { return '<b>' + x.id + '</b>'; } },
      { t: 'Project', v: function (x) { return esc(pname(x.project)); } },
      { t: 'Camp', v: function (x) { return x.camp; } },
      { t: 'Item', v: function (x) { return esc(x.item); } },
      { t: 'Households', cls: 'right num', v: function (x) { return x.households.toLocaleString('en-IN'); } },
      { t: 'Date', v: function (x) { return date(x.date); } },
      { t: 'Status', v: function (x) { return badge(x.status); } },
      { t: '', cls: 'right', v: function (x) { return x.status === 'Scheduled' ? '<button class="btn sm" data-act="completeDist" data-id="' + x.id + '">Complete</button>' : ''; } }
    ], d, { empty: 'No distributions yet.' });
  }

  function expBadge(e) {
    if (!e || e === '-') return '<span class="muted small">No expiry</span>';
    var d = daysTo(e);
    if (d < 0) return badge('Expired');
    if (d <= 30) return '<span class="badge warn">Expires in ' + d + ' days</span>';
    return '<span class="small muted">Expires ' + date(e) + '</span>';
  }

  PAGES.programs = function () {
    var h = head('Programs', 'Programs group projects so that program-wise accounting and reports work.', isAdmin() ? '<button class="btn primary" data-act="toast" data-msg="New program form (demo)">' + ic('plus') + 'New program</button>' : '');
    h += '<div class="grid g2">' + S.programs.map(function (g) {
      var ps = S.projects.filter(function (p) { return p.program === g.id; }), b = pct(g.spent, g.budget);
      return '<div class="card"><div class="card-h"><h3>' + esc(g.name) + '</h3><div class="spacer"></div><span class="tag">' + g.id + '</span></div><div class="card-b"><div class="row" style="margin-bottom:6px"><span class="muted small">Lead: ' + esc(g.lead) + '</span><div class="spacer"></div><span class="small num">' + short(g.spent) + ' / ' + short(g.budget) + '</span></div>' + barHtml(b, burnCls(b)) +
        '<div class="section-t">Projects</div>' + ps.map(function (p) { return '<div class="list-item" style="padding:9px 0" data-act="go" data-href="#/project/' + p.id + '"><div style="flex:1"><div class="t1">' + esc(p.name) + '</div><div class="t2">' + p.id + '</div></div>' + badge(p.status) + '</div>'; }).join('') + '</div></div>';
    }).join('') + '</div>';
    return h;
  };

  PAGES.distributions = function () {
    return head('Distributions', 'Relief distributions reduce stock and count toward project beneficiary targets.', '<button class="btn primary" data-act="newDistribution">' + ic('plus') + 'Plan distribution</button>') +
      '<div class="card">' + distTable(S.distributions) + '</div>';
  };

  PAGES.tasks = function () {
    var colsN = ['To do', 'In progress', 'Review', 'Done'];
    var h = head('Tasks', 'Click a card to move it to the next column.', '<button class="btn primary" data-act="newTask">' + ic('plus') + 'New task</button>');
    h += '<div class="kanban">' + colsN.map(function (c) {
      var ts = S.tasks.filter(function (t) { return t.col === c; });
      return '<div class="col"><h4>' + c + '<span>' + ts.length + '</span></h4>' + ts.map(function (t) {
        return '<div class="kcard" data-act="moveTask" data-id="' + t.id + '"><b>' + esc(t.title) + '</b><div class="row small muted"><span class="avatar sm" style="width:22px;height:22px;font-size:10px">' + initials(t.owner) + '</span>' + esc(t.owner.split(' ')[0]) + '<div class="spacer"></div>' + (t.pri === 'High' ? badge('High') : '') + '<span>' + date(t.due).slice(0, 6) + '</span></div><div class="small muted" style="margin-top:6px">' + esc(pname(t.project)) + '</div></div>';
      }).join('') + '</div>';
    }).join('') + '</div>';
    return h;
  };

  PAGES.staff = function () {
    var q = (ui.filter.staffQ || '').toLowerCase(), dept = ui.filter.staffDept || '';
    var depts = S.staff.map(function (s) { return s.dept; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
    var list = S.staff.filter(function (s) { return (!dept || s.dept === dept) && (!q || (s.name + s.title + s.id).toLowerCase().indexOf(q) > -1); });
    var h = head('Staff', S.staff.length + ' staff across Dhaka, Cox\'s Bazar and camp sites.', isAdmin() ? '<button class="btn primary" data-act="newStaff">' + ic('plus') + 'Add staff</button>' : '');
    h += '<div class="card"><div class="toolbar"><input class="input" placeholder="Search staff" data-act="filterInput" data-k="staffQ" value="' + esc(ui.filter.staffQ || '') + '" style="width:220px"><select class="select" data-act="filter" data-k="staffDept"><option value="">All departments</option>' + depts.map(function (d) { return '<option ' + (d === dept ? 'selected' : '') + '>' + d + '</option>'; }).join('') + '</select></div>';
    h += table([
      { t: 'Name', v: function (s) { return '<div class="row"><span class="avatar sm">' + initials(s.name) + '</span><div><b>' + esc(s.name) + '</b><div class="small muted">' + s.id + '</div></div></div>'; } },
      { t: 'Title', v: function (s) { return esc(s.title); } },
      { t: 'Department', v: function (s) { return '<span class="tag">' + s.dept + '</span>'; } },
      { t: 'Location', v: function (s) { return esc(s.location); } },
      { t: 'Type', v: function (s) { return s.type; } },
      { t: 'Joined', v: function (s) { return date(s.joined); } },
      { t: 'Status', v: function (s) { return badge(s.status); } }
    ], list, { rowAct: 'openStaff', rowKey: 'id' }) + '</div>';
    return h;
  };

  PAGES.attendance = function () {
    var t = tabs('att', [['today', 'Today\'s attendance'], ['leave', 'Leave requests'], ['balance', 'Leave balance']]);
    var h = head('Attendance & Leave', 'Saturday, 08 November 2026', '<button class="btn" data-act="newLeave">' + ic('cal') + 'Request leave</button>' + (isAdmin() ? '<button class="btn" data-act="toast" data-msg="Biometric device sync started (demo)">' + ic('refresh') + 'Sync device</button>' : ''));
    h += t.html;
    if (t.cur === 'today') {
      var c = function (s) { return S.attendance.filter(function (a) { return a.status === s; }).length; };
      h += '<div class="grid g4" style="margin-bottom:16px">' + kpi('ok', 'ok', 'Present', c('Present'), 'checked in', '#/attendance') + kpi('clock', 'warn', 'Late', c('Late'), 'after 09:15', '#/attendance') + kpi('cal', '', 'On leave', c('On leave'), 'approved', '#/attendance') + kpi('x', 'bad', 'Absent', c('Absent'), 'no check-in', '#/attendance') + '</div>';
      h += '<div class="card">' + table([
        { t: 'Staff', v: function (a) { return '<b>' + esc(a.name) + '</b>'; } },
        { t: 'Check-in', cls: 'num', v: function (a) { return a.in; } },
        { t: 'Check-out', cls: 'num', v: function (a) { return a.out; } },
        { t: 'Site', v: function (a) { return esc(a.site); } },
        { t: 'Status', v: function (a) { return badge(a.status); } }
      ], S.attendance) + '</div>';
    } else if (t.cur === 'leave') {
      var lv = S.approvals.filter(function (a) { return a.type === 'Leave'; });
      h += '<div class="card">' + table([
        { t: 'Request', v: function (a) { return '<b>' + esc(a.title) + '</b><div class="small muted">' + a.id + '</div>'; } },
        { t: 'Staff', v: function (a) { return esc(a.requester); } },
        { t: 'Submitted', v: function (a) { return date(a.date); } },
        { t: 'Status', v: function (a) { return badge(a.status) + (canAct(a) ? ' <span class="badge info">Your turn</span>' : ''); } }
      ], lv, { rowAct: 'openApproval', rowKey: 'id' }) + '</div>';
    } else {
      h += '<div class="card">' + table([
        { t: 'Staff', v: function (s) { return '<b>' + esc(s.name) + '</b>'; } },
        { t: 'Annual', cls: 'num', v: function (s, i) { return (20 - i % 7) + ' / 20'; } },
        { t: 'Sick', cls: 'num', v: function (s, i) { return (14 - i % 4) + ' / 14'; } },
        { t: 'Casual', cls: 'num', v: function (s, i) { return (10 - i % 3) + ' / 10'; } }
      ], S.staff.filter(function (s) { return s.type === 'National'; })) + '</div>';
    }
    return h;
  };

  PAGES.payroll = function () {
    var gross = function (p) { return p.basic + p.allow + p.ot; };
    var tot = S.payroll.reduce(function (s, p) { return s + gross(p) - p.deduct; }, 0);
    var h = head('Payroll - November 2026', 'Salaries are charged to projects, so payroll posts straight into project budgets.', '<button class="btn" data-act="toast" data-msg="Payslips generated as PDF (demo)">' + ic('file') + 'Payslips</button><button class="btn primary" data-act="runPayroll">Run payroll</button>');
    h += '<div class="grid g4" style="margin-bottom:16px">' + kpi('users', '', 'Employees', S.payroll.length, 'national staff', '#/payroll') + kpi('wallet', 'ok', 'Net payable', short(tot), 'this month', '#/payroll') + kpi('clock', 'warn', 'Overtime', money(S.payroll.reduce(function (s, p) { return s + p.ot; }, 0)), 'approved hours', '#/payroll') + kpi('coins', '', 'Status', S.payrollRun ? 'Posted' : 'Draft', S.payrollRun ? 'posted to finance' : 'not yet posted', '#/payroll') + '</div>';
    h += '<div class="card">' + table([
      { t: 'Employee', v: function (p) { return '<b>' + esc(p.name) + '</b><div class="small muted">' + p.id + '</div>'; } },
      { t: 'Charged to', v: function (p) { return '<span class="tag">' + p.project + '</span>'; } },
      { t: 'Basic', cls: 'right num', v: function (p) { return money(p.basic); } },
      { t: 'Allowances', cls: 'right num', v: function (p) { return money(p.allow); } },
      { t: 'Overtime', cls: 'right num', v: function (p) { return money(p.ot); } },
      { t: 'Deductions', cls: 'right num', v: function (p) { return money(p.deduct); } },
      { t: 'Net pay', cls: 'right num', v: function (p) { return '<b>' + money(gross(p) - p.deduct) + '</b>'; } }
    ], S.payroll) + '</div>';
    return h;
  };

  var STAGES = ['PR', 'RFQ', 'Quotation', 'PO', 'GRN', 'Invoice', 'Payment', 'Paid'];
  PAGES.procurement = function () {
    var st = ui.filter.procStage || '';
    var list = S.procurement.filter(function (p) { return !st || p.stage === st; });
    var h = head('Procurement', 'PR → RFQ → quotation comparison → PO → GRN → invoice → payment request.', '<button class="btn primary" data-act="newPR">' + ic('plus') + 'Purchase request</button>');
    h += '<div class="pipe" style="margin-bottom:16px">' + STAGES.map(function (s) { var n = S.procurement.filter(function (p) { return p.stage === s; }).length; return '<div class="' + (st === s ? 'on' : '') + '" data-act="procStage" data-v="' + s + '"><b>' + n + '</b><span>' + s + '</span></div>'; }).join('') + '</div>';
    h += '<div class="card"><div class="toolbar"><span class="muted small">' + (st ? 'Stage: <b>' + st + '</b> · <a href="javascript:void 0" data-act="procStage" data-v="">show all</a>' : 'All stages') + '</span></div>' + table([
      { t: 'PR', v: function (p) { return '<b>' + p.id + '</b><div class="small muted">' + date(p.date) + '</div>'; } },
      { t: 'Items', v: function (p) { return esc(p.item); } },
      { t: 'Project', v: function (p) { return esc(pname(p.project)); } },
      { t: 'Supplier', v: function (p) { return esc(p.supplier); } },
      { t: 'Amount', cls: 'right num', v: function (p) { return money(p.amount); } },
      { t: 'Stage', v: function (p) { return '<span class="badge ' + (p.stage === 'Paid' ? 'ok' : 'info') + '">' + p.stage + '</span>'; } },
      { t: '', cls: 'right', v: function (p) { return p.stage !== 'Paid' && (isAdmin() || ['PR', 'RFQ', 'Quotation', 'GRN'].indexOf(p.stage) > -1) ? '<button class="btn sm" data-act="advanceProc" data-id="' + p.id + '">Next: ' + STAGES[STAGES.indexOf(p.stage) + 1] + '</button>' : ''; } }
    ], list) + '</div>';
    return h;
  };

  PAGES.suppliers = function () {
    var h = head('Suppliers', 'Supplier register with evaluation scores.', isAdmin() ? '<button class="btn primary" data-act="toast" data-msg="New supplier form (demo)">' + ic('plus') + 'Add supplier</button>' : '');
    h += '<div class="card">' + table([
      { t: 'Supplier', v: function (s) { return '<b>' + esc(s.name) + '</b><div class="small muted">' + s.id + ' · ' + esc(s.city) + '</div>'; } },
      { t: 'Category', v: function (s) { return '<span class="tag">' + esc(s.category) + '</span>'; } },
      { t: 'Rating', v: function (s) { return '<b>' + s.rating.toFixed(1) + '</b> <span class="muted">/ 5</span>'; } },
      { t: 'Orders', cls: 'num', v: function (s) { return s.orders; } },
      { t: 'On-time delivery', v: function (s) { return '<div class="row">' + barHtml(s.onTime, s.onTime < 75 ? 'bad' : s.onTime < 90 ? 'warn' : 'ok') + '<span class="small">' + s.onTime + '%</span></div>'; } },
      { t: 'Status', v: function (s) { return badge(s.status); } }
    ], S.suppliers) + '</div>';
    return h;
  };

  PAGES.inventory = function () {
    var wh = ui.filter.wh || '';
    var whs = S.stock.map(function (s) { return s.wh; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
    var list = S.stock.filter(function (s) { return !wh || s.wh === wh; });
    var h = head('Inventory & Warehouse', 'Multi-warehouse, camp-wise stock with expiry and minimum-stock alerts.', '<button class="btn" data-act="toast" data-msg="Stock ledger exported to Excel (demo)">' + ic('down') + 'Ledger</button>' + (isAdmin() ? '<button class="btn primary" data-act="toast" data-msg="Stock transfer form (demo)">' + ic('swap') + 'Transfer stock</button>' : ''));
    h += '<div class="grid g4" style="margin-bottom:16px">' + kpi('box', '', 'Stock items', S.stock.length, whs.length + ' warehouses / stores', '#/inventory') + kpi('alert', 'bad', 'Below minimum', S.stock.filter(function (s) { return s.qty < s.min; }).length, 'reorder needed', '#/inventory') + kpi('clock', 'warn', 'Expiring in 30 days', S.stock.filter(function (s) { return s.expiry !== '-' && daysTo(s.expiry) <= 30; }).length, 'use or redistribute', '#/inventory') + kpi('truck', 'ok', 'Pending GRN', S.procurement.filter(function (p) { return p.stage === 'GRN'; }).length, 'goods to receive', '#/procurement') + '</div>';
    h += '<div class="card"><div class="toolbar"><select class="select" data-act="filter" data-k="wh"><option value="">All warehouses</option>' + whs.map(function (w) { return '<option ' + (w === wh ? 'selected' : '') + '>' + w + '</option>'; }).join('') + '</select></div>' + table([
      { t: 'Item', v: function (s) { return '<b>' + esc(s.item) + '</b><div class="small muted">' + s.sku + '</div>'; } },
      { t: 'Warehouse', v: function (s) { return esc(s.wh); } },
      { t: 'Project', v: function (s) { return '<span class="tag">' + s.project + '</span>'; } },
      { t: 'In stock', cls: 'right num', v: function (s) { return '<b style="color:' + (s.qty < s.min ? 'var(--bad)' : 'inherit') + '">' + s.qty.toLocaleString('en-IN') + '</b> ' + s.unit; } },
      { t: 'Min', cls: 'right num', v: function (s) { return s.min.toLocaleString('en-IN'); } },
      { t: 'Expiry', v: function (s) { return expBadge(s.expiry); } },
      { t: 'Status', v: function (s) { return s.qty < s.min ? badge('Low stock') : badge('Available'); } }
    ], list) + '</div>';
    return h;
  };
  BADGE.bad.push('Low stock');

  PAGES.finance = function () {
    var t = tabs('fin', [['bva', 'Budget vs actual'], ['donor', 'By donor'], ['vouchers', 'Vouchers'], ['cash', 'Cash & bank']]);
    var h = head('Finance & Accounts', 'Project, donor, department and program dimensions on every posting.', '<button class="btn" data-act="toast" data-msg="Financial report exported (demo)">' + ic('down') + 'Export</button><button class="btn primary" data-act="toast" data-msg="New voucher form (demo)">' + ic('plus') + 'New voucher</button>');
    h += t.html;
    if (t.cur === 'bva') {
      h += '<div class="card">' + table([
        { t: 'Project', v: function (p) { return '<b>' + esc(p.name) + '</b><div class="small muted">' + p.id + '</div>'; } },
        { t: 'Budget', cls: 'right num', v: function (p) { return money(p.budget); } },
        { t: 'Actual', cls: 'right num', v: function (p) { return money(p.spent); } },
        { t: 'Remaining', cls: 'right num', v: function (p) { return money(p.budget - p.spent); } },
        { t: 'Used', v: function (p) { var b = pct(p.spent, p.budget); return '<div class="row" style="min-width:130px">' + barHtml(b, burnCls(b)) + '<span class="small">' + b + '%</span></div>'; } }
      ], S.projects, { link: function (p) { return '#/project/' + p.id; } }) + '</div>';
    } else if (t.cur === 'donor') {
      var d = {};
      S.projects.forEach(function (p) { d[p.donor] = d[p.donor] || { donor: p.donor, budget: 0, spent: 0, n: 0 }; d[p.donor].budget += p.budget; d[p.donor].spent += p.spent; d[p.donor].n++; });
      h += '<div class="card">' + table([
        { t: 'Donor / fund', v: function (x) { return '<b>' + esc(x.donor) + '</b><div class="small muted">' + x.n + ' project(s)</div>'; } },
        { t: 'Committed', cls: 'right num', v: function (x) { return money(x.budget); } },
        { t: 'Spent', cls: 'right num', v: function (x) { return money(x.spent); } },
        { t: 'Used', v: function (x) { var b = pct(x.spent, x.budget); return '<div class="row" style="min-width:130px">' + barHtml(b, burnCls(b)) + '<span class="small">' + b + '%</span></div>'; } },
        { t: '', cls: 'right', v: function () { return '<button class="btn sm" data-act="toast" data-msg="Donor report generated (demo)">Donor report</button>'; } }
      ], Object.keys(d).map(function (k) { return d[k]; })) + '</div>';
    } else if (t.cur === 'vouchers') {
      h += '<div class="card">' + table([
        { t: 'Voucher', v: function (v) { return '<b>' + v.id + '</b><div class="small muted">' + date(v.date) + '</div>'; } },
        { t: 'Description', v: function (v) { return esc(v.desc); } },
        { t: 'Account', v: function (v) { return esc(v.account); } },
        { t: 'Project / donor', v: function (v) { return '<span class="tag">' + v.project + '</span><div class="small muted">' + esc(v.donor) + '</div>'; } },
        { t: 'Debit', cls: 'right num', v: function (v) { return v.debit ? money(v.debit) : '-'; } },
        { t: 'Credit', cls: 'right num', v: function (v) { return v.credit ? money(v.credit) : '-'; } }
      ], S.vouchers) + '</div>';
    } else {
      h += '<div class="grid g4">' + S.accounts.map(function (a) { return kpi(a.type === 'Bank' ? 'coins' : 'wallet', a.type === 'Bank' ? '' : 'ok', a.name, short(a.balance), a.type, '#/finance'); }).join('') + '</div>';
    }
    return h;
  };

  PAGES.documents = function () {
    var h = head('Documents', 'Version control, expiry reminders, access control and archive.', '<button class="btn primary" data-act="toast" data-msg="Upload dialog would open here (demo)">' + ic('plus') + 'Upload</button>');
    var exp = S.documents.filter(function (d) { return d.expiry !== '-' && daysTo(d.expiry) <= 30; });
    if (exp.length) h += '<div class="notice warn" style="margin-bottom:14px">' + ic('alert') + '<span><b>' + exp.length + ' documents expire within 30 days:</b> ' + exp.map(function (d) { return esc(d.name); }).join(', ') + '.</span></div>';
    h += '<div class="card">' + table([
      { t: 'Document', v: function (d) { return '<div class="row">' + ic('file') + '<div><b>' + esc(d.name) + '</b><div class="small muted">' + d.id + ' · ' + d.version + '</div></div></div>'; } },
      { t: 'Type', v: function (d) { return '<span class="tag">' + esc(d.type) + '</span>'; } },
      { t: 'Project', v: function (d) { return d.project === '-' ? '-' : esc(pname(d.project)); } },
      { t: 'Owner', v: function (d) { return esc(d.owner); } },
      { t: 'Access', v: function (d) { return esc(d.access); } },
      { t: 'Expiry', v: function (d) { return expBadge(d.expiry); } }
    ], S.documents) + '</div>';
    return h;
  };

  PAGES.field = function () {
    var t = tabs('fld', [['fac', 'Facilities'], ['visits', 'Visit schedule']]);
    var h = head('Field & Facilities', 'Facility register, visit assignments, security staff and volunteers.', '<button class="btn primary" data-act="newVisit">' + ic('plus') + 'Assign visit</button>');
    h += t.html;
    if (t.cur === 'fac') {
      h += '<div class="grid g3">' + S.facilities.map(function (f) {
        return '<div class="card"><div class="card-h"><div><h3>' + esc(f.name) + '</h3><div class="small muted">' + f.id + ' · ' + f.camp + '</div></div><div class="spacer"></div>' + badge(f.status) + '</div><div class="card-b"><dl class="kv" style="grid-template-columns:110px 1fr"><dt>Type</dt><dd>' + esc(f.type) + '</dd><dt>Manager</dt><dd>' + esc(f.manager) + '</dd><dt>Security</dt><dd>' + f.security + ' guards</dd><dt>Volunteers</dt><dd>' + f.volunteers + '</dd><dt>Last visit</dt><dd>' + date(f.lastVisit) + '</dd></dl><div class="row" style="margin-top:14px"><button class="btn sm" data-act="toast" data-msg="Camera opens on mobile to capture GPS-tagged photos (demo)">' + ic('camera') + 'Photos</button><button class="btn sm" data-act="newVisit" data-f="' + esc(f.name) + '">Assign visit</button></div></div></div>';
      }).join('') + '</div>';
    } else {
      h += '<div class="card">' + table([
        { t: 'Date', v: function (v) { return date(v.date); } },
        { t: 'Facility', v: function (v) { return '<b>' + esc(v.facility) + '</b>'; } },
        { t: 'Assigned to', v: function (v) { return esc(v.by); } },
        { t: 'Purpose', v: function (v) { return esc(v.purpose); } },
        { t: 'Status', v: function (v) { return badge(v.status); } }
      ], S.visits) + '</div>';
    }
    return h;
  };

  PAGES.reports = function () {
    var h = head('Monitoring, Evaluation & Reporting', 'Indicators and donor-ready reports, exportable to PDF and Excel.', '<button class="btn primary" data-act="toast" data-msg="Report builder (demo)">' + ic('plus') + 'New report</button>');
    h += '<div class="grid g2"><div class="card"><div class="card-h"><h3>Key indicators</h3></div><div class="card-b" style="display:grid;gap:16px">' + S.indicators.map(function (i) {
      var p = pct(i.actual, i.target);
      return '<div><div class="row" style="margin-bottom:6px"><b style="font-weight:600">' + esc(i.name) + '</b><div class="spacer"></div><span class="small num">' + i.actual.toLocaleString('en-IN') + ' / ' + i.target.toLocaleString('en-IN') + ' ' + i.unit + '</span></div>' + barHtml(p, p >= 90 ? 'ok' : p < 70 ? 'warn' : '') + '<div class="small muted" style="margin-top:4px">' + esc(pname(i.project)) + '</div></div>';
    }).join('') + '</div></div>';
    h += '<div class="card"><div class="card-h"><h3>Reports</h3></div>' + table([
      { t: 'Report', v: function (r) { return '<b>' + esc(r.name) + '</b><div class="small muted">' + r.type + ' · ' + esc(r.project === 'All projects' || r.project.indexOf('PRJ') < 0 ? r.project : pname(r.project)) + '</div>'; } },
      { t: 'Status', v: function (r) { return badge(r.status); } },
      { t: '', cls: 'right', v: function () { return '<div class="row" style="justify-content:flex-end"><button class="btn sm" data-act="toast" data-msg="PDF downloaded (demo)">PDF</button><button class="btn sm" data-act="toast" data-msg="Excel downloaded (demo)">Excel</button></div>'; } }
    ], S.reports) + '</div></div>';
    return h;
  };

  PAGES.communication = function () {
    var h = head('Communication', 'Announcements, notices, deadline and emergency alerts by SMS, email and in-app.', '<button class="btn primary" data-act="newAnnouncement">' + ic('mega') + 'New announcement</button>');
    h += '<div class="card">' + S.announcements.map(function (a) {
      return '<div class="list-item"><div class="kpi" style="padding:0;cursor:default"><div class="ic ' + (a.type === 'Emergency' ? 'bad' : a.type === 'Deadline' ? 'warn' : '') + '">' + ic(a.type === 'Emergency' ? 'alert' : 'mega') + '</div></div><div style="flex:1"><div class="t1">' + esc(a.title) + '</div><div class="t2">' + esc(a.audience) + ' · ' + esc(a.channel) + ' · ' + date(a.date) + '</div></div>' + badge(a.type) + '</div>';
    }).join('') + '</div>';
    return h;
  };

  PAGES.assets = function () {
    var t = tabs('ast', [['veh', 'Vehicles'], ['assets', 'Assets']]);
    var h = head('Vehicles & Assets', 'Vehicle use, service and fitness dates; asset register with custodians.', isAdmin() ? '<button class="btn primary" data-act="toast" data-msg="New asset form (demo)">' + ic('plus') + 'Add</button>' : '<button class="btn primary" data-act="toast" data-msg="Vehicle requisition sent to Logistics (demo)">' + ic('car') + 'Request vehicle</button>');
    h += t.html + '<div class="card">';
    if (t.cur === 'veh') {
      h += table([
        { t: 'Vehicle', v: function (v) { return '<b>' + v.id + '</b><div class="small muted">' + v.type + '</div>'; } },
        { t: 'Driver', v: function (v) { return esc(v.driver); } },
        { t: 'Odometer', cls: 'right num', v: function (v) { return v.km.toLocaleString('en-IN') + ' km'; } },
        { t: 'Next service', v: function (v) { return expBadge(v.nextService); } },
        { t: 'Fitness', v: function (v) { return expBadge(v.fitness); } },
        { t: 'Status', v: function (v) { return badge(v.status); } }
      ], S.vehicles);
    } else {
      h += table([
        { t: 'Asset', v: function (a) { return '<b>' + esc(a.name) + '</b><div class="small muted">' + a.tag + '</div>'; } },
        { t: 'Location', v: function (a) { return esc(a.location); } },
        { t: 'Custodian', v: function (a) { return esc(a.custodian); } },
        { t: 'Value', cls: 'right num', v: function (a) { return money(a.value); } },
        { t: 'Status', v: function (a) { return badge(a.status); } }
      ], S.assets);
    }
    return h + '</div>';
  };

  PAGES.users = function () {
    var t = tabs('usr', [['users', 'Users', S.sysUsers.length], ['roles', 'Roles & permissions']]);
    var h = head('Users & Roles', 'Role-based access. Admin and finance users must use 2FA.', '<button class="btn primary" data-act="newUser">' + ic('plus') + 'Invite user</button>');
    h += t.html;
    if (t.cur === 'users') {
      h += '<div class="card">' + table([
        { t: 'User', v: function (u) { return '<div class="row"><span class="avatar sm">' + initials(u.name) + '</span><div><b>' + esc(u.name) + '</b><div class="small muted">' + esc(u.email) + '</div></div></div>'; } },
        { t: 'Role', v: function (u) { return '<span class="tag">' + esc(u.role) + '</span>'; } },
        { t: 'Office', v: function (u) { return esc(u.office); } },
        { t: '2FA', v: function (u) { return u.twofa ? badge('Enabled') : '<span class="muted small">Off</span>'; } },
        { t: 'Last sign-in', v: function (u) { return esc(u.last); } },
        { t: 'Status', v: function (u) { return badge(u.status); } },
        { t: '', cls: 'right', v: function (u, i) { return '<button class="btn sm ' + (u.status === 'Active' ? 'bad' : '') + '" data-act="toggleUser" data-i="' + i + '">' + (u.status === 'Active' ? 'Disable' : 'Enable') + '</button>'; } }
      ], S.sysUsers) + '</div>';
    } else {
      h += '<div class="card"><div class="table-wrap"><table class="t perm"><thead><tr><th>Module</th>' + S.roles.map(function (r) { return '<th>' + esc(r) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        S.permModules.map(function (m, mi) { return '<tr><td><b>' + m + '</b></td>' + S.roles.map(function (r) { return '<td><input type="checkbox" class="chk" data-act="perm" data-r="' + esc(r) + '" data-m="' + mi + '" ' + (S.perms[r][mi] ? 'checked' : '') + (r === 'Admin' ? ' disabled' : '') + '></td>'; }).join('') + '</tr>'; }).join('') +
        '</tbody></table></div></div><p class="small muted">Changes save immediately and are written to the audit log.</p>';
    }
    return h;
  };
  BADGE.ok.push('Enabled');

  PAGES.workflow = function () {
    var sel = ui.filter.chain || 0, c = S.chains[sel];
    var roles = ['Project Coordinator', 'Program Manager', 'HR Manager', 'Finance Manager', 'Country Director', 'HQ Approval', 'RRRC / CiC'];
    var h = head('Approval Workflows', 'Change any approval chain here, without calling a developer.', '');
    h += '<div class="grid g3"><div class="card">' + S.chains.map(function (x, i) { return '<div class="list-item" data-act="pickChain" data-i="' + i + '" style="' + (i == sel ? 'background:var(--brand-50)' : '') + '"><div style="flex:1"><div class="t1">' + esc(x.name) + '</div><div class="t2">' + x.steps.length + ' steps</div></div></div>'; }).join('') + '</div>';
    h += '<div class="card span2"><div class="card-h"><h3>' + esc(c.name) + '</h3></div><div class="card-b"><div class="chain" style="margin-bottom:18px">' + c.steps.map(function (s, i) { return '<div class="step done"><div class="dotc">' + (i + 1) + '</div>' + esc(s) + '</div>'; }).join('') + '</div><div class="chain-edit">' +
      c.steps.map(function (s, i) { return '<div class="ce"><span class="n">' + (i + 1) + '</span><b style="flex:1;font-weight:600">' + esc(s) + '</b><button class="btn sm ghost" data-act="chainMove" data-i="' + i + '" data-d="-1" ' + (i === 0 ? 'disabled' : '') + ' aria-label="Move up">' + ic('up') + '</button><button class="btn sm ghost" data-act="chainMove" data-i="' + i + '" data-d="1" ' + (i === c.steps.length - 1 ? 'disabled' : '') + ' aria-label="Move down">' + ic('dn') + '</button><button class="btn sm ghost" data-act="chainDel" data-i="' + i + '" ' + (c.steps.length < 2 ? 'disabled' : '') + ' aria-label="Remove">' + ic('trash') + '</button></div>'; }).join('') +
      '</div><div class="row" style="margin-top:14px"><select class="select" id="chainAdd">' + roles.map(function (r) { return '<option>' + r + '</option>'; }).join('') + '</select><button class="btn" data-act="chainAdd">' + ic('plus') + 'Add step</button></div></div></div></div>';
    return h;
  };

  PAGES.audit = function () {
    return head('Audit Log', 'Immutable record of every sign-in, approval and change.', '<button class="btn" data-act="toast" data-msg="Audit log exported (demo)">' + ic('down') + 'Export</button>') +
      '<div class="card">' + table([
        { t: 'Time', cls: 'num', v: function (a) { return a.time; } },
        { t: 'User', v: function (a) { return '<b>' + esc(a.user) + '</b>'; } },
        { t: 'Action', v: function (a) { return esc(a.action); } },
        { t: 'Target', v: function (a) { return esc(a.target); } },
        { t: 'IP', cls: 'num muted', v: function (a) { return a.ip; } }
      ], S.audit) + '</div>';
  };

  PAGES.settings = function () {
    var h = head('Settings', 'Organisation, localisation, notifications and security.', '<button class="btn primary" data-act="toast" data-msg="Settings saved">Save changes</button>');
    h += '<div class="grid g2"><div class="card"><div class="card-h"><h3>Organisation</h3></div><div class="card-b form-grid">' +
      fieldH('Organisation name', '<input class="input" value="Türkiye Diyanet Vakfı - Bangladesh">') + fieldH('Base currency', '<select class="select"><option>BDT (৳)</option><option>USD ($)</option><option>TRY (₺)</option></select>') +
      fieldH('Financial year starts', '<select class="select"><option>January</option><option>July</option></select>') + fieldH('Default language', '<select class="select"><option>English</option><option>বাংলা</option><option>Türkçe</option></select>') + '</div></div>' +
      '<div class="card"><div class="card-h"><h3>Security & notifications</h3></div><div class="card-b" style="display:grid;gap:12px">' +
      ['Require 2FA for Admin and Finance', 'Email approvers when a request reaches them', 'SMS alerts for emergency announcements', 'Daily stock alert digest to store keepers', 'Lock user after 5 failed sign-ins'].map(function (s, i) { return '<label class="row"><input type="checkbox" class="chk" ' + (i !== 3 ? 'checked' : '') + '> ' + s + '</label>'; }).join('') + '</div></div></div>';
    return h;
  };

  PAGES.search = function (r) {
    var q = (r.q || '').toLowerCase();
    var hit = function (s) { return String(s).toLowerCase().indexOf(q) > -1; };
    var pr = S.projects.filter(function (p) { return hit(p.name + p.id + p.donor); });
    var st = S.staff.filter(function (s) { return hit(s.name + s.title); });
    var ap = S.approvals.filter(function (a) { return hit(a.title + a.id + a.requester); });
    var h = head('Search results', 'for “' + esc(r.q) + '”');
    h += '<div class="grid g3"><div class="card"><div class="card-h"><h3>Projects</h3></div>' + (pr.map(function (p) { return '<div class="list-item" data-act="go" data-href="#/project/' + p.id + '"><div><div class="t1">' + esc(p.name) + '</div><div class="t2">' + p.id + '</div></div></div>'; }).join('') || '<div class="empty">None</div>') + '</div>';
    h += '<div class="card"><div class="card-h"><h3>Staff</h3></div>' + (st.map(function (s) { return '<div class="list-item" data-act="openStaff" data-i="' + s.id + '"><div><div class="t1">' + esc(s.name) + '</div><div class="t2">' + esc(s.title) + '</div></div></div>'; }).join('') || '<div class="empty">None</div>') + '</div>';
    h += '<div class="card"><div class="card-h"><h3>Approvals</h3></div>' + (ap.map(function (a) { return '<div class="list-item" data-act="openApproval" data-id="' + a.id + '"><div><div class="t1">' + esc(a.title) + '</div><div class="t2">' + a.id + ' · ' + a.status + '</div></div></div>'; }).join('') || '<div class="empty">None</div>') + '</div></div>';
    return h;
  };

  // ---------- Overlays ----------
  function closeOverlay() { var o = document.getElementById('overlay'); if (o) o.remove(); ui.dropdown = null; var d = document.getElementById('dd'); if (d) d.remove(); }
  function overlay(inner, center) { closeOverlay(); var o = document.createElement('div'); o.id = 'overlay'; o.className = 'overlay' + (center ? ' center' : ''); o.innerHTML = inner; o.addEventListener('click', function (e) { if (e.target === o) closeOverlay(); }); document.body.appendChild(o); var f = o.querySelector('input,select,textarea'); if (f && center) f.focus(); }

  function fieldH(label, input, full) { return '<div class="field ' + (full ? 'full' : '') + '"><label>' + label + '</label>' + input + '</div>'; }
  function opts(list, sel) { return list.map(function (x) { var v = Array.isArray(x) ? x[0] : x, l = Array.isArray(x) ? x[1] : x; return '<option value="' + esc(v) + '" ' + (v === sel ? 'selected' : '') + '>' + esc(l) + '</option>'; }).join(''); }
  function projOpts(sel) { return opts(S.projects.filter(function (p) { return p.status !== 'Completed'; }).map(function (p) { return [p.id, p.id + ' - ' + p.name]; }), sel); }

  var formCb = null;
  function form(title, sub, fields, submitLabel, cb) {
    formCb = cb;
    overlay('<form class="modal" id="mform"><div class="dh"><div style="flex:1"><h3>' + title + '</h3>' + (sub ? '<div class="small muted" style="margin-top:3px">' + sub + '</div>' : '') + '</div><button type="button" class="btn sm ghost" data-act="close" aria-label="Close">' + ic('x') + '</button></div><div class="db"><div class="form-grid">' + fields + '</div></div><div class="df"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn primary" type="submit">' + submitLabel + '</button></div></form>', true);
  }
  function formVals() { var v = {}; document.querySelectorAll('#mform [name]').forEach(function (el) { v[el.name] = el.value; }); return v; }

  function openApproval(id) {
    var a = S.approvals.filter(function (x) { return x.id === id; })[0]; if (!a) return;
    var steps = a.chain.map(function (s, i) {
      var cls = i < a.step ? 'done' : i === a.step ? (a.status === 'Rejected' ? 'bad' : a.status === 'Returned' ? 'ret' : a.status === 'Approved' ? 'done' : 'cur') : '';
      if (a.status === 'Approved') cls = 'done';
      return '<div class="step ' + cls + '"><div class="dotc">' + (cls === 'done' ? '✓' : cls === 'bad' ? '✕' : cls === 'ret' ? '↺' : i + 1) + '</div>' + esc(s) + '</div>';
    }).join('');
    var act = canAct(a);
    var hist = '<div><b>' + esc(a.requester) + '</b> submitted the request<div class="small muted">' + date(a.date) + '</div></div>';
    for (var i = 0; i < Math.min(a.step, a.chain.length); i++) hist += '<div><b>' + esc(a.chain[i]) + '</b> approved' + '<div class="small muted">' + date(a.date) + '</div></div>';
    if (a.remark) hist += '<div><b>' + esc(a.status) + '</b> by ' + esc(a.chain[Math.min(a.step, a.chain.length - 1)]) + ': “' + esc(a.remark) + '”</div>';
    overlay('<div class="drawer"><div class="dh"><div style="flex:1"><div class="small muted">' + a.id + ' · ' + a.type + ' request</div><h3 style="margin-top:4px">' + esc(a.title) + '</h3><div style="margin-top:8px">' + badge(a.status) + (a.priority === 'High' ? ' ' + badge('High') : '') + '</div></div><button class="btn sm ghost" data-act="close" aria-label="Close">' + ic('x') + '</button></div>' +
      '<div class="db"><div class="section-t" style="margin-top:0">Approval chain</div><div class="chain">' + steps + '</div>' +
      '<div class="section-t">Details</div><dl class="kv"><dt>Requested by</dt><dd>' + esc(a.requester) + '</dd><dt>Project</dt><dd>' + (a.project !== '-' ? '<a href="#/project/' + a.project + '">' + esc(pname(a.project)) + '</a>' : '-') + '</dd><dt>Amount</dt><dd>' + (a.amount ? money(a.amount) : '-') + '</dd><dt>Budget line</dt><dd>' + esc(a.budgetLine) + '</dd><dt>Submitted</dt><dd>' + date(a.date) + '</dd></dl>' +
      '<div class="section-t">Attachments</div>' + (a.docs.length ? a.docs.map(function (d) { return '<div class="file">' + ic('file') + esc(d) + '<div class="spacer"></div><button class="btn sm ghost" data-act="toast" data-msg="Preview of ' + esc(d) + ' (demo)">' + ic('eye') + '</button></div>'; }).join('') : '<p class="muted small">No attachments.</p>') +
      '<div class="section-t">History</div><div class="timeline">' + hist + '</div>' +
      (act ? '<div class="section-t">Remarks</div><textarea class="input" id="remark" rows="3" style="width:100%" placeholder="Optional for approve, required for return or reject"></textarea>' : (a.status === 'Pending' ? '<div class="notice" style="margin-top:18px">' + ic('clock') + '<span>Waiting for <b>' + esc(curStep(a)) + '</b>. ' + (isAdmin() ? 'First-level steps are handled by moderators.' : 'You will be notified when it moves.') + '</span></div>' : '')) +
      '</div>' + (act ? '<div class="df"><button class="btn bad" data-act="decide" data-id="' + a.id + '" data-d="Rejected">Reject</button><button class="btn warn" data-act="decide" data-id="' + a.id + '" data-d="Returned">Return</button><button class="btn ok" data-act="decide" data-id="' + a.id + '" data-d="Approved">' + ic('ok') + 'Approve</button></div>' : '') + '</div>');
  }

  function openStaff(id) {
    var s = S.staff.filter(function (x) { return x.id === id; })[0]; if (!s) return;
    overlay('<div class="drawer"><div class="dh"><span class="avatar" style="width:48px;height:48px;font-size:16px">' + initials(s.name) + '</span><div style="flex:1"><h3>' + esc(s.name) + '</h3><div class="small muted">' + esc(s.title) + ' · ' + s.id + '</div><div style="margin-top:6px">' + badge(s.status) + '</div></div><button class="btn sm ghost" data-act="close" aria-label="Close">' + ic('x') + '</button></div><div class="db">' +
      '<dl class="kv"><dt>Department</dt><dd>' + esc(s.dept) + '</dd><dt>Location</dt><dd>' + esc(s.location) + '</dd><dt>Staff type</dt><dd>' + s.type + '</dd><dt>Joined</dt><dd>' + date(s.joined) + '</dd>' + (isAdmin() && s.salary ? '<dt>Gross salary</dt><dd>' + money(s.salary) + '</dd>' : '') + '</dl>' +
      '<div class="section-t">Leave balance</div><div class="grid g3"><div class="card card-b"><div class="small muted">Annual</div><b>14 / 20</b></div><div class="card card-b"><div class="small muted">Sick</div><b>12 / 14</b></div><div class="card card-b"><div class="small muted">Casual</div><b>8 / 10</b></div></div>' +
      '<div class="section-t">Documents</div><div class="file">' + ic('file') + 'Appointment letter.pdf</div><div class="file">' + ic('file') + 'NID copy.pdf</div>' +
      (isAdmin() ? '<div class="section-t">HR actions</div><div class="row wrap"><button class="btn sm" data-act="toast" data-msg="Increment form (demo)">Increment</button><button class="btn sm" data-act="toast" data-msg="Training record (demo)">Training</button><button class="btn sm" data-act="toast" data-msg="Performance review (demo)">Performance review</button></div>' : '') +
      '</div></div>');
  }

  function toast(msg) {
    var b = document.getElementById('toasts'); if (!b) { b = document.createElement('div'); b.id = 'toasts'; b.className = 'toast-box'; document.body.appendChild(b); }
    var t = document.createElement('div'); t.className = 'toast'; t.innerHTML = ic('ok') + '<span>' + esc(msg) + '</span>'; b.appendChild(t);
    setTimeout(function () { t.remove(); }, 3200);
  }
  function audit(action, target) { S.audit.unshift({ time: '2026-11-08 ' + new Date().toTimeString().slice(0, 5), user: me().name, action: action, target: target, ip: '127.0.0.1' }); }

  // ---------- Actions ----------
  var ACT = {
    go: function (el) { location.hash = el.dataset.href; },
    close: closeOverlay,
    menu: function () { document.getElementById('side').classList.toggle('open'); },
    pickrole: function (el) { ui.loginRole = el.dataset.r; render(); },
    login: function () { role = ui.loginRole || 'admin'; safeSet(ROLE, role); location.hash = '#/dashboard'; render(); toast('Signed in as ' + me().name); },
    logout: function () { role = null; safeSet(ROLE, null); location.hash = ''; render(); },
    switchRole: function () { role = isAdmin() ? 'moderator' : 'admin'; ui.loginRole = role; safeSet(ROLE, role); render(); toast('Now viewing as ' + (isAdmin() ? 'Admin' : 'Moderator')); },
    reset: function () { S = clone(window.SEED); save(); render(); toast('Demo data reset'); },
    tab: function (el) { ui.tab[el.dataset.k] = el.dataset.v; render(); },
    toast: function (el) { toast(el.dataset.msg); },
    usermenu: function () {
      if (document.getElementById('dd')) { closeOverlay(); return; }
      var d = document.createElement('div'); d.id = 'dd'; d.className = 'dropdown';
      d.innerHTML = '<div class="lbl">Signed in as</div><div style="padding:2px 10px 8px"><b>' + esc(me().name) + '</b><div class="small muted">' + esc(me().email) + '</div></div><hr>' +
        '<button data-act="switchRole">' + ic('swap') + 'Switch to ' + (isAdmin() ? 'Moderator' : 'Admin') + ' view</button><button data-act="reset">' + ic('refresh') + 'Reset demo data</button><hr><button data-act="logout">' + ic('logout') + 'Sign out</button>';
      document.body.appendChild(d);
    },
    notif: function () {
      if (document.getElementById('dd')) { closeOverlay(); return; }
      var d = document.createElement('div'); d.id = 'dd'; d.className = 'dropdown'; d.style.minWidth = '320px'; d.style.right = '70px';
      d.innerHTML = '<div class="lbl">Notifications</div>' + S.notifications.map(function (n) { return '<button data-act="go" data-href="' + n.link + '"><span style="flex:1"><span style="display:block">' + esc(n.text) + '</span><span class="small muted">' + n.time + '</span></span></button>'; }).join('');
      document.body.appendChild(d);
    },
    openApproval: function (el) { openApproval(el.dataset.id || el.dataset.i); },
    openStaff: function (el) { openStaff(el.dataset.i); },
    decide: function (el) {
      var a = S.approvals.filter(function (x) { return x.id === el.dataset.id; })[0], d = el.dataset.d, rm = (document.getElementById('remark') || {}).value || '';
      if (d !== 'Approved' && !rm.trim()) { var r = document.getElementById('remark'); r.style.borderColor = 'var(--bad)'; r.placeholder = 'Please write a remark to ' + d.toLowerCase().replace('ed', '') + ' this request'; r.focus(); return; }
      var stepName = curStep(a);
      if (d === 'Approved') { a.step++; if (a.step >= a.chain.length) a.status = 'Approved'; }
      else { a.status = d; a.remark = rm; }
      audit(d === 'Approved' ? 'Approved' : d, a.id + ' (' + stepName + ')');
      save(); render();
      toast(d === 'Approved' ? (a.status === 'Approved' ? a.id + ' fully approved' : a.id + ' approved, sent to ' + curStep(a)) : a.id + ' ' + d.toLowerCase());
    },
    filter: function () {},
    procStage: function (el) { ui.filter.procStage = el.dataset.v; render(); },
    advanceProc: function (el) { var p = S.procurement.filter(function (x) { return x.id === el.dataset.id; })[0]; p.stage = STAGES[STAGES.indexOf(p.stage) + 1]; if (p.stage === 'RFQ') p.supplier = '3 invited'; audit('Moved to ' + p.stage, p.id); save(); render(); toast(p.id + ' moved to ' + p.stage); },
    moveTask: function (el) { var c = ['To do', 'In progress', 'Review', 'Done'], t = S.tasks.filter(function (x) { return x.id === el.dataset.id; })[0]; t.col = c[(c.indexOf(t.col) + 1) % 4]; save(); render(); toast('“' + t.title + '” → ' + t.col); },
    doneActivity: function (el) { S.activities.forEach(function (a) { if (a.name === el.dataset.n) a.status = 'Done'; }); save(); render(); toast('Activity marked done'); },
    completeDist: function (el) { var d = S.distributions.filter(function (x) { return x.id === el.dataset.id; })[0]; d.status = 'Completed'; var p = project(d.project); if (p) p.beneficiaries += d.households; audit('Completed distribution', d.id); save(); render(); toast(d.id + ' completed: stock reduced, ' + d.households.toLocaleString('en-IN') + ' households added'); },
    submitProject: function (el) {
      var p = project(el.dataset.id); p.status = 'Pending approval';
      S.approvals.unshift({ id: nextId('APR-', S.approvals), type: 'Project', title: 'New project: ' + p.name, project: p.id, requester: me().name, amount: p.budget, date: today(), chain: S.chains[2].steps.slice(), step: 0, status: 'Pending', budgetLine: 'Program envelope', docs: ['Concept-note.pdf'], priority: 'Normal' });
      audit('Submitted project', p.id); save(); render(); toast('Submitted to ' + S.chains[2].steps[0]);
    },
    runPayroll: function () { S.payrollRun = true; audit('Posted payroll', 'November 2026'); save(); render(); toast('Payroll posted to finance and charged to projects'); },
    toggleUser: function (el) { var u = S.sysUsers[+el.dataset.i]; u.status = u.status === 'Active' ? 'Disabled' : 'Active'; audit(u.status === 'Active' ? 'Enabled user' : 'Disabled user', u.email); save(); render(); toast(u.name + ' ' + u.status.toLowerCase()); },
    perm: function (el) { S.perms[el.dataset.r][+el.dataset.m] = el.checked ? 1 : 0; audit('Changed permission', el.dataset.r + ' / ' + S.permModules[+el.dataset.m]); save(); toast('Permission updated for ' + el.dataset.r); },
    pickChain: function (el) { ui.filter.chain = +el.dataset.i; render(); },
    chainMove: function (el) { var c = S.chains[ui.filter.chain || 0].steps, i = +el.dataset.i, j = i + (+el.dataset.d); var t = c[i]; c[i] = c[j]; c[j] = t; audit('Changed approval chain', S.chains[ui.filter.chain || 0].name); save(); render(); },
    chainDel: function (el) { S.chains[ui.filter.chain || 0].steps.splice(+el.dataset.i, 1); audit('Changed approval chain', S.chains[ui.filter.chain || 0].name); save(); render(); toast('Step removed'); },
    chainAdd: function () { var v = document.getElementById('chainAdd').value; S.chains[ui.filter.chain || 0].steps.push(v); audit('Changed approval chain', S.chains[ui.filter.chain || 0].name); save(); render(); toast(v + ' added to the chain'); },

    newProject: function () {
      form('New project', 'Saved as draft. Submit it for HQ and RRRC approval from the project page.',
        fieldH('Project name', '<input class="input" name="name" required placeholder="e.g. Clean Water for Camp 20">', true) +
        fieldH('Program', '<select class="select" name="program">' + opts(S.programs.map(function (p) { return [p.id, p.name]; })) + '</select>') +
        fieldH('Donor / fund', '<input class="input" name="donor" required placeholder="e.g. Zakat Fund 2027">') +
        fieldH('Budget (BDT)', '<input class="input" name="budget" type="number" min="0" required placeholder="5000000">') +
        fieldH('Beneficiary target', '<input class="input" name="target" type="number" min="0" required placeholder="3000">') +
        fieldH('Start date', '<input class="input" name="start" type="date" value="2027-01-01">') +
        fieldH('End date', '<input class="input" name="end" type="date" value="2027-12-31">') +
        fieldH('Camps', '<input class="input" name="camps" placeholder="Camp 4, Camp 15">', true), 'Create draft',
        function (v) {
          var id = 'PRJ-2026-0' + (45 + S.projects.length);
          S.projects.unshift({ id: id, name: v.name, program: v.program, donor: v.donor, camps: (v.camps || 'Camp 4').split(',').map(function (s) { return s.trim(); }).filter(Boolean), budget: +v.budget, spent: 0, status: 'Draft', progress: 0, start: v.start, end: v.end, manager: me().name, beneficiaries: 0, target: +v.target, risk: 'Low' });
          audit('Created project', id); save(); location.hash = '#/project/' + id; toast('Draft project created');
        });
    },
    newPR: function () {
      form('New purchase request', 'Routes through the purchase approval chain. Above ৳10,00,000 it also needs HQ approval.',
        fieldH('Items', '<input class="input" name="item" required placeholder="e.g. Hygiene kits x 1,000">', true) +
        fieldH('Project', '<select class="select" name="project">' + projOpts() + '</select>', true) +
        fieldH('Estimated amount (BDT)', '<input class="input" name="amount" type="number" min="0" required placeholder="850000">') +
        fieldH('Needed by', '<input class="input" name="date" type="date" value="2026-11-30">') +
        fieldH('Justification', '<textarea class="input" name="why" rows="3" placeholder="Why is this needed?"></textarea>', true), 'Submit request',
        function (v) {
          var id = nextId('PR-', S.procurement), big = +v.amount > 1000000;
          S.procurement.unshift({ id: id, item: v.item, project: v.project, amount: +v.amount, stage: 'PR', supplier: '-', date: today() });
          var chain = S.chains[big ? 1 : 0].steps.slice();
          S.approvals.unshift({ id: nextId('APR-', S.approvals), type: 'Purchase', title: id + ': ' + v.item, project: v.project, requester: me().name, amount: +v.amount, date: today(), chain: chain, step: role === 'moderator' && chain[0] === 'Project Coordinator' ? 1 : 0, status: 'Pending', budgetLine: 'Checked against project budget', docs: [], priority: 'Normal' });
          audit('Created', id); save(); location.hash = '#/procurement'; render(); toast(id + ' submitted for approval');
        });
    },
    newLeave: function () {
      form('Leave request', 'Goes to your supervisor, then HR.',
        fieldH('Leave type', '<select class="select" name="type">' + opts(['Annual leave', 'Sick leave', 'Casual leave', 'Maternity / paternity leave']) + '</select>') +
        fieldH('Days', '<input class="input" name="days" type="number" min="1" value="2">') +
        fieldH('From', '<input class="input" name="from" type="date" value="2026-11-16">') +
        fieldH('To', '<input class="input" name="to" type="date" value="2026-11-17">') +
        fieldH('Reason', '<textarea class="input" name="reason" rows="2"></textarea>', true), 'Submit',
        function (v) {
          S.approvals.unshift({ id: nextId('APR-', S.approvals), type: 'Leave', title: v.type + ', ' + v.days + ' days (' + date(v.from).slice(0, 6) + ' - ' + date(v.to).slice(0, 6) + ')', project: '-', requester: me().name, amount: 0, date: today(), chain: isAdmin() ? ['HR Manager'] : ['HR Manager'], step: 0, status: 'Pending', budgetLine: 'Leave balance: 14 days', docs: [], priority: 'Normal' });
          save(); render(); toast('Leave request sent to HR');
        });
    },
    newTask: function () {
      form('New task', '',
        fieldH('Title', '<input class="input" name="title" required>', true) +
        fieldH('Project', '<select class="select" name="project">' + projOpts() + '</select>', true) +
        fieldH('Assign to', '<select class="select" name="owner">' + opts(S.staff.map(function (s) { return s.name; })) + '</select>') +
        fieldH('Due date', '<input class="input" name="due" type="date" value="2026-11-20">') +
        fieldH('Priority', '<select class="select" name="pri">' + opts(['Normal', 'High', 'Low']) + '</select>'), 'Create task',
        function (v) { S.tasks.unshift({ id: nextId('T-', S.tasks, 'id', 3), title: v.title, project: v.project, owner: v.owner, due: v.due, col: 'To do', pri: v.pri }); save(); render(); toast('Task created and assigned to ' + v.owner); });
    },
    newActivity: function (el) {
      form('New activity', esc(pname(el.dataset.id)),
        fieldH('Activity', '<input class="input" name="name" required>', true) +
        fieldH('Owner', '<select class="select" name="owner">' + opts(S.staff.map(function (s) { return s.name; })) + '</select>') +
        fieldH('Due date', '<input class="input" name="due" type="date" value="2026-11-30">'), 'Add activity',
        function (v) { S.activities.push({ project: el.dataset.id, name: v.name, due: v.due, status: 'Planned', owner: v.owner }); ui.tab.prj = 'activities'; save(); render(); toast('Activity added'); });
    },
    newDistribution: function (el) {
      form('Plan distribution', 'Needs Project Coordinator and RRRC / CiC approval before the date.',
        fieldH('Project', '<select class="select" name="project">' + projOpts(el.dataset.id) + '</select>', true) +
        fieldH('Camp', '<select class="select" name="camp">' + opts(['Camp 1W', 'Camp 4', 'Camp 8E', 'Camp 13', 'Camp 15', 'Camp 26']) + '</select>') +
        fieldH('Date', '<input class="input" name="date" type="date" value="2026-11-28">') +
        fieldH('Item', '<select class="select" name="item">' + opts(S.stock.map(function (s) { return s.item; })) + '</select>') +
        fieldH('Households', '<input class="input" name="hh" type="number" min="1" value="1000">'), 'Plan',
        function (v) { var id = nextId('DST-', S.distributions); S.distributions.push({ id: id, project: v.project, camp: v.camp, date: v.date, item: v.item, qty: +v.hh, households: +v.hh, status: 'Scheduled' }); save(); render(); toast(id + ' scheduled'); });
    },
    newVisit: function (el) {
      form('Assign facility visit', 'The assignee gets an in-app notification and SMS.',
        fieldH('Facility', '<select class="select" name="facility">' + opts(S.facilities.map(function (f) { return f.name; }), el.dataset.f) + '</select>', true) +
        fieldH('Assign to', '<select class="select" name="by">' + opts(S.staff.map(function (s) { return s.name; })) + '</select>') +
        fieldH('Date', '<input class="input" name="date" type="date" value="2026-11-12">') +
        fieldH('Purpose', '<input class="input" name="purpose" required placeholder="e.g. Monthly monitoring">', true), 'Assign',
        function (v) { S.visits.unshift({ date: v.date, facility: v.facility, by: v.by, purpose: v.purpose, status: 'Assigned' }); ui.tab.fld = 'visits'; save(); render(); toast('Visit assigned to ' + v.by); });
    },
    newAnnouncement: function () {
      form('New announcement', '',
        fieldH('Title', '<input class="input" name="title" required>', true) +
        fieldH('Type', '<select class="select" name="type">' + opts(['Announcement', 'Notice', 'Deadline', 'Emergency']) + '</select>') +
        fieldH('Audience', '<select class="select" name="audience">' + opts(isAdmin() ? ['All staff', 'All field staff', 'Project coordinators', 'Finance team'] : ['My project team', 'Camp 13 team', 'Camp 4 team']) + '</select>') +
        fieldH('Channels', '<select class="select" name="channel">' + opts(['In-app', 'SMS + In-app', 'Email + In-app', 'SMS + Email + In-app']) + '</select>', true) +
        fieldH('Message', '<textarea class="input" name="msg" rows="3"></textarea>', true), 'Send',
        function (v) { S.announcements.unshift({ title: v.title, type: v.type, audience: v.audience, date: today(), channel: v.channel }); save(); render(); toast('Sent to ' + v.audience); });
    },
    newUser: function () {
      form('Invite user', 'They get an email to set a password. Admin and finance roles must enable 2FA.',
        fieldH('Full name', '<input class="input" name="name" required>') +
        fieldH('Email', '<input class="input" name="email" type="email" required>') +
        fieldH('Role', '<select class="select" name="role">' + opts(S.roles) + '</select>') +
        fieldH('Office', '<select class="select" name="office">' + opts(['Dhaka', 'Cox\'s Bazar', 'Ukhiya', 'Camp 4', 'Camp 13']) + '</select>'), 'Send invite',
        function (v) { S.sysUsers.unshift({ name: v.name, email: v.email, role: v.role, office: v.office, last: 'Invited', status: 'Active', twofa: false }); audit('Invited user', v.email); save(); render(); toast('Invitation sent to ' + v.email); });
    },
    newStaff: function () {
      form('Add staff', '',
        fieldH('Full name', '<input class="input" name="name" required>') +
        fieldH('Title', '<input class="input" name="title" required>') +
        fieldH('Department', '<select class="select" name="dept">' + opts(['Programs', 'WASH', 'Education', 'Finance', 'Procurement', 'M&E', 'Logistics', 'Security', 'Shelter']) + '</select>') +
        fieldH('Location', '<input class="input" name="location" value="Cox\'s Bazar">') +
        fieldH('Joining date', '<input class="input" name="joined" type="date" value="2026-12-01">') +
        fieldH('Staff type', '<select class="select" name="type">' + opts(['National', 'Expat', 'Volunteer']) + '</select>'), 'Add',
        function (v) { S.staff.unshift({ id: nextId('EMP-', S.staff, 'id', 3), name: v.name, dept: v.dept, title: v.title, location: v.location, type: v.type, status: 'Active', joined: v.joined, salary: 0 }); save(); render(); toast(v.name + ' added'); });
    }
  };

  // ---------- Events ----------
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    var dd = document.getElementById('dd');
    if (dd && !e.target.closest('#dd') && (!el || ['usermenu', 'notif'].indexOf(el.dataset.act) < 0)) { dd.remove(); }
    if (!el) return;
    var a = el.dataset.act;
    if (a === 'filter' || a === 'filterInput' || a === 'perm') return;
    if (el.tagName === 'A' && a !== 'procStage') return;
    e.preventDefault();
    if (dd && a !== 'usermenu' && a !== 'notif') dd.remove();
    if (ACT[a]) ACT[a](el, e);
  });
  document.addEventListener('change', function (e) {
    var el = e.target;
    if (el.dataset.act === 'filter') { ui.filter[el.dataset.k] = el.value; render(); }
    if (el.dataset.act === 'perm') ACT.perm(el);
  });
  var tmr;
  document.addEventListener('input', function (e) {
    var el = e.target;
    if (el.dataset.act === 'filterInput') {
      ui.filter[el.dataset.k] = el.value; clearTimeout(tmr);
      tmr = setTimeout(function () { var pos = el.selectionStart; render(); var n = document.querySelector('[data-k="' + el.dataset.k + '"]'); if (n) { n.focus(); n.setSelectionRange(pos, pos); } }, 250);
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeOverlay();
    if (e.key === 'Enter' && e.target.id === 'gsearch') { var v = e.target.value.trim(); if (v) location.hash = '#/search?q=' + encodeURIComponent(v); }
  });
  document.addEventListener('submit', function (e) {
    if (e.target.id !== 'mform') return;
    e.preventDefault(); var v = formVals(), cb = formCb; closeOverlay(); if (cb) cb(v);
  });
  window.addEventListener('hashchange', render);
  render();
})();
