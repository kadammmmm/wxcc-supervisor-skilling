!function(){"use strict";
/**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new o(i,t,s)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,g=globalThis,f=g.trustedTypes,u=f?f.emptyScript:"",_=g.reactiveElementPolyfillSupport,m=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?u:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},x=(t,e)=>!a(t,e),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:x};
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);o?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...c(t),...h(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),o=t.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:b).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const n=o.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const n=this.constructor;if(!1===i&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??x)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[m("elementProperties")]=new Map,k[m("finalized")]=new Map,_?.({ReactiveElement:k}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const v=globalThis,y=t=>t,w=v.trustedTypes,A=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+E,C=`<${P}>`,I=document,T=()=>I.createComment(""),z=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,N="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,O=/>/g,H=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,F=I.createTreeWalker(I,129);function G(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const K=(t,e)=>{const s=t.length-1,i=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=U;for(let e=0;e<s;e++){const s=t[e];let a,l,d=-1,c=0;for(;c<s.length&&(r.lastIndex=c,l=r.exec(s),null!==l);)c=r.lastIndex,r===U?"!--"===l[1]?r=D:void 0!==l[1]?r=O:void 0!==l[2]?(j.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=H):void 0!==l[3]&&(r=H):r===H?">"===l[0]?(r=o??U,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?H:'"'===l[3]?L:R):r===L||r===R?r=H:r===D||r===O?r=U:(r=H,o=void 0);const h=r===H&&t[e+1].startsWith("/>")?" ":"";n+=r===U?s+C:d>=0?(i.push(a),s.slice(0,d)+S+s.slice(d)+E+h):s+E+(-2===d?e:h)}return[G(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Q{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,d]=K(t,e);if(this.el=Q.createElement(l,s),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=F.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=d[n++],s=i.getAttribute(t).split(E),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:s,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?st:Z}),i.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(j.test(i.tagName)){const t=i.textContent.split(E),e=t.length-1;if(e>0){i.textContent=w?w.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],T()),F.nextNode(),a.push({type:2,index:++o});i.append(t[e],T())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(E,t+1));)a.push({type:7,index:o}),t+=E.length-1}o++}}static createElement(t,e){const s=I.createElement("template");return s.innerHTML=t,s}}function J(t,e,s=t,i){if(e===W)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const n=z(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=J(t,o._$AS(t,e.values),o,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??I).importNode(e,!0);F.currentNode=i;let o=F.nextNode(),n=0,r=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Y(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new it(o,this,t)),this._$AV.push(e),a=s[++r]}n!==a?.index&&(o=F.nextNode(),n++)}return F.currentNode=I,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),z(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Q.createElement(G(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Q(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new Y(this.O(T()),this.O(T()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=y(t).nextSibling;y(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=J(this,t,e,0),n=!z(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const i=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=J(this,i[s+r],e,r),a===W&&(a=this._$AH[r]),n||=!z(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class et extends Z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends Z{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??q)===W)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const ot=v.litHtmlPolyfillSupport;ot?.(Q,Y),(v.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */class rt extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new Y(e.insertBefore(T(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}rt._$litElement$=!0,rt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:rt});const at=nt.litElementPolyfillSupport;at?.({LitElement:rt}),(nt.litElementVersions??=[]).push("4.2.2");class lt extends rt{static styles=n`
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
  `;static properties={_loading:{state:!0},_loadingMsg:{state:!0},_error:{state:!0},_agents:{state:!0},_teams:{state:!0},_skillProfiles:{state:!0},_skills:{state:!0},_selectedTeam:{state:!0},_searchQuery:{state:!0},_selectedAgents:{state:!0},_showModal:{state:!0},_modalAgent:{state:!0},_modalProfileId:{state:!0},_showDirectEdit:{state:!0},_directSkills:{state:!0},_bulkProfileId:{state:!0},_toasts:{state:!0},_orgId:{state:!0},_token:{state:!0},_savingAgents:{state:!0},_apiBaseUrl:{state:!0}};constructor(){super(),this._loading=!1,this._loadingMsg="",this._error=null,this._agents=[],this._teams=[],this._skillProfiles=[],this._skills=[],this._selectedTeam="__all__",this._searchQuery="",this._selectedAgents=new Set,this._showModal=!1,this._modalAgent=null,this._modalProfileId="",this._showDirectEdit=!1,this._directSkills={},this._bulkProfileId="",this._toasts=[],this._orgId=null,this._token=null,this._savingAgents=new Set,this._apiBaseUrl="https://api.wxcc-us1.cisco.com",this._sdkLogger=null,this._toastTimer=null}connectedCallback(){super.connectedCallback(),this._initSDK()}_waitForDesktop(t=1e4){return window.Desktop?Promise.resolve(window.Desktop):new Promise(e=>{const s=Date.now(),i=setInterval(()=>{window.Desktop?(clearInterval(i),e(window.Desktop)):Date.now()-s>=t&&(clearInterval(i),e(null))},100)})}async _initSDK(){this._loading=!0,this._loadingMsg="Connecting to Webex Contact Center…",this._error=null;try{const t=await this._waitForDesktop();if(!t)throw new Error("window.Desktop not found after 10 s. Ensure this widget is loaded inside Webex Contact Center Supervisor Desktop.");this._sdk=t,this._sdkLogger=t.logger?.createLogger("supervisor-skilling-widget");const e=await t.config.init({widgetName:"supervisor-skilling-widget",widgetProvider:"custom"});console.log("[skilling] init() →",e),console.log("[skilling] sdk.config →",t.config),console.log("[skilling] sdk.userInfo →",t.userInfo);try{console.log("[skilling] sdk keys →",Object.keys(t))}catch(t){}if(this._orgId=this._resolveOrgId(t,e),this._token=await this._resolveToken(t,e),console.log("[skilling] orgId →",this._orgId),console.log("[skilling] token →",this._token?this._token.slice(0,30)+"…":"null"),!this._orgId)throw new Error('Cannot determine org ID. Check DevTools console for "[skilling]" entries and share with your developer.');if(!this._token)throw new Error('Cannot retrieve access token. Check DevTools console for "[skilling]" entries and share with your developer.');await this._fetchAll()}catch(t){this._error=t.message,console.error("[supervisor-skilling]",t)}finally{this._loading=!1}}_resolveOrgId(t,e){const s=[e?.orgId,e?.data?.orgId,e?.config?.orgId,t.config?.orgId,t.config?.data?.orgId,t.userInfo?.orgId,t.userInfo?.organizationId,t.userInfo?.data?.orgId,this._orgIdFromUrl()];for(const t of s)if(t&&"string"==typeof t&&"null"!==t&&"undefined"!==t)return t;return console.warn("[skilling] orgId candidates (all null):",s),null}_orgIdFromUrl(){const t=window.location.href.match(/\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\//i);return t?t[1]:null}async _resolveToken(t,e){const s=e?.token||e?.accessToken||e?.access_token||e?.data?.token||e?.data?.accessToken;if(s)return console.log("[skilling] token: init response"),s;if("function"==typeof t.config?.getToken)try{const e=await t.config.getToken();if(e)return console.log("[skilling] token: sdk.config.getToken()"),"string"==typeof e?e:e.access_token||e.token}catch(t){console.warn("[skilling] getToken() threw:",t)}for(const e of[t.config?.token,t.config?.accessToken,t.userInfo?.token,t.userInfo?.accessToken,t.userInfo?.access_token])if(e&&"string"==typeof e&&"null"!==e)return console.log("[skilling] token: direct sdk property"),e;const i=["access_token","accessToken","wxcc_token","id_token","token","bearerToken"];for(const t of[localStorage,sessionStorage])for(const e of i)try{const s=t.getItem(e);if(s&&"null"!==s&&"undefined"!==s)return console.log("[skilling] token: storage key =",e),s}catch(t){}return console.warn("[skilling] token: exhausted all sources"),null}async _apiGet(t,e={}){const s=new URL(`${this._apiBaseUrl}${t}`);Object.entries(e).forEach(([t,e])=>s.searchParams.set(t,String(e)));const i=await fetch(s.toString(),{headers:{Authorization:`Bearer ${this._token}`,Accept:"application/json"}});if(!i.ok){const e=await i.text().catch(()=>i.statusText);throw new Error(`GET ${t} → ${i.status}: ${e}`)}return i.json()}async _apiPut(t,e){const s=await fetch(`${this._apiBaseUrl}${t}`,{method:"PUT",headers:{Authorization:`Bearer ${this._token}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)});if(!s.ok){const e=await s.text().catch(()=>s.statusText);throw new Error(`PUT ${t} → ${s.status}: ${e}`)}return s.json()}async _fetchPages(t,e={}){const s=[];let i=1;for(;;){const o=await this._apiGet(t,{...e,page:i,pageSize:100}),n=Array.isArray(o)?o:o.data??o.records??[];if(!n.length)break;s.push(...n);const r=o.meta?.totalCount??o.totalCount??o.total??null;if(null===r||s.length>=r)break;i++}return s}async _fetchAll(){this._loading=!0,this._loadingMsg="Loading teams and skill profiles…";try{await Promise.all([this._fetchTeams(),this._fetchSkillProfiles(),this._fetchSkills()]),this._loadingMsg="Loading agents…",await this._fetchAgents(),this._toast("Data loaded successfully","success")}catch(t){this._error=t.message,console.error("[supervisor-skilling]",t)}finally{this._loading=!1}}async _fetchTeams(){const t=await this._fetchPages(`/organization/${this._orgId}/team`);this._teams=t.sort((t,e)=>(t.name??"").localeCompare(e.name??""))}async _fetchSkillProfiles(){const t=await this._fetchPages(`/organization/${this._orgId}/skill-profile`);this._skillProfiles=t.sort((t,e)=>(t.name??"").localeCompare(e.name??""))}async _fetchSkills(){const t=await this._fetchPages(`/organization/${this._orgId}/skill`);this._skills=t}async _fetchAgents(){const t=await this._fetchPages(`/organization/${this._orgId}/agent`);this._agents=t.filter(t=>!t.agentType||"AGENT"===t.agentType||"AGENT"===t.type).sort((t,e)=>(t.name??t.email??"").localeCompare(e.name??e.email??""))}async _updateAgent(t,e,s=null){this._savingAgents=new Set([...this._savingAgents,t]);try{const i=await this._apiGet(`/organization/${this._orgId}/agent/${t}`),o=i.data??i,n={...o,skillProfileId:e||null};s&&(n.skillProfile={...o.skillProfile,skills:s});const r=await this._apiPut(`/organization/${this._orgId}/agent/${t}`,n),a=r.data??r;this._agents=this._agents.map(s=>s.id===t?{...s,skillProfileId:a.skillProfileId??e}:s)}finally{const e=new Set(this._savingAgents);e.delete(t),this._savingAgents=e}}async _bulkUpdate(){if(!this._bulkProfileId||!this._selectedAgents.size)return;const t=[...this._selectedAgents],e=this._profileName(this._bulkProfileId);let s=0,i=0;for(const e of t)try{await this._updateAgent(e,this._bulkProfileId),s++}catch(t){i++,console.error("[supervisor-skilling] bulk update error for",e,t)}0===i?this._toast(`${s} agent(s) updated to "${e}"`,"success"):this._toast(`${s} succeeded, ${i} failed — check console`,"error"),this._selectedAgents=new Set,this._bulkProfileId=""}_openModal(t){this._modalAgent=t,this._modalProfileId=t.skillProfileId??"",this._showDirectEdit=!1,this._directSkills=this._defaultDirectSkills(t.skillProfileId),this._showModal=!0}_closeModal(){this._showModal=!1,this._modalAgent=null,this._showDirectEdit=!1}_defaultDirectSkills(t){const e=this._skillProfiles.find(e=>e.id===t);if(!e?.skills)return{};const s={};for(const t of e.skills)s[t.skillId]=t.competencyLevel??t.proficiency??5;return s}async _saveModal(){const t=this._modalAgent;if(!t)return;const e=this._modalProfileId,s=this._showDirectEdit?Object.entries(this._directSkills).map(([t,e])=>({skillId:t,competencyLevel:Number(e)})):null;try{await this._updateAgent(t.id,e,s);const i=e?this._profileName(e):"None";this._toast(`${t.name??t.email}: profile updated to "${i}"`,"success"),this._closeModal()}catch(t){this._toast(`Update failed: ${t.message}`,"error")}}_toast(t,e="info"){const s=Date.now();this._toasts=[...this._toasts,{id:s,msg:t,type:e}],setTimeout(()=>{this._toasts=this._toasts.filter(t=>t.id!==s)},4e3)}get _filteredAgents(){const t=this._searchQuery.toLowerCase().trim(),e=this._selectedTeam;return this._agents.filter(s=>{const i="__all__"===e||s.teamId===e||Array.isArray(s.teamIds)&&s.teamIds.includes(e),o=!t||(s.name??"").toLowerCase().includes(t)||(s.email??"").toLowerCase().includes(t);return i&&o})}_teamName(t){return this._teams.find(e=>e.id===t)?.name??t??"—"}_profileName(t){return this._skillProfiles.find(e=>e.id===t)?.name??t??"—"}_profileSkills(t){return this._skillProfiles.find(e=>e.id===t)?.skills??[]}_skillName(t){return this._skills.find(e=>e.id===t)?.name??t??"—"}_agentTeamName(t){const e=t.teamId??(Array.isArray(t.teamIds)?t.teamIds[0]:null);return e?this._teamName(e):"—"}_onTeamChange(t){this._selectedTeam=t.target.value}_onSearch(t){this._searchQuery=t.target.value}_onSelectAgent(t,e){const s=new Set(this._selectedAgents);e?s.add(t):s.delete(t),this._selectedAgents=s}_onSelectAll(t){this._selectedAgents=t?new Set(this._filteredAgents.map(t=>t.id)):new Set}_onSkillSlider(t,e){this._directSkills={...this._directSkills,[t]:Number(e)}}render(){return B`
      <div class="app">
        ${this._renderHeader()}
        ${this._loading?this._renderLoading():this._error?this._renderError():this._renderMain()}
        ${this._renderToasts()}
        ${this._showModal?this._renderModal():""}
      </div>
    `}_renderHeader(){const t=this._filteredAgents.length,e=this._selectedAgents.size;return B`
      <div class="header">
        <span class="header-icon">🎯</span>
        <div style="flex:1">
          <div class="header-title">Supervisor Skilling Tool</div>
          <div class="header-subtitle">Manage agent skill profiles in real-time</div>
        </div>
        ${e?B`<span class="stats-pill">${e} selected</span>`:""}
        <span class="stats-pill">${t} agent${1!==t?"s":""}</span>
        <button
          class="refresh-btn"
          ?disabled=${this._loading}
          @click=${()=>this._fetchAll()}
        >
          <span>${this._loading?"⏳":"🔄"}</span> Refresh
        </button>
      </div>
    `}_renderLoading(){return B`
      <div class="state-container">
        <span class="state-icon">⏳</span>
        <div class="state-title">Loading…</div>
        <div class="state-msg">${this._loadingMsg}</div>
        <div class="progress-bar-wrap"><div class="progress-bar"></div></div>
      </div>
    `}_renderError(){return B`
      <div class="state-container">
        <span class="state-icon">⚠️</span>
        <div class="state-title">Something went wrong</div>
        <div class="state-msg">${this._error}</div>
        <button class="btn btn-primary" @click=${()=>this._initSDK()}>Retry</button>
        <div style="font-size:11px;color:#9ca3af;margin-top:6px">
          Check browser console for details. Make sure the widget is running inside
          Webex Contact Center Supervisor Desktop.
        </div>
      </div>
    `}_renderMain(){const t=this._filteredAgents,e=t.length>0&&t.every(t=>this._selectedAgents.has(t.id)),s=this._selectedAgents.size>0;return B`
      ${this._renderControls()}
      ${s?this._renderBulkBar():""}
      <div class="table-container">
        ${0===t.length?B`
              <div class="state-container">
                <span class="state-icon">🔍</span>
                <div class="state-title">No agents found</div>
                <div class="state-msg">Try adjusting the team filter or search query.</div>
              </div>`:B`
              <table>
                <thead>
                  <tr>
                    <th class="col-check">
                      <input
                        type="checkbox"
                        .checked=${e}
                        @change=${t=>this._onSelectAll(t.target.checked)}
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
                  ${t.map(t=>this._renderRow(t))}
                </tbody>
              </table>`}
      </div>
    `}_renderControls(){return B`
      <div class="controls">
        <div class="control-group">
          <label class="ctrl-label">Team</label>
          <select @change=${this._onTeamChange} .value=${this._selectedTeam}>
            <option value="__all__">All Teams (${this._agents.length})</option>
            ${this._teams.map(t=>B`
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
    `}_renderBulkBar(){const t=this._selectedAgents.size;return B`
      <div class="bulk-bar">
        <span class="selected-count">${t} agent${1!==t?"s":""} selected</span>
        <span>—</span>
        <select
          .value=${this._bulkProfileId}
          @change=${t=>this._bulkProfileId=t.target.value}
        >
          <option value="">Choose a skill profile to assign…</option>
          <option value="__none__">— Remove skill profile —</option>
          ${this._skillProfiles.map(t=>B`
            <option value=${t.id}>${t.name}</option>
          `)}
        </select>
        <button
          class="btn btn-primary btn-sm"
          ?disabled=${!this._bulkProfileId}
          @click=${()=>this._bulkUpdate()}
        >
          Apply to ${t}
        </button>
        <button class="btn btn-ghost btn-sm" @click=${()=>this._selectedAgents=new Set}>
          Clear selection
        </button>
      </div>
    `}_renderRow(t){const e=this._savingAgents.has(t.id),s=this._selectedAgents.has(t.id),i=t.skillProfileId,o=i?this._profileName(i):null,n=i?this._profileSkills(i):[],r=n.slice(0,3);return B`
      <tr class="${s?"selected":""} ${e?"saving":""}">
        <td>
          <input
            type="checkbox"
            .checked=${s}
            ?disabled=${e}
            @change=${e=>this._onSelectAgent(t.id,e.target.checked)}
          />
        </td>
        <td>
          <div class="agent-name">${t.name??"(no name)"}</div>
          <div class="agent-email">${t.email??""}</div>
        </td>
        <td>
          <span class="team-badge">${this._agentTeamName(t)}</span>
        </td>
        <td>
          ${i?B`<span class="profile-badge">✓ ${o}</span>`:B`<span class="profile-badge none">⚠ None assigned</span>`}
        </td>
        <td>
          ${r.length?B`
                <div class="skill-pills">
                  ${r.map(t=>B`
                    <span class="skill-pill">
                      ${this._skillName(t.skillId)}
                      <span class="lvl"> ${t.competencyLevel??t.proficiency??"?"}</span>
                    </span>
                  `)}
                  ${n.length>3?B`<span class="skill-pill">+${n.length-3} more</span>`:""}
                </div>`:B`<span class="skills-count" style="color:#d1d5db">—</span>`}
        </td>
        <td>
          <div class="action-btns">
            ${e?B`<span class="saving-spinner"></span>`:B`
                  <button
                    class="icon-btn edit"
                    title="Edit skill profile"
                    @click=${()=>this._openModal(t)}
                  >✏️</button>`}
          </div>
        </td>
      </tr>
    `}_renderModal(){const t=this._modalAgent,e=this._modalProfileId,s=this._skillProfiles.find(t=>t.id===e),i=this._savingAgents.has(t?.id),o=s?.skills??[];return B`
      <div class="modal-backdrop" @click=${t=>{t.target===t.currentTarget&&this._closeModal()}}>
        <div class="modal">
          <div class="modal-header">
            <span>✏️</span>
            <span class="modal-header-title">Edit Skill Profile</span>
            <button class="modal-close" @click=${this._closeModal}>✕</button>
          </div>

          <div class="modal-body">
            <!-- Agent info card -->
            <div class="agent-card">
              <div class="name">${t?.name??t?.email??"(unknown)"}</div>
              <div class="meta">${t?.email??""} &nbsp;|&nbsp; ${this._agentTeamName(t??{})}</div>
              <div class="current-profile">
                <span style="color:#6b7280;font-size:11px">Current profile:</span>
                ${t?.skillProfileId?B`<span class="profile-badge">✓ ${this._profileName(t.skillProfileId)}</span>`:B`<span class="profile-badge none">⚠ None</span>`}
              </div>
            </div>

            <!-- Profile selector -->
            <div class="form-group">
              <label class="form-label">Assign Skill Profile</label>
              <select
                class="form-select"
                .value=${e}
                @change=${t=>{this._modalProfileId=t.target.value,this._directSkills=this._defaultDirectSkills(t.target.value),this._showDirectEdit=!1}}
              >
                <option value="">— No skill profile —</option>
                ${this._skillProfiles.map(t=>B`
                  <option value=${t.id} ?selected=${t.id===e}>${t.name}</option>
                `)}
              </select>
            </div>

            <!-- Profile skill preview -->
            ${s?B`
              <div class="profile-preview">
                <div class="preview-header">Skills in "${s.name}"</div>
                ${o.length?B`
                      <div class="preview-skills">
                        ${o.map(t=>{const e=t.competencyLevel??t.proficiency??0;return B`
                            <div class="preview-skill">
                              <span class="preview-skill-name">${this._skillName(t.skillId)}</span>
                              <div class="proficiency-bar-wrap">
                                <div class="proficiency-bar" style="width:${10*e}%"></div>
                              </div>
                              <span class="proficiency-label">${e}/10</span>
                            </div>
                          `})}
                      </div>`:B`<div class="preview-empty">No skills defined in this profile.</div>`}
              </div>`:""}

            <!-- Direct skill override toggle -->
            ${s&&o.length?B`
              <div class="direct-skills-section">
                <button
                  class="direct-skills-toggle"
                  @click=${()=>this._showDirectEdit=!this._showDirectEdit}
                >
                  ${this._showDirectEdit?"▲ Hide":"▼ Customize"} individual skill levels
                </button>

                ${this._showDirectEdit?B`
                  <div style="font-size:11px;color:#f59e0b;margin:6px 0;padding:6px 10px;background:#fffbeb;border-radius:5px;border:1px solid #fde68a">
                    ⚠️ Customizing skills will create agent-specific overrides and may not persist
                    if the org's API restricts direct skill assignments.
                  </div>
                  <div class="skills-editor">
                    ${o.map(t=>{const e=t.skillId,s=this._directSkills[e]??t.competencyLevel??t.proficiency??5;return B`
                        <div class="skill-row">
                          <span class="skill-row-name">${this._skillName(e)}</span>
                          <input
                            type="range" min="1" max="10" step="1"
                            .value=${String(s)}
                            @input=${t=>this._onSkillSlider(e,t.target.value)}
                          />
                          <span class="lvl-display">${s}</span>
                        </div>
                      `})}
                  </div>`:""}
              </div>`:""}
          </div>

          <div class="modal-footer">
            <button class="btn btn-ghost" @click=${this._closeModal}>Cancel</button>
            <button
              class="btn btn-primary"
              ?disabled=${i}
              @click=${()=>this._saveModal()}
            >
              ${i?B`<span class="saving-spinner" style="width:12px;height:12px"></span> Saving…`:"💾 Save Changes"}
            </button>
          </div>
        </div>
      </div>
    `}_renderToasts(){return B`
      <div class="toast-container">
        ${this._toasts.map(t=>B`
          <div class="toast ${t.type}">
            <span class="toast-icon">${"success"===t.type?"✅":"error"===t.type?"❌":"ℹ️"}</span>
            <span class="toast-msg">${t.msg}</span>
          </div>
        `)}
      </div>
    `}}customElements.define("supervisor-skilling-widget",lt)}();
//# sourceMappingURL=supervisor-skilling.js.map
