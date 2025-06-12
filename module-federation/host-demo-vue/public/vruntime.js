(function(root, factory) {
    if ('object' == typeof exports && 'object' == typeof module) module.exports = factory(require("Vue"));
    else if ('function' == typeof define && define.amd) define([
        "Vue"
    ], factory);
    else if ('object' == typeof exports) exports["RuntimeBridgeVue"] = factory(require("Vue"));
    else root["RuntimeBridgeVue"] = factory(root["Vue"]);
})(globalThis, (__WEBPACK_EXTERNAL_MODULE_vue__)=>(()=>{
        "use strict";
        var __webpack_modules__ = {
            "./node_modules/.pnpm/@module-federation+error-codes@0.8.5/node_modules/@module-federation/error-codes/dist/index.cjs.js": function(__unused_webpack_module, exports1) {
                const RUNTIME_001 = 'RUNTIME-001';
                const RUNTIME_002 = 'RUNTIME-002';
                const RUNTIME_003 = 'RUNTIME-003';
                const RUNTIME_004 = 'RUNTIME-004';
                const RUNTIME_005 = 'RUNTIME-005';
                const RUNTIME_006 = 'RUNTIME-006';
                const RUNTIME_007 = 'RUNTIME-007';
                const TYPE_001 = 'TYPE-001';
                const getDocsUrl = (errorCode)=>{
                    const type = errorCode.split('-')[0].toLowerCase();
                    return `https://module-federation.io/guide/troubleshooting/${type}/${errorCode}`;
                };
                const getShortErrorMsg = (errorCode, errorDescMap, args, originalErrorMsg)=>{
                    const msg = [
                        `${[
                            errorDescMap[errorCode]
                        ]} #${errorCode}`
                    ];
                    args && msg.push(`args: ${JSON.stringify(args)}`);
                    msg.push(getDocsUrl(errorCode));
                    originalErrorMsg && msg.push(`Original Error Message:\n ${originalErrorMsg}`);
                    return msg.join('\n');
                };
                function _extends() {
                    _extends = Object.assign || function(target) {
                        for(var i = 1; i < arguments.length; i++){
                            var source = arguments[i];
                            for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
                        }
                        return target;
                    };
                    return _extends.apply(this, arguments);
                }
                const runtimeDescMap = {
                    [RUNTIME_001]: 'Failed to get remoteEntry exports.',
                    [RUNTIME_002]: 'The remote entry interface does not contain "init"',
                    [RUNTIME_003]: 'Failed to get manifest.',
                    [RUNTIME_004]: 'Failed to locate remote.',
                    [RUNTIME_005]: 'Invalid loadShareSync function call from bundler runtime',
                    [RUNTIME_006]: 'Invalid loadShareSync function call from runtime',
                    [RUNTIME_007]: 'Failed to get remote snapshot.'
                };
                const typeDescMap = {
                    [TYPE_001]: 'Failed to generate type declaration.'
                };
                const errorDescMap = _extends({}, runtimeDescMap, typeDescMap);
                exports1.RUNTIME_001 = RUNTIME_001;
                exports1.RUNTIME_002 = RUNTIME_002;
                exports1.RUNTIME_003 = RUNTIME_003;
                exports1.RUNTIME_004 = RUNTIME_004;
                exports1.RUNTIME_005 = RUNTIME_005;
                exports1.RUNTIME_006 = RUNTIME_006;
                exports1.RUNTIME_007 = RUNTIME_007;
                exports1.TYPE_001 = TYPE_001;
                exports1.errorDescMap = errorDescMap;
                exports1.getShortErrorMsg = getShortErrorMsg;
                exports1.runtimeDescMap = runtimeDescMap;
                exports1.typeDescMap = typeDescMap;
            },
            "./node_modules/.pnpm/@module-federation+runtime-tools@0.8.5/node_modules/@module-federation/runtime-tools/dist/runtime.cjs.js": function(__unused_webpack_module, exports1, __webpack_require__) {
                var runtime = __webpack_require__("./node_modules/.pnpm/@module-federation+runtime@0.8.5/node_modules/@module-federation/runtime/dist/index.cjs.js");
                Object.keys(runtime).forEach(function(k) {
                    if ('default' !== k && !Object.prototype.hasOwnProperty.call(exports1, k)) Object.defineProperty(exports1, k, {
                        enumerable: true,
                        get: function() {
                            return runtime[k];
                        }
                    });
                });
            },
            "./node_modules/.pnpm/@module-federation+runtime@0.8.5/node_modules/@module-federation/runtime/dist/index.cjs.js": function(__unused_webpack_module, exports1, __webpack_require__) {
                var polyfills = __webpack_require__("./node_modules/.pnpm/@module-federation+runtime@0.8.5/node_modules/@module-federation/runtime/dist/polyfills.cjs.js");
                var sdk = __webpack_require__("./node_modules/.pnpm/@module-federation+sdk@0.8.5/node_modules/@module-federation/sdk/dist/index.cjs.js");
                var share = __webpack_require__("./node_modules/.pnpm/@module-federation+runtime@0.8.5/node_modules/@module-federation/runtime/dist/share.cjs.js");
                var errorCodes = __webpack_require__("./node_modules/.pnpm/@module-federation+error-codes@0.8.5/node_modules/@module-federation/error-codes/dist/index.cjs.js");
                function matchRemoteWithNameAndExpose(remotes, id) {
                    for (const remote of remotes){
                        const isNameMatched = id.startsWith(remote.name);
                        let expose = id.replace(remote.name, '');
                        if (isNameMatched) {
                            if (expose.startsWith('/')) {
                                const pkgNameOrAlias = remote.name;
                                expose = `.${expose}`;
                                return {
                                    pkgNameOrAlias,
                                    expose,
                                    remote
                                };
                            }
                            if ('' === expose) return {
                                pkgNameOrAlias: remote.name,
                                expose: '.',
                                remote
                            };
                        }
                        const isAliasMatched = remote.alias && id.startsWith(remote.alias);
                        let exposeWithAlias = remote.alias && id.replace(remote.alias, '');
                        if (remote.alias && isAliasMatched) {
                            if (exposeWithAlias && exposeWithAlias.startsWith('/')) {
                                const pkgNameOrAlias = remote.alias;
                                exposeWithAlias = `.${exposeWithAlias}`;
                                return {
                                    pkgNameOrAlias,
                                    expose: exposeWithAlias,
                                    remote
                                };
                            }
                            if ('' === exposeWithAlias) return {
                                pkgNameOrAlias: remote.alias,
                                expose: '.',
                                remote
                            };
                        }
                    }
                }
                function matchRemote(remotes, nameOrAlias) {
                    for (const remote of remotes){
                        const isNameMatched = nameOrAlias === remote.name;
                        if (isNameMatched) return remote;
                        const isAliasMatched = remote.alias && nameOrAlias === remote.alias;
                        if (isAliasMatched) return remote;
                    }
                }
                function registerPlugins$1(plugins, hookInstances) {
                    const globalPlugins = share.getGlobalHostPlugins();
                    if (globalPlugins.length > 0) globalPlugins.forEach((plugin)=>{
                        if (null == plugins ? void 0 : plugins.find((item)=>item.name !== plugin.name)) plugins.push(plugin);
                    });
                    if (plugins && plugins.length > 0) plugins.forEach((plugin)=>{
                        hookInstances.forEach((hookInstance)=>{
                            hookInstance.applyPlugin(plugin);
                        });
                    });
                    return plugins;
                }
                async function loadEsmEntry({ entry, remoteEntryExports }) {
                    return new Promise((resolve, reject)=>{
                        try {
                            if (remoteEntryExports) resolve(remoteEntryExports);
                            else if ('undefined' != typeof FEDERATION_ALLOW_NEW_FUNCTION) new Function('callbacks', `import("${entry}").then(callbacks[0]).catch(callbacks[1])`)([
                                resolve,
                                reject
                            ]);
                            else import(/* @vite-ignore */ entry).then(resolve).catch(reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                }
                async function loadSystemJsEntry({ entry, remoteEntryExports }) {
                    return new Promise((resolve, reject)=>{
                        try {
                            if (remoteEntryExports) resolve(remoteEntryExports);
                            else new Function('callbacks', `System.import("${entry}").then(callbacks[0]).catch(callbacks[1])`)([
                                resolve,
                                reject
                            ]);
                        } catch (e) {
                            reject(e);
                        }
                    });
                }
                async function loadEntryScript({ name: name1, globalName, entry, loaderHook }) {
                    const { entryExports: remoteEntryExports } = share.getRemoteEntryExports(name1, globalName);
                    if (remoteEntryExports) return remoteEntryExports;
                    return sdk.loadScript(entry, {
                        attrs: {},
                        createScriptHook: (url, attrs)=>{
                            const res = loaderHook.lifecycle.createScript.emit({
                                url,
                                attrs
                            });
                            if (!res) return;
                            if (res instanceof HTMLScriptElement) return res;
                            if ('script' in res || 'timeout' in res) return res;
                        }
                    }).then(()=>{
                        const { remoteEntryKey, entryExports } = share.getRemoteEntryExports(name1, globalName);
                        share.assert(entryExports, errorCodes.getShortErrorMsg(errorCodes.RUNTIME_001, errorCodes.runtimeDescMap, {
                            remoteName: name1,
                            remoteEntryUrl: entry,
                            remoteEntryKey
                        }));
                        return entryExports;
                    }).catch((e)=>{
                        throw e;
                    });
                }
                async function loadEntryDom({ remoteInfo, remoteEntryExports, loaderHook }) {
                    const { entry, entryGlobalName: globalName, name: name1, type } = remoteInfo;
                    switch(type){
                        case 'esm':
                        case 'module':
                            return loadEsmEntry({
                                entry,
                                remoteEntryExports
                            });
                        case 'system':
                            return loadSystemJsEntry({
                                entry,
                                remoteEntryExports
                            });
                        default:
                            return loadEntryScript({
                                entry,
                                globalName,
                                name: name1,
                                loaderHook
                            });
                    }
                }
                async function loadEntryNode({ remoteInfo, loaderHook }) {
                    const { entry, entryGlobalName: globalName, name: name1, type } = remoteInfo;
                    const { entryExports: remoteEntryExports } = share.getRemoteEntryExports(name1, globalName);
                    if (remoteEntryExports) return remoteEntryExports;
                    return sdk.loadScriptNode(entry, {
                        attrs: {
                            name: name1,
                            globalName,
                            type
                        },
                        loaderHook: {
                            createScriptHook: (url, attrs = {})=>{
                                const res = loaderHook.lifecycle.createScript.emit({
                                    url,
                                    attrs
                                });
                                if (!res) return;
                                if ('url' in res) return res;
                            }
                        }
                    }).then(()=>{
                        const { remoteEntryKey, entryExports } = share.getRemoteEntryExports(name1, globalName);
                        share.assert(entryExports, errorCodes.getShortErrorMsg(errorCodes.RUNTIME_001, errorCodes.runtimeDescMap, {
                            remoteName: name1,
                            remoteEntryUrl: entry,
                            remoteEntryKey
                        }));
                        return entryExports;
                    }).catch((e)=>{
                        throw e;
                    });
                }
                function getRemoteEntryUniqueKey(remoteInfo) {
                    const { entry, name: name1 } = remoteInfo;
                    return sdk.composeKeyWithSeparator(name1, entry);
                }
                async function getRemoteEntry({ origin, remoteEntryExports, remoteInfo }) {
                    const uniqueKey = getRemoteEntryUniqueKey(remoteInfo);
                    if (remoteEntryExports) return remoteEntryExports;
                    if (!share.globalLoading[uniqueKey]) {
                        const loadEntryHook = origin.remoteHandler.hooks.lifecycle.loadEntry;
                        const loaderHook = origin.loaderHook;
                        share.globalLoading[uniqueKey] = loadEntryHook.emit({
                            loaderHook,
                            remoteInfo,
                            remoteEntryExports
                        }).then((res)=>{
                            if (res) return res;
                            return sdk.isBrowserEnv() ? loadEntryDom({
                                remoteInfo,
                                remoteEntryExports,
                                loaderHook
                            }) : loadEntryNode({
                                remoteInfo,
                                loaderHook
                            });
                        });
                    }
                    return share.globalLoading[uniqueKey];
                }
                function getRemoteInfo(remote) {
                    return polyfills._extends({}, remote, {
                        entry: 'entry' in remote ? remote.entry : '',
                        type: remote.type || share.DEFAULT_REMOTE_TYPE,
                        entryGlobalName: remote.entryGlobalName || remote.name,
                        shareScope: remote.shareScope || share.DEFAULT_SCOPE
                    });
                }
                let Module = class {
                    async getEntry() {
                        if (this.remoteEntryExports) return this.remoteEntryExports;
                        let remoteEntryExports;
                        try {
                            remoteEntryExports = await getRemoteEntry({
                                origin: this.host,
                                remoteInfo: this.remoteInfo,
                                remoteEntryExports: this.remoteEntryExports
                            });
                        } catch (err) {
                            const uniqueKey = getRemoteEntryUniqueKey(this.remoteInfo);
                            remoteEntryExports = await this.host.loaderHook.lifecycle.loadEntryError.emit({
                                getRemoteEntry,
                                origin: this.host,
                                remoteInfo: this.remoteInfo,
                                remoteEntryExports: this.remoteEntryExports,
                                globalLoading: share.globalLoading,
                                uniqueKey
                            });
                        }
                        share.assert(remoteEntryExports, `remoteEntryExports is undefined \n ${sdk.safeToString(this.remoteInfo)}`);
                        this.remoteEntryExports = remoteEntryExports;
                        return this.remoteEntryExports;
                    }
                    async get(id, expose, options, remoteSnapshot) {
                        const { loadFactory = true } = options || {
                            loadFactory: true
                        };
                        const remoteEntryExports = await this.getEntry();
                        if (!this.inited) {
                            const localShareScopeMap = this.host.shareScopeMap;
                            const remoteShareScope = this.remoteInfo.shareScope || 'default';
                            if (!localShareScopeMap[remoteShareScope]) localShareScopeMap[remoteShareScope] = {};
                            const shareScope = localShareScopeMap[remoteShareScope];
                            const initScope = [];
                            const remoteEntryInitOptions = {
                                version: this.remoteInfo.version || ''
                            };
                            Object.defineProperty(remoteEntryInitOptions, 'shareScopeMap', {
                                value: localShareScopeMap,
                                enumerable: false
                            });
                            const initContainerOptions = await this.host.hooks.lifecycle.beforeInitContainer.emit({
                                shareScope,
                                remoteEntryInitOptions,
                                initScope,
                                remoteInfo: this.remoteInfo,
                                origin: this.host
                            });
                            if (void 0 === (null == remoteEntryExports ? void 0 : remoteEntryExports.init)) share.error(errorCodes.getShortErrorMsg(errorCodes.RUNTIME_002, errorCodes.runtimeDescMap, {
                                remoteName: name,
                                remoteEntryUrl: this.remoteInfo.entry,
                                remoteEntryKey: this.remoteInfo.entryGlobalName
                            }));
                            await remoteEntryExports.init(initContainerOptions.shareScope, initContainerOptions.initScope, initContainerOptions.remoteEntryInitOptions);
                            await this.host.hooks.lifecycle.initContainer.emit(polyfills._extends({}, initContainerOptions, {
                                id,
                                remoteSnapshot,
                                remoteEntryExports
                            }));
                        }
                        this.lib = remoteEntryExports;
                        this.inited = true;
                        let moduleFactory;
                        moduleFactory = await this.host.loaderHook.lifecycle.getModuleFactory.emit({
                            remoteEntryExports,
                            expose,
                            moduleInfo: this.remoteInfo
                        });
                        if (!moduleFactory) moduleFactory = await remoteEntryExports.get(expose);
                        share.assert(moduleFactory, `${share.getFMId(this.remoteInfo)} remote don't export ${expose}.`);
                        const symbolName = share.processModuleAlias(this.remoteInfo.name, expose);
                        const wrapModuleFactory = this.wraperFactory(moduleFactory, symbolName);
                        if (!loadFactory) return wrapModuleFactory;
                        const exposeContent = await wrapModuleFactory();
                        return exposeContent;
                    }
                    wraperFactory(moduleFactory, id) {
                        function defineModuleId(res, id) {
                            if (res && 'object' == typeof res && Object.isExtensible(res) && !Object.getOwnPropertyDescriptor(res, Symbol.for('mf_module_id'))) Object.defineProperty(res, Symbol.for('mf_module_id'), {
                                value: id,
                                enumerable: false
                            });
                        }
                        if (moduleFactory instanceof Promise) return async ()=>{
                            const res = await moduleFactory();
                            defineModuleId(res, id);
                            return res;
                        };
                        return ()=>{
                            const res = moduleFactory();
                            defineModuleId(res, id);
                            return res;
                        };
                    }
                    constructor({ remoteInfo, host }){
                        this.inited = false;
                        this.lib = void 0;
                        this.remoteInfo = remoteInfo;
                        this.host = host;
                    }
                };
                class SyncHook {
                    on(fn) {
                        if ('function' == typeof fn) this.listeners.add(fn);
                    }
                    once(fn) {
                        const self = this;
                        this.on(function wrapper(...args) {
                            self.remove(wrapper);
                            return fn.apply(null, args);
                        });
                    }
                    emit(...data) {
                        let result;
                        if (this.listeners.size > 0) this.listeners.forEach((fn)=>{
                            result = fn(...data);
                        });
                        return result;
                    }
                    remove(fn) {
                        this.listeners.delete(fn);
                    }
                    removeAll() {
                        this.listeners.clear();
                    }
                    constructor(type){
                        this.type = '';
                        this.listeners = new Set();
                        if (type) this.type = type;
                    }
                }
                class AsyncHook extends SyncHook {
                    emit(...data) {
                        let result;
                        const ls = Array.from(this.listeners);
                        if (ls.length > 0) {
                            let i = 0;
                            const call = (prev)=>{
                                if (false === prev) return false;
                                if (i < ls.length) return Promise.resolve(ls[i++].apply(null, data)).then(call);
                                return prev;
                            };
                            result = call();
                        }
                        return Promise.resolve(result);
                    }
                }
                function checkReturnData(originalData, returnedData) {
                    if (!share.isObject(returnedData)) return false;
                    if (originalData !== returnedData) {
                        for(const key in originalData)if (!(key in returnedData)) return false;
                    }
                    return true;
                }
                class SyncWaterfallHook extends SyncHook {
                    emit(data) {
                        if (!share.isObject(data)) share.error(`The data for the "${this.type}" hook should be an object.`);
                        for (const fn of this.listeners)try {
                            const tempData = fn(data);
                            if (checkReturnData(data, tempData)) data = tempData;
                            else {
                                this.onerror(`A plugin returned an unacceptable value for the "${this.type}" type.`);
                                break;
                            }
                        } catch (e) {
                            share.warn(e);
                            this.onerror(e);
                        }
                        return data;
                    }
                    constructor(type){
                        super(), this.onerror = share.error;
                        this.type = type;
                    }
                }
                class AsyncWaterfallHook extends SyncHook {
                    emit(data) {
                        if (!share.isObject(data)) share.error(`The response data for the "${this.type}" hook must be an object.`);
                        const ls = Array.from(this.listeners);
                        if (ls.length > 0) {
                            let i = 0;
                            const processError = (e)=>{
                                share.warn(e);
                                this.onerror(e);
                                return data;
                            };
                            const call = (prevData)=>{
                                if (checkReturnData(data, prevData)) {
                                    data = prevData;
                                    if (i < ls.length) try {
                                        return Promise.resolve(ls[i++](data)).then(call, processError);
                                    } catch (e) {
                                        return processError(e);
                                    }
                                } else this.onerror(`A plugin returned an incorrect value for the "${this.type}" type.`);
                                return data;
                            };
                            return Promise.resolve(call(data));
                        }
                        return Promise.resolve(data);
                    }
                    constructor(type){
                        super(), this.onerror = share.error;
                        this.type = type;
                    }
                }
                class PluginSystem {
                    applyPlugin(plugin) {
                        share.assert(share.isPlainObject(plugin), 'Plugin configuration is invalid.');
                        const pluginName = plugin.name;
                        share.assert(pluginName, 'A name must be provided by the plugin.');
                        if (!this.registerPlugins[pluginName]) {
                            this.registerPlugins[pluginName] = plugin;
                            Object.keys(this.lifecycle).forEach((key)=>{
                                const pluginLife = plugin[key];
                                if (pluginLife) this.lifecycle[key].on(pluginLife);
                            });
                        }
                    }
                    removePlugin(pluginName) {
                        share.assert(pluginName, 'A name is required.');
                        const plugin = this.registerPlugins[pluginName];
                        share.assert(plugin, `The plugin "${pluginName}" is not registered.`);
                        Object.keys(plugin).forEach((key)=>{
                            if ('name' !== key) this.lifecycle[key].remove(plugin[key]);
                        });
                    }
                    inherit({ lifecycle, registerPlugins }) {
                        Object.keys(lifecycle).forEach((hookName)=>{
                            share.assert(!this.lifecycle[hookName], `The hook "${hookName}" has a conflict and cannot be inherited.`);
                            this.lifecycle[hookName] = lifecycle[hookName];
                        });
                        Object.keys(registerPlugins).forEach((pluginName)=>{
                            share.assert(!this.registerPlugins[pluginName], `The plugin "${pluginName}" has a conflict and cannot be inherited.`);
                            this.applyPlugin(registerPlugins[pluginName]);
                        });
                    }
                    constructor(lifecycle){
                        this.registerPlugins = {};
                        this.lifecycle = lifecycle;
                        this.lifecycleKeys = Object.keys(lifecycle);
                    }
                }
                function defaultPreloadArgs(preloadConfig) {
                    return polyfills._extends({
                        resourceCategory: 'sync',
                        share: true,
                        depsRemote: true,
                        prefetchInterface: false
                    }, preloadConfig);
                }
                function formatPreloadArgs(remotes, preloadArgs) {
                    return preloadArgs.map((args)=>{
                        const remoteInfo = matchRemote(remotes, args.nameOrAlias);
                        share.assert(remoteInfo, `Unable to preload ${args.nameOrAlias} as it is not included in ${!remoteInfo && sdk.safeToString({
                            remoteInfo,
                            remotes
                        })}`);
                        return {
                            remote: remoteInfo,
                            preloadConfig: defaultPreloadArgs(args)
                        };
                    });
                }
                function normalizePreloadExposes(exposes) {
                    if (!exposes) return [];
                    return exposes.map((expose)=>{
                        if ('.' === expose) return expose;
                        if (expose.startsWith('./')) return expose.replace('./', '');
                        return expose;
                    });
                }
                function preloadAssets(remoteInfo, host, assets, useLinkPreload = true) {
                    const { cssAssets, jsAssetsWithoutEntry, entryAssets } = assets;
                    if (host.options.inBrowser) {
                        entryAssets.forEach((asset)=>{
                            const { moduleInfo } = asset;
                            const module1 = host.moduleCache.get(remoteInfo.name);
                            module1 ? getRemoteEntry({
                                origin: host,
                                remoteInfo: moduleInfo,
                                remoteEntryExports: module1.remoteEntryExports
                            }) : getRemoteEntry({
                                origin: host,
                                remoteInfo: moduleInfo,
                                remoteEntryExports: void 0
                            });
                        });
                        if (useLinkPreload) {
                            const defaultAttrs = {
                                rel: 'preload',
                                as: 'style'
                            };
                            cssAssets.forEach((cssUrl)=>{
                                const { link: cssEl, needAttach } = sdk.createLink({
                                    url: cssUrl,
                                    cb: ()=>{},
                                    attrs: defaultAttrs,
                                    createLinkHook: (url, attrs)=>{
                                        const res = host.loaderHook.lifecycle.createLink.emit({
                                            url,
                                            attrs
                                        });
                                        if (res instanceof HTMLLinkElement) return res;
                                    }
                                });
                                needAttach && document.head.appendChild(cssEl);
                            });
                        } else {
                            const defaultAttrs = {
                                rel: 'stylesheet',
                                type: 'text/css'
                            };
                            cssAssets.forEach((cssUrl)=>{
                                const { link: cssEl, needAttach } = sdk.createLink({
                                    url: cssUrl,
                                    cb: ()=>{},
                                    attrs: defaultAttrs,
                                    createLinkHook: (url, attrs)=>{
                                        const res = host.loaderHook.lifecycle.createLink.emit({
                                            url,
                                            attrs
                                        });
                                        if (res instanceof HTMLLinkElement) return res;
                                    },
                                    needDeleteLink: false
                                });
                                needAttach && document.head.appendChild(cssEl);
                            });
                        }
                        if (useLinkPreload) {
                            const defaultAttrs = {
                                rel: 'preload',
                                as: 'script'
                            };
                            jsAssetsWithoutEntry.forEach((jsUrl)=>{
                                const { link: linkEl, needAttach } = sdk.createLink({
                                    url: jsUrl,
                                    cb: ()=>{},
                                    attrs: defaultAttrs,
                                    createLinkHook: (url, attrs)=>{
                                        const res = host.loaderHook.lifecycle.createLink.emit({
                                            url,
                                            attrs
                                        });
                                        if (res instanceof HTMLLinkElement) return res;
                                    }
                                });
                                needAttach && document.head.appendChild(linkEl);
                            });
                        } else {
                            const defaultAttrs = {
                                fetchpriority: 'high',
                                type: (null == remoteInfo ? void 0 : remoteInfo.type) === 'module' ? 'module' : 'text/javascript'
                            };
                            jsAssetsWithoutEntry.forEach((jsUrl)=>{
                                const { script: scriptEl, needAttach } = sdk.createScript({
                                    url: jsUrl,
                                    cb: ()=>{},
                                    attrs: defaultAttrs,
                                    createScriptHook: (url, attrs)=>{
                                        const res = host.loaderHook.lifecycle.createScript.emit({
                                            url,
                                            attrs
                                        });
                                        if (res instanceof HTMLScriptElement) return res;
                                    },
                                    needDeleteScript: true
                                });
                                needAttach && document.head.appendChild(scriptEl);
                            });
                        }
                    }
                }
                function assignRemoteInfo(remoteInfo, remoteSnapshot) {
                    const remoteEntryInfo = share.getRemoteEntryInfoFromSnapshot(remoteSnapshot);
                    if (!remoteEntryInfo.url) share.error(`The attribute remoteEntry of ${remoteInfo.name} must not be undefined.`);
                    let entryUrl = sdk.getResourceUrl(remoteSnapshot, remoteEntryInfo.url);
                    if (!sdk.isBrowserEnv() && !entryUrl.startsWith('http')) entryUrl = `https:${entryUrl}`;
                    remoteInfo.type = remoteEntryInfo.type;
                    remoteInfo.entryGlobalName = remoteEntryInfo.globalName;
                    remoteInfo.entry = entryUrl;
                    remoteInfo.version = remoteSnapshot.version;
                    remoteInfo.buildVersion = remoteSnapshot.buildVersion;
                }
                function snapshotPlugin() {
                    return {
                        name: 'snapshot-plugin',
                        async afterResolve (args) {
                            const { remote, pkgNameOrAlias, expose, origin, remoteInfo } = args;
                            if (!share.isRemoteInfoWithEntry(remote) || !share.isPureRemoteEntry(remote)) {
                                const { remoteSnapshot, globalSnapshot } = await origin.snapshotHandler.loadRemoteSnapshotInfo(remote);
                                assignRemoteInfo(remoteInfo, remoteSnapshot);
                                const preloadOptions = {
                                    remote,
                                    preloadConfig: {
                                        nameOrAlias: pkgNameOrAlias,
                                        exposes: [
                                            expose
                                        ],
                                        resourceCategory: 'sync',
                                        share: false,
                                        depsRemote: false
                                    }
                                };
                                const assets = await origin.remoteHandler.hooks.lifecycle.generatePreloadAssets.emit({
                                    origin,
                                    preloadOptions,
                                    remoteInfo,
                                    remote,
                                    remoteSnapshot,
                                    globalSnapshot
                                });
                                if (assets) preloadAssets(remoteInfo, origin, assets, false);
                                return polyfills._extends({}, args, {
                                    remoteSnapshot
                                });
                            }
                            return args;
                        }
                    };
                }
                function splitId(id) {
                    const splitInfo = id.split(':');
                    if (1 === splitInfo.length) return {
                        name: splitInfo[0],
                        version: void 0
                    };
                    if (2 === splitInfo.length) return {
                        name: splitInfo[0],
                        version: splitInfo[1]
                    };
                    return {
                        name: splitInfo[1],
                        version: splitInfo[2]
                    };
                }
                function traverseModuleInfo(globalSnapshot, remoteInfo, traverse, isRoot, memo = {}, remoteSnapshot) {
                    const id = share.getFMId(remoteInfo);
                    const { value: snapshotValue } = share.getInfoWithoutType(globalSnapshot, id);
                    const effectiveRemoteSnapshot = remoteSnapshot || snapshotValue;
                    if (effectiveRemoteSnapshot && !sdk.isManifestProvider(effectiveRemoteSnapshot)) {
                        traverse(effectiveRemoteSnapshot, remoteInfo, isRoot);
                        if (effectiveRemoteSnapshot.remotesInfo) {
                            const remoteKeys = Object.keys(effectiveRemoteSnapshot.remotesInfo);
                            for (const key of remoteKeys){
                                if (memo[key]) continue;
                                memo[key] = true;
                                const subRemoteInfo = splitId(key);
                                const remoteValue = effectiveRemoteSnapshot.remotesInfo[key];
                                traverseModuleInfo(globalSnapshot, {
                                    name: subRemoteInfo.name,
                                    version: remoteValue.matchedVersion
                                }, traverse, false, memo, void 0);
                            }
                        }
                    }
                }
                function generatePreloadAssets(origin, preloadOptions, remote, globalSnapshot, remoteSnapshot) {
                    const cssAssets = [];
                    const jsAssets = [];
                    const entryAssets = [];
                    const loadedSharedJsAssets = new Set();
                    const loadedSharedCssAssets = new Set();
                    const { options } = origin;
                    const { preloadConfig: rootPreloadConfig } = preloadOptions;
                    const { depsRemote } = rootPreloadConfig;
                    const memo = {};
                    traverseModuleInfo(globalSnapshot, remote, (moduleInfoSnapshot, remoteInfo, isRoot)=>{
                        let preloadConfig;
                        if (isRoot) preloadConfig = rootPreloadConfig;
                        else if (Array.isArray(depsRemote)) {
                            const findPreloadConfig = depsRemote.find((remoteConfig)=>{
                                if (remoteConfig.nameOrAlias === remoteInfo.name || remoteConfig.nameOrAlias === remoteInfo.alias) return true;
                                return false;
                            });
                            if (!findPreloadConfig) return;
                            preloadConfig = defaultPreloadArgs(findPreloadConfig);
                        } else {
                            if (true !== depsRemote) return;
                            preloadConfig = rootPreloadConfig;
                        }
                        const remoteEntryUrl = sdk.getResourceUrl(moduleInfoSnapshot, share.getRemoteEntryInfoFromSnapshot(moduleInfoSnapshot).url);
                        if (remoteEntryUrl) entryAssets.push({
                            name: remoteInfo.name,
                            moduleInfo: {
                                name: remoteInfo.name,
                                entry: remoteEntryUrl,
                                type: 'remoteEntryType' in moduleInfoSnapshot ? moduleInfoSnapshot.remoteEntryType : 'global',
                                entryGlobalName: 'globalName' in moduleInfoSnapshot ? moduleInfoSnapshot.globalName : remoteInfo.name,
                                shareScope: '',
                                version: 'version' in moduleInfoSnapshot ? moduleInfoSnapshot.version : void 0
                            },
                            url: remoteEntryUrl
                        });
                        let moduleAssetsInfo = 'modules' in moduleInfoSnapshot ? moduleInfoSnapshot.modules : [];
                        const normalizedPreloadExposes = normalizePreloadExposes(preloadConfig.exposes);
                        if (normalizedPreloadExposes.length && 'modules' in moduleInfoSnapshot) {
                            var _moduleInfoSnapshot_modules;
                            moduleAssetsInfo = null == moduleInfoSnapshot ? void 0 : null == (_moduleInfoSnapshot_modules = moduleInfoSnapshot.modules) ? void 0 : _moduleInfoSnapshot_modules.reduce((assets, moduleAssetInfo)=>{
                                if ((null == normalizedPreloadExposes ? void 0 : normalizedPreloadExposes.indexOf(moduleAssetInfo.moduleName)) !== -1) assets.push(moduleAssetInfo);
                                return assets;
                            }, []);
                        }
                        function handleAssets(assets) {
                            const assetsRes = assets.map((asset)=>sdk.getResourceUrl(moduleInfoSnapshot, asset));
                            if (preloadConfig.filter) return assetsRes.filter(preloadConfig.filter);
                            return assetsRes;
                        }
                        if (moduleAssetsInfo) {
                            const assetsLength = moduleAssetsInfo.length;
                            for(let index = 0; index < assetsLength; index++){
                                const assetsInfo = moduleAssetsInfo[index];
                                const exposeFullPath = `${remoteInfo.name}/${assetsInfo.moduleName}`;
                                origin.remoteHandler.hooks.lifecycle.handlePreloadModule.emit({
                                    id: '.' === assetsInfo.moduleName ? remoteInfo.name : exposeFullPath,
                                    name: remoteInfo.name,
                                    remoteSnapshot: moduleInfoSnapshot,
                                    preloadConfig,
                                    remote: remoteInfo,
                                    origin
                                });
                                const preloaded = share.getPreloaded(exposeFullPath);
                                if (!preloaded) {
                                    if ('all' === preloadConfig.resourceCategory) {
                                        cssAssets.push(...handleAssets(assetsInfo.assets.css.async));
                                        cssAssets.push(...handleAssets(assetsInfo.assets.css.sync));
                                        jsAssets.push(...handleAssets(assetsInfo.assets.js.async));
                                        jsAssets.push(...handleAssets(assetsInfo.assets.js.sync));
                                    } else {
                                        preloadConfig.resourceCategory = 'sync';
                                        cssAssets.push(...handleAssets(assetsInfo.assets.css.sync));
                                        jsAssets.push(...handleAssets(assetsInfo.assets.js.sync));
                                    }
                                    share.setPreloaded(exposeFullPath);
                                }
                            }
                        }
                    }, true, memo, remoteSnapshot);
                    if (remoteSnapshot.shared) {
                        const collectSharedAssets = (shareInfo, snapshotShared)=>{
                            const registeredShared = share.getRegisteredShare(origin.shareScopeMap, snapshotShared.sharedName, shareInfo, origin.sharedHandler.hooks.lifecycle.resolveShare);
                            if (registeredShared && 'function' == typeof registeredShared.lib) {
                                snapshotShared.assets.js.sync.forEach((asset)=>{
                                    loadedSharedJsAssets.add(asset);
                                });
                                snapshotShared.assets.css.sync.forEach((asset)=>{
                                    loadedSharedCssAssets.add(asset);
                                });
                            }
                        };
                        remoteSnapshot.shared.forEach((shared)=>{
                            var _options_shared;
                            const shareInfos = null == (_options_shared = options.shared) ? void 0 : _options_shared[shared.sharedName];
                            if (!shareInfos) return;
                            const sharedOptions = shared.version ? shareInfos.find((s)=>s.version === shared.version) : shareInfos;
                            if (!sharedOptions) return;
                            const arrayShareInfo = share.arrayOptions(sharedOptions);
                            arrayShareInfo.forEach((s)=>{
                                collectSharedAssets(s, shared);
                            });
                        });
                    }
                    const needPreloadJsAssets = jsAssets.filter((asset)=>!loadedSharedJsAssets.has(asset));
                    const needPreloadCssAssets = cssAssets.filter((asset)=>!loadedSharedCssAssets.has(asset));
                    return {
                        cssAssets: needPreloadCssAssets,
                        jsAssetsWithoutEntry: needPreloadJsAssets,
                        entryAssets
                    };
                }
                const generatePreloadAssetsPlugin = function() {
                    return {
                        name: 'generate-preload-assets-plugin',
                        async generatePreloadAssets (args) {
                            const { origin, preloadOptions, remoteInfo, remote, globalSnapshot, remoteSnapshot } = args;
                            if (share.isRemoteInfoWithEntry(remote) && share.isPureRemoteEntry(remote)) return {
                                cssAssets: [],
                                jsAssetsWithoutEntry: [],
                                entryAssets: [
                                    {
                                        name: remote.name,
                                        url: remote.entry,
                                        moduleInfo: {
                                            name: remoteInfo.name,
                                            entry: remote.entry,
                                            type: remoteInfo.type || 'global',
                                            entryGlobalName: '',
                                            shareScope: ''
                                        }
                                    }
                                ]
                            };
                            assignRemoteInfo(remoteInfo, remoteSnapshot);
                            const assets = generatePreloadAssets(origin, preloadOptions, remoteInfo, globalSnapshot, remoteSnapshot);
                            return assets;
                        }
                    };
                };
                function getGlobalRemoteInfo(moduleInfo, origin) {
                    const hostGlobalSnapshot = share.getGlobalSnapshotInfoByModuleInfo({
                        name: origin.options.name,
                        version: origin.options.version
                    });
                    const globalRemoteInfo = hostGlobalSnapshot && 'remotesInfo' in hostGlobalSnapshot && hostGlobalSnapshot.remotesInfo && share.getInfoWithoutType(hostGlobalSnapshot.remotesInfo, moduleInfo.name).value;
                    if (globalRemoteInfo && globalRemoteInfo.matchedVersion) return {
                        hostGlobalSnapshot,
                        globalSnapshot: share.getGlobalSnapshot(),
                        remoteSnapshot: share.getGlobalSnapshotInfoByModuleInfo({
                            name: moduleInfo.name,
                            version: globalRemoteInfo.matchedVersion
                        })
                    };
                    return {
                        hostGlobalSnapshot: void 0,
                        globalSnapshot: share.getGlobalSnapshot(),
                        remoteSnapshot: share.getGlobalSnapshotInfoByModuleInfo({
                            name: moduleInfo.name,
                            version: 'version' in moduleInfo ? moduleInfo.version : void 0
                        })
                    };
                }
                class SnapshotHandler {
                    async loadSnapshot(moduleInfo) {
                        const { options } = this.HostInstance;
                        const { hostGlobalSnapshot, remoteSnapshot, globalSnapshot } = this.getGlobalRemoteInfo(moduleInfo);
                        const { remoteSnapshot: globalRemoteSnapshot, globalSnapshot: globalSnapshotRes } = await this.hooks.lifecycle.loadSnapshot.emit({
                            options,
                            moduleInfo,
                            hostGlobalSnapshot,
                            remoteSnapshot,
                            globalSnapshot
                        });
                        return {
                            remoteSnapshot: globalRemoteSnapshot,
                            globalSnapshot: globalSnapshotRes
                        };
                    }
                    async loadRemoteSnapshotInfo(moduleInfo) {
                        const { options } = this.HostInstance;
                        await this.hooks.lifecycle.beforeLoadRemoteSnapshot.emit({
                            options,
                            moduleInfo
                        });
                        let hostSnapshot = share.getGlobalSnapshotInfoByModuleInfo({
                            name: this.HostInstance.options.name,
                            version: this.HostInstance.options.version
                        });
                        if (!hostSnapshot) {
                            hostSnapshot = {
                                version: this.HostInstance.options.version || '',
                                remoteEntry: '',
                                remotesInfo: {}
                            };
                            share.addGlobalSnapshot({
                                [this.HostInstance.options.name]: hostSnapshot
                            });
                        }
                        if (hostSnapshot && 'remotesInfo' in hostSnapshot && !share.getInfoWithoutType(hostSnapshot.remotesInfo, moduleInfo.name).value) {
                            if ('version' in moduleInfo || 'entry' in moduleInfo) hostSnapshot.remotesInfo = polyfills._extends({}, null == hostSnapshot ? void 0 : hostSnapshot.remotesInfo, {
                                [moduleInfo.name]: {
                                    matchedVersion: 'version' in moduleInfo ? moduleInfo.version : moduleInfo.entry
                                }
                            });
                        }
                        const { hostGlobalSnapshot, remoteSnapshot, globalSnapshot } = this.getGlobalRemoteInfo(moduleInfo);
                        const { remoteSnapshot: globalRemoteSnapshot, globalSnapshot: globalSnapshotRes } = await this.hooks.lifecycle.loadSnapshot.emit({
                            options,
                            moduleInfo,
                            hostGlobalSnapshot,
                            remoteSnapshot,
                            globalSnapshot
                        });
                        let mSnapshot;
                        let gSnapshot;
                        if (globalRemoteSnapshot) {
                            if (sdk.isManifestProvider(globalRemoteSnapshot)) {
                                const remoteEntry = sdk.isBrowserEnv() ? globalRemoteSnapshot.remoteEntry : globalRemoteSnapshot.ssrRemoteEntry || globalRemoteSnapshot.remoteEntry || '';
                                const moduleSnapshot = await this.getManifestJson(remoteEntry, moduleInfo, {});
                                const globalSnapshotRes = share.setGlobalSnapshotInfoByModuleInfo(polyfills._extends({}, moduleInfo, {
                                    entry: remoteEntry
                                }), moduleSnapshot);
                                mSnapshot = moduleSnapshot;
                                gSnapshot = globalSnapshotRes;
                            } else {
                                const { remoteSnapshot: remoteSnapshotRes } = await this.hooks.lifecycle.loadRemoteSnapshot.emit({
                                    options: this.HostInstance.options,
                                    moduleInfo,
                                    remoteSnapshot: globalRemoteSnapshot,
                                    from: 'global'
                                });
                                mSnapshot = remoteSnapshotRes;
                                gSnapshot = globalSnapshotRes;
                            }
                        } else if (share.isRemoteInfoWithEntry(moduleInfo)) {
                            const moduleSnapshot = await this.getManifestJson(moduleInfo.entry, moduleInfo, {});
                            const globalSnapshotRes = share.setGlobalSnapshotInfoByModuleInfo(moduleInfo, moduleSnapshot);
                            const { remoteSnapshot: remoteSnapshotRes } = await this.hooks.lifecycle.loadRemoteSnapshot.emit({
                                options: this.HostInstance.options,
                                moduleInfo,
                                remoteSnapshot: moduleSnapshot,
                                from: 'global'
                            });
                            mSnapshot = remoteSnapshotRes;
                            gSnapshot = globalSnapshotRes;
                        } else share.error(errorCodes.getShortErrorMsg(errorCodes.RUNTIME_007, errorCodes.runtimeDescMap, {
                            hostName: moduleInfo.name,
                            hostVersion: moduleInfo.version,
                            globalSnapshot: JSON.stringify(globalSnapshotRes)
                        }));
                        await this.hooks.lifecycle.afterLoadSnapshot.emit({
                            options,
                            moduleInfo,
                            remoteSnapshot: mSnapshot
                        });
                        return {
                            remoteSnapshot: mSnapshot,
                            globalSnapshot: gSnapshot
                        };
                    }
                    getGlobalRemoteInfo(moduleInfo) {
                        return getGlobalRemoteInfo(moduleInfo, this.HostInstance);
                    }
                    async getManifestJson(manifestUrl, moduleInfo, extraOptions) {
                        const getManifest = async ()=>{
                            let manifestJson = this.manifestCache.get(manifestUrl);
                            if (manifestJson) return manifestJson;
                            try {
                                let res = await this.loaderHook.lifecycle.fetch.emit(manifestUrl, {});
                                if (!res || !(res instanceof Response)) res = await fetch(manifestUrl, {});
                                manifestJson = await res.json();
                                share.assert(manifestJson.metaData && manifestJson.exposes && manifestJson.shared, `${manifestUrl} is not a federation manifest`);
                                this.manifestCache.set(manifestUrl, manifestJson);
                                return manifestJson;
                            } catch (err) {
                                delete this.manifestLoading[manifestUrl];
                                share.error(errorCodes.getShortErrorMsg(errorCodes.RUNTIME_003, errorCodes.runtimeDescMap, {
                                    manifestUrl,
                                    moduleName: moduleInfo.name
                                }, `${err}`));
                            }
                        };
                        const asyncLoadProcess = async ()=>{
                            const manifestJson = await getManifest();
                            const remoteSnapshot = sdk.generateSnapshotFromManifest(manifestJson, {
                                version: manifestUrl
                            });
                            const { remoteSnapshot: remoteSnapshotRes } = await this.hooks.lifecycle.loadRemoteSnapshot.emit({
                                options: this.HostInstance.options,
                                moduleInfo,
                                manifestJson,
                                remoteSnapshot,
                                manifestUrl,
                                from: 'manifest'
                            });
                            return remoteSnapshotRes;
                        };
                        if (!this.manifestLoading[manifestUrl]) this.manifestLoading[manifestUrl] = asyncLoadProcess().then((res)=>res);
                        return this.manifestLoading[manifestUrl];
                    }
                    constructor(HostInstance){
                        this.loadingHostSnapshot = null;
                        this.manifestCache = new Map();
                        this.hooks = new PluginSystem({
                            beforeLoadRemoteSnapshot: new AsyncHook('beforeLoadRemoteSnapshot'),
                            loadSnapshot: new AsyncWaterfallHook('loadGlobalSnapshot'),
                            loadRemoteSnapshot: new AsyncWaterfallHook('loadRemoteSnapshot'),
                            afterLoadSnapshot: new AsyncWaterfallHook('afterLoadSnapshot')
                        });
                        this.manifestLoading = share.Global.__FEDERATION__.__MANIFEST_LOADING__;
                        this.HostInstance = HostInstance;
                        this.loaderHook = HostInstance.loaderHook;
                    }
                }
                class SharedHandler {
                    registerShared(globalOptions, userOptions) {
                        const { shareInfos, shared } = share.formatShareConfigs(globalOptions, userOptions);
                        const sharedKeys = Object.keys(shareInfos);
                        sharedKeys.forEach((sharedKey)=>{
                            const sharedVals = shareInfos[sharedKey];
                            sharedVals.forEach((sharedVal)=>{
                                const registeredShared = share.getRegisteredShare(this.shareScopeMap, sharedKey, sharedVal, this.hooks.lifecycle.resolveShare);
                                if (!registeredShared && sharedVal && sharedVal.lib) this.setShared({
                                    pkgName: sharedKey,
                                    lib: sharedVal.lib,
                                    get: sharedVal.get,
                                    loaded: true,
                                    shared: sharedVal,
                                    from: userOptions.name
                                });
                            });
                        });
                        return {
                            shareInfos,
                            shared
                        };
                    }
                    async loadShare(pkgName, extraOptions) {
                        const { host } = this;
                        const shareInfo = share.getTargetSharedOptions({
                            pkgName,
                            extraOptions,
                            shareInfos: host.options.shared
                        });
                        if (null == shareInfo ? void 0 : shareInfo.scope) await Promise.all(shareInfo.scope.map(async (shareScope)=>{
                            await Promise.all(this.initializeSharing(shareScope, {
                                strategy: shareInfo.strategy
                            }));
                        }));
                        const loadShareRes = await this.hooks.lifecycle.beforeLoadShare.emit({
                            pkgName,
                            shareInfo,
                            shared: host.options.shared,
                            origin: host
                        });
                        const { shareInfo: shareInfoRes } = loadShareRes;
                        share.assert(shareInfoRes, `Cannot find ${pkgName} Share in the ${host.options.name}. Please ensure that the ${pkgName} Share parameters have been injected`);
                        const registeredShared = share.getRegisteredShare(this.shareScopeMap, pkgName, shareInfoRes, this.hooks.lifecycle.resolveShare);
                        const addUseIn = (shared)=>{
                            if (!shared.useIn) shared.useIn = [];
                            share.addUniqueItem(shared.useIn, host.options.name);
                        };
                        if (registeredShared && registeredShared.lib) {
                            addUseIn(registeredShared);
                            return registeredShared.lib;
                        }
                        if (registeredShared && registeredShared.loading && !registeredShared.loaded) {
                            const factory = await registeredShared.loading;
                            registeredShared.loaded = true;
                            if (!registeredShared.lib) registeredShared.lib = factory;
                            addUseIn(registeredShared);
                            return factory;
                        }
                        if (registeredShared) {
                            const asyncLoadProcess = async ()=>{
                                const factory = await registeredShared.get();
                                shareInfoRes.lib = factory;
                                shareInfoRes.loaded = true;
                                addUseIn(shareInfoRes);
                                const gShared = share.getRegisteredShare(this.shareScopeMap, pkgName, shareInfoRes, this.hooks.lifecycle.resolveShare);
                                if (gShared) {
                                    gShared.lib = factory;
                                    gShared.loaded = true;
                                }
                                return factory;
                            };
                            const loading = asyncLoadProcess();
                            this.setShared({
                                pkgName,
                                loaded: false,
                                shared: registeredShared,
                                from: host.options.name,
                                lib: null,
                                loading
                            });
                            return loading;
                        } else {
                            if (null == extraOptions ? void 0 : extraOptions.customShareInfo) return false;
                            const asyncLoadProcess = async ()=>{
                                const factory = await shareInfoRes.get();
                                shareInfoRes.lib = factory;
                                shareInfoRes.loaded = true;
                                addUseIn(shareInfoRes);
                                const gShared = share.getRegisteredShare(this.shareScopeMap, pkgName, shareInfoRes, this.hooks.lifecycle.resolveShare);
                                if (gShared) {
                                    gShared.lib = factory;
                                    gShared.loaded = true;
                                }
                                return factory;
                            };
                            const loading = asyncLoadProcess();
                            this.setShared({
                                pkgName,
                                loaded: false,
                                shared: shareInfoRes,
                                from: host.options.name,
                                lib: null,
                                loading
                            });
                            return loading;
                        }
                    }
                    initializeSharing(shareScopeName = share.DEFAULT_SCOPE, extraOptions) {
                        const { host } = this;
                        const from = null == extraOptions ? void 0 : extraOptions.from;
                        const strategy = null == extraOptions ? void 0 : extraOptions.strategy;
                        let initScope = null == extraOptions ? void 0 : extraOptions.initScope;
                        const promises = [];
                        if ('build' !== from) {
                            const { initTokens } = this;
                            if (!initScope) initScope = [];
                            let initToken = initTokens[shareScopeName];
                            if (!initToken) initToken = initTokens[shareScopeName] = {
                                from: this.host.name
                            };
                            if (initScope.indexOf(initToken) >= 0) return promises;
                            initScope.push(initToken);
                        }
                        const shareScope = this.shareScopeMap;
                        const hostName = host.options.name;
                        if (!shareScope[shareScopeName]) shareScope[shareScopeName] = {};
                        const scope = shareScope[shareScopeName];
                        const register = (name1, shared)=>{
                            var _activeVersion_shareConfig;
                            const { version, eager } = shared;
                            scope[name1] = scope[name1] || {};
                            const versions = scope[name1];
                            const activeVersion = versions[version];
                            const activeVersionEager = Boolean(activeVersion && (activeVersion.eager || (null == (_activeVersion_shareConfig = activeVersion.shareConfig) ? void 0 : _activeVersion_shareConfig.eager)));
                            if (!activeVersion || 'loaded-first' !== activeVersion.strategy && !activeVersion.loaded && (Boolean(!eager) !== !activeVersionEager ? eager : hostName > activeVersion.from)) versions[version] = shared;
                        };
                        const initFn = (mod)=>mod && mod.init && mod.init(shareScope[shareScopeName], initScope);
                        const initRemoteModule = async (key)=>{
                            const { module: module1 } = await host.remoteHandler.getRemoteModuleAndOptions({
                                id: key
                            });
                            if (module1.getEntry) {
                                let remoteEntryExports;
                                try {
                                    remoteEntryExports = await module1.getEntry();
                                } catch (error) {
                                    remoteEntryExports = await host.remoteHandler.hooks.lifecycle.errorLoadRemote.emit({
                                        id: key,
                                        error,
                                        from: 'runtime',
                                        lifecycle: 'beforeLoadShare',
                                        origin: host
                                    });
                                }
                                if (!module1.inited) {
                                    await initFn(remoteEntryExports);
                                    module1.inited = true;
                                }
                            }
                        };
                        Object.keys(host.options.shared).forEach((shareName)=>{
                            const sharedArr = host.options.shared[shareName];
                            sharedArr.forEach((shared)=>{
                                if (shared.scope.includes(shareScopeName)) register(shareName, shared);
                            });
                        });
                        if ('version-first' === host.options.shareStrategy || 'version-first' === strategy) host.options.remotes.forEach((remote)=>{
                            if (remote.shareScope === shareScopeName) promises.push(initRemoteModule(remote.name));
                        });
                        return promises;
                    }
                    loadShareSync(pkgName, extraOptions) {
                        const { host } = this;
                        const shareInfo = share.getTargetSharedOptions({
                            pkgName,
                            extraOptions,
                            shareInfos: host.options.shared
                        });
                        if (null == shareInfo ? void 0 : shareInfo.scope) shareInfo.scope.forEach((shareScope)=>{
                            this.initializeSharing(shareScope, {
                                strategy: shareInfo.strategy
                            });
                        });
                        const registeredShared = share.getRegisteredShare(this.shareScopeMap, pkgName, shareInfo, this.hooks.lifecycle.resolveShare);
                        const addUseIn = (shared)=>{
                            if (!shared.useIn) shared.useIn = [];
                            share.addUniqueItem(shared.useIn, host.options.name);
                        };
                        if (registeredShared) {
                            if ('function' == typeof registeredShared.lib) {
                                addUseIn(registeredShared);
                                if (!registeredShared.loaded) {
                                    registeredShared.loaded = true;
                                    if (registeredShared.from === host.options.name) shareInfo.loaded = true;
                                }
                                return registeredShared.lib;
                            }
                            if ('function' == typeof registeredShared.get) {
                                const module1 = registeredShared.get();
                                if (!(module1 instanceof Promise)) {
                                    addUseIn(registeredShared);
                                    this.setShared({
                                        pkgName,
                                        loaded: true,
                                        from: host.options.name,
                                        lib: module1,
                                        shared: registeredShared
                                    });
                                    return module1;
                                }
                            }
                        }
                        if (shareInfo.lib) {
                            if (!shareInfo.loaded) shareInfo.loaded = true;
                            return shareInfo.lib;
                        }
                        if (shareInfo.get) {
                            const module1 = shareInfo.get();
                            if (module1 instanceof Promise) {
                                const errorCode = (null == extraOptions ? void 0 : extraOptions.from) === 'build' ? errorCodes.RUNTIME_005 : errorCodes.RUNTIME_006;
                                throw new Error(errorCodes.getShortErrorMsg(errorCode, errorCodes.runtimeDescMap, {
                                    hostName: host.options.name,
                                    sharedPkgName: pkgName
                                }));
                            }
                            shareInfo.lib = module1;
                            this.setShared({
                                pkgName,
                                loaded: true,
                                from: host.options.name,
                                lib: shareInfo.lib,
                                shared: shareInfo
                            });
                            return shareInfo.lib;
                        }
                        throw new Error(errorCodes.getShortErrorMsg(errorCodes.RUNTIME_006, errorCodes.runtimeDescMap, {
                            hostName: host.options.name,
                            sharedPkgName: pkgName
                        }));
                    }
                    initShareScopeMap(scopeName, shareScope, extraOptions = {}) {
                        const { host } = this;
                        this.shareScopeMap[scopeName] = shareScope;
                        this.hooks.lifecycle.initContainerShareScopeMap.emit({
                            shareScope,
                            options: host.options,
                            origin: host,
                            scopeName,
                            hostShareScopeMap: extraOptions.hostShareScopeMap
                        });
                    }
                    setShared({ pkgName, shared, from, lib, loading, loaded, get }) {
                        const { version, scope = 'default' } = shared, shareInfo = polyfills._object_without_properties_loose(shared, [
                            "version",
                            "scope"
                        ]);
                        const scopes = Array.isArray(scope) ? scope : [
                            scope
                        ];
                        scopes.forEach((sc)=>{
                            if (!this.shareScopeMap[sc]) this.shareScopeMap[sc] = {};
                            if (!this.shareScopeMap[sc][pkgName]) this.shareScopeMap[sc][pkgName] = {};
                            if (!this.shareScopeMap[sc][pkgName][version]) {
                                this.shareScopeMap[sc][pkgName][version] = polyfills._extends({
                                    version,
                                    scope: [
                                        'default'
                                    ]
                                }, shareInfo, {
                                    lib,
                                    loaded,
                                    loading
                                });
                                if (get) this.shareScopeMap[sc][pkgName][version].get = get;
                                return;
                            }
                            const registeredShared = this.shareScopeMap[sc][pkgName][version];
                            if (loading && !registeredShared.loading) registeredShared.loading = loading;
                        });
                    }
                    _setGlobalShareScopeMap(hostOptions) {
                        const globalShareScopeMap = share.getGlobalShareScope();
                        const identifier = hostOptions.id || hostOptions.name;
                        if (identifier && !globalShareScopeMap[identifier]) globalShareScopeMap[identifier] = this.shareScopeMap;
                    }
                    constructor(host){
                        this.hooks = new PluginSystem({
                            afterResolve: new AsyncWaterfallHook('afterResolve'),
                            beforeLoadShare: new AsyncWaterfallHook('beforeLoadShare'),
                            loadShare: new AsyncHook(),
                            resolveShare: new SyncWaterfallHook('resolveShare'),
                            initContainerShareScopeMap: new SyncWaterfallHook('initContainerShareScopeMap')
                        });
                        this.host = host;
                        this.shareScopeMap = {};
                        this.initTokens = {};
                        this._setGlobalShareScopeMap(host.options);
                    }
                }
                class RemoteHandler {
                    formatAndRegisterRemote(globalOptions, userOptions) {
                        const userRemotes = userOptions.remotes || [];
                        return userRemotes.reduce((res, remote)=>{
                            this.registerRemote(remote, res, {
                                force: false
                            });
                            return res;
                        }, globalOptions.remotes);
                    }
                    setIdToRemoteMap(id, remoteMatchInfo) {
                        const { remote, expose } = remoteMatchInfo;
                        const { name: name1, alias } = remote;
                        this.idToRemoteMap[id] = {
                            name: remote.name,
                            expose
                        };
                        if (alias && id.startsWith(name1)) {
                            const idWithAlias = id.replace(name1, alias);
                            this.idToRemoteMap[idWithAlias] = {
                                name: remote.name,
                                expose
                            };
                            return;
                        }
                        if (alias && id.startsWith(alias)) {
                            const idWithName = id.replace(alias, name1);
                            this.idToRemoteMap[idWithName] = {
                                name: remote.name,
                                expose
                            };
                        }
                    }
                    async loadRemote(id, options) {
                        const { host } = this;
                        try {
                            const { loadFactory = true } = options || {
                                loadFactory: true
                            };
                            const { module: module1, moduleOptions, remoteMatchInfo } = await this.getRemoteModuleAndOptions({
                                id
                            });
                            const { pkgNameOrAlias, remote, expose, id: idRes, remoteSnapshot } = remoteMatchInfo;
                            const moduleOrFactory = await module1.get(idRes, expose, options, remoteSnapshot);
                            const moduleWrapper = await this.hooks.lifecycle.onLoad.emit({
                                id: idRes,
                                pkgNameOrAlias,
                                expose,
                                exposeModule: loadFactory ? moduleOrFactory : void 0,
                                exposeModuleFactory: loadFactory ? void 0 : moduleOrFactory,
                                remote,
                                options: moduleOptions,
                                moduleInstance: module1,
                                origin: host
                            });
                            this.setIdToRemoteMap(id, remoteMatchInfo);
                            if ('function' == typeof moduleWrapper) return moduleWrapper;
                            return moduleOrFactory;
                        } catch (error) {
                            const { from = 'runtime' } = options || {
                                from: 'runtime'
                            };
                            const failOver = await this.hooks.lifecycle.errorLoadRemote.emit({
                                id,
                                error,
                                from,
                                lifecycle: 'onLoad',
                                origin: host
                            });
                            if (!failOver) throw error;
                            return failOver;
                        }
                    }
                    async preloadRemote(preloadOptions) {
                        const { host } = this;
                        await this.hooks.lifecycle.beforePreloadRemote.emit({
                            preloadOps: preloadOptions,
                            options: host.options,
                            origin: host
                        });
                        const preloadOps = formatPreloadArgs(host.options.remotes, preloadOptions);
                        await Promise.all(preloadOps.map(async (ops)=>{
                            const { remote } = ops;
                            const remoteInfo = getRemoteInfo(remote);
                            const { globalSnapshot, remoteSnapshot } = await host.snapshotHandler.loadRemoteSnapshotInfo(remote);
                            const assets = await this.hooks.lifecycle.generatePreloadAssets.emit({
                                origin: host,
                                preloadOptions: ops,
                                remote,
                                remoteInfo,
                                globalSnapshot,
                                remoteSnapshot
                            });
                            if (!assets) return;
                            preloadAssets(remoteInfo, host, assets);
                        }));
                    }
                    registerRemotes(remotes, options) {
                        const { host } = this;
                        remotes.forEach((remote)=>{
                            this.registerRemote(remote, host.options.remotes, {
                                force: null == options ? void 0 : options.force
                            });
                        });
                    }
                    async getRemoteModuleAndOptions(options) {
                        const { host } = this;
                        const { id } = options;
                        let loadRemoteArgs;
                        try {
                            loadRemoteArgs = await this.hooks.lifecycle.beforeRequest.emit({
                                id,
                                options: host.options,
                                origin: host
                            });
                        } catch (error) {
                            loadRemoteArgs = await this.hooks.lifecycle.errorLoadRemote.emit({
                                id,
                                options: host.options,
                                origin: host,
                                from: 'runtime',
                                error,
                                lifecycle: 'beforeRequest'
                            });
                            if (!loadRemoteArgs) throw error;
                        }
                        const { id: idRes } = loadRemoteArgs;
                        const remoteSplitInfo = matchRemoteWithNameAndExpose(host.options.remotes, idRes);
                        share.assert(remoteSplitInfo, errorCodes.getShortErrorMsg(errorCodes.RUNTIME_004, errorCodes.runtimeDescMap, {
                            hostName: host.options.name,
                            requestId: idRes
                        }));
                        const { remote: rawRemote } = remoteSplitInfo;
                        const remoteInfo = getRemoteInfo(rawRemote);
                        const matchInfo = await host.sharedHandler.hooks.lifecycle.afterResolve.emit(polyfills._extends({
                            id: idRes
                        }, remoteSplitInfo, {
                            options: host.options,
                            origin: host,
                            remoteInfo
                        }));
                        const { remote, expose } = matchInfo;
                        share.assert(remote && expose, `The 'beforeRequest' hook was executed, but it failed to return the correct 'remote' and 'expose' values while loading ${idRes}.`);
                        let module1 = host.moduleCache.get(remote.name);
                        const moduleOptions = {
                            host: host,
                            remoteInfo
                        };
                        if (!module1) {
                            module1 = new Module(moduleOptions);
                            host.moduleCache.set(remote.name, module1);
                        }
                        return {
                            module: module1,
                            moduleOptions,
                            remoteMatchInfo: matchInfo
                        };
                    }
                    registerRemote(remote, targetRemotes, options) {
                        const { host } = this;
                        const normalizeRemote = ()=>{
                            if (remote.alias) {
                                const findEqual = targetRemotes.find((item)=>{
                                    var _item_alias;
                                    return remote.alias && (item.name.startsWith(remote.alias) || (null == (_item_alias = item.alias) ? void 0 : _item_alias.startsWith(remote.alias)));
                                });
                                share.assert(!findEqual, `The alias ${remote.alias} of remote ${remote.name} is not allowed to be the prefix of ${findEqual && findEqual.name} name or alias`);
                            }
                            if ('entry' in remote) {
                                if (sdk.isBrowserEnv() && !remote.entry.startsWith('http')) remote.entry = new URL(remote.entry, window.location.origin).href;
                            }
                            if (!remote.shareScope) remote.shareScope = share.DEFAULT_SCOPE;
                            if (!remote.type) remote.type = share.DEFAULT_REMOTE_TYPE;
                        };
                        this.hooks.lifecycle.beforeRegisterRemote.emit({
                            remote,
                            origin: host
                        });
                        const registeredRemote = targetRemotes.find((item)=>item.name === remote.name);
                        if (registeredRemote) {
                            const messages = [
                                `The remote "${remote.name}" is already registered.`,
                                'Please note that overriding it may cause unexpected errors.'
                            ];
                            if (null == options ? void 0 : options.force) {
                                this.removeRemote(registeredRemote);
                                normalizeRemote();
                                targetRemotes.push(remote);
                                this.hooks.lifecycle.registerRemote.emit({
                                    remote,
                                    origin: host
                                });
                                sdk.warn(messages.join(' '));
                            }
                        } else {
                            normalizeRemote();
                            targetRemotes.push(remote);
                            this.hooks.lifecycle.registerRemote.emit({
                                remote,
                                origin: host
                            });
                        }
                    }
                    removeRemote(remote) {
                        try {
                            const { host } = this;
                            const { name: name1 } = remote;
                            const remoteIndex = host.options.remotes.findIndex((item)=>item.name === name1);
                            if (-1 !== remoteIndex) host.options.remotes.splice(remoteIndex, 1);
                            const loadedModule = host.moduleCache.get(remote.name);
                            if (loadedModule) {
                                const remoteInfo = loadedModule.remoteInfo;
                                const key = remoteInfo.entryGlobalName;
                                if (share.CurrentGlobal[key]) {
                                    var _Object_getOwnPropertyDescriptor;
                                    if (null == (_Object_getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor(share.CurrentGlobal, key)) ? void 0 : _Object_getOwnPropertyDescriptor.configurable) delete share.CurrentGlobal[key];
                                    else share.CurrentGlobal[key] = void 0;
                                }
                                const remoteEntryUniqueKey = getRemoteEntryUniqueKey(loadedModule.remoteInfo);
                                if (share.globalLoading[remoteEntryUniqueKey]) delete share.globalLoading[remoteEntryUniqueKey];
                                host.snapshotHandler.manifestCache.delete(remoteInfo.entry);
                                let remoteInsId = remoteInfo.buildVersion ? sdk.composeKeyWithSeparator(remoteInfo.name, remoteInfo.buildVersion) : remoteInfo.name;
                                const remoteInsIndex = share.CurrentGlobal.__FEDERATION__.__INSTANCES__.findIndex((ins)=>{
                                    if (remoteInfo.buildVersion) return ins.options.id === remoteInsId;
                                    return ins.name === remoteInsId;
                                });
                                if (-1 !== remoteInsIndex) {
                                    const remoteIns = share.CurrentGlobal.__FEDERATION__.__INSTANCES__[remoteInsIndex];
                                    remoteInsId = remoteIns.options.id || remoteInsId;
                                    const globalShareScopeMap = share.getGlobalShareScope();
                                    let isAllSharedNotUsed = true;
                                    const needDeleteKeys = [];
                                    Object.keys(globalShareScopeMap).forEach((instId)=>{
                                        const shareScopeMap = globalShareScopeMap[instId];
                                        shareScopeMap && Object.keys(shareScopeMap).forEach((shareScope)=>{
                                            const shareScopeVal = shareScopeMap[shareScope];
                                            shareScopeVal && Object.keys(shareScopeVal).forEach((shareName)=>{
                                                const sharedPkgs = shareScopeVal[shareName];
                                                sharedPkgs && Object.keys(sharedPkgs).forEach((shareVersion)=>{
                                                    const shared = sharedPkgs[shareVersion];
                                                    if (shared && 'object' == typeof shared && shared.from === remoteInfo.name) {
                                                        if (shared.loaded || shared.loading) {
                                                            shared.useIn = shared.useIn.filter((usedHostName)=>usedHostName !== remoteInfo.name);
                                                            if (shared.useIn.length) isAllSharedNotUsed = false;
                                                            else needDeleteKeys.push([
                                                                instId,
                                                                shareScope,
                                                                shareName,
                                                                shareVersion
                                                            ]);
                                                        } else needDeleteKeys.push([
                                                            instId,
                                                            shareScope,
                                                            shareName,
                                                            shareVersion
                                                        ]);
                                                    }
                                                });
                                            });
                                        });
                                    });
                                    if (isAllSharedNotUsed) {
                                        remoteIns.shareScopeMap = {};
                                        delete globalShareScopeMap[remoteInsId];
                                    }
                                    needDeleteKeys.forEach(([insId, shareScope, shareName, shareVersion])=>{
                                        var _globalShareScopeMap_insId_shareScope_shareName, _globalShareScopeMap_insId_shareScope, _globalShareScopeMap_insId;
                                        null == (_globalShareScopeMap_insId = globalShareScopeMap[insId]) || null == (_globalShareScopeMap_insId_shareScope = _globalShareScopeMap_insId[shareScope]) || null == (_globalShareScopeMap_insId_shareScope_shareName = _globalShareScopeMap_insId_shareScope[shareName]) || delete _globalShareScopeMap_insId_shareScope_shareName[shareVersion];
                                    });
                                    share.CurrentGlobal.__FEDERATION__.__INSTANCES__.splice(remoteInsIndex, 1);
                                }
                                const { hostGlobalSnapshot } = getGlobalRemoteInfo(remote, host);
                                if (hostGlobalSnapshot) {
                                    const remoteKey = hostGlobalSnapshot && 'remotesInfo' in hostGlobalSnapshot && hostGlobalSnapshot.remotesInfo && share.getInfoWithoutType(hostGlobalSnapshot.remotesInfo, remote.name).key;
                                    if (remoteKey) {
                                        delete hostGlobalSnapshot.remotesInfo[remoteKey];
                                        if (Boolean(share.Global.__FEDERATION__.__MANIFEST_LOADING__[remoteKey])) delete share.Global.__FEDERATION__.__MANIFEST_LOADING__[remoteKey];
                                    }
                                }
                                host.moduleCache.delete(remote.name);
                            }
                        } catch (err) {
                            share.logger.log('removeRemote fail: ', err);
                        }
                    }
                    constructor(host){
                        this.hooks = new PluginSystem({
                            beforeRegisterRemote: new SyncWaterfallHook('beforeRegisterRemote'),
                            registerRemote: new SyncWaterfallHook('registerRemote'),
                            beforeRequest: new AsyncWaterfallHook('beforeRequest'),
                            onLoad: new AsyncHook('onLoad'),
                            handlePreloadModule: new SyncHook('handlePreloadModule'),
                            errorLoadRemote: new AsyncHook('errorLoadRemote'),
                            beforePreloadRemote: new AsyncHook('beforePreloadRemote'),
                            generatePreloadAssets: new AsyncHook('generatePreloadAssets'),
                            afterPreloadRemote: new AsyncHook(),
                            loadEntry: new AsyncHook()
                        });
                        this.host = host;
                        this.idToRemoteMap = {};
                    }
                }
                class FederationHost {
                    initOptions(userOptions) {
                        this.registerPlugins(userOptions.plugins);
                        const options = this.formatOptions(this.options, userOptions);
                        this.options = options;
                        return options;
                    }
                    async loadShare(pkgName, extraOptions) {
                        return this.sharedHandler.loadShare(pkgName, extraOptions);
                    }
                    loadShareSync(pkgName, extraOptions) {
                        return this.sharedHandler.loadShareSync(pkgName, extraOptions);
                    }
                    initializeSharing(shareScopeName = share.DEFAULT_SCOPE, extraOptions) {
                        return this.sharedHandler.initializeSharing(shareScopeName, extraOptions);
                    }
                    initRawContainer(name1, url, container) {
                        const remoteInfo = getRemoteInfo({
                            name: name1,
                            entry: url
                        });
                        const module1 = new Module({
                            host: this,
                            remoteInfo
                        });
                        module1.remoteEntryExports = container;
                        this.moduleCache.set(name1, module1);
                        return module1;
                    }
                    async loadRemote(id, options) {
                        return this.remoteHandler.loadRemote(id, options);
                    }
                    async preloadRemote(preloadOptions) {
                        return this.remoteHandler.preloadRemote(preloadOptions);
                    }
                    initShareScopeMap(scopeName, shareScope, extraOptions = {}) {
                        this.sharedHandler.initShareScopeMap(scopeName, shareScope, extraOptions);
                    }
                    formatOptions(globalOptions, userOptions) {
                        const { shared } = share.formatShareConfigs(globalOptions, userOptions);
                        const { userOptions: userOptionsRes, options: globalOptionsRes } = this.hooks.lifecycle.beforeInit.emit({
                            origin: this,
                            userOptions,
                            options: globalOptions,
                            shareInfo: shared
                        });
                        const remotes = this.remoteHandler.formatAndRegisterRemote(globalOptionsRes, userOptionsRes);
                        const { shared: handledShared } = this.sharedHandler.registerShared(globalOptionsRes, userOptionsRes);
                        const plugins = [
                            ...globalOptionsRes.plugins
                        ];
                        if (userOptionsRes.plugins) userOptionsRes.plugins.forEach((plugin)=>{
                            if (!plugins.includes(plugin)) plugins.push(plugin);
                        });
                        const optionsRes = polyfills._extends({}, globalOptions, userOptions, {
                            plugins,
                            remotes,
                            shared: handledShared
                        });
                        this.hooks.lifecycle.init.emit({
                            origin: this,
                            options: optionsRes
                        });
                        return optionsRes;
                    }
                    registerPlugins(plugins) {
                        const pluginRes = registerPlugins$1(plugins, [
                            this.hooks,
                            this.remoteHandler.hooks,
                            this.sharedHandler.hooks,
                            this.snapshotHandler.hooks,
                            this.loaderHook,
                            this.bridgeHook
                        ]);
                        this.options.plugins = this.options.plugins.reduce((res, plugin)=>{
                            if (!plugin) return res;
                            if (res && !res.find((item)=>item.name === plugin.name)) res.push(plugin);
                            return res;
                        }, pluginRes || []);
                    }
                    registerRemotes(remotes, options) {
                        return this.remoteHandler.registerRemotes(remotes, options);
                    }
                    constructor(userOptions){
                        this.hooks = new PluginSystem({
                            beforeInit: new SyncWaterfallHook('beforeInit'),
                            init: new SyncHook(),
                            beforeInitContainer: new AsyncWaterfallHook('beforeInitContainer'),
                            initContainer: new AsyncWaterfallHook('initContainer')
                        });
                        this.version = "0.8.5";
                        this.moduleCache = new Map();
                        this.loaderHook = new PluginSystem({
                            getModuleInfo: new SyncHook(),
                            createScript: new SyncHook(),
                            createLink: new SyncHook(),
                            fetch: new AsyncHook(),
                            loadEntryError: new AsyncHook(),
                            getModuleFactory: new AsyncHook()
                        });
                        this.bridgeHook = new PluginSystem({
                            beforeBridgeRender: new SyncHook(),
                            afterBridgeRender: new SyncHook(),
                            beforeBridgeDestroy: new SyncHook(),
                            afterBridgeDestroy: new SyncHook()
                        });
                        const defaultOptions = {
                            id: share.getBuilderId(),
                            name: userOptions.name,
                            plugins: [
                                snapshotPlugin(),
                                generatePreloadAssetsPlugin()
                            ],
                            remotes: [],
                            shared: {},
                            inBrowser: sdk.isBrowserEnv()
                        };
                        this.name = userOptions.name;
                        this.options = defaultOptions;
                        this.snapshotHandler = new SnapshotHandler(this);
                        this.sharedHandler = new SharedHandler(this);
                        this.remoteHandler = new RemoteHandler(this);
                        this.shareScopeMap = this.sharedHandler.shareScopeMap;
                        this.registerPlugins([
                            ...defaultOptions.plugins,
                            ...userOptions.plugins || []
                        ]);
                        this.options = this.formatOptions(defaultOptions, userOptions);
                    }
                }
                let FederationInstance = null;
                function init(options) {
                    const instance = share.getGlobalFederationInstance(options.name, options.version);
                    if (instance) {
                        instance.initOptions(options);
                        if (!FederationInstance) FederationInstance = instance;
                        return instance;
                    }
                    {
                        const FederationConstructor = share.getGlobalFederationConstructor() || FederationHost;
                        FederationInstance = new FederationConstructor(options);
                        share.setGlobalFederationInstance(FederationInstance);
                        return FederationInstance;
                    }
                }
                function loadRemote(...args) {
                    share.assert(FederationInstance, 'Please call init first');
                    const loadRemote1 = FederationInstance.loadRemote;
                    return loadRemote1.apply(FederationInstance, args);
                }
                function loadShare(...args) {
                    share.assert(FederationInstance, 'Please call init first');
                    const loadShare1 = FederationInstance.loadShare;
                    return loadShare1.apply(FederationInstance, args);
                }
                function loadShareSync(...args) {
                    share.assert(FederationInstance, 'Please call init first');
                    const loadShareSync1 = FederationInstance.loadShareSync;
                    return loadShareSync1.apply(FederationInstance, args);
                }
                function preloadRemote(...args) {
                    share.assert(FederationInstance, 'Please call init first');
                    return FederationInstance.preloadRemote.apply(FederationInstance, args);
                }
                function registerRemotes(...args) {
                    share.assert(FederationInstance, 'Please call init first');
                    return FederationInstance.registerRemotes.apply(FederationInstance, args);
                }
                function registerPlugins(...args) {
                    share.assert(FederationInstance, 'Please call init first');
                    return FederationInstance.registerPlugins.apply(FederationInstance, args);
                }
                function getInstance() {
                    return FederationInstance;
                }
                share.setGlobalFederationConstructor(FederationHost);
                Object.defineProperty(exports1, "loadScript", {
                    enumerable: true,
                    get: function() {
                        return sdk.loadScript;
                    }
                });
                Object.defineProperty(exports1, "loadScriptNode", {
                    enumerable: true,
                    get: function() {
                        return sdk.loadScriptNode;
                    }
                });
                exports1.registerGlobalPlugins = share.registerGlobalPlugins;
                exports1.FederationHost = FederationHost;
                exports1.Module = Module;
                exports1.getInstance = getInstance;
                exports1.getRemoteEntry = getRemoteEntry;
                exports1.getRemoteInfo = getRemoteInfo;
                exports1.init = init;
                exports1.loadRemote = loadRemote;
                exports1.loadShare = loadShare;
                exports1.loadShareSync = loadShareSync;
                exports1.preloadRemote = preloadRemote;
                exports1.registerPlugins = registerPlugins;
                exports1.registerRemotes = registerRemotes;
            },
            "./node_modules/.pnpm/@module-federation+runtime@0.8.5/node_modules/@module-federation/runtime/dist/polyfills.cjs.js": function(__unused_webpack_module, exports1) {
                function _extends() {
                    _extends = Object.assign || function(target) {
                        for(var i = 1; i < arguments.length; i++){
                            var source = arguments[i];
                            for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
                        }
                        return target;
                    };
                    return _extends.apply(this, arguments);
                }
                function _object_without_properties_loose(source, excluded) {
                    if (null == source) return {};
                    var target = {};
                    var sourceKeys = Object.keys(source);
                    var key, i;
                    for(i = 0; i < sourceKeys.length; i++){
                        key = sourceKeys[i];
                        if (!(excluded.indexOf(key) >= 0)) target[key] = source[key];
                    }
                    return target;
                }
                exports1._extends = _extends;
                exports1._object_without_properties_loose = _object_without_properties_loose;
            },
            "./node_modules/.pnpm/@module-federation+runtime@0.8.5/node_modules/@module-federation/runtime/dist/share.cjs.js": function(__unused_webpack_module, exports1, __webpack_require__) {
                var polyfills = __webpack_require__("./node_modules/.pnpm/@module-federation+runtime@0.8.5/node_modules/@module-federation/runtime/dist/polyfills.cjs.js");
                var sdk = __webpack_require__("./node_modules/.pnpm/@module-federation+sdk@0.8.5/node_modules/@module-federation/sdk/dist/index.cjs.js");
                function getBuilderId() {
                    return 'undefined' != typeof FEDERATION_BUILD_IDENTIFIER ? FEDERATION_BUILD_IDENTIFIER : '';
                }
                const LOG_CATEGORY = '[ Federation Runtime ]';
                const logger = sdk.createLogger(LOG_CATEGORY);
                function assert(condition, msg) {
                    if (!condition) error(msg);
                }
                function error(msg) {
                    if (msg instanceof Error) {
                        msg.message = `${LOG_CATEGORY}: ${msg.message}`;
                        throw msg;
                    }
                    throw new Error(`${LOG_CATEGORY}: ${msg}`);
                }
                function warn(msg) {
                    if (msg instanceof Error) {
                        msg.message = `${LOG_CATEGORY}: ${msg.message}`;
                        logger.warn(msg);
                    } else logger.warn(msg);
                }
                function addUniqueItem(arr, item) {
                    if (-1 === arr.findIndex((name1)=>name1 === item)) arr.push(item);
                    return arr;
                }
                function getFMId(remoteInfo) {
                    if ('version' in remoteInfo && remoteInfo.version) return `${remoteInfo.name}:${remoteInfo.version}`;
                    if ('entry' in remoteInfo && remoteInfo.entry) return `${remoteInfo.name}:${remoteInfo.entry}`;
                    return `${remoteInfo.name}`;
                }
                function isRemoteInfoWithEntry(remote) {
                    return void 0 !== remote.entry;
                }
                function isPureRemoteEntry(remote) {
                    return !remote.entry.includes('.json') && remote.entry.includes('.js');
                }
                function isObject(val) {
                    return val && 'object' == typeof val;
                }
                const objectToString = Object.prototype.toString;
                function isPlainObject(val) {
                    return '[object Object]' === objectToString.call(val);
                }
                function arrayOptions(options) {
                    return Array.isArray(options) ? options : [
                        options
                    ];
                }
                function getRemoteEntryInfoFromSnapshot(snapshot) {
                    const defaultRemoteEntryInfo = {
                        url: '',
                        type: 'global',
                        globalName: ''
                    };
                    if (sdk.isBrowserEnv()) return 'remoteEntry' in snapshot ? {
                        url: snapshot.remoteEntry,
                        type: snapshot.remoteEntryType,
                        globalName: snapshot.globalName
                    } : defaultRemoteEntryInfo;
                    if ('ssrRemoteEntry' in snapshot) return {
                        url: snapshot.ssrRemoteEntry || defaultRemoteEntryInfo.url,
                        type: snapshot.ssrRemoteEntryType || defaultRemoteEntryInfo.type,
                        globalName: snapshot.globalName
                    };
                    return defaultRemoteEntryInfo;
                }
                const processModuleAlias = (name1, subPath)=>{
                    let moduleName;
                    moduleName = name1.endsWith('/') ? name1.slice(0, -1) : name1;
                    if (subPath.startsWith('.')) subPath = subPath.slice(1);
                    moduleName += subPath;
                    return moduleName;
                };
                const CurrentGlobal = 'object' == typeof globalThis ? globalThis : window;
                const nativeGlobal = (()=>{
                    try {
                        return document.defaultView;
                    } catch (e) {
                        return CurrentGlobal;
                    }
                })();
                const Global = nativeGlobal;
                function definePropertyGlobalVal(target, key, val) {
                    Object.defineProperty(target, key, {
                        value: val,
                        configurable: false,
                        writable: true
                    });
                }
                function includeOwnProperty(target, key) {
                    return Object.hasOwnProperty.call(target, key);
                }
                if (!includeOwnProperty(CurrentGlobal, '__GLOBAL_LOADING_REMOTE_ENTRY__')) definePropertyGlobalVal(CurrentGlobal, '__GLOBAL_LOADING_REMOTE_ENTRY__', {});
                const globalLoading = CurrentGlobal.__GLOBAL_LOADING_REMOTE_ENTRY__;
                function setGlobalDefaultVal(target) {
                    var _target___FEDERATION__, _target___FEDERATION__1, _target___FEDERATION__2, _target___FEDERATION__3, _target___FEDERATION__4, _target___FEDERATION__5;
                    if (includeOwnProperty(target, '__VMOK__') && !includeOwnProperty(target, '__FEDERATION__')) definePropertyGlobalVal(target, '__FEDERATION__', target.__VMOK__);
                    if (!includeOwnProperty(target, '__FEDERATION__')) {
                        definePropertyGlobalVal(target, '__FEDERATION__', {
                            __GLOBAL_PLUGIN__: [],
                            __INSTANCES__: [],
                            moduleInfo: {},
                            __SHARE__: {},
                            __MANIFEST_LOADING__: {},
                            __PRELOADED_MAP__: new Map()
                        });
                        definePropertyGlobalVal(target, '__VMOK__', target.__FEDERATION__);
                    }
                    var ___GLOBAL_PLUGIN__;
                    null != (___GLOBAL_PLUGIN__ = (_target___FEDERATION__ = target.__FEDERATION__).__GLOBAL_PLUGIN__) || (_target___FEDERATION__.__GLOBAL_PLUGIN__ = []);
                    var ___INSTANCES__;
                    null != (___INSTANCES__ = (_target___FEDERATION__1 = target.__FEDERATION__).__INSTANCES__) || (_target___FEDERATION__1.__INSTANCES__ = []);
                    var _moduleInfo;
                    null != (_moduleInfo = (_target___FEDERATION__2 = target.__FEDERATION__).moduleInfo) || (_target___FEDERATION__2.moduleInfo = {});
                    var ___SHARE__;
                    null != (___SHARE__ = (_target___FEDERATION__3 = target.__FEDERATION__).__SHARE__) || (_target___FEDERATION__3.__SHARE__ = {});
                    var ___MANIFEST_LOADING__;
                    null != (___MANIFEST_LOADING__ = (_target___FEDERATION__4 = target.__FEDERATION__).__MANIFEST_LOADING__) || (_target___FEDERATION__4.__MANIFEST_LOADING__ = {});
                    var ___PRELOADED_MAP__;
                    null != (___PRELOADED_MAP__ = (_target___FEDERATION__5 = target.__FEDERATION__).__PRELOADED_MAP__) || (_target___FEDERATION__5.__PRELOADED_MAP__ = new Map());
                }
                setGlobalDefaultVal(CurrentGlobal);
                setGlobalDefaultVal(nativeGlobal);
                function resetFederationGlobalInfo() {
                    CurrentGlobal.__FEDERATION__.__GLOBAL_PLUGIN__ = [];
                    CurrentGlobal.__FEDERATION__.__INSTANCES__ = [];
                    CurrentGlobal.__FEDERATION__.moduleInfo = {};
                    CurrentGlobal.__FEDERATION__.__SHARE__ = {};
                    CurrentGlobal.__FEDERATION__.__MANIFEST_LOADING__ = {};
                    Object.keys(globalLoading).forEach((key)=>{
                        delete globalLoading[key];
                    });
                }
                function getGlobalFederationInstance(name1, version) {
                    const buildId = getBuilderId();
                    return CurrentGlobal.__FEDERATION__.__INSTANCES__.find((GMInstance)=>{
                        if (buildId && GMInstance.options.id === getBuilderId()) return true;
                        if (GMInstance.options.name === name1 && !GMInstance.options.version && !version) return true;
                        if (GMInstance.options.name === name1 && version && GMInstance.options.version === version) return true;
                        return false;
                    });
                }
                function setGlobalFederationInstance(FederationInstance) {
                    CurrentGlobal.__FEDERATION__.__INSTANCES__.push(FederationInstance);
                }
                function getGlobalFederationConstructor() {
                    return CurrentGlobal.__FEDERATION__.__DEBUG_CONSTRUCTOR__;
                }
                function setGlobalFederationConstructor(FederationConstructor, isDebug = sdk.isDebugMode()) {
                    if (isDebug) {
                        CurrentGlobal.__FEDERATION__.__DEBUG_CONSTRUCTOR__ = FederationConstructor;
                        CurrentGlobal.__FEDERATION__.__DEBUG_CONSTRUCTOR_VERSION__ = "0.8.5";
                    }
                }
                function getInfoWithoutType(target, key) {
                    if ('string' == typeof key) {
                        const keyRes = target[key];
                        if (keyRes) return {
                            value: target[key],
                            key: key
                        };
                        {
                            const targetKeys = Object.keys(target);
                            for (const targetKey of targetKeys){
                                const [targetTypeOrName, _] = targetKey.split(':');
                                const nKey = `${targetTypeOrName}:${key}`;
                                const typeWithKeyRes = target[nKey];
                                if (typeWithKeyRes) return {
                                    value: typeWithKeyRes,
                                    key: nKey
                                };
                            }
                            return {
                                value: void 0,
                                key: key
                            };
                        }
                    }
                    throw new Error('key must be string');
                }
                const getGlobalSnapshot = ()=>nativeGlobal.__FEDERATION__.moduleInfo;
                const getTargetSnapshotInfoByModuleInfo = (moduleInfo, snapshot)=>{
                    const moduleKey = getFMId(moduleInfo);
                    const getModuleInfo = getInfoWithoutType(snapshot, moduleKey).value;
                    if (getModuleInfo && !getModuleInfo.version && 'version' in moduleInfo && moduleInfo['version']) getModuleInfo.version = moduleInfo['version'];
                    if (getModuleInfo) return getModuleInfo;
                    if ('version' in moduleInfo && moduleInfo['version']) {
                        const { version } = moduleInfo, resModuleInfo = polyfills._object_without_properties_loose(moduleInfo, [
                            "version"
                        ]);
                        const moduleKeyWithoutVersion = getFMId(resModuleInfo);
                        const getModuleInfoWithoutVersion = getInfoWithoutType(nativeGlobal.__FEDERATION__.moduleInfo, moduleKeyWithoutVersion).value;
                        if ((null == getModuleInfoWithoutVersion ? void 0 : getModuleInfoWithoutVersion.version) === version) return getModuleInfoWithoutVersion;
                    }
                };
                const getGlobalSnapshotInfoByModuleInfo = (moduleInfo)=>getTargetSnapshotInfoByModuleInfo(moduleInfo, nativeGlobal.__FEDERATION__.moduleInfo);
                const setGlobalSnapshotInfoByModuleInfo = (remoteInfo, moduleDetailInfo)=>{
                    const moduleKey = getFMId(remoteInfo);
                    nativeGlobal.__FEDERATION__.moduleInfo[moduleKey] = moduleDetailInfo;
                    return nativeGlobal.__FEDERATION__.moduleInfo;
                };
                const addGlobalSnapshot = (moduleInfos)=>{
                    nativeGlobal.__FEDERATION__.moduleInfo = polyfills._extends({}, nativeGlobal.__FEDERATION__.moduleInfo, moduleInfos);
                    return ()=>{
                        const keys = Object.keys(moduleInfos);
                        for (const key of keys)delete nativeGlobal.__FEDERATION__.moduleInfo[key];
                    };
                };
                const getRemoteEntryExports = (name1, globalName)=>{
                    const remoteEntryKey = globalName || `__FEDERATION_${name1}:custom__`;
                    const entryExports = CurrentGlobal[remoteEntryKey];
                    return {
                        remoteEntryKey,
                        entryExports
                    };
                };
                const registerGlobalPlugins = (plugins)=>{
                    const { __GLOBAL_PLUGIN__ } = nativeGlobal.__FEDERATION__;
                    plugins.forEach((plugin)=>{
                        if (-1 === __GLOBAL_PLUGIN__.findIndex((p)=>p.name === plugin.name)) __GLOBAL_PLUGIN__.push(plugin);
                        else warn(`The plugin ${plugin.name} has been registered.`);
                    });
                };
                const getGlobalHostPlugins = ()=>nativeGlobal.__FEDERATION__.__GLOBAL_PLUGIN__;
                const getPreloaded = (id)=>CurrentGlobal.__FEDERATION__.__PRELOADED_MAP__.get(id);
                const setPreloaded = (id)=>CurrentGlobal.__FEDERATION__.__PRELOADED_MAP__.set(id, true);
                const DEFAULT_SCOPE = 'default';
                const DEFAULT_REMOTE_TYPE = 'global';
                const buildIdentifier = '[0-9A-Za-z-]+';
                const build = `(?:\\+(${buildIdentifier}(?:\\.${buildIdentifier})*))`;
                const numericIdentifier = '0|[1-9]\\d*';
                const numericIdentifierLoose = '[0-9]+';
                const nonNumericIdentifier = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';
                const preReleaseIdentifierLoose = `(?:${numericIdentifierLoose}|${nonNumericIdentifier})`;
                const preReleaseLoose = `(?:-?(${preReleaseIdentifierLoose}(?:\\.${preReleaseIdentifierLoose})*))`;
                const preReleaseIdentifier = `(?:${numericIdentifier}|${nonNumericIdentifier})`;
                const preRelease = `(?:-(${preReleaseIdentifier}(?:\\.${preReleaseIdentifier})*))`;
                const xRangeIdentifier = `${numericIdentifier}|x|X|\\*`;
                const xRangePlain = `[v=\\s]*(${xRangeIdentifier})(?:\\.(${xRangeIdentifier})(?:\\.(${xRangeIdentifier})(?:${preRelease})?${build}?)?)?`;
                const hyphenRange = `^\\s*(${xRangePlain})\\s+-\\s+(${xRangePlain})\\s*$`;
                const mainVersionLoose = `(${numericIdentifierLoose})\\.(${numericIdentifierLoose})\\.(${numericIdentifierLoose})`;
                const loosePlain = `[v=\\s]*${mainVersionLoose}${preReleaseLoose}?${build}?`;
                const gtlt = '((?:<|>)?=?)';
                const comparatorTrim = `(\\s*)${gtlt}\\s*(${loosePlain}|${xRangePlain})`;
                const loneTilde = '(?:~>?)';
                const tildeTrim = `(\\s*)${loneTilde}\\s+`;
                const loneCaret = '(?:\\^)';
                const caretTrim = `(\\s*)${loneCaret}\\s+`;
                const star = '(<|>)?=?\\s*\\*';
                const caret = `^${loneCaret}${xRangePlain}$`;
                const mainVersion = `(${numericIdentifier})\\.(${numericIdentifier})\\.(${numericIdentifier})`;
                const fullPlain = `v?${mainVersion}${preRelease}?${build}?`;
                const tilde = `^${loneTilde}${xRangePlain}$`;
                const xRange = `^${gtlt}\\s*${xRangePlain}$`;
                const comparator = `^${gtlt}\\s*(${fullPlain})$|^$`;
                const gte0 = '^\\s*>=\\s*0.0.0\\s*$';
                function parseRegex(source) {
                    return new RegExp(source);
                }
                function isXVersion(version) {
                    return !version || 'x' === version.toLowerCase() || '*' === version;
                }
                function pipe(...fns) {
                    return (x)=>fns.reduce((v, f)=>f(v), x);
                }
                function extractComparator(comparatorString) {
                    return comparatorString.match(parseRegex(comparator));
                }
                function combineVersion(major, minor, patch, preRelease) {
                    const mainVersion = `${major}.${minor}.${patch}`;
                    if (preRelease) return `${mainVersion}-${preRelease}`;
                    return mainVersion;
                }
                function parseHyphen(range) {
                    return range.replace(parseRegex(hyphenRange), (_range, from, fromMajor, fromMinor, fromPatch, _fromPreRelease, _fromBuild, to, toMajor, toMinor, toPatch, toPreRelease)=>{
                        from = isXVersion(fromMajor) ? '' : isXVersion(fromMinor) ? `>=${fromMajor}.0.0` : isXVersion(fromPatch) ? `>=${fromMajor}.${fromMinor}.0` : `>=${from}`;
                        to = isXVersion(toMajor) ? '' : isXVersion(toMinor) ? `<${Number(toMajor) + 1}.0.0-0` : isXVersion(toPatch) ? `<${toMajor}.${Number(toMinor) + 1}.0-0` : toPreRelease ? `<=${toMajor}.${toMinor}.${toPatch}-${toPreRelease}` : `<=${to}`;
                        return `${from} ${to}`.trim();
                    });
                }
                function parseComparatorTrim(range) {
                    return range.replace(parseRegex(comparatorTrim), '$1$2$3');
                }
                function parseTildeTrim(range) {
                    return range.replace(parseRegex(tildeTrim), '$1~');
                }
                function parseCaretTrim(range) {
                    return range.replace(parseRegex(caretTrim), '$1^');
                }
                function parseCarets(range) {
                    return range.trim().split(/\s+/).map((rangeVersion)=>rangeVersion.replace(parseRegex(caret), (_, major, minor, patch, preRelease)=>{
                            if (isXVersion(major)) return '';
                            if (isXVersion(minor)) return `>=${major}.0.0 <${Number(major) + 1}.0.0-0`;
                            if (isXVersion(patch)) {
                                if ('0' === major) return `>=${major}.${minor}.0 <${major}.${Number(minor) + 1}.0-0`;
                                return `>=${major}.${minor}.0 <${Number(major) + 1}.0.0-0`;
                            } else if (preRelease) {
                                if ('0' !== major) return `>=${major}.${minor}.${patch}-${preRelease} <${Number(major) + 1}.0.0-0`;
                                if ('0' === minor) return `>=${major}.${minor}.${patch}-${preRelease} <${major}.${minor}.${Number(patch) + 1}-0`;
                                return `>=${major}.${minor}.${patch}-${preRelease} <${major}.${Number(minor) + 1}.0-0`;
                            } else {
                                if ('0' === major) {
                                    if ('0' === minor) return `>=${major}.${minor}.${patch} <${major}.${minor}.${Number(patch) + 1}-0`;
                                    return `>=${major}.${minor}.${patch} <${major}.${Number(minor) + 1}.0-0`;
                                }
                                return `>=${major}.${minor}.${patch} <${Number(major) + 1}.0.0-0`;
                            }
                        })).join(' ');
                }
                function parseTildes(range) {
                    return range.trim().split(/\s+/).map((rangeVersion)=>rangeVersion.replace(parseRegex(tilde), (_, major, minor, patch, preRelease)=>{
                            if (isXVersion(major)) return '';
                            if (isXVersion(minor)) return `>=${major}.0.0 <${Number(major) + 1}.0.0-0`;
                            if (isXVersion(patch)) return `>=${major}.${minor}.0 <${major}.${Number(minor) + 1}.0-0`;
                            else if (preRelease) return `>=${major}.${minor}.${patch}-${preRelease} <${major}.${Number(minor) + 1}.0-0`;
                            return `>=${major}.${minor}.${patch} <${major}.${Number(minor) + 1}.0-0`;
                        })).join(' ');
                }
                function parseXRanges(range) {
                    return range.split(/\s+/).map((rangeVersion)=>rangeVersion.trim().replace(parseRegex(xRange), (ret, gtlt, major, minor, patch, preRelease)=>{
                            const isXMajor = isXVersion(major);
                            const isXMinor = isXMajor || isXVersion(minor);
                            const isXPatch = isXMinor || isXVersion(patch);
                            if ('=' === gtlt && isXPatch) gtlt = '';
                            preRelease = '';
                            if (isXMajor) {
                                if ('>' === gtlt || '<' === gtlt) return '<0.0.0-0';
                                return '*';
                            }
                            if (gtlt && isXPatch) {
                                if (isXMinor) minor = 0;
                                patch = 0;
                                if ('>' === gtlt) {
                                    gtlt = '>=';
                                    if (isXMinor) {
                                        major = Number(major) + 1;
                                        minor = 0;
                                        patch = 0;
                                    } else {
                                        minor = Number(minor) + 1;
                                        patch = 0;
                                    }
                                } else if ('<=' === gtlt) {
                                    gtlt = '<';
                                    if (isXMinor) major = Number(major) + 1;
                                    else minor = Number(minor) + 1;
                                }
                                if ('<' === gtlt) preRelease = '-0';
                                return `${gtlt + major}.${minor}.${patch}${preRelease}`;
                            }
                            if (isXMinor) return `>=${major}.0.0${preRelease} <${Number(major) + 1}.0.0-0`;
                            else if (isXPatch) return `>=${major}.${minor}.0${preRelease} <${major}.${Number(minor) + 1}.0-0`;
                            return ret;
                        })).join(' ');
                }
                function parseStar(range) {
                    return range.trim().replace(parseRegex(star), '');
                }
                function parseGTE0(comparatorString) {
                    return comparatorString.trim().replace(parseRegex(gte0), '');
                }
                function compareAtom(rangeAtom, versionAtom) {
                    rangeAtom = Number(rangeAtom) || rangeAtom;
                    versionAtom = Number(versionAtom) || versionAtom;
                    if (rangeAtom > versionAtom) return 1;
                    if (rangeAtom === versionAtom) return 0;
                    return -1;
                }
                function comparePreRelease(rangeAtom, versionAtom) {
                    const { preRelease: rangePreRelease } = rangeAtom;
                    const { preRelease: versionPreRelease } = versionAtom;
                    if (void 0 === rangePreRelease && Boolean(versionPreRelease)) return 1;
                    if (Boolean(rangePreRelease) && void 0 === versionPreRelease) return -1;
                    if (void 0 === rangePreRelease && void 0 === versionPreRelease) return 0;
                    for(let i = 0, n = rangePreRelease.length; i <= n; i++){
                        const rangeElement = rangePreRelease[i];
                        const versionElement = versionPreRelease[i];
                        if (rangeElement !== versionElement) {
                            if (void 0 === rangeElement && void 0 === versionElement) break;
                            if (!rangeElement) return 1;
                            if (!versionElement) return -1;
                            return compareAtom(rangeElement, versionElement);
                        }
                    }
                    return 0;
                }
                function compareVersion(rangeAtom, versionAtom) {
                    return compareAtom(rangeAtom.major, versionAtom.major) || compareAtom(rangeAtom.minor, versionAtom.minor) || compareAtom(rangeAtom.patch, versionAtom.patch) || comparePreRelease(rangeAtom, versionAtom);
                }
                function eq(rangeAtom, versionAtom) {
                    return rangeAtom.version === versionAtom.version;
                }
                function compare(rangeAtom, versionAtom) {
                    switch(rangeAtom.operator){
                        case '':
                        case '=':
                            return eq(rangeAtom, versionAtom);
                        case '>':
                            return compareVersion(rangeAtom, versionAtom) < 0;
                        case '>=':
                            return eq(rangeAtom, versionAtom) || compareVersion(rangeAtom, versionAtom) < 0;
                        case '<':
                            return compareVersion(rangeAtom, versionAtom) > 0;
                        case '<=':
                            return eq(rangeAtom, versionAtom) || compareVersion(rangeAtom, versionAtom) > 0;
                        case void 0:
                            return true;
                        default:
                            return false;
                    }
                }
                function parseComparatorString(range) {
                    return pipe(parseCarets, parseTildes, parseXRanges, parseStar)(range);
                }
                function parseRange(range) {
                    return pipe(parseHyphen, parseComparatorTrim, parseTildeTrim, parseCaretTrim)(range.trim()).split(/\s+/).join(' ');
                }
                function satisfy(version, range) {
                    if (!version) return false;
                    const parsedRange = parseRange(range);
                    const parsedComparator = parsedRange.split(' ').map((rangeVersion)=>parseComparatorString(rangeVersion)).join(' ');
                    const comparators = parsedComparator.split(/\s+/).map((comparator)=>parseGTE0(comparator));
                    const extractedVersion = extractComparator(version);
                    if (!extractedVersion) return false;
                    const [, versionOperator, , versionMajor, versionMinor, versionPatch, versionPreRelease] = extractedVersion;
                    const versionAtom = {
                        operator: versionOperator,
                        version: combineVersion(versionMajor, versionMinor, versionPatch, versionPreRelease),
                        major: versionMajor,
                        minor: versionMinor,
                        patch: versionPatch,
                        preRelease: null == versionPreRelease ? void 0 : versionPreRelease.split('.')
                    };
                    for (const comparator of comparators){
                        const extractedComparator = extractComparator(comparator);
                        if (!extractedComparator) return false;
                        const [, rangeOperator, , rangeMajor, rangeMinor, rangePatch, rangePreRelease] = extractedComparator;
                        const rangeAtom = {
                            operator: rangeOperator,
                            version: combineVersion(rangeMajor, rangeMinor, rangePatch, rangePreRelease),
                            major: rangeMajor,
                            minor: rangeMinor,
                            patch: rangePatch,
                            preRelease: null == rangePreRelease ? void 0 : rangePreRelease.split('.')
                        };
                        if (!compare(rangeAtom, versionAtom)) return false;
                    }
                    return true;
                }
                function formatShare(shareArgs, from, name1, shareStrategy) {
                    let get;
                    get = 'get' in shareArgs ? shareArgs.get : 'lib' in shareArgs ? ()=>Promise.resolve(shareArgs.lib) : ()=>Promise.resolve(()=>{
                            throw new Error(`Can not get shared '${name1}'!`);
                        });
                    if (shareArgs.strategy) warn('"shared.strategy is deprecated, please set in initOptions.shareStrategy instead!"');
                    var _shareArgs_version, _shareArgs_scope, _shareArgs_strategy;
                    return polyfills._extends({
                        deps: [],
                        useIn: [],
                        from,
                        loading: null
                    }, shareArgs, {
                        shareConfig: polyfills._extends({
                            requiredVersion: `^${shareArgs.version}`,
                            singleton: false,
                            eager: false,
                            strictVersion: false
                        }, shareArgs.shareConfig),
                        get,
                        loaded: null != shareArgs && !!shareArgs.loaded || 'lib' in shareArgs || void 0,
                        version: null != (_shareArgs_version = shareArgs.version) ? _shareArgs_version : '0',
                        scope: Array.isArray(shareArgs.scope) ? shareArgs.scope : [
                            null != (_shareArgs_scope = shareArgs.scope) ? _shareArgs_scope : 'default'
                        ],
                        strategy: (null != (_shareArgs_strategy = shareArgs.strategy) ? _shareArgs_strategy : shareStrategy) || 'version-first'
                    });
                }
                function formatShareConfigs(globalOptions, userOptions) {
                    const shareArgs = userOptions.shared || {};
                    const from = userOptions.name;
                    const shareInfos = Object.keys(shareArgs).reduce((res, pkgName)=>{
                        const arrayShareArgs = arrayOptions(shareArgs[pkgName]);
                        res[pkgName] = res[pkgName] || [];
                        arrayShareArgs.forEach((shareConfig)=>{
                            res[pkgName].push(formatShare(shareConfig, from, pkgName, userOptions.shareStrategy));
                        });
                        return res;
                    }, {});
                    const shared = polyfills._extends({}, globalOptions.shared);
                    Object.keys(shareInfos).forEach((shareKey)=>{
                        if (shared[shareKey]) shareInfos[shareKey].forEach((newUserSharedOptions)=>{
                            const isSameVersion = shared[shareKey].find((sharedVal)=>sharedVal.version === newUserSharedOptions.version);
                            if (!isSameVersion) shared[shareKey].push(newUserSharedOptions);
                        });
                        else shared[shareKey] = shareInfos[shareKey];
                    });
                    return {
                        shared,
                        shareInfos
                    };
                }
                function versionLt(a, b) {
                    const transformInvalidVersion = (version)=>{
                        const isNumberVersion = !Number.isNaN(Number(version));
                        if (isNumberVersion) {
                            const splitArr = version.split('.');
                            let validVersion = version;
                            for(let i = 0; i < 3 - splitArr.length; i++)validVersion += '.0';
                            return validVersion;
                        }
                        return version;
                    };
                    if (satisfy(transformInvalidVersion(a), `<=${transformInvalidVersion(b)}`)) return true;
                    return false;
                }
                const findVersion = (shareVersionMap, cb)=>{
                    const callback = cb || function(prev, cur) {
                        return versionLt(prev, cur);
                    };
                    return Object.keys(shareVersionMap).reduce((prev, cur)=>{
                        if (!prev) return cur;
                        if (callback(prev, cur)) return cur;
                        if ('0' === prev) return cur;
                        return prev;
                    }, 0);
                };
                const isLoaded = (shared)=>Boolean(shared.loaded) || 'function' == typeof shared.lib;
                const isLoading = (shared)=>Boolean(shared.loading);
                function findSingletonVersionOrderByVersion(shareScopeMap, scope, pkgName) {
                    const versions = shareScopeMap[scope][pkgName];
                    const callback = function(prev, cur) {
                        return !isLoaded(versions[prev]) && versionLt(prev, cur);
                    };
                    return findVersion(shareScopeMap[scope][pkgName], callback);
                }
                function findSingletonVersionOrderByLoaded(shareScopeMap, scope, pkgName) {
                    const versions = shareScopeMap[scope][pkgName];
                    const callback = function(prev, cur) {
                        const isLoadingOrLoaded = (shared)=>isLoaded(shared) || isLoading(shared);
                        if (isLoadingOrLoaded(versions[cur])) {
                            if (isLoadingOrLoaded(versions[prev])) return Boolean(versionLt(prev, cur));
                            return true;
                        }
                        if (isLoadingOrLoaded(versions[prev])) return false;
                        return versionLt(prev, cur);
                    };
                    return findVersion(shareScopeMap[scope][pkgName], callback);
                }
                function getFindShareFunction(strategy) {
                    if ('loaded-first' === strategy) return findSingletonVersionOrderByLoaded;
                    return findSingletonVersionOrderByVersion;
                }
                function getRegisteredShare(localShareScopeMap, pkgName, shareInfo, resolveShare) {
                    if (!localShareScopeMap) return;
                    const { shareConfig, scope = DEFAULT_SCOPE, strategy } = shareInfo;
                    const scopes = Array.isArray(scope) ? scope : [
                        scope
                    ];
                    for (const sc of scopes)if (shareConfig && localShareScopeMap[sc] && localShareScopeMap[sc][pkgName]) {
                        const { requiredVersion } = shareConfig;
                        const findShareFunction = getFindShareFunction(strategy);
                        const maxOrSingletonVersion = findShareFunction(localShareScopeMap, sc, pkgName);
                        const defaultResolver = ()=>{
                            if (shareConfig.singleton) {
                                if ('string' == typeof requiredVersion && !satisfy(maxOrSingletonVersion, requiredVersion)) {
                                    const msg = `Version ${maxOrSingletonVersion} from ${maxOrSingletonVersion && localShareScopeMap[sc][pkgName][maxOrSingletonVersion].from} of shared singleton module ${pkgName} does not satisfy the requirement of ${shareInfo.from} which needs ${requiredVersion})`;
                                    if (shareConfig.strictVersion) error(msg);
                                    else warn(msg);
                                }
                                return localShareScopeMap[sc][pkgName][maxOrSingletonVersion];
                            }
                            if (false === requiredVersion || '*' === requiredVersion) return localShareScopeMap[sc][pkgName][maxOrSingletonVersion];
                            if (satisfy(maxOrSingletonVersion, requiredVersion)) return localShareScopeMap[sc][pkgName][maxOrSingletonVersion];
                            for (const [versionKey, versionValue] of Object.entries(localShareScopeMap[sc][pkgName]))if (satisfy(versionKey, requiredVersion)) return versionValue;
                        };
                        const params = {
                            shareScopeMap: localShareScopeMap,
                            scope: sc,
                            pkgName,
                            version: maxOrSingletonVersion,
                            GlobalFederation: Global.__FEDERATION__,
                            resolver: defaultResolver
                        };
                        const resolveShared = resolveShare.emit(params) || params;
                        return resolveShared.resolver();
                    }
                }
                function getGlobalShareScope() {
                    return Global.__FEDERATION__.__SHARE__;
                }
                function getTargetSharedOptions(options) {
                    const { pkgName, extraOptions, shareInfos } = options;
                    const defaultResolver = (sharedOptions)=>{
                        if (!sharedOptions) return;
                        const shareVersionMap = {};
                        sharedOptions.forEach((shared)=>{
                            shareVersionMap[shared.version] = shared;
                        });
                        const callback = function(prev, cur) {
                            return !isLoaded(shareVersionMap[prev]) && versionLt(prev, cur);
                        };
                        const maxVersion = findVersion(shareVersionMap, callback);
                        return shareVersionMap[maxVersion];
                    };
                    var _extraOptions_resolver;
                    const resolver = null != (_extraOptions_resolver = null == extraOptions ? void 0 : extraOptions.resolver) ? _extraOptions_resolver : defaultResolver;
                    return Object.assign({}, resolver(shareInfos[pkgName]), null == extraOptions ? void 0 : extraOptions.customShareInfo);
                }
                exports1.CurrentGlobal = CurrentGlobal;
                exports1.DEFAULT_REMOTE_TYPE = DEFAULT_REMOTE_TYPE;
                exports1.DEFAULT_SCOPE = DEFAULT_SCOPE;
                exports1.Global = Global;
                exports1.addGlobalSnapshot = addGlobalSnapshot;
                exports1.addUniqueItem = addUniqueItem;
                exports1.arrayOptions = arrayOptions;
                exports1.assert = assert;
                exports1.error = error;
                exports1.formatShareConfigs = formatShareConfigs;
                exports1.getBuilderId = getBuilderId;
                exports1.getFMId = getFMId;
                exports1.getGlobalFederationConstructor = getGlobalFederationConstructor;
                exports1.getGlobalFederationInstance = getGlobalFederationInstance;
                exports1.getGlobalHostPlugins = getGlobalHostPlugins;
                exports1.getGlobalShareScope = getGlobalShareScope;
                exports1.getGlobalSnapshot = getGlobalSnapshot;
                exports1.getGlobalSnapshotInfoByModuleInfo = getGlobalSnapshotInfoByModuleInfo;
                exports1.getInfoWithoutType = getInfoWithoutType;
                exports1.getPreloaded = getPreloaded;
                exports1.getRegisteredShare = getRegisteredShare;
                exports1.getRemoteEntryExports = getRemoteEntryExports;
                exports1.getRemoteEntryInfoFromSnapshot = getRemoteEntryInfoFromSnapshot;
                exports1.getTargetSharedOptions = getTargetSharedOptions;
                exports1.getTargetSnapshotInfoByModuleInfo = getTargetSnapshotInfoByModuleInfo;
                exports1.globalLoading = globalLoading;
                exports1.isObject = isObject;
                exports1.isPlainObject = isPlainObject;
                exports1.isPureRemoteEntry = isPureRemoteEntry;
                exports1.isRemoteInfoWithEntry = isRemoteInfoWithEntry;
                exports1.logger = logger;
                exports1.nativeGlobal = nativeGlobal;
                exports1.processModuleAlias = processModuleAlias;
                exports1.registerGlobalPlugins = registerGlobalPlugins;
                exports1.resetFederationGlobalInfo = resetFederationGlobalInfo;
                exports1.setGlobalFederationConstructor = setGlobalFederationConstructor;
                exports1.setGlobalFederationInstance = setGlobalFederationInstance;
                exports1.setGlobalSnapshotInfoByModuleInfo = setGlobalSnapshotInfoByModuleInfo;
                exports1.setPreloaded = setPreloaded;
                exports1.warn = warn;
            },
            "./node_modules/.pnpm/@module-federation+sdk@0.8.5/node_modules/@module-federation/sdk/dist/index.cjs.js": function(__unused_webpack_module, exports1, __webpack_require__) {
                var isomorphicRslog = __webpack_require__("./node_modules/.pnpm/isomorphic-rslog@0.0.6/node_modules/isomorphic-rslog/dist/browser/index.cjs");
                var polyfills = __webpack_require__("./node_modules/.pnpm/@module-federation+sdk@0.8.5/node_modules/@module-federation/sdk/dist/polyfills.cjs.js");
                const FederationModuleManifest = 'federation-manifest.json';
                const MANIFEST_EXT = '.json';
                const BROWSER_LOG_KEY = 'FEDERATION_DEBUG';
                const BROWSER_LOG_VALUE = '1';
                const NameTransformSymbol = {
                    AT: '@',
                    HYPHEN: '-',
                    SLASH: '/'
                };
                const NameTransformMap = {
                    [NameTransformSymbol.AT]: 'scope_',
                    [NameTransformSymbol.HYPHEN]: '_',
                    [NameTransformSymbol.SLASH]: '__'
                };
                const EncodedNameTransformMap = {
                    [NameTransformMap[NameTransformSymbol.AT]]: NameTransformSymbol.AT,
                    [NameTransformMap[NameTransformSymbol.HYPHEN]]: NameTransformSymbol.HYPHEN,
                    [NameTransformMap[NameTransformSymbol.SLASH]]: NameTransformSymbol.SLASH
                };
                const SEPARATOR = ':';
                const ManifestFileName = 'mf-manifest.json';
                const StatsFileName = 'mf-stats.json';
                const MFModuleType = {
                    NPM: 'npm',
                    APP: 'app'
                };
                const MODULE_DEVTOOL_IDENTIFIER = '__MF_DEVTOOLS_MODULE_INFO__';
                const ENCODE_NAME_PREFIX = 'ENCODE_NAME_PREFIX';
                const TEMP_DIR = '.federation';
                const MFPrefetchCommon = {
                    identifier: 'MFDataPrefetch',
                    globalKey: '__PREFETCH__',
                    library: 'mf-data-prefetch',
                    exportsKey: '__PREFETCH_EXPORTS__',
                    fileName: 'bootstrap.js'
                };
                var ContainerPlugin = /*#__PURE__*/ Object.freeze({
                    __proto__: null
                });
                var ContainerReferencePlugin = /*#__PURE__*/ Object.freeze({
                    __proto__: null
                });
                var ModuleFederationPlugin = /*#__PURE__*/ Object.freeze({
                    __proto__: null
                });
                var SharePlugin = /*#__PURE__*/ Object.freeze({
                    __proto__: null
                });
                function isBrowserEnv() {
                    return 'undefined' != typeof window;
                }
                function isBrowserDebug() {
                    try {
                        if (isBrowserEnv() && window.localStorage) return localStorage.getItem(BROWSER_LOG_KEY) === BROWSER_LOG_VALUE;
                    } catch (error) {}
                    return false;
                }
                function isDebugMode() {
                    if ('undefined' != typeof process && process.env && process.env['FEDERATION_DEBUG']) return Boolean(process.env['FEDERATION_DEBUG']);
                    if ('undefined' != typeof FEDERATION_DEBUG && Boolean(FEDERATION_DEBUG)) return true;
                    return isBrowserDebug();
                }
                const getProcessEnv = function() {
                    return 'undefined' != typeof process && process.env ? process.env : {};
                };
                const PREFIX = '[ Module Federation ]';
                function setDebug(loggerInstance) {
                    if (isDebugMode()) loggerInstance.level = 'verbose';
                }
                function setPrefix(loggerInstance, prefix) {
                    loggerInstance.labels = {
                        warn: `${prefix} Warn`,
                        error: `${prefix} Error`,
                        success: `${prefix} Success`,
                        info: `${prefix} Info`,
                        ready: `${prefix} Ready`,
                        debug: `${prefix} Debug`
                    };
                }
                function createLogger(prefix) {
                    const loggerInstance = isomorphicRslog.createLogger({
                        labels: {
                            warn: `${PREFIX} Warn`,
                            error: `${PREFIX} Error`,
                            success: `${PREFIX} Success`,
                            info: `${PREFIX} Info`,
                            ready: `${PREFIX} Ready`,
                            debug: `${PREFIX} Debug`
                        }
                    });
                    setDebug(loggerInstance);
                    setPrefix(loggerInstance, prefix);
                    return loggerInstance;
                }
                const logger = createLogger(PREFIX);
                const LOG_CATEGORY = '[ Federation Runtime ]';
                const parseEntry = (str, devVerOrUrl, separator = SEPARATOR)=>{
                    const strSplit = str.split(separator);
                    const devVersionOrUrl = 'development' === getProcessEnv()['NODE_ENV'] && devVerOrUrl;
                    const defaultVersion = '*';
                    const isEntry = (s)=>s.startsWith('http') || s.includes(MANIFEST_EXT);
                    if (strSplit.length >= 2) {
                        let [name1, ...versionOrEntryArr] = strSplit;
                        if (str.startsWith(separator)) {
                            versionOrEntryArr = [
                                devVersionOrUrl || strSplit.slice(-1)[0]
                            ];
                            name1 = strSplit.slice(0, -1).join(separator);
                        }
                        let versionOrEntry = devVersionOrUrl || versionOrEntryArr.join(separator);
                        if (isEntry(versionOrEntry)) return {
                            name: name1,
                            entry: versionOrEntry
                        };
                        return {
                            name: name1,
                            version: versionOrEntry || defaultVersion
                        };
                    }
                    if (1 === strSplit.length) {
                        const [name1] = strSplit;
                        if (devVersionOrUrl && isEntry(devVersionOrUrl)) return {
                            name: name1,
                            entry: devVersionOrUrl
                        };
                        return {
                            name: name1,
                            version: devVersionOrUrl || defaultVersion
                        };
                    }
                    throw `Invalid entry value: ${str}`;
                };
                const composeKeyWithSeparator = function(...args) {
                    if (!args.length) return '';
                    return args.reduce((sum, cur)=>{
                        if (!cur) return sum;
                        if (!sum) return cur;
                        return `${sum}${SEPARATOR}${cur}`;
                    }, '');
                };
                const encodeName = function(name1, prefix = '', withExt = false) {
                    try {
                        const ext = withExt ? '.js' : '';
                        return `${prefix}${name1.replace(new RegExp(`${NameTransformSymbol.AT}`, 'g'), NameTransformMap[NameTransformSymbol.AT]).replace(new RegExp(`${NameTransformSymbol.HYPHEN}`, 'g'), NameTransformMap[NameTransformSymbol.HYPHEN]).replace(new RegExp(`${NameTransformSymbol.SLASH}`, 'g'), NameTransformMap[NameTransformSymbol.SLASH])}${ext}`;
                    } catch (err) {
                        throw err;
                    }
                };
                const decodeName = function(name1, prefix, withExt) {
                    try {
                        let decodedName = name1;
                        if (prefix) {
                            if (!decodedName.startsWith(prefix)) return decodedName;
                            decodedName = decodedName.replace(new RegExp(prefix, 'g'), '');
                        }
                        decodedName = decodedName.replace(new RegExp(`${NameTransformMap[NameTransformSymbol.AT]}`, 'g'), EncodedNameTransformMap[NameTransformMap[NameTransformSymbol.AT]]).replace(new RegExp(`${NameTransformMap[NameTransformSymbol.SLASH]}`, 'g'), EncodedNameTransformMap[NameTransformMap[NameTransformSymbol.SLASH]]).replace(new RegExp(`${NameTransformMap[NameTransformSymbol.HYPHEN]}`, 'g'), EncodedNameTransformMap[NameTransformMap[NameTransformSymbol.HYPHEN]]);
                        if (withExt) decodedName = decodedName.replace('.js', '');
                        return decodedName;
                    } catch (err) {
                        throw err;
                    }
                };
                const generateExposeFilename = (exposeName, withExt)=>{
                    if (!exposeName) return '';
                    let expose = exposeName;
                    if ('.' === expose) expose = 'default_export';
                    if (expose.startsWith('./')) expose = expose.replace('./', '');
                    return encodeName(expose, '__federation_expose_', withExt);
                };
                const generateShareFilename = (pkgName, withExt)=>{
                    if (!pkgName) return '';
                    return encodeName(pkgName, '__federation_shared_', withExt);
                };
                const getResourceUrl = (module1, sourceUrl)=>{
                    if ('getPublicPath' in module1) {
                        let publicPath;
                        publicPath = module1.getPublicPath.startsWith('function') ? new Function('return ' + module1.getPublicPath)()() : new Function(module1.getPublicPath)();
                        return `${publicPath}${sourceUrl}`;
                    }
                    if ('publicPath' in module1) return `${module1.publicPath}${sourceUrl}`;
                    console.warn('Cannot get resource URL. If in debug mode, please ignore.', module1, sourceUrl);
                    return '';
                };
                const assert = (condition, msg)=>{
                    if (!condition) error(msg);
                };
                const error = (msg)=>{
                    throw new Error(`${LOG_CATEGORY}: ${msg}`);
                };
                const warn = (msg)=>{
                    console.warn(`${LOG_CATEGORY}: ${msg}`);
                };
                function safeToString(info) {
                    try {
                        return JSON.stringify(info, null, 2);
                    } catch (e) {
                        return '';
                    }
                }
                const VERSION_PATTERN_REGEXP = /^([\d^=v<>~]|[*xX]$)/;
                function isRequiredVersion(str) {
                    return VERSION_PATTERN_REGEXP.test(str);
                }
                const simpleJoinRemoteEntry = (rPath, rName)=>{
                    if (!rPath) return rName;
                    const transformPath = (str)=>{
                        if ('.' === str) return '';
                        if (str.startsWith('./')) return str.replace('./', '');
                        if (str.startsWith('/')) {
                            const strWithoutSlash = str.slice(1);
                            if (strWithoutSlash.endsWith('/')) return strWithoutSlash.slice(0, -1);
                            return strWithoutSlash;
                        }
                        return str;
                    };
                    const transformedPath = transformPath(rPath);
                    if (!transformedPath) return rName;
                    if (transformedPath.endsWith('/')) return `${transformedPath}${rName}`;
                    return `${transformedPath}/${rName}`;
                };
                function inferAutoPublicPath(url) {
                    return url.replace(/#.*$/, '').replace(/\?.*$/, '').replace(/\/[^\/]+$/, '/');
                }
                function generateSnapshotFromManifest(manifest, options = {}) {
                    var _manifest_metaData, _manifest_metaData1;
                    const { remotes = {}, overrides = {}, version } = options;
                    let remoteSnapshot;
                    const getPublicPath = ()=>{
                        if (!('publicPath' in manifest.metaData)) return manifest.metaData.getPublicPath;
                        if ('auto' === manifest.metaData.publicPath && version) return inferAutoPublicPath(version);
                        return manifest.metaData.publicPath;
                    };
                    const overridesKeys = Object.keys(overrides);
                    let remotesInfo = {};
                    if (!Object.keys(remotes).length) {
                        var _manifest_remotes;
                        remotesInfo = (null == (_manifest_remotes = manifest.remotes) ? void 0 : _manifest_remotes.reduce((res, next)=>{
                            let matchedVersion;
                            const name1 = next.federationContainerName;
                            matchedVersion = overridesKeys.includes(name1) ? overrides[name1] : 'version' in next ? next.version : next.entry;
                            res[name1] = {
                                matchedVersion
                            };
                            return res;
                        }, {})) || {};
                    }
                    Object.keys(remotes).forEach((key)=>remotesInfo[key] = {
                            matchedVersion: overridesKeys.includes(key) ? overrides[key] : remotes[key]
                        });
                    const { remoteEntry: { path: remoteEntryPath, name: remoteEntryName, type: remoteEntryType }, types: remoteTypes, buildInfo: { buildVersion }, globalName, ssrRemoteEntry } = manifest.metaData;
                    const { exposes } = manifest;
                    let basicRemoteSnapshot = {
                        version: version ? version : '',
                        buildVersion,
                        globalName,
                        remoteEntry: simpleJoinRemoteEntry(remoteEntryPath, remoteEntryName),
                        remoteEntryType,
                        remoteTypes: simpleJoinRemoteEntry(remoteTypes.path, remoteTypes.name),
                        remoteTypesZip: remoteTypes.zip || '',
                        remoteTypesAPI: remoteTypes.api || '',
                        remotesInfo,
                        shared: null == manifest ? void 0 : manifest.shared.map((item)=>({
                                assets: item.assets,
                                sharedName: item.name,
                                version: item.version
                            })),
                        modules: null == exposes ? void 0 : exposes.map((expose)=>({
                                moduleName: expose.name,
                                modulePath: expose.path,
                                assets: expose.assets
                            }))
                    };
                    if (null == (_manifest_metaData = manifest.metaData) ? void 0 : _manifest_metaData.prefetchInterface) {
                        const prefetchInterface = manifest.metaData.prefetchInterface;
                        basicRemoteSnapshot = polyfills._extends({}, basicRemoteSnapshot, {
                            prefetchInterface
                        });
                    }
                    if (null == (_manifest_metaData1 = manifest.metaData) ? void 0 : _manifest_metaData1.prefetchEntry) {
                        const { path, name: name1, type } = manifest.metaData.prefetchEntry;
                        basicRemoteSnapshot = polyfills._extends({}, basicRemoteSnapshot, {
                            prefetchEntry: simpleJoinRemoteEntry(path, name1),
                            prefetchEntryType: type
                        });
                    }
                    remoteSnapshot = 'publicPath' in manifest.metaData ? polyfills._extends({}, basicRemoteSnapshot, {
                        publicPath: getPublicPath()
                    }) : polyfills._extends({}, basicRemoteSnapshot, {
                        getPublicPath: getPublicPath()
                    });
                    if (ssrRemoteEntry) {
                        const fullSSRRemoteEntry = simpleJoinRemoteEntry(ssrRemoteEntry.path, ssrRemoteEntry.name);
                        remoteSnapshot.ssrRemoteEntry = fullSSRRemoteEntry;
                        remoteSnapshot.ssrRemoteEntryType = ssrRemoteEntry.type || 'commonjs-module';
                    }
                    return remoteSnapshot;
                }
                function isManifestProvider(moduleInfo) {
                    if ('remoteEntry' in moduleInfo && moduleInfo.remoteEntry.includes(MANIFEST_EXT)) return true;
                    return false;
                }
                async function safeWrapper(callback, disableWarn) {
                    try {
                        const res = await callback();
                        return res;
                    } catch (e) {
                        disableWarn || warn(e);
                        return;
                    }
                }
                function isStaticResourcesEqual(url1, url2) {
                    const REG_EXP = /^(https?:)?\/\//i;
                    const relativeUrl1 = url1.replace(REG_EXP, '').replace(/\/$/, '');
                    const relativeUrl2 = url2.replace(REG_EXP, '').replace(/\/$/, '');
                    return relativeUrl1 === relativeUrl2;
                }
                function createScript(info) {
                    let script = null;
                    let needAttach = true;
                    let timeout = 20000;
                    let timeoutId;
                    const scripts = document.getElementsByTagName('script');
                    for(let i = 0; i < scripts.length; i++){
                        const s = scripts[i];
                        const scriptSrc = s.getAttribute('src');
                        if (scriptSrc && isStaticResourcesEqual(scriptSrc, info.url)) {
                            script = s;
                            needAttach = false;
                            break;
                        }
                    }
                    if (!script) {
                        const attrs = info.attrs;
                        script = document.createElement('script');
                        script.type = (null == attrs ? void 0 : attrs['type']) === 'module' ? 'module' : 'text/javascript';
                        let createScriptRes;
                        if (info.createScriptHook) {
                            createScriptRes = info.createScriptHook(info.url, info.attrs);
                            if (createScriptRes instanceof HTMLScriptElement) script = createScriptRes;
                            else if ('object' == typeof createScriptRes) {
                                if ('script' in createScriptRes && createScriptRes.script) script = createScriptRes.script;
                                if ('timeout' in createScriptRes && createScriptRes.timeout) timeout = createScriptRes.timeout;
                            }
                        }
                        if (!script.src) script.src = info.url;
                        if (attrs && !createScriptRes) Object.keys(attrs).forEach((name1)=>{
                            if (script) {
                                if ('async' === name1 || 'defer' === name1) script[name1] = attrs[name1];
                                else if (!script.getAttribute(name1)) script.setAttribute(name1, attrs[name1]);
                            }
                        });
                    }
                    const onScriptComplete = async (prev, event)=>{
                        var _info_cb;
                        clearTimeout(timeoutId);
                        if (script) {
                            script.onerror = null;
                            script.onload = null;
                            safeWrapper(()=>{
                                const { needDeleteScript = true } = info;
                                if (needDeleteScript) (null == script ? void 0 : script.parentNode) && script.parentNode.removeChild(script);
                            });
                            if (prev && 'function' == typeof prev) {
                                var _info_cb1;
                                const result = prev(event);
                                if (result instanceof Promise) {
                                    var _info_cb2;
                                    const res = await result;
                                    null == info || null == (_info_cb2 = info.cb) || _info_cb2.call(info);
                                    return res;
                                }
                                null == info || null == (_info_cb1 = info.cb) || _info_cb1.call(info);
                                return result;
                            }
                        }
                        null == info || null == (_info_cb = info.cb) || _info_cb.call(info);
                    };
                    script.onerror = onScriptComplete.bind(null, script.onerror);
                    script.onload = onScriptComplete.bind(null, script.onload);
                    timeoutId = setTimeout(()=>{
                        onScriptComplete(null, new Error(`Remote script "${info.url}" time-outed.`));
                    }, timeout);
                    return {
                        script,
                        needAttach
                    };
                }
                function createLink(info) {
                    let link = null;
                    let needAttach = true;
                    const links = document.getElementsByTagName('link');
                    for(let i = 0; i < links.length; i++){
                        const l = links[i];
                        const linkHref = l.getAttribute('href');
                        const linkRef = l.getAttribute('ref');
                        if (linkHref && isStaticResourcesEqual(linkHref, info.url) && linkRef === info.attrs['ref']) {
                            link = l;
                            needAttach = false;
                            break;
                        }
                    }
                    if (!link) {
                        link = document.createElement('link');
                        link.setAttribute('href', info.url);
                        let createLinkRes;
                        const attrs = info.attrs;
                        if (info.createLinkHook) {
                            createLinkRes = info.createLinkHook(info.url, attrs);
                            if (createLinkRes instanceof HTMLLinkElement) link = createLinkRes;
                        }
                        if (attrs && !createLinkRes) Object.keys(attrs).forEach((name1)=>{
                            if (link && !link.getAttribute(name1)) link.setAttribute(name1, attrs[name1]);
                        });
                    }
                    const onLinkComplete = (prev, event)=>{
                        if (link) {
                            link.onerror = null;
                            link.onload = null;
                            safeWrapper(()=>{
                                const { needDeleteLink = true } = info;
                                if (needDeleteLink) (null == link ? void 0 : link.parentNode) && link.parentNode.removeChild(link);
                            });
                            if (prev) {
                                const res = prev(event);
                                info.cb();
                                return res;
                            }
                        }
                        info.cb();
                    };
                    link.onerror = onLinkComplete.bind(null, link.onerror);
                    link.onload = onLinkComplete.bind(null, link.onload);
                    return {
                        link,
                        needAttach
                    };
                }
                function loadScript(url, info) {
                    const { attrs = {}, createScriptHook } = info;
                    return new Promise((resolve, _reject)=>{
                        const { script, needAttach } = createScript({
                            url,
                            cb: resolve,
                            attrs: polyfills._extends({
                                fetchpriority: 'high'
                            }, attrs),
                            createScriptHook,
                            needDeleteScript: true
                        });
                        needAttach && document.head.appendChild(script);
                    });
                }
                function importNodeModule(name1) {
                    if (!name1) throw new Error('import specifier is required');
                    const importModule = new Function('name', "return import(name)");
                    return importModule(name1).then((res)=>res).catch((error)=>{
                        console.error(`Error importing module ${name1}:`, error);
                        throw error;
                    });
                }
                const loadNodeFetch = async ()=>{
                    const fetchModule = await importNodeModule('node-fetch');
                    return fetchModule.default || fetchModule;
                };
                const lazyLoaderHookFetch = async (input, init, loaderHook)=>{
                    const hook = (url, init)=>loaderHook.lifecycle.fetch.emit(url, init);
                    const res = await hook(input, init || {});
                    if (!res || !(res instanceof Response)) {
                        const fetchFunction = 'undefined' == typeof fetch ? await loadNodeFetch() : fetch;
                        return fetchFunction(input, init || {});
                    }
                    return res;
                };
                function createScriptNode(url, cb, attrs, loaderHook) {
                    if (null == loaderHook ? void 0 : loaderHook.createScriptHook) {
                        const hookResult = loaderHook.createScriptHook(url);
                        if (hookResult && 'object' == typeof hookResult && 'url' in hookResult) url = hookResult.url;
                    }
                    let urlObj;
                    try {
                        urlObj = new URL(url);
                    } catch (e) {
                        console.error('Error constructing URL:', e);
                        cb(new Error(`Invalid URL: ${e}`));
                        return;
                    }
                    const getFetch = async ()=>{
                        if (null == loaderHook ? void 0 : loaderHook.fetch) return (input, init)=>lazyLoaderHookFetch(input, init, loaderHook);
                        return 'undefined' == typeof fetch ? loadNodeFetch() : fetch;
                    };
                    const handleScriptFetch = async (f, urlObj)=>{
                        try {
                            var _vm_constants;
                            const res = await f(urlObj.href);
                            const data = await res.text();
                            const [path, vm] = await Promise.all([
                                importNodeModule('path'),
                                importNodeModule('vm')
                            ]);
                            const scriptContext = {
                                exports: {},
                                module: {
                                    exports: {}
                                }
                            };
                            const urlDirname = urlObj.pathname.split('/').slice(0, -1).join('/');
                            const filename = path.basename(urlObj.pathname);
                            var _vm_constants_USE_MAIN_CONTEXT_DEFAULT_LOADER;
                            const script = new vm.Script(`(function(exports, module, require, __dirname, __filename) {${data}\n})`, {
                                filename,
                                importModuleDynamically: null != (_vm_constants_USE_MAIN_CONTEXT_DEFAULT_LOADER = null == (_vm_constants = vm.constants) ? void 0 : _vm_constants.USE_MAIN_CONTEXT_DEFAULT_LOADER) ? _vm_constants_USE_MAIN_CONTEXT_DEFAULT_LOADER : importNodeModule
                            });
                            script.runInThisContext()(scriptContext.exports, scriptContext.module, eval('require'), urlDirname, filename);
                            const exportedInterface = scriptContext.module.exports || scriptContext.exports;
                            if (attrs && exportedInterface && attrs['globalName']) {
                                const container = exportedInterface[attrs['globalName']] || exportedInterface;
                                cb(void 0, container);
                                return;
                            }
                            cb(void 0, exportedInterface);
                        } catch (e) {
                            cb(e instanceof Error ? e : new Error(`Script execution error: ${e}`));
                        }
                    };
                    getFetch().then(async (f)=>{
                        if ((null == attrs ? void 0 : attrs['type']) === 'esm' || (null == attrs ? void 0 : attrs['type']) === 'module') return loadModule(urlObj.href, {
                            fetch: f,
                            vm: await importNodeModule('vm')
                        }).then(async (module1)=>{
                            await module1.evaluate();
                            cb(void 0, module1.namespace);
                        }).catch((e)=>{
                            cb(e instanceof Error ? e : new Error(`Script execution error: ${e}`));
                        });
                        handleScriptFetch(f, urlObj);
                    }).catch((err)=>{
                        cb(err);
                    });
                }
                function loadScriptNode(url, info) {
                    return new Promise((resolve, reject)=>{
                        createScriptNode(url, (error, scriptContext)=>{
                            if (error) reject(error);
                            else {
                                var _info_attrs, _info_attrs1;
                                const remoteEntryKey = (null == info ? void 0 : null == (_info_attrs = info.attrs) ? void 0 : _info_attrs['globalName']) || `__FEDERATION_${null == info ? void 0 : null == (_info_attrs1 = info.attrs) ? void 0 : _info_attrs1['name']}:custom__`;
                                const entryExports = globalThis[remoteEntryKey] = scriptContext;
                                resolve(entryExports);
                            }
                        }, info.attrs, info.loaderHook);
                    });
                }
                async function loadModule(url, options) {
                    const { fetch: fetch1, vm } = options;
                    const response = await fetch1(url);
                    const code = await response.text();
                    const module1 = new vm.SourceTextModule(code, {
                        importModuleDynamically: async (specifier, script)=>{
                            const resolvedUrl = new URL(specifier, url).href;
                            return loadModule(resolvedUrl, options);
                        }
                    });
                    await module1.link(async (specifier)=>{
                        const resolvedUrl = new URL(specifier, url).href;
                        const module1 = await loadModule(resolvedUrl, options);
                        return module1;
                    });
                    return module1;
                }
                function normalizeOptions(enableDefault, defaultOptions, key) {
                    return function(options) {
                        if (false === options) return false;
                        if (void 0 === options) {
                            if (enableDefault) return defaultOptions;
                            return false;
                        }
                        if (true === options) return defaultOptions;
                        if (options && 'object' == typeof options) return polyfills._extends({}, defaultOptions, options);
                        throw new Error(`Unexpected type for \`${key}\`, expect boolean/undefined/object, got: ${typeof options}`);
                    };
                }
                exports1.BROWSER_LOG_KEY = BROWSER_LOG_KEY;
                exports1.BROWSER_LOG_VALUE = BROWSER_LOG_VALUE;
                exports1.ENCODE_NAME_PREFIX = ENCODE_NAME_PREFIX;
                exports1.EncodedNameTransformMap = EncodedNameTransformMap;
                exports1.FederationModuleManifest = FederationModuleManifest;
                exports1.MANIFEST_EXT = MANIFEST_EXT;
                exports1.MFModuleType = MFModuleType;
                exports1.MFPrefetchCommon = MFPrefetchCommon;
                exports1.MODULE_DEVTOOL_IDENTIFIER = MODULE_DEVTOOL_IDENTIFIER;
                exports1.ManifestFileName = ManifestFileName;
                exports1.NameTransformMap = NameTransformMap;
                exports1.NameTransformSymbol = NameTransformSymbol;
                exports1.SEPARATOR = SEPARATOR;
                exports1.StatsFileName = StatsFileName;
                exports1.TEMP_DIR = TEMP_DIR;
                exports1.assert = assert;
                exports1.composeKeyWithSeparator = composeKeyWithSeparator;
                exports1.containerPlugin = ContainerPlugin;
                exports1.containerReferencePlugin = ContainerReferencePlugin;
                exports1.createLink = createLink;
                exports1.createLogger = createLogger;
                exports1.createScript = createScript;
                exports1.createScriptNode = createScriptNode;
                exports1.decodeName = decodeName;
                exports1.encodeName = encodeName;
                exports1.error = error;
                exports1.generateExposeFilename = generateExposeFilename;
                exports1.generateShareFilename = generateShareFilename;
                exports1.generateSnapshotFromManifest = generateSnapshotFromManifest;
                exports1.getProcessEnv = getProcessEnv;
                exports1.getResourceUrl = getResourceUrl;
                exports1.inferAutoPublicPath = inferAutoPublicPath;
                exports1.isBrowserEnv = isBrowserEnv;
                exports1.isDebugMode = isDebugMode;
                exports1.isManifestProvider = isManifestProvider;
                exports1.isRequiredVersion = isRequiredVersion;
                exports1.isStaticResourcesEqual = isStaticResourcesEqual;
                exports1.loadScript = loadScript;
                exports1.loadScriptNode = loadScriptNode;
                exports1.logger = logger;
                exports1.moduleFederationPlugin = ModuleFederationPlugin;
                exports1.normalizeOptions = normalizeOptions;
                exports1.parseEntry = parseEntry;
                exports1.safeToString = safeToString;
                exports1.safeWrapper = safeWrapper;
                exports1.sharePlugin = SharePlugin;
                exports1.simpleJoinRemoteEntry = simpleJoinRemoteEntry;
                exports1.warn = warn;
            },
            "./node_modules/.pnpm/@module-federation+sdk@0.8.5/node_modules/@module-federation/sdk/dist/polyfills.cjs.js": function(__unused_webpack_module, exports1) {
                function _extends() {
                    _extends = Object.assign || function(target) {
                        for(var i = 1; i < arguments.length; i++){
                            var source = arguments[i];
                            for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
                        }
                        return target;
                    };
                    return _extends.apply(this, arguments);
                }
                exports1._extends = _extends;
            },
            vue: function(module1) {
                module1.exports = __WEBPACK_EXTERNAL_MODULE_vue__;
            },
            "./node_modules/.pnpm/isomorphic-rslog@0.0.6/node_modules/isomorphic-rslog/dist/browser/index.cjs": function(module1) {
                var __defProp = Object.defineProperty;
                var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
                var __getOwnPropNames = Object.getOwnPropertyNames;
                var __hasOwnProp = Object.prototype.hasOwnProperty;
                var __export = (target, all)=>{
                    for(var name1 in all)__defProp(target, name1, {
                        get: all[name1],
                        enumerable: true
                    });
                };
                var __copyProps = (to, from, except, desc)=>{
                    if (from && "object" == typeof from || "function" == typeof from) {
                        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                            get: ()=>from[key],
                            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                        });
                    }
                    return to;
                };
                var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
                        value: true
                    }), mod);
                var browser_exports = {};
                __export(browser_exports, {
                    createLogger: ()=>createLogger2,
                    logger: ()=>logger
                });
                module1.exports = __toCommonJS(browser_exports);
                var supportsSubstitutions = void 0;
                var supportColor = ()=>{
                    if (void 0 !== supportsSubstitutions) return supportsSubstitutions;
                    try {
                        const testString = "color test";
                        const css = "color: red;";
                        const originalConsoleLog = console.log;
                        console.log = (...args)=>{
                            if (args[0] === `%c${testString}` && args[1] === css) supportsSubstitutions = true;
                        };
                        console.log(`%c${testString}`, css);
                        console.log = originalConsoleLog;
                    } catch (e) {
                        supportsSubstitutions = false;
                    }
                    return supportsSubstitutions;
                };
                var ansiToCss = {
                    bold: "font-weight: bold;",
                    red: "color: red;",
                    green: "color: green;",
                    orange: "color: orange;",
                    dodgerblue: "color: dodgerblue;",
                    magenta: "color: magenta;",
                    gray: "color: gray;"
                };
                var formatter = (key)=>supportColor() ? (input)=>{
                        if (Array.isArray(input)) {
                            const [label, style] = input;
                            return [
                                `%c${label.replace("%c", "")}`,
                                style ? `${ansiToCss[key]}${style}` : `${ansiToCss[key] || ""}`
                            ];
                        }
                        return [
                            `%c${String(input).replace("%c", "")}`,
                            ansiToCss[key] || ""
                        ];
                    } : (input)=>[
                            String(input)
                        ];
                var bold = formatter("bold");
                var red = formatter("red");
                var green = formatter("green");
                var orange = formatter("orange");
                var dodgerblue = formatter("dodgerblue");
                var magenta = formatter("magenta");
                formatter("gray");
                function getLabel(type, logType, labels) {
                    let label = [
                        ""
                    ];
                    if ("label" in logType) {
                        label = [
                            labels[type] || logType.label || ""
                        ];
                        label = bold(logType.color ? logType.color(label) : label[0]);
                    }
                    label = label.filter(Boolean);
                    return label;
                }
                function finalLog(label, text, args, message) {
                    if (label.length) {
                        if (Array.isArray(message)) console.log(...label, ...message);
                        else console.log(...label, text);
                    } else Array.isArray(message) ? console.log(...message) : console.log(text, ...args);
                }
                var LOG_LEVEL = {
                    error: 0,
                    warn: 1,
                    info: 2,
                    log: 3,
                    verbose: 4
                };
                var errorStackRegExp = /at\s.*:\d+:\d+[\s\)]*$/;
                var anonymousErrorStackRegExp = /at\s.*\(<anonymous>\)$/;
                var isErrorStackMessage = (message)=>errorStackRegExp.test(message) || anonymousErrorStackRegExp.test(message);
                var createLogger = (options = {}, { getLabel: getLabel2, handleError, finalLog: finalLog2, greet, LOG_TYPES: LOG_TYPES2 })=>{
                    let maxLevel = options.level || "log";
                    let customLabels = options.labels || {};
                    let log = (type, message, ...args)=>{
                        if (LOG_LEVEL[LOG_TYPES2[type].level] > LOG_LEVEL[maxLevel]) return;
                        if (null == message) return console.log();
                        let logType = LOG_TYPES2[type];
                        let text = "";
                        const label = getLabel2(type, logType, customLabels);
                        if (message instanceof Error) {
                            if (message.stack) {
                                let [name1, ...rest] = message.stack.split("\n");
                                if (name1.startsWith("Error: ")) name1 = name1.slice(7);
                                text = `${name1}
${handleError(rest.join("\n"))}`;
                            } else text = message.message;
                        } else if ("error" === logType.level && "string" == typeof message) {
                            let lines = message.split("\n");
                            text = lines.map((line)=>isErrorStackMessage(line) ? handleError(line) : line).join("\n");
                        } else text = `${message}`;
                        finalLog2(label, text, args, message);
                    };
                    let logger2 = {
                        greet: (message)=>log("log", greet(message))
                    };
                    Object.keys(LOG_TYPES2).forEach((key)=>{
                        logger2[key] = (...args)=>log(key, ...args);
                    });
                    Object.defineProperty(logger2, "level", {
                        get: ()=>maxLevel,
                        set (val) {
                            maxLevel = val;
                        }
                    });
                    Object.defineProperty(logger2, "labels", {
                        get: ()=>customLabels,
                        set (val) {
                            customLabels = val;
                        }
                    });
                    logger2.override = (customLogger)=>{
                        Object.assign(logger2, customLogger);
                    };
                    return logger2;
                };
                var startColor = [
                    189,
                    255,
                    243
                ];
                var endColor = [
                    74,
                    194,
                    154
                ];
                var isWord = (char)=>!/[\s\n]/.test(char);
                function gradient(message) {
                    if (!supportColor()) return [
                        message
                    ];
                    const chars = [
                        ...message
                    ];
                    const words = chars.filter(isWord);
                    const steps = words.length - 1;
                    if (0 === steps) {
                        console.log(`%c${message}`, `color: rgb(${startColor.join(",")}); font-weight: bold;`);
                        return [
                            message
                        ];
                    }
                    let output = "";
                    let styles = [];
                    chars.forEach((char)=>{
                        if (isWord(char)) {
                            const progress = words.indexOf(char) / steps;
                            const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * progress);
                            const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * progress);
                            const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * progress);
                            output += `%c${char}`;
                            styles.push(`color: rgb(${r},${g},${b}); font-weight: bold;`);
                        } else output += char;
                    });
                    return [
                        output,
                        ...styles
                    ];
                }
                var LOG_TYPES = {
                    error: {
                        label: "error",
                        level: "error",
                        color: red
                    },
                    warn: {
                        label: "warn",
                        level: "warn",
                        color: orange
                    },
                    info: {
                        label: "info",
                        level: "info",
                        color: dodgerblue
                    },
                    start: {
                        label: "start",
                        level: "info",
                        color: dodgerblue
                    },
                    ready: {
                        label: "ready",
                        level: "info",
                        color: green
                    },
                    success: {
                        label: "success",
                        level: "info",
                        color: green
                    },
                    log: {
                        level: "log"
                    },
                    debug: {
                        label: "debug",
                        level: "verbose",
                        color: magenta
                    }
                };
                function createLogger2(options = {}) {
                    return createLogger(options, {
                        handleError: (msg)=>msg,
                        getLabel,
                        gradient,
                        finalLog,
                        LOG_TYPES,
                        greet: (msg)=>gradient(msg)
                    });
                }
                var logger = createLogger2();
            },
            "\\\\?\\C:\\Users\\eminoda\\github\\code-depot\\module-federation\\runtime-bridge\\runtime-bridge-vue\\node_modules\\.pnpm\\@module-federation+enhanced@0.8.5_@rspack+core@1.1.8_@swc+helpers@0.5.15__react-dom@19.0.0_re_cwtym5m743aedphxkrxhvrlumq\\node_modules\\@module-federation\\enhanced\\dist\\src\\runtime.js": function(__unused_webpack_module, exports1, __webpack_require__) {
                var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
                    if (void 0 === k2) k2 = k;
                    var desc = Object.getOwnPropertyDescriptor(m, k);
                    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
                        enumerable: true,
                        get: function() {
                            return m[k];
                        }
                    };
                    Object.defineProperty(o, k2, desc);
                } : function(o, m, k, k2) {
                    if (void 0 === k2) k2 = k;
                    o[k2] = m[k];
                });
                var __exportStar = this && this.__exportStar || function(m, exports1) {
                    for(var p in m)if ("default" !== p && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
                };
                Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                __exportStar(__webpack_require__("./node_modules/.pnpm/@module-federation+runtime-tools@0.8.5/node_modules/@module-federation/runtime-tools/dist/runtime.cjs.js"), exports1);
            }
        };
        var __webpack_module_cache__ = {};
        function __webpack_require__(moduleId) {
            var cachedModule = __webpack_module_cache__[moduleId];
            if (void 0 !== cachedModule) return cachedModule.exports;
            var module1 = __webpack_module_cache__[moduleId] = {
                exports: {}
            };
            __webpack_modules__[moduleId].call(module1.exports, module1, module1.exports, __webpack_require__);
            return module1.exports;
        }
        (()=>{
            __webpack_require__.n = function(module1) {
                var getter = module1 && module1.__esModule ? function() {
                    return module1['default'];
                } : function() {
                    return module1;
                };
                __webpack_require__.d(getter, {
                    a: getter
                });
                return getter;
            };
        })();
        (()=>{
            __webpack_require__.d = function(exports1, definition) {
                for(var key in definition)if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports1, key)) Object.defineProperty(exports1, key, {
                    enumerable: true,
                    get: definition[key]
                });
            };
        })();
        (()=>{
            __webpack_require__.o = function(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            };
        })();
        (()=>{
            __webpack_require__.r = function(exports1) {
                if ('undefined' != typeof Symbol && Symbol.toStringTag) Object.defineProperty(exports1, Symbol.toStringTag, {
                    value: 'Module'
                });
                Object.defineProperty(exports1, '__esModule', {
                    value: true
                });
            };
        })();
        var __webpack_exports__ = {};
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, {
            default: function() {
                return __WEBPACK_DEFAULT_EXPORT__;
            }
        });
        var _module_federation_enhanced_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("\\\\?\\C:\\Users\\eminoda\\github\\code-depot\\module-federation\\runtime-bridge\\runtime-bridge-vue\\node_modules\\.pnpm\\@module-federation+enhanced@0.8.5_@rspack+core@1.1.8_@swc+helpers@0.5.15__react-dom@19.0.0_re_cwtym5m743aedphxkrxhvrlumq\\node_modules\\@module-federation\\enhanced\\dist\\src\\runtime.js");
        var _module_federation_enhanced_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_module_federation_enhanced_runtime__WEBPACK_IMPORTED_MODULE_0__);
        var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("vue");
        var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
        class Runtime {
            constructor(options){
                (0, _module_federation_enhanced_runtime__WEBPACK_IMPORTED_MODULE_0__.init)(options);
            }
            loadRemoteComponent(componentName, isVueInReact) {
                const remoteComponent = (0, vue__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)({
                    loader: ()=>(0, _module_federation_enhanced_runtime__WEBPACK_IMPORTED_MODULE_0__.loadRemote)(componentName),
                    loadingComponent: ()=>(0, vue__WEBPACK_IMPORTED_MODULE_1__.h)("div", {}, "Loading..."),
                    errorComponent: ()=>(0, vue__WEBPACK_IMPORTED_MODULE_1__.h)("div", {}, "Error..."),
                    onError: (error, retry, fail, attempts)=>{
                        console.log(error, retry, fail, attempts);
                    },
                    delay: 0
                });
                return isVueInReact ? ()=>Promise.resolve({
                        default: (0, vue__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
                            setup (props, { attrs }) {
                                console.log(props, attrs);
                                return ()=>(0, vue__WEBPACK_IMPORTED_MODULE_1__.h)(remoteComponent, attrs);
                            }
                        })
                    }) : remoteComponent;
            }
        }
        const __WEBPACK_DEFAULT_EXPORT__ = Runtime;
        return __webpack_exports__;
    })());
