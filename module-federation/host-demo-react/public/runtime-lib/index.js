/*! For license information please see index.js.LICENSE.txt */
import * as __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime__ from "react/jsx-runtime";
import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
import * as __WEBPACK_EXTERNAL_MODULE_react_dom__ from "react-dom";
var __webpack_modules__ = {
    "./node_modules/.pnpm/@module-federation+error-codes@0.8.3/node_modules/@module-federation/error-codes/dist/index.cjs.js": function(__unused_webpack_module, exports) {
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
        exports.RUNTIME_001 = RUNTIME_001;
        exports.RUNTIME_002 = RUNTIME_002;
        exports.RUNTIME_003 = RUNTIME_003;
        exports.RUNTIME_004 = RUNTIME_004;
        exports.RUNTIME_005 = RUNTIME_005;
        exports.RUNTIME_006 = RUNTIME_006;
        exports.RUNTIME_007 = RUNTIME_007;
        exports.TYPE_001 = TYPE_001;
        exports.errorDescMap = errorDescMap;
        exports.getShortErrorMsg = getShortErrorMsg;
        exports.runtimeDescMap = runtimeDescMap;
        exports.typeDescMap = typeDescMap;
    },
    "./node_modules/.pnpm/@module-federation+runtime-tools@0.8.3/node_modules/@module-federation/runtime-tools/dist/runtime.cjs.js": function(__unused_webpack_module, exports, __webpack_require__) {
        var runtime = __webpack_require__("./node_modules/.pnpm/@module-federation+runtime@0.8.3/node_modules/@module-federation/runtime/dist/index.cjs.js");
        Object.keys(runtime).forEach(function(k) {
            if ('default' !== k && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
                enumerable: true,
                get: function() {
                    return runtime[k];
                }
            });
        });
    },
    "./node_modules/.pnpm/@module-federation+runtime@0.8.3/node_modules/@module-federation/runtime/dist/index.cjs.js": function(__unused_webpack_module, exports, __webpack_require__) {
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
                    const module = host.moduleCache.get(remoteInfo.name);
                    module ? getRemoteEntry({
                        origin: host,
                        remoteInfo: moduleInfo,
                        remoteEntryExports: module.remoteEntryExports
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
                    const { module } = await host.remoteHandler.getRemoteModuleAndOptions({
                        id: key
                    });
                    if (module.getEntry) {
                        let remoteEntryExports;
                        try {
                            remoteEntryExports = await module.getEntry();
                        } catch (error) {
                            remoteEntryExports = await host.remoteHandler.hooks.lifecycle.errorLoadRemote.emit({
                                id: key,
                                error,
                                from: 'runtime',
                                lifecycle: 'beforeLoadShare',
                                origin: host
                            });
                        }
                        if (!module.inited) {
                            await initFn(remoteEntryExports);
                            module.inited = true;
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
                        const module = registeredShared.get();
                        if (!(module instanceof Promise)) {
                            addUseIn(registeredShared);
                            this.setShared({
                                pkgName,
                                loaded: true,
                                from: host.options.name,
                                lib: module,
                                shared: registeredShared
                            });
                            return module;
                        }
                    }
                }
                if (shareInfo.lib) {
                    if (!shareInfo.loaded) shareInfo.loaded = true;
                    return shareInfo.lib;
                }
                if (shareInfo.get) {
                    const module = shareInfo.get();
                    if (module instanceof Promise) {
                        const errorCode = (null == extraOptions ? void 0 : extraOptions.from) === 'build' ? errorCodes.RUNTIME_005 : errorCodes.RUNTIME_006;
                        throw new Error(errorCodes.getShortErrorMsg(errorCode, errorCodes.runtimeDescMap, {
                            hostName: host.options.name,
                            sharedPkgName: pkgName
                        }));
                    }
                    shareInfo.lib = module;
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
                    const { module, moduleOptions, remoteMatchInfo } = await this.getRemoteModuleAndOptions({
                        id
                    });
                    const { pkgNameOrAlias, remote, expose, id: idRes, remoteSnapshot } = remoteMatchInfo;
                    const moduleOrFactory = await module.get(idRes, expose, options, remoteSnapshot);
                    const moduleWrapper = await this.hooks.lifecycle.onLoad.emit({
                        id: idRes,
                        pkgNameOrAlias,
                        expose,
                        exposeModule: loadFactory ? moduleOrFactory : void 0,
                        exposeModuleFactory: loadFactory ? void 0 : moduleOrFactory,
                        remote,
                        options: moduleOptions,
                        moduleInstance: module,
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
                let module = host.moduleCache.get(remote.name);
                const moduleOptions = {
                    host: host,
                    remoteInfo
                };
                if (!module) {
                    module = new Module(moduleOptions);
                    host.moduleCache.set(remote.name, module);
                }
                return {
                    module,
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
                const module = new Module({
                    host: this,
                    remoteInfo
                });
                module.remoteEntryExports = container;
                this.moduleCache.set(name1, module);
                return module;
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
        Object.defineProperty(exports, "loadScript", {
            enumerable: true,
            get: function() {
                return sdk.loadScript;
            }
        });
        Object.defineProperty(exports, "loadScriptNode", {
            enumerable: true,
            get: function() {
                return sdk.loadScriptNode;
            }
        });
        exports.registerGlobalPlugins = share.registerGlobalPlugins;
        exports.FederationHost = FederationHost;
        exports.Module = Module;
        exports.getInstance = getInstance;
        exports.getRemoteEntry = getRemoteEntry;
        exports.getRemoteInfo = getRemoteInfo;
        exports.init = init;
        exports.loadRemote = loadRemote;
        exports.loadShare = loadShare;
        exports.loadShareSync = loadShareSync;
        exports.preloadRemote = preloadRemote;
        exports.registerPlugins = registerPlugins;
        exports.registerRemotes = registerRemotes;
    },
    "./node_modules/.pnpm/@module-federation+runtime@0.8.3/node_modules/@module-federation/runtime/dist/polyfills.cjs.js": function(__unused_webpack_module, exports) {
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
        exports._extends = _extends;
        exports._object_without_properties_loose = _object_without_properties_loose;
    },
    "./node_modules/.pnpm/@module-federation+runtime@0.8.3/node_modules/@module-federation/runtime/dist/share.cjs.js": function(__unused_webpack_module, exports, __webpack_require__) {
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
        exports.CurrentGlobal = CurrentGlobal;
        exports.DEFAULT_REMOTE_TYPE = DEFAULT_REMOTE_TYPE;
        exports.DEFAULT_SCOPE = DEFAULT_SCOPE;
        exports.Global = Global;
        exports.addGlobalSnapshot = addGlobalSnapshot;
        exports.addUniqueItem = addUniqueItem;
        exports.arrayOptions = arrayOptions;
        exports.assert = assert;
        exports.error = error;
        exports.formatShareConfigs = formatShareConfigs;
        exports.getBuilderId = getBuilderId;
        exports.getFMId = getFMId;
        exports.getGlobalFederationConstructor = getGlobalFederationConstructor;
        exports.getGlobalFederationInstance = getGlobalFederationInstance;
        exports.getGlobalHostPlugins = getGlobalHostPlugins;
        exports.getGlobalShareScope = getGlobalShareScope;
        exports.getGlobalSnapshot = getGlobalSnapshot;
        exports.getGlobalSnapshotInfoByModuleInfo = getGlobalSnapshotInfoByModuleInfo;
        exports.getInfoWithoutType = getInfoWithoutType;
        exports.getPreloaded = getPreloaded;
        exports.getRegisteredShare = getRegisteredShare;
        exports.getRemoteEntryExports = getRemoteEntryExports;
        exports.getRemoteEntryInfoFromSnapshot = getRemoteEntryInfoFromSnapshot;
        exports.getTargetSharedOptions = getTargetSharedOptions;
        exports.getTargetSnapshotInfoByModuleInfo = getTargetSnapshotInfoByModuleInfo;
        exports.globalLoading = globalLoading;
        exports.isObject = isObject;
        exports.isPlainObject = isPlainObject;
        exports.isPureRemoteEntry = isPureRemoteEntry;
        exports.isRemoteInfoWithEntry = isRemoteInfoWithEntry;
        exports.logger = logger;
        exports.nativeGlobal = nativeGlobal;
        exports.processModuleAlias = processModuleAlias;
        exports.registerGlobalPlugins = registerGlobalPlugins;
        exports.resetFederationGlobalInfo = resetFederationGlobalInfo;
        exports.setGlobalFederationConstructor = setGlobalFederationConstructor;
        exports.setGlobalFederationInstance = setGlobalFederationInstance;
        exports.setGlobalSnapshotInfoByModuleInfo = setGlobalSnapshotInfoByModuleInfo;
        exports.setPreloaded = setPreloaded;
        exports.warn = warn;
    },
    "./node_modules/.pnpm/@module-federation+sdk@0.8.3/node_modules/@module-federation/sdk/dist/index.cjs.js": function(__unused_webpack_module, exports, __webpack_require__) {
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
        const getResourceUrl = (module, sourceUrl)=>{
            if ('getPublicPath' in module) {
                let publicPath;
                publicPath = module.getPublicPath.startsWith('function') ? new Function('return ' + module.getPublicPath)()() : new Function(module.getPublicPath)();
                return `${publicPath}${sourceUrl}`;
            }
            if ('publicPath' in module) return `${module.publicPath}${sourceUrl}`;
            console.warn('Cannot get resource URL. If in debug mode, please ignore.', module, sourceUrl);
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
                }).then(async (module)=>{
                    await module.evaluate();
                    cb(void 0, module.namespace);
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
            const module = new vm.SourceTextModule(code, {
                // @ts-ignore
                importModuleDynamically: async (specifier, script)=>{
                    const resolvedUrl = new URL(specifier, url).href;
                    return loadModule(resolvedUrl, options);
                }
            });
            await module.link(async (specifier)=>{
                const resolvedUrl = new URL(specifier, url).href;
                const module = await loadModule(resolvedUrl, options);
                return module;
            });
            return module;
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
        exports.BROWSER_LOG_KEY = BROWSER_LOG_KEY;
        exports.BROWSER_LOG_VALUE = BROWSER_LOG_VALUE;
        exports.ENCODE_NAME_PREFIX = ENCODE_NAME_PREFIX;
        exports.EncodedNameTransformMap = EncodedNameTransformMap;
        exports.FederationModuleManifest = FederationModuleManifest;
        exports.MANIFEST_EXT = MANIFEST_EXT;
        exports.MFModuleType = MFModuleType;
        exports.MFPrefetchCommon = MFPrefetchCommon;
        exports.MODULE_DEVTOOL_IDENTIFIER = MODULE_DEVTOOL_IDENTIFIER;
        exports.ManifestFileName = ManifestFileName;
        exports.NameTransformMap = NameTransformMap;
        exports.NameTransformSymbol = NameTransformSymbol;
        exports.SEPARATOR = SEPARATOR;
        exports.StatsFileName = StatsFileName;
        exports.TEMP_DIR = TEMP_DIR;
        exports.assert = assert;
        exports.composeKeyWithSeparator = composeKeyWithSeparator;
        exports.containerPlugin = ContainerPlugin;
        exports.containerReferencePlugin = ContainerReferencePlugin;
        exports.createLink = createLink;
        exports.createLogger = createLogger;
        exports.createScript = createScript;
        exports.createScriptNode = createScriptNode;
        exports.decodeName = decodeName;
        exports.encodeName = encodeName;
        exports.error = error;
        exports.generateExposeFilename = generateExposeFilename;
        exports.generateShareFilename = generateShareFilename;
        exports.generateSnapshotFromManifest = generateSnapshotFromManifest;
        exports.getProcessEnv = getProcessEnv;
        exports.getResourceUrl = getResourceUrl;
        exports.inferAutoPublicPath = inferAutoPublicPath;
        exports.isBrowserEnv = isBrowserEnv;
        exports.isDebugMode = isDebugMode;
        exports.isManifestProvider = isManifestProvider;
        exports.isRequiredVersion = isRequiredVersion;
        exports.isStaticResourcesEqual = isStaticResourcesEqual;
        exports.loadScript = loadScript;
        exports.loadScriptNode = loadScriptNode;
        exports.logger = logger;
        exports.moduleFederationPlugin = ModuleFederationPlugin;
        exports.normalizeOptions = normalizeOptions;
        exports.parseEntry = parseEntry;
        exports.safeToString = safeToString;
        exports.safeWrapper = safeWrapper;
        exports.sharePlugin = SharePlugin;
        exports.simpleJoinRemoteEntry = simpleJoinRemoteEntry;
        exports.warn = warn;
    },
    "./node_modules/.pnpm/@module-federation+sdk@0.8.3/node_modules/@module-federation/sdk/dist/polyfills.cjs.js": function(__unused_webpack_module, exports) {
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
        exports._extends = _extends;
    },
    "./node_modules/.pnpm/@module-federation+enhanced@0.8.3_@rspack+core@1.1.6_@swc+helpers@0.5.15__react-dom@18.3.1_re_6awqquzvls3qoernnv4dasssaq/node_modules/@module-federation/enhanced/dist/src/runtime.js": function(__unused_webpack_module, exports, __webpack_require__) {
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
        var __exportStar = this && this.__exportStar || function(m, exports) {
            for(var p in m)if ("default" !== p && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __exportStar(__webpack_require__("./node_modules/.pnpm/@module-federation+runtime-tools@0.8.3/node_modules/@module-federation/runtime-tools/dist/runtime.cjs.js"), exports);
    //# sourceMappingURL=runtime.js.map
    },
    "./node_modules/.pnpm/isomorphic-rslog@0.0.6/node_modules/isomorphic-rslog/dist/browser/index.cjs": function(module) {
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
        module.exports = __toCommonJS(browser_exports);
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
    var module = __webpack_module_cache__[moduleId] = {
        exports: {}
    };
    // Execute the module function
    __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // Return the exports of the module
    return module.exports;
}
/************************************************************************/ // webpack/runtime/define_property_getters
(()=>{
    __webpack_require__.d = function(exports, definition) {
        for(var key in definition)if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
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
    __webpack_require__.r = function(exports) {
        if ('undefined' != typeof Symbol && Symbol.toStringTag) Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
        });
        Object.defineProperty(exports, '__esModule', {
            value: true
        });
    };
})();
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
__WEBPACK_EXTERNAL_MODULE_react__["default"].createContext(null);
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
Symbol("deferred");
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
const DataRouterContext = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createContext(null);
if ("production" !== process.env.NODE_ENV) DataRouterContext.displayName = "DataRouter";
const DataRouterStateContext = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createContext(null);
if ("production" !== process.env.NODE_ENV) DataRouterStateContext.displayName = "DataRouterState";
const AwaitContext = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createContext(null);
if ("production" !== process.env.NODE_ENV) AwaitContext.displayName = "Await";
/**
 * A Navigator is a "location changer"; it's how you get to different locations.
 *
 * Every history instance conforms to the Navigator interface, but the
 * distinction is useful primarily when it comes to the low-level `<Router>` API
 * where both the location and a navigator must be provided separately in order
 * to avoid "tearing" that may occur in a suspense-enabled app if the action
 * and/or location were to be read directly from the history instance.
 */ const NavigationContext = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createContext(null);
if ("production" !== process.env.NODE_ENV) NavigationContext.displayName = "Navigation";
const LocationContext = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createContext(null);
if ("production" !== process.env.NODE_ENV) LocationContext.displayName = "Location";
const RouteContext = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createContext({
    outlet: null,
    matches: [],
    isDataRoute: false
});
if ("production" !== process.env.NODE_ENV) RouteContext.displayName = "Route";
const RouteErrorContext = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createContext(null);
if ("production" !== process.env.NODE_ENV) RouteErrorContext.displayName = "RouteError";
/**
 * Returns the full href for the given "to" value. This is useful for building
 * custom links that are also accessible and preserve right-click behavior.
 *
 * @see https://reactrouter.com/v6/hooks/use-href
 */ function dist_useHref(to, _temp) {
    let { relative } = void 0 === _temp ? {} : _temp;
    useInRouterContext() || ("production" !== process.env.NODE_ENV ? invariant(false, // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component.") : invariant(false));
    let { basename, navigator } = __WEBPACK_EXTERNAL_MODULE_react__.useContext(NavigationContext);
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
    return navigator.createHref({
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
    return null != __WEBPACK_EXTERNAL_MODULE_react__.useContext(LocationContext);
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
    useInRouterContext() || ("production" !== process.env.NODE_ENV ? invariant(false, // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component.") : invariant(false));
    return __WEBPACK_EXTERNAL_MODULE_react__.useContext(LocationContext).location;
}
/**
 * Returns the current navigation action which describes how the router came to
 * the current location, either by a pop, push, or replace on the history stack.
 *
 * @see https://reactrouter.com/v6/hooks/use-navigation-type
 */ function useNavigationType() {
    return __WEBPACK_EXTERNAL_MODULE_react__.useContext(LocationContext).navigationType;
}
/**
 * Returns a PathMatch object if the given pattern matches the current URL.
 * This is useful for components that need to know "active" state, e.g.
 * `<NavLink>`.
 *
 * @see https://reactrouter.com/v6/hooks/use-match
 */ function useMatch(pattern) {
    useInRouterContext() || ("production" !== process.env.NODE_ENV ? invariant(false, // router loaded. We can help them understand how to avoid that.
    "useMatch() may be used only in the context of a <Router> component.") : invariant(false));
    let { pathname } = useLocation();
    return __WEBPACK_EXTERNAL_MODULE_react__.useMemo(()=>matchPath(pattern, decodePath(pathname)), [
        pathname,
        pattern
    ]);
}
/**
 * The interface for the navigate() function returned from useNavigate().
 */ const navigateEffectWarning = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
// Mute warnings for calls to useNavigate in SSR environments
function useIsomorphicLayoutEffect(cb) {
    let isStatic = __WEBPACK_EXTERNAL_MODULE_react__.useContext(NavigationContext).static;
    if (!isStatic) // We should be able to get rid of this once react 18.3 is released
    // See: https://github.com/facebook/react/pull/26395
    // eslint-disable-next-line react-hooks/rules-of-hooks
    __WEBPACK_EXTERNAL_MODULE_react__.useLayoutEffect(cb);
}
/**
 * Returns an imperative method for changing the location. Used by `<Link>`s, but
 * may also be used by other elements to change the location.
 *
 * @see https://reactrouter.com/v6/hooks/use-navigate
 */ function useNavigate() {
    let { isDataRoute } = __WEBPACK_EXTERNAL_MODULE_react__.useContext(RouteContext);
    // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
    useInRouterContext() || ("production" !== process.env.NODE_ENV ? invariant(false, // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component.") : invariant(false));
    let dataRouterContext = __WEBPACK_EXTERNAL_MODULE_react__.useContext(DataRouterContext);
    let { basename, future, navigator } = __WEBPACK_EXTERNAL_MODULE_react__.useContext(NavigationContext);
    let { matches } = __WEBPACK_EXTERNAL_MODULE_react__.useContext(RouteContext);
    let { pathname: locationPathname } = useLocation();
    let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
    let activeRef = __WEBPACK_EXTERNAL_MODULE_react__.useRef(false);
    useIsomorphicLayoutEffect(()=>{
        activeRef.current = true;
    });
    let navigate = __WEBPACK_EXTERNAL_MODULE_react__.useCallback(function(to, options) {
        if (void 0 === options) options = {};
        "production" !== process.env.NODE_ENV && warning(activeRef.current, navigateEffectWarning);
        // Short circuit here since if this happens on first render the navigate
        // is useless because we haven't wired up our history listener yet
        if (!activeRef.current) return;
        if ("number" == typeof to) {
            navigator.go(to);
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
        (options.replace ? navigator.replace : navigator.push)(path, options.state, options);
    }, [
        basename,
        navigator,
        routePathnamesJson,
        locationPathname,
        dataRouterContext
    ]);
    return navigate;
}
const OutletContext = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createContext(null);
/**
 * Returns the context (if provided) for the child route at this level of the route
 * hierarchy.
 * @see https://reactrouter.com/v6/hooks/use-outlet-context
 */ function useOutletContext() {
    return __WEBPACK_EXTERNAL_MODULE_react__.useContext(OutletContext);
}
/**
 * Returns the element for the child route at this level of the route
 * hierarchy. Used internally by `<Outlet>` to render child routes.
 *
 * @see https://reactrouter.com/v6/hooks/use-outlet
 */ function useOutlet(context) {
    let outlet = __WEBPACK_EXTERNAL_MODULE_react__.useContext(RouteContext).outlet;
    if (outlet) return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(OutletContext.Provider, {
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
    let { matches } = __WEBPACK_EXTERNAL_MODULE_react__.useContext(RouteContext);
    let routeMatch = matches[matches.length - 1];
    return routeMatch ? routeMatch.params : {};
}
/**
 * Resolves the pathname of the given `to` value against the current location.
 *
 * @see https://reactrouter.com/v6/hooks/use-resolved-path
 */ function useResolvedPath(to, _temp2) {
    let { relative } = void 0 === _temp2 ? {} : _temp2;
    let { future } = __WEBPACK_EXTERNAL_MODULE_react__.useContext(NavigationContext);
    let { matches } = __WEBPACK_EXTERNAL_MODULE_react__.useContext(RouteContext);
    let { pathname: locationPathname } = useLocation();
    let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
    return __WEBPACK_EXTERNAL_MODULE_react__.useMemo(()=>resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, "path" === relative), [
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
    useInRouterContext() || ("production" !== process.env.NODE_ENV ? invariant(false, // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component.") : invariant(false));
    let { navigator } = __WEBPACK_EXTERNAL_MODULE_react__.useContext(NavigationContext);
    let { matches: parentMatches } = __WEBPACK_EXTERNAL_MODULE_react__.useContext(RouteContext);
    let routeMatch = parentMatches[parentMatches.length - 1];
    let parentParams = routeMatch ? routeMatch.params : {};
    let parentPathname = routeMatch ? routeMatch.pathname : "/";
    let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
    let parentRoute = routeMatch && routeMatch.route;
    if ("production" !== process.env.NODE_ENV) {
        // You won't get a warning about 2 different <Routes> under a <Route>
        // without a trailing *, but this is a best-effort warning anyway since we
        // cannot even give the warning unless they land at the parent route.
        //
        // Example:
        //
        // <Routes>
        //   {/* This route path MUST end with /* because otherwise
        //       it will never match /blog/post/123 */}
        //   <Route path="blog" element={<Blog />} />
        //   <Route path="blog/feed" element={<BlogFeed />} />
        // </Routes>
        //
        // function Blog() {
        //   return (
        //     <Routes>
        //       <Route path="post/:id" element={<Post />} />
        //     </Routes>
        //   );
        // }
        let parentPath = parentRoute && parentRoute.path || "";
        warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ("\"" + parentPathname + "\" (under <Route path=\"" + parentPath) + '">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won\'t match anymore and therefore the child routes will never render.\n\n' + ("Please change the parent <Route path=\"" + parentPath) + "\"> to <Route " + ("path=\"" + ("/" === parentPath ? "*" : parentPath + "/*")) + "\">.");
    }
    let locationFromContext = useLocation();
    let location;
    if (locationArg) {
        var _parsedLocationArg$pa;
        let parsedLocationArg = "string" == typeof locationArg ? parsePath(locationArg) : locationArg;
        "/" === parentPathnameBase || (null == (_parsedLocationArg$pa = parsedLocationArg.pathname) ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase)) || ("production" !== process.env.NODE_ENV ? invariant(false, 'When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "' + parentPathnameBase + "\" " + ("but pathname \"" + parsedLocationArg.pathname) + "\" was given in the `location` prop.") : invariant(false));
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
    if ("production" !== process.env.NODE_ENV) {
        "production" !== process.env.NODE_ENV && warning(parentRoute || null != matches, "No routes matched location \"" + location.pathname + location.search + location.hash + "\" ");
        "production" !== process.env.NODE_ENV && warning(null == matches || void 0 !== matches[matches.length - 1].route.element || void 0 !== matches[matches.length - 1].route.Component || void 0 !== matches[matches.length - 1].route.lazy, "Matched leaf route at location \"" + location.pathname + location.search + location.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
    }
    let renderedMatches = _renderMatches(matches && matches.map((match)=>Object.assign({}, match, {
            params: Object.assign({}, parentParams, match.params),
            pathname: joinPaths([
                parentPathnameBase,
                // Re-encode pathnames that were decoded inside matchRoutes
                navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname
            ]),
            pathnameBase: "/" === match.pathnameBase ? parentPathnameBase : joinPaths([
                parentPathnameBase,
                // Re-encode pathnames that were decoded inside matchRoutes
                navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
            ])
        })), parentMatches, dataRouterState, future);
    // When a user passes in a `locationArg`, the associated routes need to
    // be wrapped in a new `LocationContext.Provider` in order for `useLocation`
    // to use the scoped location instead of the global location.
    if (locationArg && renderedMatches) return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(LocationContext.Provider, {
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
    let codeStyles = {
        padding: "2px 4px",
        backgroundColor: lightgrey
    };
    let devInfo = null;
    if ("production" !== process.env.NODE_ENV) {
        console.error("Error handled by React Router default ErrorBoundary:", error);
        devInfo = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(__WEBPACK_EXTERNAL_MODULE_react__.Fragment, null, /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement("p", null, "\uD83D\uDCBF Hey developer \uD83D\uDC4B"), /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement("code", {
            style: codeStyles
        }, "ErrorBoundary"), " or", " ", /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement("code", {
            style: codeStyles
        }, "errorElement"), " prop on your route."));
    }
    return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(__WEBPACK_EXTERNAL_MODULE_react__.Fragment, null, /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement("h2", null, "Unexpected Application Error!"), /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement("h3", {
        style: {
            fontStyle: "italic"
        }
    }, message), stack ? /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement("pre", {
        style: preStyles
    }, stack) : null, devInfo);
}
const defaultErrorElement = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(DefaultErrorComponent, null);
class RenderErrorBoundary extends __WEBPACK_EXTERNAL_MODULE_react__.Component {
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
        return void 0 !== this.state.error ? /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(RouteContext.Provider, {
            value: this.props.routeContext
        }, /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(RouteErrorContext.Provider, {
            value: this.state.error,
            children: this.props.component
        })) : this.props.children;
    }
}
function RenderedRoute(_ref) {
    let { routeContext, match, children } = _ref;
    let dataRouterContext = __WEBPACK_EXTERNAL_MODULE_react__.useContext(DataRouterContext);
    // Track how deep we got in our render pass to emulate SSR componentDidCatch
    // in a DataStaticRouter
    if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
    return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(RouteContext.Provider, {
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
        errorIndex >= 0 || ("production" !== process.env.NODE_ENV ? invariant(false, "Could not find a matching route for errors on route IDs: " + Object.keys(errors).join(",")) : invariant(false));
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
            children = error ? errorElement : shouldRenderHydrateFallback ? hydrateFallbackElement : match.route.Component ? /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(match.route.Component, null) : match.route.element ? match.route.element : outlet;
            return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(RenderedRoute, {
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
        return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || 0 === index) ? /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(RenderErrorBoundary, {
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
    let ctx = __WEBPACK_EXTERNAL_MODULE_react__.useContext(DataRouterContext);
    ctx || ("production" !== process.env.NODE_ENV ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false));
    return ctx;
}
function useDataRouterState(hookName) {
    let state = __WEBPACK_EXTERNAL_MODULE_react__.useContext(DataRouterStateContext);
    state || ("production" !== process.env.NODE_ENV ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false));
    return state;
}
function useRouteContext(hookName) {
    let route = __WEBPACK_EXTERNAL_MODULE_react__.useContext(RouteContext);
    route || ("production" !== process.env.NODE_ENV ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false));
    return route;
}
// Internal version with hookName-aware debugging
function useCurrentRouteId(hookName) {
    let route = useRouteContext(hookName);
    let thisRoute = route.matches[route.matches.length - 1];
    thisRoute.route.id || ("production" !== process.env.NODE_ENV ? invariant(false, hookName + " can only be used on routes that contain a unique \"id\"") : invariant(false));
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
    return __WEBPACK_EXTERNAL_MODULE_react__.useMemo(()=>({
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
    return __WEBPACK_EXTERNAL_MODULE_react__.useMemo(()=>matches.map((m)=>convertRouteMatchToUiMatch(m, loaderData)), [
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
    let error = __WEBPACK_EXTERNAL_MODULE_react__.useContext(RouteErrorContext);
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
    let value = __WEBPACK_EXTERNAL_MODULE_react__.useContext(AwaitContext);
    return null == value ? void 0 : value._data;
}
/**
 * Returns the error from the nearest ancestor `<Await />` value
 */ function useAsyncError() {
    let value = __WEBPACK_EXTERNAL_MODULE_react__.useContext(AwaitContext);
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
    let [blockerKey, setBlockerKey] = __WEBPACK_EXTERNAL_MODULE_react__.useState("");
    let blockerFunction = __WEBPACK_EXTERNAL_MODULE_react__.useCallback((arg)=>{
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
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>{
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
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>{
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
    let activeRef = __WEBPACK_EXTERNAL_MODULE_react__.useRef(false);
    useIsomorphicLayoutEffect(()=>{
        activeRef.current = true;
    });
    let navigate = __WEBPACK_EXTERNAL_MODULE_react__.useCallback(function(to, options) {
        if (void 0 === options) options = {};
        "production" !== process.env.NODE_ENV && warning(activeRef.current, navigateEffectWarning);
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
    if (!cond && !alreadyWarned$1[key]) {
        alreadyWarned$1[key] = true;
        "production" !== process.env.NODE_ENV && warning(false, message);
    }
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
const startTransitionImpl = __WEBPACK_EXTERNAL_MODULE_react__[START_TRANSITION];
/**
 * A `<Router>` that stores all entries in memory.
 *
 * @see https://reactrouter.com/v6/router-components/memory-router
 */ function MemoryRouter(_ref3) {
    let { basename, children, initialEntries, initialIndex, future } = _ref3;
    let historyRef = __WEBPACK_EXTERNAL_MODULE_react__.useRef();
    if (null == historyRef.current) historyRef.current = createMemoryHistory({
        initialEntries,
        initialIndex,
        v5Compat: true
    });
    let history = historyRef.current;
    let [state, setStateImpl] = __WEBPACK_EXTERNAL_MODULE_react__.useState({
        action: history.action,
        location: history.location
    });
    let { v7_startTransition } = future || {};
    let setState = __WEBPACK_EXTERNAL_MODULE_react__.useCallback((newState)=>{
        v7_startTransition && startTransitionImpl ? startTransitionImpl(()=>setStateImpl(newState)) : setStateImpl(newState);
    }, [
        setStateImpl,
        v7_startTransition
    ]);
    __WEBPACK_EXTERNAL_MODULE_react__.useLayoutEffect(()=>history.listen(setState), [
        history,
        setState
    ]);
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>logV6DeprecationWarnings(future), [
        future
    ]);
    return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(Router, {
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
    useInRouterContext() || ("production" !== process.env.NODE_ENV ? invariant(false, // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component.") : invariant(false));
    let { future, static: isStatic } = __WEBPACK_EXTERNAL_MODULE_react__.useContext(NavigationContext);
    "production" !== process.env.NODE_ENV && warning(!isStatic, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
    let { matches } = __WEBPACK_EXTERNAL_MODULE_react__.useContext(RouteContext);
    let { pathname: locationPathname } = useLocation();
    let navigate = useNavigate();
    // Resolve the path outside of the effect so that when effects run twice in
    // StrictMode they navigate to the same place
    let path = resolveTo(to, getResolveToMatches(matches, future.v7_relativeSplatPath), locationPathname, "path" === relative);
    let jsonPath = JSON.stringify(path);
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>navigate(JSON.parse(jsonPath), {
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
    "production" !== process.env.NODE_ENV ? invariant(false, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : invariant(false);
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
    let { basename: basenameProp = "/", children = null, location: locationProp, navigationType = router_Action.Pop, navigator, static: staticProp = false, future } = _ref5;
    !useInRouterContext() || ("production" !== process.env.NODE_ENV ? invariant(false, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : invariant(false));
    // Preserve trailing slashes on basename, so we can let the user control
    // the enforcement of trailing slashes throughout the app
    let basename = basenameProp.replace(/^\/*/, "/");
    let navigationContext = __WEBPACK_EXTERNAL_MODULE_react__.useMemo(()=>({
            basename,
            navigator,
            static: staticProp,
            future: dist_extends({
                v7_relativeSplatPath: false
            }, future)
        }), [
        basename,
        future,
        navigator,
        staticProp
    ]);
    if ("string" == typeof locationProp) locationProp = parsePath(locationProp);
    let { pathname = "/", search = "", hash = "", state = null, key = "default" } = locationProp;
    let locationContext = __WEBPACK_EXTERNAL_MODULE_react__.useMemo(()=>{
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
    "production" !== process.env.NODE_ENV && warning(null != locationContext, "<Router basename=\"" + basename + "\"> is not able to match the URL " + ("\"" + pathname + search + hash) + "\" because it does not start with the basename, so the <Router> won't render anything.");
    if (null == locationContext) return null;
    return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(NavigationContext.Provider, {
        value: navigationContext
    }, /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(LocationContext.Provider, {
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
    return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(AwaitErrorBoundary, {
        resolve: resolve,
        errorElement: errorElement
    }, /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(ResolveAwait, null, children));
}
var dist_AwaitRenderStatus = /*#__PURE__*/ function(AwaitRenderStatus) {
    AwaitRenderStatus[AwaitRenderStatus["pending"] = 0] = "pending";
    AwaitRenderStatus[AwaitRenderStatus["success"] = 1] = "success";
    AwaitRenderStatus[AwaitRenderStatus["error"] = 2] = "error";
    return AwaitRenderStatus;
}(dist_AwaitRenderStatus || {});
const neverSettledPromise = new Promise(()=>{});
class AwaitErrorBoundary extends __WEBPACK_EXTERNAL_MODULE_react__.Component {
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
        return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(AwaitContext.Provider, {
            value: promise,
            children: errorElement
        });
        if (status === dist_AwaitRenderStatus.success) // Render children with resolved value
        return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(AwaitContext.Provider, {
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
    return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(__WEBPACK_EXTERNAL_MODULE_react__.Fragment, null, toRender);
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
    __WEBPACK_EXTERNAL_MODULE_react__.Children.forEach(children, (element, index)=>{
        if (!/*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.isValidElement(element)) // Ignore non-elements. This allows people to more easily inline
        // conditionals in their route config.
        return;
        let treePath = [
            ...parentPath,
            index
        ];
        if (element.type === __WEBPACK_EXTERNAL_MODULE_react__.Fragment) {
            // Transparently support React.Fragment and its children.
            routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
            return;
        }
        element.type !== Route && ("production" !== process.env.NODE_ENV ? invariant(false, "[" + ("string" == typeof element.type ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : invariant(false));
        !element.props.index || !element.props.children || ("production" !== process.env.NODE_ENV ? invariant(false, "An index route cannot have child routes.") : invariant(false));
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
    if (route.Component) {
        if ("production" !== process.env.NODE_ENV) {
            if (route.element) "production" !== process.env.NODE_ENV && warning(false, "You should not include both `Component` and `element` on your route - `Component` will be used.");
        }
        Object.assign(updates, {
            element: /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(route.Component),
            Component: void 0
        });
    }
    if (route.HydrateFallback) {
        if ("production" !== process.env.NODE_ENV) {
            if (route.hydrateFallbackElement) "production" !== process.env.NODE_ENV && warning(false, "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used.");
        }
        Object.assign(updates, {
            hydrateFallbackElement: /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(route.HydrateFallback),
            HydrateFallback: void 0
        });
    }
    if (route.ErrorBoundary) {
        if ("production" !== process.env.NODE_ENV) {
            if (route.errorElement) "production" !== process.env.NODE_ENV && warning(false, "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used.");
        }
        Object.assign(updates, {
            errorElement: /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(route.ErrorBoundary),
            ErrorBoundary: void 0
        });
    }
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
    if (null != encType && !supportedFormEncTypes.has(encType)) {
        "production" !== process.env.NODE_ENV && warning(false, "\"" + encType + "\" is not a valid `encType` for `<Form>`/`<fetcher.Form>` " + ("and will default to \"" + defaultEncType) + "\"");
        return null;
    }
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
const ViewTransitionContext = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createContext({
    isTransitioning: false
});
if ("production" !== process.env.NODE_ENV) ViewTransitionContext.displayName = "ViewTransition";
const FetchersContext = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createContext(new Map());
if ("production" !== process.env.NODE_ENV) FetchersContext.displayName = "Fetchers";
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
const dist_startTransitionImpl = __WEBPACK_EXTERNAL_MODULE_react__[dist_START_TRANSITION];
const FLUSH_SYNC = "flushSync";
const flushSyncImpl = __WEBPACK_EXTERNAL_MODULE_react_dom__[FLUSH_SYNC];
const USE_ID = "useId";
const useIdImpl = __WEBPACK_EXTERNAL_MODULE_react__[USE_ID];
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
    let [state, setStateImpl] = __WEBPACK_EXTERNAL_MODULE_react__.useState(router.state);
    let [pendingState, setPendingState] = __WEBPACK_EXTERNAL_MODULE_react__.useState();
    let [vtContext, setVtContext] = __WEBPACK_EXTERNAL_MODULE_react__.useState({
        isTransitioning: false
    });
    let [renderDfd, setRenderDfd] = __WEBPACK_EXTERNAL_MODULE_react__.useState();
    let [transition, setTransition] = __WEBPACK_EXTERNAL_MODULE_react__.useState();
    let [interruption, setInterruption] = __WEBPACK_EXTERNAL_MODULE_react__.useState();
    let fetcherData = __WEBPACK_EXTERNAL_MODULE_react__.useRef(new Map());
    let { v7_startTransition } = future || {};
    let optInStartTransition = __WEBPACK_EXTERNAL_MODULE_react__.useCallback((cb)=>{
        if (v7_startTransition) startTransitionSafe(cb);
        else cb();
    }, [
        v7_startTransition
    ]);
    let setState = __WEBPACK_EXTERNAL_MODULE_react__.useCallback((newState, _ref2)=>{
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
    __WEBPACK_EXTERNAL_MODULE_react__.useLayoutEffect(()=>router.subscribe(setState), [
        router,
        setState
    ]);
    // When we start a view transition, create a Deferred we can use for the
    // eventual "completed" render
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>{
        if (vtContext.isTransitioning && !vtContext.flushSync) setRenderDfd(new Deferred());
    }, [
        vtContext
    ]);
    // Once the deferred is created, kick off startViewTransition() to update the
    // DOM and then wait on the Deferred to resolve (indicating the DOM update has
    // happened)
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>{
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
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>{
        if (renderDfd && pendingState && state.location.key === pendingState.location.key) renderDfd.resolve();
    }, [
        renderDfd,
        transition,
        state.location,
        pendingState
    ]);
    // If we get interrupted with a new navigation during a transition, we skip
    // the active transition, let it cleanup, then kick it off again here
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>{
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
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>{
        "production" !== process.env.NODE_ENV && warning(null == fallbackElement || !router.future.v7_partialHydration, "`<RouterProvider fallbackElement>` is deprecated when using `v7_partialHydration`, use a `HydrateFallback` component instead");
    // Only log this once on initial mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    let navigator = __WEBPACK_EXTERNAL_MODULE_react__.useMemo(()=>({
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
    let dataRouterContext = __WEBPACK_EXTERNAL_MODULE_react__.useMemo(()=>({
            router,
            navigator,
            static: false,
            basename
        }), [
        router,
        navigator,
        basename
    ]);
    let routerFuture = __WEBPACK_EXTERNAL_MODULE_react__.useMemo(()=>({
            v7_relativeSplatPath: router.future.v7_relativeSplatPath
        }), [
        router.future.v7_relativeSplatPath
    ]);
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>logV6DeprecationWarnings(future, router.future), [
        future,
        router.future
    ]);
    // The fragment and {null} here are important!  We need them to keep React 18's
    // useId happy when we are server-rendering since we may have a <script> here
    // containing the hydrated server-side staticContext (from StaticRouterProvider).
    // useId relies on the component tree structure to generate deterministic id's
    // so we need to ensure it remains the same on the client even though
    // we don't need the <script> tag
    return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(__WEBPACK_EXTERNAL_MODULE_react__.Fragment, null, /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(DataRouterContext.Provider, {
        value: dataRouterContext
    }, /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(DataRouterStateContext.Provider, {
        value: state
    }, /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(FetchersContext.Provider, {
        value: fetcherData.current
    }, /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(ViewTransitionContext.Provider, {
        value: vtContext
    }, /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(Router, {
        basename: basename,
        location: state.location,
        navigationType: state.historyAction,
        navigator: navigator,
        future: routerFuture
    }, state.initialized || router.future.v7_partialHydration ? /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(MemoizedDataRoutes, {
        routes: router.routes,
        future: router.future,
        state: state
    }) : fallbackElement))))), null);
}
// Memoize to avoid re-renders when updating `ViewTransitionContext`
const MemoizedDataRoutes = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.memo(dist_DataRoutes);
function dist_DataRoutes(_ref3) {
    let { routes, future, state } = _ref3;
    return useRoutesImpl(routes, void 0, state, future);
}
/**
 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
 */ function BrowserRouter(_ref4) {
    let { basename, children, future, window: window1 } = _ref4;
    let historyRef = __WEBPACK_EXTERNAL_MODULE_react__.useRef();
    if (null == historyRef.current) historyRef.current = createBrowserHistory({
        window: window1,
        v5Compat: true
    });
    let history = historyRef.current;
    let [state, setStateImpl] = __WEBPACK_EXTERNAL_MODULE_react__.useState({
        action: history.action,
        location: history.location
    });
    let { v7_startTransition } = future || {};
    let setState = __WEBPACK_EXTERNAL_MODULE_react__.useCallback((newState)=>{
        v7_startTransition && dist_startTransitionImpl ? dist_startTransitionImpl(()=>setStateImpl(newState)) : setStateImpl(newState);
    }, [
        setStateImpl,
        v7_startTransition
    ]);
    __WEBPACK_EXTERNAL_MODULE_react__.useLayoutEffect(()=>history.listen(setState), [
        history,
        setState
    ]);
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>logV6DeprecationWarnings(future), [
        future
    ]);
    return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(Router, {
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
    let historyRef = __WEBPACK_EXTERNAL_MODULE_react__.useRef();
    if (null == historyRef.current) historyRef.current = createHashHistory({
        window: window1,
        v5Compat: true
    });
    let history = historyRef.current;
    let [state, setStateImpl] = __WEBPACK_EXTERNAL_MODULE_react__.useState({
        action: history.action,
        location: history.location
    });
    let { v7_startTransition } = future || {};
    let setState = __WEBPACK_EXTERNAL_MODULE_react__.useCallback((newState)=>{
        v7_startTransition && dist_startTransitionImpl ? dist_startTransitionImpl(()=>setStateImpl(newState)) : setStateImpl(newState);
    }, [
        setStateImpl,
        v7_startTransition
    ]);
    __WEBPACK_EXTERNAL_MODULE_react__.useLayoutEffect(()=>history.listen(setState), [
        history,
        setState
    ]);
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>logV6DeprecationWarnings(future), [
        future
    ]);
    return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(Router, {
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
    let [state, setStateImpl] = __WEBPACK_EXTERNAL_MODULE_react__.useState({
        action: history.action,
        location: history.location
    });
    let { v7_startTransition } = future || {};
    let setState = __WEBPACK_EXTERNAL_MODULE_react__.useCallback((newState)=>{
        v7_startTransition && dist_startTransitionImpl ? dist_startTransitionImpl(()=>setStateImpl(newState)) : setStateImpl(newState);
    }, [
        setStateImpl,
        v7_startTransition
    ]);
    __WEBPACK_EXTERNAL_MODULE_react__.useLayoutEffect(()=>history.listen(setState), [
        history,
        setState
    ]);
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>logV6DeprecationWarnings(future), [
        future
    ]);
    return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(Router, {
        basename: basename,
        children: children,
        location: state.location,
        navigationType: state.action,
        navigator: history,
        future: future
    });
}
if ("production" !== process.env.NODE_ENV) HistoryRouter.displayName = "unstable_HistoryRouter";
const dist_isBrowser = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement;
const dist_ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
/**
 * The public API for rendering a history-aware `<a>`.
 */ const Link = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.forwardRef(function(_ref7, ref) {
    let { onClick, relative, reloadDocument, replace, state, target, to, preventScrollReset, viewTransition } = _ref7, rest = _objectWithoutPropertiesLoose(_ref7, _excluded);
    let { basename } = __WEBPACK_EXTERNAL_MODULE_react__.useContext(NavigationContext);
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
        } catch (e) {
            // We can't do external URL detection without a valid URL
            "production" !== process.env.NODE_ENV && warning(false, "<Link to=\"" + to + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
        }
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
    __WEBPACK_EXTERNAL_MODULE_react__.createElement("a", react_router_dom_dist_extends({}, rest, {
        href: absoluteHref || href,
        onClick: isExternal || reloadDocument ? onClick : handleClick,
        ref: ref,
        target: target
    })));
});
if ("production" !== process.env.NODE_ENV) Link.displayName = "Link";
/**
 * A `<Link>` wrapper that knows if it's "active" or not.
 */ const NavLink = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.forwardRef(function(_ref8, ref) {
    let { "aria-current": ariaCurrentProp = "page", caseSensitive = false, className: classNameProp = "", end = false, style: styleProp, to, viewTransition, children } = _ref8, rest = _objectWithoutPropertiesLoose(_ref8, _excluded2);
    let path = useResolvedPath(to, {
        relative: rest.relative
    });
    let location = useLocation();
    let routerState = __WEBPACK_EXTERNAL_MODULE_react__.useContext(DataRouterStateContext);
    let { navigator, basename } = __WEBPACK_EXTERNAL_MODULE_react__.useContext(NavigationContext);
    let isTransitioning = null != routerState && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useViewTransitionState(path) && true === viewTransition;
    let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
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
    return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(Link, react_router_dom_dist_extends({}, rest, {
        "aria-current": ariaCurrent,
        className: className,
        ref: ref,
        style: style,
        to: to,
        viewTransition: viewTransition
    }), "function" == typeof children ? children(renderProps) : children);
});
if ("production" !== process.env.NODE_ENV) NavLink.displayName = "NavLink";
/**
 * A `@remix-run/router`-aware `<form>`. It behaves like a normal form except
 * that the interaction with the server is with `fetch` instead of new document
 * requests, allowing components to add nicer UX to the page as the form is
 * submitted and returns with data.
 */ const Form = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.forwardRef((_ref9, forwardedRef)=>{
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
    return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement("form", react_router_dom_dist_extends({
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : submitHandler
    }, props));
});
if ("production" !== process.env.NODE_ENV) Form.displayName = "Form";
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
if ("production" !== process.env.NODE_ENV) ScrollRestoration.displayName = "ScrollRestoration";
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
    let ctx = __WEBPACK_EXTERNAL_MODULE_react__.useContext(DataRouterContext);
    ctx || ("production" !== process.env.NODE_ENV ? invariant(false, dist_getDataRouterConsoleError(hookName)) : invariant(false));
    return ctx;
}
function dist_useDataRouterState(hookName) {
    let state = __WEBPACK_EXTERNAL_MODULE_react__.useContext(DataRouterStateContext);
    state || ("production" !== process.env.NODE_ENV ? invariant(false, dist_getDataRouterConsoleError(hookName)) : invariant(false));
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
    return __WEBPACK_EXTERNAL_MODULE_react__.useCallback((event)=>{
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
    "production" !== process.env.NODE_ENV && warning("undefined" != typeof URLSearchParams, "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");
    let defaultSearchParamsRef = __WEBPACK_EXTERNAL_MODULE_react__.useRef(createSearchParams(defaultInit));
    let hasSetSearchParamsRef = __WEBPACK_EXTERNAL_MODULE_react__.useRef(false);
    let location = useLocation();
    let searchParams = __WEBPACK_EXTERNAL_MODULE_react__.useMemo(()=>// Only merge in the defaults if we haven't yet called setSearchParams.
        // Once we call that we want those to take precedence, otherwise you can't
        // remove a param with setSearchParams({}) if it has an initial value
        getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current), [
        location.search
    ]);
    let navigate = useNavigate();
    let setSearchParams = __WEBPACK_EXTERNAL_MODULE_react__.useCallback((nextInit, navigateOptions)=>{
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
    let { basename } = __WEBPACK_EXTERNAL_MODULE_react__.useContext(NavigationContext);
    let currentRouteId = useRouteId();
    return __WEBPACK_EXTERNAL_MODULE_react__.useCallback(function(target, options) {
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
    let { basename } = __WEBPACK_EXTERNAL_MODULE_react__.useContext(NavigationContext);
    let routeContext = __WEBPACK_EXTERNAL_MODULE_react__.useContext(RouteContext);
    routeContext || ("production" !== process.env.NODE_ENV ? invariant(false, "useFormAction must be used inside a RouteContext") : invariant(false));
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
    let fetcherData = __WEBPACK_EXTERNAL_MODULE_react__.useContext(FetchersContext);
    let route = __WEBPACK_EXTERNAL_MODULE_react__.useContext(RouteContext);
    let routeId = null == (_route$matches = route.matches[route.matches.length - 1]) ? void 0 : _route$matches.route.id;
    fetcherData || ("production" !== process.env.NODE_ENV ? invariant(false, "useFetcher must be used inside a FetchersContext") : invariant(false));
    route || ("production" !== process.env.NODE_ENV ? invariant(false, "useFetcher must be used inside a RouteContext") : invariant(false));
    null != routeId || ("production" !== process.env.NODE_ENV ? invariant(false, "useFetcher can only be used on routes that contain a unique \"id\"") : invariant(false));
    // Fetcher key handling
    // OK to call conditionally to feature detect `useId`
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let defaultKey = useIdImpl ? useIdImpl() : "";
    let [fetcherKey, setFetcherKey] = __WEBPACK_EXTERNAL_MODULE_react__.useState(key || defaultKey);
    if (key && key !== fetcherKey) setFetcherKey(key);
    else if (!fetcherKey) // We will only fall through here when `useId` is not available
    setFetcherKey(getUniqueFetcherId());
    // Registration/cleanup
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>{
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
    let load = __WEBPACK_EXTERNAL_MODULE_react__.useCallback((href, opts)=>{
        routeId || ("production" !== process.env.NODE_ENV ? invariant(false, "No routeId available for fetcher.load()") : invariant(false));
        router.fetch(fetcherKey, routeId, href, opts);
    }, [
        fetcherKey,
        routeId,
        router
    ]);
    let submitImpl = useSubmit();
    let submit = __WEBPACK_EXTERNAL_MODULE_react__.useCallback((target, opts)=>{
        submitImpl(target, react_router_dom_dist_extends({}, opts, {
            navigate: false,
            fetcherKey
        }));
    }, [
        fetcherKey,
        submitImpl
    ]);
    let FetcherForm = __WEBPACK_EXTERNAL_MODULE_react__.useMemo(()=>{
        let FetcherForm = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.forwardRef((props, ref)=>/*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__.createElement(Form, react_router_dom_dist_extends({}, props, {
                navigate: false,
                fetcherKey: fetcherKey,
                ref: ref
            })));
        if ("production" !== process.env.NODE_ENV) FetcherForm.displayName = "fetcher.Form";
        return FetcherForm;
    }, [
        fetcherKey
    ]);
    // Exposed FetcherWithComponents
    let fetcher = state.fetchers.get(fetcherKey) || IDLE_FETCHER;
    let data = fetcherData.get(fetcherKey);
    let fetcherWithComponents = __WEBPACK_EXTERNAL_MODULE_react__.useMemo(()=>react_router_dom_dist_extends({
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
    let { basename } = __WEBPACK_EXTERNAL_MODULE_react__.useContext(NavigationContext);
    let location = useLocation();
    let matches = useMatches();
    let navigation = useNavigation();
    // Trigger manual scroll restoration while we're active
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>{
        window.history.scrollRestoration = "manual";
        return ()=>{
            window.history.scrollRestoration = "auto";
        };
    }, []);
    // Save positions on pagehide
    usePageHide(__WEBPACK_EXTERNAL_MODULE_react__.useCallback(()=>{
        if ("idle" === navigation.state) {
            let key = (getKey ? getKey(location, matches) : null) || location.key;
            dist_savedScrollPositions[key] = window.scrollY;
        }
        try {
            sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(dist_savedScrollPositions));
        } catch (error) {
            "production" !== process.env.NODE_ENV && warning(false, "Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (" + error + ").");
        }
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
        __WEBPACK_EXTERNAL_MODULE_react__.useLayoutEffect(()=>{
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
        __WEBPACK_EXTERNAL_MODULE_react__.useLayoutEffect(()=>{
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
        __WEBPACK_EXTERNAL_MODULE_react__.useLayoutEffect(()=>{
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
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>{
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
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>{
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
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>{
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
    __WEBPACK_EXTERNAL_MODULE_react__.useEffect(()=>{
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
    let vtContext = __WEBPACK_EXTERNAL_MODULE_react__.useContext(ViewTransitionContext);
    null != vtContext || ("production" !== process.env.NODE_ENV ? invariant(false, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : invariant(false));
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
const ErrorBoundaryContext = (0, __WEBPACK_EXTERNAL_MODULE_react__.createContext)(null);
const initialState = {
    didCatch: false,
    error: null
};
class ErrorBoundary extends __WEBPACK_EXTERNAL_MODULE_react__.Component {
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
            else if (FallbackComponent) childToRender = (0, __WEBPACK_EXTERNAL_MODULE_react__.createElement)(FallbackComponent, props);
            else if (null === fallback || (0, __WEBPACK_EXTERNAL_MODULE_react__.isValidElement)(fallback)) childToRender = fallback;
            else throw error;
        }
        return (0, __WEBPACK_EXTERNAL_MODULE_react__.createElement)(ErrorBoundaryContext.Provider, {
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
const RemoteAppWrapper = (0, __WEBPACK_EXTERNAL_MODULE_react__.forwardRef)(function(props, ref) {
    const RemoteApp2 = ()=>{
        context_CUbFnlO5_LoggerInstance.log("RemoteAppWrapper RemoteApp props >>>", {
            props
        });
        const { moduleName, memoryRoute, basename, providerInfo, className, style, fallback, ...resProps } = props;
        const instance = plugin_es_federationRuntime.instance;
        const rootRef = ref && "current" in ref ? ref : (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
        const renderDom = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
        const providerInfoRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
        context_CUbFnlO5_LoggerInstance.log("RemoteAppWrapper instance from props >>>", instance);
        (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
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
        return /* @__PURE__ */ __WEBPACK_EXTERNAL_MODULE_react__["default"].createElement("div", {
            className: rootComponentClassName,
            style: null == props ? void 0 : props.style,
            ref: rootRef
        });
    };
    RemoteApp2["__APP_VERSION__"] = "0.8.3";
    return /* @__PURE__ */ __WEBPACK_EXTERNAL_MODULE_react__["default"].createElement(RemoteApp2, null);
});
function withRouterData(WrappedComponent) {
    const Component2 = (0, __WEBPACK_EXTERNAL_MODULE_react__.forwardRef)(function(props, ref) {
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
                routerContextVal = (0, __WEBPACK_EXTERNAL_MODULE_react__.useContext)(UNSAFE_RouteContext);
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
            const [pathname, setPathname] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(location.pathname);
            (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
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
        return /* @__PURE__ */ __WEBPACK_EXTERNAL_MODULE_react__["default"].createElement(WrappedComponent, {
            ...props,
            basename,
            ref
        });
    });
    return (0, __WEBPACK_EXTERNAL_MODULE_react__.forwardRef)(function(props, ref) {
        return /* @__PURE__ */ __WEBPACK_EXTERNAL_MODULE_react__["default"].createElement(Component2, {
            ...props,
            ref
        });
    });
}
const RemoteApp = withRouterData(RemoteAppWrapper);
function createLazyRemoteComponent(info) {
    const exportName = (null == info ? void 0 : info.export) || "default";
    return __WEBPACK_EXTERNAL_MODULE_react__["default"].lazy(async ()=>{
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
                const RemoteAppComponent = (0, __WEBPACK_EXTERNAL_MODULE_react__.forwardRef)((props, ref)=>/* @__PURE__ */ __WEBPACK_EXTERNAL_MODULE_react__["default"].createElement(RemoteApp, {
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
    return (0, __WEBPACK_EXTERNAL_MODULE_react__.forwardRef)((props, ref)=>{
        const LazyComponent = createLazyRemoteComponent(info);
        return /* @__PURE__ */ __WEBPACK_EXTERNAL_MODULE_react__["default"].createElement(ErrorBoundary, {
            FallbackComponent: info.fallback
        }, /* @__PURE__ */ __WEBPACK_EXTERNAL_MODULE_react__["default"].createElement(__WEBPACK_EXTERNAL_MODULE_react__["default"].Suspense, {
            fallback: info.loading
        }, /* @__PURE__ */ __WEBPACK_EXTERNAL_MODULE_react__["default"].createElement(LazyComponent, {
            ...props,
            ref
        })));
    });
}
var client = {};
var index_es_m = __WEBPACK_EXTERNAL_MODULE_react_dom__["default"];
if ("production" === process.env.NODE_ENV) {
    client.createRoot = index_es_m.createRoot;
    client.hydrateRoot = index_es_m.hydrateRoot;
} else {
    var index_es_i = index_es_m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    client.createRoot = function(c, o) {
        index_es_i.usingClientEntryPoint = true;
        try {
            return index_es_m.createRoot(c, o);
        } finally{
            index_es_i.usingClientEntryPoint = false;
        }
    };
    client.hydrateRoot = function(c, h, o) {
        index_es_i.usingClientEntryPoint = true;
        try {
            return index_es_m.hydrateRoot(c, h, o);
        } finally{
            index_es_i.usingClientEntryPoint = false;
        }
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
    createRemoteComponent2(name1) {
        return createRemoteComponent({
            loader: ()=>(0, runtime.loadRemote)(name1),
            loading: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime__.jsx)("div", {
                children: "Loading..."
            }),
            fallback: (info)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime__.jsx)("div", {
                    children: info?.error.message
                })
        });
    }
}
/* ESM default export */ const src_rslib_entry_ = Runtime;
export { src_rslib_entry_ as default };
