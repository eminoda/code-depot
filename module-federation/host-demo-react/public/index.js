/*! For license information please see index.js.LICENSE.txt */
(function(root, factory) {
    if ('object' == typeof exports && 'object' == typeof module) module.exports = factory();
    else if ('function' == typeof define && define.amd) define([], factory);
    else if ('object' == typeof exports) exports["Runtime"] = factory();
    else root["Runtime"] = factory();
})(globalThis, ()=>(()=>{
        "use strict";
        var __webpack_modules__ = {
            "./node_modules/.pnpm/@module-federation+error-codes@0.8.3/node_modules/@module-federation/error-codes/dist/index.cjs.js": function(__unused_webpack_module, exports1) {
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
            "./node_modules/.pnpm/@module-federation+runtime-tools@0.8.3/node_modules/@module-federation/runtime-tools/dist/runtime.cjs.js": function(__unused_webpack_module, exports1, __webpack_require__) {
                var runtime = __webpack_require__("./node_modules/.pnpm/@module-federation+runtime@0.8.3/node_modules/@module-federation/runtime/dist/index.cjs.js");
                Object.keys(runtime).forEach(function(k) {
                    if ('default' !== k && !Object.prototype.hasOwnProperty.call(exports1, k)) Object.defineProperty(exports1, k, {
                        enumerable: true,
                        get: function() {
                            return runtime[k];
                        }
                    });
                });
            },
            "./node_modules/.pnpm/@module-federation+runtime@0.8.3/node_modules/@module-federation/runtime/dist/index.cjs.js": function(__unused_webpack_module, exports1, __webpack_require__) {
                var polyfills = __webpack_require__("./node_modules/.pnpm/@module-federation+runtime@0.8.3/node_modules/@module-federation/runtime/dist/polyfills.cjs.js");
                var sdk = __webpack_require__("./node_modules/.pnpm/@module-federation+sdk@0.8.3/node_modules/@module-federation/sdk/dist/index.cjs.js");
                var share = __webpack_require__("./node_modules/.pnpm/@module-federation+runtime@0.8.3/node_modules/@module-federation/runtime/dist/share.cjs.js");
                var errorCodes = __webpack_require__("./node_modules/.pnpm/@module-federation+error-codes@0.8.3/node_modules/@module-federation/error-codes/dist/index.cjs.js");
                // Function to match a remote with its name and expose
                // id: pkgName(@federation/app1) + expose(button) = @federation/app1/button
                // id: alias(app1) + expose(button) = app1/button
                // id: alias(app1/utils) + expose(loadash/sort) = app1/utils/loadash/sort
                function matchRemoteWithNameAndExpose(remotes, id) {
                    for (const remote of remotes){
                        // match pkgName
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
                        // match alias
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
                // Function to match a remote with its name or alias
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
                    // Incorporate global plugins
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
                            else import(/* webpackIgnore: true */ /* @vite-ignore */ entry).then(resolve).catch(reject);
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
                    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
                    async get(id, expose, options, remoteSnapshot) {
                        const { loadFactory = true } = options || {
                            loadFactory: true
                        };
                        // Get remoteEntry.js
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
                            // Help to find host instance
                            Object.defineProperty(remoteEntryInitOptions, 'shareScopeMap', {
                                value: localShareScopeMap,
                                // remoteEntryInitOptions will be traversed and assigned during container init, ,so this attribute is not allowed to be traversed
                                enumerable: false
                            });
                            const initContainerOptions = await this.host.hooks.lifecycle.beforeInitContainer.emit({
                                shareScope,
                                // @ts-ignore shareScopeMap will be set by Object.defineProperty
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
                        // get exposeGetter
                        if (!moduleFactory) moduleFactory = await remoteEntryExports.get(expose);
                        share.assert(moduleFactory, `${share.getFMId(this.remoteInfo)} remote don't export ${expose}.`);
                        // keep symbol for module name always one format
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
                            // This parameter is used for bridge debugging
                            defineModuleId(res, id);
                            return res;
                        };
                        return ()=>{
                            const res = moduleFactory();
                            // This parameter is used for bridge debugging
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
                        // eslint-disable-next-line @typescript-eslint/no-this-alias
                        const self = this;
                        this.on(function wrapper(...args) {
                            self.remove(wrapper);
                            // eslint-disable-next-line prefer-spread
                            return fn.apply(null, args);
                        });
                    }
                    emit(...data) {
                        let result;
                        if (this.listeners.size > 0) // eslint-disable-next-line prefer-spread
                        this.listeners.forEach((fn)=>{
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
                                if (false === prev) return false; // Abort process
                                if (i < ls.length) return Promise.resolve(ls[i++].apply(null, data)).then(call);
                                return prev;
                            };
                            result = call();
                        }
                        return Promise.resolve(result);
                    }
                }
                // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
                function checkReturnData(originalData, returnedData) {
                    if (!share.isObject(returnedData)) return false;
                    if (originalData !== returnedData) // eslint-disable-next-line no-restricted-syntax
                    {
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
                        // The plugin's name is mandatory and must be unique
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
                    // eslint-disable-next-line @typescript-eslint/no-shadow
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
                                    cb: ()=>{
                                    // noop
                                    },
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
                                    cb: ()=>{
                                    // noop
                                    },
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
                                    cb: ()=>{
                                    // noop
                                    },
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
                                    cb: ()=>{
                                    // noop
                                    },
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
                                // preloading assets
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
                // name
                // name:version
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
                // Traverse all nodes in moduleInfo and traverse the entire snapshot
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
                // eslint-disable-next-line max-lines-per-function
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
                            // eslint-disable-next-line array-callback-return
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
                                    // eslint-disable-next-line no-constant-condition
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
                            // If the global share does not exist, or the lib function does not exist, it means that the shared has not been loaded yet and can be preloaded.
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
                            // if no version, preload all shared
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
                    // get remote detail info from global
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
                    // eslint-disable-next-line max-lines-per-function
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
                        // In dynamic loadRemote scenarios, incomplete remotesInfo delivery may occur. In such cases, the remotesInfo in the host needs to be completed in the snapshot at runtime.
                        // This ensures the snapshot's integrity and helps the chrome plugin correctly identify all producer modules, ensuring that proxyable producer modules will not be missing.
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
                        // global snapshot includes manifest or module info includes manifest
                        if (globalRemoteSnapshot) {
                            if (sdk.isManifestProvider(globalRemoteSnapshot)) {
                                const remoteEntry = sdk.isBrowserEnv() ? globalRemoteSnapshot.remoteEntry : globalRemoteSnapshot.ssrRemoteEntry || globalRemoteSnapshot.remoteEntry || '';
                                const moduleSnapshot = await this.getManifestJson(remoteEntry, moduleInfo, {});
                                // eslint-disable-next-line @typescript-eslint/no-shadow
                                const globalSnapshotRes = share.setGlobalSnapshotInfoByModuleInfo(polyfills._extends({}, moduleInfo, {
                                    // The global remote may be overridden
                                    // Therefore, set the snapshot key to the global address of the actual request
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
                            // get from manifest.json and merge remote info from remote server
                            const moduleSnapshot = await this.getManifestJson(moduleInfo.entry, moduleInfo, {});
                            // eslint-disable-next-line @typescript-eslint/no-shadow
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
                    // register shared in shareScopeMap
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
                        // This function performs the following steps:
                        // 1. Checks if the currently loaded share already exists, if not, it throws an error
                        // 2. Searches globally for a matching share, if found, it uses it directly
                        // 3. If not found, it retrieves it from the current share and stores the obtained share globally.
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
                        // Assert that shareInfoRes exists, if not, throw an error
                        share.assert(shareInfoRes, `Cannot find ${pkgName} Share in the ${host.options.name}. Please ensure that the ${pkgName} Share parameters have been injected`);
                        // Retrieve from cache
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
                    /**
   * This function initializes the sharing sequence (executed only once per share scope).
   * It accepts one argument, the name of the share scope.
   * If the share scope does not exist, it creates one.
   */ // eslint-disable-next-line @typescript-eslint/member-ordering
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
                        // Creates a new share scope if necessary
                        if (!shareScope[shareScopeName]) shareScope[shareScopeName] = {};
                        // Executes all initialization snippets from all accessible modules
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
                        // TODO: strategy==='version-first' need to be removed in the future
                        if ('version-first' === host.options.shareStrategy || 'version-first' === strategy) host.options.remotes.forEach((remote)=>{
                            if (remote.shareScope === shareScopeName) promises.push(initRemoteModule(remote.name));
                        });
                        return promises;
                    }
                    // The lib function will only be available if the shared set by eager or runtime init is set or the shared is successfully loaded.
                    // 1. If the loaded shared already exists globally, then it will be reused
                    // 2. If lib exists in local shared, it will be used directly
                    // 3. If the local get returns something other than Promise, then it will be used directly
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
                            // not used yet
                            loadShare: new AsyncHook(),
                            resolveShare: new SyncWaterfallHook('resolveShare'),
                            // maybe will change, temporarily for internal use only
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
                    // eslint-disable-next-line max-lines-per-function
                    // eslint-disable-next-line @typescript-eslint/member-ordering
                    async loadRemote(id, options) {
                        const { host } = this;
                        try {
                            const { loadFactory = true } = options || {
                                loadFactory: true
                            };
                            // 1. Validate the parameters of the retrieved module. There are two module request methods: pkgName + expose and alias + expose.
                            // 2. Request the snapshot information of the current host and globally store the obtained snapshot information. The retrieved module information is partially offline and partially online. The online module information will retrieve the modules used online.
                            // 3. Retrieve the detailed information of the current module from global (remoteEntry address, expose resource address)
                            // 4. After retrieving remoteEntry, call the init of the module, and then retrieve the exported content of the module through get
                            // id: pkgName(@federation/app1) + expose(button) = @federation/app1/button
                            // id: alias(app1) + expose(button) = app1/button
                            // id: alias(app1/utils) + expose(loadash/sort) = app1/utils/loadash/sort
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
                    // eslint-disable-next-line @typescript-eslint/member-ordering
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
                                // Validate if alias equals the prefix of remote.name and remote.alias, if so, throw an error
                                // As multi-level path references cannot guarantee unique names, alias being a prefix of remote.name is not supported
                                const findEqual = targetRemotes.find((item)=>{
                                    var _item_alias;
                                    return remote.alias && (item.name.startsWith(remote.alias) || (null == (_item_alias = item.alias) ? void 0 : _item_alias.startsWith(remote.alias)));
                                });
                                share.assert(!findEqual, `The alias ${remote.alias} of remote ${remote.name} is not allowed to be the prefix of ${findEqual && findEqual.name} name or alias`);
                            }
                            // Set the remote entry to a complete path
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
                                // remove registered remote
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
                                    else // @ts-ignore
                                    share.CurrentGlobal[key] = void 0;
                                }
                                const remoteEntryUniqueKey = getRemoteEntryUniqueKey(loadedModule.remoteInfo);
                                if (share.globalLoading[remoteEntryUniqueKey]) delete share.globalLoading[remoteEntryUniqueKey];
                                host.snapshotHandler.manifestCache.delete(remoteInfo.entry);
                                // delete unloaded shared and instance
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
                            // not used yet
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
                    // The lib function will only be available if the shared set by eager or runtime init is set or the shared is successfully loaded.
                    // 1. If the loaded shared already exists globally, then it will be reused
                    // 2. If lib exists in local shared, it will be used directly
                    // 3. If the local get returns something other than Promise, then it will be used directly
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
                    // eslint-disable-next-line max-lines-per-function
                    // eslint-disable-next-line @typescript-eslint/member-ordering
                    async loadRemote(id, options) {
                        return this.remoteHandler.loadRemote(id, options);
                    }
                    // eslint-disable-next-line @typescript-eslint/member-ordering
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
                        // Merge plugin
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
                            // maybe will change, temporarily for internal use only
                            beforeInitContainer: new AsyncWaterfallHook('beforeInitContainer'),
                            // maybe will change, temporarily for internal use only
                            initContainer: new AsyncWaterfallHook('initContainer')
                        });
                        this.version = "0.8.3";
                        this.moduleCache = new Map();
                        this.loaderHook = new PluginSystem({
                            // FIXME: may not be suitable , not open to the public yet
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
                        // TODO: Validate the details of the options
                        // Initialize options with default values
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
                    // Retrieve the same instance with the same name
                    const instance = share.getGlobalFederationInstance(options.name, options.version);
                    if (instance) {
                        // Merge options
                        instance.initOptions(options);
                        if (!FederationInstance) FederationInstance = instance;
                        return instance;
                    }
                    {
                        // Retrieve debug constructor
                        const FederationConstructor = share.getGlobalFederationConstructor() || FederationHost;
                        FederationInstance = new FederationConstructor(options);
                        share.setGlobalFederationInstance(FederationInstance);
                        return FederationInstance;
                    }
                }
                function loadRemote(...args) {
                    share.assert(FederationInstance, 'Please call init first');
                    const loadRemote1 = FederationInstance.loadRemote;
                    // eslint-disable-next-line prefer-spread
                    return loadRemote1.apply(FederationInstance, args);
                }
                function loadShare(...args) {
                    share.assert(FederationInstance, 'Please call init first');
                    // eslint-disable-next-line prefer-spread
                    const loadShare1 = FederationInstance.loadShare;
                    return loadShare1.apply(FederationInstance, args);
                }
                function loadShareSync(...args) {
                    share.assert(FederationInstance, 'Please call init first');
                    const loadShareSync1 = FederationInstance.loadShareSync;
                    // eslint-disable-next-line prefer-spread
                    return loadShareSync1.apply(FederationInstance, args);
                }
                function preloadRemote(...args) {
                    share.assert(FederationInstance, 'Please call init first');
                    // eslint-disable-next-line prefer-spread
                    return FederationInstance.preloadRemote.apply(FederationInstance, args);
                }
                function registerRemotes(...args) {
                    share.assert(FederationInstance, 'Please call init first');
                    // eslint-disable-next-line prefer-spread
                    return FederationInstance.registerRemotes.apply(FederationInstance, args);
                }
                function registerPlugins(...args) {
                    share.assert(FederationInstance, 'Please call init first');
                    // eslint-disable-next-line prefer-spread
                    return FederationInstance.registerPlugins.apply(FederationInstance, args);
                }
                function getInstance() {
                    return FederationInstance;
                }
                // Inject for debug
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
            "./node_modules/.pnpm/@module-federation+runtime@0.8.3/node_modules/@module-federation/runtime/dist/polyfills.cjs.js": function(__unused_webpack_module, exports1) {
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
            "./node_modules/.pnpm/@module-federation+runtime@0.8.3/node_modules/@module-federation/runtime/dist/share.cjs.js": function(__unused_webpack_module, exports1, __webpack_require__) {
                var polyfills = __webpack_require__("./node_modules/.pnpm/@module-federation+runtime@0.8.3/node_modules/@module-federation/runtime/dist/polyfills.cjs.js");
                var sdk = __webpack_require__("./node_modules/.pnpm/@module-federation+sdk@0.8.3/node_modules/@module-federation/sdk/dist/index.cjs.js");
                function getBuilderId() {
                    //@ts-ignore
                    return 'undefined' != typeof FEDERATION_BUILD_IDENTIFIER ? FEDERATION_BUILD_IDENTIFIER : '';
                }
                const LOG_CATEGORY = '[ Federation Runtime ]';
                // FIXME: pre-bundle ?
                const logger = sdk.createLogger(LOG_CATEGORY);
                // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
                // eslint-disable-next-line @typescript-eslint/ban-types
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
                    // @host/ ./button -> @host/button
                    let moduleName;
                    moduleName = name1.endsWith('/') ? name1.slice(0, -1) : name1;
                    if (subPath.startsWith('.')) subPath = subPath.slice(1);
                    moduleName += subPath;
                    return moduleName;
                };
                const CurrentGlobal = 'object' == typeof globalThis ? globalThis : window;
                const nativeGlobal = (()=>{
                    try {
                        // get real window (incase of sandbox)
                        return document.defaultView;
                    } catch (e) {
                        // node env
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
                // This section is to prevent encapsulation by certain microfrontend frameworks. Due to reuse policies, sandbox escapes.
                // The sandbox in the microfrontend does not replicate the value of 'configurable'.
                // If there is no loading content on the global object, this section defines the loading object.
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
                        CurrentGlobal.__FEDERATION__.__DEBUG_CONSTRUCTOR_VERSION__ = "0.8.3";
                    }
                }
                // eslint-disable-next-line @typescript-eslint/ban-types
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
                    // Check if the remote is included in the hostSnapshot
                    const moduleKey = getFMId(moduleInfo);
                    const getModuleInfo = getInfoWithoutType(snapshot, moduleKey).value;
                    // The remoteSnapshot might not include a version
                    if (getModuleInfo && !getModuleInfo.version && 'version' in moduleInfo && moduleInfo['version']) getModuleInfo.version = moduleInfo['version'];
                    if (getModuleInfo) return getModuleInfo;
                    // If the remote is not included in the hostSnapshot, deploy a micro app snapshot
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
                // This function is used to register global plugins.
                // It iterates over the provided plugins and checks if they are already registered.
                // If a plugin is not registered, it is added to the global plugins.
                // If a plugin is already registered, a warning message is logged.
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
                // fork from https://github.com/originjs/vite-plugin-federation/blob/v1.1.12/packages/lib/src/utils/semver/index.ts
                // those constants are based on https://www.rubydoc.info/gems/semantic_range/3.0.0/SemanticRange#BUILDIDENTIFIER-constant
                // Copyright (c)
                // vite-plugin-federation is licensed under Mulan PSL v2.
                // You can use this software according to the terms and conditions of the Mulan PSL v2.
                // You may obtain a copy of Mulan PSL v2 at:
                //      http://license.coscl.org.cn/MulanPSL2
                // THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
                // See the Mulan PSL v2 for more details.
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
                // copy from semver package
                const gte0 = '^\\s*>=\\s*0.0.0\\s*$';
                // fork from https://github.com/originjs/vite-plugin-federation/blob/v1.1.12/packages/lib/src/utils/semver/index.ts
                // Copyright (c)
                // vite-plugin-federation is licensed under Mulan PSL v2.
                // You can use this software according to the terms and conditions of the Mulan PSL v2.
                // You may obtain a copy of Mulan PSL v2 at:
                //      http://license.coscl.org.cn/MulanPSL2
                // THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
                // See the Mulan PSL v2 for more details.
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
                // fork from https://github.com/originjs/vite-plugin-federation/blob/v1.1.12/packages/lib/src/utils/semver/index.ts
                // Copyright (c)
                // vite-plugin-federation is licensed under Mulan PSL v2.
                // You can use this software according to the terms and conditions of the Mulan PSL v2.
                // You may obtain a copy of Mulan PSL v2 at:
                //      http://license.coscl.org.cn/MulanPSL2
                // THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
                // See the Mulan PSL v2 for more details.
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
                                if ('>' === gtlt || '<' === gtlt) // nothing is allowed
                                return '<0.0.0-0';
                                // nothing is forbidden
                                return '*';
                            }
                            if (gtlt && isXPatch) {
                                // replace X with 0
                                if (isXMinor) minor = 0;
                                patch = 0;
                                if ('>' === gtlt) {
                                    // >1 => >=2.0.0
                                    // >1.2 => >=1.3.0
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
                                    // <=0.7.x is actually <0.8.0, since any 0.7.x should pass
                                    // Similarly, <=7.x is actually <8.0.0, etc.
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
                // fork from https://github.com/originjs/vite-plugin-federation/blob/v1.1.12/packages/lib/src/utils/semver/index.ts
                // Copyright (c)
                // vite-plugin-federation is licensed under Mulan PSL v2.
                // You can use this software according to the terms and conditions of the Mulan PSL v2.
                // You may obtain a copy of Mulan PSL v2 at:
                //      http://license.coscl.org.cn/MulanPSL2
                // THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
                // See the Mulan PSL v2 for more details.
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
                            // mean * or x -> all versions
                            return true;
                        default:
                            return false;
                    }
                }
                // fork from https://github.com/originjs/vite-plugin-federation/blob/v1.1.12/packages/lib/src/utils/semver/index.ts
                // Copyright (c)
                // vite-plugin-federation is licensed under Mulan PSL v2.
                // You can use this software according to the terms and conditions of the Mulan PSL v2.
                // You may obtain a copy of Mulan PSL v2 at:
                //      http://license.coscl.org.cn/MulanPSL2
                // THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
                // See the Mulan PSL v2 for more details.
                function parseComparatorString(range) {
                    return pipe(// ^ --> * (any, kinda silly)
                    // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
                    // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
                    // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
                    // ^1.2.3 --> >=1.2.3 <2.0.0-0
                    // ^1.2.0 --> >=1.2.0 <2.0.0-0
                    parseCarets, // ~, ~> --> * (any, kinda silly)
                    // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
                    // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
                    // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
                    // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
                    // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
                    parseTildes, parseXRanges, parseStar)(range);
                }
                function parseRange(range) {
                    return pipe(// `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
                    parseHyphen, // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
                    parseComparatorTrim, // `~ 1.2.3` => `~1.2.3`
                    parseTildeTrim, // `^ 1.2.3` => `^1.2.3`
                    parseCaretTrim)(range.trim()).split(/\s+/).join(' ');
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
                        if (!compare(rangeAtom, versionAtom)) return false; // early return
                    }
                    return true;
                }
                function formatShare(shareArgs, from, name1, shareStrategy) {
                    let get;
                    // eslint-disable-next-line prefer-destructuring
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
                        // default version is '0' https://github.com/webpack/webpack/blob/main/lib/sharing/ProvideSharedModule.js#L136
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
                        //@ts-ignore
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
            "./node_modules/.pnpm/@module-federation+sdk@0.8.3/node_modules/@module-federation/sdk/dist/index.cjs.js": function(__unused_webpack_module, exports1, __webpack_require__) {
                var isomorphicRslog = __webpack_require__("./node_modules/.pnpm/isomorphic-rslog@0.0.6/node_modules/isomorphic-rslog/dist/browser/index.cjs");
                var polyfills = __webpack_require__("./node_modules/.pnpm/@module-federation+sdk@0.8.3/node_modules/@module-federation/sdk/dist/polyfills.cjs.js");
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
                // entry: name:version   version : 1.0.0 | ^1.2.3
                // entry: name:entry  entry:  https://localhost:9000/federation-manifest.json
                const parseEntry = (str, devVerOrUrl, separator = SEPARATOR)=>{
                    const strSplit = str.split(separator);
                    const devVersionOrUrl = 'development' === getProcessEnv()['NODE_ENV'] && devVerOrUrl;
                    const defaultVersion = '*';
                    const isEntry = (s)=>s.startsWith('http') || s.includes(MANIFEST_EXT);
                    // Check if the string starts with a type
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
                        // Apply version rule
                        // devVersionOrUrl => inputVersion => defaultVersion
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
                // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
                // RegExp for version string
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
                // Priority: overrides > remotes
                // eslint-disable-next-line max-lines-per-function
                function generateSnapshotFromManifest(manifest, options = {}) {
                    var _manifest_metaData, _manifest_metaData1;
                    const { remotes = {}, overrides = {}, version } = options;
                    let remoteSnapshot;
                    const getPublicPath = ()=>{
                        if (!('publicPath' in manifest.metaData)) return manifest.metaData.getPublicPath;
                        if ('auto' === manifest.metaData.publicPath && version) // use same implementation as publicPath auto runtime module implements
                        return inferAutoPublicPath(version);
                        return manifest.metaData.publicPath;
                    };
                    const overridesKeys = Object.keys(overrides);
                    let remotesInfo = {};
                    // If remotes are not provided, only the remotes in the manifest will be read
                    if (!Object.keys(remotes).length) {
                        var _manifest_remotes;
                        remotesInfo = (null == (_manifest_remotes = manifest.remotes) ? void 0 : _manifest_remotes.reduce((res, next)=>{
                            let matchedVersion;
                            const name1 = next.federationContainerName;
                            // overrides have higher priority
                            matchedVersion = overridesKeys.includes(name1) ? overrides[name1] : 'version' in next ? next.version : next.entry;
                            res[name1] = {
                                matchedVersion
                            };
                            return res;
                        }, {})) || {};
                    }
                    // If remotes (deploy scenario) are specified, they need to be traversed again
                    Object.keys(remotes).forEach((key)=>remotesInfo[key] = {
                            // overrides will override dependencies
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                    // Transform url1 and url2 into relative paths
                    const relativeUrl1 = url1.replace(REG_EXP, '').replace(/\/$/, '');
                    const relativeUrl2 = url2.replace(REG_EXP, '').replace(/\/$/, '');
                    // Check if the relative paths are identical
                    return relativeUrl1 === relativeUrl2;
                }
                function createScript(info) {
                    // Retrieve the existing script element by its src attribute
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
                        // Prevent memory leaks in IE.
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
                    // <link rel="preload" href="script.js" as="script">
                    // Retrieve the existing script element by its src attribute
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
                        // Prevent memory leaks in IE.
                        if (link) {
                            link.onerror = null;
                            link.onload = null;
                            safeWrapper(()=>{
                                const { needDeleteLink = true } = info;
                                if (needDeleteLink) (null == link ? void 0 : link.parentNode) && link.parentNode.removeChild(link);
                            });
                            if (prev) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                        // @ts-ignore
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
            "./node_modules/.pnpm/@module-federation+sdk@0.8.3/node_modules/@module-federation/sdk/dist/polyfills.cjs.js": function(__unused_webpack_module, exports1) {
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
            "./node_modules/.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom/cjs/react-dom.production.min.js": function(__unused_webpack_module, exports1, __webpack_require__) {
                /**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ /*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/ var aa = __webpack_require__("./node_modules/.pnpm/react@18.3.1/node_modules/react/index.js"), ca = __webpack_require__("./node_modules/.pnpm/scheduler@0.23.2/node_modules/scheduler/index.js");
                function p(a) {
                    for(var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)b += "&args[]=" + encodeURIComponent(arguments[c]);
                    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
                }
                var da = new Set, ea = {};
                function fa(a, b) {
                    ha(a, b);
                    ha(a + "Capture", b);
                }
                function ha(a, b) {
                    ea[a] = b;
                    for(a = 0; a < b.length; a++)da.add(b[a]);
                }
                var ia = !("undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
                function oa(a) {
                    if (ja.call(ma, a)) return !0;
                    if (ja.call(la, a)) return !1;
                    if (ka.test(a)) return ma[a] = !0;
                    la[a] = !0;
                    return !1;
                }
                function pa(a, b, c, d) {
                    if (null !== c && 0 === c.type) return !1;
                    switch(typeof b){
                        case "function":
                        case "symbol":
                            return !0;
                        case "boolean":
                            if (d) return !1;
                            if (null !== c) return !c.acceptsBooleans;
                            a = a.toLowerCase().slice(0, 5);
                            return "data-" !== a && "aria-" !== a;
                        default:
                            return !1;
                    }
                }
                function qa(a, b, c, d) {
                    if (null == b || pa(a, b, c, d)) return !0;
                    if (d) return !1;
                    if (null !== c) switch(c.type){
                        case 3:
                            return !b;
                        case 4:
                            return !1 === b;
                        case 5:
                            return isNaN(b);
                        case 6:
                            return isNaN(b) || 1 > b;
                    }
                    return !1;
                }
                function v(a, b, c, d, e, f, g) {
                    this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
                    this.attributeName = d;
                    this.attributeNamespace = e;
                    this.mustUseProperty = c;
                    this.propertyName = a;
                    this.type = b;
                    this.sanitizeURL = f;
                    this.removeEmptyString = g;
                }
                var z = {};
                "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
                    z[a] = new v(a, 0, !1, a, null, !1, !1);
                });
                [
                    [
                        "acceptCharset",
                        "accept-charset"
                    ],
                    [
                        "className",
                        "class"
                    ],
                    [
                        "htmlFor",
                        "for"
                    ],
                    [
                        "httpEquiv",
                        "http-equiv"
                    ]
                ].forEach(function(a) {
                    var b = a[0];
                    z[b] = new v(b, 1, !1, a[1], null, !1, !1);
                });
                [
                    "contentEditable",
                    "draggable",
                    "spellCheck",
                    "value"
                ].forEach(function(a) {
                    z[a] = new v(a, 2, !1, a.toLowerCase(), null, !1, !1);
                });
                [
                    "autoReverse",
                    "externalResourcesRequired",
                    "focusable",
                    "preserveAlpha"
                ].forEach(function(a) {
                    z[a] = new v(a, 2, !1, a, null, !1, !1);
                });
                "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
                    z[a] = new v(a, 3, !1, a.toLowerCase(), null, !1, !1);
                });
                [
                    "checked",
                    "multiple",
                    "muted",
                    "selected"
                ].forEach(function(a) {
                    z[a] = new v(a, 3, !0, a, null, !1, !1);
                });
                [
                    "capture",
                    "download"
                ].forEach(function(a) {
                    z[a] = new v(a, 4, !1, a, null, !1, !1);
                });
                [
                    "cols",
                    "rows",
                    "size",
                    "span"
                ].forEach(function(a) {
                    z[a] = new v(a, 6, !1, a, null, !1, !1);
                });
                [
                    "rowSpan",
                    "start"
                ].forEach(function(a) {
                    z[a] = new v(a, 5, !1, a.toLowerCase(), null, !1, !1);
                });
                var ra = /[\-:]([a-z])/g;
                function sa(a) {
                    return a[1].toUpperCase();
                }
                "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
                    var b = a.replace(ra, sa);
                    z[b] = new v(b, 1, !1, a, null, !1, !1);
                });
                "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
                    var b = a.replace(ra, sa);
                    z[b] = new v(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
                });
                [
                    "xml:base",
                    "xml:lang",
                    "xml:space"
                ].forEach(function(a) {
                    var b = a.replace(ra, sa);
                    z[b] = new v(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
                });
                [
                    "tabIndex",
                    "crossOrigin"
                ].forEach(function(a) {
                    z[a] = new v(a, 1, !1, a.toLowerCase(), null, !1, !1);
                });
                z.xlinkHref = new v("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
                [
                    "src",
                    "href",
                    "action",
                    "formAction"
                ].forEach(function(a) {
                    z[a] = new v(a, 1, !1, a.toLowerCase(), null, !0, !0);
                });
                function ta(a, b, c, d) {
                    var e = z.hasOwnProperty(b) ? z[b] : null;
                    if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 !== e.type && "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
                }
                var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
                Symbol.for("react.scope");
                Symbol.for("react.debug_trace_mode");
                var Ia = Symbol.for("react.offscreen");
                Symbol.for("react.legacy_hidden");
                Symbol.for("react.cache");
                Symbol.for("react.tracing_marker");
                var Ja = Symbol.iterator;
                function Ka(a) {
                    if (null === a || "object" != typeof a) return null;
                    a = Ja && a[Ja] || a["@@iterator"];
                    return "function" == typeof a ? a : null;
                }
                var A = Object.assign, La;
                function Ma(a) {
                    if (void 0 === La) try {
                        throw Error();
                    } catch (c) {
                        var b = c.stack.trim().match(/\n( *(at )?)/);
                        La = b && b[1] || "";
                    }
                    return "\n" + La + a;
                }
                var Na = !1;
                function Oa(a, b) {
                    if (!a || Na) return "";
                    Na = !0;
                    var c = Error.prepareStackTrace;
                    Error.prepareStackTrace = void 0;
                    try {
                        if (b) {
                            if (b = function() {
                                throw Error();
                            }, Object.defineProperty(b.prototype, "props", {
                                set: function() {
                                    throw Error();
                                }
                            }), "object" == typeof Reflect && Reflect.construct) {
                                try {
                                    Reflect.construct(b, []);
                                } catch (l) {
                                    var d = l;
                                }
                                Reflect.construct(a, [], b);
                            } else {
                                try {
                                    b.call();
                                } catch (l) {
                                    d = l;
                                }
                                a.call(b.prototype);
                            }
                        } else {
                            try {
                                throw Error();
                            } catch (l) {
                                d = l;
                            }
                            a();
                        }
                    } catch (l) {
                        if (l && d && "string" == typeof l.stack) {
                            for(var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h];)h--;
                            for(; 1 <= g && 0 <= h; g--, h--)if (e[g] !== f[h]) {
                                if (1 !== g || 1 !== h) do if (g--, h--, 0 > h || e[g] !== f[h]) {
                                    var k = "\n" + e[g].replace(" at new ", " at ");
                                    a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                                    return k;
                                }
                                while (1 <= g && 0 <= h);
                                break;
                            }
                        }
                    } finally{
                        Na = !1, Error.prepareStackTrace = c;
                    }
                    return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
                }
                function Pa(a) {
                    switch(a.tag){
                        case 5:
                            return Ma(a.type);
                        case 16:
                            return Ma("Lazy");
                        case 13:
                            return Ma("Suspense");
                        case 19:
                            return Ma("SuspenseList");
                        case 0:
                        case 2:
                        case 15:
                            return a = Oa(a.type, !1);
                        case 11:
                            return a = Oa(a.type.render, !1);
                        case 1:
                            return a = Oa(a.type, !0);
                        default:
                            return "";
                    }
                }
                function Qa(a) {
                    if (null == a) return null;
                    if ("function" == typeof a) return a.displayName || a.name || null;
                    if ("string" == typeof a) return a;
                    switch(a){
                        case ya:
                            return "Fragment";
                        case wa:
                            return "Portal";
                        case Aa:
                            return "Profiler";
                        case za:
                            return "StrictMode";
                        case Ea:
                            return "Suspense";
                        case Fa:
                            return "SuspenseList";
                    }
                    if ("object" == typeof a) switch(a.$$typeof){
                        case Ca:
                            return (a.displayName || "Context") + ".Consumer";
                        case Ba:
                            return (a._context.displayName || "Context") + ".Provider";
                        case Da:
                            var b = a.render;
                            a = a.displayName;
                            a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
                            return a;
                        case Ga:
                            return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
                        case Ha:
                            b = a._payload;
                            a = a._init;
                            try {
                                return Qa(a(b));
                            } catch (c) {}
                    }
                    return null;
                }
                function Ra(a) {
                    var b = a.type;
                    switch(a.tag){
                        case 24:
                            return "Cache";
                        case 9:
                            return (b.displayName || "Context") + ".Consumer";
                        case 10:
                            return (b._context.displayName || "Context") + ".Provider";
                        case 18:
                            return "DehydratedFragment";
                        case 11:
                            return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
                        case 7:
                            return "Fragment";
                        case 5:
                            return b;
                        case 4:
                            return "Portal";
                        case 3:
                            return "Root";
                        case 6:
                            return "Text";
                        case 16:
                            return Qa(b);
                        case 8:
                            return b === za ? "StrictMode" : "Mode";
                        case 22:
                            return "Offscreen";
                        case 12:
                            return "Profiler";
                        case 21:
                            return "Scope";
                        case 13:
                            return "Suspense";
                        case 19:
                            return "SuspenseList";
                        case 25:
                            return "TracingMarker";
                        case 1:
                        case 0:
                        case 17:
                        case 2:
                        case 14:
                        case 15:
                            if ("function" == typeof b) return b.displayName || b.name || null;
                            if ("string" == typeof b) return b;
                    }
                    return null;
                }
                function Sa(a) {
                    switch(typeof a){
                        case "boolean":
                        case "number":
                        case "string":
                        case "undefined":
                            return a;
                        case "object":
                            return a;
                        default:
                            return "";
                    }
                }
                function Ta(a) {
                    var b = a.type;
                    return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
                }
                function Ua(a) {
                    var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
                    if (!a.hasOwnProperty(b) && void 0 !== c && "function" == typeof c.get && "function" == typeof c.set) {
                        var e = c.get, f = c.set;
                        Object.defineProperty(a, b, {
                            configurable: !0,
                            get: function() {
                                return e.call(this);
                            },
                            set: function(a) {
                                d = "" + a;
                                f.call(this, a);
                            }
                        });
                        Object.defineProperty(a, b, {
                            enumerable: c.enumerable
                        });
                        return {
                            getValue: function() {
                                return d;
                            },
                            setValue: function(a) {
                                d = "" + a;
                            },
                            stopTracking: function() {
                                a._valueTracker = null;
                                delete a[b];
                            }
                        };
                    }
                }
                function Va(a) {
                    a._valueTracker || (a._valueTracker = Ua(a));
                }
                function Wa(a) {
                    if (!a) return !1;
                    var b = a._valueTracker;
                    if (!b) return !0;
                    var c = b.getValue();
                    var d = "";
                    a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
                    a = d;
                    return a !== c && (b.setValue(a), !0);
                }
                function Xa(a) {
                    a = a || ("undefined" != typeof document ? document : void 0);
                    if (void 0 === a) return null;
                    try {
                        return a.activeElement || a.body;
                    } catch (b) {
                        return a.body;
                    }
                }
                function Ya(a, b) {
                    var c = b.checked;
                    return A({}, b, {
                        defaultChecked: void 0,
                        defaultValue: void 0,
                        value: void 0,
                        checked: null != c ? c : a._wrapperState.initialChecked
                    });
                }
                function Za(a, b) {
                    var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
                    c = Sa(null != b.value ? b.value : c);
                    a._wrapperState = {
                        initialChecked: d,
                        initialValue: c,
                        controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value
                    };
                }
                function ab(a, b) {
                    b = b.checked;
                    null != b && ta(a, "checked", b, !1);
                }
                function bb(a, b) {
                    ab(a, b);
                    var c = Sa(b.value), d = b.type;
                    if (null != c) {
                        if ("number" === d) {
                            if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
                        } else a.value !== "" + c && (a.value = "" + c);
                    } else if ("submit" === d || "reset" === d) {
                        a.removeAttribute("value");
                        return;
                    }
                    b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
                    null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
                }
                function db(a, b, c) {
                    if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
                        var d = b.type;
                        if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
                        b = "" + a._wrapperState.initialValue;
                        c || b === a.value || (a.value = b);
                        a.defaultValue = b;
                    }
                    c = a.name;
                    "" !== c && (a.name = "");
                    a.defaultChecked = !!a._wrapperState.initialChecked;
                    "" !== c && (a.name = c);
                }
                function cb(a, b, c) {
                    if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
                }
                var eb = Array.isArray;
                function fb(a, b, c, d) {
                    a = a.options;
                    if (b) {
                        b = {};
                        for(var e = 0; e < c.length; e++)b["$" + c[e]] = !0;
                        for(c = 0; c < a.length; c++)e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
                    } else {
                        c = "" + Sa(c);
                        b = null;
                        for(e = 0; e < a.length; e++){
                            if (a[e].value === c) {
                                a[e].selected = !0;
                                d && (a[e].defaultSelected = !0);
                                return;
                            }
                            null !== b || a[e].disabled || (b = a[e]);
                        }
                        null !== b && (b.selected = !0);
                    }
                }
                function gb(a, b) {
                    if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
                    return A({}, b, {
                        value: void 0,
                        defaultValue: void 0,
                        children: "" + a._wrapperState.initialValue
                    });
                }
                function hb(a, b) {
                    var c = b.value;
                    if (null == c) {
                        c = b.children;
                        b = b.defaultValue;
                        if (null != c) {
                            if (null != b) throw Error(p(92));
                            if (eb(c)) {
                                if (1 < c.length) throw Error(p(93));
                                c = c[0];
                            }
                            b = c;
                        }
                        null == b && (b = "");
                        c = b;
                    }
                    a._wrapperState = {
                        initialValue: Sa(c)
                    };
                }
                function ib(a, b) {
                    var c = Sa(b.value), d = Sa(b.defaultValue);
                    null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
                    null != d && (a.defaultValue = "" + d);
                }
                function jb(a) {
                    var b = a.textContent;
                    b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
                }
                function kb(a) {
                    switch(a){
                        case "svg":
                            return "http://www.w3.org/2000/svg";
                        case "math":
                            return "http://www.w3.org/1998/Math/MathML";
                        default:
                            return "http://www.w3.org/1999/xhtml";
                    }
                }
                function lb(a, b) {
                    return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
                }
                var mb, nb = function(a) {
                    return "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
                        MSApp.execUnsafeLocalFunction(function() {
                            return a(b, c, d, e);
                        });
                    } : a;
                }(function(a, b) {
                    if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
                    else {
                        mb = mb || document.createElement("div");
                        mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
                        for(b = mb.firstChild; a.firstChild;)a.removeChild(a.firstChild);
                        for(; b.firstChild;)a.appendChild(b.firstChild);
                    }
                });
                function ob(a, b) {
                    if (b) {
                        var c = a.firstChild;
                        if (c && c === a.lastChild && 3 === c.nodeType) {
                            c.nodeValue = b;
                            return;
                        }
                    }
                    a.textContent = b;
                }
                var pb = {
                    animationIterationCount: !0,
                    aspectRatio: !0,
                    borderImageOutset: !0,
                    borderImageSlice: !0,
                    borderImageWidth: !0,
                    boxFlex: !0,
                    boxFlexGroup: !0,
                    boxOrdinalGroup: !0,
                    columnCount: !0,
                    columns: !0,
                    flex: !0,
                    flexGrow: !0,
                    flexPositive: !0,
                    flexShrink: !0,
                    flexNegative: !0,
                    flexOrder: !0,
                    gridArea: !0,
                    gridRow: !0,
                    gridRowEnd: !0,
                    gridRowSpan: !0,
                    gridRowStart: !0,
                    gridColumn: !0,
                    gridColumnEnd: !0,
                    gridColumnSpan: !0,
                    gridColumnStart: !0,
                    fontWeight: !0,
                    lineClamp: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    tabSize: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0,
                    fillOpacity: !0,
                    floodOpacity: !0,
                    stopOpacity: !0,
                    strokeDasharray: !0,
                    strokeDashoffset: !0,
                    strokeMiterlimit: !0,
                    strokeOpacity: !0,
                    strokeWidth: !0
                }, qb = [
                    "Webkit",
                    "ms",
                    "Moz",
                    "O"
                ];
                Object.keys(pb).forEach(function(a) {
                    qb.forEach(function(b) {
                        b = b + a.charAt(0).toUpperCase() + a.substring(1);
                        pb[b] = pb[a];
                    });
                });
                function rb(a, b, c) {
                    return null == b || "boolean" == typeof b || "" === b ? "" : c || "number" != typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
                }
                function sb(a, b) {
                    a = a.style;
                    for(var c in b)if (b.hasOwnProperty(c)) {
                        var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
                        "float" === c && (c = "cssFloat");
                        d ? a.setProperty(c, e) : a[c] = e;
                    }
                }
                var tb = A({
                    menuitem: !0
                }, {
                    area: !0,
                    base: !0,
                    br: !0,
                    col: !0,
                    embed: !0,
                    hr: !0,
                    img: !0,
                    input: !0,
                    keygen: !0,
                    link: !0,
                    meta: !0,
                    param: !0,
                    source: !0,
                    track: !0,
                    wbr: !0
                });
                function ub(a, b) {
                    if (b) {
                        if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
                        if (null != b.dangerouslySetInnerHTML) {
                            if (null != b.children) throw Error(p(60));
                            if ("object" != typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
                        }
                        if (null != b.style && "object" != typeof b.style) throw Error(p(62));
                    }
                }
                function vb(a, b) {
                    if (-1 === a.indexOf("-")) return "string" == typeof b.is;
                    switch(a){
                        case "annotation-xml":
                        case "color-profile":
                        case "font-face":
                        case "font-face-src":
                        case "font-face-uri":
                        case "font-face-format":
                        case "font-face-name":
                        case "missing-glyph":
                            return !1;
                        default:
                            return !0;
                    }
                }
                var wb = null;
                function xb(a) {
                    a = a.target || a.srcElement || window;
                    a.correspondingUseElement && (a = a.correspondingUseElement);
                    return 3 === a.nodeType ? a.parentNode : a;
                }
                var yb = null, zb = null, Ab = null;
                function Bb(a) {
                    if (a = Cb(a)) {
                        if ("function" != typeof yb) throw Error(p(280));
                        var b = a.stateNode;
                        b && (b = Db(b), yb(a.stateNode, a.type, b));
                    }
                }
                function Eb(a) {
                    zb ? Ab ? Ab.push(a) : Ab = [
                        a
                    ] : zb = a;
                }
                function Fb() {
                    if (zb) {
                        var a = zb, b = Ab;
                        Ab = zb = null;
                        Bb(a);
                        if (b) for(a = 0; a < b.length; a++)Bb(b[a]);
                    }
                }
                function Gb(a, b) {
                    return a(b);
                }
                function Hb() {}
                var Ib = !1;
                function Jb(a, b, c) {
                    if (Ib) return a(b, c);
                    Ib = !0;
                    try {
                        return Gb(a, b, c);
                    } finally{
                        if (Ib = !1, null !== zb || null !== Ab) Hb(), Fb();
                    }
                }
                function Kb(a, b) {
                    var c = a.stateNode;
                    if (null === c) return null;
                    var d = Db(c);
                    if (null === d) return null;
                    c = d[b];
                    switch(b){
                        case "onClick":
                        case "onClickCapture":
                        case "onDoubleClick":
                        case "onDoubleClickCapture":
                        case "onMouseDown":
                        case "onMouseDownCapture":
                        case "onMouseMove":
                        case "onMouseMoveCapture":
                        case "onMouseUp":
                        case "onMouseUpCapture":
                        case "onMouseEnter":
                            (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
                            a = !d;
                            break;
                        default:
                            a = !1;
                    }
                    if (a) return null;
                    if (c && "function" != typeof c) throw Error(p(231, b, typeof c));
                    return c;
                }
                var Lb = !1;
                if (ia) try {
                    var Mb = {};
                    Object.defineProperty(Mb, "passive", {
                        get: function() {
                            Lb = !0;
                        }
                    });
                    window.addEventListener("test", Mb, Mb);
                    window.removeEventListener("test", Mb, Mb);
                } catch (a) {
                    Lb = !1;
                }
                function Nb(a, b, c, d, e, f, g, h, k) {
                    var l = Array.prototype.slice.call(arguments, 3);
                    try {
                        b.apply(c, l);
                    } catch (m) {
                        this.onError(m);
                    }
                }
                var Ob = !1, Pb = null, Qb = !1, Rb = null, Sb = {
                    onError: function(a) {
                        Ob = !0;
                        Pb = a;
                    }
                };
                function Tb(a, b, c, d, e, f, g, h, k) {
                    Ob = !1;
                    Pb = null;
                    Nb.apply(Sb, arguments);
                }
                function Ub(a, b, c, d, e, f, g, h, k) {
                    Tb.apply(this, arguments);
                    if (Ob) {
                        if (Ob) {
                            var l = Pb;
                            Ob = !1;
                            Pb = null;
                        } else throw Error(p(198));
                        Qb || (Qb = !0, Rb = l);
                    }
                }
                function Vb(a) {
                    var b = a, c = a;
                    if (a.alternate) for(; b.return;)b = b.return;
                    else {
                        a = b;
                        do b = a, 0 !== (4098 & b.flags) && (c = b.return), a = b.return;
                        while (a);
                    }
                    return 3 === b.tag ? c : null;
                }
                function Wb(a) {
                    if (13 === a.tag) {
                        var b = a.memoizedState;
                        null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
                        if (null !== b) return b.dehydrated;
                    }
                    return null;
                }
                function Xb(a) {
                    if (Vb(a) !== a) throw Error(p(188));
                }
                function Yb(a) {
                    var b = a.alternate;
                    if (!b) {
                        b = Vb(a);
                        if (null === b) throw Error(p(188));
                        return b !== a ? null : a;
                    }
                    for(var c = a, d = b;;){
                        var e = c.return;
                        if (null === e) break;
                        var f = e.alternate;
                        if (null === f) {
                            d = e.return;
                            if (null !== d) {
                                c = d;
                                continue;
                            }
                            break;
                        }
                        if (e.child === f.child) {
                            for(f = e.child; f;){
                                if (f === c) return Xb(e), a;
                                if (f === d) return Xb(e), b;
                                f = f.sibling;
                            }
                            throw Error(p(188));
                        }
                        if (c.return !== d.return) c = e, d = f;
                        else {
                            for(var g = !1, h = e.child; h;){
                                if (h === c) {
                                    g = !0;
                                    c = e;
                                    d = f;
                                    break;
                                }
                                if (h === d) {
                                    g = !0;
                                    d = e;
                                    c = f;
                                    break;
                                }
                                h = h.sibling;
                            }
                            if (!g) {
                                for(h = f.child; h;){
                                    if (h === c) {
                                        g = !0;
                                        c = f;
                                        d = e;
                                        break;
                                    }
                                    if (h === d) {
                                        g = !0;
                                        d = f;
                                        c = e;
                                        break;
                                    }
                                    h = h.sibling;
                                }
                                if (!g) throw Error(p(189));
                            }
                        }
                        if (c.alternate !== d) throw Error(p(190));
                    }
                    if (3 !== c.tag) throw Error(p(188));
                    return c.stateNode.current === c ? a : b;
                }
                function Zb(a) {
                    a = Yb(a);
                    return null !== a ? $b(a) : null;
                }
                function $b(a) {
                    if (5 === a.tag || 6 === a.tag) return a;
                    for(a = a.child; null !== a;){
                        var b = $b(a);
                        if (null !== b) return b;
                        a = a.sibling;
                    }
                    return null;
                }
                var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
                function mc(a) {
                    if (lc && "function" == typeof lc.onCommitFiberRoot) try {
                        lc.onCommitFiberRoot(kc, a, void 0, 128 === (128 & a.current.flags));
                    } catch (b) {}
                }
                var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
                function nc(a) {
                    a >>>= 0;
                    return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
                }
                var rc = 64, sc = 4194304;
                function tc(a) {
                    switch(a & -a){
                        case 1:
                            return 1;
                        case 2:
                            return 2;
                        case 4:
                            return 4;
                        case 8:
                            return 8;
                        case 16:
                            return 16;
                        case 32:
                            return 32;
                        case 64:
                        case 128:
                        case 256:
                        case 512:
                        case 1024:
                        case 2048:
                        case 4096:
                        case 8192:
                        case 16384:
                        case 32768:
                        case 65536:
                        case 131072:
                        case 262144:
                        case 524288:
                        case 1048576:
                        case 2097152:
                            return 4194240 & a;
                        case 4194304:
                        case 8388608:
                        case 16777216:
                        case 33554432:
                        case 67108864:
                            return 130023424 & a;
                        case 134217728:
                            return 134217728;
                        case 268435456:
                            return 268435456;
                        case 536870912:
                            return 536870912;
                        case 1073741824:
                            return 1073741824;
                        default:
                            return a;
                    }
                }
                function uc(a, b) {
                    var c = a.pendingLanes;
                    if (0 === c) return 0;
                    var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = 268435455 & c;
                    if (0 !== g) {
                        var h = g & ~e;
                        0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
                    } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
                    if (0 === d) return 0;
                    if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (4194240 & f))) return b;
                    0 !== (4 & d) && (d |= 16 & c);
                    b = a.entangledLanes;
                    if (0 !== b) for(a = a.entanglements, b &= d; 0 < b;)c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
                    return d;
                }
                function vc(a, b) {
                    switch(a){
                        case 1:
                        case 2:
                        case 4:
                            return b + 250;
                        case 8:
                        case 16:
                        case 32:
                        case 64:
                        case 128:
                        case 256:
                        case 512:
                        case 1024:
                        case 2048:
                        case 4096:
                        case 8192:
                        case 16384:
                        case 32768:
                        case 65536:
                        case 131072:
                        case 262144:
                        case 524288:
                        case 1048576:
                        case 2097152:
                            return b + 5E3;
                        case 4194304:
                        case 8388608:
                        case 16777216:
                        case 33554432:
                        case 67108864:
                            return -1;
                        case 134217728:
                        case 268435456:
                        case 536870912:
                        case 1073741824:
                            return -1;
                        default:
                            return -1;
                    }
                }
                function wc(a, b) {
                    for(var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f;){
                        var g = 31 - oc(f), h = 1 << g, k = e[g];
                        if (-1 === k) {
                            if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
                        } else k <= b && (a.expiredLanes |= h);
                        f &= ~h;
                    }
                }
                function xc(a) {
                    a = -1073741825 & a.pendingLanes;
                    return 0 !== a ? a : 1073741824 & a ? 1073741824 : 0;
                }
                function yc() {
                    var a = rc;
                    rc <<= 1;
                    0 === (4194240 & rc) && (rc = 64);
                    return a;
                }
                function zc(a) {
                    for(var b = [], c = 0; 31 > c; c++)b.push(a);
                    return b;
                }
                function Ac(a, b, c) {
                    a.pendingLanes |= b;
                    536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
                    a = a.eventTimes;
                    b = 31 - oc(b);
                    a[b] = c;
                }
                function Bc(a, b) {
                    var c = a.pendingLanes & ~b;
                    a.pendingLanes = b;
                    a.suspendedLanes = 0;
                    a.pingedLanes = 0;
                    a.expiredLanes &= b;
                    a.mutableReadLanes &= b;
                    a.entangledLanes &= b;
                    b = a.entanglements;
                    var d = a.eventTimes;
                    for(a = a.expirationTimes; 0 < c;){
                        var e = 31 - oc(c), f = 1 << e;
                        b[e] = 0;
                        d[e] = -1;
                        a[e] = -1;
                        c &= ~f;
                    }
                }
                function Cc(a, b) {
                    var c = a.entangledLanes |= b;
                    for(a = a.entanglements; c;){
                        var d = 31 - oc(c), e = 1 << d;
                        e & b | a[d] & b && (a[d] |= b);
                        c &= ~e;
                    }
                }
                var C = 0;
                function Dc(a) {
                    a &= -a;
                    return 1 < a ? 4 < a ? 0 !== (268435455 & a) ? 16 : 536870912 : 4 : 1;
                }
                var Ec, Fc, Gc, Hc, Ic, Jc = !1, Kc = [], Lc = null, Mc = null, Nc = null, Oc = new Map, Pc = new Map, Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
                function Sc(a, b) {
                    switch(a){
                        case "focusin":
                        case "focusout":
                            Lc = null;
                            break;
                        case "dragenter":
                        case "dragleave":
                            Mc = null;
                            break;
                        case "mouseover":
                        case "mouseout":
                            Nc = null;
                            break;
                        case "pointerover":
                        case "pointerout":
                            Oc.delete(b.pointerId);
                            break;
                        case "gotpointercapture":
                        case "lostpointercapture":
                            Pc.delete(b.pointerId);
                    }
                }
                function Tc(a, b, c, d, e, f) {
                    if (null === a || a.nativeEvent !== f) return a = {
                        blockedOn: b,
                        domEventName: c,
                        eventSystemFlags: d,
                        nativeEvent: f,
                        targetContainers: [
                            e
                        ]
                    }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
                    a.eventSystemFlags |= d;
                    b = a.targetContainers;
                    null !== e && -1 === b.indexOf(e) && b.push(e);
                    return a;
                }
                function Uc(a, b, c, d, e) {
                    switch(b){
                        case "focusin":
                            return Lc = Tc(Lc, a, b, c, d, e), !0;
                        case "dragenter":
                            return Mc = Tc(Mc, a, b, c, d, e), !0;
                        case "mouseover":
                            return Nc = Tc(Nc, a, b, c, d, e), !0;
                        case "pointerover":
                            var f = e.pointerId;
                            Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
                            return !0;
                        case "gotpointercapture":
                            return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), !0;
                    }
                    return !1;
                }
                function Vc(a) {
                    var b = Wc(a.target);
                    if (null !== b) {
                        var c = Vb(b);
                        if (null !== c) {
                            if (b = c.tag, 13 === b) {
                                if (b = Wb(c), null !== b) {
                                    a.blockedOn = b;
                                    Ic(a.priority, function() {
                                        Gc(c);
                                    });
                                    return;
                                }
                            } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
                                a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
                                return;
                            }
                        }
                    }
                    a.blockedOn = null;
                }
                function Xc(a) {
                    if (null !== a.blockedOn) return !1;
                    for(var b = a.targetContainers; 0 < b.length;){
                        var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
                        if (null !== c) return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, !1;
                        c = a.nativeEvent;
                        var d = new c.constructor(c.type, c);
                        wb = d;
                        c.target.dispatchEvent(d);
                        wb = null;
                        b.shift();
                    }
                    return !0;
                }
                function Zc(a, b, c) {
                    Xc(a) && c.delete(b);
                }
                function $c() {
                    Jc = !1;
                    null !== Lc && Xc(Lc) && (Lc = null);
                    null !== Mc && Xc(Mc) && (Mc = null);
                    null !== Nc && Xc(Nc) && (Nc = null);
                    Oc.forEach(Zc);
                    Pc.forEach(Zc);
                }
                function ad(a, b) {
                    a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = !0, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
                }
                function bd(a) {
                    function b(b) {
                        return ad(b, a);
                    }
                    if (0 < Kc.length) {
                        ad(Kc[0], a);
                        for(var c = 1; c < Kc.length; c++){
                            var d = Kc[c];
                            d.blockedOn === a && (d.blockedOn = null);
                        }
                    }
                    null !== Lc && ad(Lc, a);
                    null !== Mc && ad(Mc, a);
                    null !== Nc && ad(Nc, a);
                    Oc.forEach(b);
                    Pc.forEach(b);
                    for(c = 0; c < Qc.length; c++)d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
                    for(; 0 < Qc.length && (c = Qc[0], null === c.blockedOn);)Vc(c), null === c.blockedOn && Qc.shift();
                }
                var cd = ua.ReactCurrentBatchConfig, dd = !0;
                function ed(a, b, c, d) {
                    var e = C, f = cd.transition;
                    cd.transition = null;
                    try {
                        C = 1, fd(a, b, c, d);
                    } finally{
                        C = e, cd.transition = f;
                    }
                }
                function gd(a, b, c, d) {
                    var e = C, f = cd.transition;
                    cd.transition = null;
                    try {
                        C = 4, fd(a, b, c, d);
                    } finally{
                        C = e, cd.transition = f;
                    }
                }
                function fd(a, b, c, d) {
                    if (dd) {
                        var e = Yc(a, b, c, d);
                        if (null === e) hd(a, b, d, id, c), Sc(a, d);
                        else if (Uc(e, a, b, c, d)) d.stopPropagation();
                        else if (Sc(a, d), 4 & b && -1 < Rc.indexOf(a)) {
                            for(; null !== e;){
                                var f = Cb(e);
                                null !== f && Ec(f);
                                f = Yc(a, b, c, d);
                                null === f && hd(a, b, d, id, c);
                                if (f === e) break;
                                e = f;
                            }
                            null !== e && d.stopPropagation();
                        } else hd(a, b, d, null, c);
                    }
                }
                var id = null;
                function Yc(a, b, c, d) {
                    id = null;
                    a = xb(d);
                    a = Wc(a);
                    if (null !== a) {
                        if (b = Vb(a), null === b) a = null;
                        else if (c = b.tag, 13 === c) {
                            a = Wb(b);
                            if (null !== a) return a;
                            a = null;
                        } else if (3 === c) {
                            if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
                            a = null;
                        } else b !== a && (a = null);
                    }
                    id = a;
                    return null;
                }
                function jd(a) {
                    switch(a){
                        case "cancel":
                        case "click":
                        case "close":
                        case "contextmenu":
                        case "copy":
                        case "cut":
                        case "auxclick":
                        case "dblclick":
                        case "dragend":
                        case "dragstart":
                        case "drop":
                        case "focusin":
                        case "focusout":
                        case "input":
                        case "invalid":
                        case "keydown":
                        case "keypress":
                        case "keyup":
                        case "mousedown":
                        case "mouseup":
                        case "paste":
                        case "pause":
                        case "play":
                        case "pointercancel":
                        case "pointerdown":
                        case "pointerup":
                        case "ratechange":
                        case "reset":
                        case "resize":
                        case "seeked":
                        case "submit":
                        case "touchcancel":
                        case "touchend":
                        case "touchstart":
                        case "volumechange":
                        case "change":
                        case "selectionchange":
                        case "textInput":
                        case "compositionstart":
                        case "compositionend":
                        case "compositionupdate":
                        case "beforeblur":
                        case "afterblur":
                        case "beforeinput":
                        case "blur":
                        case "fullscreenchange":
                        case "focus":
                        case "hashchange":
                        case "popstate":
                        case "select":
                        case "selectstart":
                            return 1;
                        case "drag":
                        case "dragenter":
                        case "dragexit":
                        case "dragleave":
                        case "dragover":
                        case "mousemove":
                        case "mouseout":
                        case "mouseover":
                        case "pointermove":
                        case "pointerout":
                        case "pointerover":
                        case "scroll":
                        case "toggle":
                        case "touchmove":
                        case "wheel":
                        case "mouseenter":
                        case "mouseleave":
                        case "pointerenter":
                        case "pointerleave":
                            return 4;
                        case "message":
                            switch(ec()){
                                case fc:
                                    return 1;
                                case gc:
                                    return 4;
                                case hc:
                                case ic:
                                    return 16;
                                case jc:
                                    return 536870912;
                                default:
                                    return 16;
                            }
                        default:
                            return 16;
                    }
                }
                var kd = null, ld = null, md = null;
                function nd() {
                    if (md) return md;
                    var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
                    for(a = 0; a < c && b[a] === e[a]; a++);
                    var g = c - a;
                    for(d = 1; d <= g && b[c - d] === e[f - d]; d++);
                    return md = e.slice(a, 1 < d ? 1 - d : void 0);
                }
                function od(a) {
                    var b = a.keyCode;
                    "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
                    10 === a && (a = 13);
                    return 32 <= a || 13 === a ? a : 0;
                }
                function pd() {
                    return !0;
                }
                function qd() {
                    return !1;
                }
                function rd(a) {
                    function b(b, d, e, f, g) {
                        this._reactName = b;
                        this._targetInst = e;
                        this.type = d;
                        this.nativeEvent = f;
                        this.target = g;
                        this.currentTarget = null;
                        for(var c in a)a.hasOwnProperty(c) && (b = a[c], this[c] = b ? b(f) : f[c]);
                        this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : !1 === f.returnValue) ? pd : qd;
                        this.isPropagationStopped = qd;
                        return this;
                    }
                    A(b.prototype, {
                        preventDefault: function() {
                            this.defaultPrevented = !0;
                            var a = this.nativeEvent;
                            a && (a.preventDefault ? a.preventDefault() : "unknown" != typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = pd);
                        },
                        stopPropagation: function() {
                            var a = this.nativeEvent;
                            a && (a.stopPropagation ? a.stopPropagation() : "unknown" != typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = pd);
                        },
                        persist: function() {},
                        isPersistent: pd
                    });
                    return b;
                }
                var sd = {
                    eventPhase: 0,
                    bubbles: 0,
                    cancelable: 0,
                    timeStamp: function(a) {
                        return a.timeStamp || Date.now();
                    },
                    defaultPrevented: 0,
                    isTrusted: 0
                }, td = rd(sd), ud = A({}, sd, {
                    view: 0,
                    detail: 0
                }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, {
                    screenX: 0,
                    screenY: 0,
                    clientX: 0,
                    clientY: 0,
                    pageX: 0,
                    pageY: 0,
                    ctrlKey: 0,
                    shiftKey: 0,
                    altKey: 0,
                    metaKey: 0,
                    getModifierState: zd,
                    button: 0,
                    buttons: 0,
                    relatedTarget: function(a) {
                        return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
                    },
                    movementX: function(a) {
                        if ("movementX" in a) return a.movementX;
                        a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
                        return wd;
                    },
                    movementY: function(a) {
                        return "movementY" in a ? a.movementY : xd;
                    }
                }), Bd = rd(Ad), Cd = A({}, Ad, {
                    dataTransfer: 0
                }), Dd = rd(Cd), Ed = A({}, ud, {
                    relatedTarget: 0
                }), Fd = rd(Ed), Gd = A({}, sd, {
                    animationName: 0,
                    elapsedTime: 0,
                    pseudoElement: 0
                }), Hd = rd(Gd), Id = A({}, sd, {
                    clipboardData: function(a) {
                        return "clipboardData" in a ? a.clipboardData : window.clipboardData;
                    }
                }), Jd = rd(Id), Kd = A({}, sd, {
                    data: 0
                }), Ld = rd(Kd), Md = {
                    Esc: "Escape",
                    Spacebar: " ",
                    Left: "ArrowLeft",
                    Up: "ArrowUp",
                    Right: "ArrowRight",
                    Down: "ArrowDown",
                    Del: "Delete",
                    Win: "OS",
                    Menu: "ContextMenu",
                    Apps: "ContextMenu",
                    Scroll: "ScrollLock",
                    MozPrintableKey: "Unidentified"
                }, Nd = {
                    8: "Backspace",
                    9: "Tab",
                    12: "Clear",
                    13: "Enter",
                    16: "Shift",
                    17: "Control",
                    18: "Alt",
                    19: "Pause",
                    20: "CapsLock",
                    27: "Escape",
                    32: " ",
                    33: "PageUp",
                    34: "PageDown",
                    35: "End",
                    36: "Home",
                    37: "ArrowLeft",
                    38: "ArrowUp",
                    39: "ArrowRight",
                    40: "ArrowDown",
                    45: "Insert",
                    46: "Delete",
                    112: "F1",
                    113: "F2",
                    114: "F3",
                    115: "F4",
                    116: "F5",
                    117: "F6",
                    118: "F7",
                    119: "F8",
                    120: "F9",
                    121: "F10",
                    122: "F11",
                    123: "F12",
                    144: "NumLock",
                    145: "ScrollLock",
                    224: "Meta"
                }, Od = {
                    Alt: "altKey",
                    Control: "ctrlKey",
                    Meta: "metaKey",
                    Shift: "shiftKey"
                };
                function Pd(a) {
                    var b = this.nativeEvent;
                    return b.getModifierState ? b.getModifierState(a) : !!(a = Od[a]) && !!b[a];
                }
                function zd() {
                    return Pd;
                }
                var Qd = A({}, ud, {
                    key: function(a) {
                        if (a.key) {
                            var b = Md[a.key] || a.key;
                            if ("Unidentified" !== b) return b;
                        }
                        return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
                    },
                    code: 0,
                    location: 0,
                    ctrlKey: 0,
                    shiftKey: 0,
                    altKey: 0,
                    metaKey: 0,
                    repeat: 0,
                    locale: 0,
                    getModifierState: zd,
                    charCode: function(a) {
                        return "keypress" === a.type ? od(a) : 0;
                    },
                    keyCode: function(a) {
                        return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
                    },
                    which: function(a) {
                        return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
                    }
                }), Rd = rd(Qd), Sd = A({}, Ad, {
                    pointerId: 0,
                    width: 0,
                    height: 0,
                    pressure: 0,
                    tangentialPressure: 0,
                    tiltX: 0,
                    tiltY: 0,
                    twist: 0,
                    pointerType: 0,
                    isPrimary: 0
                }), Td = rd(Sd), Ud = A({}, ud, {
                    touches: 0,
                    targetTouches: 0,
                    changedTouches: 0,
                    altKey: 0,
                    metaKey: 0,
                    ctrlKey: 0,
                    shiftKey: 0,
                    getModifierState: zd
                }), Vd = rd(Ud), Wd = A({}, sd, {
                    propertyName: 0,
                    elapsedTime: 0,
                    pseudoElement: 0
                }), Xd = rd(Wd), Yd = A({}, Ad, {
                    deltaX: function(a) {
                        return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
                    },
                    deltaY: function(a) {
                        return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
                    },
                    deltaZ: 0,
                    deltaMode: 0
                }), Zd = rd(Yd), $d = [
                    9,
                    13,
                    27,
                    32
                ], ae = ia && "CompositionEvent" in window, be = null;
                ia && "documentMode" in document && (be = document.documentMode);
                var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = !1;
                function ge(a, b) {
                    switch(a){
                        case "keyup":
                            return -1 !== $d.indexOf(b.keyCode);
                        case "keydown":
                            return 229 !== b.keyCode;
                        case "keypress":
                        case "mousedown":
                        case "focusout":
                            return !0;
                        default:
                            return !1;
                    }
                }
                function he(a) {
                    a = a.detail;
                    return "object" == typeof a && "data" in a ? a.data : null;
                }
                var ie = !1;
                function je(a, b) {
                    switch(a){
                        case "compositionend":
                            return he(b);
                        case "keypress":
                            if (32 !== b.which) return null;
                            fe = !0;
                            return ee;
                        case "textInput":
                            return a = b.data, a === ee && fe ? null : a;
                        default:
                            return null;
                    }
                }
                function ke(a, b) {
                    if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = !1, a) : null;
                    switch(a){
                        case "paste":
                            return null;
                        case "keypress":
                            if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
                                if (b.char && 1 < b.char.length) return b.char;
                                if (b.which) return String.fromCharCode(b.which);
                            }
                            return null;
                        case "compositionend":
                            return de && "ko" !== b.locale ? null : b.data;
                        default:
                            return null;
                    }
                }
                var le = {
                    color: !0,
                    date: !0,
                    datetime: !0,
                    "datetime-local": !0,
                    email: !0,
                    month: !0,
                    number: !0,
                    password: !0,
                    range: !0,
                    search: !0,
                    tel: !0,
                    text: !0,
                    time: !0,
                    url: !0,
                    week: !0
                };
                function me(a) {
                    var b = a && a.nodeName && a.nodeName.toLowerCase();
                    return "input" === b ? !!le[a.type] : "textarea" === b || !1;
                }
                function ne(a, b, c, d) {
                    Eb(d);
                    b = oe(b, "onChange");
                    0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({
                        event: c,
                        listeners: b
                    }));
                }
                var pe = null, qe = null;
                function re(a) {
                    se(a, 0);
                }
                function te(a) {
                    var b = ue(a);
                    if (Wa(b)) return a;
                }
                function ve(a, b) {
                    if ("change" === a) return b;
                }
                var we = !1;
                if (ia) {
                    var xe;
                    if (ia) {
                        var ye = "oninput" in document;
                        if (!ye) {
                            var ze = document.createElement("div");
                            ze.setAttribute("oninput", "return;");
                            ye = "function" == typeof ze.oninput;
                        }
                        xe = ye;
                    } else xe = !1;
                    we = xe && (!document.documentMode || 9 < document.documentMode);
                }
                function Ae() {
                    pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
                }
                function Be(a) {
                    if ("value" === a.propertyName && te(qe)) {
                        var b = [];
                        ne(b, qe, a, xb(a));
                        Jb(re, b);
                    }
                }
                function Ce(a, b, c) {
                    "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
                }
                function De(a) {
                    if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
                }
                function Ee(a, b) {
                    if ("click" === a) return te(b);
                }
                function Fe(a, b) {
                    if ("input" === a || "change" === a) return te(b);
                }
                function Ge(a, b) {
                    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
                }
                var He = "function" == typeof Object.is ? Object.is : Ge;
                function Ie(a, b) {
                    if (He(a, b)) return !0;
                    if ("object" != typeof a || null === a || "object" != typeof b || null === b) return !1;
                    var c = Object.keys(a), d = Object.keys(b);
                    if (c.length !== d.length) return !1;
                    for(d = 0; d < c.length; d++){
                        var e = c[d];
                        if (!ja.call(b, e) || !He(a[e], b[e])) return !1;
                    }
                    return !0;
                }
                function Je(a) {
                    for(; a && a.firstChild;)a = a.firstChild;
                    return a;
                }
                function Ke(a, b) {
                    var c = Je(a);
                    a = 0;
                    for(var d; c;){
                        if (3 === c.nodeType) {
                            d = a + c.textContent.length;
                            if (a <= b && d >= b) return {
                                node: c,
                                offset: b - a
                            };
                            a = d;
                        }
                        a: {
                            for(; c;){
                                if (c.nextSibling) {
                                    c = c.nextSibling;
                                    break a;
                                }
                                c = c.parentNode;
                            }
                            c = void 0;
                        }
                        c = Je(c);
                    }
                }
                function Le(a, b) {
                    return !!a && !!b && (a === b || (!a || 3 !== a.nodeType) && (b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : !!a.compareDocumentPosition && !!(16 & a.compareDocumentPosition(b))));
                }
                function Me() {
                    for(var a = window, b = Xa(); b instanceof a.HTMLIFrameElement;){
                        try {
                            var c = "string" == typeof b.contentWindow.location.href;
                        } catch (d) {
                            c = !1;
                        }
                        if (c) a = b.contentWindow;
                        else break;
                        b = Xa(a.document);
                    }
                    return b;
                }
                function Ne(a) {
                    var b = a && a.nodeName && a.nodeName.toLowerCase();
                    return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
                }
                function Oe(a) {
                    var b = Me(), c = a.focusedElem, d = a.selectionRange;
                    if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
                        if (null !== d && Ne(c)) {
                            if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
                            else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
                                a = a.getSelection();
                                var e = c.textContent.length, f = Math.min(d.start, e);
                                d = void 0 === d.end ? f : Math.min(d.end, e);
                                !a.extend && f > d && (e = d, d = f, f = e);
                                e = Ke(c, f);
                                var g = Ke(c, d);
                                e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
                            }
                        }
                        b = [];
                        for(a = c; a = a.parentNode;)1 === a.nodeType && b.push({
                            element: a,
                            left: a.scrollLeft,
                            top: a.scrollTop
                        });
                        "function" == typeof c.focus && c.focus();
                        for(c = 0; c < b.length; c++)a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
                    }
                }
                var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = !1;
                function Ue(a, b, c) {
                    var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
                    Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = {
                        start: d.selectionStart,
                        end: d.selectionEnd
                    } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = {
                        anchorNode: d.anchorNode,
                        anchorOffset: d.anchorOffset,
                        focusNode: d.focusNode,
                        focusOffset: d.focusOffset
                    }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({
                        event: b,
                        listeners: d
                    }), b.target = Qe)));
                }
                function Ve(a, b) {
                    var c = {};
                    c[a.toLowerCase()] = b.toLowerCase();
                    c["Webkit" + a] = "webkit" + b;
                    c["Moz" + a] = "moz" + b;
                    return c;
                }
                var We = {
                    animationend: Ve("Animation", "AnimationEnd"),
                    animationiteration: Ve("Animation", "AnimationIteration"),
                    animationstart: Ve("Animation", "AnimationStart"),
                    transitionend: Ve("Transition", "TransitionEnd")
                }, Xe = {}, Ye = {};
                ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
                function Ze(a) {
                    if (Xe[a]) return Xe[a];
                    if (!We[a]) return a;
                    var b = We[a], c;
                    for(c in b)if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
                    return a;
                }
                var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = new Map, ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
                function ff(a, b) {
                    df.set(a, b);
                    fa(b, [
                        a
                    ]);
                }
                for(var gf = 0; gf < ef.length; gf++){
                    var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
                    ff(jf, "on" + kf);
                }
                ff($e, "onAnimationEnd");
                ff(af, "onAnimationIteration");
                ff(bf, "onAnimationStart");
                ff("dblclick", "onDoubleClick");
                ff("focusin", "onFocus");
                ff("focusout", "onBlur");
                ff(cf, "onTransitionEnd");
                ha("onMouseEnter", [
                    "mouseout",
                    "mouseover"
                ]);
                ha("onMouseLeave", [
                    "mouseout",
                    "mouseover"
                ]);
                ha("onPointerEnter", [
                    "pointerout",
                    "pointerover"
                ]);
                ha("onPointerLeave", [
                    "pointerout",
                    "pointerover"
                ]);
                fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
                fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
                fa("onBeforeInput", [
                    "compositionend",
                    "keypress",
                    "textInput",
                    "paste"
                ]);
                fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
                fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
                fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
                var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
                function nf(a, b, c) {
                    var d = a.type || "unknown-event";
                    a.currentTarget = c;
                    Ub(d, b, void 0, a);
                    a.currentTarget = null;
                }
                function se(a, b) {
                    b = 0 !== (4 & b);
                    for(var c = 0; c < a.length; c++){
                        var d = a[c], e = d.event;
                        d = d.listeners;
                        a: {
                            var f = void 0;
                            if (b) for(var g = d.length - 1; 0 <= g; g--){
                                var h = d[g], k = h.instance, l = h.currentTarget;
                                h = h.listener;
                                if (k !== f && e.isPropagationStopped()) break a;
                                nf(e, h, l);
                                f = k;
                            }
                            else for(g = 0; g < d.length; g++){
                                h = d[g];
                                k = h.instance;
                                l = h.currentTarget;
                                h = h.listener;
                                if (k !== f && e.isPropagationStopped()) break a;
                                nf(e, h, l);
                                f = k;
                            }
                        }
                    }
                    if (Qb) throw a = Rb, Qb = !1, Rb = null, a;
                }
                function D(a, b) {
                    var c = b[of];
                    void 0 === c && (c = b[of] = new Set);
                    var d = a + "__bubble";
                    c.has(d) || (pf(b, a, 2, !1), c.add(d));
                }
                function qf(a, b, c) {
                    var d = 0;
                    b && (d |= 4);
                    pf(c, a, d, b);
                }
                var rf = "_reactListening" + Math.random().toString(36).slice(2);
                function sf(a) {
                    if (!a[rf]) {
                        a[rf] = !0;
                        da.forEach(function(b) {
                            "selectionchange" !== b && (mf.has(b) || qf(b, !1, a), qf(b, !0, a));
                        });
                        var b = 9 === a.nodeType ? a : a.ownerDocument;
                        null === b || b[rf] || (b[rf] = !0, qf("selectionchange", !1, b));
                    }
                }
                function pf(a, b, c, d) {
                    switch(jd(b)){
                        case 1:
                            var e = ed;
                            break;
                        case 4:
                            e = gd;
                            break;
                        default:
                            e = fd;
                    }
                    c = e.bind(null, b, c, a);
                    e = void 0;
                    Lb && ("touchstart" === b || "touchmove" === b || "wheel" === b) && (e = !0);
                    d ? void 0 !== e ? a.addEventListener(b, c, {
                        capture: !0,
                        passive: e
                    }) : a.addEventListener(b, c, !0) : void 0 !== e ? a.addEventListener(b, c, {
                        passive: e
                    }) : a.addEventListener(b, c, !1);
                }
                function hd(a, b, c, d, e) {
                    var f = d;
                    if (0 === (1 & b) && 0 === (2 & b) && null !== d) a: for(;;){
                        if (null === d) return;
                        var g = d.tag;
                        if (3 === g || 4 === g) {
                            var h = d.stateNode.containerInfo;
                            if (h === e || 8 === h.nodeType && h.parentNode === e) break;
                            if (4 === g) for(g = d.return; null !== g;){
                                var k = g.tag;
                                if (3 === k || 4 === k) {
                                    if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
                                }
                                g = g.return;
                            }
                            for(; null !== h;){
                                g = Wc(h);
                                if (null === g) return;
                                k = g.tag;
                                if (5 === k || 6 === k) {
                                    d = f = g;
                                    continue a;
                                }
                                h = h.parentNode;
                            }
                        }
                        d = d.return;
                    }
                    Jb(function() {
                        var d = f, e = xb(c), g = [];
                        a: {
                            var h = df.get(a);
                            if (void 0 !== h) {
                                var k = td, n = a;
                                switch(a){
                                    case "keypress":
                                        if (0 === od(c)) break a;
                                    case "keydown":
                                    case "keyup":
                                        k = Rd;
                                        break;
                                    case "focusin":
                                        n = "focus";
                                        k = Fd;
                                        break;
                                    case "focusout":
                                        n = "blur";
                                        k = Fd;
                                        break;
                                    case "beforeblur":
                                    case "afterblur":
                                        k = Fd;
                                        break;
                                    case "click":
                                        if (2 === c.button) break a;
                                    case "auxclick":
                                    case "dblclick":
                                    case "mousedown":
                                    case "mousemove":
                                    case "mouseup":
                                    case "mouseout":
                                    case "mouseover":
                                    case "contextmenu":
                                        k = Bd;
                                        break;
                                    case "drag":
                                    case "dragend":
                                    case "dragenter":
                                    case "dragexit":
                                    case "dragleave":
                                    case "dragover":
                                    case "dragstart":
                                    case "drop":
                                        k = Dd;
                                        break;
                                    case "touchcancel":
                                    case "touchend":
                                    case "touchmove":
                                    case "touchstart":
                                        k = Vd;
                                        break;
                                    case $e:
                                    case af:
                                    case bf:
                                        k = Hd;
                                        break;
                                    case cf:
                                        k = Xd;
                                        break;
                                    case "scroll":
                                        k = vd;
                                        break;
                                    case "wheel":
                                        k = Zd;
                                        break;
                                    case "copy":
                                    case "cut":
                                    case "paste":
                                        k = Jd;
                                        break;
                                    case "gotpointercapture":
                                    case "lostpointercapture":
                                    case "pointercancel":
                                    case "pointerdown":
                                    case "pointermove":
                                    case "pointerout":
                                    case "pointerover":
                                    case "pointerup":
                                        k = Td;
                                }
                                var t = 0 !== (4 & b), J = !t && "scroll" === a, x = t ? null !== h ? h + "Capture" : null : h;
                                t = [];
                                for(var w = d, u; null !== w;){
                                    u = w;
                                    var F = u.stateNode;
                                    5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
                                    if (J) break;
                                    w = w.return;
                                }
                                0 < t.length && (h = new k(h, n, null, c, e), g.push({
                                    event: h,
                                    listeners: t
                                }));
                            }
                        }
                        if (0 === (7 & b)) {
                            a: {
                                h = "mouseover" === a || "pointerover" === a;
                                k = "mouseout" === a || "pointerout" === a;
                                if (h && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
                                if (k || h) {
                                    h = e.window === e ? e : (h = e.ownerDocument) ? h.defaultView || h.parentWindow : window;
                                    if (k) {
                                        if (n = c.relatedTarget || c.toElement, k = d, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
                                    } else k = null, n = d;
                                    if (k !== n) {
                                        t = Bd;
                                        F = "onMouseLeave";
                                        x = "onMouseEnter";
                                        w = "mouse";
                                        if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
                                        J = null == k ? h : ue(k);
                                        u = null == n ? h : ue(n);
                                        h = new t(F, w + "leave", k, c, e);
                                        h.target = J;
                                        h.relatedTarget = u;
                                        F = null;
                                        Wc(e) === d && (t = new t(x, w + "enter", n, c, e), t.target = u, t.relatedTarget = J, F = t);
                                        J = F;
                                        if (k && n) b: {
                                            t = k;
                                            x = n;
                                            w = 0;
                                            for(u = t; u; u = vf(u))w++;
                                            u = 0;
                                            for(F = x; F; F = vf(F))u++;
                                            for(; 0 < w - u;)t = vf(t), w--;
                                            for(; 0 < u - w;)x = vf(x), u--;
                                            for(; w--;){
                                                if (t === x || null !== x && t === x.alternate) break b;
                                                t = vf(t);
                                                x = vf(x);
                                            }
                                            t = null;
                                        }
                                        else t = null;
                                        null !== k && wf(g, h, k, t, !1);
                                        null !== n && null !== J && wf(g, J, n, t, !0);
                                    }
                                }
                            }
                            a: {
                                h = d ? ue(d) : window;
                                k = h.nodeName && h.nodeName.toLowerCase();
                                if ("select" === k || "input" === k && "file" === h.type) var na = ve;
                                else if (me(h)) {
                                    if (we) na = Fe;
                                    else {
                                        na = De;
                                        var xa = Ce;
                                    }
                                } else (k = h.nodeName) && "input" === k.toLowerCase() && ("checkbox" === h.type || "radio" === h.type) && (na = Ee);
                                if (na && (na = na(a, d))) {
                                    ne(g, na, c, e);
                                    break a;
                                }
                                xa && xa(a, h, d);
                                "focusout" === a && (xa = h._wrapperState) && xa.controlled && "number" === h.type && cb(h, "number", h.value);
                            }
                            xa = d ? ue(d) : window;
                            switch(a){
                                case "focusin":
                                    if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d, Se = null;
                                    break;
                                case "focusout":
                                    Se = Re = Qe = null;
                                    break;
                                case "mousedown":
                                    Te = !0;
                                    break;
                                case "contextmenu":
                                case "mouseup":
                                case "dragend":
                                    Te = !1;
                                    Ue(g, c, e);
                                    break;
                                case "selectionchange":
                                    if (Pe) break;
                                case "keydown":
                                case "keyup":
                                    Ue(g, c, e);
                            }
                            var $a;
                            if (ae) b: {
                                switch(a){
                                    case "compositionstart":
                                        var ba = "onCompositionStart";
                                        break b;
                                    case "compositionend":
                                        ba = "onCompositionEnd";
                                        break b;
                                    case "compositionupdate":
                                        ba = "onCompositionUpdate";
                                        break b;
                                }
                                ba = void 0;
                            }
                            else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
                            ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e, ld = "value" in kd ? kd.value : kd.textContent, ie = !0)), xa = oe(d, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e), g.push({
                                event: ba,
                                listeners: xa
                            }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
                            if ($a = ce ? je(a, c) : ke(a, c)) d = oe(d, "onBeforeInput"), 0 < d.length && (e = new Ld("onBeforeInput", "beforeinput", null, c, e), g.push({
                                event: e,
                                listeners: d
                            }), e.data = $a);
                        }
                        se(g, b);
                    });
                }
                function tf(a, b, c) {
                    return {
                        instance: a,
                        listener: b,
                        currentTarget: c
                    };
                }
                function oe(a, b) {
                    for(var c = b + "Capture", d = []; null !== a;){
                        var e = a, f = e.stateNode;
                        5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
                        a = a.return;
                    }
                    return d;
                }
                function vf(a) {
                    if (null === a) return null;
                    do a = a.return;
                    while (a && 5 !== a.tag);
                    return a ? a : null;
                }
                function wf(a, b, c, d, e) {
                    for(var f = b._reactName, g = []; null !== c && c !== d;){
                        var h = c, k = h.alternate, l = h.stateNode;
                        if (null !== k && k === d) break;
                        5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
                        c = c.return;
                    }
                    0 !== g.length && a.push({
                        event: b,
                        listeners: g
                    });
                }
                var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
                function zf(a) {
                    return ("string" == typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
                }
                function Af(a, b, c) {
                    b = zf(b);
                    if (zf(a) !== b && c) throw Error(p(425));
                }
                function Bf() {}
                var Cf = null, Df = null;
                function Ef(a, b) {
                    return "textarea" === a || "noscript" === a || "string" == typeof b.children || "number" == typeof b.children || "object" == typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
                }
                var Ff = "function" == typeof setTimeout ? setTimeout : void 0, Gf = "function" == typeof clearTimeout ? clearTimeout : void 0, Hf = "function" == typeof Promise ? Promise : void 0, Jf = "function" == typeof queueMicrotask ? queueMicrotask : void 0 !== Hf ? function(a) {
                    return Hf.resolve(null).then(a).catch(If);
                } : Ff;
                function If(a) {
                    setTimeout(function() {
                        throw a;
                    });
                }
                function Kf(a, b) {
                    var c = b, d = 0;
                    do {
                        var e = c.nextSibling;
                        a.removeChild(c);
                        if (e && 8 === e.nodeType) {
                            if (c = e.data, "/$" === c) {
                                if (0 === d) {
                                    a.removeChild(e);
                                    bd(b);
                                    return;
                                }
                                d--;
                            } else "$" !== c && "$?" !== c && "$!" !== c || d++;
                        }
                        c = e;
                    }while (c);
                    bd(b);
                }
                function Lf(a) {
                    for(; null != a; a = a.nextSibling){
                        var b = a.nodeType;
                        if (1 === b || 3 === b) break;
                        if (8 === b) {
                            b = a.data;
                            if ("$" === b || "$!" === b || "$?" === b) break;
                            if ("/$" === b) return null;
                        }
                    }
                    return a;
                }
                function Mf(a) {
                    a = a.previousSibling;
                    for(var b = 0; a;){
                        if (8 === a.nodeType) {
                            var c = a.data;
                            if ("$" === c || "$!" === c || "$?" === c) {
                                if (0 === b) return a;
                                b--;
                            } else "/$" === c && b++;
                        }
                        a = a.previousSibling;
                    }
                    return null;
                }
                var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
                function Wc(a) {
                    var b = a[Of];
                    if (b) return b;
                    for(var c = a.parentNode; c;){
                        if (b = c[uf] || c[Of]) {
                            c = b.alternate;
                            if (null !== b.child || null !== c && null !== c.child) for(a = Mf(a); null !== a;){
                                if (c = a[Of]) return c;
                                a = Mf(a);
                            }
                            return b;
                        }
                        a = c;
                        c = a.parentNode;
                    }
                    return null;
                }
                function Cb(a) {
                    a = a[Of] || a[uf];
                    return a && (5 === a.tag || 6 === a.tag || 13 === a.tag || 3 === a.tag) ? a : null;
                }
                function ue(a) {
                    if (5 === a.tag || 6 === a.tag) return a.stateNode;
                    throw Error(p(33));
                }
                function Db(a) {
                    return a[Pf] || null;
                }
                var Sf = [], Tf = -1;
                function Uf(a) {
                    return {
                        current: a
                    };
                }
                function E(a) {
                    0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
                }
                function G(a, b) {
                    Tf++;
                    Sf[Tf] = a.current;
                    a.current = b;
                }
                var Vf = {}, H = Uf(Vf), Wf = Uf(!1), Xf = Vf;
                function Yf(a, b) {
                    var c = a.type.contextTypes;
                    if (!c) return Vf;
                    var d = a.stateNode;
                    if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
                    var e = {}, f;
                    for(f in c)e[f] = b[f];
                    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
                    return e;
                }
                function Zf(a) {
                    a = a.childContextTypes;
                    return null != a;
                }
                function $f() {
                    E(Wf);
                    E(H);
                }
                function ag(a, b, c) {
                    if (H.current !== Vf) throw Error(p(168));
                    G(H, b);
                    G(Wf, c);
                }
                function bg(a, b, c) {
                    var d = a.stateNode;
                    b = b.childContextTypes;
                    if ("function" != typeof d.getChildContext) return c;
                    d = d.getChildContext();
                    for(var e in d)if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
                    return A({}, c, d);
                }
                function cg(a) {
                    a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
                    Xf = H.current;
                    G(H, a);
                    G(Wf, Wf.current);
                    return !0;
                }
                function dg(a, b, c) {
                    var d = a.stateNode;
                    if (!d) throw Error(p(169));
                    c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
                    G(Wf, c);
                }
                var eg = null, fg = !1, gg = !1;
                function hg(a) {
                    null === eg ? eg = [
                        a
                    ] : eg.push(a);
                }
                function ig(a) {
                    fg = !0;
                    hg(a);
                }
                function jg() {
                    if (!gg && null !== eg) {
                        gg = !0;
                        var a = 0, b = C;
                        try {
                            var c = eg;
                            for(C = 1; a < c.length; a++){
                                var d = c[a];
                                do d = d(!0);
                                while (null !== d);
                            }
                            eg = null;
                            fg = !1;
                        } catch (e) {
                            throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
                        } finally{
                            C = b, gg = !1;
                        }
                    }
                    return null;
                }
                var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
                function tg(a, b) {
                    kg[lg++] = ng;
                    kg[lg++] = mg;
                    mg = a;
                    ng = b;
                }
                function ug(a, b, c) {
                    og[pg++] = rg;
                    og[pg++] = sg;
                    og[pg++] = qg;
                    qg = a;
                    var d = rg;
                    a = sg;
                    var e = 32 - oc(d) - 1;
                    d &= ~(1 << e);
                    c += 1;
                    var f = 32 - oc(b) + e;
                    if (30 < f) {
                        var g = e - e % 5;
                        f = (d & (1 << g) - 1).toString(32);
                        d >>= g;
                        e -= g;
                        rg = 1 << 32 - oc(b) + e | c << e | d;
                        sg = f + a;
                    } else rg = 1 << f | c << e | d, sg = a;
                }
                function vg(a) {
                    null !== a.return && (tg(a, 1), ug(a, 1, 0));
                }
                function wg(a) {
                    for(; a === mg;)mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
                    for(; a === qg;)qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
                }
                var xg = null, yg = null, I = !1, zg = null;
                function Ag(a, b) {
                    var c = Bg(5, null, null, 0);
                    c.elementType = "DELETED";
                    c.stateNode = b;
                    c.return = a;
                    b = a.deletions;
                    null === b ? (a.deletions = [
                        c
                    ], a.flags |= 16) : b.push(c);
                }
                function Cg(a, b) {
                    switch(a.tag){
                        case 5:
                            var c = a.type;
                            b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
                            return null !== b && (a.stateNode = b, xg = a, yg = Lf(b.firstChild), !0);
                        case 6:
                            return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b && (a.stateNode = b, xg = a, yg = null, !0);
                        case 13:
                            return b = 8 !== b.nodeType ? null : b, null !== b && (c = null !== qg ? {
                                id: rg,
                                overflow: sg
                            } : null, a.memoizedState = {
                                dehydrated: b,
                                treeContext: c,
                                retryLane: 1073741824
                            }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, !0);
                        default:
                            return !1;
                    }
                }
                function Dg(a) {
                    return 0 !== (1 & a.mode) && 0 === (128 & a.flags);
                }
                function Eg(a) {
                    if (I) {
                        var b = yg;
                        if (b) {
                            var c = b;
                            if (!Cg(a, b)) {
                                if (Dg(a)) throw Error(p(418));
                                b = Lf(c.nextSibling);
                                var d = xg;
                                b && Cg(a, b) ? Ag(d, c) : (a.flags = -4097 & a.flags | 2, I = !1, xg = a);
                            }
                        } else {
                            if (Dg(a)) throw Error(p(418));
                            a.flags = -4097 & a.flags | 2;
                            I = !1;
                            xg = a;
                        }
                    }
                }
                function Fg(a) {
                    for(a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;)a = a.return;
                    xg = a;
                }
                function Gg(a) {
                    if (a !== xg) return !1;
                    if (!I) return Fg(a), I = !0, !1;
                    var b;
                    (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
                    if (b && (b = yg)) {
                        if (Dg(a)) throw Hg(), Error(p(418));
                        for(; b;)Ag(a, b), b = Lf(b.nextSibling);
                    }
                    Fg(a);
                    if (13 === a.tag) {
                        a = a.memoizedState;
                        a = null !== a ? a.dehydrated : null;
                        if (!a) throw Error(p(317));
                        a: {
                            a = a.nextSibling;
                            for(b = 0; a;){
                                if (8 === a.nodeType) {
                                    var c = a.data;
                                    if ("/$" === c) {
                                        if (0 === b) {
                                            yg = Lf(a.nextSibling);
                                            break a;
                                        }
                                        b--;
                                    } else "$" !== c && "$!" !== c && "$?" !== c || b++;
                                }
                                a = a.nextSibling;
                            }
                            yg = null;
                        }
                    } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
                    return !0;
                }
                function Hg() {
                    for(var a = yg; a;)a = Lf(a.nextSibling);
                }
                function Ig() {
                    yg = xg = null;
                    I = !1;
                }
                function Jg(a) {
                    null === zg ? zg = [
                        a
                    ] : zg.push(a);
                }
                var Kg = ua.ReactCurrentBatchConfig;
                function Lg(a, b, c) {
                    a = c.ref;
                    if (null !== a && "function" != typeof a && "object" != typeof a) {
                        if (c._owner) {
                            c = c._owner;
                            if (c) {
                                if (1 !== c.tag) throw Error(p(309));
                                var d = c.stateNode;
                            }
                            if (!d) throw Error(p(147, a));
                            var e = d, f = "" + a;
                            if (null !== b && null !== b.ref && "function" == typeof b.ref && b.ref._stringRef === f) return b.ref;
                            b = function(a) {
                                var b = e.refs;
                                null === a ? delete b[f] : b[f] = a;
                            };
                            b._stringRef = f;
                            return b;
                        }
                        if ("string" != typeof a) throw Error(p(284));
                        if (!c._owner) throw Error(p(290, a));
                    }
                    return a;
                }
                function Mg(a, b) {
                    a = Object.prototype.toString.call(b);
                    throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
                }
                function Ng(a) {
                    var b = a._init;
                    return b(a._payload);
                }
                function Og(a) {
                    function b(b, c) {
                        if (a) {
                            var d = b.deletions;
                            null === d ? (b.deletions = [
                                c
                            ], b.flags |= 16) : d.push(c);
                        }
                    }
                    function c(c, d) {
                        if (!a) return null;
                        for(; null !== d;)b(c, d), d = d.sibling;
                        return null;
                    }
                    function d(a, b) {
                        for(a = new Map; null !== b;)null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
                        return a;
                    }
                    function e(a, b) {
                        a = Pg(a, b);
                        a.index = 0;
                        a.sibling = null;
                        return a;
                    }
                    function f(b, c, d) {
                        b.index = d;
                        if (!a) return b.flags |= 1048576, c;
                        d = b.alternate;
                        if (null !== d) return d = d.index, d < c ? (b.flags |= 2, c) : d;
                        b.flags |= 2;
                        return c;
                    }
                    function g(b) {
                        a && null === b.alternate && (b.flags |= 2);
                        return b;
                    }
                    function h(a, b, c, d) {
                        if (null === b || 6 !== b.tag) return b = Qg(c, a.mode, d), b.return = a, b;
                        b = e(b, c);
                        b.return = a;
                        return b;
                    }
                    function k(a, b, c, d) {
                        var f = c.type;
                        if (f === ya) return m(a, b, c.props.children, d, c.key);
                        if (null !== b && (b.elementType === f || "object" == typeof f && null !== f && f.$$typeof === Ha && Ng(f) === b.type)) return d = e(b, c.props), d.ref = Lg(a, b, c), d.return = a, d;
                        d = Rg(c.type, c.key, c.props, null, a.mode, d);
                        d.ref = Lg(a, b, c);
                        d.return = a;
                        return d;
                    }
                    function l(a, b, c, d) {
                        if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = Sg(c, a.mode, d), b.return = a, b;
                        b = e(b, c.children || []);
                        b.return = a;
                        return b;
                    }
                    function m(a, b, c, d, f) {
                        if (null === b || 7 !== b.tag) return b = Tg(c, a.mode, d, f), b.return = a, b;
                        b = e(b, c);
                        b.return = a;
                        return b;
                    }
                    function q(a, b, c) {
                        if ("string" == typeof b && "" !== b || "number" == typeof b) return b = Qg("" + b, a.mode, c), b.return = a, b;
                        if ("object" == typeof b && null !== b) {
                            switch(b.$$typeof){
                                case va:
                                    return c = Rg(b.type, b.key, b.props, null, a.mode, c), c.ref = Lg(a, null, b), c.return = a, c;
                                case wa:
                                    return b = Sg(b, a.mode, c), b.return = a, b;
                                case Ha:
                                    var d = b._init;
                                    return q(a, d(b._payload), c);
                            }
                            if (eb(b) || Ka(b)) return b = Tg(b, a.mode, c, null), b.return = a, b;
                            Mg(a, b);
                        }
                        return null;
                    }
                    function r(a, b, c, d) {
                        var e = null !== b ? b.key : null;
                        if ("string" == typeof c && "" !== c || "number" == typeof c) return null !== e ? null : h(a, b, "" + c, d);
                        if ("object" == typeof c && null !== c) {
                            switch(c.$$typeof){
                                case va:
                                    return c.key === e ? k(a, b, c, d) : null;
                                case wa:
                                    return c.key === e ? l(a, b, c, d) : null;
                                case Ha:
                                    return e = c._init, r(a, b, e(c._payload), d);
                            }
                            if (eb(c) || Ka(c)) return null !== e ? null : m(a, b, c, d, null);
                            Mg(a, c);
                        }
                        return null;
                    }
                    function y(a, b, c, d, e) {
                        if ("string" == typeof d && "" !== d || "number" == typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);
                        if ("object" == typeof d && null !== d) {
                            switch(d.$$typeof){
                                case va:
                                    return a = a.get(null === d.key ? c : d.key) || null, k(b, a, d, e);
                                case wa:
                                    return a = a.get(null === d.key ? c : d.key) || null, l(b, a, d, e);
                                case Ha:
                                    var f = d._init;
                                    return y(a, b, c, f(d._payload), e);
                            }
                            if (eb(d) || Ka(d)) return a = a.get(c) || null, m(b, a, d, e, null);
                            Mg(b, d);
                        }
                        return null;
                    }
                    function n(e, g, h, k) {
                        for(var l = null, m = null, u = g, w = g = 0, x = null; null !== u && w < h.length; w++){
                            u.index > w ? (x = u, u = null) : x = u.sibling;
                            var n = r(e, u, h[w], k);
                            if (null === n) {
                                null === u && (u = x);
                                break;
                            }
                            a && u && null === n.alternate && b(e, u);
                            g = f(n, g, w);
                            null === m ? l = n : m.sibling = n;
                            m = n;
                            u = x;
                        }
                        if (w === h.length) return c(e, u), I && tg(e, w), l;
                        if (null === u) {
                            for(; w < h.length; w++)u = q(e, h[w], k), null !== u && (g = f(u, g, w), null === m ? l = u : m.sibling = u, m = u);
                            I && tg(e, w);
                            return l;
                        }
                        for(u = d(e, u); w < h.length; w++)x = y(u, e, w, h[w], k), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g = f(x, g, w), null === m ? l = x : m.sibling = x, m = x);
                        a && u.forEach(function(a) {
                            return b(e, a);
                        });
                        I && tg(e, w);
                        return l;
                    }
                    function t(e, g, h, k) {
                        var l = Ka(h);
                        if ("function" != typeof l) throw Error(p(150));
                        h = l.call(h);
                        if (null == h) throw Error(p(151));
                        for(var u = l = null, m = g, w = g = 0, x = null, n = h.next(); null !== m && !n.done; w++, n = h.next()){
                            m.index > w ? (x = m, m = null) : x = m.sibling;
                            var t = r(e, m, n.value, k);
                            if (null === t) {
                                null === m && (m = x);
                                break;
                            }
                            a && m && null === t.alternate && b(e, m);
                            g = f(t, g, w);
                            null === u ? l = t : u.sibling = t;
                            u = t;
                            m = x;
                        }
                        if (n.done) return c(e, m), I && tg(e, w), l;
                        if (null === m) {
                            for(; !n.done; w++, n = h.next())n = q(e, n.value, k), null !== n && (g = f(n, g, w), null === u ? l = n : u.sibling = n, u = n);
                            I && tg(e, w);
                            return l;
                        }
                        for(m = d(e, m); !n.done; w++, n = h.next())n = y(m, e, w, n.value, k), null !== n && (a && null !== n.alternate && m.delete(null === n.key ? w : n.key), g = f(n, g, w), null === u ? l = n : u.sibling = n, u = n);
                        a && m.forEach(function(a) {
                            return b(e, a);
                        });
                        I && tg(e, w);
                        return l;
                    }
                    function J(a, d, f, h) {
                        "object" == typeof f && null !== f && f.type === ya && null === f.key && (f = f.props.children);
                        if ("object" == typeof f && null !== f) {
                            switch(f.$$typeof){
                                case va:
                                    a: {
                                        for(var k = f.key, l = d; null !== l;){
                                            if (l.key === k) {
                                                k = f.type;
                                                if (k === ya) {
                                                    if (7 === l.tag) {
                                                        c(a, l.sibling);
                                                        d = e(l, f.props.children);
                                                        d.return = a;
                                                        a = d;
                                                        break a;
                                                    }
                                                } else if (l.elementType === k || "object" == typeof k && null !== k && k.$$typeof === Ha && Ng(k) === l.type) {
                                                    c(a, l.sibling);
                                                    d = e(l, f.props);
                                                    d.ref = Lg(a, l, f);
                                                    d.return = a;
                                                    a = d;
                                                    break a;
                                                }
                                                c(a, l);
                                                break;
                                            }
                                            b(a, l);
                                            l = l.sibling;
                                        }
                                        f.type === ya ? (d = Tg(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = Rg(f.type, f.key, f.props, null, a.mode, h), h.ref = Lg(a, d, f), h.return = a, a = h);
                                    }
                                    return g(a);
                                case wa:
                                    a: {
                                        for(l = f.key; null !== d;){
                                            if (d.key === l) {
                                                if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                                                    c(a, d.sibling);
                                                    d = e(d, f.children || []);
                                                    d.return = a;
                                                    a = d;
                                                    break a;
                                                } else {
                                                    c(a, d);
                                                    break;
                                                }
                                            }
                                            b(a, d);
                                            d = d.sibling;
                                        }
                                        d = Sg(f, a.mode, h);
                                        d.return = a;
                                        a = d;
                                    }
                                    return g(a);
                                case Ha:
                                    return l = f._init, J(a, d, l(f._payload), h);
                            }
                            if (eb(f)) return n(a, d, f, h);
                            if (Ka(f)) return t(a, d, f, h);
                            Mg(a, f);
                        }
                        return "string" == typeof f && "" !== f || "number" == typeof f ? (f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d.return = a, a = d) : (c(a, d), d = Qg(f, a.mode, h), d.return = a, a = d), g(a)) : c(a, d);
                    }
                    return J;
                }
                var Ug = Og(!0), Vg = Og(!1), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
                function $g() {
                    Zg = Yg = Xg = null;
                }
                function ah(a) {
                    var b = Wg.current;
                    E(Wg);
                    a._currentValue = b;
                }
                function bh(a, b, c) {
                    for(; null !== a;){
                        var d = a.alternate;
                        (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
                        if (a === c) break;
                        a = a.return;
                    }
                }
                function ch(a, b) {
                    Xg = a;
                    Zg = Yg = null;
                    a = a.dependencies;
                    null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = !0), a.firstContext = null);
                }
                function eh(a) {
                    var b = a._currentValue;
                    if (Zg !== a) {
                        if (a = {
                            context: a,
                            memoizedValue: b,
                            next: null
                        }, null === Yg) {
                            if (null === Xg) throw Error(p(308));
                            Yg = a;
                            Xg.dependencies = {
                                lanes: 0,
                                firstContext: a
                            };
                        } else Yg = Yg.next = a;
                    }
                    return b;
                }
                var fh = null;
                function gh(a) {
                    null === fh ? fh = [
                        a
                    ] : fh.push(a);
                }
                function hh(a, b, c, d) {
                    var e = b.interleaved;
                    null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
                    b.interleaved = c;
                    return ih(a, d);
                }
                function ih(a, b) {
                    a.lanes |= b;
                    var c = a.alternate;
                    null !== c && (c.lanes |= b);
                    c = a;
                    for(a = a.return; null !== a;)a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
                    return 3 === c.tag ? c.stateNode : null;
                }
                var jh = !1;
                function kh(a) {
                    a.updateQueue = {
                        baseState: a.memoizedState,
                        firstBaseUpdate: null,
                        lastBaseUpdate: null,
                        shared: {
                            pending: null,
                            interleaved: null,
                            lanes: 0
                        },
                        effects: null
                    };
                }
                function lh(a, b) {
                    a = a.updateQueue;
                    b.updateQueue === a && (b.updateQueue = {
                        baseState: a.baseState,
                        firstBaseUpdate: a.firstBaseUpdate,
                        lastBaseUpdate: a.lastBaseUpdate,
                        shared: a.shared,
                        effects: a.effects
                    });
                }
                function mh(a, b) {
                    return {
                        eventTime: a,
                        lane: b,
                        tag: 0,
                        payload: null,
                        callback: null,
                        next: null
                    };
                }
                function nh(a, b, c) {
                    var d = a.updateQueue;
                    if (null === d) return null;
                    d = d.shared;
                    if (0 !== (2 & K)) {
                        var e = d.pending;
                        null === e ? b.next = b : (b.next = e.next, e.next = b);
                        d.pending = b;
                        return ih(a, c);
                    }
                    e = d.interleaved;
                    null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
                    d.interleaved = b;
                    return ih(a, c);
                }
                function oh(a, b, c) {
                    b = b.updateQueue;
                    if (null !== b && (b = b.shared, 0 !== (4194240 & c))) {
                        var d = b.lanes;
                        d &= a.pendingLanes;
                        c |= d;
                        b.lanes = c;
                        Cc(a, c);
                    }
                }
                function ph(a, b) {
                    var c = a.updateQueue, d = a.alternate;
                    if (null !== d && (d = d.updateQueue, c === d)) {
                        var e = null, f = null;
                        c = c.firstBaseUpdate;
                        if (null !== c) {
                            do {
                                var g = {
                                    eventTime: c.eventTime,
                                    lane: c.lane,
                                    tag: c.tag,
                                    payload: c.payload,
                                    callback: c.callback,
                                    next: null
                                };
                                null === f ? e = f = g : f = f.next = g;
                                c = c.next;
                            }while (null !== c);
                            null === f ? e = f = b : f = f.next = b;
                        } else e = f = b;
                        c = {
                            baseState: d.baseState,
                            firstBaseUpdate: e,
                            lastBaseUpdate: f,
                            shared: d.shared,
                            effects: d.effects
                        };
                        a.updateQueue = c;
                        return;
                    }
                    a = c.lastBaseUpdate;
                    null === a ? c.firstBaseUpdate = b : a.next = b;
                    c.lastBaseUpdate = b;
                }
                function qh(a, b, c, d) {
                    var e = a.updateQueue;
                    jh = !1;
                    var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
                    if (null !== h) {
                        e.shared.pending = null;
                        var k = h, l = k.next;
                        k.next = null;
                        null === g ? f = l : g.next = l;
                        g = k;
                        var m = a.alternate;
                        null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
                    }
                    if (null !== f) {
                        var q = e.baseState;
                        g = 0;
                        m = l = k = null;
                        h = f;
                        do {
                            var r = h.lane, y = h.eventTime;
                            if ((d & r) === r) {
                                null !== m && (m = m.next = {
                                    eventTime: y,
                                    lane: 0,
                                    tag: h.tag,
                                    payload: h.payload,
                                    callback: h.callback,
                                    next: null
                                });
                                a: {
                                    var n = a, t = h;
                                    r = b;
                                    y = c;
                                    switch(t.tag){
                                        case 1:
                                            n = t.payload;
                                            if ("function" == typeof n) {
                                                q = n.call(y, q, r);
                                                break a;
                                            }
                                            q = n;
                                            break a;
                                        case 3:
                                            n.flags = -65537 & n.flags | 128;
                                        case 0:
                                            n = t.payload;
                                            r = "function" == typeof n ? n.call(y, q, r) : n;
                                            if (null == r) break a;
                                            q = A({}, q, r);
                                            break a;
                                        case 2:
                                            jh = !0;
                                    }
                                }
                                null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [
                                    h
                                ] : r.push(h));
                            } else y = {
                                eventTime: y,
                                lane: r,
                                tag: h.tag,
                                payload: h.payload,
                                callback: h.callback,
                                next: null
                            }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
                            h = h.next;
                            if (null === h) {
                                if (h = e.shared.pending, null === h) break;
                                else r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
                            }
                        }while (1);
                        null === m && (k = q);
                        e.baseState = k;
                        e.firstBaseUpdate = l;
                        e.lastBaseUpdate = m;
                        b = e.shared.interleaved;
                        if (null !== b) {
                            e = b;
                            do g |= e.lane, e = e.next;
                            while (e !== b);
                        } else null === f && (e.shared.lanes = 0);
                        rh |= g;
                        a.lanes = g;
                        a.memoizedState = q;
                    }
                }
                function sh(a, b, c) {
                    a = b.effects;
                    b.effects = null;
                    if (null !== a) for(b = 0; b < a.length; b++){
                        var d = a[b], e = d.callback;
                        if (null !== e) {
                            d.callback = null;
                            d = c;
                            if ("function" != typeof e) throw Error(p(191, e));
                            e.call(d);
                        }
                    }
                }
                var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
                function xh(a) {
                    if (a === th) throw Error(p(174));
                    return a;
                }
                function yh(a, b) {
                    G(wh, b);
                    G(vh, a);
                    G(uh, th);
                    a = b.nodeType;
                    switch(a){
                        case 9:
                        case 11:
                            b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
                            break;
                        default:
                            a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
                    }
                    E(uh);
                    G(uh, b);
                }
                function zh() {
                    E(uh);
                    E(vh);
                    E(wh);
                }
                function Ah(a) {
                    xh(wh.current);
                    var b = xh(uh.current);
                    var c = lb(b, a.type);
                    b !== c && (G(vh, a), G(uh, c));
                }
                function Bh(a) {
                    vh.current === a && (E(uh), E(vh));
                }
                var L = Uf(0);
                function Ch(a) {
                    for(var b = a; null !== b;){
                        if (13 === b.tag) {
                            var c = b.memoizedState;
                            if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
                        } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
                            if (0 !== (128 & b.flags)) return b;
                        } else if (null !== b.child) {
                            b.child.return = b;
                            b = b.child;
                            continue;
                        }
                        if (b === a) break;
                        for(; null === b.sibling;){
                            if (null === b.return || b.return === a) return null;
                            b = b.return;
                        }
                        b.sibling.return = b.return;
                        b = b.sibling;
                    }
                    return null;
                }
                var Dh = [];
                function Eh() {
                    for(var a = 0; a < Dh.length; a++)Dh[a]._workInProgressVersionPrimary = null;
                    Dh.length = 0;
                }
                var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = !1, Jh = !1, Kh = 0, Lh = 0;
                function P() {
                    throw Error(p(321));
                }
                function Mh(a, b) {
                    if (null === b) return !1;
                    for(var c = 0; c < b.length && c < a.length; c++)if (!He(a[c], b[c])) return !1;
                    return !0;
                }
                function Nh(a, b, c, d, e, f) {
                    Hh = f;
                    M = b;
                    b.memoizedState = null;
                    b.updateQueue = null;
                    b.lanes = 0;
                    Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
                    a = c(d, e);
                    if (Jh) {
                        f = 0;
                        do {
                            Jh = !1;
                            Kh = 0;
                            if (25 <= f) throw Error(p(301));
                            f += 1;
                            O = N = null;
                            b.updateQueue = null;
                            Fh.current = Qh;
                            a = c(d, e);
                        }while (Jh);
                    }
                    Fh.current = Rh;
                    b = null !== N && null !== N.next;
                    Hh = 0;
                    O = N = M = null;
                    Ih = !1;
                    if (b) throw Error(p(300));
                    return a;
                }
                function Sh() {
                    var a = 0 !== Kh;
                    Kh = 0;
                    return a;
                }
                function Th() {
                    var a = {
                        memoizedState: null,
                        baseState: null,
                        baseQueue: null,
                        queue: null,
                        next: null
                    };
                    null === O ? M.memoizedState = O = a : O = O.next = a;
                    return O;
                }
                function Uh() {
                    if (null === N) {
                        var a = M.alternate;
                        a = null !== a ? a.memoizedState : null;
                    } else a = N.next;
                    var b = null === O ? M.memoizedState : O.next;
                    if (null !== b) O = b, N = a;
                    else {
                        if (null === a) throw Error(p(310));
                        N = a;
                        a = {
                            memoizedState: N.memoizedState,
                            baseState: N.baseState,
                            baseQueue: N.baseQueue,
                            queue: N.queue,
                            next: null
                        };
                        null === O ? M.memoizedState = O = a : O = O.next = a;
                    }
                    return O;
                }
                function Vh(a, b) {
                    return "function" == typeof b ? b(a) : b;
                }
                function Wh(a) {
                    var b = Uh(), c = b.queue;
                    if (null === c) throw Error(p(311));
                    c.lastRenderedReducer = a;
                    var d = N, e = d.baseQueue, f = c.pending;
                    if (null !== f) {
                        if (null !== e) {
                            var g = e.next;
                            e.next = f.next;
                            f.next = g;
                        }
                        d.baseQueue = e = f;
                        c.pending = null;
                    }
                    if (null !== e) {
                        f = e.next;
                        d = d.baseState;
                        var h = g = null, k = null, l = f;
                        do {
                            var m = l.lane;
                            if ((Hh & m) === m) null !== k && (k = k.next = {
                                lane: 0,
                                action: l.action,
                                hasEagerState: l.hasEagerState,
                                eagerState: l.eagerState,
                                next: null
                            }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
                            else {
                                var q = {
                                    lane: m,
                                    action: l.action,
                                    hasEagerState: l.hasEagerState,
                                    eagerState: l.eagerState,
                                    next: null
                                };
                                null === k ? (h = k = q, g = d) : k = k.next = q;
                                M.lanes |= m;
                                rh |= m;
                            }
                            l = l.next;
                        }while (null !== l && l !== f);
                        null === k ? g = d : k.next = h;
                        He(d, b.memoizedState) || (dh = !0);
                        b.memoizedState = d;
                        b.baseState = g;
                        b.baseQueue = k;
                        c.lastRenderedState = d;
                    }
                    a = c.interleaved;
                    if (null !== a) {
                        e = a;
                        do f = e.lane, M.lanes |= f, rh |= f, e = e.next;
                        while (e !== a);
                    } else null === e && (c.lanes = 0);
                    return [
                        b.memoizedState,
                        c.dispatch
                    ];
                }
                function Xh(a) {
                    var b = Uh(), c = b.queue;
                    if (null === c) throw Error(p(311));
                    c.lastRenderedReducer = a;
                    var d = c.dispatch, e = c.pending, f = b.memoizedState;
                    if (null !== e) {
                        c.pending = null;
                        var g = e = e.next;
                        do f = a(f, g.action), g = g.next;
                        while (g !== e);
                        He(f, b.memoizedState) || (dh = !0);
                        b.memoizedState = f;
                        null === b.baseQueue && (b.baseState = f);
                        c.lastRenderedState = f;
                    }
                    return [
                        f,
                        d
                    ];
                }
                function Yh() {}
                function Zh(a, b) {
                    var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
                    f && (d.memoizedState = e, dh = !0);
                    d = d.queue;
                    $h(ai.bind(null, c, d, a), [
                        a
                    ]);
                    if (d.getSnapshot !== b || f || null !== O && 1 & O.memoizedState.tag) {
                        c.flags |= 2048;
                        bi(9, ci.bind(null, c, d, e, b), void 0, null);
                        if (null === Q) throw Error(p(349));
                        0 !== (30 & Hh) || di(c, b, e);
                    }
                    return e;
                }
                function di(a, b, c) {
                    a.flags |= 16384;
                    a = {
                        getSnapshot: b,
                        value: c
                    };
                    b = M.updateQueue;
                    null === b ? (b = {
                        lastEffect: null,
                        stores: null
                    }, M.updateQueue = b, b.stores = [
                        a
                    ]) : (c = b.stores, null === c ? b.stores = [
                        a
                    ] : c.push(a));
                }
                function ci(a, b, c, d) {
                    b.value = c;
                    b.getSnapshot = d;
                    ei(b) && fi(a);
                }
                function ai(a, b, c) {
                    return c(function() {
                        ei(b) && fi(a);
                    });
                }
                function ei(a) {
                    var b = a.getSnapshot;
                    a = a.value;
                    try {
                        var c = b();
                        return !He(a, c);
                    } catch (d) {
                        return !0;
                    }
                }
                function fi(a) {
                    var b = ih(a, 1);
                    null !== b && gi(b, a, 1, -1);
                }
                function hi(a) {
                    var b = Th();
                    "function" == typeof a && (a = a());
                    b.memoizedState = b.baseState = a;
                    a = {
                        pending: null,
                        interleaved: null,
                        lanes: 0,
                        dispatch: null,
                        lastRenderedReducer: Vh,
                        lastRenderedState: a
                    };
                    b.queue = a;
                    a = a.dispatch = ii.bind(null, M, a);
                    return [
                        b.memoizedState,
                        a
                    ];
                }
                function bi(a, b, c, d) {
                    a = {
                        tag: a,
                        create: b,
                        destroy: c,
                        deps: d,
                        next: null
                    };
                    b = M.updateQueue;
                    null === b ? (b = {
                        lastEffect: null,
                        stores: null
                    }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
                    return a;
                }
                function ji() {
                    return Uh().memoizedState;
                }
                function ki(a, b, c, d) {
                    var e = Th();
                    M.flags |= a;
                    e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
                }
                function li(a, b, c, d) {
                    var e = Uh();
                    d = void 0 === d ? null : d;
                    var f = void 0;
                    if (null !== N) {
                        var g = N.memoizedState;
                        f = g.destroy;
                        if (null !== d && Mh(d, g.deps)) {
                            e.memoizedState = bi(b, c, f, d);
                            return;
                        }
                    }
                    M.flags |= a;
                    e.memoizedState = bi(1 | b, c, f, d);
                }
                function mi(a, b) {
                    return ki(8390656, 8, a, b);
                }
                function $h(a, b) {
                    return li(2048, 8, a, b);
                }
                function ni(a, b) {
                    return li(4, 2, a, b);
                }
                function oi(a, b) {
                    return li(4, 4, a, b);
                }
                function pi(a, b) {
                    if ("function" == typeof b) return a = a(), b(a), function() {
                        b(null);
                    };
                    if (null != b) return a = a(), b.current = a, function() {
                        b.current = null;
                    };
                }
                function qi(a, b, c) {
                    c = null != c ? c.concat([
                        a
                    ]) : null;
                    return li(4, 4, pi.bind(null, b, a), c);
                }
                function ri() {}
                function si(a, b) {
                    var c = Uh();
                    b = void 0 === b ? null : b;
                    var d = c.memoizedState;
                    if (null !== d && null !== b && Mh(b, d[1])) return d[0];
                    c.memoizedState = [
                        a,
                        b
                    ];
                    return a;
                }
                function ti(a, b) {
                    var c = Uh();
                    b = void 0 === b ? null : b;
                    var d = c.memoizedState;
                    if (null !== d && null !== b && Mh(b, d[1])) return d[0];
                    a = a();
                    c.memoizedState = [
                        a,
                        b
                    ];
                    return a;
                }
                function ui(a, b, c) {
                    if (0 === (21 & Hh)) return a.baseState && (a.baseState = !1, dh = !0), a.memoizedState = c;
                    He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = !0);
                    return b;
                }
                function vi(a, b) {
                    var c = C;
                    C = 0 !== c && 4 > c ? c : 4;
                    a(!0);
                    var d = Gh.transition;
                    Gh.transition = {};
                    try {
                        a(!1), b();
                    } finally{
                        C = c, Gh.transition = d;
                    }
                }
                function wi() {
                    return Uh().memoizedState;
                }
                function xi(a, b, c) {
                    var d = yi(a);
                    c = {
                        lane: d,
                        action: c,
                        hasEagerState: !1,
                        eagerState: null,
                        next: null
                    };
                    if (zi(a)) Ai(b, c);
                    else if (c = hh(a, b, c, d), null !== c) {
                        var e = R();
                        gi(c, a, d, e);
                        Bi(c, b, d);
                    }
                }
                function ii(a, b, c) {
                    var d = yi(a), e = {
                        lane: d,
                        action: c,
                        hasEagerState: !1,
                        eagerState: null,
                        next: null
                    };
                    if (zi(a)) Ai(b, e);
                    else {
                        var f = a.alternate;
                        if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
                            var g = b.lastRenderedState, h = f(g, c);
                            e.hasEagerState = !0;
                            e.eagerState = h;
                            if (He(h, g)) {
                                var k = b.interleaved;
                                null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
                                b.interleaved = e;
                                return;
                            }
                        } catch (l) {} finally{}
                        c = hh(a, b, e, d);
                        null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
                    }
                }
                function zi(a) {
                    var b = a.alternate;
                    return a === M || null !== b && b === M;
                }
                function Ai(a, b) {
                    Jh = Ih = !0;
                    var c = a.pending;
                    null === c ? b.next = b : (b.next = c.next, c.next = b);
                    a.pending = b;
                }
                function Bi(a, b, c) {
                    if (0 !== (4194240 & c)) {
                        var d = b.lanes;
                        d &= a.pendingLanes;
                        c |= d;
                        b.lanes = c;
                        Cc(a, c);
                    }
                }
                var Rh = {
                    readContext: eh,
                    useCallback: P,
                    useContext: P,
                    useEffect: P,
                    useImperativeHandle: P,
                    useInsertionEffect: P,
                    useLayoutEffect: P,
                    useMemo: P,
                    useReducer: P,
                    useRef: P,
                    useState: P,
                    useDebugValue: P,
                    useDeferredValue: P,
                    useTransition: P,
                    useMutableSource: P,
                    useSyncExternalStore: P,
                    useId: P,
                    unstable_isNewReconciler: !1
                }, Oh = {
                    readContext: eh,
                    useCallback: function(a, b) {
                        Th().memoizedState = [
                            a,
                            void 0 === b ? null : b
                        ];
                        return a;
                    },
                    useContext: eh,
                    useEffect: mi,
                    useImperativeHandle: function(a, b, c) {
                        c = null != c ? c.concat([
                            a
                        ]) : null;
                        return ki(4194308, 4, pi.bind(null, b, a), c);
                    },
                    useLayoutEffect: function(a, b) {
                        return ki(4194308, 4, a, b);
                    },
                    useInsertionEffect: function(a, b) {
                        return ki(4, 2, a, b);
                    },
                    useMemo: function(a, b) {
                        var c = Th();
                        b = void 0 === b ? null : b;
                        a = a();
                        c.memoizedState = [
                            a,
                            b
                        ];
                        return a;
                    },
                    useReducer: function(a, b, c) {
                        var d = Th();
                        b = void 0 !== c ? c(b) : b;
                        d.memoizedState = d.baseState = b;
                        a = {
                            pending: null,
                            interleaved: null,
                            lanes: 0,
                            dispatch: null,
                            lastRenderedReducer: a,
                            lastRenderedState: b
                        };
                        d.queue = a;
                        a = a.dispatch = xi.bind(null, M, a);
                        return [
                            d.memoizedState,
                            a
                        ];
                    },
                    useRef: function(a) {
                        var b = Th();
                        a = {
                            current: a
                        };
                        return b.memoizedState = a;
                    },
                    useState: hi,
                    useDebugValue: ri,
                    useDeferredValue: function(a) {
                        return Th().memoizedState = a;
                    },
                    useTransition: function() {
                        var a = hi(!1), b = a[0];
                        a = vi.bind(null, a[1]);
                        Th().memoizedState = a;
                        return [
                            b,
                            a
                        ];
                    },
                    useMutableSource: function() {},
                    useSyncExternalStore: function(a, b, c) {
                        var d = M, e = Th();
                        if (I) {
                            if (void 0 === c) throw Error(p(407));
                            c = c();
                        } else {
                            c = b();
                            if (null === Q) throw Error(p(349));
                            0 !== (30 & Hh) || di(d, b, c);
                        }
                        e.memoizedState = c;
                        var f = {
                            value: c,
                            getSnapshot: b
                        };
                        e.queue = f;
                        mi(ai.bind(null, d, f, a), [
                            a
                        ]);
                        d.flags |= 2048;
                        bi(9, ci.bind(null, d, f, c, b), void 0, null);
                        return c;
                    },
                    useId: function() {
                        var a = Th(), b = Q.identifierPrefix;
                        if (I) {
                            var c = sg;
                            var d = rg;
                            c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
                            b = ":" + b + "R" + c;
                            c = Kh++;
                            0 < c && (b += "H" + c.toString(32));
                            b += ":";
                        } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
                        return a.memoizedState = b;
                    },
                    unstable_isNewReconciler: !1
                }, Ph = {
                    readContext: eh,
                    useCallback: si,
                    useContext: eh,
                    useEffect: $h,
                    useImperativeHandle: qi,
                    useInsertionEffect: ni,
                    useLayoutEffect: oi,
                    useMemo: ti,
                    useReducer: Wh,
                    useRef: ji,
                    useState: function() {
                        return Wh(Vh);
                    },
                    useDebugValue: ri,
                    useDeferredValue: function(a) {
                        var b = Uh();
                        return ui(b, N.memoizedState, a);
                    },
                    useTransition: function() {
                        var a = Wh(Vh)[0], b = Uh().memoizedState;
                        return [
                            a,
                            b
                        ];
                    },
                    useMutableSource: Yh,
                    useSyncExternalStore: Zh,
                    useId: wi,
                    unstable_isNewReconciler: !1
                }, Qh = {
                    readContext: eh,
                    useCallback: si,
                    useContext: eh,
                    useEffect: $h,
                    useImperativeHandle: qi,
                    useInsertionEffect: ni,
                    useLayoutEffect: oi,
                    useMemo: ti,
                    useReducer: Xh,
                    useRef: ji,
                    useState: function() {
                        return Xh(Vh);
                    },
                    useDebugValue: ri,
                    useDeferredValue: function(a) {
                        var b = Uh();
                        return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
                    },
                    useTransition: function() {
                        var a = Xh(Vh)[0], b = Uh().memoizedState;
                        return [
                            a,
                            b
                        ];
                    },
                    useMutableSource: Yh,
                    useSyncExternalStore: Zh,
                    useId: wi,
                    unstable_isNewReconciler: !1
                };
                function Ci(a, b) {
                    if (a && a.defaultProps) {
                        b = A({}, b);
                        a = a.defaultProps;
                        for(var c in a)void 0 === b[c] && (b[c] = a[c]);
                    }
                    return b;
                }
                function Di(a, b, c, d) {
                    b = a.memoizedState;
                    c = c(d, b);
                    c = null == c ? b : A({}, b, c);
                    a.memoizedState = c;
                    0 === a.lanes && (a.updateQueue.baseState = c);
                }
                var Ei = {
                    isMounted: function(a) {
                        return !!(a = a._reactInternals) && Vb(a) === a;
                    },
                    enqueueSetState: function(a, b, c) {
                        a = a._reactInternals;
                        var d = R(), e = yi(a), f = mh(d, e);
                        f.payload = b;
                        null != c && (f.callback = c);
                        b = nh(a, f, e);
                        null !== b && (gi(b, a, e, d), oh(b, a, e));
                    },
                    enqueueReplaceState: function(a, b, c) {
                        a = a._reactInternals;
                        var d = R(), e = yi(a), f = mh(d, e);
                        f.tag = 1;
                        f.payload = b;
                        null != c && (f.callback = c);
                        b = nh(a, f, e);
                        null !== b && (gi(b, a, e, d), oh(b, a, e));
                    },
                    enqueueForceUpdate: function(a, b) {
                        a = a._reactInternals;
                        var c = R(), d = yi(a), e = mh(c, d);
                        e.tag = 2;
                        null != b && (e.callback = b);
                        b = nh(a, e, d);
                        null !== b && (gi(b, a, d, c), oh(b, a, d));
                    }
                };
                function Fi(a, b, c, d, e, f, g) {
                    a = a.stateNode;
                    return "function" == typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : !b.prototype || !b.prototype.isPureReactComponent || !Ie(c, d) || !Ie(e, f);
                }
                function Gi(a, b, c) {
                    var d = !1, e = Vf;
                    var f = b.contextType;
                    "object" == typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null != d) ? Yf(a, e) : Vf);
                    b = new b(c, f);
                    a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
                    b.updater = Ei;
                    a.stateNode = b;
                    b._reactInternals = a;
                    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
                    return b;
                }
                function Hi(a, b, c, d) {
                    a = b.state;
                    "function" == typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
                    "function" == typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
                    b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
                }
                function Ii(a, b, c, d) {
                    var e = a.stateNode;
                    e.props = c;
                    e.state = a.memoizedState;
                    e.refs = {};
                    kh(a);
                    var f = b.contextType;
                    "object" == typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
                    e.state = a.memoizedState;
                    f = b.getDerivedStateFromProps;
                    "function" == typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
                    "function" == typeof b.getDerivedStateFromProps || "function" == typeof e.getSnapshotBeforeUpdate || "function" != typeof e.UNSAFE_componentWillMount && "function" != typeof e.componentWillMount || (b = e.state, "function" == typeof e.componentWillMount && e.componentWillMount(), "function" == typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
                    "function" == typeof e.componentDidMount && (a.flags |= 4194308);
                }
                function Ji(a, b) {
                    try {
                        var c = "", d = b;
                        do c += Pa(d), d = d.return;
                        while (d);
                        var e = c;
                    } catch (f) {
                        e = "\nError generating stack: " + f.message + "\n" + f.stack;
                    }
                    return {
                        value: a,
                        source: b,
                        stack: e,
                        digest: null
                    };
                }
                function Ki(a, b, c) {
                    return {
                        value: a,
                        source: null,
                        stack: null != c ? c : null,
                        digest: null != b ? b : null
                    };
                }
                function Li(a, b) {
                    try {
                        console.error(b.value);
                    } catch (c) {
                        setTimeout(function() {
                            throw c;
                        });
                    }
                }
                var Mi = "function" == typeof WeakMap ? WeakMap : Map;
                function Ni(a, b, c) {
                    c = mh(-1, c);
                    c.tag = 3;
                    c.payload = {
                        element: null
                    };
                    var d = b.value;
                    c.callback = function() {
                        Oi || (Oi = !0, Pi = d);
                        Li(a, b);
                    };
                    return c;
                }
                function Qi(a, b, c) {
                    c = mh(-1, c);
                    c.tag = 3;
                    var d = a.type.getDerivedStateFromError;
                    if ("function" == typeof d) {
                        var e = b.value;
                        c.payload = function() {
                            return d(e);
                        };
                        c.callback = function() {
                            Li(a, b);
                        };
                    }
                    var f = a.stateNode;
                    null !== f && "function" == typeof f.componentDidCatch && (c.callback = function() {
                        Li(a, b);
                        "function" != typeof d && (null === Ri ? Ri = new Set([
                            this
                        ]) : Ri.add(this));
                        var c = b.stack;
                        this.componentDidCatch(b.value, {
                            componentStack: null !== c ? c : ""
                        });
                    });
                    return c;
                }
                function Si(a, b, c) {
                    var d = a.pingCache;
                    if (null === d) {
                        d = a.pingCache = new Mi;
                        var e = new Set;
                        d.set(b, e);
                    } else e = d.get(b), void 0 === e && (e = new Set, d.set(b, e));
                    e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
                }
                function Ui(a) {
                    do {
                        var b;
                        if (b = 13 === a.tag) b = a.memoizedState, b = null === b || null !== b.dehydrated || !1;
                        if (b) return a;
                        a = a.return;
                    }while (null !== a);
                    return null;
                }
                function Vi(a, b, c, d, e) {
                    if (0 === (1 & a.mode)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
                    a.flags |= 65536;
                    a.lanes = e;
                    return a;
                }
                var Wi = ua.ReactCurrentOwner, dh = !1;
                function Xi(a, b, c, d) {
                    b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
                }
                function Yi(a, b, c, d, e) {
                    c = c.render;
                    var f = b.ref;
                    ch(b, e);
                    d = Nh(a, b, c, d, f, e);
                    c = Sh();
                    if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
                    I && c && vg(b);
                    b.flags |= 1;
                    Xi(a, b, d, e);
                    return b.child;
                }
                function $i(a, b, c, d, e) {
                    if (null === a) {
                        var f = c.type;
                        if ("function" == typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, bj(a, b, f, d, e);
                        a = Rg(c.type, null, d, b, b.mode, e);
                        a.ref = b.ref;
                        a.return = b;
                        return b.child = a;
                    }
                    f = a.child;
                    if (0 === (a.lanes & e)) {
                        var g = f.memoizedProps;
                        c = c.compare;
                        c = null !== c ? c : Ie;
                        if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
                    }
                    b.flags |= 1;
                    a = Pg(f, d);
                    a.ref = b.ref;
                    a.return = b;
                    return b.child = a;
                }
                function bj(a, b, c, d, e) {
                    if (null !== a) {
                        var f = a.memoizedProps;
                        if (Ie(f, d) && a.ref === b.ref) {
                            if (dh = !1, b.pendingProps = d = f, 0 === (a.lanes & e)) return b.lanes = a.lanes, Zi(a, b, e);
                            else 0 !== (131072 & a.flags) && (dh = !0);
                        }
                    }
                    return cj(a, b, c, d, e);
                }
                function dj(a, b, c) {
                    var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
                    if ("hidden" === d.mode) {
                        if (0 === (1 & b.mode)) b.memoizedState = {
                            baseLanes: 0,
                            cachePool: null,
                            transitions: null
                        }, G(ej, fj), fj |= c;
                        else {
                            if (0 === (1073741824 & c)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = {
                                baseLanes: a,
                                cachePool: null,
                                transitions: null
                            }, b.updateQueue = null, G(ej, fj), fj |= a, null;
                            b.memoizedState = {
                                baseLanes: 0,
                                cachePool: null,
                                transitions: null
                            };
                            d = null !== f ? f.baseLanes : c;
                            G(ej, fj);
                            fj |= d;
                        }
                    } else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
                    Xi(a, b, e, c);
                    return b.child;
                }
                function gj(a, b) {
                    var c = b.ref;
                    if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
                }
                function cj(a, b, c, d, e) {
                    var f = Zf(c) ? Xf : H.current;
                    f = Yf(b, f);
                    ch(b, e);
                    c = Nh(a, b, c, d, f, e);
                    d = Sh();
                    if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
                    I && d && vg(b);
                    b.flags |= 1;
                    Xi(a, b, c, e);
                    return b.child;
                }
                function hj(a, b, c, d, e) {
                    if (Zf(c)) {
                        var f = !0;
                        cg(b);
                    } else f = !1;
                    ch(b, e);
                    if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = !0;
                    else if (null === a) {
                        var g = b.stateNode, h = b.memoizedProps;
                        g.props = h;
                        var k = g.context, l = c.contextType;
                        "object" == typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
                        var m = c.getDerivedStateFromProps, q = "function" == typeof m || "function" == typeof g.getSnapshotBeforeUpdate;
                        q || "function" != typeof g.UNSAFE_componentWillReceiveProps && "function" != typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
                        jh = !1;
                        var r = b.memoizedState;
                        g.state = r;
                        qh(b, d, g, e);
                        k = b.memoizedState;
                        h !== d || r !== k || Wf.current || jh ? ("function" == typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r, k, l)) ? (q || "function" != typeof g.UNSAFE_componentWillMount && "function" != typeof g.componentWillMount || ("function" == typeof g.componentWillMount && g.componentWillMount(), "function" == typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" == typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" == typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" == typeof g.componentDidMount && (b.flags |= 4194308), d = !1);
                    } else {
                        g = b.stateNode;
                        lh(a, b);
                        h = b.memoizedProps;
                        l = b.type === b.elementType ? h : Ci(b.type, h);
                        g.props = l;
                        q = b.pendingProps;
                        r = g.context;
                        k = c.contextType;
                        "object" == typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
                        var y = c.getDerivedStateFromProps;
                        (m = "function" == typeof y || "function" == typeof g.getSnapshotBeforeUpdate) || "function" != typeof g.UNSAFE_componentWillReceiveProps && "function" != typeof g.componentWillReceiveProps || (h !== q || r !== k) && Hi(b, g, d, k);
                        jh = !1;
                        r = b.memoizedState;
                        g.state = r;
                        qh(b, d, g, e);
                        var n = b.memoizedState;
                        h !== q || r !== n || Wf.current || jh ? ("function" == typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r, n, k) || !1) ? (m || "function" != typeof g.UNSAFE_componentWillUpdate && "function" != typeof g.componentWillUpdate || ("function" == typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" == typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" == typeof g.componentDidUpdate && (b.flags |= 4), "function" == typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" != typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" != typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" != typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" != typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = !1);
                    }
                    return jj(a, b, c, d, f, e);
                }
                function jj(a, b, c, d, e, f) {
                    gj(a, b);
                    var g = 0 !== (128 & b.flags);
                    if (!d && !g) return e && dg(b, c, !1), Zi(a, b, f);
                    d = b.stateNode;
                    Wi.current = b;
                    var h = g && "function" != typeof c.getDerivedStateFromError ? null : d.render();
                    b.flags |= 1;
                    null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
                    b.memoizedState = d.state;
                    e && dg(b, c, !0);
                    return b.child;
                }
                function kj(a) {
                    var b = a.stateNode;
                    b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, !1);
                    yh(a, b.containerInfo);
                }
                function lj(a, b, c, d, e) {
                    Ig();
                    Jg(e);
                    b.flags |= 256;
                    Xi(a, b, c, d);
                    return b.child;
                }
                var mj = {
                    dehydrated: null,
                    treeContext: null,
                    retryLane: 0
                };
                function nj(a) {
                    return {
                        baseLanes: a,
                        cachePool: null,
                        transitions: null
                    };
                }
                function oj(a, b, c) {
                    var d = b.pendingProps, e = L.current, f = !1, g = 0 !== (128 & b.flags), h;
                    (h = g) || (h = (null === a || null !== a.memoizedState) && 0 !== (2 & e));
                    if (h) f = !0, b.flags &= -129;
                    else if (null === a || null !== a.memoizedState) e |= 1;
                    G(L, 1 & e);
                    if (null === a) {
                        Eg(b);
                        a = b.memoizedState;
                        if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (1 & b.mode) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
                        g = d.children;
                        a = d.fallback;
                        return f ? (d = b.mode, f = b.child, g = {
                            mode: "hidden",
                            children: g
                        }, 0 === (1 & d) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
                    }
                    e = a.memoizedState;
                    if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
                    if (f) {
                        f = d.fallback;
                        g = b.mode;
                        e = a.child;
                        h = e.sibling;
                        var k = {
                            mode: "hidden",
                            children: d.children
                        };
                        0 === (1 & g) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = 14680064 & e.subtreeFlags);
                        null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
                        f.return = b;
                        d.return = b;
                        d.sibling = f;
                        b.child = d;
                        d = f;
                        f = b.child;
                        g = a.child.memoizedState;
                        g = null === g ? nj(c) : {
                            baseLanes: g.baseLanes | c,
                            cachePool: null,
                            transitions: g.transitions
                        };
                        f.memoizedState = g;
                        f.childLanes = a.childLanes & ~c;
                        b.memoizedState = mj;
                        return d;
                    }
                    f = a.child;
                    a = f.sibling;
                    d = Pg(f, {
                        mode: "visible",
                        children: d.children
                    });
                    0 === (1 & b.mode) && (d.lanes = c);
                    d.return = b;
                    d.sibling = null;
                    null !== a && (c = b.deletions, null === c ? (b.deletions = [
                        a
                    ], b.flags |= 16) : c.push(a));
                    b.child = d;
                    b.memoizedState = null;
                    return d;
                }
                function qj(a, b) {
                    b = pj({
                        mode: "visible",
                        children: b
                    }, a.mode, 0, null);
                    b.return = a;
                    return a.child = b;
                }
                function sj(a, b, c, d) {
                    null !== d && Jg(d);
                    Ug(b, a.child, null, c);
                    a = qj(b, b.pendingProps.children);
                    a.flags |= 2;
                    b.memoizedState = null;
                    return a;
                }
                function rj(a, b, c, d, e, f, g) {
                    if (c) {
                        if (256 & b.flags) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
                        if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
                        f = d.fallback;
                        e = b.mode;
                        d = pj({
                            mode: "visible",
                            children: d.children
                        }, e, 0, null);
                        f = Tg(f, e, g, null);
                        f.flags |= 2;
                        d.return = b;
                        f.return = b;
                        d.sibling = f;
                        b.child = d;
                        0 !== (1 & b.mode) && Ug(b, a.child, null, g);
                        b.child.memoizedState = nj(g);
                        b.memoizedState = mj;
                        return f;
                    }
                    if (0 === (1 & b.mode)) return sj(a, b, g, null);
                    if ("$!" === e.data) {
                        d = e.nextSibling && e.nextSibling.dataset;
                        if (d) var h = d.dgst;
                        d = h;
                        f = Error(p(419));
                        d = Ki(f, d, void 0);
                        return sj(a, b, g, d);
                    }
                    h = 0 !== (g & a.childLanes);
                    if (dh || h) {
                        d = Q;
                        if (null !== d) {
                            switch(g & -g){
                                case 4:
                                    e = 2;
                                    break;
                                case 16:
                                    e = 8;
                                    break;
                                case 64:
                                case 128:
                                case 256:
                                case 512:
                                case 1024:
                                case 2048:
                                case 4096:
                                case 8192:
                                case 16384:
                                case 32768:
                                case 65536:
                                case 131072:
                                case 262144:
                                case 524288:
                                case 1048576:
                                case 2097152:
                                case 4194304:
                                case 8388608:
                                case 16777216:
                                case 33554432:
                                case 67108864:
                                    e = 32;
                                    break;
                                case 536870912:
                                    e = 268435456;
                                    break;
                                default:
                                    e = 0;
                            }
                            e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
                            0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
                        }
                        tj();
                        d = Ki(Error(p(421)));
                        return sj(a, b, g, d);
                    }
                    if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
                    a = f.treeContext;
                    yg = Lf(e.nextSibling);
                    xg = b;
                    I = !0;
                    zg = null;
                    null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
                    b = qj(b, d.children);
                    b.flags |= 4096;
                    return b;
                }
                function vj(a, b, c) {
                    a.lanes |= b;
                    var d = a.alternate;
                    null !== d && (d.lanes |= b);
                    bh(a.return, b, c);
                }
                function wj(a, b, c, d, e) {
                    var f = a.memoizedState;
                    null === f ? a.memoizedState = {
                        isBackwards: b,
                        rendering: null,
                        renderingStartTime: 0,
                        last: d,
                        tail: c,
                        tailMode: e
                    } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
                }
                function xj(a, b, c) {
                    var d = b.pendingProps, e = d.revealOrder, f = d.tail;
                    Xi(a, b, d.children, c);
                    d = L.current;
                    if (0 !== (2 & d)) d = 1 & d | 2, b.flags |= 128;
                    else {
                        if (null !== a && 0 !== (128 & a.flags)) a: for(a = b.child; null !== a;){
                            if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
                            else if (19 === a.tag) vj(a, c, b);
                            else if (null !== a.child) {
                                a.child.return = a;
                                a = a.child;
                                continue;
                            }
                            if (a === b) break;
                            for(; null === a.sibling;){
                                if (null === a.return || a.return === b) break a;
                                a = a.return;
                            }
                            a.sibling.return = a.return;
                            a = a.sibling;
                        }
                        d &= 1;
                    }
                    G(L, d);
                    if (0 === (1 & b.mode)) b.memoizedState = null;
                    else switch(e){
                        case "forwards":
                            c = b.child;
                            for(e = null; null !== c;)a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
                            c = e;
                            null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
                            wj(b, !1, e, c, f);
                            break;
                        case "backwards":
                            c = null;
                            e = b.child;
                            for(b.child = null; null !== e;){
                                a = e.alternate;
                                if (null !== a && null === Ch(a)) {
                                    b.child = e;
                                    break;
                                }
                                a = e.sibling;
                                e.sibling = c;
                                c = e;
                                e = a;
                            }
                            wj(b, !0, c, null, f);
                            break;
                        case "together":
                            wj(b, !1, null, null, void 0);
                            break;
                        default:
                            b.memoizedState = null;
                    }
                    return b.child;
                }
                function ij(a, b) {
                    0 === (1 & b.mode) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
                }
                function Zi(a, b, c) {
                    null !== a && (b.dependencies = a.dependencies);
                    rh |= b.lanes;
                    if (0 === (c & b.childLanes)) return null;
                    if (null !== a && b.child !== a.child) throw Error(p(153));
                    if (null !== b.child) {
                        a = b.child;
                        c = Pg(a, a.pendingProps);
                        b.child = c;
                        for(c.return = b; null !== a.sibling;)a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
                        c.sibling = null;
                    }
                    return b.child;
                }
                function yj(a, b, c) {
                    switch(b.tag){
                        case 3:
                            kj(b);
                            Ig();
                            break;
                        case 5:
                            Ah(b);
                            break;
                        case 1:
                            Zf(b.type) && cg(b);
                            break;
                        case 4:
                            yh(b, b.stateNode.containerInfo);
                            break;
                        case 10:
                            var d = b.type._context, e = b.memoizedProps.value;
                            G(Wg, d._currentValue);
                            d._currentValue = e;
                            break;
                        case 13:
                            d = b.memoizedState;
                            if (null !== d) {
                                if (null !== d.dehydrated) return G(L, 1 & L.current), b.flags |= 128, null;
                                if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
                                G(L, 1 & L.current);
                                a = Zi(a, b, c);
                                return null !== a ? a.sibling : null;
                            }
                            G(L, 1 & L.current);
                            break;
                        case 19:
                            d = 0 !== (c & b.childLanes);
                            if (0 !== (128 & a.flags)) {
                                if (d) return xj(a, b, c);
                                b.flags |= 128;
                            }
                            e = b.memoizedState;
                            null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
                            G(L, L.current);
                            if (!d) return null;
                            break;
                        case 22:
                        case 23:
                            return b.lanes = 0, dj(a, b, c);
                    }
                    return Zi(a, b, c);
                }
                var zj, Aj, Bj, Cj;
                zj = function(a, b) {
                    for(var c = b.child; null !== c;){
                        if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
                        else if (4 !== c.tag && null !== c.child) {
                            c.child.return = c;
                            c = c.child;
                            continue;
                        }
                        if (c === b) break;
                        for(; null === c.sibling;){
                            if (null === c.return || c.return === b) return;
                            c = c.return;
                        }
                        c.sibling.return = c.return;
                        c = c.sibling;
                    }
                };
                Aj = function() {};
                Bj = function(a, b, c, d) {
                    var e = a.memoizedProps;
                    if (e !== d) {
                        a = b.stateNode;
                        xh(uh.current);
                        var f = null;
                        switch(c){
                            case "input":
                                e = Ya(a, e);
                                d = Ya(a, d);
                                f = [];
                                break;
                            case "select":
                                e = A({}, e, {
                                    value: void 0
                                });
                                d = A({}, d, {
                                    value: void 0
                                });
                                f = [];
                                break;
                            case "textarea":
                                e = gb(a, e);
                                d = gb(a, d);
                                f = [];
                                break;
                            default:
                                "function" != typeof e.onClick && "function" == typeof d.onClick && (a.onclick = Bf);
                        }
                        ub(c, d);
                        var g;
                        c = null;
                        for(l in e)if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) {
                            if ("style" === l) {
                                var h = e[l];
                                for(g in h)h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
                            } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
                        }
                        for(l in d){
                            var k = d[l];
                            h = null != e ? e[l] : void 0;
                            if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) {
                                if ("style" === l) {
                                    if (h) {
                                        for(g in h)!h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
                                        for(g in k)k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
                                    } else c || (f || (f = []), f.push(l, c)), c = k;
                                } else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" != typeof k && "number" != typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
                            }
                        }
                        c && (f = f || []).push("style", c);
                        var l = f;
                        if (b.updateQueue = l) b.flags |= 4;
                    }
                };
                Cj = function(a, b, c, d) {
                    c !== d && (b.flags |= 4);
                };
                function Dj(a, b) {
                    if (!I) switch(a.tailMode){
                        case "hidden":
                            b = a.tail;
                            for(var c = null; null !== b;)null !== b.alternate && (c = b), b = b.sibling;
                            null === c ? a.tail = null : c.sibling = null;
                            break;
                        case "collapsed":
                            c = a.tail;
                            for(var d = null; null !== c;)null !== c.alternate && (d = c), c = c.sibling;
                            null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
                    }
                }
                function S(a) {
                    var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
                    if (b) for(var e = a.child; null !== e;)c |= e.lanes | e.childLanes, d |= 14680064 & e.subtreeFlags, d |= 14680064 & e.flags, e.return = a, e = e.sibling;
                    else for(e = a.child; null !== e;)c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
                    a.subtreeFlags |= d;
                    a.childLanes = c;
                    return b;
                }
                function Ej(a, b, c) {
                    var d = b.pendingProps;
                    wg(b);
                    switch(b.tag){
                        case 2:
                        case 16:
                        case 15:
                        case 0:
                        case 11:
                        case 7:
                        case 8:
                        case 12:
                        case 9:
                        case 14:
                            return S(b), null;
                        case 1:
                            return Zf(b.type) && $f(), S(b), null;
                        case 3:
                            d = b.stateNode;
                            zh();
                            E(Wf);
                            E(H);
                            Eh();
                            d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
                            if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (256 & b.flags) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
                            Aj(a, b);
                            S(b);
                            return null;
                        case 5:
                            Bh(b);
                            var e = xh(wh.current);
                            c = b.type;
                            if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
                            else {
                                if (!d) {
                                    if (null === b.stateNode) throw Error(p(166));
                                    S(b);
                                    return null;
                                }
                                a = xh(uh.current);
                                if (Gg(b)) {
                                    d = b.stateNode;
                                    c = b.type;
                                    var f = b.memoizedProps;
                                    d[Of] = b;
                                    d[Pf] = f;
                                    a = 0 !== (1 & b.mode);
                                    switch(c){
                                        case "dialog":
                                            D("cancel", d);
                                            D("close", d);
                                            break;
                                        case "iframe":
                                        case "object":
                                        case "embed":
                                            D("load", d);
                                            break;
                                        case "video":
                                        case "audio":
                                            for(e = 0; e < lf.length; e++)D(lf[e], d);
                                            break;
                                        case "source":
                                            D("error", d);
                                            break;
                                        case "img":
                                        case "image":
                                        case "link":
                                            D("error", d);
                                            D("load", d);
                                            break;
                                        case "details":
                                            D("toggle", d);
                                            break;
                                        case "input":
                                            Za(d, f);
                                            D("invalid", d);
                                            break;
                                        case "select":
                                            d._wrapperState = {
                                                wasMultiple: !!f.multiple
                                            };
                                            D("invalid", d);
                                            break;
                                        case "textarea":
                                            hb(d, f), D("invalid", d);
                                    }
                                    ub(c, f);
                                    e = null;
                                    for(var g in f)if (f.hasOwnProperty(g)) {
                                        var h = f[g];
                                        "children" === g ? "string" == typeof h ? d.textContent !== h && (!0 !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = [
                                            "children",
                                            h
                                        ]) : "number" == typeof h && d.textContent !== "" + h && (!0 !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = [
                                            "children",
                                            "" + h
                                        ]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
                                    }
                                    switch(c){
                                        case "input":
                                            Va(d);
                                            db(d, f, !0);
                                            break;
                                        case "textarea":
                                            Va(d);
                                            jb(d);
                                            break;
                                        case "select":
                                        case "option":
                                            break;
                                        default:
                                            "function" == typeof f.onClick && (d.onclick = Bf);
                                    }
                                    d = e;
                                    b.updateQueue = d;
                                    null !== d && (b.flags |= 4);
                                } else {
                                    g = 9 === e.nodeType ? e : e.ownerDocument;
                                    "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
                                    "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script>\x3c/script>", a = a.removeChild(a.firstChild)) : "string" == typeof d.is ? a = g.createElement(c, {
                                        is: d.is
                                    }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = !0 : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
                                    a[Of] = b;
                                    a[Pf] = d;
                                    zj(a, b, !1, !1);
                                    b.stateNode = a;
                                    a: {
                                        g = vb(c, d);
                                        switch(c){
                                            case "dialog":
                                                D("cancel", a);
                                                D("close", a);
                                                e = d;
                                                break;
                                            case "iframe":
                                            case "object":
                                            case "embed":
                                                D("load", a);
                                                e = d;
                                                break;
                                            case "video":
                                            case "audio":
                                                for(e = 0; e < lf.length; e++)D(lf[e], a);
                                                e = d;
                                                break;
                                            case "source":
                                                D("error", a);
                                                e = d;
                                                break;
                                            case "img":
                                            case "image":
                                            case "link":
                                                D("error", a);
                                                D("load", a);
                                                e = d;
                                                break;
                                            case "details":
                                                D("toggle", a);
                                                e = d;
                                                break;
                                            case "input":
                                                Za(a, d);
                                                e = Ya(a, d);
                                                D("invalid", a);
                                                break;
                                            case "option":
                                                e = d;
                                                break;
                                            case "select":
                                                a._wrapperState = {
                                                    wasMultiple: !!d.multiple
                                                };
                                                e = A({}, d, {
                                                    value: void 0
                                                });
                                                D("invalid", a);
                                                break;
                                            case "textarea":
                                                hb(a, d);
                                                e = gb(a, d);
                                                D("invalid", a);
                                                break;
                                            default:
                                                e = d;
                                        }
                                        ub(c, e);
                                        h = e;
                                        for(f in h)if (h.hasOwnProperty(f)) {
                                            var k = h[f];
                                            "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" == typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" == typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
                                        }
                                        switch(c){
                                            case "input":
                                                Va(a);
                                                db(a, d, !1);
                                                break;
                                            case "textarea":
                                                Va(a);
                                                jb(a);
                                                break;
                                            case "option":
                                                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                                                break;
                                            case "select":
                                                a.multiple = !!d.multiple;
                                                f = d.value;
                                                null != f ? fb(a, !!d.multiple, f, !1) : null != d.defaultValue && fb(a, !!d.multiple, d.defaultValue, !0);
                                                break;
                                            default:
                                                "function" == typeof e.onClick && (a.onclick = Bf);
                                        }
                                        switch(c){
                                            case "button":
                                            case "input":
                                            case "select":
                                            case "textarea":
                                                d = !!d.autoFocus;
                                                break a;
                                            case "img":
                                                d = !0;
                                                break a;
                                            default:
                                                d = !1;
                                        }
                                    }
                                    d && (b.flags |= 4);
                                }
                                null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
                            }
                            S(b);
                            return null;
                        case 6:
                            if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
                            else {
                                if ("string" != typeof d && null === b.stateNode) throw Error(p(166));
                                c = xh(wh.current);
                                xh(uh.current);
                                if (Gg(b)) {
                                    d = b.stateNode;
                                    c = b.memoizedProps;
                                    d[Of] = b;
                                    if (f = d.nodeValue !== c) {
                                        if (a = xg, null !== a) switch(a.tag){
                                            case 3:
                                                Af(d.nodeValue, c, 0 !== (1 & a.mode));
                                                break;
                                            case 5:
                                                !0 !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (1 & a.mode));
                                        }
                                    }
                                    f && (b.flags |= 4);
                                } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
                            }
                            S(b);
                            return null;
                        case 13:
                            E(L);
                            d = b.memoizedState;
                            if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
                                if (I && null !== yg && 0 !== (1 & b.mode) && 0 === (128 & b.flags)) Hg(), Ig(), b.flags |= 98560, f = !1;
                                else if (f = Gg(b), null !== d && null !== d.dehydrated) {
                                    if (null === a) {
                                        if (!f) throw Error(p(318));
                                        f = b.memoizedState;
                                        f = null !== f ? f.dehydrated : null;
                                        if (!f) throw Error(p(317));
                                        f[Of] = b;
                                    } else Ig(), 0 === (128 & b.flags) && (b.memoizedState = null), b.flags |= 4;
                                    S(b);
                                    f = !1;
                                } else null !== zg && (Fj(zg), zg = null), f = !0;
                                if (!f) return 65536 & b.flags ? b : null;
                            }
                            if (0 !== (128 & b.flags)) return b.lanes = c, b;
                            d = null !== d;
                            d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (1 & b.mode) && (null === a || 0 !== (1 & L.current) ? 0 === T && (T = 3) : tj()));
                            null !== b.updateQueue && (b.flags |= 4);
                            S(b);
                            return null;
                        case 4:
                            return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
                        case 10:
                            return ah(b.type._context), S(b), null;
                        case 17:
                            return Zf(b.type) && $f(), S(b), null;
                        case 19:
                            E(L);
                            f = b.memoizedState;
                            if (null === f) return S(b), null;
                            d = 0 !== (128 & b.flags);
                            g = f.rendering;
                            if (null === g) {
                                if (d) Dj(f, !1);
                                else {
                                    if (0 !== T || null !== a && 0 !== (128 & a.flags)) for(a = b.child; null !== a;){
                                        g = Ch(a);
                                        if (null !== g) {
                                            b.flags |= 128;
                                            Dj(f, !1);
                                            d = g.updateQueue;
                                            null !== d && (b.updateQueue = d, b.flags |= 4);
                                            b.subtreeFlags = 0;
                                            d = c;
                                            for(c = b.child; null !== c;)f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : {
                                                lanes: a.lanes,
                                                firstContext: a.firstContext
                                            }), c = c.sibling;
                                            G(L, 1 & L.current | 2);
                                            return b.child;
                                        }
                                        a = a.sibling;
                                    }
                                    null !== f.tail && B() > Gj && (b.flags |= 128, d = !0, Dj(f, !1), b.lanes = 4194304);
                                }
                            } else {
                                if (!d) {
                                    if (a = Ch(g), null !== a) {
                                        if (b.flags |= 128, d = !0, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, !0), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;
                                    } else 2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = !0, Dj(f, !1), b.lanes = 4194304);
                                }
                                f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
                            }
                            if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? 1 & c | 2 : 1 & c), b;
                            S(b);
                            return null;
                        case 22:
                        case 23:
                            return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (1 & b.mode) ? 0 !== (1073741824 & fj) && (S(b), 6 & b.subtreeFlags && (b.flags |= 8192)) : S(b), null;
                        case 24:
                            return null;
                        case 25:
                            return null;
                    }
                    throw Error(p(156, b.tag));
                }
                function Ij(a, b) {
                    wg(b);
                    switch(b.tag){
                        case 1:
                            return Zf(b.type) && $f(), a = b.flags, 65536 & a ? (b.flags = -65537 & a | 128, b) : null;
                        case 3:
                            return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (65536 & a) && 0 === (128 & a) ? (b.flags = -65537 & a | 128, b) : null;
                        case 5:
                            return Bh(b), null;
                        case 13:
                            E(L);
                            a = b.memoizedState;
                            if (null !== a && null !== a.dehydrated) {
                                if (null === b.alternate) throw Error(p(340));
                                Ig();
                            }
                            a = b.flags;
                            return 65536 & a ? (b.flags = -65537 & a | 128, b) : null;
                        case 19:
                            return E(L), null;
                        case 4:
                            return zh(), null;
                        case 10:
                            return ah(b.type._context), null;
                        case 22:
                        case 23:
                            return Hj(), null;
                        case 24:
                            return null;
                        default:
                            return null;
                    }
                }
                var Jj = !1, U = !1, Kj = "function" == typeof WeakSet ? WeakSet : Set, V = null;
                function Lj(a, b) {
                    var c = a.ref;
                    if (null !== c) {
                        if ("function" == typeof c) try {
                            c(null);
                        } catch (d) {
                            W(a, b, d);
                        }
                        else c.current = null;
                    }
                }
                function Mj(a, b, c) {
                    try {
                        c();
                    } catch (d) {
                        W(a, b, d);
                    }
                }
                var Nj = !1;
                function Oj(a, b) {
                    Cf = dd;
                    a = Me();
                    if (Ne(a)) {
                        if ("selectionStart" in a) var c = {
                            start: a.selectionStart,
                            end: a.selectionEnd
                        };
                        else a: {
                            c = (c = a.ownerDocument) && c.defaultView || window;
                            var d = c.getSelection && c.getSelection();
                            if (d && 0 !== d.rangeCount) {
                                c = d.anchorNode;
                                var e = d.anchorOffset, f = d.focusNode;
                                d = d.focusOffset;
                                try {
                                    c.nodeType, f.nodeType;
                                } catch (F) {
                                    c = null;
                                    break a;
                                }
                                var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
                                b: for(;;){
                                    for(var y;;){
                                        q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
                                        q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
                                        3 === q.nodeType && (g += q.nodeValue.length);
                                        if (null === (y = q.firstChild)) break;
                                        r = q;
                                        q = y;
                                    }
                                    for(;;){
                                        if (q === a) break b;
                                        r === c && ++l === e && (h = g);
                                        r === f && ++m === d && (k = g);
                                        if (null !== (y = q.nextSibling)) break;
                                        q = r;
                                        r = q.parentNode;
                                    }
                                    q = y;
                                }
                                c = -1 === h || -1 === k ? null : {
                                    start: h,
                                    end: k
                                };
                            } else c = null;
                        }
                        c = c || {
                            start: 0,
                            end: 0
                        };
                    } else c = null;
                    Df = {
                        focusedElem: a,
                        selectionRange: c
                    };
                    dd = !1;
                    for(V = b; null !== V;)if (b = V, a = b.child, 0 !== (1028 & b.subtreeFlags) && null !== a) a.return = b, V = a;
                    else for(; null !== V;){
                        b = V;
                        try {
                            var n = b.alternate;
                            if (0 !== (1024 & b.flags)) switch(b.tag){
                                case 0:
                                case 11:
                                case 15:
                                    break;
                                case 1:
                                    if (null !== n) {
                                        var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J);
                                        x.__reactInternalSnapshotBeforeUpdate = w;
                                    }
                                    break;
                                case 3:
                                    var u = b.stateNode.containerInfo;
                                    1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
                                    break;
                                case 5:
                                case 6:
                                case 4:
                                case 17:
                                    break;
                                default:
                                    throw Error(p(163));
                            }
                        } catch (F) {
                            W(b, b.return, F);
                        }
                        a = b.sibling;
                        if (null !== a) {
                            a.return = b.return;
                            V = a;
                            break;
                        }
                        V = b.return;
                    }
                    n = Nj;
                    Nj = !1;
                    return n;
                }
                function Pj(a, b, c) {
                    var d = b.updateQueue;
                    d = null !== d ? d.lastEffect : null;
                    if (null !== d) {
                        var e = d = d.next;
                        do {
                            if ((e.tag & a) === a) {
                                var f = e.destroy;
                                e.destroy = void 0;
                                void 0 !== f && Mj(b, c, f);
                            }
                            e = e.next;
                        }while (e !== d);
                    }
                }
                function Qj(a, b) {
                    b = b.updateQueue;
                    b = null !== b ? b.lastEffect : null;
                    if (null !== b) {
                        var c = b = b.next;
                        do {
                            if ((c.tag & a) === a) {
                                var d = c.create;
                                c.destroy = d();
                            }
                            c = c.next;
                        }while (c !== b);
                    }
                }
                function Rj(a) {
                    var b = a.ref;
                    if (null !== b) {
                        var c = a.stateNode;
                        switch(a.tag){
                            case 5:
                                a = c;
                                break;
                            default:
                                a = c;
                        }
                        "function" == typeof b ? b(a) : b.current = a;
                    }
                }
                function Sj(a) {
                    var b = a.alternate;
                    null !== b && (a.alternate = null, Sj(b));
                    a.child = null;
                    a.deletions = null;
                    a.sibling = null;
                    5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
                    a.stateNode = null;
                    a.return = null;
                    a.dependencies = null;
                    a.memoizedProps = null;
                    a.memoizedState = null;
                    a.pendingProps = null;
                    a.stateNode = null;
                    a.updateQueue = null;
                }
                function Tj(a) {
                    return 5 === a.tag || 3 === a.tag || 4 === a.tag;
                }
                function Uj(a) {
                    a: for(;;){
                        for(; null === a.sibling;){
                            if (null === a.return || Tj(a.return)) return null;
                            a = a.return;
                        }
                        a.sibling.return = a.return;
                        for(a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;){
                            if (2 & a.flags) continue a;
                            if (null === a.child || 4 === a.tag) continue a;
                            a.child.return = a, a = a.child;
                        }
                        if (!(2 & a.flags)) return a.stateNode;
                    }
                }
                function Vj(a, b, c) {
                    var d = a.tag;
                    if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null != c || null !== b.onclick || (b.onclick = Bf));
                    else if (4 !== d && (a = a.child, null !== a)) for(Vj(a, b, c), a = a.sibling; null !== a;)Vj(a, b, c), a = a.sibling;
                }
                function Wj(a, b, c) {
                    var d = a.tag;
                    if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
                    else if (4 !== d && (a = a.child, null !== a)) for(Wj(a, b, c), a = a.sibling; null !== a;)Wj(a, b, c), a = a.sibling;
                }
                var X = null, Xj = !1;
                function Yj(a, b, c) {
                    for(c = c.child; null !== c;)Zj(a, b, c), c = c.sibling;
                }
                function Zj(a, b, c) {
                    if (lc && "function" == typeof lc.onCommitFiberUnmount) try {
                        lc.onCommitFiberUnmount(kc, c);
                    } catch (h) {}
                    switch(c.tag){
                        case 5:
                            U || Lj(c, b);
                        case 6:
                            var d = X, e = Xj;
                            X = null;
                            Yj(a, b, c);
                            X = d;
                            Xj = e;
                            null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
                            break;
                        case 18:
                            null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
                            break;
                        case 4:
                            d = X;
                            e = Xj;
                            X = c.stateNode.containerInfo;
                            Xj = !0;
                            Yj(a, b, c);
                            X = d;
                            Xj = e;
                            break;
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                            if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
                                e = d = d.next;
                                do {
                                    var f = e, g = f.destroy;
                                    f = f.tag;
                                    void 0 !== g && (0 !== (2 & f) ? Mj(c, b, g) : 0 !== (4 & f) && Mj(c, b, g));
                                    e = e.next;
                                }while (e !== d);
                            }
                            Yj(a, b, c);
                            break;
                        case 1:
                            if (!U && (Lj(c, b), d = c.stateNode, "function" == typeof d.componentWillUnmount)) try {
                                d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
                            } catch (h) {
                                W(c, b, h);
                            }
                            Yj(a, b, c);
                            break;
                        case 21:
                            Yj(a, b, c);
                            break;
                        case 22:
                            1 & c.mode ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
                            break;
                        default:
                            Yj(a, b, c);
                    }
                }
                function ak(a) {
                    var b = a.updateQueue;
                    if (null !== b) {
                        a.updateQueue = null;
                        var c = a.stateNode;
                        null === c && (c = a.stateNode = new Kj);
                        b.forEach(function(b) {
                            var d = bk.bind(null, a, b);
                            c.has(b) || (c.add(b), b.then(d, d));
                        });
                    }
                }
                function ck(a, b) {
                    var c = b.deletions;
                    if (null !== c) for(var d = 0; d < c.length; d++){
                        var e = c[d];
                        try {
                            var f = a, g = b, h = g;
                            a: for(; null !== h;){
                                switch(h.tag){
                                    case 5:
                                        X = h.stateNode;
                                        Xj = !1;
                                        break a;
                                    case 3:
                                        X = h.stateNode.containerInfo;
                                        Xj = !0;
                                        break a;
                                    case 4:
                                        X = h.stateNode.containerInfo;
                                        Xj = !0;
                                        break a;
                                }
                                h = h.return;
                            }
                            if (null === X) throw Error(p(160));
                            Zj(f, g, e);
                            X = null;
                            Xj = !1;
                            var k = e.alternate;
                            null !== k && (k.return = null);
                            e.return = null;
                        } catch (l) {
                            W(e, b, l);
                        }
                    }
                    if (12854 & b.subtreeFlags) for(b = b.child; null !== b;)dk(b, a), b = b.sibling;
                }
                function dk(a, b) {
                    var c = a.alternate, d = a.flags;
                    switch(a.tag){
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                            ck(b, a);
                            ek(a);
                            if (4 & d) {
                                try {
                                    Pj(3, a, a.return), Qj(3, a);
                                } catch (t) {
                                    W(a, a.return, t);
                                }
                                try {
                                    Pj(5, a, a.return);
                                } catch (t) {
                                    W(a, a.return, t);
                                }
                            }
                            break;
                        case 1:
                            ck(b, a);
                            ek(a);
                            512 & d && null !== c && Lj(c, c.return);
                            break;
                        case 5:
                            ck(b, a);
                            ek(a);
                            512 & d && null !== c && Lj(c, c.return);
                            if (32 & a.flags) {
                                var e = a.stateNode;
                                try {
                                    ob(e, "");
                                } catch (t) {
                                    W(a, a.return, t);
                                }
                            }
                            if (4 & d && (e = a.stateNode, null != e)) {
                                var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
                                a.updateQueue = null;
                                if (null !== k) try {
                                    "input" === h && "radio" === f.type && null != f.name && ab(e, f);
                                    vb(h, g);
                                    var l = vb(h, f);
                                    for(g = 0; g < k.length; g += 2){
                                        var m = k[g], q = k[g + 1];
                                        "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
                                    }
                                    switch(h){
                                        case "input":
                                            bb(e, f);
                                            break;
                                        case "textarea":
                                            ib(e, f);
                                            break;
                                        case "select":
                                            var r = e._wrapperState.wasMultiple;
                                            e._wrapperState.wasMultiple = !!f.multiple;
                                            var y = f.value;
                                            null != y ? fb(e, !!f.multiple, y, !1) : !!f.multiple !== r && (null != f.defaultValue ? fb(e, !!f.multiple, f.defaultValue, !0) : fb(e, !!f.multiple, f.multiple ? [] : "", !1));
                                    }
                                    e[Pf] = f;
                                } catch (t) {
                                    W(a, a.return, t);
                                }
                            }
                            break;
                        case 6:
                            ck(b, a);
                            ek(a);
                            if (4 & d) {
                                if (null === a.stateNode) throw Error(p(162));
                                e = a.stateNode;
                                f = a.memoizedProps;
                                try {
                                    e.nodeValue = f;
                                } catch (t) {
                                    W(a, a.return, t);
                                }
                            }
                            break;
                        case 3:
                            ck(b, a);
                            ek(a);
                            if (4 & d && null !== c && c.memoizedState.isDehydrated) try {
                                bd(b.containerInfo);
                            } catch (t) {
                                W(a, a.return, t);
                            }
                            break;
                        case 4:
                            ck(b, a);
                            ek(a);
                            break;
                        case 13:
                            ck(b, a);
                            ek(a);
                            e = a.child;
                            8192 & e.flags && (f = null !== e.memoizedState, e.stateNode.isHidden = f, f && (null === e.alternate || null === e.alternate.memoizedState) && (fk = B()));
                            4 & d && ak(a);
                            break;
                        case 22:
                            m = null !== c && null !== c.memoizedState;
                            1 & a.mode ? (U = (l = U) || m, ck(b, a), U = l) : ck(b, a);
                            ek(a);
                            if (8192 & d) {
                                l = null !== a.memoizedState;
                                if ((a.stateNode.isHidden = l) && !m && 0 !== (1 & a.mode)) for(V = a, m = a.child; null !== m;){
                                    for(q = V = m; null !== V;){
                                        r = V;
                                        y = r.child;
                                        switch(r.tag){
                                            case 0:
                                            case 11:
                                            case 14:
                                            case 15:
                                                Pj(4, r, r.return);
                                                break;
                                            case 1:
                                                Lj(r, r.return);
                                                var n = r.stateNode;
                                                if ("function" == typeof n.componentWillUnmount) {
                                                    d = r;
                                                    c = r.return;
                                                    try {
                                                        b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                                                    } catch (t) {
                                                        W(d, c, t);
                                                    }
                                                }
                                                break;
                                            case 5:
                                                Lj(r, r.return);
                                                break;
                                            case 22:
                                                if (null !== r.memoizedState) {
                                                    gk(q);
                                                    continue;
                                                }
                                        }
                                        null !== y ? (y.return = r, V = y) : gk(q);
                                    }
                                    m = m.sibling;
                                }
                                a: for(m = null, q = a;;){
                                    if (5 === q.tag) {
                                        if (null === m) {
                                            m = q;
                                            try {
                                                e = q.stateNode, l ? (f = e.style, "function" == typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = null != k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                                            } catch (t) {
                                                W(a, a.return, t);
                                            }
                                        }
                                    } else if (6 === q.tag) {
                                        if (null === m) try {
                                            q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                                        } catch (t) {
                                            W(a, a.return, t);
                                        }
                                    } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
                                        q.child.return = q;
                                        q = q.child;
                                        continue;
                                    }
                                    if (q === a) break;
                                    for(; null === q.sibling;){
                                        if (null === q.return || q.return === a) break a;
                                        m === q && (m = null);
                                        q = q.return;
                                    }
                                    m === q && (m = null);
                                    q.sibling.return = q.return;
                                    q = q.sibling;
                                }
                            }
                            break;
                        case 19:
                            ck(b, a);
                            ek(a);
                            4 & d && ak(a);
                            break;
                        case 21:
                            break;
                        default:
                            ck(b, a), ek(a);
                    }
                }
                function ek(a) {
                    var b = a.flags;
                    if (2 & b) {
                        try {
                            a: {
                                for(var c = a.return; null !== c;){
                                    if (Tj(c)) {
                                        var d = c;
                                        break a;
                                    }
                                    c = c.return;
                                }
                                throw Error(p(160));
                            }
                            switch(d.tag){
                                case 5:
                                    var e = d.stateNode;
                                    32 & d.flags && (ob(e, ""), d.flags &= -33);
                                    var f = Uj(a);
                                    Wj(a, f, e);
                                    break;
                                case 3:
                                case 4:
                                    var g = d.stateNode.containerInfo, h = Uj(a);
                                    Vj(a, h, g);
                                    break;
                                default:
                                    throw Error(p(161));
                            }
                        } catch (k) {
                            W(a, a.return, k);
                        }
                        a.flags &= -3;
                    }
                    4096 & b && (a.flags &= -4097);
                }
                function hk(a, b, c) {
                    V = a;
                    ik(a, b, c);
                }
                function ik(a, b, c) {
                    for(var d = 0 !== (1 & a.mode); null !== V;){
                        var e = V, f = e.child;
                        if (22 === e.tag && d) {
                            var g = null !== e.memoizedState || Jj;
                            if (!g) {
                                var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
                                h = Jj;
                                var l = U;
                                Jj = g;
                                if ((U = k) && !l) for(V = e; null !== V;)g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
                                for(; null !== f;)V = f, ik(f, b, c), f = f.sibling;
                                V = e;
                                Jj = h;
                                U = l;
                            }
                            kk(a, b, c);
                        } else 0 !== (8772 & e.subtreeFlags) && null !== f ? (f.return = e, V = f) : kk(a, b, c);
                    }
                }
                function kk(a) {
                    for(; null !== V;){
                        var b = V;
                        if (0 !== (8772 & b.flags)) {
                            var c = b.alternate;
                            try {
                                if (0 !== (8772 & b.flags)) switch(b.tag){
                                    case 0:
                                    case 11:
                                    case 15:
                                        U || Qj(5, b);
                                        break;
                                    case 1:
                                        var d = b.stateNode;
                                        if (4 & b.flags && !U) {
                                            if (null === c) d.componentDidMount();
                                            else {
                                                var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                                                d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                                            }
                                        }
                                        var f = b.updateQueue;
                                        null !== f && sh(b, f, d);
                                        break;
                                    case 3:
                                        var g = b.updateQueue;
                                        if (null !== g) {
                                            c = null;
                                            if (null !== b.child) switch(b.child.tag){
                                                case 5:
                                                    c = b.child.stateNode;
                                                    break;
                                                case 1:
                                                    c = b.child.stateNode;
                                            }
                                            sh(b, g, c);
                                        }
                                        break;
                                    case 5:
                                        var h = b.stateNode;
                                        if (null === c && 4 & b.flags) {
                                            c = h;
                                            var k = b.memoizedProps;
                                            switch(b.type){
                                                case "button":
                                                case "input":
                                                case "select":
                                                case "textarea":
                                                    k.autoFocus && c.focus();
                                                    break;
                                                case "img":
                                                    k.src && (c.src = k.src);
                                            }
                                        }
                                        break;
                                    case 6:
                                        break;
                                    case 4:
                                        break;
                                    case 12:
                                        break;
                                    case 13:
                                        if (null === b.memoizedState) {
                                            var l = b.alternate;
                                            if (null !== l) {
                                                var m = l.memoizedState;
                                                if (null !== m) {
                                                    var q = m.dehydrated;
                                                    null !== q && bd(q);
                                                }
                                            }
                                        }
                                        break;
                                    case 19:
                                    case 17:
                                    case 21:
                                    case 22:
                                    case 23:
                                    case 25:
                                        break;
                                    default:
                                        throw Error(p(163));
                                }
                                U || 512 & b.flags && Rj(b);
                            } catch (r) {
                                W(b, b.return, r);
                            }
                        }
                        if (b === a) {
                            V = null;
                            break;
                        }
                        c = b.sibling;
                        if (null !== c) {
                            c.return = b.return;
                            V = c;
                            break;
                        }
                        V = b.return;
                    }
                }
                function gk(a) {
                    for(; null !== V;){
                        var b = V;
                        if (b === a) {
                            V = null;
                            break;
                        }
                        var c = b.sibling;
                        if (null !== c) {
                            c.return = b.return;
                            V = c;
                            break;
                        }
                        V = b.return;
                    }
                }
                function jk(a) {
                    for(; null !== V;){
                        var b = V;
                        try {
                            switch(b.tag){
                                case 0:
                                case 11:
                                case 15:
                                    var c = b.return;
                                    try {
                                        Qj(4, b);
                                    } catch (k) {
                                        W(b, c, k);
                                    }
                                    break;
                                case 1:
                                    var d = b.stateNode;
                                    if ("function" == typeof d.componentDidMount) {
                                        var e = b.return;
                                        try {
                                            d.componentDidMount();
                                        } catch (k) {
                                            W(b, e, k);
                                        }
                                    }
                                    var f = b.return;
                                    try {
                                        Rj(b);
                                    } catch (k) {
                                        W(b, f, k);
                                    }
                                    break;
                                case 5:
                                    var g = b.return;
                                    try {
                                        Rj(b);
                                    } catch (k) {
                                        W(b, g, k);
                                    }
                            }
                        } catch (k) {
                            W(b, b.return, k);
                        }
                        if (b === a) {
                            V = null;
                            break;
                        }
                        var h = b.sibling;
                        if (null !== h) {
                            h.return = b.return;
                            V = h;
                            break;
                        }
                        V = b.return;
                    }
                }
                var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = 1 / 0, uk = null, Oi = !1, Pi = null, Ri = null, vk = !1, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
                function R() {
                    return 0 !== (6 & K) ? B() : -1 !== Ak ? Ak : Ak = B();
                }
                function yi(a) {
                    if (0 === (1 & a.mode)) return 1;
                    if (0 !== (2 & K) && 0 !== Z) return Z & -Z;
                    if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
                    a = C;
                    if (0 !== a) return a;
                    a = window.event;
                    a = void 0 === a ? 16 : jd(a.type);
                    return a;
                }
                function gi(a, b, c, d) {
                    if (50 < yk) throw yk = 0, zk = null, Error(p(185));
                    Ac(a, c, d);
                    if (0 === (2 & K) || a !== Q) a === Q && (0 === (2 & K) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (1 & b.mode) && (Gj = B() + 500, fg && jg());
                }
                function Dk(a, b) {
                    var c = a.callbackNode;
                    wc(a, b);
                    var d = uc(a, a === Q ? Z : 0);
                    if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
                    else if (b = d & -d, a.callbackPriority !== b) {
                        null != c && bc(c);
                        if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
                            0 === (6 & K) && jg();
                        }), c = null;
                        else {
                            switch(Dc(d)){
                                case 1:
                                    c = fc;
                                    break;
                                case 4:
                                    c = gc;
                                    break;
                                case 16:
                                    c = hc;
                                    break;
                                case 536870912:
                                    c = jc;
                                    break;
                                default:
                                    c = hc;
                            }
                            c = Fk(c, Gk.bind(null, a));
                        }
                        a.callbackPriority = b;
                        a.callbackNode = c;
                    }
                }
                function Gk(a, b) {
                    Ak = -1;
                    Bk = 0;
                    if (0 !== (6 & K)) throw Error(p(327));
                    var c = a.callbackNode;
                    if (Hk() && a.callbackNode !== c) return null;
                    var d = uc(a, a === Q ? Z : 0);
                    if (0 === d) return null;
                    if (0 !== (30 & d) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
                    else {
                        b = d;
                        var e = K;
                        K |= 2;
                        var f = Jk();
                        if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
                        for(;;)try {
                            Lk();
                            break;
                        } catch (h) {
                            Mk(a, h);
                        }
                        $g();
                        mk.current = f;
                        K = e;
                        null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
                    }
                    if (0 !== b) {
                        2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
                        if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
                        if (6 === b) Ck(a, d);
                        else {
                            e = a.current.alternate;
                            if (0 === (30 & d) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
                            a.finishedWork = e;
                            a.finishedLanes = d;
                            switch(b){
                                case 0:
                                case 1:
                                    throw Error(p(345));
                                case 2:
                                    Pk(a, tk, uk);
                                    break;
                                case 3:
                                    Ck(a, d);
                                    if ((130023424 & d) === d && (b = fk + 500 - B(), 10 < b)) {
                                        if (0 !== uc(a, 0)) break;
                                        e = a.suspendedLanes;
                                        if ((e & d) !== d) {
                                            R();
                                            a.pingedLanes |= a.suspendedLanes & e;
                                            break;
                                        }
                                        a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
                                        break;
                                    }
                                    Pk(a, tk, uk);
                                    break;
                                case 4:
                                    Ck(a, d);
                                    if ((4194240 & d) === d) break;
                                    b = a.eventTimes;
                                    for(e = -1; 0 < d;){
                                        var g = 31 - oc(d);
                                        f = 1 << g;
                                        g = b[g];
                                        g > e && (e = g);
                                        d &= ~f;
                                    }
                                    d = e;
                                    d = B() - d;
                                    d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3E3 > d ? 3E3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
                                    if (10 < d) {
                                        a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
                                        break;
                                    }
                                    Pk(a, tk, uk);
                                    break;
                                case 5:
                                    Pk(a, tk, uk);
                                    break;
                                default:
                                    throw Error(p(329));
                            }
                        }
                    }
                    Dk(a, B());
                    return a.callbackNode === c ? Gk.bind(null, a) : null;
                }
                function Nk(a, b) {
                    var c = sk;
                    a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
                    a = Ik(a, b);
                    2 !== a && (b = tk, tk = c, null !== b && Fj(b));
                    return a;
                }
                function Fj(a) {
                    null === tk ? tk = a : tk.push.apply(tk, a);
                }
                function Ok(a) {
                    for(var b = a;;){
                        if (16384 & b.flags) {
                            var c = b.updateQueue;
                            if (null !== c && (c = c.stores, null !== c)) for(var d = 0; d < c.length; d++){
                                var e = c[d], f = e.getSnapshot;
                                e = e.value;
                                try {
                                    if (!He(f(), e)) return !1;
                                } catch (g) {
                                    return !1;
                                }
                            }
                        }
                        c = b.child;
                        if (16384 & b.subtreeFlags && null !== c) c.return = b, b = c;
                        else {
                            if (b === a) break;
                            for(; null === b.sibling;){
                                if (null === b.return || b.return === a) return !0;
                                b = b.return;
                            }
                            b.sibling.return = b.return;
                            b = b.sibling;
                        }
                    }
                    return !0;
                }
                function Ck(a, b) {
                    b &= ~rk;
                    b &= ~qk;
                    a.suspendedLanes |= b;
                    a.pingedLanes &= ~b;
                    for(a = a.expirationTimes; 0 < b;){
                        var c = 31 - oc(b), d = 1 << c;
                        a[c] = -1;
                        b &= ~d;
                    }
                }
                function Ek(a) {
                    if (0 !== (6 & K)) throw Error(p(327));
                    Hk();
                    var b = uc(a, 0);
                    if (0 === (1 & b)) return Dk(a, B()), null;
                    var c = Ik(a, b);
                    if (0 !== a.tag && 2 === c) {
                        var d = xc(a);
                        0 !== d && (b = d, c = Nk(a, d));
                    }
                    if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
                    if (6 === c) throw Error(p(345));
                    a.finishedWork = a.current.alternate;
                    a.finishedLanes = b;
                    Pk(a, tk, uk);
                    Dk(a, B());
                    return null;
                }
                function Qk(a, b) {
                    var c = K;
                    K |= 1;
                    try {
                        return a(b);
                    } finally{
                        K = c, 0 === K && (Gj = B() + 500, fg && jg());
                    }
                }
                function Rk(a) {
                    null !== wk && 0 === wk.tag && 0 === (6 & K) && Hk();
                    var b = K;
                    K |= 1;
                    var c = ok.transition, d = C;
                    try {
                        if (ok.transition = null, C = 1, a) return a();
                    } finally{
                        C = d, ok.transition = c, K = b, 0 === (6 & K) && jg();
                    }
                }
                function Hj() {
                    fj = ej.current;
                    E(ej);
                }
                function Kk(a, b) {
                    a.finishedWork = null;
                    a.finishedLanes = 0;
                    var c = a.timeoutHandle;
                    -1 !== c && (a.timeoutHandle = -1, Gf(c));
                    if (null !== Y) for(c = Y.return; null !== c;){
                        var d = c;
                        wg(d);
                        switch(d.tag){
                            case 1:
                                d = d.type.childContextTypes;
                                null != d && $f();
                                break;
                            case 3:
                                zh();
                                E(Wf);
                                E(H);
                                Eh();
                                break;
                            case 5:
                                Bh(d);
                                break;
                            case 4:
                                zh();
                                break;
                            case 13:
                                E(L);
                                break;
                            case 19:
                                E(L);
                                break;
                            case 10:
                                ah(d.type._context);
                                break;
                            case 22:
                            case 23:
                                Hj();
                        }
                        c = c.return;
                    }
                    Q = a;
                    Y = a = Pg(a.current, null);
                    Z = fj = b;
                    T = 0;
                    pk = null;
                    rk = qk = rh = 0;
                    tk = sk = null;
                    if (null !== fh) {
                        for(b = 0; b < fh.length; b++)if (c = fh[b], d = c.interleaved, null !== d) {
                            c.interleaved = null;
                            var e = d.next, f = c.pending;
                            if (null !== f) {
                                var g = f.next;
                                f.next = e;
                                d.next = g;
                            }
                            c.pending = d;
                        }
                        fh = null;
                    }
                    return a;
                }
                function Mk(a, b) {
                    do {
                        var c = Y;
                        try {
                            $g();
                            Fh.current = Rh;
                            if (Ih) {
                                for(var d = M.memoizedState; null !== d;){
                                    var e = d.queue;
                                    null !== e && (e.pending = null);
                                    d = d.next;
                                }
                                Ih = !1;
                            }
                            Hh = 0;
                            O = N = M = null;
                            Jh = !1;
                            Kh = 0;
                            nk.current = null;
                            if (null === c || null === c.return) {
                                T = 1;
                                pk = b;
                                Y = null;
                                break;
                            }
                            a: {
                                var f = a, g = c.return, h = c, k = b;
                                b = Z;
                                h.flags |= 32768;
                                if (null !== k && "object" == typeof k && "function" == typeof k.then) {
                                    var l = k, m = h, q = m.tag;
                                    if (0 === (1 & m.mode) && (0 === q || 11 === q || 15 === q)) {
                                        var r = m.alternate;
                                        r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
                                    }
                                    var y = Ui(g);
                                    if (null !== y) {
                                        y.flags &= -257;
                                        Vi(y, g, h, f, b);
                                        1 & y.mode && Si(f, l, b);
                                        b = y;
                                        k = l;
                                        var n = b.updateQueue;
                                        if (null === n) {
                                            var t = new Set;
                                            t.add(k);
                                            b.updateQueue = t;
                                        } else n.add(k);
                                        break a;
                                    }
                                    if (0 === (1 & b)) {
                                        Si(f, l, b);
                                        tj();
                                        break a;
                                    }
                                    k = Error(p(426));
                                } else if (I && 1 & h.mode) {
                                    var J = Ui(g);
                                    if (null !== J) {
                                        0 === (65536 & J.flags) && (J.flags |= 256);
                                        Vi(J, g, h, f, b);
                                        Jg(Ji(k, h));
                                        break a;
                                    }
                                }
                                f = k = Ji(k, h);
                                4 !== T && (T = 2);
                                null === sk ? sk = [
                                    f
                                ] : sk.push(f);
                                f = g;
                                do {
                                    switch(f.tag){
                                        case 3:
                                            f.flags |= 65536;
                                            b &= -b;
                                            f.lanes |= b;
                                            var x = Ni(f, k, b);
                                            ph(f, x);
                                            break a;
                                        case 1:
                                            h = k;
                                            var w = f.type, u = f.stateNode;
                                            if (0 === (128 & f.flags) && ("function" == typeof w.getDerivedStateFromError || null !== u && "function" == typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
                                                f.flags |= 65536;
                                                b &= -b;
                                                f.lanes |= b;
                                                var F = Qi(f, h, b);
                                                ph(f, F);
                                                break a;
                                            }
                                    }
                                    f = f.return;
                                }while (null !== f);
                            }
                            Sk(c);
                        } catch (na) {
                            b = na;
                            Y === c && null !== c && (Y = c = c.return);
                            continue;
                        }
                        break;
                    }while (1);
                }
                function Jk() {
                    var a = mk.current;
                    mk.current = Rh;
                    return null === a ? Rh : a;
                }
                function tj() {
                    if (0 === T || 3 === T || 2 === T) T = 4;
                    null === Q || 0 === (268435455 & rh) && 0 === (268435455 & qk) || Ck(Q, Z);
                }
                function Ik(a, b) {
                    var c = K;
                    K |= 2;
                    var d = Jk();
                    if (Q !== a || Z !== b) uk = null, Kk(a, b);
                    for(;;)try {
                        Tk();
                        break;
                    } catch (e) {
                        Mk(a, e);
                    }
                    $g();
                    K = c;
                    mk.current = d;
                    if (null !== Y) throw Error(p(261));
                    Q = null;
                    Z = 0;
                    return T;
                }
                function Tk() {
                    for(; null !== Y;)Uk(Y);
                }
                function Lk() {
                    for(; null !== Y && !cc();)Uk(Y);
                }
                function Uk(a) {
                    var b = Vk(a.alternate, a, fj);
                    a.memoizedProps = a.pendingProps;
                    null === b ? Sk(a) : Y = b;
                    nk.current = null;
                }
                function Sk(a) {
                    var b = a;
                    do {
                        var c = b.alternate;
                        a = b.return;
                        if (0 === (32768 & b.flags)) {
                            if (c = Ej(c, b, fj), null !== c) {
                                Y = c;
                                return;
                            }
                        } else {
                            c = Ij(c, b);
                            if (null !== c) {
                                c.flags &= 32767;
                                Y = c;
                                return;
                            }
                            if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
                            else {
                                T = 6;
                                Y = null;
                                return;
                            }
                        }
                        b = b.sibling;
                        if (null !== b) {
                            Y = b;
                            return;
                        }
                        Y = b = a;
                    }while (null !== b);
                    0 === T && (T = 5);
                }
                function Pk(a, b, c) {
                    var d = C, e = ok.transition;
                    try {
                        ok.transition = null, C = 1, Wk(a, b, c, d);
                    } finally{
                        ok.transition = e, C = d;
                    }
                    return null;
                }
                function Wk(a, b, c, d) {
                    do Hk();
                    while (null !== wk);
                    if (0 !== (6 & K)) throw Error(p(327));
                    c = a.finishedWork;
                    var e = a.finishedLanes;
                    if (null === c) return null;
                    a.finishedWork = null;
                    a.finishedLanes = 0;
                    if (c === a.current) throw Error(p(177));
                    a.callbackNode = null;
                    a.callbackPriority = 0;
                    var f = c.lanes | c.childLanes;
                    Bc(a, f);
                    a === Q && (Y = Q = null, Z = 0);
                    0 === (2064 & c.subtreeFlags) && 0 === (2064 & c.flags) || vk || (vk = !0, Fk(hc, function() {
                        Hk();
                        return null;
                    }));
                    f = 0 !== (15990 & c.flags);
                    if (0 !== (15990 & c.subtreeFlags) || f) {
                        f = ok.transition;
                        ok.transition = null;
                        var g = C;
                        C = 1;
                        var h = K;
                        K |= 4;
                        nk.current = null;
                        Oj(a, c);
                        dk(c, a);
                        Oe(Df);
                        dd = !!Cf;
                        Df = Cf = null;
                        a.current = c;
                        hk(c, a, e);
                        dc();
                        K = h;
                        C = g;
                        ok.transition = f;
                    } else a.current = c;
                    vk && (vk = !1, wk = a, xk = e);
                    f = a.pendingLanes;
                    0 === f && (Ri = null);
                    mc(c.stateNode, d);
                    Dk(a, B());
                    if (null !== b) for(d = a.onRecoverableError, c = 0; c < b.length; c++)e = b[c], d(e.value, {
                        componentStack: e.stack,
                        digest: e.digest
                    });
                    if (Oi) throw Oi = !1, a = Pi, Pi = null, a;
                    0 !== (1 & xk) && 0 !== a.tag && Hk();
                    f = a.pendingLanes;
                    0 !== (1 & f) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
                    jg();
                    return null;
                }
                function Hk() {
                    if (null !== wk) {
                        var a = Dc(xk), b = ok.transition, c = C;
                        try {
                            ok.transition = null;
                            C = 16 > a ? 16 : a;
                            if (null === wk) var d = !1;
                            else {
                                a = wk;
                                wk = null;
                                xk = 0;
                                if (0 !== (6 & K)) throw Error(p(331));
                                var e = K;
                                K |= 4;
                                for(V = a.current; null !== V;){
                                    var f = V, g = f.child;
                                    if (0 !== (16 & V.flags)) {
                                        var h = f.deletions;
                                        if (null !== h) {
                                            for(var k = 0; k < h.length; k++){
                                                var l = h[k];
                                                for(V = l; null !== V;){
                                                    var m = V;
                                                    switch(m.tag){
                                                        case 0:
                                                        case 11:
                                                        case 15:
                                                            Pj(8, m, f);
                                                    }
                                                    var q = m.child;
                                                    if (null !== q) q.return = m, V = q;
                                                    else for(; null !== V;){
                                                        m = V;
                                                        var r = m.sibling, y = m.return;
                                                        Sj(m);
                                                        if (m === l) {
                                                            V = null;
                                                            break;
                                                        }
                                                        if (null !== r) {
                                                            r.return = y;
                                                            V = r;
                                                            break;
                                                        }
                                                        V = y;
                                                    }
                                                }
                                            }
                                            var n = f.alternate;
                                            if (null !== n) {
                                                var t = n.child;
                                                if (null !== t) {
                                                    n.child = null;
                                                    do {
                                                        var J = t.sibling;
                                                        t.sibling = null;
                                                        t = J;
                                                    }while (null !== t);
                                                }
                                            }
                                            V = f;
                                        }
                                    }
                                    if (0 !== (2064 & f.subtreeFlags) && null !== g) g.return = f, V = g;
                                    else for(; null !== V;){
                                        f = V;
                                        if (0 !== (2048 & f.flags)) switch(f.tag){
                                            case 0:
                                            case 11:
                                            case 15:
                                                Pj(9, f, f.return);
                                        }
                                        var x = f.sibling;
                                        if (null !== x) {
                                            x.return = f.return;
                                            V = x;
                                            break;
                                        }
                                        V = f.return;
                                    }
                                }
                                var w = a.current;
                                for(V = w; null !== V;){
                                    g = V;
                                    var u = g.child;
                                    if (0 !== (2064 & g.subtreeFlags) && null !== u) u.return = g, V = u;
                                    else for(g = w; null !== V;){
                                        h = V;
                                        if (0 !== (2048 & h.flags)) try {
                                            switch(h.tag){
                                                case 0:
                                                case 11:
                                                case 15:
                                                    Qj(9, h);
                                            }
                                        } catch (na) {
                                            W(h, h.return, na);
                                        }
                                        if (h === g) {
                                            V = null;
                                            break;
                                        }
                                        var F = h.sibling;
                                        if (null !== F) {
                                            F.return = h.return;
                                            V = F;
                                            break;
                                        }
                                        V = h.return;
                                    }
                                }
                                K = e;
                                jg();
                                if (lc && "function" == typeof lc.onPostCommitFiberRoot) try {
                                    lc.onPostCommitFiberRoot(kc, a);
                                } catch (na) {}
                                d = !0;
                            }
                            return d;
                        } finally{
                            C = c, ok.transition = b;
                        }
                    }
                    return !1;
                }
                function Xk(a, b, c) {
                    b = Ji(c, b);
                    b = Ni(a, b, 1);
                    a = nh(a, b, 1);
                    b = R();
                    null !== a && (Ac(a, 1, b), Dk(a, b));
                }
                function W(a, b, c) {
                    if (3 === a.tag) Xk(a, a, c);
                    else for(; null !== b;){
                        if (3 === b.tag) {
                            Xk(b, a, c);
                            break;
                        }
                        if (1 === b.tag) {
                            var d = b.stateNode;
                            if ("function" == typeof b.type.getDerivedStateFromError || "function" == typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
                                a = Ji(c, a);
                                a = Qi(b, a, 1);
                                b = nh(b, a, 1);
                                a = R();
                                null !== b && (Ac(b, 1, a), Dk(b, a));
                                break;
                            }
                        }
                        b = b.return;
                    }
                }
                function Ti(a, b, c) {
                    var d = a.pingCache;
                    null !== d && d.delete(b);
                    b = R();
                    a.pingedLanes |= a.suspendedLanes & c;
                    Q === a && (Z & c) === c && (4 === T || 3 === T && (130023424 & Z) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
                    Dk(a, b);
                }
                function Yk(a, b) {
                    0 === b && (0 === (1 & a.mode) ? b = 1 : (b = sc, sc <<= 1, 0 === (130023424 & sc) && (sc = 4194304)));
                    var c = R();
                    a = ih(a, b);
                    null !== a && (Ac(a, b, c), Dk(a, c));
                }
                function uj(a) {
                    var b = a.memoizedState, c = 0;
                    null !== b && (c = b.retryLane);
                    Yk(a, c);
                }
                function bk(a, b) {
                    var c = 0;
                    switch(a.tag){
                        case 13:
                            var d = a.stateNode;
                            var e = a.memoizedState;
                            null !== e && (c = e.retryLane);
                            break;
                        case 19:
                            d = a.stateNode;
                            break;
                        default:
                            throw Error(p(314));
                    }
                    null !== d && d.delete(b);
                    Yk(a, c);
                }
                var Vk;
                Vk = function(a, b, c) {
                    if (null !== a) {
                        if (a.memoizedProps !== b.pendingProps || Wf.current) dh = !0;
                        else {
                            if (0 === (a.lanes & c) && 0 === (128 & b.flags)) return dh = !1, yj(a, b, c);
                            dh = 0 !== (131072 & a.flags) || !1;
                        }
                    } else dh = !1, I && 0 !== (1048576 & b.flags) && ug(b, ng, b.index);
                    b.lanes = 0;
                    switch(b.tag){
                        case 2:
                            var d = b.type;
                            ij(a, b);
                            a = b.pendingProps;
                            var e = Yf(b, H.current);
                            ch(b, c);
                            e = Nh(null, b, d, a, e, c);
                            var f = Sh();
                            b.flags |= 1;
                            "object" == typeof e && null !== e && "function" == typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = !0, cg(b)) : f = !1, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, !0, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
                            return b;
                        case 16:
                            d = b.elementType;
                            a: {
                                ij(a, b);
                                a = b.pendingProps;
                                e = d._init;
                                d = e(d._payload);
                                b.type = d;
                                e = b.tag = Zk(d);
                                a = Ci(d, a);
                                switch(e){
                                    case 0:
                                        b = cj(null, b, d, a, c);
                                        break a;
                                    case 1:
                                        b = hj(null, b, d, a, c);
                                        break a;
                                    case 11:
                                        b = Yi(null, b, d, a, c);
                                        break a;
                                    case 14:
                                        b = $i(null, b, d, Ci(d.type, a), c);
                                        break a;
                                }
                                throw Error(p(306, d, ""));
                            }
                            return b;
                        case 0:
                            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
                        case 1:
                            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
                        case 3:
                            a: {
                                kj(b);
                                if (null === a) throw Error(p(387));
                                d = b.pendingProps;
                                f = b.memoizedState;
                                e = f.element;
                                lh(a, b);
                                qh(b, d, null, c);
                                var g = b.memoizedState;
                                d = g.element;
                                if (f.isDehydrated) {
                                    if (f = {
                                        element: d,
                                        isDehydrated: !1,
                                        cache: g.cache,
                                        pendingSuspenseBoundaries: g.pendingSuspenseBoundaries,
                                        transitions: g.transitions
                                    }, b.updateQueue.baseState = f, b.memoizedState = f, 256 & b.flags) {
                                        e = Ji(Error(p(423)), b);
                                        b = lj(a, b, d, c, e);
                                        break a;
                                    } else if (d !== e) {
                                        e = Ji(Error(p(424)), b);
                                        b = lj(a, b, d, c, e);
                                        break a;
                                    } else for(yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = !0, zg = null, c = Vg(b, null, d, c), b.child = c; c;)c.flags = -3 & c.flags | 4096, c = c.sibling;
                                } else {
                                    Ig();
                                    if (d === e) {
                                        b = Zi(a, b, c);
                                        break a;
                                    }
                                    Xi(a, b, d, c);
                                }
                                b = b.child;
                            }
                            return b;
                        case 5:
                            return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
                        case 6:
                            return null === a && Eg(b), null;
                        case 13:
                            return oj(a, b, c);
                        case 4:
                            return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
                        case 11:
                            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
                        case 7:
                            return Xi(a, b, b.pendingProps, c), b.child;
                        case 8:
                            return Xi(a, b, b.pendingProps.children, c), b.child;
                        case 12:
                            return Xi(a, b, b.pendingProps.children, c), b.child;
                        case 10:
                            a: {
                                d = b.type._context;
                                e = b.pendingProps;
                                f = b.memoizedProps;
                                g = e.value;
                                G(Wg, d._currentValue);
                                d._currentValue = g;
                                if (null !== f) {
                                    if (He(f.value, g)) {
                                        if (f.children === e.children && !Wf.current) {
                                            b = Zi(a, b, c);
                                            break a;
                                        }
                                    } else for(f = b.child, null !== f && (f.return = b); null !== f;){
                                        var h = f.dependencies;
                                        if (null !== h) {
                                            g = f.child;
                                            for(var k = h.firstContext; null !== k;){
                                                if (k.context === d) {
                                                    if (1 === f.tag) {
                                                        k = mh(-1, c & -c);
                                                        k.tag = 2;
                                                        var l = f.updateQueue;
                                                        if (null !== l) {
                                                            l = l.shared;
                                                            var m = l.pending;
                                                            null === m ? k.next = k : (k.next = m.next, m.next = k);
                                                            l.pending = k;
                                                        }
                                                    }
                                                    f.lanes |= c;
                                                    k = f.alternate;
                                                    null !== k && (k.lanes |= c);
                                                    bh(f.return, c, b);
                                                    h.lanes |= c;
                                                    break;
                                                }
                                                k = k.next;
                                            }
                                        } else if (10 === f.tag) g = f.type === b.type ? null : f.child;
                                        else if (18 === f.tag) {
                                            g = f.return;
                                            if (null === g) throw Error(p(341));
                                            g.lanes |= c;
                                            h = g.alternate;
                                            null !== h && (h.lanes |= c);
                                            bh(g, c, b);
                                            g = f.sibling;
                                        } else g = f.child;
                                        if (null !== g) g.return = f;
                                        else for(g = f; null !== g;){
                                            if (g === b) {
                                                g = null;
                                                break;
                                            }
                                            f = g.sibling;
                                            if (null !== f) {
                                                f.return = g.return;
                                                g = f;
                                                break;
                                            }
                                            g = g.return;
                                        }
                                        f = g;
                                    }
                                }
                                Xi(a, b, e.children, c);
                                b = b.child;
                            }
                            return b;
                        case 9:
                            return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
                        case 14:
                            return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
                        case 15:
                            return bj(a, b, b.type, b.pendingProps, c);
                        case 17:
                            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = !0, cg(b)) : a = !1, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, !0, a, c);
                        case 19:
                            return xj(a, b, c);
                        case 22:
                            return dj(a, b, c);
                    }
                    throw Error(p(156, b.tag));
                };
                function Fk(a, b) {
                    return ac(a, b);
                }
                function $k(a, b, c, d) {
                    this.tag = a;
                    this.key = c;
                    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
                    this.index = 0;
                    this.ref = null;
                    this.pendingProps = b;
                    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
                    this.mode = d;
                    this.subtreeFlags = this.flags = 0;
                    this.deletions = null;
                    this.childLanes = this.lanes = 0;
                    this.alternate = null;
                }
                function Bg(a, b, c, d) {
                    return new $k(a, b, c, d);
                }
                function aj(a) {
                    a = a.prototype;
                    return !(!a || !a.isReactComponent);
                }
                function Zk(a) {
                    if ("function" == typeof a) return aj(a) ? 1 : 0;
                    if (null != a) {
                        a = a.$$typeof;
                        if (a === Da) return 11;
                        if (a === Ga) return 14;
                    }
                    return 2;
                }
                function Pg(a, b) {
                    var c = a.alternate;
                    null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
                    c.flags = 14680064 & a.flags;
                    c.childLanes = a.childLanes;
                    c.lanes = a.lanes;
                    c.child = a.child;
                    c.memoizedProps = a.memoizedProps;
                    c.memoizedState = a.memoizedState;
                    c.updateQueue = a.updateQueue;
                    b = a.dependencies;
                    c.dependencies = null === b ? null : {
                        lanes: b.lanes,
                        firstContext: b.firstContext
                    };
                    c.sibling = a.sibling;
                    c.index = a.index;
                    c.ref = a.ref;
                    return c;
                }
                function Rg(a, b, c, d, e, f) {
                    var g = 2;
                    d = a;
                    if ("function" == typeof a) aj(a) && (g = 1);
                    else if ("string" == typeof a) g = 5;
                    else a: switch(a){
                        case ya:
                            return Tg(c.children, e, f, b);
                        case za:
                            g = 8;
                            e |= 8;
                            break;
                        case Aa:
                            return a = Bg(12, c, b, 2 | e), a.elementType = Aa, a.lanes = f, a;
                        case Ea:
                            return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
                        case Fa:
                            return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
                        case Ia:
                            return pj(c, e, f, b);
                        default:
                            if ("object" == typeof a && null !== a) switch(a.$$typeof){
                                case Ba:
                                    g = 10;
                                    break a;
                                case Ca:
                                    g = 9;
                                    break a;
                                case Da:
                                    g = 11;
                                    break a;
                                case Ga:
                                    g = 14;
                                    break a;
                                case Ha:
                                    g = 16;
                                    d = null;
                                    break a;
                            }
                            throw Error(p(130, null == a ? a : typeof a, ""));
                    }
                    b = Bg(g, c, b, e);
                    b.elementType = a;
                    b.type = d;
                    b.lanes = f;
                    return b;
                }
                function Tg(a, b, c, d) {
                    a = Bg(7, a, d, b);
                    a.lanes = c;
                    return a;
                }
                function pj(a, b, c, d) {
                    a = Bg(22, a, d, b);
                    a.elementType = Ia;
                    a.lanes = c;
                    a.stateNode = {
                        isHidden: !1
                    };
                    return a;
                }
                function Qg(a, b, c) {
                    a = Bg(6, a, null, b);
                    a.lanes = c;
                    return a;
                }
                function Sg(a, b, c) {
                    b = Bg(4, null !== a.children ? a.children : [], a.key, b);
                    b.lanes = c;
                    b.stateNode = {
                        containerInfo: a.containerInfo,
                        pendingChildren: null,
                        implementation: a.implementation
                    };
                    return b;
                }
                function al(a, b, c, d, e) {
                    this.tag = b;
                    this.containerInfo = a;
                    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
                    this.timeoutHandle = -1;
                    this.callbackNode = this.pendingContext = this.context = null;
                    this.callbackPriority = 0;
                    this.eventTimes = zc(0);
                    this.expirationTimes = zc(-1);
                    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
                    this.entanglements = zc(0);
                    this.identifierPrefix = d;
                    this.onRecoverableError = e;
                    this.mutableSourceEagerHydrationData = null;
                }
                function bl(a, b, c, d, e, f, g, h, k) {
                    a = new al(a, b, c, h, k);
                    1 === b ? (b = 1, !0 === f && (b |= 8)) : b = 0;
                    f = Bg(3, null, null, b);
                    a.current = f;
                    f.stateNode = a;
                    f.memoizedState = {
                        element: d,
                        isDehydrated: c,
                        cache: null,
                        transitions: null,
                        pendingSuspenseBoundaries: null
                    };
                    kh(f);
                    return a;
                }
                function cl(a, b, c) {
                    var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
                    return {
                        $$typeof: wa,
                        key: null == d ? null : "" + d,
                        children: a,
                        containerInfo: b,
                        implementation: c
                    };
                }
                function dl(a) {
                    if (!a) return Vf;
                    a = a._reactInternals;
                    a: {
                        if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
                        var b = a;
                        do {
                            switch(b.tag){
                                case 3:
                                    b = b.stateNode.context;
                                    break a;
                                case 1:
                                    if (Zf(b.type)) {
                                        b = b.stateNode.__reactInternalMemoizedMergedChildContext;
                                        break a;
                                    }
                            }
                            b = b.return;
                        }while (null !== b);
                        throw Error(p(171));
                    }
                    if (1 === a.tag) {
                        var c = a.type;
                        if (Zf(c)) return bg(a, c, b);
                    }
                    return b;
                }
                function el(a, b, c, d, e, f, g, h, k) {
                    a = bl(c, d, !0, a, e, f, g, h, k);
                    a.context = dl(null);
                    c = a.current;
                    d = R();
                    e = yi(c);
                    f = mh(d, e);
                    f.callback = null != b ? b : null;
                    nh(c, f, e);
                    a.current.lanes = e;
                    Ac(a, e, d);
                    Dk(a, d);
                    return a;
                }
                function fl(a, b, c, d) {
                    var e = b.current, f = R(), g = yi(e);
                    c = dl(c);
                    null === b.context ? b.context = c : b.pendingContext = c;
                    b = mh(f, g);
                    b.payload = {
                        element: a
                    };
                    d = void 0 === d ? null : d;
                    null !== d && (b.callback = d);
                    a = nh(e, b, g);
                    null !== a && (gi(a, e, g, f), oh(a, e, g));
                    return g;
                }
                function gl(a) {
                    a = a.current;
                    if (!a.child) return null;
                    switch(a.child.tag){
                        case 5:
                            return a.child.stateNode;
                        default:
                            return a.child.stateNode;
                    }
                }
                function hl(a, b) {
                    a = a.memoizedState;
                    if (null !== a && null !== a.dehydrated) {
                        var c = a.retryLane;
                        a.retryLane = 0 !== c && c < b ? c : b;
                    }
                }
                function il(a, b) {
                    hl(a, b);
                    (a = a.alternate) && hl(a, b);
                }
                function jl() {
                    return null;
                }
                var kl = "function" == typeof reportError ? reportError : function(a) {
                    console.error(a);
                };
                function ll(a) {
                    this._internalRoot = a;
                }
                ml.prototype.render = ll.prototype.render = function(a) {
                    var b = this._internalRoot;
                    if (null === b) throw Error(p(409));
                    fl(a, b, null, null);
                };
                ml.prototype.unmount = ll.prototype.unmount = function() {
                    var a = this._internalRoot;
                    if (null !== a) {
                        this._internalRoot = null;
                        var b = a.containerInfo;
                        Rk(function() {
                            fl(null, a, null, null);
                        });
                        b[uf] = null;
                    }
                };
                function ml(a) {
                    this._internalRoot = a;
                }
                ml.prototype.unstable_scheduleHydration = function(a) {
                    if (a) {
                        var b = Hc();
                        a = {
                            blockedOn: null,
                            target: a,
                            priority: b
                        };
                        for(var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++);
                        Qc.splice(c, 0, a);
                        0 === c && Vc(a);
                    }
                };
                function nl(a) {
                    return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
                }
                function ol(a) {
                    return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
                }
                function pl() {}
                function ql(a, b, c, d, e) {
                    if (e) {
                        if ("function" == typeof d) {
                            var f = d;
                            d = function() {
                                var a = gl(g);
                                f.call(a);
                            };
                        }
                        var g = el(b, d, a, 0, null, !1, !1, "", pl);
                        a._reactRootContainer = g;
                        a[uf] = g.current;
                        sf(8 === a.nodeType ? a.parentNode : a);
                        Rk();
                        return g;
                    }
                    for(; e = a.lastChild;)a.removeChild(e);
                    if ("function" == typeof d) {
                        var h = d;
                        d = function() {
                            var a = gl(k);
                            h.call(a);
                        };
                    }
                    var k = bl(a, 0, !1, null, null, !1, !1, "", pl);
                    a._reactRootContainer = k;
                    a[uf] = k.current;
                    sf(8 === a.nodeType ? a.parentNode : a);
                    Rk(function() {
                        fl(b, k, c, d);
                    });
                    return k;
                }
                function rl(a, b, c, d, e) {
                    var f = c._reactRootContainer;
                    if (f) {
                        var g = f;
                        if ("function" == typeof e) {
                            var h = e;
                            e = function() {
                                var a = gl(g);
                                h.call(a);
                            };
                        }
                        fl(b, g, a, e);
                    } else g = ql(c, b, a, e, d);
                    return gl(g);
                }
                Ec = function(a) {
                    switch(a.tag){
                        case 3:
                            var b = a.stateNode;
                            if (b.current.memoizedState.isDehydrated) {
                                var c = tc(b.pendingLanes);
                                0 !== c && (Cc(b, 1 | c), Dk(b, B()), 0 === (6 & K) && (Gj = B() + 500, jg()));
                            }
                            break;
                        case 13:
                            Rk(function() {
                                var b = ih(a, 1);
                                if (null !== b) {
                                    var c = R();
                                    gi(b, a, 1, c);
                                }
                            }), il(a, 1);
                    }
                };
                Fc = function(a) {
                    if (13 === a.tag) {
                        var b = ih(a, 134217728);
                        if (null !== b) {
                            var c = R();
                            gi(b, a, 134217728, c);
                        }
                        il(a, 134217728);
                    }
                };
                Gc = function(a) {
                    if (13 === a.tag) {
                        var b = yi(a), c = ih(a, b);
                        if (null !== c) {
                            var d = R();
                            gi(c, a, b, d);
                        }
                        il(a, b);
                    }
                };
                Hc = function() {
                    return C;
                };
                Ic = function(a, b) {
                    var c = C;
                    try {
                        return C = a, b();
                    } finally{
                        C = c;
                    }
                };
                yb = function(a, b, c) {
                    switch(b){
                        case "input":
                            bb(a, c);
                            b = c.name;
                            if ("radio" === c.type && null != b) {
                                for(c = a; c.parentNode;)c = c.parentNode;
                                c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
                                for(b = 0; b < c.length; b++){
                                    var d = c[b];
                                    if (d !== a && d.form === a.form) {
                                        var e = Db(d);
                                        if (!e) throw Error(p(90));
                                        Wa(d);
                                        bb(d, e);
                                    }
                                }
                            }
                            break;
                        case "textarea":
                            ib(a, c);
                            break;
                        case "select":
                            b = c.value, null != b && fb(a, !!c.multiple, b, !1);
                    }
                };
                Gb = Qk;
                Hb = Rk;
                var sl = {
                    usingClientEntryPoint: !1,
                    Events: [
                        Cb,
                        ue,
                        Db,
                        Eb,
                        Fb,
                        Qk
                    ]
                }, tl = {
                    findFiberByHostInstance: Wc,
                    bundleType: 0,
                    version: "18.3.1",
                    rendererPackageName: "react-dom"
                };
                var ul = {
                    bundleType: tl.bundleType,
                    version: tl.version,
                    rendererPackageName: tl.rendererPackageName,
                    rendererConfig: tl.rendererConfig,
                    overrideHookState: null,
                    overrideHookStateDeletePath: null,
                    overrideHookStateRenamePath: null,
                    overrideProps: null,
                    overridePropsDeletePath: null,
                    overridePropsRenamePath: null,
                    setErrorHandler: null,
                    setSuspenseHandler: null,
                    scheduleUpdate: null,
                    currentDispatcherRef: ua.ReactCurrentDispatcher,
                    findHostInstanceByFiber: function(a) {
                        a = Zb(a);
                        return null === a ? null : a.stateNode;
                    },
                    findFiberByHostInstance: tl.findFiberByHostInstance || jl,
                    findHostInstancesForRefresh: null,
                    scheduleRefresh: null,
                    scheduleRoot: null,
                    setRefreshHandler: null,
                    getCurrentFiber: null,
                    reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
                };
                if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
                    var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
                    if (!vl.isDisabled && vl.supportsFiber) try {
                        kc = vl.inject(ul), lc = vl;
                    } catch (a) {}
                }
                exports1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
                exports1.createPortal = function(a, b) {
                    var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
                    if (!nl(b)) throw Error(p(200));
                    return cl(a, b, null, c);
                };
                exports1.createRoot = function(a, b) {
                    if (!nl(a)) throw Error(p(299));
                    var c = !1, d = "", e = kl;
                    null != b && (!0 === b.unstable_strictMode && (c = !0), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
                    b = bl(a, 1, !1, null, null, c, !1, d, e);
                    a[uf] = b.current;
                    sf(8 === a.nodeType ? a.parentNode : a);
                    return new ll(b);
                };
                exports1.findDOMNode = function(a) {
                    if (null == a) return null;
                    if (1 === a.nodeType) return a;
                    var b = a._reactInternals;
                    if (void 0 === b) {
                        if ("function" == typeof a.render) throw Error(p(188));
                        a = Object.keys(a).join(",");
                        throw Error(p(268, a));
                    }
                    a = Zb(b);
                    a = null === a ? null : a.stateNode;
                    return a;
                };
                exports1.flushSync = function(a) {
                    return Rk(a);
                };
                exports1.hydrate = function(a, b, c) {
                    if (!ol(b)) throw Error(p(200));
                    return rl(null, a, b, !0, c);
                };
                exports1.hydrateRoot = function(a, b, c) {
                    if (!nl(a)) throw Error(p(405));
                    var d = null != c && c.hydratedSources || null, e = !1, f = "", g = kl;
                    null != c && (!0 === c.unstable_strictMode && (e = !0), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
                    b = el(b, null, a, 1, null != c ? c : null, e, !1, f, g);
                    a[uf] = b.current;
                    sf(a);
                    if (d) for(a = 0; a < d.length; a++)c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [
                        c,
                        e
                    ] : b.mutableSourceEagerHydrationData.push(c, e);
                    return new ml(b);
                };
                exports1.render = function(a, b, c) {
                    if (!ol(b)) throw Error(p(200));
                    return rl(null, a, b, !1, c);
                };
                exports1.unmountComponentAtNode = function(a) {
                    if (!ol(a)) throw Error(p(40));
                    return !!a._reactRootContainer && (Rk(function() {
                        rl(null, null, a, !1, function() {
                            a._reactRootContainer = null;
                            a[uf] = null;
                        });
                    }), !0);
                };
                exports1.unstable_batchedUpdates = Qk;
                exports1.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
                    if (!ol(c)) throw Error(p(200));
                    if (null == a || void 0 === a._reactInternals) throw Error(p(38));
                    return rl(a, b, c, !1, d);
                };
                exports1.version = "18.3.1-next-f1338f8080-20240426";
            },
            "./node_modules/.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom/index.js": function(module1, __unused_webpack_exports, __webpack_require__) {
                function checkDCE() {
                    /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */ if ('undefined' == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ || 'function' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) return;
                    try {
                        // Verify that the code above has been dead code eliminated (DCE'd).
                        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
                    } catch (err) {
                        // DevTools shouldn't crash React, no matter what.
                        // We should still report in case we break this code.
                        console.error(err);
                    }
                }
                // DCE check should happen before ReactDOM bundle executes so that
                // DevTools can report bad minification during injection.
                checkDCE();
                module1.exports = __webpack_require__("./node_modules/.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom/cjs/react-dom.production.min.js");
            },
            "./node_modules/.pnpm/react@18.3.1/node_modules/react/cjs/react.production.min.js": function(__unused_webpack_module, exports1) {
                /**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var l = Symbol.for("react.element"), n = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z = Symbol.iterator;
                function A(a) {
                    if (null === a || "object" != typeof a) return null;
                    a = z && a[z] || a["@@iterator"];
                    return "function" == typeof a ? a : null;
                }
                var B = {
                    isMounted: function() {
                        return !1;
                    },
                    enqueueForceUpdate: function() {},
                    enqueueReplaceState: function() {},
                    enqueueSetState: function() {}
                }, C = Object.assign, D = {};
                function E(a, b, e) {
                    this.props = a;
                    this.context = b;
                    this.refs = D;
                    this.updater = e || B;
                }
                E.prototype.isReactComponent = {};
                E.prototype.setState = function(a, b) {
                    if ("object" != typeof a && "function" != typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
                    this.updater.enqueueSetState(this, a, b, "setState");
                };
                E.prototype.forceUpdate = function(a) {
                    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
                };
                function F() {}
                F.prototype = E.prototype;
                function G(a, b, e) {
                    this.props = a;
                    this.context = b;
                    this.refs = D;
                    this.updater = e || B;
                }
                var H = G.prototype = new F;
                H.constructor = G;
                C(H, E.prototype);
                H.isPureReactComponent = !0;
                var I = Array.isArray, J = Object.prototype.hasOwnProperty, K = {
                    current: null
                }, L = {
                    key: !0,
                    ref: !0,
                    __self: !0,
                    __source: !0
                };
                function M(a, b, e) {
                    var d, c = {}, k = null, h = null;
                    if (null != b) for(d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b)J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
                    var g = arguments.length - 2;
                    if (1 === g) c.children = e;
                    else if (1 < g) {
                        for(var f = Array(g), m = 0; m < g; m++)f[m] = arguments[m + 2];
                        c.children = f;
                    }
                    if (a && a.defaultProps) for(d in g = a.defaultProps)void 0 === c[d] && (c[d] = g[d]);
                    return {
                        $$typeof: l,
                        type: a,
                        key: k,
                        ref: h,
                        props: c,
                        _owner: K.current
                    };
                }
                function N(a, b) {
                    return {
                        $$typeof: l,
                        type: a.type,
                        key: b,
                        ref: a.ref,
                        props: a.props,
                        _owner: a._owner
                    };
                }
                function O(a) {
                    return "object" == typeof a && null !== a && a.$$typeof === l;
                }
                function escape(a) {
                    var b = {
                        "=": "=0",
                        ":": "=2"
                    };
                    return "$" + a.replace(/[=:]/g, function(a) {
                        return b[a];
                    });
                }
                var P = /\/+/g;
                function Q(a, b) {
                    return "object" == typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
                }
                function R(a, b, e, d, c) {
                    var k = typeof a;
                    if ("undefined" === k || "boolean" === k) a = null;
                    var h = !1;
                    if (null === a) h = !0;
                    else switch(k){
                        case "string":
                        case "number":
                            h = !0;
                            break;
                        case "object":
                            switch(a.$$typeof){
                                case l:
                                case n:
                                    h = !0;
                            }
                    }
                    if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a) {
                        return a;
                    })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
                    h = 0;
                    d = "" === d ? "." : d + ":";
                    if (I(a)) for(var g = 0; g < a.length; g++){
                        k = a[g];
                        var f = d + Q(k, g);
                        h += R(k, b, e, f, c);
                    }
                    else if (f = A(a), "function" == typeof f) for(a = f.call(a), g = 0; !(k = a.next()).done;)k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
                    else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
                    return h;
                }
                function S(a, b, e) {
                    if (null == a) return a;
                    var d = [], c = 0;
                    R(a, d, "", "", function(a) {
                        return b.call(e, a, c++);
                    });
                    return d;
                }
                function T(a) {
                    if (-1 === a._status) {
                        var b = a._result;
                        b = b();
                        b.then(function(b) {
                            if (0 === a._status || -1 === a._status) a._status = 1, a._result = b;
                        }, function(b) {
                            if (0 === a._status || -1 === a._status) a._status = 2, a._result = b;
                        });
                        -1 === a._status && (a._status = 0, a._result = b);
                    }
                    if (1 === a._status) return a._result.default;
                    throw a._result;
                }
                var U = {
                    current: null
                }, V = {
                    transition: null
                }, W = {
                    ReactCurrentDispatcher: U,
                    ReactCurrentBatchConfig: V,
                    ReactCurrentOwner: K
                };
                function X() {
                    throw Error("act(...) is not supported in production builds of React.");
                }
                exports1.Children = {
                    map: S,
                    forEach: function(a, b, e) {
                        S(a, function() {
                            b.apply(this, arguments);
                        }, e);
                    },
                    count: function(a) {
                        var b = 0;
                        S(a, function() {
                            b++;
                        });
                        return b;
                    },
                    toArray: function(a) {
                        return S(a, function(a) {
                            return a;
                        }) || [];
                    },
                    only: function(a) {
                        if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
                        return a;
                    }
                };
                exports1.Component = E;
                exports1.Fragment = p;
                exports1.Profiler = r;
                exports1.PureComponent = G;
                exports1.StrictMode = q;
                exports1.Suspense = w;
                exports1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
                exports1.act = X;
                exports1.cloneElement = function(a, b, e) {
                    if (null == a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
                    var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
                    if (null != b) {
                        void 0 !== b.ref && (k = b.ref, h = K.current);
                        void 0 !== b.key && (c = "" + b.key);
                        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
                        for(f in b)J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
                    }
                    var f = arguments.length - 2;
                    if (1 === f) d.children = e;
                    else if (1 < f) {
                        g = Array(f);
                        for(var m = 0; m < f; m++)g[m] = arguments[m + 2];
                        d.children = g;
                    }
                    return {
                        $$typeof: l,
                        type: a.type,
                        key: c,
                        ref: k,
                        props: d,
                        _owner: h
                    };
                };
                exports1.createContext = function(a) {
                    a = {
                        $$typeof: u,
                        _currentValue: a,
                        _currentValue2: a,
                        _threadCount: 0,
                        Provider: null,
                        Consumer: null,
                        _defaultValue: null,
                        _globalName: null
                    };
                    a.Provider = {
                        $$typeof: t,
                        _context: a
                    };
                    return a.Consumer = a;
                };
                exports1.createElement = M;
                exports1.createFactory = function(a) {
                    var b = M.bind(null, a);
                    b.type = a;
                    return b;
                };
                exports1.createRef = function() {
                    return {
                        current: null
                    };
                };
                exports1.forwardRef = function(a) {
                    return {
                        $$typeof: v,
                        render: a
                    };
                };
                exports1.isValidElement = O;
                exports1.lazy = function(a) {
                    return {
                        $$typeof: y,
                        _payload: {
                            _status: -1,
                            _result: a
                        },
                        _init: T
                    };
                };
                exports1.memo = function(a, b) {
                    return {
                        $$typeof: x,
                        type: a,
                        compare: void 0 === b ? null : b
                    };
                };
                exports1.startTransition = function(a) {
                    var b = V.transition;
                    V.transition = {};
                    try {
                        a();
                    } finally{
                        V.transition = b;
                    }
                };
                exports1.unstable_act = X;
                exports1.useCallback = function(a, b) {
                    return U.current.useCallback(a, b);
                };
                exports1.useContext = function(a) {
                    return U.current.useContext(a);
                };
                exports1.useDebugValue = function() {};
                exports1.useDeferredValue = function(a) {
                    return U.current.useDeferredValue(a);
                };
                exports1.useEffect = function(a, b) {
                    return U.current.useEffect(a, b);
                };
                exports1.useId = function() {
                    return U.current.useId();
                };
                exports1.useImperativeHandle = function(a, b, e) {
                    return U.current.useImperativeHandle(a, b, e);
                };
                exports1.useInsertionEffect = function(a, b) {
                    return U.current.useInsertionEffect(a, b);
                };
                exports1.useLayoutEffect = function(a, b) {
                    return U.current.useLayoutEffect(a, b);
                };
                exports1.useMemo = function(a, b) {
                    return U.current.useMemo(a, b);
                };
                exports1.useReducer = function(a, b, e) {
                    return U.current.useReducer(a, b, e);
                };
                exports1.useRef = function(a) {
                    return U.current.useRef(a);
                };
                exports1.useState = function(a) {
                    return U.current.useState(a);
                };
                exports1.useSyncExternalStore = function(a, b, e) {
                    return U.current.useSyncExternalStore(a, b, e);
                };
                exports1.useTransition = function() {
                    return U.current.useTransition();
                };
                exports1.version = "18.3.1";
            },
            "./node_modules/.pnpm/react@18.3.1/node_modules/react/index.js": function(module1, __unused_webpack_exports, __webpack_require__) {
                module1.exports = __webpack_require__("./node_modules/.pnpm/react@18.3.1/node_modules/react/cjs/react.production.min.js");
            },
            "./node_modules/.pnpm/scheduler@0.23.2/node_modules/scheduler/cjs/scheduler.production.min.js": function(__unused_webpack_module, exports1) {
                /**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function f(a, b) {
                    var c = a.length;
                    a.push(b);
                    for(; 0 < c;){
                        var d = c - 1 >>> 1, e = a[d];
                        if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
                        else break;
                    }
                }
                function h(a) {
                    return 0 === a.length ? null : a[0];
                }
                function k(a) {
                    if (0 === a.length) return null;
                    var b = a[0], c = a.pop();
                    if (c !== b) {
                        a[0] = c;
                        for(var d = 0, e = a.length, w = e >>> 1; d < w;){
                            var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
                            if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
                            else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;
                            else break;
                        }
                    }
                    return b;
                }
                function g(a, b) {
                    var c = a.sortIndex - b.sortIndex;
                    return 0 !== c ? c : a.id - b.id;
                }
                if ("object" == typeof performance && "function" == typeof performance.now) {
                    var l = performance;
                    exports1.unstable_now = function() {
                        return l.now();
                    };
                } else {
                    var p = Date, q = p.now();
                    exports1.unstable_now = function() {
                        return p.now() - q;
                    };
                }
                var r = [], t = [], u = 1, v = null, y = 3, z = !1, A = !1, B = !1, D = "function" == typeof setTimeout ? setTimeout : null, E = "function" == typeof clearTimeout ? clearTimeout : null, F = "undefined" != typeof setImmediate ? setImmediate : null;
                "undefined" != typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
                function G(a) {
                    for(var b = h(t); null !== b;){
                        if (null === b.callback) k(t);
                        else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r, b);
                        else break;
                        b = h(t);
                    }
                }
                function H(a) {
                    B = !1;
                    G(a);
                    if (!A) {
                        if (null !== h(r)) A = !0, I(J);
                        else {
                            var b = h(t);
                            null !== b && K(H, b.startTime - a);
                        }
                    }
                }
                function J(a, b) {
                    A = !1;
                    B && (B = !1, E(L), L = -1);
                    z = !0;
                    var c = y;
                    try {
                        G(b);
                        for(v = h(r); null !== v && (!(v.expirationTime > b) || a && !M());){
                            var d = v.callback;
                            if ("function" == typeof d) {
                                v.callback = null;
                                y = v.priorityLevel;
                                var e = d(v.expirationTime <= b);
                                b = exports1.unstable_now();
                                "function" == typeof e ? v.callback = e : v === h(r) && k(r);
                                G(b);
                            } else k(r);
                            v = h(r);
                        }
                        if (null !== v) var w = !0;
                        else {
                            var m = h(t);
                            null !== m && K(H, m.startTime - b);
                            w = !1;
                        }
                        return w;
                    } finally{
                        v = null, y = c, z = !1;
                    }
                }
                var N = !1, O = null, L = -1, P = 5, Q = -1;
                function M() {
                    return !(exports1.unstable_now() - Q < P) && !0;
                }
                function R() {
                    if (null !== O) {
                        var a = exports1.unstable_now();
                        Q = a;
                        var b = !0;
                        try {
                            b = O(!0, a);
                        } finally{
                            b ? S() : (N = !1, O = null);
                        }
                    } else N = !1;
                }
                var S;
                if ("function" == typeof F) S = function() {
                    F(R);
                };
                else if ("undefined" != typeof MessageChannel) {
                    var T = new MessageChannel, U = T.port2;
                    T.port1.onmessage = R;
                    S = function() {
                        U.postMessage(null);
                    };
                } else S = function() {
                    D(R, 0);
                };
                function I(a) {
                    O = a;
                    N || (N = !0, S());
                }
                function K(a, b) {
                    L = D(function() {
                        a(exports1.unstable_now());
                    }, b);
                }
                exports1.unstable_IdlePriority = 5;
                exports1.unstable_ImmediatePriority = 1;
                exports1.unstable_LowPriority = 4;
                exports1.unstable_NormalPriority = 3;
                exports1.unstable_Profiling = null;
                exports1.unstable_UserBlockingPriority = 2;
                exports1.unstable_cancelCallback = function(a) {
                    a.callback = null;
                };
                exports1.unstable_continueExecution = function() {
                    A || z || (A = !0, I(J));
                };
                exports1.unstable_forceFrameRate = function(a) {
                    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1E3 / a) : 5;
                };
                exports1.unstable_getCurrentPriorityLevel = function() {
                    return y;
                };
                exports1.unstable_getFirstCallbackNode = function() {
                    return h(r);
                };
                exports1.unstable_next = function(a) {
                    switch(y){
                        case 1:
                        case 2:
                        case 3:
                            var b = 3;
                            break;
                        default:
                            b = y;
                    }
                    var c = y;
                    y = b;
                    try {
                        return a();
                    } finally{
                        y = c;
                    }
                };
                exports1.unstable_pauseExecution = function() {};
                exports1.unstable_requestPaint = function() {};
                exports1.unstable_runWithPriority = function(a, b) {
                    switch(a){
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            break;
                        default:
                            a = 3;
                    }
                    var c = y;
                    y = a;
                    try {
                        return b();
                    } finally{
                        y = c;
                    }
                };
                exports1.unstable_scheduleCallback = function(a, b, c) {
                    var d = exports1.unstable_now();
                    "object" == typeof c && null !== c ? (c = c.delay, c = "number" == typeof c && 0 < c ? d + c : d) : c = d;
                    switch(a){
                        case 1:
                            var e = -1;
                            break;
                        case 2:
                            e = 250;
                            break;
                        case 5:
                            e = 1073741823;
                            break;
                        case 4:
                            e = 1E4;
                            break;
                        default:
                            e = 5E3;
                    }
                    e = c + e;
                    a = {
                        id: u++,
                        callback: b,
                        priorityLevel: a,
                        startTime: c,
                        expirationTime: e,
                        sortIndex: -1
                    };
                    c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = !0, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = !0, I(J)));
                    return a;
                };
                exports1.unstable_shouldYield = M;
                exports1.unstable_wrapCallback = function(a) {
                    var b = y;
                    return function() {
                        var c = y;
                        y = b;
                        try {
                            return a.apply(this, arguments);
                        } finally{
                            y = c;
                        }
                    };
                };
            },
            "./node_modules/.pnpm/scheduler@0.23.2/node_modules/scheduler/index.js": function(module1, __unused_webpack_exports, __webpack_require__) {
                module1.exports = __webpack_require__("./node_modules/.pnpm/scheduler@0.23.2/node_modules/scheduler/cjs/scheduler.production.min.js");
            },
            "./node_modules/.pnpm/@module-federation+enhanced@0.8.3_@rspack+core@1.1.6_@swc+helpers@0.5.15__react-dom@18.3.1_re_6awqquzvls3qoernnv4dasssaq/node_modules/@module-federation/enhanced/dist/src/runtime.js": function(__unused_webpack_module, exports1, __webpack_require__) {
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
                __exportStar(__webpack_require__("./node_modules/.pnpm/@module-federation+runtime-tools@0.8.3/node_modules/@module-federation/runtime-tools/dist/runtime.cjs.js"), exports1);
            //# sourceMappingURL=runtime.js.map
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
                // src/browser/index.ts
                var browser_exports = {};
                __export(browser_exports, {
                    createLogger: ()=>createLogger2,
                    logger: ()=>logger
                });
                module1.exports = __toCommonJS(browser_exports);
                // src/browser/color.ts
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
                // src/browser/utils.ts
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
                // src/constants.ts
                var LOG_LEVEL = {
                    error: 0,
                    warn: 1,
                    info: 2,
                    log: 3,
                    verbose: 4
                };
                // src/utils.ts
                var errorStackRegExp = /at\s.*:\d+:\d+[\s\)]*$/;
                var anonymousErrorStackRegExp = /at\s.*\(<anonymous>\)$/;
                var isErrorStackMessage = (message)=>errorStackRegExp.test(message) || anonymousErrorStackRegExp.test(message);
                // src/createLogger.ts
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
                        // greet
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
                // src/browser/gradient.ts
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
                // src/browser/constants.ts
                var LOG_TYPES = {
                    // Level error
                    error: {
                        label: "error",
                        level: "error",
                        color: red
                    },
                    // Level warn
                    warn: {
                        label: "warn",
                        level: "warn",
                        color: orange
                    },
                    // Level info
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
                    // Level log
                    log: {
                        level: "log"
                    },
                    // Level debug
                    debug: {
                        label: "debug",
                        level: "verbose",
                        color: magenta
                    }
                };
                // src/browser/createLogger.ts
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
                // src/browser/index.ts
                var logger = createLogger2();
            }
        };
        /************************************************************************/ // The module cache
        var __webpack_module_cache__ = {};
        // The require function
        function __webpack_require__(moduleId) {
            // Check if module is in cache
            var cachedModule = __webpack_module_cache__[moduleId];
            if (void 0 !== cachedModule) return cachedModule.exports;
            // Create a new module (and put it into the cache)
            var module1 = __webpack_module_cache__[moduleId] = {
                exports: {}
            };
            // Execute the module function
            __webpack_modules__[moduleId].call(module1.exports, module1, module1.exports, __webpack_require__);
            // Return the exports of the module
            return module1.exports;
        }
        /************************************************************************/ // webpack/runtime/create_fake_namespace_object
        (()=>{
            var getProto = Object.getPrototypeOf ? function(obj) {
                return Object.getPrototypeOf(obj);
            } : function(obj) {
                return obj.__proto__;
            };
            var leafPrototypes;
            // create a fake namespace object
            // mode & 1: value is a module id, require it
            // mode & 2: merge all properties of value into the ns
            // mode & 4: return value when already ns object
            // mode & 16: return value when it's Promise-like
            // mode & 8|1: behave like require
            __webpack_require__.t = function(value, mode) {
                if (1 & mode) value = this(value);
                if (8 & mode) return value;
                if ('object' == typeof value && value) {
                    if (4 & mode && value.__esModule) return value;
                    if (16 & mode && 'function' == typeof value.then) return value;
                }
                var ns = Object.create(null);
                __webpack_require__.r(ns);
                var def = {};
                leafPrototypes = leafPrototypes || [
                    null,
                    getProto({}),
                    getProto([]),
                    getProto(getProto)
                ];
                for(var current = 2 & mode && value; 'object' == typeof current && !~leafPrototypes.indexOf(current); current = getProto(current))Object.getOwnPropertyNames(current).forEach(function(key) {
                    def[key] = function() {
                        return value[key];
                    };
                });
                def['default'] = function() {
                    return value;
                };
                __webpack_require__.d(ns, def);
                return ns;
            };
        })();
        // webpack/runtime/define_property_getters
        (()=>{
            __webpack_require__.d = function(exports1, definition) {
                for(var key in definition)if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports1, key)) Object.defineProperty(exports1, key, {
                    enumerable: true,
                    get: definition[key]
                });
            };
        })();
        // webpack/runtime/has_own_property
        (()=>{
            __webpack_require__.o = function(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            };
        })();
        // webpack/runtime/make_namespace_object
        (()=>{
            // define __esModule on exports
            __webpack_require__.r = function(exports1) {
                if ('undefined' != typeof Symbol && Symbol.toStringTag) Object.defineProperty(exports1, Symbol.toStringTag, {
                    value: 'Module'
                });
                Object.defineProperty(exports1, '__esModule', {
                    value: true
                });
            };
        })();
        /************************************************************************/ var __webpack_exports__ = {};
        // ESM COMPAT FLAG
        __webpack_require__.r(__webpack_exports__);
        // EXPORTS
        __webpack_require__.d(__webpack_exports__, {
            default: ()=>/* binding */ src_rslib_entry_
        });
        // NAMESPACE OBJECT: ./node_modules/.pnpm/react-router-dom@6.28.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-router-dom/dist/index.js
        var react_router_dom_dist_namespaceObject = {};
        __webpack_require__.r(react_router_dom_dist_namespaceObject);
        __webpack_require__.d(react_router_dom_dist_namespaceObject, {
            AbortedDeferredError: ()=>AbortedDeferredError,
            Await: ()=>Await,
            BrowserRouter: ()=>BrowserRouter,
            Form: ()=>Form,
            HashRouter: ()=>HashRouter,
            Link: ()=>Link,
            MemoryRouter: ()=>MemoryRouter,
            NavLink: ()=>NavLink,
            Navigate: ()=>Navigate,
            NavigationType: ()=>router_Action,
            Outlet: ()=>Outlet,
            Route: ()=>Route,
            Router: ()=>Router,
            RouterProvider: ()=>dist_RouterProvider,
            Routes: ()=>Routes,
            ScrollRestoration: ()=>ScrollRestoration,
            UNSAFE_DataRouterContext: ()=>DataRouterContext,
            UNSAFE_DataRouterStateContext: ()=>DataRouterStateContext,
            UNSAFE_ErrorResponseImpl: ()=>ErrorResponseImpl,
            UNSAFE_FetchersContext: ()=>FetchersContext,
            UNSAFE_LocationContext: ()=>LocationContext,
            UNSAFE_NavigationContext: ()=>NavigationContext,
            UNSAFE_RouteContext: ()=>RouteContext,
            UNSAFE_ViewTransitionContext: ()=>ViewTransitionContext,
            UNSAFE_useRouteId: ()=>useRouteId,
            UNSAFE_useScrollRestoration: ()=>useScrollRestoration,
            createBrowserRouter: ()=>createBrowserRouter,
            createHashRouter: ()=>createHashRouter,
            createMemoryRouter: ()=>createMemoryRouter,
            createPath: ()=>createPath,
            createRoutesFromChildren: ()=>createRoutesFromChildren,
            createRoutesFromElements: ()=>createRoutesFromChildren,
            createSearchParams: ()=>createSearchParams,
            defer: ()=>router_defer,
            generatePath: ()=>generatePath,
            isRouteErrorResponse: ()=>isRouteErrorResponse,
            json: ()=>router_json,
            matchPath: ()=>matchPath,
            matchRoutes: ()=>matchRoutes,
            parsePath: ()=>parsePath,
            redirect: ()=>router_redirect,
            redirectDocument: ()=>redirectDocument,
            renderMatches: ()=>renderMatches,
            replace: ()=>router_replace,
            resolvePath: ()=>resolvePath,
            unstable_HistoryRouter: ()=>HistoryRouter,
            unstable_usePrompt: ()=>usePrompt,
            useActionData: ()=>useActionData,
            useAsyncError: ()=>useAsyncError,
            useAsyncValue: ()=>useAsyncValue,
            useBeforeUnload: ()=>useBeforeUnload,
            useBlocker: ()=>useBlocker,
            useFetcher: ()=>useFetcher,
            useFetchers: ()=>useFetchers,
            useFormAction: ()=>useFormAction,
            useHref: ()=>dist_useHref,
            useInRouterContext: ()=>useInRouterContext,
            useLinkClickHandler: ()=>useLinkClickHandler,
            useLoaderData: ()=>useLoaderData,
            useLocation: ()=>useLocation,
            useMatch: ()=>useMatch,
            useMatches: ()=>useMatches,
            useNavigate: ()=>useNavigate,
            useNavigation: ()=>useNavigation,
            useNavigationType: ()=>useNavigationType,
            useOutlet: ()=>useOutlet,
            useOutletContext: ()=>useOutletContext,
            useParams: ()=>useParams,
            useResolvedPath: ()=>useResolvedPath,
            useRevalidator: ()=>useRevalidator,
            useRouteError: ()=>useRouteError,
            useRouteLoaderData: ()=>useRouteLoaderData,
            useRoutes: ()=>useRoutes,
            useSearchParams: ()=>useSearchParams,
            useSubmit: ()=>useSubmit,
            useViewTransitionState: ()=>useViewTransitionState
        });
        // EXTERNAL MODULE: ./node_modules/.pnpm/@module-federation+enhanced@0.8.3_@rspack+core@1.1.6_@swc+helpers@0.5.15__react-dom@18.3.1_re_6awqquzvls3qoernnv4dasssaq/node_modules/@module-federation/enhanced/dist/src/runtime.js
        var runtime = __webpack_require__("./node_modules/.pnpm/@module-federation+enhanced@0.8.3_@rspack+core@1.1.6_@swc+helpers@0.5.15__react-dom@18.3.1_re_6awqquzvls3qoernnv4dasssaq/node_modules/@module-federation/enhanced/dist/src/runtime.js");
        // EXTERNAL MODULE: ./node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
        var react = __webpack_require__("./node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
        var react_namespaceObject = /*#__PURE__*/ __webpack_require__.t(react, 2);
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
        var browser = __toCommonJS(browser_exports);
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
        var createLogger$1 = (options = {}, { getLabel: getLabel2, handleError, finalLog: finalLog2, greet, LOG_TYPES: LOG_TYPES2 })=>{
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
                // greet
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
            // Level error
            error: {
                label: "error",
                level: "error",
                color: red
            },
            // Level warn
            warn: {
                label: "warn",
                level: "warn",
                color: orange
            },
            // Level info
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
            // Level log
            log: {
                level: "log"
            },
            // Level debug
            debug: {
                label: "debug",
                level: "verbose",
                color: magenta
            }
        };
        function createLogger2(options = {}) {
            return createLogger$1(options, {
                handleError: (msg)=>msg,
                getLabel,
                gradient,
                finalLog,
                LOG_TYPES,
                greet: (msg)=>gradient(msg)
            });
        }
        var logger = createLogger2();
        const BROWSER_LOG_KEY = "FEDERATION_DEBUG";
        const BROWSER_LOG_VALUE = "1";
        function isBrowserEnv() {
            return "undefined" != typeof window;
        }
        function isBrowserDebug() {
            try {
                if (isBrowserEnv() && window.localStorage) return localStorage.getItem(BROWSER_LOG_KEY) === BROWSER_LOG_VALUE;
            } catch (error) {}
            return false;
        }
        function isDebugMode() {
            if ("undefined" != typeof process && process.env && process.env["FEDERATION_DEBUG"]) return Boolean(process.env["FEDERATION_DEBUG"]);
            if ("undefined" != typeof FEDERATION_DEBUG && Boolean(FEDERATION_DEBUG)) return true;
            return isBrowserDebug();
        }
        const PREFIX = "[ Module Federation ]";
        function setDebug(loggerInstance) {
            if (isDebugMode()) loggerInstance.level = "verbose";
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
            const loggerInstance = browser.createLogger({
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
        createLogger(PREFIX);
        const context_CUbFnlO5_LoggerInstance = createLogger("[ Module Federation Bridge React ]");
        function context_CUbFnlO5_atLeastReact18(React2) {
            if (!(React2 && "string" == typeof React2.version && React2.version.indexOf(".") >= 0)) return false;
            {
                const majorVersionString = React2.version.split(".")[0];
                try {
                    return Number(majorVersionString) >= 18;
                } catch (err) {
                    return false;
                }
            }
        }
        function pathJoin(...args) {
            const res = args.reduce((res2, path)=>{
                let nPath = path;
                if (!nPath || "string" != typeof nPath) return res2;
                if ("/" !== nPath[0]) nPath = `/${nPath}`;
                const lastIndex = nPath.length - 1;
                if ("/" === nPath[lastIndex]) nPath = nPath.substring(0, lastIndex);
                return res2 + nPath;
            }, "");
            return res || "/";
        }
        const getModuleName = (id)=>{
            if (!id) return id;
            const idArray = id.split("/");
            if (idArray.length < 2) return id;
            return idArray[0] + "/" + idArray[1];
        };
        const getRootDomDefaultClassName = (moduleName)=>{
            if (!moduleName) return "";
            const name1 = getModuleName(moduleName).replace(/\@/, "").replace(/\//, "-");
            return `bridge-root-component-${name1}`;
        };
        const context_CUbFnlO5_RouterContext = react.createContext(null);
        /**
 * @remix-run/router v1.21.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function _extends() {
            _extends = Object.assign ? Object.assign.bind() : function(target) {
                for(var i = 1; i < arguments.length; i++){
                    var source = arguments[i];
                    for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
                }
                return target;
            };
            return _extends.apply(this, arguments);
        }
        ////////////////////////////////////////////////////////////////////////////////
        //#region Types and Constants
        ////////////////////////////////////////////////////////////////////////////////
        /**
 * Actions represent the type of change to a location value.
 */ var router_Action;
        (function(Action) {
            /**
   * A POP indicates a change to an arbitrary index in the history stack, such
   * as a back or forward navigation. It does not describe the direction of the
   * navigation, only that the current index changed.
   *
   * Note: This is the default action for newly created history objects.
   */ Action["Pop"] = "POP";
            /**
   * A PUSH indicates a new entry being added to the history stack, such as when
   * a link is clicked and a new page loads. When this happens, all subsequent
   * entries in the stack are lost.
   */ Action["Push"] = "PUSH";
            /**
   * A REPLACE indicates the entry at the current index in the history stack
   * being replaced by a new one.
   */ Action["Replace"] = "REPLACE";
        })(router_Action || (router_Action = {}));
        const PopStateEventType = "popstate";
        /**
 * Memory history stores the current location in memory. It is designed for use
 * in stateful non-browser environments like tests and React Native.
 */ function createMemoryHistory(options) {
            if (void 0 === options) options = {};
            let { initialEntries = [
                "/"
            ], initialIndex, v5Compat = false } = options;
            let entries; // Declare so we can access from createMemoryLocation
            entries = initialEntries.map((entry, index)=>createMemoryLocation(entry, "string" == typeof entry ? null : entry.state, 0 === index ? "default" : void 0));
            let index = clampIndex(null == initialIndex ? entries.length - 1 : initialIndex);
            let action = router_Action.Pop;
            let listener = null;
            function clampIndex(n) {
                return Math.min(Math.max(n, 0), entries.length - 1);
            }
            function getCurrentLocation() {
                return entries[index];
            }
            function createMemoryLocation(to, state, key) {
                if (void 0 === state) state = null;
                let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
                warning("/" === location.pathname.charAt(0), "relative pathnames are not supported in memory history: " + JSON.stringify(to));
                return location;
            }
            function createHref(to) {
                return "string" == typeof to ? to : createPath(to);
            }
            let history = {
                get index () {
                    return index;
                },
                get action () {
                    return action;
                },
                get location () {
                    return getCurrentLocation();
                },
                createHref,
                createURL (to) {
                    return new URL(createHref(to), "http://localhost");
                },
                encodeLocation (to) {
                    let path = "string" == typeof to ? parsePath(to) : to;
                    return {
                        pathname: path.pathname || "",
                        search: path.search || "",
                        hash: path.hash || ""
                    };
                },
                push (to, state) {
                    action = router_Action.Push;
                    let nextLocation = createMemoryLocation(to, state);
                    index += 1;
                    entries.splice(index, entries.length, nextLocation);
                    if (v5Compat && listener) listener({
                        action,
                        location: nextLocation,
                        delta: 1
                    });
                },
                replace (to, state) {
                    action = router_Action.Replace;
                    let nextLocation = createMemoryLocation(to, state);
                    entries[index] = nextLocation;
                    if (v5Compat && listener) listener({
                        action,
                        location: nextLocation,
                        delta: 0
                    });
                },
                go (delta) {
                    action = router_Action.Pop;
                    let nextIndex = clampIndex(index + delta);
                    let nextLocation = entries[nextIndex];
                    index = nextIndex;
                    if (listener) listener({
                        action,
                        location: nextLocation,
                        delta
                    });
                },
                listen (fn) {
                    listener = fn;
                    return ()=>{
                        listener = null;
                    };
                }
            };
            return history;
        }
        /**
 * Browser history stores the location in regular URLs. This is the standard for
 * most web apps, but it requires some configuration on the server to ensure you
 * serve the same app at multiple URLs.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createbrowserhistory
 */ function createBrowserHistory(options) {
            if (void 0 === options) options = {};
            function createBrowserLocation(window1, globalHistory) {
                let { pathname, search, hash } = window1.location;
                return createLocation("", {
                    pathname,
                    search,
                    hash
                }, // state defaults to `null` because `window.history.state` does
                globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
            }
            function createBrowserHref(window1, to) {
                return "string" == typeof to ? to : createPath(to);
            }
            return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
        }
        /**
 * Hash history stores the location in window.location.hash. This makes it ideal
 * for situations where you don't want to send the location to the server for
 * some reason, either because you do cannot configure it or the URL space is
 * reserved for something else.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createhashhistory
 */ function createHashHistory(options) {
            if (void 0 === options) options = {};
            function createHashLocation(window1, globalHistory) {
                let { pathname = "/", search = "", hash = "" } = parsePath(window1.location.hash.substr(1));
                // Hash URL should always have a leading / just like window.location.pathname
                // does, so if an app ends up at a route like /#something then we add a
                // leading slash so all of our path-matching behaves the same as if it would
                // in a browser router.  This is particularly important when there exists a
                // root splat route (<Route path="*">) since that matches internally against
                // "/*" and we'd expect /#something to 404 in a hash router app.
                if (!pathname.startsWith("/") && !pathname.startsWith(".")) pathname = "/" + pathname;
                return createLocation("", {
                    pathname,
                    search,
                    hash
                }, // state defaults to `null` because `window.history.state` does
                globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
            }
            function createHashHref(window1, to) {
                let base = window1.document.querySelector("base");
                let href = "";
                if (base && base.getAttribute("href")) {
                    let url = window1.location.href;
                    let hashIndex = url.indexOf("#");
                    href = -1 === hashIndex ? url : url.slice(0, hashIndex);
                }
                return href + "#" + ("string" == typeof to ? to : createPath(to));
            }
            function validateHashLocation(location, to) {
                warning("/" === location.pathname.charAt(0), "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
            }
            return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
        }
        function invariant(value, message) {
            if (false === value || null == value) throw new Error(message);
        }
        function warning(cond, message) {
            if (!cond) {
                // eslint-disable-next-line no-console
                if ("undefined" != typeof console) console.warn(message);
                try {
                    // Welcome to debugging history!
                    //
                    // This error is thrown as a convenience, so you can more easily
                    // find the source for a warning that appears in the console by
                    // enabling "pause on exceptions" in your JavaScript debugger.
                    throw new Error(message);
                // eslint-disable-next-line no-empty
                } catch (e) {}
            }
        }
        function createKey() {
            return Math.random().toString(36).substr(2, 8);
        }
        /**
 * For browser-based histories, we combine the state and key into an object
 */ function getHistoryState(location, index) {
            return {
                usr: location.state,
                key: location.key,
                idx: index
            };
        }
        /**
 * Creates a Location object with a unique key from the given Path
 */ function createLocation(current, to, state, key) {
            if (void 0 === state) state = null;
            let location = _extends({
                pathname: "string" == typeof current ? current : current.pathname,
                search: "",
                hash: ""
            }, "string" == typeof to ? parsePath(to) : to, {
                state,
                // TODO: This could be cleaned up.  push/replace should probably just take
                // full Locations now and avoid the need to run through this flow at all
                // But that's a pretty big refactor to the current test suite so going to
                // keep as is for the time being and just let any incoming keys take precedence
                key: to && to.key || key || createKey()
            });
            return location;
        }
        /**
 * Creates a string URL path from the given pathname, search, and hash components.
 */ function createPath(_ref) {
            let { pathname = "/", search = "", hash = "" } = _ref;
            if (search && "?" !== search) pathname += "?" === search.charAt(0) ? search : "?" + search;
            if (hash && "#" !== hash) pathname += "#" === hash.charAt(0) ? hash : "#" + hash;
            return pathname;
        }
        /**
 * Parses a string URL path into its separate pathname, search, and hash components.
 */ function parsePath(path) {
            let parsedPath = {};
            if (path) {
                let hashIndex = path.indexOf("#");
                if (hashIndex >= 0) {
                    parsedPath.hash = path.substr(hashIndex);
                    path = path.substr(0, hashIndex);
                }
                let searchIndex = path.indexOf("?");
                if (searchIndex >= 0) {
                    parsedPath.search = path.substr(searchIndex);
                    path = path.substr(0, searchIndex);
                }
                if (path) parsedPath.pathname = path;
            }
            return parsedPath;
        }
        function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
            if (void 0 === options) options = {};
            let { window: window1 = document.defaultView, v5Compat = false } = options;
            let globalHistory = window1.history;
            let action = router_Action.Pop;
            let listener = null;
            let index = getIndex();
            // Index should only be null when we initialize. If not, it's because the
            // user called history.pushState or history.replaceState directly, in which
            // case we should log a warning as it will result in bugs.
            if (null == index) {
                index = 0;
                globalHistory.replaceState(_extends({}, globalHistory.state, {
                    idx: index
                }), "");
            }
            function getIndex() {
                let state = globalHistory.state || {
                    idx: null
                };
                return state.idx;
            }
            function handlePop() {
                action = router_Action.Pop;
                let nextIndex = getIndex();
                let delta = null == nextIndex ? null : nextIndex - index;
                index = nextIndex;
                if (listener) listener({
                    action,
                    location: history.location,
                    delta
                });
            }
            function push(to, state) {
                action = router_Action.Push;
                let location = createLocation(history.location, to, state);
                if (validateLocation) validateLocation(location, to);
                index = getIndex() + 1;
                let historyState = getHistoryState(location, index);
                let url = history.createHref(location);
                // try...catch because iOS limits us to 100 pushState calls :/
                try {
                    globalHistory.pushState(historyState, "", url);
                } catch (error) {
                    // If the exception is because `state` can't be serialized, let that throw
                    // outwards just like a replace call would so the dev knows the cause
                    // https://html.spec.whatwg.org/multipage/nav-history-apis.html#shared-history-push/replace-state-steps
                    // https://html.spec.whatwg.org/multipage/structured-data.html#structuredserializeinternal
                    if (error instanceof DOMException && "DataCloneError" === error.name) throw error;
                    // They are going to lose state here, but there is no real
                    // way to warn them about it since the page will refresh...
                    window1.location.assign(url);
                }
                if (v5Compat && listener) listener({
                    action,
                    location: history.location,
                    delta: 1
                });
            }
            function replace(to, state) {
                action = router_Action.Replace;
                let location = createLocation(history.location, to, state);
                if (validateLocation) validateLocation(location, to);
                index = getIndex();
                let historyState = getHistoryState(location, index);
                let url = history.createHref(location);
                globalHistory.replaceState(historyState, "", url);
                if (v5Compat && listener) listener({
                    action,
                    location: history.location,
                    delta: 0
                });
            }
            function createURL(to) {
                // window.location.origin is "null" (the literal string value) in Firefox
                // under certain conditions, notably when serving from a local HTML file
                // See https://bugzilla.mozilla.org/show_bug.cgi?id=878297
                let base = "null" !== window1.location.origin ? window1.location.origin : window1.location.href;
                let href = "string" == typeof to ? to : createPath(to);
                // Treating this as a full URL will strip any trailing spaces so we need to
                // pre-encode them since they might be part of a matching splat param from
                // an ancestor route
                href = href.replace(/ $/, "%20");
                invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
                return new URL(href, base);
            }
            let history = {
                get action () {
                    return action;
                },
                get location () {
                    return getLocation(window1, globalHistory);
                },
                listen (fn) {
                    if (listener) throw new Error("A history only accepts one active listener");
                    window1.addEventListener(PopStateEventType, handlePop);
                    listener = fn;
                    return ()=>{
                        window1.removeEventListener(PopStateEventType, handlePop);
                        listener = null;
                    };
                },
                createHref (to) {
                    return createHref(window1, to);
                },
                createURL,
                encodeLocation (to) {
                    // Encode a Location the same way window.location would
                    let url = createURL(to);
                    return {
                        pathname: url.pathname,
                        search: url.search,
                        hash: url.hash
                    };
                },
                push,
                replace,
                go (n) {
                    return globalHistory.go(n);
                }
            };
            return history;
        }
        //#endregion
        var router_ResultType;
        (function(ResultType) {
            ResultType["data"] = "data";
            ResultType["deferred"] = "deferred";
            ResultType["redirect"] = "redirect";
            ResultType["error"] = "error";
        })(router_ResultType || (router_ResultType = {}));
        const immutableRouteKeys = new Set([
            "lazy",
            "caseSensitive",
            "path",
            "id",
            "index",
            "children"
        ]);
        function isIndexRoute(route) {
            return true === route.index;
        }
        // Walk the route tree generating unique IDs where necessary, so we are working
        // solely with AgnosticDataRouteObject's within the Router
        function convertRoutesToDataRoutes(routes, mapRouteProperties, parentPath, manifest) {
            if (void 0 === parentPath) parentPath = [];
            if (void 0 === manifest) manifest = {};
            return routes.map((route, index)=>{
                let treePath = [
                    ...parentPath,
                    String(index)
                ];
                let id = "string" == typeof route.id ? route.id : treePath.join("-");
                invariant(true !== route.index || !route.children, "Cannot specify children on an index route");
                invariant(!manifest[id], "Found a route id collision on id \"" + id + "\".  Route id's must be globally unique within Data Router usages");
                if (isIndexRoute(route)) {
                    let indexRoute = _extends({}, route, mapRouteProperties(route), {
                        id
                    });
                    manifest[id] = indexRoute;
                    return indexRoute;
                }
                {
                    let pathOrLayoutRoute = _extends({}, route, mapRouteProperties(route), {
                        id,
                        children: void 0
                    });
                    manifest[id] = pathOrLayoutRoute;
                    if (route.children) pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties, treePath, manifest);
                    return pathOrLayoutRoute;
                }
            });
        }
        /**
 * Matches the given routes to a location and returns the match data.
 *
 * @see https://reactrouter.com/v6/utils/match-routes
 */ function matchRoutes(routes, locationArg, basename) {
            if (void 0 === basename) basename = "/";
            return matchRoutesImpl(routes, locationArg, basename, false);
        }
        function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
            let location = "string" == typeof locationArg ? parsePath(locationArg) : locationArg;
            let pathname = stripBasename(location.pathname || "/", basename);
            if (null == pathname) return null;
            let branches = flattenRoutes(routes);
            rankRouteBranches(branches);
            let matches = null;
            for(let i = 0; null == matches && i < branches.length; ++i){
                // Incoming pathnames are generally encoded from either window.location
                // or from router.navigate, but we want to match against the unencoded
                // paths in the route definitions.  Memory router locations won't be
                // encoded here but there also shouldn't be anything to decode so this
                // should be a safe operation.  This avoids needing matchRoutes to be
                // history-aware.
                let decoded = decodePath(pathname);
                matches = matchRouteBranch(branches[i], decoded, allowPartial);
            }
            return matches;
        }
        function convertRouteMatchToUiMatch(match, loaderData) {
            let { route, pathname, params } = match;
            return {
                id: route.id,
                pathname,
                params,
                data: loaderData[route.id],
                handle: route.handle
            };
        }
        function flattenRoutes(routes, branches, parentsMeta, parentPath) {
            if (void 0 === branches) branches = [];
            if (void 0 === parentsMeta) parentsMeta = [];
            if (void 0 === parentPath) parentPath = "";
            let flattenRoute = (route, index, relativePath)=>{
                let meta = {
                    relativePath: void 0 === relativePath ? route.path || "" : relativePath,
                    caseSensitive: true === route.caseSensitive,
                    childrenIndex: index,
                    route
                };
                if (meta.relativePath.startsWith("/")) {
                    invariant(meta.relativePath.startsWith(parentPath), "Absolute route path \"" + meta.relativePath + "\" nested under path " + ("\"" + parentPath) + '" is not valid. An absolute child route path must start with the combined path of all its parent routes.');
                    meta.relativePath = meta.relativePath.slice(parentPath.length);
                }
                let path = joinPaths([
                    parentPath,
                    meta.relativePath
                ]);
                let routesMeta = parentsMeta.concat(meta);
                // Add the children before adding this route to the array, so we traverse the
                // route tree depth-first and child routes appear before their parents in
                // the "flattened" version.
                if (route.children && route.children.length > 0) {
                    invariant(// Our types know better, but runtime JS may not!
                    // @ts-expect-error
                    true !== route.index, 'Index routes must not have child routes. Please remove all child routes from route path "' + path + "\".");
                    flattenRoutes(route.children, branches, routesMeta, path);
                }
                // Routes without a path shouldn't ever match by themselves unless they are
                // index routes, so don't add them to the list of possible branches.
                if (null == route.path && !route.index) return;
                branches.push({
                    path,
                    score: computeScore(path, route.index),
                    routesMeta
                });
            };
            routes.forEach((route, index)=>{
                var _route$path;
                // coarse-grain check for optional params
                if ("" !== route.path && null != (_route$path = route.path) && _route$path.includes("?")) for (let exploded of explodeOptionalSegments(route.path))flattenRoute(route, index, exploded);
                else flattenRoute(route, index);
            });
            return branches;
        }
        /**
 * Computes all combinations of optional path segments for a given path,
 * excluding combinations that are ambiguous and of lower priority.
 *
 * For example, `/one/:two?/three/:four?/:five?` explodes to:
 * - `/one/three`
 * - `/one/:two/three`
 * - `/one/three/:four`
 * - `/one/three/:five`
 * - `/one/:two/three/:four`
 * - `/one/:two/three/:five`
 * - `/one/three/:four/:five`
 * - `/one/:two/three/:four/:five`
 */ function explodeOptionalSegments(path) {
            let segments = path.split("/");
            if (0 === segments.length) return [];
            let [first, ...rest] = segments;
            // Optional path segments are denoted by a trailing `?`
            let isOptional = first.endsWith("?");
            // Compute the corresponding required segment: `foo?` -> `foo`
            let required = first.replace(/\?$/, "");
            if (0 === rest.length) // Intepret empty string as omitting an optional segment
            // `["one", "", "three"]` corresponds to omitting `:two` from `/one/:two?/three` -> `/one/three`
            return isOptional ? [
                required,
                ""
            ] : [
                required
            ];
            let restExploded = explodeOptionalSegments(rest.join("/"));
            let result = [];
            // All child paths with the prefix.  Do this for all children before the
            // optional version for all children, so we get consistent ordering where the
            // parent optional aspect is preferred as required.  Otherwise, we can get
            // child sections interspersed where deeper optional segments are higher than
            // parent optional segments, where for example, /:two would explode _earlier_
            // then /:one.  By always including the parent as required _for all children_
            // first, we avoid this issue
            result.push(...restExploded.map((subpath)=>"" === subpath ? required : [
                    required,
                    subpath
                ].join("/")));
            // Then, if this is an optional value, add all child versions without
            if (isOptional) result.push(...restExploded);
            // for absolute paths, ensure `/` instead of empty segment
            return result.map((exploded)=>path.startsWith("/") && "" === exploded ? "/" : exploded);
        }
        function rankRouteBranches(branches) {
            branches.sort((a, b)=>a.score !== b.score ? b.score - a.score // Higher score first
                 : compareIndexes(a.routesMeta.map((meta)=>meta.childrenIndex), b.routesMeta.map((meta)=>meta.childrenIndex)));
        }
        const paramRe = /^:[\w-]+$/;
        const dynamicSegmentValue = 3;
        const indexRouteValue = 2;
        const emptySegmentValue = 1;
        const staticSegmentValue = 10;
        const splatPenalty = -2;
        const isSplat = (s)=>"*" === s;
        function computeScore(path, index) {
            let segments = path.split("/");
            let initialScore = segments.length;
            if (segments.some(isSplat)) initialScore += splatPenalty;
            if (index) initialScore += indexRouteValue;
            return segments.filter((s)=>!isSplat(s)).reduce((score, segment)=>score + (paramRe.test(segment) ? dynamicSegmentValue : "" === segment ? emptySegmentValue : staticSegmentValue), initialScore);
        }
        function compareIndexes(a, b) {
            let siblings = a.length === b.length && a.slice(0, -1).every((n, i)=>n === b[i]);
            return siblings ? // If two routes are siblings, we should try to match the earlier sibling
            // first. This allows people to have fine-grained control over the matching
            // behavior by simply putting routes with identical paths in the order they
            // want them tried.
            a[a.length - 1] - b[b.length - 1] : // Otherwise, it doesn't really make sense to rank non-siblings by index,
            // so they sort equally.
            0;
        }
        function matchRouteBranch(branch, pathname, allowPartial) {
            if (void 0 === allowPartial) allowPartial = false;
            let { routesMeta } = branch;
            let matchedParams = {};
            let matchedPathname = "/";
            let matches = [];
            for(let i = 0; i < routesMeta.length; ++i){
                let meta = routesMeta[i];
                let end = i === routesMeta.length - 1;
                let remainingPathname = "/" === matchedPathname ? pathname : pathname.slice(matchedPathname.length) || "/";
                let match = matchPath({
                    path: meta.relativePath,
                    caseSensitive: meta.caseSensitive,
                    end
                }, remainingPathname);
                let route = meta.route;
                if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) match = matchPath({
                    path: meta.relativePath,
                    caseSensitive: meta.caseSensitive,
                    end: false
                }, remainingPathname);
                if (!match) return null;
                Object.assign(matchedParams, match.params);
                matches.push({
                    // TODO: Can this as be avoided?
                    params: matchedParams,
                    pathname: joinPaths([
                        matchedPathname,
                        match.pathname
                    ]),
                    pathnameBase: normalizePathname(joinPaths([
                        matchedPathname,
                        match.pathnameBase
                    ])),
                    route
                });
                if ("/" !== match.pathnameBase) matchedPathname = joinPaths([
                    matchedPathname,
                    match.pathnameBase
                ]);
            }
            return matches;
        }
        /**
 * Returns a path with params interpolated.
 *
 * @see https://reactrouter.com/v6/utils/generate-path
 */ function generatePath(originalPath, params) {
            if (void 0 === params) params = {};
            let path = originalPath;
            if (path.endsWith("*") && "*" !== path && !path.endsWith("/*")) {
                warning(false, "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*")) + '" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, ' + ("please change the route path to \"" + path.replace(/\*$/, "/*")) + "\".");
                path = path.replace(/\*$/, "/*");
            }
            // ensure `/` is added at the beginning if the path is absolute
            const prefix = path.startsWith("/") ? "/" : "";
            const stringify = (p)=>null == p ? "" : "string" == typeof p ? p : String(p);
            const segments = path.split(/\/+/).map((segment, index, array)=>{
                const isLastSegment = index === array.length - 1;
                // only apply the splat if it's the last segment
                if (isLastSegment && "*" === segment) {
                    const star = "*";
                    // Apply the splat
                    return stringify(params[star]);
                }
                const keyMatch = segment.match(/^:([\w-]+)(\??)$/);
                if (keyMatch) {
                    const [, key, optional] = keyMatch;
                    let param = params[key];
                    invariant("?" === optional || null != param, "Missing \":" + key + "\" param");
                    return stringify(param);
                }
                // Remove any optional markers from optional static segments
                return segment.replace(/\?$/g, "");
            })// Remove empty segments
            .filter((segment)=>!!segment);
            return prefix + segments.join("/");
        }
        /**
 * Performs pattern matching on a URL pathname and returns information about
 * the match.
 *
 * @see https://reactrouter.com/v6/utils/match-path
 */ function matchPath(pattern, pathname) {
            if ("string" == typeof pattern) pattern = {
                path: pattern,
                caseSensitive: false,
                end: true
            };
            let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
            let match = pathname.match(matcher);
            if (!match) return null;
            let matchedPathname = match[0];
            let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
            let captureGroups = match.slice(1);
            let params = compiledParams.reduce((memo, _ref, index)=>{
                let { paramName, isOptional } = _ref;
                // We need to compute the pathnameBase here using the raw splat value
                // instead of using params["*"] later because it will be decoded then
                if ("*" === paramName) {
                    let splatValue = captureGroups[index] || "";
                    pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
                }
                const value = captureGroups[index];
                if (isOptional && !value) memo[paramName] = void 0;
                else memo[paramName] = (value || "").replace(/%2F/g, "/");
                return memo;
            }, {});
            return {
                params,
                pathname: matchedPathname,
                pathnameBase,
                pattern
            };
        }
        function compilePath(path, caseSensitive, end) {
            if (void 0 === caseSensitive) caseSensitive = false;
            if (void 0 === end) end = true;
            warning("*" === path || !path.endsWith("*") || path.endsWith("/*"), "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*")) + '" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, ' + ("please change the route path to \"" + path.replace(/\*$/, "/*")) + "\".");
            let params = [];
            let regexpSource = "^" + path.replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
            .replace(/^\/*/, "/") // Make sure it has a leading /
            .replace(/[\\.*+^${}|()[\]]/g, "\\$&") // Escape special regex chars
            .replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional)=>{
                params.push({
                    paramName,
                    isOptional: null != isOptional
                });
                return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
            });
            if (path.endsWith("*")) {
                params.push({
                    paramName: "*"
                });
                regexpSource += "*" === path || "/*" === path ? "(.*)$" // Already matched the initial /, just match the rest
                 : "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
            } else if (end) // When matching to the end, ignore trailing slashes
            regexpSource += "\\/*$";
            else if ("" !== path && "/" !== path) // If our path is non-empty and contains anything beyond an initial slash,
            // then we have _some_ form of path in our regex, so we should expect to
            // match only if we find the end of this path segment.  Look for an optional
            // non-captured trailing slash (to match a portion of the URL) or the end
            // of the path (if we've matched to the end).  We used to do this with a
            // word boundary but that gives false positives on routes like
            // /user-preferences since `-` counts as a word boundary.
            regexpSource += "(?:(?=\\/|$))";
            let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
            return [
                matcher,
                params
            ];
        }
        function decodePath(value) {
            try {
                return value.split("/").map((v)=>decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
            } catch (error) {
                warning(false, "The URL path \"" + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error) + ").");
                return value;
            }
        }
        /**
 * @private
 */ function stripBasename(pathname, basename) {
            if ("/" === basename) return pathname;
            if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) return null;
            // We want to leave trailing slash behavior in the user's control, so if they
            // specify a basename with a trailing slash, we should support it
            let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
            let nextChar = pathname.charAt(startIndex);
            if (nextChar && "/" !== nextChar) // pathname does not start with basename/
            return null;
            return pathname.slice(startIndex) || "/";
        }
        /**
 * Returns a resolved path object relative to the given pathname.
 *
 * @see https://reactrouter.com/v6/utils/resolve-path
 */ function resolvePath(to, fromPathname) {
            if (void 0 === fromPathname) fromPathname = "/";
            let { pathname: toPathname, search = "", hash = "" } = "string" == typeof to ? parsePath(to) : to;
            let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
            return {
                pathname,
                search: normalizeSearch(search),
                hash: normalizeHash(hash)
            };
        }
        function resolvePathname(relativePath, fromPathname) {
            let segments = fromPathname.replace(/\/+$/, "").split("/");
            let relativeSegments = relativePath.split("/");
            relativeSegments.forEach((segment)=>{
                if (".." === segment) // Keep the root "" segment so the pathname starts at /
                {
                    if (segments.length > 1) segments.pop();
                } else if ("." !== segment) segments.push(segment);
            });
            return segments.length > 1 ? segments.join("/") : "/";
        }
        function getInvalidPathError(char, field, dest, path) {
            return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path)) + "].  Please separate it out to the " + ("`to." + dest) + '` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.';
        }
        /**
 * @private
 *
 * When processing relative navigation we want to ignore ancestor routes that
 * do not contribute to the path, such that index/pathless layout routes don't
 * interfere.
 *
 * For example, when moving a route element into an index route and/or a
 * pathless layout route, relative link behavior contained within should stay
 * the same.  Both of the following examples should link back to the root:
 *
 *   <Route path="/">
 *     <Route path="accounts" element={<Link to=".."}>
 *   </Route>
 *
 *   <Route path="/">
 *     <Route path="accounts">
 *       <Route element={<AccountsLayout />}>       // <-- Does not contribute
 *         <Route index element={<Link to=".."} />  // <-- Does not contribute
 *       </Route
 *     </Route>
 *   </Route>
 */ function getPathContributingMatches(matches) {
            return matches.filter((match, index)=>0 === index || match.route.path && match.route.path.length > 0);
        }
        // Return the array of pathnames for the current route matches - used to
        // generate the routePathnames input for resolveTo()
        function getResolveToMatches(matches, v7_relativeSplatPath) {
            let pathMatches = getPathContributingMatches(matches);
            // When v7_relativeSplatPath is enabled, use the full pathname for the leaf
            // match so we include splat values for "." links.  See:
            // https://github.com/remix-run/react-router/issues/11052#issuecomment-1836589329
            if (v7_relativeSplatPath) return pathMatches.map((match, idx)=>idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
            return pathMatches.map((match)=>match.pathnameBase);
        }
        /**
 * @private
 */ function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
            if (void 0 === isPathRelative) isPathRelative = false;
            let to;
            if ("string" == typeof toArg) to = parsePath(toArg);
            else {
                to = _extends({}, toArg);
                invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
                invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
                invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
            }
            let isEmptyPath = "" === toArg || "" === to.pathname;
            let toPathname = isEmptyPath ? "/" : to.pathname;
            let from;
            // Routing is relative to the current pathname if explicitly requested.
            //
            // If a pathname is explicitly provided in `to`, it should be relative to the
            // route context. This is explained in `Note on `<Link to>` values` in our
            // migration guide from v5 as a means of disambiguation between `to` values
            // that begin with `/` and those that do not. However, this is problematic for
            // `to` values that do not provide a pathname. `to` can simply be a search or
            // hash string, in which case we should assume that the navigation is relative
            // to the current location's pathname and *not* the route pathname.
            if (null == toPathname) from = locationPathname;
            else {
                let routePathnameIndex = routePathnames.length - 1;
                // With relative="route" (the default), each leading .. segment means
                // "go up one route" instead of "go up one URL segment".  This is a key
                // difference from how <a href> works and a major reason we call this a
                // "to" value instead of a "href".
                if (!isPathRelative && toPathname.startsWith("..")) {
                    let toSegments = toPathname.split("/");
                    while(".." === toSegments[0]){
                        toSegments.shift();
                        routePathnameIndex -= 1;
                    }
                    to.pathname = toSegments.join("/");
                }
                from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
            }
            let path = resolvePath(to, from);
            // Ensure the pathname has a trailing slash if the original "to" had one
            let hasExplicitTrailingSlash = toPathname && "/" !== toPathname && toPathname.endsWith("/");
            // Or if this was a link to the current path which has a trailing slash
            let hasCurrentTrailingSlash = (isEmptyPath || "." === toPathname) && locationPathname.endsWith("/");
            if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) path.pathname += "/";
            return path;
        }
        /**
 * @private
 */ function getToPathname(to) {
            // Empty strings should be treated the same as / paths
            return "" === to || "" === to.pathname ? "/" : "string" == typeof to ? parsePath(to).pathname : to.pathname;
        }
        /**
 * @private
 */ const joinPaths = (paths)=>paths.join("/").replace(/\/\/+/g, "/");
        /**
 * @private
 */ const normalizePathname = (pathname)=>pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
        /**
 * @private
 */ const normalizeSearch = (search)=>search && "?" !== search ? search.startsWith("?") ? search : "?" + search : "";
        /**
 * @private
 */ const normalizeHash = (hash)=>hash && "#" !== hash ? hash.startsWith("#") ? hash : "#" + hash : "";
        /**
 * This is a shortcut for creating `application/json` responses. Converts `data`
 * to JSON and sets the `Content-Type` header.
 *
 * @deprecated The `json` method is deprecated in favor of returning raw objects.
 * This method will be removed in v7.
 */ const router_json = function(data, init) {
            if (void 0 === init) init = {};
            let responseInit = "number" == typeof init ? {
                status: init
            } : init;
            let headers = new Headers(responseInit.headers);
            if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json; charset=utf-8");
            return new Response(JSON.stringify(data), _extends({}, responseInit, {
                headers
            }));
        };
        class DataWithResponseInit {
            constructor(data, init){
                this.type = "DataWithResponseInit";
                this.data = data;
                this.init = init || null;
            }
        }
        /**
 * Create "responses" that contain `status`/`headers` without forcing
 * serialization into an actual `Response` - used by Remix single fetch
 */ function router_data(data, init) {
            return new DataWithResponseInit(data, "number" == typeof init ? {
                status: init
            } : init);
        }
        class AbortedDeferredError extends Error {
        }
        class DeferredData {
            constructor(data, responseInit){
                this.pendingKeysSet = new Set();
                this.subscribers = new Set();
                this.deferredKeys = [];
                invariant(data && "object" == typeof data && !Array.isArray(data), "defer() only accepts plain objects");
                // Set up an AbortController + Promise we can race against to exit early
                // cancellation
                let reject;
                this.abortPromise = new Promise((_, r)=>reject = r);
                this.controller = new AbortController();
                let onAbort = ()=>reject(new AbortedDeferredError("Deferred data aborted"));
                this.unlistenAbortSignal = ()=>this.controller.signal.removeEventListener("abort", onAbort);
                this.controller.signal.addEventListener("abort", onAbort);
                this.data = Object.entries(data).reduce((acc, _ref2)=>{
                    let [key, value] = _ref2;
                    return Object.assign(acc, {
                        [key]: this.trackPromise(key, value)
                    });
                }, {});
                if (this.done) // All incoming values were resolved
                this.unlistenAbortSignal();
                this.init = responseInit;
            }
            trackPromise(key, value) {
                if (!(value instanceof Promise)) return value;
                this.deferredKeys.push(key);
                this.pendingKeysSet.add(key);
                // We store a little wrapper promise that will be extended with
                // _data/_error props upon resolve/reject
                let promise = Promise.race([
                    value,
                    this.abortPromise
                ]).then((data)=>this.onSettle(promise, key, void 0, data), (error)=>this.onSettle(promise, key, error));
                // Register rejection listeners to avoid uncaught promise rejections on
                // errors or aborted deferred values
                promise.catch(()=>{});
                Object.defineProperty(promise, "_tracked", {
                    get: ()=>true
                });
                return promise;
            }
            onSettle(promise, key, error, data) {
                if (this.controller.signal.aborted && error instanceof AbortedDeferredError) {
                    this.unlistenAbortSignal();
                    Object.defineProperty(promise, "_error", {
                        get: ()=>error
                    });
                    return Promise.reject(error);
                }
                this.pendingKeysSet.delete(key);
                if (this.done) // Nothing left to abort!
                this.unlistenAbortSignal();
                // If the promise was resolved/rejected with undefined, we'll throw an error as you
                // should always resolve with a value or null
                if (void 0 === error && void 0 === data) {
                    let undefinedError = new Error("Deferred data for key \"" + key + '" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.');
                    Object.defineProperty(promise, "_error", {
                        get: ()=>undefinedError
                    });
                    this.emit(false, key);
                    return Promise.reject(undefinedError);
                }
                if (void 0 === data) {
                    Object.defineProperty(promise, "_error", {
                        get: ()=>error
                    });
                    this.emit(false, key);
                    return Promise.reject(error);
                }
                Object.defineProperty(promise, "_data", {
                    get: ()=>data
                });
                this.emit(false, key);
                return data;
            }
            emit(aborted, settledKey) {
                this.subscribers.forEach((subscriber)=>subscriber(aborted, settledKey));
            }
            subscribe(fn) {
                this.subscribers.add(fn);
                return ()=>this.subscribers.delete(fn);
            }
            cancel() {
                this.controller.abort();
                this.pendingKeysSet.forEach((v, k)=>this.pendingKeysSet.delete(k));
                this.emit(true);
            }
            async resolveData(signal) {
                let aborted = false;
                if (!this.done) {
                    let onAbort = ()=>this.cancel();
                    signal.addEventListener("abort", onAbort);
                    aborted = await new Promise((resolve)=>{
                        this.subscribe((aborted)=>{
                            signal.removeEventListener("abort", onAbort);
                            if (aborted || this.done) resolve(aborted);
                        });
                    });
                }
                return aborted;
            }
            get done() {
                return 0 === this.pendingKeysSet.size;
            }
            get unwrappedData() {
                invariant(null !== this.data && this.done, "Can only unwrap data on initialized and settled deferreds");
                return Object.entries(this.data).reduce((acc, _ref3)=>{
                    let [key, value] = _ref3;
                    return Object.assign(acc, {
                        [key]: unwrapTrackedPromise(value)
                    });
                }, {});
            }
            get pendingKeys() {
                return Array.from(this.pendingKeysSet);
            }
        }
        function isTrackedPromise(value) {
            return value instanceof Promise && true === value._tracked;
        }
        function unwrapTrackedPromise(value) {
            if (!isTrackedPromise(value)) return value;
            if (value._error) throw value._error;
            return value._data;
        }
        /**
 * @deprecated The `defer` method is deprecated in favor of returning raw
 * objects. This method will be removed in v7.
 */ const router_defer = function(data, init) {
            if (void 0 === init) init = {};
            let responseInit = "number" == typeof init ? {
                status: init
            } : init;
            return new DeferredData(data, responseInit);
        };
        /**
 * A redirect response. Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 */ const router_redirect = function(url, init) {
            if (void 0 === init) init = 302;
            let responseInit = init;
            if ("number" == typeof responseInit) responseInit = {
                status: responseInit
            };
            else if (void 0 === responseInit.status) responseInit.status = 302;
            let headers = new Headers(responseInit.headers);
            headers.set("Location", url);
            return new Response(null, _extends({}, responseInit, {
                headers
            }));
        };
        /**
 * A redirect response that will force a document reload to the new location.
 * Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 */ const redirectDocument = (url, init)=>{
            let response = router_redirect(url, init);
            response.headers.set("X-Remix-Reload-Document", "true");
            return response;
        };
        /**
 * A redirect response that will perform a `history.replaceState` instead of a
 * `history.pushState` for client-side navigation redirects.
 * Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 */ const router_replace = (url, init)=>{
            let response = router_redirect(url, init);
            response.headers.set("X-Remix-Replace", "true");
            return response;
        };
        /**
 * @private
 * Utility class we use to hold auto-unwrapped 4xx/5xx Response bodies
 *
 * We don't export the class for public use since it's an implementation
 * detail, but we export the interface above so folks can build their own
 * abstractions around instances via isRouteErrorResponse()
 */ class ErrorResponseImpl {
            constructor(status, statusText, data, internal){
                if (void 0 === internal) internal = false;
                this.status = status;
                this.statusText = statusText || "";
                this.internal = internal;
                if (data instanceof Error) {
                    this.data = data.toString();
                    this.error = data;
                } else this.data = data;
            }
        }
        /**
 * Check if the given error is an ErrorResponse generated from a 4xx/5xx
 * Response thrown from an action/loader
 */ function isRouteErrorResponse(error) {
            return null != error && "number" == typeof error.status && "string" == typeof error.statusText && "boolean" == typeof error.internal && "data" in error;
        }
        const validMutationMethodsArr = [
            "post",
            "put",
            "patch",
            "delete"
        ];
        const validMutationMethods = new Set(validMutationMethodsArr);
        const validRequestMethodsArr = [
            "get",
            ...validMutationMethodsArr
        ];
        const validRequestMethods = new Set(validRequestMethodsArr);
        const redirectStatusCodes = new Set([
            301,
            302,
            303,
            307,
            308
        ]);
        const redirectPreserveMethodStatusCodes = new Set([
            307,
            308
        ]);
        const IDLE_NAVIGATION = {
            state: "idle",
            location: void 0,
            formMethod: void 0,
            formAction: void 0,
            formEncType: void 0,
            formData: void 0,
            json: void 0,
            text: void 0
        };
        const IDLE_FETCHER = {
            state: "idle",
            data: void 0,
            formMethod: void 0,
            formAction: void 0,
            formEncType: void 0,
            formData: void 0,
            json: void 0,
            text: void 0
        };
        const IDLE_BLOCKER = {
            state: "unblocked",
            proceed: void 0,
            reset: void 0,
            location: void 0
        };
        const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
        const defaultMapRouteProperties = (route)=>({
                hasErrorBoundary: Boolean(route.hasErrorBoundary)
            });
        const TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
        //#endregion
        ////////////////////////////////////////////////////////////////////////////////
        //#region createRouter
        ////////////////////////////////////////////////////////////////////////////////
        /**
 * Create a router and listen to history POP navigations
 */ function createRouter(init) {
            const routerWindow = init.window ? init.window : "undefined" != typeof window ? window : void 0;
            const isBrowser = void 0 !== routerWindow && void 0 !== routerWindow.document && void 0 !== routerWindow.document.createElement;
            const isServer = !isBrowser;
            invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
            let mapRouteProperties;
            if (init.mapRouteProperties) mapRouteProperties = init.mapRouteProperties;
            else if (init.detectErrorBoundary) {
                // If they are still using the deprecated version, wrap it with the new API
                let detectErrorBoundary = init.detectErrorBoundary;
                mapRouteProperties = (route)=>({
                        hasErrorBoundary: detectErrorBoundary(route)
                    });
            } else mapRouteProperties = defaultMapRouteProperties;
            // Routes keyed by ID
            let manifest = {};
            // Routes in tree format for matching
            let dataRoutes = convertRoutesToDataRoutes(init.routes, mapRouteProperties, void 0, manifest);
            let inFlightDataRoutes;
            let basename = init.basename || "/";
            let dataStrategyImpl = init.dataStrategy || defaultDataStrategy;
            let patchRoutesOnNavigationImpl = init.patchRoutesOnNavigation;
            // Config driven behavior flags
            let future = _extends({
                v7_fetcherPersist: false,
                v7_normalizeFormMethod: false,
                v7_partialHydration: false,
                v7_prependBasename: false,
                v7_relativeSplatPath: false,
                v7_skipActionErrorRevalidation: false
            }, init.future);
            // Cleanup function for history
            let unlistenHistory = null;
            // Externally-provided functions to call on all state changes
            let subscribers = new Set();
            // Externally-provided object to hold scroll restoration locations during routing
            let savedScrollPositions = null;
            // Externally-provided function to get scroll restoration keys
            let getScrollRestorationKey = null;
            // Externally-provided function to get current scroll position
            let getScrollPosition = null;
            // One-time flag to control the initial hydration scroll restoration.  Because
            // we don't get the saved positions from <ScrollRestoration /> until _after_
            // the initial render, we need to manually trigger a separate updateState to
            // send along the restoreScrollPosition
            // Set to true if we have `hydrationData` since we assume we were SSR'd and that
            // SSR did the initial scroll restoration.
            let initialScrollRestored = null != init.hydrationData;
            let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
            let initialErrors = null;
            if (null == initialMatches && !patchRoutesOnNavigationImpl) {
                // If we do not match a user-provided-route, fall back to the root
                // to allow the error boundary to take over
                let error = getInternalRouterError(404, {
                    pathname: init.history.location.pathname
                });
                let { matches, route } = getShortCircuitMatches(dataRoutes);
                initialMatches = matches;
                initialErrors = {
                    [route.id]: error
                };
            }
            // In SPA apps, if the user provided a patchRoutesOnNavigation implementation and
            // our initial match is a splat route, clear them out so we run through lazy
            // discovery on hydration in case there's a more accurate lazy route match.
            // In SSR apps (with `hydrationData`), we expect that the server will send
            // up the proper matched routes so we don't want to run lazy discovery on
            // initial hydration and want to hydrate into the splat route.
            if (initialMatches && !init.hydrationData) {
                let fogOfWar = checkFogOfWar(initialMatches, dataRoutes, init.history.location.pathname);
                if (fogOfWar.active) initialMatches = null;
            }
            let initialized;
            if (initialMatches) {
                if (initialMatches.some((m)=>m.route.lazy)) // All initialMatches need to be loaded before we're ready.  If we have lazy
                // functions around still then we'll need to run them in initialize()
                initialized = false;
                else if (initialMatches.some((m)=>m.route.loader)) {
                    if (future.v7_partialHydration) {
                        // If partial hydration is enabled, we're initialized so long as we were
                        // provided with hydrationData for every route with a loader, and no loaders
                        // were marked for explicit hydration
                        let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
                        let errors = init.hydrationData ? init.hydrationData.errors : null;
                        // If errors exist, don't consider routes below the boundary
                        if (errors) {
                            let idx = initialMatches.findIndex((m)=>void 0 !== errors[m.route.id]);
                            initialized = initialMatches.slice(0, idx + 1).every((m)=>!shouldLoadRouteOnHydration(m.route, loaderData, errors));
                        } else initialized = initialMatches.every((m)=>!shouldLoadRouteOnHydration(m.route, loaderData, errors));
                    } else // Without partial hydration - we're initialized if we were provided any
                    // hydrationData - which is expected to be complete
                    initialized = null != init.hydrationData;
                } else // If we've got no loaders to run, then we're good to go
                initialized = true;
            } else {
                initialized = false;
                initialMatches = [];
                // If partial hydration and fog of war is enabled, we will be running
                // `patchRoutesOnNavigation` during hydration so include any partial matches as
                // the initial matches so we can properly render `HydrateFallback`'s
                if (future.v7_partialHydration) {
                    let fogOfWar = checkFogOfWar(null, dataRoutes, init.history.location.pathname);
                    if (fogOfWar.active && fogOfWar.matches) initialMatches = fogOfWar.matches;
                }
            }
            let router;
            let state = {
                historyAction: init.history.action,
                location: init.history.location,
                matches: initialMatches,
                initialized,
                navigation: IDLE_NAVIGATION,
                // Don't restore on initial updateState() if we were SSR'd
                restoreScrollPosition: null == init.hydrationData && null,
                preventScrollReset: false,
                revalidation: "idle",
                loaderData: init.hydrationData && init.hydrationData.loaderData || {},
                actionData: init.hydrationData && init.hydrationData.actionData || null,
                errors: init.hydrationData && init.hydrationData.errors || initialErrors,
                fetchers: new Map(),
                blockers: new Map()
            };
            // -- Stateful internal variables to manage navigations --
            // Current navigation in progress (to be committed in completeNavigation)
            let pendingAction = router_Action.Pop;
            // Should the current navigation prevent the scroll reset if scroll cannot
            // be restored?
            let pendingPreventScrollReset = false;
            // AbortController for the active navigation
            let pendingNavigationController;
            // Should the current navigation enable document.startViewTransition?
            let pendingViewTransitionEnabled = false;
            // Store applied view transitions so we can apply them on POP
            let appliedViewTransitions = new Map();
            // Cleanup function for persisting applied transitions to sessionStorage
            let removePageHideEventListener = null;
            // We use this to avoid touching history in completeNavigation if a
            // revalidation is entirely uninterrupted
            let isUninterruptedRevalidation = false;
            // Use this internal flag to force revalidation of all loaders:
            //  - submissions (completed or interrupted)
            //  - useRevalidator()
            //  - X-Remix-Revalidate (from redirect)
            let isRevalidationRequired = false;
            // Use this internal array to capture routes that require revalidation due
            // to a cancelled deferred on action submission
            let cancelledDeferredRoutes = [];
            // Use this internal array to capture fetcher loads that were cancelled by an
            // action navigation and require revalidation
            let cancelledFetcherLoads = new Set();
            // AbortControllers for any in-flight fetchers
            let fetchControllers = new Map();
            // Track loads based on the order in which they started
            let incrementingLoadId = 0;
            // Track the outstanding pending navigation data load to be compared against
            // the globally incrementing load when a fetcher load lands after a completed
            // navigation
            let pendingNavigationLoadId = -1;
            // Fetchers that triggered data reloads as a result of their actions
            let fetchReloadIds = new Map();
            // Fetchers that triggered redirect navigations
            let fetchRedirectIds = new Set();
            // Most recent href/match for fetcher.load calls for fetchers
            let fetchLoadMatches = new Map();
            // Ref-count mounted fetchers so we know when it's ok to clean them up
            let activeFetchers = new Map();
            // Fetchers that have requested a delete when using v7_fetcherPersist,
            // they'll be officially removed after they return to idle
            let deletedFetchers = new Set();
            // Store DeferredData instances for active route matches.  When a
            // route loader returns defer() we stick one in here.  Then, when a nested
            // promise resolves we update loaderData.  If a new navigation starts we
            // cancel active deferreds for eliminated routes.
            let activeDeferreds = new Map();
            // Store blocker functions in a separate Map outside of router state since
            // we don't need to update UI state if they change
            let blockerFunctions = new Map();
            // Flag to ignore the next history update, so we can revert the URL change on
            // a POP navigation that was blocked by the user without touching router state
            let unblockBlockerHistoryUpdate;
            // Initialize the router, all side effects should be kicked off from here.
            // Implemented as a Fluent API for ease of:
            //   let router = createRouter(init).initialize();
            function initialize() {
                // If history informs us of a POP navigation, start the navigation but do not update
                // state.  We'll update our own state once the navigation completes
                unlistenHistory = init.history.listen((_ref)=>{
                    let { action: historyAction, location, delta } = _ref;
                    // Ignore this event if it was just us resetting the URL from a
                    // blocked POP navigation
                    if (unblockBlockerHistoryUpdate) {
                        unblockBlockerHistoryUpdate();
                        unblockBlockerHistoryUpdate = void 0;
                        return;
                    }
                    warning(0 === blockerFunctions.size || null != delta, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
                    let blockerKey = shouldBlockNavigation({
                        currentLocation: state.location,
                        nextLocation: location,
                        historyAction
                    });
                    if (blockerKey && null != delta) {
                        // Restore the URL to match the current UI, but don't update router state
                        let nextHistoryUpdatePromise = new Promise((resolve)=>{
                            unblockBlockerHistoryUpdate = resolve;
                        });
                        init.history.go(-1 * delta);
                        // Put the blocker into a blocked state
                        updateBlocker(blockerKey, {
                            state: "blocked",
                            location,
                            proceed () {
                                updateBlocker(blockerKey, {
                                    state: "proceeding",
                                    proceed: void 0,
                                    reset: void 0,
                                    location
                                });
                                // Re-do the same POP navigation we just blocked, after the url
                                // restoration is also complete.  See:
                                // https://github.com/remix-run/react-router/issues/11613
                                nextHistoryUpdatePromise.then(()=>init.history.go(delta));
                            },
                            reset () {
                                let blockers = new Map(state.blockers);
                                blockers.set(blockerKey, IDLE_BLOCKER);
                                updateState({
                                    blockers
                                });
                            }
                        });
                        return;
                    }
                    return startNavigation(historyAction, location);
                });
                if (isBrowser) {
                    // FIXME: This feels gross.  How can we cleanup the lines between
                    // scrollRestoration/appliedTransitions persistance?
                    restoreAppliedTransitions(routerWindow, appliedViewTransitions);
                    let _saveAppliedTransitions = ()=>persistAppliedTransitions(routerWindow, appliedViewTransitions);
                    routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
                    removePageHideEventListener = ()=>routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
                }
                // Kick off initial data load if needed.  Use Pop to avoid modifying history
                // Note we don't do any handling of lazy here.  For SPA's it'll get handled
                // in the normal navigation flow.  For SSR it's expected that lazy modules are
                // resolved prior to router creation since we can't go into a fallbackElement
                // UI for SSR'd apps
                if (!state.initialized) startNavigation(router_Action.Pop, state.location, {
                    initialHydration: true
                });
                return router;
            }
            // Clean up a router and it's side effects
            function dispose() {
                if (unlistenHistory) unlistenHistory();
                if (removePageHideEventListener) removePageHideEventListener();
                subscribers.clear();
                pendingNavigationController && pendingNavigationController.abort();
                state.fetchers.forEach((_, key)=>deleteFetcher(key));
                state.blockers.forEach((_, key)=>deleteBlocker(key));
            }
            // Subscribe to state updates for the router
            function subscribe(fn) {
                subscribers.add(fn);
                return ()=>subscribers.delete(fn);
            }
            // Update our state and notify the calling context of the change
            function updateState(newState, opts) {
                if (void 0 === opts) opts = {};
                state = _extends({}, state, newState);
                // Prep fetcher cleanup so we can tell the UI which fetcher data entries
                // can be removed
                let completedFetchers = [];
                let deletedFetchersKeys = [];
                if (future.v7_fetcherPersist) state.fetchers.forEach((fetcher, key)=>{
                    if ("idle" === fetcher.state) {
                        if (deletedFetchers.has(key)) // Unmounted from the UI and can be totally removed
                        deletedFetchersKeys.push(key);
                        else // Returned to idle but still mounted in the UI, so semi-remains for
                        // revalidations and such
                        completedFetchers.push(key);
                    }
                });
                // Iterate over a local copy so that if flushSync is used and we end up
                // removing and adding a new subscriber due to the useCallback dependencies,
                // we don't get ourselves into a loop calling the new subscriber immediately
                [
                    ...subscribers
                ].forEach((subscriber)=>subscriber(state, {
                        deletedFetchers: deletedFetchersKeys,
                        viewTransitionOpts: opts.viewTransitionOpts,
                        flushSync: true === opts.flushSync
                    }));
                // Remove idle fetchers from state since we only care about in-flight fetchers.
                if (future.v7_fetcherPersist) {
                    completedFetchers.forEach((key)=>state.fetchers.delete(key));
                    deletedFetchersKeys.forEach((key)=>deleteFetcher(key));
                }
            }
            // Complete a navigation returning the state.navigation back to the IDLE_NAVIGATION
            // and setting state.[historyAction/location/matches] to the new route.
            // - Location is a required param
            // - Navigation will always be set to IDLE_NAVIGATION
            // - Can pass any other state in newState
            function completeNavigation(location, newState, _temp) {
                var _location$state, _location$state2;
                let { flushSync } = void 0 === _temp ? {} : _temp;
                // Deduce if we're in a loading/actionReload state:
                // - We have committed actionData in the store
                // - The current navigation was a mutation submission
                // - We're past the submitting state and into the loading state
                // - The location being loaded is not the result of a redirect
                let isActionReload = null != state.actionData && null != state.navigation.formMethod && isMutationMethod(state.navigation.formMethod) && "loading" === state.navigation.state && (null == (_location$state = location.state) ? void 0 : _location$state._isRedirect) !== true;
                let actionData;
                actionData = newState.actionData ? Object.keys(newState.actionData).length > 0 ? newState.actionData : null : isActionReload ? state.actionData : null;
                // Always preserve any existing loaderData from re-used routes
                let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData;
                // On a successful navigation we can assume we got through all blockers
                // so we can start fresh
                let blockers = state.blockers;
                if (blockers.size > 0) {
                    blockers = new Map(blockers);
                    blockers.forEach((_, k)=>blockers.set(k, IDLE_BLOCKER));
                }
                // Always respect the user flag.  Otherwise don't reset on mutation
                // submission navigations unless they redirect
                let preventScrollReset = true === pendingPreventScrollReset || null != state.navigation.formMethod && isMutationMethod(state.navigation.formMethod) && (null == (_location$state2 = location.state) ? void 0 : _location$state2._isRedirect) !== true;
                // Commit any in-flight routes at the end of the HMR revalidation "navigation"
                if (inFlightDataRoutes) {
                    dataRoutes = inFlightDataRoutes;
                    inFlightDataRoutes = void 0;
                }
                if (isUninterruptedRevalidation) ;
                else if (pendingAction === router_Action.Pop) ;
                else if (pendingAction === router_Action.Push) init.history.push(location, location.state);
                else if (pendingAction === router_Action.Replace) init.history.replace(location, location.state);
                let viewTransitionOpts;
                // On POP, enable transitions if they were enabled on the original navigation
                if (pendingAction === router_Action.Pop) {
                    // Forward takes precedence so they behave like the original navigation
                    let priorPaths = appliedViewTransitions.get(state.location.pathname);
                    if (priorPaths && priorPaths.has(location.pathname)) viewTransitionOpts = {
                        currentLocation: state.location,
                        nextLocation: location
                    };
                    else if (appliedViewTransitions.has(location.pathname)) // If we don't have a previous forward nav, assume we're popping back to
                    // the new location and enable if that location previously enabled
                    viewTransitionOpts = {
                        currentLocation: location,
                        nextLocation: state.location
                    };
                } else if (pendingViewTransitionEnabled) {
                    // Store the applied transition on PUSH/REPLACE
                    let toPaths = appliedViewTransitions.get(state.location.pathname);
                    if (toPaths) toPaths.add(location.pathname);
                    else {
                        toPaths = new Set([
                            location.pathname
                        ]);
                        appliedViewTransitions.set(state.location.pathname, toPaths);
                    }
                    viewTransitionOpts = {
                        currentLocation: state.location,
                        nextLocation: location
                    };
                }
                updateState(_extends({}, newState, {
                    actionData,
                    loaderData,
                    historyAction: pendingAction,
                    location,
                    initialized: true,
                    navigation: IDLE_NAVIGATION,
                    revalidation: "idle",
                    restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
                    preventScrollReset,
                    blockers
                }), {
                    viewTransitionOpts,
                    flushSync: true === flushSync
                });
                // Reset stateful navigation vars
                pendingAction = router_Action.Pop;
                pendingPreventScrollReset = false;
                pendingViewTransitionEnabled = false;
                isUninterruptedRevalidation = false;
                isRevalidationRequired = false;
                cancelledDeferredRoutes = [];
            }
            // Trigger a navigation event, which can either be a numerical POP or a PUSH
            // replace with an optional submission
            async function navigate(to, opts) {
                if ("number" == typeof to) {
                    init.history.go(to);
                    return;
                }
                let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, to, future.v7_relativeSplatPath, null == opts ? void 0 : opts.fromRouteId, null == opts ? void 0 : opts.relative);
                let { path, submission, error } = normalizeNavigateOptions(future.v7_normalizeFormMethod, false, normalizedPath, opts);
                let currentLocation = state.location;
                let nextLocation = createLocation(state.location, path, opts && opts.state);
                // When using navigate as a PUSH/REPLACE we aren't reading an already-encoded
                // URL from window.location, so we need to encode it here so the behavior
                // remains the same as POP and non-data-router usages.  new URL() does all
                // the same encoding we'd get from a history.pushState/window.location read
                // without having to touch history
                nextLocation = _extends({}, nextLocation, init.history.encodeLocation(nextLocation));
                let userReplace = opts && null != opts.replace ? opts.replace : void 0;
                let historyAction = router_Action.Push;
                if (true === userReplace) historyAction = router_Action.Replace;
                else if (false === userReplace) ;
                else if (null != submission && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) // By default on submissions to the current location we REPLACE so that
                // users don't have to double-click the back button to get to the prior
                // location.  If the user redirects to a different location from the
                // action/loader this will be ignored and the redirect will be a PUSH
                historyAction = router_Action.Replace;
                let preventScrollReset = opts && "preventScrollReset" in opts ? true === opts.preventScrollReset : void 0;
                let flushSync = true === (opts && opts.flushSync);
                let blockerKey = shouldBlockNavigation({
                    currentLocation,
                    nextLocation,
                    historyAction
                });
                if (blockerKey) {
                    // Put the blocker into a blocked state
                    updateBlocker(blockerKey, {
                        state: "blocked",
                        location: nextLocation,
                        proceed () {
                            updateBlocker(blockerKey, {
                                state: "proceeding",
                                proceed: void 0,
                                reset: void 0,
                                location: nextLocation
                            });
                            // Send the same navigation through
                            navigate(to, opts);
                        },
                        reset () {
                            let blockers = new Map(state.blockers);
                            blockers.set(blockerKey, IDLE_BLOCKER);
                            updateState({
                                blockers
                            });
                        }
                    });
                    return;
                }
                return await startNavigation(historyAction, nextLocation, {
                    submission,
                    // Send through the formData serialization error if we have one so we can
                    // render at the right error boundary after we match routes
                    pendingError: error,
                    preventScrollReset,
                    replace: opts && opts.replace,
                    enableViewTransition: opts && opts.viewTransition,
                    flushSync
                });
            }
            // Revalidate all current loaders.  If a navigation is in progress or if this
            // is interrupted by a navigation, allow this to "succeed" by calling all
            // loaders during the next loader round
            function revalidate() {
                interruptActiveLoads();
                updateState({
                    revalidation: "loading"
                });
                // If we're currently submitting an action, we don't need to start a new
                // navigation, we'll just let the follow up loader execution call all loaders
                if ("submitting" === state.navigation.state) return;
                // If we're currently in an idle state, start a new navigation for the current
                // action/location and mark it as uninterrupted, which will skip the history
                // update in completeNavigation
                if ("idle" === state.navigation.state) {
                    startNavigation(state.historyAction, state.location, {
                        startUninterruptedRevalidation: true
                    });
                    return;
                }
                // Otherwise, if we're currently in a loading state, just start a new
                // navigation to the navigation.location but do not trigger an uninterrupted
                // revalidation so that history correctly updates once the navigation completes
                startNavigation(pendingAction || state.historyAction, state.navigation.location, {
                    overrideNavigation: state.navigation,
                    // Proxy through any rending view transition
                    enableViewTransition: true === pendingViewTransitionEnabled
                });
            }
            // Start a navigation to the given action/location.  Can optionally provide a
            // overrideNavigation which will override the normalLoad in the case of a redirect
            // navigation
            async function startNavigation(historyAction, location, opts) {
                // Abort any in-progress navigations and start a new one. Unset any ongoing
                // uninterrupted revalidations unless told otherwise, since we want this
                // new navigation to update history normally
                pendingNavigationController && pendingNavigationController.abort();
                pendingNavigationController = null;
                pendingAction = historyAction;
                isUninterruptedRevalidation = true === (opts && opts.startUninterruptedRevalidation);
                // Save the current scroll position every time we start a new navigation,
                // and track whether we should reset scroll on completion
                saveScrollPosition(state.location, state.matches);
                pendingPreventScrollReset = true === (opts && opts.preventScrollReset);
                pendingViewTransitionEnabled = true === (opts && opts.enableViewTransition);
                let routesToUse = inFlightDataRoutes || dataRoutes;
                let loadingNavigation = opts && opts.overrideNavigation;
                let matches = matchRoutes(routesToUse, location, basename);
                let flushSync = true === (opts && opts.flushSync);
                let fogOfWar = checkFogOfWar(matches, routesToUse, location.pathname);
                if (fogOfWar.active && fogOfWar.matches) matches = fogOfWar.matches;
                // Short circuit with a 404 on the root error boundary if we match nothing
                if (!matches) {
                    let { error, notFoundMatches, route } = handleNavigational404(location.pathname);
                    completeNavigation(location, {
                        matches: notFoundMatches,
                        loaderData: {},
                        errors: {
                            [route.id]: error
                        }
                    }, {
                        flushSync
                    });
                    return;
                }
                // Short circuit if it's only a hash change and not a revalidation or
                // mutation submission.
                //
                // Ignore on initial page loads because since the initial hydration will always
                // be "same hash".  For example, on /page#hash and submit a <Form method="post">
                // which will default to a navigation to /page
                if (state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
                    completeNavigation(location, {
                        matches
                    }, {
                        flushSync
                    });
                    return;
                }
                // Create a controller/Request for this navigation
                pendingNavigationController = new AbortController();
                let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission);
                let pendingActionResult;
                if (opts && opts.pendingError) // If we have a pendingError, it means the user attempted a GET submission
                // with binary FormData so assign here and skip to handleLoaders.  That
                // way we handle calling loaders above the boundary etc.  It's not really
                // different from an actionError in that sense.
                pendingActionResult = [
                    findNearestBoundary(matches).route.id,
                    {
                        type: router_ResultType.error,
                        error: opts.pendingError
                    }
                ];
                else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
                    // Call action if we received an action submission
                    let actionResult = await handleAction(request, location, opts.submission, matches, fogOfWar.active, {
                        replace: opts.replace,
                        flushSync
                    });
                    if (actionResult.shortCircuited) return;
                    // If we received a 404 from handleAction, it's because we couldn't lazily
                    // discover the destination route so we don't want to call loaders
                    if (actionResult.pendingActionResult) {
                        let [routeId, result] = actionResult.pendingActionResult;
                        if (isErrorResult(result) && isRouteErrorResponse(result.error) && 404 === result.error.status) {
                            pendingNavigationController = null;
                            completeNavigation(location, {
                                matches: actionResult.matches,
                                loaderData: {},
                                errors: {
                                    [routeId]: result.error
                                }
                            });
                            return;
                        }
                    }
                    matches = actionResult.matches || matches;
                    pendingActionResult = actionResult.pendingActionResult;
                    loadingNavigation = getLoadingNavigation(location, opts.submission);
                    flushSync = false;
                    // No need to do fog of war matching again on loader execution
                    fogOfWar.active = false;
                    // Create a GET request for the loaders
                    request = createClientSideRequest(init.history, request.url, request.signal);
                }
                // Call loaders
                let { shortCircuited, matches: updatedMatches, loaderData, errors } = await handleLoaders(request, location, matches, fogOfWar.active, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, opts && true === opts.initialHydration, flushSync, pendingActionResult);
                if (shortCircuited) return;
                // Clean up now that the action/loaders have completed.  Don't clean up if
                // we short circuited because pendingNavigationController will have already
                // been assigned to a new controller for the next navigation
                pendingNavigationController = null;
                completeNavigation(location, _extends({
                    matches: updatedMatches || matches
                }, getActionDataForCommit(pendingActionResult), {
                    loaderData,
                    errors
                }));
            }
            // Call the action matched by the leaf route for this navigation and handle
            // redirects/errors
            async function handleAction(request, location, submission, matches, isFogOfWar, opts) {
                if (void 0 === opts) opts = {};
                interruptActiveLoads();
                // Put us in a submitting state
                let navigation = getSubmittingNavigation(location, submission);
                updateState({
                    navigation
                }, {
                    flushSync: true === opts.flushSync
                });
                if (isFogOfWar) {
                    let discoverResult = await discoverRoutes(matches, location.pathname, request.signal);
                    if ("aborted" === discoverResult.type) return {
                        shortCircuited: true
                    };
                    if ("error" === discoverResult.type) {
                        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
                        return {
                            matches: discoverResult.partialMatches,
                            pendingActionResult: [
                                boundaryId,
                                {
                                    type: router_ResultType.error,
                                    error: discoverResult.error
                                }
                            ]
                        };
                    } else if (discoverResult.matches) matches = discoverResult.matches;
                    else {
                        let { notFoundMatches, error, route } = handleNavigational404(location.pathname);
                        return {
                            matches: notFoundMatches,
                            pendingActionResult: [
                                route.id,
                                {
                                    type: router_ResultType.error,
                                    error
                                }
                            ]
                        };
                    }
                }
                // Call our action and get the result
                let result;
                let actionMatch = getTargetMatch(matches, location);
                if (actionMatch.route.action || actionMatch.route.lazy) {
                    let results = await callDataStrategy("action", state, request, [
                        actionMatch
                    ], matches, null);
                    result = results[actionMatch.route.id];
                    if (request.signal.aborted) return {
                        shortCircuited: true
                    };
                } else result = {
                    type: router_ResultType.error,
                    error: getInternalRouterError(405, {
                        method: request.method,
                        pathname: location.pathname,
                        routeId: actionMatch.route.id
                    })
                };
                if (isRedirectResult(result)) {
                    let replace;
                    if (opts && null != opts.replace) replace = opts.replace;
                    else {
                        // If the user didn't explicity indicate replace behavior, replace if
                        // we redirected to the exact same location we're currently at to avoid
                        // double back-buttons
                        let location = normalizeRedirectLocation(result.response.headers.get("Location"), new URL(request.url), basename);
                        replace = location === state.location.pathname + state.location.search;
                    }
                    await startRedirectNavigation(request, result, true, {
                        submission,
                        replace
                    });
                    return {
                        shortCircuited: true
                    };
                }
                if (isDeferredResult(result)) throw getInternalRouterError(400, {
                    type: "defer-action"
                });
                if (isErrorResult(result)) {
                    // Store off the pending error - we use it to determine which loaders
                    // to call and will commit it when we complete the navigation
                    let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
                    // By default, all submissions to the current location are REPLACE
                    // navigations, but if the action threw an error that'll be rendered in
                    // an errorElement, we fall back to PUSH so that the user can use the
                    // back button to get back to the pre-submission form location to try
                    // again
                    if (true !== (opts && opts.replace)) pendingAction = router_Action.Push;
                    return {
                        matches,
                        pendingActionResult: [
                            boundaryMatch.route.id,
                            result
                        ]
                    };
                }
                return {
                    matches,
                    pendingActionResult: [
                        actionMatch.route.id,
                        result
                    ]
                };
            }
            // Call all applicable loaders for the given matches, handling redirects,
            // errors, etc.
            async function handleLoaders(request, location, matches, isFogOfWar, overrideNavigation, submission, fetcherSubmission, replace, initialHydration, flushSync, pendingActionResult) {
                // Figure out the right navigation we want to use for data loading
                let loadingNavigation = overrideNavigation || getLoadingNavigation(location, submission);
                // If this was a redirect from an action we don't have a "submission" but
                // we have it on the loading navigation so use that if available
                let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
                // If this is an uninterrupted revalidation, we remain in our current idle
                // state.  If not, we need to switch to our loading state and load data,
                // preserving any new action data or existing action data (in the case of
                // a revalidation interrupting an actionReload)
                // If we have partialHydration enabled, then don't update the state for the
                // initial data load since it's not a "navigation"
                let shouldUpdateNavigationState = !isUninterruptedRevalidation && (!future.v7_partialHydration || !initialHydration);
                // When fog of war is enabled, we enter our `loading` state earlier so we
                // can discover new routes during the `loading` state.  We skip this if
                // we've already run actions since we would have done our matching already.
                // If the children() function threw then, we want to proceed with the
                // partial matches it discovered.
                if (isFogOfWar) {
                    if (shouldUpdateNavigationState) {
                        let actionData = getUpdatedActionData(pendingActionResult);
                        updateState(_extends({
                            navigation: loadingNavigation
                        }, void 0 !== actionData ? {
                            actionData
                        } : {}), {
                            flushSync
                        });
                    }
                    let discoverResult = await discoverRoutes(matches, location.pathname, request.signal);
                    if ("aborted" === discoverResult.type) return {
                        shortCircuited: true
                    };
                    if ("error" === discoverResult.type) {
                        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
                        return {
                            matches: discoverResult.partialMatches,
                            loaderData: {},
                            errors: {
                                [boundaryId]: discoverResult.error
                            }
                        };
                    } else if (discoverResult.matches) matches = discoverResult.matches;
                    else {
                        let { error, notFoundMatches, route } = handleNavigational404(location.pathname);
                        return {
                            matches: notFoundMatches,
                            loaderData: {},
                            errors: {
                                [route.id]: error
                            }
                        };
                    }
                }
                let routesToUse = inFlightDataRoutes || dataRoutes;
                let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location, future.v7_partialHydration && true === initialHydration, future.v7_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult);
                // Cancel pending deferreds for no-longer-matched routes or routes we're
                // about to reload.  Note that if this is an action reload we would have
                // already cancelled all pending deferreds so this would be a no-op
                cancelActiveDeferreds((routeId)=>!(matches && matches.some((m)=>m.route.id === routeId)) || matchesToLoad && matchesToLoad.some((m)=>m.route.id === routeId));
                pendingNavigationLoadId = ++incrementingLoadId;
                // Short circuit if we have no loaders to run
                if (0 === matchesToLoad.length && 0 === revalidatingFetchers.length) {
                    let updatedFetchers = markFetchRedirectsDone();
                    completeNavigation(location, _extends({
                        matches,
                        loaderData: {},
                        // Commit pending error if we're short circuiting
                        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
                            [pendingActionResult[0]]: pendingActionResult[1].error
                        } : null
                    }, getActionDataForCommit(pendingActionResult), updatedFetchers ? {
                        fetchers: new Map(state.fetchers)
                    } : {}), {
                        flushSync
                    });
                    return {
                        shortCircuited: true
                    };
                }
                if (shouldUpdateNavigationState) {
                    let updates = {};
                    if (!isFogOfWar) {
                        // Only update navigation/actionNData if we didn't already do it above
                        updates.navigation = loadingNavigation;
                        let actionData = getUpdatedActionData(pendingActionResult);
                        if (void 0 !== actionData) updates.actionData = actionData;
                    }
                    if (revalidatingFetchers.length > 0) updates.fetchers = getUpdatedRevalidatingFetchers(revalidatingFetchers);
                    updateState(updates, {
                        flushSync
                    });
                }
                revalidatingFetchers.forEach((rf)=>{
                    abortFetcher(rf.key);
                    if (rf.controller) // Fetchers use an independent AbortController so that aborting a fetcher
                    // (via deleteFetcher) does not abort the triggering navigation that
                    // triggered the revalidation
                    fetchControllers.set(rf.key, rf.controller);
                });
                // Proxy navigation abort through to revalidation fetchers
                let abortPendingFetchRevalidations = ()=>revalidatingFetchers.forEach((f)=>abortFetcher(f.key));
                if (pendingNavigationController) pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
                let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(state, matches, matchesToLoad, revalidatingFetchers, request);
                if (request.signal.aborted) return {
                    shortCircuited: true
                };
                // Clean up _after_ loaders have completed.  Don't clean up if we short
                // circuited because fetchControllers would have been aborted and
                // reassigned to new controllers for the next navigation
                if (pendingNavigationController) pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
                revalidatingFetchers.forEach((rf)=>fetchControllers.delete(rf.key));
                // If any loaders returned a redirect Response, start a new REPLACE navigation
                let redirect = findRedirect(loaderResults);
                if (redirect) {
                    await startRedirectNavigation(request, redirect.result, true, {
                        replace
                    });
                    return {
                        shortCircuited: true
                    };
                }
                redirect = findRedirect(fetcherResults);
                if (redirect) {
                    // If this redirect came from a fetcher make sure we mark it in
                    // fetchRedirectIds so it doesn't get revalidated on the next set of
                    // loader executions
                    fetchRedirectIds.add(redirect.key);
                    await startRedirectNavigation(request, redirect.result, true, {
                        replace
                    });
                    return {
                        shortCircuited: true
                    };
                }
                // Process and commit output from loaders
                let { loaderData, errors } = processLoaderData(state, matches, loaderResults, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds);
                // Wire up subscribers to update loaderData as promises settle
                activeDeferreds.forEach((deferredData, routeId)=>{
                    deferredData.subscribe((aborted)=>{
                        // Note: No need to updateState here since the TrackedPromise on
                        // loaderData is stable across resolve/reject
                        // Remove this instance if we were aborted or if promises have settled
                        if (aborted || deferredData.done) activeDeferreds.delete(routeId);
                    });
                });
                // Preserve SSR errors during partial hydration
                if (future.v7_partialHydration && initialHydration && state.errors) errors = _extends({}, state.errors, errors);
                let updatedFetchers = markFetchRedirectsDone();
                let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
                let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
                return _extends({
                    matches,
                    loaderData,
                    errors
                }, shouldUpdateFetchers ? {
                    fetchers: new Map(state.fetchers)
                } : {});
            }
            function getUpdatedActionData(pendingActionResult) {
                if (pendingActionResult && !isErrorResult(pendingActionResult[1])) // This is cast to `any` currently because `RouteData`uses any and it
                // would be a breaking change to use any.
                // TODO: v7 - change `RouteData` to use `unknown` instead of `any`
                return {
                    [pendingActionResult[0]]: pendingActionResult[1].data
                };
                if (state.actionData) {
                    if (0 === Object.keys(state.actionData).length) return null;
                    return state.actionData;
                }
            }
            function getUpdatedRevalidatingFetchers(revalidatingFetchers) {
                revalidatingFetchers.forEach((rf)=>{
                    let fetcher = state.fetchers.get(rf.key);
                    let revalidatingFetcher = getLoadingFetcher(void 0, fetcher ? fetcher.data : void 0);
                    state.fetchers.set(rf.key, revalidatingFetcher);
                });
                return new Map(state.fetchers);
            }
            // Trigger a fetcher load/submit for the given fetcher key
            function fetch1(key, routeId, href, opts) {
                if (isServer) throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
                abortFetcher(key);
                let flushSync = true === (opts && opts.flushSync);
                let routesToUse = inFlightDataRoutes || dataRoutes;
                let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, href, future.v7_relativeSplatPath, routeId, null == opts ? void 0 : opts.relative);
                let matches = matchRoutes(routesToUse, normalizedPath, basename);
                let fogOfWar = checkFogOfWar(matches, routesToUse, normalizedPath);
                if (fogOfWar.active && fogOfWar.matches) matches = fogOfWar.matches;
                if (!matches) {
                    setFetcherError(key, routeId, getInternalRouterError(404, {
                        pathname: normalizedPath
                    }), {
                        flushSync
                    });
                    return;
                }
                let { path, submission, error } = normalizeNavigateOptions(future.v7_normalizeFormMethod, true, normalizedPath, opts);
                if (error) {
                    setFetcherError(key, routeId, error, {
                        flushSync
                    });
                    return;
                }
                let match = getTargetMatch(matches, path);
                let preventScrollReset = true === (opts && opts.preventScrollReset);
                if (submission && isMutationMethod(submission.formMethod)) {
                    handleFetcherAction(key, routeId, path, match, matches, fogOfWar.active, flushSync, preventScrollReset, submission);
                    return;
                }
                // Store off the match so we can call it's shouldRevalidate on subsequent
                // revalidations
                fetchLoadMatches.set(key, {
                    routeId,
                    path
                });
                handleFetcherLoader(key, routeId, path, match, matches, fogOfWar.active, flushSync, preventScrollReset, submission);
            }
            // Call the action for the matched fetcher.submit(), and then handle redirects,
            // errors, and revalidation
            async function handleFetcherAction(key, routeId, path, match, requestMatches, isFogOfWar, flushSync, preventScrollReset, submission) {
                interruptActiveLoads();
                fetchLoadMatches.delete(key);
                function detectAndHandle405Error(m) {
                    if (!m.route.action && !m.route.lazy) {
                        let error = getInternalRouterError(405, {
                            method: submission.formMethod,
                            pathname: path,
                            routeId: routeId
                        });
                        setFetcherError(key, routeId, error, {
                            flushSync
                        });
                        return true;
                    }
                    return false;
                }
                if (!isFogOfWar && detectAndHandle405Error(match)) return;
                // Put this fetcher into it's submitting state
                let existingFetcher = state.fetchers.get(key);
                updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
                    flushSync
                });
                let abortController = new AbortController();
                let fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
                if (isFogOfWar) {
                    let discoverResult = await discoverRoutes(requestMatches, path, fetchRequest.signal);
                    if ("aborted" === discoverResult.type) return;
                    if ("error" === discoverResult.type) {
                        setFetcherError(key, routeId, discoverResult.error, {
                            flushSync
                        });
                        return;
                    } else if (discoverResult.matches) {
                        requestMatches = discoverResult.matches;
                        match = getTargetMatch(requestMatches, path);
                        if (detectAndHandle405Error(match)) return;
                    } else {
                        setFetcherError(key, routeId, getInternalRouterError(404, {
                            pathname: path
                        }), {
                            flushSync
                        });
                        return;
                    }
                }
                // Call the action for the fetcher
                fetchControllers.set(key, abortController);
                let originatingLoadId = incrementingLoadId;
                let actionResults = await callDataStrategy("action", state, fetchRequest, [
                    match
                ], requestMatches, key);
                let actionResult = actionResults[match.route.id];
                if (fetchRequest.signal.aborted) {
                    // We can delete this so long as we weren't aborted by our own fetcher
                    // re-submit which would have put _new_ controller is in fetchControllers
                    if (fetchControllers.get(key) === abortController) fetchControllers.delete(key);
                    return;
                }
                // When using v7_fetcherPersist, we don't want errors bubbling up to the UI
                // or redirects processed for unmounted fetchers so we just revert them to
                // idle
                if (future.v7_fetcherPersist && deletedFetchers.has(key)) {
                    if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
                        updateFetcherState(key, getDoneFetcher(void 0));
                        return;
                    }
                } else {
                    if (isRedirectResult(actionResult)) {
                        fetchControllers.delete(key);
                        if (pendingNavigationLoadId > originatingLoadId) {
                            // A new navigation was kicked off after our action started, so that
                            // should take precedence over this redirect navigation.  We already
                            // set isRevalidationRequired so all loaders for the new route should
                            // fire unless opted out via shouldRevalidate
                            updateFetcherState(key, getDoneFetcher(void 0));
                            return;
                        }
                        fetchRedirectIds.add(key);
                        updateFetcherState(key, getLoadingFetcher(submission));
                        return startRedirectNavigation(fetchRequest, actionResult, false, {
                            fetcherSubmission: submission,
                            preventScrollReset
                        });
                    }
                    // Process any non-redirect errors thrown
                    if (isErrorResult(actionResult)) {
                        setFetcherError(key, routeId, actionResult.error);
                        return;
                    }
                }
                if (isDeferredResult(actionResult)) throw getInternalRouterError(400, {
                    type: "defer-action"
                });
                // Start the data load for current matches, or the next location if we're
                // in the middle of a navigation
                let nextLocation = state.navigation.location || state.location;
                let revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
                let routesToUse = inFlightDataRoutes || dataRoutes;
                let matches = "idle" !== state.navigation.state ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
                invariant(matches, "Didn't find any matches after fetcher action");
                let loadId = ++incrementingLoadId;
                fetchReloadIds.set(key, loadId);
                let loadFetcher = getLoadingFetcher(submission, actionResult.data);
                state.fetchers.set(key, loadFetcher);
                let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, submission, nextLocation, false, future.v7_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, [
                    match.route.id,
                    actionResult
                ]);
                // Put all revalidating fetchers into the loading state, except for the
                // current fetcher which we want to keep in it's current loading state which
                // contains it's action submission info + action data
                revalidatingFetchers.filter((rf)=>rf.key !== key).forEach((rf)=>{
                    let staleKey = rf.key;
                    let existingFetcher = state.fetchers.get(staleKey);
                    let revalidatingFetcher = getLoadingFetcher(void 0, existingFetcher ? existingFetcher.data : void 0);
                    state.fetchers.set(staleKey, revalidatingFetcher);
                    abortFetcher(staleKey);
                    if (rf.controller) fetchControllers.set(staleKey, rf.controller);
                });
                updateState({
                    fetchers: new Map(state.fetchers)
                });
                let abortPendingFetchRevalidations = ()=>revalidatingFetchers.forEach((rf)=>abortFetcher(rf.key));
                abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
                let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(state, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
                if (abortController.signal.aborted) return;
                abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
                fetchReloadIds.delete(key);
                fetchControllers.delete(key);
                revalidatingFetchers.forEach((r)=>fetchControllers.delete(r.key));
                let redirect = findRedirect(loaderResults);
                if (redirect) return startRedirectNavigation(revalidationRequest, redirect.result, false, {
                    preventScrollReset
                });
                redirect = findRedirect(fetcherResults);
                if (redirect) {
                    // If this redirect came from a fetcher make sure we mark it in
                    // fetchRedirectIds so it doesn't get revalidated on the next set of
                    // loader executions
                    fetchRedirectIds.add(redirect.key);
                    return startRedirectNavigation(revalidationRequest, redirect.result, false, {
                        preventScrollReset
                    });
                }
                // Process and commit output from loaders
                let { loaderData, errors } = processLoaderData(state, matches, loaderResults, void 0, revalidatingFetchers, fetcherResults, activeDeferreds);
                // Since we let revalidations complete even if the submitting fetcher was
                // deleted, only put it back to idle if it hasn't been deleted
                if (state.fetchers.has(key)) {
                    let doneFetcher = getDoneFetcher(actionResult.data);
                    state.fetchers.set(key, doneFetcher);
                }
                abortStaleFetchLoads(loadId);
                // If we are currently in a navigation loading state and this fetcher is
                // more recent than the navigation, we want the newer data so abort the
                // navigation and complete it with the fetcher data
                if ("loading" === state.navigation.state && loadId > pendingNavigationLoadId) {
                    invariant(pendingAction, "Expected pending action");
                    pendingNavigationController && pendingNavigationController.abort();
                    completeNavigation(state.navigation.location, {
                        matches,
                        loaderData,
                        errors,
                        fetchers: new Map(state.fetchers)
                    });
                } else {
                    // otherwise just update with the fetcher data, preserving any existing
                    // loaderData for loaders that did not need to reload.  We have to
                    // manually merge here since we aren't going through completeNavigation
                    updateState({
                        errors,
                        loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors),
                        fetchers: new Map(state.fetchers)
                    });
                    isRevalidationRequired = false;
                }
            }
            // Call the matched loader for fetcher.load(), handling redirects, errors, etc.
            async function handleFetcherLoader(key, routeId, path, match, matches, isFogOfWar, flushSync, preventScrollReset, submission) {
                let existingFetcher = state.fetchers.get(key);
                updateFetcherState(key, getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : void 0), {
                    flushSync
                });
                let abortController = new AbortController();
                let fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
                if (isFogOfWar) {
                    let discoverResult = await discoverRoutes(matches, path, fetchRequest.signal);
                    if ("aborted" === discoverResult.type) return;
                    if ("error" === discoverResult.type) {
                        setFetcherError(key, routeId, discoverResult.error, {
                            flushSync
                        });
                        return;
                    } else if (discoverResult.matches) {
                        matches = discoverResult.matches;
                        match = getTargetMatch(matches, path);
                    } else {
                        setFetcherError(key, routeId, getInternalRouterError(404, {
                            pathname: path
                        }), {
                            flushSync
                        });
                        return;
                    }
                }
                // Call the loader for this fetcher route match
                fetchControllers.set(key, abortController);
                let originatingLoadId = incrementingLoadId;
                let results = await callDataStrategy("loader", state, fetchRequest, [
                    match
                ], matches, key);
                let result = results[match.route.id];
                // Deferred isn't supported for fetcher loads, await everything and treat it
                // as a normal load.  resolveDeferredData will return undefined if this
                // fetcher gets aborted, so we just leave result untouched and short circuit
                // below if that happens
                if (isDeferredResult(result)) result = await resolveDeferredData(result, fetchRequest.signal, true) || result;
                // We can delete this so long as we weren't aborted by our our own fetcher
                // re-load which would have put _new_ controller is in fetchControllers
                if (fetchControllers.get(key) === abortController) fetchControllers.delete(key);
                if (fetchRequest.signal.aborted) return;
                // We don't want errors bubbling up or redirects followed for unmounted
                // fetchers, so short circuit here if it was removed from the UI
                if (deletedFetchers.has(key)) {
                    updateFetcherState(key, getDoneFetcher(void 0));
                    return;
                }
                // If the loader threw a redirect Response, start a new REPLACE navigation
                if (isRedirectResult(result)) {
                    if (pendingNavigationLoadId > originatingLoadId) {
                        // A new navigation was kicked off after our loader started, so that
                        // should take precedence over this redirect navigation
                        updateFetcherState(key, getDoneFetcher(void 0));
                        return;
                    }
                    fetchRedirectIds.add(key);
                    await startRedirectNavigation(fetchRequest, result, false, {
                        preventScrollReset
                    });
                    return;
                }
                // Process any non-redirect errors thrown
                if (isErrorResult(result)) {
                    setFetcherError(key, routeId, result.error);
                    return;
                }
                invariant(!isDeferredResult(result), "Unhandled fetcher deferred data");
                // Put the fetcher back into an idle state
                updateFetcherState(key, getDoneFetcher(result.data));
            }
            /**
   * Utility function to handle redirects returned from an action or loader.
   * Normally, a redirect "replaces" the navigation that triggered it.  So, for
   * example:
   *
   *  - user is on /a
   *  - user clicks a link to /b
   *  - loader for /b redirects to /c
   *
   * In a non-JS app the browser would track the in-flight navigation to /b and
   * then replace it with /c when it encountered the redirect response.  In
   * the end it would only ever update the URL bar with /c.
   *
   * In client-side routing using pushState/replaceState, we aim to emulate
   * this behavior and we also do not update history until the end of the
   * navigation (including processed redirects).  This means that we never
   * actually touch history until we've processed redirects, so we just use
   * the history action from the original navigation (PUSH or REPLACE).
   */ async function startRedirectNavigation(request, redirect, isNavigation, _temp2) {
                let { submission, fetcherSubmission, preventScrollReset, replace } = void 0 === _temp2 ? {} : _temp2;
                if (redirect.response.headers.has("X-Remix-Revalidate")) isRevalidationRequired = true;
                let location = redirect.response.headers.get("Location");
                invariant(location, "Expected a Location header on the redirect Response");
                location = normalizeRedirectLocation(location, new URL(request.url), basename);
                let redirectLocation = createLocation(state.location, location, {
                    _isRedirect: true
                });
                if (isBrowser) {
                    let isDocumentReload = false;
                    if (redirect.response.headers.has("X-Remix-Reload-Document")) // Hard reload if the response contained X-Remix-Reload-Document
                    isDocumentReload = true;
                    else if (ABSOLUTE_URL_REGEX.test(location)) {
                        const url = init.history.createURL(location);
                        isDocumentReload = // Hard reload if it's an absolute URL to a new origin
                        url.origin !== routerWindow.location.origin || // Hard reload if it's an absolute URL that does not match our basename
                        null == stripBasename(url.pathname, basename);
                    }
                    if (isDocumentReload) {
                        if (replace) routerWindow.location.replace(location);
                        else routerWindow.location.assign(location);
                        return;
                    }
                }
                // There's no need to abort on redirects, since we don't detect the
                // redirect until the action/loaders have settled
                pendingNavigationController = null;
                let redirectHistoryAction = true === replace || redirect.response.headers.has("X-Remix-Replace") ? router_Action.Replace : router_Action.Push;
                // Use the incoming submission if provided, fallback on the active one in
                // state.navigation
                let { formMethod, formAction, formEncType } = state.navigation;
                if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) submission = getSubmissionFromNavigation(state.navigation);
                // If this was a 307/308 submission we want to preserve the HTTP method and
                // re-submit the GET/POST/PUT/PATCH/DELETE as a submission navigation to the
                // redirected location
                let activeSubmission = submission || fetcherSubmission;
                if (redirectPreserveMethodStatusCodes.has(redirect.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) await startNavigation(redirectHistoryAction, redirectLocation, {
                    submission: _extends({}, activeSubmission, {
                        formAction: location
                    }),
                    // Preserve these flags across redirects
                    preventScrollReset: preventScrollReset || pendingPreventScrollReset,
                    enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
                });
                else {
                    // If we have a navigation submission, we will preserve it through the
                    // redirect navigation
                    let overrideNavigation = getLoadingNavigation(redirectLocation, submission);
                    await startNavigation(redirectHistoryAction, redirectLocation, {
                        overrideNavigation,
                        // Send fetcher submissions through for shouldRevalidate
                        fetcherSubmission,
                        // Preserve these flags across redirects
                        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
                        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
                    });
                }
            }
            // Utility wrapper for calling dataStrategy client-side without having to
            // pass around the manifest, mapRouteProperties, etc.
            async function callDataStrategy(type, state, request, matchesToLoad, matches, fetcherKey) {
                let results;
                let dataResults = {};
                try {
                    results = await callDataStrategyImpl(dataStrategyImpl, type, state, request, matchesToLoad, matches, fetcherKey, manifest, mapRouteProperties);
                } catch (e) {
                    // If the outer dataStrategy method throws, just return the error for all
                    // matches - and it'll naturally bubble to the root
                    matchesToLoad.forEach((m)=>{
                        dataResults[m.route.id] = {
                            type: router_ResultType.error,
                            error: e
                        };
                    });
                    return dataResults;
                }
                for (let [routeId, result] of Object.entries(results))if (isRedirectDataStrategyResultResult(result)) {
                    let response = result.result;
                    dataResults[routeId] = {
                        type: router_ResultType.redirect,
                        response: normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename, future.v7_relativeSplatPath)
                    };
                } else dataResults[routeId] = await convertDataStrategyResultToDataResult(result);
                return dataResults;
            }
            async function callLoadersAndMaybeResolveData(state, matches, matchesToLoad, fetchersToLoad, request) {
                let currentMatches = state.matches;
                // Kick off loaders and fetchers in parallel
                let loaderResultsPromise = callDataStrategy("loader", state, request, matchesToLoad, matches, null);
                let fetcherResultsPromise = Promise.all(fetchersToLoad.map(async (f)=>{
                    if (!f.matches || !f.match || !f.controller) return Promise.resolve({
                        [f.key]: {
                            type: router_ResultType.error,
                            error: getInternalRouterError(404, {
                                pathname: f.path
                            })
                        }
                    });
                    {
                        let results = await callDataStrategy("loader", state, createClientSideRequest(init.history, f.path, f.controller.signal), [
                            f.match
                        ], f.matches, f.key);
                        let result = results[f.match.route.id];
                        // Fetcher results are keyed by fetcher key from here on out, not routeId
                        return {
                            [f.key]: result
                        };
                    }
                }));
                let loaderResults = await loaderResultsPromise;
                let fetcherResults = (await fetcherResultsPromise).reduce((acc, r)=>Object.assign(acc, r), {});
                await Promise.all([
                    resolveNavigationDeferredResults(matches, loaderResults, request.signal, currentMatches, state.loaderData),
                    resolveFetcherDeferredResults(matches, fetcherResults, fetchersToLoad)
                ]);
                return {
                    loaderResults,
                    fetcherResults
                };
            }
            function interruptActiveLoads() {
                // Every interruption triggers a revalidation
                isRevalidationRequired = true;
                // Cancel pending route-level deferreds and mark cancelled routes for
                // revalidation
                cancelledDeferredRoutes.push(...cancelActiveDeferreds());
                // Abort in-flight fetcher loads
                fetchLoadMatches.forEach((_, key)=>{
                    if (fetchControllers.has(key)) cancelledFetcherLoads.add(key);
                    abortFetcher(key);
                });
            }
            function updateFetcherState(key, fetcher, opts) {
                if (void 0 === opts) opts = {};
                state.fetchers.set(key, fetcher);
                updateState({
                    fetchers: new Map(state.fetchers)
                }, {
                    flushSync: true === (opts && opts.flushSync)
                });
            }
            function setFetcherError(key, routeId, error, opts) {
                if (void 0 === opts) opts = {};
                let boundaryMatch = findNearestBoundary(state.matches, routeId);
                deleteFetcher(key);
                updateState({
                    errors: {
                        [boundaryMatch.route.id]: error
                    },
                    fetchers: new Map(state.fetchers)
                }, {
                    flushSync: true === (opts && opts.flushSync)
                });
            }
            function getFetcher(key) {
                if (future.v7_fetcherPersist) {
                    activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
                    // If this fetcher was previously marked for deletion, unmark it since we
                    // have a new instance
                    if (deletedFetchers.has(key)) deletedFetchers.delete(key);
                }
                return state.fetchers.get(key) || IDLE_FETCHER;
            }
            function deleteFetcher(key) {
                let fetcher = state.fetchers.get(key);
                // Don't abort the controller if this is a deletion of a fetcher.submit()
                // in it's loading phase since - we don't want to abort the corresponding
                // revalidation and want them to complete and land
                if (fetchControllers.has(key) && !(fetcher && "loading" === fetcher.state && fetchReloadIds.has(key))) abortFetcher(key);
                fetchLoadMatches.delete(key);
                fetchReloadIds.delete(key);
                fetchRedirectIds.delete(key);
                deletedFetchers.delete(key);
                cancelledFetcherLoads.delete(key);
                state.fetchers.delete(key);
            }
            function deleteFetcherAndUpdateState(key) {
                if (future.v7_fetcherPersist) {
                    let count = (activeFetchers.get(key) || 0) - 1;
                    if (count <= 0) {
                        activeFetchers.delete(key);
                        deletedFetchers.add(key);
                    } else activeFetchers.set(key, count);
                } else deleteFetcher(key);
                updateState({
                    fetchers: new Map(state.fetchers)
                });
            }
            function abortFetcher(key) {
                let controller = fetchControllers.get(key);
                if (controller) {
                    controller.abort();
                    fetchControllers.delete(key);
                }
            }
            function markFetchersDone(keys) {
                for (let key of keys){
                    let fetcher = getFetcher(key);
                    let doneFetcher = getDoneFetcher(fetcher.data);
                    state.fetchers.set(key, doneFetcher);
                }
            }
            function markFetchRedirectsDone() {
                let doneKeys = [];
                let updatedFetchers = false;
                for (let key of fetchRedirectIds){
                    let fetcher = state.fetchers.get(key);
                    invariant(fetcher, "Expected fetcher: " + key);
                    if ("loading" === fetcher.state) {
                        fetchRedirectIds.delete(key);
                        doneKeys.push(key);
                        updatedFetchers = true;
                    }
                }
                markFetchersDone(doneKeys);
                return updatedFetchers;
            }
            function abortStaleFetchLoads(landedId) {
                let yeetedKeys = [];
                for (let [key, id] of fetchReloadIds)if (id < landedId) {
                    let fetcher = state.fetchers.get(key);
                    invariant(fetcher, "Expected fetcher: " + key);
                    if ("loading" === fetcher.state) {
                        abortFetcher(key);
                        fetchReloadIds.delete(key);
                        yeetedKeys.push(key);
                    }
                }
                markFetchersDone(yeetedKeys);
                return yeetedKeys.length > 0;
            }
            function getBlocker(key, fn) {
                let blocker = state.blockers.get(key) || IDLE_BLOCKER;
                if (blockerFunctions.get(key) !== fn) blockerFunctions.set(key, fn);
                return blocker;
            }
            function deleteBlocker(key) {
                state.blockers.delete(key);
                blockerFunctions.delete(key);
            }
            // Utility function to update blockers, ensuring valid state transitions
            function updateBlocker(key, newBlocker) {
                let blocker = state.blockers.get(key) || IDLE_BLOCKER;
                // Poor mans state machine :)
                // https://mermaid.live/edit#pako:eNqVkc9OwzAMxl8l8nnjAYrEtDIOHEBIgwvKJTReGy3_lDpIqO27k6awMG0XcrLlnz87nwdonESogKXXBuE79rq75XZO3-yHds0RJVuv70YrPlUrCEe2HfrORS3rubqZfuhtpg5C9wk5tZ4VKcRUq88q9Z8RS0-48cE1iHJkL0ugbHuFLus9L6spZy8nX9MP2CNdomVaposqu3fGayT8T8-jJQwhepo_UtpgBQaDEUom04dZhAN1aJBDlUKJBxE1ceB2Smj0Mln-IBW5AFU2dwUiktt_2Qaq2dBfaKdEup85UV7Yd-dKjlnkabl2Pvr0DTkTreM
                invariant("unblocked" === blocker.state && "blocked" === newBlocker.state || "blocked" === blocker.state && "blocked" === newBlocker.state || "blocked" === blocker.state && "proceeding" === newBlocker.state || "blocked" === blocker.state && "unblocked" === newBlocker.state || "proceeding" === blocker.state && "unblocked" === newBlocker.state, "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
                let blockers = new Map(state.blockers);
                blockers.set(key, newBlocker);
                updateState({
                    blockers
                });
            }
            function shouldBlockNavigation(_ref2) {
                let { currentLocation, nextLocation, historyAction } = _ref2;
                if (0 === blockerFunctions.size) return;
                // We ony support a single active blocker at the moment since we don't have
                // any compelling use cases for multi-blocker yet
                if (blockerFunctions.size > 1) warning(false, "A router only supports one blocker at a time");
                let entries = Array.from(blockerFunctions.entries());
                let [blockerKey, blockerFunction] = entries[entries.length - 1];
                let blocker = state.blockers.get(blockerKey);
                if (blocker && "proceeding" === blocker.state) // If the blocker is currently proceeding, we don't need to re-check
                // it and can let this navigation continue
                return;
                // At this point, we know we're unblocked/blocked so we need to check the
                // user-provided blocker function
                if (blockerFunction({
                    currentLocation,
                    nextLocation,
                    historyAction
                })) return blockerKey;
            }
            function handleNavigational404(pathname) {
                let error = getInternalRouterError(404, {
                    pathname
                });
                let routesToUse = inFlightDataRoutes || dataRoutes;
                let { matches, route } = getShortCircuitMatches(routesToUse);
                // Cancel all pending deferred on 404s since we don't keep any routes
                cancelActiveDeferreds();
                return {
                    notFoundMatches: matches,
                    route,
                    error
                };
            }
            function cancelActiveDeferreds(predicate) {
                let cancelledRouteIds = [];
                activeDeferreds.forEach((dfd, routeId)=>{
                    if (!predicate || predicate(routeId)) {
                        // Cancel the deferred - but do not remove from activeDeferreds here -
                        // we rely on the subscribers to do that so our tests can assert proper
                        // cleanup via _internalActiveDeferreds
                        dfd.cancel();
                        cancelledRouteIds.push(routeId);
                        activeDeferreds.delete(routeId);
                    }
                });
                return cancelledRouteIds;
            }
            // Opt in to capturing and reporting scroll positions during navigations,
            // used by the <ScrollRestoration> component
            function enableScrollRestoration(positions, getPosition, getKey) {
                savedScrollPositions = positions;
                getScrollPosition = getPosition;
                getScrollRestorationKey = getKey || null;
                // Perform initial hydration scroll restoration, since we miss the boat on
                // the initial updateState() because we've not yet rendered <ScrollRestoration/>
                // and therefore have no savedScrollPositions available
                if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
                    initialScrollRestored = true;
                    let y = getSavedScrollPosition(state.location, state.matches);
                    if (null != y) updateState({
                        restoreScrollPosition: y
                    });
                }
                return ()=>{
                    savedScrollPositions = null;
                    getScrollPosition = null;
                    getScrollRestorationKey = null;
                };
            }
            function getScrollKey(location, matches) {
                if (getScrollRestorationKey) {
                    let key = getScrollRestorationKey(location, matches.map((m)=>convertRouteMatchToUiMatch(m, state.loaderData)));
                    return key || location.key;
                }
                return location.key;
            }
            function saveScrollPosition(location, matches) {
                if (savedScrollPositions && getScrollPosition) {
                    let key = getScrollKey(location, matches);
                    savedScrollPositions[key] = getScrollPosition();
                }
            }
            function getSavedScrollPosition(location, matches) {
                if (savedScrollPositions) {
                    let key = getScrollKey(location, matches);
                    let y = savedScrollPositions[key];
                    if ("number" == typeof y) return y;
                }
                return null;
            }
            function checkFogOfWar(matches, routesToUse, pathname) {
                if (patchRoutesOnNavigationImpl) {
                    if (matches) {
                        if (Object.keys(matches[0].params).length > 0) {
                            // If we matched a dynamic param or a splat, it might only be because
                            // we haven't yet discovered other routes that would match with a
                            // higher score.  Call patchRoutesOnNavigation just to be sure
                            let partialMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
                            return {
                                active: true,
                                matches: partialMatches
                            };
                        }
                    } else {
                        let fogMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
                        return {
                            active: true,
                            matches: fogMatches || []
                        };
                    }
                }
                return {
                    active: false,
                    matches: null
                };
            }
            async function discoverRoutes(matches, pathname, signal) {
                if (!patchRoutesOnNavigationImpl) return {
                    type: "success",
                    matches
                };
                let partialMatches = matches;
                while(true){
                    let isNonHMR = null == inFlightDataRoutes;
                    let routesToUse = inFlightDataRoutes || dataRoutes;
                    let localManifest = manifest;
                    try {
                        await patchRoutesOnNavigationImpl({
                            path: pathname,
                            matches: partialMatches,
                            patch: (routeId, children)=>{
                                if (signal.aborted) return;
                                patchRoutesImpl(routeId, children, routesToUse, localManifest, mapRouteProperties);
                            }
                        });
                    } catch (e) {
                        return {
                            type: "error",
                            error: e,
                            partialMatches
                        };
                    } finally{
                        // If we are not in the middle of an HMR revalidation and we changed the
                        // routes, provide a new identity so when we `updateState` at the end of
                        // this navigation/fetch `router.routes` will be a new identity and
                        // trigger a re-run of memoized `router.routes` dependencies.
                        // HMR will already update the identity and reflow when it lands
                        // `inFlightDataRoutes` in `completeNavigation`
                        if (isNonHMR && !signal.aborted) dataRoutes = [
                            ...dataRoutes
                        ];
                    }
                    if (signal.aborted) return {
                        type: "aborted"
                    };
                    let newMatches = matchRoutes(routesToUse, pathname, basename);
                    if (newMatches) return {
                        type: "success",
                        matches: newMatches
                    };
                    let newPartialMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
                    // Avoid loops if the second pass results in the same partial matches
                    if (!newPartialMatches || partialMatches.length === newPartialMatches.length && partialMatches.every((m, i)=>m.route.id === newPartialMatches[i].route.id)) return {
                        type: "success",
                        matches: null
                    };
                    partialMatches = newPartialMatches;
                }
            }
            function _internalSetRoutes(newRoutes) {
                manifest = {};
                inFlightDataRoutes = convertRoutesToDataRoutes(newRoutes, mapRouteProperties, void 0, manifest);
            }
            function patchRoutes(routeId, children) {
                let isNonHMR = null == inFlightDataRoutes;
                let routesToUse = inFlightDataRoutes || dataRoutes;
                patchRoutesImpl(routeId, children, routesToUse, manifest, mapRouteProperties);
                // If we are not in the middle of an HMR revalidation and we changed the
                // routes, provide a new identity and trigger a reflow via `updateState`
                // to re-run memoized `router.routes` dependencies.
                // HMR will already update the identity and reflow when it lands
                // `inFlightDataRoutes` in `completeNavigation`
                if (isNonHMR) {
                    dataRoutes = [
                        ...dataRoutes
                    ];
                    updateState({});
                }
            }
            router = {
                get basename () {
                    return basename;
                },
                get future () {
                    return future;
                },
                get state () {
                    return state;
                },
                get routes () {
                    return dataRoutes;
                },
                get window () {
                    return routerWindow;
                },
                initialize,
                subscribe,
                enableScrollRestoration,
                navigate,
                fetch: fetch1,
                revalidate,
                // Passthrough to history-aware createHref used by useHref so we get proper
                // hash-aware URLs in DOM paths
                createHref: (to)=>init.history.createHref(to),
                encodeLocation: (to)=>init.history.encodeLocation(to),
                getFetcher,
                deleteFetcher: deleteFetcherAndUpdateState,
                dispose,
                getBlocker,
                deleteBlocker,
                patchRoutes,
                _internalFetchControllers: fetchControllers,
                _internalActiveDeferreds: activeDeferreds,
                // TODO: Remove setRoutes, it's temporary to avoid dealing with
                // updating the tree while validating the update algorithm.
                _internalSetRoutes
            };
            return router;
        }
        //#endregion
        ////////////////////////////////////////////////////////////////////////////////
        //#region createStaticHandler
        ////////////////////////////////////////////////////////////////////////////////
        const UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");
        function createStaticHandler(routes, opts) {
            invariant(routes.length > 0, "You must provide a non-empty routes array to createStaticHandler");
            let manifest = {};
            let basename = (opts ? opts.basename : null) || "/";
            let mapRouteProperties;
            if (null != opts && opts.mapRouteProperties) mapRouteProperties = opts.mapRouteProperties;
            else if (null != opts && opts.detectErrorBoundary) {
                // If they are still using the deprecated version, wrap it with the new API
                let detectErrorBoundary = opts.detectErrorBoundary;
                mapRouteProperties = (route)=>({
                        hasErrorBoundary: detectErrorBoundary(route)
                    });
            } else mapRouteProperties = defaultMapRouteProperties;
            // Config driven behavior flags
            let future = _extends({
                v7_relativeSplatPath: false,
                v7_throwAbortReason: false
            }, opts ? opts.future : null);
            let dataRoutes = convertRoutesToDataRoutes(routes, mapRouteProperties, void 0, manifest);
            /**
   * The query() method is intended for document requests, in which we want to
   * call an optional action and potentially multiple loaders for all nested
   * routes.  It returns a StaticHandlerContext object, which is very similar
   * to the router state (location, loaderData, actionData, errors, etc.) and
   * also adds SSR-specific information such as the statusCode and headers
   * from action/loaders Responses.
   *
   * It _should_ never throw and should report all errors through the
   * returned context.errors object, properly associating errors to their error
   * boundary.  Additionally, it tracks _deepestRenderedBoundaryId which can be
   * used to emulate React error boundaries during SSr by performing a second
   * pass only down to the boundaryId.
   *
   * The one exception where we do not return a StaticHandlerContext is when a
   * redirect response is returned or thrown from any action/loader.  We
   * propagate that out and return the raw Response so the HTTP server can
   * return it directly.
   *
   * - `opts.requestContext` is an optional server context that will be passed
   *   to actions/loaders in the `context` parameter
   * - `opts.skipLoaderErrorBubbling` is an optional parameter that will prevent
   *   the bubbling of errors which allows single-fetch-type implementations
   *   where the client will handle the bubbling and we may need to return data
   *   for the handling route
   */ async function query(request, _temp3) {
                let { requestContext, skipLoaderErrorBubbling, dataStrategy } = void 0 === _temp3 ? {} : _temp3;
                let url = new URL(request.url);
                let method = request.method;
                let location = createLocation("", createPath(url), null, "default");
                let matches = matchRoutes(dataRoutes, location, basename);
                // SSR supports HEAD requests while SPA doesn't
                if (isValidMethod(method) || "HEAD" === method) {
                    if (!matches) {
                        let error = getInternalRouterError(404, {
                            pathname: location.pathname
                        });
                        let { matches: notFoundMatches, route } = getShortCircuitMatches(dataRoutes);
                        return {
                            basename,
                            location,
                            matches: notFoundMatches,
                            loaderData: {},
                            actionData: null,
                            errors: {
                                [route.id]: error
                            },
                            statusCode: error.status,
                            loaderHeaders: {},
                            actionHeaders: {},
                            activeDeferreds: null
                        };
                    }
                } else {
                    let error = getInternalRouterError(405, {
                        method
                    });
                    let { matches: methodNotAllowedMatches, route } = getShortCircuitMatches(dataRoutes);
                    return {
                        basename,
                        location,
                        matches: methodNotAllowedMatches,
                        loaderData: {},
                        actionData: null,
                        errors: {
                            [route.id]: error
                        },
                        statusCode: error.status,
                        loaderHeaders: {},
                        actionHeaders: {},
                        activeDeferreds: null
                    };
                }
                let result = await queryImpl(request, location, matches, requestContext, dataStrategy || null, true === skipLoaderErrorBubbling, null);
                if (isResponse(result)) return result;
                // When returning StaticHandlerContext, we patch back in the location here
                // since we need it for React Context.  But this helps keep our submit and
                // loadRouteData operating on a Request instead of a Location
                return _extends({
                    location,
                    basename
                }, result);
            }
            /**
   * The queryRoute() method is intended for targeted route requests, either
   * for fetch ?_data requests or resource route requests.  In this case, we
   * are only ever calling a single action or loader, and we are returning the
   * returned value directly.  In most cases, this will be a Response returned
   * from the action/loader, but it may be a primitive or other value as well -
   * and in such cases the calling context should handle that accordingly.
   *
   * We do respect the throw/return differentiation, so if an action/loader
   * throws, then this method will throw the value.  This is important so we
   * can do proper boundary identification in Remix where a thrown Response
   * must go to the Catch Boundary but a returned Response is happy-path.
   *
   * One thing to note is that any Router-initiated Errors that make sense
   * to associate with a status code will be thrown as an ErrorResponse
   * instance which include the raw Error, such that the calling context can
   * serialize the error as they see fit while including the proper response
   * code.  Examples here are 404 and 405 errors that occur prior to reaching
   * any user-defined loaders.
   *
   * - `opts.routeId` allows you to specify the specific route handler to call.
   *   If not provided the handler will determine the proper route by matching
   *   against `request.url`
   * - `opts.requestContext` is an optional server context that will be passed
   *    to actions/loaders in the `context` parameter
   */ async function queryRoute(request, _temp4) {
                let { routeId, requestContext, dataStrategy } = void 0 === _temp4 ? {} : _temp4;
                let url = new URL(request.url);
                let method = request.method;
                let location = createLocation("", createPath(url), null, "default");
                let matches = matchRoutes(dataRoutes, location, basename);
                // SSR supports HEAD requests while SPA doesn't
                if (isValidMethod(method) || "HEAD" === method || "OPTIONS" === method) {
                    if (!matches) throw getInternalRouterError(404, {
                        pathname: location.pathname
                    });
                } else throw getInternalRouterError(405, {
                    method
                });
                let match = routeId ? matches.find((m)=>m.route.id === routeId) : getTargetMatch(matches, location);
                if (routeId && !match) throw getInternalRouterError(403, {
                    pathname: location.pathname,
                    routeId
                });
                if (!match) // This should never hit I don't think?
                throw getInternalRouterError(404, {
                    pathname: location.pathname
                });
                let result = await queryImpl(request, location, matches, requestContext, dataStrategy || null, false, match);
                if (isResponse(result)) return result;
                let error = result.errors ? Object.values(result.errors)[0] : void 0;
                if (void 0 !== error) // If we got back result.errors, that means the loader/action threw
                // _something_ that wasn't a Response, but it's not guaranteed/required
                // to be an `instanceof Error` either, so we have to use throw here to
                // preserve the "error" state outside of queryImpl.
                throw error;
                // Pick off the right state value to return
                if (result.actionData) return Object.values(result.actionData)[0];
                if (result.loaderData) {
                    var _result$activeDeferre;
                    let data = Object.values(result.loaderData)[0];
                    if (null != (_result$activeDeferre = result.activeDeferreds) && _result$activeDeferre[match.route.id]) data[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match.route.id];
                    return data;
                }
            }
            async function queryImpl(request, location, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch) {
                invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
                try {
                    if (isMutationMethod(request.method.toLowerCase())) {
                        let result = await submit(request, matches, routeMatch || getTargetMatch(matches, location), requestContext, dataStrategy, skipLoaderErrorBubbling, null != routeMatch);
                        return result;
                    }
                    let result = await loadRouteData(request, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch);
                    return isResponse(result) ? result : _extends({}, result, {
                        actionData: null,
                        actionHeaders: {}
                    });
                } catch (e) {
                    // If the user threw/returned a Response in callLoaderOrAction for a
                    // `queryRoute` call, we throw the `DataStrategyResult` to bail out early
                    // and then return or throw the raw Response here accordingly
                    if (isDataStrategyResult(e) && isResponse(e.result)) {
                        if (e.type === router_ResultType.error) throw e.result;
                        return e.result;
                    }
                    // Redirects are always returned since they don't propagate to catch
                    // boundaries
                    if (isRedirectResponse(e)) return e;
                    throw e;
                }
            }
            async function submit(request, matches, actionMatch, requestContext, dataStrategy, skipLoaderErrorBubbling, isRouteRequest) {
                let result;
                if (actionMatch.route.action || actionMatch.route.lazy) {
                    let results = await callDataStrategy("action", request, [
                        actionMatch
                    ], matches, isRouteRequest, requestContext, dataStrategy);
                    result = results[actionMatch.route.id];
                    if (request.signal.aborted) throwStaticHandlerAbortedError(request, isRouteRequest, future);
                } else {
                    let error = getInternalRouterError(405, {
                        method: request.method,
                        pathname: new URL(request.url).pathname,
                        routeId: actionMatch.route.id
                    });
                    if (isRouteRequest) throw error;
                    result = {
                        type: router_ResultType.error,
                        error
                    };
                }
                if (isRedirectResult(result)) // Uhhhh - this should never happen, we should always throw these from
                // callLoaderOrAction, but the type narrowing here keeps TS happy and we
                // can get back on the "throw all redirect responses" train here should
                // this ever happen :/
                throw new Response(null, {
                    status: result.response.status,
                    headers: {
                        Location: result.response.headers.get("Location")
                    }
                });
                if (isDeferredResult(result)) {
                    let error = getInternalRouterError(400, {
                        type: "defer-action"
                    });
                    if (isRouteRequest) throw error;
                    result = {
                        type: router_ResultType.error,
                        error
                    };
                }
                if (isRouteRequest) {
                    // Note: This should only be non-Response values if we get here, since
                    // isRouteRequest should throw any Response received in callLoaderOrAction
                    if (isErrorResult(result)) throw result.error;
                    return {
                        matches: [
                            actionMatch
                        ],
                        loaderData: {},
                        actionData: {
                            [actionMatch.route.id]: result.data
                        },
                        errors: null,
                        // Note: statusCode + headers are unused here since queryRoute will
                        // return the raw Response or value
                        statusCode: 200,
                        loaderHeaders: {},
                        actionHeaders: {},
                        activeDeferreds: null
                    };
                }
                // Create a GET request for the loaders
                let loaderRequest = new Request(request.url, {
                    headers: request.headers,
                    redirect: request.redirect,
                    signal: request.signal
                });
                if (isErrorResult(result)) {
                    // Store off the pending error - we use it to determine which loaders
                    // to call and will commit it when we complete the navigation
                    let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
                    let context = await loadRouteData(loaderRequest, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, null, [
                        boundaryMatch.route.id,
                        result
                    ]);
                    // action status codes take precedence over loader status codes
                    return _extends({}, context, {
                        statusCode: isRouteErrorResponse(result.error) ? result.error.status : null != result.statusCode ? result.statusCode : 500,
                        actionData: null,
                        actionHeaders: _extends({}, result.headers ? {
                            [actionMatch.route.id]: result.headers
                        } : {})
                    });
                }
                let context = await loadRouteData(loaderRequest, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, null);
                return _extends({}, context, {
                    actionData: {
                        [actionMatch.route.id]: result.data
                    }
                }, result.statusCode ? {
                    statusCode: result.statusCode
                } : {}, {
                    actionHeaders: result.headers ? {
                        [actionMatch.route.id]: result.headers
                    } : {}
                });
            }
            async function loadRouteData(request, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch, pendingActionResult) {
                let isRouteRequest = null != routeMatch;
                // Short circuit if we have no loaders to run (queryRoute())
                if (isRouteRequest && !(null != routeMatch && routeMatch.route.loader) && !(null != routeMatch && routeMatch.route.lazy)) throw getInternalRouterError(400, {
                    method: request.method,
                    pathname: new URL(request.url).pathname,
                    routeId: null == routeMatch ? void 0 : routeMatch.route.id
                });
                let requestMatches = routeMatch ? [
                    routeMatch
                ] : pendingActionResult && isErrorResult(pendingActionResult[1]) ? getLoaderMatchesUntilBoundary(matches, pendingActionResult[0]) : matches;
                let matchesToLoad = requestMatches.filter((m)=>m.route.loader || m.route.lazy);
                // Short circuit if we have no loaders to run (query())
                if (0 === matchesToLoad.length) return {
                    matches,
                    // Add a null for all matched routes for proper revalidation on the client
                    loaderData: matches.reduce((acc, m)=>Object.assign(acc, {
                            [m.route.id]: null
                        }), {}),
                    errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
                        [pendingActionResult[0]]: pendingActionResult[1].error
                    } : null,
                    statusCode: 200,
                    loaderHeaders: {},
                    activeDeferreds: null
                };
                let results = await callDataStrategy("loader", request, matchesToLoad, matches, isRouteRequest, requestContext, dataStrategy);
                if (request.signal.aborted) throwStaticHandlerAbortedError(request, isRouteRequest, future);
                // Process and commit output from loaders
                let activeDeferreds = new Map();
                let context = processRouteLoaderData(matches, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling);
                // Add a null for any non-loader matches for proper revalidation on the client
                let executedLoaders = new Set(matchesToLoad.map((match)=>match.route.id));
                matches.forEach((match)=>{
                    if (!executedLoaders.has(match.route.id)) context.loaderData[match.route.id] = null;
                });
                return _extends({}, context, {
                    matches,
                    activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
                });
            }
            // Utility wrapper for calling dataStrategy server-side without having to
            // pass around the manifest, mapRouteProperties, etc.
            async function callDataStrategy(type, request, matchesToLoad, matches, isRouteRequest, requestContext, dataStrategy) {
                let results = await callDataStrategyImpl(dataStrategy || defaultDataStrategy, type, null, request, matchesToLoad, matches, null, manifest, mapRouteProperties, requestContext);
                let dataResults = {};
                await Promise.all(matches.map(async (match)=>{
                    if (!(match.route.id in results)) return;
                    let result = results[match.route.id];
                    if (isRedirectDataStrategyResultResult(result)) {
                        let response = result.result;
                        // Throw redirects and let the server handle them with an HTTP redirect
                        throw normalizeRelativeRoutingRedirectResponse(response, request, match.route.id, matches, basename, future.v7_relativeSplatPath);
                    }
                    if (isResponse(result.result) && isRouteRequest) // For SSR single-route requests, we want to hand Responses back
                    // directly without unwrapping
                    throw result;
                    dataResults[match.route.id] = await convertDataStrategyResultToDataResult(result);
                }));
                return dataResults;
            }
            return {
                dataRoutes,
                query,
                queryRoute
            };
        }
        //#endregion
        ////////////////////////////////////////////////////////////////////////////////
        //#region Helpers
        ////////////////////////////////////////////////////////////////////////////////
        /**
 * Given an existing StaticHandlerContext and an error thrown at render time,
 * provide an updated StaticHandlerContext suitable for a second SSR render
 */ function getStaticContextFromError(routes, context, error) {
            let newContext = _extends({}, context, {
                statusCode: isRouteErrorResponse(error) ? error.status : 500,
                errors: {
                    [context._deepestRenderedBoundaryId || routes[0].id]: error
                }
            });
            return newContext;
        }
        function throwStaticHandlerAbortedError(request, isRouteRequest, future) {
            if (future.v7_throwAbortReason && void 0 !== request.signal.reason) throw request.signal.reason;
            let method = isRouteRequest ? "queryRoute" : "query";
            throw new Error(method + "() call aborted: " + request.method + " " + request.url);
        }
        function isSubmissionNavigation(opts) {
            return null != opts && ("formData" in opts && null != opts.formData || "body" in opts && void 0 !== opts.body);
        }
        function normalizeTo(location, matches, basename, prependBasename, to, v7_relativeSplatPath, fromRouteId, relative) {
            let contextualMatches;
            let activeRouteMatch;
            if (fromRouteId) {
                // Grab matches up to the calling route so our route-relative logic is
                // relative to the correct source route
                contextualMatches = [];
                for (let match of matches){
                    contextualMatches.push(match);
                    if (match.route.id === fromRouteId) {
                        activeRouteMatch = match;
                        break;
                    }
                }
            } else {
                contextualMatches = matches;
                activeRouteMatch = matches[matches.length - 1];
            }
            // Resolve the relative path
            let path = resolveTo(to ? to : ".", getResolveToMatches(contextualMatches, v7_relativeSplatPath), stripBasename(location.pathname, basename) || location.pathname, "path" === relative);
            // When `to` is not specified we inherit search/hash from the current
            // location, unlike when to="." and we just inherit the path.
            // See https://github.com/remix-run/remix/issues/927
            if (null == to) {
                path.search = location.search;
                path.hash = location.hash;
            }
            // Account for `?index` params when routing to the current location
            if ((null == to || "" === to || "." === to) && activeRouteMatch) {
                let nakedIndex = hasNakedIndexQuery(path.search);
                if (activeRouteMatch.route.index && !nakedIndex) // Add one when we're targeting an index route
                path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
                else if (!activeRouteMatch.route.index && nakedIndex) {
                    // Remove existing ones when we're not
                    let params = new URLSearchParams(path.search);
                    let indexValues = params.getAll("index");
                    params.delete("index");
                    indexValues.filter((v)=>v).forEach((v)=>params.append("index", v));
                    let qs = params.toString();
                    path.search = qs ? "?" + qs : "";
                }
            }
            // If we're operating within a basename, prepend it to the pathname.  If
            // this is a root navigation, then just use the raw basename which allows
            // the basename to have full control over the presence of a trailing slash
            // on root actions
            if (prependBasename && "/" !== basename) path.pathname = "/" === path.pathname ? basename : joinPaths([
                basename,
                path.pathname
            ]);
            return createPath(path);
        }
        // Normalize navigation options by converting formMethod=GET formData objects to
        // URLSearchParams so they behave identically to links with query params
        function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path, opts) {
            // Return location verbatim on non-submission navigations
            if (!opts || !isSubmissionNavigation(opts)) return {
                path
            };
            if (opts.formMethod && !isValidMethod(opts.formMethod)) return {
                path,
                error: getInternalRouterError(405, {
                    method: opts.formMethod
                })
            };
            let getInvalidBodyError = ()=>({
                    path,
                    error: getInternalRouterError(400, {
                        type: "invalid-body"
                    })
                });
            // Create a Submission on non-GET navigations
            let rawFormMethod = opts.formMethod || "get";
            let formMethod = normalizeFormMethod ? rawFormMethod.toUpperCase() : rawFormMethod.toLowerCase();
            let formAction = stripHashFromPath(path);
            if (void 0 !== opts.body) {
                if ("text/plain" === opts.formEncType) {
                    // text only support POST/PUT/PATCH/DELETE submissions
                    if (!isMutationMethod(formMethod)) return getInvalidBodyError();
                    let text = "string" == typeof opts.body ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
                    Array.from(opts.body.entries()).reduce((acc, _ref3)=>{
                        let [name1, value] = _ref3;
                        return "" + acc + name1 + "=" + value + "\n";
                    }, "") : String(opts.body);
                    return {
                        path,
                        submission: {
                            formMethod,
                            formAction,
                            formEncType: opts.formEncType,
                            formData: void 0,
                            json: void 0,
                            text
                        }
                    };
                }
                if ("application/json" === opts.formEncType) {
                    // json only supports POST/PUT/PATCH/DELETE submissions
                    if (!isMutationMethod(formMethod)) return getInvalidBodyError();
                    try {
                        let json = "string" == typeof opts.body ? JSON.parse(opts.body) : opts.body;
                        return {
                            path,
                            submission: {
                                formMethod,
                                formAction,
                                formEncType: opts.formEncType,
                                formData: void 0,
                                json,
                                text: void 0
                            }
                        };
                    } catch (e) {
                        return getInvalidBodyError();
                    }
                }
            }
            invariant("function" == typeof FormData, "FormData is not available in this environment");
            let searchParams;
            let formData;
            if (opts.formData) {
                searchParams = convertFormDataToSearchParams(opts.formData);
                formData = opts.formData;
            } else if (opts.body instanceof FormData) {
                searchParams = convertFormDataToSearchParams(opts.body);
                formData = opts.body;
            } else if (opts.body instanceof URLSearchParams) {
                searchParams = opts.body;
                formData = convertSearchParamsToFormData(searchParams);
            } else if (null == opts.body) {
                searchParams = new URLSearchParams();
                formData = new FormData();
            } else try {
                searchParams = new URLSearchParams(opts.body);
                formData = convertSearchParamsToFormData(searchParams);
            } catch (e) {
                return getInvalidBodyError();
            }
            let submission = {
                formMethod,
                formAction,
                formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
                formData,
                json: void 0,
                text: void 0
            };
            if (isMutationMethod(submission.formMethod)) return {
                path,
                submission
            };
            // Flatten submission onto URLSearchParams for GET submissions
            let parsedPath = parsePath(path);
            // On GET navigation submissions we can drop the ?index param from the
            // resulting location since all loaders will run.  But fetcher GET submissions
            // only run a single loader so we need to preserve any incoming ?index params
            if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) searchParams.append("index", "");
            parsedPath.search = "?" + searchParams;
            return {
                path: createPath(parsedPath),
                submission
            };
        }
        // Filter out all routes at/below any caught error as they aren't going to
        // render so we don't need to load them
        function getLoaderMatchesUntilBoundary(matches, boundaryId, includeBoundary) {
            if (void 0 === includeBoundary) includeBoundary = false;
            let index = matches.findIndex((m)=>m.route.id === boundaryId);
            if (index >= 0) return matches.slice(0, includeBoundary ? index + 1 : index);
            return matches;
        }
        function getMatchesToLoad(history, state, matches, submission, location, initialHydration, skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult) {
            let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : void 0;
            let currentUrl = history.createURL(state.location);
            let nextUrl = history.createURL(location);
            // Pick navigation matches that are net-new or qualify for revalidation
            let boundaryMatches = matches;
            if (initialHydration && state.errors) // On initial hydration, only consider matches up to _and including_ the boundary.
            // This is inclusive to handle cases where a server loader ran successfully,
            // a child server loader bubbled up to this route, but this route has
            // `clientLoader.hydrate` so we want to still run the `clientLoader` so that
            // we have a complete version of `loaderData`
            boundaryMatches = getLoaderMatchesUntilBoundary(matches, Object.keys(state.errors)[0], true);
            else if (pendingActionResult && isErrorResult(pendingActionResult[1])) // If an action threw an error, we call loaders up to, but not including the
            // boundary
            boundaryMatches = getLoaderMatchesUntilBoundary(matches, pendingActionResult[0]);
            // Don't revalidate loaders by default after action 4xx/5xx responses
            // when the flag is enabled.  They can still opt-into revalidation via
            // `shouldRevalidate` via `actionResult`
            let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : void 0;
            let shouldSkipRevalidation = skipActionErrorRevalidation && actionStatus && actionStatus >= 400;
            let navigationMatches = boundaryMatches.filter((match, index)=>{
                let { route } = match;
                if (route.lazy) // We haven't loaded this route yet so we don't know if it's got a loader!
                return true;
                if (null == route.loader) return false;
                if (initialHydration) return shouldLoadRouteOnHydration(route, state.loaderData, state.errors);
                // Always call the loader on new route instances and pending defer cancellations
                if (isNewLoader(state.loaderData, state.matches[index], match) || cancelledDeferredRoutes.some((id)=>id === match.route.id)) return true;
                // This is the default implementation for when we revalidate.  If the route
                // provides it's own implementation, then we give them full control but
                // provide this value so they can leverage it if needed after they check
                // their own specific use cases
                let currentRouteMatch = state.matches[index];
                let nextRouteMatch = match;
                return shouldRevalidateLoader(match, _extends({
                    currentUrl,
                    currentParams: currentRouteMatch.params,
                    nextUrl,
                    nextParams: nextRouteMatch.params
                }, submission, {
                    actionResult,
                    actionStatus,
                    defaultShouldRevalidate: !shouldSkipRevalidation && // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
                    (isRevalidationRequired || currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || // Search params affect all loaders
                    currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch))
                }));
            });
            // Pick fetcher.loads that need to be revalidated
            let revalidatingFetchers = [];
            fetchLoadMatches.forEach((f, key)=>{
                // Don't revalidate:
                //  - on initial hydration (shouldn't be any fetchers then anyway)
                //  - if fetcher won't be present in the subsequent render
                //    - no longer matches the URL (v7_fetcherPersist=false)
                //    - was unmounted but persisted due to v7_fetcherPersist=true
                if (initialHydration || !matches.some((m)=>m.route.id === f.routeId) || deletedFetchers.has(key)) return;
                let fetcherMatches = matchRoutes(routesToUse, f.path, basename);
                // If the fetcher path no longer matches, push it in with null matches so
                // we can trigger a 404 in callLoadersAndMaybeResolveData.  Note this is
                // currently only a use-case for Remix HMR where the route tree can change
                // at runtime and remove a route previously loaded via a fetcher
                if (!fetcherMatches) {
                    revalidatingFetchers.push({
                        key,
                        routeId: f.routeId,
                        path: f.path,
                        matches: null,
                        match: null,
                        controller: null
                    });
                    return;
                }
                // Revalidating fetchers are decoupled from the route matches since they
                // load from a static href.  They revalidate based on explicit revalidation
                // (submission, useRevalidator, or X-Remix-Revalidate)
                let fetcher = state.fetchers.get(key);
                let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
                let shouldRevalidate = false;
                if (fetchRedirectIds.has(key)) // Never trigger a revalidation of an actively redirecting fetcher
                shouldRevalidate = false;
                else if (cancelledFetcherLoads.has(key)) {
                    // Always mark for revalidation if the fetcher was cancelled
                    cancelledFetcherLoads.delete(key);
                    shouldRevalidate = true;
                } else // If the fetcher hasn't ever completed loading yet, then this isn't a
                // revalidation, it would just be a brand new load if an explicit
                // revalidation is required
                shouldRevalidate = fetcher && "idle" !== fetcher.state && void 0 === fetcher.data ? isRevalidationRequired : shouldRevalidateLoader(fetcherMatch, _extends({
                    currentUrl,
                    currentParams: state.matches[state.matches.length - 1].params,
                    nextUrl,
                    nextParams: matches[matches.length - 1].params
                }, submission, {
                    actionResult,
                    actionStatus,
                    defaultShouldRevalidate: !shouldSkipRevalidation && isRevalidationRequired
                }));
                if (shouldRevalidate) revalidatingFetchers.push({
                    key,
                    routeId: f.routeId,
                    path: f.path,
                    matches: fetcherMatches,
                    match: fetcherMatch,
                    controller: new AbortController()
                });
            });
            return [
                navigationMatches,
                revalidatingFetchers
            ];
        }
        function shouldLoadRouteOnHydration(route, loaderData, errors) {
            // We dunno if we have a loader - gotta find out!
            if (route.lazy) return true;
            // No loader, nothing to initialize
            if (!route.loader) return false;
            let hasData = null != loaderData && void 0 !== loaderData[route.id];
            let hasError = null != errors && void 0 !== errors[route.id];
            // Don't run if we error'd during SSR
            if (!hasData && hasError) return false;
            // Explicitly opting-in to running on hydration
            if ("function" == typeof route.loader && true === route.loader.hydrate) return true;
            // Otherwise, run if we're not yet initialized with anything
            return !hasData && !hasError;
        }
        function isNewLoader(currentLoaderData, currentMatch, match) {
            let isNew = // [a] -> [a, b]
            !currentMatch || // [a, b] -> [a, c]
            match.route.id !== currentMatch.route.id;
            // Handle the case that we don't have data for a re-used route, potentially
            // from a prior error or from a cancelled pending deferred
            let isMissingData = void 0 === currentLoaderData[match.route.id];
            // Always load if this is a net-new route or we don't yet have data
            return isNew || isMissingData;
        }
        function isNewRouteInstance(currentMatch, match) {
            let currentPath = currentMatch.route.path;
            return(// param change for this match, /users/123 -> /users/456
            currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
            // e.g. /files/images/avatar.jpg -> files/finances.xls
            null != currentPath && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]);
        }
        function shouldRevalidateLoader(loaderMatch, arg) {
            if (loaderMatch.route.shouldRevalidate) {
                let routeChoice = loaderMatch.route.shouldRevalidate(arg);
                if ("boolean" == typeof routeChoice) return routeChoice;
            }
            return arg.defaultShouldRevalidate;
        }
        function patchRoutesImpl(routeId, children, routesToUse, manifest, mapRouteProperties) {
            var _childrenToPatch;
            let childrenToPatch;
            if (routeId) {
                let route = manifest[routeId];
                invariant(route, "No route found to patch children into: routeId = " + routeId);
                if (!route.children) route.children = [];
                childrenToPatch = route.children;
            } else childrenToPatch = routesToUse;
            // Don't patch in routes we already know about so that `patch` is idempotent
            // to simplify user-land code. This is useful because we re-call the
            // `patchRoutesOnNavigation` function for matched routes with params.
            let uniqueChildren = children.filter((newRoute)=>!childrenToPatch.some((existingRoute)=>isSameRoute(newRoute, existingRoute)));
            let newRoutes = convertRoutesToDataRoutes(uniqueChildren, mapRouteProperties, [
                routeId || "_",
                "patch",
                String((null == (_childrenToPatch = childrenToPatch) ? void 0 : _childrenToPatch.length) || "0")
            ], manifest);
            childrenToPatch.push(...newRoutes);
        }
        function isSameRoute(newRoute, existingRoute) {
            // Most optimal check is by id
            if ("id" in newRoute && "id" in existingRoute && newRoute.id === existingRoute.id) return true;
            // Second is by pathing differences
            if (!(newRoute.index === existingRoute.index && newRoute.path === existingRoute.path && newRoute.caseSensitive === existingRoute.caseSensitive)) return false;
            // Pathless layout routes are trickier since we need to check children.
            // If they have no children then they're the same as far as we can tell
            if ((!newRoute.children || 0 === newRoute.children.length) && (!existingRoute.children || 0 === existingRoute.children.length)) return true;
            // Otherwise, we look to see if every child in the new route is already
            // represented in the existing route's children
            return newRoute.children.every((aChild, i)=>{
                var _existingRoute$childr;
                return null == (_existingRoute$childr = existingRoute.children) ? void 0 : _existingRoute$childr.some((bChild)=>isSameRoute(aChild, bChild));
            });
        }
        /**
 * Execute route.lazy() methods to lazily load route modules (loader, action,
 * shouldRevalidate) and update the routeManifest in place which shares objects
 * with dataRoutes so those get updated as well.
 */ async function loadLazyRouteModule(route, mapRouteProperties, manifest) {
            if (!route.lazy) return;
            let lazyRoute = await route.lazy();
            // If the lazy route function was executed and removed by another parallel
            // call then we can return - first lazy() to finish wins because the return
            // value of lazy is expected to be static
            if (!route.lazy) return;
            let routeToUpdate = manifest[route.id];
            invariant(routeToUpdate, "No route found in manifest");
            // Update the route in place.  This should be safe because there's no way
            // we could yet be sitting on this route as we can't get there without
            // resolving lazy() first.
            //
            // This is different than the HMR "update" use-case where we may actively be
            // on the route being updated.  The main concern boils down to "does this
            // mutation affect any ongoing navigations or any current state.matches
            // values?".  If not, it should be safe to update in place.
            let routeUpdates = {};
            for(let lazyRouteProperty in lazyRoute){
                let staticRouteValue = routeToUpdate[lazyRouteProperty];
                let isPropertyStaticallyDefined = void 0 !== staticRouteValue && // This property isn't static since it should always be updated based
                // on the route updates
                "hasErrorBoundary" !== lazyRouteProperty;
                warning(!isPropertyStaticallyDefined, "Route \"" + routeToUpdate.id + "\" has a static property \"" + lazyRouteProperty + '" defined but its lazy function is also returning a value for this property. ' + ("The lazy route property \"" + lazyRouteProperty) + "\" will be ignored.");
                if (!isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty)) routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty];
            }
            // Mutate the route with the provided updates.  Do this first so we pass
            // the updated version to mapRouteProperties
            Object.assign(routeToUpdate, routeUpdates);
            // Mutate the `hasErrorBoundary` property on the route based on the route
            // updates and remove the `lazy` function so we don't resolve the lazy
            // route again.
            Object.assign(routeToUpdate, _extends({}, mapRouteProperties(routeToUpdate), {
                lazy: void 0
            }));
        }
        // Default implementation of `dataStrategy` which fetches all loaders in parallel
        async function defaultDataStrategy(_ref4) {
            let { matches } = _ref4;
            let matchesToLoad = matches.filter((m)=>m.shouldLoad);
            let results = await Promise.all(matchesToLoad.map((m)=>m.resolve()));
            return results.reduce((acc, result, i)=>Object.assign(acc, {
                    [matchesToLoad[i].route.id]: result
                }), {});
        }
        async function callDataStrategyImpl(dataStrategyImpl, type, state, request, matchesToLoad, matches, fetcherKey, manifest, mapRouteProperties, requestContext) {
            let loadRouteDefinitionsPromises = matches.map((m)=>m.route.lazy ? loadLazyRouteModule(m.route, mapRouteProperties, manifest) : void 0);
            let dsMatches = matches.map((match, i)=>{
                let loadRoutePromise = loadRouteDefinitionsPromises[i];
                let shouldLoad = matchesToLoad.some((m)=>m.route.id === match.route.id);
                // `resolve` encapsulates route.lazy(), executing the loader/action,
                // and mapping return values/thrown errors to a `DataStrategyResult`.  Users
                // can pass a callback to take fine-grained control over the execution
                // of the loader/action
                let resolve = async (handlerOverride)=>{
                    if (handlerOverride && "GET" === request.method && (match.route.lazy || match.route.loader)) shouldLoad = true;
                    return shouldLoad ? callLoaderOrAction(type, request, match, loadRoutePromise, handlerOverride, requestContext) : Promise.resolve({
                        type: router_ResultType.data,
                        result: void 0
                    });
                };
                return _extends({}, match, {
                    shouldLoad,
                    resolve
                });
            });
            // Send all matches here to allow for a middleware-type implementation.
            // handler will be a no-op for unneeded routes and we filter those results
            // back out below.
            let results = await dataStrategyImpl({
                matches: dsMatches,
                request,
                params: matches[0].params,
                fetcherKey,
                context: requestContext
            });
            // Wait for all routes to load here but 'swallow the error since we want
            // it to bubble up from the `await loadRoutePromise` in `callLoaderOrAction` -
            // called from `match.resolve()`
            try {
                await Promise.all(loadRouteDefinitionsPromises);
            } catch (e) {
            // No-op
            }
            return results;
        }
        // Default logic for calling a loader/action is the user has no specified a dataStrategy
        async function callLoaderOrAction(type, request, match, loadRoutePromise, handlerOverride, staticContext) {
            let result;
            let onReject;
            let runHandler = (handler)=>{
                // Setup a promise we can race against so that abort signals short circuit
                let reject;
                // This will never resolve so safe to type it as Promise<DataStrategyResult> to
                // satisfy the function return value
                let abortPromise = new Promise((_, r)=>reject = r);
                onReject = ()=>reject();
                request.signal.addEventListener("abort", onReject);
                let actualHandler = (ctx)=>{
                    if ("function" != typeof handler) return Promise.reject(new Error("You cannot call the handler for a route which defines a boolean " + ("\"" + type + "\" [routeId: " + match.route.id) + "]"));
                    return handler({
                        request,
                        params: match.params,
                        context: staticContext
                    }, ...void 0 !== ctx ? [
                        ctx
                    ] : []);
                };
                let handlerPromise = (async ()=>{
                    try {
                        let val = await (handlerOverride ? handlerOverride((ctx)=>actualHandler(ctx)) : actualHandler());
                        return {
                            type: "data",
                            result: val
                        };
                    } catch (e) {
                        return {
                            type: "error",
                            result: e
                        };
                    }
                })();
                return Promise.race([
                    handlerPromise,
                    abortPromise
                ]);
            };
            try {
                let handler = match.route[type];
                // If we have a route.lazy promise, await that first
                if (loadRoutePromise) {
                    if (handler) {
                        // Run statically defined handler in parallel with lazy()
                        let handlerError;
                        let [value] = await Promise.all([
                            // If the handler throws, don't let it immediately bubble out,
                            // since we need to let the lazy() execution finish so we know if this
                            // route has a boundary that can handle the error
                            runHandler(handler).catch((e)=>{
                                handlerError = e;
                            }),
                            loadRoutePromise
                        ]);
                        if (void 0 !== handlerError) throw handlerError;
                        result = value;
                    } else {
                        // Load lazy route module, then run any returned handler
                        await loadRoutePromise;
                        handler = match.route[type];
                        if (handler) // Handler still runs even if we got interrupted to maintain consistency
                        // with un-abortable behavior of handler execution on non-lazy or
                        // previously-lazy-loaded routes
                        result = await runHandler(handler);
                        else {
                            if ("action" !== type) // lazy() route has no loader to run.  Short circuit here so we don't
                            // hit the invariant below that errors on returning undefined.
                            return {
                                type: router_ResultType.data,
                                result: void 0
                            };
                            let url = new URL(request.url);
                            let pathname = url.pathname + url.search;
                            throw getInternalRouterError(405, {
                                method: request.method,
                                pathname,
                                routeId: match.route.id
                            });
                        }
                    }
                } else if (handler) result = await runHandler(handler);
                else {
                    let url = new URL(request.url);
                    let pathname = url.pathname + url.search;
                    throw getInternalRouterError(404, {
                        pathname
                    });
                }
                invariant(void 0 !== result.result, "You defined " + ("action" === type ? "an action" : "a loader") + " for route " + ("\"" + match.route.id + "\" but didn't return anything from your `" + type) + "` function. Please return a value or `null`.");
            } catch (e) {
                // We should already be catching and converting normal handler executions to
                // DataStrategyResults and returning them, so anything that throws here is an
                // unexpected error we still need to wrap
                return {
                    type: router_ResultType.error,
                    result: e
                };
            } finally{
                if (onReject) request.signal.removeEventListener("abort", onReject);
            }
            return result;
        }
        async function convertDataStrategyResultToDataResult(dataStrategyResult) {
            let { result, type } = dataStrategyResult;
            if (isResponse(result)) {
                let data;
                try {
                    let contentType = result.headers.get("Content-Type");
                    // Check between word boundaries instead of startsWith() due to the last
                    // paragraph of https://httpwg.org/specs/rfc9110.html#field.content-type
                    data = contentType && /\bapplication\/json\b/.test(contentType) ? null == result.body ? null : await result.json() : await result.text();
                } catch (e) {
                    return {
                        type: router_ResultType.error,
                        error: e
                    };
                }
                if (type === router_ResultType.error) return {
                    type: router_ResultType.error,
                    error: new ErrorResponseImpl(result.status, result.statusText, data),
                    statusCode: result.status,
                    headers: result.headers
                };
                return {
                    type: router_ResultType.data,
                    data,
                    statusCode: result.status,
                    headers: result.headers
                };
            }
            if (type === router_ResultType.error) {
                if (isDataWithResponseInit(result)) {
                    var _result$init2;
                    if (result.data instanceof Error) {
                        var _result$init;
                        return {
                            type: router_ResultType.error,
                            error: result.data,
                            statusCode: null == (_result$init = result.init) ? void 0 : _result$init.status
                        };
                    }
                    // Convert thrown data() to ErrorResponse instances
                    result = new ErrorResponseImpl((null == (_result$init2 = result.init) ? void 0 : _result$init2.status) || 500, void 0, result.data);
                }
                return {
                    type: router_ResultType.error,
                    error: result,
                    statusCode: isRouteErrorResponse(result) ? result.status : void 0
                };
            }
            if (isDeferredData(result)) {
                var _result$init3, _result$init4;
                return {
                    type: router_ResultType.deferred,
                    deferredData: result,
                    statusCode: null == (_result$init3 = result.init) ? void 0 : _result$init3.status,
                    headers: (null == (_result$init4 = result.init) ? void 0 : _result$init4.headers) && new Headers(result.init.headers)
                };
            }
            if (isDataWithResponseInit(result)) {
                var _result$init5, _result$init6;
                return {
                    type: router_ResultType.data,
                    data: result.data,
                    statusCode: null == (_result$init5 = result.init) ? void 0 : _result$init5.status,
                    headers: null != (_result$init6 = result.init) && _result$init6.headers ? new Headers(result.init.headers) : void 0
                };
            }
            return {
                type: router_ResultType.data,
                data: result
            };
        }
        // Support relative routing in internal redirects
        function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename, v7_relativeSplatPath) {
            let location = response.headers.get("Location");
            invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header");
            if (!ABSOLUTE_URL_REGEX.test(location)) {
                let trimmedMatches = matches.slice(0, matches.findIndex((m)=>m.route.id === routeId) + 1);
                location = normalizeTo(new URL(request.url), trimmedMatches, basename, true, location, v7_relativeSplatPath);
                response.headers.set("Location", location);
            }
            return response;
        }
        function normalizeRedirectLocation(location, currentUrl, basename) {
            if (ABSOLUTE_URL_REGEX.test(location)) {
                // Strip off the protocol+origin for same-origin + same-basename absolute redirects
                let normalizedLocation = location;
                let url = normalizedLocation.startsWith("//") ? new URL(currentUrl.protocol + normalizedLocation) : new URL(normalizedLocation);
                let isSameBasename = null != stripBasename(url.pathname, basename);
                if (url.origin === currentUrl.origin && isSameBasename) return url.pathname + url.search + url.hash;
            }
            return location;
        }
        // Utility method for creating the Request instances for loaders/actions during
        // client-side navigations and fetches.  During SSR we will always have a
        // Request instance from the static handler (query/queryRoute)
        function createClientSideRequest(history, location, signal, submission) {
            let url = history.createURL(stripHashFromPath(location)).toString();
            let init = {
                signal
            };
            if (submission && isMutationMethod(submission.formMethod)) {
                let { formMethod, formEncType } = submission;
                // Didn't think we needed this but it turns out unlike other methods, patch
                // won't be properly normalized to uppercase and results in a 405 error.
                // See: https://fetch.spec.whatwg.org/#concept-method
                init.method = formMethod.toUpperCase();
                if ("application/json" === formEncType) {
                    init.headers = new Headers({
                        "Content-Type": formEncType
                    });
                    init.body = JSON.stringify(submission.json);
                } else if ("text/plain" === formEncType) // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)
                init.body = submission.text;
                else if ("application/x-www-form-urlencoded" === formEncType && submission.formData) // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)
                init.body = convertFormDataToSearchParams(submission.formData);
                else // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)
                init.body = submission.formData;
            }
            return new Request(url, init);
        }
        function convertFormDataToSearchParams(formData) {
            let searchParams = new URLSearchParams();
            for (let [key, value] of formData.entries())// https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#converting-an-entry-list-to-a-list-of-name-value-pairs
            searchParams.append(key, "string" == typeof value ? value : value.name);
            return searchParams;
        }
        function convertSearchParamsToFormData(searchParams) {
            let formData = new FormData();
            for (let [key, value] of searchParams.entries())formData.append(key, value);
            return formData;
        }
        function processRouteLoaderData(matches, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling) {
            // Fill in loaderData/errors from our loaders
            let loaderData = {};
            let errors = null;
            let statusCode;
            let foundError = false;
            let loaderHeaders = {};
            let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
            // Process loader results into state.loaderData/state.errors
            matches.forEach((match)=>{
                if (!(match.route.id in results)) return;
                let id = match.route.id;
                let result = results[id];
                invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");
                if (isErrorResult(result)) {
                    let error = result.error;
                    // If we have a pending action error, we report it at the highest-route
                    // that throws a loader error, and then clear it out to indicate that
                    // it was consumed
                    if (void 0 !== pendingError) {
                        error = pendingError;
                        pendingError = void 0;
                    }
                    errors = errors || {};
                    if (skipLoaderErrorBubbling) errors[id] = error;
                    else {
                        // Look upwards from the matched route for the closest ancestor error
                        // boundary, defaulting to the root match.  Prefer higher error values
                        // if lower errors bubble to the same boundary
                        let boundaryMatch = findNearestBoundary(matches, id);
                        if (null == errors[boundaryMatch.route.id]) errors[boundaryMatch.route.id] = error;
                    }
                    // Clear our any prior loaderData for the throwing route
                    loaderData[id] = void 0;
                    // Once we find our first (highest) error, we set the status code and
                    // prevent deeper status codes from overriding
                    if (!foundError) {
                        foundError = true;
                        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
                    }
                    if (result.headers) loaderHeaders[id] = result.headers;
                } else if (isDeferredResult(result)) {
                    activeDeferreds.set(id, result.deferredData);
                    loaderData[id] = result.deferredData.data;
                    // Error status codes always override success status codes, but if all
                    // loaders are successful we take the deepest status code.
                    if (null != result.statusCode && 200 !== result.statusCode && !foundError) statusCode = result.statusCode;
                    if (result.headers) loaderHeaders[id] = result.headers;
                } else {
                    loaderData[id] = result.data;
                    // Error status codes always override success status codes, but if all
                    // loaders are successful we take the deepest status code.
                    if (result.statusCode && 200 !== result.statusCode && !foundError) statusCode = result.statusCode;
                    if (result.headers) loaderHeaders[id] = result.headers;
                }
            });
            // If we didn't consume the pending action error (i.e., all loaders
            // resolved), then consume it here.  Also clear out any loaderData for the
            // throwing route
            if (void 0 !== pendingError && pendingActionResult) {
                errors = {
                    [pendingActionResult[0]]: pendingError
                };
                loaderData[pendingActionResult[0]] = void 0;
            }
            return {
                loaderData,
                errors,
                statusCode: statusCode || 200,
                loaderHeaders
            };
        }
        function processLoaderData(state, matches, results, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds) {
            let { loaderData, errors } = processRouteLoaderData(matches, results, pendingActionResult, activeDeferreds, false // This method is only called client side so we always want to bubble
            );
            // Process results from our revalidating fetchers
            revalidatingFetchers.forEach((rf)=>{
                let { key, match, controller } = rf;
                let result = fetcherResults[key];
                invariant(result, "Did not find corresponding fetcher result");
                // Process fetcher non-redirect errors
                if (controller && controller.signal.aborted) // Nothing to do for aborted fetchers
                return;
                if (isErrorResult(result)) {
                    let boundaryMatch = findNearestBoundary(state.matches, null == match ? void 0 : match.route.id);
                    if (!(errors && errors[boundaryMatch.route.id])) errors = _extends({}, errors, {
                        [boundaryMatch.route.id]: result.error
                    });
                    state.fetchers.delete(key);
                } else if (isRedirectResult(result)) // Should never get here, redirects should get processed above, but we
                // keep this to type narrow to a success result in the else
                invariant(false, "Unhandled fetcher revalidation redirect");
                else if (isDeferredResult(result)) // Should never get here, deferred data should be awaited for fetchers
                // in resolveDeferredResults
                invariant(false, "Unhandled fetcher deferred data");
                else {
                    let doneFetcher = getDoneFetcher(result.data);
                    state.fetchers.set(key, doneFetcher);
                }
            });
            return {
                loaderData,
                errors
            };
        }
        function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
            let mergedLoaderData = _extends({}, newLoaderData);
            for (let match of matches){
                let id = match.route.id;
                if (newLoaderData.hasOwnProperty(id)) {
                    if (void 0 !== newLoaderData[id]) mergedLoaderData[id] = newLoaderData[id];
                } else if (void 0 !== loaderData[id] && match.route.loader) // Preserve existing keys not included in newLoaderData and where a loader
                // wasn't removed by HMR
                mergedLoaderData[id] = loaderData[id];
                if (errors && errors.hasOwnProperty(id)) break;
            }
            return mergedLoaderData;
        }
        function getActionDataForCommit(pendingActionResult) {
            if (!pendingActionResult) return {};
            return isErrorResult(pendingActionResult[1]) ? {
                // Clear out prior actionData on errors
                actionData: {}
            } : {
                actionData: {
                    [pendingActionResult[0]]: pendingActionResult[1].data
                }
            };
        }
        // Find the nearest error boundary, looking upwards from the leaf route (or the
        // route specified by routeId) for the closest ancestor error boundary,
        // defaulting to the root match
        function findNearestBoundary(matches, routeId) {
            let eligibleMatches = routeId ? matches.slice(0, matches.findIndex((m)=>m.route.id === routeId) + 1) : [
                ...matches
            ];
            return eligibleMatches.reverse().find((m)=>true === m.route.hasErrorBoundary) || matches[0];
        }
        function getShortCircuitMatches(routes) {
            // Prefer a root layout route if present, otherwise shim in a route object
            let route = 1 === routes.length ? routes[0] : routes.find((r)=>r.index || !r.path || "/" === r.path) || {
                id: "__shim-error-route__"
            };
            return {
                matches: [
                    {
                        params: {},
                        pathname: "",
                        pathnameBase: "",
                        route
                    }
                ],
                route
            };
        }
        function getInternalRouterError(status, _temp5) {
            let { pathname, routeId, method, type, message } = void 0 === _temp5 ? {} : _temp5;
            let statusText = "Unknown Server Error";
            let errorMessage = "Unknown @remix-run/router error";
            if (400 === status) {
                statusText = "Bad Request";
                if (method && pathname && routeId) errorMessage = "You made a " + method + " request to \"" + pathname + "\" but " + ("did not provide a `loader` for route \"" + routeId) + '", so there is no way to handle the request.';
                else if ("defer-action" === type) errorMessage = "defer() is not supported in actions";
                else if ("invalid-body" === type) errorMessage = "Unable to encode submission body";
            } else if (403 === status) {
                statusText = "Forbidden";
                errorMessage = "Route \"" + routeId + "\" does not match URL \"" + pathname + "\"";
            } else if (404 === status) {
                statusText = "Not Found";
                errorMessage = "No route matches URL \"" + pathname + "\"";
            } else if (405 === status) {
                statusText = "Method Not Allowed";
                if (method && pathname && routeId) errorMessage = "You made a " + method.toUpperCase() + " request to \"" + pathname + "\" but " + ("did not provide an `action` for route \"" + routeId) + '", so there is no way to handle the request.';
                else if (method) errorMessage = "Invalid request method \"" + method.toUpperCase() + "\"";
            }
            return new ErrorResponseImpl(status || 500, statusText, new Error(errorMessage), true);
        }
        // Find any returned redirect errors, starting from the lowest match
        function findRedirect(results) {
            let entries = Object.entries(results);
            for(let i = entries.length - 1; i >= 0; i--){
                let [key, result] = entries[i];
                if (isRedirectResult(result)) return {
                    key,
                    result
                };
            }
        }
        function stripHashFromPath(path) {
            let parsedPath = "string" == typeof path ? parsePath(path) : path;
            return createPath(_extends({}, parsedPath, {
                hash: ""
            }));
        }
        function isHashChangeOnly(a, b) {
            if (a.pathname !== b.pathname || a.search !== b.search) return false;
            if ("" === a.hash) // /page -> /page#hash
            return "" !== b.hash;
            if (a.hash === b.hash) // /page#hash -> /page#hash
            return true;
            if ("" !== b.hash) // /page#hash -> /page#other
            return true;
            // If the hash is removed the browser will re-perform a request to the server
            // /page#hash -> /page
            return false;
        }
        function isDataStrategyResult(result) {
            return null != result && "object" == typeof result && "type" in result && "result" in result && (result.type === router_ResultType.data || result.type === router_ResultType.error);
        }
        function isRedirectDataStrategyResultResult(result) {
            return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
        }
        function isDeferredResult(result) {
            return result.type === router_ResultType.deferred;
        }
        function isErrorResult(result) {
            return result.type === router_ResultType.error;
        }
        function isRedirectResult(result) {
            return (result && result.type) === router_ResultType.redirect;
        }
        function isDataWithResponseInit(value) {
            return "object" == typeof value && null != value && "type" in value && "data" in value && "init" in value && "DataWithResponseInit" === value.type;
        }
        function isDeferredData(value) {
            let deferred = value;
            return deferred && "object" == typeof deferred && "object" == typeof deferred.data && "function" == typeof deferred.subscribe && "function" == typeof deferred.cancel && "function" == typeof deferred.resolveData;
        }
        function isResponse(value) {
            return null != value && "number" == typeof value.status && "string" == typeof value.statusText && "object" == typeof value.headers && void 0 !== value.body;
        }
        function isRedirectResponse(result) {
            if (!isResponse(result)) return false;
            let status = result.status;
            let location = result.headers.get("Location");
            return status >= 300 && status <= 399 && null != location;
        }
        function isValidMethod(method) {
            return validRequestMethods.has(method.toLowerCase());
        }
        function isMutationMethod(method) {
            return validMutationMethods.has(method.toLowerCase());
        }
        async function resolveNavigationDeferredResults(matches, results, signal, currentMatches, currentLoaderData) {
            let entries = Object.entries(results);
            for(let index = 0; index < entries.length; index++){
                let [routeId, result] = entries[index];
                let match = matches.find((m)=>(null == m ? void 0 : m.route.id) === routeId);
                // If we don't have a match, then we can have a deferred result to do
                // anything with.  This is for revalidating fetchers where the route was
                // removed during HMR
                if (!match) continue;
                let currentMatch = currentMatches.find((m)=>m.route.id === match.route.id);
                let isRevalidatingLoader = null != currentMatch && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== void 0;
                if (isDeferredResult(result) && isRevalidatingLoader) // Note: we do not have to touch activeDeferreds here since we race them
                // against the signal in resolveDeferredData and they'll get aborted
                // there if needed
                await resolveDeferredData(result, signal, false).then((result)=>{
                    if (result) results[routeId] = result;
                });
            }
        }
        async function resolveFetcherDeferredResults(matches, results, revalidatingFetchers) {
            for(let index = 0; index < revalidatingFetchers.length; index++){
                let { key, routeId, controller } = revalidatingFetchers[index];
                let result = results[key];
                let match = matches.find((m)=>(null == m ? void 0 : m.route.id) === routeId);
                // If we don't have a match, then we can have a deferred result to do
                // anything with.  This is for revalidating fetchers where the route was
                // removed during HMR
                if (!!match) {
                    if (isDeferredResult(result)) {
                        // Note: we do not have to touch activeDeferreds here since we race them
                        // against the signal in resolveDeferredData and they'll get aborted
                        // there if needed
                        invariant(controller, "Expected an AbortController for revalidating fetcher deferred result");
                        await resolveDeferredData(result, controller.signal, true).then((result)=>{
                            if (result) results[key] = result;
                        });
                    }
                }
            }
        }
        async function resolveDeferredData(result, signal, unwrap) {
            if (void 0 === unwrap) unwrap = false;
            let aborted = await result.deferredData.resolveData(signal);
            if (aborted) return;
            if (unwrap) try {
                return {
                    type: router_ResultType.data,
                    data: result.deferredData.unwrappedData
                };
            } catch (e) {
                // Handle any TrackedPromise._error values encountered while unwrapping
                return {
                    type: router_ResultType.error,
                    error: e
                };
            }
            return {
                type: router_ResultType.data,
                data: result.deferredData.data
            };
        }
        function hasNakedIndexQuery(search) {
            return new URLSearchParams(search).getAll("index").some((v)=>"" === v);
        }
        function getTargetMatch(matches, location) {
            let search = "string" == typeof location ? parsePath(location).search : location.search;
            if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) // Return the leaf index route when index is present
            return matches[matches.length - 1];
            // Otherwise grab the deepest "path contributing" match (ignoring index and
            // pathless layout routes)
            let pathMatches = getPathContributingMatches(matches);
            return pathMatches[pathMatches.length - 1];
        }
        function getSubmissionFromNavigation(navigation) {
            let { formMethod, formAction, formEncType, text, formData, json } = navigation;
            if (!formMethod || !formAction || !formEncType) return;
            if (null != text) return {
                formMethod,
                formAction,
                formEncType,
                formData: void 0,
                json: void 0,
                text
            };
            if (null != formData) return {
                formMethod,
                formAction,
                formEncType,
                formData,
                json: void 0,
                text: void 0
            };
            if (void 0 !== json) return {
                formMethod,
                formAction,
                formEncType,
                formData: void 0,
                json,
                text: void 0
            };
        }
        function getLoadingNavigation(location, submission) {
            if (submission) {
                let navigation = {
                    state: "loading",
                    location,
                    formMethod: submission.formMethod,
                    formAction: submission.formAction,
                    formEncType: submission.formEncType,
                    formData: submission.formData,
                    json: submission.json,
                    text: submission.text
                };
                return navigation;
            }
            {
                let navigation = {
                    state: "loading",
                    location,
                    formMethod: void 0,
                    formAction: void 0,
                    formEncType: void 0,
                    formData: void 0,
                    json: void 0,
                    text: void 0
                };
                return navigation;
            }
        }
        function getSubmittingNavigation(location, submission) {
            let navigation = {
                state: "submitting",
                location,
                formMethod: submission.formMethod,
                formAction: submission.formAction,
                formEncType: submission.formEncType,
                formData: submission.formData,
                json: submission.json,
                text: submission.text
            };
            return navigation;
        }
        function getLoadingFetcher(submission, data) {
            if (submission) {
                let fetcher = {
                    state: "loading",
                    formMethod: submission.formMethod,
                    formAction: submission.formAction,
                    formEncType: submission.formEncType,
                    formData: submission.formData,
                    json: submission.json,
                    text: submission.text,
                    data
                };
                return fetcher;
            }
            {
                let fetcher = {
                    state: "loading",
                    formMethod: void 0,
                    formAction: void 0,
                    formEncType: void 0,
                    formData: void 0,
                    json: void 0,
                    text: void 0,
                    data
                };
                return fetcher;
            }
        }
        function getSubmittingFetcher(submission, existingFetcher) {
            let fetcher = {
                state: "submitting",
                formMethod: submission.formMethod,
                formAction: submission.formAction,
                formEncType: submission.formEncType,
                formData: submission.formData,
                json: submission.json,
                text: submission.text,
                data: existingFetcher ? existingFetcher.data : void 0
            };
            return fetcher;
        }
        function getDoneFetcher(data) {
            let fetcher = {
                state: "idle",
                formMethod: void 0,
                formAction: void 0,
                formEncType: void 0,
                formData: void 0,
                json: void 0,
                text: void 0,
                data
            };
            return fetcher;
        }
        function restoreAppliedTransitions(_window, transitions) {
            try {
                let sessionPositions = _window.sessionStorage.getItem(TRANSITIONS_STORAGE_KEY);
                if (sessionPositions) {
                    let json = JSON.parse(sessionPositions);
                    for (let [k, v] of Object.entries(json || {}))if (v && Array.isArray(v)) transitions.set(k, new Set(v || []));
                }
            } catch (e) {
            // no-op, use default empty object
            }
        }
        function persistAppliedTransitions(_window, transitions) {
            if (transitions.size > 0) {
                let json = {};
                for (let [k, v] of transitions)json[k] = [
                    ...v
                ];
                try {
                    _window.sessionStorage.setItem(TRANSITIONS_STORAGE_KEY, JSON.stringify(json));
                } catch (error) {
                    warning(false, "Failed to save applied view transitions in sessionStorage (" + error + ").");
                }
            }
        }
        /**
 * React Router v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function dist_extends() {
            dist_extends = Object.assign ? Object.assign.bind() : function(target) {
                for(var i = 1; i < arguments.length; i++){
                    var source = arguments[i];
                    for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
                }
                return target;
            };
            return dist_extends.apply(this, arguments);
        }
        // Create react-specific types from the agnostic types in @remix-run/router to
        // export from react-router
        const DataRouterContext = /*#__PURE__*/ react.createContext(null);
        const DataRouterStateContext = /*#__PURE__*/ react.createContext(null);
        const AwaitContext = /*#__PURE__*/ react.createContext(null);
        /**
 * A Navigator is a "location changer"; it's how you get to different locations.
 *
 * Every history instance conforms to the Navigator interface, but the
 * distinction is useful primarily when it comes to the low-level `<Router>` API
 * where both the location and a navigator must be provided separately in order
 * to avoid "tearing" that may occur in a suspense-enabled app if the action
 * and/or location were to be read directly from the history instance.
 */ const NavigationContext = /*#__PURE__*/ react.createContext(null);
        const LocationContext = /*#__PURE__*/ react.createContext(null);
        const RouteContext = /*#__PURE__*/ react.createContext({
            outlet: null,
            matches: [],
            isDataRoute: false
        });
        const RouteErrorContext = /*#__PURE__*/ react.createContext(null);
        /**
 * Returns the full href for the given "to" value. This is useful for building
 * custom links that are also accessible and preserve right-click behavior.
 *
 * @see https://reactrouter.com/v6/hooks/use-href
 */ function dist_useHref(to, _temp) {
            let { relative } = void 0 === _temp ? {} : _temp;
            useInRouterContext() || invariant(false);
            let { basename, navigator: navigator1 } = react.useContext(NavigationContext);
            let { hash, pathname, search } = useResolvedPath(to, {
                relative
            });
            let joinedPathname = pathname;
            // If we're operating within a basename, prepend it to the pathname prior
            // to creating the href.  If this is a root navigation, then just use the raw
            // basename which allows the basename to have full control over the presence
            // of a trailing slash on root links
            if ("/" !== basename) joinedPathname = "/" === pathname ? basename : joinPaths([
                basename,
                pathname
            ]);
            return navigator1.createHref({
                pathname: joinedPathname,
                search,
                hash
            });
        }
        /**
 * Returns true if this component is a descendant of a `<Router>`.
 *
 * @see https://reactrouter.com/v6/hooks/use-in-router-context
 */ function useInRouterContext() {
            return null != react.useContext(LocationContext);
        }
        /**
 * Returns the current location object, which represents the current URL in web
 * browsers.
 *
 * Note: If you're using this it may mean you're doing some of your own
 * "routing" in your app, and we'd like to know what your use case is. We may
 * be able to provide something higher-level to better suit your needs.
 *
 * @see https://reactrouter.com/v6/hooks/use-location
 */ function useLocation() {
            useInRouterContext() || invariant(false);
            return react.useContext(LocationContext).location;
        }
        /**
 * Returns the current navigation action which describes how the router came to
 * the current location, either by a pop, push, or replace on the history stack.
 *
 * @see https://reactrouter.com/v6/hooks/use-navigation-type
 */ function useNavigationType() {
            return react.useContext(LocationContext).navigationType;
        }
        /**
 * Returns a PathMatch object if the given pattern matches the current URL.
 * This is useful for components that need to know "active" state, e.g.
 * `<NavLink>`.
 *
 * @see https://reactrouter.com/v6/hooks/use-match
 */ function useMatch(pattern) {
            useInRouterContext() || invariant(false);
            let { pathname } = useLocation();
            return react.useMemo(()=>matchPath(pattern, decodePath(pathname)), [
                pathname,
                pattern
            ]);
        }
        /**
 * The interface for the navigate() function returned from useNavigate().
 */ const navigateEffectWarning = /* unused pure expression or super */ null;
        // Mute warnings for calls to useNavigate in SSR environments
        function useIsomorphicLayoutEffect(cb) {
            let isStatic = react.useContext(NavigationContext).static;
            if (!isStatic) // We should be able to get rid of this once react 18.3 is released
            // See: https://github.com/facebook/react/pull/26395
            // eslint-disable-next-line react-hooks/rules-of-hooks
            react.useLayoutEffect(cb);
        }
        /**
 * Returns an imperative method for changing the location. Used by `<Link>`s, but
 * may also be used by other elements to change the location.
 *
 * @see https://reactrouter.com/v6/hooks/use-navigate
 */ function useNavigate() {
            let { isDataRoute } = react.useContext(RouteContext);
            // Conditional usage is OK here because the usage of a data router is static
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return isDataRoute ? useNavigateStable() : useNavigateUnstable();
        }
        function useNavigateUnstable() {
            useInRouterContext() || invariant(false);
            let dataRouterContext = react.useContext(DataRouterContext);
            let { basename, future, navigator: navigator1 } = react.useContext(NavigationContext);
            let { matches } = react.useContext(RouteContext);
            let { pathname: locationPathname } = useLocation();
            let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
            let activeRef = react.useRef(false);
            useIsomorphicLayoutEffect(()=>{
                activeRef.current = true;
            });
            let navigate = react.useCallback(function(to, options) {
                if (void 0 === options) options = {};
                // Short circuit here since if this happens on first render the navigate
                // is useless because we haven't wired up our history listener yet
                if (!activeRef.current) return;
                if ("number" == typeof to) {
                    navigator1.go(to);
                    return;
                }
                let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, "path" === options.relative);
                // If we're operating within a basename, prepend it to the pathname prior
                // to handing off to history (but only if we're not in a data router,
                // otherwise it'll prepend the basename inside of the router).
                // If this is a root navigation, then we navigate to the raw basename
                // which allows the basename to have full control over the presence of a
                // trailing slash on root links
                if (null == dataRouterContext && "/" !== basename) path.pathname = "/" === path.pathname ? basename : joinPaths([
                    basename,
                    path.pathname
                ]);
                (options.replace ? navigator1.replace : navigator1.push)(path, options.state, options);
            }, [
                basename,
                navigator1,
                routePathnamesJson,
                locationPathname,
                dataRouterContext
            ]);
            return navigate;
        }
        const OutletContext = /*#__PURE__*/ react.createContext(null);
        /**
 * Returns the context (if provided) for the child route at this level of the route
 * hierarchy.
 * @see https://reactrouter.com/v6/hooks/use-outlet-context
 */ function useOutletContext() {
            return react.useContext(OutletContext);
        }
        /**
 * Returns the element for the child route at this level of the route
 * hierarchy. Used internally by `<Outlet>` to render child routes.
 *
 * @see https://reactrouter.com/v6/hooks/use-outlet
 */ function useOutlet(context) {
            let outlet = react.useContext(RouteContext).outlet;
            if (outlet) return /*#__PURE__*/ react.createElement(OutletContext.Provider, {
                value: context
            }, outlet);
            return outlet;
        }
        /**
 * Returns an object of key/value pairs of the dynamic params from the current
 * URL that were matched by the route path.
 *
 * @see https://reactrouter.com/v6/hooks/use-params
 */ function useParams() {
            let { matches } = react.useContext(RouteContext);
            let routeMatch = matches[matches.length - 1];
            return routeMatch ? routeMatch.params : {};
        }
        /**
 * Resolves the pathname of the given `to` value against the current location.
 *
 * @see https://reactrouter.com/v6/hooks/use-resolved-path
 */ function useResolvedPath(to, _temp2) {
            let { relative } = void 0 === _temp2 ? {} : _temp2;
            let { future } = react.useContext(NavigationContext);
            let { matches } = react.useContext(RouteContext);
            let { pathname: locationPathname } = useLocation();
            let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
            return react.useMemo(()=>resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, "path" === relative), [
                to,
                routePathnamesJson,
                locationPathname,
                relative
            ]);
        }
        /**
 * Returns the element of the route that matched the current location, prepared
 * with the correct context to render the remainder of the route tree. Route
 * elements in the tree must render an `<Outlet>` to render their child route's
 * element.
 *
 * @see https://reactrouter.com/v6/hooks/use-routes
 */ function useRoutes(routes, locationArg) {
            return useRoutesImpl(routes, locationArg);
        }
        // Internal implementation with accept optional param for RouterProvider usage
        function useRoutesImpl(routes, locationArg, dataRouterState, future) {
            useInRouterContext() || invariant(false);
            let { navigator: navigator1 } = react.useContext(NavigationContext);
            let { matches: parentMatches } = react.useContext(RouteContext);
            let routeMatch = parentMatches[parentMatches.length - 1];
            let parentParams = routeMatch ? routeMatch.params : {};
            routeMatch && routeMatch.pathname;
            let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
            routeMatch && routeMatch.route;
            let locationFromContext = useLocation();
            let location;
            if (locationArg) {
                var _parsedLocationArg$pa;
                let parsedLocationArg = "string" == typeof locationArg ? parsePath(locationArg) : locationArg;
                "/" === parentPathnameBase || (null == (_parsedLocationArg$pa = parsedLocationArg.pathname) ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase)) || invariant(false);
                location = parsedLocationArg;
            } else location = locationFromContext;
            let pathname = location.pathname || "/";
            let remainingPathname = pathname;
            if ("/" !== parentPathnameBase) {
                // Determine the remaining pathname by removing the # of URL segments the
                // parentPathnameBase has, instead of removing based on character count.
                // This is because we can't guarantee that incoming/outgoing encodings/
                // decodings will match exactly.
                // We decode paths before matching on a per-segment basis with
                // decodeURIComponent(), but we re-encode pathnames via `new URL()` so they
                // match what `window.location.pathname` would reflect.  Those don't 100%
                // align when it comes to encoded URI characters such as % and &.
                //
                // So we may end up with:
                //   pathname:           "/descendant/a%25b/match"
                //   parentPathnameBase: "/descendant/a%b"
                //
                // And the direct substring removal approach won't work :/
                let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
                let segments = pathname.replace(/^\//, "").split("/");
                remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
            }
            let matches = matchRoutes(routes, {
                pathname: remainingPathname
            });
            let renderedMatches = _renderMatches(matches && matches.map((match)=>Object.assign({}, match, {
                    params: Object.assign({}, parentParams, match.params),
                    pathname: joinPaths([
                        parentPathnameBase,
                        // Re-encode pathnames that were decoded inside matchRoutes
                        navigator1.encodeLocation ? navigator1.encodeLocation(match.pathname).pathname : match.pathname
                    ]),
                    pathnameBase: "/" === match.pathnameBase ? parentPathnameBase : joinPaths([
                        parentPathnameBase,
                        // Re-encode pathnames that were decoded inside matchRoutes
                        navigator1.encodeLocation ? navigator1.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
                    ])
                })), parentMatches, dataRouterState, future);
            // When a user passes in a `locationArg`, the associated routes need to
            // be wrapped in a new `LocationContext.Provider` in order for `useLocation`
            // to use the scoped location instead of the global location.
            if (locationArg && renderedMatches) return /*#__PURE__*/ react.createElement(LocationContext.Provider, {
                value: {
                    location: dist_extends({
                        pathname: "/",
                        search: "",
                        hash: "",
                        state: null,
                        key: "default"
                    }, location),
                    navigationType: router_Action.Pop
                }
            }, renderedMatches);
            return renderedMatches;
        }
        function DefaultErrorComponent() {
            let error = useRouteError();
            let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
            let stack = error instanceof Error ? error.stack : null;
            let lightgrey = "rgba(200,200,200, 0.5)";
            let preStyles = {
                padding: "0.5rem",
                backgroundColor: lightgrey
            };
            let devInfo = null;
            return /*#__PURE__*/ react.createElement(react.Fragment, null, /*#__PURE__*/ react.createElement("h2", null, "Unexpected Application Error!"), /*#__PURE__*/ react.createElement("h3", {
                style: {
                    fontStyle: "italic"
                }
            }, message), stack ? /*#__PURE__*/ react.createElement("pre", {
                style: preStyles
            }, stack) : null, devInfo);
        }
        const defaultErrorElement = /*#__PURE__*/ react.createElement(DefaultErrorComponent, null);
        class RenderErrorBoundary extends react.Component {
            constructor(props){
                super(props);
                this.state = {
                    location: props.location,
                    revalidation: props.revalidation,
                    error: props.error
                };
            }
            static getDerivedStateFromError(error) {
                return {
                    error: error
                };
            }
            static getDerivedStateFromProps(props, state) {
                // When we get into an error state, the user will likely click "back" to the
                // previous page that didn't have an error. Because this wraps the entire
                // application, that will have no effect--the error page continues to display.
                // This gives us a mechanism to recover from the error when the location changes.
                //
                // Whether we're in an error state or not, we update the location in state
                // so that when we are in an error state, it gets reset when a new location
                // comes in and the user recovers from the error.
                if (state.location !== props.location || "idle" !== state.revalidation && "idle" === props.revalidation) return {
                    error: props.error,
                    location: props.location,
                    revalidation: props.revalidation
                };
                // If we're not changing locations, preserve the location but still surface
                // any new errors that may come through. We retain the existing error, we do
                // this because the error provided from the app state may be cleared without
                // the location changing.
                return {
                    error: void 0 !== props.error ? props.error : state.error,
                    location: state.location,
                    revalidation: props.revalidation || state.revalidation
                };
            }
            componentDidCatch(error, errorInfo) {
                console.error("React Router caught the following error during render", error, errorInfo);
            }
            render() {
                return void 0 !== this.state.error ? /*#__PURE__*/ react.createElement(RouteContext.Provider, {
                    value: this.props.routeContext
                }, /*#__PURE__*/ react.createElement(RouteErrorContext.Provider, {
                    value: this.state.error,
                    children: this.props.component
                })) : this.props.children;
            }
        }
        function RenderedRoute(_ref) {
            let { routeContext, match, children } = _ref;
            let dataRouterContext = react.useContext(DataRouterContext);
            // Track how deep we got in our render pass to emulate SSR componentDidCatch
            // in a DataStaticRouter
            if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
            return /*#__PURE__*/ react.createElement(RouteContext.Provider, {
                value: routeContext
            }, children);
        }
        function _renderMatches(matches, parentMatches, dataRouterState, future) {
            var _dataRouterState;
            if (void 0 === parentMatches) parentMatches = [];
            if (void 0 === dataRouterState) dataRouterState = null;
            if (void 0 === future) future = null;
            if (null == matches) {
                var _future;
                if (!dataRouterState) return null;
                if (dataRouterState.errors) // Don't bail if we have data router errors so we can render them in the
                // boundary.  Use the pre-matched (or shimmed) matches
                matches = dataRouterState.matches;
                else {
                    if (null == (_future = future) || !_future.v7_partialHydration || 0 !== parentMatches.length || !!dataRouterState.initialized || !(dataRouterState.matches.length > 0)) return null;
                    // Don't bail if we're initializing with partial hydration and we have
                    // router matches.  That means we're actively running `patchRoutesOnNavigation`
                    // so we should render down the partial matches to the appropriate
                    // `HydrateFallback`.  We only do this if `parentMatches` is empty so it
                    // only impacts the root matches for `RouterProvider` and no descendant
                    // `<Routes>`
                    matches = dataRouterState.matches;
                }
            }
            let renderedMatches = matches;
            // If we have data errors, trim matches to the highest error boundary
            let errors = null == (_dataRouterState = dataRouterState) ? void 0 : _dataRouterState.errors;
            if (null != errors) {
                let errorIndex = renderedMatches.findIndex((m)=>m.route.id && (null == errors ? void 0 : errors[m.route.id]) !== void 0);
                errorIndex >= 0 || invariant(false);
                renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
            }
            // If we're in a partial hydration mode, detect if we need to render down to
            // a given HydrateFallback while we load the rest of the hydration data
            let renderFallback = false;
            let fallbackIndex = -1;
            if (dataRouterState && future && future.v7_partialHydration) for(let i = 0; i < renderedMatches.length; i++){
                let match = renderedMatches[i];
                // Track the deepest fallback up until the first route without data
                if (match.route.HydrateFallback || match.route.hydrateFallbackElement) fallbackIndex = i;
                if (match.route.id) {
                    let { loaderData, errors } = dataRouterState;
                    let needsToRunLoader = match.route.loader && void 0 === loaderData[match.route.id] && (!errors || void 0 === errors[match.route.id]);
                    if (match.route.lazy || needsToRunLoader) {
                        // We found the first route that's not ready to render (waiting on
                        // lazy, or has a loader that hasn't run yet).  Flag that we need to
                        // render a fallback and render up until the appropriate fallback
                        renderFallback = true;
                        renderedMatches = fallbackIndex >= 0 ? renderedMatches.slice(0, fallbackIndex + 1) : [
                            renderedMatches[0]
                        ];
                        break;
                    }
                }
            }
            return renderedMatches.reduceRight((outlet, match, index)=>{
                // Only data routers handle errors/fallbacks
                let error;
                let shouldRenderHydrateFallback = false;
                let errorElement = null;
                let hydrateFallbackElement = null;
                if (dataRouterState) {
                    error = errors && match.route.id ? errors[match.route.id] : void 0;
                    errorElement = match.route.errorElement || defaultErrorElement;
                    if (renderFallback) {
                        if (fallbackIndex < 0 && 0 === index) {
                            warningOnce("route-fallback", false, "No `HydrateFallback` element provided to render during initial hydration");
                            shouldRenderHydrateFallback = true;
                            hydrateFallbackElement = null;
                        } else if (fallbackIndex === index) {
                            shouldRenderHydrateFallback = true;
                            hydrateFallbackElement = match.route.hydrateFallbackElement || null;
                        }
                    }
                }
                let matches = parentMatches.concat(renderedMatches.slice(0, index + 1));
                let getChildren = ()=>{
                    let children;
                    children = error ? errorElement : shouldRenderHydrateFallback ? hydrateFallbackElement : match.route.Component ? /*#__PURE__*/ react.createElement(match.route.Component, null) : match.route.element ? match.route.element : outlet;
                    return /*#__PURE__*/ react.createElement(RenderedRoute, {
                        match: match,
                        routeContext: {
                            outlet,
                            matches,
                            isDataRoute: null != dataRouterState
                        },
                        children: children
                    });
                };
                // Only wrap in an error boundary within data router usages when we have an
                // ErrorBoundary/errorElement on this route.  Otherwise let it bubble up to
                // an ancestor ErrorBoundary/errorElement
                return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || 0 === index) ? /*#__PURE__*/ react.createElement(RenderErrorBoundary, {
                    location: dataRouterState.location,
                    revalidation: dataRouterState.revalidation,
                    component: errorElement,
                    error: error,
                    children: getChildren(),
                    routeContext: {
                        outlet: null,
                        matches,
                        isDataRoute: true
                    }
                }) : getChildren();
            }, null);
        }
        var dist_DataRouterHook = /*#__PURE__*/ function(DataRouterHook) {
            DataRouterHook["UseBlocker"] = "useBlocker";
            DataRouterHook["UseRevalidator"] = "useRevalidator";
            DataRouterHook["UseNavigateStable"] = "useNavigate";
            return DataRouterHook;
        }(dist_DataRouterHook || {});
        var dist_DataRouterStateHook = /*#__PURE__*/ function(DataRouterStateHook) {
            DataRouterStateHook["UseBlocker"] = "useBlocker";
            DataRouterStateHook["UseLoaderData"] = "useLoaderData";
            DataRouterStateHook["UseActionData"] = "useActionData";
            DataRouterStateHook["UseRouteError"] = "useRouteError";
            DataRouterStateHook["UseNavigation"] = "useNavigation";
            DataRouterStateHook["UseRouteLoaderData"] = "useRouteLoaderData";
            DataRouterStateHook["UseMatches"] = "useMatches";
            DataRouterStateHook["UseRevalidator"] = "useRevalidator";
            DataRouterStateHook["UseNavigateStable"] = "useNavigate";
            DataRouterStateHook["UseRouteId"] = "useRouteId";
            return DataRouterStateHook;
        }(dist_DataRouterStateHook || {});
        function getDataRouterConsoleError(hookName) {
            return hookName + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
        }
        function useDataRouterContext(hookName) {
            let ctx = react.useContext(DataRouterContext);
            ctx || invariant(false);
            return ctx;
        }
        function useDataRouterState(hookName) {
            let state = react.useContext(DataRouterStateContext);
            state || invariant(false);
            return state;
        }
        function useRouteContext(hookName) {
            let route = react.useContext(RouteContext);
            route || invariant(false);
            return route;
        }
        // Internal version with hookName-aware debugging
        function useCurrentRouteId(hookName) {
            let route = useRouteContext(hookName);
            let thisRoute = route.matches[route.matches.length - 1];
            thisRoute.route.id || invariant(false);
            return thisRoute.route.id;
        }
        /**
 * Returns the ID for the nearest contextual route
 */ function useRouteId() {
            return useCurrentRouteId(dist_DataRouterStateHook.UseRouteId);
        }
        /**
 * Returns the current navigation, defaulting to an "idle" navigation when
 * no navigation is in progress
 */ function useNavigation() {
            let state = useDataRouterState(dist_DataRouterStateHook.UseNavigation);
            return state.navigation;
        }
        /**
 * Returns a revalidate function for manually triggering revalidation, as well
 * as the current state of any manual revalidations
 */ function useRevalidator() {
            let dataRouterContext = useDataRouterContext(dist_DataRouterHook.UseRevalidator);
            let state = useDataRouterState(dist_DataRouterStateHook.UseRevalidator);
            return react.useMemo(()=>({
                    revalidate: dataRouterContext.router.revalidate,
                    state: state.revalidation
                }), [
                dataRouterContext.router.revalidate,
                state.revalidation
            ]);
        }
        /**
 * Returns the active route matches, useful for accessing loaderData for
 * parent/child routes or the route "handle" property
 */ function useMatches() {
            let { matches, loaderData } = useDataRouterState(dist_DataRouterStateHook.UseMatches);
            return react.useMemo(()=>matches.map((m)=>convertRouteMatchToUiMatch(m, loaderData)), [
                matches,
                loaderData
            ]);
        }
        /**
 * Returns the loader data for the nearest ancestor Route loader
 */ function useLoaderData() {
            let state = useDataRouterState(dist_DataRouterStateHook.UseLoaderData);
            let routeId = useCurrentRouteId(dist_DataRouterStateHook.UseLoaderData);
            if (state.errors && null != state.errors[routeId]) {
                console.error("You cannot `useLoaderData` in an errorElement (routeId: " + routeId + ")");
                return;
            }
            return state.loaderData[routeId];
        }
        /**
 * Returns the loaderData for the given routeId
 */ function useRouteLoaderData(routeId) {
            let state = useDataRouterState(dist_DataRouterStateHook.UseRouteLoaderData);
            return state.loaderData[routeId];
        }
        /**
 * Returns the action data for the nearest ancestor Route action
 */ function useActionData() {
            let state = useDataRouterState(dist_DataRouterStateHook.UseActionData);
            let routeId = useCurrentRouteId(dist_DataRouterStateHook.UseLoaderData);
            return state.actionData ? state.actionData[routeId] : void 0;
        }
        /**
 * Returns the nearest ancestor Route error, which could be a loader/action
 * error or a render error.  This is intended to be called from your
 * ErrorBoundary/errorElement to display a proper error message.
 */ function useRouteError() {
            var _state$errors;
            let error = react.useContext(RouteErrorContext);
            let state = useDataRouterState(dist_DataRouterStateHook.UseRouteError);
            let routeId = useCurrentRouteId(dist_DataRouterStateHook.UseRouteError);
            // If this was a render error, we put it in a RouteError context inside
            // of RenderErrorBoundary
            if (void 0 !== error) return error;
            // Otherwise look for errors from our data router state
            return null == (_state$errors = state.errors) ? void 0 : _state$errors[routeId];
        }
        /**
 * Returns the happy-path data from the nearest ancestor `<Await />` value
 */ function useAsyncValue() {
            let value = react.useContext(AwaitContext);
            return null == value ? void 0 : value._data;
        }
        /**
 * Returns the error from the nearest ancestor `<Await />` value
 */ function useAsyncError() {
            let value = react.useContext(AwaitContext);
            return null == value ? void 0 : value._error;
        }
        let blockerId = 0;
        /**
 * Allow the application to block navigations within the SPA and present the
 * user a confirmation dialog to confirm the navigation.  Mostly used to avoid
 * using half-filled form data.  This does not handle hard-reloads or
 * cross-origin navigations.
 */ function useBlocker(shouldBlock) {
            let { router, basename } = useDataRouterContext(dist_DataRouterHook.UseBlocker);
            let state = useDataRouterState(dist_DataRouterStateHook.UseBlocker);
            let [blockerKey, setBlockerKey] = react.useState("");
            let blockerFunction = react.useCallback((arg)=>{
                if ("function" != typeof shouldBlock) return !!shouldBlock;
                if ("/" === basename) return shouldBlock(arg);
                // If they provided us a function and we've got an active basename, strip
                // it from the locations we expose to the user to match the behavior of
                // useLocation
                let { currentLocation, nextLocation, historyAction } = arg;
                return shouldBlock({
                    currentLocation: dist_extends({}, currentLocation, {
                        pathname: stripBasename(currentLocation.pathname, basename) || currentLocation.pathname
                    }),
                    nextLocation: dist_extends({}, nextLocation, {
                        pathname: stripBasename(nextLocation.pathname, basename) || nextLocation.pathname
                    }),
                    historyAction
                });
            }, [
                basename,
                shouldBlock
            ]);
            // This effect is in charge of blocker key assignment and deletion (which is
            // tightly coupled to the key)
            react.useEffect(()=>{
                let key = String(++blockerId);
                setBlockerKey(key);
                return ()=>router.deleteBlocker(key);
            }, [
                router
            ]);
            // This effect handles assigning the blockerFunction.  This is to handle
            // unstable blocker function identities, and happens only after the prior
            // effect so we don't get an orphaned blockerFunction in the router with a
            // key of "".  Until then we just have the IDLE_BLOCKER.
            react.useEffect(()=>{
                if ("" !== blockerKey) router.getBlocker(blockerKey, blockerFunction);
            }, [
                router,
                blockerKey,
                blockerFunction
            ]);
            // Prefer the blocker from `state` not `router.state` since DataRouterContext
            // is memoized so this ensures we update on blocker state updates
            return blockerKey && state.blockers.has(blockerKey) ? state.blockers.get(blockerKey) : IDLE_BLOCKER;
        }
        /**
 * Stable version of useNavigate that is used when we are in the context of
 * a RouterProvider.
 */ function useNavigateStable() {
            let { router } = useDataRouterContext(dist_DataRouterHook.UseNavigateStable);
            let id = useCurrentRouteId(dist_DataRouterStateHook.UseNavigateStable);
            let activeRef = react.useRef(false);
            useIsomorphicLayoutEffect(()=>{
                activeRef.current = true;
            });
            let navigate = react.useCallback(function(to, options) {
                if (void 0 === options) options = {};
                // Short circuit here since if this happens on first render the navigate
                // is useless because we haven't wired up our router subscriber yet
                if (!activeRef.current) return;
                if ("number" == typeof to) router.navigate(to);
                else router.navigate(to, dist_extends({
                    fromRouteId: id
                }, options));
            }, [
                router,
                id
            ]);
            return navigate;
        }
        const alreadyWarned$1 = {};
        function warningOnce(key, cond, message) {
            if (!cond && !alreadyWarned$1[key]) alreadyWarned$1[key] = true;
        }
        const alreadyWarned = {};
        function warnOnce(key, message) {
            if (!alreadyWarned[message]) {
                alreadyWarned[message] = true;
                console.warn(message);
            }
        }
        const logDeprecation = (flag, msg, link)=>warnOnce(flag, "\u26A0\uFE0F React Router Future Flag Warning: " + msg + ". " + ("You can use the `" + flag) + "` future flag to opt-in early. " + ("For more information, see " + link) + ".");
        function logV6DeprecationWarnings(renderFuture, routerFuture) {
            if (!(null != renderFuture && renderFuture.v7_startTransition)) logDeprecation("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition");
            if (!(null != renderFuture && renderFuture.v7_relativeSplatPath) && (!routerFuture || !routerFuture.v7_relativeSplatPath)) logDeprecation("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
            if (routerFuture) {
                if (!routerFuture.v7_fetcherPersist) logDeprecation("v7_fetcherPersist", "The persistence behavior of fetchers is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist");
                if (!routerFuture.v7_normalizeFormMethod) logDeprecation("v7_normalizeFormMethod", "Casing of `formMethod` fields is being normalized to uppercase in v7", "https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod");
                if (!routerFuture.v7_partialHydration) logDeprecation("v7_partialHydration", "`RouterProvider` hydration behavior is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_partialhydration");
                if (!routerFuture.v7_skipActionErrorRevalidation) logDeprecation("v7_skipActionErrorRevalidation", "The revalidation behavior after 4xx/5xx `action` responses is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation");
            }
        }
        /**
  Webpack + React 17 fails to compile on any of the following because webpack
  complains that `startTransition` doesn't exist in `React`:
  * import { startTransition } from "react"
  * import * as React from from "react";
    "startTransition" in React ? React.startTransition(() => setState()) : setState()
  * import * as React from from "react";
    "startTransition" in React ? React["startTransition"](() => setState()) : setState()

  Moving it to a constant such as the following solves the Webpack/React 17 issue:
  * import * as React from from "react";
    const START_TRANSITION = "startTransition";
    START_TRANSITION in React ? React[START_TRANSITION](() => setState()) : setState()

  However, that introduces webpack/terser minification issues in production builds
  in React 18 where minification/obfuscation ends up removing the call of
  React.startTransition entirely from the first half of the ternary.  Grabbing
  this exported reference once up front resolves that issue.

  See https://github.com/remix-run/react-router/issues/10579
*/ const START_TRANSITION = "startTransition";
        const startTransitionImpl = react_namespaceObject[START_TRANSITION];
        /**
 * Given a Remix Router instance, render the appropriate UI
 */ function RouterProvider(_ref) {
            let { fallbackElement, router, future } = _ref;
            let [state, setStateImpl] = React.useState(router.state);
            let { v7_startTransition } = future || {};
            let setState = React.useCallback((newState)=>{
                if (v7_startTransition && startTransitionImpl) startTransitionImpl(()=>setStateImpl(newState));
                else setStateImpl(newState);
            }, [
                setStateImpl,
                v7_startTransition
            ]);
            // Need to use a layout effect here so we are subscribed early enough to
            // pick up on any render-driven redirects/navigations (useEffect/<Navigate>)
            React.useLayoutEffect(()=>router.subscribe(setState), [
                router,
                setState
            ]);
            React.useEffect(()=>{
            // Only log this once on initial mount
            // eslint-disable-next-line react-hooks/exhaustive-deps
            }, []);
            let navigator1 = React.useMemo(()=>({
                    createHref: router.createHref,
                    encodeLocation: router.encodeLocation,
                    go: (n)=>router.navigate(n),
                    push: (to, state, opts)=>router.navigate(to, {
                            state,
                            preventScrollReset: null == opts ? void 0 : opts.preventScrollReset
                        }),
                    replace: (to, state, opts)=>router.navigate(to, {
                            replace: true,
                            state,
                            preventScrollReset: null == opts ? void 0 : opts.preventScrollReset
                        })
                }), [
                router
            ]);
            let basename = router.basename || "/";
            let dataRouterContext = React.useMemo(()=>({
                    router,
                    navigator: navigator1,
                    static: false,
                    basename
                }), [
                router,
                navigator1,
                basename
            ]);
            React.useEffect(()=>logV6DeprecationWarnings(future, router.future), [
                router,
                future
            ]);
            // The fragment and {null} here are important!  We need them to keep React 18's
            // useId happy when we are server-rendering since we may have a <script> here
            // containing the hydrated server-side staticContext (from StaticRouterProvider).
            // useId relies on the component tree structure to generate deterministic id's
            // so we need to ensure it remains the same on the client even though
            // we don't need the <script> tag
            return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(DataRouterContext.Provider, {
                value: dataRouterContext
            }, /*#__PURE__*/ React.createElement(DataRouterStateContext.Provider, {
                value: state
            }, /*#__PURE__*/ React.createElement(Router, {
                basename: basename,
                location: state.location,
                navigationType: state.historyAction,
                navigator: navigator1,
                future: {
                    v7_relativeSplatPath: router.future.v7_relativeSplatPath
                }
            }, state.initialized || router.future.v7_partialHydration ? /*#__PURE__*/ React.createElement(DataRoutes, {
                routes: router.routes,
                future: router.future,
                state: state
            }) : fallbackElement))), null);
        }
        function DataRoutes(_ref2) {
            let { routes, future, state } = _ref2;
            return useRoutesImpl(routes, void 0, state, future);
        }
        /**
 * A `<Router>` that stores all entries in memory.
 *
 * @see https://reactrouter.com/v6/router-components/memory-router
 */ function MemoryRouter(_ref3) {
            let { basename, children, initialEntries, initialIndex, future } = _ref3;
            let historyRef = react.useRef();
            if (null == historyRef.current) historyRef.current = createMemoryHistory({
                initialEntries,
                initialIndex,
                v5Compat: true
            });
            let history = historyRef.current;
            let [state, setStateImpl] = react.useState({
                action: history.action,
                location: history.location
            });
            let { v7_startTransition } = future || {};
            let setState = react.useCallback((newState)=>{
                v7_startTransition && startTransitionImpl ? startTransitionImpl(()=>setStateImpl(newState)) : setStateImpl(newState);
            }, [
                setStateImpl,
                v7_startTransition
            ]);
            react.useLayoutEffect(()=>history.listen(setState), [
                history,
                setState
            ]);
            react.useEffect(()=>logV6DeprecationWarnings(future), [
                future
            ]);
            return /*#__PURE__*/ react.createElement(Router, {
                basename: basename,
                children: children,
                location: state.location,
                navigationType: state.action,
                navigator: history,
                future: future
            });
        }
        /**
 * Changes the current location.
 *
 * Note: This API is mostly useful in React.Component subclasses that are not
 * able to use hooks. In functional components, we recommend you use the
 * `useNavigate` hook instead.
 *
 * @see https://reactrouter.com/v6/components/navigate
 */ function Navigate(_ref4) {
            let { to, replace, state, relative } = _ref4;
            useInRouterContext() || invariant(false);
            let { future, static: isStatic } = react.useContext(NavigationContext);
            let { matches } = react.useContext(RouteContext);
            let { pathname: locationPathname } = useLocation();
            let navigate = useNavigate();
            // Resolve the path outside of the effect so that when effects run twice in
            // StrictMode they navigate to the same place
            let path = resolveTo(to, getResolveToMatches(matches, future.v7_relativeSplatPath), locationPathname, "path" === relative);
            let jsonPath = JSON.stringify(path);
            react.useEffect(()=>navigate(JSON.parse(jsonPath), {
                    replace,
                    state,
                    relative
                }), [
                navigate,
                jsonPath,
                relative,
                replace,
                state
            ]);
            return null;
        }
        /**
 * Renders the child route's element, if there is one.
 *
 * @see https://reactrouter.com/v6/components/outlet
 */ function Outlet(props) {
            return useOutlet(props.context);
        }
        /**
 * Declares an element that should be rendered at a certain URL path.
 *
 * @see https://reactrouter.com/v6/components/route
 */ function Route(_props) {
            invariant(false);
        }
        /**
 * Provides location context for the rest of the app.
 *
 * Note: You usually won't render a `<Router>` directly. Instead, you'll render a
 * router that is more specific to your environment such as a `<BrowserRouter>`
 * in web browsers or a `<StaticRouter>` for server rendering.
 *
 * @see https://reactrouter.com/v6/router-components/router
 */ function Router(_ref5) {
            let { basename: basenameProp = "/", children = null, location: locationProp, navigationType = router_Action.Pop, navigator: navigator1, static: staticProp = false, future } = _ref5;
            !useInRouterContext() || invariant(false);
            // Preserve trailing slashes on basename, so we can let the user control
            // the enforcement of trailing slashes throughout the app
            let basename = basenameProp.replace(/^\/*/, "/");
            let navigationContext = react.useMemo(()=>({
                    basename,
                    navigator: navigator1,
                    static: staticProp,
                    future: dist_extends({
                        v7_relativeSplatPath: false
                    }, future)
                }), [
                basename,
                future,
                navigator1,
                staticProp
            ]);
            if ("string" == typeof locationProp) locationProp = parsePath(locationProp);
            let { pathname = "/", search = "", hash = "", state = null, key = "default" } = locationProp;
            let locationContext = react.useMemo(()=>{
                let trailingPathname = stripBasename(pathname, basename);
                if (null == trailingPathname) return null;
                return {
                    location: {
                        pathname: trailingPathname,
                        search,
                        hash,
                        state,
                        key
                    },
                    navigationType
                };
            }, [
                basename,
                pathname,
                search,
                hash,
                state,
                key,
                navigationType
            ]);
            if (null == locationContext) return null;
            return /*#__PURE__*/ react.createElement(NavigationContext.Provider, {
                value: navigationContext
            }, /*#__PURE__*/ react.createElement(LocationContext.Provider, {
                children: children,
                value: locationContext
            }));
        }
        /**
 * A container for a nested tree of `<Route>` elements that renders the branch
 * that best matches the current location.
 *
 * @see https://reactrouter.com/v6/components/routes
 */ function Routes(_ref6) {
            let { children, location } = _ref6;
            return useRoutes(createRoutesFromChildren(children), location);
        }
        /**
 * Component to use for rendering lazily loaded data from returning defer()
 * in a loader function
 */ function Await(_ref7) {
            let { children, errorElement, resolve } = _ref7;
            return /*#__PURE__*/ react.createElement(AwaitErrorBoundary, {
                resolve: resolve,
                errorElement: errorElement
            }, /*#__PURE__*/ react.createElement(ResolveAwait, null, children));
        }
        var dist_AwaitRenderStatus = /*#__PURE__*/ function(AwaitRenderStatus) {
            AwaitRenderStatus[AwaitRenderStatus["pending"] = 0] = "pending";
            AwaitRenderStatus[AwaitRenderStatus["success"] = 1] = "success";
            AwaitRenderStatus[AwaitRenderStatus["error"] = 2] = "error";
            return AwaitRenderStatus;
        }(dist_AwaitRenderStatus || {});
        const neverSettledPromise = new Promise(()=>{});
        class AwaitErrorBoundary extends react.Component {
            constructor(props){
                super(props);
                this.state = {
                    error: null
                };
            }
            static getDerivedStateFromError(error) {
                return {
                    error
                };
            }
            componentDidCatch(error, errorInfo) {
                console.error("<Await> caught the following error during render", error, errorInfo);
            }
            render() {
                let { children, errorElement, resolve } = this.props;
                let promise = null;
                let status = dist_AwaitRenderStatus.pending;
                if (resolve instanceof Promise) {
                    if (this.state.error) {
                        // Caught a render error, provide it as a rejected promise
                        status = dist_AwaitRenderStatus.error;
                        let renderError = this.state.error;
                        promise = Promise.reject().catch(()=>{}); // Avoid unhandled rejection warnings
                        Object.defineProperty(promise, "_tracked", {
                            get: ()=>true
                        });
                        Object.defineProperty(promise, "_error", {
                            get: ()=>renderError
                        });
                    } else if (resolve._tracked) {
                        // Already tracked promise - check contents
                        promise = resolve;
                        status = "_error" in promise ? dist_AwaitRenderStatus.error : "_data" in promise ? dist_AwaitRenderStatus.success : dist_AwaitRenderStatus.pending;
                    } else {
                        // Raw (untracked) promise - track it
                        status = dist_AwaitRenderStatus.pending;
                        Object.defineProperty(resolve, "_tracked", {
                            get: ()=>true
                        });
                        promise = resolve.then((data)=>Object.defineProperty(resolve, "_data", {
                                get: ()=>data
                            }), (error)=>Object.defineProperty(resolve, "_error", {
                                get: ()=>error
                            }));
                    }
                } else {
                    // Didn't get a promise - provide as a resolved promise
                    status = dist_AwaitRenderStatus.success;
                    promise = Promise.resolve();
                    Object.defineProperty(promise, "_tracked", {
                        get: ()=>true
                    });
                    Object.defineProperty(promise, "_data", {
                        get: ()=>resolve
                    });
                }
                if (status === dist_AwaitRenderStatus.error && promise._error instanceof AbortedDeferredError) // Freeze the UI by throwing a never resolved promise
                throw neverSettledPromise;
                if (status === dist_AwaitRenderStatus.error && !errorElement) // No errorElement, throw to the nearest route-level error boundary
                throw promise._error;
                if (status === dist_AwaitRenderStatus.error) // Render via our errorElement
                return /*#__PURE__*/ react.createElement(AwaitContext.Provider, {
                    value: promise,
                    children: errorElement
                });
                if (status === dist_AwaitRenderStatus.success) // Render children with resolved value
                return /*#__PURE__*/ react.createElement(AwaitContext.Provider, {
                    value: promise,
                    children: children
                });
                // Throw to the suspense boundary
                throw promise;
            }
        }
        /**
 * @private
 * Indirection to leverage useAsyncValue for a render-prop API on `<Await>`
 */ function ResolveAwait(_ref8) {
            let { children } = _ref8;
            let data = useAsyncValue();
            let toRender = "function" == typeof children ? children(data) : children;
            return /*#__PURE__*/ react.createElement(react.Fragment, null, toRender);
        }
        ///////////////////////////////////////////////////////////////////////////////
        // UTILS
        ///////////////////////////////////////////////////////////////////////////////
        /**
 * Creates a route config from a React "children" object, which is usually
 * either a `<Route>` element or an array of them. Used internally by
 * `<Routes>` to create a route config from its children.
 *
 * @see https://reactrouter.com/v6/utils/create-routes-from-children
 */ function createRoutesFromChildren(children, parentPath) {
            if (void 0 === parentPath) parentPath = [];
            let routes = [];
            react.Children.forEach(children, (element, index)=>{
                if (!/*#__PURE__*/ react.isValidElement(element)) // Ignore non-elements. This allows people to more easily inline
                // conditionals in their route config.
                return;
                let treePath = [
                    ...parentPath,
                    index
                ];
                if (element.type === react.Fragment) {
                    // Transparently support React.Fragment and its children.
                    routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
                    return;
                }
                element.type !== Route && invariant(false);
                !element.props.index || !element.props.children || invariant(false);
                let route = {
                    id: element.props.id || treePath.join("-"),
                    caseSensitive: element.props.caseSensitive,
                    element: element.props.element,
                    Component: element.props.Component,
                    index: element.props.index,
                    path: element.props.path,
                    loader: element.props.loader,
                    action: element.props.action,
                    errorElement: element.props.errorElement,
                    ErrorBoundary: element.props.ErrorBoundary,
                    hasErrorBoundary: null != element.props.ErrorBoundary || null != element.props.errorElement,
                    shouldRevalidate: element.props.shouldRevalidate,
                    handle: element.props.handle,
                    lazy: element.props.lazy
                };
                if (element.props.children) route.children = createRoutesFromChildren(element.props.children, treePath);
                routes.push(route);
            });
            return routes;
        }
        /**
 * Renders the result of `matchRoutes()` into a React element.
 */ function renderMatches(matches) {
            return _renderMatches(matches);
        }
        function dist_mapRouteProperties(route) {
            let updates = {
                // Note: this check also occurs in createRoutesFromChildren so update
                // there if you change this -- please and thank you!
                hasErrorBoundary: null != route.ErrorBoundary || null != route.errorElement
            };
            if (route.Component) Object.assign(updates, {
                element: /*#__PURE__*/ react.createElement(route.Component),
                Component: void 0
            });
            if (route.HydrateFallback) Object.assign(updates, {
                hydrateFallbackElement: /*#__PURE__*/ react.createElement(route.HydrateFallback),
                HydrateFallback: void 0
            });
            if (route.ErrorBoundary) Object.assign(updates, {
                errorElement: /*#__PURE__*/ react.createElement(route.ErrorBoundary),
                ErrorBoundary: void 0
            });
            return updates;
        }
        function createMemoryRouter(routes, opts) {
            return createRouter({
                basename: null == opts ? void 0 : opts.basename,
                future: dist_extends({}, null == opts ? void 0 : opts.future, {
                    v7_prependBasename: true
                }),
                history: createMemoryHistory({
                    initialEntries: null == opts ? void 0 : opts.initialEntries,
                    initialIndex: null == opts ? void 0 : opts.initialIndex
                }),
                hydrationData: null == opts ? void 0 : opts.hydrationData,
                routes,
                mapRouteProperties: dist_mapRouteProperties,
                dataStrategy: null == opts ? void 0 : opts.dataStrategy,
                patchRoutesOnNavigation: null == opts ? void 0 : opts.patchRoutesOnNavigation
            }).initialize();
        }
        //# sourceMappingURL=index.js.map
        // EXTERNAL MODULE: ./node_modules/.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom/index.js
        var react_dom = __webpack_require__("./node_modules/.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom/index.js");
        var react_dom_namespaceObject = /*#__PURE__*/ __webpack_require__.t(react_dom, 2);
        /**
 * React Router DOM v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function react_router_dom_dist_extends() {
            react_router_dom_dist_extends = Object.assign ? Object.assign.bind() : function(target) {
                for(var i = 1; i < arguments.length; i++){
                    var source = arguments[i];
                    for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
                }
                return target;
            };
            return react_router_dom_dist_extends.apply(this, arguments);
        }
        function _objectWithoutPropertiesLoose(source, excluded) {
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
        const defaultMethod = "get";
        const defaultEncType = "application/x-www-form-urlencoded";
        function isHtmlElement(object) {
            return null != object && "string" == typeof object.tagName;
        }
        function isButtonElement(object) {
            return isHtmlElement(object) && "button" === object.tagName.toLowerCase();
        }
        function isFormElement(object) {
            return isHtmlElement(object) && "form" === object.tagName.toLowerCase();
        }
        function isInputElement(object) {
            return isHtmlElement(object) && "input" === object.tagName.toLowerCase();
        }
        function isModifiedEvent(event) {
            return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
        }
        function shouldProcessLinkClick(event, target) {
            return 0 === event.button && // Ignore everything but left clicks
            (!target || "_self" === target) && // Let browser handle "target=_blank" etc.
            !isModifiedEvent(event) // Ignore clicks with modifier keys
            ;
        }
        /**
 * Creates a URLSearchParams object using the given initializer.
 *
 * This is identical to `new URLSearchParams(init)` except it also
 * supports arrays as values in the object form of the initializer
 * instead of just strings. This is convenient when you need multiple
 * values for a given key, but don't want to use an array initializer.
 *
 * For example, instead of:
 *
 *   let searchParams = new URLSearchParams([
 *     ['sort', 'name'],
 *     ['sort', 'price']
 *   ]);
 *
 * you can do:
 *
 *   let searchParams = createSearchParams({
 *     sort: ['name', 'price']
 *   });
 */ function createSearchParams(init) {
            if (void 0 === init) init = "";
            return new URLSearchParams("string" == typeof init || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key)=>{
                let value = init[key];
                return memo.concat(Array.isArray(value) ? value.map((v)=>[
                        key,
                        v
                    ]) : [
                    [
                        key,
                        value
                    ]
                ]);
            }, []));
        }
        function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
            let searchParams = createSearchParams(locationSearch);
            if (defaultSearchParams) // Use `defaultSearchParams.forEach(...)` here instead of iterating of
            // `defaultSearchParams.keys()` to work-around a bug in Firefox related to
            // web extensions. Relevant Bugzilla tickets:
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1414602
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1023984
            defaultSearchParams.forEach((_, key)=>{
                if (!searchParams.has(key)) defaultSearchParams.getAll(key).forEach((value)=>{
                    searchParams.append(key, value);
                });
            });
            return searchParams;
        }
        // One-time check for submitter support
        let _formDataSupportsSubmitter = null;
        function isFormDataSubmitterSupported() {
            if (null === _formDataSupportsSubmitter) try {
                new FormData(document.createElement("form"), // @ts-expect-error if FormData supports the submitter parameter, this will throw
                0);
                _formDataSupportsSubmitter = false;
            } catch (e) {
                _formDataSupportsSubmitter = true;
            }
            return _formDataSupportsSubmitter;
        }
        const supportedFormEncTypes = new Set([
            "application/x-www-form-urlencoded",
            "multipart/form-data",
            "text/plain"
        ]);
        function getFormEncType(encType) {
            if (null != encType && !supportedFormEncTypes.has(encType)) return null;
            return encType;
        }
        function getFormSubmissionInfo(target, basename) {
            let method;
            let action;
            let encType;
            let formData;
            let body;
            if (isFormElement(target)) {
                // When grabbing the action from the element, it will have had the basename
                // prefixed to ensure non-JS scenarios work, so strip it since we'll
                // re-prefix in the router
                let attr = target.getAttribute("action");
                action = attr ? stripBasename(attr, basename) : null;
                method = target.getAttribute("method") || defaultMethod;
                encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
                formData = new FormData(target);
            } else if (isButtonElement(target) || isInputElement(target) && ("submit" === target.type || "image" === target.type)) {
                let form = target.form;
                if (null == form) throw new Error("Cannot submit a <button> or <input type=\"submit\"> without a <form>");
                // <button>/<input type="submit"> may override attributes of <form>
                // When grabbing the action from the element, it will have had the basename
                // prefixed to ensure non-JS scenarios work, so strip it since we'll
                // re-prefix in the router
                let attr = target.getAttribute("formaction") || form.getAttribute("action");
                action = attr ? stripBasename(attr, basename) : null;
                method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
                encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
                // Build a FormData object populated from a form and submitter
                formData = new FormData(form, target);
                // If this browser doesn't support the `FormData(el, submitter)` format,
                // then tack on the submitter value at the end.  This is a lightweight
                // solution that is not 100% spec compliant.  For complete support in older
                // browsers, consider using the `formdata-submitter-polyfill` package
                if (!isFormDataSubmitterSupported()) {
                    let { name: name1, type, value } = target;
                    if ("image" === type) {
                        let prefix = name1 ? name1 + "." : "";
                        formData.append(prefix + "x", "0");
                        formData.append(prefix + "y", "0");
                    } else if (name1) formData.append(name1, value);
                }
            } else if (isHtmlElement(target)) throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
            else {
                method = defaultMethod;
                action = null;
                encType = defaultEncType;
                body = target;
            }
            // Send body for <Form encType="text/plain" so we encode it into text
            if (formData && "text/plain" === encType) {
                body = formData;
                formData = void 0;
            }
            return {
                action,
                method: method.toLowerCase(),
                encType,
                formData,
                body
            };
        }
        const _excluded = [
            "onClick",
            "relative",
            "reloadDocument",
            "replace",
            "state",
            "target",
            "to",
            "preventScrollReset",
            "viewTransition"
        ], _excluded2 = [
            "aria-current",
            "caseSensitive",
            "className",
            "end",
            "style",
            "to",
            "viewTransition",
            "children"
        ], _excluded3 = [
            "fetcherKey",
            "navigate",
            "reloadDocument",
            "replace",
            "state",
            "method",
            "action",
            "onSubmit",
            "relative",
            "preventScrollReset",
            "viewTransition"
        ];
        // HEY YOU! DON'T TOUCH THIS VARIABLE!
        //
        // It is replaced with the proper version at build time via a babel plugin in
        // the rollup config.
        //
        // Export a global property onto the window for React Router detection by the
        // Core Web Vitals Technology Report.  This way they can configure the `wappalyzer`
        // to detect and properly classify live websites as being built with React Router:
        // https://github.com/HTTPArchive/wappalyzer/blob/main/src/technologies/r.json
        const REACT_ROUTER_VERSION = "6";
        try {
            window.__reactRouterVersion = REACT_ROUTER_VERSION;
        } catch (e) {
        // no-op
        }
        function createBrowserRouter(routes, opts) {
            return createRouter({
                basename: null == opts ? void 0 : opts.basename,
                future: react_router_dom_dist_extends({}, null == opts ? void 0 : opts.future, {
                    v7_prependBasename: true
                }),
                history: createBrowserHistory({
                    window: null == opts ? void 0 : opts.window
                }),
                hydrationData: (null == opts ? void 0 : opts.hydrationData) || parseHydrationData(),
                routes,
                mapRouteProperties: dist_mapRouteProperties,
                dataStrategy: null == opts ? void 0 : opts.dataStrategy,
                patchRoutesOnNavigation: null == opts ? void 0 : opts.patchRoutesOnNavigation,
                window: null == opts ? void 0 : opts.window
            }).initialize();
        }
        function createHashRouter(routes, opts) {
            return createRouter({
                basename: null == opts ? void 0 : opts.basename,
                future: react_router_dom_dist_extends({}, null == opts ? void 0 : opts.future, {
                    v7_prependBasename: true
                }),
                history: createHashHistory({
                    window: null == opts ? void 0 : opts.window
                }),
                hydrationData: (null == opts ? void 0 : opts.hydrationData) || parseHydrationData(),
                routes,
                mapRouteProperties: dist_mapRouteProperties,
                dataStrategy: null == opts ? void 0 : opts.dataStrategy,
                patchRoutesOnNavigation: null == opts ? void 0 : opts.patchRoutesOnNavigation,
                window: null == opts ? void 0 : opts.window
            }).initialize();
        }
        function parseHydrationData() {
            var _window;
            let state = null == (_window = window) ? void 0 : _window.__staticRouterHydrationData;
            if (state && state.errors) state = react_router_dom_dist_extends({}, state, {
                errors: deserializeErrors(state.errors)
            });
            return state;
        }
        function deserializeErrors(errors) {
            if (!errors) return null;
            let entries = Object.entries(errors);
            let serialized = {};
            for (let [key, val] of entries)// Hey you!  If you change this, please change the corresponding logic in
            // serializeErrors in react-router-dom/server.tsx :)
            if (val && "RouteErrorResponse" === val.__type) serialized[key] = new ErrorResponseImpl(val.status, val.statusText, val.data, true === val.internal);
            else if (val && "Error" === val.__type) {
                // Attempt to reconstruct the right type of Error (i.e., ReferenceError)
                if (val.__subType) {
                    let ErrorConstructor = window[val.__subType];
                    if ("function" == typeof ErrorConstructor) try {
                        // @ts-expect-error
                        let error = new ErrorConstructor(val.message);
                        // Wipe away the client-side stack trace.  Nothing to fill it in with
                        // because we don't serialize SSR stack traces for security reasons
                        error.stack = "";
                        serialized[key] = error;
                    } catch (e) {
                    // no-op - fall through and create a normal Error
                    }
                }
                if (null == serialized[key]) {
                    let error = new Error(val.message);
                    // Wipe away the client-side stack trace.  Nothing to fill it in with
                    // because we don't serialize SSR stack traces for security reasons
                    error.stack = "";
                    serialized[key] = error;
                }
            } else serialized[key] = val;
            return serialized;
        }
        const ViewTransitionContext = /*#__PURE__*/ react.createContext({
            isTransitioning: false
        });
        const FetchersContext = /*#__PURE__*/ react.createContext(new Map());
        //#endregion
        ////////////////////////////////////////////////////////////////////////////////
        //#region Components
        ////////////////////////////////////////////////////////////////////////////////
        /**
  Webpack + React 17 fails to compile on any of the following because webpack
  complains that `startTransition` doesn't exist in `React`:
  * import { startTransition } from "react"
  * import * as React from from "react";
    "startTransition" in React ? React.startTransition(() => setState()) : setState()
  * import * as React from from "react";
    "startTransition" in React ? React["startTransition"](() => setState()) : setState()

  Moving it to a constant such as the following solves the Webpack/React 17 issue:
  * import * as React from from "react";
    const START_TRANSITION = "startTransition";
    START_TRANSITION in React ? React[START_TRANSITION](() => setState()) : setState()

  However, that introduces webpack/terser minification issues in production builds
  in React 18 where minification/obfuscation ends up removing the call of
  React.startTransition entirely from the first half of the ternary.  Grabbing
  this exported reference once up front resolves that issue.

  See https://github.com/remix-run/react-router/issues/10579
*/ const dist_START_TRANSITION = "startTransition";
        const dist_startTransitionImpl = react_namespaceObject[dist_START_TRANSITION];
        const FLUSH_SYNC = "flushSync";
        const flushSyncImpl = react_dom_namespaceObject[FLUSH_SYNC];
        const USE_ID = "useId";
        const useIdImpl = react_namespaceObject[USE_ID];
        function startTransitionSafe(cb) {
            if (dist_startTransitionImpl) dist_startTransitionImpl(cb);
            else cb();
        }
        function flushSyncSafe(cb) {
            if (flushSyncImpl) flushSyncImpl(cb);
            else cb();
        }
        class Deferred {
            constructor(){
                this.status = "pending";
                this.promise = new Promise((resolve, reject)=>{
                    this.resolve = (value)=>{
                        if ("pending" === this.status) {
                            this.status = "resolved";
                            resolve(value);
                        }
                    };
                    this.reject = (reason)=>{
                        if ("pending" === this.status) {
                            this.status = "rejected";
                            reject(reason);
                        }
                    };
                });
            }
        }
        /**
 * Given a Remix Router instance, render the appropriate UI
 */ function dist_RouterProvider(_ref) {
            let { fallbackElement, router, future } = _ref;
            let [state, setStateImpl] = react.useState(router.state);
            let [pendingState, setPendingState] = react.useState();
            let [vtContext, setVtContext] = react.useState({
                isTransitioning: false
            });
            let [renderDfd, setRenderDfd] = react.useState();
            let [transition, setTransition] = react.useState();
            let [interruption, setInterruption] = react.useState();
            let fetcherData = react.useRef(new Map());
            let { v7_startTransition } = future || {};
            let optInStartTransition = react.useCallback((cb)=>{
                if (v7_startTransition) startTransitionSafe(cb);
                else cb();
            }, [
                v7_startTransition
            ]);
            let setState = react.useCallback((newState, _ref2)=>{
                let { deletedFetchers, flushSync: flushSync, viewTransitionOpts: viewTransitionOpts } = _ref2;
                deletedFetchers.forEach((key)=>fetcherData.current.delete(key));
                newState.fetchers.forEach((fetcher, key)=>{
                    if (void 0 !== fetcher.data) fetcherData.current.set(key, fetcher.data);
                });
                let isViewTransitionUnavailable = null == router.window || null == router.window.document || "function" != typeof router.window.document.startViewTransition;
                // If this isn't a view transition or it's not available in this browser,
                // just update and be done with it
                if (!viewTransitionOpts || isViewTransitionUnavailable) {
                    if (flushSync) flushSyncSafe(()=>setStateImpl(newState));
                    else optInStartTransition(()=>setStateImpl(newState));
                    return;
                }
                // flushSync + startViewTransition
                if (flushSync) {
                    // Flush through the context to mark DOM elements as transition=ing
                    flushSyncSafe(()=>{
                        // Cancel any pending transitions
                        if (transition) {
                            renderDfd && renderDfd.resolve();
                            transition.skipTransition();
                        }
                        setVtContext({
                            isTransitioning: true,
                            flushSync: true,
                            currentLocation: viewTransitionOpts.currentLocation,
                            nextLocation: viewTransitionOpts.nextLocation
                        });
                    });
                    // Update the DOM
                    let t = router.window.document.startViewTransition(()=>{
                        flushSyncSafe(()=>setStateImpl(newState));
                    });
                    // Clean up after the animation completes
                    t.finished.finally(()=>{
                        flushSyncSafe(()=>{
                            setRenderDfd(void 0);
                            setTransition(void 0);
                            setPendingState(void 0);
                            setVtContext({
                                isTransitioning: false
                            });
                        });
                    });
                    flushSyncSafe(()=>setTransition(t));
                    return;
                }
                // startTransition + startViewTransition
                if (transition) {
                    // Interrupting an in-progress transition, cancel and let everything flush
                    // out, and then kick off a new transition from the interruption state
                    renderDfd && renderDfd.resolve();
                    transition.skipTransition();
                    setInterruption({
                        state: newState,
                        currentLocation: viewTransitionOpts.currentLocation,
                        nextLocation: viewTransitionOpts.nextLocation
                    });
                } else {
                    // Completed navigation update with opted-in view transitions, let 'er rip
                    setPendingState(newState);
                    setVtContext({
                        isTransitioning: true,
                        flushSync: false,
                        currentLocation: viewTransitionOpts.currentLocation,
                        nextLocation: viewTransitionOpts.nextLocation
                    });
                }
            }, [
                router.window,
                transition,
                renderDfd,
                fetcherData,
                optInStartTransition
            ]);
            // Need to use a layout effect here so we are subscribed early enough to
            // pick up on any render-driven redirects/navigations (useEffect/<Navigate>)
            react.useLayoutEffect(()=>router.subscribe(setState), [
                router,
                setState
            ]);
            // When we start a view transition, create a Deferred we can use for the
            // eventual "completed" render
            react.useEffect(()=>{
                if (vtContext.isTransitioning && !vtContext.flushSync) setRenderDfd(new Deferred());
            }, [
                vtContext
            ]);
            // Once the deferred is created, kick off startViewTransition() to update the
            // DOM and then wait on the Deferred to resolve (indicating the DOM update has
            // happened)
            react.useEffect(()=>{
                if (renderDfd && pendingState && router.window) {
                    let newState = pendingState;
                    let renderPromise = renderDfd.promise;
                    let transition = router.window.document.startViewTransition(async ()=>{
                        optInStartTransition(()=>setStateImpl(newState));
                        await renderPromise;
                    });
                    transition.finished.finally(()=>{
                        setRenderDfd(void 0);
                        setTransition(void 0);
                        setPendingState(void 0);
                        setVtContext({
                            isTransitioning: false
                        });
                    });
                    setTransition(transition);
                }
            }, [
                optInStartTransition,
                pendingState,
                renderDfd,
                router.window
            ]);
            // When the new location finally renders and is committed to the DOM, this
            // effect will run to resolve the transition
            react.useEffect(()=>{
                if (renderDfd && pendingState && state.location.key === pendingState.location.key) renderDfd.resolve();
            }, [
                renderDfd,
                transition,
                state.location,
                pendingState
            ]);
            // If we get interrupted with a new navigation during a transition, we skip
            // the active transition, let it cleanup, then kick it off again here
            react.useEffect(()=>{
                if (!vtContext.isTransitioning && interruption) {
                    setPendingState(interruption.state);
                    setVtContext({
                        isTransitioning: true,
                        flushSync: false,
                        currentLocation: interruption.currentLocation,
                        nextLocation: interruption.nextLocation
                    });
                    setInterruption(void 0);
                }
            }, [
                vtContext.isTransitioning,
                interruption
            ]);
            react.useEffect(()=>{
            // Only log this once on initial mount
            // eslint-disable-next-line react-hooks/exhaustive-deps
            }, []);
            let navigator1 = react.useMemo(()=>({
                    createHref: router.createHref,
                    encodeLocation: router.encodeLocation,
                    go: (n)=>router.navigate(n),
                    push: (to, state, opts)=>router.navigate(to, {
                            state,
                            preventScrollReset: null == opts ? void 0 : opts.preventScrollReset
                        }),
                    replace: (to, state, opts)=>router.navigate(to, {
                            replace: true,
                            state,
                            preventScrollReset: null == opts ? void 0 : opts.preventScrollReset
                        })
                }), [
                router
            ]);
            let basename = router.basename || "/";
            let dataRouterContext = react.useMemo(()=>({
                    router,
                    navigator: navigator1,
                    static: false,
                    basename
                }), [
                router,
                navigator1,
                basename
            ]);
            let routerFuture = react.useMemo(()=>({
                    v7_relativeSplatPath: router.future.v7_relativeSplatPath
                }), [
                router.future.v7_relativeSplatPath
            ]);
            react.useEffect(()=>logV6DeprecationWarnings(future, router.future), [
                future,
                router.future
            ]);
            // The fragment and {null} here are important!  We need them to keep React 18's
            // useId happy when we are server-rendering since we may have a <script> here
            // containing the hydrated server-side staticContext (from StaticRouterProvider).
            // useId relies on the component tree structure to generate deterministic id's
            // so we need to ensure it remains the same on the client even though
            // we don't need the <script> tag
            return /*#__PURE__*/ react.createElement(react.Fragment, null, /*#__PURE__*/ react.createElement(DataRouterContext.Provider, {
                value: dataRouterContext
            }, /*#__PURE__*/ react.createElement(DataRouterStateContext.Provider, {
                value: state
            }, /*#__PURE__*/ react.createElement(FetchersContext.Provider, {
                value: fetcherData.current
            }, /*#__PURE__*/ react.createElement(ViewTransitionContext.Provider, {
                value: vtContext
            }, /*#__PURE__*/ react.createElement(Router, {
                basename: basename,
                location: state.location,
                navigationType: state.historyAction,
                navigator: navigator1,
                future: routerFuture
            }, state.initialized || router.future.v7_partialHydration ? /*#__PURE__*/ react.createElement(MemoizedDataRoutes, {
                routes: router.routes,
                future: router.future,
                state: state
            }) : fallbackElement))))), null);
        }
        // Memoize to avoid re-renders when updating `ViewTransitionContext`
        const MemoizedDataRoutes = /*#__PURE__*/ react.memo(dist_DataRoutes);
        function dist_DataRoutes(_ref3) {
            let { routes, future, state } = _ref3;
            return useRoutesImpl(routes, void 0, state, future);
        }
        /**
 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
 */ function BrowserRouter(_ref4) {
            let { basename, children, future, window: window1 } = _ref4;
            let historyRef = react.useRef();
            if (null == historyRef.current) historyRef.current = createBrowserHistory({
                window: window1,
                v5Compat: true
            });
            let history = historyRef.current;
            let [state, setStateImpl] = react.useState({
                action: history.action,
                location: history.location
            });
            let { v7_startTransition } = future || {};
            let setState = react.useCallback((newState)=>{
                v7_startTransition && dist_startTransitionImpl ? dist_startTransitionImpl(()=>setStateImpl(newState)) : setStateImpl(newState);
            }, [
                setStateImpl,
                v7_startTransition
            ]);
            react.useLayoutEffect(()=>history.listen(setState), [
                history,
                setState
            ]);
            react.useEffect(()=>logV6DeprecationWarnings(future), [
                future
            ]);
            return /*#__PURE__*/ react.createElement(Router, {
                basename: basename,
                children: children,
                location: state.location,
                navigationType: state.action,
                navigator: history,
                future: future
            });
        }
        /**
 * A `<Router>` for use in web browsers. Stores the location in the hash
 * portion of the URL so it is not sent to the server.
 */ function HashRouter(_ref5) {
            let { basename, children, future, window: window1 } = _ref5;
            let historyRef = react.useRef();
            if (null == historyRef.current) historyRef.current = createHashHistory({
                window: window1,
                v5Compat: true
            });
            let history = historyRef.current;
            let [state, setStateImpl] = react.useState({
                action: history.action,
                location: history.location
            });
            let { v7_startTransition } = future || {};
            let setState = react.useCallback((newState)=>{
                v7_startTransition && dist_startTransitionImpl ? dist_startTransitionImpl(()=>setStateImpl(newState)) : setStateImpl(newState);
            }, [
                setStateImpl,
                v7_startTransition
            ]);
            react.useLayoutEffect(()=>history.listen(setState), [
                history,
                setState
            ]);
            react.useEffect(()=>logV6DeprecationWarnings(future), [
                future
            ]);
            return /*#__PURE__*/ react.createElement(Router, {
                basename: basename,
                children: children,
                location: state.location,
                navigationType: state.action,
                navigator: history,
                future: future
            });
        }
        /**
 * A `<Router>` that accepts a pre-instantiated history object. It's important
 * to note that using your own history object is highly discouraged and may add
 * two versions of the history library to your bundles unless you use the same
 * version of the history library that React Router uses internally.
 */ function HistoryRouter(_ref6) {
            let { basename, children, future, history } = _ref6;
            let [state, setStateImpl] = react.useState({
                action: history.action,
                location: history.location
            });
            let { v7_startTransition } = future || {};
            let setState = react.useCallback((newState)=>{
                v7_startTransition && dist_startTransitionImpl ? dist_startTransitionImpl(()=>setStateImpl(newState)) : setStateImpl(newState);
            }, [
                setStateImpl,
                v7_startTransition
            ]);
            react.useLayoutEffect(()=>history.listen(setState), [
                history,
                setState
            ]);
            react.useEffect(()=>logV6DeprecationWarnings(future), [
                future
            ]);
            return /*#__PURE__*/ react.createElement(Router, {
                basename: basename,
                children: children,
                location: state.location,
                navigationType: state.action,
                navigator: history,
                future: future
            });
        }
        const dist_isBrowser = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement;
        const dist_ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
        /**
 * The public API for rendering a history-aware `<a>`.
 */ const Link = /*#__PURE__*/ react.forwardRef(function(_ref7, ref) {
            let { onClick, relative, reloadDocument, replace, state, target, to, preventScrollReset, viewTransition } = _ref7, rest = _objectWithoutPropertiesLoose(_ref7, _excluded);
            let { basename } = react.useContext(NavigationContext);
            // Rendered into <a href> for absolute URLs
            let absoluteHref;
            let isExternal = false;
            if ("string" == typeof to && dist_ABSOLUTE_URL_REGEX.test(to)) {
                // Render the absolute href server- and client-side
                absoluteHref = to;
                // Only check for external origins client-side
                if (dist_isBrowser) try {
                    let currentUrl = new URL(window.location.href);
                    let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
                    let path = stripBasename(targetUrl.pathname, basename);
                    if (targetUrl.origin === currentUrl.origin && null != path) // Strip the protocol/origin/basename for same-origin absolute URLs
                    to = path + targetUrl.search + targetUrl.hash;
                    else isExternal = true;
                } catch (e) {}
            }
            // Rendered into <a href> for relative URLs
            let href = dist_useHref(to, {
                relative
            });
            let internalOnClick = useLinkClickHandler(to, {
                replace,
                state,
                target,
                preventScrollReset,
                relative,
                viewTransition
            });
            function handleClick(event) {
                if (onClick) onClick(event);
                if (!event.defaultPrevented) internalOnClick(event);
            }
            return(/*#__PURE__*/ // eslint-disable-next-line jsx-a11y/anchor-has-content
            react.createElement("a", react_router_dom_dist_extends({}, rest, {
                href: absoluteHref || href,
                onClick: isExternal || reloadDocument ? onClick : handleClick,
                ref: ref,
                target: target
            })));
        });
        /**
 * A `<Link>` wrapper that knows if it's "active" or not.
 */ const NavLink = /*#__PURE__*/ react.forwardRef(function(_ref8, ref) {
            let { "aria-current": ariaCurrentProp = "page", caseSensitive = false, className: classNameProp = "", end = false, style: styleProp, to, viewTransition, children } = _ref8, rest = _objectWithoutPropertiesLoose(_ref8, _excluded2);
            let path = useResolvedPath(to, {
                relative: rest.relative
            });
            let location = useLocation();
            let routerState = react.useContext(DataRouterStateContext);
            let { navigator: navigator1, basename } = react.useContext(NavigationContext);
            let isTransitioning = null != routerState && // Conditional usage is OK here because the usage of a data router is static
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useViewTransitionState(path) && true === viewTransition;
            let toPathname = navigator1.encodeLocation ? navigator1.encodeLocation(path).pathname : path.pathname;
            let locationPathname = location.pathname;
            let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
            if (!caseSensitive) {
                locationPathname = locationPathname.toLowerCase();
                nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
                toPathname = toPathname.toLowerCase();
            }
            if (nextLocationPathname && basename) nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
            // If the `to` has a trailing slash, look at that exact spot.  Otherwise,
            // we're looking for a slash _after_ what's in `to`.  For example:
            //
            // <NavLink to="/users"> and <NavLink to="/users/">
            // both want to look for a / at index 6 to match URL `/users/matt`
            const endSlashPosition = "/" !== toPathname && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
            let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && "/" === locationPathname.charAt(endSlashPosition);
            let isPending = null != nextLocationPathname && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && "/" === nextLocationPathname.charAt(toPathname.length));
            let renderProps = {
                isActive,
                isPending,
                isTransitioning
            };
            let ariaCurrent = isActive ? ariaCurrentProp : void 0;
            let className;
            className = "function" == typeof classNameProp ? classNameProp(renderProps) : [
                classNameProp,
                isActive ? "active" : null,
                isPending ? "pending" : null,
                isTransitioning ? "transitioning" : null
            ].filter(Boolean).join(" ");
            let style = "function" == typeof styleProp ? styleProp(renderProps) : styleProp;
            return /*#__PURE__*/ react.createElement(Link, react_router_dom_dist_extends({}, rest, {
                "aria-current": ariaCurrent,
                className: className,
                ref: ref,
                style: style,
                to: to,
                viewTransition: viewTransition
            }), "function" == typeof children ? children(renderProps) : children);
        });
        /**
 * A `@remix-run/router`-aware `<form>`. It behaves like a normal form except
 * that the interaction with the server is with `fetch` instead of new document
 * requests, allowing components to add nicer UX to the page as the form is
 * submitted and returns with data.
 */ const Form = /*#__PURE__*/ react.forwardRef((_ref9, forwardedRef)=>{
            let { fetcherKey, navigate, reloadDocument, replace, state, method = defaultMethod, action, onSubmit, relative, preventScrollReset, viewTransition } = _ref9, props = _objectWithoutPropertiesLoose(_ref9, _excluded3);
            let submit = useSubmit();
            let formAction = useFormAction(action, {
                relative
            });
            let formMethod = "get" === method.toLowerCase() ? "get" : "post";
            let submitHandler = (event)=>{
                onSubmit && onSubmit(event);
                if (event.defaultPrevented) return;
                event.preventDefault();
                let submitter = event.nativeEvent.submitter;
                let submitMethod = (null == submitter ? void 0 : submitter.getAttribute("formmethod")) || method;
                submit(submitter || event.currentTarget, {
                    fetcherKey,
                    method: submitMethod,
                    navigate,
                    replace,
                    state,
                    relative,
                    preventScrollReset,
                    viewTransition
                });
            };
            return /*#__PURE__*/ react.createElement("form", react_router_dom_dist_extends({
                ref: forwardedRef,
                method: formMethod,
                action: formAction,
                onSubmit: reloadDocument ? onSubmit : submitHandler
            }, props));
        });
        /**
 * This component will emulate the browser's scroll restoration on location
 * changes.
 */ function ScrollRestoration(_ref10) {
            let { getKey, storageKey } = _ref10;
            useScrollRestoration({
                getKey,
                storageKey
            });
            return null;
        }
        //#endregion
        ////////////////////////////////////////////////////////////////////////////////
        //#region Hooks
        ////////////////////////////////////////////////////////////////////////////////
        var react_router_dom_dist_DataRouterHook;
        (function(DataRouterHook) {
            DataRouterHook["UseScrollRestoration"] = "useScrollRestoration";
            DataRouterHook["UseSubmit"] = "useSubmit";
            DataRouterHook["UseSubmitFetcher"] = "useSubmitFetcher";
            DataRouterHook["UseFetcher"] = "useFetcher";
            DataRouterHook["useViewTransitionState"] = "useViewTransitionState";
        })(react_router_dom_dist_DataRouterHook || (react_router_dom_dist_DataRouterHook = {}));
        var react_router_dom_dist_DataRouterStateHook;
        (function(DataRouterStateHook) {
            DataRouterStateHook["UseFetcher"] = "useFetcher";
            DataRouterStateHook["UseFetchers"] = "useFetchers";
            DataRouterStateHook["UseScrollRestoration"] = "useScrollRestoration";
        })(react_router_dom_dist_DataRouterStateHook || (react_router_dom_dist_DataRouterStateHook = {}));
        // Internal hooks
        function dist_getDataRouterConsoleError(hookName) {
            return hookName + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
        }
        function dist_useDataRouterContext(hookName) {
            let ctx = react.useContext(DataRouterContext);
            ctx || invariant(false);
            return ctx;
        }
        function dist_useDataRouterState(hookName) {
            let state = react.useContext(DataRouterStateContext);
            state || invariant(false);
            return state;
        }
        // External hooks
        /**
 * Handles the click behavior for router `<Link>` components. This is useful if
 * you need to create custom `<Link>` components with the same click behavior we
 * use in our exported `<Link>`.
 */ function useLinkClickHandler(to, _temp) {
            let { target, replace: replaceProp, state, preventScrollReset, relative, viewTransition } = void 0 === _temp ? {} : _temp;
            let navigate = useNavigate();
            let location = useLocation();
            let path = useResolvedPath(to, {
                relative
            });
            return react.useCallback((event)=>{
                if (shouldProcessLinkClick(event, target)) {
                    event.preventDefault();
                    // If the URL hasn't changed, a regular <a> will do a replace instead of
                    // a push, so do the same here unless the replace prop is explicitly set
                    let replace = void 0 !== replaceProp ? replaceProp : createPath(location) === createPath(path);
                    navigate(to, {
                        replace,
                        state,
                        preventScrollReset,
                        relative,
                        viewTransition
                    });
                }
            }, [
                location,
                navigate,
                path,
                replaceProp,
                state,
                target,
                to,
                preventScrollReset,
                relative,
                viewTransition
            ]);
        }
        /**
 * A convenient wrapper for reading and writing search parameters via the
 * URLSearchParams interface.
 */ function useSearchParams(defaultInit) {
            let defaultSearchParamsRef = react.useRef(createSearchParams(defaultInit));
            let hasSetSearchParamsRef = react.useRef(false);
            let location = useLocation();
            let searchParams = react.useMemo(()=>// Only merge in the defaults if we haven't yet called setSearchParams.
                // Once we call that we want those to take precedence, otherwise you can't
                // remove a param with setSearchParams({}) if it has an initial value
                getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current), [
                location.search
            ]);
            let navigate = useNavigate();
            let setSearchParams = react.useCallback((nextInit, navigateOptions)=>{
                const newSearchParams = createSearchParams("function" == typeof nextInit ? nextInit(searchParams) : nextInit);
                hasSetSearchParamsRef.current = true;
                navigate("?" + newSearchParams, navigateOptions);
            }, [
                navigate,
                searchParams
            ]);
            return [
                searchParams,
                setSearchParams
            ];
        }
        function validateClientSideSubmission() {
            if ("undefined" == typeof document) throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
        }
        let fetcherId = 0;
        let getUniqueFetcherId = ()=>"__" + String(++fetcherId) + "__";
        /**
 * Returns a function that may be used to programmatically submit a form (or
 * some arbitrary data) to the server.
 */ function useSubmit() {
            let { router } = dist_useDataRouterContext(react_router_dom_dist_DataRouterHook.UseSubmit);
            let { basename } = react.useContext(NavigationContext);
            let currentRouteId = useRouteId();
            return react.useCallback(function(target, options) {
                if (void 0 === options) options = {};
                validateClientSideSubmission();
                let { action, method, encType, formData, body } = getFormSubmissionInfo(target, basename);
                if (false === options.navigate) {
                    let key = options.fetcherKey || getUniqueFetcherId();
                    router.fetch(key, currentRouteId, options.action || action, {
                        preventScrollReset: options.preventScrollReset,
                        formData,
                        body,
                        formMethod: options.method || method,
                        formEncType: options.encType || encType,
                        flushSync: options.flushSync
                    });
                } else router.navigate(options.action || action, {
                    preventScrollReset: options.preventScrollReset,
                    formData,
                    body,
                    formMethod: options.method || method,
                    formEncType: options.encType || encType,
                    replace: options.replace,
                    state: options.state,
                    fromRouteId: currentRouteId,
                    flushSync: options.flushSync,
                    viewTransition: options.viewTransition
                });
            }, [
                router,
                basename,
                currentRouteId
            ]);
        }
        // v7: Eventually we should deprecate this entirely in favor of using the
        // router method directly?
        function useFormAction(action, _temp2) {
            let { relative } = void 0 === _temp2 ? {} : _temp2;
            let { basename } = react.useContext(NavigationContext);
            let routeContext = react.useContext(RouteContext);
            routeContext || invariant(false);
            let [match] = routeContext.matches.slice(-1);
            // Shallow clone path so we can modify it below, otherwise we modify the
            // object referenced by useMemo inside useResolvedPath
            let path = react_router_dom_dist_extends({}, useResolvedPath(action ? action : ".", {
                relative
            }));
            // If no action was specified, browsers will persist current search params
            // when determining the path, so match that behavior
            // https://github.com/remix-run/remix/issues/927
            let location = useLocation();
            if (null == action) {
                // Safe to write to this directly here since if action was undefined, we
                // would have called useResolvedPath(".") which will never include a search
                path.search = location.search;
                // When grabbing search params from the URL, remove any included ?index param
                // since it might not apply to our contextual route.  We add it back based
                // on match.route.index below
                let params = new URLSearchParams(path.search);
                let indexValues = params.getAll("index");
                let hasNakedIndexParam = indexValues.some((v)=>"" === v);
                if (hasNakedIndexParam) {
                    params.delete("index");
                    indexValues.filter((v)=>v).forEach((v)=>params.append("index", v));
                    let qs = params.toString();
                    path.search = qs ? "?" + qs : "";
                }
            }
            if ((!action || "." === action) && match.route.index) path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
            // If we're operating within a basename, prepend it to the pathname prior
            // to creating the form action.  If this is a root navigation, then just use
            // the raw basename which allows the basename to have full control over the
            // presence of a trailing slash on root actions
            if ("/" !== basename) path.pathname = "/" === path.pathname ? basename : joinPaths([
                basename,
                path.pathname
            ]);
            return createPath(path);
        }
        // TODO: (v7) Change the useFetcher generic default from `any` to `unknown`
        /**
 * Interacts with route loaders and actions without causing a navigation. Great
 * for any interaction that stays on the same page.
 */ function useFetcher(_temp3) {
            var _route$matches;
            let { key } = void 0 === _temp3 ? {} : _temp3;
            let { router } = dist_useDataRouterContext(react_router_dom_dist_DataRouterHook.UseFetcher);
            let state = dist_useDataRouterState(react_router_dom_dist_DataRouterStateHook.UseFetcher);
            let fetcherData = react.useContext(FetchersContext);
            let route = react.useContext(RouteContext);
            let routeId = null == (_route$matches = route.matches[route.matches.length - 1]) ? void 0 : _route$matches.route.id;
            fetcherData || invariant(false);
            route || invariant(false);
            null != routeId || invariant(false);
            // Fetcher key handling
            // OK to call conditionally to feature detect `useId`
            // eslint-disable-next-line react-hooks/rules-of-hooks
            let defaultKey = useIdImpl ? useIdImpl() : "";
            let [fetcherKey, setFetcherKey] = react.useState(key || defaultKey);
            if (key && key !== fetcherKey) setFetcherKey(key);
            else if (!fetcherKey) // We will only fall through here when `useId` is not available
            setFetcherKey(getUniqueFetcherId());
            // Registration/cleanup
            react.useEffect(()=>{
                router.getFetcher(fetcherKey);
                return ()=>{
                    // Tell the router we've unmounted - if v7_fetcherPersist is enabled this
                    // will not delete immediately but instead queue up a delete after the
                    // fetcher returns to an `idle` state
                    router.deleteFetcher(fetcherKey);
                };
            }, [
                router,
                fetcherKey
            ]);
            // Fetcher additions
            let load = react.useCallback((href, opts)=>{
                routeId || invariant(false);
                router.fetch(fetcherKey, routeId, href, opts);
            }, [
                fetcherKey,
                routeId,
                router
            ]);
            let submitImpl = useSubmit();
            let submit = react.useCallback((target, opts)=>{
                submitImpl(target, react_router_dom_dist_extends({}, opts, {
                    navigate: false,
                    fetcherKey
                }));
            }, [
                fetcherKey,
                submitImpl
            ]);
            let FetcherForm = react.useMemo(()=>{
                let FetcherForm = /*#__PURE__*/ react.forwardRef((props, ref)=>/*#__PURE__*/ react.createElement(Form, react_router_dom_dist_extends({}, props, {
                        navigate: false,
                        fetcherKey: fetcherKey,
                        ref: ref
                    })));
                return FetcherForm;
            }, [
                fetcherKey
            ]);
            // Exposed FetcherWithComponents
            let fetcher = state.fetchers.get(fetcherKey) || IDLE_FETCHER;
            let data = fetcherData.get(fetcherKey);
            let fetcherWithComponents = react.useMemo(()=>react_router_dom_dist_extends({
                    Form: FetcherForm,
                    submit,
                    load
                }, fetcher, {
                    data
                }), [
                FetcherForm,
                submit,
                load,
                fetcher,
                data
            ]);
            return fetcherWithComponents;
        }
        /**
 * Provides all fetchers currently on the page. Useful for layouts and parent
 * routes that need to provide pending/optimistic UI regarding the fetch.
 */ function useFetchers() {
            let state = dist_useDataRouterState(react_router_dom_dist_DataRouterStateHook.UseFetchers);
            return Array.from(state.fetchers.entries()).map((_ref11)=>{
                let [key, fetcher] = _ref11;
                return react_router_dom_dist_extends({}, fetcher, {
                    key
                });
            });
        }
        const SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
        let dist_savedScrollPositions = {};
        /**
 * When rendered inside a RouterProvider, will restore scroll positions on navigations
 */ function useScrollRestoration(_temp4) {
            let { getKey, storageKey } = void 0 === _temp4 ? {} : _temp4;
            let { router } = dist_useDataRouterContext(react_router_dom_dist_DataRouterHook.UseScrollRestoration);
            let { restoreScrollPosition, preventScrollReset } = dist_useDataRouterState(react_router_dom_dist_DataRouterStateHook.UseScrollRestoration);
            let { basename } = react.useContext(NavigationContext);
            let location = useLocation();
            let matches = useMatches();
            let navigation = useNavigation();
            // Trigger manual scroll restoration while we're active
            react.useEffect(()=>{
                window.history.scrollRestoration = "manual";
                return ()=>{
                    window.history.scrollRestoration = "auto";
                };
            }, []);
            // Save positions on pagehide
            usePageHide(react.useCallback(()=>{
                if ("idle" === navigation.state) {
                    let key = (getKey ? getKey(location, matches) : null) || location.key;
                    dist_savedScrollPositions[key] = window.scrollY;
                }
                try {
                    sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(dist_savedScrollPositions));
                } catch (error) {}
                window.history.scrollRestoration = "auto";
            }, [
                storageKey,
                getKey,
                navigation.state,
                location,
                matches
            ]));
            // Read in any saved scroll locations
            if ("undefined" != typeof document) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                react.useLayoutEffect(()=>{
                    try {
                        let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
                        if (sessionPositions) dist_savedScrollPositions = JSON.parse(sessionPositions);
                    } catch (e) {
                    // no-op, use default empty object
                    }
                }, [
                    storageKey
                ]);
                // Enable scroll restoration in the router
                // eslint-disable-next-line react-hooks/rules-of-hooks
                react.useLayoutEffect(()=>{
                    let getKeyWithoutBasename = getKey && "/" !== basename ? (location, matches)=>getKey(react_router_dom_dist_extends({}, location, {
                            pathname: stripBasename(location.pathname, basename) || location.pathname
                        }), matches) : getKey;
                    let disableScrollRestoration = null == router ? void 0 : router.enableScrollRestoration(dist_savedScrollPositions, ()=>window.scrollY, getKeyWithoutBasename);
                    return ()=>disableScrollRestoration && disableScrollRestoration();
                }, [
                    router,
                    basename,
                    getKey
                ]);
                // Restore scrolling when state.restoreScrollPosition changes
                // eslint-disable-next-line react-hooks/rules-of-hooks
                react.useLayoutEffect(()=>{
                    // Explicit false means don't do anything (used for submissions)
                    if (false === restoreScrollPosition) return;
                    // been here before, scroll to it
                    if ("number" == typeof restoreScrollPosition) {
                        window.scrollTo(0, restoreScrollPosition);
                        return;
                    }
                    // try to scroll to the hash
                    if (location.hash) {
                        let el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
                        if (el) {
                            el.scrollIntoView();
                            return;
                        }
                    }
                    // Don't reset if this navigation opted out
                    if (true === preventScrollReset) return;
                    // otherwise go to the top on new locations
                    window.scrollTo(0, 0);
                }, [
                    location,
                    restoreScrollPosition,
                    preventScrollReset
                ]);
            }
        }
        /**
 * Setup a callback to be fired on the window's `beforeunload` event. This is
 * useful for saving some data to `window.localStorage` just before the page
 * refreshes.
 *
 * Note: The `callback` argument should be a function created with
 * `React.useCallback()`.
 */ function useBeforeUnload(callback, options) {
            let { capture } = options || {};
            react.useEffect(()=>{
                let opts = null != capture ? {
                    capture
                } : void 0;
                window.addEventListener("beforeunload", callback, opts);
                return ()=>{
                    window.removeEventListener("beforeunload", callback, opts);
                };
            }, [
                callback,
                capture
            ]);
        }
        /**
 * Setup a callback to be fired on the window's `pagehide` event. This is
 * useful for saving some data to `window.localStorage` just before the page
 * refreshes.  This event is better supported than beforeunload across browsers.
 *
 * Note: The `callback` argument should be a function created with
 * `React.useCallback()`.
 */ function usePageHide(callback, options) {
            let { capture } = options || {};
            react.useEffect(()=>{
                let opts = null != capture ? {
                    capture
                } : void 0;
                window.addEventListener("pagehide", callback, opts);
                return ()=>{
                    window.removeEventListener("pagehide", callback, opts);
                };
            }, [
                callback,
                capture
            ]);
        }
        /**
 * Wrapper around useBlocker to show a window.confirm prompt to users instead
 * of building a custom UI with useBlocker.
 *
 * Warning: This has *a lot of rough edges* and behaves very differently (and
 * very incorrectly in some cases) across browsers if user click addition
 * back/forward navigations while the confirm is open.  Use at your own risk.
 */ function usePrompt(_ref12) {
            let { when, message } = _ref12;
            let blocker = useBlocker(when);
            react.useEffect(()=>{
                if ("blocked" === blocker.state) {
                    let proceed = window.confirm(message);
                    if (proceed) // This timeout is needed to avoid a weird "race" on POP navigations
                    // between the `window.history` revert navigation and the result of
                    // `window.confirm`
                    setTimeout(blocker.proceed, 0);
                    else blocker.reset();
                }
            }, [
                blocker,
                message
            ]);
            react.useEffect(()=>{
                if ("blocked" === blocker.state && !when) blocker.reset();
            }, [
                blocker,
                when
            ]);
        }
        /**
 * Return a boolean indicating if there is an active view transition to the
 * given href.  You can use this value to render CSS classes or viewTransitionName
 * styles onto your elements
 *
 * @param href The destination href
 * @param [opts.relative] Relative routing type ("route" | "path")
 */ function useViewTransitionState(to, opts) {
            if (void 0 === opts) opts = {};
            let vtContext = react.useContext(ViewTransitionContext);
            null != vtContext || invariant(false);
            let { basename } = dist_useDataRouterContext(react_router_dom_dist_DataRouterHook.useViewTransitionState);
            let path = useResolvedPath(to, {
                relative: opts.relative
            });
            if (!vtContext.isTransitioning) return false;
            let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
            let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
            // Transition is active if we're going to or coming from the indicated
            // destination.  This ensures that other PUSH navigations that reverse
            // an indicated transition apply.  I.e., on the list view you have:
            //
            //   <NavLink to="/details/1" viewTransition>
            //
            // If you click the breadcrumb back to the list view:
            //
            //   <NavLink to="/list" viewTransition>
            //
            // We should apply the transition because it's indicated as active going
            // from /list -> /details/1 and therefore should be active on the reverse
            // (even though this isn't strictly a POP reverse)
            return null != matchPath(path.pathname, nextPath) || null != matchPath(path.pathname, currentPath);
        }
        const plugin_es_federationRuntime = {
            instance: null
        };
        function BridgeReactPlugin() {
            return {
                name: "bridge-react-plugin",
                beforeInit (args) {
                    plugin_es_federationRuntime.instance = args.origin;
                    return args;
                }
            };
        }
        const ErrorBoundaryContext = (0, react.createContext)(null);
        const initialState = {
            didCatch: false,
            error: null
        };
        class ErrorBoundary extends react.Component {
            constructor(props){
                super(props);
                this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
                this.state = initialState;
            }
            static getDerivedStateFromError(error) {
                return {
                    didCatch: true,
                    error
                };
            }
            resetErrorBoundary() {
                const { error } = this.state;
                if (null !== error) {
                    var _this$props$onReset, _this$props;
                    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
                    null === (_this$props$onReset = (_this$props = this.props).onReset) || void 0 === _this$props$onReset || _this$props$onReset.call(_this$props, {
                        args,
                        reason: "imperative-api"
                    });
                    this.setState(initialState);
                }
            }
            componentDidCatch(error, info) {
                var _this$props$onError, _this$props2;
                null === (_this$props$onError = (_this$props2 = this.props).onError) || void 0 === _this$props$onError || _this$props$onError.call(_this$props2, error, info);
            }
            componentDidUpdate(prevProps, prevState) {
                const { didCatch } = this.state;
                const { resetKeys } = this.props;
                if (didCatch && null !== prevState.error && hasArrayChanged(prevProps.resetKeys, resetKeys)) {
                    var _this$props$onReset2, _this$props3;
                    null === (_this$props$onReset2 = (_this$props3 = this.props).onReset) || void 0 === _this$props$onReset2 || _this$props$onReset2.call(_this$props3, {
                        next: resetKeys,
                        prev: prevProps.resetKeys,
                        reason: "keys"
                    });
                    this.setState(initialState);
                }
            }
            render() {
                const { children, fallbackRender, FallbackComponent, fallback } = this.props;
                const { didCatch, error } = this.state;
                let childToRender = children;
                if (didCatch) {
                    const props = {
                        error,
                        resetErrorBoundary: this.resetErrorBoundary
                    };
                    if ("function" == typeof fallbackRender) childToRender = fallbackRender(props);
                    else if (FallbackComponent) childToRender = (0, react.createElement)(FallbackComponent, props);
                    else if (null === fallback || (0, react.isValidElement)(fallback)) childToRender = fallback;
                    else throw error;
                }
                return (0, react.createElement)(ErrorBoundaryContext.Provider, {
                    value: {
                        didCatch,
                        error,
                        resetErrorBoundary: this.resetErrorBoundary
                    }
                }, childToRender);
            }
        }
        function hasArrayChanged() {
            let a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            let b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            return a.length !== b.length || a.some((item, index)=>!Object.is(item, b[index]));
        }
        function index_es_e() {
            const t = new PopStateEvent("popstate", {
                state: window.history.state
            });
            window.dispatchEvent(t);
        }
        const RemoteAppWrapper = (0, react.forwardRef)(function(props, ref) {
            const RemoteApp2 = ()=>{
                context_CUbFnlO5_LoggerInstance.log("RemoteAppWrapper RemoteApp props >>>", {
                    props
                });
                const { moduleName, memoryRoute, basename, providerInfo, className, style, fallback, ...resProps } = props;
                const instance = plugin_es_federationRuntime.instance;
                const rootRef = ref && "current" in ref ? ref : (0, react.useRef)(null);
                const renderDom = (0, react.useRef)(null);
                const providerInfoRef = (0, react.useRef)(null);
                context_CUbFnlO5_LoggerInstance.log("RemoteAppWrapper instance from props >>>", instance);
                (0, react.useEffect)(()=>{
                    const renderTimeout = setTimeout(()=>{
                        var _a, _b, _c, _d, _e, _f;
                        const providerReturn = providerInfo();
                        providerInfoRef.current = providerReturn;
                        let renderProps = {
                            moduleName,
                            dom: rootRef.current,
                            basename,
                            memoryRoute,
                            fallback,
                            ...resProps
                        };
                        renderDom.current = rootRef.current;
                        context_CUbFnlO5_LoggerInstance.log("createRemoteComponent LazyComponent render >>>", renderProps);
                        context_CUbFnlO5_LoggerInstance.log("createRemoteComponent LazyComponent hostInstance >>>", instance);
                        const beforeBridgeRenderRes = (null == (_c = null == (_b = null == (_a = null == instance ? void 0 : instance.bridgeHook) ? void 0 : _a.lifecycle) ? void 0 : _b.beforeBridgeRender) ? void 0 : _c.emit(renderProps)) || {};
                        renderProps = {
                            ...renderProps,
                            ...beforeBridgeRenderRes.extraProps
                        };
                        providerReturn.render(renderProps);
                        null == (_f = null == (_e = null == (_d = null == instance ? void 0 : instance.bridgeHook) ? void 0 : _d.lifecycle) ? void 0 : _e.afterBridgeRender) || _f.emit(renderProps);
                    });
                    return ()=>{
                        clearTimeout(renderTimeout);
                        setTimeout(()=>{
                            var _a, _b, _c, _d, _e, _f, _g, _h;
                            if (null == (_a = providerInfoRef.current) ? void 0 : _a.destroy) {
                                context_CUbFnlO5_LoggerInstance.log("createRemoteComponent LazyComponent destroy >>>", {
                                    moduleName,
                                    basename,
                                    dom: renderDom.current
                                });
                                null == (_d = null == (_c = null == (_b = null == instance ? void 0 : instance.bridgeHook) ? void 0 : _b.lifecycle) ? void 0 : _c.beforeBridgeDestroy) || _d.emit({
                                    moduleName,
                                    dom: renderDom.current,
                                    basename,
                                    memoryRoute,
                                    fallback,
                                    ...resProps
                                });
                                null == (_e = providerInfoRef.current) || _e.destroy({
                                    moduleName,
                                    dom: renderDom.current
                                });
                                null == (_h = null == (_g = null == (_f = null == instance ? void 0 : instance.bridgeHook) ? void 0 : _f.lifecycle) ? void 0 : _g.afterBridgeDestroy) || _h.emit({
                                    moduleName,
                                    dom: renderDom.current,
                                    basename,
                                    memoryRoute,
                                    fallback,
                                    ...resProps
                                });
                            }
                        });
                    };
                }, []);
                const rootComponentClassName = `${getRootDomDefaultClassName(moduleName)} ${null == props ? void 0 : props.className}`;
                return /* @__PURE__ */ react.createElement("div", {
                    className: rootComponentClassName,
                    style: null == props ? void 0 : props.style,
                    ref: rootRef
                });
            };
            RemoteApp2["__APP_VERSION__"] = "0.8.3";
            return /* @__PURE__ */ react.createElement(RemoteApp2, null);
        });
        function withRouterData(WrappedComponent) {
            const Component2 = (0, react.forwardRef)(function(props, ref) {
                var _a;
                let enableDispathPopstate = false;
                let routerContextVal;
                try {
                    useLocation();
                    enableDispathPopstate = true;
                } catch  {
                    enableDispathPopstate = false;
                }
                let basename = "/";
                if (!props.basename && enableDispathPopstate) {
                    const ReactRouterDOMAny = react_router_dom_dist_namespaceObject;
                    const useRouteMatch = ReactRouterDOMAny["useRouteMatch"];
                    const useHistory = ReactRouterDOMAny["useHistory"];
                    const useHref = ReactRouterDOMAny["useHref"];
                    const UNSAFE_RouteContext = ReactRouterDOMAny["UNSAFE_RouteContext"];
                    if (UNSAFE_RouteContext) {
                        if (useHref) basename = null == useHref ? void 0 : useHref("/");
                        routerContextVal = (0, react.useContext)(UNSAFE_RouteContext);
                        if (routerContextVal && routerContextVal.matches && routerContextVal.matches.length > 0) {
                            const matchIndex = routerContextVal.matches.length - 1;
                            const pathnameBase = routerContextVal.matches[matchIndex].pathnameBase;
                            basename = pathJoin(basename, pathnameBase || "/");
                        }
                    } else {
                        const match = null == useRouteMatch ? void 0 : useRouteMatch();
                        if (useHistory) {
                            const history = null == useHistory ? void 0 : useHistory();
                            basename = null == (_a = null == history ? void 0 : history.createHref) ? void 0 : _a.call(history, {
                                pathname: "/"
                            });
                        }
                        if (match) basename = pathJoin(basename, (null == match ? void 0 : match.path) || "/");
                    }
                }
                context_CUbFnlO5_LoggerInstance.log("createRemoteComponent withRouterData >>>", {
                    ...props,
                    basename,
                    routerContextVal,
                    enableDispathPopstate
                });
                if (enableDispathPopstate) {
                    const location = useLocation();
                    const [pathname, setPathname] = (0, react.useState)(location.pathname);
                    (0, react.useEffect)(()=>{
                        if ("" !== pathname && pathname !== location.pathname) {
                            context_CUbFnlO5_LoggerInstance.log("createRemoteComponent dispatchPopstateEnv >>>", {
                                name: props.name,
                                pathname: location.pathname
                            });
                            index_es_e();
                        }
                        setPathname(location.pathname);
                    }, [
                        location
                    ]);
                }
                return /* @__PURE__ */ react.createElement(WrappedComponent, {
                    ...props,
                    basename,
                    ref
                });
            });
            return (0, react.forwardRef)(function(props, ref) {
                return /* @__PURE__ */ react.createElement(Component2, {
                    ...props,
                    ref
                });
            });
        }
        const RemoteApp = withRouterData(RemoteAppWrapper);
        function createLazyRemoteComponent(info) {
            const exportName = (null == info ? void 0 : info.export) || "default";
            return react.lazy(async ()=>{
                context_CUbFnlO5_LoggerInstance.log("createRemoteComponent LazyComponent create >>>", {
                    lazyComponent: info.loader,
                    exportName
                });
                try {
                    const m2 = await info.loader();
                    const moduleName = m2 && m2[Symbol.for("mf_module_id")];
                    context_CUbFnlO5_LoggerInstance.log("createRemoteComponent LazyComponent loadRemote info >>>", {
                        name: moduleName,
                        module: m2,
                        exportName
                    });
                    const exportFn = m2[exportName];
                    if (exportName in m2 && "function" == typeof exportFn) {
                        const RemoteAppComponent = (0, react.forwardRef)((props, ref)=>/* @__PURE__ */ react.createElement(RemoteApp, {
                                moduleName,
                                providerInfo: exportFn,
                                exportName: info.export || "default",
                                fallback: info.fallback,
                                ref,
                                ...props
                            }));
                        return {
                            default: RemoteAppComponent
                        };
                    }
                    context_CUbFnlO5_LoggerInstance.log("createRemoteComponent LazyComponent module not found >>>", {
                        name: moduleName,
                        module: m2,
                        exportName
                    });
                    throw Error(`Make sure that ${moduleName} has the correct export when export is ${String(exportName)}`);
                } catch (error) {
                    throw error;
                }
            });
        }
        function createRemoteComponent(info) {
            return (0, react.forwardRef)((props, ref)=>{
                const LazyComponent = createLazyRemoteComponent(info);
                return /* @__PURE__ */ react.createElement(ErrorBoundary, {
                    FallbackComponent: info.fallback
                }, /* @__PURE__ */ react.createElement(react.Suspense, {
                    fallback: info.loading
                }, /* @__PURE__ */ react.createElement(LazyComponent, {
                    ...props,
                    ref
                })));
            });
        }
        var client = {};
        var index_es_m = react_dom;
        var index_es_i;
        client.createRoot = index_es_m.createRoot;
        client.hydrateRoot = index_es_m.hydrateRoot;
        function createBridgeComponent(bridgeInfo) {
            return ()=>{
                const rootMap = /* @__PURE__ */ new Map();
                const instance = federationRuntime.instance;
                LoggerInstance.log("createBridgeComponent instance from props >>>", instance);
                const RawComponent = (info)=>{
                    const { appInfo, propsInfo, ...restProps } = info;
                    const { moduleName, memoryRoute, basename = "/" } = appInfo;
                    return /* @__PURE__ */ React.createElement(RouterContext.Provider, {
                        value: {
                            moduleName,
                            basename,
                            memoryRoute
                        }
                    }, /* @__PURE__ */ React.createElement(bridgeInfo.rootComponent, {
                        ...propsInfo,
                        basename,
                        ...restProps
                    }));
                };
                return {
                    async render (info) {
                        var _a, _b, _c, _d, _e, _f;
                        LoggerInstance.log("createBridgeComponent render Info", info);
                        const { moduleName, dom, basename, memoryRoute, fallback, ...propsInfo } = info;
                        const beforeBridgeRenderRes = (null == (_c = null == (_b = null == (_a = null == instance ? void 0 : instance.bridgeHook) ? void 0 : _a.lifecycle) ? void 0 : _b.beforeBridgeRender) ? void 0 : _c.emit(info)) || {};
                        const rootComponentWithErrorBoundary = // set ErrorBoundary for RawComponent rendering error, usually caused by user app rendering error
                        /* @__PURE__ */ React.createElement(ErrorBoundary, {
                            FallbackComponent: fallback
                        }, /* @__PURE__ */ React.createElement(RawComponent, {
                            appInfo: {
                                moduleName,
                                basename,
                                memoryRoute
                            },
                            propsInfo: {
                                ...propsInfo,
                                ...null == beforeBridgeRenderRes ? void 0 : beforeBridgeRenderRes.extraProps
                            }
                        }));
                        if (atLeastReact18(React)) {
                            if (null == bridgeInfo ? void 0 : bridgeInfo.render) Promise.resolve(null == bridgeInfo ? void 0 : bridgeInfo.render(rootComponentWithErrorBoundary, dom)).then((root)=>rootMap.set(info.dom, root));
                            else {
                                const root = client.createRoot(info.dom);
                                root.render(rootComponentWithErrorBoundary);
                                rootMap.set(info.dom, root);
                            }
                        } else {
                            const renderFn = (null == bridgeInfo ? void 0 : bridgeInfo.render) || ReactDOM.render;
                            null == renderFn || renderFn(rootComponentWithErrorBoundary, info.dom);
                        }
                        null == (_f = null == (_e = null == (_d = null == instance ? void 0 : instance.bridgeHook) ? void 0 : _d.lifecycle) ? void 0 : _e.afterBridgeRender) || _f.emit(info);
                    },
                    async destroy (info) {
                        var _a, _b, _c, _d, _e, _f;
                        LoggerInstance.log("createBridgeComponent destroy Info", {
                            dom: info.dom
                        });
                        null == (_c = null == (_b = null == (_a = null == instance ? void 0 : instance.bridgeHook) ? void 0 : _a.lifecycle) ? void 0 : _b.beforeBridgeDestroy) || _c.emit(info);
                        if (atLeastReact18(React)) {
                            const root = rootMap.get(info.dom);
                            null == root || root.unmount();
                            rootMap.delete(info.dom);
                        } else ReactDOM.unmountComponentAtNode(info.dom);
                        null == (_f = null == (_e = null == (_d = null == instance ? void 0 : instance.bridgeHook) ? void 0 : _d.lifecycle) ? void 0 : _e.afterBridgeDestroy) || _f.emit(info);
                    },
                    rawComponent: bridgeInfo.rootComponent,
                    __BRIDGE_FN__: (_args)=>{}
                };
            };
        }
        // export { Button } from './Button';
        class Runtime {
            constructor(options){
                (0, runtime.init)(options);
            }
            loadRemote(component) {
                return (0, runtime.loadRemote)(component);
            }
            createRemoteComponent(info) {
                return createRemoteComponent(info);
            }
        }
        /* ESM default export */ const src_rslib_entry_ = Runtime;
        return __webpack_exports__;
    })());
