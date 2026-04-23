import { LitElement, html, css } from 'lit';
import { Desktop } from '@wxcc-desktop/sdk';

class SupervisorSkillingWidget extends LitElement {

  // ─── Styles ──────────────────────────────────────────────────────────────

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      font-family: 'CiscoSansTT', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 13px;
      color: #1a1a2e;
      background: #f4f5f7;
      box-sizing: border-box;
      overflow: hidden;
    }

    *, *::before, *::after { box-sizing: border-box; }

    /* ── Layout ── */
    .app {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #0d274d 0%, #00bceb 100%);
      color: #fff;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.18);
    }

    .header-icon {
      font-size: 22px;
      line-height: 1;
    }

    .header-title {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.3px;
      flex: 1;
    }

    .header-subtitle {
      font-size: 11px;
      opacity: 0.8;
    }

    .refresh-btn {
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.3);
      color: #fff;
      border-radius: 6px;
      padding: 5px 12px;
      font-size: 12px;
      cursor: pointer;
      transition: background 0.15s;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .refresh-btn:hover { background: rgba(255,255,255,0.25); }
    .refresh-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    .controls {
      background: #fff;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      flex-shrink: 0;
      border-bottom: 1px solid #e2e5ea;
    }

    .control-group {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    label.ctrl-label {
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      white-space: nowrap;
    }

    select, input[type="text"] {
      border: 1px solid #d1d5db;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 12px;
      color: #1a1a2e;
      background: #fff;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
    }

    select:focus, input[type="text"]:focus {
      border-color: #00bceb;
      box-shadow: 0 0 0 3px rgba(0,188,235,0.15);
    }

    .search-input { width: 200px; }

    .spacer { flex: 1; }

    .stats-pill {
      background: #eef2ff;
      color: #4338ca;
      border-radius: 20px;
      padding: 3px 10px;
      font-size: 11px;
      font-weight: 600;
    }

    /* ── Bulk action bar ── */
    .bulk-bar {
      background: #eff6ff;
      border-bottom: 1px solid #bfdbfe;
      padding: 8px 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      font-size: 12px;
    }

    .bulk-bar .selected-count {
      font-weight: 700;
      color: #1d4ed8;
    }

    .bulk-bar select { min-width: 220px; }

    .btn {
      border: none;
      border-radius: 6px;
      padding: 6px 14px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .btn-primary {
      background: #0d274d;
      color: #fff;
    }
    .btn-primary:hover { background: #1a3a66; }
    .btn-primary:disabled { background: #9ca3af; cursor: not-allowed; }

    .btn-danger {
      background: #fee2e2;
      color: #dc2626;
    }
    .btn-danger:hover { background: #fecaca; }

    .btn-ghost {
      background: transparent;
      color: #6b7280;
      border: 1px solid #d1d5db;
    }
    .btn-ghost:hover { background: #f3f4f6; }

    .btn-sm {
      padding: 4px 9px;
      font-size: 11px;
    }

    /* ── Table ── */
    .table-container {
      flex: 1;
      overflow: auto;
      padding: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
    }

    thead tr {
      background: #f8fafc;
      position: sticky;
      top: 0;
      z-index: 1;
    }

    th {
      padding: 10px 14px;
      text-align: left;
      font-size: 11px;
      font-weight: 700;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid #e5e7eb;
      white-space: nowrap;
    }

    th.col-check { width: 38px; }
    th.col-name  { min-width: 160px; }
    th.col-email { min-width: 180px; }
    th.col-team  { min-width: 130px; }
    th.col-profile { min-width: 200px; }
    th.col-skills { min-width: 160px; }
    th.col-actions { width: 80px; text-align: center; }

    tbody tr {
      border-bottom: 1px solid #f1f5f9;
      transition: background 0.1s;
    }

    tbody tr:hover { background: #f8fafc; }
    tbody tr.selected { background: #eff6ff; }
    tbody tr.saving { opacity: 0.6; }

    td {
      padding: 10px 14px;
      vertical-align: middle;
      font-size: 12px;
    }

    .agent-name {
      font-weight: 600;
      color: #1a1a2e;
    }

    .agent-email {
      color: #6b7280;
      font-size: 11px;
    }

    .team-badge {
      display: inline-block;
      background: #e0f2fe;
      color: #0369a1;
      border-radius: 10px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 500;
      max-width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .profile-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: #f0fdf4;
      color: #15803d;
      border: 1px solid #bbf7d0;
      border-radius: 10px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 500;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .profile-badge.none {
      background: #fef9c3;
      color: #92400e;
      border-color: #fde68a;
    }

    .skills-count {
      color: #6b7280;
      font-size: 11px;
    }

    .skill-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
      max-width: 240px;
    }

    .skill-pill {
      background: #f3f4f6;
      color: #374151;
      border-radius: 4px;
      padding: 1px 6px;
      font-size: 10px;
      white-space: nowrap;
    }

    .skill-pill .lvl {
      color: #00bceb;
      font-weight: 700;
    }

    /* ── Actions column ── */
    .action-btns {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }

    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px 6px;
      border-radius: 5px;
      color: #6b7280;
      font-size: 14px;
      line-height: 1;
      transition: all 0.12s;
    }
    .icon-btn:hover { background: #e5e7eb; color: #1a1a2e; }
    .icon-btn.edit:hover { background: #dbeafe; color: #1d4ed8; }

    .saving-spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid #d1d5db;
      border-top-color: #00bceb;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    /* ── Empty / loading / error states ── */
    .state-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      color: #6b7280;
      padding: 40px;
    }

    .state-icon { font-size: 40px; line-height: 1; }
    .state-title { font-size: 16px; font-weight: 600; color: #374151; }
    .state-msg { font-size: 13px; text-align: center; max-width: 400px; }

    .progress-bar-wrap {
      width: 240px;
      background: #e5e7eb;
      border-radius: 4px;
      height: 4px;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #0d274d, #00bceb);
      border-radius: 4px;
      animation: progress-anim 1.5s ease-in-out infinite;
    }

    /* ── Modal ── */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .modal {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.25);
      width: 100%;
      max-width: 520px;
      overflow: hidden;
      animation: modal-in 0.2s ease-out;
    }

    .modal-header {
      background: #0d274d;
      color: #fff;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .modal-header-title { font-size: 14px; font-weight: 700; flex: 1; }

    .modal-close {
      background: rgba(255,255,255,0.15);
      border: none;
      color: #fff;
      border-radius: 5px;
      padding: 3px 8px;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
    }
    .modal-close:hover { background: rgba(255,255,255,0.3); }

    .modal-body { padding: 20px; }

    .agent-card {
      background: #f8fafc;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .agent-card .name { font-weight: 700; font-size: 14px; }
    .agent-card .meta { font-size: 11px; color: #6b7280; }
    .agent-card .current-profile {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 4px;
      font-size: 12px;
    }

    .form-group { margin-bottom: 14px; }
    .form-label { display: block; font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 5px; }
    .form-select { width: 100%; }

    .profile-preview {
      margin-top: 12px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
    }

    .preview-header {
      background: #f1f5f9;
      padding: 7px 12px;
      font-size: 11px;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .preview-skills { padding: 10px 12px; display: flex; flex-direction: column; gap: 7px; }

    .preview-skill {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
    }

    .preview-skill-name { flex: 1; color: #374151; font-weight: 500; }

    .proficiency-bar-wrap {
      width: 100px;
      background: #e5e7eb;
      border-radius: 3px;
      height: 6px;
      flex-shrink: 0;
    }

    .proficiency-bar {
      height: 100%;
      border-radius: 3px;
      background: linear-gradient(90deg, #00bceb, #0d274d);
    }

    .proficiency-label {
      width: 28px;
      text-align: right;
      font-size: 11px;
      font-weight: 700;
      color: #0d274d;
      flex-shrink: 0;
    }

    .preview-empty { padding: 12px; color: #9ca3af; font-size: 12px; text-align: center; }

    .modal-footer {
      padding: 14px 20px;
      background: #f8fafc;
      border-top: 1px solid #e5e7eb;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    /* ── Direct skill editing ── */
    .direct-skills-section { margin-top: 16px; }
    .direct-skills-toggle {
      background: none;
      border: none;
      color: #00bceb;
      font-size: 12px;
      cursor: pointer;
      padding: 0;
      font-weight: 600;
      text-decoration: underline;
    }

    .skills-editor { margin-top: 10px; display: flex; flex-direction: column; gap: 10px; }
    .skill-row { display: flex; align-items: center; gap: 8px; }
    .skill-row-name { flex: 1; font-size: 12px; font-weight: 500; }
    .skill-row input[type="range"] {
      width: 120px;
      accent-color: #00bceb;
      cursor: pointer;
    }
    .skill-row .lvl-display {
      width: 24px;
      text-align: center;
      font-size: 12px;
      font-weight: 700;
      color: #0d274d;
    }

    /* ── Notification toast ── */
    .toast-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 200;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
    }

    .toast {
      background: #1e293b;
      color: #fff;
      border-radius: 8px;
      padding: 10px 16px;
      font-size: 12px;
      font-weight: 500;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 260px;
      max-width: 380px;
      animation: toast-in 0.25s ease-out;
      pointer-events: all;
    }

    .toast.success { border-left: 4px solid #22c55e; }
    .toast.error   { border-left: 4px solid #ef4444; }
    .toast.info    { border-left: 4px solid #00bceb; }

    .toast-icon { font-size: 16px; flex-shrink: 0; }
    .toast-msg  { flex: 1; }

    /* ── Checkbox ── */
    input[type="checkbox"] {
      width: 15px;
      height: 15px;
      cursor: pointer;
      accent-color: #0d274d;
    }

    /* ── Animations ── */
    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes progress-anim {
      0%   { width: 0%; margin-left: 0; }
      50%  { width: 60%; margin-left: 20%; }
      100% { width: 0%; margin-left: 100%; }
    }

    @keyframes modal-in {
      from { opacity: 0; transform: scale(0.95) translateY(-10px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }

    @keyframes toast-in {
      from { opacity: 0; transform: translateX(30px); }
      to   { opacity: 1; transform: translateX(0); }
    }
  `;

  // ─── Properties ──────────────────────────────────────────────────────────

  static properties = {
    _loading:         { state: true },
    _loadingMsg:      { state: true },
    _error:           { state: true },
    _agents:          { state: true },
    _teams:           { state: true },
    _skillProfiles:   { state: true },
    _skills:          { state: true },
    _selectedTeam:    { state: true },
    _searchQuery:     { state: true },
    _selectedAgents:  { state: true },
    _showModal:       { state: true },
    _modalAgent:      { state: true },
    _modalProfileId:  { state: true },
    _showDirectEdit:  { state: true },
    _directSkills:    { state: true },
    _bulkProfileId:   { state: true },
    _toasts:          { state: true },
    _orgId:           { state: true },
    _token:           { state: true },
    _savingAgents:    { state: true },
    _apiBaseUrl:      { state: true },
  };

  // ─── Constructor ─────────────────────────────────────────────────────────

  constructor() {
    super();
    this._loading        = false;
    this._loadingMsg     = '';
    this._error          = null;
    this._agents         = [];
    this._teams          = [];
    this._skillProfiles  = [];
    this._skills         = [];
    this._selectedTeam   = '__all__';
    this._searchQuery    = '';
    this._selectedAgents = new Set();
    this._showModal      = false;
    this._modalAgent     = null;
    this._modalProfileId = '';
    this._showDirectEdit = false;
    this._directSkills   = {};
    this._bulkProfileId  = '';
    this._toasts         = [];
    this._orgId          = null;
    this._token          = null;
    this._savingAgents   = new Set();
    this._apiBaseUrl     = 'https://api.wxcc-us1.cisco.com';
    this._sdkLogger      = null;
    this._toastTimer     = null;
  }

  // ─── Lifecycle ───────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    this._initSDK();
  }

  // ─── SDK & Auth ──────────────────────────────────────────────────────────

  async _initSDK() {
    this._loading    = true;
    this._loadingMsg = 'Connecting to Webex Contact Center…';
    this._error      = null;
    console.log('[skilling] v1.2.0 — initSDK start');
    try {
      await Desktop.config.init({
        widgetName:     'supervisor-skilling-widget',
        widgetProvider: 'custom',
      });

      // Token first — needed by orgId lookup
      this._token = await this._resolveToken();
      console.log('[skilling] token →', this._token ? this._token.slice(0, 30) + '…' : 'null');
      if (!this._token) throw new Error(
        'Cannot retrieve access token. Ensure you are logged in to Supervisor Desktop.'
      );

      // orgId — try SDK globals then Webex API
      this._orgId = await this._resolveOrgId();
      console.log('[skilling] orgId →', this._orgId);
      if (!this._orgId) throw new Error(
        'Cannot determine org ID — check DevTools console for [skilling] entries.'
      );

      await this._fetchAll();
    } catch (err) {
      this._error = err.message;
      console.error('[supervisor-skilling]', err);
    } finally {
      this._loading = false;
    }
  }

  async _resolveToken() {
    // 1. Official SDK method on Desktop.actions
    try {
      const t = await Desktop.actions.getToken();
      if (t) { console.log('[skilling] token: Desktop.actions.getToken()'); return t; }
    } catch (e) { console.warn('[skilling] Desktop.actions.getToken() threw:', e); }

    // 2. Storage fallback (widget iframe shares storage with same-origin parent)
    const keys = ['access_token', 'accessToken', 'wxcc_token', 'id_token', 'token', 'bearerToken'];
    for (const store of [localStorage, sessionStorage]) {
      for (const key of keys) {
        try {
          const v = store.getItem(key);
          if (v && v !== 'null' && v !== 'undefined') {
            console.log('[skilling] token: storage key =', key);
            return v;
          }
        } catch (_) {}
      }
    }

    console.warn('[skilling] token: exhausted all sources');
    return null;
  }

  async _resolveOrgId() {
    // 1. window.wxcc global (set by WxCC runtime per rtdwc-jsapi declaration)
    if (window.wxcc?.orgId) { console.log('[skilling] orgId: window.wxcc'); return window.wxcc.orgId; }

    // 2. URL pattern (Desktop URL often contains org UUID)
    const fromUrl = this._orgIdFromUrl();
    if (fromUrl) { console.log('[skilling] orgId: URL'); return fromUrl; }

    // 3. Webex API — decode orgId from the user's own profile
    try {
      const resp = await fetch('https://webexapis.com/v1/people/me', {
        headers: { 'Authorization': `Bearer ${this._token}` }
      });
      if (resp.ok) {
        const { orgId: b64OrgId } = await resp.json();
        if (b64OrgId) {
          const decoded = atob(b64OrgId);
          const m = decoded.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
          if (m) { console.log('[skilling] orgId: Webex people/me API'); return m[1]; }
        }
      }
    } catch (e) { console.warn('[skilling] Webex people/me failed:', e); }

    console.warn('[skilling] orgId: exhausted all sources');
    return null;
  }

  _orgIdFromUrl() {
    const m = window.location.href.match(/\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\//i);
    return m ? m[1] : null;
  }

  // ─── API helpers ─────────────────────────────────────────────────────────

  async _apiGet(path, params = {}) {
    const url = new URL(`${this._apiBaseUrl}${path}`);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

    const res = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${this._token}`,
        'Accept':        'application/json',
      },
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => res.statusText);
      throw new Error(`GET ${path} → ${res.status}: ${txt}`);
    }
    return res.json();
  }

  async _apiPut(path, body) {
    const res = await fetch(`${this._apiBaseUrl}${path}`, {
      method:  'PUT',
      headers: {
        'Authorization': `Bearer ${this._token}`,
        'Content-Type':  'application/json',
        'Accept':        'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => res.statusText);
      throw new Error(`PUT ${path} → ${res.status}: ${txt}`);
    }
    return res.json();
  }

  // Fetches all pages and returns the flat data array.
  async _fetchPages(path, extraParams = {}) {
    const all = [];
    let page = 1;
    const pageSize = 100;

    while (true) {
      const json = await this._apiGet(path, { ...extraParams, page, pageSize });

      // Normalise: some endpoints wrap in {data:[...]}, others return array directly
      const rows = Array.isArray(json) ? json : (json.data ?? json.records ?? []);
      if (!rows.length) break;

      all.push(...rows);

      const total = json.meta?.totalCount ?? json.totalCount ?? json.total ?? null;
      if (total === null || all.length >= total) break;
      page++;
    }
    return all;
  }

  // ─── Data fetching ───────────────────────────────────────────────────────

  async _fetchAll() {
    this._loading    = true;
    this._loadingMsg = 'Loading teams and skill profiles…';
    try {
      await Promise.all([
        this._fetchTeams(),
        this._fetchSkillProfiles(),
        this._fetchSkills(),
      ]);
      this._loadingMsg = 'Loading agents…';
      await this._fetchAgents();
      this._toast('Data loaded successfully', 'success');
    } catch (err) {
      this._error = err.message;
      console.error('[supervisor-skilling]', err);
    } finally {
      this._loading = false;
    }
  }

  async _fetchTeams() {
    const rows = await this._fetchPages(`/organization/${this._orgId}/team`);
    this._teams = rows.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
  }

  async _fetchSkillProfiles() {
    const rows = await this._fetchPages(`/organization/${this._orgId}/skill-profile`);
    this._skillProfiles = rows.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
  }

  async _fetchSkills() {
    const rows = await this._fetchPages(`/organization/${this._orgId}/skill`);
    this._skills = rows;
  }

  async _fetchAgents() {
    const rows = await this._fetchPages(`/organization/${this._orgId}/agent`);
    this._agents = rows
      .filter(a => !a.agentType || a.agentType === 'AGENT' || a.type === 'AGENT')
      .sort((a, b) => (a.name ?? a.email ?? '').localeCompare(b.name ?? b.email ?? ''));
  }

  // ─── Updates ─────────────────────────────────────────────────────────────

  async _updateAgent(agentId, profileId, customSkills = null) {
    this._savingAgents = new Set([...this._savingAgents, agentId]);

    try {
      // Fetch current agent record to preserve all other fields
      const raw  = await this._apiGet(`/organization/${this._orgId}/agent/${agentId}`);
      const curr = raw.data ?? raw;

      const payload = { ...curr, skillProfileId: profileId || null };

      // If custom skill overrides were provided, attach them
      if (customSkills) {
        payload.skillProfile = {
          ...curr.skillProfile,
          skills: customSkills,
        };
      }

      const result = await this._apiPut(`/organization/${this._orgId}/agent/${agentId}`, payload);
      const updated = result.data ?? result;

      // Optimistic local update
      this._agents = this._agents.map(a =>
        a.id === agentId
          ? { ...a, skillProfileId: updated.skillProfileId ?? profileId }
          : a
      );
    } finally {
      const next = new Set(this._savingAgents);
      next.delete(agentId);
      this._savingAgents = next;
    }
  }

  async _bulkUpdate() {
    if (!this._bulkProfileId || !this._selectedAgents.size) return;

    const ids  = [...this._selectedAgents];
    const name = this._profileName(this._bulkProfileId);

    let ok = 0;
    let fail = 0;

    for (const id of ids) {
      try {
        await this._updateAgent(id, this._bulkProfileId);
        ok++;
      } catch (err) {
        fail++;
        console.error('[supervisor-skilling] bulk update error for', id, err);
      }
    }

    if (fail === 0) {
      this._toast(`${ok} agent(s) updated to "${name}"`, 'success');
    } else {
      this._toast(`${ok} succeeded, ${fail} failed — check console`, 'error');
    }

    this._selectedAgents = new Set();
    this._bulkProfileId  = '';
  }

  // ─── Modal ───────────────────────────────────────────────────────────────

  _openModal(agent) {
    this._modalAgent     = agent;
    this._modalProfileId = agent.skillProfileId ?? '';
    this._showDirectEdit = false;
    this._directSkills   = this._defaultDirectSkills(agent.skillProfileId);
    this._showModal      = true;
  }

  _closeModal() {
    this._showModal      = false;
    this._modalAgent     = null;
    this._showDirectEdit = false;
  }

  _defaultDirectSkills(profileId) {
    // Pre-populate slider values from the assigned profile
    const profile = this._skillProfiles.find(p => p.id === profileId);
    if (!profile?.skills) return {};
    const map = {};
    for (const s of profile.skills) {
      map[s.skillId] = s.competencyLevel ?? s.proficiency ?? 5;
    }
    return map;
  }

  async _saveModal() {
    const agent = this._modalAgent;
    if (!agent) return;

    const profileId    = this._modalProfileId;
    const customSkills = this._showDirectEdit
      ? Object.entries(this._directSkills).map(([skillId, lvl]) => ({
          skillId,
          competencyLevel: Number(lvl),
        }))
      : null;

    try {
      await this._updateAgent(agent.id, profileId, customSkills);
      const pName = profileId ? this._profileName(profileId) : 'None';
      this._toast(`${agent.name ?? agent.email}: profile updated to "${pName}"`, 'success');
      this._closeModal();
    } catch (err) {
      this._toast(`Update failed: ${err.message}`, 'error');
    }
  }

  // ─── Toast notifications ──────────────────────────────────────────────────

  _toast(msg, type = 'info') {
    const id = Date.now();
    this._toasts = [...this._toasts, { id, msg, type }];
    setTimeout(() => {
      this._toasts = this._toasts.filter(t => t.id !== id);
    }, 4000);
  }

  // ─── Computed helpers ────────────────────────────────────────────────────

  get _filteredAgents() {
    const q    = this._searchQuery.toLowerCase().trim();
    const team = this._selectedTeam;

    return this._agents.filter(a => {
      const matchTeam =
        team === '__all__' ||
        a.teamId === team ||
        (Array.isArray(a.teamIds) && a.teamIds.includes(team));

      const matchSearch =
        !q ||
        (a.name  ?? '').toLowerCase().includes(q) ||
        (a.email ?? '').toLowerCase().includes(q);

      return matchTeam && matchSearch;
    });
  }

  _teamName(teamId) {
    return this._teams.find(t => t.id === teamId)?.name ?? teamId ?? '—';
  }

  _profileName(profileId) {
    return this._skillProfiles.find(p => p.id === profileId)?.name ?? profileId ?? '—';
  }

  _profileSkills(profileId) {
    return this._skillProfiles.find(p => p.id === profileId)?.skills ?? [];
  }

  _skillName(skillId) {
    return this._skills.find(s => s.id === skillId)?.name ?? skillId ?? '—';
  }

  _agentTeamName(agent) {
    const tid = agent.teamId ?? (Array.isArray(agent.teamIds) ? agent.teamIds[0] : null);
    return tid ? this._teamName(tid) : '—';
  }

  // ─── Event handlers ──────────────────────────────────────────────────────

  _onTeamChange(e) { this._selectedTeam = e.target.value; }

  _onSearch(e) { this._searchQuery = e.target.value; }

  _onSelectAgent(agentId, checked) {
    const s = new Set(this._selectedAgents);
    checked ? s.add(agentId) : s.delete(agentId);
    this._selectedAgents = s;
  }

  _onSelectAll(checked) {
    this._selectedAgents = checked
      ? new Set(this._filteredAgents.map(a => a.id))
      : new Set();
  }

  _onSkillSlider(skillId, val) {
    this._directSkills = { ...this._directSkills, [skillId]: Number(val) };
  }

  // ─── Render ──────────────────────────────────────────────────────────────

  render() {
    return html`
      <div class="app">
        ${this._renderHeader()}
        ${this._loading    ? this._renderLoading()  :
          this._error      ? this._renderError()    :
                             this._renderMain()}
        ${this._renderToasts()}
        ${this._showModal  ? this._renderModal()    : ''}
      </div>
    `;
  }

  _renderHeader() {
    const total    = this._filteredAgents.length;
    const selected = this._selectedAgents.size;

    return html`
      <div class="header">
        <span class="header-icon">🎯</span>
        <div style="flex:1">
          <div class="header-title">Supervisor Skilling Tool</div>
          <div class="header-subtitle">Manage agent skill profiles in real-time</div>
        </div>
        ${selected ? html`<span class="stats-pill">${selected} selected</span>` : ''}
        <span class="stats-pill">${total} agent${total !== 1 ? 's' : ''}</span>
        <button
          class="refresh-btn"
          ?disabled=${this._loading}
          @click=${() => this._fetchAll()}
        >
          <span>${this._loading ? '⏳' : '🔄'}</span> Refresh
        </button>
      </div>
    `;
  }

  _renderLoading() {
    return html`
      <div class="state-container">
        <span class="state-icon">⏳</span>
        <div class="state-title">Loading…</div>
        <div class="state-msg">${this._loadingMsg}</div>
        <div class="progress-bar-wrap"><div class="progress-bar"></div></div>
      </div>
    `;
  }

  _renderError() {
    return html`
      <div class="state-container">
        <span class="state-icon">⚠️</span>
        <div class="state-title">Something went wrong</div>
        <div class="state-msg">${this._error}</div>
        <button class="btn btn-primary" @click=${() => this._initSDK()}>Retry</button>
        <div style="font-size:11px;color:#9ca3af;margin-top:6px">
          Check browser console for details. Make sure the widget is running inside
          Webex Contact Center Supervisor Desktop.
        </div>
      </div>
    `;
  }

  _renderMain() {
    const agents      = this._filteredAgents;
    const allSelected = agents.length > 0 && agents.every(a => this._selectedAgents.has(a.id));
    const anySelected = this._selectedAgents.size > 0;

    return html`
      ${this._renderControls()}
      ${anySelected ? this._renderBulkBar() : ''}
      <div class="table-container">
        ${agents.length === 0
          ? html`
              <div class="state-container">
                <span class="state-icon">🔍</span>
                <div class="state-title">No agents found</div>
                <div class="state-msg">Try adjusting the team filter or search query.</div>
              </div>`
          : html`
              <table>
                <thead>
                  <tr>
                    <th class="col-check">
                      <input
                        type="checkbox"
                        .checked=${allSelected}
                        @change=${(e) => this._onSelectAll(e.target.checked)}
                        title="Select all visible agents"
                      />
                    </th>
                    <th class="col-name">Agent</th>
                    <th class="col-team">Team</th>
                    <th class="col-profile">Skill Profile</th>
                    <th class="col-skills">Top Skills</th>
                    <th class="col-actions">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  ${agents.map(a => this._renderRow(a))}
                </tbody>
              </table>`
        }
      </div>
    `;
  }

  _renderControls() {
    return html`
      <div class="controls">
        <div class="control-group">
          <label class="ctrl-label">Team</label>
          <select @change=${this._onTeamChange} .value=${this._selectedTeam}>
            <option value="__all__">All Teams (${this._agents.length})</option>
            ${this._teams.map(t => html`
              <option value=${t.id}>${t.name}</option>
            `)}
          </select>
        </div>

        <div class="control-group">
          <label class="ctrl-label">Search</label>
          <input
            class="search-input"
            type="text"
            placeholder="Name or email…"
            .value=${this._searchQuery}
            @input=${this._onSearch}
          />
        </div>

        <div class="spacer"></div>

        <div class="control-group" style="font-size:11px;color:#6b7280">
          ${this._skillProfiles.length} profile(s) &nbsp;|&nbsp;
          ${this._skills.length} skill(s)
        </div>
      </div>
    `;
  }

  _renderBulkBar() {
    const count = this._selectedAgents.size;
    return html`
      <div class="bulk-bar">
        <span class="selected-count">${count} agent${count !== 1 ? 's' : ''} selected</span>
        <span>—</span>
        <select
          .value=${this._bulkProfileId}
          @change=${(e) => (this._bulkProfileId = e.target.value)}
        >
          <option value="">Choose a skill profile to assign…</option>
          <option value="__none__">— Remove skill profile —</option>
          ${this._skillProfiles.map(p => html`
            <option value=${p.id}>${p.name}</option>
          `)}
        </select>
        <button
          class="btn btn-primary btn-sm"
          ?disabled=${!this._bulkProfileId}
          @click=${() => this._bulkUpdate()}
        >
          Apply to ${count}
        </button>
        <button class="btn btn-ghost btn-sm" @click=${() => (this._selectedAgents = new Set())}>
          Clear selection
        </button>
      </div>
    `;
  }

  _renderRow(agent) {
    const isSaving   = this._savingAgents.has(agent.id);
    const isSelected = this._selectedAgents.has(agent.id);
    const profileId  = agent.skillProfileId;
    const profileName = profileId ? this._profileName(profileId) : null;
    const skills     = profileId ? this._profileSkills(profileId) : [];
    const topSkills  = skills.slice(0, 3);

    return html`
      <tr class="${isSelected ? 'selected' : ''} ${isSaving ? 'saving' : ''}">
        <td>
          <input
            type="checkbox"
            .checked=${isSelected}
            ?disabled=${isSaving}
            @change=${(e) => this._onSelectAgent(agent.id, e.target.checked)}
          />
        </td>
        <td>
          <div class="agent-name">${agent.name ?? '(no name)'}</div>
          <div class="agent-email">${agent.email ?? ''}</div>
        </td>
        <td>
          <span class="team-badge">${this._agentTeamName(agent)}</span>
        </td>
        <td>
          ${profileId
            ? html`<span class="profile-badge">✓ ${profileName}</span>`
            : html`<span class="profile-badge none">⚠ None assigned</span>`}
        </td>
        <td>
          ${topSkills.length
            ? html`
                <div class="skill-pills">
                  ${topSkills.map(s => html`
                    <span class="skill-pill">
                      ${this._skillName(s.skillId)}
                      <span class="lvl"> ${s.competencyLevel ?? s.proficiency ?? '?'}</span>
                    </span>
                  `)}
                  ${skills.length > 3
                    ? html`<span class="skill-pill">+${skills.length - 3} more</span>`
                    : ''}
                </div>`
            : html`<span class="skills-count" style="color:#d1d5db">—</span>`}
        </td>
        <td>
          <div class="action-btns">
            ${isSaving
              ? html`<span class="saving-spinner"></span>`
              : html`
                  <button
                    class="icon-btn edit"
                    title="Edit skill profile"
                    @click=${() => this._openModal(agent)}
                  >✏️</button>`}
          </div>
        </td>
      </tr>
    `;
  }

  _renderModal() {
    const agent      = this._modalAgent;
    const profileId  = this._modalProfileId;
    const profile    = this._skillProfiles.find(p => p.id === profileId);
    const isSaving   = this._savingAgents.has(agent?.id);
    const skills     = profile?.skills ?? [];

    return html`
      <div class="modal-backdrop" @click=${(e) => { if (e.target === e.currentTarget) this._closeModal(); }}>
        <div class="modal">
          <div class="modal-header">
            <span>✏️</span>
            <span class="modal-header-title">Edit Skill Profile</span>
            <button class="modal-close" @click=${this._closeModal}>✕</button>
          </div>

          <div class="modal-body">
            <!-- Agent info card -->
            <div class="agent-card">
              <div class="name">${agent?.name ?? agent?.email ?? '(unknown)'}</div>
              <div class="meta">${agent?.email ?? ''} &nbsp;|&nbsp; ${this._agentTeamName(agent ?? {})}</div>
              <div class="current-profile">
                <span style="color:#6b7280;font-size:11px">Current profile:</span>
                ${agent?.skillProfileId
                  ? html`<span class="profile-badge">✓ ${this._profileName(agent.skillProfileId)}</span>`
                  : html`<span class="profile-badge none">⚠ None</span>`}
              </div>
            </div>

            <!-- Profile selector -->
            <div class="form-group">
              <label class="form-label">Assign Skill Profile</label>
              <select
                class="form-select"
                .value=${profileId}
                @change=${(e) => {
                  this._modalProfileId = e.target.value;
                  this._directSkills   = this._defaultDirectSkills(e.target.value);
                  this._showDirectEdit = false;
                }}
              >
                <option value="">— No skill profile —</option>
                ${this._skillProfiles.map(p => html`
                  <option value=${p.id} ?selected=${p.id === profileId}>${p.name}</option>
                `)}
              </select>
            </div>

            <!-- Profile skill preview -->
            ${profile ? html`
              <div class="profile-preview">
                <div class="preview-header">Skills in "${profile.name}"</div>
                ${skills.length
                  ? html`
                      <div class="preview-skills">
                        ${skills.map(s => {
                          const lvl = s.competencyLevel ?? s.proficiency ?? 0;
                          return html`
                            <div class="preview-skill">
                              <span class="preview-skill-name">${this._skillName(s.skillId)}</span>
                              <div class="proficiency-bar-wrap">
                                <div class="proficiency-bar" style="width:${lvl * 10}%"></div>
                              </div>
                              <span class="proficiency-label">${lvl}/10</span>
                            </div>
                          `;
                        })}
                      </div>`
                  : html`<div class="preview-empty">No skills defined in this profile.</div>`}
              </div>` : ''}

            <!-- Direct skill override toggle -->
            ${profile && skills.length ? html`
              <div class="direct-skills-section">
                <button
                  class="direct-skills-toggle"
                  @click=${() => (this._showDirectEdit = !this._showDirectEdit)}
                >
                  ${this._showDirectEdit ? '▲ Hide' : '▼ Customize'} individual skill levels
                </button>

                ${this._showDirectEdit ? html`
                  <div style="font-size:11px;color:#f59e0b;margin:6px 0;padding:6px 10px;background:#fffbeb;border-radius:5px;border:1px solid #fde68a">
                    ⚠️ Customizing skills will create agent-specific overrides and may not persist
                    if the org's API restricts direct skill assignments.
                  </div>
                  <div class="skills-editor">
                    ${skills.map(s => {
                      const skillId = s.skillId;
                      const current = this._directSkills[skillId] ?? s.competencyLevel ?? s.proficiency ?? 5;
                      return html`
                        <div class="skill-row">
                          <span class="skill-row-name">${this._skillName(skillId)}</span>
                          <input
                            type="range" min="1" max="10" step="1"
                            .value=${String(current)}
                            @input=${(e) => this._onSkillSlider(skillId, e.target.value)}
                          />
                          <span class="lvl-display">${current}</span>
                        </div>
                      `;
                    })}
                  </div>` : ''}
              </div>` : ''}
          </div>

          <div class="modal-footer">
            <button class="btn btn-ghost" @click=${this._closeModal}>Cancel</button>
            <button
              class="btn btn-primary"
              ?disabled=${isSaving}
              @click=${() => this._saveModal()}
            >
              ${isSaving ? html`<span class="saving-spinner" style="width:12px;height:12px"></span> Saving…` : '💾 Save Changes'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  _renderToasts() {
    return html`
      <div class="toast-container">
        ${this._toasts.map(t => html`
          <div class="toast ${t.type}">
            <span class="toast-icon">${t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="toast-msg">${t.msg}</span>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('supervisor-skilling-widget', SupervisorSkillingWidget);
