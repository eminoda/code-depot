/*! For license information please see vruntime.js.LICENSE.txt */
(function(root, factory) {
    if ('object' == typeof exports && 'object' == typeof module) module.exports = factory();
    else if ('function' == typeof define && define.amd) define([], factory);
    else if ('object' == typeof exports) exports["RuntimeAll"] = factory();
    else root["RuntimeAll"] = factory();
})(globalThis, ()=>(()=>{
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
                        const self1 = this;
                        this.on(function wrapper(...args) {
                            self1.remove(wrapper);
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
                function traverseModuleInfo(globalSnapshot, remoteInfo, traverse1, isRoot, memo = {}, remoteSnapshot) {
                    const id = share.getFMId(remoteInfo);
                    const { value: snapshotValue } = share.getInfoWithoutType(globalSnapshot, id);
                    const effectiveRemoteSnapshot = remoteSnapshot || snapshotValue;
                    if (effectiveRemoteSnapshot && !sdk.isManifestProvider(effectiveRemoteSnapshot)) {
                        traverse1(effectiveRemoteSnapshot, remoteInfo, isRoot);
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
                                }, traverse1, false, memo, void 0);
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
                function warn1(msg) {
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
                function isObject1(val) {
                    return val && 'object' == typeof val;
                }
                const objectToString = Object.prototype.toString;
                function isPlainObject1(val) {
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
                        else warn1(`The plugin ${plugin.name} has been registered.`);
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
                    return (x)=>fns.reduce((v1, f)=>f(v1), x);
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
                    if (shareArgs.strategy) warn1('"shared.strategy is deprecated, please set in initOptions.shareStrategy instead!"');
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
                                    else warn1(msg);
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
                exports1.isObject = isObject1;
                exports1.isPlainObject = isPlainObject1;
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
                exports1.warn = warn1;
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
                const warn1 = (msg)=>{
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
                        disableWarn || warn1(e);
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
                exports1.warn = warn1;
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
            "./node_modules/.pnpm/react-dom@19.0.0_react@19.0.0/node_modules/react-dom/cjs/react-dom.production.js": function(__unused_webpack_module, exports1, __webpack_require__) {
                /**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var React = __webpack_require__("./node_modules/.pnpm/react@19.0.0/node_modules/react/index.js");
                function formatProdErrorMessage(code) {
                    var url = "https://react.dev/errors/" + code;
                    if (1 < arguments.length) {
                        url += "?args[]=" + encodeURIComponent(arguments[1]);
                        for(var i = 2; i < arguments.length; i++)url += "&args[]=" + encodeURIComponent(arguments[i]);
                    }
                    return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
                }
                function noop() {}
                var Internals = {
                    d: {
                        f: noop,
                        r: function() {
                            throw Error(formatProdErrorMessage(522));
                        },
                        D: noop,
                        C: noop,
                        L: noop,
                        m: noop,
                        X: noop,
                        S: noop,
                        M: noop
                    },
                    p: 0,
                    findDOMNode: null
                }, REACT_PORTAL_TYPE = Symbol.for("react.portal");
                function createPortal$1(children, containerInfo, implementation) {
                    var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
                    return {
                        $$typeof: REACT_PORTAL_TYPE,
                        key: null == key ? null : "" + key,
                        children: children,
                        containerInfo: containerInfo,
                        implementation: implementation
                    };
                }
                var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
                function getCrossOriginStringAs(as, input) {
                    if ("font" === as) return "";
                    if ("string" == typeof input) return "use-credentials" === input ? input : "";
                }
                exports1.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
                exports1.createPortal = function(children, container) {
                    var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
                    if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType) throw Error(formatProdErrorMessage(299));
                    return createPortal$1(children, container, null, key);
                };
                exports1.flushSync = function(fn) {
                    var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
                    try {
                        if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
                    } finally{
                        ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
                    }
                };
                exports1.preconnect = function(href, options) {
                    "string" == typeof href && (options ? (options = options.crossOrigin, options = "string" == typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
                };
                exports1.prefetchDNS = function(href) {
                    "string" == typeof href && Internals.d.D(href);
                };
                exports1.preinit = function(href, options) {
                    if ("string" == typeof href && options && "string" == typeof options.as) {
                        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" == typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" == typeof options.fetchPriority ? options.fetchPriority : void 0;
                        "style" === as ? Internals.d.S(href, "string" == typeof options.precedence ? options.precedence : void 0, {
                            crossOrigin: crossOrigin,
                            integrity: integrity,
                            fetchPriority: fetchPriority
                        }) : "script" === as && Internals.d.X(href, {
                            crossOrigin: crossOrigin,
                            integrity: integrity,
                            fetchPriority: fetchPriority,
                            nonce: "string" == typeof options.nonce ? options.nonce : void 0
                        });
                    }
                };
                exports1.preinitModule = function(href, options) {
                    if ("string" == typeof href) {
                        if ("object" == typeof options && null !== options) {
                            if (null == options.as || "script" === options.as) {
                                var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
                                Internals.d.M(href, {
                                    crossOrigin: crossOrigin,
                                    integrity: "string" == typeof options.integrity ? options.integrity : void 0,
                                    nonce: "string" == typeof options.nonce ? options.nonce : void 0
                                });
                            }
                        } else null == options && Internals.d.M(href);
                    }
                };
                exports1.preload = function(href, options) {
                    if ("string" == typeof href && "object" == typeof options && null !== options && "string" == typeof options.as) {
                        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
                        Internals.d.L(href, as, {
                            crossOrigin: crossOrigin,
                            integrity: "string" == typeof options.integrity ? options.integrity : void 0,
                            nonce: "string" == typeof options.nonce ? options.nonce : void 0,
                            type: "string" == typeof options.type ? options.type : void 0,
                            fetchPriority: "string" == typeof options.fetchPriority ? options.fetchPriority : void 0,
                            referrerPolicy: "string" == typeof options.referrerPolicy ? options.referrerPolicy : void 0,
                            imageSrcSet: "string" == typeof options.imageSrcSet ? options.imageSrcSet : void 0,
                            imageSizes: "string" == typeof options.imageSizes ? options.imageSizes : void 0,
                            media: "string" == typeof options.media ? options.media : void 0
                        });
                    }
                };
                exports1.preloadModule = function(href, options) {
                    if ("string" == typeof href) {
                        if (options) {
                            var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
                            Internals.d.m(href, {
                                as: "string" == typeof options.as && "script" !== options.as ? options.as : void 0,
                                crossOrigin: crossOrigin,
                                integrity: "string" == typeof options.integrity ? options.integrity : void 0
                            });
                        } else Internals.d.m(href);
                    }
                };
                exports1.requestFormReset = function(form) {
                    Internals.d.r(form);
                };
                exports1.unstable_batchedUpdates = function(fn, a) {
                    return fn(a);
                };
                exports1.useFormState = function(action, initialState, permalink) {
                    return ReactSharedInternals.H.useFormState(action, initialState, permalink);
                };
                exports1.useFormStatus = function() {
                    return ReactSharedInternals.H.useHostTransitionStatus();
                };
                exports1.version = "19.0.0";
            },
            "./node_modules/.pnpm/react-dom@19.0.0_react@19.0.0/node_modules/react-dom/index.js": function(module1, __unused_webpack_exports, __webpack_require__) {
                function checkDCE() {
                    if ('undefined' == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ || 'function' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) return;
                    try {
                        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
                    } catch (err) {
                        console.error(err);
                    }
                }
                checkDCE();
                module1.exports = __webpack_require__("./node_modules/.pnpm/react-dom@19.0.0_react@19.0.0/node_modules/react-dom/cjs/react-dom.production.js");
            },
            "./node_modules/.pnpm/react@19.0.0/node_modules/react/cjs/react-jsx-runtime.production.js": function(__unused_webpack_module, exports1) {
                var __webpack_unused_export__;
                /**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
                function jsxProd(type, config, maybeKey) {
                    var key = null;
                    void 0 !== maybeKey && (key = "" + maybeKey);
                    void 0 !== config.key && (key = "" + config.key);
                    if ("key" in config) {
                        maybeKey = {};
                        for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
                    } else maybeKey = config;
                    config = maybeKey.ref;
                    return {
                        $$typeof: REACT_ELEMENT_TYPE,
                        type: type,
                        key: key,
                        ref: void 0 !== config ? config : null,
                        props: maybeKey
                    };
                }
                __webpack_unused_export__ = REACT_FRAGMENT_TYPE;
                exports1.jsx = jsxProd;
                __webpack_unused_export__ = jsxProd;
            },
            "./node_modules/.pnpm/react@19.0.0/node_modules/react/cjs/react.production.js": function(__unused_webpack_module, exports1) {
                /**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
                function getIteratorFn(maybeIterable) {
                    if (null === maybeIterable || "object" != typeof maybeIterable) return null;
                    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
                    return "function" == typeof maybeIterable ? maybeIterable : null;
                }
                var ReactNoopUpdateQueue = {
                    isMounted: function() {
                        return !1;
                    },
                    enqueueForceUpdate: function() {},
                    enqueueReplaceState: function() {},
                    enqueueSetState: function() {}
                }, assign = Object.assign, emptyObject = {};
                function Component(props, context, updater) {
                    this.props = props;
                    this.context = context;
                    this.refs = emptyObject;
                    this.updater = updater || ReactNoopUpdateQueue;
                }
                Component.prototype.isReactComponent = {};
                Component.prototype.setState = function(partialState, callback) {
                    if ("object" != typeof partialState && "function" != typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
                    this.updater.enqueueSetState(this, partialState, callback, "setState");
                };
                Component.prototype.forceUpdate = function(callback) {
                    this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
                };
                function ComponentDummy() {}
                ComponentDummy.prototype = Component.prototype;
                function PureComponent(props, context, updater) {
                    this.props = props;
                    this.context = context;
                    this.refs = emptyObject;
                    this.updater = updater || ReactNoopUpdateQueue;
                }
                var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
                pureComponentPrototype.constructor = PureComponent;
                assign(pureComponentPrototype, Component.prototype);
                pureComponentPrototype.isPureReactComponent = !0;
                var isArrayImpl = Array.isArray, ReactSharedInternals = {
                    H: null,
                    A: null,
                    T: null,
                    S: null
                }, hasOwnProperty = Object.prototype.hasOwnProperty;
                function ReactElement(type, key, self1, source, owner, props) {
                    self1 = props.ref;
                    return {
                        $$typeof: REACT_ELEMENT_TYPE,
                        type: type,
                        key: key,
                        ref: void 0 !== self1 ? self1 : null,
                        props: props
                    };
                }
                function cloneAndReplaceKey(oldElement, newKey) {
                    return ReactElement(oldElement.type, newKey, void 0, void 0, void 0, oldElement.props);
                }
                function isValidElement(object) {
                    return "object" == typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
                }
                function escape(key) {
                    var escaperLookup = {
                        "=": "=0",
                        ":": "=2"
                    };
                    return "$" + key.replace(/[=:]/g, function(match) {
                        return escaperLookup[match];
                    });
                }
                var userProvidedKeyEscapeRegex = /\/+/g;
                function getElementKey(element, index) {
                    return "object" == typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
                }
                function noop$1() {}
                function resolveThenable(thenable) {
                    switch(thenable.status){
                        case "fulfilled":
                            return thenable.value;
                        case "rejected":
                            throw thenable.reason;
                        default:
                            switch("string" == typeof thenable.status ? thenable.then(noop$1, noop$1) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
                                "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
                            }, function(error) {
                                "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                            })), thenable.status){
                                case "fulfilled":
                                    return thenable.value;
                                case "rejected":
                                    throw thenable.reason;
                            }
                    }
                    throw thenable;
                }
                function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
                    var type = typeof children;
                    if ("undefined" === type || "boolean" === type) children = null;
                    var invokeCallback = !1;
                    if (null === children) invokeCallback = !0;
                    else switch(type){
                        case "bigint":
                        case "string":
                        case "number":
                            invokeCallback = !0;
                            break;
                        case "object":
                            switch(children.$$typeof){
                                case REACT_ELEMENT_TYPE:
                                case REACT_PORTAL_TYPE:
                                    invokeCallback = !0;
                                    break;
                                case REACT_LAZY_TYPE:
                                    return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
                            }
                    }
                    if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
                        return c;
                    })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
                    invokeCallback = 0;
                    var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
                    if (isArrayImpl(children)) for(var i = 0; i < children.length; i++)nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
                    else if (i = getIteratorFn(children), "function" == typeof i) for(children = i.call(children), i = 0; !(nameSoFar = children.next()).done;)nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
                    else if ("object" === type) {
                        if ("function" == typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
                        array = String(children);
                        throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
                    }
                    return invokeCallback;
                }
                function mapChildren(children, func, context) {
                    if (null == children) return children;
                    var result = [], count = 0;
                    mapIntoArray(children, result, "", "", function(child) {
                        return func.call(context, child, count++);
                    });
                    return result;
                }
                function lazyInitializer(payload) {
                    if (-1 === payload._status) {
                        var ctor = payload._result;
                        ctor = ctor();
                        ctor.then(function(moduleObject) {
                            if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
                        }, function(error) {
                            if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
                        });
                        -1 === payload._status && (payload._status = 0, payload._result = ctor);
                    }
                    if (1 === payload._status) return payload._result.default;
                    throw payload._result;
                }
                var reportGlobalError = "function" == typeof reportError ? reportError : function(error) {
                    if ("object" == typeof window && "function" == typeof window.ErrorEvent) {
                        var event = new window.ErrorEvent("error", {
                            bubbles: !0,
                            cancelable: !0,
                            message: "object" == typeof error && null !== error && "string" == typeof error.message ? String(error.message) : String(error),
                            error: error
                        });
                        if (!window.dispatchEvent(event)) return;
                    } else if ("object" == typeof process && "function" == typeof process.emit) {
                        process.emit("uncaughtException", error);
                        return;
                    }
                    console.error(error);
                };
                function noop() {}
                exports1.Children = {
                    map: mapChildren,
                    forEach: function(children, forEachFunc, forEachContext) {
                        mapChildren(children, function() {
                            forEachFunc.apply(this, arguments);
                        }, forEachContext);
                    },
                    count: function(children) {
                        var n = 0;
                        mapChildren(children, function() {
                            n++;
                        });
                        return n;
                    },
                    toArray: function(children) {
                        return mapChildren(children, function(child) {
                            return child;
                        }) || [];
                    },
                    only: function(children) {
                        if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
                        return children;
                    }
                };
                exports1.Component = Component;
                exports1.Fragment = REACT_FRAGMENT_TYPE;
                exports1.Profiler = REACT_PROFILER_TYPE;
                exports1.PureComponent = PureComponent;
                exports1.StrictMode = REACT_STRICT_MODE_TYPE;
                exports1.Suspense = REACT_SUSPENSE_TYPE;
                exports1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
                exports1.act = function() {
                    throw Error("act(...) is not supported in production builds of React.");
                };
                exports1.cache = function(fn) {
                    return function() {
                        return fn.apply(null, arguments);
                    };
                };
                exports1.cloneElement = function(element, config, children) {
                    if (null == element) throw Error("The argument must be a React element, but you passed " + element + ".");
                    var props = assign({}, element.props), key = element.key, owner = void 0;
                    if (null != config) for(propName in void 0 !== config.ref && (owner = void 0), void 0 !== config.key && (key = "" + config.key), config)hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && ("ref" !== propName || void 0 !== config.ref) && (props[propName] = config[propName]);
                    var propName = arguments.length - 2;
                    if (1 === propName) props.children = children;
                    else if (1 < propName) {
                        for(var childArray = Array(propName), i = 0; i < propName; i++)childArray[i] = arguments[i + 2];
                        props.children = childArray;
                    }
                    return ReactElement(element.type, key, void 0, void 0, owner, props);
                };
                exports1.createContext = function(defaultValue) {
                    defaultValue = {
                        $$typeof: REACT_CONTEXT_TYPE,
                        _currentValue: defaultValue,
                        _currentValue2: defaultValue,
                        _threadCount: 0,
                        Provider: null,
                        Consumer: null
                    };
                    defaultValue.Provider = defaultValue;
                    defaultValue.Consumer = {
                        $$typeof: REACT_CONSUMER_TYPE,
                        _context: defaultValue
                    };
                    return defaultValue;
                };
                exports1.createElement = function(type, config, children) {
                    var propName, props = {}, key = null;
                    if (null != config) for(propName in void 0 !== config.key && (key = "" + config.key), config)hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
                    var childrenLength = arguments.length - 2;
                    if (1 === childrenLength) props.children = children;
                    else if (1 < childrenLength) {
                        for(var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)childArray[i] = arguments[i + 2];
                        props.children = childArray;
                    }
                    if (type && type.defaultProps) for(propName in childrenLength = type.defaultProps)void 0 === props[propName] && (props[propName] = childrenLength[propName]);
                    return ReactElement(type, key, void 0, void 0, null, props);
                };
                exports1.createRef = function() {
                    return {
                        current: null
                    };
                };
                exports1.forwardRef = function(render) {
                    return {
                        $$typeof: REACT_FORWARD_REF_TYPE,
                        render: render
                    };
                };
                exports1.isValidElement = isValidElement;
                exports1.lazy = function(ctor) {
                    return {
                        $$typeof: REACT_LAZY_TYPE,
                        _payload: {
                            _status: -1,
                            _result: ctor
                        },
                        _init: lazyInitializer
                    };
                };
                exports1.memo = function(type, compare) {
                    return {
                        $$typeof: REACT_MEMO_TYPE,
                        type: type,
                        compare: void 0 === compare ? null : compare
                    };
                };
                exports1.startTransition = function(scope) {
                    var prevTransition = ReactSharedInternals.T, currentTransition = {};
                    ReactSharedInternals.T = currentTransition;
                    try {
                        var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
                        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
                        "object" == typeof returnValue && null !== returnValue && "function" == typeof returnValue.then && returnValue.then(noop, reportGlobalError);
                    } catch (error) {
                        reportGlobalError(error);
                    } finally{
                        ReactSharedInternals.T = prevTransition;
                    }
                };
                exports1.unstable_useCacheRefresh = function() {
                    return ReactSharedInternals.H.useCacheRefresh();
                };
                exports1.use = function(usable) {
                    return ReactSharedInternals.H.use(usable);
                };
                exports1.useActionState = function(action, initialState, permalink) {
                    return ReactSharedInternals.H.useActionState(action, initialState, permalink);
                };
                exports1.useCallback = function(callback, deps) {
                    return ReactSharedInternals.H.useCallback(callback, deps);
                };
                exports1.useContext = function(Context) {
                    return ReactSharedInternals.H.useContext(Context);
                };
                exports1.useDebugValue = function() {};
                exports1.useDeferredValue = function(value, initialValue) {
                    return ReactSharedInternals.H.useDeferredValue(value, initialValue);
                };
                exports1.useEffect = function(create, deps) {
                    return ReactSharedInternals.H.useEffect(create, deps);
                };
                exports1.useId = function() {
                    return ReactSharedInternals.H.useId();
                };
                exports1.useImperativeHandle = function(ref1, create, deps) {
                    return ReactSharedInternals.H.useImperativeHandle(ref1, create, deps);
                };
                exports1.useInsertionEffect = function(create, deps) {
                    return ReactSharedInternals.H.useInsertionEffect(create, deps);
                };
                exports1.useLayoutEffect = function(create, deps) {
                    return ReactSharedInternals.H.useLayoutEffect(create, deps);
                };
                exports1.useMemo = function(create, deps) {
                    return ReactSharedInternals.H.useMemo(create, deps);
                };
                exports1.useOptimistic = function(passthrough, reducer) {
                    return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
                };
                exports1.useReducer = function(reducer, initialArg, init) {
                    return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
                };
                exports1.useRef = function(initialValue) {
                    return ReactSharedInternals.H.useRef(initialValue);
                };
                exports1.useState = function(initialState) {
                    return ReactSharedInternals.H.useState(initialState);
                };
                exports1.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
                    return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
                };
                exports1.useTransition = function() {
                    return ReactSharedInternals.H.useTransition();
                };
                exports1.version = "19.0.0";
            },
            "./node_modules/.pnpm/react@19.0.0/node_modules/react/index.js": function(module1, __unused_webpack_exports, __webpack_require__) {
                module1.exports = __webpack_require__("./node_modules/.pnpm/react@19.0.0/node_modules/react/cjs/react.production.js");
            },
            "./node_modules/.pnpm/react@19.0.0/node_modules/react/jsx-runtime.js": function(module1, __unused_webpack_exports, __webpack_require__) {
                module1.exports = __webpack_require__("./node_modules/.pnpm/react@19.0.0/node_modules/react/cjs/react-jsx-runtime.production.js");
            },
            "./node_modules/.pnpm/@module-federation+enhanced@0.8.5_@rspack+core@1.1.8_@swc+helpers@0.5.15__react-dom@19.0.0_re_cwtym5m743aedphxkrxhvrlumq/node_modules/@module-federation/enhanced/dist/src/runtime.js": function(__unused_webpack_module, exports1, __webpack_require__) {
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
            __webpack_require__.d = function(exports1, definition) {
                for(var key in definition)if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports1, key)) Object.defineProperty(exports1, key, {
                    enumerable: true,
                    get: definition[key]
                });
            };
        })();
        (()=>{
            __webpack_require__.g = function() {
                if ('object' == typeof globalThis) return globalThis;
                try {
                    return this || new Function('return this')();
                } catch (e) {
                    if ('object' == typeof window) return window;
                }
            }();
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
            default: ()=>vruntime_rslib_entry_
        });
        var runtime = __webpack_require__("./node_modules/.pnpm/@module-federation+enhanced@0.8.5_@rspack+core@1.1.8_@swc+helpers@0.5.15__react-dom@19.0.0_re_cwtym5m743aedphxkrxhvrlumq/node_modules/@module-federation/enhanced/dist/src/runtime.js");
        /**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/ /*! #__NO_SIDE_EFFECTS__ */ function shared_esm_bundler_makeMap(str) {
            const map = /* @__PURE__ */ Object.create(null);
            for (const key of str.split(","))map[key] = 1;
            return (val)=>val in map;
        }
        const shared_esm_bundler_EMPTY_OBJ = {};
        const shared_esm_bundler_EMPTY_ARR = [];
        const shared_esm_bundler_NOOP = ()=>{};
        const NO = ()=>false;
        const shared_esm_bundler_isOn = (key)=>111 === key.charCodeAt(0) && 110 === key.charCodeAt(1) && (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
        const shared_esm_bundler_isModelListener = (key)=>key.startsWith("onUpdate:");
        const shared_esm_bundler_extend = Object.assign;
        const shared_esm_bundler_remove = (arr, el)=>{
            const i = arr.indexOf(el);
            if (i > -1) arr.splice(i, 1);
        };
        const shared_esm_bundler_hasOwnProperty = Object.prototype.hasOwnProperty;
        const hasOwn = (val, key)=>shared_esm_bundler_hasOwnProperty.call(val, key);
        const shared_esm_bundler_isArray = Array.isArray;
        const isMap = (val)=>"[object Map]" === toTypeString(val);
        const shared_esm_bundler_isSet = (val)=>"[object Set]" === toTypeString(val);
        const isDate = (val)=>"[object Date]" === toTypeString(val);
        const isRegExp = (val)=>"[object RegExp]" === toTypeString(val);
        const shared_esm_bundler_isFunction = (val)=>"function" == typeof val;
        const shared_esm_bundler_isString = (val)=>"string" == typeof val;
        const shared_esm_bundler_isSymbol = (val)=>"symbol" == typeof val;
        const shared_esm_bundler_isObject = (val)=>null !== val && "object" == typeof val;
        const shared_esm_bundler_isPromise = (val)=>(shared_esm_bundler_isObject(val) || shared_esm_bundler_isFunction(val)) && shared_esm_bundler_isFunction(val.then) && shared_esm_bundler_isFunction(val.catch);
        const objectToString = Object.prototype.toString;
        const toTypeString = (value)=>objectToString.call(value);
        const shared_esm_bundler_toRawType = (value)=>toTypeString(value).slice(8, -1);
        const shared_esm_bundler_isPlainObject = (val)=>"[object Object]" === toTypeString(val);
        const isIntegerKey = (key)=>shared_esm_bundler_isString(key) && "NaN" !== key && "-" !== key[0] && "" + parseInt(key, 10) === key;
        const shared_esm_bundler_isReservedProp = /* @__PURE__ */ shared_esm_bundler_makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
        const shared_esm_bundler_isBuiltInDirective = /* @__PURE__ */ null;
        const cacheStringFunction = (fn)=>{
            const cache = /* @__PURE__ */ Object.create(null);
            return (str)=>{
                const hit = cache[str];
                return hit || (cache[str] = fn(str));
            };
        };
        const camelizeRE = /-(\w)/g;
        const shared_esm_bundler_camelize = cacheStringFunction((str)=>str.replace(camelizeRE, (_, c)=>c ? c.toUpperCase() : ""));
        const hyphenateRE = /\B([A-Z])/g;
        const shared_esm_bundler_hyphenate = cacheStringFunction((str)=>str.replace(hyphenateRE, "-$1").toLowerCase());
        const shared_esm_bundler_capitalize = cacheStringFunction((str)=>str.charAt(0).toUpperCase() + str.slice(1));
        const shared_esm_bundler_toHandlerKey = cacheStringFunction((str)=>{
            const s = str ? `on${shared_esm_bundler_capitalize(str)}` : "";
            return s;
        });
        const shared_esm_bundler_hasChanged = (value, oldValue)=>!Object.is(value, oldValue);
        const shared_esm_bundler_invokeArrayFns = (fns, ...arg)=>{
            for(let i = 0; i < fns.length; i++)fns[i](...arg);
        };
        const shared_esm_bundler_def = (obj, key, value, writable = false)=>{
            Object.defineProperty(obj, key, {
                configurable: true,
                enumerable: false,
                writable,
                value
            });
        };
        const shared_esm_bundler_looseToNumber = (val)=>{
            const n = parseFloat(val);
            return isNaN(n) ? val : n;
        };
        const shared_esm_bundler_toNumber = (val)=>{
            const n = shared_esm_bundler_isString(val) ? Number(val) : NaN;
            return isNaN(n) ? val : n;
        };
        let _globalThis;
        const getGlobalThis = ()=>_globalThis || (_globalThis = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== __webpack_require__.g ? __webpack_require__.g : {});
        const identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
        function genPropsAccessExp(name1) {
            return identRE.test(name1) ? `__props.${name1}` : `__props[${JSON.stringify(name1)}]`;
        }
        function genCacheKey(source, options) {
            return source + JSON.stringify(options, (_, val)=>"function" == typeof val ? val.toString() : val);
        }
        const PatchFlags = null;
        const PatchFlagNames = {
            [1]: "TEXT",
            [2]: "CLASS",
            [4]: "STYLE",
            [8]: "PROPS",
            [16]: "FULL_PROPS",
            [32]: "NEED_HYDRATION",
            [64]: "STABLE_FRAGMENT",
            [128]: "KEYED_FRAGMENT",
            [256]: "UNKEYED_FRAGMENT",
            [512]: "NEED_PATCH",
            [1024]: "DYNAMIC_SLOTS",
            [2048]: "DEV_ROOT_FRAGMENT",
            [-1]: "HOISTED",
            [-2]: "BAIL"
        };
        const ShapeFlags = null;
        const SlotFlags = null;
        const slotFlagsText = null;
        const GLOBALS_ALLOWED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol";
        const shared_esm_bundler_isGloballyAllowed = /* @__PURE__ */ null;
        const isGloballyWhitelisted = null;
        const range = 2;
        function generateCodeFrame(source, start = 0, end = source.length) {
            start = Math.max(0, Math.min(start, source.length));
            end = Math.max(0, Math.min(end, source.length));
            if (start > end) return "";
            let lines = source.split(/(\r?\n)/);
            const newlineSequences = lines.filter((_, idx)=>idx % 2 === 1);
            lines = lines.filter((_, idx)=>idx % 2 === 0);
            let count = 0;
            const res = [];
            for(let i = 0; i < lines.length; i++){
                count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
                if (count >= start) {
                    for(let j = i - range; j <= i + range || end > count; j++){
                        if (j < 0 || j >= lines.length) continue;
                        const line = j + 1;
                        res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
                        const lineLength = lines[j].length;
                        const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
                        if (j === i) {
                            const pad = start - (count - (lineLength + newLineSeqLength));
                            const length = Math.max(1, end > count ? lineLength - pad : end - start);
                            res.push("   |  " + " ".repeat(pad) + "^".repeat(length));
                        } else if (j > i) {
                            if (end > count) {
                                const length = Math.max(Math.min(end - count, lineLength), 1);
                                res.push("   |  " + "^".repeat(length));
                            }
                            count += lineLength + newLineSeqLength;
                        }
                    }
                    break;
                }
            }
            return res.join("\n");
        }
        function shared_esm_bundler_normalizeStyle(value) {
            if (shared_esm_bundler_isArray(value)) {
                const res = {};
                for(let i = 0; i < value.length; i++){
                    const item = value[i];
                    const normalized = shared_esm_bundler_isString(item) ? parseStringStyle(item) : shared_esm_bundler_normalizeStyle(item);
                    if (normalized) for(const key in normalized)res[key] = normalized[key];
                }
                return res;
            }
            if (shared_esm_bundler_isString(value) || shared_esm_bundler_isObject(value)) return value;
        }
        const listDelimiterRE = /;(?![^(]*\))/g;
        const propertyDelimiterRE = /:([^]+)/;
        const styleCommentRE = /\/\*[^]*?\*\//g;
        function parseStringStyle(cssText) {
            const ret = {};
            cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item)=>{
                if (item) {
                    const tmp = item.split(propertyDelimiterRE);
                    tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
                }
            });
            return ret;
        }
        function shared_esm_bundler_stringifyStyle(styles) {
            if (!styles) return "";
            if (shared_esm_bundler_isString(styles)) return styles;
            let ret = "";
            for(const key in styles){
                const value = styles[key];
                if (shared_esm_bundler_isString(value) || "number" == typeof value) {
                    const normalizedKey = key.startsWith("--") ? key : shared_esm_bundler_hyphenate(key);
                    ret += `${normalizedKey}:${value};`;
                }
            }
            return ret;
        }
        function shared_esm_bundler_normalizeClass(value) {
            let res = "";
            if (shared_esm_bundler_isString(value)) res = value;
            else if (shared_esm_bundler_isArray(value)) for(let i = 0; i < value.length; i++){
                const normalized = shared_esm_bundler_normalizeClass(value[i]);
                if (normalized) res += normalized + " ";
            }
            else if (shared_esm_bundler_isObject(value)) {
                for(const name1 in value)if (value[name1]) res += name1 + " ";
            }
            return res.trim();
        }
        function normalizeProps(props) {
            if (!props) return null;
            let { class: klass, style } = props;
            if (klass && !shared_esm_bundler_isString(klass)) props.class = shared_esm_bundler_normalizeClass(klass);
            if (style) props.style = shared_esm_bundler_normalizeStyle(style);
            return props;
        }
        const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
        const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
        const MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
        const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
        const shared_esm_bundler_isHTMLTag = /* @__PURE__ */ null;
        const shared_esm_bundler_isSVGTag = /* @__PURE__ */ null;
        const shared_esm_bundler_isMathMLTag = /* @__PURE__ */ null;
        const isVoidTag = /* @__PURE__ */ null;
        const specialBooleanAttrs = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
        const isSpecialBooleanAttr = /* @__PURE__ */ shared_esm_bundler_makeMap(specialBooleanAttrs);
        const shared_esm_bundler_isBooleanAttr = /* @__PURE__ */ shared_esm_bundler_makeMap(specialBooleanAttrs + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
        function shared_esm_bundler_includeBooleanAttr(value) {
            return !!value || "" === value;
        }
        const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
        const attrValidationCache = null;
        function isSSRSafeAttrName(name1) {
            if (attrValidationCache.hasOwnProperty(name1)) return attrValidationCache[name1];
            const isUnsafe = unsafeAttrCharRE.test(name1);
            if (isUnsafe) console.error(`unsafe attribute name: ${name1}`);
            return attrValidationCache[name1] = !isUnsafe;
        }
        const propsToAttrMap = null;
        const shared_esm_bundler_isKnownHtmlAttr = /* @__PURE__ */ shared_esm_bundler_makeMap("accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap");
        const shared_esm_bundler_isKnownSvgAttr = /* @__PURE__ */ shared_esm_bundler_makeMap("xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan");
        const isKnownMathMLAttr = /* @__PURE__ */ shared_esm_bundler_makeMap("accent,accentunder,actiontype,align,alignmentscope,altimg,altimg-height,altimg-valign,altimg-width,alttext,bevelled,close,columnsalign,columnlines,columnspan,denomalign,depth,dir,display,displaystyle,encoding,equalcolumns,equalrows,fence,fontstyle,fontweight,form,frame,framespacing,groupalign,height,href,id,indentalign,indentalignfirst,indentalignlast,indentshift,indentshiftfirst,indentshiftlast,indextype,justify,largetop,largeop,lquote,lspace,mathbackground,mathcolor,mathsize,mathvariant,maxsize,minlabelspacing,mode,other,overflow,position,rowalign,rowlines,rowspan,rquote,rspace,scriptlevel,scriptminsize,scriptsizemultiplier,selection,separator,separators,shift,side,src,stackalign,stretchy,subscriptshift,superscriptshift,symmetric,voffset,width,widths,xlink:href,xlink:show,xlink:type,xmlns");
        function shared_esm_bundler_isRenderableAttrValue(value) {
            if (null == value) return false;
            const type = typeof value;
            return "string" === type || "number" === type || "boolean" === type;
        }
        const escapeRE = /["'&<>]/;
        function escapeHtml(string) {
            const str = "" + string;
            const match = escapeRE.exec(str);
            if (!match) return str;
            let html = "";
            let escaped;
            let index;
            let lastIndex = 0;
            for(index = match.index; index < str.length; index++){
                switch(str.charCodeAt(index)){
                    case 34:
                        escaped = "&quot;";
                        break;
                    case 38:
                        escaped = "&amp;";
                        break;
                    case 39:
                        escaped = "&#39;";
                        break;
                    case 60:
                        escaped = "&lt;";
                        break;
                    case 62:
                        escaped = "&gt;";
                        break;
                    default:
                        continue;
                }
                if (lastIndex !== index) html += str.slice(lastIndex, index);
                lastIndex = index + 1;
                html += escaped;
            }
            return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
        }
        const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
        function escapeHtmlComment(src) {
            return src.replace(commentStripRE, "");
        }
        const cssVarNameEscapeSymbolsRE = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;
        function shared_esm_bundler_getEscapedCssVarName(key, doubleEscape) {
            return key.replace(cssVarNameEscapeSymbolsRE, (s)=>doubleEscape ? '"' === s ? '\\\\\\"' : `\\\\${s}` : `\\${s}`);
        }
        function looseCompareArrays(a, b) {
            if (a.length !== b.length) return false;
            let equal = true;
            for(let i = 0; equal && i < a.length; i++)equal = shared_esm_bundler_looseEqual(a[i], b[i]);
            return equal;
        }
        function shared_esm_bundler_looseEqual(a, b) {
            if (a === b) return true;
            let aValidType = isDate(a);
            let bValidType = isDate(b);
            if (aValidType || bValidType) return !!aValidType && !!bValidType && a.getTime() === b.getTime();
            aValidType = shared_esm_bundler_isSymbol(a);
            bValidType = shared_esm_bundler_isSymbol(b);
            if (aValidType || bValidType) return a === b;
            aValidType = shared_esm_bundler_isArray(a);
            bValidType = shared_esm_bundler_isArray(b);
            if (aValidType || bValidType) return !!aValidType && !!bValidType && looseCompareArrays(a, b);
            aValidType = shared_esm_bundler_isObject(a);
            bValidType = shared_esm_bundler_isObject(b);
            if (aValidType || bValidType) {
                if (!aValidType || !bValidType) return false;
                const aKeysCount = Object.keys(a).length;
                const bKeysCount = Object.keys(b).length;
                if (aKeysCount !== bKeysCount) return false;
                for(const key in a){
                    const aHasKey = a.hasOwnProperty(key);
                    const bHasKey = b.hasOwnProperty(key);
                    if (aHasKey && !bHasKey || !aHasKey && bHasKey || !shared_esm_bundler_looseEqual(a[key], b[key])) return false;
                }
            }
            return String(a) === String(b);
        }
        function shared_esm_bundler_looseIndexOf(arr, val) {
            return arr.findIndex((item)=>shared_esm_bundler_looseEqual(item, val));
        }
        const shared_esm_bundler_isRef = (val)=>!!(val && true === val["__v_isRef"]);
        const toDisplayString = (val)=>shared_esm_bundler_isString(val) ? val : null == val ? "" : shared_esm_bundler_isArray(val) || shared_esm_bundler_isObject(val) && (val.toString === objectToString || !shared_esm_bundler_isFunction(val.toString)) ? shared_esm_bundler_isRef(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
        const replacer = (_key, val)=>{
            if (shared_esm_bundler_isRef(val)) return replacer(_key, val.value);
            if (isMap(val)) return {
                [`Map(${val.size})`]: [
                    ...val.entries()
                ].reduce((entries, [key, val2], i)=>{
                    entries[stringifySymbol(key, i) + " =>"] = val2;
                    return entries;
                }, {})
            };
            if (shared_esm_bundler_isSet(val)) return {
                [`Set(${val.size})`]: [
                    ...val.values()
                ].map((v1)=>stringifySymbol(v1))
            };
            else if (shared_esm_bundler_isSymbol(val)) return stringifySymbol(val);
            else if (shared_esm_bundler_isObject(val) && !shared_esm_bundler_isArray(val) && !shared_esm_bundler_isPlainObject(val)) return String(val);
            return val;
        };
        const stringifySymbol = (v1, i = "")=>{
            var _a;
            return shared_esm_bundler_isSymbol(v1) ? `Symbol(${null != (_a = v1.description) ? _a : i})` : v1;
        };
        /**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/ function reactivity_esm_bundler_warn(msg, ...args) {
            console.warn(`[Vue warn] ${msg}`, ...args);
        }
        let activeEffectScope;
        class EffectScope {
            constructor(detached = false){
                this.detached = detached;
                this._active = true;
                this.effects = [];
                this.cleanups = [];
                this._isPaused = false;
                this.parent = activeEffectScope;
                if (!detached && activeEffectScope) this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
            }
            get active() {
                return this._active;
            }
            pause() {
                if (this._active) {
                    this._isPaused = true;
                    let i, l;
                    if (this.scopes) for(i = 0, l = this.scopes.length; i < l; i++)this.scopes[i].pause();
                    for(i = 0, l = this.effects.length; i < l; i++)this.effects[i].pause();
                }
            }
            resume() {
                if (this._active) {
                    if (this._isPaused) {
                        this._isPaused = false;
                        let i, l;
                        if (this.scopes) for(i = 0, l = this.scopes.length; i < l; i++)this.scopes[i].resume();
                        for(i = 0, l = this.effects.length; i < l; i++)this.effects[i].resume();
                    }
                }
            }
            run(fn) {
                if (this._active) {
                    const currentEffectScope = activeEffectScope;
                    try {
                        activeEffectScope = this;
                        return fn();
                    } finally{
                        activeEffectScope = currentEffectScope;
                    }
                }
            }
            on() {
                activeEffectScope = this;
            }
            off() {
                activeEffectScope = this.parent;
            }
            stop(fromParent) {
                if (this._active) {
                    this._active = false;
                    let i, l;
                    for(i = 0, l = this.effects.length; i < l; i++)this.effects[i].stop();
                    this.effects.length = 0;
                    for(i = 0, l = this.cleanups.length; i < l; i++)this.cleanups[i]();
                    this.cleanups.length = 0;
                    if (this.scopes) {
                        for(i = 0, l = this.scopes.length; i < l; i++)this.scopes[i].stop(true);
                        this.scopes.length = 0;
                    }
                    if (!this.detached && this.parent && !fromParent) {
                        const last = this.parent.scopes.pop();
                        if (last && last !== this) {
                            this.parent.scopes[this.index] = last;
                            last.index = this.index;
                        }
                    }
                    this.parent = void 0;
                }
            }
        }
        function effectScope(detached) {
            return new EffectScope(detached);
        }
        function getCurrentScope() {
            return activeEffectScope;
        }
        function onScopeDispose(fn, failSilently = false) {
            if (activeEffectScope) activeEffectScope.cleanups.push(fn);
        }
        let activeSub;
        const EffectFlags = null;
        const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
        class ReactiveEffect {
            constructor(fn){
                this.fn = fn;
                this.deps = void 0;
                this.depsTail = void 0;
                this.flags = 5;
                this.next = void 0;
                this.cleanup = void 0;
                this.scheduler = void 0;
                if (activeEffectScope && activeEffectScope.active) activeEffectScope.effects.push(this);
            }
            pause() {
                this.flags |= 64;
            }
            resume() {
                if (64 & this.flags) {
                    this.flags &= -65;
                    if (pausedQueueEffects.has(this)) {
                        pausedQueueEffects.delete(this);
                        this.trigger();
                    }
                }
            }
            notify() {
                if (2 & this.flags && !(32 & this.flags)) return;
                if (!(8 & this.flags)) batch(this);
            }
            run() {
                if (!(1 & this.flags)) return this.fn();
                this.flags |= 2;
                cleanupEffect(this);
                prepareDeps(this);
                const prevEffect = activeSub;
                const prevShouldTrack = shouldTrack;
                activeSub = this;
                shouldTrack = true;
                try {
                    return this.fn();
                } finally{
                    cleanupDeps(this);
                    activeSub = prevEffect;
                    shouldTrack = prevShouldTrack;
                    this.flags &= -3;
                }
            }
            stop() {
                if (1 & this.flags) {
                    for(let link = this.deps; link; link = link.nextDep)removeSub(link);
                    this.deps = this.depsTail = void 0;
                    cleanupEffect(this);
                    this.onStop && this.onStop();
                    this.flags &= -2;
                }
            }
            trigger() {
                if (64 & this.flags) pausedQueueEffects.add(this);
                else if (this.scheduler) this.scheduler();
                else this.runIfDirty();
            }
            runIfDirty() {
                if (isDirty(this)) this.run();
            }
            get dirty() {
                return isDirty(this);
            }
        }
        let batchDepth = 0;
        let batchedSub;
        let batchedComputed;
        function batch(sub, isComputed = false) {
            sub.flags |= 8;
            if (isComputed) {
                sub.next = batchedComputed;
                batchedComputed = sub;
                return;
            }
            sub.next = batchedSub;
            batchedSub = sub;
        }
        function startBatch() {
            batchDepth++;
        }
        function endBatch() {
            if (--batchDepth > 0) return;
            if (batchedComputed) {
                let e = batchedComputed;
                batchedComputed = void 0;
                while(e){
                    const next = e.next;
                    e.next = void 0;
                    e.flags &= -9;
                    e = next;
                }
            }
            let error;
            while(batchedSub){
                let e = batchedSub;
                batchedSub = void 0;
                while(e){
                    const next = e.next;
                    e.next = void 0;
                    e.flags &= -9;
                    if (1 & e.flags) try {
                        e.trigger();
                    } catch (err) {
                        if (!error) error = err;
                    }
                    e = next;
                }
            }
            if (error) throw error;
        }
        function prepareDeps(sub) {
            for(let link = sub.deps; link; link = link.nextDep){
                link.version = -1;
                link.prevActiveLink = link.dep.activeLink;
                link.dep.activeLink = link;
            }
        }
        function cleanupDeps(sub) {
            let head;
            let tail = sub.depsTail;
            let link = tail;
            while(link){
                const prev = link.prevDep;
                if (-1 === link.version) {
                    if (link === tail) tail = prev;
                    removeSub(link);
                    removeDep(link);
                } else head = link;
                link.dep.activeLink = link.prevActiveLink;
                link.prevActiveLink = void 0;
                link = prev;
            }
            sub.deps = head;
            sub.depsTail = tail;
        }
        function isDirty(sub) {
            for(let link = sub.deps; link; link = link.nextDep)if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) return true;
            if (sub._dirty) return true;
            return false;
        }
        function refreshComputed(computed) {
            if (4 & computed.flags && !(16 & computed.flags)) return;
            computed.flags &= -17;
            if (computed.globalVersion === globalVersion) return;
            computed.globalVersion = globalVersion;
            const dep = computed.dep;
            computed.flags |= 2;
            if (dep.version > 0 && !computed.isSSR && computed.deps && !isDirty(computed)) {
                computed.flags &= -3;
                return;
            }
            const prevSub = activeSub;
            const prevShouldTrack = shouldTrack;
            activeSub = computed;
            shouldTrack = true;
            try {
                prepareDeps(computed);
                const value = computed.fn(computed._value);
                if (0 === dep.version || shared_esm_bundler_hasChanged(value, computed._value)) {
                    computed._value = value;
                    dep.version++;
                }
            } catch (err) {
                dep.version++;
                throw err;
            } finally{
                activeSub = prevSub;
                shouldTrack = prevShouldTrack;
                cleanupDeps(computed);
                computed.flags &= -3;
            }
        }
        function removeSub(link, soft = false) {
            const { dep, prevSub, nextSub } = link;
            if (prevSub) {
                prevSub.nextSub = nextSub;
                link.prevSub = void 0;
            }
            if (nextSub) {
                nextSub.prevSub = prevSub;
                link.nextSub = void 0;
            }
            if (dep.subs === link) {
                dep.subs = prevSub;
                if (!prevSub && dep.computed) {
                    dep.computed.flags &= -5;
                    for(let l = dep.computed.deps; l; l = l.nextDep)removeSub(l, true);
                }
            }
            if (!soft && !--dep.sc && dep.map) dep.map.delete(dep.key);
        }
        function removeDep(link) {
            const { prevDep, nextDep } = link;
            if (prevDep) {
                prevDep.nextDep = nextDep;
                link.prevDep = void 0;
            }
            if (nextDep) {
                nextDep.prevDep = prevDep;
                link.nextDep = void 0;
            }
        }
        function reactivity_esm_bundler_effect(fn, options) {
            if (fn.effect instanceof ReactiveEffect) fn = fn.effect.fn;
            const e = new ReactiveEffect(fn);
            if (options) extend(e, options);
            try {
                e.run();
            } catch (err) {
                e.stop();
                throw err;
            }
            const runner = e.run.bind(e);
            runner.effect = e;
            return runner;
        }
        function stop(runner) {
            runner.effect.stop();
        }
        let shouldTrack = true;
        const trackStack = [];
        function reactivity_esm_bundler_pauseTracking() {
            trackStack.push(shouldTrack);
            shouldTrack = false;
        }
        function enableTracking() {
            trackStack.push(shouldTrack);
            shouldTrack = true;
        }
        function reactivity_esm_bundler_resetTracking() {
            const last = trackStack.pop();
            shouldTrack = void 0 === last || last;
        }
        function onEffectCleanup(fn, failSilently = false) {
            if (activeSub instanceof ReactiveEffect) activeSub.cleanup = fn;
        }
        function cleanupEffect(e) {
            const { cleanup } = e;
            e.cleanup = void 0;
            if (cleanup) {
                const prevSub = activeSub;
                activeSub = void 0;
                try {
                    cleanup();
                } finally{
                    activeSub = prevSub;
                }
            }
        }
        let globalVersion = 0;
        class Link {
            constructor(sub, dep){
                this.sub = sub;
                this.dep = dep;
                this.version = dep.version;
                this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
            }
        }
        class Dep {
            constructor(computed){
                this.computed = computed;
                this.version = 0;
                this.activeLink = void 0;
                this.subs = void 0;
                this.map = void 0;
                this.key = void 0;
                this.sc = 0;
            }
            track(debugInfo) {
                if (!activeSub || !shouldTrack || activeSub === this.computed) return;
                let link = this.activeLink;
                if (void 0 === link || link.sub !== activeSub) {
                    link = this.activeLink = new Link(activeSub, this);
                    if (activeSub.deps) {
                        link.prevDep = activeSub.depsTail;
                        activeSub.depsTail.nextDep = link;
                        activeSub.depsTail = link;
                    } else activeSub.deps = activeSub.depsTail = link;
                    addSub(link);
                } else if (-1 === link.version) {
                    link.version = this.version;
                    if (link.nextDep) {
                        const next = link.nextDep;
                        next.prevDep = link.prevDep;
                        if (link.prevDep) link.prevDep.nextDep = next;
                        link.prevDep = activeSub.depsTail;
                        link.nextDep = void 0;
                        activeSub.depsTail.nextDep = link;
                        activeSub.depsTail = link;
                        if (activeSub.deps === link) activeSub.deps = next;
                    }
                }
                return link;
            }
            trigger(debugInfo) {
                this.version++;
                globalVersion++;
                this.notify(debugInfo);
            }
            notify(debugInfo) {
                startBatch();
                try {
                    for(let link = this.subs; link; link = link.prevSub)if (link.sub.notify()) link.sub.dep.notify();
                } finally{
                    endBatch();
                }
            }
        }
        function addSub(link) {
            link.dep.sc++;
            if (4 & link.sub.flags) {
                const computed = link.dep.computed;
                if (computed && !link.dep.subs) {
                    computed.flags |= 20;
                    for(let l = computed.deps; l; l = l.nextDep)addSub(l);
                }
                const currentTail = link.dep.subs;
                if (currentTail !== link) {
                    link.prevSub = currentTail;
                    if (currentTail) currentTail.nextSub = link;
                }
                link.dep.subs = link;
            }
        }
        const targetMap = /* @__PURE__ */ new WeakMap();
        const ITERATE_KEY = Symbol("");
        const MAP_KEY_ITERATE_KEY = Symbol("");
        const ARRAY_ITERATE_KEY = Symbol("");
        function reactivity_esm_bundler_track(target, type, key) {
            if (shouldTrack && activeSub) {
                let depsMap = targetMap.get(target);
                if (!depsMap) targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
                let dep = depsMap.get(key);
                if (!dep) {
                    depsMap.set(key, dep = new Dep());
                    dep.map = depsMap;
                    dep.key = key;
                }
                dep.track();
            }
        }
        function reactivity_esm_bundler_trigger(target, type, key, newValue, oldValue, oldTarget) {
            const depsMap = targetMap.get(target);
            if (!depsMap) {
                globalVersion++;
                return;
            }
            const run = (dep)=>{
                if (dep) dep.trigger();
            };
            startBatch();
            if ("clear" === type) depsMap.forEach(run);
            else {
                const targetIsArray = shared_esm_bundler_isArray(target);
                const isArrayIndex = targetIsArray && isIntegerKey(key);
                if (targetIsArray && "length" === key) {
                    const newLength = Number(newValue);
                    depsMap.forEach((dep, key2)=>{
                        if ("length" === key2 || key2 === ARRAY_ITERATE_KEY || !shared_esm_bundler_isSymbol(key2) && key2 >= newLength) run(dep);
                    });
                } else {
                    if (void 0 !== key || depsMap.has(void 0)) run(depsMap.get(key));
                    if (isArrayIndex) run(depsMap.get(ARRAY_ITERATE_KEY));
                    switch(type){
                        case "add":
                            if (targetIsArray) {
                                if (isArrayIndex) run(depsMap.get("length"));
                            } else {
                                run(depsMap.get(ITERATE_KEY));
                                if (isMap(target)) run(depsMap.get(MAP_KEY_ITERATE_KEY));
                            }
                            break;
                        case "delete":
                            if (!targetIsArray) {
                                run(depsMap.get(ITERATE_KEY));
                                if (isMap(target)) run(depsMap.get(MAP_KEY_ITERATE_KEY));
                            }
                            break;
                        case "set":
                            if (isMap(target)) run(depsMap.get(ITERATE_KEY));
                            break;
                    }
                }
            }
            endBatch();
        }
        function getDepFromReactive(object, key) {
            const depMap = targetMap.get(object);
            return depMap && depMap.get(key);
        }
        function reactiveReadArray(array) {
            const raw = reactivity_esm_bundler_toRaw(array);
            if (raw === array) return raw;
            reactivity_esm_bundler_track(raw, "iterate", ARRAY_ITERATE_KEY);
            return reactivity_esm_bundler_isShallow(array) ? raw : raw.map(reactivity_esm_bundler_toReactive);
        }
        function reactivity_esm_bundler_shallowReadArray(arr) {
            reactivity_esm_bundler_track(arr = reactivity_esm_bundler_toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
            return arr;
        }
        const arrayInstrumentations = {
            __proto__: null,
            [Symbol.iterator] () {
                return iterator(this, Symbol.iterator, reactivity_esm_bundler_toReactive);
            },
            concat (...args) {
                return reactiveReadArray(this).concat(...args.map((x)=>shared_esm_bundler_isArray(x) ? reactiveReadArray(x) : x));
            },
            entries () {
                return iterator(this, "entries", (value)=>{
                    value[1] = reactivity_esm_bundler_toReactive(value[1]);
                    return value;
                });
            },
            every (fn, thisArg) {
                return apply(this, "every", fn, thisArg, void 0, arguments);
            },
            filter (fn, thisArg) {
                return apply(this, "filter", fn, thisArg, (v1)=>v1.map(reactivity_esm_bundler_toReactive), arguments);
            },
            find (fn, thisArg) {
                return apply(this, "find", fn, thisArg, reactivity_esm_bundler_toReactive, arguments);
            },
            findIndex (fn, thisArg) {
                return apply(this, "findIndex", fn, thisArg, void 0, arguments);
            },
            findLast (fn, thisArg) {
                return apply(this, "findLast", fn, thisArg, reactivity_esm_bundler_toReactive, arguments);
            },
            findLastIndex (fn, thisArg) {
                return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
            },
            forEach (fn, thisArg) {
                return apply(this, "forEach", fn, thisArg, void 0, arguments);
            },
            includes (...args) {
                return searchProxy(this, "includes", args);
            },
            indexOf (...args) {
                return searchProxy(this, "indexOf", args);
            },
            join (separator) {
                return reactiveReadArray(this).join(separator);
            },
            lastIndexOf (...args) {
                return searchProxy(this, "lastIndexOf", args);
            },
            map (fn, thisArg) {
                return apply(this, "map", fn, thisArg, void 0, arguments);
            },
            pop () {
                return noTracking(this, "pop");
            },
            push (...args) {
                return noTracking(this, "push", args);
            },
            reduce (fn, ...args) {
                return reduce(this, "reduce", fn, args);
            },
            reduceRight (fn, ...args) {
                return reduce(this, "reduceRight", fn, args);
            },
            shift () {
                return noTracking(this, "shift");
            },
            some (fn, thisArg) {
                return apply(this, "some", fn, thisArg, void 0, arguments);
            },
            splice (...args) {
                return noTracking(this, "splice", args);
            },
            toReversed () {
                return reactiveReadArray(this).toReversed();
            },
            toSorted (comparer) {
                return reactiveReadArray(this).toSorted(comparer);
            },
            toSpliced (...args) {
                return reactiveReadArray(this).toSpliced(...args);
            },
            unshift (...args) {
                return noTracking(this, "unshift", args);
            },
            values () {
                return iterator(this, "values", reactivity_esm_bundler_toReactive);
            }
        };
        function iterator(self1, method, wrapValue) {
            const arr = reactivity_esm_bundler_shallowReadArray(self1);
            const iter = arr[method]();
            if (arr !== self1 && !reactivity_esm_bundler_isShallow(self1)) {
                iter._next = iter.next;
                iter.next = ()=>{
                    const result = iter._next();
                    if (result.value) result.value = wrapValue(result.value);
                    return result;
                };
            }
            return iter;
        }
        const arrayProto = Array.prototype;
        function apply(self1, method, fn, thisArg, wrappedRetFn, args) {
            const arr = reactivity_esm_bundler_shallowReadArray(self1);
            const needsWrap = arr !== self1 && !reactivity_esm_bundler_isShallow(self1);
            const methodFn = arr[method];
            if (methodFn !== arrayProto[method]) {
                const result2 = methodFn.apply(self1, args);
                return needsWrap ? reactivity_esm_bundler_toReactive(result2) : result2;
            }
            let wrappedFn = fn;
            if (arr !== self1) {
                if (needsWrap) wrappedFn = function(item, index) {
                    return fn.call(this, reactivity_esm_bundler_toReactive(item), index, self1);
                };
                else if (fn.length > 2) wrappedFn = function(item, index) {
                    return fn.call(this, item, index, self1);
                };
            }
            const result = methodFn.call(arr, wrappedFn, thisArg);
            return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
        }
        function reduce(self1, method, fn, args) {
            const arr = reactivity_esm_bundler_shallowReadArray(self1);
            let wrappedFn = fn;
            if (arr !== self1) {
                if (reactivity_esm_bundler_isShallow(self1)) {
                    if (fn.length > 3) wrappedFn = function(acc, item, index) {
                        return fn.call(this, acc, item, index, self1);
                    };
                } else wrappedFn = function(acc, item, index) {
                    return fn.call(this, acc, reactivity_esm_bundler_toReactive(item), index, self1);
                };
            }
            return arr[method](wrappedFn, ...args);
        }
        function searchProxy(self1, method, args) {
            const arr = reactivity_esm_bundler_toRaw(self1);
            reactivity_esm_bundler_track(arr, "iterate", ARRAY_ITERATE_KEY);
            const res = arr[method](...args);
            if ((-1 === res || false === res) && isProxy(args[0])) {
                args[0] = reactivity_esm_bundler_toRaw(args[0]);
                return arr[method](...args);
            }
            return res;
        }
        function noTracking(self1, method, args = []) {
            reactivity_esm_bundler_pauseTracking();
            startBatch();
            const res = reactivity_esm_bundler_toRaw(self1)[method].apply(self1, args);
            endBatch();
            reactivity_esm_bundler_resetTracking();
            return res;
        }
        const isNonTrackableKeys = /* @__PURE__ */ shared_esm_bundler_makeMap("__proto__,__v_isRef,__isVue");
        const builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key)=>"arguments" !== key && "caller" !== key).map((key)=>Symbol[key]).filter(shared_esm_bundler_isSymbol));
        function reactivity_esm_bundler_hasOwnProperty(key) {
            if (!shared_esm_bundler_isSymbol(key)) key = String(key);
            const obj = reactivity_esm_bundler_toRaw(this);
            reactivity_esm_bundler_track(obj, "has", key);
            return obj.hasOwnProperty(key);
        }
        class BaseReactiveHandler {
            constructor(_isReadonly = false, _isShallow = false){
                this._isReadonly = _isReadonly;
                this._isShallow = _isShallow;
            }
            get(target, key, receiver) {
                if ("__v_skip" === key) return target["__v_skip"];
                const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
                if ("__v_isReactive" === key) return !isReadonly2;
                if ("__v_isReadonly" === key) return isReadonly2;
                if ("__v_isShallow" === key) return isShallow2;
                else if ("__v_raw" === key) {
                    if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) return target;
                    return;
                }
                const targetIsArray = shared_esm_bundler_isArray(target);
                if (!isReadonly2) {
                    let fn;
                    if (targetIsArray && (fn = arrayInstrumentations[key])) return fn;
                    if ("hasOwnProperty" === key) return reactivity_esm_bundler_hasOwnProperty;
                }
                const res = Reflect.get(target, key, reactivity_esm_bundler_isRef(target) ? target : receiver);
                if (shared_esm_bundler_isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) return res;
                if (!isReadonly2) reactivity_esm_bundler_track(target, "get", key);
                if (isShallow2) return res;
                if (reactivity_esm_bundler_isRef(res)) return targetIsArray && isIntegerKey(key) ? res : res.value;
                if (shared_esm_bundler_isObject(res)) return isReadonly2 ? reactivity_esm_bundler_readonly(res) : reactive(res);
                return res;
            }
        }
        class MutableReactiveHandler extends BaseReactiveHandler {
            constructor(isShallow2 = false){
                super(false, isShallow2);
            }
            set(target, key, value, receiver) {
                let oldValue = target[key];
                if (!this._isShallow) {
                    const isOldValueReadonly = reactivity_esm_bundler_isReadonly(oldValue);
                    if (!reactivity_esm_bundler_isShallow(value) && !reactivity_esm_bundler_isReadonly(value)) {
                        oldValue = reactivity_esm_bundler_toRaw(oldValue);
                        value = reactivity_esm_bundler_toRaw(value);
                    }
                    if (!shared_esm_bundler_isArray(target) && reactivity_esm_bundler_isRef(oldValue) && !reactivity_esm_bundler_isRef(value)) {
                        if (isOldValueReadonly) return false;
                        oldValue.value = value;
                        return true;
                    }
                }
                const hadKey = shared_esm_bundler_isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
                const result = Reflect.set(target, key, value, reactivity_esm_bundler_isRef(target) ? target : receiver);
                if (target === reactivity_esm_bundler_toRaw(receiver)) {
                    if (hadKey) {
                        if (shared_esm_bundler_hasChanged(value, oldValue)) reactivity_esm_bundler_trigger(target, "set", key, value, oldValue);
                    } else reactivity_esm_bundler_trigger(target, "add", key, value);
                }
                return result;
            }
            deleteProperty(target, key) {
                const hadKey = hasOwn(target, key);
                const oldValue = target[key];
                const result = Reflect.deleteProperty(target, key);
                if (result && hadKey) reactivity_esm_bundler_trigger(target, "delete", key, void 0, oldValue);
                return result;
            }
            has(target, key) {
                const result = Reflect.has(target, key);
                if (!shared_esm_bundler_isSymbol(key) || !builtInSymbols.has(key)) reactivity_esm_bundler_track(target, "has", key);
                return result;
            }
            ownKeys(target) {
                reactivity_esm_bundler_track(target, "iterate", shared_esm_bundler_isArray(target) ? "length" : ITERATE_KEY);
                return Reflect.ownKeys(target);
            }
        }
        class ReadonlyReactiveHandler extends BaseReactiveHandler {
            constructor(isShallow2 = false){
                super(true, isShallow2);
            }
            set(target, key) {
                return true;
            }
            deleteProperty(target, key) {
                return true;
            }
        }
        const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
        const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
        const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
        const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
        const toShallow = (value)=>value;
        const getProto = (v1)=>Reflect.getPrototypeOf(v1);
        function createIterableMethod(method, isReadonly2, isShallow2) {
            return function(...args) {
                const target = this["__v_raw"];
                const rawTarget = reactivity_esm_bundler_toRaw(target);
                const targetIsMap = isMap(rawTarget);
                const isPair = "entries" === method || method === Symbol.iterator && targetIsMap;
                const isKeyOnly = "keys" === method && targetIsMap;
                const innerIterator = target[method](...args);
                const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : reactivity_esm_bundler_toReactive;
                isReadonly2 || reactivity_esm_bundler_track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
                return {
                    next () {
                        const { value, done } = innerIterator.next();
                        return done ? {
                            value,
                            done
                        } : {
                            value: isPair ? [
                                wrap(value[0]),
                                wrap(value[1])
                            ] : wrap(value),
                            done
                        };
                    },
                    [Symbol.iterator] () {
                        return this;
                    }
                };
            };
        }
        function createReadonlyMethod(type) {
            return function(...args) {
                return "delete" !== type && ("clear" === type ? void 0 : this);
            };
        }
        function createInstrumentations(readonly, shallow) {
            const instrumentations = {
                get (key) {
                    const target = this["__v_raw"];
                    const rawTarget = reactivity_esm_bundler_toRaw(target);
                    const rawKey = reactivity_esm_bundler_toRaw(key);
                    if (!readonly) {
                        if (shared_esm_bundler_hasChanged(key, rawKey)) reactivity_esm_bundler_track(rawTarget, "get", key);
                        reactivity_esm_bundler_track(rawTarget, "get", rawKey);
                    }
                    const { has } = getProto(rawTarget);
                    const wrap = shallow ? toShallow : readonly ? toReadonly : reactivity_esm_bundler_toReactive;
                    if (has.call(rawTarget, key)) return wrap(target.get(key));
                    if (has.call(rawTarget, rawKey)) return wrap(target.get(rawKey));
                    if (target !== rawTarget) target.get(key);
                },
                get size () {
                    const target = this["__v_raw"];
                    readonly || reactivity_esm_bundler_track(reactivity_esm_bundler_toRaw(target), "iterate", ITERATE_KEY);
                    return Reflect.get(target, "size", target);
                },
                has (key) {
                    const target = this["__v_raw"];
                    const rawTarget = reactivity_esm_bundler_toRaw(target);
                    const rawKey = reactivity_esm_bundler_toRaw(key);
                    if (!readonly) {
                        if (shared_esm_bundler_hasChanged(key, rawKey)) reactivity_esm_bundler_track(rawTarget, "has", key);
                        reactivity_esm_bundler_track(rawTarget, "has", rawKey);
                    }
                    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
                },
                forEach (callback, thisArg) {
                    const observed = this;
                    const target = observed["__v_raw"];
                    const rawTarget = reactivity_esm_bundler_toRaw(target);
                    const wrap = shallow ? toShallow : readonly ? toReadonly : reactivity_esm_bundler_toReactive;
                    readonly || reactivity_esm_bundler_track(rawTarget, "iterate", ITERATE_KEY);
                    return target.forEach((value, key)=>callback.call(thisArg, wrap(value), wrap(key), observed));
                }
            };
            shared_esm_bundler_extend(instrumentations, readonly ? {
                add: createReadonlyMethod("add"),
                set: createReadonlyMethod("set"),
                delete: createReadonlyMethod("delete"),
                clear: createReadonlyMethod("clear")
            } : {
                add (value) {
                    if (!shallow && !reactivity_esm_bundler_isShallow(value) && !reactivity_esm_bundler_isReadonly(value)) value = reactivity_esm_bundler_toRaw(value);
                    const target = reactivity_esm_bundler_toRaw(this);
                    const proto = getProto(target);
                    const hadKey = proto.has.call(target, value);
                    if (!hadKey) {
                        target.add(value);
                        reactivity_esm_bundler_trigger(target, "add", value, value);
                    }
                    return this;
                },
                set (key, value) {
                    if (!shallow && !reactivity_esm_bundler_isShallow(value) && !reactivity_esm_bundler_isReadonly(value)) value = reactivity_esm_bundler_toRaw(value);
                    const target = reactivity_esm_bundler_toRaw(this);
                    const { has, get } = getProto(target);
                    let hadKey = has.call(target, key);
                    if (hadKey) ;
                    else {
                        key = reactivity_esm_bundler_toRaw(key);
                        hadKey = has.call(target, key);
                    }
                    const oldValue = get.call(target, key);
                    target.set(key, value);
                    if (hadKey) {
                        if (shared_esm_bundler_hasChanged(value, oldValue)) reactivity_esm_bundler_trigger(target, "set", key, value, oldValue);
                    } else reactivity_esm_bundler_trigger(target, "add", key, value);
                    return this;
                },
                delete (key) {
                    const target = reactivity_esm_bundler_toRaw(this);
                    const { has, get } = getProto(target);
                    let hadKey = has.call(target, key);
                    if (hadKey) ;
                    else {
                        key = reactivity_esm_bundler_toRaw(key);
                        hadKey = has.call(target, key);
                    }
                    const oldValue = get ? get.call(target, key) : void 0;
                    const result = target.delete(key);
                    if (hadKey) reactivity_esm_bundler_trigger(target, "delete", key, void 0, oldValue);
                    return result;
                },
                clear () {
                    const target = reactivity_esm_bundler_toRaw(this);
                    const hadItems = 0 !== target.size;
                    const oldTarget = void 0;
                    const result = target.clear();
                    if (hadItems) reactivity_esm_bundler_trigger(target, "clear", void 0, void 0, oldTarget);
                    return result;
                }
            });
            const iteratorMethods = [
                "keys",
                "values",
                "entries",
                Symbol.iterator
            ];
            iteratorMethods.forEach((method)=>{
                instrumentations[method] = createIterableMethod(method, readonly, shallow);
            });
            return instrumentations;
        }
        function createInstrumentationGetter(isReadonly2, shallow) {
            const instrumentations = createInstrumentations(isReadonly2, shallow);
            return (target, key, receiver)=>{
                if ("__v_isReactive" === key) return !isReadonly2;
                if ("__v_isReadonly" === key) return isReadonly2;
                if ("__v_raw" === key) return target;
                return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
            };
        }
        const mutableCollectionHandlers = {
            get: /* @__PURE__ */ createInstrumentationGetter(false, false)
        };
        const shallowCollectionHandlers = {
            get: /* @__PURE__ */ createInstrumentationGetter(false, true)
        };
        const readonlyCollectionHandlers = {
            get: /* @__PURE__ */ createInstrumentationGetter(true, false)
        };
        const shallowReadonlyCollectionHandlers = {
            get: /* @__PURE__ */ createInstrumentationGetter(true, true)
        };
        function checkIdentityKeys(target, has, key) {
            const rawKey = reactivity_esm_bundler_toRaw(key);
            if (rawKey !== key && has.call(target, rawKey)) {
                const type = toRawType(target);
                reactivity_esm_bundler_warn(`Reactive ${type} contains both the raw and reactive versions of the same object${"Map" === type ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
            }
        }
        const reactiveMap = /* @__PURE__ */ new WeakMap();
        const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
        const readonlyMap = /* @__PURE__ */ new WeakMap();
        const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
        function targetTypeMap(rawType) {
            switch(rawType){
                case "Object":
                case "Array":
                    return 1;
                case "Map":
                case "Set":
                case "WeakMap":
                case "WeakSet":
                    return 2;
                default:
                    return 0;
            }
        }
        function getTargetType(value) {
            return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(shared_esm_bundler_toRawType(value));
        }
        function reactive(target) {
            if (reactivity_esm_bundler_isReadonly(target)) return target;
            return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
        }
        function shallowReactive(target) {
            return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
        }
        function reactivity_esm_bundler_readonly(target) {
            return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
        }
        function shallowReadonly(target) {
            return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
        }
        function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
            if (!shared_esm_bundler_isObject(target)) return target;
            if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) return target;
            const existingProxy = proxyMap.get(target);
            if (existingProxy) return existingProxy;
            const targetType = getTargetType(target);
            if (0 === targetType) return target;
            const proxy = new Proxy(target, 2 === targetType ? collectionHandlers : baseHandlers);
            proxyMap.set(target, proxy);
            return proxy;
        }
        function reactivity_esm_bundler_isReactive(value) {
            if (reactivity_esm_bundler_isReadonly(value)) return reactivity_esm_bundler_isReactive(value["__v_raw"]);
            return !!(value && value["__v_isReactive"]);
        }
        function reactivity_esm_bundler_isReadonly(value) {
            return !!(value && value["__v_isReadonly"]);
        }
        function reactivity_esm_bundler_isShallow(value) {
            return !!(value && value["__v_isShallow"]);
        }
        function isProxy(value) {
            return !!value && !!value["__v_raw"];
        }
        function reactivity_esm_bundler_toRaw(observed) {
            const raw = observed && observed["__v_raw"];
            return raw ? reactivity_esm_bundler_toRaw(raw) : observed;
        }
        function markRaw(value) {
            if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) shared_esm_bundler_def(value, "__v_skip", true);
            return value;
        }
        const reactivity_esm_bundler_toReactive = (value)=>shared_esm_bundler_isObject(value) ? reactive(value) : value;
        const toReadonly = (value)=>shared_esm_bundler_isObject(value) ? reactivity_esm_bundler_readonly(value) : value;
        function reactivity_esm_bundler_isRef(r) {
            return !!r && true === r["__v_isRef"];
        }
        function reactivity_esm_bundler_ref(value) {
            return createRef(value, false);
        }
        function reactivity_esm_bundler_shallowRef(value) {
            return createRef(value, true);
        }
        function createRef(rawValue, shallow) {
            if (reactivity_esm_bundler_isRef(rawValue)) return rawValue;
            return new RefImpl(rawValue, shallow);
        }
        class RefImpl {
            constructor(value, isShallow2){
                this.dep = new Dep();
                this["__v_isRef"] = true;
                this["__v_isShallow"] = false;
                this._rawValue = isShallow2 ? value : reactivity_esm_bundler_toRaw(value);
                this._value = isShallow2 ? value : reactivity_esm_bundler_toReactive(value);
                this["__v_isShallow"] = isShallow2;
            }
            get value() {
                this.dep.track();
                return this._value;
            }
            set value(newValue) {
                const oldValue = this._rawValue;
                const useDirectValue = this["__v_isShallow"] || reactivity_esm_bundler_isShallow(newValue) || reactivity_esm_bundler_isReadonly(newValue);
                newValue = useDirectValue ? newValue : reactivity_esm_bundler_toRaw(newValue);
                if (hasChanged(newValue, oldValue)) {
                    this._rawValue = newValue;
                    this._value = useDirectValue ? newValue : reactivity_esm_bundler_toReactive(newValue);
                    this.dep.trigger();
                }
            }
        }
        function triggerRef(ref2) {
            if (ref2.dep) ref2.dep.trigger();
        }
        function unref(ref2) {
            return reactivity_esm_bundler_isRef(ref2) ? ref2.value : ref2;
        }
        function toValue(source) {
            return isFunction(source) ? source() : unref(source);
        }
        const shallowUnwrapHandlers = {
            get: (target, key, receiver)=>"__v_raw" === key ? target : unref(Reflect.get(target, key, receiver)),
            set: (target, key, value, receiver)=>{
                const oldValue = target[key];
                if (!reactivity_esm_bundler_isRef(oldValue) || !!reactivity_esm_bundler_isRef(value)) return Reflect.set(target, key, value, receiver);
                oldValue.value = value;
                return true;
            }
        };
        function proxyRefs(objectWithRefs) {
            return reactivity_esm_bundler_isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
        }
        class CustomRefImpl {
            constructor(factory){
                this["__v_isRef"] = true;
                this._value = void 0;
                const dep = this.dep = new Dep();
                const { get, set } = factory(dep.track.bind(dep), dep.trigger.bind(dep));
                this._get = get;
                this._set = set;
            }
            get value() {
                return this._value = this._get();
            }
            set value(newVal) {
                this._set(newVal);
            }
        }
        function reactivity_esm_bundler_customRef(factory) {
            return new CustomRefImpl(factory);
        }
        function toRefs(object) {
            const ret = isArray(object) ? new Array(object.length) : {};
            for(const key in object)ret[key] = propertyToRef(object, key);
            return ret;
        }
        class ObjectRefImpl {
            constructor(_object, _key, _defaultValue){
                this._object = _object;
                this._key = _key;
                this._defaultValue = _defaultValue;
                this["__v_isRef"] = true;
                this._value = void 0;
            }
            get value() {
                const val = this._object[this._key];
                return this._value = void 0 === val ? this._defaultValue : val;
            }
            set value(newVal) {
                this._object[this._key] = newVal;
            }
            get dep() {
                return getDepFromReactive(reactivity_esm_bundler_toRaw(this._object), this._key);
            }
        }
        class GetterRefImpl {
            constructor(_getter){
                this._getter = _getter;
                this["__v_isRef"] = true;
                this["__v_isReadonly"] = true;
                this._value = void 0;
            }
            get value() {
                return this._value = this._getter();
            }
        }
        function toRef(source, key, defaultValue) {
            if (reactivity_esm_bundler_isRef(source)) return source;
            if (isFunction(source)) return new GetterRefImpl(source);
            if (isObject(source) && arguments.length > 1) return propertyToRef(source, key, defaultValue);
            else return reactivity_esm_bundler_ref(source);
        }
        function propertyToRef(source, key, defaultValue) {
            const val = source[key];
            return reactivity_esm_bundler_isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
        }
        class ComputedRefImpl {
            constructor(fn, setter, isSSR){
                this.fn = fn;
                this.setter = setter;
                this._value = void 0;
                this.dep = new Dep(this);
                this.__v_isRef = true;
                this.deps = void 0;
                this.depsTail = void 0;
                this.flags = 16;
                this.globalVersion = globalVersion - 1;
                this.next = void 0;
                this.effect = this;
                this["__v_isReadonly"] = !setter;
                this.isSSR = isSSR;
            }
            notify() {
                this.flags |= 16;
                if (8 & this.flags || activeSub === this) ;
                else {
                    batch(this, true);
                    return true;
                }
            }
            get value() {
                const link = this.dep.track();
                refreshComputed(this);
                if (link) link.version = this.dep.version;
                return this._value;
            }
            set value(newValue) {
                if (this.setter) this.setter(newValue);
            }
        }
        function reactivity_esm_bundler_computed(getterOrOptions, debugOptions, isSSR = false) {
            let getter;
            let setter;
            if (shared_esm_bundler_isFunction(getterOrOptions)) getter = getterOrOptions;
            else {
                getter = getterOrOptions.get;
                setter = getterOrOptions.set;
            }
            const cRef = new ComputedRefImpl(getter, setter, isSSR);
            return cRef;
        }
        const TrackOpTypes = null;
        const TriggerOpTypes = null;
        const ReactiveFlags = null;
        const WatchErrorCodes = null;
        const INITIAL_WATCHER_VALUE = {};
        const cleanupMap = /* @__PURE__ */ new WeakMap();
        let activeWatcher;
        function getCurrentWatcher() {
            return activeWatcher;
        }
        function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
            if (owner) {
                let cleanups = cleanupMap.get(owner);
                if (!cleanups) cleanupMap.set(owner, cleanups = []);
                cleanups.push(cleanupFn);
            }
        }
        function reactivity_esm_bundler_watch(source, cb, options = shared_esm_bundler_EMPTY_OBJ) {
            const { immediate, deep, once, scheduler, augmentJob, call } = options;
            const reactiveGetter = (source2)=>{
                if (deep) return source2;
                if (reactivity_esm_bundler_isShallow(source2) || false === deep || 0 === deep) return reactivity_esm_bundler_traverse(source2, 1);
                return reactivity_esm_bundler_traverse(source2);
            };
            let effect;
            let getter;
            let cleanup;
            let boundCleanup;
            let forceTrigger = false;
            let isMultiSource = false;
            if (reactivity_esm_bundler_isRef(source)) {
                getter = ()=>source.value;
                forceTrigger = reactivity_esm_bundler_isShallow(source);
            } else if (reactivity_esm_bundler_isReactive(source)) {
                getter = ()=>reactiveGetter(source);
                forceTrigger = true;
            } else if (shared_esm_bundler_isArray(source)) {
                isMultiSource = true;
                forceTrigger = source.some((s)=>reactivity_esm_bundler_isReactive(s) || reactivity_esm_bundler_isShallow(s));
                getter = ()=>source.map((s)=>{
                        if (reactivity_esm_bundler_isRef(s)) return s.value;
                        if (reactivity_esm_bundler_isReactive(s)) return reactiveGetter(s);
                        if (shared_esm_bundler_isFunction(s)) return call ? call(s, 2) : s();
                    });
            } else getter = shared_esm_bundler_isFunction(source) ? cb ? call ? ()=>call(source, 2) : source : ()=>{
                if (cleanup) {
                    reactivity_esm_bundler_pauseTracking();
                    try {
                        cleanup();
                    } finally{
                        reactivity_esm_bundler_resetTracking();
                    }
                }
                const currentEffect = activeWatcher;
                activeWatcher = effect;
                try {
                    return call ? call(source, 3, [
                        boundCleanup
                    ]) : source(boundCleanup);
                } finally{
                    activeWatcher = currentEffect;
                }
            } : shared_esm_bundler_NOOP;
            if (cb && deep) {
                const baseGetter = getter;
                const depth = true === deep ? 1 / 0 : deep;
                getter = ()=>reactivity_esm_bundler_traverse(baseGetter(), depth);
            }
            const scope = getCurrentScope();
            const watchHandle = ()=>{
                effect.stop();
                if (scope && scope.active) shared_esm_bundler_remove(scope.effects, effect);
            };
            if (once && cb) {
                const _cb = cb;
                cb = (...args)=>{
                    _cb(...args);
                    watchHandle();
                };
            }
            let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
            const job = (immediateFirstRun)=>{
                if (!(1 & effect.flags) || !effect.dirty && !immediateFirstRun) return;
                if (cb) {
                    const newValue = effect.run();
                    if (deep || forceTrigger || (isMultiSource ? newValue.some((v1, i)=>shared_esm_bundler_hasChanged(v1, oldValue[i])) : shared_esm_bundler_hasChanged(newValue, oldValue))) {
                        if (cleanup) cleanup();
                        const currentWatcher = activeWatcher;
                        activeWatcher = effect;
                        try {
                            const args = [
                                newValue,
                                oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
                                boundCleanup
                            ];
                            call ? call(cb, 3, args) : cb(...args);
                            oldValue = newValue;
                        } finally{
                            activeWatcher = currentWatcher;
                        }
                    }
                } else effect.run();
            };
            if (augmentJob) augmentJob(job);
            effect = new ReactiveEffect(getter);
            effect.scheduler = scheduler ? ()=>scheduler(job, false) : job;
            boundCleanup = (fn)=>onWatcherCleanup(fn, false, effect);
            cleanup = effect.onStop = ()=>{
                const cleanups = cleanupMap.get(effect);
                if (cleanups) {
                    if (call) call(cleanups, 4);
                    else for (const cleanup2 of cleanups)cleanup2();
                    cleanupMap.delete(effect);
                }
            };
            if (cb) {
                if (immediate) job(true);
                else oldValue = effect.run();
            } else if (scheduler) scheduler(job.bind(null, true), true);
            else effect.run();
            watchHandle.pause = effect.pause.bind(effect);
            watchHandle.resume = effect.resume.bind(effect);
            watchHandle.stop = watchHandle;
            return watchHandle;
        }
        function reactivity_esm_bundler_traverse(value, depth = 1 / 0, seen) {
            if (depth <= 0 || !shared_esm_bundler_isObject(value) || value["__v_skip"]) return value;
            seen = seen || /* @__PURE__ */ new Set();
            if (seen.has(value)) return value;
            seen.add(value);
            depth--;
            if (reactivity_esm_bundler_isRef(value)) reactivity_esm_bundler_traverse(value.value, depth, seen);
            else if (shared_esm_bundler_isArray(value)) for(let i = 0; i < value.length; i++)reactivity_esm_bundler_traverse(value[i], depth, seen);
            else if (shared_esm_bundler_isSet(value) || isMap(value)) value.forEach((v1)=>{
                reactivity_esm_bundler_traverse(v1, depth, seen);
            });
            else if (shared_esm_bundler_isPlainObject(value)) {
                for(const key in value)reactivity_esm_bundler_traverse(value[key], depth, seen);
                for (const key of Object.getOwnPropertySymbols(value))if (Object.prototype.propertyIsEnumerable.call(value, key)) reactivity_esm_bundler_traverse(value[key], depth, seen);
            }
            return value;
        }
        /**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/ const stack = null;
        function pushWarningContext(vnode) {
            stack.push(vnode);
        }
        function popWarningContext() {
            stack.pop();
        }
        let isWarning = false;
        function warn$1(msg, ...args) {
            if (isWarning) return;
            isWarning = true;
            pauseTracking();
            const instance = stack.length ? stack[stack.length - 1].component : null;
            const appWarnHandler = instance && instance.appContext.config.warnHandler;
            const trace = getComponentTrace();
            if (appWarnHandler) callWithErrorHandling(appWarnHandler, instance, 11, [
                msg + args.map((a)=>{
                    var _a, _b;
                    return null != (_b = null == (_a = a.toString) ? void 0 : _a.call(a)) ? _b : JSON.stringify(a);
                }).join(""),
                instance && instance.proxy,
                trace.map(({ vnode })=>`at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
                trace
            ]);
            else {
                const warnArgs = [
                    `[Vue warn]: ${msg}`,
                    ...args
                ];
                if (trace.length) warnArgs.push(`
`, ...formatTrace(trace));
                console.warn(...warnArgs);
            }
            resetTracking();
            isWarning = false;
        }
        function getComponentTrace() {
            let currentVNode = stack[stack.length - 1];
            if (!currentVNode) return [];
            const normalizedStack = [];
            while(currentVNode){
                const last = normalizedStack[0];
                if (last && last.vnode === currentVNode) last.recurseCount++;
                else normalizedStack.push({
                    vnode: currentVNode,
                    recurseCount: 0
                });
                const parentInstance = currentVNode.component && currentVNode.component.parent;
                currentVNode = parentInstance && parentInstance.vnode;
            }
            return normalizedStack;
        }
        function formatTrace(trace) {
            const logs = [];
            trace.forEach((entry, i)=>{
                logs.push(...0 === i ? [] : [
                    `
`
                ], ...formatTraceEntry(entry));
            });
            return logs;
        }
        function formatTraceEntry({ vnode, recurseCount }) {
            const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : "";
            const isRoot = !!vnode.component && null == vnode.component.parent;
            const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
            const close = ">" + postfix;
            return vnode.props ? [
                open,
                ...formatProps(vnode.props),
                close
            ] : [
                open + close
            ];
        }
        function formatProps(props) {
            const res = [];
            const keys = Object.keys(props);
            keys.slice(0, 3).forEach((key)=>{
                res.push(...formatProp(key, props[key]));
            });
            if (keys.length > 3) res.push(" ...");
            return res;
        }
        function formatProp(key, value, raw) {
            if (isString(value)) {
                value = JSON.stringify(value);
                return raw ? value : [
                    `${key}=${value}`
                ];
            }
            if ("number" == typeof value || "boolean" == typeof value || null == value) return raw ? value : [
                `${key}=${value}`
            ];
            if (isRef(value)) {
                value = formatProp(key, toRaw(value.value), true);
                return raw ? value : [
                    `${key}=Ref<`,
                    value,
                    ">"
                ];
            } else {
                if (isFunction(value)) return [
                    `${key}=fn${value.name ? `<${value.name}>` : ""}`
                ];
                value = toRaw(value);
                return raw ? value : [
                    `${key}=`,
                    value
                ];
            }
        }
        function assertNumber(val, type) {}
        const ErrorCodes = null;
        const ErrorTypeStrings$1 = null;
        function callWithErrorHandling(fn, instance, type, args) {
            try {
                return args ? fn(...args) : fn();
            } catch (err) {
                handleError(err, instance, type);
            }
        }
        function callWithAsyncErrorHandling(fn, instance, type, args) {
            if (shared_esm_bundler_isFunction(fn)) {
                const res = callWithErrorHandling(fn, instance, type, args);
                if (res && shared_esm_bundler_isPromise(res)) res.catch((err)=>{
                    handleError(err, instance, type);
                });
                return res;
            }
            if (shared_esm_bundler_isArray(fn)) {
                const values = [];
                for(let i = 0; i < fn.length; i++)values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
                return values;
            }
        }
        function handleError(err, instance, type, throwInDev = true) {
            const contextVNode = instance ? instance.vnode : null;
            const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || shared_esm_bundler_EMPTY_OBJ;
            if (instance) {
                let cur = instance.parent;
                const exposedInstance = instance.proxy;
                const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
                while(cur){
                    const errorCapturedHooks = cur.ec;
                    if (errorCapturedHooks) {
                        for(let i = 0; i < errorCapturedHooks.length; i++)if (false === errorCapturedHooks[i](err, exposedInstance, errorInfo)) return;
                    }
                    cur = cur.parent;
                }
                if (errorHandler) {
                    reactivity_esm_bundler_pauseTracking();
                    callWithErrorHandling(errorHandler, null, 10, [
                        err,
                        exposedInstance,
                        errorInfo
                    ]);
                    reactivity_esm_bundler_resetTracking();
                    return;
                }
            }
            logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
        }
        function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
            if (throwInProd) throw err;
            console.error(err);
        }
        const queue = [];
        let flushIndex = -1;
        const pendingPostFlushCbs = [];
        let activePostFlushCbs = null;
        let postFlushIndex = 0;
        const resolvedPromise = /* @__PURE__ */ Promise.resolve();
        let currentFlushPromise = null;
        const RECURSION_LIMIT = 100;
        function runtime_core_esm_bundler_nextTick(fn) {
            const p = currentFlushPromise || resolvedPromise;
            return fn ? p.then(this ? fn.bind(this) : fn) : p;
        }
        function findInsertionIndex(id) {
            let start = flushIndex + 1;
            let end = queue.length;
            while(start < end){
                const middle = start + end >>> 1;
                const middleJob = queue[middle];
                const middleJobId = getId(middleJob);
                if (middleJobId < id || middleJobId === id && 2 & middleJob.flags) start = middle + 1;
                else end = middle;
            }
            return start;
        }
        function queueJob(job) {
            if (!(1 & job.flags)) {
                const jobId = getId(job);
                const lastJob = queue[queue.length - 1];
                if (!lastJob || !(2 & job.flags) && jobId >= getId(lastJob)) queue.push(job);
                else queue.splice(findInsertionIndex(jobId), 0, job);
                job.flags |= 1;
                queueFlush();
            }
        }
        function queueFlush() {
            if (!currentFlushPromise) currentFlushPromise = resolvedPromise.then(flushJobs);
        }
        function runtime_core_esm_bundler_queuePostFlushCb(cb) {
            if (shared_esm_bundler_isArray(cb)) pendingPostFlushCbs.push(...cb);
            else if (activePostFlushCbs && -1 === cb.id) activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
            else if (!(1 & cb.flags)) {
                pendingPostFlushCbs.push(cb);
                cb.flags |= 1;
            }
            queueFlush();
        }
        function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
            for(; i < queue.length; i++){
                const cb = queue[i];
                if (cb && 2 & cb.flags) {
                    if (instance && cb.id !== instance.uid) continue;
                    queue.splice(i, 1);
                    i--;
                    if (4 & cb.flags) cb.flags &= -2;
                    cb();
                    if (!(4 & cb.flags)) cb.flags &= -2;
                }
            }
        }
        function flushPostFlushCbs(seen) {
            if (pendingPostFlushCbs.length) {
                const deduped = [
                    ...new Set(pendingPostFlushCbs)
                ].sort((a, b)=>getId(a) - getId(b));
                pendingPostFlushCbs.length = 0;
                if (activePostFlushCbs) {
                    activePostFlushCbs.push(...deduped);
                    return;
                }
                activePostFlushCbs = deduped;
                for(postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++){
                    const cb = activePostFlushCbs[postFlushIndex];
                    if (4 & cb.flags) cb.flags &= -2;
                    if (!(8 & cb.flags)) cb();
                    cb.flags &= -2;
                }
                activePostFlushCbs = null;
                postFlushIndex = 0;
            }
        }
        const getId = (job)=>null == job.id ? 2 & job.flags ? -1 : 1 / 0 : job.id;
        function flushJobs(seen) {
            try {
                for(flushIndex = 0; flushIndex < queue.length; flushIndex++){
                    const job = queue[flushIndex];
                    if (job && !(8 & job.flags)) {
                        if (4 & job.flags) job.flags &= -2;
                        callWithErrorHandling(job, job.i, job.i ? 15 : 14);
                        if (!(4 & job.flags)) job.flags &= -2;
                    }
                }
            } finally{
                for(; flushIndex < queue.length; flushIndex++){
                    const job = queue[flushIndex];
                    if (job) job.flags &= -2;
                }
                flushIndex = -1;
                queue.length = 0;
                flushPostFlushCbs(seen);
                currentFlushPromise = null;
                if (queue.length || pendingPostFlushCbs.length) flushJobs(seen);
            }
        }
        function checkRecursiveUpdates(seen, fn) {
            const count = seen.get(fn) || 0;
            if (count > RECURSION_LIMIT) {
                const instance = fn.i;
                const componentName = instance && getComponentName(instance.type);
                handleError(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`, null, 10);
                return true;
            }
            seen.set(fn, count + 1);
            return false;
        }
        let isHmrUpdating = false;
        const hmrDirtyComponents = /* @__PURE__ */ new Map();
        const runtime_core_esm_bundler_map = /* @__PURE__ */ new Map();
        function registerHMR(instance) {
            const id = instance.type.__hmrId;
            let record = runtime_core_esm_bundler_map.get(id);
            if (!record) {
                createRecord(id, instance.type);
                record = runtime_core_esm_bundler_map.get(id);
            }
            record.instances.add(instance);
        }
        function unregisterHMR(instance) {
            runtime_core_esm_bundler_map.get(instance.type.__hmrId).instances.delete(instance);
        }
        function createRecord(id, initialDef) {
            if (runtime_core_esm_bundler_map.has(id)) return false;
            runtime_core_esm_bundler_map.set(id, {
                initialDef: normalizeClassComponent(initialDef),
                instances: /* @__PURE__ */ new Set()
            });
            return true;
        }
        function normalizeClassComponent(component) {
            return isClassComponent(component) ? component.__vccOpts : component;
        }
        function rerender(id, newRender) {
            const record = runtime_core_esm_bundler_map.get(id);
            if (!record) return;
            record.initialDef.render = newRender;
            [
                ...record.instances
            ].forEach((instance)=>{
                if (newRender) {
                    instance.render = newRender;
                    normalizeClassComponent(instance.type).render = newRender;
                }
                instance.renderCache = [];
                isHmrUpdating = true;
                instance.update();
                isHmrUpdating = false;
            });
        }
        function reload(id, newComp) {
            const record = runtime_core_esm_bundler_map.get(id);
            if (!record) return;
            newComp = normalizeClassComponent(newComp);
            updateComponentDef(record.initialDef, newComp);
            const instances = [
                ...record.instances
            ];
            for(let i = 0; i < instances.length; i++){
                const instance = instances[i];
                const oldComp = normalizeClassComponent(instance.type);
                let dirtyInstances = hmrDirtyComponents.get(oldComp);
                if (!dirtyInstances) {
                    if (oldComp !== record.initialDef) updateComponentDef(oldComp, newComp);
                    hmrDirtyComponents.set(oldComp, dirtyInstances = /* @__PURE__ */ new Set());
                }
                dirtyInstances.add(instance);
                instance.appContext.propsCache.delete(instance.type);
                instance.appContext.emitsCache.delete(instance.type);
                instance.appContext.optionsCache.delete(instance.type);
                if (instance.ceReload) {
                    dirtyInstances.add(instance);
                    instance.ceReload(newComp.styles);
                    dirtyInstances.delete(instance);
                } else if (instance.parent) queueJob(()=>{
                    isHmrUpdating = true;
                    instance.parent.update();
                    isHmrUpdating = false;
                    dirtyInstances.delete(instance);
                });
                else if (instance.appContext.reload) instance.appContext.reload();
                else if ("undefined" != typeof window) window.location.reload();
                else console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
                if (instance.root.ce && instance !== instance.root) instance.root.ce._removeChildStyle(oldComp);
            }
            runtime_core_esm_bundler_queuePostFlushCb(()=>{
                hmrDirtyComponents.clear();
            });
        }
        function updateComponentDef(oldComp, newComp) {
            extend(oldComp, newComp);
            for(const key in oldComp)if ("__file" !== key && !(key in newComp)) delete oldComp[key];
        }
        function tryWrap(fn) {
            return (id, arg)=>{
                try {
                    return fn(id, arg);
                } catch (e) {
                    console.error(e);
                    console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
                }
            };
        }
        let devtools$1;
        let buffer = [];
        let devtoolsNotInstalled = false;
        function emit$1(event, ...args) {
            if (devtools$1) devtools$1.emit(event, ...args);
            else if (!devtoolsNotInstalled) buffer.push({
                event,
                args
            });
        }
        function setDevtoolsHook$1(hook, target) {
            var _a, _b;
            devtools$1 = hook;
            if (devtools$1) {
                devtools$1.enabled = true;
                buffer.forEach(({ event, args })=>devtools$1.emit(event, ...args));
                buffer = [];
            } else if ("undefined" == typeof window || !window.HTMLElement || (null == (_b = null == (_a = window.navigator) ? void 0 : _a.userAgent) ? void 0 : _b.includes("jsdom"))) {
                devtoolsNotInstalled = true;
                buffer = [];
            } else {
                const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
                replay.push((newHook)=>{
                    setDevtoolsHook$1(newHook, target);
                });
                setTimeout(()=>{
                    if (!devtools$1) {
                        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
                        devtoolsNotInstalled = true;
                        buffer = [];
                    }
                }, 3e3);
            }
        }
        function devtoolsInitApp(app, version) {
            emit$1("app:init", app, version, {
                Fragment: runtime_core_esm_bundler_Fragment,
                Text,
                Comment,
                Static: runtime_core_esm_bundler_Static
            });
        }
        function devtoolsUnmountApp(app) {
            emit$1("app:unmount", app);
        }
        const devtoolsComponentAdded = /* @__PURE__ */ null;
        const devtoolsComponentUpdated = /* @__PURE__ */ null;
        const _devtoolsComponentRemoved = /* @__PURE__ */ null;
        const devtoolsComponentRemoved = (component)=>{
            if (devtools$1 && "function" == typeof devtools$1.cleanupBuffer && !devtools$1.cleanupBuffer(component)) _devtoolsComponentRemoved(component);
        };
        /*! #__NO_SIDE_EFFECTS__ */ function createDevtoolsComponentHook(hook) {
            return (component)=>{
                emit$1(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
            };
        }
        const devtoolsPerfStart = /* @__PURE__ */ null;
        const devtoolsPerfEnd = /* @__PURE__ */ null;
        function createDevtoolsPerformanceHook(hook) {
            return (component, type, time)=>{
                emit$1(hook, component.appContext.app, component.uid, component, type, time);
            };
        }
        function devtoolsComponentEmit(component, event, params) {
            emit$1("component:emit", component.appContext.app, component, event, params);
        }
        let currentRenderingInstance = null;
        let currentScopeId = null;
        function setCurrentRenderingInstance(instance) {
            const prev = currentRenderingInstance;
            currentRenderingInstance = instance;
            currentScopeId = instance && instance.type.__scopeId || null;
            return prev;
        }
        function pushScopeId(id) {
            currentScopeId = id;
        }
        function popScopeId() {
            currentScopeId = null;
        }
        const withScopeId = (_id)=>withCtx;
        function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
            if (!ctx) return fn;
            if (fn._n) return fn;
            const renderFnWithContext = (...args)=>{
                if (renderFnWithContext._d) setBlockTracking(-1);
                const prevInstance = setCurrentRenderingInstance(ctx);
                let res;
                try {
                    res = fn(...args);
                } finally{
                    setCurrentRenderingInstance(prevInstance);
                    if (renderFnWithContext._d) setBlockTracking(1);
                }
                return res;
            };
            renderFnWithContext._n = true;
            renderFnWithContext._c = true;
            renderFnWithContext._d = true;
            return renderFnWithContext;
        }
        function validateDirectiveName(name1) {
            if (isBuiltInDirective(name1)) warn$1("Do not use built-in directive ids as custom directive id: " + name1);
        }
        function withDirectives(vnode, directives) {
            if (null === currentRenderingInstance) return vnode;
            const instance = getComponentPublicInstance(currentRenderingInstance);
            const bindings = vnode.dirs || (vnode.dirs = []);
            for(let i = 0; i < directives.length; i++){
                let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
                if (dir) {
                    if (isFunction(dir)) dir = {
                        mounted: dir,
                        updated: dir
                    };
                    if (dir.deep) traverse(value);
                    bindings.push({
                        dir,
                        instance,
                        value,
                        oldValue: void 0,
                        arg,
                        modifiers
                    });
                }
            }
            return vnode;
        }
        function invokeDirectiveHook(vnode, prevVNode, instance, name1) {
            const bindings = vnode.dirs;
            const oldBindings = prevVNode && prevVNode.dirs;
            for(let i = 0; i < bindings.length; i++){
                const binding = bindings[i];
                if (oldBindings) binding.oldValue = oldBindings[i].value;
                let hook = binding.dir[name1];
                if (hook) {
                    reactivity_esm_bundler_pauseTracking();
                    callWithAsyncErrorHandling(hook, instance, 8, [
                        vnode.el,
                        binding,
                        vnode,
                        prevVNode
                    ]);
                    reactivity_esm_bundler_resetTracking();
                }
            }
        }
        const TeleportEndKey = Symbol("_vte");
        const isTeleport = (type)=>type.__isTeleport;
        const isTeleportDisabled = (props)=>props && (props.disabled || "" === props.disabled);
        const isTeleportDeferred = (props)=>props && (props.defer || "" === props.defer);
        const isTargetSVG = (target)=>"undefined" != typeof SVGElement && target instanceof SVGElement;
        const isTargetMathML = (target)=>"function" == typeof MathMLElement && target instanceof MathMLElement;
        const resolveTarget = (props, select)=>{
            const targetSelector = props && props.to;
            if (!shared_esm_bundler_isString(targetSelector)) return targetSelector;
            if (!select) return null;
            {
                const target = select(targetSelector);
                return target;
            }
        };
        const TeleportImpl = {
            name: "Teleport",
            __isTeleport: true,
            process (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
                const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment } } = internals;
                const disabled = isTeleportDisabled(n2.props);
                let { shapeFlag, children, dynamicChildren } = n2;
                if (null == n1) {
                    const placeholder = n2.el = createText("");
                    const mainAnchor = n2.anchor = createText("");
                    insert(placeholder, container, anchor);
                    insert(mainAnchor, container, anchor);
                    const mount = (container2, anchor2)=>{
                        if (16 & shapeFlag) {
                            if (parentComponent && parentComponent.isCE) parentComponent.ce._teleportTarget = container2;
                            mountChildren(children, container2, anchor2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                        }
                    };
                    const mountToTarget = ()=>{
                        const target = n2.target = resolveTarget(n2.props, querySelector);
                        const targetAnchor = prepareAnchor(target, n2, createText, insert);
                        if (target) {
                            if ("svg" !== namespace && isTargetSVG(target)) namespace = "svg";
                            else if ("mathml" !== namespace && isTargetMathML(target)) namespace = "mathml";
                            if (!disabled) {
                                mount(target, targetAnchor);
                                updateCssVars(n2, false);
                            }
                        }
                    };
                    if (disabled) {
                        mount(container, mainAnchor);
                        updateCssVars(n2, true);
                    }
                    if (isTeleportDeferred(n2.props)) queuePostRenderEffect(()=>{
                        mountToTarget();
                        n2.el.__isMounted = true;
                    }, parentSuspense);
                    else mountToTarget();
                } else {
                    if (isTeleportDeferred(n2.props) && !n1.el.__isMounted) {
                        queuePostRenderEffect(()=>{
                            TeleportImpl.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
                            delete n1.el.__isMounted;
                        }, parentSuspense);
                        return;
                    }
                    n2.el = n1.el;
                    n2.targetStart = n1.targetStart;
                    const mainAnchor = n2.anchor = n1.anchor;
                    const target = n2.target = n1.target;
                    const targetAnchor = n2.targetAnchor = n1.targetAnchor;
                    const wasDisabled = isTeleportDisabled(n1.props);
                    const currentContainer = wasDisabled ? container : target;
                    const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
                    if ("svg" === namespace || isTargetSVG(target)) namespace = "svg";
                    else if ("mathml" === namespace || isTargetMathML(target)) namespace = "mathml";
                    if (dynamicChildren) {
                        patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, namespace, slotScopeIds);
                        traverseStaticChildren(n1, n2, true);
                    } else if (!optimized) patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, false);
                    if (disabled) {
                        if (wasDisabled) {
                            if (n2.props && n1.props && n2.props.to !== n1.props.to) n2.props.to = n1.props.to;
                        } else moveTeleport(n2, container, mainAnchor, internals, 1);
                    } else if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
                        const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
                        if (nextTarget) moveTeleport(n2, nextTarget, null, internals, 0);
                    } else if (wasDisabled) moveTeleport(n2, target, targetAnchor, internals, 1);
                    updateCssVars(n2, disabled);
                }
            },
            remove (vnode, parentComponent, parentSuspense, { um: unmount, o: { remove: hostRemove } }, doRemove) {
                const { shapeFlag, children, anchor, targetStart, targetAnchor, target, props } = vnode;
                if (target) {
                    hostRemove(targetStart);
                    hostRemove(targetAnchor);
                }
                doRemove && hostRemove(anchor);
                if (16 & shapeFlag) {
                    const shouldRemove = doRemove || !isTeleportDisabled(props);
                    for(let i = 0; i < children.length; i++){
                        const child = children[i];
                        unmount(child, parentComponent, parentSuspense, shouldRemove, !!child.dynamicChildren);
                    }
                }
            },
            move: moveTeleport,
            hydrate: hydrateTeleport
        };
        function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
            if (0 === moveType) insert(vnode.targetAnchor, container, parentAnchor);
            const { el, anchor, shapeFlag, children, props } = vnode;
            const isReorder = 2 === moveType;
            if (isReorder) insert(el, container, parentAnchor);
            if (!isReorder || isTeleportDisabled(props)) {
                if (16 & shapeFlag) for(let i = 0; i < children.length; i++)move(children[i], container, parentAnchor, 2);
            }
            if (isReorder) insert(anchor, container, parentAnchor);
        }
        function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling, parentNode, querySelector, insert, createText } }, hydrateChildren) {
            const target = vnode.target = resolveTarget(vnode.props, querySelector);
            if (target) {
                const disabled = isTeleportDisabled(vnode.props);
                const targetNode = target._lpa || target.firstChild;
                if (16 & vnode.shapeFlag) {
                    if (disabled) {
                        vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
                        vnode.targetStart = targetNode;
                        vnode.targetAnchor = targetNode && nextSibling(targetNode);
                    } else {
                        vnode.anchor = nextSibling(node);
                        let targetAnchor = targetNode;
                        while(targetAnchor){
                            if (targetAnchor && 8 === targetAnchor.nodeType) {
                                if ("teleport start anchor" === targetAnchor.data) vnode.targetStart = targetAnchor;
                                else if ("teleport anchor" === targetAnchor.data) {
                                    vnode.targetAnchor = targetAnchor;
                                    target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
                                    break;
                                }
                            }
                            targetAnchor = nextSibling(targetAnchor);
                        }
                        if (!vnode.targetAnchor) prepareAnchor(target, vnode, createText, insert);
                        hydrateChildren(targetNode && nextSibling(targetNode), vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
                    }
                }
                updateCssVars(vnode, disabled);
            }
            return vnode.anchor && nextSibling(vnode.anchor);
        }
        const Teleport = TeleportImpl;
        function updateCssVars(vnode, isDisabled) {
            const ctx = vnode.ctx;
            if (ctx && ctx.ut) {
                let node, anchor;
                if (isDisabled) {
                    node = vnode.el;
                    anchor = vnode.anchor;
                } else {
                    node = vnode.targetStart;
                    anchor = vnode.targetAnchor;
                }
                while(node && node !== anchor){
                    if (1 === node.nodeType) node.setAttribute("data-v-owner", ctx.uid);
                    node = node.nextSibling;
                }
                ctx.ut();
            }
        }
        function prepareAnchor(target, vnode, createText, insert) {
            const targetStart = vnode.targetStart = createText("");
            const targetAnchor = vnode.targetAnchor = createText("");
            targetStart[TeleportEndKey] = targetAnchor;
            if (target) {
                insert(targetStart, target);
                insert(targetAnchor, target);
            }
            return targetAnchor;
        }
        const leaveCbKey = Symbol("_leaveCb");
        const enterCbKey = Symbol("_enterCb");
        function useTransitionState() {
            const state = {
                isMounted: false,
                isLeaving: false,
                isUnmounting: false,
                leavingVNodes: /* @__PURE__ */ new Map()
            };
            runtime_core_esm_bundler_onMounted(()=>{
                state.isMounted = true;
            });
            onBeforeUnmount(()=>{
                state.isUnmounting = true;
            });
            return state;
        }
        const TransitionHookValidator = [
            Function,
            Array
        ];
        const BaseTransitionPropsValidators = {
            mode: String,
            appear: Boolean,
            persisted: Boolean,
            onBeforeEnter: TransitionHookValidator,
            onEnter: TransitionHookValidator,
            onAfterEnter: TransitionHookValidator,
            onEnterCancelled: TransitionHookValidator,
            onBeforeLeave: TransitionHookValidator,
            onLeave: TransitionHookValidator,
            onAfterLeave: TransitionHookValidator,
            onLeaveCancelled: TransitionHookValidator,
            onBeforeAppear: TransitionHookValidator,
            onAppear: TransitionHookValidator,
            onAfterAppear: TransitionHookValidator,
            onAppearCancelled: TransitionHookValidator
        };
        const recursiveGetSubtree = (instance)=>{
            const subTree = instance.subTree;
            return subTree.component ? recursiveGetSubtree(subTree.component) : subTree;
        };
        const BaseTransitionImpl = {
            name: "BaseTransition",
            props: BaseTransitionPropsValidators,
            setup (props, { slots }) {
                const instance = runtime_core_esm_bundler_getCurrentInstance();
                const state = useTransitionState();
                return ()=>{
                    const children = slots.default && getTransitionRawChildren(slots.default(), true);
                    if (!children || !children.length) return;
                    const child = findNonCommentChild(children);
                    const rawProps = reactivity_esm_bundler_toRaw(props);
                    const { mode } = rawProps;
                    if (state.isLeaving) return emptyPlaceholder(child);
                    const innerChild = getInnerChild$1(child);
                    if (!innerChild) return emptyPlaceholder(child);
                    let enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance, (hooks)=>enterHooks = hooks);
                    if (innerChild.type !== Comment) setTransitionHooks(innerChild, enterHooks);
                    let oldInnerChild = instance.subTree && getInnerChild$1(instance.subTree);
                    if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(innerChild, oldInnerChild) && recursiveGetSubtree(instance).type !== Comment) {
                        let leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
                        setTransitionHooks(oldInnerChild, leavingHooks);
                        if ("out-in" === mode && innerChild.type !== Comment) {
                            state.isLeaving = true;
                            leavingHooks.afterLeave = ()=>{
                                state.isLeaving = false;
                                if (!(8 & instance.job.flags)) instance.update();
                                delete leavingHooks.afterLeave;
                                oldInnerChild = void 0;
                            };
                            return emptyPlaceholder(child);
                        }
                        if ("in-out" === mode && innerChild.type !== Comment) leavingHooks.delayLeave = (el, earlyRemove, delayedLeave)=>{
                            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
                            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
                            el[leaveCbKey] = ()=>{
                                earlyRemove();
                                el[leaveCbKey] = void 0;
                                delete enterHooks.delayedLeave;
                                oldInnerChild = void 0;
                            };
                            enterHooks.delayedLeave = ()=>{
                                delayedLeave();
                                delete enterHooks.delayedLeave;
                                oldInnerChild = void 0;
                            };
                        };
                        else oldInnerChild = void 0;
                    } else if (oldInnerChild) oldInnerChild = void 0;
                    return child;
                };
            }
        };
        function findNonCommentChild(children) {
            let child = children[0];
            if (children.length > 1) {
                let hasFound = false;
                for (const c of children)if (c.type !== Comment) {
                    child = c;
                    hasFound = true;
                    break;
                }
            }
            return child;
        }
        const runtime_core_esm_bundler_BaseTransition = null;
        function getLeavingNodesForType(state, vnode) {
            const { leavingVNodes } = state;
            let leavingVNodesCache = leavingVNodes.get(vnode.type);
            if (!leavingVNodesCache) {
                leavingVNodesCache = /* @__PURE__ */ Object.create(null);
                leavingVNodes.set(vnode.type, leavingVNodesCache);
            }
            return leavingVNodesCache;
        }
        function resolveTransitionHooks(vnode, props, state, instance, postClone) {
            const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
            const key = String(vnode.key);
            const leavingVNodesCache = getLeavingNodesForType(state, vnode);
            const callHook = (hook, args)=>{
                hook && callWithAsyncErrorHandling(hook, instance, 9, args);
            };
            const callAsyncHook = (hook, args)=>{
                const done = args[1];
                callHook(hook, args);
                if (shared_esm_bundler_isArray(hook)) {
                    if (hook.every((hook2)=>hook2.length <= 1)) done();
                } else if (hook.length <= 1) done();
            };
            const hooks = {
                mode,
                persisted,
                beforeEnter (el) {
                    let hook = onBeforeEnter;
                    if (!state.isMounted) {
                        if (!appear) return;
                        hook = onBeforeAppear || onBeforeEnter;
                    }
                    if (el[leaveCbKey]) el[leaveCbKey](true);
                    const leavingVNode = leavingVNodesCache[key];
                    if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) leavingVNode.el[leaveCbKey]();
                    callHook(hook, [
                        el
                    ]);
                },
                enter (el) {
                    let hook = onEnter;
                    let afterHook = onAfterEnter;
                    let cancelHook = onEnterCancelled;
                    if (!state.isMounted) {
                        if (!appear) return;
                        hook = onAppear || onEnter;
                        afterHook = onAfterAppear || onAfterEnter;
                        cancelHook = onAppearCancelled || onEnterCancelled;
                    }
                    let called = false;
                    const done = el[enterCbKey] = (cancelled)=>{
                        if (called) return;
                        called = true;
                        cancelled ? callHook(cancelHook, [
                            el
                        ]) : callHook(afterHook, [
                            el
                        ]);
                        if (hooks.delayedLeave) hooks.delayedLeave();
                        el[enterCbKey] = void 0;
                    };
                    if (hook) callAsyncHook(hook, [
                        el,
                        done
                    ]);
                    else done();
                },
                leave (el, remove) {
                    const key2 = String(vnode.key);
                    if (el[enterCbKey]) el[enterCbKey](true);
                    if (state.isUnmounting) return remove();
                    callHook(onBeforeLeave, [
                        el
                    ]);
                    let called = false;
                    const done = el[leaveCbKey] = (cancelled)=>{
                        if (called) return;
                        called = true;
                        remove();
                        cancelled ? callHook(onLeaveCancelled, [
                            el
                        ]) : callHook(onAfterLeave, [
                            el
                        ]);
                        el[leaveCbKey] = void 0;
                        if (leavingVNodesCache[key2] === vnode) delete leavingVNodesCache[key2];
                    };
                    leavingVNodesCache[key2] = vnode;
                    if (onLeave) callAsyncHook(onLeave, [
                        el,
                        done
                    ]);
                    else done();
                },
                clone (vnode2) {
                    const hooks2 = resolveTransitionHooks(vnode2, props, state, instance, postClone);
                    if (postClone) postClone(hooks2);
                    return hooks2;
                }
            };
            return hooks;
        }
        function emptyPlaceholder(vnode) {
            if (isKeepAlive(vnode)) {
                vnode = cloneVNode(vnode);
                vnode.children = null;
                return vnode;
            }
        }
        function getInnerChild$1(vnode) {
            if (!isKeepAlive(vnode)) {
                if (isTeleport(vnode.type) && vnode.children) return findNonCommentChild(vnode.children);
                return vnode;
            }
            const { shapeFlag, children } = vnode;
            if (children) {
                if (16 & shapeFlag) return children[0];
                if (32 & shapeFlag && shared_esm_bundler_isFunction(children.default)) return children.default();
            }
        }
        function setTransitionHooks(vnode, hooks) {
            if (6 & vnode.shapeFlag && vnode.component) {
                vnode.transition = hooks;
                setTransitionHooks(vnode.component.subTree, hooks);
            } else if (128 & vnode.shapeFlag) {
                vnode.ssContent.transition = hooks.clone(vnode.ssContent);
                vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
            } else vnode.transition = hooks;
        }
        function getTransitionRawChildren(children, keepComment = false, parentKey) {
            let ret = [];
            let keyedFragmentCount = 0;
            for(let i = 0; i < children.length; i++){
                let child = children[i];
                const key = null == parentKey ? child.key : String(parentKey) + String(null != child.key ? child.key : i);
                if (child.type === runtime_core_esm_bundler_Fragment) {
                    if (128 & child.patchFlag) keyedFragmentCount++;
                    ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
                } else if (keepComment || child.type !== Comment) ret.push(null != key ? cloneVNode(child, {
                    key
                }) : child);
            }
            if (keyedFragmentCount > 1) for(let i = 0; i < ret.length; i++)ret[i].patchFlag = -2;
            return ret;
        }
        /*! #__NO_SIDE_EFFECTS__ */ function runtime_core_esm_bundler_defineComponent(options, extraOptions) {
            return isFunction(options) ? /* @__PURE__ */ (()=>extend({
                    name: options.name
                }, extraOptions, {
                    setup: options
                }))() : options;
        }
        function useId() {
            const i = runtime_core_esm_bundler_getCurrentInstance();
            if (i) return (i.appContext.config.idPrefix || "v") + "-" + i.ids[0] + i.ids[1]++;
            return "";
        }
        function markAsyncBoundary(instance) {
            instance.ids = [
                instance.ids[0] + instance.ids[2]++ + "-",
                0,
                0
            ];
        }
        const knownTemplateRefs = /* @__PURE__ */ new WeakSet();
        function useTemplateRef(key) {
            const i = runtime_core_esm_bundler_getCurrentInstance();
            const r = shallowRef(null);
            if (i) {
                const refs = i.refs === EMPTY_OBJ ? i.refs = {} : i.refs;
                Object.defineProperty(refs, key, {
                    enumerable: true,
                    get: ()=>r.value,
                    set: (val)=>r.value = val
                });
            }
            const ret = r;
            return ret;
        }
        function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
            if (shared_esm_bundler_isArray(rawRef)) {
                rawRef.forEach((r, i)=>setRef(r, oldRawRef && (shared_esm_bundler_isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
                return;
            }
            if (isAsyncWrapper(vnode) && !isUnmount) {
                if (512 & vnode.shapeFlag && vnode.type.__asyncResolved && vnode.component.subTree.component) setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
                return;
            }
            const refValue = 4 & vnode.shapeFlag ? getComponentPublicInstance(vnode.component) : vnode.el;
            const value = isUnmount ? null : refValue;
            const { i: owner, r: ref1 } = rawRef;
            const oldRef = oldRawRef && oldRawRef.r;
            const refs = owner.refs === shared_esm_bundler_EMPTY_OBJ ? owner.refs = {} : owner.refs;
            const setupState = owner.setupState;
            const rawSetupState = reactivity_esm_bundler_toRaw(setupState);
            const canSetSetupRef = setupState === shared_esm_bundler_EMPTY_OBJ ? ()=>false : (key)=>hasOwn(rawSetupState, key);
            if (null != oldRef && oldRef !== ref1) {
                if (shared_esm_bundler_isString(oldRef)) {
                    refs[oldRef] = null;
                    if (canSetSetupRef(oldRef)) setupState[oldRef] = null;
                } else if (reactivity_esm_bundler_isRef(oldRef)) oldRef.value = null;
            }
            if (shared_esm_bundler_isFunction(ref1)) callWithErrorHandling(ref1, owner, 12, [
                value,
                refs
            ]);
            else {
                const _isString = shared_esm_bundler_isString(ref1);
                const _isRef = reactivity_esm_bundler_isRef(ref1);
                if (_isString || _isRef) {
                    const doSet = ()=>{
                        if (rawRef.f) {
                            const existing = _isString ? canSetSetupRef(ref1) ? setupState[ref1] : refs[ref1] : ref1.value;
                            if (isUnmount) shared_esm_bundler_isArray(existing) && shared_esm_bundler_remove(existing, refValue);
                            else if (shared_esm_bundler_isArray(existing)) {
                                if (!existing.includes(refValue)) existing.push(refValue);
                            } else if (_isString) {
                                refs[ref1] = [
                                    refValue
                                ];
                                if (canSetSetupRef(ref1)) setupState[ref1] = refs[ref1];
                            } else {
                                ref1.value = [
                                    refValue
                                ];
                                if (rawRef.k) refs[rawRef.k] = ref1.value;
                            }
                        } else if (_isString) {
                            refs[ref1] = value;
                            if (canSetSetupRef(ref1)) setupState[ref1] = value;
                        } else if (_isRef) {
                            ref1.value = value;
                            if (rawRef.k) refs[rawRef.k] = value;
                        }
                    };
                    if (value) {
                        doSet.id = -1;
                        queuePostRenderEffect(doSet, parentSuspense);
                    } else doSet();
                }
            }
        }
        let hasLoggedMismatchError = false;
        const logMismatchError = ()=>{
            if (hasLoggedMismatchError) return;
            console.error("Hydration completed but contains mismatches.");
            hasLoggedMismatchError = true;
        };
        const isSVGContainer = (container)=>container.namespaceURI.includes("svg") && "foreignObject" !== container.tagName;
        const isMathMLContainer = (container)=>container.namespaceURI.includes("MathML");
        const getContainerType = (container)=>{
            if (1 !== container.nodeType) return;
            if (isSVGContainer(container)) return "svg";
            if (isMathMLContainer(container)) return "mathml";
        };
        const isComment = (node)=>8 === node.nodeType;
        function createHydrationFunctions(rendererInternals) {
            const { mt: mountComponent, p: patch, o: { patchProp, createText, nextSibling, parentNode, remove, insert, createComment } } = rendererInternals;
            const hydrate = (vnode, container)=>{
                if (!container.hasChildNodes()) {
                    patch(null, vnode, container);
                    flushPostFlushCbs();
                    container._vnode = vnode;
                    return;
                }
                hydrateNode(container.firstChild, vnode, null, null, null);
                flushPostFlushCbs();
                container._vnode = vnode;
            };
            const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false)=>{
                optimized = optimized || !!vnode.dynamicChildren;
                const isFragmentStart = isComment(node) && "[" === node.data;
                const onMismatch = ()=>handleMismatch(node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragmentStart);
                const { type, ref: ref1, shapeFlag, patchFlag } = vnode;
                let domType = node.nodeType;
                vnode.el = node;
                if (-2 === patchFlag) {
                    optimized = false;
                    vnode.dynamicChildren = null;
                }
                let nextNode = null;
                switch(type){
                    case Text:
                        if (3 !== domType) {
                            if ("" === vnode.children) {
                                insert(vnode.el = createText(""), parentNode(node), node);
                                nextNode = node;
                            } else nextNode = onMismatch();
                        } else {
                            if (node.data !== vnode.children) {
                                logMismatchError();
                                node.data = vnode.children;
                            }
                            nextNode = nextSibling(node);
                        }
                        break;
                    case Comment:
                        if (isTemplateNode(node)) {
                            nextNode = nextSibling(node);
                            replaceNode(vnode.el = node.content.firstChild, node, parentComponent);
                        } else nextNode = 8 !== domType || isFragmentStart ? onMismatch() : nextSibling(node);
                        break;
                    case runtime_core_esm_bundler_Static:
                        if (isFragmentStart) {
                            node = nextSibling(node);
                            domType = node.nodeType;
                        }
                        if (1 === domType || 3 === domType) {
                            nextNode = node;
                            const needToAdoptContent = !vnode.children.length;
                            for(let i = 0; i < vnode.staticCount; i++){
                                if (needToAdoptContent) vnode.children += 1 === nextNode.nodeType ? nextNode.outerHTML : nextNode.data;
                                if (i === vnode.staticCount - 1) vnode.anchor = nextNode;
                                nextNode = nextSibling(nextNode);
                            }
                            return isFragmentStart ? nextSibling(nextNode) : nextNode;
                        }
                        onMismatch();
                        break;
                    case runtime_core_esm_bundler_Fragment:
                        nextNode = isFragmentStart ? hydrateFragment(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) : onMismatch();
                        break;
                    default:
                        if (1 & shapeFlag) nextNode = 1 === domType && vnode.type.toLowerCase() === node.tagName.toLowerCase() || isTemplateNode(node) ? hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) : onMismatch();
                        else if (6 & shapeFlag) {
                            vnode.slotScopeIds = slotScopeIds;
                            const container = parentNode(node);
                            nextNode = isFragmentStart ? locateClosingAnchor(node) : isComment(node) && "teleport start" === node.data ? locateClosingAnchor(node, node.data, "teleport end") : nextSibling(node);
                            mountComponent(vnode, container, null, parentComponent, parentSuspense, getContainerType(container), optimized);
                            if (isAsyncWrapper(vnode) && !vnode.type.__asyncResolved) {
                                let subTree;
                                if (isFragmentStart) {
                                    subTree = createVNode(runtime_core_esm_bundler_Fragment);
                                    subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
                                } else subTree = 3 === node.nodeType ? createTextVNode("") : createVNode("div");
                                subTree.el = node;
                                vnode.component.subTree = subTree;
                            }
                        } else if (64 & shapeFlag) nextNode = 8 !== domType ? onMismatch() : vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hydrateChildren);
                        else if (128 & shapeFlag) nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, getContainerType(parentNode(node)), slotScopeIds, optimized, rendererInternals, hydrateNode);
                }
                if (null != ref1) setRef(ref1, null, parentSuspense, vnode);
                return nextNode;
            };
            const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized)=>{
                optimized = optimized || !!vnode.dynamicChildren;
                const { type, props, patchFlag, shapeFlag, dirs, transition } = vnode;
                const forcePatch = "input" === type || "option" === type;
                if (forcePatch || -1 !== patchFlag) {
                    if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "created");
                    let needCallTransitionHooks = false;
                    if (isTemplateNode(el)) {
                        needCallTransitionHooks = needTransition(null, transition) && parentComponent && parentComponent.vnode.props && parentComponent.vnode.props.appear;
                        const content = el.content.firstChild;
                        if (needCallTransitionHooks) transition.beforeEnter(content);
                        replaceNode(content, el, parentComponent);
                        vnode.el = el = content;
                    }
                    if (16 & shapeFlag && !(props && (props.innerHTML || props.textContent))) {
                        let next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
                        while(next){
                            if (!isMismatchAllowed(el, 1)) logMismatchError();
                            const cur = next;
                            next = next.nextSibling;
                            remove(cur);
                        }
                    } else if (8 & shapeFlag) {
                        let clientText = vnode.children;
                        if ("\n" === clientText[0] && ("PRE" === el.tagName || "TEXTAREA" === el.tagName)) clientText = clientText.slice(1);
                        if (el.textContent !== clientText) {
                            if (!isMismatchAllowed(el, 0)) logMismatchError();
                            el.textContent = vnode.children;
                        }
                    }
                    if (props) {
                        if (forcePatch || !optimized || 48 & patchFlag) {
                            const isCustomElement = el.tagName.includes("-");
                            for(const key in props)if (forcePatch && (key.endsWith("value") || "indeterminate" === key) || isOn(key) && !isReservedProp(key) || "." === key[0] || isCustomElement) patchProp(el, key, null, props[key], void 0, parentComponent);
                        } else if (props.onClick) patchProp(el, "onClick", null, props.onClick, void 0, parentComponent);
                        else if (4 & patchFlag && isReactive(props.style)) for(const key in props.style)props.style[key];
                    }
                    let vnodeHooks;
                    if (vnodeHooks = props && props.onVnodeBeforeMount) invokeVNodeHook(vnodeHooks, parentComponent, vnode);
                    if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
                    if ((vnodeHooks = props && props.onVnodeMounted) || dirs || needCallTransitionHooks) queueEffectWithSuspense(()=>{
                        vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
                        needCallTransitionHooks && transition.enter(el);
                        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
                    }, parentSuspense);
                }
                return el.nextSibling;
            };
            const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized)=>{
                optimized = optimized || !!parentVNode.dynamicChildren;
                const children = parentVNode.children;
                const l = children.length;
                for(let i = 0; i < l; i++){
                    const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
                    const isText = vnode.type === Text;
                    if (node) {
                        if (isText && !optimized) {
                            if (i + 1 < l && normalizeVNode(children[i + 1]).type === Text) {
                                insert(createText(node.data.slice(vnode.children.length)), container, nextSibling(node));
                                node.data = vnode.children;
                            }
                        }
                        node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
                    } else if (isText && !vnode.children) insert(vnode.el = createText(""), container);
                    else {
                        if (!isMismatchAllowed(container, 1)) logMismatchError();
                        patch(null, vnode, container, null, parentComponent, parentSuspense, getContainerType(container), slotScopeIds);
                    }
                }
                return node;
            };
            const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized)=>{
                const { slotScopeIds: fragmentSlotScopeIds } = vnode;
                if (fragmentSlotScopeIds) slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
                const container = parentNode(node);
                const next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, slotScopeIds, optimized);
                if (next && isComment(next) && "]" === next.data) return nextSibling(vnode.anchor = next);
                logMismatchError();
                insert(vnode.anchor = createComment("]"), container, next);
                return next;
            };
            const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment)=>{
                if (!isMismatchAllowed(node.parentElement, 1)) logMismatchError();
                vnode.el = null;
                if (isFragment) {
                    const end = locateClosingAnchor(node);
                    while(true){
                        const next2 = nextSibling(node);
                        if (next2 && next2 !== end) remove(next2);
                        else break;
                    }
                }
                const next = nextSibling(node);
                const container = parentNode(node);
                remove(node);
                patch(null, vnode, container, next, parentComponent, parentSuspense, getContainerType(container), slotScopeIds);
                if (parentComponent) {
                    parentComponent.vnode.el = vnode.el;
                    updateHOCHostEl(parentComponent, vnode.el);
                }
                return next;
            };
            const locateClosingAnchor = (node, open = "[", close = "]")=>{
                let match = 0;
                while(node){
                    node = nextSibling(node);
                    if (node && isComment(node)) {
                        if (node.data === open) match++;
                        if (node.data === close) {
                            if (0 === match) return nextSibling(node);
                            match--;
                        }
                    }
                }
                return node;
            };
            const replaceNode = (newNode, oldNode, parentComponent)=>{
                const parentNode2 = oldNode.parentNode;
                if (parentNode2) parentNode2.replaceChild(newNode, oldNode);
                let parent = parentComponent;
                while(parent){
                    if (parent.vnode.el === oldNode) parent.vnode.el = parent.subTree.el = newNode;
                    parent = parent.parent;
                }
            };
            const isTemplateNode = (node)=>1 === node.nodeType && "TEMPLATE" === node.tagName;
            return [
                hydrate,
                hydrateNode
            ];
        }
        function propHasMismatch(el, key, clientValue, vnode, instance) {
            let mismatchType;
            let mismatchKey;
            let actual;
            let expected;
            if ("class" === key) {
                actual = el.getAttribute("class");
                expected = normalizeClass(clientValue);
                if (!isSetEqual(toClassSet(actual || ""), toClassSet(expected))) {
                    mismatchType = 2;
                    mismatchKey = "class";
                }
            } else if ("style" === key) {
                actual = el.getAttribute("style") || "";
                expected = isString(clientValue) ? clientValue : stringifyStyle(normalizeStyle(clientValue));
                const actualMap = toStyleMap(actual);
                const expectedMap = toStyleMap(expected);
                if (vnode.dirs) {
                    for (const { dir, value } of vnode.dirs)if ("show" === dir.name && !value) expectedMap.set("display", "none");
                }
                if (instance) resolveCssVars(instance, vnode, expectedMap);
                if (!isMapEqual(actualMap, expectedMap)) {
                    mismatchType = 3;
                    mismatchKey = "style";
                }
            } else if (el instanceof SVGElement && isKnownSvgAttr(key) || el instanceof HTMLElement && (isBooleanAttr(key) || isKnownHtmlAttr(key))) {
                if (isBooleanAttr(key)) {
                    actual = el.hasAttribute(key);
                    expected = includeBooleanAttr(clientValue);
                } else if (null == clientValue) {
                    actual = el.hasAttribute(key);
                    expected = false;
                } else {
                    actual = el.hasAttribute(key) ? el.getAttribute(key) : "value" === key && "TEXTAREA" === el.tagName && el.value;
                    expected = !!isRenderableAttrValue(clientValue) && String(clientValue);
                }
                if (actual !== expected) {
                    mismatchType = 4;
                    mismatchKey = key;
                }
            }
            if (null != mismatchType && !isMismatchAllowed(el, mismatchType)) {
                const format = (v1)=>false === v1 ? "(not rendered)" : `${mismatchKey}="${v1}"`;
                const preSegment = `Hydration ${MismatchTypeString[mismatchType]} mismatch on`;
                const postSegment = `
  - rendered on server: ${format(actual)}
  - expected on client: ${format(expected)}
  Note: this mismatch is check-only. The DOM will not be rectified in production due to performance overhead.
  You should fix the source of the mismatch.`;
                warn$1(preSegment, el, postSegment);
                return true;
            }
            return false;
        }
        function toClassSet(str) {
            return new Set(str.trim().split(/\s+/));
        }
        function isSetEqual(a, b) {
            if (a.size !== b.size) return false;
            for (const s of a)if (!b.has(s)) return false;
            return true;
        }
        function toStyleMap(str) {
            const styleMap = /* @__PURE__ */ new Map();
            for (const item of str.split(";")){
                let [key, value] = item.split(":");
                key = key.trim();
                value = value && value.trim();
                if (key && value) styleMap.set(key, value);
            }
            return styleMap;
        }
        function isMapEqual(a, b) {
            if (a.size !== b.size) return false;
            for (const [key, value] of a)if (value !== b.get(key)) return false;
            return true;
        }
        function resolveCssVars(instance, vnode, expectedMap) {
            const root = instance.subTree;
            if (instance.getCssVars && (vnode === root || root && root.type === runtime_core_esm_bundler_Fragment && root.children.includes(vnode))) {
                const cssVars = instance.getCssVars();
                for(const key in cssVars)expectedMap.set(`--${getEscapedCssVarName(key, false)}`, String(cssVars[key]));
            }
            if (vnode === root && instance.parent) resolveCssVars(instance.parent, instance.vnode, expectedMap);
        }
        const allowMismatchAttr = "data-allow-mismatch";
        const MismatchTypeString = null;
        function isMismatchAllowed(el, allowedType) {
            if (0 === allowedType || 1 === allowedType) while(el && !el.hasAttribute(allowMismatchAttr))el = el.parentElement;
            const allowedAttr = el && el.getAttribute(allowMismatchAttr);
            if (null == allowedAttr) return false;
            if ("" === allowedAttr) return true;
            {
                const list = allowedAttr.split(",");
                if (0 === allowedType && list.includes("children")) return true;
                return allowedAttr.split(",").includes(MismatchTypeString[allowedType]);
            }
        }
        const requestIdleCallback = getGlobalThis().requestIdleCallback || ((cb)=>setTimeout(cb, 1));
        const cancelIdleCallback = getGlobalThis().cancelIdleCallback || ((id)=>clearTimeout(id));
        const hydrateOnIdle = (timeout = 1e4)=>(hydrate)=>{
                const id = requestIdleCallback(hydrate, {
                    timeout
                });
                return ()=>cancelIdleCallback(id);
            };
        function elementIsVisibleInViewport(el) {
            const { top, left, bottom, right } = el.getBoundingClientRect();
            const { innerHeight, innerWidth } = window;
            return (top > 0 && top < innerHeight || bottom > 0 && bottom < innerHeight) && (left > 0 && left < innerWidth || right > 0 && right < innerWidth);
        }
        const hydrateOnVisible = (opts)=>(hydrate, forEach)=>{
                const ob = new IntersectionObserver((entries)=>{
                    for (const e of entries)if (!!e.isIntersecting) {
                        ob.disconnect();
                        hydrate();
                        break;
                    }
                }, opts);
                forEach((el)=>{
                    if (!(el instanceof Element)) return;
                    if (elementIsVisibleInViewport(el)) {
                        hydrate();
                        ob.disconnect();
                        return false;
                    }
                    ob.observe(el);
                });
                return ()=>ob.disconnect();
            };
        const hydrateOnMediaQuery = (query)=>(hydrate)=>{
                if (query) {
                    const mql = matchMedia(query);
                    if (mql.matches) hydrate();
                    else {
                        mql.addEventListener("change", hydrate, {
                            once: true
                        });
                        return ()=>mql.removeEventListener("change", hydrate);
                    }
                }
            };
        const hydrateOnInteraction = (interactions = [])=>(hydrate, forEach)=>{
                if (isString(interactions)) interactions = [
                    interactions
                ];
                let hasHydrated = false;
                const doHydrate = (e)=>{
                    if (!hasHydrated) {
                        hasHydrated = true;
                        teardown();
                        hydrate();
                        e.target.dispatchEvent(new e.constructor(e.type, e));
                    }
                };
                const teardown = ()=>{
                    forEach((el)=>{
                        for (const i of interactions)el.removeEventListener(i, doHydrate);
                    });
                };
                forEach((el)=>{
                    for (const i of interactions)el.addEventListener(i, doHydrate, {
                        once: true
                    });
                });
                return teardown;
            };
        function forEachElement(node, cb) {
            if (isComment(node) && "[" === node.data) {
                let depth = 1;
                let next = node.nextSibling;
                while(next){
                    if (1 === next.nodeType) {
                        const result = cb(next);
                        if (false === result) break;
                    } else if (isComment(next)) {
                        if ("]" === next.data) {
                            if (0 === --depth) break;
                        } else if ("[" === next.data) depth++;
                    }
                    next = next.nextSibling;
                }
            } else cb(node);
        }
        const isAsyncWrapper = (i)=>!!i.type.__asyncLoader;
        /*! #__NO_SIDE_EFFECTS__ */ function runtime_core_esm_bundler_defineAsyncComponent(source) {
            if (isFunction(source)) source = {
                loader: source
            };
            const { loader, loadingComponent, errorComponent, delay = 200, hydrate: hydrateStrategy, timeout, suspensible = true, onError: userOnError } = source;
            let pendingRequest = null;
            let resolvedComp;
            let retries = 0;
            const retry = ()=>{
                retries++;
                pendingRequest = null;
                return load();
            };
            const load = ()=>{
                let thisRequest;
                return pendingRequest || (thisRequest = pendingRequest = loader().catch((err)=>{
                    err = err instanceof Error ? err : new Error(String(err));
                    if (userOnError) return new Promise((resolve, reject)=>{
                        const userRetry = ()=>resolve(retry());
                        const userFail = ()=>reject(err);
                        userOnError(err, userRetry, userFail, retries + 1);
                    });
                    throw err;
                }).then((comp)=>{
                    if (thisRequest !== pendingRequest && pendingRequest) return pendingRequest;
                    if (comp && (comp.__esModule || "Module" === comp[Symbol.toStringTag])) comp = comp.default;
                    resolvedComp = comp;
                    return comp;
                }));
            };
            return runtime_core_esm_bundler_defineComponent({
                name: "AsyncComponentWrapper",
                __asyncLoader: load,
                __asyncHydrate (el, instance, hydrate) {
                    const doHydrate = hydrateStrategy ? ()=>{
                        const teardown = hydrateStrategy(hydrate, (cb)=>forEachElement(el, cb));
                        if (teardown) (instance.bum || (instance.bum = [])).push(teardown);
                    } : hydrate;
                    if (resolvedComp) doHydrate();
                    else load().then(()=>!instance.isUnmounted && doHydrate());
                },
                get __asyncResolved () {
                    return resolvedComp;
                },
                setup () {
                    const instance = currentInstance;
                    markAsyncBoundary(instance);
                    if (resolvedComp) return ()=>createInnerComp(resolvedComp, instance);
                    const onError = (err)=>{
                        pendingRequest = null;
                        handleError(err, instance, 13, !errorComponent);
                    };
                    if (suspensible && instance.suspense || isInSSRComponentSetup) return load().then((comp)=>()=>createInnerComp(comp, instance)).catch((err)=>{
                        onError(err);
                        return ()=>errorComponent ? createVNode(errorComponent, {
                                error: err
                            }) : null;
                    });
                    const loaded = ref(false);
                    const error = ref();
                    const delayed = ref(!!delay);
                    if (delay) setTimeout(()=>{
                        delayed.value = false;
                    }, delay);
                    if (null != timeout) setTimeout(()=>{
                        if (!loaded.value && !error.value) {
                            const err = new Error(`Async component timed out after ${timeout}ms.`);
                            onError(err);
                            error.value = err;
                        }
                    }, timeout);
                    load().then(()=>{
                        loaded.value = true;
                        if (instance.parent && isKeepAlive(instance.parent.vnode)) instance.parent.update();
                    }).catch((err)=>{
                        onError(err);
                        error.value = err;
                    });
                    return ()=>{
                        if (loaded.value && resolvedComp) return createInnerComp(resolvedComp, instance);
                        if (error.value && errorComponent) return createVNode(errorComponent, {
                            error: error.value
                        });
                        if (loadingComponent && !delayed.value) return createVNode(loadingComponent);
                    };
                }
            });
        }
        function createInnerComp(comp, parent) {
            const { ref: ref2, props, children, ce } = parent.vnode;
            const vnode = createVNode(comp, props, children);
            vnode.ref = ref2;
            vnode.ce = ce;
            delete parent.vnode.ce;
            return vnode;
        }
        const isKeepAlive = (vnode)=>vnode.type.__isKeepAlive;
        const KeepAliveImpl = {
            name: "KeepAlive",
            __isKeepAlive: true,
            props: {
                include: [
                    String,
                    RegExp,
                    Array
                ],
                exclude: [
                    String,
                    RegExp,
                    Array
                ],
                max: [
                    String,
                    Number
                ]
            },
            setup (props, { slots }) {
                const instance = runtime_core_esm_bundler_getCurrentInstance();
                const sharedContext = instance.ctx;
                if (!sharedContext.renderer) return ()=>{
                    const children = slots.default && slots.default();
                    return children && 1 === children.length ? children[0] : children;
                };
                const cache = /* @__PURE__ */ new Map();
                const keys = /* @__PURE__ */ new Set();
                let current = null;
                const parentSuspense = instance.suspense;
                const { renderer: { p: patch, m: move, um: _unmount, o: { createElement: createElement1 } } } = sharedContext;
                const storageContainer = createElement1("div");
                sharedContext.activate = (vnode, container, anchor, namespace, optimized)=>{
                    const instance2 = vnode.component;
                    move(vnode, container, anchor, 0, parentSuspense);
                    patch(instance2.vnode, vnode, container, anchor, instance2, parentSuspense, namespace, vnode.slotScopeIds, optimized);
                    queuePostRenderEffect(()=>{
                        instance2.isDeactivated = false;
                        if (instance2.a) shared_esm_bundler_invokeArrayFns(instance2.a);
                        const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
                        if (vnodeHook) invokeVNodeHook(vnodeHook, instance2.parent, vnode);
                    }, parentSuspense);
                };
                sharedContext.deactivate = (vnode)=>{
                    const instance2 = vnode.component;
                    invalidateMount(instance2.m);
                    invalidateMount(instance2.a);
                    move(vnode, storageContainer, null, 1, parentSuspense);
                    queuePostRenderEffect(()=>{
                        if (instance2.da) shared_esm_bundler_invokeArrayFns(instance2.da);
                        const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
                        if (vnodeHook) invokeVNodeHook(vnodeHook, instance2.parent, vnode);
                        instance2.isDeactivated = true;
                    }, parentSuspense);
                };
                function unmount(vnode) {
                    resetShapeFlag(vnode);
                    _unmount(vnode, instance, parentSuspense, true);
                }
                function pruneCache(filter) {
                    cache.forEach((vnode, key)=>{
                        const name1 = getComponentName(vnode.type);
                        if (name1 && !filter(name1)) pruneCacheEntry(key);
                    });
                }
                function pruneCacheEntry(key) {
                    const cached = cache.get(key);
                    if (!cached || current && isSameVNodeType(cached, current)) {
                        if (current) resetShapeFlag(current);
                    } else unmount(cached);
                    cache.delete(key);
                    keys.delete(key);
                }
                runtime_core_esm_bundler_watch(()=>[
                        props.include,
                        props.exclude
                    ], ([include, exclude])=>{
                    include && pruneCache((name1)=>matches(include, name1));
                    exclude && pruneCache((name1)=>!matches(exclude, name1));
                }, {
                    flush: "post",
                    deep: true
                });
                let pendingCacheKey = null;
                const cacheSubtree = ()=>{
                    if (null != pendingCacheKey) {
                        if (isSuspense(instance.subTree.type)) queuePostRenderEffect(()=>{
                            cache.set(pendingCacheKey, getInnerChild(instance.subTree));
                        }, instance.subTree.suspense);
                        else cache.set(pendingCacheKey, getInnerChild(instance.subTree));
                    }
                };
                runtime_core_esm_bundler_onMounted(cacheSubtree);
                onUpdated(cacheSubtree);
                onBeforeUnmount(()=>{
                    cache.forEach((cached)=>{
                        const { subTree, suspense } = instance;
                        const vnode = getInnerChild(subTree);
                        if (cached.type === vnode.type && cached.key === vnode.key) {
                            resetShapeFlag(vnode);
                            const da = vnode.component.da;
                            da && queuePostRenderEffect(da, suspense);
                            return;
                        }
                        unmount(cached);
                    });
                });
                return ()=>{
                    pendingCacheKey = null;
                    if (!slots.default) return current = null;
                    const children = slots.default();
                    const rawVNode = children[0];
                    if (children.length > 1) {
                        current = null;
                        return children;
                    }
                    if (!isVNode(rawVNode) || !(4 & rawVNode.shapeFlag) && !(128 & rawVNode.shapeFlag)) {
                        current = null;
                        return rawVNode;
                    }
                    let vnode = getInnerChild(rawVNode);
                    if (vnode.type === Comment) {
                        current = null;
                        return vnode;
                    }
                    const comp = vnode.type;
                    const name1 = getComponentName(isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp);
                    const { include, exclude, max } = props;
                    if (include && (!name1 || !matches(include, name1)) || exclude && name1 && matches(exclude, name1)) {
                        vnode.shapeFlag &= -257;
                        current = vnode;
                        return rawVNode;
                    }
                    const key = null == vnode.key ? comp : vnode.key;
                    const cachedVNode = cache.get(key);
                    if (vnode.el) {
                        vnode = cloneVNode(vnode);
                        if (128 & rawVNode.shapeFlag) rawVNode.ssContent = vnode;
                    }
                    pendingCacheKey = key;
                    if (cachedVNode) {
                        vnode.el = cachedVNode.el;
                        vnode.component = cachedVNode.component;
                        if (vnode.transition) setTransitionHooks(vnode, vnode.transition);
                        vnode.shapeFlag |= 512;
                        keys.delete(key);
                        keys.add(key);
                    } else {
                        keys.add(key);
                        if (max && keys.size > parseInt(max, 10)) pruneCacheEntry(keys.values().next().value);
                    }
                    vnode.shapeFlag |= 256;
                    current = vnode;
                    return isSuspense(rawVNode.type) ? rawVNode : vnode;
                };
            }
        };
        const KeepAlive = null;
        function matches(pattern, name1) {
            if (shared_esm_bundler_isArray(pattern)) return pattern.some((p)=>matches(p, name1));
            if (shared_esm_bundler_isString(pattern)) return pattern.split(",").includes(name1);
            if (isRegExp(pattern)) {
                pattern.lastIndex = 0;
                return pattern.test(name1);
            }
            return false;
        }
        function onActivated(hook, target) {
            registerKeepAliveHook(hook, "a", target);
        }
        function onDeactivated(hook, target) {
            registerKeepAliveHook(hook, "da", target);
        }
        function registerKeepAliveHook(hook, type, target = currentInstance) {
            const wrappedHook = hook.__wdc || (hook.__wdc = ()=>{
                let current = target;
                while(current){
                    if (current.isDeactivated) return;
                    current = current.parent;
                }
                return hook();
            });
            injectHook(type, wrappedHook, target);
            if (target) {
                let current = target.parent;
                while(current && current.parent){
                    if (isKeepAlive(current.parent.vnode)) injectToKeepAliveRoot(wrappedHook, type, target, current);
                    current = current.parent;
                }
            }
        }
        function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
            const injected = injectHook(type, hook, keepAliveRoot, true);
            runtime_core_esm_bundler_onUnmounted(()=>{
                shared_esm_bundler_remove(keepAliveRoot[type], injected);
            }, target);
        }
        function resetShapeFlag(vnode) {
            vnode.shapeFlag &= -257;
            vnode.shapeFlag &= -513;
        }
        function getInnerChild(vnode) {
            return 128 & vnode.shapeFlag ? vnode.ssContent : vnode;
        }
        function injectHook(type, hook, target = currentInstance, prepend = false) {
            if (target) {
                const hooks = target[type] || (target[type] = []);
                const wrappedHook = hook.__weh || (hook.__weh = (...args)=>{
                    reactivity_esm_bundler_pauseTracking();
                    const reset = setCurrentInstance(target);
                    const res = callWithAsyncErrorHandling(hook, target, type, args);
                    reset();
                    reactivity_esm_bundler_resetTracking();
                    return res;
                });
                if (prepend) hooks.unshift(wrappedHook);
                else hooks.push(wrappedHook);
                return wrappedHook;
            }
        }
        const createHook = (lifecycle)=>(hook, target = currentInstance)=>{
                if (!isInSSRComponentSetup || "sp" === lifecycle) injectHook(lifecycle, (...args)=>hook(...args), target);
            };
        const onBeforeMount = createHook("bm");
        const runtime_core_esm_bundler_onMounted = createHook("m");
        const runtime_core_esm_bundler_onBeforeUpdate = createHook("bu");
        const onUpdated = createHook("u");
        const onBeforeUnmount = createHook("bum");
        const runtime_core_esm_bundler_onUnmounted = createHook("um");
        const onServerPrefetch = createHook("sp");
        const onRenderTriggered = createHook("rtg");
        const onRenderTracked = createHook("rtc");
        function onErrorCaptured(hook, target = currentInstance) {
            injectHook("ec", hook, target);
        }
        const COMPONENTS = "components";
        const DIRECTIVES = "directives";
        function resolveComponent(name1, maybeSelfReference) {
            return resolveAsset(COMPONENTS, name1, true, maybeSelfReference) || name1;
        }
        const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
        function resolveDynamicComponent(component) {
            if (isString(component)) return resolveAsset(COMPONENTS, component, false) || component;
            return component || NULL_DYNAMIC_COMPONENT;
        }
        function resolveDirective(name1) {
            return resolveAsset(DIRECTIVES, name1);
        }
        function resolveAsset(type, name1, warnMissing = true, maybeSelfReference = false) {
            const instance = currentRenderingInstance || currentInstance;
            if (instance) {
                const Component = instance.type;
                if (type === COMPONENTS) {
                    const selfName = getComponentName(Component, false);
                    if (selfName && (selfName === name1 || selfName === camelize(name1) || selfName === capitalize(camelize(name1)))) return Component;
                }
                const res = runtime_core_esm_bundler_resolve(instance[type] || Component[type], name1) || runtime_core_esm_bundler_resolve(instance.appContext[type], name1);
                if (!res && maybeSelfReference) return Component;
                return res;
            }
        }
        function runtime_core_esm_bundler_resolve(registry, name1) {
            return registry && (registry[name1] || registry[camelize(name1)] || registry[capitalize(camelize(name1))]);
        }
        function renderList(source, renderItem, cache, index) {
            let ret;
            const cached = cache && cache[index];
            const sourceIsArray = isArray(source);
            if (sourceIsArray || isString(source)) {
                const sourceIsReactiveArray = sourceIsArray && isReactive(source);
                let needsWrap = false;
                if (sourceIsReactiveArray) {
                    needsWrap = !isShallow(source);
                    source = shallowReadArray(source);
                }
                ret = new Array(source.length);
                for(let i = 0, l = source.length; i < l; i++)ret[i] = renderItem(needsWrap ? toReactive(source[i]) : source[i], i, void 0, cached && cached[i]);
            } else if ("number" == typeof source) {
                ret = new Array(source);
                for(let i = 0; i < source; i++)ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
            } else if (isObject(source)) {
                if (source[Symbol.iterator]) ret = Array.from(source, (item, i)=>renderItem(item, i, void 0, cached && cached[i]));
                else {
                    const keys = Object.keys(source);
                    ret = new Array(keys.length);
                    for(let i = 0, l = keys.length; i < l; i++){
                        const key = keys[i];
                        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
                    }
                }
            } else ret = [];
            if (cache) cache[index] = ret;
            return ret;
        }
        function createSlots(slots, dynamicSlots) {
            for(let i = 0; i < dynamicSlots.length; i++){
                const slot = dynamicSlots[i];
                if (isArray(slot)) for(let j = 0; j < slot.length; j++)slots[slot[j].name] = slot[j].fn;
                else if (slot) slots[slot.name] = slot.key ? (...args)=>{
                    const res = slot.fn(...args);
                    if (res) res.key = slot.key;
                    return res;
                } : slot.fn;
            }
            return slots;
        }
        function renderSlot(slots, name1, props = {}, fallback, noSlotted) {
            if (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce) {
                if ("default" !== name1) props.name = name1;
                return openBlock(), createBlock(runtime_core_esm_bundler_Fragment, null, [
                    createVNode("slot", props, fallback && fallback())
                ], 64);
            }
            let slot = slots[name1];
            if (slot && slot._c) slot._d = false;
            openBlock();
            const validSlotContent = slot && ensureValidVNode(slot(props));
            const slotKey = props.key || validSlotContent && validSlotContent.key;
            const rendered = createBlock(runtime_core_esm_bundler_Fragment, {
                key: (slotKey && !isSymbol(slotKey) ? slotKey : `_${name1}`) + (!validSlotContent && fallback ? "_fb" : "")
            }, validSlotContent || (fallback ? fallback() : []), validSlotContent && 1 === slots._ ? 64 : -2);
            if (!noSlotted && rendered.scopeId) rendered.slotScopeIds = [
                rendered.scopeId + "-s"
            ];
            if (slot && slot._c) slot._d = true;
            return rendered;
        }
        function ensureValidVNode(vnodes) {
            return vnodes.some((child)=>{
                if (!isVNode(child)) return true;
                if (child.type === Comment) return false;
                if (child.type === runtime_core_esm_bundler_Fragment && !ensureValidVNode(child.children)) return false;
                return true;
            }) ? vnodes : null;
        }
        function toHandlers(obj, preserveCaseIfNecessary) {
            const ret = {};
            for(const key in obj)ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? `on:${key}` : toHandlerKey(key)] = obj[key];
            return ret;
        }
        const getPublicInstance = (i)=>{
            if (!i) return null;
            if (isStatefulComponent(i)) return getComponentPublicInstance(i);
            return getPublicInstance(i.parent);
        };
        const publicPropertiesMap = /* @__PURE__ */ shared_esm_bundler_extend(/* @__PURE__ */ Object.create(null), {
            $: (i)=>i,
            $el: (i)=>i.vnode.el,
            $data: (i)=>i.data,
            $props: (i)=>i.props,
            $attrs: (i)=>i.attrs,
            $slots: (i)=>i.slots,
            $refs: (i)=>i.refs,
            $parent: (i)=>getPublicInstance(i.parent),
            $root: (i)=>getPublicInstance(i.root),
            $host: (i)=>i.ce,
            $emit: (i)=>i.emit,
            $options: (i)=>resolveMergedOptions(i),
            $forceUpdate: (i)=>i.f || (i.f = ()=>{
                    queueJob(i.update);
                }),
            $nextTick: (i)=>i.n || (i.n = runtime_core_esm_bundler_nextTick.bind(i.proxy)),
            $watch: (i)=>instanceWatch.bind(i)
        });
        const isReservedPrefix = (key)=>"_" === key || "$" === key;
        const hasSetupBinding = (state, key)=>state !== shared_esm_bundler_EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
        const PublicInstanceProxyHandlers = {
            get ({ _: instance }, key) {
                if ("__v_skip" === key) return true;
                const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
                let normalizedProps;
                if ("$" !== key[0]) {
                    const n = accessCache[key];
                    if (void 0 !== n) switch(n){
                        case 1:
                            return setupState[key];
                        case 2:
                            return data[key];
                        case 4:
                            return ctx[key];
                        case 3:
                            return props[key];
                    }
                    else if (hasSetupBinding(setupState, key)) {
                        accessCache[key] = 1;
                        return setupState[key];
                    } else if (data !== shared_esm_bundler_EMPTY_OBJ && hasOwn(data, key)) {
                        accessCache[key] = 2;
                        return data[key];
                    } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
                        accessCache[key] = 3;
                        return props[key];
                    } else if (ctx !== shared_esm_bundler_EMPTY_OBJ && hasOwn(ctx, key)) {
                        accessCache[key] = 4;
                        return ctx[key];
                    } else if (shouldCacheAccess) accessCache[key] = 0;
                }
                const publicGetter = publicPropertiesMap[key];
                let cssModule, globalProperties;
                if (publicGetter) {
                    if ("$attrs" === key) reactivity_esm_bundler_track(instance.attrs, "get", "");
                    return publicGetter(instance);
                }
                if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) return cssModule;
                if (ctx !== shared_esm_bundler_EMPTY_OBJ && hasOwn(ctx, key)) {
                    accessCache[key] = 4;
                    return ctx[key];
                } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) return globalProperties[key];
            },
            set ({ _: instance }, key, value) {
                const { data, setupState, ctx } = instance;
                if (hasSetupBinding(setupState, key)) {
                    setupState[key] = value;
                    return true;
                }
                if (data !== shared_esm_bundler_EMPTY_OBJ && hasOwn(data, key)) {
                    data[key] = value;
                    return true;
                } else if (hasOwn(instance.props, key)) return false;
                if ("$" === key[0] && key.slice(1) in instance) return false;
                ctx[key] = value;
                return true;
            },
            has ({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
                let normalizedProps;
                return !!accessCache[key] || data !== shared_esm_bundler_EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
            },
            defineProperty (target, key, descriptor) {
                if (null != descriptor.get) target._.accessCache[key] = 0;
                else if (hasOwn(descriptor, "value")) this.set(target, key, descriptor.value, null);
                return Reflect.defineProperty(target, key, descriptor);
            }
        };
        const RuntimeCompiledPublicInstanceProxyHandlers = /* @__PURE__ */ null;
        function createDevRenderContext(instance) {
            const target = {};
            Object.defineProperty(target, "_", {
                configurable: true,
                enumerable: false,
                get: ()=>instance
            });
            Object.keys(publicPropertiesMap).forEach((key)=>{
                Object.defineProperty(target, key, {
                    configurable: true,
                    enumerable: false,
                    get: ()=>publicPropertiesMap[key](instance),
                    set: NOOP
                });
            });
            return target;
        }
        function exposePropsOnRenderContext(instance) {
            const { ctx, propsOptions: [propsOptions] } = instance;
            if (propsOptions) Object.keys(propsOptions).forEach((key)=>{
                Object.defineProperty(ctx, key, {
                    enumerable: true,
                    configurable: true,
                    get: ()=>instance.props[key],
                    set: NOOP
                });
            });
        }
        function exposeSetupStateOnRenderContext(instance) {
            const { ctx, setupState } = instance;
            Object.keys(toRaw(setupState)).forEach((key)=>{
                if (!setupState.__isScriptSetup) {
                    if (isReservedPrefix(key[0])) {
                        warn$1(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
                        return;
                    }
                    Object.defineProperty(ctx, key, {
                        enumerable: true,
                        configurable: true,
                        get: ()=>setupState[key],
                        set: NOOP
                    });
                }
            });
        }
        const warnRuntimeUsage = (method)=>warn$1(`${method}() is a compiler-hint helper that is only usable inside <script setup> of a single file component. Its arguments should be compiled away and passing it at runtime has no effect.`);
        function defineProps() {
            return null;
        }
        function defineEmits() {
            return null;
        }
        function defineExpose(exposed) {}
        function defineOptions(options) {}
        function defineSlots() {
            return null;
        }
        function defineModel() {}
        function withDefaults(props, defaults) {
            return null;
        }
        function useSlots() {
            return getContext().slots;
        }
        function useAttrs() {
            return getContext().attrs;
        }
        function getContext() {
            const i = runtime_core_esm_bundler_getCurrentInstance();
            return i.setupContext || (i.setupContext = createSetupContext(i));
        }
        function normalizePropsOrEmits(props) {
            return shared_esm_bundler_isArray(props) ? props.reduce((normalized, p)=>(normalized[p] = null, normalized), {}) : props;
        }
        function mergeDefaults(raw, defaults) {
            const props = normalizePropsOrEmits(raw);
            for(const key in defaults){
                if (key.startsWith("__skip")) continue;
                let opt = props[key];
                if (opt) {
                    if (isArray(opt) || isFunction(opt)) opt = props[key] = {
                        type: opt,
                        default: defaults[key]
                    };
                    else opt.default = defaults[key];
                } else if (null === opt) opt = props[key] = {
                    default: defaults[key]
                };
                if (opt && defaults[`__skip_${key}`]) opt.skipFactory = true;
            }
            return props;
        }
        function mergeModels(a, b) {
            if (!a || !b) return a || b;
            if (isArray(a) && isArray(b)) return a.concat(b);
            return extend({}, normalizePropsOrEmits(a), normalizePropsOrEmits(b));
        }
        function createPropsRestProxy(props, excludedKeys) {
            const ret = {};
            for(const key in props)if (!excludedKeys.includes(key)) Object.defineProperty(ret, key, {
                enumerable: true,
                get: ()=>props[key]
            });
            return ret;
        }
        function withAsyncContext(getAwaitable) {
            const ctx = runtime_core_esm_bundler_getCurrentInstance();
            let awaitable = getAwaitable();
            unsetCurrentInstance();
            if (isPromise(awaitable)) awaitable = awaitable.catch((e)=>{
                setCurrentInstance(ctx);
                throw e;
            });
            return [
                awaitable,
                ()=>setCurrentInstance(ctx)
            ];
        }
        function createDuplicateChecker() {
            const cache = /* @__PURE__ */ Object.create(null);
            return (type, key)=>{
                if (cache[key]) warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
                else cache[key] = type;
            };
        }
        let shouldCacheAccess = true;
        function applyOptions(instance) {
            const options = resolveMergedOptions(instance);
            const publicThis = instance.proxy;
            const ctx = instance.ctx;
            shouldCacheAccess = false;
            if (options.beforeCreate) runtime_core_esm_bundler_callHook(options.beforeCreate, instance, "bc");
            const { data: dataOptions, computed: computedOptions, methods, watch: watchOptions, provide: provideOptions, inject: injectOptions, created, beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeDestroy, beforeUnmount, destroyed, unmounted, render, renderTracked, renderTriggered, errorCaptured, serverPrefetch, expose, inheritAttrs, components, directives, filters } = options;
            const checkDuplicateProperties = null;
            if (injectOptions) resolveInjections(injectOptions, ctx, checkDuplicateProperties);
            if (methods) for(const key in methods){
                const methodHandler = methods[key];
                if (shared_esm_bundler_isFunction(methodHandler)) ctx[key] = methodHandler.bind(publicThis);
            }
            if (dataOptions) {
                const data = dataOptions.call(publicThis, publicThis);
                if (shared_esm_bundler_isObject(data)) instance.data = reactive(data);
            }
            shouldCacheAccess = true;
            if (computedOptions) for(const key in computedOptions){
                const opt = computedOptions[key];
                const get = shared_esm_bundler_isFunction(opt) ? opt.bind(publicThis, publicThis) : shared_esm_bundler_isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : shared_esm_bundler_NOOP;
                const set = !shared_esm_bundler_isFunction(opt) && shared_esm_bundler_isFunction(opt.set) ? opt.set.bind(publicThis) : shared_esm_bundler_NOOP;
                const c = runtime_core_esm_bundler_computed({
                    get,
                    set
                });
                Object.defineProperty(ctx, key, {
                    enumerable: true,
                    configurable: true,
                    get: ()=>c.value,
                    set: (v1)=>c.value = v1
                });
            }
            if (watchOptions) for(const key in watchOptions)createWatcher(watchOptions[key], ctx, publicThis, key);
            if (provideOptions) {
                const provides = shared_esm_bundler_isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
                Reflect.ownKeys(provides).forEach((key)=>{
                    runtime_core_esm_bundler_provide(key, provides[key]);
                });
            }
            if (created) runtime_core_esm_bundler_callHook(created, instance, "c");
            function registerLifecycleHook(register, hook) {
                if (shared_esm_bundler_isArray(hook)) hook.forEach((_hook)=>register(_hook.bind(publicThis)));
                else if (hook) register(hook.bind(publicThis));
            }
            registerLifecycleHook(onBeforeMount, beforeMount);
            registerLifecycleHook(runtime_core_esm_bundler_onMounted, mounted);
            registerLifecycleHook(runtime_core_esm_bundler_onBeforeUpdate, beforeUpdate);
            registerLifecycleHook(onUpdated, updated);
            registerLifecycleHook(onActivated, activated);
            registerLifecycleHook(onDeactivated, deactivated);
            registerLifecycleHook(onErrorCaptured, errorCaptured);
            registerLifecycleHook(onRenderTracked, renderTracked);
            registerLifecycleHook(onRenderTriggered, renderTriggered);
            registerLifecycleHook(onBeforeUnmount, beforeUnmount);
            registerLifecycleHook(runtime_core_esm_bundler_onUnmounted, unmounted);
            registerLifecycleHook(onServerPrefetch, serverPrefetch);
            if (shared_esm_bundler_isArray(expose)) {
                if (expose.length) {
                    const exposed = instance.exposed || (instance.exposed = {});
                    expose.forEach((key)=>{
                        Object.defineProperty(exposed, key, {
                            get: ()=>publicThis[key],
                            set: (val)=>publicThis[key] = val
                        });
                    });
                } else if (!instance.exposed) instance.exposed = {};
            }
            if (render && instance.render === shared_esm_bundler_NOOP) instance.render = render;
            if (null != inheritAttrs) instance.inheritAttrs = inheritAttrs;
            if (components) instance.components = components;
            if (directives) instance.directives = directives;
            if (serverPrefetch) markAsyncBoundary(instance);
        }
        function resolveInjections(injectOptions, ctx, checkDuplicateProperties = shared_esm_bundler_NOOP) {
            if (shared_esm_bundler_isArray(injectOptions)) injectOptions = normalizeInject(injectOptions);
            for(const key in injectOptions){
                const opt = injectOptions[key];
                let injected;
                injected = shared_esm_bundler_isObject(opt) ? "default" in opt ? runtime_core_esm_bundler_inject(opt.from || key, opt.default, true) : runtime_core_esm_bundler_inject(opt.from || key) : runtime_core_esm_bundler_inject(opt);
                if (reactivity_esm_bundler_isRef(injected)) Object.defineProperty(ctx, key, {
                    enumerable: true,
                    configurable: true,
                    get: ()=>injected.value,
                    set: (v1)=>injected.value = v1
                });
                else ctx[key] = injected;
            }
        }
        function runtime_core_esm_bundler_callHook(hook, instance, type) {
            callWithAsyncErrorHandling(shared_esm_bundler_isArray(hook) ? hook.map((h1)=>h1.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
        }
        function createWatcher(raw, ctx, publicThis, key) {
            let getter = key.includes(".") ? createPathGetter(publicThis, key) : ()=>publicThis[key];
            if (shared_esm_bundler_isString(raw)) {
                const handler = ctx[raw];
                if (shared_esm_bundler_isFunction(handler)) runtime_core_esm_bundler_watch(getter, handler);
            } else if (shared_esm_bundler_isFunction(raw)) runtime_core_esm_bundler_watch(getter, raw.bind(publicThis));
            else if (shared_esm_bundler_isObject(raw)) {
                if (shared_esm_bundler_isArray(raw)) raw.forEach((r)=>createWatcher(r, ctx, publicThis, key));
                else {
                    const handler = shared_esm_bundler_isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
                    if (shared_esm_bundler_isFunction(handler)) runtime_core_esm_bundler_watch(getter, handler, raw);
                }
            } else ;
        }
        function resolveMergedOptions(instance) {
            const base = instance.type;
            const { mixins, extends: extendsOptions } = base;
            const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
            const cached = cache.get(base);
            let resolved;
            if (cached) resolved = cached;
            else if (globalMixins.length || mixins || extendsOptions) {
                resolved = {};
                if (globalMixins.length) globalMixins.forEach((m)=>mergeOptions(resolved, m, optionMergeStrategies, true));
                mergeOptions(resolved, base, optionMergeStrategies);
            } else resolved = base;
            if (shared_esm_bundler_isObject(base)) cache.set(base, resolved);
            return resolved;
        }
        function mergeOptions(to, from, strats, asMixin = false) {
            const { mixins, extends: extendsOptions } = from;
            if (extendsOptions) mergeOptions(to, extendsOptions, strats, true);
            if (mixins) mixins.forEach((m)=>mergeOptions(to, m, strats, true));
            for(const key in from)if (asMixin && "expose" === key) ;
            else {
                const strat = internalOptionMergeStrats[key] || strats && strats[key];
                to[key] = strat ? strat(to[key], from[key]) : from[key];
            }
            return to;
        }
        const internalOptionMergeStrats = {
            data: mergeDataFn,
            props: mergeEmitsOrPropsOptions,
            emits: mergeEmitsOrPropsOptions,
            methods: mergeObjectOptions,
            computed: mergeObjectOptions,
            beforeCreate: mergeAsArray,
            created: mergeAsArray,
            beforeMount: mergeAsArray,
            mounted: mergeAsArray,
            beforeUpdate: mergeAsArray,
            updated: mergeAsArray,
            beforeDestroy: mergeAsArray,
            beforeUnmount: mergeAsArray,
            destroyed: mergeAsArray,
            unmounted: mergeAsArray,
            activated: mergeAsArray,
            deactivated: mergeAsArray,
            errorCaptured: mergeAsArray,
            serverPrefetch: mergeAsArray,
            components: mergeObjectOptions,
            directives: mergeObjectOptions,
            watch: mergeWatchOptions,
            provide: mergeDataFn,
            inject: mergeInject
        };
        function mergeDataFn(to, from) {
            if (!from) return to;
            if (!to) return from;
            return function() {
                return shared_esm_bundler_extend(shared_esm_bundler_isFunction(to) ? to.call(this, this) : to, shared_esm_bundler_isFunction(from) ? from.call(this, this) : from);
            };
        }
        function mergeInject(to, from) {
            return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
        }
        function normalizeInject(raw) {
            if (shared_esm_bundler_isArray(raw)) {
                const res = {};
                for(let i = 0; i < raw.length; i++)res[raw[i]] = raw[i];
                return res;
            }
            return raw;
        }
        function mergeAsArray(to, from) {
            return to ? [
                ...new Set([].concat(to, from))
            ] : from;
        }
        function mergeObjectOptions(to, from) {
            return to ? shared_esm_bundler_extend(/* @__PURE__ */ Object.create(null), to, from) : from;
        }
        function mergeEmitsOrPropsOptions(to, from) {
            if (!to) return from;
            if (shared_esm_bundler_isArray(to) && shared_esm_bundler_isArray(from)) return [
                .../* @__PURE__ */ new Set([
                    ...to,
                    ...from
                ])
            ];
            return shared_esm_bundler_extend(/* @__PURE__ */ Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(null != from ? from : {}));
        }
        function mergeWatchOptions(to, from) {
            if (!to) return from;
            if (!from) return to;
            const merged = shared_esm_bundler_extend(/* @__PURE__ */ Object.create(null), to);
            for(const key in from)merged[key] = mergeAsArray(to[key], from[key]);
            return merged;
        }
        function createAppContext() {
            return {
                app: null,
                config: {
                    isNativeTag: NO,
                    performance: false,
                    globalProperties: {},
                    optionMergeStrategies: {},
                    errorHandler: void 0,
                    warnHandler: void 0,
                    compilerOptions: {}
                },
                mixins: [],
                components: {},
                directives: {},
                provides: /* @__PURE__ */ Object.create(null),
                optionsCache: /* @__PURE__ */ new WeakMap(),
                propsCache: /* @__PURE__ */ new WeakMap(),
                emitsCache: /* @__PURE__ */ new WeakMap()
            };
        }
        let uid$1 = 0;
        function createAppAPI(render, hydrate) {
            return function(rootComponent, rootProps = null) {
                if (!shared_esm_bundler_isFunction(rootComponent)) rootComponent = shared_esm_bundler_extend({}, rootComponent);
                if (null != rootProps && !shared_esm_bundler_isObject(rootProps)) rootProps = null;
                const context = createAppContext();
                const installedPlugins = /* @__PURE__ */ new WeakSet();
                const pluginCleanupFns = [];
                let isMounted = false;
                const app = context.app = {
                    _uid: uid$1++,
                    _component: rootComponent,
                    _props: rootProps,
                    _container: null,
                    _context: context,
                    _instance: null,
                    version: runtime_core_esm_bundler_version,
                    get config () {
                        return context.config;
                    },
                    set config (v){},
                    use (plugin, ...options) {
                        if (installedPlugins.has(plugin)) ;
                        else if (plugin && shared_esm_bundler_isFunction(plugin.install)) {
                            installedPlugins.add(plugin);
                            plugin.install(app, ...options);
                        } else if (shared_esm_bundler_isFunction(plugin)) {
                            installedPlugins.add(plugin);
                            plugin(app, ...options);
                        }
                        return app;
                    },
                    mixin (mixin) {
                        if (context.mixins.includes(mixin)) ;
                        else context.mixins.push(mixin);
                        return app;
                    },
                    component (name1, component) {
                        if (!component) return context.components[name1];
                        context.components[name1] = component;
                        return app;
                    },
                    directive (name1, directive) {
                        if (!directive) return context.directives[name1];
                        context.directives[name1] = directive;
                        return app;
                    },
                    mount (rootContainer, isHydrate, namespace) {
                        if (isMounted) ;
                        else {
                            const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
                            vnode.appContext = context;
                            if (true === namespace) namespace = "svg";
                            else if (false === namespace) namespace = void 0;
                            if (isHydrate && hydrate) hydrate(vnode, rootContainer);
                            else render(vnode, rootContainer, namespace);
                            isMounted = true;
                            app._container = rootContainer;
                            rootContainer.__vue_app__ = app;
                            return getComponentPublicInstance(vnode.component);
                        }
                    },
                    onUnmount (cleanupFn) {
                        pluginCleanupFns.push(cleanupFn);
                    },
                    unmount () {
                        if (isMounted) {
                            callWithAsyncErrorHandling(pluginCleanupFns, app._instance, 16);
                            render(null, app._container);
                            delete app._container.__vue_app__;
                        }
                    },
                    provide (key, value) {
                        context.provides[key] = value;
                        return app;
                    },
                    runWithContext (fn) {
                        const lastApp = currentApp;
                        currentApp = app;
                        try {
                            return fn();
                        } finally{
                            currentApp = lastApp;
                        }
                    }
                };
                return app;
            };
        }
        let currentApp = null;
        function runtime_core_esm_bundler_provide(key, value) {
            if (currentInstance) {
                let provides = currentInstance.provides;
                const parentProvides = currentInstance.parent && currentInstance.parent.provides;
                if (parentProvides === provides) provides = currentInstance.provides = Object.create(parentProvides);
                provides[key] = value;
            }
        }
        function runtime_core_esm_bundler_inject(key, defaultValue, treatDefaultAsFactory = false) {
            const instance = currentInstance || currentRenderingInstance;
            if (instance || currentApp) {
                const provides = currentApp ? currentApp._context.provides : instance ? null == instance.parent ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
                if (provides && key in provides) return provides[key];
                if (arguments.length > 1) return treatDefaultAsFactory && shared_esm_bundler_isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
            }
        }
        function hasInjectionContext() {
            return !!(currentInstance || currentRenderingInstance || currentApp);
        }
        const internalObjectProto = {};
        const createInternalObject = ()=>Object.create(internalObjectProto);
        const isInternalObject = (obj)=>Object.getPrototypeOf(obj) === internalObjectProto;
        function initProps(instance, rawProps, isStateful, isSSR = false) {
            const props = {};
            const attrs = createInternalObject();
            instance.propsDefaults = /* @__PURE__ */ Object.create(null);
            setFullProps(instance, rawProps, props, attrs);
            for(const key in instance.propsOptions[0])if (!(key in props)) props[key] = void 0;
            if (isStateful) instance.props = isSSR ? props : shallowReactive(props);
            else if (instance.type.props) instance.props = props;
            else instance.props = attrs;
            instance.attrs = attrs;
        }
        function isInHmrContext(instance) {
            while(instance){
                if (instance.type.__hmrId) return true;
                instance = instance.parent;
            }
        }
        function updateProps(instance, rawProps, rawPrevProps, optimized) {
            const { props, attrs, vnode: { patchFlag } } = instance;
            const rawCurrentProps = reactivity_esm_bundler_toRaw(props);
            const [options] = instance.propsOptions;
            let hasAttrsChanged = false;
            if ((optimized || patchFlag > 0) && !(16 & patchFlag)) {
                if (8 & patchFlag) {
                    const propsToUpdate = instance.vnode.dynamicProps;
                    for(let i = 0; i < propsToUpdate.length; i++){
                        let key = propsToUpdate[i];
                        if (isEmitListener(instance.emitsOptions, key)) continue;
                        const value = rawProps[key];
                        if (options) {
                            if (hasOwn(attrs, key)) {
                                if (value !== attrs[key]) {
                                    attrs[key] = value;
                                    hasAttrsChanged = true;
                                }
                            } else {
                                const camelizedKey = shared_esm_bundler_camelize(key);
                                props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
                            }
                        } else if (value !== attrs[key]) {
                            attrs[key] = value;
                            hasAttrsChanged = true;
                        }
                    }
                }
            } else {
                if (setFullProps(instance, rawProps, props, attrs)) hasAttrsChanged = true;
                let kebabKey;
                for(const key in rawCurrentProps)if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = shared_esm_bundler_hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
                    if (options) {
                        if (rawPrevProps && (void 0 !== rawPrevProps[key] || void 0 !== rawPrevProps[kebabKey])) props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
                    } else delete props[key];
                }
                if (attrs !== rawCurrentProps) {
                    for(const key in attrs)if (!rawProps || !hasOwn(rawProps, key)) {
                        delete attrs[key];
                        hasAttrsChanged = true;
                    }
                }
            }
            if (hasAttrsChanged) reactivity_esm_bundler_trigger(instance.attrs, "set", "");
        }
        function setFullProps(instance, rawProps, props, attrs) {
            const [options, needCastKeys] = instance.propsOptions;
            let hasAttrsChanged = false;
            let rawCastValues;
            if (rawProps) for(let key in rawProps){
                if (shared_esm_bundler_isReservedProp(key)) continue;
                const value = rawProps[key];
                let camelKey;
                if (options && hasOwn(options, camelKey = shared_esm_bundler_camelize(key))) {
                    if (needCastKeys && needCastKeys.includes(camelKey)) (rawCastValues || (rawCastValues = {}))[camelKey] = value;
                    else props[camelKey] = value;
                } else if (!isEmitListener(instance.emitsOptions, key)) {
                    if (!(key in attrs) || value !== attrs[key]) {
                        attrs[key] = value;
                        hasAttrsChanged = true;
                    }
                }
            }
            if (needCastKeys) {
                const rawCurrentProps = reactivity_esm_bundler_toRaw(props);
                const castValues = rawCastValues || shared_esm_bundler_EMPTY_OBJ;
                for(let i = 0; i < needCastKeys.length; i++){
                    const key = needCastKeys[i];
                    props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
                }
            }
            return hasAttrsChanged;
        }
        function resolvePropValue(options, props, key, value, instance, isAbsent) {
            const opt = options[key];
            if (null != opt) {
                const hasDefault = hasOwn(opt, "default");
                if (hasDefault && void 0 === value) {
                    const defaultValue = opt.default;
                    if (opt.type !== Function && !opt.skipFactory && shared_esm_bundler_isFunction(defaultValue)) {
                        const { propsDefaults } = instance;
                        if (key in propsDefaults) value = propsDefaults[key];
                        else {
                            const reset = setCurrentInstance(instance);
                            value = propsDefaults[key] = defaultValue.call(null, props);
                            reset();
                        }
                    } else value = defaultValue;
                    if (instance.ce) instance.ce._setProp(key, value);
                }
                if (opt[0]) {
                    if (isAbsent && !hasDefault) value = false;
                    else if (opt[1] && ("" === value || value === shared_esm_bundler_hyphenate(key))) value = true;
                }
            }
            return value;
        }
        const mixinPropsCache = /* @__PURE__ */ new WeakMap();
        function normalizePropsOptions(comp, appContext, asMixin = false) {
            const cache = asMixin ? mixinPropsCache : appContext.propsCache;
            const cached = cache.get(comp);
            if (cached) return cached;
            const raw = comp.props;
            const normalized = {};
            const needCastKeys = [];
            let hasExtends = false;
            if (!shared_esm_bundler_isFunction(comp)) {
                const extendProps = (raw2)=>{
                    hasExtends = true;
                    const [props, keys] = normalizePropsOptions(raw2, appContext, true);
                    shared_esm_bundler_extend(normalized, props);
                    if (keys) needCastKeys.push(...keys);
                };
                if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendProps);
                if (comp.extends) extendProps(comp.extends);
                if (comp.mixins) comp.mixins.forEach(extendProps);
            }
            if (!raw && !hasExtends) {
                if (shared_esm_bundler_isObject(comp)) cache.set(comp, shared_esm_bundler_EMPTY_ARR);
                return shared_esm_bundler_EMPTY_ARR;
            }
            if (shared_esm_bundler_isArray(raw)) for(let i = 0; i < raw.length; i++){
                const normalizedKey = shared_esm_bundler_camelize(raw[i]);
                if (validatePropName(normalizedKey)) normalized[normalizedKey] = shared_esm_bundler_EMPTY_OBJ;
            }
            else if (raw) for(const key in raw){
                const normalizedKey = shared_esm_bundler_camelize(key);
                if (validatePropName(normalizedKey)) {
                    const opt = raw[key];
                    const prop = normalized[normalizedKey] = shared_esm_bundler_isArray(opt) || shared_esm_bundler_isFunction(opt) ? {
                        type: opt
                    } : shared_esm_bundler_extend({}, opt);
                    const propType = prop.type;
                    let shouldCast = false;
                    let shouldCastTrue = true;
                    if (shared_esm_bundler_isArray(propType)) for(let index = 0; index < propType.length; ++index){
                        const type = propType[index];
                        const typeName = shared_esm_bundler_isFunction(type) && type.name;
                        if ("Boolean" === typeName) {
                            shouldCast = true;
                            break;
                        }
                        if ("String" === typeName) shouldCastTrue = false;
                    }
                    else shouldCast = shared_esm_bundler_isFunction(propType) && "Boolean" === propType.name;
                    prop[0] = shouldCast;
                    prop[1] = shouldCastTrue;
                    if (shouldCast || hasOwn(prop, "default")) needCastKeys.push(normalizedKey);
                }
            }
            const res = [
                normalized,
                needCastKeys
            ];
            if (shared_esm_bundler_isObject(comp)) cache.set(comp, res);
            return res;
        }
        function validatePropName(key) {
            if ("$" !== key[0] && !shared_esm_bundler_isReservedProp(key)) return true;
            return false;
        }
        function getType(ctor) {
            if (null === ctor) return "null";
            if ("function" == typeof ctor) return ctor.name || "";
            if ("object" == typeof ctor) {
                const name1 = ctor.constructor && ctor.constructor.name;
                return name1 || "";
            }
            return "";
        }
        function validateProps(rawProps, props, instance) {
            const resolvedValues = toRaw(props);
            const options = instance.propsOptions[0];
            const camelizePropsKey = Object.keys(rawProps).map((key)=>camelize(key));
            for(const key in options){
                let opt = options[key];
                if (null != opt) validateProp(key, resolvedValues[key], opt, resolvedValues, !camelizePropsKey.includes(key));
            }
        }
        function validateProp(name1, value, prop, props, isAbsent) {
            const { type, required, validator, skipCheck } = prop;
            if (required && isAbsent) {
                warn$1('Missing required prop: "' + name1 + '"');
                return;
            }
            if (null == value && !required) return;
            if (null != type && true !== type && !skipCheck) {
                let isValid = false;
                const types = isArray(type) ? type : [
                    type
                ];
                const expectedTypes = [];
                for(let i = 0; i < types.length && !isValid; i++){
                    const { valid, expectedType } = assertType(value, types[i]);
                    expectedTypes.push(expectedType || "");
                    isValid = valid;
                }
                if (!isValid) {
                    warn$1(getInvalidTypeMessage(name1, value, expectedTypes));
                    return;
                }
            }
            if (validator && !validator(value, props)) warn$1('Invalid prop: custom validator check failed for prop "' + name1 + '".');
        }
        const isSimpleType = /* @__PURE__ */ null;
        function assertType(value, type) {
            let valid;
            const expectedType = getType(type);
            if ("null" === expectedType) valid = null === value;
            else if (isSimpleType(expectedType)) {
                const t = typeof value;
                valid = t === expectedType.toLowerCase();
                if (!valid && "object" === t) valid = value instanceof type;
            } else valid = "Object" === expectedType ? isObject(value) : "Array" === expectedType ? isArray(value) : value instanceof type;
            return {
                valid,
                expectedType
            };
        }
        function getInvalidTypeMessage(name1, value, expectedTypes) {
            if (0 === expectedTypes.length) return `Prop type [] for prop "${name1}" won't match anything. Did you mean to use type Array instead?`;
            let message = `Invalid prop: type check failed for prop "${name1}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
            const expectedType = expectedTypes[0];
            const receivedType = toRawType(value);
            const expectedValue = styleValue(value, expectedType);
            const receivedValue = styleValue(value, receivedType);
            if (1 === expectedTypes.length && isExplicable(expectedType) && !runtime_core_esm_bundler_isBoolean(expectedType, receivedType)) message += ` with value ${expectedValue}`;
            message += `, got ${receivedType} `;
            if (isExplicable(receivedType)) message += `with value ${receivedValue}.`;
            return message;
        }
        function styleValue(value, type) {
            if ("String" === type) return `"${value}"`;
            if ("Number" === type) return `${Number(value)}`;
            return `${value}`;
        }
        function isExplicable(type) {
            const explicitTypes = [
                "string",
                "number",
                "boolean"
            ];
            return explicitTypes.some((elem)=>type.toLowerCase() === elem);
        }
        function runtime_core_esm_bundler_isBoolean(...args) {
            return args.some((elem)=>"boolean" === elem.toLowerCase());
        }
        const isInternalKey = (key)=>"_" === key[0] || "$stable" === key;
        const normalizeSlotValue = (value)=>shared_esm_bundler_isArray(value) ? value.map(normalizeVNode) : [
                normalizeVNode(value)
            ];
        const normalizeSlot = (key, rawSlot, ctx)=>{
            if (rawSlot._n) return rawSlot;
            const normalized = withCtx((...args)=>normalizeSlotValue(rawSlot(...args)), ctx);
            normalized._c = false;
            return normalized;
        };
        const normalizeObjectSlots = (rawSlots, slots, instance)=>{
            const ctx = rawSlots._ctx;
            for(const key in rawSlots){
                if (isInternalKey(key)) continue;
                const value = rawSlots[key];
                if (shared_esm_bundler_isFunction(value)) slots[key] = normalizeSlot(key, value, ctx);
                else if (null != value) {
                    const normalized = normalizeSlotValue(value);
                    slots[key] = ()=>normalized;
                }
            }
        };
        const normalizeVNodeSlots = (instance, children)=>{
            const normalized = normalizeSlotValue(children);
            instance.slots.default = ()=>normalized;
        };
        const assignSlots = (slots, children, optimized)=>{
            for(const key in children)if (optimized || "_" !== key) slots[key] = children[key];
        };
        const initSlots = (instance, children, optimized)=>{
            const slots = instance.slots = createInternalObject();
            if (32 & instance.vnode.shapeFlag) {
                const type = children._;
                if (type) {
                    assignSlots(slots, children, optimized);
                    if (optimized) shared_esm_bundler_def(slots, "_", type, true);
                } else normalizeObjectSlots(children, slots);
            } else if (children) normalizeVNodeSlots(instance, children);
        };
        const updateSlots = (instance, children, optimized)=>{
            const { vnode, slots } = instance;
            let needDeletionCheck = true;
            let deletionComparisonTarget = shared_esm_bundler_EMPTY_OBJ;
            if (32 & vnode.shapeFlag) {
                const type = children._;
                if (type) {
                    if (optimized && 1 === type) needDeletionCheck = false;
                    else assignSlots(slots, children, optimized);
                } else {
                    needDeletionCheck = !children.$stable;
                    normalizeObjectSlots(children, slots);
                }
                deletionComparisonTarget = children;
            } else if (children) {
                normalizeVNodeSlots(instance, children);
                deletionComparisonTarget = {
                    default: 1
                };
            }
            if (needDeletionCheck) {
                for(const key in slots)if (!isInternalKey(key) && null == deletionComparisonTarget[key]) delete slots[key];
            }
        };
        let supported;
        let perf;
        function startMeasure(instance, type) {
            if (instance.appContext.config.performance && isSupported()) perf.mark(`vue-${type}-${instance.uid}`);
        }
        function endMeasure(instance, type) {
            if (instance.appContext.config.performance && isSupported()) {
                const startTag = `vue-${type}-${instance.uid}`;
                const endTag = startTag + ":end";
                perf.mark(endTag);
                perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
                perf.clearMarks(startTag);
                perf.clearMarks(endTag);
            }
        }
        function isSupported() {
            if (void 0 !== supported) return supported;
            if ("undefined" != typeof window && window.performance) {
                supported = true;
                perf = window.performance;
            } else supported = false;
            return supported;
        }
        function initFeatureFlags() {}
        const queuePostRenderEffect = queueEffectWithSuspense;
        function createRenderer(options) {
            return baseCreateRenderer(options);
        }
        function runtime_core_esm_bundler_createHydrationRenderer(options) {
            return baseCreateRenderer(options, createHydrationFunctions);
        }
        function baseCreateRenderer(options, createHydrationFns) {
            initFeatureFlags();
            const target = getGlobalThis();
            target.__VUE__ = true;
            const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = shared_esm_bundler_NOOP, insertStaticContent: hostInsertStaticContent } = options;
            const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace, slotScopeIds = null, optimized = !!n2.dynamicChildren)=>{
                if (n1 === n2) return;
                if (n1 && !isSameVNodeType(n1, n2)) {
                    anchor = getNextHostNode(n1);
                    unmount(n1, parentComponent, parentSuspense, true);
                    n1 = null;
                }
                if (-2 === n2.patchFlag) {
                    optimized = false;
                    n2.dynamicChildren = null;
                }
                const { type, ref: ref1, shapeFlag } = n2;
                switch(type){
                    case Text:
                        processText(n1, n2, container, anchor);
                        break;
                    case Comment:
                        processCommentNode(n1, n2, container, anchor);
                        break;
                    case runtime_core_esm_bundler_Static:
                        if (null == n1) mountStaticNode(n2, container, anchor, namespace);
                        break;
                    case runtime_core_esm_bundler_Fragment:
                        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                        break;
                    default:
                        if (1 & shapeFlag) processElement(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                        else if (6 & shapeFlag) processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                        else if (64 & shapeFlag) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
                        else if (128 & shapeFlag) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
                }
                if (null != ref1 && parentComponent) setRef(ref1, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
            };
            const processText = (n1, n2, container, anchor)=>{
                if (null == n1) hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
                else {
                    const el = n2.el = n1.el;
                    if (n2.children !== n1.children) hostSetText(el, n2.children);
                }
            };
            const processCommentNode = (n1, n2, container, anchor)=>{
                if (null == n1) hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
                else n2.el = n1.el;
            };
            const mountStaticNode = (n2, container, anchor, namespace)=>{
                [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor);
            };
            const moveStaticNode = ({ el, anchor }, container, nextSibling)=>{
                let next;
                while(el && el !== anchor){
                    next = hostNextSibling(el);
                    hostInsert(el, container, nextSibling);
                    el = next;
                }
                hostInsert(anchor, container, nextSibling);
            };
            const removeStaticNode = ({ el, anchor })=>{
                let next;
                while(el && el !== anchor){
                    next = hostNextSibling(el);
                    hostRemove(el);
                    el = next;
                }
                hostRemove(anchor);
            };
            const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized)=>{
                if ("svg" === n2.type) namespace = "svg";
                else if ("math" === n2.type) namespace = "mathml";
                if (null == n1) mountElement(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                else patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            };
            const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized)=>{
                let el;
                let vnodeHook;
                const { props, shapeFlag, transition, dirs } = vnode;
                el = vnode.el = hostCreateElement(vnode.type, namespace, props && props.is, props);
                if (8 & shapeFlag) hostSetElementText(el, vnode.children);
                else if (16 & shapeFlag) mountChildren(vnode.children, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(vnode, namespace), slotScopeIds, optimized);
                if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "created");
                setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
                if (props) {
                    for(const key in props)if ("value" !== key && !shared_esm_bundler_isReservedProp(key)) hostPatchProp(el, key, null, props[key], namespace, parentComponent);
                    if ("value" in props) hostPatchProp(el, "value", null, props.value, namespace);
                    if (vnodeHook = props.onVnodeBeforeMount) invokeVNodeHook(vnodeHook, parentComponent, vnode);
                }
                if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
                const needCallTransitionHooks = needTransition(parentSuspense, transition);
                if (needCallTransitionHooks) transition.beforeEnter(el);
                hostInsert(el, container, anchor);
                if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) queuePostRenderEffect(()=>{
                    vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
                    needCallTransitionHooks && transition.enter(el);
                    dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
                }, parentSuspense);
            };
            const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent)=>{
                if (scopeId) hostSetScopeId(el, scopeId);
                if (slotScopeIds) for(let i = 0; i < slotScopeIds.length; i++)hostSetScopeId(el, slotScopeIds[i]);
                if (parentComponent) {
                    let subTree = parentComponent.subTree;
                    if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
                        const parentVNode = parentComponent.vnode;
                        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
                    }
                }
            };
            const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0)=>{
                for(let i = start; i < children.length; i++){
                    const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
                    patch(null, child, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                }
            };
            const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized)=>{
                const el = n2.el = n1.el;
                let { patchFlag, dynamicChildren, dirs } = n2;
                patchFlag |= 16 & n1.patchFlag;
                const oldProps = n1.props || shared_esm_bundler_EMPTY_OBJ;
                const newProps = n2.props || shared_esm_bundler_EMPTY_OBJ;
                let vnodeHook;
                parentComponent && toggleRecurse(parentComponent, false);
                if (vnodeHook = newProps.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
                if (dirs) invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
                parentComponent && toggleRecurse(parentComponent, true);
                if (oldProps.innerHTML && null == newProps.innerHTML || oldProps.textContent && null == newProps.textContent) hostSetElementText(el, "");
                if (dynamicChildren) patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds);
                else if (!optimized) patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, false);
                if (patchFlag > 0) {
                    if (16 & patchFlag) patchProps(el, oldProps, newProps, parentComponent, namespace);
                    else {
                        if (2 & patchFlag) {
                            if (oldProps.class !== newProps.class) hostPatchProp(el, "class", null, newProps.class, namespace);
                        }
                        if (4 & patchFlag) hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
                        if (8 & patchFlag) {
                            const propsToUpdate = n2.dynamicProps;
                            for(let i = 0; i < propsToUpdate.length; i++){
                                const key = propsToUpdate[i];
                                const prev = oldProps[key];
                                const next = newProps[key];
                                if (next !== prev || "value" === key) hostPatchProp(el, key, prev, next, namespace, parentComponent);
                            }
                        }
                    }
                    if (1 & patchFlag) {
                        if (n1.children !== n2.children) hostSetElementText(el, n2.children);
                    }
                } else if (!optimized && null == dynamicChildren) patchProps(el, oldProps, newProps, parentComponent, namespace);
                if ((vnodeHook = newProps.onVnodeUpdated) || dirs) queuePostRenderEffect(()=>{
                    vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
                    dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
                }, parentSuspense);
            };
            const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds)=>{
                for(let i = 0; i < newChildren.length; i++){
                    const oldVNode = oldChildren[i];
                    const newVNode = newChildren[i];
                    const container = oldVNode.el && (oldVNode.type === runtime_core_esm_bundler_Fragment || !isSameVNodeType(oldVNode, newVNode) || 70 & oldVNode.shapeFlag) ? hostParentNode(oldVNode.el) : fallbackContainer;
                    patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, true);
                }
            };
            const patchProps = (el, oldProps, newProps, parentComponent, namespace)=>{
                if (oldProps !== newProps) {
                    if (oldProps !== shared_esm_bundler_EMPTY_OBJ) {
                        for(const key in oldProps)if (!shared_esm_bundler_isReservedProp(key) && !(key in newProps)) hostPatchProp(el, key, oldProps[key], null, namespace, parentComponent);
                    }
                    for(const key in newProps){
                        if (shared_esm_bundler_isReservedProp(key)) continue;
                        const next = newProps[key];
                        const prev = oldProps[key];
                        if (next !== prev && "value" !== key) hostPatchProp(el, key, prev, next, namespace, parentComponent);
                    }
                    if ("value" in newProps) hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
                }
            };
            const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized)=>{
                const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
                const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
                let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
                if (fragmentSlotScopeIds) slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
                if (null == n1) {
                    hostInsert(fragmentStartAnchor, container, anchor);
                    hostInsert(fragmentEndAnchor, container, anchor);
                    mountChildren(n2.children || [], container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                } else if (patchFlag > 0 && 64 & patchFlag && dynamicChildren && n1.dynamicChildren) {
                    patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds);
                    if (null != n2.key || parentComponent && n2 === parentComponent.subTree) traverseStaticChildren(n1, n2, true);
                } else patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            };
            const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized)=>{
                n2.slotScopeIds = slotScopeIds;
                if (null == n1) {
                    if (512 & n2.shapeFlag) parentComponent.ctx.activate(n2, container, anchor, namespace, optimized);
                    else mountComponent(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized);
                } else updateComponent(n1, n2, optimized);
            };
            const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized)=>{
                const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
                if (isKeepAlive(initialVNode)) instance.ctx.renderer = internals;
                setupComponent(instance, false, optimized);
                if (instance.asyncDep) {
                    parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
                    if (!initialVNode.el) {
                        const placeholder = instance.subTree = createVNode(Comment);
                        processCommentNode(null, placeholder, container, anchor);
                    }
                } else setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
            };
            const updateComponent = (n1, n2, optimized)=>{
                const instance = n2.component = n1.component;
                if (shouldUpdateComponent(n1, n2, optimized)) {
                    if (instance.asyncDep && !instance.asyncResolved) {
                        updateComponentPreRender(instance, n2, optimized);
                        return;
                    }
                    instance.next = n2;
                    instance.update();
                } else {
                    n2.el = n1.el;
                    instance.vnode = n2;
                }
            };
            const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized)=>{
                const componentUpdateFn = ()=>{
                    if (instance.isMounted) {
                        let { next, bu, u, parent, vnode } = instance;
                        {
                            const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
                            if (nonHydratedAsyncRoot) {
                                if (next) {
                                    next.el = vnode.el;
                                    updateComponentPreRender(instance, next, optimized);
                                }
                                nonHydratedAsyncRoot.asyncDep.then(()=>{
                                    if (!instance.isUnmounted) componentUpdateFn();
                                });
                                return;
                            }
                        }
                        let originNext = next;
                        let vnodeHook;
                        toggleRecurse(instance, false);
                        if (next) {
                            next.el = vnode.el;
                            updateComponentPreRender(instance, next, optimized);
                        } else next = vnode;
                        if (bu) shared_esm_bundler_invokeArrayFns(bu);
                        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parent, next, vnode);
                        toggleRecurse(instance, true);
                        const nextTree = renderComponentRoot(instance);
                        const prevTree = instance.subTree;
                        instance.subTree = nextTree;
                        patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, namespace);
                        next.el = nextTree.el;
                        if (null === originNext) updateHOCHostEl(instance, nextTree.el);
                        if (u) queuePostRenderEffect(u, parentSuspense);
                        if (vnodeHook = next.props && next.props.onVnodeUpdated) queuePostRenderEffect(()=>invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
                    } else {
                        let vnodeHook;
                        const { el, props } = initialVNode;
                        const { bm, m, parent, root, type } = instance;
                        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
                        toggleRecurse(instance, false);
                        if (bm) shared_esm_bundler_invokeArrayFns(bm);
                        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) invokeVNodeHook(vnodeHook, parent, initialVNode);
                        toggleRecurse(instance, true);
                        if (el && hydrateNode) {
                            const hydrateSubTree = ()=>{
                                instance.subTree = renderComponentRoot(instance);
                                hydrateNode(el, instance.subTree, instance, parentSuspense, null);
                            };
                            if (isAsyncWrapperVNode && type.__asyncHydrate) type.__asyncHydrate(el, instance, hydrateSubTree);
                            else hydrateSubTree();
                        } else {
                            if (root.ce) root.ce._injectChildStyle(type);
                            const subTree = instance.subTree = renderComponentRoot(instance);
                            patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
                            initialVNode.el = subTree.el;
                        }
                        if (m) queuePostRenderEffect(m, parentSuspense);
                        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
                            const scopedInitialVNode = initialVNode;
                            queuePostRenderEffect(()=>invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
                        }
                        if (256 & initialVNode.shapeFlag || parent && isAsyncWrapper(parent.vnode) && 256 & parent.vnode.shapeFlag) instance.a && queuePostRenderEffect(instance.a, parentSuspense);
                        instance.isMounted = true;
                        initialVNode = container = anchor = null;
                    }
                };
                instance.scope.on();
                const effect = instance.effect = new ReactiveEffect(componentUpdateFn);
                instance.scope.off();
                const update = instance.update = effect.run.bind(effect);
                const job = instance.job = effect.runIfDirty.bind(effect);
                job.i = instance;
                job.id = instance.uid;
                effect.scheduler = ()=>queueJob(job);
                toggleRecurse(instance, true);
                update();
            };
            const updateComponentPreRender = (instance, nextVNode, optimized)=>{
                nextVNode.component = instance;
                const prevProps = instance.vnode.props;
                instance.vnode = nextVNode;
                instance.next = null;
                updateProps(instance, nextVNode.props, prevProps, optimized);
                updateSlots(instance, nextVNode.children, optimized);
                reactivity_esm_bundler_pauseTracking();
                flushPreFlushCbs(instance);
                reactivity_esm_bundler_resetTracking();
            };
            const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false)=>{
                const c1 = n1 && n1.children;
                const prevShapeFlag = n1 ? n1.shapeFlag : 0;
                const c2 = n2.children;
                const { patchFlag, shapeFlag } = n2;
                if (patchFlag > 0) {
                    if (128 & patchFlag) {
                        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                        return;
                    }
                    if (256 & patchFlag) {
                        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                        return;
                    }
                }
                if (8 & shapeFlag) {
                    if (16 & prevShapeFlag) unmountChildren(c1, parentComponent, parentSuspense);
                    if (c2 !== c1) hostSetElementText(container, c2);
                } else if (16 & prevShapeFlag) {
                    if (16 & shapeFlag) patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                    else unmountChildren(c1, parentComponent, parentSuspense, true);
                } else {
                    if (8 & prevShapeFlag) hostSetElementText(container, "");
                    if (16 & shapeFlag) mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                }
            };
            const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized)=>{
                c1 = c1 || shared_esm_bundler_EMPTY_ARR;
                c2 = c2 || shared_esm_bundler_EMPTY_ARR;
                const oldLength = c1.length;
                const newLength = c2.length;
                const commonLength = Math.min(oldLength, newLength);
                let i;
                for(i = 0; i < commonLength; i++){
                    const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
                    patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                }
                if (oldLength > newLength) unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
                else mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength);
            };
            const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized)=>{
                let i = 0;
                const l2 = c2.length;
                let e1 = c1.length - 1;
                let e2 = l2 - 1;
                while(i <= e1 && i <= e2){
                    const n1 = c1[i];
                    const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
                    if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                    else break;
                    i++;
                }
                while(i <= e1 && i <= e2){
                    const n1 = c1[e1];
                    const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
                    if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                    else break;
                    e1--;
                    e2--;
                }
                if (i > e1) {
                    if (i <= e2) {
                        const nextPos = e2 + 1;
                        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
                        while(i <= e2){
                            patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                            i++;
                        }
                    }
                } else if (i > e2) while(i <= e1){
                    unmount(c1[i], parentComponent, parentSuspense, true);
                    i++;
                }
                else {
                    const s1 = i;
                    const s2 = i;
                    const keyToNewIndexMap = /* @__PURE__ */ new Map();
                    for(i = s2; i <= e2; i++){
                        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
                        if (null != nextChild.key) keyToNewIndexMap.set(nextChild.key, i);
                    }
                    let j;
                    let patched = 0;
                    const toBePatched = e2 - s2 + 1;
                    let moved = false;
                    let maxNewIndexSoFar = 0;
                    const newIndexToOldIndexMap = new Array(toBePatched);
                    for(i = 0; i < toBePatched; i++)newIndexToOldIndexMap[i] = 0;
                    for(i = s1; i <= e1; i++){
                        const prevChild = c1[i];
                        if (patched >= toBePatched) {
                            unmount(prevChild, parentComponent, parentSuspense, true);
                            continue;
                        }
                        let newIndex;
                        if (null != prevChild.key) newIndex = keyToNewIndexMap.get(prevChild.key);
                        else for(j = s2; j <= e2; j++)if (0 === newIndexToOldIndexMap[j - s2] && isSameVNodeType(prevChild, c2[j])) {
                            newIndex = j;
                            break;
                        }
                        if (void 0 === newIndex) unmount(prevChild, parentComponent, parentSuspense, true);
                        else {
                            newIndexToOldIndexMap[newIndex - s2] = i + 1;
                            if (newIndex >= maxNewIndexSoFar) maxNewIndexSoFar = newIndex;
                            else moved = true;
                            patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                            patched++;
                        }
                    }
                    const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : shared_esm_bundler_EMPTY_ARR;
                    j = increasingNewIndexSequence.length - 1;
                    for(i = toBePatched - 1; i >= 0; i--){
                        const nextIndex = s2 + i;
                        const nextChild = c2[nextIndex];
                        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
                        if (0 === newIndexToOldIndexMap[i]) patch(null, nextChild, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                        else if (moved) {
                            if (j < 0 || i !== increasingNewIndexSequence[j]) move(nextChild, container, anchor, 2);
                            else j--;
                        }
                    }
                }
            };
            const move = (vnode, container, anchor, moveType, parentSuspense = null)=>{
                const { el, type, transition, children, shapeFlag } = vnode;
                if (6 & shapeFlag) {
                    move(vnode.component.subTree, container, anchor, moveType);
                    return;
                }
                if (128 & shapeFlag) {
                    vnode.suspense.move(container, anchor, moveType);
                    return;
                }
                if (64 & shapeFlag) {
                    type.move(vnode, container, anchor, internals);
                    return;
                }
                if (type === runtime_core_esm_bundler_Fragment) {
                    hostInsert(el, container, anchor);
                    for(let i = 0; i < children.length; i++)move(children[i], container, anchor, moveType);
                    hostInsert(vnode.anchor, container, anchor);
                    return;
                }
                if (type === runtime_core_esm_bundler_Static) {
                    moveStaticNode(vnode, container, anchor);
                    return;
                }
                const needTransition2 = 2 !== moveType && 1 & shapeFlag && transition;
                if (needTransition2) {
                    if (0 === moveType) {
                        transition.beforeEnter(el);
                        hostInsert(el, container, anchor);
                        queuePostRenderEffect(()=>transition.enter(el), parentSuspense);
                    } else {
                        const { leave, delayLeave, afterLeave } = transition;
                        const remove2 = ()=>hostInsert(el, container, anchor);
                        const performLeave = ()=>{
                            leave(el, ()=>{
                                remove2();
                                afterLeave && afterLeave();
                            });
                        };
                        if (delayLeave) delayLeave(el, remove2, performLeave);
                        else performLeave();
                    }
                } else hostInsert(el, container, anchor);
            };
            const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false)=>{
                const { type, props, ref: ref1, children, dynamicChildren, shapeFlag, patchFlag, dirs, cacheIndex } = vnode;
                if (-2 === patchFlag) optimized = false;
                if (null != ref1) setRef(ref1, null, parentSuspense, vnode, true);
                if (null != cacheIndex) parentComponent.renderCache[cacheIndex] = void 0;
                if (256 & shapeFlag) {
                    parentComponent.ctx.deactivate(vnode);
                    return;
                }
                const shouldInvokeDirs = 1 & shapeFlag && dirs;
                const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
                let vnodeHook;
                if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) invokeVNodeHook(vnodeHook, parentComponent, vnode);
                if (6 & shapeFlag) unmountComponent(vnode.component, parentSuspense, doRemove);
                else {
                    if (128 & shapeFlag) {
                        vnode.suspense.unmount(parentSuspense, doRemove);
                        return;
                    }
                    if (shouldInvokeDirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
                    if (64 & shapeFlag) vnode.type.remove(vnode, parentComponent, parentSuspense, internals, doRemove);
                    else if (dynamicChildren && !dynamicChildren.hasOnce && (type !== runtime_core_esm_bundler_Fragment || patchFlag > 0 && 64 & patchFlag)) unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
                    else if (type === runtime_core_esm_bundler_Fragment && 384 & patchFlag || !optimized && 16 & shapeFlag) unmountChildren(children, parentComponent, parentSuspense);
                    if (doRemove) remove(vnode);
                }
                if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) queuePostRenderEffect(()=>{
                    vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
                    shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
                }, parentSuspense);
            };
            const remove = (vnode)=>{
                const { type, el, anchor, transition } = vnode;
                if (type === runtime_core_esm_bundler_Fragment) {
                    removeFragment(el, anchor);
                    return;
                }
                if (type === runtime_core_esm_bundler_Static) {
                    removeStaticNode(vnode);
                    return;
                }
                const performRemove = ()=>{
                    hostRemove(el);
                    if (transition && !transition.persisted && transition.afterLeave) transition.afterLeave();
                };
                if (1 & vnode.shapeFlag && transition && !transition.persisted) {
                    const { leave, delayLeave } = transition;
                    const performLeave = ()=>leave(el, performRemove);
                    if (delayLeave) delayLeave(vnode.el, performRemove, performLeave);
                    else performLeave();
                } else performRemove();
            };
            const removeFragment = (cur, end)=>{
                let next;
                while(cur !== end){
                    next = hostNextSibling(cur);
                    hostRemove(cur);
                    cur = next;
                }
                hostRemove(end);
            };
            const unmountComponent = (instance, parentSuspense, doRemove)=>{
                const { bum, scope, job, subTree, um, m, a } = instance;
                invalidateMount(m);
                invalidateMount(a);
                if (bum) shared_esm_bundler_invokeArrayFns(bum);
                scope.stop();
                if (job) {
                    job.flags |= 8;
                    unmount(subTree, instance, parentSuspense, doRemove);
                }
                if (um) queuePostRenderEffect(um, parentSuspense);
                queuePostRenderEffect(()=>{
                    instance.isUnmounted = true;
                }, parentSuspense);
                if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
                    parentSuspense.deps--;
                    if (0 === parentSuspense.deps) parentSuspense.resolve();
                }
            };
            const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0)=>{
                for(let i = start; i < children.length; i++)unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
            };
            const getNextHostNode = (vnode)=>{
                if (6 & vnode.shapeFlag) return getNextHostNode(vnode.component.subTree);
                if (128 & vnode.shapeFlag) return vnode.suspense.next();
                const el = hostNextSibling(vnode.anchor || vnode.el);
                const teleportEnd = el && el[TeleportEndKey];
                return teleportEnd ? hostNextSibling(teleportEnd) : el;
            };
            let isFlushing = false;
            const render = (vnode, container, namespace)=>{
                if (null == vnode) {
                    if (container._vnode) unmount(container._vnode, null, null, true);
                } else patch(container._vnode || null, vnode, container, null, null, null, namespace);
                container._vnode = vnode;
                if (!isFlushing) {
                    isFlushing = true;
                    flushPreFlushCbs();
                    flushPostFlushCbs();
                    isFlushing = false;
                }
            };
            const internals = {
                p: patch,
                um: unmount,
                m: move,
                r: remove,
                mt: mountComponent,
                mc: mountChildren,
                pc: patchChildren,
                pbc: patchBlockChildren,
                n: getNextHostNode,
                o: options
            };
            let hydrate;
            let hydrateNode;
            if (createHydrationFns) [hydrate, hydrateNode] = createHydrationFns(internals);
            return {
                render,
                hydrate,
                createApp: createAppAPI(render, hydrate)
            };
        }
        function resolveChildrenNamespace({ type, props }, currentNamespace) {
            return "svg" === currentNamespace && "foreignObject" === type || "mathml" === currentNamespace && "annotation-xml" === type && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
        }
        function toggleRecurse({ effect, job }, allowed) {
            if (allowed) {
                effect.flags |= 32;
                job.flags |= 4;
            } else {
                effect.flags &= -33;
                job.flags &= -5;
            }
        }
        function needTransition(parentSuspense, transition) {
            return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
        }
        function traverseStaticChildren(n1, n2, shallow = false) {
            const ch1 = n1.children;
            const ch2 = n2.children;
            if (shared_esm_bundler_isArray(ch1) && shared_esm_bundler_isArray(ch2)) for(let i = 0; i < ch1.length; i++){
                const c1 = ch1[i];
                let c2 = ch2[i];
                if (1 & c2.shapeFlag && !c2.dynamicChildren) {
                    if (c2.patchFlag <= 0 || 32 === c2.patchFlag) {
                        c2 = ch2[i] = cloneIfMounted(ch2[i]);
                        c2.el = c1.el;
                    }
                    if (!shallow && -2 !== c2.patchFlag) traverseStaticChildren(c1, c2);
                }
                if (c2.type === Text) c2.el = c1.el;
            }
        }
        function getSequence(arr) {
            const p = arr.slice();
            const result = [
                0
            ];
            let i, j, u, v1, c;
            const len = arr.length;
            for(i = 0; i < len; i++){
                const arrI = arr[i];
                if (0 !== arrI) {
                    j = result[result.length - 1];
                    if (arr[j] < arrI) {
                        p[i] = j;
                        result.push(i);
                        continue;
                    }
                    u = 0;
                    v1 = result.length - 1;
                    while(u < v1){
                        c = u + v1 >> 1;
                        if (arr[result[c]] < arrI) u = c + 1;
                        else v1 = c;
                    }
                    if (arrI < arr[result[u]]) {
                        if (u > 0) p[i] = result[u - 1];
                        result[u] = i;
                    }
                }
            }
            u = result.length;
            v1 = result[u - 1];
            while(u-- > 0){
                result[u] = v1;
                v1 = p[v1];
            }
            return result;
        }
        function locateNonHydratedAsyncRoot(instance) {
            const subComponent = instance.subTree.component;
            if (subComponent) {
                if (subComponent.asyncDep && !subComponent.asyncResolved) return subComponent;
                return locateNonHydratedAsyncRoot(subComponent);
            }
        }
        function invalidateMount(hooks) {
            if (hooks) for(let i = 0; i < hooks.length; i++)hooks[i].flags |= 8;
        }
        const ssrContextKey = Symbol.for("v-scx");
        const useSSRContext = ()=>{
            {
                const ctx = runtime_core_esm_bundler_inject(ssrContextKey);
                return ctx;
            }
        };
        function watchEffect(effect, options) {
            return doWatch(effect, null, options);
        }
        function watchPostEffect(effect, options) {
            return doWatch(effect, null, {
                flush: "post"
            });
        }
        function watchSyncEffect(effect, options) {
            return doWatch(effect, null, {
                flush: "sync"
            });
        }
        function runtime_core_esm_bundler_watch(source, cb, options) {
            return doWatch(source, cb, options);
        }
        function doWatch(source, cb, options = shared_esm_bundler_EMPTY_OBJ) {
            const { immediate, deep, flush, once } = options;
            const baseWatchOptions = shared_esm_bundler_extend({}, options);
            const runsImmediately = cb && immediate || !cb && "post" !== flush;
            let ssrCleanup;
            if (isInSSRComponentSetup) {
                if ("sync" === flush) {
                    const ctx = useSSRContext();
                    ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
                } else if (!runsImmediately) {
                    const watchStopHandle = ()=>{};
                    watchStopHandle.stop = shared_esm_bundler_NOOP;
                    watchStopHandle.resume = shared_esm_bundler_NOOP;
                    watchStopHandle.pause = shared_esm_bundler_NOOP;
                    return watchStopHandle;
                }
            }
            const instance = currentInstance;
            baseWatchOptions.call = (fn, type, args)=>callWithAsyncErrorHandling(fn, instance, type, args);
            let isPre = false;
            if ("post" === flush) baseWatchOptions.scheduler = (job)=>{
                queuePostRenderEffect(job, instance && instance.suspense);
            };
            else if ("sync" !== flush) {
                isPre = true;
                baseWatchOptions.scheduler = (job, isFirstRun)=>{
                    if (isFirstRun) job();
                    else queueJob(job);
                };
            }
            baseWatchOptions.augmentJob = (job)=>{
                if (cb) job.flags |= 4;
                if (isPre) {
                    job.flags |= 2;
                    if (instance) {
                        job.id = instance.uid;
                        job.i = instance;
                    }
                }
            };
            const watchHandle = reactivity_esm_bundler_watch(source, cb, baseWatchOptions);
            if (isInSSRComponentSetup) {
                if (ssrCleanup) ssrCleanup.push(watchHandle);
                else if (runsImmediately) watchHandle();
            }
            return watchHandle;
        }
        function instanceWatch(source, value, options) {
            const publicThis = this.proxy;
            const getter = shared_esm_bundler_isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : ()=>publicThis[source] : source.bind(publicThis, publicThis);
            let cb;
            if (shared_esm_bundler_isFunction(value)) cb = value;
            else {
                cb = value.handler;
                options = value;
            }
            const reset = setCurrentInstance(this);
            const res = doWatch(getter, cb.bind(publicThis), options);
            reset();
            return res;
        }
        function createPathGetter(ctx, path) {
            const segments = path.split(".");
            return ()=>{
                let cur = ctx;
                for(let i = 0; i < segments.length && cur; i++)cur = cur[segments[i]];
                return cur;
            };
        }
        function useModel(props, name1, options = EMPTY_OBJ) {
            const i = runtime_core_esm_bundler_getCurrentInstance();
            const camelizedName = camelize(name1);
            const hyphenatedName = hyphenate(name1);
            const modifiers = getModelModifiers(props, camelizedName);
            const res = customRef((track1, trigger)=>{
                let localValue;
                let prevSetValue = EMPTY_OBJ;
                let prevEmittedValue;
                watchSyncEffect(()=>{
                    const propValue = props[camelizedName];
                    if (hasChanged(localValue, propValue)) {
                        localValue = propValue;
                        trigger();
                    }
                });
                return {
                    get () {
                        track1();
                        return options.get ? options.get(localValue) : localValue;
                    },
                    set (value) {
                        const emittedValue = options.set ? options.set(value) : value;
                        if (!hasChanged(emittedValue, localValue) && !(prevSetValue !== EMPTY_OBJ && hasChanged(value, prevSetValue))) return;
                        const rawProps = i.vnode.props;
                        if (!(rawProps && (name1 in rawProps || camelizedName in rawProps || hyphenatedName in rawProps) && (`onUpdate:${name1}` in rawProps || `onUpdate:${camelizedName}` in rawProps || `onUpdate:${hyphenatedName}` in rawProps))) {
                            localValue = value;
                            trigger();
                        }
                        i.emit(`update:${name1}`, emittedValue);
                        if (hasChanged(value, emittedValue) && hasChanged(value, prevSetValue) && !hasChanged(emittedValue, prevEmittedValue)) trigger();
                        prevSetValue = value;
                        prevEmittedValue = emittedValue;
                    }
                };
            });
            res[Symbol.iterator] = ()=>{
                let i2 = 0;
                return {
                    next () {
                        if (i2 < 2) return {
                            value: i2++ ? modifiers || EMPTY_OBJ : res,
                            done: false
                        };
                        return {
                            done: true
                        };
                    }
                };
            };
            return res;
        }
        const getModelModifiers = (props, modelName)=>"modelValue" === modelName || "model-value" === modelName ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${shared_esm_bundler_camelize(modelName)}Modifiers`] || props[`${shared_esm_bundler_hyphenate(modelName)}Modifiers`];
        function runtime_core_esm_bundler_emit(instance, event, ...rawArgs) {
            if (instance.isUnmounted) return;
            const props = instance.vnode.props || shared_esm_bundler_EMPTY_OBJ;
            let args = rawArgs;
            const isModelListener = event.startsWith("update:");
            const modifiers = isModelListener && getModelModifiers(props, event.slice(7));
            if (modifiers) {
                if (modifiers.trim) args = rawArgs.map((a)=>shared_esm_bundler_isString(a) ? a.trim() : a);
                if (modifiers.number) args = rawArgs.map(shared_esm_bundler_looseToNumber);
            }
            let handlerName;
            let handler = props[handlerName = shared_esm_bundler_toHandlerKey(event)] || props[handlerName = shared_esm_bundler_toHandlerKey(shared_esm_bundler_camelize(event))];
            if (!handler && isModelListener) handler = props[handlerName = shared_esm_bundler_toHandlerKey(shared_esm_bundler_hyphenate(event))];
            if (handler) callWithAsyncErrorHandling(handler, instance, 6, args);
            const onceHandler = props[handlerName + "Once"];
            if (onceHandler) {
                if (instance.emitted) {
                    if (instance.emitted[handlerName]) return;
                } else instance.emitted = {};
                instance.emitted[handlerName] = true;
                callWithAsyncErrorHandling(onceHandler, instance, 6, args);
            }
        }
        function normalizeEmitsOptions(comp, appContext, asMixin = false) {
            const cache = appContext.emitsCache;
            const cached = cache.get(comp);
            if (void 0 !== cached) return cached;
            const raw = comp.emits;
            let normalized = {};
            let hasExtends = false;
            if (!shared_esm_bundler_isFunction(comp)) {
                const extendEmits = (raw2)=>{
                    const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
                    if (normalizedFromExtend) {
                        hasExtends = true;
                        shared_esm_bundler_extend(normalized, normalizedFromExtend);
                    }
                };
                if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendEmits);
                if (comp.extends) extendEmits(comp.extends);
                if (comp.mixins) comp.mixins.forEach(extendEmits);
            }
            if (!raw && !hasExtends) {
                if (shared_esm_bundler_isObject(comp)) cache.set(comp, null);
                return null;
            }
            if (shared_esm_bundler_isArray(raw)) raw.forEach((key)=>normalized[key] = null);
            else shared_esm_bundler_extend(normalized, raw);
            if (shared_esm_bundler_isObject(comp)) cache.set(comp, normalized);
            return normalized;
        }
        function isEmitListener(options, key) {
            if (!options || !shared_esm_bundler_isOn(key)) return false;
            key = key.slice(2).replace(/Once$/, "");
            return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, shared_esm_bundler_hyphenate(key)) || hasOwn(options, key);
        }
        let accessedAttrs = false;
        function markAttrsAccessed() {
            accessedAttrs = true;
        }
        function renderComponentRoot(instance) {
            const { type: Component, vnode, proxy, withProxy, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, props, data, setupState, ctx, inheritAttrs } = instance;
            const prev = setCurrentRenderingInstance(instance);
            let result;
            let fallthroughAttrs;
            try {
                if (4 & vnode.shapeFlag) {
                    const proxyToUse = withProxy || proxy;
                    const thisProxy = proxyToUse;
                    result = normalizeVNode(render.call(thisProxy, proxyToUse, renderCache, props, setupState, data, ctx));
                    fallthroughAttrs = attrs;
                } else {
                    const render2 = Component;
                    result = normalizeVNode(render2.length > 1 ? render2(props, {
                        attrs,
                        slots,
                        emit
                    }) : render2(props, null));
                    fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
                }
            } catch (err) {
                blockStack.length = 0;
                handleError(err, instance, 1);
                result = createVNode(Comment);
            }
            let root = result;
            if (fallthroughAttrs && false !== inheritAttrs) {
                const keys = Object.keys(fallthroughAttrs);
                const { shapeFlag } = root;
                if (keys.length) {
                    if (7 & shapeFlag) {
                        if (propsOptions && keys.some(shared_esm_bundler_isModelListener)) fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
                        root = cloneVNode(root, fallthroughAttrs, false, true);
                    }
                }
            }
            if (vnode.dirs) {
                root = cloneVNode(root, null, false, true);
                root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
            }
            if (vnode.transition) setTransitionHooks(root, vnode.transition);
            result = root;
            setCurrentRenderingInstance(prev);
            return result;
        }
        const getChildRoot = (vnode)=>{
            const rawChildren = vnode.children;
            const dynamicChildren = vnode.dynamicChildren;
            const childRoot = filterSingleRoot(rawChildren, false);
            if (!childRoot) return [
                vnode,
                void 0
            ];
            const index = rawChildren.indexOf(childRoot);
            const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
            const setRoot = (updatedRoot)=>{
                rawChildren[index] = updatedRoot;
                if (dynamicChildren) {
                    if (dynamicIndex > -1) dynamicChildren[dynamicIndex] = updatedRoot;
                    else if (updatedRoot.patchFlag > 0) vnode.dynamicChildren = [
                        ...dynamicChildren,
                        updatedRoot
                    ];
                }
            };
            return [
                normalizeVNode(childRoot),
                setRoot
            ];
        };
        function filterSingleRoot(children, recurse = true) {
            let singleRoot;
            for(let i = 0; i < children.length; i++){
                const child = children[i];
                if (!isVNode(child)) return;
                if (child.type !== Comment || "v-if" === child.children) {
                    if (singleRoot) return;
                    singleRoot = child;
                }
            }
            return singleRoot;
        }
        const getFunctionalFallthrough = (attrs)=>{
            let res;
            for(const key in attrs)if ("class" === key || "style" === key || shared_esm_bundler_isOn(key)) (res || (res = {}))[key] = attrs[key];
            return res;
        };
        const filterModelListeners = (attrs, props)=>{
            const res = {};
            for(const key in attrs)if (!shared_esm_bundler_isModelListener(key) || !(key.slice(9) in props)) res[key] = attrs[key];
            return res;
        };
        const isElementRoot = (vnode)=>7 & vnode.shapeFlag || vnode.type === Comment;
        function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
            const { props: prevProps, children: prevChildren, component } = prevVNode;
            const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
            const emits = component.emitsOptions;
            if (nextVNode.dirs || nextVNode.transition) return true;
            if (optimized && patchFlag >= 0) {
                if (1024 & patchFlag) return true;
                if (16 & patchFlag) {
                    if (!prevProps) return !!nextProps;
                    return hasPropsChanged(prevProps, nextProps, emits);
                }
                if (8 & patchFlag) {
                    const dynamicProps = nextVNode.dynamicProps;
                    for(let i = 0; i < dynamicProps.length; i++){
                        const key = dynamicProps[i];
                        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) return true;
                    }
                }
            } else {
                if (prevChildren || nextChildren) {
                    if (!nextChildren || !nextChildren.$stable) return true;
                }
                if (prevProps === nextProps) return false;
                if (!prevProps) return !!nextProps;
                if (!nextProps) return true;
                return hasPropsChanged(prevProps, nextProps, emits);
            }
            return false;
        }
        function hasPropsChanged(prevProps, nextProps, emitsOptions) {
            const nextKeys = Object.keys(nextProps);
            if (nextKeys.length !== Object.keys(prevProps).length) return true;
            for(let i = 0; i < nextKeys.length; i++){
                const key = nextKeys[i];
                if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) return true;
            }
            return false;
        }
        function updateHOCHostEl({ vnode, parent }, el) {
            while(parent){
                const root = parent.subTree;
                if (root.suspense && root.suspense.activeBranch === vnode) root.el = vnode.el;
                if (root === vnode) {
                    (vnode = parent.vnode).el = el;
                    parent = parent.parent;
                } else break;
            }
        }
        const isSuspense = (type)=>type.__isSuspense;
        let suspenseId = 0;
        const SuspenseImpl = null;
        const Suspense = null;
        function triggerEvent(vnode, name1) {
            const eventListener = vnode.props && vnode.props[name1];
            if (isFunction(eventListener)) eventListener();
        }
        function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
            const { p: patch, o: { createElement: createElement1 } } = rendererInternals;
            const hiddenContainer = createElement1("div");
            const suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, namespace, slotScopeIds, optimized, rendererInternals);
            patch(null, suspense.pendingBranch = vnode.ssContent, hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds);
            if (suspense.deps > 0) {
                triggerEvent(vnode, "onPending");
                triggerEvent(vnode, "onFallback");
                patch(null, vnode.ssFallback, container, anchor, parentComponent, null, namespace, slotScopeIds);
                setActiveBranch(suspense, vnode.ssFallback);
            } else suspense.resolve(false, true);
        }
        function patchSuspense(n1, n2, container, anchor, parentComponent, namespace, slotScopeIds, optimized, { p: patch, um: unmount, o: { createElement: createElement1 } }) {
            const suspense = n2.suspense = n1.suspense;
            suspense.vnode = n2;
            n2.el = n1.el;
            const newBranch = n2.ssContent;
            const newFallback = n2.ssFallback;
            const { activeBranch, pendingBranch, isInFallback, isHydrating } = suspense;
            if (pendingBranch) {
                suspense.pendingBranch = newBranch;
                if (isSameVNodeType(newBranch, pendingBranch)) {
                    patch(pendingBranch, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
                    if (suspense.deps <= 0) suspense.resolve();
                    else if (isInFallback) {
                        if (!isHydrating) {
                            patch(activeBranch, newFallback, container, anchor, parentComponent, null, namespace, slotScopeIds, optimized);
                            setActiveBranch(suspense, newFallback);
                        }
                    }
                } else {
                    suspense.pendingId = suspenseId++;
                    if (isHydrating) {
                        suspense.isHydrating = false;
                        suspense.activeBranch = pendingBranch;
                    } else unmount(pendingBranch, parentComponent, suspense);
                    suspense.deps = 0;
                    suspense.effects.length = 0;
                    suspense.hiddenContainer = createElement1("div");
                    if (isInFallback) {
                        patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
                        if (suspense.deps <= 0) suspense.resolve();
                        else {
                            patch(activeBranch, newFallback, container, anchor, parentComponent, null, namespace, slotScopeIds, optimized);
                            setActiveBranch(suspense, newFallback);
                        }
                    } else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
                        patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, namespace, slotScopeIds, optimized);
                        suspense.resolve(true);
                    } else {
                        patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
                        if (suspense.deps <= 0) suspense.resolve();
                    }
                }
            } else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
                patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, namespace, slotScopeIds, optimized);
                setActiveBranch(suspense, newBranch);
            } else {
                triggerEvent(n2, "onPending");
                suspense.pendingBranch = newBranch;
                if (512 & newBranch.shapeFlag) suspense.pendingId = newBranch.component.suspenseId;
                else suspense.pendingId = suspenseId++;
                patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
                if (suspense.deps <= 0) suspense.resolve();
                else {
                    const { timeout, pendingId } = suspense;
                    if (timeout > 0) setTimeout(()=>{
                        if (suspense.pendingId === pendingId) suspense.fallback(newFallback);
                    }, timeout);
                    else if (0 === timeout) suspense.fallback(newFallback);
                }
            }
        }
        let runtime_core_esm_bundler_hasWarned = false;
        function createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, namespace, slotScopeIds, optimized, rendererInternals, isHydrating = false) {
            const { p: patch, m: move, um: unmount, n: next, o: { parentNode, remove } } = rendererInternals;
            let parentSuspenseId;
            const isSuspensible = isVNodeSuspensible(vnode);
            if (isSuspensible) {
                if (parentSuspense && parentSuspense.pendingBranch) {
                    parentSuspenseId = parentSuspense.pendingId;
                    parentSuspense.deps++;
                }
            }
            const timeout = vnode.props ? toNumber(vnode.props.timeout) : void 0;
            const initialAnchor = anchor;
            const suspense = {
                vnode,
                parent: parentSuspense,
                parentComponent,
                namespace,
                container,
                hiddenContainer,
                deps: 0,
                pendingId: suspenseId++,
                timeout: "number" == typeof timeout ? timeout : -1,
                activeBranch: null,
                pendingBranch: null,
                isInFallback: !isHydrating,
                isHydrating,
                isUnmounted: false,
                effects: [],
                resolve (resume = false, sync = false) {
                    const { vnode: vnode2, activeBranch, pendingBranch, pendingId, effects, parentComponent: parentComponent2, container: container2 } = suspense;
                    let delayEnter = false;
                    if (suspense.isHydrating) suspense.isHydrating = false;
                    else if (!resume) {
                        delayEnter = activeBranch && pendingBranch.transition && "out-in" === pendingBranch.transition.mode;
                        if (delayEnter) activeBranch.transition.afterLeave = ()=>{
                            if (pendingId === suspense.pendingId) {
                                move(pendingBranch, container2, anchor === initialAnchor ? next(activeBranch) : anchor, 0);
                                runtime_core_esm_bundler_queuePostFlushCb(effects);
                            }
                        };
                        if (activeBranch) {
                            if (parentNode(activeBranch.el) === container2) anchor = next(activeBranch);
                            unmount(activeBranch, parentComponent2, suspense, true);
                        }
                        if (!delayEnter) move(pendingBranch, container2, anchor, 0);
                    }
                    setActiveBranch(suspense, pendingBranch);
                    suspense.pendingBranch = null;
                    suspense.isInFallback = false;
                    let parent = suspense.parent;
                    let hasUnresolvedAncestor = false;
                    while(parent){
                        if (parent.pendingBranch) {
                            parent.effects.push(...effects);
                            hasUnresolvedAncestor = true;
                            break;
                        }
                        parent = parent.parent;
                    }
                    if (!hasUnresolvedAncestor && !delayEnter) runtime_core_esm_bundler_queuePostFlushCb(effects);
                    suspense.effects = [];
                    if (isSuspensible) {
                        if (parentSuspense && parentSuspense.pendingBranch && parentSuspenseId === parentSuspense.pendingId) {
                            parentSuspense.deps--;
                            if (0 === parentSuspense.deps && !sync) parentSuspense.resolve();
                        }
                    }
                    triggerEvent(vnode2, "onResolve");
                },
                fallback (fallbackVNode) {
                    if (!suspense.pendingBranch) return;
                    const { vnode: vnode2, activeBranch, parentComponent: parentComponent2, container: container2, namespace: namespace2 } = suspense;
                    triggerEvent(vnode2, "onFallback");
                    const anchor2 = next(activeBranch);
                    const mountFallback = ()=>{
                        if (!suspense.isInFallback) return;
                        patch(null, fallbackVNode, container2, anchor2, parentComponent2, null, namespace2, slotScopeIds, optimized);
                        setActiveBranch(suspense, fallbackVNode);
                    };
                    const delayEnter = fallbackVNode.transition && "out-in" === fallbackVNode.transition.mode;
                    if (delayEnter) activeBranch.transition.afterLeave = mountFallback;
                    suspense.isInFallback = true;
                    unmount(activeBranch, parentComponent2, null, true);
                    if (!delayEnter) mountFallback();
                },
                move (container2, anchor2, type) {
                    suspense.activeBranch && move(suspense.activeBranch, container2, anchor2, type);
                    suspense.container = container2;
                },
                next () {
                    return suspense.activeBranch && next(suspense.activeBranch);
                },
                registerDep (instance, setupRenderEffect, optimized2) {
                    const isInPendingSuspense = !!suspense.pendingBranch;
                    if (isInPendingSuspense) suspense.deps++;
                    const hydratedEl = instance.vnode.el;
                    instance.asyncDep.catch((err)=>{
                        handleError(err, instance, 0);
                    }).then((asyncSetupResult)=>{
                        if (instance.isUnmounted || suspense.isUnmounted || suspense.pendingId !== instance.suspenseId) return;
                        instance.asyncResolved = true;
                        const { vnode: vnode2 } = instance;
                        handleSetupResult(instance, asyncSetupResult, false);
                        if (hydratedEl) vnode2.el = hydratedEl;
                        const placeholder = !hydratedEl && instance.subTree.el;
                        setupRenderEffect(instance, vnode2, parentNode(hydratedEl || instance.subTree.el), hydratedEl ? null : next(instance.subTree), suspense, namespace, optimized2);
                        if (placeholder) remove(placeholder);
                        updateHOCHostEl(instance, vnode2.el);
                        if (isInPendingSuspense && 0 === --suspense.deps) suspense.resolve();
                    });
                },
                unmount (parentSuspense2, doRemove) {
                    suspense.isUnmounted = true;
                    if (suspense.activeBranch) unmount(suspense.activeBranch, parentComponent, parentSuspense2, doRemove);
                    if (suspense.pendingBranch) unmount(suspense.pendingBranch, parentComponent, parentSuspense2, doRemove);
                }
            };
            return suspense;
        }
        function hydrateSuspense(node, vnode, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals, hydrateNode) {
            const suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, node.parentNode, document.createElement("div"), null, namespace, slotScopeIds, optimized, rendererInternals, true);
            const result = hydrateNode(node, suspense.pendingBranch = vnode.ssContent, parentComponent, suspense, slotScopeIds, optimized);
            if (0 === suspense.deps) suspense.resolve(false, true);
            return result;
        }
        function normalizeSuspenseChildren(vnode) {
            const { shapeFlag, children } = vnode;
            const isSlotChildren = 32 & shapeFlag;
            vnode.ssContent = normalizeSuspenseSlot(isSlotChildren ? children.default : children);
            vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment);
        }
        function normalizeSuspenseSlot(s) {
            let block;
            if (isFunction(s)) {
                const trackBlock = isBlockTreeEnabled && s._c;
                if (trackBlock) {
                    s._d = false;
                    openBlock();
                }
                s = s();
                if (trackBlock) {
                    s._d = true;
                    block = currentBlock;
                    closeBlock();
                }
            }
            if (isArray(s)) {
                const singleChild = filterSingleRoot(s);
                s = singleChild;
            }
            s = normalizeVNode(s);
            if (block && !s.dynamicChildren) s.dynamicChildren = block.filter((c)=>c !== s);
            return s;
        }
        function queueEffectWithSuspense(fn, suspense) {
            if (suspense && suspense.pendingBranch) {
                if (shared_esm_bundler_isArray(fn)) suspense.effects.push(...fn);
                else suspense.effects.push(fn);
            } else runtime_core_esm_bundler_queuePostFlushCb(fn);
        }
        function setActiveBranch(suspense, branch) {
            suspense.activeBranch = branch;
            const { vnode, parentComponent } = suspense;
            let el = branch.el;
            while(!el && branch.component){
                branch = branch.component.subTree;
                el = branch.el;
            }
            vnode.el = el;
            if (parentComponent && parentComponent.subTree === vnode) {
                parentComponent.vnode.el = el;
                updateHOCHostEl(parentComponent, el);
            }
        }
        function isVNodeSuspensible(vnode) {
            const suspensible = vnode.props && vnode.props.suspensible;
            return null != suspensible && false !== suspensible;
        }
        const runtime_core_esm_bundler_Fragment = Symbol.for("v-fgt");
        const Text = Symbol.for("v-txt");
        const Comment = Symbol.for("v-cmt");
        const runtime_core_esm_bundler_Static = Symbol.for("v-stc");
        const blockStack = [];
        let currentBlock = null;
        function openBlock(disableTracking = false) {
            blockStack.push(currentBlock = disableTracking ? null : []);
        }
        function closeBlock() {
            blockStack.pop();
            currentBlock = blockStack[blockStack.length - 1] || null;
        }
        let isBlockTreeEnabled = 1;
        function setBlockTracking(value, inVOnce = false) {
            isBlockTreeEnabled += value;
            if (value < 0 && currentBlock && inVOnce) currentBlock.hasOnce = true;
        }
        function setupBlock(vnode) {
            vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
            closeBlock();
            if (isBlockTreeEnabled > 0 && currentBlock) currentBlock.push(vnode);
            return vnode;
        }
        function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
            return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
        }
        function createBlock(type, props, children, patchFlag, dynamicProps) {
            return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
        }
        function isVNode(value) {
            return !!value && true === value.__v_isVNode;
        }
        function isSameVNodeType(n1, n2) {
            return n1.type === n2.type && n1.key === n2.key;
        }
        let vnodeArgsTransformer;
        function transformVNodeArgs(transformer) {
            vnodeArgsTransformer = transformer;
        }
        const createVNodeWithArgsTransform = (...args)=>_createVNode(...vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args);
        const normalizeKey = ({ key })=>null != key ? key : null;
        const normalizeRef = ({ ref: ref1, ref_key, ref_for })=>{
            if ("number" == typeof ref1) ref1 = "" + ref1;
            return null != ref1 ? shared_esm_bundler_isString(ref1) || reactivity_esm_bundler_isRef(ref1) || shared_esm_bundler_isFunction(ref1) ? {
                i: currentRenderingInstance,
                r: ref1,
                k: ref_key,
                f: !!ref_for
            } : ref1 : null;
        };
        function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === runtime_core_esm_bundler_Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
            const vnode = {
                __v_isVNode: true,
                __v_skip: true,
                type,
                props,
                key: props && normalizeKey(props),
                ref: props && normalizeRef(props),
                scopeId: currentScopeId,
                slotScopeIds: null,
                children,
                component: null,
                suspense: null,
                ssContent: null,
                ssFallback: null,
                dirs: null,
                transition: null,
                el: null,
                anchor: null,
                target: null,
                targetStart: null,
                targetAnchor: null,
                staticCount: 0,
                shapeFlag,
                patchFlag,
                dynamicProps,
                dynamicChildren: null,
                appContext: null,
                ctx: currentRenderingInstance
            };
            if (needFullChildrenNormalization) {
                normalizeChildren(vnode, children);
                if (128 & shapeFlag) type.normalize(vnode);
            } else if (children) vnode.shapeFlag |= shared_esm_bundler_isString(children) ? 8 : 16;
            if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || 6 & shapeFlag) && 32 !== vnode.patchFlag) currentBlock.push(vnode);
            return vnode;
        }
        const createVNode = _createVNode;
        function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
            if (!type || type === NULL_DYNAMIC_COMPONENT) type = Comment;
            if (isVNode(type)) {
                const cloned = cloneVNode(type, props, true);
                if (children) normalizeChildren(cloned, children);
                if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
                    if (6 & cloned.shapeFlag) currentBlock[currentBlock.indexOf(type)] = cloned;
                    else currentBlock.push(cloned);
                }
                cloned.patchFlag = -2;
                return cloned;
            }
            if (isClassComponent(type)) type = type.__vccOpts;
            if (props) {
                props = guardReactiveProps(props);
                let { class: klass, style } = props;
                if (klass && !shared_esm_bundler_isString(klass)) props.class = shared_esm_bundler_normalizeClass(klass);
                if (shared_esm_bundler_isObject(style)) {
                    if (isProxy(style) && !shared_esm_bundler_isArray(style)) style = shared_esm_bundler_extend({}, style);
                    props.style = shared_esm_bundler_normalizeStyle(style);
                }
            }
            const shapeFlag = shared_esm_bundler_isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : shared_esm_bundler_isObject(type) ? 4 : shared_esm_bundler_isFunction(type) ? 2 : 0;
            return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
        }
        function guardReactiveProps(props) {
            if (!props) return null;
            return isProxy(props) || isInternalObject(props) ? shared_esm_bundler_extend({}, props) : props;
        }
        function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
            const { props, ref: ref1, patchFlag, children, transition } = vnode;
            const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
            const cloned = {
                __v_isVNode: true,
                __v_skip: true,
                type: vnode.type,
                props: mergedProps,
                key: mergedProps && normalizeKey(mergedProps),
                ref: extraProps && extraProps.ref ? mergeRef && ref1 ? shared_esm_bundler_isArray(ref1) ? ref1.concat(normalizeRef(extraProps)) : [
                    ref1,
                    normalizeRef(extraProps)
                ] : normalizeRef(extraProps) : ref1,
                scopeId: vnode.scopeId,
                slotScopeIds: vnode.slotScopeIds,
                children: children,
                target: vnode.target,
                targetStart: vnode.targetStart,
                targetAnchor: vnode.targetAnchor,
                staticCount: vnode.staticCount,
                shapeFlag: vnode.shapeFlag,
                patchFlag: extraProps && vnode.type !== runtime_core_esm_bundler_Fragment ? -1 === patchFlag ? 16 : 16 | patchFlag : patchFlag,
                dynamicProps: vnode.dynamicProps,
                dynamicChildren: vnode.dynamicChildren,
                appContext: vnode.appContext,
                dirs: vnode.dirs,
                transition,
                component: vnode.component,
                suspense: vnode.suspense,
                ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
                ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
                el: vnode.el,
                anchor: vnode.anchor,
                ctx: vnode.ctx,
                ce: vnode.ce
            };
            if (transition && cloneTransition) setTransitionHooks(cloned, transition.clone(cloned));
            return cloned;
        }
        function deepCloneVNode(vnode) {
            const cloned = cloneVNode(vnode);
            if (isArray(vnode.children)) cloned.children = vnode.children.map(deepCloneVNode);
            return cloned;
        }
        function createTextVNode(text = " ", flag = 0) {
            return createVNode(Text, null, text, flag);
        }
        function createStaticVNode(content, numberOfNodes) {
            const vnode = createVNode(runtime_core_esm_bundler_Static, null, content);
            vnode.staticCount = numberOfNodes;
            return vnode;
        }
        function createCommentVNode(text = "", asBlock = false) {
            return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
        }
        function normalizeVNode(child) {
            if (null == child || "boolean" == typeof child) return createVNode(Comment);
            if (shared_esm_bundler_isArray(child)) return createVNode(runtime_core_esm_bundler_Fragment, null, child.slice());
            if (isVNode(child)) return cloneIfMounted(child);
            else return createVNode(Text, null, String(child));
        }
        function cloneIfMounted(child) {
            return null === child.el && -1 !== child.patchFlag || child.memo ? child : cloneVNode(child);
        }
        function normalizeChildren(vnode, children) {
            let type = 0;
            const { shapeFlag } = vnode;
            if (null == children) children = null;
            else if (shared_esm_bundler_isArray(children)) type = 16;
            else if ("object" == typeof children) {
                if (65 & shapeFlag) {
                    const slot = children.default;
                    if (slot) {
                        slot._c && (slot._d = false);
                        normalizeChildren(vnode, slot());
                        slot._c && (slot._d = true);
                    }
                    return;
                }
                {
                    type = 32;
                    const slotFlag = children._;
                    if (slotFlag || isInternalObject(children)) {
                        if (3 === slotFlag && currentRenderingInstance) {
                            if (1 === currentRenderingInstance.slots._) children._ = 1;
                            else {
                                children._ = 2;
                                vnode.patchFlag |= 1024;
                            }
                        }
                    } else children._ctx = currentRenderingInstance;
                }
            } else if (shared_esm_bundler_isFunction(children)) {
                children = {
                    default: children,
                    _ctx: currentRenderingInstance
                };
                type = 32;
            } else {
                children = String(children);
                if (64 & shapeFlag) {
                    type = 16;
                    children = [
                        createTextVNode(children)
                    ];
                } else type = 8;
            }
            vnode.children = children;
            vnode.shapeFlag |= type;
        }
        function mergeProps(...args) {
            const ret = {};
            for(let i = 0; i < args.length; i++){
                const toMerge = args[i];
                for(const key in toMerge)if ("class" === key) {
                    if (ret.class !== toMerge.class) ret.class = shared_esm_bundler_normalizeClass([
                        ret.class,
                        toMerge.class
                    ]);
                } else if ("style" === key) ret.style = shared_esm_bundler_normalizeStyle([
                    ret.style,
                    toMerge.style
                ]);
                else if (shared_esm_bundler_isOn(key)) {
                    const existing = ret[key];
                    const incoming = toMerge[key];
                    if (incoming && existing !== incoming && !(shared_esm_bundler_isArray(existing) && existing.includes(incoming))) ret[key] = existing ? [].concat(existing, incoming) : incoming;
                } else if ("" !== key) ret[key] = toMerge[key];
            }
            return ret;
        }
        function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
            callWithAsyncErrorHandling(hook, instance, 7, [
                vnode,
                prevVNode
            ]);
        }
        const emptyAppContext = createAppContext();
        let uid = 0;
        function createComponentInstance(vnode, parent, suspense) {
            const type = vnode.type;
            const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
            const instance = {
                uid: uid++,
                vnode,
                type,
                parent,
                appContext,
                root: null,
                next: null,
                subTree: null,
                effect: null,
                update: null,
                job: null,
                scope: new EffectScope(true),
                render: null,
                proxy: null,
                exposed: null,
                exposeProxy: null,
                withProxy: null,
                provides: parent ? parent.provides : Object.create(appContext.provides),
                ids: parent ? parent.ids : [
                    "",
                    0,
                    0
                ],
                accessCache: null,
                renderCache: [],
                components: null,
                directives: null,
                propsOptions: normalizePropsOptions(type, appContext),
                emitsOptions: normalizeEmitsOptions(type, appContext),
                emit: null,
                emitted: null,
                propsDefaults: shared_esm_bundler_EMPTY_OBJ,
                inheritAttrs: type.inheritAttrs,
                ctx: shared_esm_bundler_EMPTY_OBJ,
                data: shared_esm_bundler_EMPTY_OBJ,
                props: shared_esm_bundler_EMPTY_OBJ,
                attrs: shared_esm_bundler_EMPTY_OBJ,
                slots: shared_esm_bundler_EMPTY_OBJ,
                refs: shared_esm_bundler_EMPTY_OBJ,
                setupState: shared_esm_bundler_EMPTY_OBJ,
                setupContext: null,
                suspense,
                suspenseId: suspense ? suspense.pendingId : 0,
                asyncDep: null,
                asyncResolved: false,
                isMounted: false,
                isUnmounted: false,
                isDeactivated: false,
                bc: null,
                c: null,
                bm: null,
                m: null,
                bu: null,
                u: null,
                um: null,
                bum: null,
                da: null,
                a: null,
                rtg: null,
                rtc: null,
                ec: null,
                sp: null
            };
            instance.ctx = {
                _: instance
            };
            instance.root = parent ? parent.root : instance;
            instance.emit = runtime_core_esm_bundler_emit.bind(null, instance);
            if (vnode.ce) vnode.ce(instance);
            return instance;
        }
        let currentInstance = null;
        const runtime_core_esm_bundler_getCurrentInstance = ()=>currentInstance || currentRenderingInstance;
        let internalSetCurrentInstance;
        let setInSSRSetupState;
        {
            const g = getGlobalThis();
            const registerGlobalSetter = (key, setter)=>{
                let setters;
                if (!(setters = g[key])) setters = g[key] = [];
                setters.push(setter);
                return (v1)=>{
                    if (setters.length > 1) setters.forEach((set)=>set(v1));
                    else setters[0](v1);
                };
            };
            internalSetCurrentInstance = registerGlobalSetter("__VUE_INSTANCE_SETTERS__", (v1)=>currentInstance = v1);
            setInSSRSetupState = registerGlobalSetter("__VUE_SSR_SETTERS__", (v1)=>isInSSRComponentSetup = v1);
        }
        const setCurrentInstance = (instance)=>{
            const prev = currentInstance;
            internalSetCurrentInstance(instance);
            instance.scope.on();
            return ()=>{
                instance.scope.off();
                internalSetCurrentInstance(prev);
            };
        };
        const unsetCurrentInstance = ()=>{
            currentInstance && currentInstance.scope.off();
            internalSetCurrentInstance(null);
        };
        const isBuiltInTag = /* @__PURE__ */ null;
        function validateComponentName(name1, { isNativeTag }) {
            if (isBuiltInTag(name1) || isNativeTag(name1)) warn$1("Do not use built-in or reserved HTML elements as component id: " + name1);
        }
        function isStatefulComponent(instance) {
            return 4 & instance.vnode.shapeFlag;
        }
        let isInSSRComponentSetup = false;
        function setupComponent(instance, isSSR = false, optimized = false) {
            isSSR && setInSSRSetupState(isSSR);
            const { props, children } = instance.vnode;
            const isStateful = isStatefulComponent(instance);
            initProps(instance, props, isStateful, isSSR);
            initSlots(instance, children, optimized);
            const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
            isSSR && setInSSRSetupState(false);
            return setupResult;
        }
        function setupStatefulComponent(instance, isSSR) {
            const Component = instance.type;
            instance.accessCache = /* @__PURE__ */ Object.create(null);
            instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
            const { setup } = Component;
            if (setup) {
                reactivity_esm_bundler_pauseTracking();
                const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
                const reset = setCurrentInstance(instance);
                const setupResult = callWithErrorHandling(setup, instance, 0, [
                    instance.props,
                    setupContext
                ]);
                const isAsyncSetup = shared_esm_bundler_isPromise(setupResult);
                reactivity_esm_bundler_resetTracking();
                reset();
                if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) markAsyncBoundary(instance);
                if (isAsyncSetup) {
                    setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
                    if (isSSR) return setupResult.then((resolvedResult)=>{
                        handleSetupResult(instance, resolvedResult, isSSR);
                    }).catch((e)=>{
                        handleError(e, instance, 0);
                    });
                    instance.asyncDep = setupResult;
                } else handleSetupResult(instance, setupResult, isSSR);
            } else finishComponentSetup(instance, isSSR);
        }
        function handleSetupResult(instance, setupResult, isSSR) {
            if (shared_esm_bundler_isFunction(setupResult)) {
                if (instance.type.__ssrInlineRender) instance.ssrRender = setupResult;
                else instance.render = setupResult;
            } else if (shared_esm_bundler_isObject(setupResult)) instance.setupState = proxyRefs(setupResult);
            finishComponentSetup(instance, isSSR);
        }
        let compile;
        let installWithProxy;
        function registerRuntimeCompiler(_compile) {
            compile = _compile;
            installWithProxy = (i)=>{
                if (i.render._rc) i.withProxy = new Proxy(i.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
            };
        }
        const runtime_core_esm_bundler_isRuntimeOnly = ()=>!compile;
        function finishComponentSetup(instance, isSSR, skipOptions) {
            const Component = instance.type;
            if (!instance.render) {
                if (!isSSR && compile && !Component.render) {
                    const template = Component.template || resolveMergedOptions(instance).template;
                    if (template) {
                        const { isCustomElement, compilerOptions } = instance.appContext.config;
                        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
                        const finalCompilerOptions = shared_esm_bundler_extend(shared_esm_bundler_extend({
                            isCustomElement,
                            delimiters
                        }, compilerOptions), componentCompilerOptions);
                        Component.render = compile(template, finalCompilerOptions);
                    }
                }
                instance.render = Component.render || shared_esm_bundler_NOOP;
                if (installWithProxy) installWithProxy(instance);
            }
            {
                const reset = setCurrentInstance(instance);
                reactivity_esm_bundler_pauseTracking();
                try {
                    applyOptions(instance);
                } finally{
                    reactivity_esm_bundler_resetTracking();
                    reset();
                }
            }
        }
        const attrsProxyHandlers = {
            get (target, key) {
                reactivity_esm_bundler_track(target, "get", "");
                return target[key];
            }
        };
        function getSlotsProxy(instance) {
            return new Proxy(instance.slots, {
                get (target, key) {
                    track(instance, "get", "$slots");
                    return target[key];
                }
            });
        }
        function createSetupContext(instance) {
            const expose = (exposed)=>{
                instance.exposed = exposed || {};
            };
            return {
                attrs: new Proxy(instance.attrs, attrsProxyHandlers),
                slots: instance.slots,
                emit: instance.emit,
                expose
            };
        }
        function getComponentPublicInstance(instance) {
            if (instance.exposed) return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
                get (target, key) {
                    if (key in target) return target[key];
                    if (key in publicPropertiesMap) return publicPropertiesMap[key](instance);
                },
                has (target, key) {
                    return key in target || key in publicPropertiesMap;
                }
            }));
            return instance.proxy;
        }
        const classifyRE = /(?:^|[-_])(\w)/g;
        const classify = (str)=>str.replace(classifyRE, (c)=>c.toUpperCase()).replace(/[-_]/g, "");
        function getComponentName(Component, includeInferred = true) {
            return shared_esm_bundler_isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
        }
        function formatComponentName(instance, Component, isRoot = false) {
            let name1 = getComponentName(Component);
            if (!name1 && Component.__file) {
                const match = Component.__file.match(/([^/\\]+)\.\w+$/);
                if (match) name1 = match[1];
            }
            if (!name1 && instance && instance.parent) {
                const inferFromRegistry = (registry)=>{
                    for(const key in registry)if (registry[key] === Component) return key;
                };
                name1 = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
            }
            return name1 ? classify(name1) : isRoot ? "App" : "Anonymous";
        }
        function isClassComponent(value) {
            return shared_esm_bundler_isFunction(value) && "__vccOpts" in value;
        }
        const runtime_core_esm_bundler_computed = (getterOrOptions, debugOptions)=>{
            const c = reactivity_esm_bundler_computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
            return c;
        };
        function runtime_core_esm_bundler_h(type, propsOrChildren, children) {
            const l = arguments.length;
            if (2 === l) {
                if (!shared_esm_bundler_isObject(propsOrChildren) || !!shared_esm_bundler_isArray(propsOrChildren)) return createVNode(type, null, propsOrChildren);
                if (isVNode(propsOrChildren)) return createVNode(type, null, [
                    propsOrChildren
                ]);
                return createVNode(type, propsOrChildren);
            }
            if (l > 3) children = Array.prototype.slice.call(arguments, 2);
            else if (3 === l && isVNode(children)) children = [
                children
            ];
            return createVNode(type, propsOrChildren, children);
        }
        function runtime_core_esm_bundler_initCustomFormatter() {
            function createInstanceBlock(type, target) {
                target = extend({}, target);
                if (!Object.keys(target).length) return [
                    "span",
                    {}
                ];
                return [
                    "div",
                    {
                        style: "line-height:1.25em;margin-bottom:0.6em"
                    },
                    [
                        "div",
                        {
                            style: "color:#476582"
                        },
                        type
                    ],
                    [
                        "div",
                        {
                            style: "padding-left:1.25em"
                        },
                        ...Object.keys(target).map((key)=>[
                                "div",
                                {},
                                [
                                    "span",
                                    keywordStyle,
                                    key + ": "
                                ],
                                formatValue(target[key], false)
                            ])
                    ]
                ];
            }
            function formatValue(v1, asRaw = true) {
                if ("number" == typeof v1) return [
                    "span",
                    numberStyle,
                    v1
                ];
                if ("string" == typeof v1) return [
                    "span",
                    stringStyle,
                    JSON.stringify(v1)
                ];
                if ("boolean" == typeof v1) return [
                    "span",
                    keywordStyle,
                    v1
                ];
                else if (isObject(v1)) return [
                    "object",
                    {
                        object: asRaw ? toRaw(v1) : v1
                    }
                ];
                else return [
                    "span",
                    stringStyle,
                    String(v1)
                ];
            }
            function extractKeys(instance, type) {
                const Comp = instance.type;
                if (isFunction(Comp)) return;
                const extracted = {};
                for(const key in instance.ctx)if (isKeyOfType(Comp, key, type)) extracted[key] = instance.ctx[key];
                return extracted;
            }
            function isKeyOfType(Comp, key, type) {
                const opts = Comp[type];
                if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) return true;
                if (Comp.extends && isKeyOfType(Comp.extends, key, type)) return true;
                if (Comp.mixins && Comp.mixins.some((m)=>isKeyOfType(m, key, type))) return true;
            }
        }
        function withMemo(memo, render, cache, index) {
            const cached = cache[index];
            if (cached && isMemoSame(cached, memo)) return cached;
            const ret = render();
            ret.memo = memo.slice();
            ret.cacheIndex = index;
            return cache[index] = ret;
        }
        function isMemoSame(cached, memo) {
            const prev = cached.memo;
            if (prev.length != memo.length) return false;
            for(let i = 0; i < prev.length; i++)if (hasChanged(prev[i], memo[i])) return false;
            if (isBlockTreeEnabled > 0 && currentBlock) currentBlock.push(cached);
            return true;
        }
        const runtime_core_esm_bundler_version = "3.5.13";
        const runtime_core_esm_bundler_warn = shared_esm_bundler_NOOP;
        const ErrorTypeStrings = null;
        const devtools = devtools$1;
        const setDevtoolsHook = setDevtoolsHook$1;
        const _ssrUtils = null;
        const ssrUtils = null;
        const resolveFilter = null;
        const compatUtils = null;
        const DeprecationTypes = null;
        /**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/ let policy;
        const tt = "undefined" != typeof window && window.trustedTypes;
        if (tt) try {
            policy = /* @__PURE__ */ tt.createPolicy("vue", {
                createHTML: (val)=>val
            });
        } catch (e) {}
        const unsafeToTrustedHTML = policy ? (val)=>policy.createHTML(val) : (val)=>val;
        const svgNS = "http://www.w3.org/2000/svg";
        const mathmlNS = "http://www.w3.org/1998/Math/MathML";
        const doc = "undefined" != typeof document ? document : null;
        const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
        const nodeOps = {
            insert: (child, parent, anchor)=>{
                parent.insertBefore(child, anchor || null);
            },
            remove: (child)=>{
                const parent = child.parentNode;
                if (parent) parent.removeChild(child);
            },
            createElement: (tag, namespace, is, props)=>{
                const el = "svg" === namespace ? doc.createElementNS(svgNS, tag) : "mathml" === namespace ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, {
                    is
                }) : doc.createElement(tag);
                if ("select" === tag && props && null != props.multiple) el.setAttribute("multiple", props.multiple);
                return el;
            },
            createText: (text)=>doc.createTextNode(text),
            createComment: (text)=>doc.createComment(text),
            setText: (node, text)=>{
                node.nodeValue = text;
            },
            setElementText: (el, text)=>{
                el.textContent = text;
            },
            parentNode: (node)=>node.parentNode,
            nextSibling: (node)=>node.nextSibling,
            querySelector: (selector)=>doc.querySelector(selector),
            setScopeId (el, id) {
                el.setAttribute(id, "");
            },
            insertStaticContent (content, parent, anchor, namespace, start, end) {
                const before = anchor ? anchor.previousSibling : parent.lastChild;
                if (start && (start === end || start.nextSibling)) while(true){
                    parent.insertBefore(start.cloneNode(true), anchor);
                    if (start === end || !(start = start.nextSibling)) break;
                }
                else {
                    templateContainer.innerHTML = unsafeToTrustedHTML("svg" === namespace ? `<svg>${content}</svg>` : "mathml" === namespace ? `<math>${content}</math>` : content);
                    const template = templateContainer.content;
                    if ("svg" === namespace || "mathml" === namespace) {
                        const wrapper = template.firstChild;
                        while(wrapper.firstChild)template.appendChild(wrapper.firstChild);
                        template.removeChild(wrapper);
                    }
                    parent.insertBefore(template, anchor);
                }
                return [
                    before ? before.nextSibling : parent.firstChild,
                    anchor ? anchor.previousSibling : parent.lastChild
                ];
            }
        };
        const TRANSITION = "transition";
        const ANIMATION = "animation";
        const vtcKey = Symbol("_vtc");
        const DOMTransitionPropsValidators = {
            name: String,
            type: String,
            css: {
                type: Boolean,
                default: true
            },
            duration: [
                String,
                Number,
                Object
            ],
            enterFromClass: String,
            enterActiveClass: String,
            enterToClass: String,
            appearFromClass: String,
            appearActiveClass: String,
            appearToClass: String,
            leaveFromClass: String,
            leaveActiveClass: String,
            leaveToClass: String
        };
        const TransitionPropsValidators = /* @__PURE__ */ shared_esm_bundler_extend({}, BaseTransitionPropsValidators, DOMTransitionPropsValidators);
        const decorate$1 = (t)=>{
            t.displayName = "Transition";
            t.props = TransitionPropsValidators;
            return t;
        };
        const Transition = /* @__PURE__ */ null;
        const runtime_dom_esm_bundler_callHook = (hook, args = [])=>{
            if (shared_esm_bundler_isArray(hook)) hook.forEach((h2)=>h2(...args));
            else if (hook) hook(...args);
        };
        const hasExplicitCallback = (hook)=>!!hook && (shared_esm_bundler_isArray(hook) ? hook.some((h2)=>h2.length > 1) : hook.length > 1);
        function resolveTransitionProps(rawProps) {
            const baseProps = {};
            for(const key in rawProps)if (!(key in DOMTransitionPropsValidators)) baseProps[key] = rawProps[key];
            if (false === rawProps.css) return baseProps;
            const { name: name1 = "v", type, duration, enterFromClass = `${name1}-enter-from`, enterActiveClass = `${name1}-enter-active`, enterToClass = `${name1}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name1}-leave-from`, leaveActiveClass = `${name1}-leave-active`, leaveToClass = `${name1}-leave-to` } = rawProps;
            const durations = normalizeDuration(duration);
            const enterDuration = durations && durations[0];
            const leaveDuration = durations && durations[1];
            const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
            const finishEnter = (el, isAppear, done, isCancelled)=>{
                el._enterCancelled = isCancelled;
                removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
                removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
                done && done();
            };
            const finishLeave = (el, done)=>{
                el._isLeaving = false;
                removeTransitionClass(el, leaveFromClass);
                removeTransitionClass(el, leaveToClass);
                removeTransitionClass(el, leaveActiveClass);
                done && done();
            };
            const makeEnterHook = (isAppear)=>(el, done)=>{
                    const hook = isAppear ? onAppear : onEnter;
                    const resolve = ()=>finishEnter(el, isAppear, done);
                    runtime_dom_esm_bundler_callHook(hook, [
                        el,
                        resolve
                    ]);
                    nextFrame(()=>{
                        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
                        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
                        if (!hasExplicitCallback(hook)) whenTransitionEnds(el, type, enterDuration, resolve);
                    });
                };
            return shared_esm_bundler_extend(baseProps, {
                onBeforeEnter (el) {
                    runtime_dom_esm_bundler_callHook(onBeforeEnter, [
                        el
                    ]);
                    addTransitionClass(el, enterFromClass);
                    addTransitionClass(el, enterActiveClass);
                },
                onBeforeAppear (el) {
                    runtime_dom_esm_bundler_callHook(onBeforeAppear, [
                        el
                    ]);
                    addTransitionClass(el, appearFromClass);
                    addTransitionClass(el, appearActiveClass);
                },
                onEnter: makeEnterHook(false),
                onAppear: makeEnterHook(true),
                onLeave (el, done) {
                    el._isLeaving = true;
                    const resolve = ()=>finishLeave(el, done);
                    addTransitionClass(el, leaveFromClass);
                    if (el._enterCancelled) {
                        addTransitionClass(el, leaveActiveClass);
                        forceReflow();
                    } else {
                        forceReflow();
                        addTransitionClass(el, leaveActiveClass);
                    }
                    nextFrame(()=>{
                        if (!el._isLeaving) return;
                        removeTransitionClass(el, leaveFromClass);
                        addTransitionClass(el, leaveToClass);
                        if (!hasExplicitCallback(onLeave)) whenTransitionEnds(el, type, leaveDuration, resolve);
                    });
                    runtime_dom_esm_bundler_callHook(onLeave, [
                        el,
                        resolve
                    ]);
                },
                onEnterCancelled (el) {
                    finishEnter(el, false, void 0, true);
                    runtime_dom_esm_bundler_callHook(onEnterCancelled, [
                        el
                    ]);
                },
                onAppearCancelled (el) {
                    finishEnter(el, true, void 0, true);
                    runtime_dom_esm_bundler_callHook(onAppearCancelled, [
                        el
                    ]);
                },
                onLeaveCancelled (el) {
                    finishLeave(el);
                    runtime_dom_esm_bundler_callHook(onLeaveCancelled, [
                        el
                    ]);
                }
            });
        }
        function normalizeDuration(duration) {
            if (null == duration) return null;
            if (shared_esm_bundler_isObject(duration)) return [
                NumberOf(duration.enter),
                NumberOf(duration.leave)
            ];
            {
                const n = NumberOf(duration);
                return [
                    n,
                    n
                ];
            }
        }
        function NumberOf(val) {
            const res = shared_esm_bundler_toNumber(val);
            return res;
        }
        function addTransitionClass(el, cls) {
            cls.split(/\s+/).forEach((c)=>c && el.classList.add(c));
            (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
        }
        function removeTransitionClass(el, cls) {
            cls.split(/\s+/).forEach((c)=>c && el.classList.remove(c));
            const _vtc = el[vtcKey];
            if (_vtc) {
                _vtc.delete(cls);
                if (!_vtc.size) el[vtcKey] = void 0;
            }
        }
        function nextFrame(cb) {
            requestAnimationFrame(()=>{
                requestAnimationFrame(cb);
            });
        }
        let endId = 0;
        function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
            const id = el._endId = ++endId;
            const resolveIfNotStale = ()=>{
                if (id === el._endId) resolve();
            };
            if (null != explicitTimeout) return setTimeout(resolveIfNotStale, explicitTimeout);
            const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
            if (!type) return resolve();
            const endEvent = type + "end";
            let ended = 0;
            const end = ()=>{
                el.removeEventListener(endEvent, onEnd);
                resolveIfNotStale();
            };
            const onEnd = (e)=>{
                if (e.target === el && ++ended >= propCount) end();
            };
            setTimeout(()=>{
                if (ended < propCount) end();
            }, timeout + 1);
            el.addEventListener(endEvent, onEnd);
        }
        function getTransitionInfo(el, expectedType) {
            const styles = window.getComputedStyle(el);
            const getStyleProperties = (key)=>(styles[key] || "").split(", ");
            const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
            const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
            const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
            const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
            const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
            const animationTimeout = getTimeout(animationDelays, animationDurations);
            let type = null;
            let timeout = 0;
            let propCount = 0;
            if (expectedType === TRANSITION) {
                if (transitionTimeout > 0) {
                    type = TRANSITION;
                    timeout = transitionTimeout;
                    propCount = transitionDurations.length;
                }
            } else if (expectedType === ANIMATION) {
                if (animationTimeout > 0) {
                    type = ANIMATION;
                    timeout = animationTimeout;
                    propCount = animationDurations.length;
                }
            } else {
                timeout = Math.max(transitionTimeout, animationTimeout);
                type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
                propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
            }
            const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(getStyleProperties(`${TRANSITION}Property`).toString());
            return {
                type,
                timeout,
                propCount,
                hasTransform
            };
        }
        function getTimeout(delays, durations) {
            while(delays.length < durations.length)delays = delays.concat(delays);
            return Math.max(...durations.map((d, i)=>toMs(d) + toMs(delays[i])));
        }
        function toMs(s) {
            if ("auto" === s) return 0;
            return 1e3 * Number(s.slice(0, -1).replace(",", "."));
        }
        function forceReflow() {
            return document.body.offsetHeight;
        }
        function patchClass(el, value, isSVG) {
            const transitionClasses = el[vtcKey];
            if (transitionClasses) value = (value ? [
                value,
                ...transitionClasses
            ] : [
                ...transitionClasses
            ]).join(" ");
            if (null == value) el.removeAttribute("class");
            else if (isSVG) el.setAttribute("class", value);
            else el.className = value;
        }
        const vShowOriginalDisplay = Symbol("_vod");
        const vShowHidden = Symbol("_vsh");
        const vShow = null;
        function setDisplay(el, value) {
            el.style.display = value ? el[vShowOriginalDisplay] : "none";
            el[vShowHidden] = !value;
        }
        function initVShowForSSR() {
            vShow.getSSRProps = ({ value })=>{
                if (!value) return {
                    style: {
                        display: "none"
                    }
                };
            };
        }
        const CSS_VAR_TEXT = Symbol("");
        function useCssVars(getter) {
            const instance = getCurrentInstance();
            if (!instance) return;
            const updateTeleports = instance.ut = (vars = getter(instance.proxy))=>{
                Array.from(document.querySelectorAll(`[data-v-owner="${instance.uid}"]`)).forEach((node)=>setVarsOnNode(node, vars));
            };
            const setVars = ()=>{
                const vars = getter(instance.proxy);
                if (instance.ce) setVarsOnNode(instance.ce, vars);
                else setVarsOnVNode(instance.subTree, vars);
                updateTeleports(vars);
            };
            onBeforeUpdate(()=>{
                queuePostFlushCb(setVars);
            });
            onMounted(()=>{
                watch(setVars, NOOP, {
                    flush: "post"
                });
                const ob = new MutationObserver(setVars);
                ob.observe(instance.subTree.el.parentNode, {
                    childList: true
                });
                onUnmounted(()=>ob.disconnect());
            });
        }
        function setVarsOnVNode(vnode, vars) {
            if (128 & vnode.shapeFlag) {
                const suspense = vnode.suspense;
                vnode = suspense.activeBranch;
                if (suspense.pendingBranch && !suspense.isHydrating) suspense.effects.push(()=>{
                    setVarsOnVNode(suspense.activeBranch, vars);
                });
            }
            while(vnode.component)vnode = vnode.component.subTree;
            if (1 & vnode.shapeFlag && vnode.el) setVarsOnNode(vnode.el, vars);
            else if (vnode.type === Fragment) vnode.children.forEach((c)=>setVarsOnVNode(c, vars));
            else if (vnode.type === Static) {
                let { el, anchor } = vnode;
                while(el){
                    setVarsOnNode(el, vars);
                    if (el === anchor) break;
                    el = el.nextSibling;
                }
            }
        }
        function setVarsOnNode(el, vars) {
            if (1 === el.nodeType) {
                const style = el.style;
                let cssText = "";
                for(const key in vars){
                    style.setProperty(`--${key}`, vars[key]);
                    cssText += `--${key}: ${vars[key]};`;
                }
                style[CSS_VAR_TEXT] = cssText;
            }
        }
        const displayRE = /(^|;)\s*display\s*:/;
        function patchStyle(el, prev, next) {
            const style = el.style;
            const isCssString = shared_esm_bundler_isString(next);
            let hasControlledDisplay = false;
            if (next && !isCssString) {
                if (prev) {
                    if (shared_esm_bundler_isString(prev)) for (const prevStyle of prev.split(";")){
                        const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
                        if (null == next[key]) setStyle(style, key, "");
                    }
                    else for(const key in prev)if (null == next[key]) setStyle(style, key, "");
                }
                for(const key in next){
                    if ("display" === key) hasControlledDisplay = true;
                    setStyle(style, key, next[key]);
                }
            } else if (isCssString) {
                if (prev !== next) {
                    const cssVarText = style[CSS_VAR_TEXT];
                    if (cssVarText) next += ";" + cssVarText;
                    style.cssText = next;
                    hasControlledDisplay = displayRE.test(next);
                }
            } else if (prev) el.removeAttribute("style");
            if (vShowOriginalDisplay in el) {
                el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
                if (el[vShowHidden]) style.display = "none";
            }
        }
        const semicolonRE = /[^\\];\s*$/;
        const importantRE = /\s*!important$/;
        function setStyle(style, name1, val) {
            if (shared_esm_bundler_isArray(val)) val.forEach((v1)=>setStyle(style, name1, v1));
            else {
                if (null == val) val = "";
                if (name1.startsWith("--")) style.setProperty(name1, val);
                else {
                    const prefixed = autoPrefix(style, name1);
                    if (importantRE.test(val)) style.setProperty(shared_esm_bundler_hyphenate(prefixed), val.replace(importantRE, ""), "important");
                    else style[prefixed] = val;
                }
            }
        }
        const prefixes = [
            "Webkit",
            "Moz",
            "ms"
        ];
        const prefixCache = {};
        function autoPrefix(style, rawName) {
            const cached = prefixCache[rawName];
            if (cached) return cached;
            let name1 = shared_esm_bundler_camelize(rawName);
            if ("filter" !== name1 && name1 in style) return prefixCache[rawName] = name1;
            name1 = shared_esm_bundler_capitalize(name1);
            for(let i = 0; i < prefixes.length; i++){
                const prefixed = prefixes[i] + name1;
                if (prefixed in style) return prefixCache[rawName] = prefixed;
            }
            return rawName;
        }
        const xlinkNS = "http://www.w3.org/1999/xlink";
        function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
            if (isSVG && key.startsWith("xlink:")) {
                if (null == value) el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
                else el.setAttributeNS(xlinkNS, key, value);
            } else if (null == value || isBoolean && !shared_esm_bundler_includeBooleanAttr(value)) el.removeAttribute(key);
            else el.setAttribute(key, isBoolean ? "" : shared_esm_bundler_isSymbol(value) ? String(value) : value);
        }
        function patchDOMProp(el, key, value, parentComponent, attrName) {
            if ("innerHTML" === key || "textContent" === key) {
                if (null != value) el[key] = "innerHTML" === key ? unsafeToTrustedHTML(value) : value;
                return;
            }
            const tag = el.tagName;
            if ("value" === key && "PROGRESS" !== tag && !tag.includes("-")) {
                const oldValue = "OPTION" === tag ? el.getAttribute("value") || "" : el.value;
                const newValue = null == value ? "checkbox" === el.type ? "on" : "" : String(value);
                if (oldValue !== newValue || !("_value" in el)) el.value = newValue;
                if (null == value) el.removeAttribute(key);
                el._value = value;
                return;
            }
            let needRemove = false;
            if ("" === value || null == value) {
                const type = typeof el[key];
                if ("boolean" === type) value = shared_esm_bundler_includeBooleanAttr(value);
                else if (null == value && "string" === type) {
                    value = "";
                    needRemove = true;
                } else if ("number" === type) {
                    value = 0;
                    needRemove = true;
                }
            }
            try {
                el[key] = value;
            } catch (e) {}
            needRemove && el.removeAttribute(attrName || key);
        }
        function addEventListener(el, event, handler, options) {
            el.addEventListener(event, handler, options);
        }
        function removeEventListener(el, event, handler, options) {
            el.removeEventListener(event, handler, options);
        }
        const veiKey = Symbol("_vei");
        function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
            const invokers = el[veiKey] || (el[veiKey] = {});
            const existingInvoker = invokers[rawName];
            if (nextValue && existingInvoker) existingInvoker.value = nextValue;
            else {
                const [name1, options] = parseName(rawName);
                if (nextValue) {
                    const invoker = invokers[rawName] = createInvoker(nextValue, instance);
                    addEventListener(el, name1, invoker, options);
                } else if (existingInvoker) {
                    removeEventListener(el, name1, existingInvoker, options);
                    invokers[rawName] = void 0;
                }
            }
        }
        const optionsModifierRE = /(?:Once|Passive|Capture)$/;
        function parseName(name1) {
            let options;
            if (optionsModifierRE.test(name1)) {
                options = {};
                let m;
                while(m = name1.match(optionsModifierRE)){
                    name1 = name1.slice(0, name1.length - m[0].length);
                    options[m[0].toLowerCase()] = true;
                }
            }
            const event = ":" === name1[2] ? name1.slice(3) : shared_esm_bundler_hyphenate(name1.slice(2));
            return [
                event,
                options
            ];
        }
        let cachedNow = 0;
        const runtime_dom_esm_bundler_p = /* @__PURE__ */ Promise.resolve();
        const getNow = ()=>cachedNow || (runtime_dom_esm_bundler_p.then(()=>cachedNow = 0), cachedNow = Date.now());
        function createInvoker(initialValue, instance) {
            const invoker = (e)=>{
                if (e._vts) {
                    if (e._vts <= invoker.attached) return;
                } else e._vts = Date.now();
                callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [
                    e
                ]);
            };
            invoker.value = initialValue;
            invoker.attached = getNow();
            return invoker;
        }
        function sanitizeEventValue(value, propName) {
            if (isFunction(value) || isArray(value)) return value;
            warn(`Wrong type passed as event handler to ${propName} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof value}.`);
            return NOOP;
        }
        function patchStopImmediatePropagation(e, value) {
            if (!shared_esm_bundler_isArray(value)) return value;
            {
                const originalStop = e.stopImmediatePropagation;
                e.stopImmediatePropagation = ()=>{
                    originalStop.call(e);
                    e._stopped = true;
                };
                return value.map((fn)=>(e2)=>!e2._stopped && fn && fn(e2));
            }
        }
        const isNativeOn = (key)=>111 === key.charCodeAt(0) && 110 === key.charCodeAt(1) && key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
        const runtime_dom_esm_bundler_patchProp = (el, key, prevValue, nextValue, namespace, parentComponent)=>{
            const isSVG = "svg" === namespace;
            if ("class" === key) patchClass(el, nextValue, isSVG);
            else if ("style" === key) patchStyle(el, prevValue, nextValue);
            else if (shared_esm_bundler_isOn(key)) {
                if (!shared_esm_bundler_isModelListener(key)) patchEvent(el, key, prevValue, nextValue, parentComponent);
            } else if ("." === key[0] ? (key = key.slice(1), true) : "^" === key[0] ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
                patchDOMProp(el, key, nextValue);
                if (!el.tagName.includes("-") && ("value" === key || "checked" === key || "selected" === key)) patchAttr(el, key, nextValue, isSVG, parentComponent, "value" !== key);
            } else if (el._isVueCE && (/[A-Z]/.test(key) || !shared_esm_bundler_isString(nextValue))) patchDOMProp(el, shared_esm_bundler_camelize(key), nextValue, parentComponent, key);
            else {
                if ("true-value" === key) el._trueValue = nextValue;
                else if ("false-value" === key) el._falseValue = nextValue;
                patchAttr(el, key, nextValue, isSVG);
            }
        };
        function shouldSetAsProp(el, key, value, isSVG) {
            if (isSVG) {
                if ("innerHTML" === key || "textContent" === key) return true;
                if (key in el && isNativeOn(key) && shared_esm_bundler_isFunction(value)) return true;
                return false;
            }
            if ("spellcheck" === key || "draggable" === key || "translate" === key) return false;
            if ("form" === key) return false;
            if ("list" === key && "INPUT" === el.tagName) return false;
            if ("type" === key && "TEXTAREA" === el.tagName) return false;
            if ("width" === key || "height" === key) {
                const tag = el.tagName;
                if ("IMG" === tag || "VIDEO" === tag || "CANVAS" === tag || "SOURCE" === tag) return false;
            }
            if (isNativeOn(key) && shared_esm_bundler_isString(value)) return false;
            return key in el;
        }
        const REMOVAL = {};
        /*! #__NO_SIDE_EFFECTS__ */ function defineCustomElement(options, extraOptions, _createApp) {
            const Comp = defineComponent(options, extraOptions);
            if (isPlainObject(Comp)) extend(Comp, extraOptions);
            class VueCustomElement extends VueElement {
                constructor(initialProps){
                    super(Comp, initialProps, _createApp);
                }
            }
            VueCustomElement.def = Comp;
            return VueCustomElement;
        }
        /*! #__NO_SIDE_EFFECTS__ */ const defineSSRCustomElement = (options, extraOptions)=>/* @__PURE__ */ defineCustomElement(options, extraOptions, createSSRApp);
        const BaseClass = "undefined" != typeof HTMLElement ? HTMLElement : class {
        };
        class VueElement extends BaseClass {
            constructor(_def, _props = {}, _createApp = runtime_dom_esm_bundler_createApp){
                super();
                this._def = _def;
                this._props = _props;
                this._createApp = _createApp;
                this._isVueCE = true;
                this._instance = null;
                this._app = null;
                this._nonce = this._def.nonce;
                this._connected = false;
                this._resolved = false;
                this._numberProps = null;
                this._styleChildren = /* @__PURE__ */ new WeakSet();
                this._ob = null;
                if (this.shadowRoot && _createApp !== runtime_dom_esm_bundler_createApp) this._root = this.shadowRoot;
                else if (false !== _def.shadowRoot) {
                    this.attachShadow({
                        mode: "open"
                    });
                    this._root = this.shadowRoot;
                } else this._root = this;
                if (!this._def.__asyncLoader) this._resolveProps(this._def);
            }
            connectedCallback() {
                if (!this.isConnected) return;
                if (!this.shadowRoot) this._parseSlots();
                this._connected = true;
                let parent = this;
                while(parent = parent && (parent.parentNode || parent.host))if (parent instanceof VueElement) {
                    this._parent = parent;
                    break;
                }
                if (!this._instance) {
                    if (this._resolved) {
                        this._setParent();
                        this._update();
                    } else if (parent && parent._pendingResolve) this._pendingResolve = parent._pendingResolve.then(()=>{
                        this._pendingResolve = void 0;
                        this._resolveDef();
                    });
                    else this._resolveDef();
                }
            }
            _setParent(parent = this._parent) {
                if (parent) {
                    this._instance.parent = parent._instance;
                    this._instance.provides = parent._instance.provides;
                }
            }
            disconnectedCallback() {
                this._connected = false;
                runtime_core_esm_bundler_nextTick(()=>{
                    if (!this._connected) {
                        if (this._ob) {
                            this._ob.disconnect();
                            this._ob = null;
                        }
                        this._app && this._app.unmount();
                        if (this._instance) this._instance.ce = void 0;
                        this._app = this._instance = null;
                    }
                });
            }
            _resolveDef() {
                if (this._pendingResolve) return;
                for(let i = 0; i < this.attributes.length; i++)this._setAttr(this.attributes[i].name);
                this._ob = new MutationObserver((mutations)=>{
                    for (const m of mutations)this._setAttr(m.attributeName);
                });
                this._ob.observe(this, {
                    attributes: true
                });
                const resolve = (def, isAsync = false)=>{
                    this._resolved = true;
                    this._pendingResolve = void 0;
                    const { props, styles } = def;
                    let numberProps;
                    if (props && !shared_esm_bundler_isArray(props)) for(const key in props){
                        const opt = props[key];
                        if (opt === Number || opt && opt.type === Number) {
                            if (key in this._props) this._props[key] = shared_esm_bundler_toNumber(this._props[key]);
                            (numberProps || (numberProps = /* @__PURE__ */ Object.create(null)))[shared_esm_bundler_camelize(key)] = true;
                        }
                    }
                    this._numberProps = numberProps;
                    if (isAsync) this._resolveProps(def);
                    if (this.shadowRoot) this._applyStyles(styles);
                    this._mount(def);
                };
                const asyncDef = this._def.__asyncLoader;
                if (asyncDef) this._pendingResolve = asyncDef().then((def)=>resolve(this._def = def, true));
                else resolve(this._def);
            }
            _mount(def) {
                this._app = this._createApp(def);
                if (def.configureApp) def.configureApp(this._app);
                this._app._ceVNode = this._createVNode();
                this._app.mount(this._root);
                const exposed = this._instance && this._instance.exposed;
                if (!exposed) return;
                for(const key in exposed)if (hasOwn(this, key)) ;
                else Object.defineProperty(this, key, {
                    get: ()=>unref(exposed[key])
                });
            }
            _resolveProps(def) {
                const { props } = def;
                const declaredPropKeys = shared_esm_bundler_isArray(props) ? props : Object.keys(props || {});
                for (const key of Object.keys(this))if ("_" !== key[0] && declaredPropKeys.includes(key)) this._setProp(key, this[key]);
                for (const key of declaredPropKeys.map(shared_esm_bundler_camelize))Object.defineProperty(this, key, {
                    get () {
                        return this._getProp(key);
                    },
                    set (val) {
                        this._setProp(key, val, true, true);
                    }
                });
            }
            _setAttr(key) {
                if (key.startsWith("data-v-")) return;
                const has = this.hasAttribute(key);
                let value = has ? this.getAttribute(key) : REMOVAL;
                const camelKey = shared_esm_bundler_camelize(key);
                if (has && this._numberProps && this._numberProps[camelKey]) value = shared_esm_bundler_toNumber(value);
                this._setProp(camelKey, value, false, true);
            }
            _getProp(key) {
                return this._props[key];
            }
            _setProp(key, val, shouldReflect = true, shouldUpdate = false) {
                if (val !== this._props[key]) {
                    if (val === REMOVAL) delete this._props[key];
                    else {
                        this._props[key] = val;
                        if ("key" === key && this._app) this._app._ceVNode.key = val;
                    }
                    if (shouldUpdate && this._instance) this._update();
                    if (shouldReflect) {
                        const ob = this._ob;
                        ob && ob.disconnect();
                        if (true === val) this.setAttribute(shared_esm_bundler_hyphenate(key), "");
                        else if ("string" == typeof val || "number" == typeof val) this.setAttribute(shared_esm_bundler_hyphenate(key), val + "");
                        else if (!val) this.removeAttribute(shared_esm_bundler_hyphenate(key));
                        ob && ob.observe(this, {
                            attributes: true
                        });
                    }
                }
            }
            _update() {
                runtime_dom_esm_bundler_render(this._createVNode(), this._root);
            }
            _createVNode() {
                const baseProps = {};
                if (!this.shadowRoot) baseProps.onVnodeMounted = baseProps.onVnodeUpdated = this._renderSlots.bind(this);
                const vnode = createVNode(this._def, shared_esm_bundler_extend(baseProps, this._props));
                if (!this._instance) vnode.ce = (instance)=>{
                    this._instance = instance;
                    instance.ce = this;
                    instance.isCE = true;
                    const dispatch = (event, args)=>{
                        this.dispatchEvent(new CustomEvent(event, shared_esm_bundler_isPlainObject(args[0]) ? shared_esm_bundler_extend({
                            detail: args
                        }, args[0]) : {
                            detail: args
                        }));
                    };
                    instance.emit = (event, ...args)=>{
                        dispatch(event, args);
                        if (shared_esm_bundler_hyphenate(event) !== event) dispatch(shared_esm_bundler_hyphenate(event), args);
                    };
                    this._setParent();
                };
                return vnode;
            }
            _applyStyles(styles, owner) {
                if (!styles) return;
                if (owner) {
                    if (owner === this._def || this._styleChildren.has(owner)) return;
                    this._styleChildren.add(owner);
                }
                const nonce = this._nonce;
                for(let i = styles.length - 1; i >= 0; i--){
                    const s = document.createElement("style");
                    if (nonce) s.setAttribute("nonce", nonce);
                    s.textContent = styles[i];
                    this.shadowRoot.prepend(s);
                }
            }
            _parseSlots() {
                const slots = this._slots = {};
                let n;
                while(n = this.firstChild){
                    const slotName = 1 === n.nodeType && n.getAttribute("slot") || "default";
                    (slots[slotName] || (slots[slotName] = [])).push(n);
                    this.removeChild(n);
                }
            }
            _renderSlots() {
                const outlets = (this._teleportTarget || this).querySelectorAll("slot");
                const scopeId = this._instance.type.__scopeId;
                for(let i = 0; i < outlets.length; i++){
                    const o = outlets[i];
                    const slotName = o.getAttribute("name") || "default";
                    const content = this._slots[slotName];
                    const parent = o.parentNode;
                    if (content) for (const n of content){
                        if (scopeId && 1 === n.nodeType) {
                            const id = scopeId + "-s";
                            const walker = document.createTreeWalker(n, 1);
                            n.setAttribute(id, "");
                            let child;
                            while(child = walker.nextNode())child.setAttribute(id, "");
                        }
                        parent.insertBefore(n, o);
                    }
                    else while(o.firstChild)parent.insertBefore(o.firstChild, o);
                    parent.removeChild(o);
                }
            }
            _injectChildStyle(comp) {
                this._applyStyles(comp.styles, comp);
            }
            _removeChildStyle(comp) {}
        }
        function useHost(caller) {
            const instance = getCurrentInstance();
            const el = instance && instance.ce;
            if (el) return el;
            return null;
        }
        function useShadowRoot() {
            const el = useHost();
            return el && el.shadowRoot;
        }
        function useCssModule(name1 = "$style") {
            {
                const instance = getCurrentInstance();
                if (!instance) return EMPTY_OBJ;
                const modules = instance.type.__cssModules;
                if (!modules) return EMPTY_OBJ;
                const mod = modules[name1];
                if (!mod) return EMPTY_OBJ;
                return mod;
            }
        }
        const positionMap = /* @__PURE__ */ new WeakMap();
        const newPositionMap = /* @__PURE__ */ new WeakMap();
        const moveCbKey = Symbol("_moveCb");
        const runtime_dom_esm_bundler_enterCbKey = Symbol("_enterCb");
        const decorate = (t)=>{
            delete t.props.mode;
            return t;
        };
        const TransitionGroupImpl = /* @__PURE__ */ decorate({
            name: "TransitionGroup",
            props: /* @__PURE__ */ shared_esm_bundler_extend({}, TransitionPropsValidators, {
                tag: String,
                moveClass: String
            }),
            setup (props, { slots }) {
                const instance = runtime_core_esm_bundler_getCurrentInstance();
                const state = useTransitionState();
                let prevChildren;
                let children;
                onUpdated(()=>{
                    if (!prevChildren.length) return;
                    const moveClass = props.moveClass || `${props.name || "v"}-move`;
                    if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) return;
                    prevChildren.forEach(callPendingCbs);
                    prevChildren.forEach(recordPosition);
                    const movedChildren = prevChildren.filter(applyTranslation);
                    forceReflow();
                    movedChildren.forEach((c)=>{
                        const el = c.el;
                        const style = el.style;
                        addTransitionClass(el, moveClass);
                        style.transform = style.webkitTransform = style.transitionDuration = "";
                        const cb = el[moveCbKey] = (e)=>{
                            if (e && e.target !== el) return;
                            if (!e || /transform$/.test(e.propertyName)) {
                                el.removeEventListener("transitionend", cb);
                                el[moveCbKey] = null;
                                removeTransitionClass(el, moveClass);
                            }
                        };
                        el.addEventListener("transitionend", cb);
                    });
                });
                return ()=>{
                    const rawProps = reactivity_esm_bundler_toRaw(props);
                    const cssTransitionProps = resolveTransitionProps(rawProps);
                    let tag = rawProps.tag || runtime_core_esm_bundler_Fragment;
                    prevChildren = [];
                    if (children) for(let i = 0; i < children.length; i++){
                        const child = children[i];
                        if (child.el && child.el instanceof Element) {
                            prevChildren.push(child);
                            setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
                            positionMap.set(child, child.el.getBoundingClientRect());
                        }
                    }
                    children = slots.default ? getTransitionRawChildren(slots.default()) : [];
                    for(let i = 0; i < children.length; i++){
                        const child = children[i];
                        if (null != child.key) setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
                    }
                    return createVNode(tag, null, children);
                };
            }
        });
        const TransitionGroup = null;
        function callPendingCbs(c) {
            const el = c.el;
            if (el[moveCbKey]) el[moveCbKey]();
            if (el[runtime_dom_esm_bundler_enterCbKey]) el[runtime_dom_esm_bundler_enterCbKey]();
        }
        function recordPosition(c) {
            newPositionMap.set(c, c.el.getBoundingClientRect());
        }
        function applyTranslation(c) {
            const oldPos = positionMap.get(c);
            const newPos = newPositionMap.get(c);
            const dx = oldPos.left - newPos.left;
            const dy = oldPos.top - newPos.top;
            if (dx || dy) {
                const s = c.el.style;
                s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
                s.transitionDuration = "0s";
                return c;
            }
        }
        function hasCSSTransform(el, root, moveClass) {
            const clone = el.cloneNode();
            const _vtc = el[vtcKey];
            if (_vtc) _vtc.forEach((cls)=>{
                cls.split(/\s+/).forEach((c)=>c && clone.classList.remove(c));
            });
            moveClass.split(/\s+/).forEach((c)=>c && clone.classList.add(c));
            clone.style.display = "none";
            const container = 1 === root.nodeType ? root : root.parentNode;
            container.appendChild(clone);
            const { hasTransform } = getTransitionInfo(clone);
            container.removeChild(clone);
            return hasTransform;
        }
        const getModelAssigner = (vnode)=>{
            const fn = vnode.props["onUpdate:modelValue"] || false;
            return isArray(fn) ? (value)=>invokeArrayFns(fn, value) : fn;
        };
        function onCompositionStart(e) {
            e.target.composing = true;
        }
        function onCompositionEnd(e) {
            const target = e.target;
            if (target.composing) {
                target.composing = false;
                target.dispatchEvent(new Event("input"));
            }
        }
        const assignKey = Symbol("_assign");
        const vModelText = null;
        const vModelCheckbox = null;
        function setChecked(el, { value, oldValue }, vnode) {
            el._modelValue = value;
            let checked;
            if (isArray(value)) checked = looseIndexOf(value, vnode.props.value) > -1;
            else if (isSet(value)) checked = value.has(vnode.props.value);
            else {
                if (value === oldValue) return;
                checked = looseEqual(value, getCheckboxValue(el, true));
            }
            if (el.checked !== checked) el.checked = checked;
        }
        const vModelRadio = null;
        const vModelSelect = null;
        function setSelected(el, value) {
            const isMultiple = el.multiple;
            const isArrayValue = isArray(value);
            if (isMultiple && !isArrayValue && !isSet(value)) return;
            for(let i = 0, l = el.options.length; i < l; i++){
                const option = el.options[i];
                const optionValue = getValue(option);
                if (isMultiple) {
                    if (isArrayValue) {
                        const optionType = typeof optionValue;
                        if ("string" === optionType || "number" === optionType) option.selected = value.some((v1)=>String(v1) === String(optionValue));
                        else option.selected = looseIndexOf(value, optionValue) > -1;
                    } else option.selected = value.has(optionValue);
                } else if (looseEqual(getValue(option), value)) {
                    if (el.selectedIndex !== i) el.selectedIndex = i;
                    return;
                }
            }
            if (!isMultiple && -1 !== el.selectedIndex) el.selectedIndex = -1;
        }
        function getValue(el) {
            return "_value" in el ? el._value : el.value;
        }
        function getCheckboxValue(el, checked) {
            const key = checked ? "_trueValue" : "_falseValue";
            return key in el ? el[key] : checked;
        }
        const vModelDynamic = null;
        function resolveDynamicModel(tagName, type) {
            switch(tagName){
                case "SELECT":
                    return vModelSelect;
                case "TEXTAREA":
                    return vModelText;
                default:
                    switch(type){
                        case "checkbox":
                            return vModelCheckbox;
                        case "radio":
                            return vModelRadio;
                        default:
                            return vModelText;
                    }
            }
        }
        function callModelHook(el, binding, vnode, prevVNode, hook) {
            const modelToUse = resolveDynamicModel(el.tagName, vnode.props && vnode.props.type);
            const fn = modelToUse[hook];
            fn && fn(el, binding, vnode, prevVNode);
        }
        function initVModelForSSR() {
            vModelText.getSSRProps = ({ value })=>({
                    value
                });
            vModelRadio.getSSRProps = ({ value }, vnode)=>{
                if (vnode.props && looseEqual(vnode.props.value, value)) return {
                    checked: true
                };
            };
            vModelCheckbox.getSSRProps = ({ value }, vnode)=>{
                if (isArray(value)) {
                    if (vnode.props && looseIndexOf(value, vnode.props.value) > -1) return {
                        checked: true
                    };
                } else if (isSet(value)) {
                    if (vnode.props && value.has(vnode.props.value)) return {
                        checked: true
                    };
                } else if (value) return {
                    checked: true
                };
            };
            vModelDynamic.getSSRProps = (binding, vnode)=>{
                if ("string" != typeof vnode.type) return;
                const modelToUse = resolveDynamicModel(vnode.type.toUpperCase(), vnode.props && vnode.props.type);
                if (modelToUse.getSSRProps) return modelToUse.getSSRProps(binding, vnode);
            };
        }
        const systemModifiers = null;
        const modifierGuards = null;
        const withModifiers = (fn, modifiers)=>{
            const cache = fn._withMods || (fn._withMods = {});
            const cacheKey = modifiers.join(".");
            return cache[cacheKey] || (cache[cacheKey] = (event, ...args)=>{
                for(let i = 0; i < modifiers.length; i++){
                    const guard = modifierGuards[modifiers[i]];
                    if (guard && guard(event, modifiers)) return;
                }
                return fn(event, ...args);
            });
        };
        const keyNames = null;
        const withKeys = (fn, modifiers)=>{
            const cache = fn._withKeys || (fn._withKeys = {});
            const cacheKey = modifiers.join(".");
            return cache[cacheKey] || (cache[cacheKey] = (event)=>{
                if (!("key" in event)) return;
                const eventKey = hyphenate(event.key);
                if (modifiers.some((k)=>k === eventKey || keyNames[k] === eventKey)) return fn(event);
            });
        };
        const rendererOptions = /* @__PURE__ */ shared_esm_bundler_extend({
            patchProp: runtime_dom_esm_bundler_patchProp
        }, nodeOps);
        let renderer;
        let enabledHydration = false;
        function ensureRenderer() {
            return renderer || (renderer = createRenderer(rendererOptions));
        }
        function ensureHydrationRenderer() {
            renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
            enabledHydration = true;
            return renderer;
        }
        const runtime_dom_esm_bundler_render = (...args)=>{
            ensureRenderer().render(...args);
        };
        const runtime_dom_esm_bundler_hydrate = (...args)=>{
            ensureHydrationRenderer().hydrate(...args);
        };
        const runtime_dom_esm_bundler_createApp = (...args)=>{
            const app = ensureRenderer().createApp(...args);
            const { mount } = app;
            app.mount = (containerOrSelector)=>{
                const container = normalizeContainer(containerOrSelector);
                if (!container) return;
                const component = app._component;
                if (!shared_esm_bundler_isFunction(component) && !component.render && !component.template) component.template = container.innerHTML;
                if (1 === container.nodeType) container.textContent = "";
                const proxy = mount(container, false, resolveRootNamespace(container));
                if (container instanceof Element) {
                    container.removeAttribute("v-cloak");
                    container.setAttribute("data-v-app", "");
                }
                return proxy;
            };
            return app;
        };
        const createSSRApp = (...args)=>{
            const app = ensureHydrationRenderer().createApp(...args);
            const { mount } = app;
            app.mount = (containerOrSelector)=>{
                const container = normalizeContainer(containerOrSelector);
                if (container) return mount(container, true, resolveRootNamespace(container));
            };
            return app;
        };
        function resolveRootNamespace(container) {
            if (container instanceof SVGElement) return "svg";
            if ("function" == typeof MathMLElement && container instanceof MathMLElement) return "mathml";
        }
        function injectNativeTagCheck(app) {
            Object.defineProperty(app.config, "isNativeTag", {
                value: (tag)=>isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag),
                writable: false
            });
        }
        function injectCompilerOptionsCheck(app) {
            if (isRuntimeOnly()) {
                const isCustomElement = app.config.isCustomElement;
                Object.defineProperty(app.config, "isCustomElement", {
                    get () {
                        return isCustomElement;
                    },
                    set () {
                        warn("The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead.");
                    }
                });
                const compilerOptions = app.config.compilerOptions;
                const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc`;
                Object.defineProperty(app.config, "compilerOptions", {
                    get () {
                        warn(msg);
                        return compilerOptions;
                    },
                    set () {
                        warn(msg);
                    }
                });
            }
        }
        function normalizeContainer(container) {
            if (shared_esm_bundler_isString(container)) {
                const res = document.querySelector(container);
                return res;
            }
            return container;
        }
        let ssrDirectiveInitialized = false;
        const initDirectivesForSSR = ()=>{
            if (!ssrDirectiveInitialized) {
                ssrDirectiveInitialized = true;
                initVModelForSSR();
                initVShowForSSR();
            }
        };
        /**
* vue v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/ function initDev() {
            initCustomFormatter();
        }
        const vue_runtime_esm_bundler_compile = ()=>{};
        var react = __webpack_require__("./node_modules/.pnpm/react@19.0.0/node_modules/react/index.js");
        var react_dom = __webpack_require__("./node_modules/.pnpm/react-dom@19.0.0_react@19.0.0/node_modules/react-dom/index.js");
        function _arrayLikeToArray(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for(var r = 0, n = Array(t); r < t; r++)n[r] = e[r];
            return n;
        }
        function _arrayWithHoles(e) {
            if (Array.isArray(e)) return e;
        }
        function _arrayWithoutHoles(e) {
            if (Array.isArray(e)) return _arrayLikeToArray(e);
        }
        function _assertThisInitialized(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
        }
        function _callSuper(e, t, r) {
            return t = _getPrototypeOf(t), _possibleConstructorReturn(e, _isNativeReflectConstruct() ? Reflect.construct(t, r || [], _getPrototypeOf(e).constructor) : t.apply(e, r));
        }
        function _classCallCheck(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        function _defineProperties(e, t) {
            for(var r = 0; r < t.length; r++){
                var n = t[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, _toPropertyKey(n.key), n);
            }
        }
        function _createClass(e, t, r) {
            return t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), e;
        }
        function _defineProperty(e, t, r) {
            return (t = _toPropertyKey(t)) in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e;
        }
        function _extends() {
            return (_extends = Object.assign ? Object.assign.bind() : function(e) {
                for(var t = 1; t < arguments.length; t++){
                    var r, n = arguments[t];
                    for(r in n)({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
                }
                return e;
            }).apply(null, arguments);
        }
        function _getPrototypeOf(e) {
            return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        function _inherits(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && _setPrototypeOf(e, t);
        }
        function _isNativeReflectConstruct() {
            try {
                var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
            } catch (e) {}
            return (_isNativeReflectConstruct = function() {
                return !!e;
            })();
        }
        function _iterableToArray(e) {
            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
        }
        function _iterableToArrayLimit(e, t) {
            var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (null != r) {
                var n, o, a, u, c = [], i = !0, s = !1;
                try {
                    if (a = (r = r.call(e)).next, 0 === t) {
                        if (Object(r) !== r) return;
                        i = !1;
                    } else for(; !(i = (n = a.call(r)).done) && (c.push(n.value), c.length !== t); i = !0);
                } catch (e) {
                    s = !0, o = e;
                } finally{
                    try {
                        if (!i && null != r.return && (u = r.return(), Object(u) !== u)) return;
                    } finally{
                        if (s) throw o;
                    }
                }
                return c;
            }
        }
        function _nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function _nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function ownKeys(t, e) {
            var r, n = Object.keys(t);
            return Object.getOwnPropertySymbols && (r = Object.getOwnPropertySymbols(t), e && (r = r.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })), n.push.apply(n, r)), n;
        }
        function _objectSpread2(t) {
            for(var e = 1; e < arguments.length; e++){
                var r = null != arguments[e] ? arguments[e] : {};
                e % 2 ? ownKeys(Object(r), !0).forEach(function(e) {
                    _defineProperty(t, e, r[e]);
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : ownKeys(Object(r)).forEach(function(e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
                });
            }
            return t;
        }
        function _objectWithoutProperties(e, t) {
            if (null == e) return {};
            var r, n = _objectWithoutPropertiesLoose(e, t);
            if (Object.getOwnPropertySymbols) for(var o = Object.getOwnPropertySymbols(e), a = 0; a < o.length; a++)r = o[a], t.includes(r) || ({}).propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
            return n;
        }
        function _objectWithoutPropertiesLoose(e, t) {
            if (null == e) return {};
            var r, n = {};
            for(r in e)if (({}).hasOwnProperty.call(e, r)) {
                if (t.includes(r)) continue;
                n[r] = e[r];
            }
            return n;
        }
        function _possibleConstructorReturn(e, t) {
            if (t && ("object" == typeof t || "function" == typeof t)) return t;
            if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
            return _assertThisInitialized(e);
        }
        function _setPrototypeOf(e, t) {
            return (_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function _slicedToArray(e, t) {
            return _arrayWithHoles(e) || _iterableToArrayLimit(e, t) || _unsupportedIterableToArray(e, t) || _nonIterableRest();
        }
        function _toConsumableArray(e) {
            return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread();
        }
        function _toPrimitive(e, t) {
            if ("object" != typeof e || !e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 === r) return ("string" === t ? String : Number)(e);
            r = r.call(e, t || "default");
            if ("object" != typeof r) return r;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        function _toPropertyKey(e) {
            e = _toPrimitive(e, "string");
            return "symbol" == typeof e ? e : e + "";
        }
        function _typeof(e) {
            return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            })(e);
        }
        function _unsupportedIterableToArray(e, t) {
            var r;
            if (e) return "string" == typeof e ? _arrayLikeToArray(e, t) : "Map" === (r = "Object" === (r = ({}).toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : r) || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _arrayLikeToArray(e, t) : void 0;
        }
        var originOptions = {
            react: {
                componentWrap: "div",
                slotWrap: "div",
                componentWrapAttrs: {
                    __use_react_component_wrap: "",
                    style: {
                        all: "unset"
                    }
                },
                slotWrapAttrs: {
                    __use_react_slot_wrap: "",
                    style: {
                        all: "unset"
                    }
                },
                vueNamedSlotsKey: [
                    "node:"
                ]
            },
            vue: {
                componentWrapHOC: function(t) {
                    return function() {
                        var e = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).portals;
                        return (0, react.createElement)(react.Fragment, null, t, (void 0 === e ? [] : e).map(function(e) {
                            var t = e.Portal;
                            return (0, react.createElement)(t, {
                                key: e.key
                            });
                        }));
                    };
                },
                componentWrapAttrs: {
                    "data-use-vue-component-wrap": "",
                    style: {
                        all: "unset"
                    }
                },
                slotWrapAttrs: {
                    "data-use-vue-slot-wrap": "",
                    style: {
                        all: "unset"
                    }
                }
            }
        };
        function setOptions() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {
                react: {},
                vue: {}
            }, t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : originOptions, r = 2 < arguments.length ? arguments[2] : void 0, t = (e.vue || (e.vue = {}), e.react || (e.react = {}), [
                t,
                _objectSpread2(_objectSpread2({}, e), {}, {
                    react: _objectSpread2(_objectSpread2(_objectSpread2({}, t.react), e.react), {}, {
                        componentWrapAttrs: _objectSpread2(_objectSpread2({}, t.react.componentWrapAttrs), e.react.componentWrapAttrs),
                        slotWrapAttrs: _objectSpread2(_objectSpread2({}, t.react.slotWrapAttrs), e.react.slotWrapAttrs)
                    }),
                    vue: _objectSpread2(_objectSpread2(_objectSpread2({}, t.vue), e.vue), {}, {
                        componentWrapAttrs: _objectSpread2(_objectSpread2({}, t.vue.componentWrapAttrs), e.vue.componentWrapAttrs),
                        slotWrapAttrs: _objectSpread2(_objectSpread2({}, t.vue.slotWrapAttrs), e.vue.slotWrapAttrs)
                    })
                })
            ]);
            return r && t.unshift({}), Object.assign.apply(this, t);
        }
        var domMethods = [
            "getElementById",
            "getElementsByClassName",
            "getElementsByTagName",
            "getElementsByTagNameNS",
            "querySelector",
            "querySelectorAll"
        ], domTopObject = {
            Document: {},
            Element: {}
        };
        function overwriteDomMethods(u) {
            Object.keys(domTopObject).forEach(function(e) {
                domMethods.forEach(function(o) {
                    var a = domTopObject[e][o] || window[e].prototype[o];
                    a && (domTopObject[e][o] = a, window[e].prototype[o] = function() {
                        for(var e = arguments.length, t = new Array(e), r = 0; r < e; r++)t[r] = arguments[r];
                        var n = a.apply(this, t);
                        return n && (n.constructor !== NodeList || n.constructor === NodeList && 0 < n.length) ? n : ("getElementById" === (n = o) && (n = "querySelector", t = [
                            "#" + t[0]
                        ]), (domTopObject.Element[n] || Element.prototype[n]).apply(u, t));
                    });
                });
            });
        }
        function recoverDomMethods() {
            Object.keys(domTopObject).forEach(function(t) {
                domMethods.forEach(function(e) {
                    window[t].prototype[e] = domTopObject[t][e];
                });
            });
        }
        var _excluded = [
            "ref"
        ], _excluded2 = [
            "key"
        ], _excluded3 = [
            "hashList"
        ], ReactDOMMajorVersion = parseInt(react_dom.version);
        function toRaws(e) {
            return e;
        }
        var FunctionComponentWrap = (()=>{
            function t(e) {
                return _classCallCheck(this, t), _callSuper(this, t, [
                    e
                ]);
            }
            return _inherits(t, react.Component), _createClass(t, [
                {
                    key: "render",
                    value: function() {
                        var e = this.props.component, t = this.props.passedProps, t = (t.ref, _objectWithoutProperties(t, _excluded));
                        return (0, react.createElement)(e, t, this.props.children);
                    }
                }
            ]);
        })(), createReactContainer = function(_, f, d) {
            var e = (()=>{
                function p(e) {
                    var t;
                    return _classCallCheck(this, p), (t = _callSuper(this, p, [
                        e
                    ])).state = _objectSpread2(_objectSpread2({}, e), f.isSlots ? {
                        children: _
                    } : {}), t.setRef = t.setRef.bind(t), t.vueInReactCall = t.vueInReactCall.bind(t), (t.__veauryVueWrapperRef__ = d).__veauryVueInReactCall__ = t.vueInReactCall, t;
                }
                return _inherits(p, react.Component), _createClass(p, [
                    {
                        key: "reactPropsLinkToVueInstance",
                        value: function(t) {
                            Object.keys(t).forEach(function(e) {
                                d[e] || (d[e] = t[e]);
                            }), Object.getOwnPropertyNames(t.__proto__).filter(function(e) {
                                return [
                                    "constructor",
                                    "render"
                                ].indexOf(e) < 0;
                            }).forEach(function(e) {
                                d[e] || (d[e] = t[e]);
                            });
                        }
                    },
                    {
                        key: "setRef",
                        value: function(e) {
                            var t = this;
                            e && (d.__veauryReactRef__ = e, this.reactPropsLinkToVueInstance(e), Promise.resolve().then(function() {
                                return t.reactPropsLinkToVueInstance(e);
                            }), (this.setRef.current = e).__veauryVueWrapperRef__ = d);
                        }
                    },
                    {
                        key: "createSlot",
                        value: function(r) {
                            return {
                                originVNode: r,
                                inheritAttrs: !1,
                                __fromReactSlot: !0,
                                render: function() {
                                    var e, t;
                                    return 1 === (null == (e = r = (r = (null == (t = this.$slots) || null == (e = t.default) ? void 0 : e.call(t)) || r) instanceof Function ? r(this) : r) ? void 0 : e.length) && null != (t = r[0]) && t.data && ((e = this.$attrs).key, t = _objectWithoutProperties(e, _excluded2), r[0].props = _objectSpread2(_objectSpread2({}, t), r[0].props)), r;
                                }
                            };
                        }
                    },
                    {
                        key: "componentWillUnmount",
                        value: function() {
                            d.__veauryReactRef__ && (d.__veauryReactRef__.__veauryVueWrapperRef__ = null, d.__veauryReactRef__ = null);
                        }
                    },
                    {
                        key: "vueInReactCall",
                        value: function(e) {
                            var r = this, n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                            return (2 < arguments.length ? arguments[2] : void 0) && e && e[0] ? e.map(function(e, t) {
                                return applyVueInReact(r.createSlot(e instanceof Function ? e : [
                                    e
                                ]), _objectSpread2(_objectSpread2(_objectSpread2({}, f), n), {}, {
                                    isSlots: !0,
                                    wrapInstance: d
                                })).render({
                                    key: (null == e ? void 0 : e.key) || void 0
                                });
                            }) : applyVueInReact(this.createSlot(e), _objectSpread2(_objectSpread2(_objectSpread2({}, f), n), {}, {
                                isSlots: !0,
                                wrapInstance: d
                            })).render();
                        }
                    },
                    {
                        key: "render",
                        value: function() {
                            var e, t, r, u = this, n = this.state, o = n.hashList, a = _objectWithoutProperties(n, _excluded3), c = {}, i = {};
                            for(e in a)t = e, r = void 0, a.hasOwnProperty(t) && null != a[t] && (a[t].__slot ? (a[t].reactSlot ? a[t] = a[t].reactSlot : (r = a[t], f.defaultSlotsFormatter && a[t].__trueChildren ? (a[t].__trueChildren.__top__ = u.__veauryVueWrapperRef__, a[t] = f.defaultSlotsFormatter(a[t].__trueChildren, u.vueInReactCall, o), a[t] instanceof Array ? a[t] = _toConsumableArray(a[t]) : -1 < [
                                "string",
                                "number"
                            ].indexOf(_typeof(a[t])) ? a[t] = [
                                a[t]
                            ] : "object" === _typeof(a[t]) && (a[t] = _objectSpread2({}, a[t]))) : a[t] = _objectSpread2({}, applyVueInReact(u.createSlot(a[t]), _objectSpread2(_objectSpread2({}, f), {}, {
                                isSlots: !0,
                                wrapInstance: d
                            })).render()), a[t].vueFunction = r), c[t] = a[t]) : a[t].__scopedSlot && (a[t] = a[t](u.createSlot), i[t] = a[t]));
                            var s, l, n = {};
                            return n.ref = this.setRef, f.isSlots ? this.state.children || this.props.children : (s = a, _.__syncUpdateForPureReactInVue && Object.keys(_.__syncUpdateForPureReactInVue).map(function(n) {
                                var o, a;
                                s[n] && "function" == typeof s[n] && (o = u.__veauryVueWrapperRef__, a = s[n], s[n] = function() {
                                    for(var e = arguments.length, t = new Array(e), r = 0; r < e; r++)t[r] = arguments[r];
                                    o.__veaurySyncUpdateProps__(_.__syncUpdateForPureReactInVue[n].apply(this, t)), a.apply(this, t), o.macroTaskUpdate = !0, o.__veauryMountReactComponent__(!0, !0, {});
                                });
                            }), l = _objectSpread2(_objectSpread2(_objectSpread2({}, s = f.defaultPropsFormatter ? f.defaultPropsFormatter.call(this, s, this.vueInReactCall, o) : s), c), i), Object.getPrototypeOf(_) !== Function.prototype && ("object" !== _typeof(_) || _.render) || p.catchVueRefs() ? (Object.getPrototypeOf(_) === Function.prototype && delete n.ref, (0, react.createElement)(_, _extends({}, l, n))) : (0, react.createElement)(FunctionComponentWrap, _extends({
                                passedProps: l,
                                component: _
                            }, n), l.children));
                        }
                    }
                ], [
                    {
                        key: "catchVueRefs",
                        value: function() {
                            if (d.$parent) {
                                for(var e in d.$parent.$refs)if (d.$parent.$refs[e] === d) return !0;
                            }
                            return !1;
                        }
                    }
                ]);
            })();
            return _defineProperty(e, "displayName", "applyReact_".concat(_.displayName || _.name || "Component")), e;
        };
        function applyReactInVue(m) {
            var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            return m.__esModule && m.default && (m = m.default), b.isSlots && (m = m()), b = setOptions(b, void 0, !0), {
                originReactComponent: m,
                setup: function(e, t) {
                    var r, n, o, a;
                    if (!b.isSlots) return r = {}, n = reactive({}), o = runtime_core_esm_bundler_getCurrentInstance(), "function" == typeof (a = b.useInjectPropsFromWrapper || m.__veauryInjectPropsFromWrapper__) && ("function" != typeof (a = a.call(o.proxy, e)) ? (Object.assign(n, a), r.__veauryInjectedProps__ = n) : o.proxy.__veauryInjectedComputed__ = a), r;
                },
                data: function() {
                    return {
                        VEAURY_Portals: []
                    };
                },
                created: function() {
                    this.__veauryPortalKeyPool__ = [], this.__veauryMaxPortalCount__ = 0;
                },
                computed: {
                    __veauryInjectedProps__: function() {
                        var e;
                        return null == (e = this.__veauryInjectedComputed__) ? void 0 : e.call(this);
                    }
                },
                render: function() {
                    var e = runtime_core_esm_bundler_h(b.react.componentWrap, _objectSpread2({
                        ref: "react"
                    }, b.react.componentWrapAttrs || {}), this.VEAURY_Portals.map(function(e) {
                        return (0, e.Portal)(runtime_core_esm_bundler_h, e.key);
                    }));
                    return this.__veauryCheckReactSlot__(this.$slots), e;
                },
                methods: {
                    __veauryCheckReactSlot__: function(n) {
                        var o = this;
                        function a(e, t, r) {
                            return t[r] && (e[r] = t[r], 1);
                        }
                        "object" === _typeof(n) && null != n && (n instanceof Array ? n.forEach(function(e) {
                            o.__veauryCheckReactSlot__(e.children);
                        }) : Object.keys(n).forEach(function(e) {
                            var t, r, e = n[e];
                            if ("function" == typeof e) {
                                try {
                                    t = e.apply(o, e.__reactArgs || [
                                        {}
                                    ]);
                                } catch (e) {
                                    return;
                                }
                                (e.__trueChildren = t).forEach(function(e) {
                                    e.children && o.__veauryCheckReactSlot__(e.children);
                                }), 1 !== t.length || a(e, t = t[0], "reactSlot") || a(e, t, "reactFunction") || t.type !== runtime_core_esm_bundler_Fragment || 1 !== (null == (r = t.children) ? void 0 : r.length) || a(e, r = t.children[0], "reactSlot") || a(e, r, "reactFunction");
                            }
                        }));
                    },
                    __veauryPushVuePortal__: function(e) {
                        var t = this.__veauryPortalKeyPool__.shift() || this.__veauryMaxPortalCount__++;
                        this.VEAURY_Portals.push({
                            Portal: e,
                            key: t
                        });
                    },
                    __veauryRemoveVuePortal__: function(r) {
                        var n, e = this.VEAURY_Portals.find(function(e, t) {
                            if (e.Portal === r) return n = t, !0;
                        });
                        this.__veauryPortalKeyPool__.push(e.key), this.VEAURY_Portals.splice(n, 1);
                    },
                    __veauryGetScopeSlot__: function(u, c, t) {
                        var i = this;
                        function e(a) {
                            function e() {
                                for(var e, t = this, r = arguments.length, n = new Array(r), o = 0; o < r; o++)n[o] = arguments[o];
                                return u.reactFunction ? u.reactFunction.apply(this, n) : b.defaultSlotsFormatter ? ((e = u.apply(this, n)).__top__ = i, (e = b.defaultSlotsFormatter(e, i.__veauryVueInReactCall__, c)) instanceof Array || -1 < _typeof(e).indexOf("string", "number") ? e = _toConsumableArray(e) : "object" === _typeof(e) && (e = _objectSpread2({}, e)), e) : applyVueInReact(a(function() {
                                    return u.apply(t, n);
                                }), _objectSpread2(_objectSpread2({}, b), {}, {
                                    isSlots: !0,
                                    wrapInstance: i
                                })).render();
                            }
                            return b.pureTransformer && t ? e.vueFunction = t : e.vueFunction = u, e;
                        }
                        return e.__scopedSlot = !0, e;
                    },
                    __veaurySyncUpdateProps__: function(e) {
                        this.__veauryReactInstance__ && this.__veauryReactInstance__.setState(e);
                    },
                    __veauryMountReactComponent__: function(e, t) {
                        var r, n, o = this, a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}, u = {}, c = [], i = this.$.vnode.scopeId, s = (i && (u[i] = "", c.push(i)), {}), l = {};
                        if (!e || null != t && t.slot) for(var p in this.$slots || {})((t)=>{
                            var e;
                            o.$slots.hasOwnProperty(t) && null != o.$slots[t] && ((e = b.react.vueNamedSlotsKey.find(function(e) {
                                return 0 === t.indexOf(e);
                            })) || "default" === t ? (e = t.replace(new RegExp("^".concat(e)), ""), s[e] = o.$slots[t], s[e].__slot = !0) : l[t] = o.__veauryGetScopeSlot__(o.$slots[t], c, null == (e = o.$.vnode) || null == (e = e.children) ? void 0 : e[t]));
                        })(p);
                        (!e || null != t && t.slot) && (n = _objectSpread2({}, s), r = n.default, delete n.default), this.__veauryLast__ = this.__veauryLast__ || {}, this.__veauryLast__.slot = this.__veauryLast__.slot || {}, this.__veauryLast__.attrs = this.__veauryLast__.attrs || {};
                        var _ = {
                            slot: function() {
                                o.__veauryLast__.slot = _objectSpread2(_objectSpread2(_objectSpread2({}, r ? {
                                    children: r
                                } : {
                                    children: null
                                }), n), l);
                            },
                            attrs: function() {
                                o.__veauryLast__.attrs = o.$attrs;
                            }
                        };
                        if (t && Object.keys(t).forEach(function(e) {
                            return _[e]();
                        }), e) {
                            var f = function() {
                                o.__veauryReactInstance__ && o.__veauryReactInstance__.setState(function(t) {
                                    return Object.keys(t).forEach(function(e) {
                                        b.isSlots && "children" === e || delete t[e];
                                    }), _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, o.__veauryCache__), toRaws(o.__veauryInjectedProps__)), !b.isSlots && o.__veauryLast__.slot), toRaws(o.__veauryLast__.attrs));
                                }), o.__veauryCache__ = null;
                            };
                            !this.microTaskUpdate || this.__veauryCache__ || this.$nextTick(function() {
                                f(), o.microTaskUpdate = !1;
                            }), this.macroTaskUpdate && (clearTimeout(this.updateTimer), this.updateTimer = setTimeout(function() {
                                clearTimeout(o.updateTimer), f(), o.macroTaskUpdate = !1;
                            })), this.__veauryCache__ = _objectSpread2(_objectSpread2({}, this.__veauryCache__ || {}), _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, a), this.$attrs.class ? {
                                className: this.$attrs.class
                            } : {}), _objectSpread2({}, u)), {}, {
                                hashList: c
                            }, this.$attrs.style ? {
                                style: this.$attrs.style
                            } : {})), this.macroTaskUpdate || this.microTaskUpdate || f();
                        } else {
                            _.slot(), _.attrs();
                            var i = createReactContainer(m, b, this), d = (0, react.createElement)(i, _extends({}, toRaws(this.$attrs), toRaws(this.__veauryInjectedProps__), {
                                children: r
                            }, n, l, this.$attrs.class ? {
                                className: this.$attrs.class
                            } : {}, u, {
                                hashList: c
                            }, this.$attrs.style ? {
                                style: this.$attrs.style
                            } : {}, {
                                ref: function(e) {
                                    return o.__veauryReactInstance__ = e;
                                }
                            })), y = this.$refs.react, v1 = b.wrapInstance;
                            if (v1) (v1 = b.wrapInstance).__veauryVueWrapperRef__ = this;
                            else for(var h1 = this.$parent; h1;){
                                if (h1.parentReactWrapperRef) {
                                    v1 = h1.parentReactWrapperRef;
                                    break;
                                }
                                if (h1.reactWrapperRef) {
                                    v1 = h1.reactWrapperRef;
                                    break;
                                }
                                h1 = h1.$parent;
                            }
                            v1 ? (this.parentReactWrapperRef = v1, this.reactPortal = function() {
                                return (0, react_dom.createPortal)(d, y);
                            }, v1.pushReactPortal(this.reactPortal)) : 17 < ReactDOMMajorVersion ? (void 0 !== react_dom.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED && (react_dom.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = !0), t = b.react.createRoot || react_dom.createRoot, 18 < ReactDOMMajorVersion && !t && console.warn("'react-dom 19' no longer supports dynamically determining whether to use 'render' or 'createRoot'. In order to be compatible with 'react-dom 17' and previous versions, you need to manually configure 'createRoot' in the veaury configuration."), this.__veauryReactApp__ = t(y), this.__veauryReactApp__.render(d)) : react_dom.render(d, y);
                        }
                    }
                },
                mounted: function() {
                    var e = this;
                    this.__VEAURY_IGNORE_STRANGE_UPDATE__ = !0, Promise.resolve().then(function() {
                        e.__VEAURY_IGNORE_STRANGE_UPDATE__ = !1;
                    }), clearTimeout(this.updateTimer), this.__veauryMountReactComponent__();
                },
                beforeUnmount: function() {
                    var e;
                    clearTimeout(this.updateTimer), overwriteDomMethods(this.$refs.react), this.reactPortal ? null != (e = this.parentReactWrapperRef) && e.removeReactPortal(this.reactPortal) : 17 < ReactDOMMajorVersion ? null != (e = this.__veauryReactApp__) && e.unmount() : react_dom.unmountComponentAtNode(this.$refs.react), recoverDomMethods();
                },
                updated: function() {
                    this.__VEAURY_IGNORE_STRANGE_UPDATE__ || this.__veauryMountReactComponent__(!0, {
                        slot: !0
                    });
                },
                inheritAttrs: !1,
                watch: {
                    $attrs: {
                        handler: function() {
                            this.__veauryMountReactComponent__(!0, {
                                attrs: !0
                            });
                        },
                        deep: !0
                    },
                    __veauryInjectedProps__: {
                        handler: function() {
                            this.__veauryMountReactComponent__(!0, {
                                attrs: !0
                            });
                        },
                        deep: !0
                    }
                }
            };
        }
        var REACT_ALL_HANDLERS = new Set([
            "onClick",
            "onContextMenu",
            "onDoubleClick",
            "onDrag",
            "onDragEnd",
            "onDragEnter",
            "onDragExit",
            "onDragLeave",
            "onDragOver",
            "onDragStart",
            "onDrop",
            "onMouseDown",
            "onMouseEnter",
            "onMouseLeave",
            "onMouseMove",
            "onMouseOut",
            "onMouseOver",
            "onMouseUp",
            "onChange",
            "onInput",
            "onInvalid",
            "onReset",
            "onSubmit",
            "onError",
            "onLoad",
            "onPointerDown",
            "onPointerMove",
            "onPointerUp",
            "onPointerCancel",
            "onGotPointerCapture",
            "onLostPointerCapture",
            "onPointerEnter",
            "onPointerLeave",
            "onPointerOver",
            "onPointerOut",
            "onSelect",
            "onTouchCancel",
            "onTouchEnd",
            "onTouchMove",
            "onTouchStart",
            "onScroll",
            "onWheel",
            "onAbort",
            "onCanPlay",
            "onCanPlayThrough",
            "onDurationChange",
            "onEmptied",
            "onEncrypted",
            "onEnded",
            "onError",
            "onLoadedData",
            "onLoadedMetadata",
            "onLoadStart",
            "onPause",
            "onPlay",
            "onPlaying",
            "onProgress",
            "onRateChange",
            "onSeeked",
            "onSeeking",
            "onStalled",
            "onSuspend",
            "onTimeUpdate",
            "onVolumeChange",
            "onWaiting",
            "onLoad",
            "onError",
            "onAnimationStart",
            "onAnimationEnd",
            "onAnimationIteration",
            "onTransitionEnd",
            "onToggle"
        ]);
        function lookupVueWrapperRef(e, t) {
            for(var r = null == (e = t = (null == e ? void 0 : e._reactInternals) || (null == e ? void 0 : e._reactInternalFiber) || t) ? void 0 : e.return; r;){
                var n = r.stateNode;
                if (n = (null == n ? void 0 : n.parentVueWrapperRef) || (null == n ? void 0 : n.__veauryVueWrapperRef__)) return n;
                r = r.return;
            }
        }
        function createModifiers(e, t, r) {
            var n = {};
            return r.forEach(function(e) {
                n[e] = !0;
            }), e[("modelValue" === t ? "model" : t) + "Modifiers"] = n;
        }
        function setVModel(e, t, r) {
            var n = this, o = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "v-model";
            if (!(t instanceof Array)) throw Error("[error:veaury] Parameter type error from '".concat(o, "', a single v-model is an array, such as [val, setter, argumentKey, modifiers] or [val, setter, modifiers]"));
            if ("function" != typeof t[1]) throw Error("[error:veaury] Parameter type error from '".concat(o, "', a single v-model is an array, the second element of the array must be a setter function"));
            var a = t[1], u = ("string" == typeof t[2] ? (r = t[2], t[3] instanceof Array && createModifiers(e, r, t[3])) : t[2] instanceof Array && createModifiers(e, r, t[2]), e["onUpdate:" + r]);
            e["onUpdate:" + r] = "function" == typeof u ? function() {
                for(var e = arguments.length, t = new Array(e), r = 0; r < e; r++)t[r] = arguments[r];
                u.apply(n, t), a.apply(n, t);
            } : a, e[r] = t[0];
        }
        function parseVModel(a) {
            var u = this, r = {}, c = _objectSpread2({}, a);
            return Object.keys(a).forEach(function(n) {
                var o, e = n.match(/^onUpdate-([^-]+)/);
                if (e) delete c[n], o = r["onUpdate:".concat(e[1])], r["onUpdate:".concat(e[1])] = "function" == typeof o ? function() {
                    for(var e = arguments.length, t = new Array(e), r = 0; r < e; r++)t[r] = arguments[r];
                    o.apply(u, t), a[n].apply(u, t);
                } : a[n];
                else if (e = n.match(/^v-model($|:([^:]+)|-([^:]+))/)) e = e[2] || e[3] || "modelValue", setVModel(r, a[n], e), delete c[n];
                else if ("v-models" === n) {
                    if ("object" !== _typeof(a[n]) || a[n] instanceof Array) throw Error("[error:veaury] The parameter 'v-models' must be an object type, such as {[argumentKey]: singleVModel}");
                    var t = a[n];
                    Object.keys(t).forEach(function(e) {
                        setVModel(r, t[e], e, "v-models");
                    }), delete c[n];
                }
            }), _objectSpread2(_objectSpread2({}, c), r);
        }
        var _default = (()=>_createClass(function e() {
                _classCallCheck(this, e), _defineProperty(this, "pool", new Set);
            }, [
                {
                    key: "getRandomId",
                    value: function(e) {
                        var t = e + (Math.random() + "").substr(2);
                        return this.pool.has(t) ? this.getRandomId(e) : (this.pool.add(t), t);
                    }
                }
            ]))();
        function RenderReactNode(e, t) {
            var r, e = e.node;
            if ("function" == typeof e && (e = e()), null != (r = t) && r.current || "function" == typeof t || null != (r = t) && r.toString().match(/^function/) || (t = null), -1 < [
                "string",
                "number"
            ].indexOf(_typeof(e))) return e;
            if (e instanceof Array) {
                if (1 !== e.length) return e;
                e = e[0];
            }
            return _objectSpread2(_objectSpread2({}, e), {}, {
                ref: t
            });
        }
        var Bridge = applyReactInVue(RenderReactNode);
        function WrapVue(e) {
            return runtime_core_esm_bundler_h(Bridge, {
                node: function() {
                    return e.node;
                }
            });
        }
        WrapVue.originReactComponent = (0, react.forwardRef)(RenderReactNode);
        var _excluded$1 = [
            "component",
            "node"
        ], _excluded2$1 = [
            "component",
            "$slots",
            "children",
            "class",
            "style"
        ], _excluded3$1 = [
            "className",
            "classname"
        ], optionsName = "veaury-options", random = new _default;
        function filterVueComponent(e, t) {
            var r;
            return e = "string" == typeof e && t ? null == (t = t.$) || null == (t = t.appContext) || null == (t = t.app) || null == (r = t.component) ? void 0 : r.call(t, e) : e;
        }
        function transferSlots(r) {
            if (r) return Object.keys(r).forEach(function(e) {
                var t = r[e];
                null != t && ("function" == typeof t ? (r[e] = t, r[e].reactFunction = t) : (r[e] = function() {
                    return t;
                }, r[e].reactSlot = t), t.vueFunction) && (r[e].vueFunction = t.vueFunction);
            }), r;
        }
        function VNodeBridge(e) {
            var t;
            return null == (t = e.node) ? void 0 : t.call(e);
        }
        var VueContainer = (0, react.forwardRef)(function(e, t) {
            var r, n = e.component, o = e.node, e = _objectWithoutProperties(e, _excluded$1);
            if (null == n && null == o) return null;
            if (null != o) {
                if (o.$$typeof || "string" == typeof o || "number" == typeof o) return o;
                "function" != typeof o && (r = o, o = function() {
                    return r;
                });
            }
            var a, n = n || VNodeBridge, u = setOptions(e[optionsName] || {}, void 0, !0), c = u.useInjectPropsFromWrapper || n.__veauryInjectPropsFromWrapper__;
            return u.isSlots || "function" == typeof c && (a = c(e)), (0, react.createElement)(VueComponentLoader, _extends({}, _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({
                component: n
            }, o ? {
                node: o
            } : {}), e), a), {}, _defineProperty({}, optionsName, u)), {
                ref: t
            }));
        }), VueComponentLoader = (()=>{
            function r(e) {
                var t;
                return _classCallCheck(this, r), (t = _callSuper(this, r, [
                    e
                ])).state = {
                    portals: []
                }, t.__veauryPortalKeyPool__ = [], t.__veauryMaxPortalCount__ = 0, t.__veauryCurrentVueComponent__ = e.component, t.__veauryCreateVueInstance__ = t.__veauryCreateVueInstance__.bind(t), t.__veauryVueComponentContainer__ = t.createVueComponentContainer(), t;
            }
            return _inherits(r, react.Component), _createClass(r, [
                {
                    key: "pushReactPortal",
                    value: function(e) {
                        var t = this.state.portals, r = this.__veauryPortalKeyPool__.shift() || this.__veauryMaxPortalCount__++;
                        t.push({
                            Portal: e,
                            key: r
                        }), this.setState({
                            portals: t
                        });
                    }
                },
                {
                    key: "removeReactPortal",
                    value: function(r) {
                        var n, e = this.state.portals, t = e.find(function(e, t) {
                            if (e.Portal === r) return n = t, !0;
                        });
                        this.__veauryPortalKeyPool__.push(t.key), e.splice(n, 1), this.__veauryVueRef__ && this.setState({
                            portals: e
                        });
                    }
                },
                {
                    key: "createVueComponentContainer",
                    value: function() {
                        var t = this, r = {}, e = this.props[optionsName];
                        return e.isSlots ? (Object.keys(this.props).forEach(function(e) {
                            REACT_ALL_HANDLERS.has(e) && "function" == typeof t.props[e] && (r[e] = t.props[e]);
                        }), e.vue.slotWrapAttrs && (r = _objectSpread2(_objectSpread2({}, r), e.vue.slotWrapAttrs))) : e.vue.componentWrapAttrs && (r = _objectSpread2(_objectSpread2({}, r), e.vue.componentWrapAttrs)), e.vue.componentWrapHOC((0, react.createElement)("div", _extends({}, e.vue.componentWrapAttrs, {
                            ref: this.__veauryCreateVueInstance__,
                            key: null
                        })), r);
                    }
                },
                {
                    key: "shouldComponentUpdate",
                    value: function(e, t, r) {
                        var n, o, a, u, c = this;
                        return e === this.props || (n = e.component, o = void 0 === (o = e["v-slots"]) ? null : o, a = e.children, e = _objectWithoutProperties(e, [
                            "component",
                            optionsName,
                            "v-slots",
                            "children"
                        ].map(_toPropertyKey)), this.__veauryCurrentVueComponent__ !== n && this.updateVueComponent(n), n.__fromReactSlot) || this.__veauryVueInstance__ && (a && (o = o || {}, "object" !== _typeof(a) || a instanceof Array || a.$$typeof ? o.default = a : o = a), (u = this.__veauryVueInstance__.$data.$slots) && Object.keys(u).forEach(function(e) {
                            delete u[e];
                        }), o && (u || (this.__veauryVueInstance__.$data.$slots = {}), Object.assign(this.__veauryVueInstance__.$data.$slots, transferSlots(o))), Object.keys(this.__veauryVueInstance__.$data).forEach(function(e) {
                            "$slots" !== e && delete c.__veauryVueInstance__.$data[e];
                        }), this.__veauryVueInstance__) && Object.assign(this.__veauryVueInstance__.$data, parseVModel(e)), !0;
                    }
                },
                {
                    key: "componentWillUnmount",
                    value: function() {
                        this.vuePortal ? this.parentVueWrapperRef.__veauryRemoveVuePortal__(this.vuePortal) : (this.__veauryVueInstance__ && this.__veauryVueInstance__.$.appContext.app.unmount(), random.pool.delete(this.__veauryVueTargetId__), this.vueCreated = !1);
                    }
                },
                {
                    key: "componentDidMount",
                    value: function() {
                        this.__veauryCreateVueInstance__(this.vueContainerElement);
                    }
                },
                {
                    key: "__veauryCreateVueInstance__",
                    value: function(e) {
                        var p, _, t, r, n, o, a, u, c = this;
                        function i(e) {
                            this.__veauryVueInstance__ || (this.__veauryVueInstance__ = e);
                        }
                        this.vueCreated || (this.vueCreated = !0, (p = this).vueContainerElement = e, (t = this.props).component, _ = t[optionsName], a = t.children, u = void 0 === (u = t["v-slots"]) ? {} : u, t = _objectWithoutProperties(t, [
                            "component",
                            optionsName,
                            "children",
                            "v-slots"
                        ].map(_toPropertyKey)), a && ("object" !== _typeof(a) || a instanceof Array || a.$$typeof ? u.default = a : u = a), (u = transferSlots(u)) && (t.$slots = u), i = i.bind(this), r = _objectSpread2({}, parseVModel(t)), n = {
                            data: function() {
                                return _.isSlots ? {
                                    children: p.__veauryCurrentVueComponent__.originVNode
                                } : r;
                            },
                            created: function() {
                                this.reactWrapperRef = p, i(this);
                            },
                            methods: {
                                reactInVueCall: function(e) {
                                    return (2 < arguments.length ? arguments[2] : void 0) && e && e[0] ? e.map(function(e, t) {
                                        return runtime_core_esm_bundler_h(WrapVue, {
                                            node: e,
                                            key: (null == e || null == (e = e.data) ? void 0 : e.key) || t
                                        });
                                    }) : runtime_core_esm_bundler_h(WrapVue, {
                                        node: e
                                    });
                                },
                                getScopedSlots: function(s, e) {
                                    var t, l = this, r = (this.getScopedSlots.__scopeSlots || (this.getScopedSlots.__scopeSlots = {}), _objectSpread2({}, e));
                                    for(t in r)((c)=>{
                                        var e, i;
                                        r.hasOwnProperty(c) && null != (e = r[c]) && (r[c] = (i = e, function() {
                                            for(var e, t, r, n, o = arguments.length, a = new Array(o), u = 0; u < o; u++)a[u] = arguments[u];
                                            return i.vueFunction ? i.vueFunction.apply(l, a) : (r = i.reactFunction, r = i.reactSlot || (null == r ? void 0 : r.apply(l, a)), n = _.defaultSlotsFormatter, null != (e = l.getScopedSlots.__scopeSlots[c]) && null != (e = e.component) && null != (e = e.ctx) && e.__veauryReactInstance__ ? (t = l.getScopedSlots.__scopeSlots[c], Promise.resolve().then(function() {
                                                var e;
                                                null != (e = t) && null != (e = e.component) && null != (e = e.ctx) && null != (e = e.__veauryReactInstance__) && e.setState({
                                                    children: i.apply(l, a)
                                                });
                                            })) : (t = n && r ? [
                                                n(r, l.reactInVueCall)
                                            ] : s(applyReactInVue(function() {
                                                return i.apply(l, a);
                                            }, _objectSpread2(_objectSpread2({}, _), {}, {
                                                isSlots: !0,
                                                wrapInstance: p
                                            }))), l.getScopedSlots.__scopeSlots[c] = t), i.reactFunction ? t.reactFunction = i.reactFunction : i.reactSlot && (t.reactSlot = i.reactSlot), t);
                                        }), r[c].reactFunction = e);
                                    })(t);
                                    return r;
                                }
                            },
                            mounted: function() {
                                e.removeAttribute("id"), p.__veauryVueRef__ = this.$refs.use_vue_wrapper, this.$refs.use_vue_wrapper.reactWrapperRef = p;
                            },
                            beforeUnmount: function() {
                                p.__veauryVueRef__ = null, this.$refs.use_vue_wrapper.reactWrapperRef = null;
                            },
                            render: function() {
                                var e = this, t = this.$data, r = (t.component, t.$slots), n = t.class, o = t.style, t = _objectWithoutProperties(t, _excluded2$1), a = this.getScopedSlots(runtime_core_esm_bundler_h, _objectSpread2({}, r)), r = t.className, u = t.classname, t = _objectWithoutProperties(t, _excluded3$1), c = {};
                                return Object.keys(a).forEach(function(e) {
                                    var t = a[e];
                                    c[e] = "function" == typeof t ? t : function() {
                                        return t;
                                    };
                                }), runtime_core_esm_bundler_h(filterVueComponent(p.__veauryCurrentVueComponent__, this), _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, t), n || r || u ? {
                                    class: n || r || u
                                } : {}), o ? {
                                    style: o
                                } : {}), {}, {
                                    ref: "use_vue_wrapper"
                                }), _objectSpread2({}, _.isSlots && this.children ? {
                                    default: "function" == typeof this.children ? this.children : function() {
                                        return e.children;
                                    }
                                } : _objectSpread2({}, c)));
                            }
                        }, e && (o = random.getRandomId("__vue_wrapper_container_"), e.id = o, this.__veauryVueTargetId__ = o, (a = _.wrapInstance) ? (a = _.wrapInstance).reactWrapperRef = p : a = lookupVueWrapperRef(this), a && document.getElementById(o) ? (this.parentVueWrapperRef = a, this.vuePortal = function(e, t) {
                            return e(Teleport, {
                                to: "#" + o,
                                key: o
                            }, [
                                e(Object.assign(n, {
                                    router: c._router
                                }))
                            ]);
                        }, a.__veauryPushVuePortal__(this.vuePortal)) : (u = runtime_dom_esm_bundler_createApp(n), "function" == typeof _.beforeVueAppMount && _.beforeVueAppMount(u), this.__veauryVueInstance__ = u.mount(e))));
                    }
                },
                {
                    key: "updateVueComponent",
                    value: function(e) {
                        this.__veauryVueInstance__ && (e.__fromReactSlot ? this.__veauryVueInstance__.children = "function" == typeof e.originVNode ? e.originVNode : function() {
                            return e.originVNode;
                        } : (this.__veauryCurrentVueComponent__ = e, this.__veauryVueInstance__.$forceUpdate()));
                    }
                },
                {
                    key: "render",
                    value: function() {
                        return (0, react.createElement)(this.__veauryVueComponentContainer__, {
                            portals: this.state.portals
                        });
                    }
                }
            ]);
        })();
        function applyVueInReact(r) {
            var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, e = (r || console.warn("Component must be passed in applyVueInReact!"), r.__esModule && r.default && (r = r.default), (0, react.forwardRef)(function(e, t) {
                return (0, react.createElement)(VueContainer, _extends({}, e, {
                    component: r,
                    ref: t
                }, _defineProperty({}, optionsName, n)));
            }));
            return e.originVueComponent = r, e;
        }
        function lazyVueInReact(e, t) {
            return lazy(function() {
                return e().then(function(e) {
                    return {
                        default: applyVueInReact(e.default, t)
                    };
                });
            });
        }
        function lazyReactInVue(e, t) {
            function r() {
                return n().then(function(e) {
                    return applyReactInVue(e.default, t);
                });
            }
            var n = e;
            "object" === _typeof(e) && (n = e.loader);
            return defineAsyncComponent("object" === _typeof(e) ? _objectSpread2(_objectSpread2({}, e), {}, {
                loader: r
            }) : r);
        }
        function injectPropsFromWrapper(e, t) {
            return console.warn("[veaury warn]: HOC injectPropsFromWrapper is deprecated! Try using 'useInjectPropsFromWrapper' in the options of 'applyReactInVue' or 'applyVueInReact'!"), "function" != typeof e ? console.warn("[veaury warn]: parameter 'injectionHook' is not a function") : t.__veauryInjectPropsFromWrapper__ = e, t;
        }
        var _excluded$2 = null;
        function createCrossingProviderForReactInVue(e) {
            var r = createContext({});
            return [
                function() {
                    return useContext(r);
                },
                applyReactInVue(function(e) {
                    var t = e.children, e = _objectWithoutProperties(e, _excluded$2);
                    return createElement(r.Provider, {
                        value: _objectSpread2({}, e)
                    }, t);
                }, {
                    useInjectPropsFromWrapper: e
                }),
                r
            ];
        }
        var random$1 = new _default;
        function createCrossingProviderForVueInReact(e, r) {
            return r = r || random$1.getRandomId("veauryCrossingProvide_"), [
                function() {
                    return inject(r);
                },
                applyVueInReact({
                    setup: function(e, t) {
                        return provide(r, t.attrs), function() {
                            return h(t.slots.default);
                        };
                    }
                }, {
                    useInjectPropsFromWrapper: e
                })
            ];
        }
        function createReactMissVue(e) {
            var t = e.useVueInjection, e = e.beforeVueAppMount, t = _slicedToArray(createCrossingProviderForReactInVue(t), 3), r = t[0], n = t[2];
            return [
                r,
                applyVueInReact(t[1], {
                    beforeVueAppMount: e
                }),
                n
            ];
        }
        function veaury_esm_transformer(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, r = t.globalName, n = applyReactInVue(e, t.combinedOption || {});
            return n.install = function(e) {
                var t = (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}).globalName;
                return r && e.component(t || r, n), n;
            }, n;
        }
        function toCamelCase(e) {
            return e.replace(/-(\w)/g, function(e, t) {
                return t.toUpperCase();
            });
        }
        function formatStyle(t) {
            var r;
            return t ? "string" == typeof t ? (t = t.trim()).split(/\s*;\s*/).reduce(function(e, t) {
                return t && 2 === (t = t.split(/\s*:\s*/)).length && Object.assign(e, _defineProperty({}, toCamelCase(t[0]), t[1])), e;
            }, {}) : "object" === _typeof(t) ? (r = {}, Object.keys(t).forEach(function(e) {
                r[toCamelCase(e)] = t[e];
            }), r) : {} : {};
        }
        function formatClass(t) {
            return t ? t instanceof Array ? t : "string" == typeof t ? (t = t.trim()).split(/\s+/) : "object" === _typeof(t) ? Object.keys(t).filter(function(e) {
                return !!t[e];
            }) : [] : [];
        }
        var _excluded$3 = [
            "ref"
        ];
        function getChildInfo(r, e, o, a, u) {
            var t = r.props || {}, t = (t.ref, _objectWithoutProperties(t, _excluded$3)), c = {}, n = (Object.keys(r.children || {}).forEach(function(t) {
                var n = r.children[t], e = originOptions.react.vueNamedSlotsKey.find(function(e) {
                    return 0 === t.indexOf(e);
                });
                e || "default" === t ? (e = t.replace(new RegExp("^".concat(e)), "").replace(/^default$/, "children"), c[e] = a.call(r.__top__, n(), o, u)) : "function" == typeof n && (c[t] = function() {
                    for(var e = arguments.length, t = new Array(e), r = 0; r < e; r++)t[r] = arguments[r];
                    return n.__reactArgs = t, a(n.apply(this, t), o, u);
                });
            }), {}), i = formatStyle(t.style), s = Array.from(new Set(formatClass(t.class))).join(" ");
            return 0 < Object.keys(i).length && (n.style = i), "" !== s && (n.className = s), Object.assign(t, _objectSpread2(_objectSpread2({}, n), c)), delete t.class, "boolean" == typeof t.ref_for && delete t.ref_for, t;
        }
        function isTextOwner(e) {
            return e.type === Text;
        }
        var random$2 = new _default;
        function DirectiveHOC(e, t) {
            var r;
            return 0 < (null == (r = e.dirs) ? void 0 : r.length) ? (0, react.createElement)(FakeDirective, {
                vnode: e
            }, t) : t;
        }
        var FakeDirective = (()=>{
            function r(e) {
                var t;
                return _classCallCheck(this, r), (t = _callSuper(this, r, [
                    e
                ])).state = {
                    prevVnode: null,
                    savedDirectives: [],
                    ref: null,
                    prevProps: e
                }, t;
            }
            return _inherits(r, react.Component), _createClass(r, [
                {
                    key: "findDirectiveName",
                    value: function(e) {
                        var r = e.dir, n = -1;
                        return [
                            this.state.savedDirectives.find(function(e, t) {
                                if (e.dir === r) return n = t, !0;
                            }),
                            n
                        ];
                    }
                },
                {
                    key: "doDirective",
                    value: function() {
                        var i = this, e = this.state, s = e.savedDirectives;
                        if (!(l = e.ref)) {
                            for(var l = (this._reactInternals || this._reactInternalFiber).child; l && 5 !== l.tag;)l = l.child;
                            if (!l) return;
                            l = l.stateNode;
                        }
                        var p = this.props.vnode, e = p.dirs;
                        e && (e.forEach(function(e) {
                            var t, r, n, o, a, u, c;
                            e && (c = (t = _slicedToArray(i.findDirectiveName(e), 2))[0], t = t[1], r = (a = e.dir).created, n = a.beforeMount, o = a.mounted, u = a.beforeUpdate, a = a.updated, c ? (s[t] = _objectSpread2(_objectSpread2(_objectSpread2({}, c), e), {}, {
                                oldValue: c.oldValue
                            }), c = [
                                l,
                                s[t],
                                p,
                                i.state.prevVnode
                            ], null != u && u.apply(null, c), null != a && a.apply(null, c), s[t].oldValue = e.value) : (s.push(e), u = [
                                l,
                                e,
                                p,
                                null
                            ], null != r && r.apply(null, u), null != n && n.apply(null, u), null != o && o.apply(null, u), e.oldValue = e.value));
                        }), this.setState({
                            prevVnode: _objectSpread2({}, p),
                            savedDirectives: s,
                            ref: l
                        }));
                    }
                },
                {
                    key: "componentDidMount",
                    value: function() {
                        this.doDirective();
                    }
                },
                {
                    key: "componentDidUpdate",
                    value: function(e) {
                        e.vnode !== this.props.vnode && this.doDirective();
                    }
                },
                {
                    key: "componentWillUnmount",
                    value: function() {
                        var a = this, u = this.props.vnode, e = this.state, c = e.savedDirectives, i = e.ref, s = e.prevVnode, e = u.dirs;
                        e && (e.forEach(function(e) {
                            var t, r, n, o;
                            e && (t = (o = _slicedToArray(a.findDirectiveName(e), 2))[0]) && (r = (n = e.dir).beforeUnmount, n = n.unmounted, c[o[1]] = _objectSpread2(_objectSpread2({}, t), e), o = [
                                i,
                                t,
                                u,
                                s
                            ], null != r && r.apply(null, o), null != n) && n.apply(null, o);
                        }), this.setState({
                            prevVnode: _objectSpread2({}, u),
                            savedDirectives: c
                        }));
                    }
                },
                {
                    key: "render",
                    value: function() {
                        var e = this.props;
                        e.vnode;
                        return e.children;
                    }
                }
            ]);
        })();
        function couldBeClass(e, t) {
            var r;
            return "function" == typeof e && (r = e.toString(), void 0 !== e.prototype) && e.prototype.constructor === e && ("class" == r.slice(0, 5) || 2 <= Object.getOwnPropertyNames(e.prototype).length || !/^function\s+\(|^function\s+anonymous\(/.test(r) && (!(!t || !/^function\s+[A-Z]/.test(r)) || !!/\b\(this\b|\bthis[\.\[]\b/.test(r) && (!(t && !/classCallCheck\(this/.test(r)) || /^function\sdefault_\d+\s*\(/.test(r))));
        }
        function resolveRef(o, r) {
            var e, n, t, a;
            return "function" != typeof (null == (t = o.type) ? void 0 : t.originReactComponent) || couldBeClass(null == (t = o.type) ? void 0 : t.originReactComponent) ? (null != (t = o.ref) && t.k ? (e = null == (t = o.ref) ? void 0 : t.k, n = null == (t = o.ref) ? void 0 : t.r) : e = null == (t = o.ref) ? void 0 : t.r, e && "string" == typeof e && (a = e, e = function(e) {
                var t;
                null != (t = o.ref) && null != (t = t.i) && t.refs && ((t = _objectSpread2({}, o.ref.i.refs))[a] = e, o.ref.i.refs = t), n ? n.value = e : o.ref.i.setupState && a in o.ref.i.setupState && (o.ref.i.setupState[a] = e), e && (e.__syncUpdateProps = function() {
                    r.__top__ && (o.__extraData = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, r.__top__.__syncUpdateProps({}));
                });
            }, e = new Proxy(e, {
                get: function(e, t) {
                    return e[t];
                },
                set: function(e, t, r) {
                    var n;
                    return null != (n = o.ref) && null != (n = n.i) && n.refs && a in (null == (n = o.ref) || null == (n = n.i) ? void 0 : n.refs) && ((n = _objectSpread2({}, o.ref.i.refs))[t] = r, o.ref.i.refs = n), r;
                }
            })), e) : null;
        }
        function addScopeId(t, e) {
            return !e || e instanceof Array && 0 === e.length || ("string" == typeof e && (e = [
                e
            ]), (t = _objectSpread2({}, t)).props = _objectSpread2({}, t.props), e.forEach(function(e) {
                t.props[e] = "";
            })), t;
        }
        var _excluded$4 = [
            "style",
            "class"
        ];
        function takeVueDomInReact(e, t, r, n, o, a, u) {
            var c, i, s;
            return "all" === t || t instanceof Array || (t = t ? [
                t
            ] : []), e.type === runtime_core_esm_bundler_Fragment ? o.call(u, e.children, r, a) : "string" == typeof e.type && ("all" === t || -1 < t.indexOf(e.type)) ? (t = resolveRef(e), s = (i = e.props || {}).style, c = i.class, i = _objectSpread2(_objectSpread2({}, _objectWithoutProperties(i, _excluded$4)), {}, {
                style: formatStyle(s),
                className: Array.from(new Set(formatClass(c))).join(" ")
            }, t ? {
                ref: t
            } : {}), (s = e.children || i.children) && ((s = -1 < [
                "string",
                "number"
            ].indexOf(_typeof(s)) ? [
                s
            ] : _toConsumableArray(s)).__top__ = u), DirectiveHOC(e, addScopeId(react.createElement(e.type, i, o.call(u, s, r, a)), e.scopeId))) : r([
                e
            ], null, n);
        }
        function pureInterceptProps() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, a = 1 < arguments.length ? arguments[1] : void 0, u = 2 < arguments.length ? arguments[2] : void 0;
            return u.__syncUpdateForPureReactInVue && Object.keys(u.__syncUpdateForPureReactInVue).map(function(n) {
                var o;
                e[n] && "function" == typeof e[n] && a.__top__ && (o = e[n], e[n] = function() {
                    for(var e = arguments.length, t = new Array(e), r = 0; r < e; r++)t[r] = arguments[r];
                    a.__extraData = u.__syncUpdateForPureReactInVue[n].apply(this, t), a.__top__.__veaurySyncUpdateProps__({}), a.__top__.macroTaskUpdate = !0, o.apply(this, t), a.__top__ && Promise.resolve().then(function() {
                        a.__extraData = null, a.__top__.__veauryMountReactComponent__(!0);
                    });
                });
            }), e;
        }
        function setChildKey(e, t, r) {
            return (e = e instanceof Array && 1 === e.length ? e[0] : e) instanceof Array || null != e.key || !(1 < t.length) || ((e = _objectSpread2({}, e)).key = "_key_".concat(r)), e;
        }
        function getDistinguishReactOrVue(e) {
            var l = e.reactComponents, p = e.domTags, e = e.division, _ = void 0 === e || e;
            return function a(u, c, i) {
                var s;
                return u && u.forEach ? (u.__top__ || (u.__top__ = this), s = [], u.forEach(function(e, t) {
                    if (e && e.type !== Comment) {
                        if (null == (o = e.type) || !o.originReactComponent) return e.$$typeof || "string" == typeof e || "number" == typeof e ? void s.push(e) : isTextOwner(e) ? void ("" !== e.children.trim() && s.push(e.children.trim())) : void (e.type && (addScopeId(o = setChildKey(takeVueDomInReact(e, p, c, _, a, i, u.__top__), u, t), e.scopeId), s.push(o)));
                        var r, n, o = e.type.originReactComponent;
                        addScopeId(r = setChildKey(r = "all" === (l = "all" === l || l instanceof Array ? l : [
                            l
                        ]) || -1 < l.indexOf(o) ? (e.__top__ = u.__top__, r = getChildInfo(e, "_key_".concat(t), c, a, i), n = resolveRef(e, u), e.children && (e.children.__top__ = u.__top__), DirectiveHOC(e, react.createElement(o, _objectSpread2(_objectSpread2(_objectSpread2({}, pureInterceptProps(r, e, o)), e.__extraData || {}), n ? {
                            ref: n
                        } : {})))) : isTextOwner(e) ? e.text : takeVueDomInReact(e, p, c, _, a, i), u, t), e.scopeId), s.push(r);
                    }
                }), 1 === s.length ? s[0] : s) : u;
            };
        }
        var NoWrapFunction = getDistinguishReactOrVue({
            reactComponents: "all",
            domTags: "all"
        });
        function applyPureReactInVue(e, t) {
            return veaury_esm_transformer(e, {
                combinedOption: _objectSpread2({
                    pureTransformer: !0,
                    defaultSlotsFormatter: NoWrapFunction,
                    defaultPropsFormatter: function(t, o, a) {
                        var r = {};
                        return Object.keys(t).forEach(function(e) {
                            var n = t[e];
                            n && (n.vueFunction ? (r[e] = function() {
                                for(var e = arguments.length, t = new Array(e), r = 0; r < e; r++)t[r] = arguments[r];
                                return NoWrapFunction(n.vueFunction.apply(this, t), o, a);
                            }, Object.defineProperty(r[e], "length", {
                                get: function() {
                                    return n.vueFunction.length;
                                }
                            })) : n.vueSlot && (r[e] = NoWrapFunction(n.vueSlot, o, a)));
                        }), Object.assign(t, r);
                    }
                }, t)
            });
        }
        var NoWrapFunction$1 = getDistinguishReactOrVue({
            reactComponents: "all",
            domTags: "all"
        });
        function getReactNode(e) {
            return e = (e = [
                e = "function" == typeof e ? e() : e
            ]).flat(1 / 0), NoWrapFunction$1(e, function(e) {
                return React__default.createElement(VueContainer, {
                    node: e
                });
            });
        }
        function transformer$1(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            t.globalName;
            return applyVueInReact(e, t.combinedOption || {});
        }
        var _excluded$5 = [
            "ref",
            "children",
            "v-slots"
        ];
        function getChildInfo$1(e, t, o, a, u) {
            var e = e.props || {}, r = (e.ref, e.children), n = e["v-slots"], c = void 0 === n ? {} : n, n = _objectWithoutProperties(e, _excluded$5), i = (r && ("object" !== _typeof(r) || r instanceof Array || r.$$typeof ? c.default = r : c = r), null), e = (Object.keys(c || {}).forEach(function(e) {
                var n = c[e];
                (i = i || {})[e] = function() {
                    if ("function" == typeof n) {
                        for(var e = arguments.length, t = new Array(e), r = 0; r < e; r++)t[r] = arguments[r];
                        n = n.apply(this, t);
                    }
                    return a(n, o, u);
                };
            }), {}), r = formatStyle(n.style), s = Array.from(new Set(formatClass(n.className))).join(" ");
            return 0 < Object.keys(r).length && (e.style = r), "" !== s && (e.class = s), Object.assign(n, _objectSpread2({}, e)), delete n.className, {
                props: n = parseVModel(n),
                slots: i
            };
        }
        function resolveRef$1(t) {
            var e = t.ref;
            if (e) return "object" === _typeof(e) ? function(e) {
                t.ref.current = e;
            } : "function" == typeof e ? e : void 0;
        }
        var _excluded$6 = [
            "style",
            "class",
            "children"
        ];
        function takeReactDomInVue(e, t, r, n, o, a) {
            var u, c, i, s;
            return "all" === t || t instanceof Array || (t = t ? [
                t
            ] : []), e.type === react.Fragment ? o(null == (u = e.props) ? void 0 : u.children, r) : "string" == typeof e.type && ("all" === t || -1 < t.indexOf(e.type)) ? (u = resolveRef$1(e), s = (t = e.props || {}).style, i = t.class, c = t.children, t = _objectWithoutProperties(t, _excluded$6), i = Array.from(new Set(formatClass(i))).join(" "), s = formatStyle(s), t = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, t), 0 === Object.keys(s).length ? {} : {
                style: s
            }), i ? {
                className: i
            } : {}), u ? {
                ref: u
            } : {}), 0 === Object.keys(t).length && (t = null), (s = c) && ((s = -1 < [
                "string",
                "number"
            ].indexOf(_typeof(s)) ? [
                s
            ] : s instanceof Array ? _toConsumableArray(s) : _objectSpread2({}, s)).__top__ = a), runtime_core_esm_bundler_h(e.type, t, o(s, r))) : r([
                e
            ], null, n);
        }
        function getDistinguishReactOrVue$1(e) {
            var i = e.vueComponents, s = e.domTags, e = e.division, l = void 0 === e || e;
            return function o(a, u) {
                if (null == a) return a;
                a instanceof Array || (a = [
                    a
                ]);
                var c = [];
                return a.forEach(function(e, t) {
                    if ((null == (r = e.type) || !r.originVueComponent) && e.type !== VueContainer) return e.__v_isVNode || "string" == typeof e || "number" == typeof e ? void c.push(e) : void (e.type && (r = takeReactDomInVue(e, s, u, l, o, a.__top__), c.push(r)));
                    var r = e.type.originVueComponent;
                    if (e.type === VueContainer) {
                        if (!e.props.component) return void c.push(e.props.node);
                        r = e.props.component, e = _objectSpread2({}, e);
                        var n = _objectSpread2({}, e.props);
                        delete n.component, e.props = n;
                    }
                    r = "all" === (i = "all" === i || i instanceof Array ? i : [
                        i
                    ]) || -1 < i.indexOf(r) ? ((e = _objectSpread2({}, e)).__top__ = a.__top__, t = (n = getChildInfo$1(e, "_key_".concat(t), u, o)).props, n = n.slots, resolveRef$1(e), e.children && (e.children.__top__ = a.__top__), runtime_core_esm_bundler_h(r, _objectSpread2({}, t), n)) : takeReactDomInVue(e, s, u, l, o), c.push(r);
                }), 1 === (c = c.flat(1 / 0)).length ? c[0] : c;
            };
        }
        var NoWrapFunction$2 = getDistinguishReactOrVue$1({
            vueComponents: "all",
            domTags: "all"
        });
        function applyPureVueInReact(e, t) {
            return transformer$1(e, {
                combinedOption: _objectSpread2({
                    pureTransformer: !0,
                    defaultSlotsFormatter: NoWrapFunction$2
                }, t)
            });
        }
        var NoWrapFunction$3 = getDistinguishReactOrVue$1({
            reactComponents: "all",
            domTags: "all"
        });
        function getVNode(e) {
            return 1 === (e = (e = [
                e = "function" == typeof e ? e() : e
            ]).flat(1 / 0)).length && (e = e[0]), NoWrapFunction$3(e, function(e) {
                return h(WrapVue, {
                    node: e
                });
            });
        }
        function lazyReactInVue$1(e, t) {
            function r() {
                return n().then(function(e) {
                    return applyPureReactInVue(e.default, t);
                });
            }
            var n = e;
            "object" === _typeof(e) && (n = e.loader);
            return defineAsyncComponent("object" === _typeof(e) ? _objectSpread2(_objectSpread2({}, e), {}, {
                loader: r
            }) : r);
        }
        function lazyVueInReact$1(e, t) {
            return lazy(function() {
                return e().then(function(e) {
                    return {
                        default: applyPureVueInReact(e.default, t)
                    };
                });
            });
        }
        var _excluded$7 = null;
        function createCrossingProviderForReactInVue$1(e) {
            var r = createContext({});
            return [
                function() {
                    return useContext(r);
                },
                applyPureReactInVue(function(e) {
                    var t = e.children, e = _objectWithoutProperties(e, _excluded$7);
                    return createElement(r.Provider, {
                        value: _objectSpread2({}, e)
                    }, t);
                }, {
                    useInjectPropsFromWrapper: e
                }),
                r
            ];
        }
        var random$3 = new _default;
        function createCrossingProviderForVueInReact$1(e, r) {
            return r = r || random$3.getRandomId("veauryCrossingProvide_"), [
                function() {
                    return inject(r);
                },
                applyPureVueInReact({
                    setup: function(e, t) {
                        return provide(r, t.attrs), function() {
                            return h(t.slots.default);
                        };
                    }
                }, {
                    useInjectPropsFromWrapper: e
                })
            ];
        }
        function injectSyncUpdateForPureReactInVue(e, t) {
            e.__syncUpdateForPureReactInVue || (e.__syncUpdateForPureReactInVue = {}), Object.assign(e.__syncUpdateForPureReactInVue, t);
        }
        var jsx_runtime = __webpack_require__("./node_modules/.pnpm/react@19.0.0/node_modules/react/jsx-runtime.js");
        const Button = ()=>/*#__PURE__*/ (0, jsx_runtime.jsx)("button", {
                children: "123"
            });
        class Runtime {
            constructor(options){
                (0, runtime.init)(options);
            }
            loadRemoteComponent(componentName) {
                console.log(componentName);
                return {
                    loader: async ()=>{
                        const mod = {
                            default: applyPureReactInVue(Button)
                        };
                        console.log(mod);
                        await new Promise((resolve)=>setTimeout(resolve, 1000));
                        return mod;
                    },
                    loadingComponent: ()=>runtime_core_esm_bundler_h("div", {}, "Loading..."),
                    delay: 100
                };
            }
        }
        const vruntime_rslib_entry_ = Runtime;
        return __webpack_exports__;
    })());
