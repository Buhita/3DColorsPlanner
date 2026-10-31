//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Me.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Me.preferredIcuAsset=O(Me.config);let e="invariant"==Me.config.globalizationMode;if(!e)if(Me.preferredIcuAsset)Me.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Me.config.globalizationMode||"all"===Me.config.globalizationMode||"sharded"===Me.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Me.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Me.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Me.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!L(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,M=/[a-zA-Z]:[\\/]/;function L(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||M.test(e):U.test(e)}let P,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Me.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Me.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Me.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Me.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Me.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Me.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Me.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Me.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Me.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Me.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Me.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Me.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Me.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Me.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Me.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Me.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Me.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",noCache:!0,useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Me.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Me.allDownloadsQueued.promise;try{return Me.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Me.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;P;)await P.promise;try{++N,N==Me.maxParallelDownloads&&(Me.diagnosticTracing&&b("Throttling further parallel downloads"),P=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Me.config.remoteSources?Me.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Me.diagnosticTracing&&b(`Attempting to download '${t}'`):Me.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Me.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Me.actual_downloaded_assets_count),e):e}finally{if(--N,P&&N==Me.maxParallelDownloads-1){Me.diagnosticTracing&&b("Resuming more parallel downloads");const e=P;P=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Me.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Me.modulesUniqueQuery&&q[t]&&(e+=Me.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Me.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return Me.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Me.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Me.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Me.loadedAssemblies.push(e.name),de++,Me.onDownloadResourceProgress&&Me.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Me.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Me.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Me.locateFile(t),"js-module-library-initializer");Me.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Me.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Me.libraryInitializers)return;const o=[];for(let n=0;n<Me.libraryInitializers.length;n++){const r=Me.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Me.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Me.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Me.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Me.maxParallelDownloads=e.maxParallelDownloads||Me.maxParallelDownloads,Me.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Me.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Me.afterConfigLoaded.promise;let o;try{if(e.configSrc||Me.config&&0!==Object.keys(Me.config).length&&(Me.config.assets||Me.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Me.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Me.locateFile(t);let n=null;void 0!==Me.loadBootResource&&(n=Me.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Me.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Me.config.applicationEnvironment&&(r.applicationEnvironment=Me.config.applicationEnvironment),ve(Me.config,r)}(e)),xe(),await we(null===(t=Me.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Me.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Me.config,Pe),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Me.afterConfigLoaded.promise_control.resolve(Me.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Me.config=e.config=Object.assign(Me.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Me.isChromium||Me.isFirefox)}async function Ae(e){const t=Me.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Me={},Le={},Pe={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Me,runtimeHelpers:Ue,diagnosticHelpers:Le,api:Pe};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Me.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Me.exitCode} ${Me.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Me.exitReason)}function Ke(e){Ze&&Ze(e||Me.exitReason),Xe(1,e||Me.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Me.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Me.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Me.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Me.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Me.allDownloadsQueued.promise_control.reject(e),Me.allDownloadsFinished.promise_control.reject(e),Me.afterConfigLoaded.promise_control.reject(e),Me.wasmCompilePromise.promise_control.reject(e),Me.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Me.config&&(Me.config.logExitCode?Me.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Me.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Me.config&&Me.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Me.exitCode=t,Me.exitReason||(Me.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Me.config&&Me.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Me=e.loaderHelpers,Le=e.diagnosticHelpers,Pe=e.api,Ne=e.internal,Object.assign(Pe,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"30000d883e06c122311a66894579bc12329a09d4",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Me,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Me.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Me.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Me.modulesUniqueQuery=t.substring(o)),Me.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Me.scriptDirectory=(n=Me.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Me.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Me.scriptDirectory).toString():L(e)?e:Me.scriptDirectory+e,Me.fetch_like=k,Me.out=console.log,Me.err=console.error,Me.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Me.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Me.isChromium=e.userAgent.includes("Chrome"),Me.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Me.diagnosticTracing&&b("mono config already received"):(ve(Me.config,n),Ue.monoThreadInfo=r,xe(),Me.diagnosticTracing&&b("mono config received"),st=!0,Me.afterConfigLoaded.promise_control.resolve(Me.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Me.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Me.afterConfigLoaded.promise,function(){const e=Me.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Me.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Me.wasmCompilePromise.promise_control.resolve(n)}catch(e){Me.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Me.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Pe}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Me.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Me.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Me.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Me.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Me.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Me.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "3DColorsPlanner",
  "applicationEnvironment": "Development",
  "resources": {
    "hash": "sha256-vzwpraKRDu/d5PVNPyoQGBMTSZb1mSIxBqRg0uCmqqA=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.9g24l9wfhg.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.ph7fh99gkp.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.4tp9n7nyjh.wasm",
        "integrity": "sha256-GDJbz0ZAhRfKfbRjNC7ztCsT61zf9L4F2/wsgnmXlSI="
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "integrity": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk="
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "integrity": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc="
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "integrity": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs="
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.3grizk1f4c.wasm",
        "integrity": "sha256-jQGUr4Qfh4XXW5IRqXIkP7dUwezQfRejIe9JsgKaCIg="
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.jjffrp67e2.wasm",
        "integrity": "sha256-bxt9RcmBQrtJX6WiSKMSlHn8Hv+ytNBgNSUVaKnWgEE="
      }
    ],
    "assembly": [
      {
        "virtualPath": "Microsoft.AspNetCore.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Authorization.oeqod8afhg.wasm",
        "integrity": "sha256-ULdOpc0jCyajNRC6+c9n2Z0OAIqzGUJQm5J0PvXK9Ao="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.jiaynq97oc.wasm",
        "integrity": "sha256-u9jdNise3yd6tf42YP/UkMOa4Jj7Y2Y9jAJzCfy0ScQ="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.d7haepftqm.wasm",
        "integrity": "sha256-Z4jWEhHaFHjMAfXkmqbCSao2pkW8Z8Il2fboIzwl7pE="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.1ctyvdaona.wasm",
        "integrity": "sha256-ATzpjWV7Jig78kdHRXGrXfAZZWiuK4w72L9LRqLzwfY="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.wodvnjr03x.wasm",
        "integrity": "sha256-8FU0mJcFhLrNoV3r0TvXiBDcqHH6tvZwq//TErA0Qlk="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Metadata.wasm",
        "name": "Microsoft.AspNetCore.Metadata.3zddrbf7z6.wasm",
        "integrity": "sha256-/z4jwcZqHzMjJtsgYtnS5q9BKyhCPFb3tkuJldL4zPQ="
      },
      {
        "virtualPath": "Microsoft.DotNet.HotReload.WebAssembly.Browser.wasm",
        "name": "Microsoft.DotNet.HotReload.WebAssembly.Browser.cqe3679ewp.wasm",
        "integrity": "sha256-VL+5AsN/f7F/ViijayrqGItEBxBibI8K6r4QuIa4lAE="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.9yh8ym0zvp.wasm",
        "integrity": "sha256-H7lSVgObqv34AYb7XH1RjFKvJ4vtnUDXLkBw50ugAUE="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.ysme4eoriv.wasm",
        "integrity": "sha256-DtkxEKe6QbSTl2Xi8sJq1fmID5wgCwWyH/QoCs4Rrs0="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.cvbcqewerh.wasm",
        "integrity": "sha256-6Ga/VKMBq/bp7aQ2FuD1sKiaexDePEj/TFkK71U0hlk="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.FileExtensions.wasm",
        "name": "Microsoft.Extensions.Configuration.FileExtensions.bkofsnazjt.wasm",
        "integrity": "sha256-G+Id0WHjXpAyqzQABz+zMgV1mmyhAO8duP8Sf3idDYk="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.4mn4w1iov4.wasm",
        "integrity": "sha256-jDT27e5Ng0QPiZDqZxKGiCRMDYceNeLmi2FeM+bKFIQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.25iw8fhdc1.wasm",
        "integrity": "sha256-KuiCZFBLCZud4EWJDWLu3py0zcqDB6zyFOQOQNI8zTA="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.v70c9s4zt2.wasm",
        "integrity": "sha256-5dpyQ7kxTubzES1YsD5DgtyV9/y/hLHEAcdrj2Y/wDU="
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.wasm",
        "name": "Microsoft.Extensions.Diagnostics.refdoc5eqj.wasm",
        "integrity": "sha256-QyfJP1q9yIEeBDLve8fwx+mabQJCQYIG7oc+cuPB8gw="
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.Abstractions.wasm",
        "name": "Microsoft.Extensions.Diagnostics.Abstractions.wy7k5d06m2.wasm",
        "integrity": "sha256-WF58sFsfs0w3x/8nuhZUlwaVQc9NjNg+v6w6C2OoefY="
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Abstractions.wasm",
        "name": "Microsoft.Extensions.FileProviders.Abstractions.vboesacfh3.wasm",
        "integrity": "sha256-q/ZJPZbGJjg328XMzq1063z+pon80Pn2XBQHFBYqTOw="
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Physical.wasm",
        "name": "Microsoft.Extensions.FileProviders.Physical.b067xq9gr2.wasm",
        "integrity": "sha256-KxOWG2ELQcUySRqJnUcDhCMSCz83ySheuH3RMNVx2Zk="
      },
      {
        "virtualPath": "Microsoft.Extensions.FileSystemGlobbing.wasm",
        "name": "Microsoft.Extensions.FileSystemGlobbing.aahq4y40fw.wasm",
        "integrity": "sha256-AmY+Qwsz7/5WUtMXpksrjARbpTtGUECQaRMikPrQN/o="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.z870ut2tqu.wasm",
        "integrity": "sha256-s/ay+wzQ8ytMryRPF6lBR6pGuLS+nYK165zMicYDBWw="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.mhqtclmawf.wasm",
        "integrity": "sha256-pvRhJR/T0ZSl2f4FUWQwW69wQCl/4h6BOMB7T0aU8IQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.pz2prf469j.wasm",
        "integrity": "sha256-ZTLsfRqJPH9FnxWDwNP30cYJ0RrbEQ9/U6yOnEPNnfU="
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.ConfigurationExtensions.wasm",
        "name": "Microsoft.Extensions.Options.ConfigurationExtensions.1g0xcvdu33.wasm",
        "integrity": "sha256-gTjTYNfJNoIronBQr9uPHGtCEQ6iJqOsUtFXdCWEWUU="
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.dk3kgvcw99.wasm",
        "integrity": "sha256-8wRk263QeD/Ze6hxz+0Wq0lDOOtzdmDyXzYKoWhMYE8="
      },
      {
        "virtualPath": "Microsoft.Extensions.Validation.wasm",
        "name": "Microsoft.Extensions.Validation.0buu56fm14.wasm",
        "integrity": "sha256-7GEihoz0JJFoHQZHTM0pe+bop3gITFW3z28LhCxwFX8="
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.r4r6qk2dw1.wasm",
        "integrity": "sha256-21hvucvGYEBvGb5yPID5maLxLgrqytgfTDHmdfk51pc="
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.ktwcwt6yk1.wasm",
        "integrity": "sha256-2Dr3C/9l1UamOvQ4VHNNfxnV1MqXmAiQ28IYg54Gkn0="
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.tife6x78c7.wasm",
        "integrity": "sha256-FaDWxc3+LBZ5szBJFKMjkICTE3osIeLaNn4/oZq+pUY="
      },
      {
        "virtualPath": "Microsoft.VisualBasic.Core.wasm",
        "name": "Microsoft.VisualBasic.Core.5dtvcq5kvx.wasm",
        "integrity": "sha256-aSrKt/ZPx0AiOzzPGk2nQpj3psWc4HRHMz0EqqsN9Iw="
      },
      {
        "virtualPath": "Microsoft.VisualBasic.wasm",
        "name": "Microsoft.VisualBasic.z245dvxxvn.wasm",
        "integrity": "sha256-6/wck1Th2DYwikkAAAgYSFt3uan/P7y83WHuu7/4+Xk="
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.0w7vac67tm.wasm",
        "integrity": "sha256-sFOJfeDa8ZoK1FYOXRxeG6mdu1+oHKv+c5vOvB07qC0="
      },
      {
        "virtualPath": "Microsoft.Win32.Registry.wasm",
        "name": "Microsoft.Win32.Registry.uz0wxn7do9.wasm",
        "integrity": "sha256-CvpXc6/1E0EMxiBmPDolQvs6E1nJTxXpk4+6vXNyh+k="
      },
      {
        "virtualPath": "System.AppContext.wasm",
        "name": "System.AppContext.zvkrfy0ldp.wasm",
        "integrity": "sha256-fxlaHjTYgYNFHLvq/eMDba72CTqhrfgA1EZYUEg/yco="
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.crm5trqo2v.wasm",
        "integrity": "sha256-iNTJFsIYEriiqUeStNjIPFcgo4NO9YQvzlRHPBzbcHg="
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.yjzh4pi887.wasm",
        "integrity": "sha256-womtTlhOdVHvNcgZ0U7Wp6Mzjg8YtUf51hwUZayXWeY="
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.g9n1p9zfdg.wasm",
        "integrity": "sha256-/GbMsdkUEwnj2GWEnoU0FeKWCw4OuD9bYbZ8+HxbvbY="
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.w72k348vhf.wasm",
        "integrity": "sha256-xAR7rhmb0wj/vtet5CD7TaIOlRXQR4r/67wBKEe2F/A="
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.eabc7v9g6v.wasm",
        "integrity": "sha256-2miMldVwphSklCYHcyRdNEnb5FlejZHCZuV3n5aMOmg="
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.bawe4suh01.wasm",
        "integrity": "sha256-DdGaHEFmIxyLJm8FRQYVrd1e/Vfv93pI9kwcSrTCzTk="
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.v4ujzfeb75.wasm",
        "integrity": "sha256-T16ZcRbprD5X99Qfdcgxnqvq2fVX2UHhocpyCe7Gfe8="
      },
      {
        "virtualPath": "System.ComponentModel.DataAnnotations.wasm",
        "name": "System.ComponentModel.DataAnnotations.hvv1k69kyq.wasm",
        "integrity": "sha256-Y6xf8SZfdtPWAjtG7b6YtYYVFxcbmMguDpi4IHH/IDU="
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.o9cxblsbfq.wasm",
        "integrity": "sha256-XJu66kNM0fEhfnd0tyQ1fMfTX5Jnokiqy+zVNdr0WdU="
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.39nfkjvuhu.wasm",
        "integrity": "sha256-d1PNPtbjoPVuCDs1iQID2Cri8zikerp5Bg3ulyqqs8c="
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.ueqvcwff4o.wasm",
        "integrity": "sha256-dlNK1NGc/q9a1Z+KMDyYctF9ZkbK0zHVqfRvumHu6c4="
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.9rmqj4dyv4.wasm",
        "integrity": "sha256-tcg7wSIB/8tHv3+eSHZHJVTEeslU3JmsG8ZagjVxbeM="
      },
      {
        "virtualPath": "System.Configuration.wasm",
        "name": "System.Configuration.598aeshriu.wasm",
        "integrity": "sha256-SdZSb5LLA3An6UxeuJfOvDh9pT++RWNxqBIkulyLxxk="
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.48m3ljcnjo.wasm",
        "integrity": "sha256-RHR2mn9pUzsOSqs0dW/jxJY/2HJt3muZek0P3N35KtI="
      },
      {
        "virtualPath": "System.Core.wasm",
        "name": "System.Core.rctam2kzla.wasm",
        "integrity": "sha256-G9ENKao9ipJ0jYCV7xcGGHVydzLwthO8LSUqwtEF0mY="
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.fj3r5snmty.wasm",
        "integrity": "sha256-q0/WSwjrkrc7F96+JuSPYceJ2wdWCtwnozAeFoq5l4s="
      },
      {
        "virtualPath": "System.Data.DataSetExtensions.wasm",
        "name": "System.Data.DataSetExtensions.uf9pwlavwd.wasm",
        "integrity": "sha256-CvB5p1XuEy8/rTF6dC9sM30moKumqnYoXQUPvWSoMtU="
      },
      {
        "virtualPath": "System.Data.wasm",
        "name": "System.Data.uz9fplv6tu.wasm",
        "integrity": "sha256-Wn2Yd0JHRnl9BopYOLajPmSmwOiU7gHFmq8L2w2cx/4="
      },
      {
        "virtualPath": "System.Diagnostics.Contracts.wasm",
        "name": "System.Diagnostics.Contracts.cc9jrqcxx0.wasm",
        "integrity": "sha256-9KYtNMzDlHPp+EDz5ipEEKvckbGCko9ov0xwbo1agu8="
      },
      {
        "virtualPath": "System.Diagnostics.Debug.wasm",
        "name": "System.Diagnostics.Debug.mam4rw3l1r.wasm",
        "integrity": "sha256-IsteXlAGnEXL9R+oMrPUuCayKGN5hv7OCigv5JzJAf8="
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.k7acpuqshn.wasm",
        "integrity": "sha256-sE/85C74O3kduE26NjAVc1Px1DfAhLcPXtKFRZKp1Z4="
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.jkrg5sztq9.wasm",
        "integrity": "sha256-bYvvV/Genq7DGVN+42Hl3R45X/6VkOjHDzPHGMSAQpM="
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.ho0054t0tm.wasm",
        "integrity": "sha256-cYjUa0Uy5QckO2XHoyOwvgtJiIDqarwvZs0Ae11g+ds="
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.gfc4ttvis0.wasm",
        "integrity": "sha256-FKexpUxMV87QdAzAs/c2j+TlKh4njHdgKssCUhPbzU4="
      },
      {
        "virtualPath": "System.Diagnostics.TextWriterTraceListener.wasm",
        "name": "System.Diagnostics.TextWriterTraceListener.pkvx6hq2kx.wasm",
        "integrity": "sha256-GegSr0Is5gA5quJTj4R3wtzKI/iQzbm+PBuzfbMTRgo="
      },
      {
        "virtualPath": "System.Diagnostics.Tools.wasm",
        "name": "System.Diagnostics.Tools.gyqdntcwek.wasm",
        "integrity": "sha256-uJQWLS2jRxkG7j0VCh8XEBhRUuAJgnjmnA9qz0TwtGk="
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.sxel2c0psv.wasm",
        "integrity": "sha256-II/xkIviFO3b6q+N4Jqufwg4aF5MoDIuAmllz4zf8qA="
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.rbw4hl3y2s.wasm",
        "integrity": "sha256-Wa6F8G2YoX68Vy8pG9uUGBEhuv8QxnnQgYm0SPyfWFk="
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.4jl3bbs49a.wasm",
        "integrity": "sha256-QLm+KHdVVnfe5HczsQkFpNkNHYZfbVuQCBobmDIQgy8="
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.itwbiholr4.wasm",
        "integrity": "sha256-Go/13l7QMnn+tdl5nwfm0L6A/1AWNJxBE+wdbyk6eVo="
      },
      {
        "virtualPath": "System.Dynamic.Runtime.wasm",
        "name": "System.Dynamic.Runtime.962k6i9cyo.wasm",
        "integrity": "sha256-/9kzfdhZvGewg7g5uh2Od97y+yiqbHYdTKQ00IwXvTo="
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.73k5e3ogre.wasm",
        "integrity": "sha256-8y5rUjUSjUJPwds+WtgMWVat45i/JNL7CzBbn7f8XdI="
      },
      {
        "virtualPath": "System.Formats.Tar.wasm",
        "name": "System.Formats.Tar.o3wf73s6o8.wasm",
        "integrity": "sha256-ROOR6518YWw5J0AxQK3odUNnReFMg9GS4SM+inpoSpM="
      },
      {
        "virtualPath": "System.Globalization.Calendars.wasm",
        "name": "System.Globalization.Calendars.swtbf5r6ib.wasm",
        "integrity": "sha256-1MA3cD2OR0KLLAwPufmaTuUtYYuNqrzME/W6gsHIxts="
      },
      {
        "virtualPath": "System.Globalization.Extensions.wasm",
        "name": "System.Globalization.Extensions.qwasszep8b.wasm",
        "integrity": "sha256-Ok7BryqTOpsp+AVvTGlq2tn9skRRf/ZLrhMHToBEq+I="
      },
      {
        "virtualPath": "System.Globalization.wasm",
        "name": "System.Globalization.9zcur9lwxu.wasm",
        "integrity": "sha256-NayGzK7V8IZ3O8s0JevSAehJV7pawcHQ/jehQu8jzAU="
      },
      {
        "virtualPath": "System.IO.Compression.Brotli.wasm",
        "name": "System.IO.Compression.Brotli.l850w7znww.wasm",
        "integrity": "sha256-haaFUy3D+8oT9E6Un9n2OCZn9X76cCrLP65PJrBtR3A="
      },
      {
        "virtualPath": "System.IO.Compression.FileSystem.wasm",
        "name": "System.IO.Compression.FileSystem.ty82cip7uf.wasm",
        "integrity": "sha256-GwK1TzpFxE29ckgf7oWZR1E8eb0RPDv/1zl5fPFm0Ww="
      },
      {
        "virtualPath": "System.IO.Compression.ZipFile.wasm",
        "name": "System.IO.Compression.ZipFile.3kuo4u942y.wasm",
        "integrity": "sha256-TQO+oi1AR26JfLJ//5u0ZLd7ubzIUjzDZXVzA3K4izo="
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.0mfaguyo8c.wasm",
        "integrity": "sha256-iNUOZ/F4TwxCnlnM5u7okf8yyT1sXGNj5a85VNLPhb8="
      },
      {
        "virtualPath": "System.IO.FileSystem.AccessControl.wasm",
        "name": "System.IO.FileSystem.AccessControl.z2wvybjjl3.wasm",
        "integrity": "sha256-1e3ej2LkdIqAUHvEV72h+HeCVQksGIMdWF1E/0VLkVM="
      },
      {
        "virtualPath": "System.IO.FileSystem.DriveInfo.wasm",
        "name": "System.IO.FileSystem.DriveInfo.uuqs5q4vte.wasm",
        "integrity": "sha256-9kOEVZ43vhVFou3ShUAgFgCkCRYgnzVgdZ1KBTOvWEw="
      },
      {
        "virtualPath": "System.IO.FileSystem.Primitives.wasm",
        "name": "System.IO.FileSystem.Primitives.q4lof0xap3.wasm",
        "integrity": "sha256-BoBpAc4Hh/KcYcB47/jZeIA9sHgTFR/E7hO8WHVf1aU="
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.mln8xkbv5v.wasm",
        "integrity": "sha256-eir5ym6KjX92dZAThT9SI3ti3Q+gAZqwTLE3VaUnLu0="
      },
      {
        "virtualPath": "System.IO.FileSystem.wasm",
        "name": "System.IO.FileSystem.sfc0mrec4d.wasm",
        "integrity": "sha256-+EDJQ0FObmtIRUKRvalZjISSXP5K7Lixg2RtperYyfI="
      },
      {
        "virtualPath": "System.IO.IsolatedStorage.wasm",
        "name": "System.IO.IsolatedStorage.px0ylwqh1b.wasm",
        "integrity": "sha256-wzHCb8GVEubQOrXBCWq116Rlb4GA8kZbMkrcvctnnMg="
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.ah1tjusf1m.wasm",
        "integrity": "sha256-vld/xoB5eKtQId3Qptmj0R879n72Pd0QcPQ01fKPwfE="
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.uwk2mq0gwr.wasm",
        "integrity": "sha256-XlQaJI9weqQsmZ3rMHam2//Z20gzPwYHEh4TzN8aOW8="
      },
      {
        "virtualPath": "System.IO.Pipes.AccessControl.wasm",
        "name": "System.IO.Pipes.AccessControl.zajjtxactx.wasm",
        "integrity": "sha256-hRY5OD2TqIGEiahJ5rj48zbKO4m+jBGrvDd1wEwuV0g="
      },
      {
        "virtualPath": "System.IO.Pipes.wasm",
        "name": "System.IO.Pipes.eqvk84q5mx.wasm",
        "integrity": "sha256-plWPEyU79zlWv5TzTRUzHYLQVGHknnf/cgGWF87vLQk="
      },
      {
        "virtualPath": "System.IO.UnmanagedMemoryStream.wasm",
        "name": "System.IO.UnmanagedMemoryStream.txtwj62ru1.wasm",
        "integrity": "sha256-b/XA+knOLkS2gLQSCtkvdqpaASm0cFS5XfCI6GBit8k="
      },
      {
        "virtualPath": "System.IO.wasm",
        "name": "System.IO.0xfi5wrhpj.wasm",
        "integrity": "sha256-FLb/8oYYsWwBBClEQ5kQo9JSNco6SxxHxF4PsP8DF9Q="
      },
      {
        "virtualPath": "System.Linq.AsyncEnumerable.wasm",
        "name": "System.Linq.AsyncEnumerable.ljxj714c2y.wasm",
        "integrity": "sha256-b4TiSRWOraD0d7Qw6CRom/TR6j4Tmf4NGNNXklx097I="
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.ffxml9yw87.wasm",
        "integrity": "sha256-RZTJIjzHFvj09LMHPt/p9q4OjT2G0mQ2QAegaMu+RCI="
      },
      {
        "virtualPath": "System.Linq.Parallel.wasm",
        "name": "System.Linq.Parallel.o9jrozbw7o.wasm",
        "integrity": "sha256-TM5j9oLaXPkx4/Vy9EsOaGuOT8qCF1wt6oiNm7JOr0Q="
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.d9w2lcseef.wasm",
        "integrity": "sha256-L8tsMscC7AyCEwXsJEgSu+glBkOTM3gfbs5VlL73Rmw="
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.faoe12k1jq.wasm",
        "integrity": "sha256-iSRwBg0HJt2RNlmClqE9Y6CkSRki7QMHTxl0sUwFpwY="
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.7hffjpafdo.wasm",
        "integrity": "sha256-5ayqlNvMEh7E4J4F24VTSWwURL9OtZopkOuhfwz4lQ0="
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.8tcvtvhok9.wasm",
        "integrity": "sha256-nHu1s9wWfsEmG4BClTZHbHScit4JNxP0yHJoh9y5zBY="
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.64v9y9zdi2.wasm",
        "integrity": "sha256-OmRftlmaVdGao7Ln5d8ItWnFsGCAiX4Zw3AL8WxBGm8="
      },
      {
        "virtualPath": "System.Net.HttpListener.wasm",
        "name": "System.Net.HttpListener.etq5kfunfp.wasm",
        "integrity": "sha256-Aucymbg641l58lJhzM1r5+QdOg0joDRofzOfBZc/MvU="
      },
      {
        "virtualPath": "System.Net.Mail.wasm",
        "name": "System.Net.Mail.y29i8bljok.wasm",
        "integrity": "sha256-ht3doSnG2j3d5Q/InH8BgN9+09ruNZmwY6EU2bwBhxQ="
      },
      {
        "virtualPath": "System.Net.NameResolution.wasm",
        "name": "System.Net.NameResolution.x4vv9381xr.wasm",
        "integrity": "sha256-n/tebyd1vGzaJhxNenfKsiVprw8RnrZwcTFrJ4tUJ8g="
      },
      {
        "virtualPath": "System.Net.NetworkInformation.wasm",
        "name": "System.Net.NetworkInformation.5o3dqcsy6n.wasm",
        "integrity": "sha256-K2JQ+sR/QzPX3jQMEUDTzwk9WGeOEgL4YYkR+DvtZWc="
      },
      {
        "virtualPath": "System.Net.Ping.wasm",
        "name": "System.Net.Ping.rkeuumixh3.wasm",
        "integrity": "sha256-S/uC52QVrdQEW9e+macYyiUz5Fa9r2B0kmaIWT8LrNg="
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.xtuxxnivds.wasm",
        "integrity": "sha256-VXcQNYNM6y4fkgz/xJaGJfupGldiuSrgclrk0BsptL0="
      },
      {
        "virtualPath": "System.Net.Quic.wasm",
        "name": "System.Net.Quic.32mhfa9e5j.wasm",
        "integrity": "sha256-63AHlO7hOHxYqpJjDnaLGarXCZEGhRZH4lyqaQToae8="
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.vuqgqf8z28.wasm",
        "integrity": "sha256-9yEjh+xE8X53aT08R0s3bS8tQayYAevu3JrKaegr7zo="
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.zm2yphj9ud.wasm",
        "integrity": "sha256-205OdTPATNYPrzFo7mMIqNvekwfIP2swTj/loGuqmvs="
      },
      {
        "virtualPath": "System.Net.ServerSentEvents.wasm",
        "name": "System.Net.ServerSentEvents.8dka9jna78.wasm",
        "integrity": "sha256-nEoY7eu+0gQDL3+QemA0aJpahZcLJ/LPO9dOOy3rlns="
      },
      {
        "virtualPath": "System.Net.ServicePoint.wasm",
        "name": "System.Net.ServicePoint.wumxr0hhwg.wasm",
        "integrity": "sha256-CMPhyj/z3UW3A9S6RuaOVCn+7fPMoQoswPWOOJJKPEA="
      },
      {
        "virtualPath": "System.Net.Sockets.wasm",
        "name": "System.Net.Sockets.7u8sihjvt5.wasm",
        "integrity": "sha256-Qb5wchMNhgasqvreONrZRE12OcYzn5g4e3KTnLataVU="
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.xawrlfe8gx.wasm",
        "integrity": "sha256-SY02FpAZAZ06RisUtJCRKyRaWALUJ6tK5mswMr9r1qk="
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.bmp2yfqnzf.wasm",
        "integrity": "sha256-zbO4M8aXX3Kdlq2O0fovthjEuBn6eMMfsvQ5L/VLCEA="
      },
      {
        "virtualPath": "System.Net.WebProxy.wasm",
        "name": "System.Net.WebProxy.auhueq49o6.wasm",
        "integrity": "sha256-LlSicpJz4FrwO/L2WTrUN2TioCCS/dklXEEp4rxaGVI="
      },
      {
        "virtualPath": "System.Net.WebSockets.Client.wasm",
        "name": "System.Net.WebSockets.Client.0bo3by75cm.wasm",
        "integrity": "sha256-zABrgfY/Achz/j9KUvJTi76dfAuZjrE9vQWGeXVMozs="
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.k8rdvnorbf.wasm",
        "integrity": "sha256-3LkF1cuR6+umNyT2F8cJOk3VZSjJ9FTtkLbBL/txCng="
      },
      {
        "virtualPath": "System.Net.wasm",
        "name": "System.Net.2hy6ibvbpz.wasm",
        "integrity": "sha256-BgIsx5JXxVt8Gy54aAcQ7NwjDaW5LaGdxabChe16T5c="
      },
      {
        "virtualPath": "System.Numerics.Vectors.wasm",
        "name": "System.Numerics.Vectors.hzmwy1w8ef.wasm",
        "integrity": "sha256-o70Yo+M7vsbWWkXrD9qDUhGFF6pMWDxH2iJgxDTewWU="
      },
      {
        "virtualPath": "System.Numerics.wasm",
        "name": "System.Numerics.7ej3q783q2.wasm",
        "integrity": "sha256-EWWDZnqK5q3tnLZ9dyOOPGjoqgLxH6Khl1x57KxcVYk="
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.2lx9rs0jf4.wasm",
        "integrity": "sha256-ukJtpI20X+3bAEEF2FkKwEVfdRQ9D/7eGc1SIQBgJuo="
      },
      {
        "virtualPath": "System.Private.DataContractSerialization.wasm",
        "name": "System.Private.DataContractSerialization.zcp5pfufxq.wasm",
        "integrity": "sha256-Xfvof4L6eEuMtMJvK6mHK2cVAtvObKvn2P2kHgRQwyY="
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.a8idezozqz.wasm",
        "integrity": "sha256-dugYC5ckN0np7zrUORP/wC+nV16KqKK6na3uOG+KFkE="
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.j6bd9if5bq.wasm",
        "integrity": "sha256-JSWE6rj5XmbRekiRClgcHkUZUJT4BnvUjPo+H0TJpQs="
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.5eizfqm4bg.wasm",
        "integrity": "sha256-3b4tGXzf51givlP7aOq0oAWrDUxRTfceCgKpA7qeSyY="
      },
      {
        "virtualPath": "System.Reflection.DispatchProxy.wasm",
        "name": "System.Reflection.DispatchProxy.um7osq4yla.wasm",
        "integrity": "sha256-pkARwbeSAKMrRTq+2e5houa2Q646m8qV5STXRveqQMk="
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.biea7zu4x3.wasm",
        "integrity": "sha256-DeXmO0p+Dkij4PqHDAR5eIuulhenM1OnNkXWVsVHR9E="
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.lzp3ob7i0y.wasm",
        "integrity": "sha256-r0U/sAp/z+/MaBG0nCF9N7uQ/uKRkpfenqsEnRfey4I="
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.ssxl7mczw3.wasm",
        "integrity": "sha256-XJ3Qda9fBvgKLIlB26GBpIAj5eHodWNNPvX6Jn0wJGA="
      },
      {
        "virtualPath": "System.Reflection.Extensions.wasm",
        "name": "System.Reflection.Extensions.mqzlo1yq94.wasm",
        "integrity": "sha256-LgQ9Ow6vX+ZPqfY0z8LoBnxFCZQ2Iyu4MBVws9OJyCA="
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.iof8g2lk99.wasm",
        "integrity": "sha256-nlZkz4NNIpzJMgb8boA6DW8+XdC1OnjvSsL1Qh0r94c="
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.mcs69w3kjq.wasm",
        "integrity": "sha256-Bi4Vdm8ZK8kABcEUOdjQiLIaFc50LCfgGne8GvNm33Y="
      },
      {
        "virtualPath": "System.Reflection.TypeExtensions.wasm",
        "name": "System.Reflection.TypeExtensions.zk11gkf3ra.wasm",
        "integrity": "sha256-Q05PFXO6ghFilAp0899P2FR+6NK5Ol+iVMcJj9fs8HA="
      },
      {
        "virtualPath": "System.Reflection.wasm",
        "name": "System.Reflection.tzvwepadk0.wasm",
        "integrity": "sha256-B+QTWOCTNoK/3+HEP33O3WsTtyrEQLhbkJKFOHLu2qw="
      },
      {
        "virtualPath": "System.Resources.Reader.wasm",
        "name": "System.Resources.Reader.o868qiuwoq.wasm",
        "integrity": "sha256-mJOriingQEwKrPcejk+7owwU96z/DtrVTb8iXLjmCKE="
      },
      {
        "virtualPath": "System.Resources.ResourceManager.wasm",
        "name": "System.Resources.ResourceManager.o712uj7sta.wasm",
        "integrity": "sha256-XBOGfoALA++AaT2i20EUThYLqFCTQWFz4mREkUIvG4M="
      },
      {
        "virtualPath": "System.Resources.Writer.wasm",
        "name": "System.Resources.Writer.mxrfgyql06.wasm",
        "integrity": "sha256-1gyWtlvYOPqnVGaExGYyOefz0yVXQ3hviqEx/QrQU38="
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.zzlcqg90ld.wasm",
        "integrity": "sha256-odvxIXj6Y5fzkX+9aBsZkN9sNPo1NXRe1tzOuQS3F7Q="
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.VisualC.wasm",
        "name": "System.Runtime.CompilerServices.VisualC.vqjhn4vn45.wasm",
        "integrity": "sha256-NzUnvdADD3VsAkKYJCj9MHGdmbOXP9bNzjNo0lGtrb8="
      },
      {
        "virtualPath": "System.Runtime.Extensions.wasm",
        "name": "System.Runtime.Extensions.f09oekieyb.wasm",
        "integrity": "sha256-n4HhMjO8ZnZzJSvuQbcEhnQSJNvSwcKkcwZj9QLuZxk="
      },
      {
        "virtualPath": "System.Runtime.Handles.wasm",
        "name": "System.Runtime.Handles.9v8fbvmdfv.wasm",
        "integrity": "sha256-pUGOvHGj6GYeTSspPX3Mb6F0eooYaKcHzLxsHfObwME="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.0odz6l5u69.wasm",
        "integrity": "sha256-EMbMIzuqS9m2tUFOXGvzhkFViU5jdpRrTLDAZMCts/M="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.ic0c9u3hpv.wasm",
        "integrity": "sha256-PiJdzG9zQ/rHjowUtW2iHQARaxmjZZVI0s8mlYFyBXs="
      },
      {
        "virtualPath": "System.Runtime.Intrinsics.wasm",
        "name": "System.Runtime.Intrinsics.p3skeabhfi.wasm",
        "integrity": "sha256-RfF+32/LErl2xgNkN5pcVB8fuUg3J4fbhZLdJEb/uj0="
      },
      {
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.e8jx2uzv0f.wasm",
        "integrity": "sha256-nkm/0MkNpkM+BenvVkMmRzOrKEDsOdUjfSiXOMZfEa4="
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.qe6u9an8b1.wasm",
        "integrity": "sha256-8vxhSUgN6sU3KUWAXJJzXoszncY8BHTJvXU4uVGkBGA="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.8opbgp3t2h.wasm",
        "integrity": "sha256-uNqMtoXw3qd2kdo26LU9Nad1uO+W5I2zF7ZPsPtwZJQ="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Json.wasm",
        "name": "System.Runtime.Serialization.Json.dkhpabpngi.wasm",
        "integrity": "sha256-LcufyF5qYcMPpG8U7q0e+Ws7aUo+M7R2Z1WlCSK1dpE="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.6vgbd5qb5y.wasm",
        "integrity": "sha256-IutL4NZkoBA07z0B9zYHeERsj/BISDHKr2KypKsGg1E="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Xml.wasm",
        "name": "System.Runtime.Serialization.Xml.0k78x233y5.wasm",
        "integrity": "sha256-QNEWrZLq3Ztvikx5lrPdzQ4bIoQ0Z5Yo4gE239NwMz4="
      },
      {
        "virtualPath": "System.Runtime.Serialization.wasm",
        "name": "System.Runtime.Serialization.jqm69fb5wz.wasm",
        "integrity": "sha256-m+2T6kVSIepepl9DEydiVdhRlnNFcCJAw66p3mLmYok="
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.ir22drncky.wasm",
        "integrity": "sha256-fmNfXH9JgOxuRI3me9j7NlyGkzOSi/xbn3HB4zfEqCc="
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.q4nemv0bik.wasm",
        "integrity": "sha256-ZiE5smyDhR+NB/L0+y9MlvrWi6wjdOVJr9T3XUfCPL8="
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.wvyahk1atf.wasm",
        "integrity": "sha256-5B8ZVtrUpciX6AQ5xFtGOyuzO150J9x13ZR3cu6/4xw="
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.df4r18od5l.wasm",
        "integrity": "sha256-KdDtOm3z9tIC/ow+U9NC3YLahIIjXCN+72SvU6YOeYg="
      },
      {
        "virtualPath": "System.Security.Cryptography.Cng.wasm",
        "name": "System.Security.Cryptography.Cng.g48rh8sqk4.wasm",
        "integrity": "sha256-4HKoP/AOfAQZF5LAtRSJXDDxcYII/+94gu/8yERc154="
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.kr0resyo2w.wasm",
        "integrity": "sha256-oBocvBv8dqwht4ELqhJv0S0E0WLECjR+Q0UPkr117jY="
      },
      {
        "virtualPath": "System.Security.Cryptography.Encoding.wasm",
        "name": "System.Security.Cryptography.Encoding.bkb52yi3el.wasm",
        "integrity": "sha256-y7PsewsKGJUDkY994ubgta9gZLtwQVAnBAaDPJxUCu8="
      },
      {
        "virtualPath": "System.Security.Cryptography.OpenSsl.wasm",
        "name": "System.Security.Cryptography.OpenSsl.9th1d70iio.wasm",
        "integrity": "sha256-bTmLzQ2NBzRvELFfkDZZIXOPLu9ef9KA8vAL4wPAQ6c="
      },
      {
        "virtualPath": "System.Security.Cryptography.Primitives.wasm",
        "name": "System.Security.Cryptography.Primitives.0qme573eqm.wasm",
        "integrity": "sha256-iLsbBb/HekFVJwu1mHpfJ426qb0ZN57Moe8vZqD3H4s="
      },
      {
        "virtualPath": "System.Security.Cryptography.X509Certificates.wasm",
        "name": "System.Security.Cryptography.X509Certificates.se8bnaavlc.wasm",
        "integrity": "sha256-rMGa0hXweK2jpalvDIKcfNbdworMDqSfg/Gke2MNPwQ="
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.padd34vkxd.wasm",
        "integrity": "sha256-bxhKtsKFxY+XzLg6dgGMYv2Cp+NxEJwwvEZg6JjaxIc="
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.wcxx7ezmr8.wasm",
        "integrity": "sha256-4MnLQJ5Q3IfftY5ffdiFVstQvaRNNjqqPDIjCl1zjL8="
      },
      {
        "virtualPath": "System.Security.Principal.wasm",
        "name": "System.Security.Principal.jz3vn96vpb.wasm",
        "integrity": "sha256-EX9zYc0r8UH7F/Xy3x9l9wipXnQBzRpzNqNC0c/qD7E="
      },
      {
        "virtualPath": "System.Security.SecureString.wasm",
        "name": "System.Security.SecureString.45l8x0uy0y.wasm",
        "integrity": "sha256-CD5EnhGqzIw7QKOg9mjD5kTZ4hpfqTFrF8VPVwf5fj8="
      },
      {
        "virtualPath": "System.Security.wasm",
        "name": "System.Security.8hblls9n9g.wasm",
        "integrity": "sha256-pF0UEpwJGDavmuBKu3VCPZUf8Y0yuhCvUqWFVXWu+zk="
      },
      {
        "virtualPath": "System.ServiceModel.Web.wasm",
        "name": "System.ServiceModel.Web.l29puj548u.wasm",
        "integrity": "sha256-06uuWpIE/Vfp3KRIRlEZH95ILmwBIApL6FR8BPX5Q/U="
      },
      {
        "virtualPath": "System.ServiceProcess.wasm",
        "name": "System.ServiceProcess.3c6cmjm1os.wasm",
        "integrity": "sha256-7bKnI63zN87zA59eyZCOb7AcLkMViC1EYcjhgfMHYpw="
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.o0zxjsrest.wasm",
        "integrity": "sha256-iELX9U1ZnxpnzDMvsWkFmo1hiuYYqIzq1ADLiG5+6SY="
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.cl1i8t0omg.wasm",
        "integrity": "sha256-kHQapY7qeBMetfzu66ExG5HM6o3I95g10hiKISoJcBI="
      },
      {
        "virtualPath": "System.Text.Encoding.wasm",
        "name": "System.Text.Encoding.9t2wc1rjtl.wasm",
        "integrity": "sha256-PXbLXvnaoVBbjnBCs/G0fzcS3rqY+UsptkB30a/UG0A="
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.9l4fe6tj5g.wasm",
        "integrity": "sha256-AwVGPnQ0o/qH5U/yHZ61BPOR2hbP2nlIEs14lwpA4zY="
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.3y0t2i8kcl.wasm",
        "integrity": "sha256-C/TsRr9dw+5pskqj8xVQdqq3+ZS0OnrsVFtg6Euk6pM="
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.allsq2zpiy.wasm",
        "integrity": "sha256-spE+TFRmw1yezc6uiaXMdXhy4Es5FX1gvzJtmPvFwug="
      },
      {
        "virtualPath": "System.Threading.AccessControl.wasm",
        "name": "System.Threading.AccessControl.dt1778uytj.wasm",
        "integrity": "sha256-DxQhy5TV1s2tkZB2fHCckSJPNcpUF/JWxHrTK/FBUE0="
      },
      {
        "virtualPath": "System.Threading.Channels.wasm",
        "name": "System.Threading.Channels.nnsglilmya.wasm",
        "integrity": "sha256-E4I1pNoSvrQa2ocOeVTtEA/f/PqrYwl9ut9MZEmxoXE="
      },
      {
        "virtualPath": "System.Threading.Overlapped.wasm",
        "name": "System.Threading.Overlapped.zcrfescp2f.wasm",
        "integrity": "sha256-vQkdmogUA3vaQ2zNjzAqF7QDI/9PUJUtsInykOY+eDc="
      },
      {
        "virtualPath": "System.Threading.Tasks.Dataflow.wasm",
        "name": "System.Threading.Tasks.Dataflow.m16h8kqllz.wasm",
        "integrity": "sha256-Jg/OitUZxJqMa6AVjtaOVuS8VHml24eji3f49MVcBYk="
      },
      {
        "virtualPath": "System.Threading.Tasks.Extensions.wasm",
        "name": "System.Threading.Tasks.Extensions.zp6ppio8z3.wasm",
        "integrity": "sha256-R6/85Ww3uyEv4fBlFl51rRG4WuGazmt0l7HXaFdKOio="
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.wasm",
        "name": "System.Threading.Tasks.Parallel.t6dezwyz32.wasm",
        "integrity": "sha256-RZ29U4NYaH5mmmwJGhaVL3g2zAivhrNM9BCiFKUctjk="
      },
      {
        "virtualPath": "System.Threading.Tasks.wasm",
        "name": "System.Threading.Tasks.byu7wxtits.wasm",
        "integrity": "sha256-jdP0f3J51uvISKtfpuN4cww3qL5mL48H5fbRyb8U64o="
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.3k2z3yb5yl.wasm",
        "integrity": "sha256-s5KiRqCGMRI2MYX2RqayD/Jn832ngPP0TGVcOHbw1M0="
      },
      {
        "virtualPath": "System.Threading.ThreadPool.wasm",
        "name": "System.Threading.ThreadPool.489irufhib.wasm",
        "integrity": "sha256-NGJSEejWlwBebdaiC+ZGjwPu2GBwbJCcVrWpUnkZWtE="
      },
      {
        "virtualPath": "System.Threading.Timer.wasm",
        "name": "System.Threading.Timer.ff0uavfwka.wasm",
        "integrity": "sha256-q3MFiKohYP85AOP+YkN5IfirunThBtvj6xBj6VhYL3g="
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.8th9qnthog.wasm",
        "integrity": "sha256-bOikqQ3+24xBeBf9CF9CJ7mz4wfFT8TjxYfR5wc9OXs="
      },
      {
        "virtualPath": "System.Transactions.Local.wasm",
        "name": "System.Transactions.Local.l8b5lfqvqi.wasm",
        "integrity": "sha256-2wYvNfhirnr/bvsRPzjYYloc3Fc+PExfNUV9+KC1Rtw="
      },
      {
        "virtualPath": "System.Transactions.wasm",
        "name": "System.Transactions.ryhkpvzh4d.wasm",
        "integrity": "sha256-DWOtji8kcmnBG5ow+5/HPUffj+y0K2BMk9narogXZy4="
      },
      {
        "virtualPath": "System.ValueTuple.wasm",
        "name": "System.ValueTuple.u4ky76evny.wasm",
        "integrity": "sha256-bnlHyTOIl0xJG0C6wIfwUBSCiC3OVlBp+/wOvcze/FI="
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.ts304f3vv8.wasm",
        "integrity": "sha256-PSOMMPIjUpRIsbSqG+N70rMBGnXhyw4HF1FBIN5Mav4="
      },
      {
        "virtualPath": "System.Web.wasm",
        "name": "System.Web.9zxfqmlmgq.wasm",
        "integrity": "sha256-O2QyICl1yuqrboN52+IkvWfZQ/v52vxEIWTfwuA2/Mg="
      },
      {
        "virtualPath": "System.Windows.wasm",
        "name": "System.Windows.08jsqu4xvx.wasm",
        "integrity": "sha256-sJ0sXZJRvnfkqapBpx9wFEe+qMAT7z5iHM5XaUQCUEk="
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.ui82u0i393.wasm",
        "integrity": "sha256-plXhgoRYj18ZNzocyastBJFtp4H7z4Mq4YZuRkcwFjk="
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.w61tmlkhb5.wasm",
        "integrity": "sha256-SHX2Yrp9yfwfDk6SZHfaRQV2KHtEO5azxSbtwVItP5E="
      },
      {
        "virtualPath": "System.Xml.Serialization.wasm",
        "name": "System.Xml.Serialization.wja753lzlk.wasm",
        "integrity": "sha256-LFIJrCgBrY4jCTOhgOKReiF8SwA3yCOr0e2ZpbxG8SE="
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.mw1j59g7er.wasm",
        "integrity": "sha256-msbz864lPMKko/depKFAzxb778NlvvBqHYzopo9EsrA="
      },
      {
        "virtualPath": "System.Xml.XPath.XDocument.wasm",
        "name": "System.Xml.XPath.XDocument.27wx8yyjjb.wasm",
        "integrity": "sha256-wi4DBR7pZOOFcFqOEsQ/F/dqiHhMxisscV5fHwuPgIk="
      },
      {
        "virtualPath": "System.Xml.XPath.wasm",
        "name": "System.Xml.XPath.1pwav5hw3q.wasm",
        "integrity": "sha256-BYcK2FFL49p4ybUUCj6HEF8AXyo/P3HpPhohha5ksfQ="
      },
      {
        "virtualPath": "System.Xml.XmlDocument.wasm",
        "name": "System.Xml.XmlDocument.25h3ar7e9v.wasm",
        "integrity": "sha256-hv8XCyJ5ecJILdPAk0XWcTfM2hxW8gVKMsIlNaVGpro="
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.eoetczmjdm.wasm",
        "integrity": "sha256-cvjTxKQqBX+zSM1ivLiFET+dcRAnxZZ+wP3VluDD8b0="
      },
      {
        "virtualPath": "System.Xml.wasm",
        "name": "System.Xml.xgtpd6kg2i.wasm",
        "integrity": "sha256-j1mVr9dZ1LT/NvvpQvoVqWX/owBTsalo/oteSqR19F8="
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.19r8yrz65b.wasm",
        "integrity": "sha256-C2adnyxUPD+L4Shb5w1IAYLePWYh2BcI7cT60VXxf+Q="
      },
      {
        "virtualPath": "WindowsBase.wasm",
        "name": "WindowsBase.7jgzz4bfrl.wasm",
        "integrity": "sha256-jb6A4rZQXMOA+4Mh2ty1O+WkAUijXHj+NRlqjWKfAC0="
      },
      {
        "virtualPath": "mscorlib.wasm",
        "name": "mscorlib.3nhz3b2vys.wasm",
        "integrity": "sha256-DxPlA5nI1iMgynJ8J1yNejgitAqUHyFZrElfLeMkDZA="
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.vbxzjg4wkg.wasm",
        "integrity": "sha256-ewaDowDO6ONrtLLkAGxN6K70sdx1za0muXFbU4A2jcs="
      },
      {
        "virtualPath": "3DColorsPlanner.wasm",
        "name": "3DColorsPlanner.yvn960swui.wasm",
        "integrity": "sha256-LmeEcdZOqedz8eqqtZmvd0ROra5i9CHDOu4yXStaAP4="
      }
    ],
    "pdb": [
      {
        "virtualPath": "3DColorsPlanner.pdb",
        "name": "3DColorsPlanner.stuhqiez4r.pdb",
        "integrity": "sha256-UDhMnhRnPW5sS0jKDB7MbppbBaH2zMTRW3UCfMBmmoo="
      }
    ],
    "libraryInitializers": [
      {
        "name": "_content/Microsoft.DotNet.HotReload.WebAssembly.Browser/Microsoft.DotNet.HotReload.WebAssembly.Browser.qp2w4j0l7o.lib.module.js"
      }
    ],
    "modulesAfterConfigLoaded": [
      {
        "name": "../_content/Microsoft.DotNet.HotReload.WebAssembly.Browser/Microsoft.DotNet.HotReload.WebAssembly.Browser.qp2w4j0l7o.lib.module.js"
      }
    ]
  },
  "debugLevel": -1,
  "globalizationMode": "sharded",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true,
        "System.Threading.Thread.EnableAutoreleasePool": false,
        "Microsoft.AspNetCore.Components.Endpoints.NavigationManager.DisableThrowNavigationException": true
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
//# sourceMappingURL=dotnet.js.map
