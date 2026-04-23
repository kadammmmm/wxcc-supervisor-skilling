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
      background: #F9FAFB;
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
      background: linear-gradient(135deg, #EC4899 0%, #9333EA 50%, #0EA5E9 100%);
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
      border-color: #7C3AED;
      box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
    }

    .search-input { width: 200px; }

    .spacer { flex: 1; }

    .stats-pill {
      background: #F5F3FF;
      color: #5B21B6;
      border-radius: 20px;
      padding: 3px 10px;
      font-size: 11px;
      font-weight: 600;
    }

    /* ── Bulk action bar ── */
    .bulk-bar {
      background: #F5F3FF;
      border-bottom: 1px solid #DDD6FE;
      padding: 8px 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      font-size: 12px;
    }

    .bulk-bar .selected-count {
      font-weight: 700;
      color: #7C3AED;
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
      background: #7C3AED;
      color: #fff;
    }
    .btn-primary:hover { background: #6D28D9; }
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
    th.col-skills { min-width: 200px; }
    th.col-actions { width: 80px; text-align: center; }

    tbody tr {
      border-bottom: 1px solid #f1f5f9;
      transition: background 0.1s;
    }

    tbody tr:hover { background: #f8fafc; }
    tbody tr.selected { background: #F5F3FF; }
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

    /* ── Skill definitions column ── */
    .skill-defs {
      display: flex;
      flex-direction: column;
      gap: 3px;
      max-width: 260px;
    }

    .skill-def-row {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
    }

    .skill-def-name {
      flex: 1;
      color: #374151;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .skill-def-lvl {
      background: #EDE9FE;
      color: #5B21B6;
      border-radius: 4px;
      padding: 1px 5px;
      font-size: 10px;
      font-weight: 700;
      flex-shrink: 0;
    }

    .skill-def-bool {
      color: #16a34a;
      font-size: 12px;
      flex-shrink: 0;
    }

    .skill-def-text {
      background: #f3f4f6;
      color: #374151;
      border-radius: 4px;
      padding: 1px 5px;
      font-size: 10px;
      flex-shrink: 0;
      max-width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .skill-def-more {
      font-size: 10px;
      color: #9ca3af;
      font-style: italic;
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
    .icon-btn.edit:hover { background: #EDE9FE; color: #7C3AED; }

    .saving-spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid #d1d5db;
      border-top-color: #7C3AED;
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
      background: linear-gradient(90deg, #EC4899, #9333EA, #0EA5E9);
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
      background: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%);
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
      background: linear-gradient(90deg, #7C3AED, #9333EA);
    }

    .proficiency-label {
      width: 28px;
      text-align: right;
      font-size: 11px;
      font-weight: 700;
      color: #7C3AED;
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
      color: #7C3AED;
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
      accent-color: #7C3AED;
      cursor: pointer;
    }
    .skill-row .lvl-display {
      width: 24px;
      text-align: center;
      font-size: 12px;
      font-weight: 700;
      color: #7C3AED;
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
    .toast.info    { border-left: 4px solid #7C3AED; }

    .toast-icon { font-size: 16px; flex-shrink: 0; }
    .toast-msg  { flex: 1; }

    /* ── Checkbox ── */
    input[type="checkbox"] {
      width: 15px;
      height: 15px;
      cursor: pointer;
      accent-color: #7C3AED;
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

    /* ── Coverage gap banner ── */
    .coverage-banner {
      background: #FFFBEB;
      border-bottom: 2px solid #FDE68A;
      padding: 10px 20px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      flex-shrink: 0;
    }

    .coverage-banner-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }

    .coverage-banner-body { flex: 1; }

    .coverage-banner-title {
      font-size: 12px;
      font-weight: 700;
      color: #92400E;
      margin-bottom: 5px;
    }

    .coverage-gap-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .coverage-gap-pill {
      background: #FEF3C7;
      color: #78350F;
      border: 1px solid #FDE68A;
      border-radius: 12px;
      padding: 2px 9px;
      font-size: 11px;
      font-weight: 600;
    }

    .coverage-dismiss {
      background: none;
      border: none;
      color: #92400E;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      padding: 2px 4px;
      opacity: 0.55;
      flex-shrink: 0;
      border-radius: 4px;
    }
    .coverage-dismiss:hover { opacity: 1; background: rgba(0,0,0,0.06); }

    /* ── View toggle ── */
    .view-toggle {
      display: flex;
      background: #f3f4f6;
      border-radius: 6px;
      padding: 2px;
      gap: 2px;
    }

    .view-toggle-btn {
      background: none;
      border: none;
      border-radius: 5px;
      padding: 4px 11px;
      font-size: 11px;
      font-weight: 600;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.15s;
      display: flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
    }

    .view-toggle-btn.active {
      background: #fff;
      color: #7C3AED;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    }

    /* ── Columns panel ── */
    .columns-panel-bar {
      background: #faf5ff;
      border-bottom: 1px solid #DDD6FE;
      padding: 8px 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      flex-wrap: wrap;
    }

    .columns-panel-label {
      font-size: 11px;
      font-weight: 700;
      color: #5B21B6;
      white-space: nowrap;
    }

    .columns-check-row {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: #374151;
      cursor: pointer;
      background: #fff;
      border: 1px solid #DDD6FE;
      border-radius: 5px;
      padding: 3px 8px;
      user-select: none;
      transition: background 0.1s;
    }

    .columns-check-row:hover { background: #EDE9FE; }

    .columns-check-row input[type="checkbox"] {
      width: 12px;
      height: 12px;
      accent-color: #7C3AED;
      margin: 0;
    }

    .columns-check-row.col-hidden {
      opacity: 0.5;
      background: #f3f4f6;
      border-color: #e5e7eb;
      text-decoration: line-through;
    }

    .columns-action-btn {
      background: none;
      border: 1px solid #DDD6FE;
      border-radius: 5px;
      color: #7C3AED;
      font-size: 11px;
      font-weight: 600;
      padding: 3px 9px;
      cursor: pointer;
      white-space: nowrap;
    }

    .columns-action-btn:hover { background: #EDE9FE; }

    /* ── Matrix view ── */
    .matrix-wrap {
      flex: 1;
      overflow: auto;
    }

    .matrix-table {
      border-collapse: collapse;
      background: #fff;
      width: max-content;
      min-width: 100%;
    }

    .matrix-table thead tr {
      position: sticky;
      top: 0;
      z-index: 2;
    }

    .matrix-table th {
      background: #f8fafc;
      padding: 9px 10px;
      text-align: left;
      font-size: 10px;
      font-weight: 700;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid #e5e7eb;
      white-space: nowrap;
    }

    .matrix-table th.mh-agent {
      position: sticky;
      left: 0;
      z-index: 3;
      width: 170px;
      min-width: 170px;
      max-width: 170px;
      border-right: 2px solid #e5e7eb;
    }

    .matrix-table th.mh-profile {
      position: sticky;
      left: 170px;
      z-index: 3;
      min-width: 150px;
      border-right: 2px solid #e5e7eb;
    }

    .matrix-table th.mh-skill {
      min-width: 88px;
      max-width: 120px;
      text-align: center;
      border-right: 1px solid #f1f5f9;
      cursor: pointer;
      user-select: none;
      transition: background 0.12s, color 0.12s;
      vertical-align: bottom;
      padding-bottom: 7px;
    }

    .matrix-table th.mh-skill:hover { background: #EDE9FE; color: #5B21B6; }
    .matrix-table th.mh-skill.mh-sorted { background: #EDE9FE; color: #5B21B6; }
    .matrix-table th.mh-skill.mh-sorted .mh-skill-count { color: #7C3AED; }

    .mh-skill-name {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .mh-skill-count {
      font-size: 9px;
      font-weight: 500;
      color: #9ca3af;
      text-transform: none;
      letter-spacing: 0;
      margin-top: 2px;
    }

    .matrix-table tbody tr {
      border-bottom: 1px solid #f1f5f9;
      transition: background 0.1s;
    }

    .matrix-table tbody tr:hover { background: #faf5ff; }
    .matrix-table tbody tr.matrix-row-none { background: #FFFBEB; }
    .matrix-table tbody tr.matrix-row-none:hover { background: #FEF3C7; }

    .matrix-table td {
      padding: 8px 10px;
      font-size: 12px;
      vertical-align: middle;
    }

    .matrix-table td.mc-agent {
      position: sticky;
      left: 0;
      background: #fff;
      z-index: 1;
      width: 170px;
      min-width: 170px;
      max-width: 170px;
      border-right: 2px solid #e5e7eb;
    }

    .matrix-table td.mc-profile {
      position: sticky;
      left: 170px;
      background: #fff;
      z-index: 1;
      border-right: 2px solid #e5e7eb;
    }

    .matrix-table tbody tr:hover td.mc-agent,
    .matrix-table tbody tr:hover td.mc-profile { background: #faf5ff; }

    .matrix-table tbody tr.matrix-row-none td.mc-agent,
    .matrix-table tbody tr.matrix-row-none td.mc-profile { background: #FFFBEB; }

    .matrix-table tbody tr.matrix-row-none:hover td.mc-agent,
    .matrix-table tbody tr.matrix-row-none:hover td.mc-profile { background: #FEF3C7; }

    .matrix-table td.mc-skill {
      text-align: center;
      border-right: 1px solid #f1f5f9;
      padding: 6px 4px;
    }

    /* ── Summary row ── */
    .matrix-table tfoot tr td {
      position: sticky;
      bottom: 0;
      background: #f8fafc;
      border-top: 2px solid #e5e7eb;
      font-size: 11px;
      font-weight: 600;
      color: #374151;
      z-index: 1;
    }

    .matrix-table tfoot tr td.mc-agent {
      z-index: 2;
      color: #6b7280;
      font-style: italic;
      font-size: 11px;
    }

    .matrix-table tfoot tr td.mc-profile {
      z-index: 2;
    }

    .mx-avg {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      padding: 2px 7px;
      font-size: 11px;
      font-weight: 700;
    }

    .mx-avg-high { background: #DCFCE7; color: #166534; }
    .mx-avg-mid  { background: #FEF9C3; color: #854D0E; }
    .mx-avg-low  { background: #FEE2E2; color: #991B1B; }

    .mx-bool-count {
      font-size: 11px;
      font-weight: 700;
      color: #16a34a;
    }

    .mx-empty { color: #d1d5db; font-size: 14px; }

    .mx-bool {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: #DCFCE7;
      color: #166534;
      font-size: 13px;
      font-weight: 700;
    }

    .mx-text {
      display: inline-block;
      background: #f3f4f6;
      color: #374151;
      border-radius: 4px;
      padding: 2px 5px;
      font-size: 10px;
      max-width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .mx-lvl {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 7px;
      font-size: 12px;
      font-weight: 700;
    }

    .mx-lvl-high { background: #DCFCE7; color: #166534; }
    .mx-lvl-mid  { background: #FEF9C3; color: #854D0E; }
    .mx-lvl-low  { background: #FEE2E2; color: #991B1B; }

    .matrix-legend {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 7px 16px;
      background: #f8fafc;
      border-top: 1px solid #e5e7eb;
      flex-shrink: 0;
      font-size: 11px;
      color: #6b7280;
      flex-wrap: wrap;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 5px;
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
    _viewMode:          { state: true },
    _matrixSortSkill:   { state: true },
    _matrixSortDir:     { state: true },
    _hiddenSkillIds:    { state: true },
    _showColumnsPanel:  { state: true },
    _coverageGaps:      { state: true },
    _gapsDismissed:   { state: true },
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
    this._viewMode       = 'table';
    this._matrixSortSkill  = null;
    this._matrixSortDir    = 'desc';
    this._hiddenSkillIds   = new Set();
    this._showColumnsPanel = false;
    this._coverageGaps     = [];
    this._gapsDismissed  = false;
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
    console.log('[skilling] v1.7.2 — initSDK start');
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

  // Fetches all pages using 0-indexed v2 pagination.
  // v2 responses use meta.links.next to indicate more pages;
  // falls back to meta.totalCount when links are absent.
  async _fetchPages(path, extraParams = {}) {
    const all = [];
    let page = 0;          // v2 API is 0-indexed
    const pageSize = 100;

    while (true) {
      const json = await this._apiGet(path, { ...extraParams, page, pageSize });
      const rows = Array.isArray(json) ? json : (json.data ?? json.records ?? []);
      if (!rows.length) break;

      all.push(...rows);

      // Stop if no next-page link and we've fetched everything
      const hasNextLink = !!json.meta?.links?.next;
      const total = json.meta?.totalCount ?? json.totalCount ?? json.total ?? null;
      if (!hasNextLink && (total === null || all.length >= total)) break;
      if (!hasNextLink) break;

      page++;
    }
    return all;
  }

  // Try path, fall back to fallback if first returns 404.
  async _fetchPagesWithFallback(path, fallback, extraParams = {}) {
    try {
      return await this._fetchPages(path, extraParams);
    } catch (err) {
      if (err.message.includes('404') && fallback) {
        console.log(`[skilling] ${path} → 404, trying ${fallback}`);
        return this._fetchPages(fallback, extraParams);
      }
      throw err;
    }
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
      this._loadingMsg = 'Checking skill coverage…';
      await this._fetchAgentStats();
      this._toast('Data loaded successfully', 'success');
    } catch (err) {
      this._error = err.message;
      console.error('[supervisor-skilling]', err);
    } finally {
      this._loading = false;
    }
  }

  async _fetchTeams() {
    const rows = await this._fetchPagesWithFallback(
      `/organization/${this._orgId}/v2/team`,
      `/organization/${this._orgId}/team`
    );
    this._teams = rows.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
  }

  async _fetchSkillProfiles() {
    const rows = await this._fetchPagesWithFallback(
      `/organization/${this._orgId}/v2/skill-profile`,
      `/organization/${this._orgId}/skill-profile`
    );
    this._skillProfiles = rows.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
    if (this._skillProfiles.length > 0) {
      const sample = this._skillProfiles[0];
      console.log('[skilling] skill profile sample keys:', Object.keys(sample));
      console.log('[skilling] skill profile sample activeSkills:', sample.activeSkills?.length, '| skills:', sample.skills?.length);
    }
  }

  async _fetchSkills() {
    const rows = await this._fetchPagesWithFallback(
      `/organization/${this._orgId}/v2/skill`,
      `/organization/${this._orgId}/skill`
    );
    this._skills = rows;
  }

  async _fetchAgents() {
    // WxCC v2 uses /v2/agent; some deployments use /v2/user for agent records
    const rows = await this._fetchPagesWithFallback(
      `/organization/${this._orgId}/v2/agent`,
      `/organization/${this._orgId}/v2/user`
    );
    this._agents = rows
      .filter(a => !a.agentType || a.agentType === 'AGENT' || a.type === 'AGENT' || a.userType === 'AGENT')
      .sort((a, b) => {
        const nameA = this._agentNameFrom(a);
        const nameB = this._agentNameFrom(b);
        return nameA.localeCompare(nameB);
      });
    console.log('[skilling] loaded', this._agents.length, 'agents');
    if (this._agents.length > 0) {
      const sample = this._agents[0];
      console.log('[skilling] agent sample keys:', Object.keys(sample));
      console.log('[skilling] agent sample skillProfileId:', sample.skillProfileId,
        '| skillProfile:', sample.skillProfile,
        '| activeSkillProfileId:', sample.activeSkillProfileId);
    }
  }

  async _fetchAgentStats() {
    try {
      const json = await this._apiGet('/v1/agents/statistics', { to: '', from: '' });
      const records = Array.isArray(json) ? json : (json.data ?? json.agentStats ?? json.items ?? []);
      if (records.length > 0) {
        console.log('[skilling] agent-stats sample record keys:', Object.keys(records[0]));
        console.log('[skilling] agent-stats sample state field:',
          records[0].currentState ?? records[0].state ?? records[0].agentState ?? records[0].status ?? '(unknown)');
      }
      this._computeCoverageGaps(records);
    } catch (err) {
      console.warn('[skilling] agent-stats unavailable:', err.message);
      this._coverageGaps = [];
    }
  }

  _computeCoverageGaps(statsRecords) {
    // Identify agents currently in Available state
    const availableIds = new Set();
    for (const r of statsRecords) {
      const state = r.currentState ?? r.state ?? r.agentState ?? r.status ?? '';
      const id    = r.agentId ?? r.id ?? r.userId ?? '';
      if (id && /available/i.test(String(state))) availableIds.add(id);
    }

    // Skills covered by at least one available agent
    const covered = new Set();
    for (const agent of this._agents) {
      if (!availableIds.has(agent.id)) continue;
      for (const s of this._profileSkills(agent.skillProfileId)) {
        covered.add(this._skillDefId(s));
      }
    }

    // All skills that appear in any agent's profile
    const inUse = new Set();
    for (const agent of this._agents) {
      for (const s of this._profileSkills(agent.skillProfileId)) {
        inUse.add(this._skillDefId(s));
      }
    }

    this._coverageGaps = [...inUse]
      .filter(id => !covered.has(id))
      .map(id => this._skillName(id))
      .sort();

    this._gapsDismissed = false;
    console.log('[skilling] coverage gaps:', this._coverageGaps.length,
      '| available agents matched:', availableIds.size);
  }

  // ─── Updates ─────────────────────────────────────────────────────────────

  async _updateAgent(agentId, profileId, customSkills = null) {
    this._savingAgents = new Set([...this._savingAgents, agentId]);

    try {
      // GET current record first (preserve all other fields)
      let raw;
      try {
        raw = await this._apiGet(`/organization/${this._orgId}/v2/agent/${agentId}`);
      } catch (e) {
        if (e.message.includes('404')) {
          raw = await this._apiGet(`/organization/${this._orgId}/user/${agentId}`);
        } else throw e;
      }
      const curr = raw.data ?? raw;

      const payload = { ...curr, skillProfileId: profileId || null };
      if (customSkills) {
        payload.skillProfile = { ...curr.skillProfile, skills: customSkills };
      }

      let result;
      try {
        result = await this._apiPut(`/organization/${this._orgId}/v2/agent/${agentId}`, payload);
      } catch (e) {
        if (e.message.includes('404')) {
          result = await this._apiPut(`/organization/${this._orgId}/user/${agentId}`, payload);
        } else throw e;
      }
      const updated = result.data ?? result;

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
    for (const s of profile.activeSkills ?? profile.skills ?? []) {
      const { isBoolean, isText, numericValue } = this._parseSkillEntry(s);
      if (!isBoolean && !isText) map[this._skillDefId(s)] = numericValue ?? 5;
    }
    return map;
  }

  async _saveModal() {
    const agent = this._modalAgent;
    if (!agent) return;

    const profileId    = this._modalProfileId;
    const customSkills = this._showDirectEdit
      ? Object.entries(this._directSkills).map(([skillDefinitionId, lvl]) => ({
          skillDefinitionId,
          value: String(lvl),
        }))
      : null;

    try {
      await this._updateAgent(agent.id, profileId, customSkills);
      const pName = profileId ? this._profileName(profileId) : 'None';
      this._toast(`${this._agentName(agent)}: profile updated to "${pName}"`, 'success');
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

  // Resolves a display name from whichever fields the API returns.
  // Works as a static helper (no `this`) so it can be used during sort.
  _agentNameFrom(agent) {
    if (agent.name) return agent.name;
    const full = [agent.firstName, agent.lastName].filter(Boolean).join(' ').trim();
    if (full) return full;
    return agent.displayName || agent.userName || agent.email || '';
  }

  _agentName(agent) {
    return this._agentNameFrom(agent);
  }

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
        this._agentNameFrom(a).toLowerCase().includes(q) ||
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
    const p = this._skillProfiles.find(p => p.id === profileId);
    return p?.activeSkills ?? p?.skills ?? [];
  }

  _skillName(skillId) {
    return this._skills.find(s => s.id === skillId)?.name ?? skillId ?? '—';
  }

  _skillType(skillId) {
    const def = this._skills.find(s => s.id === skillId);
    return def?.type ?? def?.skillType ?? 'PROFICIENCY';
  }

  // Returns { isBoolean, isText, numericValue, textValue } from an activeSkills entry.
  // API shape: { skillId, proficiencyValue } | { skillId, booleanValue } | { skillId, textValue }
  _parseSkillEntry(s) {
    if (s.booleanValue !== undefined) {
      return { isBoolean: true, isText: false, numericValue: null, textValue: null };
    }
    if (s.textValue !== undefined) {
      return { isBoolean: false, isText: true, numericValue: null, textValue: s.textValue };
    }
    const numericValue = s.proficiencyValue ?? (s.value !== undefined ? Number(s.value) : null);
    return { isBoolean: false, isText: false, numericValue, textValue: null };
  }

  _skillDefId(s) {
    return s.skillId ?? s.skillDefinitionId;
  }

  _agentTeamName(agent) {
    const tid = agent.teamId ?? (Array.isArray(agent.teamIds) ? agent.teamIds[0] : null);
    return tid ? this._teamName(tid) : '—';
  }

  _buildMatrix() {
    const agents = this._filteredAgents;
    const skillIdSet = new Set();
    const agentSkillMaps = new Map();

    for (const agent of agents) {
      const profileSkills = this._profileSkills(agent.skillProfileId);
      const map = new Map();
      for (const s of profileSkills) {
        const id = this._skillDefId(s);
        skillIdSet.add(id);
        map.set(id, this._parseSkillEntry(s));
      }
      agentSkillMaps.set(agent.id, map);
    }

    const allSkillIds = [...skillIdSet].sort((a, b) =>
      this._skillName(a).localeCompare(this._skillName(b))
    );
    const skillIds = allSkillIds.filter(id => !this._hiddenSkillIds.has(id));

    // Per-skill: agent count + summary stats for the footer row
    const skillCounts  = new Map();
    const skillSummary = new Map();
    for (const id of skillIds) {
      let agentCount = 0, profSum = 0, profCount = 0, boolCount = 0, isBoolean = false;
      for (const map of agentSkillMaps.values()) {
        const entry = map.get(id);
        if (!entry) continue;
        agentCount++;
        if (entry.isBoolean) { isBoolean = true; boolCount++; }
        else if (!entry.isText && entry.numericValue != null) { profSum += entry.numericValue; profCount++; }
      }
      skillCounts.set(id, agentCount);
      skillSummary.set(id, {
        avg:        profCount > 0 ? (profSum / profCount).toFixed(1) : null,
        profCount,
        boolCount,
        agentCount,
        isBoolean,
      });
    }

    // Sort agents by selected skill column (agents missing the skill sink to bottom)
    let sortedAgents = [...agents];
    if (this._matrixSortSkill && skillIdSet.has(this._matrixSortSkill)) {
      const sid  = this._matrixSortSkill;
      const desc = this._matrixSortDir !== 'asc';
      sortedAgents.sort((a, b) => {
        const ea = agentSkillMaps.get(a.id)?.get(sid);
        const eb = agentSkillMaps.get(b.id)?.get(sid);
        if (!ea && !eb) return 0;
        if (!ea) return 1;
        if (!eb) return -1;
        const va = ea.numericValue ?? (ea.isBoolean ? 11 : 0);
        const vb = eb.numericValue ?? (eb.isBoolean ? 11 : 0);
        return desc ? vb - va : va - vb;
      });
    }

    return { agents: sortedAgents, skillIds, allSkillIds, agentSkillMaps, skillCounts, skillSummary };
  }

  _renderMatrixCell(entry) {
    if (!entry) return html`<span class="mx-empty">—</span>`;
    const { isBoolean, isText, numericValue, textValue } = entry;
    if (isBoolean) return html`<span class="mx-bool">✓</span>`;
    if (isText)    return html`<span class="mx-text">${textValue}</span>`;
    if (numericValue != null) {
      const cls = numericValue >= 7 ? 'high' : numericValue >= 4 ? 'mid' : 'low';
      return html`<span class="mx-lvl mx-lvl-${cls}">${numericValue}</span>`;
    }
    return html`<span class="mx-empty">—</span>`;
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

  _onMatrixSort(skillId) {
    if (this._matrixSortSkill === skillId) {
      this._matrixSortDir = this._matrixSortDir === 'desc' ? 'asc' : 'desc';
    } else {
      this._matrixSortSkill = skillId;
      this._matrixSortDir   = 'desc';
    }
  }

  _toggleSkillColumn(skillId, hide) {
    const next = new Set(this._hiddenSkillIds);
    hide ? next.add(skillId) : next.delete(skillId);
    this._hiddenSkillIds = next;
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
          <div class="header-subtitle">Manage agent skill profiles in real-time &nbsp;·&nbsp; v1.7.2</div>
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
      ${this._renderCoverageWarning()}
      ${this._viewMode === 'matrix' ? this._renderColumnsPanel() : ''}
      ${anySelected && this._viewMode === 'table' ? this._renderBulkBar() : ''}
      ${this._viewMode === 'matrix' ? this._renderMatrix() : html`
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
                    <th class="col-skills">Skills</th>
                    <th class="col-actions">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  ${agents.map(a => this._renderRow(a))}
                </tbody>
              </table>`
        }
      </div>`}
    `;
  }

  _renderCoverageWarning() {
    if (!this._coverageGaps.length || this._gapsDismissed) return '';
    const count = this._coverageGaps.length;
    return html`
      <div class="coverage-banner">
        <span class="coverage-banner-icon">⚠️</span>
        <div class="coverage-banner-body">
          <div class="coverage-banner-title">
            ${count} skill${count !== 1 ? 's have' : ' has'} zero available agent coverage right now
          </div>
          <div class="coverage-gap-pills">
            ${this._coverageGaps.map(name => html`
              <span class="coverage-gap-pill">No available agents · ${name}</span>
            `)}
          </div>
        </div>
        <button class="coverage-dismiss" title="Dismiss" @click=${() => (this._gapsDismissed = true)}>✕</button>
      </div>
    `;
  }

  _renderColumnsPanel() {
    if (!this._showColumnsPanel) return '';
    const allSkillIds = [...new Set(
      this._filteredAgents.flatMap(a => this._profileSkills(a.skillProfileId).map(s => this._skillDefId(s)))
    )].sort((a, b) => this._skillName(a).localeCompare(this._skillName(b)));

    if (!allSkillIds.length) return '';

    return html`
      <div class="columns-panel-bar">
        <span class="columns-panel-label">Show / Hide Columns</span>
        <button class="columns-action-btn"
          @click=${() => (this._hiddenSkillIds = new Set())}>Show all</button>
        <button class="columns-action-btn"
          @click=${() => (this._hiddenSkillIds = new Set(allSkillIds))}>Hide all</button>
        ${allSkillIds.map(id => {
          const hidden = this._hiddenSkillIds.has(id);
          return html`
            <label class="columns-check-row ${hidden ? 'col-hidden' : ''}">
              <input type="checkbox"
                .checked=${!hidden}
                @change=${(e) => this._toggleSkillColumn(id, !e.target.checked)}
              />
              ${this._skillName(id)}
            </label>`;
        })}
      </div>
    `;
  }

  _renderMatrix() {
    const { agents, skillIds, allSkillIds, agentSkillMaps, skillCounts, skillSummary } = this._buildMatrix();

    if (!agents.length) {
      return html`
        <div class="state-container">
          <span class="state-icon">🔍</span>
          <div class="state-title">No agents found</div>
          <div class="state-msg">Try adjusting the team filter or search query.</div>
        </div>`;
    }

    if (!allSkillIds.length) {
      return html`
        <div class="state-container">
          <span class="state-icon">📋</span>
          <div class="state-title">No skills to display</div>
          <div class="state-msg">None of the visible agents have a skill profile assigned.</div>
        </div>`;
    }

    if (!skillIds.length) {
      return html`
        <div class="state-container">
          <span class="state-icon">⊟</span>
          <div class="state-title">All columns hidden</div>
          <div class="state-msg">Use the Columns button to show at least one skill.</div>
        </div>`;
    }

    return html`
      <div class="matrix-wrap">
        <table class="matrix-table">
          <thead>
            <tr>
              <th class="mh-agent">Agent</th>
              <th class="mh-profile">Skill Profile</th>
              ${skillIds.map(id => {
                const count    = skillCounts.get(id) ?? 0;
                const isSorted = this._matrixSortSkill === id;
                const icon     = isSorted ? (this._matrixSortDir === 'desc' ? ' ↓' : ' ↑') : '';
                return html`
                  <th class="mh-skill ${isSorted ? 'mh-sorted' : ''}"
                      @click=${() => this._onMatrixSort(id)}>
                    <div class="mh-skill-name">${this._skillName(id)}${icon}</div>
                    <div class="mh-skill-count">${count} agent${count !== 1 ? 's' : ''}</div>
                  </th>`;
              })}
            </tr>
          </thead>
          <tbody>
            ${agents.map(agent => {
              const skillMap  = agentSkillMaps.get(agent.id) ?? new Map();
              const profileId = agent.skillProfileId;
              return html`
                <tr class="${!profileId ? 'matrix-row-none' : ''}">
                  <td class="mc-agent">
                    <div class="agent-name">${this._agentName(agent)}</div>
                    <div class="agent-email">${agent.email ?? ''}</div>
                  </td>
                  <td class="mc-profile">
                    ${profileId
                      ? html`<span class="profile-badge">✓ ${this._profileName(profileId)}</span>`
                      : html`<span class="profile-badge none">⚠ None</span>`}
                  </td>
                  ${skillIds.map(skillId => html`
                    <td class="mc-skill">
                      ${this._renderMatrixCell(skillMap.get(skillId))}
                    </td>
                  `)}
                </tr>
              `;
            })}
          </tbody>
          <tfoot>
            <tr>
              <td class="mc-agent">Team avg</td>
              <td class="mc-profile"></td>
              ${skillIds.map(id => {
                const { avg, boolCount, agentCount, isBoolean } = skillSummary.get(id);
                if (isBoolean) {
                  return html`<td class="mc-skill">
                    <span class="mx-bool-count">${boolCount}/${agentCount}</span>
                  </td>`;
                }
                if (avg !== null) {
                  const n   = parseFloat(avg);
                  const cls = n >= 7 ? 'high' : n >= 4 ? 'mid' : 'low';
                  return html`<td class="mc-skill">
                    <span class="mx-avg mx-avg-${cls}">${avg}</span>
                  </td>`;
                }
                return html`<td class="mc-skill"><span class="mx-empty">—</span></td>`;
              })}
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="matrix-legend">
        <span style="font-weight:600;color:#374151">Legend:</span>
        <span class="legend-item"><span class="mx-lvl mx-lvl-high" style="width:20px;height:20px;font-size:10px">7+</span> High (7–10)</span>
        <span class="legend-item"><span class="mx-lvl mx-lvl-mid"  style="width:20px;height:20px;font-size:10px">4+</span> Mid (4–6)</span>
        <span class="legend-item"><span class="mx-lvl mx-lvl-low"  style="width:20px;height:20px;font-size:10px">1+</span> Low (1–3)</span>
        <span class="legend-item"><span class="mx-bool" style="width:20px;height:20px;font-size:11px">✓</span> Boolean on</span>
        <span class="legend-item"><span class="mx-empty">—</span> Not in profile</span>
        <span class="legend-item" style="color:#92400E;background:#FFFBEB;padding:2px 6px;border-radius:4px">amber row = no profile assigned</span>
        <div class="spacer"></div>
        <span style="color:#9ca3af;font-size:10px">Click any skill column to sort ↓↑</span>
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

        ${this._viewMode === 'matrix' ? html`
          <button
            class="view-toggle-btn ${this._showColumnsPanel ? 'active' : ''}"
            style="background:#f3f4f6;border:1px solid #DDD6FE;border-radius:6px;padding:4px 11px"
            @click=${() => (this._showColumnsPanel = !this._showColumnsPanel)}
          >⊟ Columns ${this._hiddenSkillIds.size ? html`<span style="color:#7C3AED">(${this._hiddenSkillIds.size} hidden)</span>` : ''}</button>
        ` : ''}
        <div class="view-toggle">
          <button
            class="view-toggle-btn ${this._viewMode === 'table' ? 'active' : ''}"
            @click=${() => (this._viewMode = 'table')}
          >☰ List</button>
          <button
            class="view-toggle-btn ${this._viewMode === 'matrix' ? 'active' : ''}"
            @click=${() => (this._viewMode = 'matrix')}
          >⊞ Matrix</button>
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
    const isSaving    = this._savingAgents.has(agent.id);
    const isSelected  = this._selectedAgents.has(agent.id);
    const profileId   = agent.skillProfileId;
    const profileName = profileId ? this._profileName(profileId) : null;
    const skills      = profileId ? this._profileSkills(profileId) : [];
    const visibleSkills = skills.slice(0, 4);
    const extraCount    = skills.length - visibleSkills.length;

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
          <div class="agent-name">${this._agentName(agent)}</div>
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
          ${visibleSkills.length
            ? html`
                <div class="skill-defs">
                  ${visibleSkills.map(s => {
                    const id = this._skillDefId(s);
                    const { isBoolean, isText, numericValue, textValue } = this._parseSkillEntry(s);
                    return html`
                      <div class="skill-def-row">
                        <span class="skill-def-name">${this._skillName(id)}</span>
                        ${isBoolean
                          ? html`<span class="skill-def-bool">✓</span>`
                          : isText
                            ? html`<span class="skill-def-text">${textValue}</span>`
                            : numericValue != null
                              ? html`<span class="skill-def-lvl">${numericValue}/10</span>`
                              : ''}
                      </div>
                    `;
                  })}
                  ${extraCount > 0
                    ? html`<span class="skill-def-more">+${extraCount} more</span>`
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
    const skills     = profile?.activeSkills ?? profile?.skills ?? [];

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
              <div class="name">${agent ? this._agentName(agent) : '(unknown)'}</div>
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
                          const id = this._skillDefId(s);
                          const { isBoolean, isText, numericValue, textValue } = this._parseSkillEntry(s);
                          const lvl = numericValue ?? 0;
                          return html`
                            <div class="preview-skill">
                              <span class="preview-skill-name">${this._skillName(id)}</span>
                              ${isBoolean
                                ? html`<span style="color:#16a34a;font-weight:700;font-size:12px">✓ Yes</span>`
                                : isText
                                  ? html`<span class="skill-def-text">${textValue}</span>`
                                  : html`
                                    <div class="proficiency-bar-wrap">
                                      <div class="proficiency-bar" style="width:${lvl * 10}%"></div>
                                    </div>
                                    <span class="proficiency-label">${lvl}/10</span>
                                  `}
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
                      const id = this._skillDefId(s);
                      const { isBoolean, isText, numericValue } = this._parseSkillEntry(s);
                      if (isBoolean || isText) return '';
                      const current = this._directSkills[id] ?? numericValue ?? 5;
                      return html`
                        <div class="skill-row">
                          <span class="skill-row-name">${this._skillName(id)}</span>
                          <input
                            type="range" min="1" max="10" step="1"
                            .value=${String(current)}
                            @input=${(e) => this._onSkillSlider(id, e.target.value)}
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
