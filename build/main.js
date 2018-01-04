webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Logger; });
/* unused harmony export LoggerConfig */
/* unused harmony export LoggerConsoleAppender */
var Logger = (function () {
    function Logger(name) {
        this.name = name;
        this._config = new LoggerConfig();
    }
    Logger.get = function (name) {
        // TODO: Store in a static map for persistent per logger based configuration.
        if (typeof name === 'undefined')
            return Logger.root;
        var logger = new Logger();
        logger.config.parent = Logger.root; // TODO A heirarchy based off . separators?
        return logger;
    };
    Object.defineProperty(Logger.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Logger.prototype.debug = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        this.log(Logger.DEBUG, data);
    };
    Logger.prototype.info = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        this.log(Logger.INFO, data);
    };
    Logger.prototype.error = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        this.log(Logger.ERROR, data);
    };
    Logger.prototype.log = function (level, data) {
        if (this.config.level > level)
            return;
        this.config.getAppenders().forEach(function (appender) {
            appender.log(level, data);
        });
    };
    Logger.stringValue = function (value) {
        if (typeof value === 'undefined')
            return 'undefined';
        if (value === null)
            return 'null';
        if (typeof value === 'string')
            return value;
        if (typeof value === 'number')
            return value.toString();
        if (typeof value === 'function')
            return Logger.stringValue(value());
        if (value instanceof Error) {
            // TODO: If Error then need to print a stack trace, message, etc
            return "[Error]: " + value;
        }
        // TODO: Maybe return these as some kind of wrapped type so we can group logging on them, or log the object to console, but the string version to a file
        // .. And the .toString() method will just return the string value of it, so it is kinda like just returning a string...
        // TODO: Will implement as needed...
        // TODO: ViewWrappedError
        if (value === Object(value)) {
            if (value instanceof Array) {
                // TODO: Iterate it and run each of the values ?
            }
            if (typeof value.toLog === 'function') {
                return value.toLog();
            }
            // TODO: test for certain kind of objects and run through the values of them ?.
            var cache_1 = [];
            try {
                var json = JSON.stringify(value, function (key, value) {
                    if (typeof value === 'object' && value !== null) {
                        if (cache_1.indexOf(value) !== -1) {
                            // Circular reference found, discard key
                            return '[circular]';
                        }
                        // Store value in our collection
                        cache_1.push(value);
                    }
                    return value;
                });
                if (json.length > 2000)
                    json = json.substr(0, 2000) + '...[truncated]';
                return json;
            }
            catch (err) {
                return "Error Stringifying value: " + value;
            }
        }
    };
    Logger.DEBUG = 1;
    Logger.INFO = 2;
    Logger.ERROR = 3;
    return Logger;
}());

var LoggerConfig = (function () {
    function LoggerConfig() {
        this._appenders = [];
        // Removing appenders - Do it when/if eventually needed
    }
    Object.defineProperty(LoggerConfig.prototype, "level", {
        get: function () {
            if (typeof this._level === 'undefined')
                return this.parent.config.level;
            return this._level;
        },
        set: function (value) {
            this._level = value;
        },
        enumerable: true,
        configurable: true
    });
    LoggerConfig.prototype.getAppenders = function () {
        if (typeof this.parent === 'undefined')
            return this._appenders;
        return this._appenders.concat(this.parent.config.getAppenders());
    };
    LoggerConfig.prototype.addAppender = function (appender) {
        return this._appenders.push(appender);
    };
    return LoggerConfig;
}());

var LoggerConsoleAppender = (function () {
    function LoggerConsoleAppender() {
    }
    LoggerConsoleAppender.prototype.log = function (level, data) {
        var message = data.length > 0 ? Logger.stringValue(data[0]) : '.';
        var extradata = null;
        if (message === data[0]) {
            extradata = data.slice(1);
        }
        if (level === Logger.DEBUG || level === Logger.INFO) {
            if (extradata !== null && extradata.length > 0) {
                console.groupCollapsed(message);
                console.info(extradata);
                console.groupEnd();
            }
            else {
                console.info(message);
            }
        }
        else if (level === Logger.ERROR) {
            if (extradata !== null && extradata.length > 0) {
                console.groupCollapsed(message);
                console.error(extradata);
                console.groupEnd();
            }
            else {
                console.error(message);
            }
        }
    };
    return LoggerConsoleAppender;
}());

Logger.root = new Logger();
Logger.root.config.level = Logger.DEBUG;
Logger.root.config.addAppender(new LoggerConsoleAppender());
//# sourceMappingURL=logger.js.map

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SecureAccessor */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Configuration; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_device__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_persistence_provider_manager__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_secure_storage__ = __webpack_require__(367);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var SecureAccessor = (function () {
    function SecureAccessor(configuration, scope) {
        this.configuration = configuration;
        this.scope = scope;
        this.keys = {};
    }
    SecureAccessor.prototype.removeScope = function () {
        return this.configuration.removeSecure(this.scope).then(function () { return undefined; });
    };
    SecureAccessor.prototype.removeSecure = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var scoped, originalValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configuration.getSecure(this.scope)];
                    case 1:
                        scoped = _a.sent();
                        if (scoped == null)
                            scoped = {};
                        originalValue = scoped[key];
                        delete scoped[key];
                        if (!(JSON.stringify(scoped).length < 7)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.removeScope()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.configuration.setSecure(this.scope, scoped)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.keys = {};
                        Object.keys(scoped).forEach(function (k) { return _this.keys[k] = true; });
                        return [2 /*return*/, originalValue];
                }
            });
        });
    };
    SecureAccessor.prototype.setSecure = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var scoped, originalValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (value == undefined)
                            return [2 /*return*/, this.removeSecure(key)];
                        return [4 /*yield*/, this.configuration.getSecure(this.scope)];
                    case 1:
                        scoped = _a.sent();
                        if (scoped == null)
                            scoped = {};
                        originalValue = scoped[key];
                        scoped[key] = value;
                        return [4 /*yield*/, this.configuration.setSecure(this.scope, scoped)];
                    case 2:
                        _a.sent();
                        this.keys = {};
                        Object.keys(scoped).forEach(function (k) { return _this.keys[k] = true; });
                        return [2 /*return*/, originalValue];
                }
            });
        });
    };
    SecureAccessor.prototype.getSecure = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var scoped;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configuration.getSecure(this.scope)];
                    case 1:
                        scoped = _a.sent();
                        if (scoped == null)
                            scoped = {};
                        return [2 /*return*/, scoped[key]];
                }
            });
        });
    };
    SecureAccessor.prototype.cacheKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var scoped;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configuration.getSecure(this.scope)];
                    case 1:
                        scoped = _a.sent();
                        if (scoped == null)
                            scoped = {};
                        this.keys = {};
                        Object.keys(scoped).forEach(function (k) { return _this.keys[k] = true; });
                        return [2 /*return*/];
                }
            });
        });
    };
    return SecureAccessor;
}());

var Configuration = (function () {
    function Configuration(persistenceProviderManager, platform, device, secureStorage) {
        this.persistenceProviderManager = persistenceProviderManager;
        this.platform = platform;
        this.device = device;
        this.secureStorage = secureStorage;
        this.logger = __WEBPACK_IMPORTED_MODULE_4__logger__["a" /* Logger */].get('Configuration');
        this.configured = false;
        this.cId = 'conf';
        this.temporary = {};
        this.booleanValueAccessor = (function () {
            function class_1(option, configuration) {
                this.option = option;
                this.configuration = configuration;
            }
            Object.defineProperty(class_1.prototype, "value", {
                get: function () {
                    return this.configuration.persistence.keyStore(this.configuration.cId, this.option) === 'true';
                },
                set: function (value) {
                    this.configuration.persistence.keyStore(this.configuration.cId, this.option, value === undefined ? undefined : value ? 'true' : 'false');
                },
                enumerable: true,
                configurable: true
            });
            return class_1;
        }());
    }
    Configuration.prototype.option = function (option, value) {
        return this.persistence.keyStore(this.cId, option, value);
    };
    Configuration.prototype.optionBoolean = function (option, value) {
        return this.persistence.keyStore(this.cId, option, value === undefined ? undefined : value ? 'true' : 'false') === 'true';
    };
    Configuration.prototype.optionBooleanAccessor = function (option) {
        return new this.booleanValueAccessor(option, this);
    };
    Object.defineProperty(Configuration.prototype, "loglevel", {
        get: function () {
            return this.persistence.keyStore(this.cId, 'loglevel');
        },
        set: function (value) {
            this.persistence.keyStore(this.cId, 'loglevel', value);
        },
        enumerable: true,
        configurable: true
    });
    Configuration.prototype.secureAccessor = function (scope) {
        var secureAccessor = new SecureAccessor(this, scope);
        secureAccessor.cacheKeys();
        return secureAccessor;
    };
    Configuration.prototype.removeSecure = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var secure, originalValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSecureInternal()];
                    case 1:
                        secure = _a.sent();
                        originalValue = secure[key];
                        delete secure[key];
                        return [4 /*yield*/, this.setSecureInternal(secure)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, originalValue];
                }
            });
        });
    };
    Configuration.prototype.setSecure = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var secure, originalValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(value === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.removeSecure(key)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.getSecureInternal()];
                    case 3:
                        secure = _a.sent();
                        originalValue = secure[key];
                        secure[key] = value;
                        return [4 /*yield*/, this.setSecureInternal(secure)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, originalValue];
                }
            });
        });
    };
    Configuration.prototype.getSecure = function (key) {
        return this.getSecureInternal().then(function (secure) { return secure[key]; });
    };
    Configuration.prototype.secureAvailable = function () {
        return this.secureInitialised;
    };
    Configuration.prototype.configure = function () {
        // Note: This has already been initialised....
        var _this = this;
        this.persistence = this.persistenceProviderManager.provide();
        this.initLogLevel();
        if (this.platform.is('cordova')) {
            this.logger.info('Running cordova');
            this.native = true;
            this.logger.info('Device Info');
            this.logger.info("name: " + __WEBPACK_IMPORTED_MODULE_0__ionic_native_device__["a" /* Device */].name);
        }
        if (!this.platform.is('cordova')) {
            this.logger.info('Running web browser');
            this.native = false;
        }
        // Device and install Ids
        if (!this.persistence.keyStore(this.cId, 'installationId'))
            this.persistence.keyStore(this.cId, 'installationId', 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8; return v.toString(16); }));
        this.installationId = this.persistence.keyStore(this.cId, 'installationId');
        this.logger.info('Installation Id: ' + this.installationId);
        this.deviceId = this.device.uuid ? this.device.uuid.toLowerCase() : this.installationId;
        this.logger.info("Device id: " + this.deviceId);
        this.deviceName = !this.native ? 'Web Browser' : this.device.model || 'Mobile Device';
        if (this.deviceName.length <= 3)
            this.deviceName = this.deviceName + "___";
        this.logger.info("Device name: " + this.deviceName);
        if (!this.persistence.keyStore(this.cId, 'deviceId'))
            this.persistence.keyStore(this.cId, 'deviceId', this.deviceId);
        // Unique to this device and installation
        this.deviceInstallationId = this.deviceId + '-' + this.installationId;
        this.configured = true;
        if (this.optionBoolean('testing.secure-storage.enabled')) {
            this.inMemoryTestingSecure = {};
            this.secureInitialised = true;
            return Promise.resolve();
        }
        else {
            return this.secureStorage.create('eBudget').then(function (secureStorageObject) {
                _this.secure = secureStorageObject;
                if (!_this.native) {
                    throw new Error("Browser has no implementation of secure storage");
                }
                return _this.secure.keys();
            }).then(function (keys) {
                if (keys.indexOf('secure') >= 0)
                    return _this.secure.get('secure');
                else {
                    return _this.secure.set('secure', '{}').then(function () { return '{}'; });
                }
            }).then(function (secureObjectString) {
                JSON.parse(secureObjectString);
                _this.secureInitialised = true;
                _this.logger.info("Secure storage initialised");
            }).catch(function (reason) {
                _this.logger.info("Secure storage unable to be initialised", reason);
                //TODO: Store this reason for when we prompt secure
            });
        }
    };
    Configuration.prototype.getSecureInternal = function () {
        if (this.optionBoolean('testing.secure-storage.enabled')) {
            return Promise.resolve(this.inMemoryTestingSecure);
        }
        return this.secure.get('secure').then(function (secure) { return JSON.parse(secure); });
    };
    Configuration.prototype.setSecureInternal = function (secure) {
        if (this.optionBoolean('testing.secure-storage.enabled')) {
            this.inMemoryTestingSecure = secure;
            return Promise.resolve();
        }
        return this.secure.set('secure', JSON.stringify(secure));
    };
    Configuration.prototype.initLogLevel = function () {
        if (this.loglevel === 'Debug') {
            __WEBPACK_IMPORTED_MODULE_4__logger__["a" /* Logger */].root.config.level = __WEBPACK_IMPORTED_MODULE_4__logger__["a" /* Logger */].DEBUG;
        }
        else {
            __WEBPACK_IMPORTED_MODULE_4__logger__["a" /* Logger */].root.config.level = __WEBPACK_IMPORTED_MODULE_4__logger__["a" /* Logger */].INFO;
        }
    };
    Configuration.prototype.lastOpenedBudget = function (budgetId) {
        if (!this.configured)
            return null;
        return this.persistence.keyStore(this.cId, 'autoOpenBudgetId', budgetId);
    };
    Configuration = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__db_persistence_provider_manager__["a" /* PersistenceProviderManager */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_secure_storage__["a" /* SecureStorage */]])
    ], Configuration);
    return Configuration;
}());

//# sourceMappingURL=configuration-service.js.map

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dbms; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__db__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__persistence_provider_manager__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lokijs__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lokijs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lokijs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__transaction_serializer__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var Dbms = (function () {
    function Dbms(transactionSerializer, persistenceProviderManager, configuration) {
        var _this = this;
        this.transactionSerializer = transactionSerializer;
        this.configuration = configuration;
        this.persistenceProvider = persistenceProviderManager.provide();
        this.dbs = [];
        this.dbMap = new Map();
        this._dbInitialisedObservable = new __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"](function (observer) { return _this.dbInitialisedObserver = observer; }).share();
    }
    Dbms.prototype.init = function () {
        var _this = this;
        this.initialising = true;
        this.dbs.length = 0;
        this.dbMap.clear();
        this.loki = new __WEBPACK_IMPORTED_MODULE_3_lokijs___default.a(null);
        this.loki.autosaveDisable();
        var inits = new Array();
        this.persistenceProvider.dbs().forEach(function (dbId) {
            inits.push(_this.createDb(dbId));
        });
        // this.fireEvent("initialised", true);
        return Promise.all(inits).then(function () { _this.initialising = false; });
    };
    Dbms.prototype.getDb = function (id) {
        return this.dbMap.get(id);
    };
    Dbms.prototype.dbInitialisedObservable = function () {
        return this._dbInitialisedObservable;
    };
    Dbms.prototype.createDb = function (id) {
        var _this = this;
        if (!id)
            id = __WEBPACK_IMPORTED_MODULE_5__services_utils__["a" /* Utils */].randomChars(20);
        var db = new __WEBPACK_IMPORTED_MODULE_1__db__["a" /* Db */](id, this, this.persistenceProvider, this.loki, this.transactionSerializer);
        this.dbs.push(db);
        this.dbMap.set(id, db);
        if (!this.initialising) {
            return this.persistenceProvider.addDb(id).then(function () {
                return db.init().then(function () {
                    _this.dbInitialisedObserver.next(db);
                    return db;
                });
            });
        }
        else {
            return db.init().then(function () {
                _this.dbInitialisedObserver.next(db);
                return db;
            });
        }
    };
    Dbms.prototype.deleteDb = function (id) {
        var db = this.getDb(id);
        this.dbs.splice(this.dbs.indexOf(db), 1);
        this.dbMap.delete(id);
        db.deleteInternal();
        this.persistenceProvider.unlinkDb(id);
    };
    Dbms = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__transaction_serializer__["a" /* TransactionSerializer */], __WEBPACK_IMPORTED_MODULE_2__persistence_provider_manager__["a" /* PersistenceProviderManager */], __WEBPACK_IMPORTED_MODULE_6__services_configuration_service__["a" /* Configuration */]])
    ], Dbms);
    return Dbms;
}());

//# sourceMappingURL=dbms.js.map

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utils; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);

var Utils = (function () {
    function Utils() {
    }
    Utils.nowIonic = function () {
        return __WEBPACK_IMPORTED_MODULE_0_moment___default()().format('YYYY-MM-DD');
    };
    Utils.nowYYYYMMDD = function () {
        return __WEBPACK_IMPORTED_MODULE_0_moment___default()().format('YYYYMMDD');
    };
    Utils.toYYYYMMDDFromIonic = function (uiValue) {
        return __WEBPACK_IMPORTED_MODULE_0_moment___default()(uiValue.split('T')[0]).format('YYYYMMDD');
    };
    Utils.toIonicFromYYYYMMDD = function (modelValue) {
        return __WEBPACK_IMPORTED_MODULE_0_moment___default()(modelValue, 'YYYYMMDD').format('YYYY-MM-DD');
    };
    Utils.javaScriptEscape = function (value) {
        return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\r/g, '').replace(/\n/g, '');
    };
    Utils.randomChars = function (length) {
        var text = "";
        var possible = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    Utils.getQueryStringValue = function (key, url) {
        if (!url)
            url = window.location.href;
        key = key.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + key + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };
    Utils.STANDARD_DATE_FORMAT = 'YYYYMMDD';
    return Utils;
}());

//# sourceMappingURL=utils.js.map

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EngineFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_notifications__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_configuration_service__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EngineFactory = (function () {
    function EngineFactory(dbms, notifications, configuration) {
        // TODO: some kind of "activate" listener on Db to process transactions as they go? - Or better to do it afterwards, then incrementally do it ?
        this.dbms = dbms;
        this.notifications = notifications;
        this.configuration = configuration;
    }
    EngineFactory.prototype.getEngineById = function (dbId) {
        return this.getEngine(this.dbms.getDb(dbId));
    };
    EngineFactory.prototype.getEngine = function (db) {
        if (!db.engine) {
            var engine = new __WEBPACK_IMPORTED_MODULE_1__engine__["a" /* Engine */](db, this.notifications, this.configuration);
            db.engine = engine;
        }
        return db.engine;
    };
    EngineFactory = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_3__services_notifications__["a" /* Notifications */], __WEBPACK_IMPORTED_MODULE_4__services_configuration_service__["a" /* Configuration */]])
    ], EngineFactory);
    return EngineFactory;
}());

//# sourceMappingURL=engine-factory.js.map

/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Notification */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Notifications; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__currency_formatter__ = __webpack_require__(369);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Notification = (function () {
    function Notification() {
    }
    return Notification;
}());

var Notifications = (function () {
    function Notifications(toastController, currencyFormatter) {
        var _this = this;
        this.toastController = toastController;
        this.currencyFormatter = currencyFormatter;
        this.logger = __WEBPACK_IMPORTED_MODULE_2__logger__["a" /* Logger */].get('Notifications');
        this.acknowledged = true;
        this.important = false;
        this.notifications = [];
        this.newNotifications = [];
        this.formatCurrency = function (value) {
            return _this.currencyFormatter.format(value);
        };
    }
    Notifications.prototype.clear = function (number) {
        if (!number) {
            this.newNotifications.length = 0;
        }
        else {
            this.newNotifications.splice(0, number);
            this.newNotifications.forEach(function (n) {
                n.acknowledged = true;
            });
        }
        this.updateImportantFlag();
        this.updateAcknowledgedFlag();
    };
    Notifications.prototype.markRead = function (number) {
        if (number === void 0) { number = Number.MAX_SAFE_INTEGER; }
        var count = 0;
        this.notifications.some(function (n) {
            n.read = true;
            n.acknowledged = true;
            return ++count >= number;
        });
        this.updateImportantFlag();
        this.updateAcknowledgedFlag();
    };
    Notifications.prototype.show = function (notification) {
        if (notification.popup === undefined)
            notification.popup = true;
        notification.acknowledged = notification.silent;
        this.logger.debug("Notification: " + notification.message);
        this.notifications.unshift(notification);
        if (!notification.important) {
            var index = this.newNotifications.findIndex(function (n) { return !n.important; });
            if (index != -1) {
                this.newNotifications.splice(index, 0, notification);
            }
            else {
                this.newNotifications.unshift(notification);
            }
        }
        else {
            this.newNotifications.unshift(notification);
        }
        this.runPopupQueue();
        this.updateImportantFlag();
        this.updateAcknowledgedFlag();
    };
    Notifications.prototype.remove = function (criteria) {
        // TODO: Remove and update status, etc
        var index = this.newNotifications.findIndex(function (n) { return n.category === criteria.category; });
        if (index != -1)
            this.newNotifications.splice(index, 1);
        var index2 = this.notifications.findIndex(function (n) { return n.category === criteria.category; });
        if (index2 != -1)
            this.notifications.splice(index2, 1);
        this.updateImportantFlag();
        this.updateAcknowledgedFlag();
    };
    Notifications.prototype.runPopupQueue = function () {
        // TODO: Combine popups for a group and put a delay on running the queue (to allow any processes to generate multiple notifications that can be combined)
        var _this = this;
        if (this.currentToast)
            return;
        this.notifications.some(function (notification) {
            if (notification.popup && !notification.popupDone) {
                _this.currentToast = _this.toastController.create({ message: (notification.important ? ' ! ' : '') + notification.message, duration: 5000, showCloseButton: true, closeButtonText: 'X' });
                _this.currentToast.onDidDismiss(function () {
                    _this.currentToast = null;
                    _this.runPopupQueue();
                });
                _this.currentToast.present();
                notification.popupDone = true;
                return true;
            }
            return false;
        });
    };
    Notifications.prototype.updateAcknowledgedFlag = function () {
        var _this = this;
        this.acknowledged = true;
        this.newNotifications.some(function (n) {
            _this.acknowledged = n.acknowledged;
            return !n.acknowledged;
        });
    };
    Notifications.prototype.updateImportantFlag = function () {
        var _this = this;
        this.important = false;
        this.newNotifications.some(function (n) {
            _this.important = n.important && !n.acknowledged;
            return n.important;
        });
    };
    Notifications = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__currency_formatter__["a" /* CurrencyFormatter */]])
    ], Notifications);
    return Notifications;
}());

//# sourceMappingURL=notifications.js.map

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Transaction; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_record__ = __webpack_require__(45);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Transaction = (function (_super) {
    __extends(Transaction, _super);
    function Transaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Transaction.prototype.tableName = function () {
        return 'Transaction';
    };
    Transaction.prototype.initTable = function (table) {
        table.ensureUniqueIndex('id');
    };
    Transaction.prototype.tableCreationOptions = function () {
        return { 'indices': ['categoryId'] };
    };
    return Transaction;
}(__WEBPACK_IMPORTED_MODULE_0__db_record__["a" /* Record */]));

//# sourceMappingURL=transaction.js.map

/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DbTransaction; });
/* unused harmony export TransactionStringEnv */
var DbTransaction = (function () {
    function DbTransaction() {
        this.x = {};
        this.typeId = this.getTypeId();
    }
    return DbTransaction;
}());

var TransactionStringEnv = (function () {
    function TransactionStringEnv() {
    }
    return TransactionStringEnv;
}());

//# sourceMappingURL=transaction.js.map

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Category; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_record__ = __webpack_require__(45);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Category = (function (_super) {
    __extends(Category, _super);
    function Category() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.engine = { 'processors': new Array() };
        return _this;
    }
    Category.prototype.tableName = function () {
        return 'Category';
    };
    Category.prototype.initTable = function (table) {
        table.ensureUniqueIndex('id');
    };
    return Category;
}(__WEBPACK_IMPORTED_MODULE_0__db_record__["a" /* Record */]));

//# sourceMappingURL=category.js.map

/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Account; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_record__ = __webpack_require__(45);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Account = (function (_super) {
    __extends(Account, _super);
    function Account() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.processors = [];
        return _this;
    }
    Account.prototype.tableName = function () {
        return 'Account';
    };
    Account.prototype.initTable = function (table) {
        table.ensureUniqueIndex('id');
    };
    return Account;
}(__WEBPACK_IMPORTED_MODULE_0__db_record__["a" /* Record */]));

//# sourceMappingURL=account.js.map

/***/ }),
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BankTransaction; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_record__ = __webpack_require__(45);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var BankTransaction = (function (_super) {
    __extends(BankTransaction, _super);
    function BankTransaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BankTransaction.prototype.tableName = function () {
        return 'BankTransaction';
    };
    BankTransaction.prototype.initTable = function (table) {
        table.ensureUniqueIndex('id');
    };
    BankTransaction.prototype.tableCreationOptions = function () {
        //return {'indices': ['categoryId']};
    };
    return BankTransaction;
}(__WEBPACK_IMPORTED_MODULE_0__db_record__["a" /* Record */]));

//# sourceMappingURL=bank-transaction.js.map

/***/ }),
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Replication; });
/* unused harmony export Repl */
/* unused harmony export SyncErrorData */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_transaction_serializer__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_json_stable_stringify__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_json_stable_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_json_stable_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__configuration_service__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
* The Repl service listens to the database transactions, add/edit/delete and generates replication records. It then "syncs" those. It also fetched remote replication records and creates transactions out of them for the database to process...
**/
var Replication = (function () {
    function Replication(dbms, http, transactionSerializer, configuration) {
        // TODO: Move the syncing promise to an observable, so we can just "subscribe" ?
        this.dbms = dbms;
        this.http = http;
        this.transactionSerializer = transactionSerializer;
        this.configuration = configuration;
        this.logger = __WEBPACK_IMPORTED_MODULE_5__logger__["a" /* Logger */].get('Replication');
        this.syncDelay = 1000; // 1 second
        this.pollInterval = 15 * 60 * 1000; // 15 minutes
        this.errorRetryInterval = 10 * 1000; // 10 seconds
        this.syncing = {}; // Holds the latest / current syncing info
        this.queues = {};
        this.heads = {};
        this.incrementingReplId = 100;
        this.syncing.running = false; // Is there currently a sync running?
        this.syncing.q = null; // The latest syncing call
        this.syncing.nextTimeout = null;
        this.syncing.lastSync = null;
        this.syncing.lastResultSuccess = true;
        this.syncing.lastError = null;
        this.syncing.consecutiveErrorCount = 0;
    }
    Replication.prototype.init = function () {
        var _this = this;
        this.dbms.dbs.forEach(function (db) {
            if (_this.enabled(db)) {
                _this.processDb(db);
                _this.monitorDb(db);
            }
        });
        this.scheduleSync(this.syncDelay);
    };
    Replication.prototype.enable = function (db, deviceReplId) {
        db.localSetting('repl', '1');
        db.transactionIdLocalGen(deviceReplId);
        this.processDb(db);
        this.monitorDb(db);
        this.scheduleSync(this.syncDelay);
    };
    Replication.prototype.disable = function (db) {
        var deviceReplId = this.enabled(db);
        db.localSetting('repl', '');
        var dbDeviceReplId = db.id + '_' + deviceReplId;
        delete this.heads[dbDeviceReplId];
        delete this.queues[db.id];
    };
    Replication.prototype.enabled = function (db) {
        return db.localSetting('repl') === '1' ? db.transactionIdLocalGen() + '' : false;
    };
    Replication.prototype.monitorDb = function (db) {
        var _this = this;
        db.addEventListener(function (dbEvent) {
            if (_this.processingTransaction)
                return;
            if (dbEvent.eventName === 'transaction-applied' || dbEvent.eventName === 'transaction-undone') {
                _this.processTransaction(db, dbEvent.data.transaction);
            }
            if (dbEvent.eventName === 'db-activated') {
                // Add a head just incase initalised without any transactions (which happens on linking)
                _this.updateHead(db, { 'id': 0, 'deviceReplId': _this.enabled(db) });
                _this.scheduleSync(10);
            }
            if (dbEvent.eventName === 'db-deleted') {
                _this.disable(db);
            }
        });
    };
    Replication.prototype.processDb = function (db) {
        this.updateHead(db, { 'id': 0, 'deviceReplId': this.enabled(db) });
        var sortedDbTransactions = db.sortedTransactions.data();
        var _loop_1 = function (i) {
            var t = sortedDbTransactions[i];
            this_1.logger.debug('Initial transaction iterating: ', function () { return JSON.stringify(t); });
            this_1.processTransaction(db, t);
        };
        var this_1 = this;
        for (var i = 0; i < sortedDbTransactions.length; i++) {
            _loop_1(i);
        }
    };
    /**
    * Process the transaction for replication (generate replication records as needed) and add them to the queue
    * The queue is watched and "pushed" after a short timeout so that a push is batched
    **/
    Replication.prototype.processTransaction = function (db, transaction) {
        if (!this.enabled(db))
            return;
        this.logger.debug('- Start Processing Transaction - ', function () { return JSON.stringify(transaction); });
        var transactionCopy = this.transactionSerializer.cloneTransaction(transaction);
        delete transactionCopy.x.repl;
        if (!transaction.x.repl)
            transaction.x.repl = [];
        var checksum = this.checksumObject(transactionCopy);
        var noReplRecords = transaction.x.repl.length === 0;
        var checksumMismatch = transaction.x.repl.length > 0 && transaction.x.repl[0].checksum !== checksum;
        var newReplRecord = noReplRecords || checksumMismatch;
        // If none, or if they are older (different?), etc, then create a new one
        if (newReplRecord) {
            if (checksumMismatch)
                this.logger.debug('New Repl Record due to checksum mismatch - ' + transaction.x.repl[0].checksum + ': ' + checksum);
            var r = new Repl();
            var headId = transaction.x.repl.length ? transaction.x.repl[0].id : 0;
            var nextId = this.nextReplId();
            if (nextId < headId) {
                nextId = headId + 1; // Make sure the one just generated is the latest for that transaction in the case of clock skew. Assume this will happen rarely and device clocks are fairly in-sync. Otherwise will need a better synchronisation system. Perhaps synced on the replication server would be the simplest. This current method also allows for a slight chance of duplicate replId in the future, but very slim, so not going to worry about it.
            }
            r.id = nextId;
            r.timestamp = new Date().getTime();
            r.deviceReplId = this.enabled(db);
            r.synced = 0;
            r.checksum = checksum;
            // r.rollingChecksum = r.checksum + dbDeviceHeadChecksum;
            r.transaction = transactionCopy;
            transaction.x.repl.splice(0, 0, r);
            try {
                this.processingTransaction = true;
                db.saveTransaction(transaction);
            }
            finally {
                this.processingTransaction = false;
            }
            this.logger.debug('inserted repl record:', function () { return JSON.stringify(transaction); });
        }
        for (var i = 0; i < transaction.x.repl.length; i++) {
            var record = transaction.x.repl[i];
            if (record.synced)
                this.updateHead(db, record);
            if (!record.synced)
                this.queueRepl(db.id, record, transactionCopy);
        }
        this.logger.debug('- End Processing Transaction - ', function () { return JSON.stringify(transaction); });
    };
    ;
    Replication.prototype.queueRepl = function (dbId, repl, transaction) {
        var _this = this;
        // Get the queue for the dbId (or create it)
        if (!this.queues[dbId]) {
            this.queues[dbId] = new Map();
        }
        var queue = this.queues[dbId];
        queue.set(repl.id + '_' + repl.deviceReplId, repl);
        this.logger.debug(function () { return 'queueRepl: ' + repl.id + '_' + repl.deviceReplId + ': ' + JSON.stringify(repl) + ': ' + JSON.stringify(queue.get(repl.id + '_' + repl.deviceReplId)); });
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout);
            this.delayTimeout = 0;
        }
        this.delayTimeout = setTimeout(function () { _this.safeSync(); }, this.syncDelay);
    };
    ;
    Replication.prototype.updateHead = function (db, repl) {
        var _this = this;
        var dbDeviceReplId = db.id + '_' + repl.deviceReplId;
        this.logger.debug(function () { return 'Check Repl Head: ' + dbDeviceReplId + ': ' + JSON.stringify({ 'replId': repl.id, 'deviceReplId': repl.deviceReplId, 'dbId': db.id }); });
        if (!this.heads[dbDeviceReplId] || repl.id > this.heads[dbDeviceReplId].replId) {
            this.heads[dbDeviceReplId] = { 'replId': repl.id, 'deviceReplId': repl.deviceReplId, 'dbId': db.id }; // TODO: Checksum for rolling checksum?
            this.logger.debug('Update Repl Head: ' + dbDeviceReplId + ': ', function () { return JSON.stringify(_this.heads[dbDeviceReplId]); });
        }
    };
    ;
    Replication.prototype.nextReplId = function () {
        this.incrementingReplId++;
        if (this.incrementingReplId > 999)
            this.incrementingReplId = 100;
        return (new Date().getTime() * 1000) + this.incrementingReplId;
    };
    Replication.prototype.checksumObject = function (o) {
        var i;
        var chk = 0x12345678;
        var s = __WEBPACK_IMPORTED_MODULE_4_json_stable_stringify___default()(o);
        for (i = 0; i < s.length; i++) {
            chk += (s.charCodeAt(i) * (i + 1));
        }
        return chk;
    };
    Replication.prototype.checksum = function (s) {
        var i;
        var chk = 0x12345678;
        for (i = 0; i < s.length; i++) {
            chk += (s.charCodeAt(i) * (i + 1));
        }
        return chk;
    };
    Replication.prototype.scheduleSync = function (delay) {
        var _this = this;
        if (this.syncing.nextTimeout) {
            clearTimeout(this.syncing.nextTimeout);
            this.syncing.nextTimeout = null;
        }
        if (!delay) {
            if (this.syncing.lastResultSuccess) {
                delay = this.pollInterval;
            }
            else {
                delay = this.errorRetryInterval * this.syncing.consecutiveErrorCount;
                if (this.errorRetryInterval > this.pollInterval)
                    delay = this.pollInterval;
            }
        }
        this.syncing.nextTimeout = setTimeout(function () { _this.safeSync(); }, delay);
    };
    /** SafeSync will return success unless there is an internal error */
    Replication.prototype.sync = function (safe) {
        var _this = this;
        if (safe === void 0) { safe = false; }
        this.logger.debug('SYNC');
        if (this.syncing.running)
            return this.syncing.q;
        this.syncing.running = true;
        this.syncing.lastSync = new Date().getTime();
        if (this.syncing.nextTimeout) {
            clearTimeout(this.syncing.nextTimeout);
            this.syncing.nextTimeout = null;
        }
        var syncing = this.syncing;
        this.syncing.q = new Promise(function (success, fail) {
            _this.doSync(function () {
                syncing.running = false;
                _this.logger.debug('SYNC: Success');
                syncing.lastResultSuccess = true;
                syncing.consecutiveErrorCount = 0;
                _this.scheduleSync();
                success();
            }, function (error) {
                syncing.running = false;
                syncing.lastResultSuccess = false;
                if (syncing.lastError && ((syncing.lastError.connectionIssue && !error.connectionIssue) || (syncing.lastError.serverIssue && !error.serverIssue) || (syncing.lastError.internalIssue && !error.internalIssue)))
                    syncing.consecutiveErrorCount = 0;
                syncing.lastError = error;
                syncing.consecutiveErrorCount++;
                _this.logger.debug('SYNC: Fail - ', syncing);
                _this.scheduleSync();
                if (!safe || error.internalIssue) {
                    fail(error);
                }
                else {
                    success();
                }
            });
        });
        return this.syncing.q;
    };
    /** SafeSync will return success unless there is an internal error */
    Replication.prototype.safeSync = function () {
        return this.sync(true);
    };
    Replication.prototype.doSync = function (success, error) {
        var _this = this;
        var replData = {};
        var totalPushCount = 0;
        Object.keys(this.queues).forEach(function (dbId) {
            var replMap = _this.queues[dbId];
            if (replMap.length !== 0) {
                if (!replData.push)
                    replData.push = [];
                var found = false;
                for (var i = 0; i < replData.push.length; i++) {
                    if (replData.push[i].dbId === dbId) {
                        found = true;
                        break;
                    }
                }
                var pushDb_1 = found ? replData.push[i] : replData.push[replData.push.push({ 'dbId': dbId, 'repl': [] }) - 1];
                replMap.forEach(function (r, key) {
                    var replDataRecord = { 'deviceReplId': r.deviceReplId, 'replData': __WEBPACK_IMPORTED_MODULE_4_json_stable_stringify___default()({ transaction: r.transaction, 'timestamp': r.timestamp, 'checksum': r.checksum }), 'id': r.id };
                    pushDb_1.repl.push(replDataRecord);
                    totalPushCount++;
                });
            }
        });
        Object.keys(this.heads).forEach(function (dbDeviceReplId) {
            var r = _this.heads[dbDeviceReplId];
            var headRecord = { 'replId': r.replId, 'deviceReplId': r.deviceReplId, 'dbId': r.dbId };
            if (!replData.fetch)
                replData.fetch = [];
            replData.fetch.push(headRecord);
        });
        this.logger.debug(function () { return replData; });
        if (!replData.push && !replData.fetch) {
            success(); // no-op really
            return;
        }
        if (totalPushCount) {
            this.logger.info('Pushing ' + totalPushCount + ' Records');
        }
        this.http.post('https://api.freebudgetapp.com/sync', JSON.stringify(replData))
            .map(function (res) { return res.json(); })
            .subscribe(function (response) {
            _this.logger.debug(function () { return response; });
            try {
                if (_this.configuration.temporary.simulateSyncError)
                    throw new Error("Simulated Sync Error");
                // Process the data I got
                if (response.processed) {
                    var totalIncomingProcessed_1 = 0;
                    response.processed.forEach(function (dbProcessed) {
                        var dbId = dbProcessed.dbId;
                        var db = _this.dbms.getDb(dbId);
                        var replMap = _this.queues[dbId];
                        if (dbProcessed && dbProcessed.processed) {
                            dbProcessed.processed.forEach(function (replProcessed) {
                                if (replProcessed.success) {
                                    totalIncomingProcessed_1++;
                                    if (replProcessed.success !== true) {
                                        _this.logger.error('Replication success status: ' + replProcessed.success);
                                    }
                                    var key = replProcessed.replId + '_' + replProcessed.deviceReplId;
                                    var replRecord = replMap.get(key);
                                    replRecord.synced = new Date().getTime();
                                    var originalTransaction = db.getTransaction(replRecord.transaction.id);
                                    try {
                                        _this.processingTransaction = true;
                                        db.saveTransaction(originalTransaction);
                                    }
                                    finally {
                                        _this.processingTransaction = false;
                                    }
                                    replMap.delete(key);
                                    _this.updateHead(db, replRecord);
                                }
                            });
                        }
                    });
                    if (totalIncomingProcessed_1 > 0 || totalPushCount !== totalIncomingProcessed_1) {
                        _this.logger.info('Server responded ' + totalIncomingProcessed_1 + ' records successfully processed');
                    }
                }
            }
            catch (e) {
                var errorData = new SyncErrorData();
                errorData.error = e;
                errorData.message = 'Internal Error in Handling Sync Processed Response';
                errorData.internalIssue = true;
                error(errorData);
                return;
            }
            if (response.repl) {
                _this.logger.info('Processing ' + response.repl.length + ' Incoming Repl Records');
                var processedCount_1 = 0;
                var skippedCount_1 = 0;
                var errorCalled_1 = false;
                response.repl.forEach(function (replRecord) {
                    try {
                        replRecord.replId = parseInt(replRecord.replId);
                        var dbId = replRecord.dbId;
                        var db = _this.dbms.getDb(dbId);
                        if (db.isActivating()) {
                            return false;
                        }
                        // dbId, replId, deviceReplId, replData
                        // replData -> transaction, timestamp, checksum
                        _this.logger.debug('Processing incoming replRecord - ', function () { return JSON.stringify(replRecord); });
                        // Get the transaction by id from the db
                        var replData_1 = JSON.parse(replRecord.replData);
                        var transaction_1 = db.getTransaction(replData_1.transaction.id);
                        var isExisting = transaction_1 && true;
                        _this.logger.debug('Is Existing: ' + isExisting);
                        _this.logger.debug(function () { return JSON.stringify(transaction_1); });
                        if (!transaction_1)
                            transaction_1 = _this.transactionSerializer.cloneTransaction(replData_1.transaction);
                        if (!transaction_1.x.repl)
                            transaction_1.x.repl = [];
                        if (transaction_1.x.repl.some(function (e) {
                            _this.logger.debug('Check: ' + e.id + ' === ' + replRecord.replId + ' && ' + e.deviceReplId + ' === ' + replRecord.deviceReplId);
                            return e.id === replRecord.replId && e.deviceReplId === replRecord.deviceReplId;
                        })) {
                            // We've already got it... do something ? Like a checksum?
                            // TODO: Can probably just drop it here, it is already in sync
                            // TODO: What if it isn't the head repl record ? - that is ok, they should be sorted anyway....
                            // TODO: Check all the checksums just to make sure we are good here.. foreach... this.checksumObject(transaction);
                            _this.logger.info('Repl record already exists for transaction. Skipping.', replRecord);
                            skippedCount_1++;
                            return true;
                        }
                        else {
                            _this.logger.debug('Adding repl record to transaction');
                            // Reconstruct the repl record
                            var r = new Repl();
                            r.id = replRecord.replId;
                            r.timestamp = replData_1.timestamp;
                            r.deviceReplId = replRecord.deviceReplId;
                            r.synced = new Date().getTime();
                            r.checksum = replData_1.checksum;
                            // this.checksumObject(transactionCopy); // TODO: Check this
                            // r.rollingChecksum = r.checksum + dbDeviceHeadChecksum;
                            r.transaction = replData_1.transaction;
                            transaction_1.x.repl.splice(0, 0, r);
                        }
                        transaction_1.x.repl.sort(function (a, b) {
                            return b.id - a.id === 0 ? a.deviceReplId - b.deviceReplId : b.id - a.id;
                        });
                        _this.logger.debug('Transaction after sorting - ', function () { return JSON.stringify(transaction_1); });
                        if (isExisting) {
                            // Were copying fields from the updated transaction to the database attached one
                            _this.logger.debug('Updating transaction record in database');
                            var updatedTransaction_1 = transaction_1.x.repl[0].transaction;
                            var repl = transaction_1.x.repl;
                            Object.keys(transaction_1).forEach(function (key) {
                                if (key !== '$loki' && key !== 'meta' && key !== 'applied')
                                    delete transaction_1[key];
                            });
                            Object.keys(updatedTransaction_1).forEach(function (key) {
                                if (key !== '$loki' && key !== 'meta' && key !== 'applied')
                                    transaction_1[key] = transaction_1.deserialize(key, JSON.parse(JSON.stringify(updatedTransaction_1[key])));
                            });
                            transaction_1.x.repl = repl;
                        }
                        _this.logger.debug('Processing transaction record - ', function () { return JSON.stringify(transaction_1); });
                        try {
                            _this.processingTransaction = true;
                            db.applyTransaction(transaction_1);
                        }
                        finally {
                            _this.processingTransaction = false;
                        }
                        _this.updateHead(db, transaction_1.x.repl[0]);
                        _this.logger.debug('- End Processing incoming replRecord');
                        processedCount_1++;
                        return true; // Continue;
                    }
                    catch (e) {
                        var errorData = new SyncErrorData();
                        _this.logger.info("Dump of internal error in repl", e);
                        errorData.error = e;
                        errorData.message = 'Internal Error in Processing New Repl Record During Sync: ' + JSON.stringify(replRecord);
                        errorData.internalIssue = true;
                        error(errorData);
                        errorCalled_1 = true;
                        return false; // Break;
                    }
                });
                if (processedCount_1)
                    _this.logger.info('Processed ' + processedCount_1 + ' Incoming Repl Records');
                if (skippedCount_1) {
                    _this.logger.info('Skipped ' + skippedCount_1 + ' Incoming Repl Records');
                }
                if (errorCalled_1) {
                    return;
                }
            }
            success();
        }, function (response) {
            var errorData = new SyncErrorData();
            errorData.message = 'Server Error in Processing Sync Response: ' + response;
            errorData.serverIssue = true;
            error(errorData);
        });
    };
    Replication = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__db_transaction_serializer__["a" /* TransactionSerializer */], __WEBPACK_IMPORTED_MODULE_6__configuration_service__["a" /* Configuration */]])
    ], Replication);
    return Replication;
}());

var Repl = (function () {
    function Repl() {
    }
    return Repl;
}());

var SyncErrorData = (function () {
    function SyncErrorData() {
        this.connectionIssue = false;
        this.internalIssue = false;
        this.serverIssue = false;
    }
    return SyncErrorData;
}());

//# sourceMappingURL=replication-service.js.map

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Record; });
var Record = (function () {
    function Record() {
        /**
         * Place to store cached values for external processors, purely for performance and ease of lookup.
         * This data could be found elsewhere (directly or by calculation) and shouldn't be used within the records or transactions themselves.
         * Cheeky Note: I use this also for testing ideas so I can keep eXperimental data separate.
         */
        this.x = {};
    }
    Record.prototype.tableCreationOptions = function () { };
    ;
    return Record;
}());

//# sourceMappingURL=record.js.map

/***/ }),
/* 46 */,
/* 47 */,
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PersistenceProviderManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__local_storage_persistence_provider__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transaction_serializer__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql_storage_persistence_provider__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_device__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__no_persistence_provider__ = __webpack_require__(366);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PersistenceProviderManager = (function () {
    function PersistenceProviderManager(transactionSerializer, platform, device, sqlite) {
        this.transactionSerializer = transactionSerializer;
        this.platform = platform;
        this.device = device;
        this.sqlite = sqlite;
    }
    PersistenceProviderManager.prototype.provide = function () {
        if (this.persistenceProvider == null) {
            if (__WEBPACK_IMPORTED_MODULE_7__services_utils__["a" /* Utils */].getQueryStringValue('demo')) {
                this.persistenceProvider = new __WEBPACK_IMPORTED_MODULE_8__no_persistence_provider__["a" /* NoPersistenceProvider */](this.transactionSerializer);
            }
            else if (this.platform.is('cordova') && this.device.platform !== 'browser') {
                this.persistenceProvider = new __WEBPACK_IMPORTED_MODULE_3__sql_storage_persistence_provider__["a" /* SqlStoragePersistenceProvider */]('A', this.transactionSerializer, this.sqlite);
            }
            else {
                this.persistenceProvider = new __WEBPACK_IMPORTED_MODULE_1__local_storage_persistence_provider__["a" /* LocalStoragePersistenceProvider */]('A', this.transactionSerializer);
            }
        }
        return this.persistenceProvider;
    };
    PersistenceProviderManager = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__transaction_serializer__["a" /* TransactionSerializer */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */]])
    ], PersistenceProviderManager);
    return PersistenceProviderManager;
}());

//# sourceMappingURL=persistence-provider-manager.js.map

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionSerializer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_logger__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var TransactionSerializer = (function () {
    function TransactionSerializer() {
        this.logger = __WEBPACK_IMPORTED_MODULE_1__services_logger__["a" /* Logger */].get('TransactionSerializer');
        this.transactionTypeIdMap = new Map();
    }
    TransactionSerializer.prototype.registerType = function (type) {
        this.transactionTypeIdMap.set(new type().getTypeId(), type);
        this.logger.info('Registered Transaction Type ' + new type().getTypeId());
    };
    TransactionSerializer.prototype.newTransaction = function (typeId, jsonObject) {
        var transactionType = this.transactionTypeIdMap.get(typeId);
        if (!transactionType) {
            this.logger.error({ 'msg': 'No transaction type available for ' + typeId, 'obj': jsonObject });
        }
        var t = new transactionType();
        if (jsonObject) {
            for (var key in jsonObject) {
                t[key] = t.deserialize(key, JSON.parse(JSON.stringify(jsonObject[key])));
            }
        }
        return t;
    };
    TransactionSerializer.prototype.cloneTransaction = function (transaction) {
        var recordsTemp = transaction.records;
        transaction.records = null;
        var dataCopy = JSON.parse(JSON.stringify(transaction)); // Deep copy this so we aren't accidentally copying any references
        transaction.records = recordsTemp;
        delete dataCopy.$loki;
        delete dataCopy.meta;
        delete dataCopy.applied;
        delete dataCopy.records;
        return this.newTransaction(transaction.typeId, dataCopy);
    };
    TransactionSerializer.prototype.toJson = function (transaction) {
        return JSON.stringify(transaction);
    };
    TransactionSerializer.prototype.fromJson = function (jsonString) {
        var obj = JSON.parse(jsonString);
        return this.newTransaction(obj.typeId, obj);
    };
    TransactionSerializer = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], TransactionSerializer);
    return TransactionSerializer;
}());

//# sourceMappingURL=transaction-serializer.js.map

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BankSync; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__standard_host_interface__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transaction_sync__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bank_provider_registry__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_replication_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__in_app_browser_interface_factory__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_filter__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_share__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__bank_link_local__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__bank_sync_monitor__ = __webpack_require__(395);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};














var BankSync = (function () {
    function BankSync(standardHostInterface, transactionSync, bankProviderRegistry, replication, configuration, dbms, engineFactory, inAppBrowserInterfaceFactory, bankLinkLocal) {
        this.standardHostInterface = standardHostInterface;
        this.transactionSync = transactionSync;
        this.bankProviderRegistry = bankProviderRegistry;
        this.replication = replication;
        this.configuration = configuration;
        this.dbms = dbms;
        this.engineFactory = engineFactory;
        this.inAppBrowserInterfaceFactory = inAppBrowserInterfaceFactory;
        this.bankLinkLocal = bankLinkLocal;
        this.activeSyncs = [];
    }
    BankSync.prototype.sync = function (bankLink, engine, accounts, bankSyncMonitor, backgroundMode) {
        if (bankSyncMonitor === void 0) { bankSyncMonitor = new __WEBPACK_IMPORTED_MODULE_13__bank_sync_monitor__["a" /* BankSyncMonitor */](); }
        if (backgroundMode === void 0) { backgroundMode = false; }
        if (bankSyncMonitor.logger == null) {
            var logger = __WEBPACK_IMPORTED_MODULE_9__services_logger__["a" /* Logger */].get("BankSync.BankLink." + bankLink.name.split(/[^0-9A-Za-z_]/).join());
            logger.config.level = __WEBPACK_IMPORTED_MODULE_9__services_logger__["a" /* Logger */].DEBUG;
            logger.config.addAppender(new (function () {
                function class_1() {
                }
                class_1.prototype.log = function (level, data) {
                    if (data != null && data.length == 1)
                        bankSyncMonitor.log.push(__WEBPACK_IMPORTED_MODULE_9__services_logger__["a" /* Logger */].stringValue(data[0]));
                    else
                        bankSyncMonitor.log.push(__WEBPACK_IMPORTED_MODULE_9__services_logger__["a" /* Logger */].stringValue(data));
                };
                return class_1;
            }()));
            bankSyncMonitor.logger = logger;
        }
        bankSyncMonitor.backgroundMode = backgroundMode;
        bankSyncMonitor.bankLink = bankLink;
        bankSyncMonitor.engine = engine;
        if (!accounts)
            accounts = engine.getAccounts().filter(function (account) { return account.bankLinkId === bankLink.id; });
        if (accounts.length === 0) {
            bankSyncMonitor.error("No Accounts Selected for Sync");
            return bankSyncMonitor;
        }
        bankSyncMonitor.accounts = accounts;
        // TODO: Get connected BankLinks in other budgets - this will be run off some kind of locally stored link map of bankLinks
        //this.dbms.dbs.filter(db => db.isActive()).forEach(db => {
        //})        
        var provider = this.bankProviderRegistry.newProvider(bankLink.provider);
        var providerSchema = provider.getSchema();
        bankSyncMonitor.provider = provider;
        bankSyncMonitor.providerSchema = providerSchema;
        var secureAccessor = this.configuration.secureAccessor("banklink_" + bankLink.uuid);
        provider.configure(bankLink, secureAccessor, this.standardHostInterface);
        if (providerSchema.singleInstancePerBankLink) {
            if (this.activeSyncs.find(function (m) { return m.bankLink.uuid == bankLink.uuid; })) {
                bankSyncMonitor.error("Bank Link " + bankLink.name + " is already active");
                return bankSyncMonitor;
            }
        }
        this.activeSyncs.push(bankSyncMonitor);
        bankSyncMonitor.startTime = Date.now();
        bankSyncMonitor.running = true;
        this.doSync(bankSyncMonitor);
        return bankSyncMonitor;
    };
    BankSync.prototype.archiveSync = function (bankSyncMonitor) {
        var index = this.activeSyncs.indexOf(bankSyncMonitor);
        if (index == -1)
            return; // Already archived, or not current anyway...
        this.activeSyncs.splice(index, 1);
        // TODO: Move to sync history... AND write into local persistence!?
    };
    BankSync.prototype.doSync = function (bankSyncMonitor) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var browserInterface, autoClosing, bankAccounts, _loop_1, this_1, _i, _a, account, state_1, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        autoClosing = false;
                        bankSyncMonitor.on('cancelled-state-change').subscribe(function () {
                            _this.bankLinkLocal.updateInfo(bankSyncMonitor.bankLink.uuid, function (info) {
                                info.cancelledCount++;
                            });
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 12, 13, 14]);
                        return [4 /*yield*/, this.replication.sync()];
                    case 2:
                        _b.sent();
                        if (!bankSyncMonitor.providerSchema.requireBrowser) return [3 /*break*/, 4];
                        bankSyncMonitor.logger.debug("Creating Browser");
                        return [4 /*yield*/, this.inAppBrowserInterfaceFactory.createBrowser(bankSyncMonitor.logger, bankSyncMonitor.backgroundMode, bankSyncMonitor)];
                    case 3:
                        browserInterface = _b.sent();
                        bankSyncMonitor.logger.debug("Created Browser");
                        bankSyncMonitor.provider.setBrowser(browserInterface);
                        browserInterface.onLoadError().then(function (reason) {
                            bankSyncMonitor.logger.info("Browser Load Error", reason);
                            bankSyncMonitor.error("Communications Error");
                            browserInterface.close();
                            bankSyncMonitor.provider.interrupt();
                            _this.archiveSync(bankSyncMonitor);
                            _this.bankLinkLocal.updateInfo(bankSyncMonitor.bankLink.uuid, function (info) {
                                info.errorCount++;
                            });
                        });
                        browserInterface.onClose().then(function () {
                            bankSyncMonitor.logger.info("Browser Closed");
                            // it is possible the final block is never run in our try/final, but this browser close will be run in that case, so we use the auto closing flag to coordinate.
                            if (!autoClosing) {
                                bankSyncMonitor.cancelled = true;
                                bankSyncMonitor.running = false;
                                bankSyncMonitor.provider.interrupt();
                                _this.archiveSync(bankSyncMonitor);
                            }
                        });
                        // Not so sure this should be here, we interrupt the provider elsewhere
                        bankSyncMonitor.on('cancelling-state-change').subscribe(function () {
                            if (bankSyncMonitor.cancelling) {
                                browserInterface.close();
                            }
                        });
                        _b.label = 4;
                    case 4:
                        bankSyncMonitor.logger.debug("Connecting...");
                        return [4 /*yield*/, bankSyncMonitor.provider.connect()];
                    case 5:
                        _b.sent();
                        if (bankSyncMonitor.cancelled || bankSyncMonitor.cancelling)
                            return [2 /*return*/];
                        bankSyncMonitor.logger.debug("Connected. Getting Accounts.");
                        return [4 /*yield*/, bankSyncMonitor.provider.getAccounts()];
                    case 6:
                        bankAccounts = _b.sent();
                        if (bankSyncMonitor.cancelled || bankSyncMonitor.cancelling)
                            return [2 /*return*/];
                        bankSyncMonitor.logger.debug("Fetched Accounts " + bankAccounts.map(function (b) { return b.accountNumber; }).join(", "));
                        _loop_1 = function (account) {
                            var bankAccount, transactions;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        bankAccount = bankAccounts.find(function (b) { return bankSyncMonitor.provider.accountMatch(account.bankLinkConfiguration, b); });
                                        if (bankAccount == null) {
                                            bankSyncMonitor.logger.info("No Matching Bank Account found for Account " + account.name);
                                            bankSyncMonitor.error("No Matching Bank Account found for Account");
                                            return [2 /*return*/, "continue"];
                                        }
                                        bankSyncMonitor.logger.debug("Fetching Transactions for Account " + bankAccount.accountNumber);
                                        return [4 /*yield*/, bankSyncMonitor.provider.getTransactions(bankAccount)];
                                    case 1:
                                        transactions = _a.sent();
                                        if (bankSyncMonitor.cancelled || bankSyncMonitor.cancelling)
                                            return [2 /*return*/, { value: void 0 }];
                                        bankSyncMonitor.logger.debug("Merging Transactions");
                                        this_1.transactionSync.merge(bankSyncMonitor.engine, account, bankAccount, transactions);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = bankSyncMonitor.accounts;
                        _b.label = 7;
                    case 7:
                        if (!(_i < _a.length)) return [3 /*break*/, 10];
                        account = _a[_i];
                        return [5 /*yield**/, _loop_1(account)];
                    case 8:
                        state_1 = _b.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _b.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 7];
                    case 10:
                        bankSyncMonitor.logger.debug("Closing Connection");
                        autoClosing = true;
                        return [4 /*yield*/, bankSyncMonitor.provider.close()];
                    case 11:
                        _b.sent();
                        bankSyncMonitor.logger.debug("Complete");
                        bankSyncMonitor.complete = true;
                        this.bankLinkLocal.updateInfo(bankSyncMonitor.bankLink.uuid, function (info) {
                            info.errorCount = 0;
                            info.cancelledCount = 0;
                            info.lastSync = Date.now();
                        });
                        return [3 /*break*/, 14];
                    case 12:
                        e_1 = _b.sent();
                        bankSyncMonitor.error(e_1 + "");
                        // TODO differentiate between an error and an exception (unhandled)
                        bankSyncMonitor.logger.info("Bank sync aborted due to error", e_1);
                        bankSyncMonitor.provider.interrupt();
                        this.bankLinkLocal.updateInfo(bankSyncMonitor.bankLink.uuid, function (info) {
                            info.errorCount++;
                        });
                        return [3 /*break*/, 14];
                    case 13:
                        bankSyncMonitor.running = false;
                        if (browserInterface != null && !browserInterface.closed) {
                            autoClosing = true;
                            browserInterface.close();
                        }
                        if (bankSyncMonitor.cancelling)
                            bankSyncMonitor.cancelled = true;
                        this.archiveSync(bankSyncMonitor);
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    BankSync = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__standard_host_interface__["a" /* StandardHostInterface */], __WEBPACK_IMPORTED_MODULE_2__transaction_sync__["a" /* TransactionSync */], __WEBPACK_IMPORTED_MODULE_3__bank_provider_registry__["a" /* BankProviderRegistry */], __WEBPACK_IMPORTED_MODULE_4__services_replication_service__["a" /* Replication */], __WEBPACK_IMPORTED_MODULE_5__services_configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_6__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_7__engine_engine_factory__["a" /* EngineFactory */], __WEBPACK_IMPORTED_MODULE_8__in_app_browser_interface_factory__["a" /* InAppBrowserInterfaceFactory */], __WEBPACK_IMPORTED_MODULE_12__bank_link_local__["a" /* BankLinkLocal */]])
    ], BankSync);
    return BankSync;
}());

//# sourceMappingURL=bank-sync.js.map

/***/ }),
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BudgetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_category_category__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_records_budget__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_add_edit_category_add_edit_category__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__data_transactions_init_category_simple_weekly_transaction__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_logger__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var BudgetPage = (function () {
    function BudgetPage(changeDetectorRef, nav, dbms, params, engineFactory, modalController, configuration) {
        this.changeDetectorRef = changeDetectorRef;
        this.nav = nav;
        this.dbms = dbms;
        this.params = params;
        this.engineFactory = engineFactory;
        this.modalController = modalController;
        this.configuration = configuration;
        this.logger = __WEBPACK_IMPORTED_MODULE_9__services_logger__["a" /* Logger */].get('BudgetPage');
        this.nav = nav;
        this.dbms = dbms;
        this.budget = this.params.data.budget ? this.params.data.budget : dbms.getDb(this.params.data.budgetId);
        this.engine = engineFactory.getEngine(this.budget);
        this.activated = false;
        this.logger.debug("Calling activate budget");
    }
    BudgetPage.prototype.addCategory = function () {
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_5__modals_add_edit_category_add_edit_category__["a" /* AddEditCategoryModal */], { budgetId: this.budget.id });
        modal.present();
    };
    BudgetPage.prototype.openCategory = function (category) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__pages_category_category__["a" /* CategoryPage */], { 'budget': this.budget, 'categoryId': category.id });
    };
    BudgetPage.prototype.categoryWeeklyAmount = function (category) {
        // TODO get cache it in the category record and get it straight from there
        var t = this.budget.transactionProcessor.findTransactionsForRecord(category, __WEBPACK_IMPORTED_MODULE_8__data_transactions_init_category_simple_weekly_transaction__["a" /* InitCategorySimpleWeeklyTransaction */])[0];
        if (t)
            return t.weeklyAmount;
    };
    BudgetPage.prototype.ionViewDidLeave = function () {
        // TODO: CHeck this is called appropriately (ie. on a different setRoot(), but not on navigating to a child page)
        // this.budget.deactivate();
    };
    BudgetPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.configuration.lastOpenedBudget(this.budget.id);
        this.budget.activate(this.activateProgressCallback.bind(this)).then(function () {
            _this.logger.debug("Activate Budget Resolved");
            _this.budgetRecord = _this.budget.transactionProcessor.single(__WEBPACK_IMPORTED_MODULE_4__data_records_budget__["a" /* Budget */]);
            _this.activated = true;
        });
    };
    BudgetPage.prototype.activateProgressCallback = function (value, of) {
        this.activatedProgress = value;
        this.activatedOf = of;
    };
    BudgetPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\pages\budget\budget.html"*/'<ion-header class="budget-header" [class.header-loading]="!activated">\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <main-menu-icon></main-menu-icon>\n\n    </button>\n\n    <ion-title>{{budget.name()}}</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="addCategory()">\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="budget-page">\n\n  <replication-error></replication-error>\n\n  <cute-progress-bar *ngIf="!activated" [value]="activatedProgress" [of]="activatedOf"></cute-progress-bar>\n\n  <ion-list *ngIf="activated">\n\n    <button ion-item detail-none *ngFor="let c of engine.getCategories(\'alphabetical\')" (click)="openCategory(c)">\n\n      <div>{{c.name}}</div>\n\n      <div item-right>\n\n        <currency-display highlightNegative [value]="c.balance"></currency-display>\n\n        <p><ion-note><currency-display showPositive [value]="categoryWeeklyAmount(c)"></currency-display></ion-note></p>\n\n      </div>\n\n    </button>\n\n  </ion-list>\n\n\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\pages\budget\budget.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__engine_engine_factory__["a" /* EngineFactory */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_7__services_configuration_service__["a" /* Configuration */]])
    ], BudgetPage);
    return BudgetPage;
}());

//# sourceMappingURL=budget.js.map

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BankLink; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_record__ = __webpack_require__(45);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var BankLink = (function (_super) {
    __extends(BankLink, _super);
    function BankLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BankLink.prototype.tableName = function () {
        return "BankLink";
    };
    BankLink.prototype.initTable = function (table) {
        table.ensureUniqueIndex('id');
    };
    return BankLink;
}(__WEBPACK_IMPORTED_MODULE_0__db_record__["a" /* Record */]));

//# sourceMappingURL=bank-link.js.map

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitBudgetTransaction; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_transaction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__records_budget__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_logger__ = __webpack_require__(7);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var InitBudgetTransaction = (function (_super) {
    __extends(InitBudgetTransaction, _super);
    function InitBudgetTransaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InitBudgetTransaction.prototype.getTypeId = function () {
        return 'InitBudgetTransaction';
    };
    InitBudgetTransaction.prototype.apply = function (tp) {
        // TODO: Validation
        var budget = tp.single(__WEBPACK_IMPORTED_MODULE_1__records_budget__["a" /* Budget */]);
        budget.name = this.budgetName;
        tp.table(__WEBPACK_IMPORTED_MODULE_1__records_budget__["a" /* Budget */]).update(budget);
        tp.db.name(this.budgetName);
        tp.mapTransactionAndRecord(this, budget);
        __WEBPACK_IMPORTED_MODULE_2__services_logger__["a" /* Logger */].get('InitBudgetTransaction').info("Applied InitBudgetTransaction for " + budget.name);
    };
    InitBudgetTransaction.prototype.update = function (tp) {
        this.apply(tp);
    };
    InitBudgetTransaction.prototype.undo = function (tp) {
        tp.unsupported();
    };
    InitBudgetTransaction.prototype.deserialize = function (field, value) {
        return value;
    };
    InitBudgetTransaction.prototype.toHumanisedString = function (env) {
        return "budget " + this.budgetName;
    };
    return InitBudgetTransaction;
}(__WEBPACK_IMPORTED_MODULE_0__db_transaction__["a" /* DbTransaction */]));

//# sourceMappingURL=init-budget-transaction.js.map

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppReady; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppReady = (function () {
    function AppReady() {
        var _this = this;
        // Emulate deferred...
        this.ready = new Promise(function (resolve, reject) { _this.readyResolve = resolve; });
    }
    AppReady = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], AppReady);
    return AppReady;
}());

//# sourceMappingURL=app-ready.js.map

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BankProviderRegistry; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var BankProviderRegistry = (function () {
    function BankProviderRegistry() {
        this.providers = new Map();
    }
    BankProviderRegistry.prototype.registerProvider = function (Provider) {
        var schema = new Provider().getSchema();
        var providerName = schema.name;
        if (this.providers.has(providerName)) {
            throw new Error("Bank provider '" + providerName + "' is already registered");
        }
        this.providers.set(providerName, { Provider: Provider, schema: schema });
    };
    BankProviderRegistry.prototype.newProvider = function (providerName) {
        var providerInfo = this.providers.get(providerName);
        var provider = new providerInfo.Provider();
        return provider;
    };
    BankProviderRegistry.prototype.getProviderNames = function () {
        return Array.from(this.providers.keys());
    };
    BankProviderRegistry.prototype.getProviderSchema = function (providerName) {
        var providerInfo = this.providers.get(providerName);
        return providerInfo.schema;
    };
    BankProviderRegistry = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], BankProviderRegistry);
    return BankProviderRegistry;
}());

//# sourceMappingURL=bank-provider-registry.js.map

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BankAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BankAccountTransaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ProviderSchema; });
var BankAccount = (function () {
    function BankAccount() {
    }
    return BankAccount;
}());

var BankAccountTransaction = (function () {
    function BankAccountTransaction() {
    }
    return BankAccountTransaction;
}());

var ProviderSchema = (function () {
    function ProviderSchema() {
        this.singleInstancePerBankLink = true;
    }
    return ProviderSchema;
}());

//# sourceMappingURL=provider-interface.js.map

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StandardHostInterface; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_configuration_service__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StandardHostInterface = (function () {
    function StandardHostInterface(configuration) {
        this.configuration = configuration;
    }
    StandardHostInterface.prototype.prompt = function () { };
    StandardHostInterface.prototype.notify = function () { };
    StandardHostInterface = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_configuration_service__["a" /* Configuration */]])
    ], StandardHostInterface);
    return StandardHostInterface;
}());

//# sourceMappingURL=standard-host-interface.js.map

/***/ }),
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_add_budget_add_budget__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_share_budget_share_budget__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_budget_budget__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_transactions_init_budget_transaction__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = (function () {
    function HomePage(nav, dbms, modalController) {
        this.nav = nav;
        this.dbms = dbms;
        this.modalController = modalController;
        this.nav = nav;
        this.dbms = dbms;
    }
    HomePage.prototype.addBudget = function () {
        var _this = this;
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_2__modals_add_budget_add_budget__["a" /* AddBudgetModal */]);
        modal.onWillDismiss(function (data) {
            if (data && data.budgetName !== '') {
                _this.dbms.createDb().then(function (db) {
                    db.activate().then(function () {
                        var t = new __WEBPACK_IMPORTED_MODULE_6__data_transactions_init_budget_transaction__["a" /* InitBudgetTransaction */]();
                        t.budgetName = data.budgetName;
                        db.applyTransaction(t);
                        db.deactivate();
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_budget_budget__["a" /* BudgetPage */], { 'budget': db }, { animate: false });
                    });
                });
            }
        });
        modal.present();
    };
    HomePage.prototype.linkBudget = function () {
        var _this = this;
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_3__modals_share_budget_share_budget__["a" /* ShareBudgetModal */]);
        modal.onDidDismiss(function (data) {
            if (data && data.newBudget) {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_budget_budget__["a" /* BudgetPage */], { 'budget': data.newBudget });
            }
        });
        modal.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <main-menu-icon></main-menu-icon>\n\n    </button>\n\n    <ion-title>Getting Started</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding class="getting-started">\n\n\n\n  <h3>Lets Get Started</h3>\n\n  <button ion-button color="primary" id="home-create-new-budget" (click)="addBudget()">Create a New Budget</button>\n\n  <button ion-button color="primary" (click)="linkBudget()">Link to a Shared Budget</button>\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* ModalController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Autofocus; });
var Autofocus = (function () {
    function Autofocus() {
        this._enabled = true;
    }
    Object.defineProperty(Autofocus.prototype, "enabled", {
        get: function () {
            return this._enabled ? '' : null;
        },
        enumerable: true,
        configurable: true
    });
    Autofocus.prototype.setEnabled = function (enabled) {
        this._enabled = enabled;
    };
    return Autofocus;
}());

//# sourceMappingURL=autofocus.js.map

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShareBudgetModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_clipboard__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_replication_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_clipboard__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_clipboard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_clipboard__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ShareBudgetModal = (function () {
    function ShareBudgetModal(viewCtrl, formBuilder, http, navParams, dbms, configuration, replication, nav, actionSheetCtrl, toastCtrl, nativeClipboard) {
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.http = http;
        this.dbms = dbms;
        this.configuration = configuration;
        this.replication = replication;
        this.nav = nav;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.nativeClipboard = nativeClipboard;
        this.logger = __WEBPACK_IMPORTED_MODULE_9__services_logger__["a" /* Logger */].get('ShareBudgetModal');
        this.viewCtrl = viewCtrl;
        this.form = formBuilder.group({
            budgetName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        if (navParams.data.budgetId) {
            this.budget = dbms.getDb(navParams.data.budgetId);
        }
    }
    ShareBudgetModal_1 = ShareBudgetModal;
    ShareBudgetModal.prototype.close = function () {
        if (this.closed)
            return;
        this.closed = true;
        if (this.newlyLinkedBudget) {
            this.viewCtrl.dismiss({ 'newBudget': this.budget });
        }
        else {
            this.viewCtrl.dismiss();
        }
    };
    ShareBudgetModal.prototype.cancel = function () {
        if (this.newlyLinkedBudget)
            return;
        if (this.linkingSubscription && !this.linkingSubscription.closed) {
            this.linkingSubscription.unsubscribe();
            delete this.linkingSubscription;
        }
        this.linking = false;
        if (this.sharingSubscription && !this.sharingSubscription.closed) {
            this.sharingSubscription.unsubscribe();
            delete this.sharingSubscription;
        }
        this.sharing = false;
    };
    ShareBudgetModal.prototype.isShared = function () {
        return this.budget && this.replication.enabled(this.budget);
    };
    ShareBudgetModal.prototype.tryLink = function (budgetId) {
        var _this = this;
        this.linkingError = false;
        this.doLink(budgetId, function (err) {
        }, function (budget) {
            setTimeout(function () { return _this.close(); }, 3000);
        });
    };
    ShareBudgetModal.prototype.doLink = function (budgetId, errorHandler, successHandler) {
        var _this = this;
        if (this.newlyLinkedBudget)
            return;
        if (this.linkingSubscription && !this.linkingSubscription.closed)
            this.linkingSubscription.unsubscribe();
        this.linkingSubscription = this.http.post('https://api.freebudgetapp.com/link', JSON.stringify({ 'dbId': budgetId, 'deviceId': this.configuration.deviceInstallationId, 'deviceName': this.configuration.deviceName }))
            .map(function (response) { return response.json(); })
            .subscribe(function (response) {
            _this.logger.info('success: ' + JSON.stringify(response));
            var budgetName = response.dbName;
            var deviceReplId = response.replId;
            _this.dbms.createDb(budgetId).then(function (budget) {
                _this.budget = budget;
                _this.budget.name(budgetName);
                _this.replication.enable(_this.budget, deviceReplId);
                _this.replication.safeSync();
                _this.newlyLinkedBudget = true;
            }).then(function () {
                if (successHandler)
                    successHandler(_this.budget);
            });
        }, function (err) {
            _this.logger.debug('error: ' + JSON.stringify(err));
            if (errorHandler)
                errorHandler(err);
        });
    };
    ShareBudgetModal.prototype.link = function (budgetId) {
        var _this = this;
        this.linking = true;
        this.linkingError = false;
        this.doLink(budgetId, function (err) {
            _this.linking = false;
            _this.linkingError = true;
            try {
                var message = JSON.parse(err._body).error.message + '';
                if (message.match('Bad Request: Invalid dbId ')) {
                    message = message.replace('Bad Request: Invalid dbId ', '');
                    _this.linkingErrorMessage = 'The share code ' + message + ' doesn\'t link up with any budget that we know about. Please check it and try again.';
                }
                else if (message.match('Bad Request: dbId ') && message.match(' does not exist')) {
                    message = message.replace('Bad Request: dbId ', '').replace(' does not exist', '');
                    _this.linkingErrorMessage = 'The share code ' + message + ' doesn\'t link up with any budget that we know about. Please check it and try again.';
                }
                else if (message) {
                    _this.linkingErrorMessage = 'Error: ' + message;
                }
            }
            catch (e) {
                _this.linkingErrorMessage = err && err.status ? 'Error Code: ' + err.status + ' - ' + err.statusText : 'Uh Oh! Something has gone wrong. Please try again.';
            }
        }, function (budget) {
            _this.linking = false;
            setTimeout(function () { return _this.close(); }, 3000);
        });
    };
    ShareBudgetModal.prototype.shareBudget = function () {
        var _this = this;
        if (this.sharingSubscription && !this.sharingSubscription.closed)
            this.sharingSubscription.unsubscribe();
        this.sharing = true;
        this.sharingError = false;
        this.sharingSubscription = ShareBudgetModal_1.postShare(this.http, this.budget.id, this.budget.name(), this.configuration.deviceInstallationId, this.configuration.deviceName)
            .map(function (response) { return response.json(); })
            .subscribe(function (response) {
            _this.logger.info('success: ' + JSON.stringify(response));
            _this.replication.enable(_this.budget, response.replId);
            _this.logger.info('ReplId: ' + _this.replication.enabled(_this.budget));
            _this.sharing = false;
        }, function (err) {
            _this.logger.debug('error: ' + JSON.stringify(err));
            _this.sharing = false;
            _this.sharingError = true;
            try {
                var message = JSON.parse(err._body).error.message + '';
                _this.sharingErrorMessage = 'Error: ' + message;
            }
            catch (e) {
                _this.sharingErrorMessage = err && err.status ? 'Error Code: ' + err.status + ' - ' + err.statusText : 'Uh Oh! Something has gone wrong. Please try again.';
            }
        });
    };
    ShareBudgetModal.postShare = function (http, budgetId, budgetName, deviceInstallationId, deviceName) {
        return http.post('https://api.freebudgetapp.com/share', JSON.stringify({ 'dbId': budgetId, 'dbName': budgetName, 'deviceId': deviceInstallationId, 'deviceName': deviceName }));
    };
    ShareBudgetModal.prototype.shareOptions = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Share',
            buttons: [
                {
                    text: 'Email',
                    handler: function () {
                        window.location.href = 'mailto:?subject=' + encodeURI(_this.budget.name()) + ' Share Code&body=' + encodeURI(_this.budget.id);
                    }
                }, {
                    text: 'Copy',
                    cssClass: 'share-copy',
                    handler: function () {
                        // Note: Handler code is attached by JS clipboard handler below
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present().then(function () {
            var cb = new __WEBPACK_IMPORTED_MODULE_10_clipboard___default.a('.share-copy', { text: function () { return _this.budget.id; } });
            cb.on('success', function () {
                _this.toastCtrl.create({
                    message: 'Copied!\nOpen another application and paste the share code',
                    duration: 10000,
                    showCloseButton: true,
                    position: 'bottom'
                }).present();
            });
            cb.on('error', function () {
                if (!_this.configuration.native) {
                    _this.toastCtrl.create({
                        message: 'Uh oh!\nThe code couldn\'t be copied. You\'ll need to highlight the code and press Ctrl-C to copy.',
                        duration: 10000,
                        showCloseButton: true,
                        position: 'bottom'
                    }).present();
                }
                else {
                    _this.nativeClipboard.copy(_this.budget.id).then(function () {
                        _this.toastCtrl.create({
                            message: 'Copied!\nOpen another application and paste the share code',
                            duration: 10000,
                            showCloseButton: true,
                            position: 'bottom'
                        }).present();
                    }, function (reason) {
                        _this.toastCtrl.create({
                            message: 'Uh oh!\nThe code couldn\'t be copied (' + reason + '). You\'ll need to highlight the code and press Ctrl-C to copy.',
                            duration: 10000,
                            showCloseButton: true,
                            position: 'bottom'
                        }).present();
                    });
                }
            });
        });
    };
    ShareBudgetModal = ShareBudgetModal_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_8__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\modals\share-budget\share-budget.html"*/'<ion-header>\n\n    <ion-toolbar>\n\n        <ion-buttons start>\n\n            <button ion-button *ngIf="!linking && !sharing" (click)="close()">Close</button>\n\n            <button ion-button *ngIf="linking || sharing" (click)="cancel()">Cancel</button>\n\n        </ion-buttons>\n\n        <ion-title>\n\n            {{!budget ? "Link Budget" : "Share Budget"}}\n\n        </ion-title>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content class="share-budget-page" responsive-padding>\n\n\n\n    <!-- Share Budget -->\n\n    <div *ngIf="budget && !newlyLinkedBudget">\n\n        <div [class.shown]="!isShared()" class="enable-sharing-button-wrapper">\n\n            <button ion-button large class="button" (click)="shareBudget()" [disabled]="sharing || isShared()">Enable Sharing</button>\n\n        </div>\n\n\n\n        <div class="share-code-text-wrapper" [class.shown]="isShared()">\n\n            Send the share code to others to join<br>\n\n            <input class="share-code-text" value="{{budget.id}}" readonly>\n\n            <br><br>\n\n            <button ion-button class="button" (click)="shareOptions()">Share...</button>\n\n        </div>\n\n\n\n        <error-label [class.shown]="sharingError" [message]="sharingErrorMessage"></error-label>\n\n\n\n        <div class="working-container">\n\n            <ion-spinner id="share-spinner" [class.shown]="sharing"></ion-spinner>\n\n            <div [class.drawn]="isShared()" id="share-tick-trigger"></div>\n\n            <svg version="1.1" id="share-tick" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 37 37" style="enable-background:new 0 0 37 37;" xml:space="preserve">\n\n                <path class="circ path" style="fill:none;stroke:#000;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10;" d="M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"/>\n\n                <polyline class="tick path" style="fill:none;stroke:#000;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10;" points="11.6,20 15.9,24.2 26.4,13.8 "/>\n\n            </svg>\n\n        </div>\n\n\n\n    </div>\n\n\n\n    <!-- Link Budget -->\n\n    <div class="link-budget-container" *ngIf="!budget || newlyLinkedBudget">\n\n        <input type="text" class="share-code-input" placeholder="Paste Share Code" [(ngModel)]="linkBudgetId" (input)="tryLink(linkBudgetId)" [disabled]="linking || newlyLinkedBudget">\n\n        <button ion-button class="button share-code-link" (click)="link(linkBudgetId)" [disabled]="linking || newlyLinkedBudget || !linkBudgetId">Link</button>\n\n\n\n        <div></div>\n\n        <error-label [class.shown]="linkingError" [message]="linkingErrorMessage"></error-label>\n\n\n\n        <div class="working-container">\n\n            <ion-spinner [class.shown]="linking" id="link-spinner"></ion-spinner>\n\n            <div [class.drawn]="newlyLinkedBudget" id="link-tick-trigger"></div>\n\n            <svg version="1.1" id="link-tick" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 37 37" style="enable-background:new 0 0 37 37;" xml:space="preserve">\n\n                <path class="circ path" style="fill:none;stroke:#000;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10;" d="M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"/>\n\n                <polyline class="tick path" style="fill:none;stroke:#000;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10;" points="11.6,20 15.9,24.2 26.4,13.8 "/>\n\n            </svg>\n\n        </div>\n\n    </div>\n\n\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\modals\share-budget\share-budget.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_6__services_configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_7__services_replication_service__["a" /* Replication */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_clipboard__["a" /* Clipboard */]])
    ], ShareBudgetModal);
    return ShareBudgetModal;
    var ShareBudgetModal_1;
}());

//# sourceMappingURL=share-budget.js.map

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Budget; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_record__ = __webpack_require__(45);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Budget = (function (_super) {
    __extends(Budget, _super);
    function Budget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Budget.prototype.tableName = function () {
        return 'Budget';
    };
    Budget.prototype.initTable = function (table) {
        // Nothing needed here:)
    };
    return Budget;
}(__WEBPACK_IMPORTED_MODULE_0__db_record__["a" /* Record */]));

//# sourceMappingURL=budget.js.map

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitCategorySimpleWeeklyTransaction; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_transaction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__records_category__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__processors_category_simple_weekly_processor__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_big_js__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var InitCategorySimpleWeeklyTransaction = (function (_super) {
    __extends(InitCategorySimpleWeeklyTransaction, _super);
    function InitCategorySimpleWeeklyTransaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InitCategorySimpleWeeklyTransaction.prototype.getTypeId = function () {
        return 'InitCategorySimpleWeeklyTransaction';
    };
    InitCategorySimpleWeeklyTransaction.prototype.apply = function (tp) {
        // TODO: Validation
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_category__["a" /* Category */]);
        var categoryRecord = table.by('id', this.categoryId);
        if (categoryRecord == null) {
            InitCategorySimpleWeeklyTransaction.logger.info('Trying to processing category weekly transaction with invalid category. Skipping.');
            return;
        }
        var processor = new __WEBPACK_IMPORTED_MODULE_2__processors_category_simple_weekly_processor__["a" /* CategorySimpleWeeklyProcessor */]();
        processor.balance = this.balance;
        processor.weeklyAmount = this.weeklyAmount;
        processor.balanceDate = this.balanceDate;
        processor.category = categoryRecord;
        processor.transactionId = this.id;
        categoryRecord.engine.processors.push(processor);
        table.update(categoryRecord);
        tp.mapTransactionAndRecord(this, categoryRecord);
        // TODO: engine.execute ?? - needs to be called from elsewhere so it can be batched... but maybe have to fire an event here ?
    };
    InitCategorySimpleWeeklyTransaction.prototype.update = function (tp) {
        this.undo(tp); // TODO: This will not handle a change in category (And maybe it shouldn't need to, but we need to verify it wasn't changed). it should undo the previous version of this transaction...
        this.apply(tp);
    };
    InitCategorySimpleWeeklyTransaction.prototype.undo = function (tp) {
        var _this = this;
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_category__["a" /* Category */]);
        var categoryRecord = table.by('id', this.categoryId);
        if (categoryRecord == null) {
            InitCategorySimpleWeeklyTransaction.logger.info('Trying to processing category weekly transaction with invalid category. Skipping.');
            return;
        }
        // TODO: A better method of finding, or some centralised methods in engine rather than using the processors array directly...
        var categorySimpleWeeklyProcessor = categoryRecord.engine.processors.find(function (processor) {
            return processor.getTypeId() === 'CategorySimpleWeeklyProcessor' && processor.transactionId === _this.id;
        });
        categoryRecord.engine.processors.splice(categoryRecord.engine.processors.indexOf(categorySimpleWeeklyProcessor), 1);
        table.update(categoryRecord);
    };
    InitCategorySimpleWeeklyTransaction.prototype.deserialize = function (field, value) {
        if (field === 'balance')
            return new __WEBPACK_IMPORTED_MODULE_4_big_js__["Big"](value);
        if (field === 'weeklyAmount')
            return new __WEBPACK_IMPORTED_MODULE_4_big_js__["Big"](value);
        return value;
    };
    InitCategorySimpleWeeklyTransaction.prototype.toHumanisedString = function (env) {
        if (env.action === 'apply') {
            return "set {{category name}} to " + env.currencyFormatter(this.weeklyAmount) + " per week";
        }
        else if (env.action === 'update') {
            return "updated {{category name}} to " + env.currencyFormatter(this.weeklyAmount) + " per week";
        }
        else {
            return "removed weekly amount of " + env.currencyFormatter(this.weeklyAmount) + " from category {{category name}}";
        }
    };
    InitCategorySimpleWeeklyTransaction.logger = __WEBPACK_IMPORTED_MODULE_3__services_logger__["a" /* Logger */].get('InitCategorySimpleWeeklyTransaction');
    return InitCategorySimpleWeeklyTransaction;
}(__WEBPACK_IMPORTED_MODULE_0__db_transaction__["a" /* DbTransaction */]));

//# sourceMappingURL=init-category-simple-weekly-transaction.js.map

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEditSplitTransactionModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_records_category__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_records_transaction__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_transactions_create_split_transaction__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_big_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__add_edit_split_transaction_line__ = __webpack_require__(376);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AddEditSplitTransactionModal = (function () {
    function AddEditSplitTransactionModal(configuration, modalController, viewCtrl, navParams, engineFactory, nav, alertController) {
        var _this = this;
        this.configuration = configuration;
        this.modalController = modalController;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.engineFactory = engineFactory;
        this.nav = nav;
        this.alertController = alertController;
        this.engine = engineFactory.getEngineById(navParams.data.budgetId);
        if (navParams.data.categoryId != null) {
            this.engine.getCategory(navParams.data.categoryId);
            this.category = this.engine.db.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_1__data_records_category__["a" /* Category */]).by('id', navParams.data.categoryId);
        }
        // TODO: Validation that amounts must be equal
        this.data = {};
        this.data.lines = [];
        if (navParams.data.transactionId) {
            this.editing = true;
            var transactionRecord = this.engine.db.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_2__data_records_transaction__["a" /* Transaction */]).by('id', navParams.data.transactionId);
            this.transaction = this.engine.db.transactionProcessor.findTransactionsForRecord(transactionRecord, __WEBPACK_IMPORTED_MODULE_4__data_transactions_create_split_transaction__["a" /* CreateSplitTransaction */])[0];
            if (this.category == null) {
                this.category = this.engine.db.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_1__data_records_category__["a" /* Category */]).by('id', this.transaction.amounts[0].categoryId);
            }
            this.data.date = __WEBPACK_IMPORTED_MODULE_7__services_utils__["a" /* Utils */].toIonicFromYYYYMMDD(this.transaction.date);
            this.data.expense = this.transaction.amounts[0].amount.cmp(Object(__WEBPACK_IMPORTED_MODULE_8_big_js__["Big"])(0)) >= 0;
            this.data.amount = this.totalAmount().toString();
            this.data.description = this.transaction.description;
            this.data.status = this.transaction.status;
            this.transaction.amounts.forEach(function (l) {
                _this.data.lines.push({ categoryId: l.categoryId, amount: l.amount.times(_this.data.expense ? 1 : -1) + "", accountId: l.accountId });
            });
        }
        else {
            this.editing = false;
            this.data.expense = true;
            this.data.date = __WEBPACK_IMPORTED_MODULE_7__services_utils__["a" /* Utils */].toIonicFromYYYYMMDD(this.navParams.data.date || __WEBPACK_IMPORTED_MODULE_7__services_utils__["a" /* Utils */].nowYYYYMMDD());
            this.data.description = this.navParams.data.description;
            this.data.accountId = this.navParams.data.accountId;
            this.data.status = 'realised';
            this.data.amount = this.navParams.data.amount ? this.navParams.data.amount + '' : undefined;
            if (this.data.amount)
                this.data.expense = new __WEBPACK_IMPORTED_MODULE_8_big_js__["Big"](this.data.amount).cmp(Object(__WEBPACK_IMPORTED_MODULE_8_big_js__["Big"])(0)) >= 0;
            this.data.lines.push({
                categoryId: this.category ? this.category.id : undefined,
                amount: this.data.amount,
                accountId: this.data.accountId
            });
            if (!this.category) {
                this.editLine(this.data.lines[0]);
            }
        }
    }
    AddEditSplitTransactionModal.prototype.editLine = function (line) {
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_9__add_edit_split_transaction_line__["a" /* AddEditSplitTransactionLineModal */], {
            parent: this,
            lineIndex: this.data.lines.indexOf(line)
        }, { showBackdrop: false, enableBackdropDismiss: false });
        modal.present();
    };
    AddEditSplitTransactionModal.prototype.totalAmount = function () {
        return this.data.lines.map(function (line) { return line.amount; }).reduce(function (total, amount) { return new __WEBPACK_IMPORTED_MODULE_8_big_js__["Big"]((amount || '0').replace(',', '')).plus(total); }, new __WEBPACK_IMPORTED_MODULE_8_big_js__["Big"]('0')).abs();
    };
    AddEditSplitTransactionModal.prototype.amountRemaining = function () {
        return new __WEBPACK_IMPORTED_MODULE_8_big_js__["Big"]((this.data.amount || '0').replace(',', '')).minus(this.totalAmount());
    };
    AddEditSplitTransactionModal.prototype.newLine = function () {
        this.data.lines.push({
            categoryId: null,
            accountId: this.data.accountId,
            amount: ''
        });
        this.editLine(this.data.lines[this.data.lines.length - 1]);
    };
    AddEditSplitTransactionModal.prototype.submit = function (event) {
        var _this = this;
        event.preventDefault();
        var t;
        if (!this.editing) {
            t = new __WEBPACK_IMPORTED_MODULE_4__data_transactions_create_split_transaction__["a" /* CreateSplitTransaction */]();
        }
        else {
            t = this.transaction;
        }
        t.date = __WEBPACK_IMPORTED_MODULE_7__services_utils__["a" /* Utils */].toYYYYMMDDFromIonic(this.data.date);
        t.description = this.data.description;
        t.status = this.data.status;
        // Always clear out the records in the transaction and not "merge" them
        // Our indexes should be preserved...
        t.amounts = [];
        this.data.lines.forEach(function (line) {
            t.amounts.push({
                categoryId: line.categoryId,
                amount: new __WEBPACK_IMPORTED_MODULE_8_big_js__["Big"]((line.amount || '0').replace(',', '')).times(_this.data.expense ? 1 : -1),
                accountId: Number(line.accountId)
            });
        });
        this.engine.db.applyTransaction(t);
        this.viewCtrl.dismiss({ transactions: this.engine.db.transactionProcessor.findRecordsForTransaction(t, __WEBPACK_IMPORTED_MODULE_2__data_records_transaction__["a" /* Transaction */]) });
    };
    AddEditSplitTransactionModal.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    AddEditSplitTransactionModal.prototype.deleteTransactionConfirm = function () {
        var _this = this;
        var confirm = this.alertController.create({
            title: 'Delete?',
            message: 'Are you sure you want to delete this entire transaction?',
            buttons: [
                {
                    text: 'Cancel'
                }, {
                    text: 'Delete',
                    role: 'destructive',
                    handler: function () {
                        confirm.dismiss().then(function () {
                            _this.deleteTransaction();
                        });
                        return false;
                    }
                }
            ]
        });
        confirm.present();
    };
    AddEditSplitTransactionModal.prototype.deleteTransaction = function () {
        this.engine.db.deleteTransaction(this.transaction);
        this.viewCtrl.dismiss();
    };
    AddEditSplitTransactionModal.prototype.toggleExpense = function () {
        this.data.expense = !this.data.expense;
    };
    AddEditSplitTransactionModal.prototype.reconciledTotal = function () {
        return new __WEBPACK_IMPORTED_MODULE_8_big_js__["Big"]('0');
    };
    AddEditSplitTransactionModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\modals\add-edit-split-transaction\add-edit-split-transaction.html"*/'<ion-header>\n\n    <ion-toolbar>\n\n    <ion-buttons start>\n\n        <button ion-button (click)="cancel()">Cancel</button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>{{category?.name}}</ion-title>\n\n\n\n    <ion-buttons end>\n\n        <button ion-button (click)="submit($event)" [disabled]="!form.valid">{{editing ? "Save" : "Create"}}</button>\n\n    </ion-buttons>\n\n\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content class="add-edit-split-transaction-modal">\n\n    <div responsive-padding>\n\n        <form (submit)="submit($event)" novalidate #form="ngForm">\n\n            <ion-item-group>\n\n                <ion-item>\n\n                    <ion-segment name="expense" [(ngModel)]="data.expense">\n\n                        <ion-segment-button [value]="true" (mousedown)="$event.preventDefault()">Expense</ion-segment-button>\n\n                        <ion-segment-button [value]="false" (mousedown)="$event.preventDefault()">Income</ion-segment-button>\n\n                    </ion-segment>\n\n                </ion-item>\n\n            </ion-item-group>\n\n            <ion-item *ngIf="configuration.optionBooleanAccessor(\'experimental.accounts.enabled\').value && engine.getAccounts().length > 0">\n\n                <ion-label>Account (TODO: Lock this to reconciled account (or lock to multiple if multiple)</ion-label>\n\n                <ion-select required name="account" [(ngModel)]="data.accountId">\n\n                    <ion-option value="-1">&lt;No Account&gt;</ion-option>\n\n                    <ion-option value="-2">&lt;TODO Multiple&gt;</ion-option>\n\n                    <ion-option *ngFor="let account of engine.getAccounts()" value="{{account.id}}">{{account.name}}</ion-option>    \n\n                </ion-select>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Amount</ion-label>\n\n                <ion-input currency-field required name="amount" [(ngModel)]="data.amount" [attr.autofocus]="editing ? null : true"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Description</ion-label>\n\n                <ion-input required type="text" [(ngModel)]="data.description" name="description"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Date</ion-label>\n\n                <ion-datetime name="date" [(ngModel)]="data.date" displayFormat="MMM D, YYYY" pickerFormat="MMM D YYYY"></ion-datetime>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-segment name="status" [(ngModel)]="data.status">\n\n                    <ion-segment-button value="realised">Realised</ion-segment-button>\n\n                    <ion-segment-button value="anticipated">Anticipated</ion-segment-button>\n\n                </ion-segment>\n\n            </ion-item>\n\n            <ion-list-header>\n\n                Allocation\n\n            </ion-list-header>\n\n            <ng-container *ngFor="let line of data.lines"><button ion-item type="button" *ngIf="line.categoryId" (click)="editLine(line)">\n\n                <ion-label>{{engine.getCategory(line.categoryId)?.name || "Select Category"}}</ion-label>\n\n                <div item-right>{{line.amount}}</div>\n\n            </button></ng-container>\n\n            <button ion-item type="button" (click)="newLine()">\n\n                <ion-label>Add Another Line</ion-label>\n\n                <div item-right>{{amountRemaining()}}</div>\n\n            </button>\n\n\n\n\n\n            Reconciled Total (TODO and Only if enabled): <currency-display [value]="reconciledTotal()"></currency-display>\n\n\n\n        </form>\n\n    </div>\n\n    <button ion-button type="button" *ngIf="editing" color="danger" clear small (click)="deleteTransactionConfirm()">Delete</button>\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\modals\add-edit-split-transaction\add-edit-split-transaction.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__["a" /* EngineFactory */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */]])
    ], AddEditSplitTransactionModal);
    return AddEditSplitTransactionModal;
}());

//# sourceMappingURL=add-edit-split-transaction.js.map

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggerUINotifierAppender; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_build_info__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logger_storage_appender__ = __webpack_require__(386);



var DefaultLoggerUINotifierAppenderHandler = (function () {
    function DefaultLoggerUINotifierAppenderHandler() {
        this.css = "\n        #error-overlay {\n            position: fixed;\n            z-index: 100000;\n            top: 10px;\n            bottom: 10px;\n            left: 10px;\n            right: 10px;\n            box-sizing: border-box;\n            color: white;\n            white-space: nowrap;\n            font-size: 20px;\n        }\n\n        @media (min-width: 600px) and (min-height: 600px) {\n            #error-overlay {\n                top: 15%;\n                bottom: 15%;\n                left: 15%;\n                right: 15%;\n            }\n        }\n        \n        #error-overlay:after {\n            content: '';\n            display: block;\n            position: absolute;\n            background-color: red;\n            top: 0;\n            bottom: 0;\n            left: 0;\n            right: 0;\n            z-index: -1;\n            box-shadow: 0 0 30px black;\n        }\n        #error-overlay:before {\n            content: '';\n            display: block;\n            position: fixed;\n            background-color: rgba(100,0,0,0.7);\n            top: 0;\n            bottom: 0;\n            left: 0;\n            right: 0;\n            z-index: -1;\n        }\n        #error-overlay-nav {\n            width: 100%;\n            height: 100%;\n            position: relative;\n            overflow: hidden;\n        }\n        #error-overlay .error-page {\n            display: inline-block;\n            width: 100%;\n            height: 100%;\n            position: relative;\n            white-space: normal;\n            left: 0;\n        }\n        #error-overlay .error-page-animating {\n            transition: left 0.3s;\n        }\n        #error-overlay .header {\n            height: 70px;\n            width: 100%;\n            position: absolute;\n            top: 0;\n            text-align: center;\n            background-color: white;\n            color: red;\n            white-space: nowrap;\n            overflow: hidden;\n        }\n        #error-overlay .content {\n            position: absolute;\n            top: 70px;\n            bottom: 100px;\n            left: 0;\n            right: 0;\n            box-sizing: border-box;\n            overflow: auto;\n            padding: 20px;\n        }\n        #error-overlay .sad-icon {\n            font-size: 40px;\n            display: inline-block;\n            width: 60px;\n            height: 60px;\n            transform: rotate(90deg);\n            margin-top:-20px;\n        }\n        #error-overlay .error-buttons {\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            right: 0;\n            height: auto;\n            transition: height 0.3s;\n        }\n        #error-overlay .error-buttons .error-link {\n            padding-left: 20px;\n            border-top: 1px white solid;\n            line-height: 40px;\n            cursor: pointer;\n            font-size: 14px;\n        }\n        #error-overlay .error-button {\n            position: relative;\n            display: block;\n            top: 0;\n            width: 100%;\n            height: 50px;\n            line-height: 50px;\n            white-space: nowrap;\n            font-weight: bold;\n            font-size: 20px;\n            text-align: center;\n            border-top: 1px white solid;\n            cursor: pointer;\n            transition: opacity 0.3s, top 0.3s;\n            color: white;\n            text-decoration: none;\n        }\n        #error-overlay .error-button:hover {\n            background-color: rgba(255,255,255,0.2);\n        }\n        #error-overlay .error-button-disabled:hover, #error-overlay .error-button-disabled {\n            cursor: auto;\n            background-color: #ccc;\n            color: #aaa;\n        }\n        #error-overlay .error-button-hidden {\n            position: relative;\n            top: 20px;\n            opacity: 0;\n            height: 0;\n        }\n        #error-contact-page label {\n            display: block;\n            margin-top: 20px;\n        }\n        #error-contact-page textarea {\n            font-size: inherit;\n            display: block;\n            width: 100%;\n            color: black;\n            margin-top: 20px;\n        }\n        #error-contact-page input {\n            vertical-align:middle;\n            width: 30px;\n            height: 30px;\n        }\n        #error-overlay #error-log-data {\n            white-space: pre;\n            font-size: 16px;\n            font-family: monospace;\n        }\n        #error-overlay .success-icon {\n            font-size: 150px;\n            line-height: 150px;\n            height: 150px;\n            text-align: center;\n            position: absolute;\n            left: 0;\n            right: 0;\n            top: 50%;\n            margin-top: -75px;\n        }\n    ";
        this.html = "\n        <div id=\"dismiss-confirm-page\" class=\"error-page\">\n            <div class=\"header\">\n                <h1>Are You Sure?</h1>\n            </div>\n            <div class=\"content\">\n                <div>We really don't recommend ignoring any errors, but sometimes you just have to try and get on with it, we understand.</div>\n            </div>\n            <div class=\"error-buttons\">\n                <div id=\"dismiss-confirm-back-button\" class=\"error-button\">&lt; Go Back</div>\n                <div id=\"dismiss-confirm-button\" class=\"error-link\">Close</div>\n            </div>\n        </div>\n        <div id=\"error-main-page\" class=\"error-page\">\n            <div class=\"header\">\n                <h1><div class=\"sad-icon\">: (</div></h1>\n            </div>\n            <div class=\"content\">\n                <div>Uh Oh! Something has gone terribly wrong. To make sure your budget isn't affected, we've stopped things here.</div>\n                <br>\n                <div>The best thing to do is send us some information about what has gone wrong so we can get busy fixing it. And if it keeps happening, to give you some support to get your budget up and running again.</div>\n            </div>\n            <div class=\"error-buttons\" style=\"height:90px\">\n                <div id=\"goto-error-report-button\" class=\"error-button\">Next &gt;</div>\n                <div id=\"show-other-options-button\" class=\"error-link\">Other Options</div>\n                <div id=\"restart-button\" class=\"error-button error-button-hidden\">Restart App</div>\n                <div id=\"dismiss-button\" class=\"error-button error-button-hidden\">Ignore</div>\n            </div>\n        </div>\n        <div id=\"error-contact-page\" class=\"error-page\">\n            <div class=\"header\">\n                <h1>Can we get in touch?</h1>\n            </div>\n            <div class=\"content\">\n                <label>Contact Information\n                    <textarea id=\"error-contact-info\" placeholder=\"eg. me@email.com, a phone number and timezone/time to call, Skype, Hangouts, Facebook, etc.\"></textarea>\n                </label>\n                <label><input type=\"checkbox\" id=\"error-do-not-contact\"></input> Do not contact me</label>                \n            </div>\n            <div class=\"error-buttons\">\n                <div id=\"error-contact-next-button\" class=\"error-button\">Next &gt;</div>\n                <div id=\"error-contact-back-button\" class=\"error-link\">&lt; Go Back</div>\n            </div>\n        </div>\n        <div id=\"error-privacy-page\" class=\"error-page\">\n            <div class=\"header\">\n                <h1>Privacy</h1>\n            </div>\n            <div class=\"content\">\n                Unlike most companies, we don't want to collect all your information for marketing. We just want to keep you as a satisfied customer and build the best budgeting app possible.\n                <br/><br/>\n                This is the information that will be sent to help us sort out the issue.\n                <br/><br/>\n                Privacy is of the highest priority to us and we won't use this information for anything but solving your issue. This information will be destroyed afterwards.\n                <br/><br/>\n                <div id=\"error-report-data\"></div>\n            </div>\n            <div class=\"error-buttons\">\n                <div id=\"error-privacy-next-button\" class=\"error-button\">Next &gt;</div>\n                <div id=\"error-privacy-back-button\" class=\"error-link\">&lt; Go Back</div>\n            </div>\n        </div>\n        <div id=\"error-send-page\" class=\"error-page\">\n            <div class=\"header\">\n                <h1>Submit</h1>\n            </div>\n            <div class=\"content\">\n                <div id=\"error-log-data\"></div>\n            </div>\n            <div class=\"error-buttons\">\n                <div id=\"error-send-button\" class=\"error-button\">Submit</div>\n                <div id=\"error-send-back-button\" class=\"error-link\">&lt; Go Back</div>\n            </div>\n        </div>\n        <div id=\"error-sent-page\" class=\"error-page\">\n            <div class=\"header\">\n                <h1>Thanks</h1>\n            </div>\n            <div class=\"content\">\n                <div class=\"success-icon\">&#10004;</div>\n            </div>\n            <div class=\"error-buttons\" style=\"height:90px\">\n                <div id=\"sent-restart-button\" class=\"error-button\">Restart App</div>\n                <div id=\"sent-dismiss-button\" class=\"error-link\">Dismiss & Continue (Not recommended)</div>\n            </div>\n        </div>\n        <div id=\"error-error-page\" class=\"error-page\">\n            <div class=\"header\">\n                <h1>Oh Dear</h1>\n            </div>\n            <div class=\"content\">\n                We couldn't send the error report. Would you mind either emailing it to us, or copying it into an email and sending to support@freedombudgetapp.com\n            </div>\n            <div class=\"error-buttons\" style=\"height:140px\">\n                <a id=\"error-email-button\" data-rel=\"external\" href=\"mailto:support@freedombudgetapp.com?subject=Error Repprt&body=\" class=\"error-button\">Send Using Email</a>\n                <div id=\"error-restart-button\" class=\"error-button\">Restart App</div>\n                <div id=\"error-dismiss-button\" class=\"error-link\">Dismiss & Continue (Not recommended)</div>\n            </div>\n        </div>\n    ";
    }
    DefaultLoggerUINotifierAppenderHandler.prototype.handle = function (message) {
        var _this = this;
        if (document.getElementById('error-overlay'))
            return;
        this.populateErrorLogData();
        var errorOverlayWrapperDiv = document.createElement('div');
        errorOverlayWrapperDiv.id = 'error-overlay';
        document.body.insertBefore(errorOverlayWrapperDiv, document.body.firstChild);
        this.errorOverlayDiv = document.createElement('div');
        this.errorOverlayDiv.id = 'error-overlay-nav';
        errorOverlayWrapperDiv.appendChild(this.errorOverlayDiv);
        this.errorOverlayDiv.innerHTML = this.html;
        this.errorMainPage = document.getElementById('error-main-page');
        this.errorContactPage = document.getElementById('error-contact-page');
        this.errorPrivacyPage = document.getElementById('error-privacy-page');
        this.errorSendPage = document.getElementById('error-send-page');
        this.dismissConfirmPage = document.getElementById('dismiss-confirm-page');
        this.errorErrorPage = document.getElementById('error-error-page');
        this.errorSentPage = document.getElementById('error-sent-page');
        this.errorStyle = document.createElement('style');
        this.errorStyle.id = 'error-style';
        this.errorStyle.innerText = this.css;
        document.head.appendChild(this.errorStyle);
        document.getElementById('show-other-options-button').addEventListener('click', function (ev) {
            document.getElementById('show-other-options-button').remove();
            document.getElementById('dismiss-button').className = 'error-button';
            document.getElementById('restart-button').className = 'error-button';
            document.getElementById('restart-button').parentElement.style.height = '150px';
        });
        document.getElementById('goto-error-report-button').addEventListener('click', function (ev) {
            _this.goToPage(_this.errorContactPage);
        });
        document.getElementById('dismiss-button').addEventListener('click', function (ev) {
            _this.goToPage(_this.dismissConfirmPage);
        });
        document.getElementById('restart-button').addEventListener('click', function (ev) {
            _this.restartApp();
        });
        document.getElementById('error-dismiss-button').addEventListener('click', function (ev) {
            _this.closeError();
        });
        document.getElementById('error-restart-button').addEventListener('click', function (ev) {
            _this.restartApp();
        });
        document.getElementById('sent-dismiss-button').addEventListener('click', function (ev) {
            _this.closeError();
        });
        document.getElementById('sent-restart-button').addEventListener('click', function (ev) {
            _this.restartApp();
        });
        document.getElementById('dismiss-confirm-button').addEventListener('click', function (ev) {
            _this.closeError();
        });
        document.getElementById('dismiss-confirm-back-button').addEventListener('click', function (ev) {
            _this.goBack(_this.errorMainPage);
        });
        document.getElementById('error-contact-next-button').addEventListener('click', function (ev) {
            if (!_this.enableContactNext) {
                // TODO: Some feedback
                return;
            }
            window.localStorage.setItem('error-contact-info', document.getElementById('error-contact-info').value);
            window.localStorage.setItem('error-do-not-contact', document.getElementById('error-do-not-contact').checked ? 'true' : 'false');
            _this.goToPage(_this.errorPrivacyPage);
        });
        document.getElementById('error-privacy-next-button').addEventListener('click', function (ev) {
            _this.goToPage(_this.errorSendPage);
            document.getElementById('error-log-data').innerText = _this.getErrorReportData();
        });
        document.getElementById('error-contact-back-button').addEventListener('click', function (ev) {
            _this.goBack(_this.errorMainPage);
        });
        document.getElementById('error-privacy-back-button').addEventListener('click', function (ev) {
            _this.goBack(_this.errorContactPage);
        });
        document.getElementById('error-send-back-button').addEventListener('click', function (ev) {
            _this.goBack(_this.errorPrivacyPage);
        });
        document.getElementById('error-send-button').addEventListener('click', function (ev) {
            document.getElementById('error-send-button').innerText = 'Sending...';
            document.getElementById('error-send-button').className = 'error-button error-button-disabled';
            _this.submitErrorReportData();
        });
        document.getElementById('error-contact-info').value = window.localStorage.getItem('error-contact-info');
        document.getElementById('error-do-not-contact').checked = window.localStorage.getItem('error-do-not-contact') === 'true';
        document.getElementById('error-do-not-contact').addEventListener('change', function (ev) { _this.validateContactInfo(); });
        document.getElementById('error-contact-info').addEventListener('input', function (ev) { _this.validateContactInfo(); });
        this.validateContactInfo();
        for (var i = this.errorOverlayDiv.children.length - 1; i >= 0; i--) {
            this.errorOverlayDiv.children.item(i).remove();
        }
        this.errorOverlayDiv.appendChild(this.errorMainPage);
    };
    DefaultLoggerUINotifierAppenderHandler.prototype.restartApp = function () {
        //        if (Device && <any> Device.cordova) {
        // If native, put up a message and say the app will now close, please open it again and retry.
        //            if ((<any>navigator).app) {
        //                (<any>navigator).app.exitApp();
        //            } else if ((<any>navigator).device) {
        //                (<any>navigator).device.exitApp();
        //            } else {
        //                window.close();
        //            }
        // TODO: Message: The application has not closed, please force quit for app, and reopen it.
        //        } else {
        // TODO: Reload the original URL used to open it.... need to save that somewhere!?
        document.location.reload(true);
        //        }
    };
    DefaultLoggerUINotifierAppenderHandler.prototype.closeError = function () {
        document.getElementById('error-overlay').remove();
        this.errorStyle.remove();
    };
    DefaultLoggerUINotifierAppenderHandler.prototype.validateContactInfo = function () {
        this.enableContactNext = (document.getElementById('error-do-not-contact').checked || document.getElementById('error-contact-info').value.length > 0);
        document.getElementById('error-contact-next-button').className = this.enableContactNext ? 'error-button' : 'error-button error-button-disabled';
    };
    DefaultLoggerUINotifierAppenderHandler.prototype.goToPage = function (page) {
        var _this = this;
        if (this.navigating)
            return;
        this.navigating = true;
        var currentPage = this.errorOverlayDiv.getElementsByClassName('error-page').item(0);
        this.errorOverlayDiv.appendChild(page);
        setTimeout(function () {
            page.classList.add('error-page-animating');
            currentPage.classList.add('error-page-animating');
            currentPage.style.left = '-100%';
            page.style.left = '-100%';
            setTimeout(function () {
                currentPage.remove();
                page.style.left = '0';
                page.classList.remove('error-page-animating');
                currentPage.classList.remove('error-page-animating');
                _this.navigating = false;
            }, 500);
        });
    };
    DefaultLoggerUINotifierAppenderHandler.prototype.goBack = function (page) {
        var _this = this;
        if (this.navigating)
            return;
        this.navigating = true;
        var currentPage = this.errorOverlayDiv.getElementsByClassName('error-page').item(0);
        page.style.left = '-100%';
        currentPage.style.left = '-100%';
        this.errorOverlayDiv.insertBefore(page, currentPage);
        setTimeout(function () {
            page.classList.add('error-page-animating');
            currentPage.classList.add('error-page-animating');
            currentPage.style.left = '0';
            page.style.left = '0';
            setTimeout(function () {
                currentPage.remove();
                page.classList.remove('error-page-animating');
                currentPage.classList.remove('error-page-animating');
                _this.navigating = false;
            }, 500);
        });
    };
    DefaultLoggerUINotifierAppenderHandler.prototype.populateErrorLogData = function () {
        this.errorLogData = __WEBPACK_IMPORTED_MODULE_2__logger_storage_appender__["a" /* LoggerStorageAppender */].appenders.get('default').stringDump();
    };
    DefaultLoggerUINotifierAppenderHandler.prototype.getErrorHeaderData = function () {
        return {
            'time': new Date().toISOString(),
            'userAgent': navigator.userAgent,
            'platform': navigator.platform,
            'version': __WEBPACK_IMPORTED_MODULE_0__app_build_info__["a" /* BuildInfo */].version,
            //            'devicePlatform' : Device && Device.platform ? Device.platform : 'undefined',
            //            'deviceModel' : Device && Device.model ? Device.model : 'undefined',
            //            'deviceVersion' : Device && Device.version ? Device.version : 'undefined',
            //            'deviceNative' : Device && Device.cordova ? Device.cordova : 'undefined',
            'contactInfo': 'true' === localStorage.getItem('error-do-not-contact') ? 'Do Not Contact' : localStorage.getItem('error-contact-info')
        };
    };
    DefaultLoggerUINotifierAppenderHandler.prototype.getErrorReportData = function () {
        var data = '';
        var headerData = this.getErrorHeaderData();
        Object.keys(headerData).forEach(function (key) { data += key + ':' + headerData[key] + '\n'; });
        data += '\n' + this.errorLogData;
        return data;
    };
    DefaultLoggerUINotifierAppenderHandler.prototype.submitErrorReportData = function () {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function (ev) {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    _this.goToPage(_this.errorSentPage);
                }
                else {
                    _this.goToPage(_this.errorErrorPage);
                    var errorReportData = _this.getErrorReportData();
                    if (errorReportData.length > 20000)
                        errorReportData = errorReportData.substr(0, 20000);
                    document.getElementById('error-email-button').href += encodeURIComponent(errorReportData.split('\n').join('\\n'));
                }
            }
        };
        xmlhttp.onerror = function (ev) {
            _this.goToPage(_this.errorErrorPage);
            var errorReportData = _this.getErrorReportData();
            if (errorReportData.length > 20000)
                errorReportData = errorReportData.substr(0, 20000);
            document.getElementById('error-email-button').href += encodeURIComponent(errorReportData.split('\n').join('\\n'));
        };
        xmlhttp.open('POST', 'https://api.freebudgetapp.com/submiterror');
        xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        var data = this.getErrorHeaderData();
        data['log'] = this.errorLogData;
        xmlhttp.send(JSON.stringify(data));
    };
    return DefaultLoggerUINotifierAppenderHandler;
}());
var LoggerUINotifierAppender = (function () {
    function LoggerUINotifierAppender() {
        this.defaultHandler = new DefaultLoggerUINotifierAppenderHandler();
        LoggerUINotifierAppender.instance = this;
    }
    Object.defineProperty(LoggerUINotifierAppender.prototype, "handler", {
        get: function () {
            return this._handler || this.defaultHandler;
        },
        set: function (value) {
            this._handler = value;
        },
        enumerable: true,
        configurable: true
    });
    LoggerUINotifierAppender.prototype.log = function (level, data) {
        if (level !== __WEBPACK_IMPORTED_MODULE_1__logger__["a" /* Logger */].ERROR)
            return;
        var message = data.length > 0 ? __WEBPACK_IMPORTED_MODULE_1__logger__["a" /* Logger */].stringValue(data[0]) : 'Log';
        if (this.handler) {
            try {
                this.handler.handle(message);
            }
            catch (e) {
                this.defaultHandler.handle(message);
            }
        }
        else {
            this.defaultHandler.handle(message);
        }
    };
    LoggerUINotifierAppender.instance = new LoggerUINotifierAppender();
    return LoggerUINotifierAppender;
}());

//# sourceMappingURL=logger-ui-notifier-appender.js.map

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuildInfo; });
var BuildInfo = (function () {
    function BuildInfo() {
    }
    BuildInfo.version = '0.0.137';
    BuildInfo.buildDateYYYYMMDD = '2018-01-04';
    return BuildInfo;
}());

//# sourceMappingURL=build-info.js.map

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export BankLinkLocalInfo */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BankLinkLocal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__db_persistence_provider_manager__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BankLinkLocalInfo = (function () {
    function BankLinkLocalInfo() {
    }
    return BankLinkLocalInfo;
}());

var BankLinkLocal = (function () {
    function BankLinkLocal(persistenceProvider) {
        this.persistence = persistenceProvider.provide();
    }
    BankLinkLocal.prototype.getInfo = function (bankLinkUuid) {
        var infoString = this.persistence.keyStore('bl_' + bankLinkUuid, 'info');
        if (infoString == null)
            return new BankLinkLocalInfo();
        return JSON.parse(infoString);
    };
    BankLinkLocal.prototype.saveInfo = function (bankLinkUuid, info) {
        if (info.errorCount > 0 || info.cancelledCount > 1)
            info.pauseAutoSync = true; // TODO: Notify / make this configurable
        else
            info.pauseAutoSync = false;
        this.persistence.keyStore('bl_' + bankLinkUuid, 'info', JSON.stringify(info));
    };
    BankLinkLocal.prototype.updateInfo = function (bankLinkUuid, fun) {
        var info = this.getInfo(bankLinkUuid);
        fun(info);
        this.saveInfo(bankLinkUuid, info);
    };
    BankLinkLocal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__db_persistence_provider_manager__["a" /* PersistenceProviderManager */]])
    ], BankLinkLocal);
    return BankLinkLocal;
}());

//# sourceMappingURL=bank-link-local.js.map

/***/ }),
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddBudgetModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_autofocus__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddBudgetModal = (function () {
    function AddBudgetModal(viewCtrl, navParams, autofocus) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.autofocus = autofocus;
        this.viewCtrl = viewCtrl;
        if (navParams.data && navParams.data.budgetName) {
            this.editing = true;
            this.budgetName = navParams.data.budgetName;
        }
        else {
            this.editing = false;
        }
    }
    AddBudgetModal.prototype.submit = function (event) {
        this.viewCtrl.dismiss({ 'budgetName': this.budgetName });
        event.preventDefault();
    };
    AddBudgetModal.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    AddBudgetModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\modals\add-budget\add-budget.html"*/'<ion-header>\n\n  <ion-toolbar>\n\n    <ion-buttons start>\n\n      <button ion-button (click)="cancel()">Cancel</button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>Add Budget</ion-title>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button id="add-budget-create" (click)="submit($event)" [disabled]="!form.valid">{{editing ? "Save" : "Create"}}</button>\n\n    </ion-buttons>\n\n\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content responsive-padding>\n\n\n\n    <form #form="ngForm" (submit)="submit($event)">\n\n        <ion-item>\n\n            <ion-label>Budget Name</ion-label>\n\n            <ion-input type="text" id="add-budget-budget-name" [(ngModel)]="budgetName" name="budgetName" [attr.autofocus]="autofocus.enabled" required></ion-input>\n\n        </ion-item>\n\n    </form>\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\modals\add-budget\add-budget.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_autofocus__["a" /* Autofocus */]])
    ], AddBudgetModal);
    return AddBudgetModal;
}());

//# sourceMappingURL=add-budget.js.map

/***/ }),
/* 137 */,
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEditCategoryModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_records_category__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_transactions_init_category_transaction__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddEditCategoryModal = (function () {
    function AddEditCategoryModal(viewCtrl, navParams, dbms, nav, alertController, appController) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.dbms = dbms;
        this.nav = nav;
        this.alertController = alertController;
        this.appController = appController;
        this.viewCtrl = viewCtrl;
        this.nav = nav;
        this.budget = dbms.getDb(navParams.data.budgetId);
        if (navParams.data.categoryId) {
            this.editing = true;
            this.category = this.budget.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_1__data_records_category__["a" /* Category */]).by('id', navParams.data.categoryId);
            this.categoryName = this.category.name;
            this.transaction = this.budget.transactionProcessor.findTransactionsForRecord(this.category, __WEBPACK_IMPORTED_MODULE_3__data_transactions_init_category_transaction__["a" /* InitCategoryTransaction */])[0];
        }
        else {
            this.editing = false;
        }
    }
    AddEditCategoryModal.prototype.submit = function (event) {
        event.preventDefault();
        var t;
        if (!this.editing) {
            t = new __WEBPACK_IMPORTED_MODULE_3__data_transactions_init_category_transaction__["a" /* InitCategoryTransaction */]();
        }
        else {
            t = this.transaction;
        }
        t.categoryName = this.categoryName;
        this.budget.applyTransaction(t);
        this.viewCtrl.dismiss();
    };
    AddEditCategoryModal.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    AddEditCategoryModal.prototype.deleteCategoryConfirm = function () {
        var _this = this;
        var confirm = this.alertController.create({
            title: 'Delete?',
            message: 'Are you sure you want to delete this category and everything in it?',
            buttons: [
                {
                    text: 'Cancel'
                }, {
                    text: 'Delete',
                    role: 'destructive',
                    handler: function () {
                        confirm.dismiss().then(function () {
                            _this.deleteCategory();
                        });
                        return false;
                    }
                }
            ]
        });
        confirm.present();
    };
    AddEditCategoryModal.prototype.deleteCategory = function () {
        this.budget.deleteTransaction(this.transaction);
        this.appController.getRootNav().pop({ animate: false, duration: 0 });
        this.viewCtrl.dismiss();
    };
    AddEditCategoryModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\modals\add-edit-category\add-edit-category.html"*/'<ion-header>\n\n    <ion-toolbar>\n\n    <ion-buttons start>\n\n        <button ion-button (click)="cancel()">Cancel</button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>{{editing ? "Edit" : "Add"}} Category</ion-title>\n\n\n\n    <ion-buttons end>\n\n        <button ion-button (click)="submit($event)" [disabled]="!form.valid">{{editing ? "Save" : "Create"}}</button>\n\n    </ion-buttons>\n\n\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n    <div responsive-padding>\n\n        <form #form="ngForm" (submit)="submit($event)">\n\n            <ion-item>\n\n                <ion-label>Category Name</ion-label>\n\n                <ion-input type="text" name="categoryName" [(ngModel)]="categoryName" [attr.autofocus]="editing ? null : true" required></ion-input>\n\n            </ion-item>\n\n        </form>\n\n    </div>\n\n    <button ion-button *ngIf="editing" color="danger" clear small (click)="deleteCategoryConfirm()">Delete</button>\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\modals\add-edit-category\add-edit-category.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* App */]])
    ], AddEditCategoryModal);
    return AddEditCategoryModal;
}());

//# sourceMappingURL=add-edit-category.js.map

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditorProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ModalProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logger__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EditorProvider = (function () {
    function EditorProvider(modalController) {
        this.modalController = modalController;
        this.logger = __WEBPACK_IMPORTED_MODULE_2__logger__["a" /* Logger */].get('EditorProvider');
        this.modalProviders = [];
    }
    EditorProvider.prototype.registerModalProvider = function (provider) {
        this.modalProviders.unshift(provider);
    };
    EditorProvider.prototype.getModal = function (params, data) {
        for (var i = 0; i < this.modalProviders.length; i++) {
            var modalClass = this.modalProviders[i].provide(params);
            if (modalClass)
                return this.modalController.create(modalClass, data);
        }
        this.logger.error({ msg: 'No modal provider found', params: params });
        throw new Error('No modal provider for ' + params);
    };
    EditorProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], EditorProvider);
    return EditorProvider;
}());

var ModalProvider = (function () {
    function ModalProvider() {
    }
    return ModalProvider;
}());

//# sourceMappingURL=editor-provider.js.map

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEditTransactionModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_records_category__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_records_transaction__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_transactions_init_simple_transaction__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_big_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AddEditTransactionModal = (function () {
    function AddEditTransactionModal(configuration, viewCtrl, navParams, dbms, nav, alertController) {
        this.configuration = configuration;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.dbms = dbms;
        this.nav = nav;
        this.alertController = alertController;
        this.data = { expense: true };
        this.viewCtrl = viewCtrl;
        this.nav = nav;
        this.budget = dbms.getDb(navParams.data.budgetId);
        this.category = this.budget.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_1__data_records_category__["a" /* Category */]).by('id', navParams.data.categoryId);
        if (navParams.data.transactionId) {
            this.editing = true;
            var transactionRecord = this.budget.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_2__data_records_transaction__["a" /* Transaction */]).by('id', navParams.data.transactionId);
            this.transaction = this.budget.transactionProcessor.findTransactionsForRecord(transactionRecord, __WEBPACK_IMPORTED_MODULE_4__data_transactions_init_simple_transaction__["a" /* InitSimpleTransaction */])[0];
            this.data.date = __WEBPACK_IMPORTED_MODULE_7__services_utils__["a" /* Utils */].toIonicFromYYYYMMDD(this.transaction.date);
            if (this.transaction.amount.cmp(Object(__WEBPACK_IMPORTED_MODULE_8_big_js__["Big"])(0)) < 0) {
                this.data.expense = false;
                this.data.amount = this.transaction.amount.times(-1).toString();
            }
            else {
                this.data.amount = this.transaction.amount.toString();
            }
            this.data.description = this.transaction.description;
        }
        else {
            this.editing = false;
            this.data.date = __WEBPACK_IMPORTED_MODULE_7__services_utils__["a" /* Utils */].nowIonic();
        }
    }
    AddEditTransactionModal.prototype.submit = function (event) {
        event.preventDefault();
        var t;
        if (!this.editing) {
            t = new __WEBPACK_IMPORTED_MODULE_4__data_transactions_init_simple_transaction__["a" /* InitSimpleTransaction */]();
        }
        else {
            t = this.transaction;
        }
        t.amount = new __WEBPACK_IMPORTED_MODULE_8_big_js__["Big"]((this.data.amount).replace(',', ''));
        if (!this.data.expense) {
            t.amount = t.amount.times(-1);
        }
        t.date = __WEBPACK_IMPORTED_MODULE_7__services_utils__["a" /* Utils */].toYYYYMMDDFromIonic(this.data.date);
        t.description = this.data.description;
        t.categoryId = this.category.id;
        this.budget.applyTransaction(t);
        this.viewCtrl.dismiss();
    };
    AddEditTransactionModal.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    AddEditTransactionModal.prototype.deleteTransactionConfirm = function () {
        var _this = this;
        var confirm = this.alertController.create({
            title: 'Delete?',
            message: 'Are you sure you want to delete this transaction?',
            buttons: [
                {
                    text: 'Cancel'
                }, {
                    text: 'Delete',
                    role: 'destructive',
                    handler: function () {
                        confirm.dismiss().then(function () {
                            _this.deleteTransaction();
                        });
                        return false;
                    }
                }
            ]
        });
        confirm.present();
    };
    AddEditTransactionModal.prototype.deleteTransaction = function () {
        this.budget.deleteTransaction(this.transaction);
        this.viewCtrl.dismiss();
    };
    AddEditTransactionModal.prototype.toggleExpense = function () {
        this.data.expense = !this.data.expense;
    };
    AddEditTransactionModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\modals\add-edit-transaction\add-edit-transaction.html"*/'<ion-header>\n\n    <ion-toolbar>\n\n    <ion-buttons start>\n\n        <button ion-button (click)="cancel()">Cancel</button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>{{category.name}}</ion-title>\n\n\n\n    <ion-buttons end>\n\n        <button ion-button (click)="submit($event)" [disabled]="!form.valid">{{editing ? "Save" : "Create"}}</button>\n\n    </ion-buttons>\n\n\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n    <div responsive-padding>\n\n        <form (submit)="submit($event)" novalidate #form="ngForm">\n\n            <ion-item-group>\n\n                <ion-item>\n\n                    <ion-segment name="expense" [(ngModel)]="data.expense">\n\n                        <ion-segment-button [value]="true" (mousedown)="$event.preventDefault()">Expense</ion-segment-button>\n\n                        <ion-segment-button [value]="false" (mousedown)="$event.preventDefault()">Income</ion-segment-button>\n\n                    </ion-segment>\n\n                </ion-item>\n\n            </ion-item-group>\n\n            <ion-item>\n\n                <ion-label>Amount</ion-label>\n\n                <ion-input currency-field required name="amount" [(ngModel)]="data.amount" [attr.autofocus]="editing ? null : true"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Description</ion-label>\n\n                <ion-input required type="text" [(ngModel)]="data.description" name="description"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Date</ion-label>\n\n                <ion-datetime name="date" [(ngModel)]="data.date" displayFormat="MMM D, YYYY" pickerFormat="MMM D YYYY"></ion-datetime>\n\n            </ion-item>\n\n        </form>\n\n    </div>\n\n    <button ion-button type="button" *ngIf="editing" color="danger" clear small (click)="deleteTransactionConfirm()">Delete</button>\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\modals\add-edit-transaction\add-edit-transaction.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */]])
    ], AddEditTransactionModal);
    return AddEditTransactionModal;
}());

//# sourceMappingURL=add-edit-transaction.js.map

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEditSplitTransferModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_records_category__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_records_transaction__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_transactions_create_split_transfer__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_big_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__add_edit_split_transfer_line__ = __webpack_require__(378);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AddEditSplitTransferModal = (function () {
    function AddEditSplitTransferModal(configuration, modalController, viewCtrl, navParams, engineFactory, nav, alertController) {
        var _this = this;
        this.configuration = configuration;
        this.modalController = modalController;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.engineFactory = engineFactory;
        this.nav = nav;
        this.alertController = alertController;
        this.engine = engineFactory.getEngineById(navParams.data.budgetId);
        this.engine.getCategory(navParams.data.categoryId);
        this.category = this.engine.db.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_1__data_records_category__["a" /* Category */]).by('id', navParams.data.categoryId);
        this.categories = this.engine.getCategories('alphabetical');
        // TODO: Validation that amounts must be equal
        this.data = {};
        this.data.lines = [];
        if (navParams.data.transactionId) {
            this.editing = true;
            var transactionRecord = this.engine.db.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_2__data_records_transaction__["a" /* Transaction */]).by('id', navParams.data.transactionId);
            this.transaction = this.engine.db.transactionProcessor.findTransactionsForRecord(transactionRecord, __WEBPACK_IMPORTED_MODULE_4__data_transactions_create_split_transfer__["a" /* CreateSplitTransfer */])[0];
            this.data.date = __WEBPACK_IMPORTED_MODULE_7__services_utils__["a" /* Utils */].toIonicFromYYYYMMDD(this.transaction.date);
            this.data.out = this.transaction.amounts[0].amount.cmp(Object(__WEBPACK_IMPORTED_MODULE_8_big_js__["Big"])(0)) >= 0;
            this.data.accountId = this.transaction.accountId;
            this.data.accountId2 = this.transaction.accountId2;
            this.data.amount = this.totalAmount().toString();
            this.data.description = this.transaction.description;
            this.data.categoryId = this.transaction.categoryId;
            this.transaction.amounts.forEach(function (l) {
                _this.data.lines.push({ categoryId: l.categoryId, amount: l.amount.times(_this.data.out ? 1 : -1) + "" });
            });
        }
        else {
            this.editing = false;
            this.data.out = true;
            this.data.date = __WEBPACK_IMPORTED_MODULE_7__services_utils__["a" /* Utils */].nowIonic();
            this.data.lines.push({
                categoryId: this.category.id,
                amount: ''
            });
        }
    }
    AddEditSplitTransferModal.prototype.editLine = function (line) {
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_9__add_edit_split_transfer_line__["a" /* AddEditSplitTransferLineModal */], {
            parent: this,
            lineIndex: this.data.lines.indexOf(line)
        }, { showBackdrop: false, enableBackdropDismiss: false });
        modal.present();
    };
    AddEditSplitTransferModal.prototype.totalAmount = function () {
        return this.data.lines.map(function (line) { return line.amount; }).reduce(function (total, amount) { return new __WEBPACK_IMPORTED_MODULE_8_big_js__["Big"]((amount || '0').replace(',', '')).plus(total); }, new __WEBPACK_IMPORTED_MODULE_8_big_js__["Big"]('0')).abs();
    };
    AddEditSplitTransferModal.prototype.amountRemaining = function () {
        return new __WEBPACK_IMPORTED_MODULE_8_big_js__["Big"]((this.data.amount || '0').replace(',', '')).minus(this.totalAmount());
    };
    AddEditSplitTransferModal.prototype.newLine = function () {
        this.data.lines.push({
            categoryId: null,
            amount: ''
        });
        this.editLine(this.data.lines[this.data.lines.length - 1]);
    };
    AddEditSplitTransferModal.prototype.submit = function (event) {
        var _this = this;
        event.preventDefault();
        var t;
        if (!this.editing) {
            t = new __WEBPACK_IMPORTED_MODULE_4__data_transactions_create_split_transfer__["a" /* CreateSplitTransfer */]();
        }
        else {
            t = this.transaction;
        }
        t.date = __WEBPACK_IMPORTED_MODULE_7__services_utils__["a" /* Utils */].toYYYYMMDDFromIonic(this.data.date);
        t.description = this.data.description;
        t.accountId = Number(this.data.accountId);
        t.accountId2 = Number(this.data.accountId2);
        t.categoryId = Number(this.data.categoryId);
        // Always clear out the records in the transaction and not "merge" them
        // Our indexes should be preserved...
        t.amounts = [];
        this.data.lines.forEach(function (line) {
            t.amounts.push({
                categoryId: line.categoryId,
                amount: new __WEBPACK_IMPORTED_MODULE_8_big_js__["Big"]((line.amount || '0').replace(',', '')).times(_this.data.out ? 1 : -1),
            });
        });
        this.engine.db.applyTransaction(t);
        this.viewCtrl.dismiss();
    };
    AddEditSplitTransferModal.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    AddEditSplitTransferModal.prototype.deleteTransactionConfirm = function () {
        var _this = this;
        var confirm = this.alertController.create({
            title: 'Delete?',
            message: 'Are you sure you want to delete this entire transaction?',
            buttons: [
                {
                    text: 'Cancel'
                }, {
                    text: 'Delete',
                    role: 'destructive',
                    handler: function () {
                        confirm.dismiss().then(function () {
                            _this.deleteTransaction();
                        });
                        return false;
                    }
                }
            ]
        });
        confirm.present();
    };
    AddEditSplitTransferModal.prototype.deleteTransaction = function () {
        this.engine.db.deleteTransaction(this.transaction);
        this.viewCtrl.dismiss();
    };
    AddEditSplitTransferModal.prototype.toggleOut = function () {
        this.data.out = !this.data.out;
    };
    AddEditSplitTransferModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\modals\add-edit-split-transfer\add-edit-split-transfer.html"*/'<ion-header>\n\n    <ion-toolbar>\n\n    <ion-buttons start>\n\n        <button ion-button (click)="cancel()">Cancel</button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>{{category.name}}</ion-title>\n\n\n\n    <ion-buttons end>\n\n        <button ion-button (click)="submit($event)" [disabled]="!form.valid">{{editing ? "Save" : "Create"}}</button>\n\n    </ion-buttons>\n\n\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n    <div responsive-padding>\n\n        <form (submit)="submit($event)" novalidate #form="ngForm">\n\n            <ion-item-group>\n\n                <ion-item>\n\n                    <ion-segment name="out" [(ngModel)]="data.out">\n\n                        <ion-segment-button [value]="true" (mousedown)="$event.preventDefault()">Out</ion-segment-button>\n\n                        <ion-segment-button [value]="false" (mousedown)="$event.preventDefault()">In</ion-segment-button>\n\n                    </ion-segment>\n\n                </ion-item>\n\n            </ion-item-group>\n\n            <ion-item *ngIf="configuration.optionBooleanAccessor(\'experimental.accounts.enabled\').value && engine.getAccounts().length > 0">\n\n                <ion-label>Account</ion-label>\n\n                <ion-select required name="account" [(ngModel)]="data.accountId">\n\n                    <ion-option *ngFor="let account of engine.getAccounts()" value="{{account.id}}">{{account.name}}</ion-option>    \n\n                </ion-select>\n\n            </ion-item>\n\n            <ion-item *ngIf="configuration.optionBooleanAccessor(\'experimental.accounts.enabled\').value && engine.getAccounts().length > 0">\n\n                <ion-label>To Account</ion-label>\n\n                <ion-select name="account2" [(ngModel)]="data.accountId2">\n\n                    <ion-option *ngFor="let account of engine.getAccounts()" value="{{account.id}}">{{account.name}}</ion-option>    \n\n                </ion-select>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Amount</ion-label>\n\n                <ion-input currency-field required name="amount" [(ngModel)]="data.amount" [attr.autofocus]="editing ? null : true"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>From</ion-label>\n\n                <ion-select required name="category" [(ngModel)]="data.categoryId">\n\n                    <ion-option *ngFor="let c of categories" value="{{c.id}}">{{c.name}}</ion-option>    \n\n                </ion-select>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Description</ion-label>\n\n                <ion-input required type="text" [(ngModel)]="data.description" name="description"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Date</ion-label>\n\n                <ion-datetime name="date" [(ngModel)]="data.date" displayFormat="MMM D, YYYY" pickerFormat="MMM D YYYY"></ion-datetime>\n\n            </ion-item>\n\n            <ion-list-header>\n\n                Allocation\n\n            </ion-list-header>\n\n            <ng-container *ngFor="let line of data.lines"><button ion-item type="button" *ngIf="line.categoryId" (click)="editLine(line)">\n\n                <ion-label>{{engine.getCategory(line.categoryId)?.name}}</ion-label>\n\n                <div item-right>{{line.amount}}</div>\n\n            </button></ng-container>\n\n            <button ion-item type="button" (click)="newLine()">\n\n                <ion-label>Add Another Category</ion-label>\n\n                <div item-right>{{amountRemaining()}}</div>\n\n            </button>\n\n        </form>\n\n    </div>\n\n    <button ion-button type="button" *ngIf="editing" color="danger" clear small (click)="deleteTransactionConfirm()">Delete</button>\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\modals\add-edit-split-transfer\add-edit-split-transfer.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__["a" /* EngineFactory */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */]])
    ], AddEditSplitTransferModal);
    return AddEditSplitTransferModal;
}());

//# sourceMappingURL=add-edit-split-transfer.js.map

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEditTransferModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_records_transaction__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_transactions_init_category_transfer_transaction__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_big_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AddEditTransferModal = (function () {
    function AddEditTransferModal(viewCtrl, navParams, dbms, engineFactory, nav, alertController) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.dbms = dbms;
        this.engineFactory = engineFactory;
        this.nav = nav;
        this.alertController = alertController;
        this.data = {};
        this.engine = engineFactory.getEngineById(navParams.data.budgetId);
        this.budget = this.engine.db;
        this.categories = this.engine.getCategories('alphabetical');
        if (navParams.data.transactionId) {
            this.editing = true;
            var transactionRecord = this.budget.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_1__data_records_transaction__["a" /* Transaction */]).by('id', navParams.data.transactionId);
            this.transfer = this.budget.transactionProcessor.findAllTransactionsForRecord(transactionRecord)[0];
            this.data.date = __WEBPACK_IMPORTED_MODULE_6__services_utils__["a" /* Utils */].toIonicFromYYYYMMDD(this.transfer.date);
            this.data.amount = this.transfer.amount + '';
            this.data.description = this.transfer.description;
            this.data.categoryFrom = this.transfer.fromCategoryId;
            this.data.categoryTo = this.transfer.toCategoryId;
        }
        else {
            this.editing = false;
            this.transfer = new __WEBPACK_IMPORTED_MODULE_4__data_transactions_init_category_transfer_transaction__["a" /* InitCategoryTransferTransaction */]();
            this.data.categoryFrom = navParams.data.fromCategoryId;
            this.data.date = __WEBPACK_IMPORTED_MODULE_6__services_utils__["a" /* Utils */].nowIonic();
        }
    }
    AddEditTransferModal.prototype.submit = function (event) {
        event.preventDefault();
        this.transfer.amount = new __WEBPACK_IMPORTED_MODULE_7_big_js__["Big"](this.data.amount);
        this.transfer.date = __WEBPACK_IMPORTED_MODULE_6__services_utils__["a" /* Utils */].toYYYYMMDDFromIonic(this.data.date);
        this.transfer.description = this.data.description;
        this.transfer.fromCategoryId = +this.data.categoryFrom;
        this.transfer.toCategoryId = +this.data.categoryTo;
        this.budget.applyTransaction(this.transfer);
        this.viewCtrl.dismiss();
    };
    AddEditTransferModal.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    AddEditTransferModal.prototype.deleteTransactionConfirm = function () {
        var _this = this;
        var confirm = this.alertController.create({
            title: 'Delete?',
            message: 'Are you sure you want to delete this transaction?',
            buttons: [
                {
                    text: 'Cancel'
                }, {
                    text: 'Delete',
                    role: 'destructive',
                    handler: function () {
                        confirm.dismiss().then(function () {
                            _this.deleteTransaction();
                        });
                        return false;
                    }
                }
            ]
        });
        confirm.present();
    };
    AddEditTransferModal.prototype.deleteTransaction = function () {
        this.budget.deleteTransaction(this.transfer);
        this.viewCtrl.dismiss();
    };
    AddEditTransferModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\modals\add-edit-transfer\add-edit-transfer.html"*/'<ion-header>\n\n    <ion-toolbar>\n\n    <ion-buttons start>\n\n        <button ion-button (click)="cancel()">Cancel</button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>Transfer</ion-title>\n\n\n\n    <ion-buttons end>\n\n        <button ion-button (click)="submit($event)" [disabled]="!form.valid">{{editing ? "Save" : "Create"}}</button>\n\n    </ion-buttons>\n\n\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n    <div responsive-padding>\n\n        <form #form="ngForm" (submit)="submit($event)">\n\n            <ion-item>\n\n                <ion-label>Amount</ion-label>\n\n                <ion-input currency-field required name="amount" [(ngModel)]="data.amount" [attr.autofocus]="editing ? null : true"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>From</ion-label>\n\n                <ion-select required name="categoryFrom" [(ngModel)]="data.categoryFrom">\n\n                    <ion-option *ngFor="let c of categories" value="{{c.id}}">{{c.name}}</ion-option>    \n\n                </ion-select>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>To</ion-label>\n\n                <ion-select required name="categoryTo" [(ngModel)]="data.categoryTo">\n\n                    <ion-option *ngFor="let c of categories" value="{{c.id}}">{{c.name}}</ion-option>    \n\n                </ion-select>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Optional Note</ion-label>\n\n                <ion-input type="text" name="description" [(ngModel)]="data.description"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Date</ion-label>\n\n                <ion-datetime displayFormat="MMM D, YYYY" pickerFormat="MMM D YYYY" name="date" [(ngModel)]="data.date"></ion-datetime>\n\n            </ion-item>\n\n        </form>\n\n    </div>\n\n    <button ion-button *ngIf="editing" color="danger" clear small (click)="deleteTransactionConfirm()">Delete</button>\n\n\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\modals\add-edit-transfer\add-edit-transfer.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__["a" /* EngineFactory */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */]])
    ], AddEditTransferModal);
    return AddEditTransferModal;
}());

//# sourceMappingURL=add-edit-transfer.js.map

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemoSetup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_budget_budget__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_dev_dev__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__db_persistence_provider_manager__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__db_no_persistence_provider__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_transactions_init_budget_transaction__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__db_transaction_serializer__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var DemoSetup = (function () {
    function DemoSetup(ionicApp, dbms, persistenceProviderManager, transactionSerializer) {
        this.ionicApp = ionicApp;
        this.dbms = dbms;
        this.persistenceProviderManager = persistenceProviderManager;
        this.transactionSerializer = transactionSerializer;
        this.vars = {};
        this.classMap = {
            budget: __WEBPACK_IMPORTED_MODULE_2__pages_budget_budget__["a" /* BudgetPage */],
            dev: __WEBPACK_IMPORTED_MODULE_3__pages_dev_dev__["a" /* DevPage */]
        };
    }
    DemoSetup.prototype.setup = function (script) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.script = script;
                        this.currentLine = 0;
                        this.nav = this.ionicApp.getActiveNavs()[0];
                        return [4 /*yield*/, this.executeScript()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.fadeIn()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DemoSetup.prototype.executeScript = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var line, _a, result, db, t, transaction;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.currentLine >= this.script.length)
                            return [2 /*return*/];
                        line = this.script[this.currentLine].slice();
                        this.currentLine++;
                        Object.keys(this.vars).forEach(function (key) {
                            for (var i = 1; i < line.length; i++) {
                                line[i] = JSON.parse(JSON.stringify(line[i]).replace('${' + key + '}', _this.vars[key]));
                            }
                        });
                        _a = line[0];
                        switch (_a) {
                            case 'eval': return [3 /*break*/, 1];
                            case 'nav': return [3 /*break*/, 4];
                            case 'root': return [3 /*break*/, 6];
                            case 'create-db': return [3 /*break*/, 8];
                            case 'transaction': return [3 /*break*/, 10];
                            case 'import-db': return [3 /*break*/, 11];
                        }
                        return [3 /*break*/, 12];
                    case 1:
                        result = eval('(' + line[1] + ')');
                        if (!(result instanceof Promise)) return [3 /*break*/, 3];
                        return [4 /*yield*/, result.then()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [3 /*break*/, 13];
                    case 4: 
                    // TODO: How to get ID of budget / category, etc ?
                    /* Maybe a get/set variable and then can inject those into the scripts using some find/replace, like ${variableName}
                    Some command can implicitly set a variable
                    Or have query commands to get a budget / category by name, etc ?
        
                    */
                    return [4 /*yield*/, this.nav.push(this.classMap[line[1]], line.length > 2 ? line[2] : undefined, { animate: false })];
                    case 5:
                        // TODO: How to get ID of budget / category, etc ?
                        /* Maybe a get/set variable and then can inject those into the scripts using some find/replace, like ${variableName}
                        Some command can implicitly set a variable
                        Or have query commands to get a budget / category by name, etc ?
            
                        */
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 6: return [4 /*yield*/, this.nav.setRoot(this.classMap[line[1]], line.length > 2 ? line[2] : undefined, { animate: false })];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 8: return [4 /*yield*/, this.dbms.createDb()];
                    case 9:
                        db = _b.sent();
                        this.vars['current-db-id'] = db.id;
                        t = new __WEBPACK_IMPORTED_MODULE_7__data_transactions_init_budget_transaction__["a" /* InitBudgetTransaction */]();
                        t.budgetName = line[1];
                        db.applyTransaction(t);
                        return [3 /*break*/, 13];
                    case 10:
                        transaction = this.transactionSerializer.newTransaction(line[1], line[2]);
                        this.dbms.getDb(this.vars['current-db-id']).applyTransaction(transaction);
                        return [3 /*break*/, 13];
                    case 11: 
                    // TODO: Import a whole database json so we can just use a pre setup database ? - Maybe base this off an "export / clone" database command so we don't have to make the database Ids portable
                    return [3 /*break*/, 13];
                    case 12: throw new Error("Invalid Setup Command " + line[0]);
                    case 13: return [2 /*return*/, this.executeScript()];
                }
            });
        });
    };
    DemoSetup.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var persistenceProvider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fadeOut()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.nav.popToRoot({ animate: false })];
                    case 2:
                        _a.sent();
                        persistenceProvider = this.persistenceProviderManager.provide();
                        if (!(persistenceProvider instanceof __WEBPACK_IMPORTED_MODULE_6__db_no_persistence_provider__["a" /* NoPersistenceProvider */])) return [3 /*break*/, 4];
                        persistenceProvider.reset();
                        return [4 /*yield*/, this.dbms.init()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        //Close any modals
                        this.vars = {};
                        return [2 /*return*/];
                }
            });
        });
    };
    DemoSetup.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clear()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.setup(this.script)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DemoSetup.prototype.fadeOut = function (instant) {
        if (instant === void 0) { instant = false; }
        return __awaiter(this, void 0, void 0, function () {
            var ele_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!document.getElementById('demo-blank')) return [3 /*break*/, 1];
                        document.getElementById('demo-blank').className = 'active';
                        return [3 /*break*/, 5];
                    case 1:
                        ele_1 = document.createElement('div');
                        ele_1.id = 'demo-blank';
                        document.body.appendChild(ele_1);
                        if (!instant) return [3 /*break*/, 2];
                        ele_1.className = 'active';
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(function () { ele_1.className = 'active'; resolve(); }); })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DemoSetup.prototype.fadeIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ele;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!document.getElementById('demo-blank'))
                            return [2 /*return*/];
                        ele = document.getElementById('demo-blank');
                        ele.className = '';
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 1:
                        _a.sent();
                        ele.remove();
                        return [2 /*return*/];
                }
            });
        });
    };
    DemoSetup = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_5__db_persistence_provider_manager__["a" /* PersistenceProviderManager */], __WEBPACK_IMPORTED_MODULE_8__db_transaction_serializer__["a" /* TransactionSerializer */]])
    ], DemoSetup);
    return DemoSetup;
}());

//# sourceMappingURL=demo-setup.js.map

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DevPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_notifications__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_logger_ui_notifier_appender__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_cronstrue__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_cronstrue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_cronstrue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__demo_demo_ui__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__demo_demo_player__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_utils__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var DevPage = (function () {
    function DevPage(nav, dbms, configuration, notifications, inAppBrowser) {
        this.nav = nav;
        this.dbms = dbms;
        this.configuration = configuration;
        this.notifications = notifications;
        this.inAppBrowser = inAppBrowser;
        this.testamount1 = 'hi there';
        this.testamount3 = 'ASD';
    }
    Object.defineProperty(DevPage.prototype, "testamount2", {
        get: function () {
            return this._testamount2;
        },
        set: function (value) {
            this._testamount2 = value.toUpperCase();
        },
        enumerable: true,
        configurable: true
    });
    DevPage.prototype.toUpper3 = function (nv) {
        this.testamount3 = nv.toUpperCase();
    };
    DevPage.prototype.ionViewDidEnter = function () {
        this.randomFooterId = 'footer_' + __WEBPACK_IMPORTED_MODULE_11__services_utils__["a" /* Utils */].randomChars(10);
        var div = document.createElement('div');
        div.innerHTML = '<div id="' + this.randomFooterId + '" style="position:fixed; height:100px; z-index:100; background-color:gainsboro; left:0; right:0; bottom:0"><button ion-button small (mousedown)="$event.preventDefault();" (touchtap)="$event.preventDefault();" (click)="testClick()">Test Button :)</button></div>';
        document.querySelector('.app-root').appendChild(div.firstChild);
    };
    DevPage.prototype.ionViewWillLeave = function () {
        document.getElementById(this.randomFooterId).remove();
    };
    DevPage.prototype.testError = function () {
        __WEBPACK_IMPORTED_MODULE_3__services_logger__["a" /* Logger */].get("dev").info({ message: "about to throw an error" }, "And trying a multi part log before it");
        throw new Error('Muahahaha');
    };
    DevPage.prototype.testLogError = function () {
        __WEBPACK_IMPORTED_MODULE_3__services_logger__["a" /* Logger */].get("dev").info({ message: "about to log an error" });
        __WEBPACK_IMPORTED_MODULE_3__services_logger__["a" /* Logger */].get('dev').error("Logging an error");
    };
    DevPage.prototype.testPromiseRejection = function () {
        __WEBPACK_IMPORTED_MODULE_3__services_logger__["a" /* Logger */].get("dev").info("Unhandled Promise Rejection Test");
        new Promise(function (resolve, reject) {
            reject("Simulated Error");
        }).then(function () { __WEBPACK_IMPORTED_MODULE_3__services_logger__["a" /* Logger */].get('dev').info('This should never be logged'); });
    };
    DevPage.prototype.openErrorHandler = function () {
        __WEBPACK_IMPORTED_MODULE_6__services_logger_ui_notifier_appender__["a" /* LoggerUINotifierAppender */].instance.handler.handle('Opening Error Handler');
    };
    DevPage.prototype.launchInAppBrowserTest1 = function () {
        var browser = this.inAppBrowser.create('https://www.google.com', '_blank');
        var subscription = browser.on('loadstop').subscribe(function (ev) {
            var js = 'alert(5 + 7);location.href="http://www.example.com";5 + 7;';
            __WEBPACK_IMPORTED_MODULE_3__services_logger__["a" /* Logger */].get("dev").info("executing js: " + js);
            browser.executeScript({ code: js }).then(function (val) {
                __WEBPACK_IMPORTED_MODULE_3__services_logger__["a" /* Logger */].get("dev").info(val);
                alert(val);
            }).catch(function (err) {
                __WEBPACK_IMPORTED_MODULE_3__services_logger__["a" /* Logger */].get("dev").error(err.message, err);
            });
            subscription.unsubscribe();
        });
    };
    DevPage.prototype.generateNotification = function () {
        this.notifications.show({ message: "Notification at " + Date.now() });
    };
    DevPage.prototype.generateImportantNotification = function () {
        this.notifications.show({ message: "Notification at " + Date.now(), important: true, clickAction: { type: 'custom', data: function () { return alert('click!'); } }, category: 'dev.important' });
    };
    DevPage.prototype.removeImportantNotification = function () {
        this.notifications.remove({ category: 'dev.important' });
    };
    DevPage.prototype.testClick = function () {
        window.alert(':P');
    };
    DevPage.prototype.humanReadableCron = function () {
        try {
            return __WEBPACK_IMPORTED_MODULE_8_cronstrue___default.a.toString(this.cronInput);
        }
        catch (err) {
            return err;
        }
    };
    DevPage.prototype.demoTest = function () {
        var demo = new __WEBPACK_IMPORTED_MODULE_9__demo_demo_ui__["a" /* DemoUI */]();
        setTimeout(function () { return demo.moveTo('#dev-cron-input'); }, 1000);
    };
    DevPage.prototype.demoTest2 = function () {
        var demoRunner = new __WEBPACK_IMPORTED_MODULE_9__demo_demo_ui__["a" /* DemoUI */]();
        var demo = new __WEBPACK_IMPORTED_MODULE_10__demo_demo_player__["a" /* DemoPlayer */](demoRunner, undefined);
        // TODO: Compress this (should just be able to call 'click' and it will do a move wait click to the location... Or call it iClick or something ?)
        demo.queue('move', '#dev-generate-notification');
        demo.queue('wait', 300);
        demo.queue('click', '#dev-generate-notification');
        demo.queue('wait', 2000);
        demo.queue('move', '#dev-cron-input');
        demo.queue('wait', 300);
        demo.queue('click', '#dev-cron-input');
        demo.queue('wait', 600);
        demo.queue('type', '#dev-cron-input', '0 * 5 * *');
        demo.queue('wait', 1600);
        demo.run();
    };
    DevPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\pages\dev\dev.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <main-menu-icon></main-menu-icon>\n\n    </button>\n\n    <ion-title>Dev</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>  \n\n\n\n  <ion-item>\n\n  <label>toUpper1</label><input [(ngModel)]="testamount1"/>\n\n  </ion-item>\n\n  <ion-item>\n\n  <h2>{{testamount1}}</h2>\n\n  </ion-item>\n\n  \n\n    <ion-item>\n\n        <cute-progress-bar [value]="50" [of]="100"></cute-progress-bar>\n\n    </ion-item>\n\n  <ion-item>\n\n  <ion-label>toUpper2</ion-label>\n\n  <ion-input [(ngModel)]="testamount2"></ion-input>\n\n  </ion-item>\n\n  <ion-item>\n\n  <h2>{{testamount2}}</h2>\n\n  </ion-item>\n\n  \n\n    <ion-item>\n\n  <ion-label>Price Format</ion-label>\n\n  <ion-input [(ngModel)]="testamount3" pattern="[0-9]*" step="0.01" inputmode="numeric" novalidate></ion-input>\n\n  </ion-item>\n\n  <ion-item>\n\n  <h2>{{testamount3}}</h2>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <button ion-button (click)="testError()">Test Uncaught Error</button>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <button ion-button (click)="testAngularError()">Test Angular Error</button>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <button ion-button (click)="testPromiseRejection()">Test Uncaught Promise Rejection</button>\n\n  </ion-item>\n\n\n\n <ion-item>\n\n    <button ion-button (click)="openErrorHandler()">Open Error Handler Dialog</button>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label>Simulate Sync Error</ion-label>\n\n    <ion-toggle [(ngModel)]="configuration.temporary.simulateSyncError"></ion-toggle>\n\n  </ion-item>\n\n\n\n <ion-item>\n\n    <button ion-button (click)="launchInAppBrowserTest1()">Launch In App Browser Test 1</button>\n\n</ion-item>\n\n\n\n <ion-item>\n\n    <button ion-button id="dev-generate-notification" (click)="generateNotification()">Generate Notification</button>\n\n</ion-item>\n\n<ion-item>\n\n  <button ion-button id="dev-generate-important-notification" (click)="generateImportantNotification()">Generate Important Notification</button>\n\n</ion-item>\n\n<ion-item>\n\n  <button ion-button id="dev-remove-important-notification" (click)="removeImportantNotification()">Remove Important Notification</button>\n\n</ion-item>\n\n\n\n<ion-item>\n\n    <ion-label>Cron Rule</ion-label>\n\n    <ion-input id="dev-cron-input" [(ngModel)]="cronInput"></ion-input>\n\n</ion-item>\n\n\n\n<ion-item>\n\n    Output\n\n    <div item-right>{{humanReadableCron()}}</div>\n\n</ion-item>\n\n\n\n<ion-item>\n\n    Next 5 occurances\n\n    <div item-right>TODO</div>\n\n</ion-item>\n\n\n\n<ion-item>\n\n  <button ion-button (click)="demoTest()">Demo Test</button>\n\n</ion-item>\n\n<ion-item>\n\n  <button ion-button (click)="demoTest2()">Demo Test 2</button>\n\n</ion-item>\n\n\n\n<div style="height:100px"></div>\n\n\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\pages\dev\dev.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_4__services_configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_5__services_notifications__["a" /* Notifications */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], DevPage);
    return DevPage;
}());

//# sourceMappingURL=dev.js.map

/***/ }),
/* 145 */,
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEditAccountModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_records_account__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bank_bank_provider_registry__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_transactions_create_account_transaction__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_big_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__data_transactions_set_account_bank_link__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__bank_provider_interface__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__data_records_bank_link__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var AddEditAccountModal = (function () {
    function AddEditAccountModal(viewCtrl, navParams, dbms, nav, alertController, engineFactory, appController, bankProviderRegistry, configuration) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.dbms = dbms;
        this.nav = nav;
        this.alertController = alertController;
        this.engineFactory = engineFactory;
        this.appController = appController;
        this.bankProviderRegistry = bankProviderRegistry;
        this.configuration = configuration;
        this.emptyProviderSchema = new __WEBPACK_IMPORTED_MODULE_10__bank_provider_interface__["c" /* ProviderSchema */]();
        this.db = dbms.getDb(navParams.data.budgetId);
        this.engine = engineFactory.getEngineById(this.db.id);
        this.data = {};
        this.data.bankLinkConfiguration = {};
        if (navParams.data.accountId) {
            this.editing = true;
            var account = this.engine.getRecordById(__WEBPACK_IMPORTED_MODULE_1__data_records_account__["a" /* Account */], navParams.data.accountId);
            this.data.name = account.name;
            this.data.initialBalance = account.initialBalance == null ? "0" : account.initialBalance.toString();
            this.data.accountType = account.accountType;
            this.transaction = this.db.transactionProcessor.findTransactionsForRecord(account, __WEBPACK_IMPORTED_MODULE_5__data_transactions_create_account_transaction__["a" /* CreateAccountTransaction */])[0];
            this.data.bankLinkId = account.bankLinkId;
            if (this.bankLink != null)
                this.data.bankLinkConfiguration[this.bankLink.provider] = account.bankLinkConfiguration;
            this.bankLinkTransaction = this.db.transactionProcessor.findTransactionsForRecord(account, __WEBPACK_IMPORTED_MODULE_9__data_transactions_set_account_bank_link__["a" /* SetAccountBankLink */]).pop();
        }
        else {
            this.editing = false;
            this.transaction = new __WEBPACK_IMPORTED_MODULE_5__data_transactions_create_account_transaction__["a" /* CreateAccountTransaction */]();
            this.data.initialBalance = "0";
            this.data.accountType = 'Bank';
        }
    }
    Object.defineProperty(AddEditAccountModal.prototype, "uiBankLinkId", {
        get: function () {
            return this.data.bankLinkId == null ? -1 : this.data.bankLinkId;
        },
        set: function (bankLinkId) {
            this.data.bankLinkId = bankLinkId === -1 ? undefined : bankLinkId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAccountModal.prototype, "bankLink", {
        get: function () {
            if (this.data.bankLinkId == null || this.data.accountType != 'Bank') {
                this._bankLink = null;
                return null;
            }
            if (this._bankLink == null || this.data.bankLinkId != this._bankLink.id) {
                this._bankLink = this.engine.getRecordById(__WEBPACK_IMPORTED_MODULE_11__data_records_bank_link__["a" /* BankLink */], this.data.bankLinkId);
                if (this.data.bankLinkConfiguration[this._bankLink.provider] === undefined)
                    this.data.bankLinkConfiguration[this._bankLink.provider] = {};
            }
            return this._bankLink;
        },
        enumerable: true,
        configurable: true
    });
    AddEditAccountModal.prototype.getProviderSchema = function () {
        return this.bankLink == null ? this.emptyProviderSchema : this.bankProviderRegistry.getProviderSchema(this.bankLink.provider);
    };
    AddEditAccountModal.prototype.submit = function (event) {
        event.preventDefault();
        this.transaction.name = this.data.name;
        this.transaction.initialBalance = new __WEBPACK_IMPORTED_MODULE_7_big_js__["Big"](this.data.initialBalance);
        this.transaction.accountType = this.data.accountType;
        this.db.applyTransaction(this.transaction);
        var accountRecord = this.db.transactionProcessor.findRecordsForTransaction(this.transaction, __WEBPACK_IMPORTED_MODULE_1__data_records_account__["a" /* Account */])[0];
        if (this.bankLinkTransaction != null && this.bankLink == null) {
            this.db.undoTransaction(this.bankLinkTransaction);
        }
        else if (this.bankLink != null && this.bankLinkTransaction == null) {
            this.bankLinkTransaction = new __WEBPACK_IMPORTED_MODULE_9__data_transactions_set_account_bank_link__["a" /* SetAccountBankLink */]();
            this.bankLinkTransaction.accountId = accountRecord.id;
            this.bankLinkTransaction.bankLinkId = this.data.bankLinkId;
            this.bankLinkTransaction.configuration = this.data.bankLinkConfiguration[this.bankLink.provider];
            this.db.applyTransaction(this.bankLinkTransaction);
        }
        else if (this.bankLink != null && this.bankLinkTransaction != null) {
            this.bankLinkTransaction.accountId = accountRecord.id;
            this.bankLinkTransaction.bankLinkId = this.data.bankLinkId;
            this.bankLinkTransaction.configuration = this.data.bankLinkConfiguration[this.bankLink.provider];
            this.db.applyTransaction(this.bankLinkTransaction);
        }
        this.viewCtrl.dismiss({ accountId: accountRecord.id });
    };
    AddEditAccountModal.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    AddEditAccountModal.prototype.deleteAccountConfirm = function () {
        var _this = this;
        // TODO: Prolly better to archive it than delete it if anything linked to it
        var confirm = this.alertController.create({
            title: 'Delete?',
            message: 'Are you sure you want to delete this account and everything in it?',
            buttons: [
                {
                    text: 'Cancel'
                }, {
                    text: 'Delete',
                    role: 'destructive',
                    handler: function () {
                        confirm.dismiss().then(function () {
                            _this.deleteAccount();
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    AddEditAccountModal.prototype.deleteAccount = function () {
        this.db.deleteTransaction(this.transaction);
        this.appController.getRootNav().pop({ animate: false, duration: 0 });
        this.viewCtrl.dismiss();
    };
    AddEditAccountModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\modals\add-edit-account\add-edit-account.html"*/'<ion-header>\n\n    <ion-toolbar>\n\n    <ion-buttons start>\n\n        <button ion-button (click)="cancel()">Cancel</button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>{{editing ? "Edit" : "Add"}} Account</ion-title>\n\n\n\n    <ion-buttons end>\n\n        <button ion-button (click)="submit($event)" [disabled]="!form.valid">{{editing ? "Save" : "Create"}}</button>\n\n    </ion-buttons>\n\n\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n    <div responsive-padding>\n\n        <form #form="ngForm" (submit)="submit($event)">\n\n            <ion-list>\n\n                <ion-item>\n\n                    <ion-label>Account Name</ion-label>\n\n                    <ion-input type="text" name="name" [(ngModel)]="data.name" [attr.autofocus]="editing ? null : true" required></ion-input>\n\n                </ion-item>\n\n            </ion-list>\n\n            <ion-list radio-group name="accountType" [(ngModel)]="data.accountType">\n\n                <ion-item>\n\n                    <ion-label>Bank Account</ion-label>\n\n                    <ion-radio value="Bank"></ion-radio>\n\n                </ion-item>\n\n                <ion-item>\n\n                    <ion-label>Cash</ion-label>\n\n                    <ion-radio value="Cash"></ion-radio>\n\n                </ion-item>\n\n            </ion-list>\n\n            <ion-list>\n\n                <ion-item>\n\n                    <ion-label>Opening Balance</ion-label>\n\n                    <ion-input currency-field name="initialBalance" [(ngModel)]="data.initialBalance"required></ion-input>\n\n                </ion-item>\n\n            </ion-list>\n\n            <ion-list *ngIf="data.accountType == \'Bank\'">\n\n                <ion-item>\n\n                    <ion-label>Bank Links</ion-label>\n\n                    <ion-select name="bankLinkId" [(ngModel)]="uiBankLinkId">\n\n                        <ion-option [value]="-1">&lt;No Provider&gt;</ion-option>\n\n                        <ion-option *ngFor="let bankLink of engine.getBankLinks()" [value]="bankLink.id">{{bankLink.name}}</ion-option>    \n\n                    </ion-select>\n\n                </ion-item>\n\n            </ion-list>\n\n\n\n            <ion-item *ngFor="let setting of getProviderSchema().perAccountFields">\n\n                <ion-label>{{setting}}</ion-label>\n\n                <ion-input type="text" name="{{setting}}" [(ngModel)]="data.bankLinkConfiguration[bankLink.provider][setting]"></ion-input>\n\n            </ion-item>\n\n\n\n        </form>\n\n    </div>\n\n    <button ion-button *ngIf="editing" color="danger" clear small (click)="deleteAccountConfirm()">Delete</button>\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\modals\add-edit-account\add-edit-account.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__["a" /* EngineFactory */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__bank_bank_provider_registry__["a" /* BankProviderRegistry */], __WEBPACK_IMPORTED_MODULE_8__services_configuration_service__["a" /* Configuration */]])
    ], AddEditAccountModal);
    return AddEditAccountModal;
}());

//# sourceMappingURL=add-edit-account.js.map

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BankAccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_records_account__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bank_bank_sync__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_notifications__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__bank_standard_host_interface__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__data_records_bank_transaction__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modals_view_bank_transaction_view_bank_transaction__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__bank_link_bank_link__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__data_transactions_bank_transaction_ignore__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__data_transactions_bank_transaction_delete__ = __webpack_require__(390);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var BankAccountPage = (function () {
    function BankAccountPage(nav, dbms, navParams, engineFactory, modalController, bankSync, notifications, standardHostInterface, configuration, alertController) {
        this.nav = nav;
        this.dbms = dbms;
        this.navParams = navParams;
        this.engineFactory = engineFactory;
        this.modalController = modalController;
        this.bankSync = bankSync;
        this.notifications = notifications;
        this.standardHostInterface = standardHostInterface;
        this.configuration = configuration;
        this.alertController = alertController;
        this.transactionViewData = [];
        this.transactionViewDummyData = [];
        this.transactionViewArrayData = [];
        this.transactionViewArrayDataBlank = new __WEBPACK_IMPORTED_MODULE_9__data_records_bank_transaction__["a" /* BankTransaction */]();
        this.logger = __WEBPACK_IMPORTED_MODULE_7__services_logger__["a" /* Logger */].get('BankPage');
        this.engine = this.engineFactory.getEngineById(navParams.data.budgetId);
        this.account = this.engine.getRecordById(__WEBPACK_IMPORTED_MODULE_4__data_records_account__["a" /* Account */], navParams.data.accountId);
        this.bankTransactionTable = this.engine.db.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_9__data_records_bank_transaction__["a" /* BankTransaction */]);
        this.transactionView = { data: function () { return this.transactionViewDummyData; } };
        this.multiSelectEnabled = false;
        this.selected = {};
        // TODO: If ! touch enabled then start in multiselect mode?
    }
    BankAccountPage.prototype.goBankLink = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_11__bank_link_bank_link__["a" /* BankLinkPage */], { budgetId: this.engine.db.id, bankLinkId: this.account.bankLinkId });
    };
    BankAccountPage.prototype.isSyncing = function () {
        return false;
    };
    BankAccountPage.prototype.refreshData = function () {
        this.transactionViewData = this.transactionView.data();
        this.transactionViewDummyData.push(new __WEBPACK_IMPORTED_MODULE_9__data_records_bank_transaction__["a" /* BankTransaction */]());
    };
    BankAccountPage.prototype.ionViewWillEnter = function () {
        this.transactionView = this.bankTransactionTable.addDynamicView('accountBankTransactions_' + this.account.id)
            .applyFind({ 'accountId': this.account.id })
            .applySortCriteria([['date', true], ['id', false]]);
        this.transactionViewData = this.transactionView.data();
        this.logger.debug('WIll Enter Dynamic Views ' + this.bankTransactionTable.DynamicViews.length);
        /*if (this.transactions.data().length <= this.transactionDisplayLimit) {
          this.transactionDisplayLimit = 0;
          this.infiniteScroll.enable(false);
        }*/
    };
    BankAccountPage.prototype.ionViewDidLeave = function () {
        this.bankTransactionTable.removeDynamicView(this.transactionView.name);
        this.logger.debug('Did Leave Dynamic Views ' + this.bankTransactionTable.DynamicViews.length);
        this.transactionView = { data: function () { return this.transactionViewDummyData; } };
        this.transactionViewData = [];
    };
    BankAccountPage.prototype.transactionViewArray = function () {
        this.transactionViewArrayData.length = 0;
        (_a = this.transactionViewArrayData).push.apply(_a, this.transactionViewDummyData);
        (_b = this.transactionViewArrayData).push.apply(_b, this.transactionView.data());
        return this.transactionViewArrayData;
        var _a, _b;
    };
    BankAccountPage.prototype.unreconciledTransactions = function () {
        return this.transactionView.data().filter(function (t) { return !t.x.reconciled; });
    };
    BankAccountPage.prototype.openTransaction = function (t) {
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_10__modals_view_bank_transaction_view_bank_transaction__["a" /* ViewBankTransactionModal */], { budgetId: this.navParams.data.budgetId, bankTransactionId: t.id });
        modal.present();
    };
    BankAccountPage.prototype.transactionListDateHeader = function (record, recordIndex, records) {
        if (recordIndex === 0 || record.date !== records[recordIndex - 1].date)
            return record;
        return null;
    };
    BankAccountPage.prototype.toggleMultiSelect = function () {
        this.multiSelectEnabled = !this.multiSelectEnabled;
    };
    BankAccountPage.prototype.selectAll = function () {
        var _this = this;
        this.unselectAll();
        this.unreconciledTransactions().forEach(function (t) { return _this.selected[t.id] = true; });
    };
    BankAccountPage.prototype.unselectAll = function () {
        var _this = this;
        Object.keys(this.selected).forEach(function (key) { return _this.selected[key] = false; });
    };
    BankAccountPage.prototype.allSelected = function () {
        var _this = this;
        return this.unreconciledTransactions().every(function (t) { return _this.selected[t.id] === true; });
    };
    BankAccountPage.prototype.anySelected = function () {
        var _this = this;
        return this.unreconciledTransactions().some(function (t) { return _this.selected[t.id] === true; });
    };
    BankAccountPage.prototype.ignoreItem = function (t) {
        var bti = new __WEBPACK_IMPORTED_MODULE_13__data_transactions_bank_transaction_ignore__["a" /* BankTransactionIgnore */]();
        bti.bankTransactionId = t.id;
        this.engine.db.applyTransaction(bti);
    };
    BankAccountPage.prototype.unignoreItem = function (t) {
        var _this = this;
        this.engine.db.transactionProcessor.findTransactionsForRecord(t, __WEBPACK_IMPORTED_MODULE_13__data_transactions_bank_transaction_ignore__["a" /* BankTransactionIgnore */]).forEach(function (bti) {
            _this.engine.db.deleteTransaction(bti);
        });
    };
    BankAccountPage.prototype.deleteItem = function (t) {
        var _this = this;
        this.alertController.create({
            message: 'Deleting this bank transaction is irreversable. You only want to do this in the event of an error, otherwise "ignore" the transaction.',
            buttons: [
                'Cancel',
                {
                    text: 'Delete',
                    cssClass: 'danger',
                    handler: function () { return _this.doDeleteItem(t); }
                }
            ]
        }).present();
    };
    BankAccountPage.prototype.doDeleteItem = function (t) {
        var btd = new __WEBPACK_IMPORTED_MODULE_14__data_transactions_bank_transaction_delete__["a" /* BankTransactionDelete */]();
        btd.bankTransactionId = t.id;
        this.engine.db.applyTransaction(btd);
    };
    BankAccountPage.prototype.deleteSelected = function () {
        var _this = this;
        this.alertController.create({
            message: 'Deleting bank transactions is irreversable. You only want to do this in the event of an error, otherwise "ignore" the transaction.',
            buttons: [
                'Cancel',
                {
                    text: 'Delete',
                    cssClass: 'danger',
                    handler: function () { return _this.unreconciledTransactions().filter(function (t) { return _this.selected[t.id] === true && !t.x.reconciled; }).forEach(function (t) { return _this.doDeleteItem(t); }); }
                }
            ]
        }).present();
    };
    BankAccountPage.prototype.ignoreSelected = function () {
        var _this = this;
        this.unreconciledTransactions()
            .filter(function (t) { return _this.selected[t.id] === true && !t.x.reconciled && !t.x.ignored; })
            .forEach(function (t) { return _this.ignoreItem(t); });
    };
    BankAccountPage.prototype.unignoreSelected = function () {
        var _this = this;
        this.unreconciledTransactions()
            .filter(function (t) { return _this.selected[t.id] === true && !t.x.reconciled && t.x.ignored; })
            .forEach(function (t) { return _this.unignoreItem(t); });
    };
    BankAccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\pages\bank-account\bank-account.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <main-menu-icon></main-menu-icon>\n\n    </button>\n\n    <ion-title>{{account.name}}</ion-title>\n\n    <ion-buttons end>\n\n        <button ion-button icon-only (click)="toggleMultiSelect()"><ion-icon name="checkbox-outline"></ion-icon></button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bank-account-page">\n\n  \n\n  <ion-list class="reconciliation-list" [virtualScroll]="transactionViewArray()" [headerFn]="transactionListDateHeader" approxHeaderHeight="44px" approxItemHeight="65px">\n\n\n\n    <div *virtualHeader="let t1; let i = index;" style="width: 100%">\n\n      <ng-container *ngIf="i === 0">\n\n        <ion-item>Account Number {{account.x.accountNumber}}</ion-item>\n\n        <ion-item>Balance {{account.x.bankBalance}}</ion-item>\n\n        <ion-item>Available Balance {{account.x.bankAvailableBalance}}</ion-item>\n\n        <ion-item>Processed Balance {{account.x.bankProcessedBalance}}</ion-item>\n\n        <ion-item>Calculated Balance {{account.x.calculatedBankBalance}}</ion-item>\n\n        <ion-item>Available Calculated Balance {{account.x.calculatedBankAvailableBalance}}</ion-item>\n\n        <ion-item>Processed Calculated Balance {{account.x.calculatedBankProcessedBalance}}</ion-item>\n\n        <ion-item>Last Updated {{account.x.bankBalanceTimestamp}}</ion-item>\n\n        <ion-item *ngIf="account.x.bankBalance && account.x.calculatedBankBalance">Difference {{account.x.bankBalance.minus(account.x.calculatedBankBalance)}}</ion-item>\n\n        <ion-item *ngIf="account.x.bankAvailableBalance && account.x.calculatedBankAvailableBalance">Available Difference {{account.x.bankAvailableBalance.minus(account.x.calculatedBankAvailableBalance)}}</ion-item>\n\n        <ion-item *ngIf="account.x.bankProcessedBalance && account.x.calculatedBankProcessedBalance">Processed Difference {{account.x.bankProcessedBalance.minus(account.x.calculatedBankProcessedBalance)}}</ion-item>\n\n        <button *ngIf="account.bankLinkId" ion-item (click)="goBankLink()">Go To Bank Link</button>\n\n        <ion-item>TODO If account is syncing</ion-item>\n\n        <ion-item>TODO Sync ONLY this account for the bank link</ion-item>\n\n        <button ion-item detail-none (click)="refreshData()">Refresh/Mod Data</button>      \n\n      </ng-container>\n\n      <ion-item-divider  color="light">{{t1.date | dFormat}}</ion-item-divider>\n\n    </div>\n\n\n\n    <ion-item-sliding *virtualItem="let t" class="transaction-item">\n\n      <button ion-item detail-none (click)="t.x.ignored ? null : openTransaction(t)" [disabled]="(multiSelectEnabled && t.x.reconciled) || (!multiSelectEnabled && t.x.ignored)" [class.transaction-ignored]="t.x.ignored">\n\n        <ion-checkbox [(ngModel)]="selected[t.id]" item-left *ngIf="multiSelectEnabled" [disabled]="t.x.reconciled"></ion-checkbox>\n\n        <div item-left class="reconciliation-marker" [class.unreconciled-marker]="!t.x.reconciled" [class.reconciled-marker]="t.x.reconciled"></div>\n\n        <div item-content class="transaction-content">\n\n          <div class="transaction-description-wrapper">\n\n            <p class="transaction-description">{{t.flagRemoved ? \'Removed (TODO: Change to a warning icon, and need to know what to do with it, delete, ignore, etc?): \' : \'\'}}{{t.description}}</p>\n\n          </div>\n\n          <ion-note *ngIf="t.status !== \'processed\'">{{t.status}}</ion-note>\n\n        </div>\n\n        <currency-display item-right highlightPositive showPositive [value]="t.amount"></currency-display>\n\n      </button>\n\n      <ion-item-options side="left" *ngIf="!t.x.reconciled && !multiSelectEnabled">\n\n        <button ion-button (click)="!t.x.ignored ? ignoreItem(t) : unignoreItem(t)"><ion-icon *ngIf="!t.x.ignored" name="eye-off"></ion-icon><ion-icon *ngIf="t.x.ignored" name="eye"></ion-icon></button>\n\n      </ion-item-options>\n\n  \n\n      <ion-item-options side="right" *ngIf="!t.x.reconciled && !multiSelectEnabled">\n\n        <button ion-button icon-only color="danger" (click)="deleteItem(t)"><ion-icon name="trash"></ion-icon></button>\n\n      </ion-item-options>\n\n    </ion-item-sliding>\n\n  </ion-list>\n\n\n\n</ion-content>\n\n\n\n<ion-footer *ngIf="multiSelectEnabled">\n\n  <ion-toolbar>\n\n    <ion-buttons class="buttons-bar">          \n\n      <button ion-button icon-only (click)="selectAll()" *ngIf="!allSelected()"><ion-icon ios="ios-checkmark-circle" md="md-checkbox"></ion-icon></button>\n\n      <button ion-button icon-only (click)="unselectAll()" *ngIf="allSelected()"><ion-icon ios="ios-checkmark-circle-outline" md="md-checkbox-outline"></ion-icon></button>\n\n      <button ion-button icon-only (click)="deleteSelected()" [disabled]="!anySelected()"><ion-icon name="trash"></ion-icon></button>\n\n      <button ion-button icon-only (click)="ignoreSelected()" [disabled]="!anySelected()"><ion-icon name="eye-off"></ion-icon></button>\n\n      <button ion-button icon-only (click)="unignoreSelected()" [disabled]="!anySelected()"><ion-icon name="eye"></ion-icon></button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"c:\working\fb\ebudget\src\pages\bank-account\bank-account.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__["a" /* EngineFactory */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__bank_bank_sync__["a" /* BankSync */], __WEBPACK_IMPORTED_MODULE_6__services_notifications__["a" /* Notifications */], __WEBPACK_IMPORTED_MODULE_8__bank_standard_host_interface__["a" /* StandardHostInterface */], __WEBPACK_IMPORTED_MODULE_12__services_configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */]])
    ], BankAccountPage);
    return BankAccountPage;
}());

//# sourceMappingURL=bank-account.js.map

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BankLinkPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bank_bank_sync__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_notifications__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__bank_standard_host_interface__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__data_records_bank_link__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modals_add_edit_bank_link_add_edit_bank_link__ = __webpack_require__(149);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var BankLinkPage = (function () {
    function BankLinkPage(nav, dbms, navParams, engineFactory, modalController, bankSync, notifications, standardHostInterface, alertController) {
        this.nav = nav;
        this.dbms = dbms;
        this.navParams = navParams;
        this.engineFactory = engineFactory;
        this.modalController = modalController;
        this.bankSync = bankSync;
        this.notifications = notifications;
        this.standardHostInterface = standardHostInterface;
        this.alertController = alertController;
        this.logger = __WEBPACK_IMPORTED_MODULE_6__services_logger__["a" /* Logger */].get('BankLinkPage');
        this.engine = this.engineFactory.getEngineById(navParams.data.budgetId);
        this.bankLink = this.engine.getRecordById(__WEBPACK_IMPORTED_MODULE_8__data_records_bank_link__["a" /* BankLink */], navParams.data.bankLinkId);
    }
    BankLinkPage.prototype.editBankLink = function () {
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_9__modals_add_edit_bank_link_add_edit_bank_link__["a" /* AddEditBankLinkModal */], { budgetId: this.engine.db.id, bankLinkId: this.bankLink.id });
        modal.present();
    };
    BankLinkPage.prototype.syncAllAccounts = function () {
        var initiatedBankSyncMonitor = this.bankSync.sync(this.bankLink, this.engine);
        if (initiatedBankSyncMonitor.errors) {
            this.alertController.create({ title: "Unable To Run Bank Sync", message: initiatedBankSyncMonitor.errorMessage }).present();
        }
    };
    BankLinkPage.prototype.getCurrentBankSync = function () {
        var _this = this;
        return this.bankSync.activeSyncs.find(function (b) { return b.bankLink.uuid === _this.bankLink.uuid; });
    };
    BankLinkPage.prototype.showBrowser = function () {
        if (this.getCurrentBankSync().providerSchema.requireBrowser) {
            this.getCurrentBankSync().provider.getBrowser().userShow();
        }
    };
    BankLinkPage.prototype.cancel = function () {
        this.getCurrentBankSync().cancel();
    };
    BankLinkPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\pages\bank-link\bank-link.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <main-menu-icon></main-menu-icon>\n\n    </button>\n\n    <ion-title>{{bankLink.name}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <button ion-item (click)="editBankLink()">Edit</button>\n\n  <button ion-item (click)="syncAllAccounts()">Sync All Accounts</button>\n\n  <button ion-item *ngIf="getCurrentBankSync()" (click)="showBrowser()">Show Browser</button>  \n\n  <button ion-item *ngIf="getCurrentBankSync()" (click)="cancel()">Cancel</button>  \n\n  <ion-item *ngIf="getCurrentBankSync()">\n\n    <h2>Current Sync Log</h2>\n\n    <p *ngFor="let l of getCurrentBankSync().log">{{l}}</p>\n\n  </ion-item>\n\n\n\n  <ion-item>A list of the accounts that this bank link is linked too and will sync for</ion-item>\n\n  <ion-item>Sync history - short list of sync history, can click to go to. Older ones are only stored in localstorage and show limited log data. Recent ones are cached in memory with all the data (like the current sync)</ion-item>\n\n  <button ion-item (click)="goSyncHistory()">Sync History - Go to page which shows all the recorded sync history (from this device) - filter to this bank link (page is generic and will show all usually)</button>\n\n\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\pages\bank-link\bank-link.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__["a" /* EngineFactory */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__bank_bank_sync__["a" /* BankSync */], __WEBPACK_IMPORTED_MODULE_5__services_notifications__["a" /* Notifications */], __WEBPACK_IMPORTED_MODULE_7__bank_standard_host_interface__["a" /* StandardHostInterface */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */]])
    ], BankLinkPage);
    return BankLinkPage;
}());

//# sourceMappingURL=bank-link.js.map

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEditBankLinkModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_records_bank_link__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_transactions_create_bank_link__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_secure_prompt__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__bank_provider_interface__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__bank_bank_provider_registry__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__bank_bank_link_local__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var AddEditBankLinkModal = (function () {
    function AddEditBankLinkModal(viewCtrl, navParams, dbms, nav, alertController, engineFactory, appController, bankProviderRegistry, configuration, securePrompt, bankLinkLocal) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.dbms = dbms;
        this.nav = nav;
        this.alertController = alertController;
        this.engineFactory = engineFactory;
        this.appController = appController;
        this.bankProviderRegistry = bankProviderRegistry;
        this.configuration = configuration;
        this.securePrompt = securePrompt;
        this.bankLinkLocal = bankLinkLocal;
        this.emptyproviderSchema = new __WEBPACK_IMPORTED_MODULE_9__bank_provider_interface__["c" /* ProviderSchema */]();
        this.db = dbms.getDb(navParams.data.budgetId);
        this.engine = engineFactory.getEngineById(this.db.id);
        this.data = {};
        if (navParams.data.bankLinkId) {
            this.editing = true;
            var bankLink = this.engine.getRecordById(__WEBPACK_IMPORTED_MODULE_5__data_records_bank_link__["a" /* BankLink */], navParams.data.bankLinkId);
            this.data.name = bankLink.name;
            this.data.provider = bankLink.provider;
            this.data.configuration = bankLink.configuration;
            this.data.autoSync = this.bankLinkLocal.getInfo(bankLink.uuid).autoSync;
            this.pausedAutoSync = this.bankLinkLocal.getInfo(bankLink.uuid).pauseAutoSync;
            this.data.pausedAutoSync = this.bankLinkLocal.getInfo(bankLink.uuid).pauseAutoSync;
            this.transaction = this.db.transactionProcessor.findTransactionsForRecord(bankLink, __WEBPACK_IMPORTED_MODULE_6__data_transactions_create_bank_link__["a" /* CreateBankLink */])[0];
        }
        else {
            this.editing = false;
            this.transaction = new __WEBPACK_IMPORTED_MODULE_6__data_transactions_create_bank_link__["a" /* CreateBankLink */]();
            this.transaction.uuid = __WEBPACK_IMPORTED_MODULE_7__services_utils__["a" /* Utils */].randomChars(12);
            this.data.configuration = {};
        }
        if (configuration.secureAvailable()) {
            this.secureAccessor = configuration.secureAccessor("banklink_" + this.transaction.uuid);
        }
    }
    AddEditBankLinkModal.prototype.getProviderSchema = function () {
        return this.data.provider == null ? this.emptyproviderSchema : this.bankProviderRegistry.getProviderSchema(this.data.provider);
    };
    AddEditBankLinkModal.prototype.submit = function (event) {
        var _this = this;
        event.preventDefault();
        this.transaction.name = this.data.name;
        this.transaction.provider = this.data.provider;
        this.transaction.configuration = this.data.configuration;
        this.db.applyTransaction(this.transaction);
        var bankLinkRecord = this.db.transactionProcessor.findRecordsForTransaction(this.transaction, __WEBPACK_IMPORTED_MODULE_5__data_records_bank_link__["a" /* BankLink */])[0];
        this.bankLinkLocal.updateInfo(this.transaction.uuid, function (info) {
            info.autoSync = _this.data.autoSync;
            if (_this.pausedAutoSync && !_this.data.pausedAutoSync) {
                info.cancelledCount = 0;
                info.errorCount = 0;
            }
        });
        this.viewCtrl.dismiss({ accountId: bankLinkRecord.id });
    };
    AddEditBankLinkModal.prototype.cancel = function () {
        if (!this.editing && this.secureAccessor)
            this.secureAccessor.removeScope();
        this.viewCtrl.dismiss();
    };
    AddEditBankLinkModal.prototype.deleteBankLinkConfirm = function () {
        var _this = this;
        // TODO: Prolly better to archive it than delete it if anything linked to it
        var confirm = this.alertController.create({
            title: 'Delete?',
            message: 'Are you sure you want to delete this bank link?',
            buttons: [
                {
                    text: 'Cancel'
                }, {
                    text: 'Delete',
                    role: 'destructive',
                    handler: function () {
                        confirm.dismiss().then(function () {
                            _this.deleteBankLink();
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    AddEditBankLinkModal.prototype.deleteBankLink = function () {
        this.db.deleteTransaction(this.transaction);
        this.appController.getRootNav().pop({ animate: false, duration: 0 });
        this.viewCtrl.dismiss();
    };
    AddEditBankLinkModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\modals\add-edit-bank-link\add-edit-bank-link.html"*/'<ion-header>\n\n    <ion-toolbar>\n\n    <ion-buttons start>\n\n        <button ion-button (click)="cancel()">Cancel</button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>{{editing ? "Edit" : "Add"}} Bank Link</ion-title>\n\n\n\n    <ion-buttons end>\n\n        <button ion-button (click)="submit($event)" [disabled]="!form.valid">{{editing ? "Save" : "Create"}}</button>\n\n    </ion-buttons>\n\n\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n    <div responsive-padding>\n\n        <form #form="ngForm" (submit)="submit($event)">\n\n\n\n            <ion-list>\n\n                <ion-item>\n\n                    <ion-label>Bank Provider</ion-label>\n\n                    <ion-select name="bankProviderName" [(ngModel)]="data.provider">\n\n                        <ion-option *ngFor="let bankProviderName of bankProviderRegistry.getProviderNames()" value="{{bankProviderName}}">{{bankProviderName}}</ion-option>    \n\n                    </ion-select>\n\n                </ion-item>\n\n\n\n                <ion-item>\n\n                    <ion-label>Bank Link Name</ion-label>\n\n                    <ion-input type="text" name="name" [(ngModel)]="data.name"></ion-input>\n\n                </ion-item>\n\n\n\n                <ion-item>\n\n                    <ion-label>Auto Sync</ion-label>\n\n                    <ion-toggle name="autoSync" [(ngModel)]="data.autoSync"></ion-toggle>\n\n                </ion-item>\n\n\n\n                <ion-item *ngIf="data.autoSync && pausedAutoSync">\n\n                    <ion-label>\n\n                        Pause Auto Sync\n\n                        <p>Auto Sync disabled due to errors</p>\n\n                    </ion-label>\n\n                    <ion-toggle name="pausedAutoSync" [(ngModel)]="data.pausedAutoSync"></ion-toggle>\n\n                </ion-item>\n\n    \n\n                <ion-item *ngFor="let setting of getProviderSchema().configurationFields">\n\n                    <ion-label>{{setting}}</ion-label>\n\n                    <ion-input type="text" name="{{setting}}" [(ngModel)]="data.configuration[setting]"></ion-input>\n\n                </ion-item>\n\n\n\n                <ion-item *ngIf="data.provider && !secureAccessor">\n\n                    Secure storage is not available\n\n                </ion-item>\n\n                <ion-item *ngFor="let setting of secureAccessor ? getProviderSchema().secureConfigurationFields : []">\n\n                    <button enabled="configuration.secureAvailable()" ion-button type="button" (click)="securePrompt.show(secureAccessor, setting)">{{(secureAccessor.keys[setting]) ? "Edit Secure " + setting : "Securely Store " + setting}}</button>\n\n                </ion-item>\n\n\n\n\n\n            </ion-list>\n\n        </form>\n\n    </div>\n\n    <button ion-button *ngIf="editing" color="danger" clear small (click)="deleteBankLinkConfirm()">Delete</button>\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\modals\add-edit-bank-link\add-edit-bank-link.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__engine_engine_factory__["a" /* EngineFactory */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_10__bank_bank_provider_registry__["a" /* BankProviderRegistry */], __WEBPACK_IMPORTED_MODULE_4__services_configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_8__services_secure_prompt__["a" /* SecurePrompt */], __WEBPACK_IMPORTED_MODULE_11__bank_bank_link_local__["a" /* BankLinkLocal */]])
    ], AddEditBankLinkModal);
    return AddEditBankLinkModal;
}());

//# sourceMappingURL=add-edit-bank-link.js.map

/***/ }),
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 160;

/***/ }),
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 202;

/***/ }),
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoPersistenceProvider; });
var NoPersistenceProvider = (function () {
    function NoPersistenceProvider(transactionSerializer) {
        this.transactionSerializer = transactionSerializer;
        this.dbArray = [];
        this.tempStorage = new Map();
    }
    NoPersistenceProvider.prototype.reset = function () {
        this.dbArray.length = 0;
        this.tempStorage.clear();
    };
    NoPersistenceProvider.prototype.init = function () {
        return Promise.resolve();
    };
    NoPersistenceProvider.prototype.dbs = function () {
        return this.dbArray;
    };
    NoPersistenceProvider.prototype.addDb = function (dbId) {
        if (this.dbArray.indexOf(dbId) === -1)
            this.dbArray.push(dbId);
        return Promise.resolve();
    };
    NoPersistenceProvider.prototype.unlinkDb = function (dbId) {
        var _this = this;
        if (this.dbArray.indexOf(dbId) > -1) {
            this.dbArray.splice(this.dbArray.indexOf(dbId), 1);
            this.transactionsSync(dbId).forEach(function (transaction) {
                _this.deleteTransaction(dbId, transaction.id);
            });
        }
    };
    NoPersistenceProvider.prototype.transactionsSync = function (dbId) {
        var _this = this;
        var transactions = [];
        this.tempStorage.forEach(function (key, val) {
            if (key.startsWith(dbId + '_')) {
                var transaction = _this.transactionSerializer.fromJson(val);
                transactions.push(transaction);
            }
        });
        return transactions;
    };
    NoPersistenceProvider.prototype.transactions = function (dbId) {
        return Promise.resolve(this.transactionsSync(dbId));
    };
    NoPersistenceProvider.prototype.saveTransaction = function (dbId, transaction) {
        this.tempStorage.set(dbId + '_' + transaction.id, this.transactionSerializer.toJson(transaction));
    };
    NoPersistenceProvider.prototype.deleteTransaction = function (dbId, transactionId) {
        this.tempStorage.delete(dbId + '_' + transactionId);
    };
    NoPersistenceProvider.prototype.getTransaction = function (dbId, transactionId) {
        var transactionString = this.tempStorage.get(dbId + '_' + transactionId);
        var transaction = this.transactionSerializer.fromJson(transactionString);
        return transaction;
    };
    NoPersistenceProvider.prototype.keyStore = function (dbId, key, value) {
        var localKey = 'keystore_' + dbId + '_' + key;
        if (typeof value !== 'undefined')
            this.tempStorage.set(localKey, value);
        return this.tempStorage.get(localKey);
    };
    return NoPersistenceProvider;
}());

//# sourceMappingURL=no-persistence-provider.js.map

/***/ }),
/* 367 */,
/* 368 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CategoryPopover; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_records_category__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_records_account__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_records_transaction__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_records_budget__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modals_add_edit_category_add_edit_category__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modals_add_edit_category_simple_weekly_add_edit_category_simple_weekly__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__data_transactions_init_category_simple_weekly_transaction__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_editor_provider__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__modals_add_edit_transaction_add_edit_transaction__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__modals_add_edit_split_transaction_add_edit_split_transaction__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__modals_add_edit_split_transfer_add_edit_split_transfer__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__modals_add_edit_transfer_add_edit_transfer__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_configuration_service__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


















var CategoryPage = (function () {
    function CategoryPage(nav, dbms, params, editorProvider, modalController, popoverController, engineFactory) {
        this.nav = nav;
        this.dbms = dbms;
        this.params = params;
        this.editorProvider = editorProvider;
        this.modalController = modalController;
        this.popoverController = popoverController;
        this.engineFactory = engineFactory;
        this.logger = __WEBPACK_IMPORTED_MODULE_16__services_logger__["a" /* Logger */].get('CategoryPage');
        this.nav = nav;
        this.dbms = dbms;
        this.budget = params.data.budget;
        this.engine = engineFactory.getEngine(this.budget);
        var categoryTable = this.budget.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_4__data_records_category__["a" /* Category */]);
        this.category = categoryTable.by('id', params.data.categoryId);
        this.budgetRecord = this.budget.transactionProcessor.single(__WEBPACK_IMPORTED_MODULE_7__data_records_budget__["a" /* Budget */]);
        this.transactionTable = this.budget.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_6__data_records_transaction__["a" /* Transaction */]);
        this.transactions = { data: function () { return []; } };
        this.transactionDisplayPageSize = window.innerHeight / 40;
        if (this.transactionDisplayPageSize < 6)
            this.transactionDisplayPageSize = 10;
        this.transactionDisplayLimit = this.transactionDisplayPageSize;
    }
    CategoryPage.prototype.account = function (accountId) {
        return this.engine.getRecordById(__WEBPACK_IMPORTED_MODULE_5__data_records_account__["a" /* Account */], accountId);
    };
    Object.defineProperty(CategoryPage.prototype, "accountBalances", {
        get: function () {
            return this.category.x.accountBalances ? Array.from(this.category.x.accountBalances.keys()) : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryPage.prototype, "transactionsPaged", {
        get: function () {
            if (!this.transactionDisplayLimit)
                return this.transactions.data();
            return this.transactions.data().slice(0, this.transactionDisplayLimit);
        },
        enumerable: true,
        configurable: true
    });
    CategoryPage.prototype.transferOtherCategoryName = function (t) {
        var category = t.x.transfer ? this.budget.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_4__data_records_category__["a" /* Category */]).by('id', t.x.transfer.categoryId) : null;
        return category ? category.name : "Category Missing";
    };
    CategoryPage.prototype.showMore = function (event) {
        var popover = this.popoverController.create(CategoryPopover, { categoryPage: this });
        popover.present({ ev: event });
    };
    CategoryPage.prototype.editCategory = function () {
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_8__modals_add_edit_category_add_edit_category__["a" /* AddEditCategoryModal */], { budgetId: this.budget.id, categoryId: this.category.id });
        modal.present();
    };
    CategoryPage.prototype.editSimpleWeekly = function () {
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_9__modals_add_edit_category_simple_weekly_add_edit_category_simple_weekly__["a" /* AddEditCategorySimpleWeeklyModal */], { budgetId: this.budget.id, categoryId: this.category.id });
        modal.present();
    };
    CategoryPage.prototype.categoryWeeklyAmount = function () {
        // TODO: Put this into the category record and get it straight from there
        var t = this.budget.transactionProcessor.findTransactionsForRecord(this.category, __WEBPACK_IMPORTED_MODULE_10__data_transactions_init_category_simple_weekly_transaction__["a" /* InitCategorySimpleWeeklyTransaction */])[0];
        if (t)
            return t.weeklyAmount;
    };
    CategoryPage.prototype.addTransaction = function () {
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_12__modals_add_edit_transaction_add_edit_transaction__["a" /* AddEditTransactionModal */], { budgetId: this.budget.id, categoryId: this.category.id });
        modal.present();
    };
    CategoryPage.prototype.addSplitTransaction = function () {
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_13__modals_add_edit_split_transaction_add_edit_split_transaction__["a" /* AddEditSplitTransactionModal */], { budgetId: this.budget.id, categoryId: this.category.id });
        modal.present();
    };
    CategoryPage.prototype.addSplitTransfer = function () {
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_14__modals_add_edit_split_transfer_add_edit_split_transfer__["a" /* AddEditSplitTransferModal */], { budgetId: this.budget.id, categoryId: this.category.id });
        modal.present();
    };
    CategoryPage.prototype.addTransfer = function () {
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_15__modals_add_edit_transfer_add_edit_transfer__["a" /* AddEditTransferModal */], { budgetId: this.budget.id, categoryId: this.category.id });
        modal.present();
    };
    CategoryPage.prototype.editTransaction = function (transaction) {
        var modal = this.editorProvider.getModal(this.budget.transactionProcessor.findAllTransactionsForRecord(transaction)[0], { budgetId: this.budget.id, categoryId: this.category.id, transactionId: transaction.id });
        modal.present();
    };
    CategoryPage.prototype.ionViewWillEnter = function () {
        this.transactions = this.transactionTable.addDynamicView('categoryTransactions_' + this.category.id)
            .applyFind({ 'categoryId': this.category.id })
            .applySortCriteria([['date', true], ['id', true]]);
        this.logger.debug('WIll Enter Dynamic Views ' + this.transactionTable.DynamicViews.length);
        if (this.transactions.data().length <= this.transactionDisplayLimit) {
            this.transactionDisplayLimit = 0;
            this.infiniteScroll.enable(false);
        }
    };
    CategoryPage.prototype.ionViewDidLeave = function () {
        this.transactionTable.removeDynamicView(this.transactions.name);
        this.logger.debug('Did Leave Dynamic Views ' + this.transactionTable.DynamicViews.length);
        this.transactions = { data: function () { return []; } };
    };
    CategoryPage.prototype.doInfinite = function (infiniteScroll) {
        // This is used just to stage the DOM loading for a responsive UI rather than an async operation
        // We can't use virtualscroll as we can have different elements / heights
        this.transactionDisplayLimit += this.transactionDisplayPageSize;
        this.transactionDisplayPageSize *= 2;
        if (this.transactions.data().length <= this.transactionDisplayLimit) {
            this.transactionDisplayLimit = 0;
            infiniteScroll.enable(false);
        }
        else {
            infiniteScroll.complete();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["d" /* InfiniteScroll */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["d" /* InfiniteScroll */])
    ], CategoryPage.prototype, "infiniteScroll", void 0);
    CategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\pages\category\category.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{category.name}}</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="addTransaction()"><ion-icon name="add"></ion-icon></button>\n\n      <button ion-button icon-only (click)="addTransfer()"><ion-icon name="shuffle"></ion-icon></button>\n\n      <button ion-button icon-only (click)="showMore($event)"><ion-icon name="more"></ion-icon></button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="category-page">\n\n  <replication-error></replication-error>\n\n  <ion-list>\n\n    <button ion-item detail-none (click)="editSimpleWeekly()">\n\n        Balance\n\n        <currency-display highlightNegative [value]="category.balance" item-right></currency-display>\n\n    </button>\n\n    <button ion-item detail-none (click)="editSimpleWeekly()">\n\n        Weekly Amount\n\n        <currency-display highlightNegative [value]="categoryWeeklyAmount()" item-right></currency-display>\n\n    </button>\n\n    <ion-item *ngFor="let accountId of accountBalances">\n\n        {{account(accountId).name}}\n\n        <currency-display highlightNegative [value]="category.x.accountBalances.get(accountId)" item-right></currency-display>\n\n    </ion-item>\n\n\n\n    <button class="category-transaction-item" ion-item detail-none (click)="editTransaction(t)" *ngFor="let t of transactionsPaged">\n\n      <span item-left>{{t.date | dFormat}}</span> {{t.description}}\n\n        <ion-note small item-right *ngIf="t.x.type == \'Transfer\'">\n\n          <ion-icon small name="shuffle"></ion-icon>\n\n          {{transferOtherCategoryName(t)}}\n\n        </ion-note>\n\n      <currency-display invertedCurrency highlightPositive showPositive [value]="t.amount" item-right></currency-display>\n\n    </button>\n\n\n\n  </ion-list>\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" threshold="50%">\n\n   <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n </ion-infinite-scroll>\n\n <ion-note *ngIf="!infiniteScroll.enabled" class="item-list-footnote">{{transactionsPaged.length == 0 ? \'No items to display\' : \'End of items\'}}</ion-note>\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\pages\category\category.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_11__services_editor_provider__["a" /* EditorProvider */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["m" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__["a" /* EngineFactory */]])
    ], CategoryPage);
    return CategoryPage;
}());

var CategoryPopover = (function () {
    function CategoryPopover(viewCtrl, configuration) {
        this.viewCtrl = viewCtrl;
        this.configuration = configuration;
        this.categoryPage = viewCtrl.data.categoryPage;
    }
    CategoryPopover.prototype.close = function (thenFn) {
        var _this = this;
        this.viewCtrl.dismiss(undefined, undefined, { animate: false, duration: 0 }).then(function () { thenFn.call(_this.categoryPage); });
    };
    CategoryPopover = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            template: "\n    <ion-list>\n      <button ion-item detail-none (click)=\"close(categoryPage.editSimpleWeekly)\">Weekly Amount</button>\n      <button ion-item detail-none (click)=\"close(categoryPage.editCategory)\">Edit / Delete Category</button>\n      <button ion-item detail-none (click)=\"close(categoryPage.addTransaction)\">New Transaction</button>\n      <button *ngIf=\"configuration.optionBooleanAccessor('experimental.modals.show-split-transaction').value\" ion-item detail-none (click)=\"close(categoryPage.addSplitTransaction)\">New Split Transaction</button>\n      <button *ngIf=\"configuration.optionBooleanAccessor('experimental.modals.show-split-transaction').value\" ion-item detail-none (click)=\"close(categoryPage.addSplitTransfer)\">New Split Transfer</button>\n      <button ion-item detail-none (click)=\"close(categoryPage.addTransfer)\">Transfer Funds</button>\n    </ion-list>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_17__services_configuration_service__["a" /* Configuration */]])
    ], CategoryPopover);
    return CategoryPopover;
}());

//# sourceMappingURL=category.js.map

/***/ }),
/* 369 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrencyFormatter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_currency_format__ = __webpack_require__(370);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var CurrencyFormatter = (function () {
    function CurrencyFormatter() {
    }
    CurrencyFormatter.prototype.format = function (value) {
        // TODO: Use a currency format lib
        // TODO: replace cformat and others to use this service
        // TODO: This service can get the locale from config?, or also take into account the currency type
        return "$" + new __WEBPACK_IMPORTED_MODULE_1__components_currency_format__["a" /* CFormatPipe */]().price_format(value, false);
    };
    CurrencyFormatter = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], CurrencyFormatter);
    return CurrencyFormatter;
}());

//# sourceMappingURL=currency-formatter.js.map

/***/ }),
/* 370 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CFormatPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

//import {PriceFormat} from './price-Format';
var CFormatPipe = (function () {
    function CFormatPipe() {
        this.is_number = /[0-9]/;
        this.centsLimit = 2;
        this.clearOnEmpty = false;
        this.centsSeparator = ".";
        this.thousandsSeparator = ",";
        this.allowNegative = true;
        this.insertPlusSign = false;
        this.prefix = "";
        this.suffix = "";
    }
    CFormatPipe.prototype.transform = function (val, args) {
        var formattedVal = val;
        this.price_format(val, false);
        if (parseFloat(val) < 0) {
            formattedVal = '(' + formattedVal + ')';
        }
        return '$' + formattedVal;
    };
    CFormatPipe.prototype.to_numbers = function (str) {
        var formatted = '';
        for (var i = 0; i < (str.length); i++) {
            var char_ = str.charAt(i);
            if (formatted.length == 0 && char_ == 0)
                char_ = false;
            if (char_ && char_.match(this.is_number)) {
                //if (limit) {
                //    if (formatted.length < limit) formatted = formatted + char_;
                //}
                //else {
                formatted = formatted + char_;
                //}
            }
        }
        return formatted;
    };
    CFormatPipe.prototype.fill_with_zeroes = function (str) {
        while (str.length < (this.centsLimit + 1))
            str = '0' + str;
        return str;
    };
    CFormatPipe.prototype.price_format = function (str, ignore) {
        str = str + "";
        if (!ignore && (str === '' || str == this.price_format('0', true)) && this.clearOnEmpty)
            return '';
        // formatting settings
        var formatted = this.fill_with_zeroes(this.to_numbers(str));
        var thousandsFormatted = '';
        var thousandsCount = 0;
        var centsSeparator = this.centsSeparator;
        // Checking CentsLimit
        if (this.centsLimit == 0) {
            centsSeparator = "";
            centsVal = "";
        }
        // split integer from cents
        var centsVal = formatted.substr(formatted.length - this.centsLimit, this.centsLimit);
        var integerVal = formatted.substr(0, formatted.length - this.centsLimit);
        // apply cents pontuation
        formatted = (this.centsLimit == 0) ? integerVal : integerVal + centsSeparator + centsVal;
        // apply thousands pontuation
        if (this.thousandsSeparator) {
            for (var j = integerVal.length; j > 0; j--) {
                var char_ = integerVal.substr(j - 1, 1);
                thousandsCount++;
                if (thousandsCount % 3 == 0)
                    char_ = this.thousandsSeparator + char_;
                thousandsFormatted = char_ + thousandsFormatted;
            }
            //
            if (thousandsFormatted.substr(0, 1) == this.thousandsSeparator)
                thousandsFormatted = thousandsFormatted.substring(1, thousandsFormatted.length);
            formatted = (this.centsLimit == 0) ? thousandsFormatted : thousandsFormatted + centsSeparator + centsVal;
        }
        // if the string contains a dash, it is negative - add it to the begining (except for zero)
        if (this.allowNegative && (integerVal != 0 || centsVal != 0)) {
            if (str.indexOf('-') != -1 && str.indexOf('+') < str.indexOf('-')) {
                formatted = '-' + formatted;
            }
            else {
                if (!this.insertPlusSign)
                    formatted = '' + formatted;
                else
                    formatted = '+' + formatted;
            }
        }
        // apply the prefix
        if (this.prefix)
            formatted = this.prefix + formatted;
        // apply the suffix
        if (this.suffix)
            formatted = formatted + this.suffix;
        return formatted;
    };
    CFormatPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'cFormat'
        })
    ], CFormatPipe);
    return CFormatPipe;
}());

//# sourceMappingURL=currency-format.js.map

/***/ }),
/* 371 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitCategoryTransaction; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_transaction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__records_category__ = __webpack_require__(27);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var InitCategoryTransaction = (function (_super) {
    __extends(InitCategoryTransaction, _super);
    function InitCategoryTransaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InitCategoryTransaction.prototype.getTypeId = function () {
        return 'InitCategoryTransaction';
    };
    InitCategoryTransaction.prototype.apply = function (tp) {
        // TODO: Validation
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_category__["a" /* Category */]);
        var c = new __WEBPACK_IMPORTED_MODULE_1__records_category__["a" /* Category */]();
        c.id = this.id;
        c.name = this.categoryName;
        table.insert(c);
        tp.mapTransactionAndRecord(this, c);
    };
    InitCategoryTransaction.prototype.update = function (tp) {
        // TODO: Validation
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_category__["a" /* Category */]);
        var c = table.by('id', this.id);
        c.name = this.categoryName;
        table.update(c);
    };
    InitCategoryTransaction.prototype.undo = function (tp) {
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_category__["a" /* Category */]);
        var c = table.by('id', this.id);
        table.remove(c);
    };
    InitCategoryTransaction.prototype.deserialize = function (field, value) {
        return value;
    };
    InitCategoryTransaction.prototype.toHumanisedString = function (env) {
        if (env.action === 'apply') {
            return "created category " + this.categoryName;
        }
        else if (env.action === 'update') {
            return "renamed category {{old name}} to " + this.categoryName;
        }
        else {
            return "removed category " + this.categoryName;
        }
    };
    return InitCategoryTransaction;
}(__WEBPACK_IMPORTED_MODULE_0__db_transaction__["a" /* DbTransaction */]));

//# sourceMappingURL=init-category-transaction.js.map

/***/ }),
/* 372 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEditCategorySimpleWeeklyModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_records_category__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_records_transaction__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_transactions_init_category_simple_weekly_transaction__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_big_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AddEditCategorySimpleWeeklyModal = (function () {
    function AddEditCategorySimpleWeeklyModal(viewCtrl, navParams, dbms, nav) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.dbms = dbms;
        this.nav = nav;
        this.viewCtrl = viewCtrl;
        this.nav = nav;
        this.budget = dbms.getDb(navParams.data.budgetId);
        this.category = this.budget.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_1__data_records_category__["a" /* Category */]).by('id', navParams.data.categoryId);
        this.transaction = this.budget.transactionProcessor.findTransactionsForRecord(this.category, __WEBPACK_IMPORTED_MODULE_4__data_transactions_init_category_simple_weekly_transaction__["a" /* InitCategorySimpleWeeklyTransaction */])[0];
        this.balanceDate = __WEBPACK_IMPORTED_MODULE_6__services_utils__["a" /* Utils */].nowIonic();
        if (!this.transaction) {
            this.transaction = new __WEBPACK_IMPORTED_MODULE_4__data_transactions_init_category_simple_weekly_transaction__["a" /* InitCategorySimpleWeeklyTransaction */]();
            this.transaction.categoryId = this.category.id;
        }
        else {
            this.balance = this.category.balance;
            this.weeklyAmount = this.transaction.weeklyAmount;
        }
    }
    AddEditCategorySimpleWeeklyModal.prototype.submit = function (event) {
        event.preventDefault();
        // TODO: Get the sum of transactions with date of TODAY
        // Subtract from the balance here
        this.transaction.balanceDate = __WEBPACK_IMPORTED_MODULE_6__services_utils__["a" /* Utils */].toYYYYMMDDFromIonic(this.balanceDate);
        var todaysTotal = this.budget.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_2__data_records_transaction__["a" /* Transaction */]).chain()
            .find({ 'categoryId': this.category.id }).find({ 'date': { '$gte': this.transaction.balanceDate } }).mapReduce(function (t) { return t.amount; }, function (tt) { return tt.length === 0 ? new __WEBPACK_IMPORTED_MODULE_7_big_js__["Big"](0) : tt.reduce(function (a, b) { return a.plus(b); }); });
        this.transaction.balance = new __WEBPACK_IMPORTED_MODULE_7_big_js__["Big"](this.balance).plus(todaysTotal);
        this.transaction.weeklyAmount = new __WEBPACK_IMPORTED_MODULE_7_big_js__["Big"](this.weeklyAmount);
        this.budget.applyTransaction(this.transaction);
        this.viewCtrl.dismiss();
    };
    AddEditCategorySimpleWeeklyModal.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    AddEditCategorySimpleWeeklyModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\modals\add-edit-category-simple-weekly\add-edit-category-simple-weekly.html"*/'<ion-header>\n\n    <ion-toolbar>\n\n    <ion-buttons start>\n\n        <button ion-button (click)="cancel()">Cancel</button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>Category Settings</ion-title>\n\n\n\n    <ion-buttons end>\n\n        <button ion-button (click)="submit($event)" [disabled]="!form.valid">Save</button>\n\n    </ion-buttons>\n\n\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content responsive-padding>\n\n    <form #form="ngForm" (submit)="submit($event)">\n\n        <ion-item>\n\n            <ion-label>Balance</ion-label>\n\n            <ion-input currency-field name="balance" [(ngModel)]="balance" required></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-label>Weekly Amount</ion-label>\n\n            <ion-input currency-field name="weeklyAmount" [(ngModel)]="weeklyAmount" required></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-label>Balance Date</ion-label>\n\n                <ion-datetime displayFormat="MMM D, YYYY" pickerFormat="MMM D YYYY" name="balanceDate" [(ngModel)]="balanceDate"></ion-datetime>\n\n        </ion-item>\n\n    </form>\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\modals\add-edit-category-simple-weekly\add-edit-category-simple-weekly.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */]])
    ], AddEditCategorySimpleWeeklyModal);
    return AddEditCategorySimpleWeeklyModal;
}());

//# sourceMappingURL=add-edit-category-simple-weekly.js.map

/***/ }),
/* 373 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Processor; });
var Processor = (function () {
    function Processor() {
    }
    return Processor;
}());

//# sourceMappingURL=processor.js.map

/***/ }),
/* 374 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitSimpleTransaction; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_transaction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__records_transaction__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_big_js__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var InitSimpleTransaction = (function (_super) {
    __extends(InitSimpleTransaction, _super);
    function InitSimpleTransaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InitSimpleTransaction.prototype.getTypeId = function () {
        return 'InitSimpleTransaction';
    };
    InitSimpleTransaction.prototype.apply = function (tp) {
        // TODO: Validation
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_transaction__["a" /* Transaction */]);
        var t = new __WEBPACK_IMPORTED_MODULE_1__records_transaction__["a" /* Transaction */]();
        t.id = this.id * 100000;
        t.amount = this.amount;
        t.date = this.date;
        t.description = this.description;
        t.categoryId = this.categoryId;
        table.insert(t);
        tp.mapTransactionAndRecord(this, t);
    };
    InitSimpleTransaction.prototype.update = function (tp) {
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_transaction__["a" /* Transaction */]);
        var t = table.by('id', (this.id * 100000));
        t.amount = this.amount;
        t.date = this.date;
        t.description = this.description;
        t.categoryId = this.categoryId;
        table.update(t);
    };
    InitSimpleTransaction.prototype.undo = function (tp) {
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_transaction__["a" /* Transaction */]);
        var c = table.by('id', (this.id * 100000));
        table.remove(c);
    };
    InitSimpleTransaction.prototype.deserialize = function (field, value) {
        if (field === 'amount')
            return new __WEBPACK_IMPORTED_MODULE_2_big_js__["Big"](value);
        return value;
    };
    InitSimpleTransaction.prototype.toHumanisedString = function (env) {
        var total = env.currencyFormatter(this.amount);
        if (env.action === 'apply') {
            return this.description + " of " + total;
        }
        else if (env.action === 'update') {
            return this.description + " to " + total;
        }
        else {
            return this.description + " of " + total;
        }
    };
    return InitSimpleTransaction;
}(__WEBPACK_IMPORTED_MODULE_0__db_transaction__["a" /* DbTransaction */]));

//# sourceMappingURL=init-simple-transaction.js.map

/***/ }),
/* 375 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateSplitTransaction; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_transaction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__records_transaction__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_big_js__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var CreateSplitTransaction = (function (_super) {
    __extends(CreateSplitTransaction, _super);
    function CreateSplitTransaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateSplitTransaction.prototype.getTypeId = function () {
        return 'CreateSplitTransaction';
    };
    CreateSplitTransaction.prototype.apply = function (tp) {
        // TODO: Validation
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_transaction__["a" /* Transaction */]);
        // In the records, keep a list to all the other records, cached...
        // TODO: Change this to a transaction group record?, can keep the total, etc on there, rather than just an array and totals in the cache if needed ?
        // TODO: Also, technically, this shouldn't be in the cache. it can be well defined here and is always available...
        var transactions = new Array();
        for (var i = 0; i < this.amounts.length; i++) {
            var t = new __WEBPACK_IMPORTED_MODULE_1__records_transaction__["a" /* Transaction */]();
            t.id = this.id * 100000 + i;
            t.amount = this.amounts[i].amount;
            t.date = this.amounts[i].date || this.date;
            t.description = this.description;
            t.categoryId = this.amounts[i].categoryId;
            t.accountId = this.amounts[i].accountId;
            t.x.transactions = transactions;
            t.status = this.amounts[i].status || this.status;
            transactions.push(t);
            table.insert(t);
            tp.mapTransactionAndRecord(this, t);
        }
    };
    CreateSplitTransaction.prototype.update = function (tp) {
        // Just remove everything and add it all again
        // TODO: This won't handle triggering certain category recalcs (but at the moment that doesn't matter...)
        this.undo(tp);
        this.apply(tp);
    };
    CreateSplitTransaction.prototype.undo = function (tp) {
        var _this = this;
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_transaction__["a" /* Transaction */]);
        tp.findAllRecordsForTransaction(this).slice().forEach(function (t) {
            table.remove(t);
            tp.unmapTransactionAndRecord(_this, t);
        });
    };
    CreateSplitTransaction.prototype.deserialize = function (field, value) {
        if (field === 'amounts') {
            value.forEach(function (line) {
                line.amount = new __WEBPACK_IMPORTED_MODULE_2_big_js__["Big"](line.amount);
            });
        }
        return value;
    };
    CreateSplitTransaction.prototype.toHumanisedString = function (env) {
        var total = env.currencyFormatter(this.amounts.map(function (l) { return l.amount; }).reduce(function (a, b) { return a.plus(b); }));
        if (env.action === 'apply') {
            return "Added " + this.description + " of " + total;
        }
        else if (env.action === 'update') {
            return "Updated " + this.description + " to " + total;
        }
        else {
            return "Deleted " + this.description + " of " + total;
        }
    };
    return CreateSplitTransaction;
}(__WEBPACK_IMPORTED_MODULE_0__db_transaction__["a" /* DbTransaction */]));

//# sourceMappingURL=create-split-transaction.js.map

/***/ }),
/* 376 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEditSplitTransactionLineModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddEditSplitTransactionLineModal = (function () {
    function AddEditSplitTransactionLineModal(configuration, viewCtrl, navParams, dbms, nav, alertController) {
        this.configuration = configuration;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.dbms = dbms;
        this.nav = nav;
        this.alertController = alertController;
        this.parent = navParams.data.parent;
        this.engine = this.parent.engine;
        this.lineIndex = navParams.data.lineIndex;
        this.line = navParams.data.parent.data.lines[this.lineIndex];
    }
    AddEditSplitTransactionLineModal.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (this.line.categoryId == null) {
            this.showCategorySelect().onDidDismiss(function () {
                if (_this.line.categoryId == null)
                    _this.viewCtrl.dismiss();
            });
        }
        this.viewCtrl.onDidDismiss(function () {
            if (_this.line.categoryId == null) {
                _this.parent.data.lines.splice(_this.parent.data.lines.indexOf(_this.line), 1);
            }
        });
    };
    AddEditSplitTransactionLineModal.prototype.showCategorySelect = function () {
        var _this = this;
        var alert = this.alertController.create();
        this.engine.getCategories('alphabetical').forEach(function (category) {
            if (!_this.parent.data.lines.some(function (line) { return line !== _this.line && line.categoryId === category.id; }))
                alert.addInput({ type: 'radio', label: category.name, value: category.id.toString(), checked: category.id === _this.line.categoryId });
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'Ok',
            handler: function (data) {
                _this.line.categoryId = Number(data);
            }
        });
        alert.present();
        return alert;
    };
    AddEditSplitTransactionLineModal.prototype.submit = function (event) {
        event.preventDefault();
        this.viewCtrl.dismiss();
    };
    /*---- Reconciliation ---- */
    AddEditSplitTransactionLineModal.prototype.unreconciledAndThisReconciledBankTransactions = function () {
        return [];
    };
    AddEditSplitTransactionLineModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\modals\add-edit-split-transaction\add-edit-split-transaction-line.html"*/'<ion-content>\n\n    <div responsive-padding>\n\n        <form (submit)="submit($event)" novalidate #form="ngForm">\n\n            <ion-card>\n\n                Category: {{engine.getCategory(line.categoryId)?.name}}\n\n            </ion-card>\n\n            <ion-item *ngIf="configuration.optionBooleanAccessor(\'experimental.accounts.enabled\').value && engine.getAccounts().length > 0">\n\n                <ion-label>Account (TODO: Lock this to reconciled account</ion-label>\n\n                <ion-select required name="account" [(ngModel)]="line.accountId">\n\n                    <ion-option value="">&lt;No Account&gt;</ion-option>\n\n                    <ion-option *ngFor="let account of engine.getAccounts()" value="{{account.id}}">{{account.name}}</ion-option>    \n\n                </ion-select>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Amount</ion-label>\n\n                <ion-input currency-field required name="amount" [(ngModel)]="line.amount" [attr.autofocus]="editing ? null : true"></ion-input>\n\n            </ion-item>\n\n            <button ion-button block type="submit">Ok</button>\n\n        </form>\n\n    </div>\n\n    <button ion-button type="button" *ngIf="editing" color="danger" clear small (click)="deleteLineConfirm()">Delete</button>\n\n\n\n    <ion-list>\n\n        <ion-list-header>\n\n            Reconciliation\n\n        </ion-list-header>\n\n        <button ion-item [class.reconcile-selected]="reconcileSelected(t)" type="button" *ngFor="let b of unreconciledAndThisReconciledBankTransactions()" (click)="toggleBankTransactionSelection(b)">\n\n            <ion-label>{{b.description}}</ion-label>\n\n            <currency-display item-right [value]="reconcileAmount(b)"></currency-display>\n\n        </button>\n\n    </ion-list>\n\n\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\modals\add-edit-split-transaction\add-edit-split-transaction-line.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */]])
    ], AddEditSplitTransactionLineModal);
    return AddEditSplitTransactionLineModal;
}());

//# sourceMappingURL=add-edit-split-transaction-line.js.map

/***/ }),
/* 377 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateSplitTransfer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_transaction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__records_transaction__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_big_js__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var CreateSplitTransfer = (function (_super) {
    __extends(CreateSplitTransfer, _super);
    function CreateSplitTransfer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateSplitTransfer.prototype.getTypeId = function () {
        return 'CreateSplitTransfer';
    };
    CreateSplitTransfer.prototype.apply = function (tp) {
        // TODO: Validation
        // TODO: If multiple accounts, then only a single amount & category
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_transaction__["a" /* Transaction */]);
        var transactions = new Array();
        var total = new __WEBPACK_IMPORTED_MODULE_2_big_js__["Big"]('0');
        var description = this.description == null || this.description.trim().length == 0 ? 'Transfer' : this.description;
        for (var i = 0; i < this.amounts.length; i++) {
            var t_1 = new __WEBPACK_IMPORTED_MODULE_1__records_transaction__["a" /* Transaction */]();
            t_1.id = this.id * 100000 + i + 1;
            t_1.amount = this.amounts[i].amount;
            total = total.plus(t_1.amount);
            t_1.date = this.date;
            t_1.description = description;
            t_1.categoryId = this.amounts[i].categoryId;
            t_1.accountId = this.accountId2 || this.accountId;
            t_1.x.transactions = transactions;
            t_1.x.type = "Transfer"; // TODO: By convention the type shouldn't be in the cache?
            transactions.push(t_1);
            table.insert(t_1);
            tp.mapTransactionAndRecord(this, t_1);
        }
        var t = new __WEBPACK_IMPORTED_MODULE_1__records_transaction__["a" /* Transaction */]();
        t.id = this.id * 100000;
        t.amount = total.times(-1);
        t.date = this.date;
        t.description = description;
        t.categoryId = this.categoryId;
        t.accountId = this.accountId;
        t.x.transactions = transactions;
        t.x.type = "Transfer";
        transactions.push(t);
        table.insert(t);
        tp.mapTransactionAndRecord(this, t);
    };
    CreateSplitTransfer.prototype.update = function (tp) {
        // Just remove everything and add it all again
        // TODO: This won't handle triggering certain category recalcs (but at the moment that doesn't matter...)
        this.undo(tp);
        this.apply(tp);
    };
    CreateSplitTransfer.prototype.undo = function (tp) {
        var _this = this;
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_transaction__["a" /* Transaction */]);
        tp.findAllRecordsForTransaction(this).slice().forEach(function (t) {
            table.remove(t);
            tp.unmapTransactionAndRecord(_this, t);
        });
    };
    CreateSplitTransfer.prototype.deserialize = function (field, value) {
        if (field === 'amounts') {
            value.forEach(function (line) {
                line.amount = new __WEBPACK_IMPORTED_MODULE_2_big_js__["Big"](line.amount);
            });
        }
        return value;
    };
    CreateSplitTransfer.prototype.toHumanisedString = function (env) {
        var total = env.currencyFormatter(this.amounts.map(function (l) { return l.amount; }).reduce(function (a, b) { return a.plus(b); }));
        if (env.action === 'apply') {
            return "Added " + this.description + " of " + total;
        }
        else if (env.action === 'update') {
            return "Updated " + this.description + " to " + total;
        }
        else {
            return "Deleted " + this.description + " of " + total;
        }
    };
    return CreateSplitTransfer;
}(__WEBPACK_IMPORTED_MODULE_0__db_transaction__["a" /* DbTransaction */]));

//# sourceMappingURL=create-split-transfer.js.map

/***/ }),
/* 378 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEditSplitTransferLineModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddEditSplitTransferLineModal = (function () {
    function AddEditSplitTransferLineModal(configuration, viewCtrl, navParams, dbms, nav, alertController) {
        this.configuration = configuration;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.dbms = dbms;
        this.nav = nav;
        this.alertController = alertController;
        this.parent = navParams.data.parent;
        this.engine = this.parent.engine;
        this.lineIndex = navParams.data.lineIndex;
        this.line = navParams.data.parent.data.lines[this.lineIndex];
    }
    AddEditSplitTransferLineModal.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (this.line.categoryId == null) {
            this.showCategorySelect().onDidDismiss(function () {
                if (_this.line.categoryId == null)
                    _this.viewCtrl.dismiss();
            });
        }
        this.viewCtrl.onDidDismiss(function () {
            if (_this.line.categoryId == null) {
                _this.parent.data.lines.splice(_this.parent.data.lines.indexOf(_this.line), 1);
            }
        });
    };
    AddEditSplitTransferLineModal.prototype.showCategorySelect = function () {
        var _this = this;
        var alert = this.alertController.create();
        this.engine.getCategories('alphabetical').forEach(function (category) {
            if (!_this.parent.data.lines.some(function (line) { return line !== _this.line && line.categoryId === category.id; }))
                alert.addInput({ type: 'radio', label: category.name, value: category.id.toString(), checked: category.id === _this.line.categoryId });
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'Ok',
            handler: function (data) {
                _this.line.categoryId = Number(data);
            }
        });
        alert.present();
        return alert;
    };
    AddEditSplitTransferLineModal.prototype.submit = function (event) {
        event.preventDefault();
        this.viewCtrl.dismiss();
    };
    AddEditSplitTransferLineModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\modals\add-edit-split-transfer\add-edit-split-transfer-line.html"*/'<ion-content>\n\n    <div responsive-padding>\n\n        <form (submit)="submit($event)" novalidate #form="ngForm">\n\n            <ion-card>\n\n                Category: {{engine.getCategory(line.categoryId)?.name}}\n\n            </ion-card>\n\n            <ion-item>\n\n                <ion-label>Amount</ion-label>\n\n                <ion-input currency-field required name="amount" [(ngModel)]="line.amount" [attr.autofocus]="editing ? null : true"></ion-input>\n\n            </ion-item>\n\n        </form>\n\n    </div>\n\n    <button ion-button type="button" *ngIf="editing" color="danger" clear small (click)="deleteLineConfirm()">Delete</button>\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\modals\add-edit-split-transfer\add-edit-split-transfer-line.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */]])
    ], AddEditSplitTransferLineModal);
    return AddEditSplitTransferLineModal;
}());

//# sourceMappingURL=add-edit-split-transfer-line.js.map

/***/ }),
/* 379 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitCategoryTransferTransaction; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_transaction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__records_transaction__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_big_js__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var InitCategoryTransferTransaction = (function (_super) {
    __extends(InitCategoryTransferTransaction, _super);
    function InitCategoryTransferTransaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InitCategoryTransferTransaction.prototype.getTypeId = function () {
        return 'InitCategoryTransferTransaction';
    };
    InitCategoryTransferTransaction.prototype.apply = function (tp) {
        // TODO: Validation
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_transaction__["a" /* Transaction */]);
        var t1 = new __WEBPACK_IMPORTED_MODULE_1__records_transaction__["a" /* Transaction */]();
        var t2 = new __WEBPACK_IMPORTED_MODULE_1__records_transaction__["a" /* Transaction */]();
        t1.id = this.id * 100000;
        t2.id = -this.id * 100000;
        t1.amount = this.amount;
        t2.amount = this.amount.times('-1');
        t1.date = this.date;
        t2.date = this.date;
        t1.description = this.description ? this.description : 'Transfer';
        t2.description = this.description ? this.description : 'Transfer';
        t1.x.type = "Transfer"; // TODO: By convention the type shouldn't be in the cache...
        t2.x.type = "Transfer";
        t1.x.transfer = t2; // TODO: By convention the linked transfer shouldn't be in the cache...
        t2.x.transfer = t1;
        t1.categoryId = this.fromCategoryId;
        t2.categoryId = this.toCategoryId;
        table.insert(t1);
        table.insert(t2);
        tp.mapTransactionAndRecord(this, t1);
        tp.mapTransactionAndRecord(this, t2);
    };
    InitCategoryTransferTransaction.prototype.update = function (tp) {
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_transaction__["a" /* Transaction */]);
        var t1 = table.by('id', (this.id * 100000));
        var t2 = table.by('id', -(this.id * 100000));
        t1.amount = this.amount;
        t2.amount = this.amount.times('-1');
        t1.date = this.date;
        t2.date = this.date;
        t1.description = this.description ? this.description : 'Transfer';
        t2.description = this.description ? this.description : 'Transfer';
        t1.categoryId = this.fromCategoryId;
        t2.categoryId = this.toCategoryId;
        table.update(t1);
        table.update(t2);
    };
    InitCategoryTransferTransaction.prototype.undo = function (tp) {
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_transaction__["a" /* Transaction */]);
        var t1 = table.by('id', (this.id * 100000));
        var t2 = table.by('id', -(this.id * 100000));
        table.remove(t1);
        table.remove(t2);
    };
    InitCategoryTransferTransaction.prototype.deserialize = function (field, value) {
        if (field === 'amount')
            return new __WEBPACK_IMPORTED_MODULE_2_big_js__["Big"](value);
        return value;
    };
    InitCategoryTransferTransaction.prototype.toHumanisedString = function (env) {
        var total = env.currencyFormatter(this.amount);
        if (env.action === 'apply') {
            return "transferred " + total + " from a to b";
        }
        else if (env.action === 'update') {
            return "ammended transfer from a to b " + " to " + total; // TODO: What aspect was updated ?
        }
        else {
            return this.description + " of " + total;
        }
    };
    return InitCategoryTransferTransaction;
}(__WEBPACK_IMPORTED_MODULE_0__db_transaction__["a" /* DbTransaction */]));

//# sourceMappingURL=init-category-transfer-transaction.js.map

/***/ }),
/* 380 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateAccountTransaction; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_transaction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__records_account__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__processors_account_balance__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_big_js__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var CreateAccountTransaction = (function (_super) {
    __extends(CreateAccountTransaction, _super);
    function CreateAccountTransaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateAccountTransaction.prototype.getTypeId = function () {
        return 'CreateAccountTransaction';
    };
    CreateAccountTransaction.prototype.apply = function (tp) {
        // TODO: Validation
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_account__["a" /* Account */]);
        var a = new __WEBPACK_IMPORTED_MODULE_1__records_account__["a" /* Account */]();
        a.id = this.id;
        a.name = this.name;
        a.initialBalance = this.initialBalance;
        a.accountType = this.accountType;
        a.bankLinkId = this.bankLinkId;
        a.bankLinkConfiguration = this.bankLinkConfiguration;
        a.processors.push(new __WEBPACK_IMPORTED_MODULE_2__processors_account_balance__["a" /* AccountBalanceProcessor */](a));
        table.insert(a);
        tp.mapTransactionAndRecord(this, a);
    };
    CreateAccountTransaction.prototype.update = function (tp) {
        // TODO: Validation
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_account__["a" /* Account */]);
        var a = table.by('id', this.id);
        a.name = this.name;
        a.initialBalance = this.initialBalance;
        a.accountType = this.accountType;
        a.bankLinkId = this.bankLinkId;
        a.bankLinkConfiguration = this.bankLinkConfiguration;
        table.update(a);
    };
    CreateAccountTransaction.prototype.undo = function (tp) {
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_account__["a" /* Account */]);
        var a = table.by('id', this.id);
        table.remove(a);
    };
    CreateAccountTransaction.prototype.deserialize = function (field, value) {
        if (field === 'initialBalance' && value != null)
            return new __WEBPACK_IMPORTED_MODULE_3_big_js__["Big"](value);
        if (field === 'bankDetails' && value != null) {
            if (value.openingBankBalance != null)
                value.openingBankBalance = new __WEBPACK_IMPORTED_MODULE_3_big_js__["Big"](value.openingBankBalance);
        }
        return value;
    };
    CreateAccountTransaction.prototype.toHumanisedString = function (env) {
        if (env.action === 'apply') {
            return "created account " + this.name;
        }
        else if (env.action === 'update') {
            return "renamed account {{old name}} to " + this.name;
        }
        else {
            return "removed account " + this.name;
        }
    };
    return CreateAccountTransaction;
}(__WEBPACK_IMPORTED_MODULE_0__db_transaction__["a" /* DbTransaction */]));

//# sourceMappingURL=create-account-transaction.js.map

/***/ }),
/* 381 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MergeBankTransactions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_transaction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__records_bank_transaction__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__records_account__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_big_js__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var MergeBankTransactions = (function (_super) {
    __extends(MergeBankTransactions, _super);
    function MergeBankTransactions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MergeBankTransactions.prototype.getTypeId = function () {
        return 'MergeBankTransactions';
    };
    MergeBankTransactions.prototype.apply = function (tp) {
        // TODO: Validation
        // Validate checksum, otherwise error... ? (or just skip it ?)
        if (!this.validateChecksum(tp)) {
            __WEBPACK_IMPORTED_MODULE_3__services_logger__["a" /* Logger */].get('MergeBankTransactions').info("Invalid checksum in applying MergeBankTransactions... skipping");
            return;
        }
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_bank_transaction__["a" /* BankTransaction */]);
        if (this.inserts) {
            for (var i = 0; i < this.inserts.length; i++) {
                var t = new __WEBPACK_IMPORTED_MODULE_1__records_bank_transaction__["a" /* BankTransaction */]();
                t.id = this.id * 100000 + i;
                t.amount = this.inserts[i].amount;
                t.date = this.inserts[i].date;
                t.description = this.inserts[i].description;
                t.status = this.inserts[i].status;
                t.accountId = this.accountId;
                t.balance = this.inserts[i].balance;
                t.balanceSequence = this.inserts[i].balanceSequence;
                table.insert(t);
                tp.mapTransactionAndRecord(this, t);
            }
        }
        if (this.upgrades) {
            for (var i = 0; i < this.upgrades.length; i++) {
                var t = table.by('id', this.upgrades[i].bankTransactionId);
                t.balance = this.upgrades[i].balance;
                t.balanceSequence = this.upgrades[i].balanceSequence;
                t.amount = this.upgrades[i].amount;
                t.date = this.upgrades[i].date;
                t.description = this.upgrades[i].description;
                t.status = this.upgrades[i].status;
                t.accountId = this.accountId;
                // TODO: upgrade date / change log push to record
                table.update(t);
            }
        }
        if (this.flags) {
            for (var i = 0; i < this.flags.length; i++) {
                var t = table.by('id', this.flags[i].bankTransactionId);
                var flagName = this.flags[i].flag;
                t['flag' + flagName.substring(0, 1).toUpperCase() + flagName.substring(1)] = this.flags[i].set;
                // TODO: upgrade date / change log push to record
                table.update(t);
            }
        }
        // TODO: Move this to be a processor
        var openingBankBalance = tp.table(__WEBPACK_IMPORTED_MODULE_2__records_account__["a" /* Account */]).by('id', this.accountId).x.openingBankBalance || new __WEBPACK_IMPORTED_MODULE_4_big_js__["Big"]('0');
        var accountData = table.chain().find({ 'accountId': this.accountId }).data().filter(function (t) { return !t.flagRemoved; });
        var maxBalanceSequenceRecord = accountData.find(function (t) { return t.balanceSequence === Math.max.apply(null, accountData.filter(function (t) { return t.balanceSequence; }).map(function (t) { return t.balanceSequence; })); });
        var minBalanceSequenceRecord = accountData.find(function (t) { return t.balanceSequence === Math.min.apply(null, accountData.filter(function (t) { return t.balanceSequence; }).map(function (t) { return t.balanceSequence; })); });
        tp.table(__WEBPACK_IMPORTED_MODULE_2__records_account__["a" /* Account */]).by('id', this.accountId).x.calculatedBankBalance = accountData.filter(function (t) { return t.status !== 'authorised'; }).reduce(function (a, b) { return a.plus(b.amount); }, openingBankBalance);
        tp.table(__WEBPACK_IMPORTED_MODULE_2__records_account__["a" /* Account */]).by('id', this.accountId).x.calculatedBankAvailableBalance = accountData.reduce(function (a, b) { return a.plus(b.amount); }, openingBankBalance);
        tp.table(__WEBPACK_IMPORTED_MODULE_2__records_account__["a" /* Account */]).by('id', this.accountId).x.calculatedBankProcessedBalance = accountData.filter(function (t) { return t.status === 'processed'; }).reduce(function (a, b) { return a.plus(b.amount); }, openingBankBalance);
        tp.table(__WEBPACK_IMPORTED_MODULE_2__records_account__["a" /* Account */]).by('id', this.accountId).x.bankBalance = this.accountBalance;
        tp.table(__WEBPACK_IMPORTED_MODULE_2__records_account__["a" /* Account */]).by('id', this.accountId).x.bankAvailableBalance = this.accountAvailableBalance;
        tp.table(__WEBPACK_IMPORTED_MODULE_2__records_account__["a" /* Account */]).by('id', this.accountId).x.bankProcessedBalance = maxBalanceSequenceRecord ? maxBalanceSequenceRecord.balance : undefined;
        tp.table(__WEBPACK_IMPORTED_MODULE_2__records_account__["a" /* Account */]).by('id', this.accountId).x.openingBankProcessedBalance = minBalanceSequenceRecord ? minBalanceSequenceRecord.balance : undefined;
        tp.table(__WEBPACK_IMPORTED_MODULE_2__records_account__["a" /* Account */]).by('id', this.accountId).x.bankBalanceTimestamp = this.timestamp;
        // TODO: Could compare calculated balance vs bank balance for each processed to make sure records are consistent and correct and find where an error, duplicate or missing record may exist
    };
    MergeBankTransactions.prototype.validateChecksum = function (tp) {
        var _this = this;
        if (!this.checksum || this.checksum.indexOf('_') > 0)
            return true;
        // TODO: Make this more efficient than filtering all transactions... every time ?!?
        var bankMergeTransactionsHistory = tp.db.sortedTransactions.data().filter(function (t) { return t.typeId === _this.typeId && t.accountId === _this.accountId && t.id < _this.id; });
        var checksum = '0';
        bankMergeTransactionsHistory.forEach(function (t) {
            checksum = _this.hashCode(t.id + checksum) + '';
        });
        return this.checksum === checksum;
        //let allData = tp.table(BankTransaction).chain().find({'accountId': <any> this.accountId}).data().filter(t => t.id < this.id * 100000);
        //let checksum = allData.filter(t => t.status === 'processed').length + "_" + allData.filter(t => t.status === 'authorised').length + "_" + allData.filter(t => t.status === 'recent').length;
        //return this.checksum === checksum;
    };
    MergeBankTransactions.prototype.hashCode = function (str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = ~~(((hash << 5) - hash) + str.charCodeAt(i));
        }
        return hash;
    };
    MergeBankTransactions.prototype.generateChecksum = function (tp) {
        var _this = this;
        var bankMergeTransactionsHistory = tp.db.sortedTransactions.data().filter(function (t) { return t.typeId === _this.typeId && t.accountId === _this.accountId; });
        var checksum = '0';
        bankMergeTransactionsHistory.forEach(function (t) {
            checksum = _this.hashCode(t.id + checksum) + '';
        });
        this.checksum = checksum;
        //let allData = tp.table(BankTransaction).chain().find({'accountId': <any> this.accountId}).data();
        //this.checksum = allData.filter(t => t.status === 'processed').length + "_" + allData.filter(t => t.status === 'authorised').length + "_" + allData.filter(t => t.status === 'recent').length;
    };
    MergeBankTransactions.prototype.update = function (tp) {
        tp.unsupported();
    };
    MergeBankTransactions.prototype.undo = function (tp) {
        tp.unsupported(); // This will need to be undone by re-running from last snapshot rather than rolling back
    };
    MergeBankTransactions.prototype.deserialize = function (field, value) {
        if (field === 'inserts' || field === 'upgrades') {
            value.forEach(function (line) {
                line.amount = new __WEBPACK_IMPORTED_MODULE_4_big_js__["Big"](line.amount);
                line.balance = line.balance == null ? undefined : new __WEBPACK_IMPORTED_MODULE_4_big_js__["Big"](line.balance);
            });
        }
        if (field === 'accountBalance' || field === 'accountAvailableBalance')
            value = new __WEBPACK_IMPORTED_MODULE_4_big_js__["Big"](value);
        return value;
    };
    MergeBankTransactions.prototype.toHumanisedString = function (env) {
        if (env.action === 'apply') {
            return "New bank transactions synced";
        }
        else if (env.action === 'update') {
            return '';
        }
        else {
            return '';
        }
    };
    return MergeBankTransactions;
}(__WEBPACK_IMPORTED_MODULE_0__db_transaction__["a" /* DbTransaction */]));

//# sourceMappingURL=merge-bank-transactions.js.map

/***/ }),
/* 382 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateTransactionReconciliation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_transaction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_big_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__records_transaction_reconciliation__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__records_transaction__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__records_bank_transaction__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_logger__ = __webpack_require__(7);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var CreateTransactionReconciliation = (function (_super) {
    __extends(CreateTransactionReconciliation, _super);
    function CreateTransactionReconciliation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateTransactionReconciliation.prototype.getTypeId = function () {
        return 'CreateTransactionReconciliation';
    };
    CreateTransactionReconciliation.prototype.apply = function (tp) {
        // TODO: Validation
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_2__records_transaction_reconciliation__["a" /* TransactionReconciliation */]);
        var t = new __WEBPACK_IMPORTED_MODULE_2__records_transaction_reconciliation__["a" /* TransactionReconciliation */]();
        t.id = this.id * 100000;
        t.amount = this.amount;
        t.transactionId = this.transactionId;
        t.bankTransactionId = this.bankTransactionId;
        t.transactionAmountOverride = this.transactionAmountOverride;
        var transactionTable = tp.table(__WEBPACK_IMPORTED_MODULE_3__records_transaction__["a" /* Transaction */]);
        var transaction = transactionTable.by('id', this.transactionId);
        if (transaction == null) {
            __WEBPACK_IMPORTED_MODULE_5__services_logger__["a" /* Logger */].get('create-transaction-reconciliation').info('Trying to reconcile against deleted transaction. Skipping.');
            return;
        }
        if (!transaction.x.reconciliationRecords)
            transaction.x.reconciliationRecords = [];
        transaction.x.reconciliationRecords.push(t);
        var bankTransactionTable = tp.table(__WEBPACK_IMPORTED_MODULE_4__records_bank_transaction__["a" /* BankTransaction */]);
        var bankTransaction = bankTransactionTable.by('id', this.bankTransactionId);
        if (bankTransaction == null) {
            __WEBPACK_IMPORTED_MODULE_5__services_logger__["a" /* Logger */].get('create-transaction-reconciliation').info('Trying to reconcile against deleted bank transaction. Skipping.');
            return;
        }
        if (!bankTransaction.x.reconciliationRecords)
            bankTransaction.x.reconciliationRecords = [];
        bankTransaction.x.reconciliationRecords.push(t);
        this.updateBankTransactionReconciliationFlags(bankTransaction);
        bankTransactionTable.update(bankTransaction);
        if (this.transactionAmountOverride)
            transaction.amount = this.amount;
        transaction.accountId = bankTransaction.accountId;
        this.updateTransactionReconciliationFlags(transaction);
        transactionTable.update(transaction);
        table.insert(t);
        tp.mapTransactionAndRecord(this, t);
    };
    CreateTransactionReconciliation.prototype.update = function (tp) {
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_2__records_transaction_reconciliation__["a" /* TransactionReconciliation */]);
        var t = table.by('id', (this.id * 100000));
        if (t.transactionId !== this.transactionId || t.bankTransactionId !== this.bankTransactionId) {
            tp.unsupported();
        }
        t.amount = this.amount;
        t.transactionAmountOverride = this.transactionAmountOverride;
        var transactionTable = tp.table(__WEBPACK_IMPORTED_MODULE_3__records_transaction__["a" /* Transaction */]);
        var transaction = transactionTable.by('id', this.transactionId);
        var bankTransactionTable = tp.table(__WEBPACK_IMPORTED_MODULE_4__records_bank_transaction__["a" /* BankTransaction */]);
        var bankTransaction = bankTransactionTable.by('id', this.bankTransactionId);
        this.updateBankTransactionReconciliationFlags(bankTransaction);
        bankTransactionTable.update(bankTransaction);
        if (this.transactionAmountOverride)
            transaction.amount = this.amount;
        // TODO: undoing the transactionAmountOverride needs to re-instate the initial amount from the initial transaction
        transaction.accountId = bankTransaction.accountId;
        this.updateTransactionReconciliationFlags(transaction);
        transactionTable.update(transaction);
        table.update(t);
    };
    CreateTransactionReconciliation.prototype.undo = function (tp) {
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_2__records_transaction_reconciliation__["a" /* TransactionReconciliation */]);
        var t = table.by('id', (this.id * 100000));
        table.remove(t);
        var transactionTable = tp.table(__WEBPACK_IMPORTED_MODULE_3__records_transaction__["a" /* Transaction */]);
        var transaction = transactionTable.by('id', this.transactionId);
        transaction.x.reconciliationRecords.splice(transaction.x.reconciliationRecords.indexOf(t), 1);
        this.updateTransactionReconciliationFlags(transaction);
        transactionTable.update(transaction);
        var bankTransactionTable = tp.table(__WEBPACK_IMPORTED_MODULE_4__records_bank_transaction__["a" /* BankTransaction */]);
        var bankTransaction = bankTransactionTable.by('id', this.bankTransactionId);
        bankTransaction.x.reconciliationRecords.splice(bankTransaction.x.reconciliationRecords.indexOf(t), 1);
        this.updateBankTransactionReconciliationFlags(bankTransaction);
        bankTransactionTable.update(bankTransaction);
        // TODO: undoing the transactionAmountOverride needs to re-instate the initial amount from the initial transaction
        // TODO: Needs to re-instate the initial accountId from the initial transaction (if different)
        tp.unmapTransactionAndRecord(this, t);
    };
    CreateTransactionReconciliation.prototype.updateTransactionReconciliationFlags = function (transaction) {
        var reconTotal = transaction.x.reconciliationRecords.reduce(function (tot, t) { return tot.plus(t.amount); }, new __WEBPACK_IMPORTED_MODULE_1_big_js__["Big"]('0'));
        transaction.x.reconciled = reconTotal.eq(transaction.amount);
    };
    CreateTransactionReconciliation.prototype.updateBankTransactionReconciliationFlags = function (bankTransaction) {
        var reconTotal = bankTransaction.x.reconciliationRecords.reduce(function (tot, t) { return tot.minus(t.amount); }, new __WEBPACK_IMPORTED_MODULE_1_big_js__["Big"]('0'));
        bankTransaction.x.reconciled = reconTotal.eq(bankTransaction.amount);
    };
    CreateTransactionReconciliation.prototype.deserialize = function (field, value) {
        if (field === 'amount')
            return new __WEBPACK_IMPORTED_MODULE_1_big_js__["Big"](value);
        return value;
    };
    CreateTransactionReconciliation.prototype.toHumanisedString = function (env) {
        if (env.action === 'apply') {
            return "Reconciled";
        }
        else if (env.action === 'update') {
            return "Reconciled";
        }
        else {
            return "Unreconciled";
        }
    };
    return CreateTransactionReconciliation;
}(__WEBPACK_IMPORTED_MODULE_0__db_transaction__["a" /* DbTransaction */]));

//# sourceMappingURL=create-transaction-reconciliation.js.map

/***/ }),
/* 383 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__demo_player__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__demo_ui__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__demo_setup__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_autofocus__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DemoService = (function () {
    function DemoService(zone, demoSetup, autofocus) {
        this.demoSetup = demoSetup;
        this.autofocus = autofocus;
        this.controlUrls = ['https://ebudgetapp.com'];
        if (typeof window.ebudget === 'undefined')
            window.ebudget = {};
    }
    DemoService.prototype.start = function () {
        ebudget.demo = {};
        window.addEventListener('message', this.receiveMessage.bind(this), false);
        if (window.parent && __WEBPACK_IMPORTED_MODULE_1__services_utils__["a" /* Utils */].getQueryStringValue('demo_control_url')) {
            window.parent.postMessage({ event: 'ready', id: __WEBPACK_IMPORTED_MODULE_1__services_utils__["a" /* Utils */].getQueryStringValue('demo') }, decodeURI(__WEBPACK_IMPORTED_MODULE_1__services_utils__["a" /* Utils */].getQueryStringValue('demo_control_url'))); // TODO: How to get this source ? maybe from demo query string?
        }
        this.demoUI = new __WEBPACK_IMPORTED_MODULE_3__demo_ui__["a" /* DemoUI */]();
        this.demoUI.focusEnabled = this.autofocus.enabled && true;
        this.demoPlayer = new __WEBPACK_IMPORTED_MODULE_2__demo_player__["a" /* DemoPlayer */](this.demoUI, this.demoSetup);
        this.demoPlayer.onStateChange(function (state) {
            window.parent.postMessage({ event: 'state-change', id: __WEBPACK_IMPORTED_MODULE_1__services_utils__["a" /* Utils */].getQueryStringValue('demo'), state: state }, decodeURI(__WEBPACK_IMPORTED_MODULE_1__services_utils__["a" /* Utils */].getQueryStringValue('demo_control_url'))); // TODO: How to get this source ? maybe from demo query string?            
        });
    };
    DemoService.prototype.receiveMessage = function (event) {
        var _this = this;
        if (event.origin.startsWith('http://localhost:') || this.controlUrls.indexOf(event.origin) >= 0) {
            if (event.data.demo && event.data.demo.command === 'script') {
                var o_1 = typeof event.data.demo.script == 'string' ? JSON.parse(event.data.demo.script) : event.data.demo.script;
                this.demoPlayer.buildFrom(o_1);
                this.demoPlayer.setup().then(function () {
                    if (o_1.autoplay)
                        _this.demoPlayer.run();
                });
            }
            else if (event.data.demo && event.data.demo.command === 'stop') {
                this.demoPlayer.stop();
            }
            else if (event.data.demo && event.data.demo.command === 'pause') {
                this.demoPlayer.pause();
            }
            else if (event.data.demo && event.data.demo.command === 'reset') {
                this.demoPlayer.reset();
            }
            else if (event.data.demo && event.data.demo.command === 'run') {
                this.demoPlayer.run();
            }
            else if (event.data.demo && event.data.demo.command === 'clear') {
                this.demoPlayer.clear();
            }
            else {
                alert('invalid message' + JSON.stringify(event.data));
            }
        }
    };
    DemoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_4__demo_setup__["a" /* DemoSetup */], __WEBPACK_IMPORTED_MODULE_5__services_autofocus__["a" /* Autofocus */]])
    ], DemoService);
    return DemoService;
}());

//# sourceMappingURL=demo-service.js.map

/***/ }),
/* 384 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemoPlayer; });
var DemoPlayer = (function () {
    function DemoPlayer(demoUI, demoSetup) {
        this.stateChangeListener = [];
        this.example = {
            setup: [
                ['eval', 'some code here'],
                ['eval', 'asyncCall()']
            ],
            queue: [
                ['move', ''],
                ['click', ''],
            ]
        };
        this.demoUI = demoUI;
        this.demoSetup = demoSetup;
        this._state = 'uninitialised';
        this.actionList = [];
    }
    DemoPlayer.prototype.setState = function (value) {
        var _this = this;
        if (this._state == value)
            return;
        this._state = value;
        this.stateChangeListener.forEach(function (l) { return l(_this._state); });
    };
    Object.defineProperty(DemoPlayer.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    DemoPlayer.prototype.onStateChange = function (listener) {
        this.stateChangeListener.push(listener);
    };
    DemoPlayer.prototype.buildFrom = function (o) {
        var _this = this;
        o.queue.forEach(function (line) {
            _this.actionList.push({ command: line[0], args: line.length > 1 ? line.slice(1) : [] });
        });
        this.setupScript = o.setup;
    };
    DemoPlayer.prototype.queue = function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.actionList.push({ command: command, args: args });
    };
    DemoPlayer.prototype.addErrorHandler = function (handler) {
    };
    DemoPlayer.prototype.addCompletedHandler = function (handler) {
    };
    DemoPlayer.prototype.setup = function () {
        var _this = this;
        if (this.state != 'uninitialised')
            throw new Error('Illegal state for setup ' + this.state);
        this.setState('processing');
        return this.demoSetup.setup(this.setupScript).then(function () { _this.setState('ready'); });
    };
    DemoPlayer.prototype.run = function () {
        if (this.state != 'ready' && this.state != 'paused')
            throw new Error('Illegal state for run ' + this.state);
        var fromPaused = this.state == 'paused';
        this.setState('processing');
        this.pausing = false;
        if (!fromPaused) {
            this.actionListCurrentLine = 0;
            this.demoUI.showPointer();
            this.demoUI.resetInterrupt();
        }
        this.setState('running');
        this.runAll();
    };
    DemoPlayer.prototype.stop = function () {
        if (this.state != 'ready' && this.state != 'running' && this.state != 'paused')
            throw new Error('Illegal state for stop ' + this.state);
        this.setState('processing');
        this.demoUI.hidePointer();
        this.demoUI.interrupt();
        this.setState('stopped');
    };
    DemoPlayer.prototype.pause = function () {
        var _this = this;
        if (this.state != 'running')
            throw new Error('Illegal state for pause ' + this.state);
        this.setState('processing');
        this.pausing = true;
        this.currentAction.then(function () { return _this.setState('paused'); });
    };
    DemoPlayer.prototype.reset = function () {
        var _this = this;
        if (this.state != 'ready' && this.state != 'stopped' && this.state != 'paused')
            throw new Error('Illegal state for reset ' + this.state);
        this.setState('processing');
        return this.demoSetup.reset().then(function () { _this.setState('ready'); });
    };
    DemoPlayer.prototype.clear = function () {
        var _this = this;
        if (this.state != 'ready' && this.state != 'stopped' && this.state != 'paused')
            throw new Error('Illegal state for clear ' + this.state);
        this.setState('processing');
        return this.demoSetup.clear().then(function () { _this.setState('uninitialised'); });
    };
    DemoPlayer.prototype.runAll = function () {
        var _this = this;
        if (this.state == 'stopped' || this.pausing)
            return;
        if (this.actionListCurrentLine < this.actionList.length) {
            var action = this.actionList[this.actionListCurrentLine];
            this.actionListCurrentLine++;
            this.currentAction = this.executeAction(action).then(function () {
                _this.runAll();
            }).catch(function (reason) {
                _this.setState('error');
            });
        }
        else {
            // TODO: Some kind of end notification
            this.stop();
        }
    };
    DemoPlayer.prototype.executeAction = function (action) {
        switch (action.command) {
            case 'move':
                return this.demoUI.moveTo(action.args[0]);
            case 'click':
                return this.demoUI.click(action.args[0]);
            case 'wait':
                return new Promise(function (resolve) { return setTimeout(resolve, action.args[0]); });
            case 'type':
                return this.demoUI.input(action.args[0], action.args[1]);
            case 'reset':
                return this.demoSetup.reset();
            case 'hide-pointer':
                return this.demoUI.hidePointer();
            case 'show-pointer':
                return this.demoUI.showPointer();
            case 'loop':
                this.actionListCurrentLine = 0;
                return this.demoSetup.reset();
            default: Promise.reject('Invalid command: ' + action.command);
        }
    };
    return DemoPlayer;
}());

//# sourceMappingURL=demo-player.js.map

/***/ }),
/* 385 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemoUI; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var DemoUI = (function () {
    function DemoUI() {
        this.createPointer();
    }
    DemoUI.prototype.createPointer = function () {
        if (document.getElementById('demo-pointer'))
            document.getElementById('demo-pointer').remove();
        this.pointerElement = document.createElement('div');
        this.pointerElement.id = 'demo-pointer';
        this.pointerElement.style.position = 'fixed';
        this.pointerElement.style.width = '10px';
        this.pointerElement.style.height = '10px';
        this.pointerElement.style.borderRadius = '5px';
        this.pointerElement.style.backgroundColor = 'black';
        this.pointerElement.style.boxShadow = '1px 1px 5px rgba(0,0,0,0.5)';
        this.pointerElement.style.zIndex = '99999999';
        this.hotspotLeft = 5;
        this.hotspotTop = 5;
        this.pointerElement.style.top = (window.innerHeight / 2 - this.hotspotLeft) + 'px';
        this.pointerElement.style.left = (window.innerWidth / 2 - this.hotspotTop) + 'px';
        document.body.appendChild(this.pointerElement);
    };
    DemoUI.prototype.dispose = function () {
        if (document.getElementById('demo-pointer'))
            document.getElementById('demo-pointer').remove();
        if (document.activeElement && document.activeElement.blur)
            document.activeElement.blur();
    };
    DemoUI.prototype.movePointer = function (pos) {
        // TODO: Work out the distance and alter the duration (from a set of presets, eg. 100, 200, 300, 400, can round it...) before applying the change here...
        this.pointerElement.style.left = (pos.x - this.hotspotLeft) + 'px';
        this.pointerElement.style.top = (pos.y - this.hotspotTop) + 'px';
    };
    DemoUI.prototype.showPointerClick = function () {
    };
    DemoUI.prototype.showPointer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.pointerElement.style.display = '';
                return [2 /*return*/];
            });
        });
    };
    DemoUI.prototype.hidePointer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.pointerElement.style.display = 'none';
                return [2 /*return*/];
            });
        });
    };
    DemoUI.prototype.interrupt = function () {
        this.interrupted = true;
    };
    DemoUI.prototype.resetInterrupt = function () {
        this.interrupted = false;
    };
    DemoUI.prototype.getElementCenterPosition = function (elementSelector) {
        var ele = document.querySelector(elementSelector);
        var el = ele;
        // from https://www.kirupa.com/html5/get_element_position_using_javascript.htm
        var xPos = 0;
        var yPos = 0;
        while (el) {
            if (el.tagName === "BODY") {
                // deal with browser quirks with body/window/document and page scroll
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;
                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);
            }
            else {
                // for all other non-BODY elements
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }
            el = el.offsetParent;
        }
        return { x: xPos + ele.offsetWidth / 2, y: yPos + ele.offsetHeight / 2 };
    };
    DemoUI.prototype.moveTo = function (elementSelector) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.movePointer(_this.getElementCenterPosition(elementSelector));
            setTimeout(function () { return resolve(); }, 1000);
        });
    };
    DemoUI.prototype.click = function (elementSelector) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var ele = document.querySelector(elementSelector);
            //ele.click();
            var evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('mousedown', true, true, document.defaultView, 0, 0, 0, _this.pointerElement.offsetLeft, _this.pointerElement.offsetTop, false, false, false, false, 1, null);
            ele.dispatchEvent(evt);
            if (_this.focusEnabled) {
                if (ele.querySelector('input'))
                    ele.querySelector('input').focus();
                else
                    ele.focus();
            }
            setTimeout(function () {
                var evt = document.createEvent('MouseEvents');
                evt.initMouseEvent('mouseup', true, true, document.defaultView, 0, 0, 0, _this.pointerElement.offsetLeft, _this.pointerElement.offsetTop, false, false, false, false, 1, null);
                ele.dispatchEvent(evt);
                evt = document.createEvent('MouseEvents');
                evt.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, _this.pointerElement.offsetLeft, _this.pointerElement.offsetTop, false, false, false, false, 1, null);
                ele.dispatchEvent(evt);
                resolve();
            }, 30);
        });
        // TODO: Some way to test / wait for action ?
    };
    DemoUI.prototype.input = function (elementSelector, text) {
        var _this = this;
        var ele = document.querySelector(elementSelector);
        if (ele.querySelector('input'))
            ele = ele.querySelector('input');
        ele.value = '';
        if (text.length === 0)
            return Promise.resolve();
        return new Promise(function (resolve, reject) {
            _this.typeChars(ele, text, resolve);
            // TODO: Check value at the end is correct ?
        });
    };
    DemoUI.prototype.typeChars = function (ele, chars, resolve) {
        var _this = this;
        if (this.interrupted)
            return;
        ele.value = ele.value + chars.substr(0, 1);
        ele.dispatchEvent(new Event('input', { 'bubbles': true, 'cancelable': true }));
        if (chars.length > 1)
            setTimeout(function () { return _this.typeChars(ele, chars.substr(1), resolve); }, 200);
        else
            resolve();
    };
    DemoUI = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], DemoUI);
    return DemoUI;
}());

//# sourceMappingURL=demo-ui.js.map

/***/ }),
/* 386 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggerStorageAppender; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger__ = __webpack_require__(7);

var LoggerStorageAppender = (function () {
    function LoggerStorageAppender(key) {
        this.key = key;
        this.limit = 1000;
        this.logLines = [];
        LoggerStorageAppender.appenders.set(key, this);
    }
    LoggerStorageAppender.prototype.log = function (level, data) {
        var stringData = new Array();
        data.forEach(function (e) {
            stringData.push(__WEBPACK_IMPORTED_MODULE_0__logger__["a" /* Logger */].stringValue(e) + '');
        });
        var length = this.logLines.push({ timestamp: Date.now(), level: level, data: stringData });
        if (length > this.limit)
            this.logLines = this.logLines.splice(0, length - this.limit);
    };
    /**
     * Reverse chronological order (newest to oldest) dump of all the data
     */
    LoggerStorageAppender.prototype.stringDump = function () {
        var all = '';
        for (var i = this.logLines.length - 1; i >= 0; i--) {
            all += this.lineToString(this.logLines[i]) + '\n';
        }
        return all;
    };
    LoggerStorageAppender.prototype.lineToString = function (logLine) {
        var d = new Date(logLine.timestamp);
        var dateString = d.getFullYear() + '-' + (d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate() + ' ' + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ':' + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds() + '.' + (d.getMilliseconds() < 10 ? '00' : d.getMilliseconds() < 100 ? '0' : '') + d.getMilliseconds();
        var logLevel = logLine.level === 1 ? 'D' : logLine.level === 3 ? 'E' : 'I';
        var dataString = '';
        if (logLine.data.length > 0)
            dataString = __WEBPACK_IMPORTED_MODULE_0__logger__["a" /* Logger */].stringValue(logLine.data[0]);
        //if (logLine.data.length > 1) dataString += '\n--------';
        for (var i = 1; i < logLine.data.length; i++) {
            dataString += '\n' + __WEBPACK_IMPORTED_MODULE_0__logger__["a" /* Logger */].stringValue(logLine.data[i]);
        }
        //if (logLine.data.length > 1) dataString += '\n--------';
        return '[' + logLevel + ' ' + dateString + '] ' + dataString;
    };
    LoggerStorageAppender.appenders = new Map();
    return LoggerStorageAppender;
}());

//# sourceMappingURL=logger-storage-appender.js.map

/***/ }),
/* 387 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateBankLink; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_transaction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__records_bank_link__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_logger__ = __webpack_require__(7);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var CreateBankLink = (function (_super) {
    __extends(CreateBankLink, _super);
    function CreateBankLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateBankLink.prototype.getTypeId = function () {
        return 'CreateBankLink';
    };
    CreateBankLink.prototype.apply = function (tp) {
        // TODO: Validation
        if (this.uuid == null)
            throw new Error("UUID Required");
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_bank_link__["a" /* BankLink */]);
        var bl = new __WEBPACK_IMPORTED_MODULE_1__records_bank_link__["a" /* BankLink */]();
        bl.id = this.id;
        bl.uuid = this.uuid;
        bl.name = this.name;
        bl.provider = this.provider;
        bl.configuration = this.configuration;
        table.insert(bl);
        tp.mapTransactionAndRecord(this, bl);
    };
    CreateBankLink.prototype.update = function (tp) {
        // TODO: Validation
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_bank_link__["a" /* BankLink */]);
        var bl = table.by('id', this.id);
        bl.name = this.name;
        bl.provider = this.provider;
        bl.configuration = this.configuration;
        table.update(bl);
    };
    CreateBankLink.prototype.undo = function (tp) {
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_bank_link__["a" /* BankLink */]);
        var bl = table.by('id', this.id);
        table.remove(bl);
        // No need to unmap as the transaction mapping in the record
        tp.db.dbms.configuration.secureAccessor("banklink_" + this.uuid).removeScope().catch(function (reason) {
            // Just a cleanup step - if it fails, then we can really ignore it - We'll just log an info message
            __WEBPACK_IMPORTED_MODULE_2__services_logger__["a" /* Logger */].get('CreateBankLink').info('Error in removing the secure scope in undo transaction for CreateBankLink.', reason);
        });
    };
    CreateBankLink.prototype.deserialize = function (field, value) {
        return value;
    };
    CreateBankLink.prototype.toHumanisedString = function (env) {
        if (env.action === 'apply') {
            return "created bank link " + this.provider;
        }
        else if (env.action === 'update') {
            return "renamed bank link {{old name}} to " + this.provider;
        }
        else {
            return "removed bank link " + this.provider;
        }
    };
    return CreateBankLink;
}(__WEBPACK_IMPORTED_MODULE_0__db_transaction__["a" /* DbTransaction */]));

//# sourceMappingURL=create-bank-link.js.map

/***/ }),
/* 388 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetAccountBankLink; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_transaction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__records_account__ = __webpack_require__(32);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var SetAccountBankLink = (function (_super) {
    __extends(SetAccountBankLink, _super);
    function SetAccountBankLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetAccountBankLink.prototype.getTypeId = function () {
        return 'SetAccountBankLinkTransaction';
    };
    SetAccountBankLink.prototype.apply = function (tp) {
        // TODO: Validation - bank link Id is valid
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_account__["a" /* Account */]);
        var a = table.by('id', this.accountId);
        a.bankLinkId = this.bankLinkId;
        a.bankLinkConfiguration = this.configuration;
        tp.mapTransactionAndRecord(this, a);
        table.update(a);
    };
    SetAccountBankLink.prototype.update = function (tp) {
        // TODO: Validation cannot change account id
        this.apply(tp);
    };
    SetAccountBankLink.prototype.undo = function (tp) {
        var table = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_account__["a" /* Account */]);
        var a = table.by('id', this.accountId);
        delete a.bankLinkId;
        delete a.bankLinkConfiguration;
        tp.unmapTransactionAndRecord(this, a);
    };
    SetAccountBankLink.prototype.deserialize = function (field, value) {
        return value;
    };
    SetAccountBankLink.prototype.toHumanisedString = function (env) {
        if (env.action === 'apply') {
            return "created account bank link";
        }
        else if (env.action === 'update') {
            return "updated account bank link";
        }
        else {
            return "removed account bank link";
        }
    };
    return SetAccountBankLink;
}(__WEBPACK_IMPORTED_MODULE_0__db_transaction__["a" /* DbTransaction */]));

//# sourceMappingURL=set-account-bank-link.js.map

/***/ }),
/* 389 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BankTransactionIgnore; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_transaction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__records_bank_transaction__ = __webpack_require__(38);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var BankTransactionIgnore = (function (_super) {
    __extends(BankTransactionIgnore, _super);
    function BankTransactionIgnore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BankTransactionIgnore.prototype.getTypeId = function () {
        return 'BankTransactionIgnore';
    };
    BankTransactionIgnore.prototype.apply = function (tp) {
        var bankTransactionTable = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_bank_transaction__["a" /* BankTransaction */]);
        var bankTransaction = bankTransactionTable.by('id', this.bankTransactionId);
        if (bankTransaction != null) {
            bankTransaction.x.ignored = true;
            bankTransactionTable.update(bankTransaction);
            tp.mapTransactionAndRecord(this, bankTransaction);
        }
    };
    BankTransactionIgnore.prototype.update = function (tp) {
        this.apply(tp);
    };
    BankTransactionIgnore.prototype.undo = function (tp) {
        var bankTransactionTable = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_bank_transaction__["a" /* BankTransaction */]);
        var bankTransaction = bankTransactionTable.by('id', this.bankTransactionId);
        if (bankTransaction != null) {
            bankTransaction.x.ignored = undefined;
            //delete bankTransaction.x.ignored; Keep the property so we can bind to it
            bankTransactionTable.update(bankTransaction);
            tp.unmapTransactionAndRecord(this, bankTransaction);
        }
    };
    BankTransactionIgnore.prototype.deserialize = function (field, value) {
        return value;
    };
    BankTransactionIgnore.prototype.toHumanisedString = function (env) {
        return "Ignored Bank Transaction "; // + ? TODO: Get the bank transaction name
        // TODO: unignored...
    };
    return BankTransactionIgnore;
}(__WEBPACK_IMPORTED_MODULE_0__db_transaction__["a" /* DbTransaction */]));

//# sourceMappingURL=bank-transaction-ignore.js.map

/***/ }),
/* 390 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BankTransactionDelete; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_transaction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__records_bank_transaction__ = __webpack_require__(38);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var BankTransactionDelete = (function (_super) {
    __extends(BankTransactionDelete, _super);
    function BankTransactionDelete() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BankTransactionDelete.prototype.getTypeId = function () {
        return 'BankTransactionDelete';
    };
    BankTransactionDelete.prototype.apply = function (tp) {
        var bankTransactionTable = tp.table(__WEBPACK_IMPORTED_MODULE_1__records_bank_transaction__["a" /* BankTransaction */]);
        var bankTransaction = bankTransactionTable.by('id', this.bankTransactionId);
        if (bankTransaction != null) {
            bankTransactionTable.remove(bankTransaction);
        }
    };
    BankTransactionDelete.prototype.update = function (tp) {
        this.apply(tp);
    };
    BankTransactionDelete.prototype.undo = function (tp) {
        // TODO: Not sure how to undo this... we would need to just delete this, then rebuild bank account record (well, rebuild the whole database really)
        throw new Error("Not yet implemented");
    };
    BankTransactionDelete.prototype.deserialize = function (field, value) {
        return value;
    };
    BankTransactionDelete.prototype.toHumanisedString = function (env) {
        return "Deleted Bank Transaction "; // + ? TODO: Get the bank transaction name
    };
    return BankTransactionDelete;
}(__WEBPACK_IMPORTED_MODULE_0__db_transaction__["a" /* DbTransaction */]));

//# sourceMappingURL=bank-transaction-delete.js.map

/***/ }),
/* 391 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BudgetSettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_replication_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_records_budget__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_home__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modals_share_budget_share_budget__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__data_transactions_init_budget_transaction__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_account_account__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__modals_add_edit_account_add_edit_account__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__modals_add_edit_bank_link_add_edit_bank_link__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__bank_link_bank_link__ = __webpack_require__(148);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var BudgetSettingsPage = (function () {
    function BudgetSettingsPage(nav, navParams, configuration, replication, http, dbms, alertController, engineFactory, modalController) {
        this.nav = nav;
        this.navParams = navParams;
        this.configuration = configuration;
        this.replication = replication;
        this.http = http;
        this.dbms = dbms;
        this.alertController = alertController;
        this.engineFactory = engineFactory;
        this.modalController = modalController;
        this.logger = __WEBPACK_IMPORTED_MODULE_6__services_logger__["a" /* Logger */].get('BudgetSettingsPage');
        this.nav = nav;
        this.db = this.dbms.getDb(navParams.data.budgetId);
        this.engine = this.engineFactory.getEngine(this.db);
        var budgetRecord = this.db.transactionProcessor.single(__WEBPACK_IMPORTED_MODULE_7__data_records_budget__["a" /* Budget */]);
        this.initBudgetTransaction = this.db.transactionProcessor.findTransactionsForRecord(budgetRecord, __WEBPACK_IMPORTED_MODULE_10__data_transactions_init_budget_transaction__["a" /* InitBudgetTransaction */])[0];
        this.data = {};
        this.data.budgetName = this.db.name();
    }
    BudgetSettingsPage.prototype.addAccount = function () {
        var _this = this;
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_13__modals_add_edit_account_add_edit_account__["a" /* AddEditAccountModal */], { budgetId: this.db.id });
        modal.onDidDismiss(function (data) {
            if (data && data.accountId) {
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_12__pages_account_account__["a" /* AccountPage */], { accountId: data.accountId, budgetId: _this.db.id });
            }
        });
        modal.present();
    };
    BudgetSettingsPage.prototype.openAccount = function (account) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_12__pages_account_account__["a" /* AccountPage */], { accountId: account.id, budgetId: this.db.id });
    };
    BudgetSettingsPage.prototype.addBankLink = function () {
        var _this = this;
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_14__modals_add_edit_bank_link_add_edit_bank_link__["a" /* AddEditBankLinkModal */], { budgetId: this.db.id });
        modal.onDidDismiss(function (data) {
            if (data && data.bankLinkId) {
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_15__bank_link_bank_link__["a" /* BankLinkPage */], { bankLinkId: data.bankLinktId, budgetId: _this.db.id });
            }
        });
        modal.present();
    };
    BudgetSettingsPage.prototype.openBankLink = function (bankLink) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_15__bank_link_bank_link__["a" /* BankLinkPage */], { bankLinkId: bankLink.id, budgetId: this.db.id });
    };
    BudgetSettingsPage.prototype.updateBudgetName = function () {
        var _this = this;
        if (this.data.budgetName == "") {
            this.data.budgetName = this.initBudgetTransaction.budgetName;
            return;
        }
        if (this.initBudgetTransaction.budgetName !== this.data.budgetName) {
            this.initBudgetTransaction.budgetName = this.data.budgetName;
            this.db.applyTransaction(this.initBudgetTransaction);
            if (this.replication.enabled(this.db)) {
                // TODO: really need to refactor this out...
                this.budgetNameUpdating = true;
                __WEBPACK_IMPORTED_MODULE_9__modals_share_budget_share_budget__["a" /* ShareBudgetModal */].postShare(this.http, this.db.id, this.db.name(), this.configuration.deviceInstallationId, this.configuration.deviceName)
                    .map(function (response) { return response.json(); })
                    .subscribe(function (response) {
                    _this.logger.info("Updated shared budget name to " + _this.db.name());
                }, function (error) {
                    _this.logger.error("Error updating shared budget name to " + _this.db.name(), error);
                }, function () {
                    _this.budgetNameUpdating = false;
                });
            }
        }
    };
    BudgetSettingsPage.prototype.deleteBudgetConfirm = function () {
        var _this = this;
        var confirm = this.alertController.create({
            title: 'Delete?',
            message: 'Are you sure you want to delete this budget (' + this.db.name() + ')?',
            buttons: [
                {
                    text: 'Cancel'
                }, {
                    text: 'Delete',
                    role: 'destructive',
                    handler: function () {
                        confirm.dismiss().then(function () {
                            _this.doDeleteBudget();
                        });
                        return false;
                    }
                }
            ]
        });
        confirm.present();
    };
    BudgetSettingsPage.prototype.doDeleteBudget = function () {
        this.db.deactivate();
        this.dbms.deleteDb(this.db.id);
        this.configuration.lastOpenedBudget(null);
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__home_home__["a" /* HomePage */]);
    };
    BudgetSettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\pages\budget-settings\budget-settings.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <main-menu-icon></main-menu-icon>\n\n    </button>\n\n    <ion-title>Budget Settings</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="budget-settings-page">\n\n  <ion-list responsive-padding>\n\n    <ion-item class="hide-validation">\n\n      <ion-label>Budget Name</ion-label>\n\n      <ion-input [disabled]="budgetNameUpdating" [(ngModel)]="data.budgetName" (blur)="updateBudgetName()"></ion-input>\n\n    </ion-item>\n\n  </ion-list>\n\n  <ion-list *ngIf="configuration.optionBoolean(\'experimental.accounts.enabled\')" responsive-padding>\n\n    <ion-list-header class="no-top-border">\n\n      Accounts\n\n    </ion-list-header>\n\n    <button ion-item (click)="openAccount(account)" *ngFor="let account of engine.getAccounts()">{{account.name}}</button>\n\n    <button ion-item detail-none (click)="addAccount()">Add New Account...</button>\n\n\n\n  </ion-list>\n\n  <ion-list *ngIf="configuration.optionBoolean(\'experimental.accounts.enabled\')" responsive-padding>\n\n    <ion-list-header class="no-top-border">\n\n      Bank Links\n\n    </ion-list-header>\n\n    <button ion-item (click)="openBankLink(bankLink)" *ngFor="let bankLink of engine.getBankLinks()">{{bankLink.name}}</button>\n\n    <button ion-item detail-none (click)="addBankLink()">Add New Bank Link...</button>\n\n  </ion-list>\n\n  <button ion-button color="danger" clear small (click)="deleteBudgetConfirm()">Delete Budget</button>\n\n\n\n\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"c:\working\fb\ebudget\src\pages\budget-settings\budget-settings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__services_configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_5__services_replication_service__["a" /* Replication */], __WEBPACK_IMPORTED_MODULE_11__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__engine_engine_factory__["a" /* EngineFactory */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* ModalController */]])
    ], BudgetSettingsPage);
    return BudgetSettingsPage;
}());

//# sourceMappingURL=budget-settings.js.map

/***/ }),
/* 392 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_records_account__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_add_edit_account_add_edit_account__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__bank_bank_sync__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_notifications__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__bank_standard_host_interface__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__bank_account_bank_account__ = __webpack_require__(147);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var AccountPage = (function () {
    function AccountPage(nav, dbms, navParams, engineFactory, modalController, bankSync, notifications, standardHostInterface) {
        this.nav = nav;
        this.dbms = dbms;
        this.navParams = navParams;
        this.engineFactory = engineFactory;
        this.modalController = modalController;
        this.bankSync = bankSync;
        this.notifications = notifications;
        this.standardHostInterface = standardHostInterface;
        this.logger = __WEBPACK_IMPORTED_MODULE_8__services_logger__["a" /* Logger */].get('BankAccountPage');
        this.engine = this.engineFactory.getEngineById(navParams.data.budgetId);
        this.account = this.engine.getRecordById(__WEBPACK_IMPORTED_MODULE_4__data_records_account__["a" /* Account */], navParams.data.accountId);
    }
    AccountPage.prototype.editAccount = function () {
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_5__modals_add_edit_account_add_edit_account__["a" /* AddEditAccountModal */], { budgetId: this.engine.db.id, accountId: this.account.id });
        modal.present();
    };
    AccountPage.prototype.gotoBank = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_10__bank_account_bank_account__["a" /* BankAccountPage */], { budgetId: this.navParams.data.budgetId, accountId: this.navParams.data.accountId });
    };
    AccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\pages\account\account.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <main-menu-icon></main-menu-icon>\n\n    </button>\n\n    <ion-title>{{account.name}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <button ion-item (click)="editAccount()">Edit</button>\n\n  <ion-item>{{account.balance}}</ion-item>\n\n  <button *ngIf="account.accountType == \'Bank\'" ion-item (click)="gotoBank()">Bank Account</button>\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\pages\account\account.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__["a" /* EngineFactory */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__bank_bank_sync__["a" /* BankSync */], __WEBPACK_IMPORTED_MODULE_7__services_notifications__["a" /* Notifications */], __WEBPACK_IMPORTED_MODULE_9__bank_standard_host_interface__["a" /* StandardHostInterface */]])
    ], AccountPage);
    return AccountPage;
}());

//# sourceMappingURL=account.js.map

/***/ }),
/* 393 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionSync; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__provider_interface__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_records_bank_transaction__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_transactions_merge_bank_transactions__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_big_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_utils__ = __webpack_require__(15);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AccountTransactionProcessing = (function (_super) {
    __extends(AccountTransactionProcessing, _super);
    function AccountTransactionProcessing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AccountTransactionProcessing;
}(__WEBPACK_IMPORTED_MODULE_1__provider_interface__["b" /* BankAccountTransaction */]));
var TransactionSync = (function () {
    function TransactionSync() {
        this.logger = __WEBPACK_IMPORTED_MODULE_2__services_logger__["a" /* Logger */].get('TransactionSync');
    }
    TransactionSync.prototype.merge = function (engine, account, bankAccount, bankAccountTransactions) {
        //TODO: The page for viewing them
        //TODO: A "clear" button for the bank transactions
        var _this = this;
        var inTransactions = bankAccountTransactions;
        for (var i = 0; i < inTransactions.length; i++)
            inTransactions[i].originalIndex = i;
        var sortMap = { 'authorised': 3, 'recent': 2, 'processed': 1 };
        inTransactions.sort(function (a, b) {
            return sortMap[a.status] - sortMap[b.status] || Number(a.transactionDate || '0') - Number(b.transactionDate || '0') || a.originalIndex - b.originalIndex;
        });
        var minDate = Math.min.apply(null, inTransactions.filter(function (t) { return t.transactionDate; }).map(function (t) { return Number(t.transactionDate); }));
        var existingBankTransactions = engine.db.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_3__data_records_bank_transaction__["a" /* BankTransaction */]).find()
            .filter(function (t) { return t.accountId === account.id && ((t.status === 'authorised' && t.date >= minDate) || t.status !== 'authorised'); })
            .sort(function (a, b) {
            return sortMap[a.status] - sortMap[b.status] || Number(a.date || '0') - Number(b.date || '0') || a.id - b.id;
        });
        inTransactions.forEach(function (t) {
            // TODO: Any kind of description filtering !?
            t.amountBig = new __WEBPACK_IMPORTED_MODULE_5_big_js__["Big"](t.amount);
            if (t.balance)
                t.balanceBig = new __WEBPACK_IMPORTED_MODULE_5_big_js__["Big"](t.balance);
        });
        var lastTransaction = null;
        var daySequence = 0;
        inTransactions.filter(function (t) { return t.status === 'processed'; }).forEach(function (t) {
            if (!lastTransaction || lastTransaction.transactionDate !== t.transactionDate)
                daySequence = 0;
            t.balanceSequence = Number(t.transactionDate) * 10000 + daySequence;
            t.balanceCheck = !lastTransaction || lastTransaction.balanceBig.plus(t.amountBig).eq(t.balanceBig);
            if (!t.balanceCheck)
                _this.logger.info("Balance sequence check failed", lastTransaction, t);
            daySequence++;
            lastTransaction = t;
        });
        inTransactions.forEach(function (t) {
            var index = _this.findFirstMatch(t, existingBankTransactions).index;
            if (index >= 0) {
                t.matched = true;
                t.matchedAccountTransaction = existingBankTransactions.splice(index, 1)[0];
            }
        });
        var unmatchedExistingRecords = existingBankTransactions.filter(function (t) { return t.status !== 'processed'; });
        var minMatchedDate = Math.min.apply(null, inTransactions.filter(function (t) { return t.status === 'processed' && t.matched; }).map(function (t) { return Number(t.transactionDate); }));
        if (minMatchedDate !== Infinity && minMatchedDate !== NaN && minMatchedDate > 0) {
            unmatchedExistingRecords = unmatchedExistingRecords.concat(existingBankTransactions.filter(function (t) { return t.status === 'processed' && t.date > minMatchedDate; }));
        }
        // TODO: CHECK THE BALANCES AND SEQUENCES HAVEN'T CHANGED (OR USE THEM AS PART OF THE MATCHING PROCESS ??)
        // TODO: Do another check of toAdd to unmatchedExistingRecords and check for same amount, but different date OR description ??? - Only do this if real world evidence suggests any discrepency which results in an add/remove rather than update
        // Now we want unmatched to add, matched to update if to pending / authorised
        var toUpgrade = inTransactions.filter(function (t) { return t.matched && t.status !== t.matchedAccountTransaction.status; });
        var toAdd = inTransactions.filter(function (t) { return !t.matched; });
        var toFlag = unmatchedExistingRecords.filter(function (t) { return !t.flagRemoved; }).map(function (t) { return { bankTransactionId: t.id, flag: 'removed', set: true }; })
            .concat(inTransactions.filter(function (t) { return t.matched && t.matchedAccountTransaction.flagRemoved; }).map(function (t) { return { bankTransactionId: t.matchedAccountTransaction.id, flag: 'removed', set: undefined }; }));
        var mergeBankTransactions = new __WEBPACK_IMPORTED_MODULE_4__data_transactions_merge_bank_transactions__["a" /* MergeBankTransactions */]();
        mergeBankTransactions.accountId = account.id;
        if (toUpgrade)
            mergeBankTransactions.inserts = toAdd.map(function (t) { return { date: t.transactionDate || __WEBPACK_IMPORTED_MODULE_6__services_utils__["a" /* Utils */].nowYYYYMMDD(), status: t.status, description: t.description, amount: t.amountBig, balance: t.balanceBig, balanceSequence: t.balanceSequence }; });
        if (toAdd)
            mergeBankTransactions.upgrades = toUpgrade.map(function (t) { return { bankTransactionId: t.matchedAccountTransaction.id, date: t.transactionDate, status: t.status, description: t.description, amount: t.amountBig, balance: t.balanceBig, balanceSequence: t.balanceSequence }; });
        if (toFlag)
            mergeBankTransactions.flags = toFlag;
        if (account.x.bankBalance + '' !== bankAccount.accountBalance + '')
            mergeBankTransactions.accountBalance = new __WEBPACK_IMPORTED_MODULE_5_big_js__["Big"](bankAccount.accountBalance);
        if (account.x.bankAvailableBalance + '' !== bankAccount.accountAvailableBalance + '')
            mergeBankTransactions.accountAvailableBalance = new __WEBPACK_IMPORTED_MODULE_5_big_js__["Big"](bankAccount.accountAvailableBalance);
        if (toUpgrade || toAdd || toFlag || mergeBankTransactions.accountBalance || mergeBankTransactions.accountAvailableBalance)
            mergeBankTransactions.generateChecksum(engine.db.transactionProcessor);
        mergeBankTransactions.timestamp = new Date().toISOString();
        engine.db.applyTransaction(mergeBankTransactions);
    };
    TransactionSync.prototype.findFirstMatch = function (inTransaction, accountTransactions, fromIndex) {
        if (fromIndex === void 0) { fromIndex = 0; }
        var i = -2;
        accountTransactions = accountTransactions.slice(fromIndex);
        if (inTransaction.status === 'processed') {
            // Processed - match : Date, status, description & amount - full record, or a record upgrade (see comments inline)
            i = accountTransactions.findIndex(function (t) {
                return (t.status === 'processed' && t.amount.eq(inTransaction.amountBig) && t.date === inTransaction.transactionDate && t.description == inTransaction.description)
                    || (t.status === 'recent' && t.amount.eq(inTransaction.amountBig)) // Not sure on description ? // Date >= ?, or within tolerance ?
                    || (t.status === 'authorised' && t.amount.eq(inTransaction.amountBig) && t.date <= inTransaction.transactionDate);
            } // Processed date >= authorised date
            );
        }
        else if (inTransaction.status === 'authorised') {
            // Authorised - match : Date, status = 'authorised', description & amount - full record
            i = accountTransactions.findIndex(function (t) {
                return t.status === 'authorised' && t.amount.eq(inTransaction.amountBig) && t.date === inTransaction.transactionDate && t.description == inTransaction.description;
            });
        }
        else if (inTransaction.status === 'recent') {
            // Recent - match : status = 'recent' | 'authorised', description & amount - full record
            i = accountTransactions.findIndex(function (t) {
                return (t.status === 'recent' && t.amount.eq(inTransaction.amountBig) && t.description == inTransaction.description)
                    || (t.status === 'authorised' && t.amount.eq(inTransaction.amountBig));
            });
        }
        else {
            // error TODO
        }
        return { record: i >= 0 ? accountTransactions[i] : null, index: i >= 0 ? i + fromIndex : i };
    };
    TransactionSync = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], TransactionSync);
    return TransactionSync;
}());

//# sourceMappingURL=transaction-sync.js.map

/***/ }),
/* 394 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InAppBrowserInterfaceFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_in_app_browser__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__in_app_browser_interface__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_notifications__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var InAppBrowserInterfaceFactory = (function () {
    function InAppBrowserInterfaceFactory(inAppBrowser, notifications) {
        this.inAppBrowser = inAppBrowser;
        this.notifications = notifications;
    }
    InAppBrowserInterfaceFactory.prototype.createBrowser = function (logger, backgroundMode, monitor) {
        return __awaiter(this, void 0, void 0, function () {
            var browserObject, inAppBrowserInterface;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        browserObject = this.inAppBrowser.create('about:blank', '_blank', { hidden: 'yes', hardwareback: 'no', zoom: 'no', location: 'yes' });
                        inAppBrowserInterface = new __WEBPACK_IMPORTED_MODULE_2__in_app_browser_interface__["a" /* InAppBrowserInterface */](browserObject, logger, this.notifications, backgroundMode, monitor);
                        return [4 /*yield*/, inAppBrowserInterface.onLoadStop()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, inAppBrowserInterface];
                }
            });
        });
    };
    InAppBrowserInterfaceFactory = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_3__services_notifications__["a" /* Notifications */]])
    ], InAppBrowserInterfaceFactory);
    return InAppBrowserInterfaceFactory;
}());

//# sourceMappingURL=in-app-browser-interface-factory.js.map

/***/ }),
/* 395 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SyncEvent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BankSyncMonitor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);

var SyncEvent = (function () {
    function SyncEvent(event) {
        this.event = event;
    }
    return SyncEvent;
}());

var BankSyncMonitor = (function () {
    function BankSyncMonitor() {
        var _this = this;
        this.log = [];
        this.source = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"](function (observer) { _this.observer = observer; }).share();
    }
    BankSyncMonitor.prototype.error = function (message) {
        if (!this.errors) {
            this.errors = true;
            this.errorMessage = message;
        }
        else {
            this.errorMessage += '\n' + message;
        }
        this.observer.next(new SyncEvent('error-state-change'));
    };
    BankSyncMonitor.prototype.cancel = function () {
        if (!this.cancelling) {
            this.cancelling = true;
            this.provider.interrupt();
        }
    };
    Object.defineProperty(BankSyncMonitor.prototype, "cancelling", {
        get: function () { return this._cancelling; },
        set: function (value) { this._cancelling = value; if (this.observer)
            this.observer.next(new SyncEvent('cancelling-state-change')); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BankSyncMonitor.prototype, "running", {
        get: function () { return this._running; },
        set: function (value) { this._running = value; if (this.observer)
            this.observer.next(new SyncEvent('running-state-change')); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BankSyncMonitor.prototype, "complete", {
        get: function () { return this._complete; },
        set: function (value) {
            this._complete = value;
            if (this.observer) {
                this.logger.debug("Firing Complete");
                this.observer.next(new SyncEvent('complete-state-change'));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BankSyncMonitor.prototype, "cancelled", {
        get: function () { return this._cancelled; },
        set: function (value) { this._cancelled = value; if (this.observer)
            this.observer.next(new SyncEvent('cancelled-state-change')); },
        enumerable: true,
        configurable: true
    });
    BankSyncMonitor.prototype.on = function (event) {
        return this.source.filter(function (ev) { return ev.event == event; });
    };
    return BankSyncMonitor;
}());

//# sourceMappingURL=bank-sync-monitor.js.map

/***/ }),
/* 396 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewBankTransactionModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_records_bank_transaction__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_records_transaction__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_big_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__data_transactions_create_transaction_reconciliation__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__add_edit_split_transaction_add_edit_split_transaction__ = __webpack_require__(82);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ViewBankTransactionModal = (function () {
    function ViewBankTransactionModal(configuration, engineFactory, viewCtrl, navParams, dbms, nav, alertController, modalController) {
        var _this = this;
        this.configuration = configuration;
        this.engineFactory = engineFactory;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.dbms = dbms;
        this.nav = nav;
        this.alertController = alertController;
        this.modalController = modalController;
        this.viewCtrl = viewCtrl;
        this.nav = nav;
        this.budget = dbms.getDb(navParams.data.budgetId);
        this.engine = engineFactory.getEngine(this.budget);
        this.t = this.budget.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_4__data_records_bank_transaction__["a" /* BankTransaction */]).by('id', navParams.data.bankTransactionId);
        this.initialSelectedTransactions = new Map();
        if (this.t.x.reconciliationRecords) {
            this.t.x.reconciliationRecords.forEach(function (transactionReconciliation) {
                var transaction = _this.budget.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_5__data_records_transaction__["a" /* Transaction */]).by('id', transactionReconciliation.transactionId);
                _this.initialSelectedTransactions.set(transaction, transactionReconciliation);
            });
        }
        this.selectedTransactions = new Map(this.initialSelectedTransactions);
    }
    ViewBankTransactionModal.prototype.unreconciliedAndThisReconciledTransactions = function () {
        var _this = this;
        var view = this.engine.getTransactionsUnreconciledView();
        if (view.sortDirty || view.resultsdirty || this.forceRefresh || !this.transactionsUnreconciledCached) {
            this.forceRefresh = false;
            this.transactionsUnreconciledCached = view.data();
            // TODO: Sorting based on match probability
            // TODO: Group. ie. transactions on this account, transactions with no account, transactions on another account...
            this.initialSelectedTransactions.forEach(function (r1, t1) {
                var existing = _this.transactionsUnreconciledCached.indexOf(t1);
                if (existing >= 0)
                    _this.transactionsUnreconciledCached.splice(existing, 1);
                _this.transactionsUnreconciledCached.unshift(t1);
            });
            this.selectedTransactions.forEach(function (r1, t1) {
                var existing = _this.transactionsUnreconciledCached.indexOf(t1);
                if (existing < 0)
                    _this.transactionsUnreconciledCached.unshift(t1);
            });
        }
        return this.transactionsUnreconciledCached;
    };
    ViewBankTransactionModal.prototype.toggleSelected = function (transaction) {
        var _this = this;
        if (this.selectedTransactions.has(transaction)) {
            // TODO: Message if the transaction will be restored to it's initial amount and/or account - only for already saved reconciliations - not for new ones (you'd assume it would be)
            // TODO: This needs to be implemented in the dbTransaction so when the "undo" or "update" event happens then it correctly restores the initial transaction
            this.selectedTransactions.delete(transaction);
        }
        else {
            if (transaction.accountId != null && transaction.accountId != this.t.accountId) {
                this.alertController.create({ message: "The selected transaction is logged under a different account (TODO: Account name) in the budget. By reconciling against this bank account it will be changed to be logged under (TODO: This account name)." }).present();
            }
            if (!this.reconcileAmount(transaction).times(-1).eq(this.reconciledRemaining())) {
                this.alertController.create({
                    message: "I've updated the budget amount from (TODO: Amount) to (TODO: New Amount) to match the bank transaction.",
                    buttons: [
                        {
                            text: 'Undo',
                            role: 'cancel',
                            handler: function (data) {
                                _this.selectedTransactions.set(transaction, { amount: _this.reconcileAmount(transaction) });
                            }
                        },
                        {
                            text: 'OK',
                            handler: function (data) {
                                // TODO: If the amount is subsequently edited, then this needs to be addresses again
                                _this.selectedTransactions.set(transaction, { amount: _this.reconciledRemaining().times(-1), transactionAmountOverride: true });
                            }
                        }
                    ]
                }).present();
            }
            else {
                this.selectedTransactions.set(transaction, { amount: this.reconcileAmount(transaction) });
            }
        }
    };
    ViewBankTransactionModal.prototype.isSelected = function (transaction) {
        return this.selectedTransactions.has(transaction);
    };
    ViewBankTransactionModal.prototype.reconcileAmount = function (transaction) {
        if (this.selectedTransactions.has(transaction)) {
            // TODO: The case where an item is partially reconciled and there is some remaining, but it is selected
            // TODO: The case where it is initially reconciled, but for a DIFFERENT amount than to here.
            // Think about these cases, may need to display an extra field (or maybe, multiple?, transaction total, transaction left to reconcile, this reconciled (if different to total / remaining), eg. partial/split ) <= this last one will have a bit of logic to work out, as we need to add/remove this 
            // This is wrong, we want the remaining amount AND what we have already reconciled it for...
            return this.selectedTransactions.get(transaction).amount;
        }
        if (transaction.x.reconciliationRecords) {
            // TODO: Filter and remove "this" from the calc
            return transaction.x.reconciliationRecords.reduce(function (amt, t) { return amt.minus(t.amount); }, transaction.amount);
        }
        else {
            return transaction.amount;
        }
    };
    ViewBankTransactionModal.prototype.reconciledTotal = function () {
        return Array.from(this.selectedTransactions.values()).reduce(function (tot, o) { return tot.plus(o.amount); }, new __WEBPACK_IMPORTED_MODULE_7_big_js__["Big"]('0'));
    };
    ViewBankTransactionModal.prototype.reconciledRemaining = function () {
        return this.t.amount.minus(this.reconciledTotal());
    };
    ViewBankTransactionModal.prototype.save = function () {
        var _this = this;
        this.selectedTransactions.forEach(function (reconcilation, transaction) {
            if (!_this.initialSelectedTransactions.has(transaction) || !_this.initialSelectedTransactions.get(transaction).amount.eq(reconcilation.amount)) {
                var createTransactionReconciliation = new __WEBPACK_IMPORTED_MODULE_8__data_transactions_create_transaction_reconciliation__["a" /* CreateTransactionReconciliation */]();
                createTransactionReconciliation.amount = reconcilation.amount;
                createTransactionReconciliation.transactionId = transaction.id;
                createTransactionReconciliation.bankTransactionId = _this.t.id;
                if (reconcilation.transactionAmountOverride)
                    createTransactionReconciliation.transactionAmountOverride = true;
                _this.budget.applyTransaction(createTransactionReconciliation);
            }
            else {
                // TODO: Update as needed (and only if needed)
            }
        });
        this.initialSelectedTransactions.forEach(function (reconcilation, transaction) {
            if (!_this.selectedTransactions.has(transaction) || !_this.selectedTransactions.get(transaction).amount.eq(reconcilation.amount)) {
                _this.budget.deleteTransaction(_this.budget.transactionProcessor.findTransactionsForRecord(reconcilation, __WEBPACK_IMPORTED_MODULE_8__data_transactions_create_transaction_reconciliation__["a" /* CreateTransactionReconciliation */])[0]);
            }
        });
    };
    ViewBankTransactionModal.prototype.close = function () {
        this.save();
        this.viewCtrl.dismiss();
    };
    ViewBankTransactionModal.prototype.createTransaction = function () {
        var _this = this;
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_9__add_edit_split_transaction_add_edit_split_transaction__["a" /* AddEditSplitTransactionModal */], { budgetId: this.budget.id, accountId: this.t.accountId, amount: this.reconciledRemaining().times(-1), description: this.t.description, date: this.t.date });
        modal.onDidDismiss(function (data) {
            if (data && data.transactions) {
                data.transactions.forEach(function (transaction) {
                    _this.selectedTransactions.set(transaction, { amount: transaction.amount });
                    _this.forceRefresh = true;
                });
            }
        });
        modal.present();
    };
    ViewBankTransactionModal.prototype.deleteBankTransactionConfirm = function () {
        var _this = this;
        var confirm = this.alertController.create({
            title: 'Delete?',
            message: 'Are you sure you want to delete this transaction? (TODO: functionality, notice: This will "flag" it as deleted)',
            buttons: [
                {
                    text: 'Cancel'
                }, {
                    text: 'Delete',
                    role: 'destructive',
                    handler: function () {
                        confirm.dismiss().then(function () {
                            _this.viewCtrl.dismiss();
                        });
                        return false;
                    }
                }
            ]
        });
        confirm.present();
    };
    ViewBankTransactionModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\modals\view-bank-transaction\view-bank-transaction.html"*/'<ion-header>\n\n    <ion-toolbar>\n\n\n\n    <ion-title>Bank Transaction</ion-title>\n\n\n\n    <ion-buttons end>\n\n        <button ion-button (click)="close()">Done</button>\n\n    </ion-buttons>\n\n\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content class="view-bank-transaction-modal">\n\n    <div responsive-padding>\n\n        <ion-item>\n\n            {{t.description}}\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-label>Date</ion-label>\n\n            <span item-right>{{t.date | dFormat}}</span>\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-label>Amount</ion-label>\n\n            <currency-display item-right showPositive [value]="t.amount"></currency-display>\n\n        </ion-item>\n\n        <ion-item *ngIf="t.balance">\n\n            <ion-label>Balance</ion-label>\n\n            <currency-display item-right showPositive [value]="t.balance"></currency-display>\n\n        </ion-item>\n\n        <!-- TODO: Virtual Scroll fixes -->\n\n\n\n        <button ion-item (click)="createTransaction()">\n\n            (Create Transaction)\n\n        </button>\n\n\n\n        <ion-list [virtualScroll]="unreconciliedAndThisReconciledTransactions()" approxItemHeight="44px" bufferRatio="20">\n\n            <button ion-item [class.selected]="isSelected(t)" *virtualItem="let t" (click)="toggleSelected(t)">\n\n                {{t.description}}\n\n                <currency-display item-right [value]="reconcileAmount(t)"></currency-display>\n\n            </button>\n\n        </ion-list>\n\n\n\n        Total: <currency-display [value]="reconciledTotal()"></currency-display>\n\n            \n\n    </div>\n\n    <button ion-button type="button" color="danger" clear small (click)="deleteBankTransactionConfirm()">Delete</button>\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\modals\view-bank-transaction\view-bank-transaction.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_6__engine_engine_factory__["a" /* EngineFactory */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* ModalController */]])
    ], ViewBankTransactionModal);
    return ViewBankTransactionModal;
}());

//# sourceMappingURL=view-bank-transaction.js.map

/***/ }),
/* 397 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecurePrompt; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SecurePrompt = (function () {
    function SecurePrompt(configuration, alertController) {
        this.configuration = configuration;
        this.alertController = alertController;
    }
    SecurePrompt.prototype.show = function (secureAccessor, field) {
        var _this = this;
        if (!this.configuration.secureAvailable()) {
            return this.alertController.create({
                title: 'Secure Stoarge',
                message: "Secure storage is unavailable: TODO: Why",
                buttons: ['OK']
            }).present();
        }
        return new Promise(function (resolve, reject) {
            var prompt = _this.alertController.create({
                title: 'Secure Stoarge',
                message: 'Enter secure data for "' + field + '"',
                inputs: [
                    {
                        name: 'data',
                        placeholder: 'Secure Data',
                        type: 'password'
                    },
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function (data) {
                            resolve(false);
                        }
                    },
                    {
                        // TODO: Only if data already present
                        text: 'Delete',
                        cssClass: 'danger',
                        handler: function (data) {
                            secureAccessor.removeSecure(field).then(function () {
                                resolve(false);
                            }).catch(function (error) {
                                // TODO: Prompt / log error ?
                                resolve(false);
                            });
                        }
                    },
                    {
                        text: 'Save',
                        handler: function (data) {
                            secureAccessor.setSecure(field, data.data).then(function () {
                                resolve(true);
                            }).catch(function (error) {
                                // TODO: Prompt / log error ?
                                resolve(false);
                            });
                        }
                    }
                ]
            });
            prompt.present();
        });
    };
    SecurePrompt = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
    ], SecurePrompt);
    return SecurePrompt;
}());

//# sourceMappingURL=secure-prompt.js.map

/***/ }),
/* 398 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_update_check__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_build_info__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AboutPage = (function () {
    function AboutPage(nav, configuration, updateCheck, alertController) {
        this.nav = nav;
        this.configuration = configuration;
        this.updateCheck = updateCheck;
        this.alertController = alertController;
        this.buildInfo = __WEBPACK_IMPORTED_MODULE_4__app_build_info__["a" /* BuildInfo */];
        this.nav = nav;
        this.projectMenuEnabled = true;
    }
    AboutPage.prototype.serviceWorkerUpdateCheck = function () {
        var _this = this;
        this.updateCheckDisabled = true;
        this.updateCheck.triggerServiceWorkerUpdateCheck();
        setTimeout(function () { _this.updateCheckDisabled = false; }, 5000);
    };
    AboutPage.prototype.webCheckUpdate = function () {
        var _this = this;
        this.updateCheckDisabled = true;
        this.updateCheck.runWebUpdateCheck().subscribe(function (response) {
            _this.updateCheckDisabled = false;
        }, function (error) {
            _this.updateCheckDisabled = false;
        });
    };
    AboutPage.prototype.isWkWebView = function () {
        if (navigator.platform.substr(0, 2) === 'iP') {
            //iOS (iPhone, iPod or iPad)
            var lte9 = /constructor/i.test(window.HTMLElement);
            var nav = window.navigator, ua = nav.userAgent, idb = !!window.indexedDB;
            if (ua.indexOf('Safari') !== -1 && ua.indexOf('Version') !== -1 && !nav.standalone) {
                //Safari (WKWebView/Nitro since 6+)
            }
            else if ((!idb && lte9) || !window.statusbar.visible) {
                //UIWebView
            }
            else if ((window.webkit && window.webkit.messageHandlers) || !lte9 || idb) {
                return true;
            }
        }
        return false;
    };
    AboutPage.prototype.unregisterServiceWorker = function () {
        var _this = this;
        this.alertController.create({
            buttons: [{ text: 'Ok', handler: function () { _this.updateCheck.unregisterServiceWorker(); } }, { text: 'Cancel', role: 'cancel' }],
            message: 'Unregistering the service worker will disable offline support. A new service worker will be installed after the app has been restarted.',
            title: 'Are you sure?'
        }).present();
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\pages\about\about.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <main-menu-icon></main-menu-icon>\n\n    </button>\n\n    <ion-title>About eBudget</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-item>Application<div item-right>eBudget</div></ion-item>\n\n    <ion-item>Version<div item-right>{{buildInfo.version}}</div></ion-item>\n\n\n\n    <!-- Service worker -->\n\n    <ion-item *ngIf="updateCheck.isServiceWorkerAvailable()">Service Worker\n\n      <div item-right>{{updateCheck.serviceWorkerVersion ? "Active " + updateCheck.serviceWorkerVersion : \'Restart app to activate\'}}</div>\n\n      <button ion-button item-right outline (click)="unregisterServiceWorker()">Unregister</button>\n\n    </ion-item>\n\n    <ion-item *ngIf="updateCheck.isServiceWorkerAvailable() && updateCheck.serviceWorkerVersion">\n\n      Updates\n\n      <button *ngIf="!updateCheck.serviceWorkerUpdateAvailable" ion-button item-right outline [disabled]="updateCheckDisabled" (click)="serviceWorkerUpdateCheck()">Check for updates</button>\n\n      <div *ngIf="updateCheck.serviceWorkerUpdateAvailable" item-right>Restart app to update to {{updateCheck.updatedServiceWorkerVersion}}</div>\n\n    </ion-item>\n\n    <!-- /Service worker -->\n\n\n\n    <ion-item *ngIf="!updateCheck.isServiceWorkerAvailable() && !configuration.native">\n\n      Updates\n\n      <button *ngIf="!updateCheck.webUpdateAvailable" ion-button item-right outline [disabled]="updateCheckDisabled" (click)="webCheckUpdate()">Check for updates</button>\n\n      <div *ngIf="updateCheck.webUpdateAvailable" item-right>Refresh to update to {{updateCheck.webVersion}}</div>\n\n    </ion-item>\n\n\n\n\n\n\n\n    <ion-item>Build Date<div item-right>{{buildInfo.buildDateYYYYMMDD}}</div></ion-item>\n\n    <ion-item>Device Id<div item-right>{{configuration.deviceId}}</div></ion-item>\n\n    <ion-item>Device Name<div item-right>{{configuration.deviceName}}</div></ion-item>\n\n    <ion-item>Platform<div item-right>{{configuration.deviceName}}</div></ion-item>\n\n    <ion-item>iOS WkWebView<div item-right>{{isWkWebView()}}</div></ion-item>\n\n  </ion-list>\n\n\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_3__services_update_check__["a" /* UpdateCheck */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),
/* 399 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateCheck; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notifications__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_ready__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_build_info__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UpdateCheck = (function () {
    function UpdateCheck(appReady, notifications, configuration, applicationRef, http) {
        var _this = this;
        this.notifications = notifications;
        this.configuration = configuration;
        this.applicationRef = applicationRef;
        this.http = http;
        this.logger = __WEBPACK_IMPORTED_MODULE_6__logger__["a" /* Logger */].get('notifications');
        this.serviceWorkerUnregistered = false;
        if (__WEBPACK_IMPORTED_MODULE_7__utils__["a" /* Utils */].getQueryStringValue('demo'))
            return; // Skip this for demos
        appReady.ready.then(function () {
            setTimeout(function () {
                if (!_this.checkAndNotifyServiceWorkerUpdate()) {
                    window.addEventListener('serviceworkerupdateavailable', function (ev) {
                        _this.checkAndNotifyServiceWorkerUpdate();
                        applicationRef.tick();
                    });
                    _this.triggerServiceWorkerUpdateCheck();
                    setInterval(function () { return _this.triggerServiceWorkerUpdateCheck(); }, 1000 * 60 * 60 /*1 Hour*/);
                }
                _this.initWebUpdateAutoCheck();
            }, 5000);
            _this.serviceWorkerVersion = window.activeServiceWorkerVersion;
            _this.checkServiceWorkerVersionMismatch();
            window.addEventListener('activeserviceworkerversionreported', function (ev) {
                _this.serviceWorkerVersion = window.activeServiceWorkerVersion;
                _this.checkServiceWorkerVersionMismatch();
                applicationRef.tick();
            });
            _this.checkAndNotifyServiceWorkerUpdate();
            window.addEventListener('updatedserviceworkerversionreported', function (ev) {
                _this.checkAndNotifyServiceWorkerUpdate();
                applicationRef.tick();
            });
            window.addEventListener('serviceworkerinstalled', function (ev) {
                var message = "Offline support has been installed. You can now use the app offline.";
                _this.logger.info(message);
                _this.notifications.show({ message: message, popup: true, silent: true, category: 'update-check' });
                applicationRef.tick();
            });
            _this.triggerServiceWorkerUpdateCheck();
        });
    }
    UpdateCheck.prototype.checkServiceWorkerVersionMismatch = function () {
        if (this.serviceWorkerVersion && this.serviceWorkerVersion !== __WEBPACK_IMPORTED_MODULE_5__app_build_info__["a" /* BuildInfo */].version) {
            this.logger.info("Service worker version (" + this.serviceWorkerVersion + ") <-> app version (" + __WEBPACK_IMPORTED_MODULE_5__app_build_info__["a" /* BuildInfo */].version + ") mismatach. Unregistering service worker.");
            this.unregisterServiceWorker();
        }
    };
    UpdateCheck.prototype.isServiceWorkerAvailable = function () {
        return !this.serviceWorkerUnregistered && window.serviceWorkerUpdateCheckFunction;
    };
    UpdateCheck.prototype.triggerServiceWorkerUpdateCheck = function () {
        if (this.serviceWorkerUpdateAvailable)
            return;
        if (window.serviceWorkerUpdateCheckFunction) {
            window.serviceWorkerUpdateCheckFunction();
        }
    };
    UpdateCheck.prototype.checkAndNotifyServiceWorkerUpdate = function () {
        if (this.serviceWorkerUpdateNotified)
            return true;
        if (window.serviceWorkerUpdateAvailable) {
            this.serviceWorkerUpdateAvailable = true;
        }
        if (window.updatedServiceWorkerVersion) {
            this.updatedServiceWorkerVersion = window.updatedServiceWorkerVersion;
            var message = "An update has been downloaded (" + this.updatedServiceWorkerVersion + ") and will be installed next time the app is opened.";
            this.logger.info(message);
            this.notifications.show({ message: message, popup: true, silent: true, category: 'update-check' });
            this.serviceWorkerUpdateNotified = true;
            return true;
        }
        return false;
    };
    UpdateCheck.prototype.unregisterServiceWorker = function () {
        var _this = this;
        if (window.serviceWorkerUnregisterFunction) {
            return (window.serviceWorkerUnregisterFunction()).then(function (result) {
                if (result) {
                    var message = "Offline support has been removed. It will be re-enabled after the app has been restarted.";
                    _this.serviceWorkerUnregistered = true;
                    _this.logger.info(message);
                    _this.notifications.show({ message: message, popup: true, silent: true, category: 'update-check' });
                }
                return result;
            });
        }
        return Promise.resolve(false);
    };
    UpdateCheck.prototype.initWebUpdateAutoCheck = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.webUpdateAvailable)
                return;
            _this.runWebUpdateCheck();
            _this.initWebUpdateAutoCheck();
        }, 1000 * 60 * 60 /*1 Hour*/);
        this.runWebUpdateCheck();
    };
    UpdateCheck.prototype.runWebUpdateCheck = function () {
        var _this = this;
        var observable = this.http.get('https://ebudget.live/info.json');
        observable.map(function (res) { return res.json(); })
            .subscribe(function (response) {
            try {
                if (__WEBPACK_IMPORTED_MODULE_5__app_build_info__["a" /* BuildInfo */].version !== response.version) {
                    _this.webVersion = response.version;
                    _this.webUpdateAvailable = true;
                    _this.logger.info("Web update is available. Version: " + _this.webVersion);
                    if (!_this.isServiceWorkerAvailable() && !_this.configuration.native) {
                        var message = "An update is available (" + _this.webVersion + "). Refresh to update.";
                        _this.logger.info(message);
                        _this.notifications.show({ message: message, popup: true, silent: true, category: 'update-check' });
                    }
                }
            }
            catch (err) {
                _this.logger.info("Error in response data from web update check", response, err);
            }
        }, function (error) {
            _this.logger.info("Error during web update check", error);
        });
        return observable;
    };
    UpdateCheck = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__app_app_ready__["a" /* AppReady */], __WEBPACK_IMPORTED_MODULE_2__notifications__["a" /* Notifications */], __WEBPACK_IMPORTED_MODULE_3__configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], UpdateCheck);
    return UpdateCheck;
}());

//# sourceMappingURL=update-check.js.map

/***/ }),
/* 400 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_configuration_service__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsPage = (function () {
    function SettingsPage(nav, configuration) {
        this.nav = nav;
        this.configuration = configuration;
    }
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\pages\settings\settings.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <main-menu-icon></main-menu-icon>\n\n    </button>\n\n    <ion-title>Settings</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <ion-list-header>\n\n    Common\n\n  </ion-list-header>\n\n  <ion-item>\n\n    <ion-label>Logging</ion-label>\n\n    <ion-select [(ngModel)]="configuration.loglevel">\n\n      <ion-option value="Standard">Standard</ion-option>\n\n      <ion-option value="Debug">Debug</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n\n\n  <ion-list-header>\n\n    Experimental\n\n  </ion-list-header>\n\n  <ion-item>\n\n    <ion-label>Show Transaction Notifications</ion-label>\n\n    <ion-toggle [(ngModel)]="configuration.optionBooleanAccessor(\'experimental.transaction.notifications\').value"></ion-toggle>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-label>Enable Split Transaction</ion-label>\n\n    <ion-toggle [(ngModel)]="configuration.optionBooleanAccessor(\'experimental.modals.show-split-transaction\').value"></ion-toggle>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-label>Enable Accounts</ion-label>\n\n    <ion-toggle [(ngModel)]="configuration.optionBooleanAccessor(\'experimental.accounts.enabled\').value"></ion-toggle>\n\n  </ion-item>\n\n\n\n  <ion-list-header>\n\n    Testing\n\n  </ion-list-header>\n\n  <ion-item>\n\n    <ion-label>Temporary Secure Storage</ion-label>\n\n    <ion-toggle [(ngModel)]="configuration.optionBooleanAccessor(\'testing.secure-storage.enabled\').value"></ion-toggle>\n\n  </ion-item>\n\n\n\n  \n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\pages\settings\settings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_configuration_service__["a" /* Configuration */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),
/* 401 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_notifications__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotificationsPage = (function () {
    function NotificationsPage(notifications) {
        this.notifications = notifications;
    }
    NotificationsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.markReadTimeout = setTimeout(function () {
            _this.notifications.markRead();
            _this.markReadTimeout = 0;
        }, 3000);
    };
    NotificationsPage.prototype.ionViewDidLeave = function () {
        if (this.markReadTimeout)
            clearTimeout(this.markReadTimeout);
    };
    NotificationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\pages\notifications\notifications.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <main-menu-icon></main-menu-icon>\n\n    </button>\n\n    <ion-title>Notifications</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <notification-list></notification-list>\n\n  </ion-list>\n\n\n\n</ion-content>'/*ion-inline-end:"c:\working\fb\ebudget\src\pages\notifications\notifications.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_notifications__["a" /* Notifications */]])
    ], NotificationsPage);
    return NotificationsPage;
}());

//# sourceMappingURL=notifications.js.map

/***/ }),
/* 402 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BankSyncUtils; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bank_sync_monitor__ = __webpack_require__(395);

var BankSyncUtils = (function () {
    function BankSyncUtils() {
    }
    BankSyncUtils.createMonitorWithNotifications = function (notifications) {
        return BankSyncUtils.notificationsOnMonitor(notifications, new __WEBPACK_IMPORTED_MODULE_0__bank_sync_monitor__["a" /* BankSyncMonitor */]());
    };
    BankSyncUtils.notificationsOnMonitor = function (notifications, monitor) {
        monitor.on('error-state-change').subscribe(function () {
            if (!monitor.running)
                notifications.show({ message: 'Bank Sync ' + monitor.bankLink.name + ' Failed with Error ' + monitor.errorMessage, category: 'bank-sync.' + monitor.bankLink.uuid });
        });
        monitor.on('complete-state-change').subscribe(function () {
            notifications.show({ message: 'Bank Sync ' + monitor.bankLink.name + ' Complete' + (monitor.errorMessage ? ' With Errors ' + monitor.errorMessage : ''), category: 'bank-sync.' + monitor.bankLink.uuid });
        });
        monitor.on('cancelled-state-change').subscribe(function () {
            notifications.show({ message: 'Bank Sync ' + monitor.bankLink.name + ' Cancelled', category: 'bank-sync.' + monitor.bankLink.uuid });
        });
        return monitor;
    };
    BankSyncUtils.timeoutWatchdogNotification = function (notifications, monitor, timeoutSeconds) {
        if (!monitor.running) {
            // TODO: With observables we should be able to replay this on subscribe...
            monitor.on('running-state-change').subscribe(function () {
                if (monitor.running) {
                    BankSyncUtils.iterateTimeoutWatchdogNotification(notifications, monitor, timeoutSeconds);
                }
            });
        }
        else {
        }
        return monitor;
    };
    // Note: We are polling here rather than setting a long timeout so we can manage memory tighter (and not end up with long timeouts and dangling references to live bank syncs)
    BankSyncUtils.iterateTimeoutWatchdogNotification = function (notifications, monitor, timeoutSeconds) {
        if (!monitor.running) {
            notifications.remove({ category: 'bank-sync.' + monitor.bankLink.uuid + '.timeout-watchdog' });
            return;
        }
        if (Date.now() - monitor.startTime > timeoutSeconds * 1000) {
            // TODO: This remove/show should be a single operation in the notifications options
            notifications.remove({ category: 'bank-sync.' + monitor.bankLink.uuid + '.timeout-watchdog' });
            notifications.show({ message: 'Bank Sync ' + monitor.bankLink.name + ' is taking too long to complete', category: 'bank-sync.' + monitor.bankLink.uuid + '.timeout-watchdog', important: true });
            setTimeout(function () { return BankSyncUtils.iterateTimeoutWatchdogNotification(notifications, monitor, timeoutSeconds * 2); }, 5000);
        }
        else {
            setTimeout(function () { return BankSyncUtils.iterateTimeoutWatchdogNotification(notifications, monitor, timeoutSeconds); }, 5000);
        }
    };
    return BankSyncUtils;
}());

//# sourceMappingURL=bank-sync-utils.js.map

/***/ }),
/* 403 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_logger_storage_appender__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_logger_ui_notifier_appender__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_logger__ = __webpack_require__(7);





__WEBPACK_IMPORTED_MODULE_4__services_logger__["a" /* Logger */].root.config.addAppender(new __WEBPACK_IMPORTED_MODULE_2__services_logger_storage_appender__["a" /* LoggerStorageAppender */]('default'));
__WEBPACK_IMPORTED_MODULE_4__services_logger__["a" /* Logger */].root.config.addAppender(__WEBPACK_IMPORTED_MODULE_3__services_logger_ui_notifier_appender__["a" /* LoggerUINotifierAppender */].instance);
// These are to catch error if angular hasn't initialised yet, so if there is a bootstrap error then these will take care of those...
// Otherwise the angular error handler will handle the errors and these will be superceeded
window.onerror = function (msg, url, line, col, error) {
    var extra = !col ? '' : '\ncolumn: ' + col;
    __WEBPACK_IMPORTED_MODULE_4__services_logger__["a" /* Logger */].get('window').error(msg + '\nurl: ' + url + '\nline: ' + line + extra, error);
    return false;
};
window.onunhandledrejection = function (event) {
    __WEBPACK_IMPORTED_MODULE_4__services_logger__["a" /* Logger */].get('window').error("Unhandled Promise Rejection", event);
    return false;
};
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_ready__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_exception_handler__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_budget_settings_budget_settings__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_account_account__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_bank_account_bank_account__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_budget_budget__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_about_about__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_category_category__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_settings_settings__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_dev_dev__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_notifications_notifications__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__modals_share_budget_share_budget__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__modals_add_budget_add_budget__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__modals_add_edit_category_add_edit_category__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__modals_add_edit_category_simple_weekly_add_edit_category_simple_weekly__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__modals_add_edit_transaction_add_edit_transaction__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__modals_add_edit_split_transaction_add_edit_split_transaction__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__modals_add_edit_split_transaction_add_edit_split_transaction_line__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__modals_add_edit_split_transfer_add_edit_split_transfer__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__modals_add_edit_split_transfer_add_edit_split_transfer_line__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__modals_add_edit_transfer_add_edit_transfer__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__modals_add_edit_account_add_edit_account__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_main_menu_content_main_menu_content__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_notification_list_notification_list__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_main_menu_icon_main_menu_icon__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__db_persistence_provider_manager__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__services_editor_provider__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__bank_bank_provider_registry__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__bank_standard_host_interface__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__bank_transaction_sync__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__bank_bank_sync__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__services_replication_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__services_updated_check__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__services_update_check__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__services_currency_formatter__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__services_notifications__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__db_transaction_serializer__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__components_currency_field__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__components_no_focus__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__components_error_label__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__components_replication_error_display__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__components_currency_display__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__components_date_format__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__components_currency_format__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__components_cute_progress_bar__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__ionic_native_splash_screen__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__ionic_native_status_bar__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__ionic_native_sqlite__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__ionic_native_device__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__ionic_native_in_app_browser__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__ionic_native_clipboard__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__modals_view_bank_transaction_view_bank_transaction__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__ionic_native_secure_storage__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__demo_demo_service__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__demo_demo_setup__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__services_autofocus__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__pages_bank_link_bank_link__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__modals_add_edit_bank_link_add_edit_bank_link__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__services_secure_prompt__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__bank_in_app_browser_interface_factory__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__bank_bank_link_local__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__bank_bank_auto_sync__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__components_status_status__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__services_reconciliation_status__ = __webpack_require__(528);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









































































var AppModule = (function () {
    function AppModule(updatedCheck, updateCheck, bankAutoSync, reconciliationStatus) {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* App */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_budget_settings_budget_settings__["a" /* BudgetSettingsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_account_account__["a" /* AccountPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_budget_budget__["a" /* BudgetPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_dev_dev__["a" /* DevPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_bank_account_bank_account__["a" /* BankAccountPage */],
                __WEBPACK_IMPORTED_MODULE_17__modals_share_budget_share_budget__["a" /* ShareBudgetModal */],
                __WEBPACK_IMPORTED_MODULE_18__modals_add_budget_add_budget__["a" /* AddBudgetModal */],
                __WEBPACK_IMPORTED_MODULE_19__modals_add_edit_category_add_edit_category__["a" /* AddEditCategoryModal */],
                __WEBPACK_IMPORTED_MODULE_21__modals_add_edit_transaction_add_edit_transaction__["a" /* AddEditTransactionModal */],
                __WEBPACK_IMPORTED_MODULE_22__modals_add_edit_split_transaction_add_edit_split_transaction__["a" /* AddEditSplitTransactionModal */],
                __WEBPACK_IMPORTED_MODULE_23__modals_add_edit_split_transaction_add_edit_split_transaction_line__["a" /* AddEditSplitTransactionLineModal */],
                __WEBPACK_IMPORTED_MODULE_24__modals_add_edit_split_transfer_add_edit_split_transfer__["a" /* AddEditSplitTransferModal */],
                __WEBPACK_IMPORTED_MODULE_25__modals_add_edit_split_transfer_add_edit_split_transfer_line__["a" /* AddEditSplitTransferLineModal */],
                __WEBPACK_IMPORTED_MODULE_26__modals_add_edit_transfer_add_edit_transfer__["a" /* AddEditTransferModal */],
                __WEBPACK_IMPORTED_MODULE_27__modals_add_edit_account_add_edit_account__["a" /* AddEditAccountModal */],
                __WEBPACK_IMPORTED_MODULE_20__modals_add_edit_category_simple_weekly_add_edit_category_simple_weekly__["a" /* AddEditCategorySimpleWeeklyModal */],
                __WEBPACK_IMPORTED_MODULE_60__modals_view_bank_transaction_view_bank_transaction__["a" /* ViewBankTransactionModal */],
                __WEBPACK_IMPORTED_MODULE_46__components_currency_field__["a" /* CurrencyField */],
                __WEBPACK_IMPORTED_MODULE_71__components_status_status__["a" /* Status */],
                __WEBPACK_IMPORTED_MODULE_47__components_no_focus__["a" /* NoFocusDirective */],
                __WEBPACK_IMPORTED_MODULE_48__components_error_label__["a" /* ErrorLabel */],
                __WEBPACK_IMPORTED_MODULE_49__components_replication_error_display__["a" /* ReplicationErrorDisplay */],
                __WEBPACK_IMPORTED_MODULE_50__components_currency_display__["a" /* CurrencyDisplay */],
                __WEBPACK_IMPORTED_MODULE_51__components_date_format__["a" /* DFormatPipe */],
                __WEBPACK_IMPORTED_MODULE_28__components_main_menu_content_main_menu_content__["a" /* MainMenuContent */],
                __WEBPACK_IMPORTED_MODULE_13__pages_category_category__["b" /* CategoryPopover */],
                __WEBPACK_IMPORTED_MODULE_52__components_currency_format__["a" /* CFormatPipe */],
                __WEBPACK_IMPORTED_MODULE_53__components_cute_progress_bar__["a" /* CuteProgressBar */],
                __WEBPACK_IMPORTED_MODULE_30__components_main_menu_icon_main_menu_icon__["a" /* MainMenuIcon */],
                __WEBPACK_IMPORTED_MODULE_29__components_notification_list_notification_list__["a" /* NotificationList */],
                __WEBPACK_IMPORTED_MODULE_65__pages_bank_link_bank_link__["a" /* BankLinkPage */],
                __WEBPACK_IMPORTED_MODULE_66__modals_add_edit_bank_link_add_edit_bank_link__["a" /* AddEditBankLinkModal */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* App */], { swipeBackEnabled: false }, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* App */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_bank_account_bank_account__["a" /* BankAccountPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_budget_settings_budget_settings__["a" /* BudgetSettingsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_budget_budget__["a" /* BudgetPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_account_account__["a" /* AccountPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_dev_dev__["a" /* DevPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_17__modals_share_budget_share_budget__["a" /* ShareBudgetModal */],
                __WEBPACK_IMPORTED_MODULE_18__modals_add_budget_add_budget__["a" /* AddBudgetModal */],
                __WEBPACK_IMPORTED_MODULE_19__modals_add_edit_category_add_edit_category__["a" /* AddEditCategoryModal */],
                __WEBPACK_IMPORTED_MODULE_21__modals_add_edit_transaction_add_edit_transaction__["a" /* AddEditTransactionModal */],
                __WEBPACK_IMPORTED_MODULE_22__modals_add_edit_split_transaction_add_edit_split_transaction__["a" /* AddEditSplitTransactionModal */],
                __WEBPACK_IMPORTED_MODULE_23__modals_add_edit_split_transaction_add_edit_split_transaction_line__["a" /* AddEditSplitTransactionLineModal */],
                __WEBPACK_IMPORTED_MODULE_24__modals_add_edit_split_transfer_add_edit_split_transfer__["a" /* AddEditSplitTransferModal */],
                __WEBPACK_IMPORTED_MODULE_25__modals_add_edit_split_transfer_add_edit_split_transfer_line__["a" /* AddEditSplitTransferLineModal */],
                __WEBPACK_IMPORTED_MODULE_26__modals_add_edit_transfer_add_edit_transfer__["a" /* AddEditTransferModal */],
                __WEBPACK_IMPORTED_MODULE_27__modals_add_edit_account_add_edit_account__["a" /* AddEditAccountModal */],
                __WEBPACK_IMPORTED_MODULE_20__modals_add_edit_category_simple_weekly_add_edit_category_simple_weekly__["a" /* AddEditCategorySimpleWeeklyModal */],
                __WEBPACK_IMPORTED_MODULE_60__modals_view_bank_transaction_view_bank_transaction__["a" /* ViewBankTransactionModal */],
                __WEBPACK_IMPORTED_MODULE_13__pages_category_category__["b" /* CategoryPopover */],
                __WEBPACK_IMPORTED_MODULE_65__pages_bank_link_bank_link__["a" /* BankLinkPage */],
                __WEBPACK_IMPORTED_MODULE_66__modals_add_edit_bank_link_add_edit_bank_link__["a" /* AddEditBankLinkModal */]
            ],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_6__app_exception_handler__["a" /* AppExceptionHandler */] },
                __WEBPACK_IMPORTED_MODULE_70__bank_bank_auto_sync__["a" /* BankAutoSync */],
                __WEBPACK_IMPORTED_MODULE_69__bank_bank_link_local__["a" /* BankLinkLocal */],
                __WEBPACK_IMPORTED_MODULE_36__bank_standard_host_interface__["a" /* StandardHostInterface */],
                __WEBPACK_IMPORTED_MODULE_35__bank_bank_provider_registry__["a" /* BankProviderRegistry */],
                __WEBPACK_IMPORTED_MODULE_68__bank_in_app_browser_interface_factory__["a" /* InAppBrowserInterfaceFactory */],
                __WEBPACK_IMPORTED_MODULE_67__services_secure_prompt__["a" /* SecurePrompt */],
                __WEBPACK_IMPORTED_MODULE_37__bank_transaction_sync__["a" /* TransactionSync */],
                __WEBPACK_IMPORTED_MODULE_38__bank_bank_sync__["a" /* BankSync */],
                __WEBPACK_IMPORTED_MODULE_57__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_59__ionic_native_clipboard__["a" /* Clipboard */],
                __WEBPACK_IMPORTED_MODULE_61__ionic_native_secure_storage__["a" /* SecureStorage */],
                __WEBPACK_IMPORTED_MODULE_56__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_58__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_54__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_55__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__app_ready__["a" /* AppReady */],
                __WEBPACK_IMPORTED_MODULE_40__services_updated_check__["a" /* UpdatedCheck */],
                __WEBPACK_IMPORTED_MODULE_41__services_update_check__["a" /* UpdateCheck */],
                __WEBPACK_IMPORTED_MODULE_43__services_notifications__["a" /* Notifications */],
                __WEBPACK_IMPORTED_MODULE_42__services_currency_formatter__["a" /* CurrencyFormatter */],
                __WEBPACK_IMPORTED_MODULE_33__services_editor_provider__["a" /* EditorProvider */],
                __WEBPACK_IMPORTED_MODULE_34__services_configuration_service__["a" /* Configuration */],
                __WEBPACK_IMPORTED_MODULE_32__db_persistence_provider_manager__["a" /* PersistenceProviderManager */],
                __WEBPACK_IMPORTED_MODULE_31__db_dbms__["a" /* Dbms */],
                __WEBPACK_IMPORTED_MODULE_44__db_transaction_serializer__["a" /* TransactionSerializer */],
                __WEBPACK_IMPORTED_MODULE_45__engine_engine_factory__["a" /* EngineFactory */],
                __WEBPACK_IMPORTED_MODULE_39__services_replication_service__["a" /* Replication */],
                __WEBPACK_IMPORTED_MODULE_62__demo_demo_service__["a" /* DemoService */],
                __WEBPACK_IMPORTED_MODULE_63__demo_demo_setup__["a" /* DemoSetup */],
                __WEBPACK_IMPORTED_MODULE_64__services_autofocus__["a" /* Autofocus */],
                __WEBPACK_IMPORTED_MODULE_72__services_reconciliation_status__["a" /* ReconciliationStatus */]
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_40__services_updated_check__["a" /* UpdatedCheck */], __WEBPACK_IMPORTED_MODULE_41__services_update_check__["a" /* UpdateCheck */], __WEBPACK_IMPORTED_MODULE_70__bank_bank_auto_sync__["a" /* BankAutoSync */], __WEBPACK_IMPORTED_MODULE_72__services_reconciliation_status__["a" /* ReconciliationStatus */]])
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_budget_budget__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__db_persistence_provider_manager__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_editor_provider__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_replication_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__db_transaction_serializer__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_ready__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__bank_bank_provider_registry__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__data_transactions_init_budget_transaction__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__data_transactions_init_category_transaction__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__data_transactions_init_simple_transaction__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__data_transactions_create_split_transaction__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__data_transactions_create_split_transfer__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__data_transactions_init_category_transfer_transaction__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__data_transactions_init_category_simple_weekly_transaction__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__data_transactions_create_account_transaction__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__data_transactions_merge_bank_transactions__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__modals_add_edit_transfer_add_edit_transfer__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__modals_add_edit_transaction_add_edit_transaction__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__modals_add_edit_split_transaction_add_edit_split_transaction__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__modals_add_edit_split_transfer_add_edit_split_transfer__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__bank_providers_anz_mobile_web_1__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__bank_providers_mock_data_provider__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__data_transactions_create_transaction_reconciliation__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__services_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__demo_demo_service__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__services_autofocus__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__demo_demo_setup__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__data_transactions_create_bank_link__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__data_transactions_set_account_bank_link__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__data_transactions_bank_transaction_ignore__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__data_transactions_bank_transaction_delete__ = __webpack_require__(390);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







































var App = (function () {
    function App(platform, configuration, dbms, persistenceProviderManager, replication, transactionSerializer, editorProvider, appReady, statusBar, splashScreen, bankProviderRegistry, demoService, autofocus, demoSetup) {
        var _this = this;
        this.configuration = configuration;
        this.transactionSerializer = transactionSerializer;
        this.editorProvider = editorProvider;
        this.appReady = appReady;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.bankProviderRegistry = bankProviderRegistry;
        this.demoService = demoService;
        this.autofocus = autofocus;
        this.demoSetup = demoSetup;
        this.logger = __WEBPACK_IMPORTED_MODULE_12__services_logger__["a" /* Logger */].get('App');
        this.logger.info('Constructing App');
        platform.ready().then(function () {
            _this.logger.info('Platform Ready');
            _this.logger.info('Initialising Persistence Provider');
            persistenceProviderManager.provide().init().then(function () {
                _this.logger.info('Initialising Persistence Provider');
                _this.logger.info('Loading Configuration');
                return configuration.configure();
            }).then(function () {
                _this.registerTransactions();
                _this.registerEditorProviders();
                _this.registerBankProviders();
                _this.logger.info('Loading Configuration Done');
                _this.logger.info('Initialising Dbms');
                return dbms.init();
            }).then(function () {
                _this.logger.info('Initialising Dbms Done');
                _this.logger.info('Initialising Replication');
                replication.init();
                _this.logger.info('Initialising Replication Done');
                statusBar.styleDefault();
                splashScreen.hide(); // TODO: Move this earlier if want to have a splash screen while the db init runs... can nav.setRoot to a "loading..." page, then set the real page below... Can maybe even have progress updates with the "then()" statements?
                _this.ready = true;
                if (configuration.lastOpenedBudget()) {
                    var lastOpenedBudgetId = configuration.lastOpenedBudget();
                    try {
                        var budget = dbms.getDb(lastOpenedBudgetId);
                        if (!budget) {
                            _this.logger.info('Budget ' + lastOpenedBudgetId + ' not found for auto opening');
                            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
                        }
                        else {
                            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_budget_budget__["a" /* BudgetPage */], { 'budget': budget });
                        }
                    }
                    catch (e) {
                        configuration.lastOpenedBudget(null);
                        _this.logger.error('Unable to auto open budget ' + lastOpenedBudgetId, e);
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
                    }
                }
                else {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
                }
                appReady.readyResolve();
                if (__WEBPACK_IMPORTED_MODULE_31__services_utils__["a" /* Utils */].getQueryStringValue('demo')) {
                    demoSetup.fadeOut(true);
                    autofocus.setEnabled(false);
                    demoService.start();
                }
            }).catch(function (err) {
                _this.logger.error('Error in initialisation', err);
            });
        });
    }
    App.prototype.registerEditorProviders = function () {
        this.editorProvider.registerModalProvider(new TransactionModalProvider(new __WEBPACK_IMPORTED_MODULE_20__data_transactions_init_category_transfer_transaction__["a" /* InitCategoryTransferTransaction */]().getTypeId(), __WEBPACK_IMPORTED_MODULE_24__modals_add_edit_transfer_add_edit_transfer__["a" /* AddEditTransferModal */]));
        this.editorProvider.registerModalProvider(new TransactionModalProvider(new __WEBPACK_IMPORTED_MODULE_17__data_transactions_init_simple_transaction__["a" /* InitSimpleTransaction */]().getTypeId(), __WEBPACK_IMPORTED_MODULE_25__modals_add_edit_transaction_add_edit_transaction__["a" /* AddEditTransactionModal */]));
        this.editorProvider.registerModalProvider(new TransactionModalProvider(new __WEBPACK_IMPORTED_MODULE_18__data_transactions_create_split_transaction__["a" /* CreateSplitTransaction */]().getTypeId(), __WEBPACK_IMPORTED_MODULE_26__modals_add_edit_split_transaction_add_edit_split_transaction__["a" /* AddEditSplitTransactionModal */]));
        this.editorProvider.registerModalProvider(new TransactionModalProvider(new __WEBPACK_IMPORTED_MODULE_19__data_transactions_create_split_transfer__["a" /* CreateSplitTransfer */]().getTypeId(), __WEBPACK_IMPORTED_MODULE_27__modals_add_edit_split_transfer_add_edit_split_transfer__["a" /* AddEditSplitTransferModal */]));
    };
    App.prototype.registerTransactions = function () {
        this.transactionSerializer.registerType(__WEBPACK_IMPORTED_MODULE_16__data_transactions_init_category_transaction__["a" /* InitCategoryTransaction */]);
        this.transactionSerializer.registerType(__WEBPACK_IMPORTED_MODULE_20__data_transactions_init_category_transfer_transaction__["a" /* InitCategoryTransferTransaction */]);
        this.transactionSerializer.registerType(__WEBPACK_IMPORTED_MODULE_17__data_transactions_init_simple_transaction__["a" /* InitSimpleTransaction */]);
        this.transactionSerializer.registerType(__WEBPACK_IMPORTED_MODULE_18__data_transactions_create_split_transaction__["a" /* CreateSplitTransaction */]);
        this.transactionSerializer.registerType(__WEBPACK_IMPORTED_MODULE_19__data_transactions_create_split_transfer__["a" /* CreateSplitTransfer */]);
        this.transactionSerializer.registerType(__WEBPACK_IMPORTED_MODULE_15__data_transactions_init_budget_transaction__["a" /* InitBudgetTransaction */]);
        this.transactionSerializer.registerType(__WEBPACK_IMPORTED_MODULE_21__data_transactions_init_category_simple_weekly_transaction__["a" /* InitCategorySimpleWeeklyTransaction */]);
        this.transactionSerializer.registerType(__WEBPACK_IMPORTED_MODULE_22__data_transactions_create_account_transaction__["a" /* CreateAccountTransaction */]);
        this.transactionSerializer.registerType(__WEBPACK_IMPORTED_MODULE_23__data_transactions_merge_bank_transactions__["a" /* MergeBankTransactions */]);
        this.transactionSerializer.registerType(__WEBPACK_IMPORTED_MODULE_30__data_transactions_create_transaction_reconciliation__["a" /* CreateTransactionReconciliation */]);
        this.transactionSerializer.registerType(__WEBPACK_IMPORTED_MODULE_35__data_transactions_create_bank_link__["a" /* CreateBankLink */]);
        this.transactionSerializer.registerType(__WEBPACK_IMPORTED_MODULE_36__data_transactions_set_account_bank_link__["a" /* SetAccountBankLink */]);
        this.transactionSerializer.registerType(__WEBPACK_IMPORTED_MODULE_37__data_transactions_bank_transaction_ignore__["a" /* BankTransactionIgnore */]);
        this.transactionSerializer.registerType(__WEBPACK_IMPORTED_MODULE_38__data_transactions_bank_transaction_delete__["a" /* BankTransactionDelete */]);
    };
    App.prototype.registerBankProviders = function () {
        this.bankProviderRegistry.registerProvider(__WEBPACK_IMPORTED_MODULE_28__bank_providers_anz_mobile_web_1__["a" /* AnzMobileWeb1Provider */]);
        this.bankProviderRegistry.registerProvider(__WEBPACK_IMPORTED_MODULE_29__bank_providers_mock_data_provider__["a" /* MockDataProvider */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* Nav */])
    ], App.prototype, "nav", void 0);
    App = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\working\fb\ebudget\src\app\app.html"*/'<ion-menu class="main-menu" swipeEnabled="false" #menu [content]="content">\n  <ion-header><ion-toolbar></ion-toolbar></ion-header>\n    <ion-content>\n      <main-menu-content [menu]="menu" [nav]="content"></main-menu-content>\n    </ion-content>\n</ion-menu>\n\n\n<ion-nav id="nav" [root]="rootPage" #content></ion-nav>\n'/*ion-inline-end:"c:\working\fb\ebudget\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_9__services_configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_6__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_7__db_persistence_provider_manager__["a" /* PersistenceProviderManager */], __WEBPACK_IMPORTED_MODULE_10__services_replication_service__["a" /* Replication */], __WEBPACK_IMPORTED_MODULE_11__db_transaction_serializer__["a" /* TransactionSerializer */], __WEBPACK_IMPORTED_MODULE_8__services_editor_provider__["a" /* EditorProvider */], __WEBPACK_IMPORTED_MODULE_13__app_ready__["a" /* AppReady */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_14__bank_bank_provider_registry__["a" /* BankProviderRegistry */], __WEBPACK_IMPORTED_MODULE_32__demo_demo_service__["a" /* DemoService */], __WEBPACK_IMPORTED_MODULE_33__services_autofocus__["a" /* Autofocus */], __WEBPACK_IMPORTED_MODULE_34__demo_demo_setup__["a" /* DemoSetup */]])
    ], App);
    return App;
}());

var TransactionModalProvider = (function (_super) {
    __extends(TransactionModalProvider, _super);
    function TransactionModalProvider(transactionType, modalClass) {
        var _this = _super.call(this) || this;
        _this.transactionType = transactionType;
        _this.modalClass = modalClass;
        return _this;
    }
    TransactionModalProvider.prototype.provide = function (params) {
        if (params.typeId === this.transactionType)
            return this.modalClass;
    };
    return TransactionModalProvider;
}(__WEBPACK_IMPORTED_MODULE_8__services_editor_provider__["b" /* ModalProvider */]));
//# sourceMappingURL=app.component.js.map

/***/ }),
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Db; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transaction_processor__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_chunked_task__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);




var Db = (function () {
    function Db(id, dbms, persistenceProvider, loki, transactionSerializer) {
        var _this = this;
        this.id = id;
        this.dbms = dbms;
        this.persistenceProvider = persistenceProvider;
        this.loki = loki;
        this.transactionSerializer = transactionSerializer;
        this.logger = __WEBPACK_IMPORTED_MODULE_1__services_logger__["a" /* Logger */].get('Db');
        this.active = false;
        this.initialised = false;
        this.transactionProcessor = new __WEBPACK_IMPORTED_MODULE_0__transaction_processor__["a" /* TransactionProcessor */](this, this.loki);
        this.transactions = this.loki.addCollection('transactions_' + this.id);
        this.transactions.ensureUniqueIndex('id');
        this.eventListeners = [];
        this.dbEventsObservable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) { return _this.dbEventsObserver = observer; }).share();
        this.dbTransactionEventsObservable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) { return _this.dbTransactionEventsObserver = observer; }).share();
    }
    Db.prototype.toJSON = function () {
        return this.id;
    };
    Db.prototype.init = function () {
        var _this = this;
        return this.persistenceProvider.transactions(this.id).then(function (dbtransactions) {
            dbtransactions.forEach(function (transaction) {
                _this.transactions.insert(transaction);
            });
            _this.sortedTransactions = _this.transactions.addDynamicView('sortedTransactions_' + _this.id);
            _this.sortedTransactions.applySimpleSort('id');
            _this.initialised = true;
        });
    };
    Db.prototype.isActive = function () {
        return this.active;
    };
    Db.prototype.isBatchProcessing = function () {
        return this.batchProcessing;
    };
    Db.prototype.activate = function (progressCallback) {
        var _this = this;
        // If already active, then skip and return straight away
        if (this.active)
            return Promise.resolve();
        this.logger.info("Activating Budget " + this.name());
        if (!this.initialised)
            throw new Error('Activate called when not yet initialised.');
        if (this.activating) {
            this.logger.info("Budget Already Activating " + this.name());
            return Promise.resolve();
        }
        this.activating = true;
        this.batchProcessing = true;
        this.fireEvent({ eventName: 'transaction-batch-start' });
        var p = __WEBPACK_IMPORTED_MODULE_2__services_chunked_task__["a" /* ChunkedTask */].execute(function (iterator, resolve, reject) {
            // Can update this to just pass in the array... Put it in the initialiser...
            // Or: Can move the: "Size" to a property and just have a single statement here...
            if (iterator.getValue() === 0) {
                // To handle when the array is empty
                if (_this.sortedTransactions.data().length == 0) {
                    resolve();
                    return;
                }
                iterator.setExpectedSize(_this.sortedTransactions.data().length);
            }
            _this.applyTransaction(_this.sortedTransactions.data()[iterator.getValue()]);
            if (iterator.getValue() == _this.sortedTransactions.data().length - 1)
                resolve();
        }, { progressCallback: progressCallback }).then(function () {
            _this.activating = false;
            _this.active = true;
            _this.logger.info("Activated Budget " + _this.name());
            _this.fireEvent({ eventName: 'db-activated' });
            _this.batchProcessing = false;
            _this.fireEvent({ eventName: 'transaction-batch-end' });
        }).catch(function (reason) {
            _this.activating = false;
            _this.active = false;
            _this.batchProcessing = false;
            _this.logger.error("Error activating db", reason);
        });
        return p;
    };
    Db.prototype.isActivating = function () {
        return this.activating;
    };
    Db.prototype.deactivate = function () {
        if (!this.active)
            return;
        // TODO: Delete tables (not transactions, but generated tables)
        this.active = false;
    };
    Db.prototype.name = function (name) {
        return this.localSetting('name', name);
    };
    Db.prototype.transactionIdLocalGen = function (localGenId) {
        var id = this.localSetting('localGenId', localGenId);
        if (!id)
            return 1;
        if (parseInt(id) < 1 || parseInt(id) > 999)
            throw new Error('localGenId must be between 1 - 999 inclusive. Value is: ' + localGenId);
        return parseInt(id);
    };
    Db.prototype.localSetting = function (key, valueString) {
        return this.persistenceProvider.keyStore(this.id, key, valueString);
    };
    // Returns the next transaction Id above the head transaction (So does not increment, incrementing occurs on processing)
    Db.prototype.nextTransactionId = function () {
        return ~~((~~((this.transactionIdHead ? this.transactionIdHead : 0) / 1000) + 1) * 1000) + this.transactionIdLocalGen();
    };
    Db.prototype.extractTransactionLocalGenId = function (transactionId) {
        return transactionId % 1000;
    };
    Db.prototype.updateTransactionIdHead = function (transaction) {
        if (!this.transactionIdHead || transaction.id > this.transactionIdHead)
            this.transactionIdHead = transaction.id;
    };
    /**
     * Applying a transaction will execute it and persist it in the database.
     *
     * The transaction must be a new one, or attached to a database, not a clone
     */
    Db.prototype.applyTransaction = function (transaction) {
        try {
            // Updated works like the following:-
            // If active, then it is updated if a transaction is already applied
            // If inactive, then it is updated if a transaction is already in the database
            // In both cases, the previous version is fetched from the database, to be passed to the event
            // In the already active case, the previous version is also passed to the transaction update (although it could also collect info from the "records")
            var updated = false;
            var updatedOriginalTransaction = void 0;
            if (transaction.id)
                this.updateTransactionIdHead(transaction);
            // Ignore deleted transactions
            if (transaction.deleted) {
                if (!transaction.id) {
                    // Ignore this, it's been deleted and never persisted...
                    return;
                }
                else if (!transaction.applied) {
                    // If it's not applied and it's deleted, that is the final state we want for the transaction, so lets leave it here...
                    // Save the transaction still unless we are activating
                    if (!this.activating)
                        this.deleteTransaction(transaction);
                    return;
                }
                else {
                    // It's deleted AND applied, so we need to processes the deletion
                    this.deleteTransaction(transaction);
                    // Transaction applied is called in delete...
                    return;
                }
            }
            else {
                // Give a new transaction an Id
                if (!transaction.id) {
                    transaction.id = this.nextTransactionId();
                    this.updateTransactionIdHead(transaction);
                }
                // Process transactions
                if (this.active || this.activating) {
                    if (!transaction.applied) {
                        transaction.apply(this.transactionProcessor);
                        transaction.applied = true;
                    }
                    else {
                        updated = true;
                        updatedOriginalTransaction = this.persistenceProvider.getTransaction(this.id, transaction.id);
                        transaction.update(this.transactionProcessor, updatedOriginalTransaction);
                    }
                }
                if (!this.activating) {
                    updated = updated || (!this.active && transaction.$loki != null);
                    if (updated && !updatedOriginalTransaction)
                        updatedOriginalTransaction = this.persistenceProvider.getTransaction(this.id, transaction.id);
                    this.saveTransaction(transaction);
                }
            }
            this.fireEvent({ eventName: 'transaction-applied', data: { transaction: transaction, update: updated, originalTransaction: updatedOriginalTransaction } });
        }
        catch (err) {
            this.logger.info("Error applying transaction. Throwing Error.", transaction, err);
            throw err;
        }
    };
    Db.prototype.getTransaction = function (transactionId) {
        return this.transactions.by('id', transactionId);
    };
    /**
     * Saving a transaction will persist it, but not apply it
     * This should only be called internally, or if extra transaction
     * data is needing to be saved without any modifications to the transaction itself
     *
     * The transaction must be a new one, or attached to a database, not a clone
     */
    Db.prototype.saveTransaction = function (transaction) {
        // Determine which one... it doesn't matter
        if (this.getTransaction(transaction.id) == null) {
            this.transactions.insert(transaction);
        }
        else {
            this.transactions.update(transaction);
        }
        this.persistenceProvider.saveTransaction(this.id, this.transactionSerializer.cloneTransaction(transaction));
    };
    /**
     * Undo a transaction and remove it from the database
     */
    Db.prototype.deleteTransaction = function (transaction) {
        transaction.deleted = true;
        if (this.getTransaction(transaction.id) == null) {
            this.transactions.insert(transaction);
        }
        else {
            this.transactions.update(transaction);
        }
        this.persistenceProvider.saveTransaction(this.id, this.transactionSerializer.cloneTransaction(transaction));
        this.undoTransaction(transaction);
    };
    Db.prototype.undoTransaction = function (transaction) {
        if (!transaction.applied)
            return;
        transaction.undo(this.transactionProcessor);
        transaction.applied = false;
        this.fireEvent({ eventName: 'transaction-undone', data: { transaction: transaction } });
    };
    Db.prototype.addEventListener = function (listener) {
        this.eventListeners.push(listener);
    };
    Db.prototype.on = function (event) {
        if (event === 'db-activated' || event === 'db-deleted')
            return this.dbEventsObservable.filter(function (dbEvent) { return dbEvent.eventName === event; });
        return this.dbTransactionEventsObservable.filter(function (dbEvent) { return dbEvent.eventName === event; });
    };
    Db.prototype.deleteInternal = function () {
        this.fireEvent({ eventName: 'db-deleted' });
        this.eventListeners.length = 0;
    };
    Db.prototype.fireEvent = function (dbEvent) {
        if (!dbEvent.db)
            dbEvent.db = this;
        this.logger.debug(function () { return dbEvent; });
        this.eventListeners.forEach(function (listener) { listener(dbEvent); });
        if (this.dbEventsObserver && dbEvent.eventName === 'db-activated' || dbEvent.eventName === 'db-deleted')
            this.dbEventsObserver.next(dbEvent);
        else if (this.dbTransactionEventsObserver)
            this.dbTransactionEventsObserver.next(dbEvent);
    };
    return Db;
}());

//# sourceMappingURL=db.js.map

/***/ }),
/* 479 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionProcessor; });
var TransactionProcessor = (function () {
    function TransactionProcessor(db, loki) {
        this.loki = loki;
        this.db = db;
    }
    TransactionProcessor.prototype.tableByName = function (tableName, type) {
        var collection = this.loki.getCollection(tableName + '_' + this.db.id);
        if (collection == null) {
            collection = this.loki.addCollection(tableName + '_' + this.db.id, new type().tableCreationOptions);
            new type().initTable(collection);
        }
        return collection;
    };
    TransactionProcessor.prototype.table = function (type) {
        return this.tableByName(new type().tableName(), type);
    };
    TransactionProcessor.prototype.single = function (type) {
        var table = this.tableByName(new type().tableName(), type);
        if (!table.data.length) {
            table.insert(new type());
        }
        return table.data[0];
    };
    TransactionProcessor.prototype.unmapTransactionAndRecord = function (transaction, record) {
        if (transaction.records && transaction.records.indexOf(record) != -1)
            transaction.records.splice(transaction.records.indexOf(record), 1);
        if (record.transactions && record.transactions.indexOf(transaction) != -1)
            record.transactions.splice(record.transactions.indexOf(transaction), 1);
    };
    TransactionProcessor.prototype.mapTransactionAndRecord = function (transaction, record) {
        if (!transaction.records)
            transaction.records = new Array();
        if (transaction.records.indexOf(record) == -1)
            transaction.records.push(record);
        if (!record.transactions)
            record.transactions = new Array();
        if (record.transactions.indexOf(transaction) == -1)
            record.transactions.push(transaction);
    };
    TransactionProcessor.prototype.findAllTransactionsForRecord = function (record) {
        return record.transactions;
    };
    TransactionProcessor.prototype.findTransactionsForRecord = function (record, type) {
        var typeId = new type().getTypeId();
        return record.transactions.filter(function (t) { return t.getTypeId() === typeId; });
    };
    TransactionProcessor.prototype.findAllRecordsForTransaction = function (transaction) {
        return transaction.records == null ? [] : transaction.records;
    };
    TransactionProcessor.prototype.findRecordsForTransaction = function (transaction, type) {
        if (transaction.records == null)
            return [];
        return transaction.records.filter(function (r) { return r instanceof type; });
    };
    TransactionProcessor.prototype.unsupported = function () {
        throw new Error('Unsupported Transaction Operation');
    };
    return TransactionProcessor;
}());

//# sourceMappingURL=transaction-processor.js.map

/***/ }),
/* 480 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChunkedTask; });
/* unused harmony export ChunkedTaskTest */
var ChunkedTask = (function () {
    function ChunkedTask() {
    }
    ChunkedTask.execute = function (executor, iteratorData) {
        var p = new Promise(function (promiseResolve, promiseReject) {
            var iterator = new ChunkedTaskIterator();
            iterator.setValue(0);
            if (iteratorData) {
                iterator.progressCallback = iteratorData.progressCallback;
            }
            var func = function () { return executor(iterator, function (value) {
                iterator.end();
                promiseResolve(value);
            }, function (reason) {
                iterator.end();
                promiseReject(reason);
            }); };
            iterator.setIterateFunction(func);
            iterator.start();
        });
        return p;
    };
    return ChunkedTask;
}());

var ChunkedTaskIterator = (function () {
    function ChunkedTaskIterator() {
        this.breaktime = this.useRequestAnimationFrame() ? 30 : 60;
        // TODO: Iteration time, iteration count, counter, progress
    }
    ChunkedTaskIterator.prototype.useRequestAnimationFrame = function () {
        return "requestAnimationFrame" in window;
    };
    ChunkedTaskIterator.prototype.end = function () {
        this.ended = true;
    };
    ChunkedTaskIterator.prototype.setValue = function (value) {
        this.value = value;
    };
    ChunkedTaskIterator.prototype.getValue = function () {
        return this.value;
    };
    ChunkedTaskIterator.prototype.setIterateFunction = function (func) {
        this.func = func;
    };
    ChunkedTaskIterator.prototype.iterateWithValue = function (value) {
        this.setValue(value);
        this.iterate();
    };
    ChunkedTaskIterator.prototype.start = function () {
        this.execute();
    };
    ChunkedTaskIterator.prototype.iterate = function () {
        var _this = this;
        if (!this.needsBreak()) {
            this.execute();
        }
        if ("hidden" in document && document.hidden) {
            this.execute();
            if (this.progressCallback)
                this.progressCallback(this.value, this.expectedSize);
        }
        else if (this.useRequestAnimationFrame()) {
            window.requestAnimationFrame(function () {
                _this.execute();
                if (_this.progressCallback)
                    _this.progressCallback(_this.value, _this.expectedSize);
            });
        }
        else {
            setTimeout(function () {
                _this.execute();
                if (_this.progressCallback)
                    _this.progressCallback(_this.value, _this.expectedSize);
            }, 4);
        }
    };
    ChunkedTaskIterator.prototype.setExpectedSize = function (value) {
        this.expectedSize = value;
    };
    ChunkedTaskIterator.prototype.execute = function () {
        this.iterationStartTime = Date.now();
        while (!this.needsBreak() && !this.ended) {
            // TODO: counters
            this.func();
            this.value++;
        }
        if (!this.ended) {
            this.iterate();
        }
    };
    ChunkedTaskIterator.prototype.needsBreak = function () {
        return Date.now() - this.iterationStartTime > this.breaktime;
    };
    return ChunkedTaskIterator;
}());
var ChunkedTaskTest = (function () {
    function ChunkedTaskTest() {
    }
    ChunkedTaskTest.prototype.test1 = function () {
        ChunkedTask.execute(function (iterator, resolve, reject) {
            var count = 0;
            for (var i = iterator.getValue(); i < 10000000; i++) {
                if (count++ % 1000 === 0)
                    return iterator.iterateWithValue(i);
            }
            resolve();
        });
    };
    ChunkedTaskTest.prototype.test2 = function () {
        ChunkedTask.execute(function (iterator, resolve, reject) {
            var i = iterator.getValue();
            if (i > 1000)
                resolve();
        });
    };
    return ChunkedTaskTest;
}());

//# sourceMappingURL=chunked-task.js.map

/***/ }),
/* 481 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStoragePersistenceProvider; });
var LocalStoragePersistenceProvider = (function () {
    function LocalStoragePersistenceProvider(storagePrefix, transactionSerializer) {
        this.storagePrefix = storagePrefix;
        this.transactionSerializer = transactionSerializer;
    }
    LocalStoragePersistenceProvider.prototype.init = function () {
        return Promise.resolve();
    };
    LocalStoragePersistenceProvider.prototype.dbs = function () {
        var dbArray = localStorage.getItem(this.storagePrefix + '_dbs');
        if (!dbArray)
            return [];
        return JSON.parse(dbArray);
    };
    LocalStoragePersistenceProvider.prototype.addDb = function (dbId) {
        var dbArray = this.dbs();
        if (dbArray.indexOf(dbId) === -1) {
            dbArray.push(dbId);
            localStorage.setItem(this.storagePrefix + '_dbs', JSON.stringify(dbArray));
        }
        return Promise.resolve();
    };
    LocalStoragePersistenceProvider.prototype.unlinkDb = function (dbId) {
        var _this = this;
        var dbArray = this.dbs();
        if (dbArray.indexOf(dbId) > -1) {
            dbArray.splice(dbArray.indexOf(dbId), 1);
            this.transactionsSync(dbId).forEach(function (transaction) {
                _this.deleteTransaction(dbId, transaction.id);
            });
            localStorage.setItem(this.storagePrefix + '_dbs', JSON.stringify(dbArray));
        }
    };
    LocalStoragePersistenceProvider.prototype.transactionsSync = function (dbId) {
        var transactions = [];
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            if (localStorage.key(i).match(this.storagePrefix + '_' + dbId + '_')) {
                var transactionString = localStorage.getItem(localStorage.key(i));
                var transaction = this.transactionSerializer.fromJson(transactionString);
                transactions.push(transaction);
            }
        }
        return transactions;
    };
    LocalStoragePersistenceProvider.prototype.transactions = function (dbId) {
        return Promise.resolve(this.transactionsSync(dbId));
    };
    LocalStoragePersistenceProvider.prototype.saveTransaction = function (dbId, transaction) {
        localStorage.setItem(this.storagePrefix + '_' + dbId + '_' + transaction.id, this.transactionSerializer.toJson(transaction));
    };
    LocalStoragePersistenceProvider.prototype.deleteTransaction = function (dbId, transactionId) {
        localStorage.removeItem(this.storagePrefix + '_' + dbId + '_' + transactionId);
    };
    LocalStoragePersistenceProvider.prototype.getTransaction = function (dbId, transactionId) {
        var transactionString = localStorage.getItem(this.storagePrefix + '_' + dbId + '_' + transactionId);
        var transaction = this.transactionSerializer.fromJson(transactionString);
        return transaction;
    };
    LocalStoragePersistenceProvider.prototype.keyStore = function (dbId, key, value) {
        var localKey = this.storagePrefix + '_keystore_' + dbId + '_' + key;
        if (typeof value !== 'undefined')
            localStorage.setItem(localKey, value);
        return localStorage.getItem(localKey);
    };
    return LocalStoragePersistenceProvider;
}());

//# sourceMappingURL=local-storage-persistence-provider.js.map

/***/ }),
/* 482 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SqlStoragePersistenceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_logger__ = __webpack_require__(7);

var SqlStoragePersistenceProvider = (function () {
    function SqlStoragePersistenceProvider(storagePrefix, transactionSerializer, sqlite) {
        this.storagePrefix = storagePrefix;
        this.transactionSerializer = transactionSerializer;
        this.sqlite = sqlite;
        this.logger = __WEBPACK_IMPORTED_MODULE_0__services_logger__["a" /* Logger */].get('SqlStoragePersistenceProvider');
        this.keyStoreCache = new Map();
        this.transactionsCache = new Map();
    }
    SqlStoragePersistenceProvider.prototype.init = function () {
        var _this = this;
        return this.sqlite.create({ name: this.storagePrefix + '_db', location: 'default' }).then(function (db) {
            _this.sqlStorage = db;
            return _this.sqlStorage.executeSql('CREATE TABLE IF NOT EXISTS _keystore (dbid TEXT, key TEXT, keyvalue TEXT, PRIMARY KEY (dbid, key))', []);
        })
            .then(function () {
            return _this.sqlStorage.executeSql('SELECT * FROM _keystore', [])
                .then(function (result) {
                for (var i = 0; i < result.rows.length; i++) {
                    var item = result.rows.item(i);
                    _this.keyStoreCache.set(item.dbid + '_' + item.key, item.keyvalue);
                }
            }).then(function () {
                var dbsValue = _this.keyStore("_dbs", "dbs");
                _this.dbsCache = dbsValue ? JSON.parse(dbsValue) : [];
                var p = new Array();
                _this.dbsCache.forEach(function (dbId) {
                    p.push(_this.createDbTables(dbId));
                });
                return Promise.all(p);
            });
        });
    };
    SqlStoragePersistenceProvider.prototype.dbs = function () {
        return this.dbsCache;
    };
    SqlStoragePersistenceProvider.prototype.createDbTables = function (dbId) {
        var p = new Array();
        p.push(this.sqlStorage.executeSql('CREATE TABLE IF NOT EXISTS db_' + this.sanitise(dbId) + '_transaction (id INTEGER PRIMARY KEY, dbtransaction TEXT)', []));
        return Promise.all(p);
    };
    SqlStoragePersistenceProvider.prototype.addDb = function (dbId) {
        var _this = this;
        var dbArray = this.dbs();
        if (dbArray.indexOf(dbId) === -1) {
            dbArray.push(dbId);
            return this.createDbTables(dbId).then(function () {
                _this.keyStore('_dbs', 'dbs', JSON.stringify(dbArray));
            }).catch(function (err) {
                _this.logger.error('Error adding db', err);
            });
        }
    };
    SqlStoragePersistenceProvider.prototype.unlinkDb = function (dbId) {
        var _this = this;
        var dbArray = this.dbs();
        if (dbArray.indexOf(dbId) > -1) {
            dbArray.splice(dbArray.indexOf(dbId), 1);
            this.keyStore('_dbs', 'dbs', JSON.stringify(dbArray));
            this.sqlStorage.executeSql('DROP TABLE IF EXISTS db_' + this.sanitise(dbId) + '_transaction', []).catch(function (err) {
                _this.logger.error({ 'msg': 'Error dropping database db_' + dbId + '_transaction', 'err': err });
            });
            this.sqlStorage.executeSql('DROP TABLE IF EXISTS db_' + this.sanitise(dbId) + '_keystore', []).catch(function (err) {
                _this.logger.error({ 'msg': 'Error dropping database db_' + dbId + '_keystore', 'err': err });
            });
        }
    };
    SqlStoragePersistenceProvider.prototype.transactions = function (dbId) {
        var _this = this;
        return this.sqlStorage.executeSql('SELECT dbtransaction FROM db_' + this.sanitise(dbId) + '_transaction ORDER BY id', []).then(function (result) {
            var transactions = [];
            for (var i = 0; i < result.rows.length; i++) {
                var transactionString = result.rows.item(i).dbtransaction;
                var transaction = _this.transactionSerializer.fromJson(transactionString);
                transactions.push(transaction);
                _this.transactionsCache.set(_this.sanitise(dbId) + '_' + transaction.id, transactionString);
            }
            return transactions;
        }).catch(function (err) {
            _this.logger.error('Error getting db transactions', err);
            return [];
        });
    };
    SqlStoragePersistenceProvider.prototype.saveTransaction = function (dbId, transaction) {
        var _this = this;
        var transactionString = this.transactionSerializer.toJson(transaction);
        this.sqlStorage.executeSql('INSERT OR REPLACE INTO db_' + this.sanitise(dbId) + '_transaction (id, dbtransaction) VALUES (?, ?)', [transaction.id, transactionString])
            .catch(function (err) {
            _this.logger.error('Error inserting/replacing transaction in database db_' + dbId + '_transaction for id ' + transaction.id, err);
            // TODO: Application halt ?
        });
        this.transactionsCache.set(this.sanitise(dbId) + '_' + transaction.id, transactionString);
    };
    SqlStoragePersistenceProvider.prototype.deleteTransaction = function (dbId, transactionId) {
        var _this = this;
        this.sqlStorage.executeSql('DELETE FROM db_' + this.sanitise(dbId) + '_transaction WHERE id = ?', [transactionId])
            .catch(function (err) {
            _this.logger.error('Error deleting transaction in table db_' + dbId + '_transaction for id ' + transactionId, err);
            // TODO: Application halt ?
        });
        this.transactionsCache.delete(this.sanitise(dbId) + '_' + transactionId);
    };
    SqlStoragePersistenceProvider.prototype.getTransaction = function (dbId, transactionId) {
        var transactionString = this.transactionsCache.get(this.sanitise(dbId) + '_' + transactionId);
        var transaction = this.transactionSerializer.fromJson(transactionString);
        return transaction;
    };
    SqlStoragePersistenceProvider.prototype.keyStore = function (dbId, key, value) {
        var _this = this;
        var localKey = dbId + '_' + key;
        if (typeof value !== 'undefined') {
            this.keyStoreCache.set(localKey, value);
            this.sqlStorage.executeSql('INSERT OR REPLACE INTO _keystore (dbid, key, keyvalue) VALUES (?, ?, ?)', [dbId, key, value])
                .catch(function (err) {
                _this.logger.error('Error inserting/replacing in table _keystore for dbid/key/value ' + dbId + '/' + key + '/' + value, err);
                // TODO: Application halt ? - need to at least stop them doing more - warning - fatal error has occured....
            });
        }
        return this.keyStoreCache.get(localKey);
    };
    SqlStoragePersistenceProvider.prototype.sanitise = function (dbId) {
        return dbId.split('-').join('');
    };
    return SqlStoragePersistenceProvider;
}());

//# sourceMappingURL=sql-storage-persistence-provider.js.map

/***/ }),
/* 483 */,
/* 484 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 247,
	"./af.js": 247,
	"./ar": 248,
	"./ar-dz": 249,
	"./ar-dz.js": 249,
	"./ar-kw": 250,
	"./ar-kw.js": 250,
	"./ar-ly": 251,
	"./ar-ly.js": 251,
	"./ar-ma": 252,
	"./ar-ma.js": 252,
	"./ar-sa": 253,
	"./ar-sa.js": 253,
	"./ar-tn": 254,
	"./ar-tn.js": 254,
	"./ar.js": 248,
	"./az": 255,
	"./az.js": 255,
	"./be": 256,
	"./be.js": 256,
	"./bg": 257,
	"./bg.js": 257,
	"./bm": 258,
	"./bm.js": 258,
	"./bn": 259,
	"./bn.js": 259,
	"./bo": 260,
	"./bo.js": 260,
	"./br": 261,
	"./br.js": 261,
	"./bs": 262,
	"./bs.js": 262,
	"./ca": 263,
	"./ca.js": 263,
	"./cs": 264,
	"./cs.js": 264,
	"./cv": 265,
	"./cv.js": 265,
	"./cy": 266,
	"./cy.js": 266,
	"./da": 267,
	"./da.js": 267,
	"./de": 268,
	"./de-at": 269,
	"./de-at.js": 269,
	"./de-ch": 270,
	"./de-ch.js": 270,
	"./de.js": 268,
	"./dv": 271,
	"./dv.js": 271,
	"./el": 272,
	"./el.js": 272,
	"./en-au": 273,
	"./en-au.js": 273,
	"./en-ca": 274,
	"./en-ca.js": 274,
	"./en-gb": 275,
	"./en-gb.js": 275,
	"./en-ie": 276,
	"./en-ie.js": 276,
	"./en-nz": 277,
	"./en-nz.js": 277,
	"./eo": 278,
	"./eo.js": 278,
	"./es": 279,
	"./es-do": 280,
	"./es-do.js": 280,
	"./es-us": 281,
	"./es-us.js": 281,
	"./es.js": 279,
	"./et": 282,
	"./et.js": 282,
	"./eu": 283,
	"./eu.js": 283,
	"./fa": 284,
	"./fa.js": 284,
	"./fi": 285,
	"./fi.js": 285,
	"./fo": 286,
	"./fo.js": 286,
	"./fr": 287,
	"./fr-ca": 288,
	"./fr-ca.js": 288,
	"./fr-ch": 289,
	"./fr-ch.js": 289,
	"./fr.js": 287,
	"./fy": 290,
	"./fy.js": 290,
	"./gd": 291,
	"./gd.js": 291,
	"./gl": 292,
	"./gl.js": 292,
	"./gom-latn": 293,
	"./gom-latn.js": 293,
	"./gu": 294,
	"./gu.js": 294,
	"./he": 295,
	"./he.js": 295,
	"./hi": 296,
	"./hi.js": 296,
	"./hr": 297,
	"./hr.js": 297,
	"./hu": 298,
	"./hu.js": 298,
	"./hy-am": 299,
	"./hy-am.js": 299,
	"./id": 300,
	"./id.js": 300,
	"./is": 301,
	"./is.js": 301,
	"./it": 302,
	"./it.js": 302,
	"./ja": 303,
	"./ja.js": 303,
	"./jv": 304,
	"./jv.js": 304,
	"./ka": 305,
	"./ka.js": 305,
	"./kk": 306,
	"./kk.js": 306,
	"./km": 307,
	"./km.js": 307,
	"./kn": 308,
	"./kn.js": 308,
	"./ko": 309,
	"./ko.js": 309,
	"./ky": 310,
	"./ky.js": 310,
	"./lb": 311,
	"./lb.js": 311,
	"./lo": 312,
	"./lo.js": 312,
	"./lt": 313,
	"./lt.js": 313,
	"./lv": 314,
	"./lv.js": 314,
	"./me": 315,
	"./me.js": 315,
	"./mi": 316,
	"./mi.js": 316,
	"./mk": 317,
	"./mk.js": 317,
	"./ml": 318,
	"./ml.js": 318,
	"./mr": 319,
	"./mr.js": 319,
	"./ms": 320,
	"./ms-my": 321,
	"./ms-my.js": 321,
	"./ms.js": 320,
	"./mt": 322,
	"./mt.js": 322,
	"./my": 323,
	"./my.js": 323,
	"./nb": 324,
	"./nb.js": 324,
	"./ne": 325,
	"./ne.js": 325,
	"./nl": 326,
	"./nl-be": 327,
	"./nl-be.js": 327,
	"./nl.js": 326,
	"./nn": 328,
	"./nn.js": 328,
	"./pa-in": 329,
	"./pa-in.js": 329,
	"./pl": 330,
	"./pl.js": 330,
	"./pt": 331,
	"./pt-br": 332,
	"./pt-br.js": 332,
	"./pt.js": 331,
	"./ro": 333,
	"./ro.js": 333,
	"./ru": 334,
	"./ru.js": 334,
	"./sd": 335,
	"./sd.js": 335,
	"./se": 336,
	"./se.js": 336,
	"./si": 337,
	"./si.js": 337,
	"./sk": 338,
	"./sk.js": 338,
	"./sl": 339,
	"./sl.js": 339,
	"./sq": 340,
	"./sq.js": 340,
	"./sr": 341,
	"./sr-cyrl": 342,
	"./sr-cyrl.js": 342,
	"./sr.js": 341,
	"./ss": 343,
	"./ss.js": 343,
	"./sv": 344,
	"./sv.js": 344,
	"./sw": 345,
	"./sw.js": 345,
	"./ta": 346,
	"./ta.js": 346,
	"./te": 347,
	"./te.js": 347,
	"./tet": 348,
	"./tet.js": 348,
	"./th": 349,
	"./th.js": 349,
	"./tl-ph": 350,
	"./tl-ph.js": 350,
	"./tlh": 351,
	"./tlh.js": 351,
	"./tr": 352,
	"./tr.js": 352,
	"./tzl": 353,
	"./tzl.js": 353,
	"./tzm": 354,
	"./tzm-latn": 355,
	"./tzm-latn.js": 355,
	"./tzm.js": 354,
	"./uk": 356,
	"./uk.js": 356,
	"./ur": 357,
	"./ur.js": 357,
	"./uz": 358,
	"./uz-latn": 359,
	"./uz-latn.js": 359,
	"./uz.js": 358,
	"./vi": 360,
	"./vi.js": 360,
	"./x-pseudo": 361,
	"./x-pseudo.js": 361,
	"./yo": 362,
	"./yo.js": 362,
	"./zh-cn": 363,
	"./zh-cn.js": 363,
	"./zh-hk": 364,
	"./zh-hk.js": 364,
	"./zh-tw": 365,
	"./zh-tw.js": 365
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 484;

/***/ }),
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Engine; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_records_category__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_records_account__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_records_transaction__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_records_bank_link__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_records_bank_transaction__ = __webpack_require__(38);






var Engine = (function () {
    function Engine(db, notifications, configuration) {
        var _this = this;
        this.db = db;
        db.addEventListener(function (dbEvent) {
            if (dbEvent.db && dbEvent.db.isBatchProcessing()) {
                // Only process at batch end, which isBatchProcessing is false
            }
            else {
                var message = void 0;
                if (dbEvent.eventName === 'transaction-batch-end')
                    _this.runAllProcessors();
                if (dbEvent.eventName === 'transaction-applied') {
                    _this.runAllProcessors();
                    message = dbEvent.data.transaction.toHumanisedString({ action: dbEvent.data.update ? 'update' : 'apply', currencyFormatter: notifications.formatCurrency, originalTransaction: dbEvent.data.originalTransaction });
                }
                if (dbEvent.eventName === 'transaction-undone') {
                    message = dbEvent.data.transaction.toHumanisedString({ action: 'undo', currencyFormatter: notifications.formatCurrency });
                    _this.runAllProcessors();
                }
                // TODO: Move this out of the engine and into another listener
                if (message && configuration.option('experimental.transaction.notifications')) {
                    notifications.show({ message: message, popup: false, silent: dbEvent.data.transaction && dbEvent.db.transactionIdLocalGen() === dbEvent.db.extractTransactionLocalGenId(dbEvent.data.transaction.id), important: false, category: 'transactions.' + _this.db.id });
                }
            }
        });
        this.categorySortedAlphabeticalDynamicView = this.db.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_0__data_records_category__["a" /* Category */]).addDynamicView("CategorySortedAlphabetical");
        this.categorySortedAlphabeticalDynamicView.applySort((function (a, b) { return (a.name + ''.toLocaleLowerCase()).localeCompare(b.name + ''.toLocaleLowerCase()); }));
        this.transactionUnreconciledDynamicView = this.db.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_2__data_records_transaction__["a" /* Transaction */]).addDynamicView("TransactionUnreconciled");
        this.transactionUnreconciledDynamicView.applyWhere(function (t) { return !t.x.reconciled; });
        this.transactionUnreconciledDynamicView.applySimpleSort('date', true);
        this.bankTransactionUnreconciledDynamicView = this.db.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_5__data_records_bank_transaction__["a" /* BankTransaction */]).addDynamicView("BankTransactionUnreconciled");
        this.bankTransactionUnreconciledDynamicView.applyWhere(function (t) { return !t.x.reconciled && !t.x.ignored; });
        this.bankTransactionUnreconciledDynamicView.applySimpleSort('date', true);
        this.initMidnightWatch();
    }
    Engine.prototype.initMidnightWatch = function () {
        var _this = this;
        var nowDate = __WEBPACK_IMPORTED_MODULE_3__services_utils__["a" /* Utils */].nowYYYYMMDD();
        if (this.currentDate !== nowDate) {
            this.currentDate = nowDate;
            this.runAllProcessors();
        }
        setTimeout(function () { return _this.initMidnightWatch(); }, 60000);
    };
    Engine.prototype.runAllProcessors = function () {
        var _this = this;
        this.db.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_0__data_records_category__["a" /* Category */]).data.forEach(function (category) {
            category.engine.processors.forEach(function (processor) {
                processor.execute(_this.db.transactionProcessor);
            });
        });
        this.db.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_1__data_records_account__["a" /* Account */]).data.forEach(function (account) {
            account.processors.forEach(function (processor) {
                processor.execute(_this.db.transactionProcessor);
            });
        });
    };
    Engine.prototype.getCategories = function (order) {
        if (order === void 0) { order = "natural"; }
        if (order == "alphabetical")
            return this.categorySortedAlphabeticalDynamicView.data();
        return this.db.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_0__data_records_category__["a" /* Category */]).chain().data();
    };
    Engine.prototype.getTransactionsUnreconciledView = function () {
        return this.transactionUnreconciledDynamicView;
    };
    Engine.prototype.getCategory = function (categoryId) {
        return this.db.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_0__data_records_category__["a" /* Category */]).by('id', categoryId);
    };
    Engine.prototype.getAccounts = function () {
        return this.db.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_1__data_records_account__["a" /* Account */]).chain().simplesort('name').data();
    };
    Engine.prototype.getBankLinks = function () {
        return this.db.transactionProcessor.table(__WEBPACK_IMPORTED_MODULE_4__data_records_bank_link__["a" /* BankLink */]).chain().simplesort('name').data();
    };
    Engine.prototype.getRecordById = function (type, id) {
        return this.db.transactionProcessor.table(type).by('id', id);
    };
    return Engine;
}());

//# sourceMappingURL=engine.js.map

/***/ }),
/* 501 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategorySimpleWeeklyProcessor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_processor__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__records_category__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__records_transaction__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_big_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_utils__ = __webpack_require__(15);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var CategorySimpleWeeklyProcessor = (function (_super) {
    __extends(CategorySimpleWeeklyProcessor, _super);
    function CategorySimpleWeeklyProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategorySimpleWeeklyProcessor.prototype.getTypeId = function () {
        return 'CategorySimpleWeeklyProcessor';
    };
    CategorySimpleWeeklyProcessor.prototype.execute = function (tp) {
        var _this = this;
        var currentDate = __WEBPACK_IMPORTED_MODULE_5__services_utils__["a" /* Utils */].nowYYYYMMDD(); // TODO: Replace with engine current Date ?
        var transactions = tp.table(__WEBPACK_IMPORTED_MODULE_3__records_transaction__["a" /* Transaction */]).find({ 'categoryId': this.category.id });
        var weekDiff, startBalance;
        try {
            weekDiff = __WEBPACK_IMPORTED_MODULE_1_moment___default()(this.balanceDate, 'YYYYMMDD').startOf('week').diff(__WEBPACK_IMPORTED_MODULE_1_moment___default()(), 'week');
            startBalance = new __WEBPACK_IMPORTED_MODULE_4_big_js__["Big"](weekDiff).abs().times(this.weeklyAmount).plus(this.balance);
        }
        catch (e) {
            throw e;
        }
        this.category.balance = transactions.filter(function (t) { return !t.status || (t.status === 'realised' && t.date >= currentDate); }).reduce(function (a, b) {
            if (b.date < _this.balanceDate)
                return a;
            return a.minus(b.amount);
        }, startBalance);
        tp.table(__WEBPACK_IMPORTED_MODULE_2__records_category__["a" /* Category */]).update(this.category);
    };
    return CategorySimpleWeeklyProcessor;
}(__WEBPACK_IMPORTED_MODULE_0__engine_processor__["a" /* Processor */]));

//# sourceMappingURL=category-simple-weekly-processor.js.map

/***/ }),
/* 502 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountBalanceProcessor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_processor__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__records_account__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__records_category__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__records_transaction__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_big_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_big_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_utils__ = __webpack_require__(15);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var AccountBalanceProcessor = (function (_super) {
    __extends(AccountBalanceProcessor, _super);
    function AccountBalanceProcessor(account) {
        var _this = _super.call(this) || this;
        _this.account = account;
        return _this;
    }
    AccountBalanceProcessor.prototype.getTypeId = function () {
        return 'AccountBalance';
    };
    AccountBalanceProcessor.prototype.execute = function (tp) {
        var currentDate = __WEBPACK_IMPORTED_MODULE_5__services_utils__["a" /* Utils */].nowYYYYMMDD();
        var categoriesMap = new Map();
        var categoryTable = tp.table(__WEBPACK_IMPORTED_MODULE_2__records_category__["a" /* Category */]);
        categoryTable.data.forEach(function (c) {
            categoriesMap.set(c.id, c);
            if (!c.x.accountBalances)
                c.x.accountBalances = new Map();
            c.x.accountBalances.clear();
        });
        var accountTransactions = tp.table(__WEBPACK_IMPORTED_MODULE_3__records_transaction__["a" /* Transaction */]).find({ 'accountId': this.account.id });
        this.account.balance = accountTransactions.filter(function (t) { return !t.status || (t.status === 'realised' && t.date >= currentDate); }).reduce(function (total, transaction) {
            var accountBalances = categoriesMap.get(transaction.categoryId).x.accountBalances;
            var categoryTotal = accountBalances.get(transaction.accountId || null) || new __WEBPACK_IMPORTED_MODULE_4_big_js__["Big"]("0");
            accountBalances.set(transaction.accountId || null, categoryTotal.minus(transaction.amount));
            return total.minus(transaction.amount);
        }, this.account.initialBalance || new __WEBPACK_IMPORTED_MODULE_4_big_js__["Big"]('0'));
        tp.table(__WEBPACK_IMPORTED_MODULE_1__records_account__["a" /* Account */]).update(this.account);
        categoryTable.data.forEach(function (c) { return categoryTable.update(c); });
    };
    return AccountBalanceProcessor;
}(__WEBPACK_IMPORTED_MODULE_0__engine_processor__["a" /* Processor */]));

//# sourceMappingURL=account-balance.js.map

/***/ }),
/* 503 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnzMobileWeb1Provider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__provider_interface__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_utils__ = __webpack_require__(15);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var AnzMobileWeb1Provider = (function () {
    function AnzMobileWeb1Provider() {
        this.logger = __WEBPACK_IMPORTED_MODULE_1__services_logger__["a" /* Logger */].get('AnzMobileWeb1Provider');
    }
    AnzMobileWeb1Provider.prototype.getSchema = function () {
        var s = new __WEBPACK_IMPORTED_MODULE_0__provider_interface__["c" /* ProviderSchema */]();
        s.name = "ANZ";
        s.perAccountFields = ["Account Number"];
        s.secureConfigurationFields = ["CRN", "Password"];
        s.requireBrowser = true;
        return s;
    };
    AnzMobileWeb1Provider.prototype.accountMatch = function (perAccountFieldValues, bankAccount) {
        return perAccountFieldValues["Account Number"] === bankAccount.accountNumber;
    };
    AnzMobileWeb1Provider.prototype.interrupt = function () {
        this.interruptFlag = true;
    };
    AnzMobileWeb1Provider.prototype.configure = function (bankLink, secureAccessor, hostInterface) {
        this.bankLink = bankLink;
        this.secureAccessor = secureAccessor;
        this.hostInterface = hostInterface;
    };
    AnzMobileWeb1Provider.prototype.setBrowser = function (browser) {
        this.browser = browser;
    };
    AnzMobileWeb1Provider.prototype.getBrowser = function () {
        return this.browser;
    };
    AnzMobileWeb1Provider.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var crn, password;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.browser.navigate('https://www.anz.com/INETBANK/bankmain.asp')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.secureAccessor.getSecure('CRN')];
                    case 2:
                        crn = _a.sent();
                        return [4 /*yield*/, this.secureAccessor.getSecure('Password')];
                    case 3:
                        password = _a.sent();
                        /*
                        Note: determining current state can take into account clicks, scanning the page for familiar elements, window.location, timeout, etc. Also state can be a sure match, or unknown...
                        Should be able to put criteria to determine the state, then also what to do in different situations
                        So rather than this watcher business, define our states, then determine out state, and base our actions off the state...
                
                        let loggedInWatcher = this.browser.watch("var ele = document.getElementsByTagName('H1')[0]; ele ? ele.textContent.trim().toLowerCase() : '';").for(val => val == 'your accounts').then(() => {
                
                            this.browser.endInteractive();
                
                        });
                
                        let reloginWatcher = this.browser.watch("var ele = document.getElementsByTagName('H1')[0]; ele ? ele.textContent.trim().toLowerCase() : '';").for(val => val == 'your accounts').then(() => {
                            
                        });
                            
                        let loggedInWatcher
                
                        this.browser.execute("document.location.href"}).then(val => {
                            if (val.match('relogin')) this.hostInterface.showBrowser();
                        });
                        loggedInWatcher.cancel();
                
                        */
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var code = '';
                                if (crn)
                                    code += "document.getElementById('main').contentWindow.document.getElementById('crn').value = '" + __WEBPACK_IMPORTED_MODULE_3__services_utils__["a" /* Utils */].javaScriptEscape(crn) + "';";
                                if (password)
                                    code += "document.getElementById('main').contentWindow.document.getElementById('Password').value = '" + __WEBPACK_IMPORTED_MODULE_3__services_utils__["a" /* Utils */].javaScriptEscape(password) + "';";
                                if (crn && password) {
                                    code += "document.getElementById('main').contentWindow.document.getElementById('SignonButton').click();";
                                    _this.browser.execute(code);
                                }
                                else {
                                    _this.browser.startInteractive();
                                    _this.browser.onLoadStart().then(function (ev) {
                                        _this.browser.endInteractive();
                                    });
                                }
                                var checker = setInterval(function () {
                                    _this.browser.execute("var ele = document.getElementsByTagName('H1')[0]; ele ? ele.textContent.trim().toLowerCase() : '';").then(function (val) {
                                        if (_this.interruptFlag) {
                                            clearInterval(checker);
                                        }
                                        if (val == 'your accounts') {
                                            // TODO: And the browser has stopped loading check (maybe record a browser "idle" ?), and wait for some idle time?, also check on browser finished loading... (the interval will get ajax calls..., not sure if they are triggered by cordova...)
                                            // So make a function to encapsulate that logic...
                                            _this.connected = true;
                                            setTimeout(function () { return resolve(); }, 500); // Delay for page to render? - Seems to load accounts via ajax calls... need to really wait and check for those! - or wait until loading has stopped for X seconds (ie. page is "stable")
                                            clearInterval(checker);
                                        }
                                        else {
                                            _this.browser.execute("document.location.href").then(function (val) {
                                                if (val.match('relogin')) {
                                                    _this.browser.startInteractive();
                                                    _this.browser.onLoadStart().then(function (ev) {
                                                        _this.browser.endInteractive();
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }, 1000);
                            })];
                }
            });
        });
    };
    AnzMobileWeb1Provider.prototype.isConnected = function () {
        return this.connected;
    };
    AnzMobileWeb1Provider.prototype.getAccounts = function () {
        // TODO: make sure on accounts listing page, OR nav to that page
        return this.browser.execute('document.getElementsByClassName("normalLayoutAccounts")[0].innerHTML').then(function (val) {
            var dom = new DOMParser().parseFromString(val, 'text/html');
            var bankAccounts = [];
            Array.from(dom.getElementsByClassName('listViewAccountWrapperYourAccounts')).forEach(function (ele) {
                var bankAccount = new __WEBPACK_IMPORTED_MODULE_0__provider_interface__["a" /* BankAccount */]();
                bankAccount.accountName = ele.getElementsByClassName('accountNameSection')[0].textContent.trim();
                bankAccount.bsb = ele.getElementsByClassName('accountNoSection')[0].textContent.trim().split(' ')[0];
                bankAccount.accountNumber = ele.getElementsByClassName('accountNoSection')[0].textContent.trim().split(' ')[1];
                bankAccount.accountBalance = ele.getElementsByClassName('listViewMobileCurrentBalanceValue')[0].textContent.trim().replace('$', '').replace(',', '').replace(',', '');
                bankAccount.accountAvailableBalance = ele.getElementsByClassName('listViewMobileAvailableBalanceValue')[0].textContent.trim().replace('$', '').replace(',', '').replace(',', '');
                bankAccounts.push(bankAccount);
            });
            return bankAccounts;
        });
    };
    AnzMobileWeb1Provider.prototype.getTransactions = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // TODO: state tracking... At the moment, always click "home", then nav to account (document.getElementById(accountName).click())
                    // TODO: these shoudl be in a 
                    return [4 /*yield*/, this.browser.execute("document.querySelector('li.menuLiClass:nth-child(1) > a').click();")];
                    case 1:
                        // TODO: state tracking... At the moment, always click "home", then nav to account (document.getElementById(accountName).click())
                        // TODO: these shoudl be in a 
                        _a.sent();
                        return [4 /*yield*/, this.browser.onLoadStop()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.browser.sleep(1000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.browser.execute("document.querySelector('#" + account.accountName.split(' ').join('') + " > a').click();")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.browser.onLoadStop()];
                    case 5:
                        _a.sent();
                        // TODO: Sometimes this fires too soon ?
                        //await this.browser.execute("document.querySelector('.transactionAuthSection > a:nth-child(1)').click();");
                        //await this.browser.onLoadStop();
                        return [2 /*return*/, this.browser.execute('document.getElementsByClassName("tabsContainerAcctTranAuth")[0].innerHTML').then(function (val) {
                                try {
                                    return _this.parseTransactionPage(val);
                                }
                                catch (e) {
                                    _this.logger.info('Error parsing transaction list', e, val);
                                    throw e;
                                }
                            })];
                }
            });
        });
    };
    AnzMobileWeb1Provider.prototype.parseTransactionPage = function (html) {
        var _this = this;
        var bankAccountTransactions = [];
        var dom = new DOMParser().parseFromString(html, 'text/html');
        Array.from(dom.getElementsByClassName('displayTable')).forEach(function (ele) {
            var bankAccountTransaction = new __WEBPACK_IMPORTED_MODULE_0__provider_interface__["b" /* BankAccountTransaction */]();
            bankAccountTransaction.description = ele.querySelector('[class*="desc"]').textContent.trim().split(/\s+/).join(' ');
            bankAccountTransaction.amount = ele.querySelector('.tran-amount-div').textContent.trim().replace("$", "").replace(",", '').replace(',', '').replace('+', '');
            bankAccountTransaction.balance = (ele.querySelector('.tran-balance-div').textContent.replace('Balance', '').trim().match(/\S+/g) || [''])[0].replace("$", "").replace(",", '').replace(',', '');
            var dateMonthParts = ele.querySelector('.dateNmonthSection').textContent.match(/\S+/g) || [];
            var lastParentElement = ele.parentElement;
            while (lastParentElement.parentElement.getElementsByClassName('monthYearDisplay').length == 0)
                lastParentElement = lastParentElement.parentElement;
            var previousSibling = lastParentElement.previousElementSibling;
            while (previousSibling && previousSibling.getElementsByClassName('monthYearDisplay').length != 1)
                previousSibling = previousSibling.previousElementSibling;
            var monthYearParts = previousSibling ? previousSibling.getElementsByClassName('monthYearDisplay')[0].textContent.match(/\S+/g) || [] : [];
            if (monthYearParts.length == 0)
                monthYearParts = lastParentElement.parentElement.getElementsByClassName('monthYearDisplay')[0].textContent.match(/\S+/g) || [];
            if (!bankAccountTransaction.balance && dateMonthParts.length == 2) {
                bankAccountTransaction.status = 'authorised';
                var testDate = __WEBPACK_IMPORTED_MODULE_2_moment___default()().month(dateMonthParts[1]).date(Number(dateMonthParts[0]));
                if (testDate.format(__WEBPACK_IMPORTED_MODULE_3__services_utils__["a" /* Utils */].STANDARD_DATE_FORMAT) > __WEBPACK_IMPORTED_MODULE_2_moment___default()().format(__WEBPACK_IMPORTED_MODULE_3__services_utils__["a" /* Utils */].STANDARD_DATE_FORMAT))
                    testDate.subtract(1, 'years');
                bankAccountTransaction.transactionDate = testDate.format(__WEBPACK_IMPORTED_MODULE_3__services_utils__["a" /* Utils */].STANDARD_DATE_FORMAT);
            }
            else if (dateMonthParts.length == 0 && monthYearParts.length == 1 && monthYearParts[0] == 'Recent') {
                bankAccountTransaction.status = 'recent';
                bankAccountTransaction.transactionDate = null;
            }
            else if (dateMonthParts.length == 2 && monthYearParts.length == 2) {
                bankAccountTransaction.status = 'processed';
                var dateMonth = __WEBPACK_IMPORTED_MODULE_2_moment___default()().month(dateMonthParts[1]).date(Number(dateMonthParts[0]));
                var monthYear = __WEBPACK_IMPORTED_MODULE_2_moment___default()().year(Number(monthYearParts[1])).month(monthYearParts[0]);
                if (dateMonth.month() != monthYear.month()) { }
                bankAccountTransaction.transactionDate = dateMonth.year(monthYear.year()).format(__WEBPACK_IMPORTED_MODULE_3__services_utils__["a" /* Utils */].STANDARD_DATE_FORMAT);
            }
            else {
                // Invalid / Error
                _this.logger.info("Unable to determine status and date for transaction", bankAccountTransaction);
            }
            bankAccountTransactions.push(bankAccountTransaction);
        });
        bankAccountTransactions.reverse();
        return bankAccountTransactions;
    };
    AnzMobileWeb1Provider.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // TODO: Logout (if possible) and close the browser object
                    // TODO: Host needs to close any open browser objects here and log it if was left dangling
                    // TODO: Note: logging out successfully should remove the window listener
                    return [4 /*yield*/, this.browser.execute("document.querySelector('.button-logout').click();")];
                    case 1:
                        // TODO: Logout (if possible) and close the browser object
                        // TODO: Host needs to close any open browser objects here and log it if was left dangling
                        // TODO: Note: logging out successfully should remove the window listener
                        _a.sent();
                        return [4 /*yield*/, this.browser.onLoadStop()];
                    case 2:
                        _a.sent();
                        this.connected = false;
                        // TODO: If Not logged out, then force quit below...
                        this.browser.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AnzMobileWeb1Provider;
}());

//# sourceMappingURL=anz-mobile-web-1.js.map

/***/ }),
/* 504 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MockDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__provider_interface__ = __webpack_require__(65);

var MockDataProvider = (function () {
    function MockDataProvider() {
        this.accounts = [{ accountName: "Mock Account", accountNumber: "12345678", accountBalance: "1430.00", accountAvailableBalance: "1400.00", bsb: "555666" }];
        this.data = [
            [
                { "description": "VISA DEBIT AUTHORISATION COLES EXPRESS 2010 BUSSELTON AU Card Used 9038", "amount": "-1.50", "balance": "", "status": "authorised", "transactionDate": "20170427" },
                { "description": "VISA DEBIT AUTHORISATION BEST AND LESS BUSSELTON AU Card Used 9020", "amount": "-28.00", "balance": "", "status": "authorised", "transactionDate": "20170427" },
                { "description": "VISA DEBIT AUTHORISATION CALLOWS CORNER NEWS BUSSELTON AU Card Used 9020", "amount": "-40.95", "balance": "", "status": "authorised", "transactionDate": "20170427" },
                { "description": "VISA DEBIT AUTHORISATION FOOTBALL FEDERATIO N AUSTRSYDNEYAU Card Used 9020", "amount": "-110.00", "balance": "", "status": "authorised", "transactionDate": "20170426" },
                { "description": "VISA DEBIT AUTHORISATION HARMONY HAIR AND BEAUT BUSSELTON AU Card Used 9038", "amount": "-15.00", "balance": "", "status": "authorised", "transactionDate": "20170426" },
                { "description": "VISA DEBIT AUTHORISATION WOOLWORTHS 4416 BUSSELTON AU Card Used 9038", "amount": "-28.57", "balance": "", "status": "authorised", "transactionDate": "20170425" },
                { "description": "VISA DEBIT AUTHORISATION TERRY WHITE CHEMISTS BUSSELTON AU Card Used 9020", "amount": "-108.55", "balance": "", "status": "authorised", "transactionDate": "20170424" },
                { "description": "EFTPOS Cape Chiropract3227592 \\BUSSELTON06", "amount": "-55.00", "balance": "", "status": "processed", "transactionDate": "20170428" },
                { "description": "EFTPOS THE REJECT SHOP 610 BUSSELTON AU", "amount": "-6.00", "balance": "", "status": "recent", "transactionDate": null },
                { "description": "ANZ INTERNET BANKING FUNDS TFER DAY CARE MAMA BIRD", "amount": "62.50", "balance": "", "status": "processed", "transactionDate": "20170427" },
                { "description": "VISA DEBIT PURCHASE CARD 9038 COLES EXPRESS 2010 BUSSELTON", "amount": "-1.50", "balance": "", "status": "processed", "transactionDate": "20170427" },
                { "description": "ANZ INTERNET BANKING BPAY TAX OFFICE PAYMENT {238536},", "amount": "-907.00", "balance": "", "status": "processed", "transactionDate": "20170424" },
                { "description": "ANZ INTERNET BANKING BPAY SGIO INSURANCE {240659},", "amount": "-653.60", "balance": "", "status": "processed", "transactionDate": "20170424" },
                { "description": "VISA DEBIT PURCHASE CARD 9020 DYNAMIC ORGANIC (WA) MANDURAH", "amount": "-45.00", "balance": "", "status": "processed", "transactionDate": "20170421" },
                { "description": "VISA DEBIT PURCHASE CARD 9038 COLES EXPRESS 2010 BUSSELTON", "amount": "-1.50", "balance": "", "status": "processed", "transactionDate": "20170418" }
            ], []
        ];
    }
    MockDataProvider.prototype.getSchema = function () {
        var s = new __WEBPACK_IMPORTED_MODULE_0__provider_interface__["c" /* ProviderSchema */]();
        s.name = "Mock";
        s.perAccountFields = ["Account Number"];
        s.secureConfigurationFields = ["CRN", "Password"];
        return s;
    };
    MockDataProvider.prototype.accountMatch = function (perAccountFieldValues, bankAccount) {
        return true;
    };
    MockDataProvider.prototype.interrupt = function () {
    };
    MockDataProvider.prototype.configure = function (bankLink, secureAccessor, hostInterface) {
    };
    MockDataProvider.prototype.connect = function () {
        return Promise.resolve();
    };
    MockDataProvider.prototype.isConnected = function () {
        return true;
    };
    MockDataProvider.prototype.getAccounts = function () {
        return Promise.resolve(this.accounts);
    };
    MockDataProvider.prototype.getTransactions = function (account) {
        // TODO: Increment / multiple versions of the data for test cases
        return Promise.resolve(this.data[0]);
    };
    MockDataProvider.prototype.close = function () {
        return Promise.resolve();
    };
    return MockDataProvider;
}());

//# sourceMappingURL=mock-data-provider.js.map

/***/ }),
/* 505 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionReconciliation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_record__ = __webpack_require__(45);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TransactionReconciliation = (function (_super) {
    __extends(TransactionReconciliation, _super);
    function TransactionReconciliation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransactionReconciliation.prototype.tableName = function () {
        return 'TransactionReconciliation';
    };
    TransactionReconciliation.prototype.initTable = function (table) {
        table.ensureUniqueIndex('id');
    };
    TransactionReconciliation.prototype.tableCreationOptions = function () {
        return { 'indices': ['transactionId', 'bankTransactionId'] };
    };
    return TransactionReconciliation;
}(__WEBPACK_IMPORTED_MODULE_0__db_record__["a" /* Record */]));

//# sourceMappingURL=transaction-reconciliation.js.map

/***/ }),
/* 506 */,
/* 507 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppExceptionHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_logger__ = __webpack_require__(7);

var AppExceptionHandler = (function () {
    function AppExceptionHandler() {
    }
    AppExceptionHandler.prototype.handleError = function (error) {
        // TODO: Handle the error in the logger better
        if (error.originalError) {
            __WEBPACK_IMPORTED_MODULE_0__services_logger__["a" /* Logger */].get('error').info(error);
            __WEBPACK_IMPORTED_MODULE_0__services_logger__["a" /* Logger */].get('error').error(error.originalError);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_0__services_logger__["a" /* Logger */].get('error').error(error);
        }
    };
    return AppExceptionHandler;
}());

//# sourceMappingURL=app-exception-handler.js.map

/***/ }),
/* 508 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InAppBrowserInterface; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__browser_interface__ = __webpack_require__(509);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var InAppBrowserInterface = (function (_super) {
    __extends(InAppBrowserInterface, _super);
    function InAppBrowserInterface(inAppBrowserObject, logger, notifications, backgroundMode, monitor) {
        var _this = _super.call(this) || this;
        _this.inAppBrowserObject = inAppBrowserObject;
        _this.logger = logger;
        _this.notifications = notifications;
        _this.monitor = monitor;
        inAppBrowserObject.on('loadstart').subscribe(function (ev) {
            _this.loading = true;
            _this.logger.debug("Browser Load Start");
        });
        inAppBrowserObject.on('loadstop').subscribe(function (ev) {
            _this.loading = false;
            _this.logger.debug("Browser Load Stop");
        });
        return _this;
    }
    InAppBrowserInterface.prototype.startInteractive = function () {
        var _this = this;
        if (this.backgroundMode && !this.interactive) {
            this.notifications.show({
                message: 'The Bank Sync for ' + this.monitor.bankLink.name + ' requires your input to continue',
                important: true,
                popup: true,
                category: 'bank-sync.' + this.monitor.bankLink.uuid + '.interactive',
                clickAction: { type: 'custom', data: function () { return _this.confirmInteractive(); } }
            });
        }
        else {
            _super.prototype.startInteractive.call(this);
        }
    };
    InAppBrowserInterface.prototype.confirmInteractive = function () {
        _super.prototype.startInteractive.call(this);
        this.notifications.remove({ category: 'bank-sync.' + this.monitor.bankLink.uuid + '.interactive' });
    };
    InAppBrowserInterface.prototype.updateVisbility = function () {
        if (this.visible()) {
            this.logger.debug("Browser visible");
            this.inAppBrowserObject.show();
        }
        else {
            this.logger.debug("Browser hidden");
            this.inAppBrowserObject.hide();
        }
    };
    InAppBrowserInterface.prototype.onLoadStop = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var subscription = _this.inAppBrowserObject.on('loadstop').subscribe(function (ev) {
                subscription.unsubscribe();
                resolve();
            });
        });
    };
    InAppBrowserInterface.prototype.onLoadStart = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var subscription = _this.inAppBrowserObject.on('loadstart').subscribe(function (ev) {
                subscription.unsubscribe();
                resolve();
            });
        });
    };
    InAppBrowserInterface.prototype.onClose = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var subscription = _this.inAppBrowserObject.on('exit').subscribe(function (ev) {
                subscription.unsubscribe();
                resolve();
            });
        });
    };
    InAppBrowserInterface.prototype.onLoadError = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var subscription = _this.inAppBrowserObject.on('loaderror').subscribe(function (ev) {
                subscription.unsubscribe();
                resolve(ev.message);
            });
        });
    };
    InAppBrowserInterface.prototype.isLoading = function () {
        return this.loading;
    };
    InAppBrowserInterface.prototype.execute = function (script) {
        var _this = this;
        this.logger.debug('Executing Script: ' + script);
        var wrappedCode = "try {" + script + "}catch(err){'Error: ' + err + ' ' + JSON.stringify(err, Object.getOwnPropertyNames(err))}";
        return this.inAppBrowserObject.executeScript({ code: wrappedCode }).then(function (result) {
            if ((result[0] + '').startsWith('Error: ')) {
                _this.logger.info('Error in executed script', script, result[0]);
                return null;
            }
            return result[0];
        }).catch(function (reason) {
            _this.logger.info('Error executing script in browser', script, reason);
        });
    };
    InAppBrowserInterface.prototype.close = function () {
        this.notifications.remove({ category: 'bank-sync.' + this.monitor.bankLink.uuid + '.interactive' });
        this.inAppBrowserObject.close();
        this.logger.debug("Closed");
        this.closed = true;
    };
    return InAppBrowserInterface;
}(__WEBPACK_IMPORTED_MODULE_0__browser_interface__["a" /* BrowserInterface */]));

//# sourceMappingURL=in-app-browser-interface.js.map

/***/ }),
/* 509 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrowserInterface; });
var BrowserInterface = (function () {
    function BrowserInterface() {
    }
    BrowserInterface.prototype.visible = function () {
        return this.interactive || this.shown;
    };
    BrowserInterface.prototype.userShow = function () {
        this.shown = true;
        this.updateVisbility();
    };
    BrowserInterface.prototype.userHide = function () {
        this.shown = false;
        this.updateVisbility();
    };
    BrowserInterface.prototype.startInteractive = function () {
        this.interactive = true;
        this.updateVisbility();
    };
    BrowserInterface.prototype.endInteractive = function () {
        this.interactive = false;
        this.updateVisbility();
    };
    BrowserInterface.prototype.navigate = function (url) {
        var _this = this;
        this.logger.debug("Navigating to " + url);
        return this.execute("window.location='" + encodeURI(url) + "'")
            .then(function () { return _this.onLoadStop(); })
            .then(function () { return _this.logger.debug("Navigated to " + url); });
    };
    BrowserInterface.prototype.sleep = function (millis) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, millis);
        });
    };
    return BrowserInterface;
}());

//# sourceMappingURL=browser-interface.js.map

/***/ }),
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainMenuContent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_budget_settings_budget_settings__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_replication_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_notifications__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_budget_budget__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__data_transactions_init_budget_transaction__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modals_add_budget_add_budget__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_dev_dev__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_about_about__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_notifications_notifications__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__modals_share_budget_share_budget__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__bank_bank_sync__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__bank_bank_sync_utils__ = __webpack_require__(402);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



















var MainMenuContent = (function () {
    function MainMenuContent(dbms, app, configuration, replication, modalController, alertController, toastCtrl, notifications, applicationRef, bankSync, engineFactory) {
        this.dbms = dbms;
        this.app = app;
        this.configuration = configuration;
        this.replication = replication;
        this.modalController = modalController;
        this.alertController = alertController;
        this.toastCtrl = toastCtrl;
        this.notifications = notifications;
        this.applicationRef = applicationRef;
        this.bankSync = bankSync;
        this.engineFactory = engineFactory;
        this.window = window;
        this.dbms = dbms;
        this.budgets = dbms.dbs;
        this.app = app;
    }
    MainMenuContent.prototype.ngOnInit = function () {
        var _this = this;
        this.menu.ionOpen.subscribe(function () {
            _this.markReadTimeout = setTimeout(function () {
                _this.notifications.markRead(3);
                _this.markReadTimeout = 0;
                _this.applicationRef.tick();
            }, 3000);
        });
        this.menu.ionClose.subscribe(function () {
            if (_this.markReadTimeout)
                clearTimeout(_this.markReadTimeout);
        });
    };
    MainMenuContent.prototype.isBudgetPageOpen = function () {
        return this.nav.getActive().component === __WEBPACK_IMPORTED_MODULE_7__pages_budget_budget__["a" /* BudgetPage */];
    };
    MainMenuContent.prototype.budgetName = function (budget) {
        return budget.name() || 'New Budget (' + budget.id + ')';
    };
    MainMenuContent.prototype.openBudget = function (budget) {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_budget_budget__["a" /* BudgetPage */], { 'budget': budget });
    };
    MainMenuContent.prototype.engine = function () {
        return this.engineFactory.getEngine(this.lastOpenedBudget());
    };
    MainMenuContent.prototype.lastOpenedBudget = function () {
        // TODO: Cache the budget - or just have a "currentBudget" in the configuration or app or something....
        var budgetId = this.configuration.lastOpenedBudget();
        if (!budgetId)
            return;
        var budget = this.dbms.getDb(budgetId);
        return budget;
    };
    MainMenuContent.prototype.goHome = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */]);
    };
    MainMenuContent.prototype.goDev = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_11__pages_dev_dev__["a" /* DevPage */]);
    };
    MainMenuContent.prototype.goSettings = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__["a" /* SettingsPage */]);
    };
    MainMenuContent.prototype.goBudgetSettings = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_budget_settings_budget_settings__["a" /* BudgetSettingsPage */], { budgetId: this.lastOpenedBudget().id });
    };
    MainMenuContent.prototype.goAbout = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_13__pages_about_about__["a" /* AboutPage */]);
    };
    MainMenuContent.prototype.addBudget = function () {
        var _this = this;
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_10__modals_add_budget_add_budget__["a" /* AddBudgetModal */]);
        // TODO: Refactor with HomePage. Move to AddBudgetModal...
        modal.onDidDismiss(function (data) {
            if (data && data.budgetName !== '') {
                _this.dbms.createDb().then(function (db) {
                    db.activate().then(function () {
                        var t = new __WEBPACK_IMPORTED_MODULE_9__data_transactions_init_budget_transaction__["a" /* InitBudgetTransaction */]();
                        t.budgetName = data.budgetName;
                        db.applyTransaction(t);
                        db.deactivate();
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_budget_budget__["a" /* BudgetPage */], { 'budget': db });
                    });
                });
            }
        });
        modal.present();
    };
    // -- //
    MainMenuContent.prototype.shareBudget = function () {
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_15__modals_share_budget_share_budget__["a" /* ShareBudgetModal */], { budgetId: this.lastOpenedBudget().id });
        modal.present();
    };
    Object.defineProperty(MainMenuContent.prototype, "shared", {
        get: function () {
            return this.replication.enabled(this.lastOpenedBudget());
        },
        enumerable: true,
        configurable: true
    });
    MainMenuContent.prototype.linkBudget = function () {
        var _this = this;
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_15__modals_share_budget_share_budget__["a" /* ShareBudgetModal */]);
        modal.onDidDismiss(function (data) {
            if (data && data.newBudget) {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_budget_budget__["a" /* BudgetPage */], { 'budget': data.newBudget });
            }
        });
        modal.present();
    };
    MainMenuContent.prototype.sync = function (event) {
        var _this = this;
        this.syncing = true;
        setTimeout(function () {
            return _this.replication.sync().then(function () { _this.syncing = false; _this.toastCtrl.create({ message: 'Budget is up to date', duration: 3000 }).present(); }, function () { _this.syncing = false; });
        }, 1000);
    };
    // -- //
    MainMenuContent.prototype.clearNotifications = function () {
        this.notifications.clear(3);
    };
    MainMenuContent.prototype.goNotifications = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_14__pages_notifications_notifications__["a" /* NotificationsPage */]);
    };
    MainMenuContent.prototype.isCurrentValidAutomaticBankLinks = function () {
        // TODO
        // And need a "cheap" way to get this value - perhaps update it off transactions. Basically we want a few criteria - a bank link is set up, it is linked to an account and all credentials are in there so it is automatic...
        // Note: Maybe not the automatic thing, coz we will have a prompting mechanism...
        // Really we can just getAccounts() and find bankLinkId != null
        // But also if it is valid for this particular "device" (and the user of the device)
        return true;
    };
    MainMenuContent.prototype.runBankLinks = function () {
        // TODO: Combine the notifications / status for these to running and complete and complete / with errors
        var _this = this;
        this.engine().getBankLinks().forEach(function (bl) {
            var monitor = __WEBPACK_IMPORTED_MODULE_18__bank_bank_sync_utils__["a" /* BankSyncUtils */].createMonitorWithNotifications(_this.notifications);
            _this.bankSync.sync(bl, _this.engine(), undefined, monitor, true);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* Menu */])
    ], MainMenuContent.prototype, "menu", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* Nav */])
    ], MainMenuContent.prototype, "nav", void 0);
    MainMenuContent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'main-menu-content',template:/*ion-inline-start:"c:\working\fb\ebudget\src\components\main-menu-content\main-menu-content.html"*/'<ion-item-group *ngIf="lastOpenedBudget()">\n\n    <button ion-item detail-none menuClose (click)="isBudgetPageOpen() || openBudget(lastOpenedBudget())">Back to {{budgetName(lastOpenedBudget())}}</button>\n\n    <ion-item detail-none [menuClose]="syncing ? true : null" (click)="!syncing && shareBudget()">Share Budget...\n\n        <button ion-button *ngIf="shared" [disabled]="syncing" item-right outline (click)="sync($event);$event.stopPropagation();">Sync Now</button>\n\n    </ion-item>\n\n    <button *ngIf="isCurrentValidAutomaticBankLinks()" ion-item detail-none (click)="runBankLinks()">Sync Bank Accounts \n\n        <ion-spinner *ngIf="bankSync.activeSyncs.length" name="bubbles" style="position:absolute; top:0; bottom:0; margin-top:auto; margin-bottom:auto;"></ion-spinner>\n\n    </button>\n\n    <button ion-item menuClose (click)="goBudgetSettings()">Budget Settings</button>\n\n</ion-item-group>\n\n<ion-item-group *ngIf="notifications.notifications.length">\n\n    <ion-item-divider light>\n\n        Notifications <ion-badge *ngIf="notifications.newNotifications.length > 3">{{notifications.newNotifications.length}}</ion-badge>\n\n        <button ion-button item-right outline [disabled]="!notifications.newNotifications.length" (click)="notifications.clear(3)" (press)="notifications.clear()">Clear</button><button ion-button item-right outline menuClose (click)="goNotifications()">Show All</button>\n\n    </ion-item-divider>\n\n    <ion-item *ngIf="!notifications.newNotifications.length"><ion-note>No New Notifications</ion-note></ion-item>\n\n    <notification-list *ngIf="notifications.newNotifications.length" new="true" limit="3" [nav]="nav"></notification-list>\n\n</ion-item-group>\n\n<ion-item-group>\n\n    <ion-item-divider light>\n\n        Open\n\n    </ion-item-divider>\n\n    <button ion-item [class.selectedBudget]="b == lastOpenedBudget()" menuClose *ngFor="let b of budgets" (click)="openBudget(b)">{{budgetName(b)}}</button>\n\n    <button ion-item menuClose detail-none (click)="addBudget()">Create New Budget...</button>\n\n    <button ion-item menuClose detail-none (click)="linkBudget()">Open a Shared Budget...</button>\n\n</ion-item-group>\n\n<ion-item-group>\n\n    <ion-item-divider light>\n\n        Options\n\n    </ion-item-divider>\n\n    <button id="main-menu-home" ion-item menuClose (click)="goHome()">Home</button>\n\n    <button ion-item menuClose (click)="goDev()">Dev</button>\n\n    <button ion-item menuClose (click)="goSettings()">Settings</button>\n\n    <button ion-item menuClose (click)="goAbout()">About</button>\n\n</ion-item-group>'/*ion-inline-end:"c:\working\fb\ebudget\src\components\main-menu-content\main-menu-content.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__services_configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_5__services_replication_service__["a" /* Replication */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_6__services_notifications__["a" /* Notifications */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["f" /* ApplicationRef */], __WEBPACK_IMPORTED_MODULE_16__bank_bank_sync__["a" /* BankSync */], __WEBPACK_IMPORTED_MODULE_17__engine_engine_factory__["a" /* EngineFactory */]])
    ], MainMenuContent);
    return MainMenuContent;
}());

//# sourceMappingURL=main-menu-content.js.map

/***/ }),
/* 515 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_notifications__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotificationList = (function () {
    function NotificationList(notificationService) {
        this.notificationService = notificationService;
        this.limit = Number.MAX_SAFE_INTEGER;
    }
    NotificationList.prototype.ngOnInit = function () {
        this.notifications = this.new ? this.notificationService.newNotifications : this.notificationService.notifications;
    };
    NotificationList.prototype.notificationClicked = function (notification) {
        if (notification.clickAction) {
            if (notification.clickAction.type === 'custom') {
                notification.clickAction.data();
            }
            else if (notification.clickAction.type === 'page-nav') {
                this.nav.push(notification.clickAction.data.page, notification.clickAction.data.params);
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], NotificationList.prototype, "limit", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], NotificationList.prototype, "new", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */])
    ], NotificationList.prototype, "nav", void 0);
    NotificationList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'notification-list',template:/*ion-inline-start:"c:\working\fb\ebudget\src\components\notification-list\notification-list.html"*/'<ion-item *ngFor="let n of notifications | slice:0:limit" [class.unread]="!n.read" [class.notification-important]="n.important" detail-none menuClose (click)="notificationClicked(n)">{{n.message}}</ion-item>\n\n\n\n'/*ion-inline-end:"c:\working\fb\ebudget\src\components\notification-list\notification-list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_notifications__["a" /* Notifications */]])
    ], NotificationList);
    return NotificationList;
}());

//# sourceMappingURL=notification-list.js.map

/***/ }),
/* 516 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainMenuIcon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_notifications__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MainMenuIcon = (function () {
    function MainMenuIcon(notifications) {
        this.notifications = notifications;
    }
    MainMenuIcon = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'main-menu-icon',template:/*ion-inline-start:"c:\working\fb\ebudget\src\components\main-menu-icon\main-menu-icon.html"*/'<ion-icon name="menu"></ion-icon>\n\n<ion-badge *ngIf="!notifications.acknowledged" [color]="notifications.important ? \'danger\' : \'primary\'">!</ion-badge>\n\n'/*ion-inline-end:"c:\working\fb\ebudget\src\components\main-menu-icon\main-menu-icon.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_notifications__["a" /* Notifications */]])
    ], MainMenuIcon);
    return MainMenuIcon;
}());

//# sourceMappingURL=main-menu-icon.js.map

/***/ }),
/* 517 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdatedCheck; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notifications__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_ready__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logger__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_build_info__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var UpdatedCheck = (function () {
    function UpdatedCheck(appReady, notifications, configuration) {
        var _this = this;
        this.logger = __WEBPACK_IMPORTED_MODULE_4__logger__["a" /* Logger */].get('Notifications');
        if (__WEBPACK_IMPORTED_MODULE_6__utils__["a" /* Utils */].getQueryStringValue('demo'))
            return; // Skip this for demos
        appReady.ready.then(function () {
            var latestVersion = configuration.option('latest-version');
            if (__WEBPACK_IMPORTED_MODULE_5__app_build_info__["a" /* BuildInfo */].version !== latestVersion || __WEBPACK_IMPORTED_MODULE_5__app_build_info__["a" /* BuildInfo */].version === "%BUILD_INFO_VERSION%") {
                configuration.option('latest-version', __WEBPACK_IMPORTED_MODULE_5__app_build_info__["a" /* BuildInfo */].version);
                var message = "Updated to version " + __WEBPACK_IMPORTED_MODULE_5__app_build_info__["a" /* BuildInfo */].version;
                _this.logger.info(message);
                notifications.show({ message: message, popup: true, silent: true, category: 'app-updated' });
            }
        });
    }
    UpdatedCheck = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__app_app_ready__["a" /* AppReady */], __WEBPACK_IMPORTED_MODULE_1__notifications__["a" /* Notifications */], __WEBPACK_IMPORTED_MODULE_2__configuration_service__["a" /* Configuration */]])
    ], UpdatedCheck);
    return UpdatedCheck;
}());

//# sourceMappingURL=updated-check.js.map

/***/ }),
/* 518 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrencyField; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import MaskedInput from 'ionic2-input-mask';


var CurrencyField = (function () {
    function CurrencyField(elementRef, ngControl, platform, configuration) {
        this.elementRef = elementRef;
        this.ngControl = ngControl;
        this.platform = platform;
        this.configuration = configuration;
        if (!(this.platform.is('ios') || this.platform.is('android'))) {
            //            this.maskedInput = new MaskedInput(elementRef, ngControl);
            //            this.maskedInput.textMaskConfig = <any> {mask: this.numberMask.bind(this), placeholderChar: '0'};
        }
    }
    CurrencyField.prototype.ngAfterViewInit = function () {
        this.htmlInputElement = this.elementRef.nativeElement.children[0];
        //if (this.maskedInput) {
        //this.maskedInput.ngAfterViewInit();
        //}
        if (this.platform.is('ios') || this.platform.is('android')) {
            this.htmlInputElement.setAttribute('type', 'number');
            this.htmlInputElement.setAttribute('step', '0.01');
        }
        /*        this.htmlInputElement.addEventListener('input', (ev) => {
                    let val = this.htmlInputElement.value;
                    let parts = val.split('.');
                    if (parts.length > 1) {
                        let cents = parts[1];
                        if (cents.length > 2) cents = cents.substring(0,2);
                        val = parts[0] + '.' + cents;
                    }
                    val = val.replace(/[^0-9.]/g, '');
                    if (val !== this.htmlInputElement.value) this.htmlInputElement.value = val;
                });
        */
        this.htmlInputElement.setAttribute('placeholder', '0.00');
    };
    CurrencyField.prototype.onInput = function () {
        var val = this.htmlInputElement.value;
        val = val.replace(/[^0123456789.]/g, '');
        var parts = val.split('.');
        if (parts.length > 1) {
            var cents = parts[1];
            if (cents.length > 2)
                cents = cents.substring(0, 2);
            val = parts[0] + '.' + cents;
        }
        if (val !== this.htmlInputElement.value)
            this.htmlInputElement.value = val;
        this.ngControl.viewToModelUpdate(this.htmlInputElement.value);
    };
    CurrencyField = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            host: {
                '(input)': 'onInput()'
            },
            selector: 'ion-input[currency-field]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* NgControl */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__services_configuration_service__["a" /* Configuration */]])
    ], CurrencyField);
    return CurrencyField;
}());

//# sourceMappingURL=currency-field.js.map

/***/ }),
/* 519 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoFocusDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NoFocusDirective = (function () {
    function NoFocusDirective() {
    }
    NoFocusDirective.prototype.onMouseDown = function (event) {
        event.preventDefault();
        return false;
    };
    NoFocusDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[nofocus]',
            host: {
                '(mousedown)': 'onMouseDown($event)'
            }
        })
    ], NoFocusDirective);
    return NoFocusDirective;
}());

//# sourceMappingURL=no-focus.js.map

/***/ }),
/* 520 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorLabel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_logger_ui_notifier_appender__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ErrorLabel = (function () {
    function ErrorLabel(actionSheetCtrl) {
        this.actionSheetCtrl = actionSheetCtrl;
        this.hide = false;
    }
    ErrorLabel.prototype.click = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Error',
            buttons: [
                {
                    text: 'Send Error Report',
                    handler: function () {
                        __WEBPACK_IMPORTED_MODULE_2__services_logger_ui_notifier_appender__["a" /* LoggerUINotifierAppender */].instance.handler.handle(_this.message);
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        actionSheet.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], ErrorLabel.prototype, "message", void 0);
    ErrorLabel = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'error-label',
            template: '<div (click)="click()">{{message}}</div>'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], ErrorLabel);
    return ErrorLabel;
}());

//# sourceMappingURL=error-label.js.map

/***/ }),
/* 521 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReplicationErrorDisplay; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_replication_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_logger_ui_notifier_appender__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ReplicationErrorDisplay = (function () {
    function ReplicationErrorDisplay(replication, actionSheetCtrl) {
        this.replication = replication;
        this.actionSheetCtrl = actionSheetCtrl;
        this.hide = false;
    }
    ReplicationErrorDisplay.prototype.replicationStatus = function () {
        if (this.replication.syncing.lastResultSuccess)
            return 'Synchronised';
        return 'Synchronise Error';
    };
    ReplicationErrorDisplay.prototype.click = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Sync Error',
            buttons: [
                {
                    text: 'Hide Sync Error Messages',
                    handler: function () {
                        _this.hide = true;
                    }
                }, {
                    text: 'Send Error Report',
                    handler: function () {
                        __WEBPACK_IMPORTED_MODULE_3__services_logger_ui_notifier_appender__["a" /* LoggerUINotifierAppender */].instance.handler.handle('Sync Error');
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        actionSheet.present();
    };
    ReplicationErrorDisplay = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'replication-error',
            template: '<div *ngIf="!hide" (click)="click()" [class.show]="!replication.syncing.lastResultSuccess" [class.error]="replication.syncing.consecutiveErrorCount>2">{{replicationStatus()}}</div>'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_replication_service__["a" /* Replication */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* ActionSheetController */]])
    ], ReplicationErrorDisplay);
    return ReplicationErrorDisplay;
}());

//# sourceMappingURL=replication-error-display.js.map

/***/ }),
/* 522 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrencyDisplay; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__price_format__ = __webpack_require__(523);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CurrencyDisplay = (function () {
    function CurrencyDisplay() {
    }
    CurrencyDisplay.prototype.ngOnInit = function () {
        // this.formatCurrency();
    };
    CurrencyDisplay.prototype.ngOnChanges = function () {
        this.formatCurrency();
    };
    CurrencyDisplay.prototype.formatCurrency = function () {
        // If they are defined, then they are true, otherwise they will be falsy
        if (typeof this.highlightPositive !== 'undefined')
            this.highlightPositive = true;
        if (typeof this.highlightNegative !== 'undefined')
            this.highlightNegative = true;
        if (typeof this.invertedCurrency !== 'undefined')
            this.invertedCurrency = true;
        if (typeof this.showPositive !== 'undefined')
            this.showPositive = true;
        if (typeof this.showNegative !== 'undefined')
            this.showNegative = true;
        if (this.checkValue === this.value)
            return this.formattedCurrencyCached;
        this.checkValue = this.value;
        var pf = new __WEBPACK_IMPORTED_MODULE_1__price_format__["a" /* PriceFormat */]({}, {});
        var formattedVal = pf.formatIt(pf.fix_it(this.value));
        formattedVal = formattedVal.replace('-', '');
        this.positive = true;
        if (parseFloat(this.value) < 0) {
            this.positive = false;
            if (this.highlightNegative)
                formattedVal = '(' + formattedVal + ')';
        }
        if (this.invertedCurrency)
            this.positive = !this.positive;
        if (this.positive && this.showPositive && formattedVal !== '0.00') {
            formattedVal = '+' + formattedVal;
        }
        else if (!this.positive && this.showNegative && formattedVal !== '0.00') {
            formattedVal = '-' + formattedVal;
        }
        this.formattedCurrencyCached = formattedVal;
        return this.formattedCurrencyCached;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], CurrencyDisplay.prototype, "value", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], CurrencyDisplay.prototype, "highlightPositive", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], CurrencyDisplay.prototype, "highlightNegative", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], CurrencyDisplay.prototype, "invertedCurrency", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], CurrencyDisplay.prototype, "showPositive", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], CurrencyDisplay.prototype, "showNegative", void 0);
    CurrencyDisplay = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'currency-display',
            template: '<span [class.positive-currency]="positive && highlightPositive" [class.negative-currency]="!positive && highlightNegative">{{formattedCurrencyCached}}</span>'
        })
    ], CurrencyDisplay);
    return CurrencyDisplay;
}());

//# sourceMappingURL=currency-display.js.map

/***/ }),
/* 523 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PriceFormat; });
var PriceFormat = (function () {
    function PriceFormat(model, eleRef) {
        this.model = model;
        this.is_number = /[0-9]/;
        this.centsLimit = 2;
        this.clearOnEmpty = false;
        this.centsSeparator = ".";
        this.thousandsSeparator = ",";
        this.allowNegative = true;
        this.insertPlusSign = false;
        this.prefix = "";
        this.suffix = "";
        this.element = eleRef.nativeElement;
    }
    PriceFormat.prototype.ngOnInit = function () {
        if ("input" == this.element.tagName.toLowerCase())
            this.input = this.element;
        else if ("ion-input" == this.element.tagName.toLowerCase()) {
            this.input = this.element.firstChild;
            //this.displayInput = this.input.cloneNode();
            //this.element.insertBefore(this.displayInput, this.input);
        }
        if (this.model.valueAccessor) {
            this.model.valueAccessor.writeValue(this.fix_it(this.model.value));
            this.model.viewToModelUpdate(this.fix_it(this.model.value));
        }
        else {
            throw new Error("price-format requires NgModel to function correctly");
            //(<Control>this.ctrl.control).updateValue(this.fix_it(this.model.value));
        }
    };
    PriceFormat.prototype.onInput = function () {
        this.input.value = this.formatIt(this.input.value);
    };
    PriceFormat.prototype.onNgModelChange = function (nv) {
        nv = this.formatIt(nv);
        if (this.model.value !== nv.toUpperCase() && this.model.value !== this.modelPreviousValue) {
            this.modelPreviousValue = this.model.value;
            this.model.valueAccessor.writeValue(nv);
            this.model.viewToModelUpdate(nv);
            //if (this.displayInput) this.displayInput.value = nv;
        }
    };
    PriceFormat.prototype.formatIt = function (value) {
        return this.price_format(value, false);
    };
    PriceFormat.prototype.to_numbers = function (str) {
        var formatted = '';
        for (var i = 0; i < (str.length); i++) {
            var char_ = str.charAt(i);
            if (formatted.length == 0 && char_ == 0)
                char_ = false;
            if (char_ && char_.match(this.is_number)) {
                //if (limit) {
                //    if (formatted.length < limit) formatted = formatted + char_;
                //}
                //else {
                formatted = formatted + char_;
                //}
            }
        }
        return formatted;
    };
    // format to fill with zeros to complete cents chars
    PriceFormat.prototype.fill_with_zeroes = function (str) {
        while (str.length < (this.centsLimit + 1))
            str = '0' + str;
        return str;
    };
    PriceFormat.prototype.fix_it = function (str1) {
        var str = str1 ? str1 + "" : "0";
        var parts = str.split(".");
        if (parts.length == 1) {
            str = str + this.centsSeparator + Array(this.centsLimit + 1).join("0");
        }
        else if (parts.length == 2) {
            var cents = parts[1];
            if (parts[1].length > this.centsLimit)
                cents = parts[1].substring(0, this.centsLimit + 1);
            else if (parts[1].length < this.centsLimit)
                cents = parts[1] + Array(this.centsLimit - parts[1].length + 1).join("0");
            str = parts[0] + this.centsSeparator + cents;
        }
        return this.price_format(str, false);
    };
    PriceFormat.prototype.price_format = function (str, ignore) {
        str = str + "";
        if (!ignore && (str === '' || str == this.price_format('0', true)) && this.clearOnEmpty)
            return '';
        // formatting settings
        var formatted = this.fill_with_zeroes(this.to_numbers(str));
        var thousandsFormatted = '';
        var thousandsCount = 0;
        var centsSeparator = this.centsSeparator;
        // Checking CentsLimit
        if (this.centsLimit == 0) {
            centsSeparator = "";
            centsVal = "";
        }
        // split integer from cents
        var centsVal = formatted.substr(formatted.length - this.centsLimit, this.centsLimit);
        var integerVal = formatted.substr(0, formatted.length - this.centsLimit);
        // apply cents pontuation
        formatted = (this.centsLimit == 0) ? integerVal : integerVal + centsSeparator + centsVal;
        // apply thousands pontuation
        if (this.thousandsSeparator) {
            for (var j = integerVal.length; j > 0; j--) {
                var char_ = integerVal.substr(j - 1, 1);
                thousandsCount++;
                if (thousandsCount % 3 == 0)
                    char_ = this.thousandsSeparator + char_;
                thousandsFormatted = char_ + thousandsFormatted;
            }
            //
            if (thousandsFormatted.substr(0, 1) == this.thousandsSeparator)
                thousandsFormatted = thousandsFormatted.substring(1, thousandsFormatted.length);
            formatted = (this.centsLimit == 0) ? thousandsFormatted : thousandsFormatted + centsSeparator + centsVal;
        }
        // if the string contains a dash, it is negative - add it to the begining (except for zero)
        if (this.allowNegative && (integerVal != 0 || centsVal != 0)) {
            if (str.indexOf('-') != -1 && str.indexOf('+') < str.indexOf('-')) {
                formatted = '-' + formatted;
            }
            else {
                if (!this.insertPlusSign)
                    formatted = '' + formatted;
                else
                    formatted = '+' + formatted;
            }
        }
        // apply the prefix
        if (this.prefix)
            formatted = this.prefix + formatted;
        // apply the suffix
        if (this.suffix)
            formatted = formatted + this.suffix;
        return formatted;
    };
    return PriceFormat;
}());

//# sourceMappingURL=price-format.js.map

/***/ }),
/* 524 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DFormatPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DFormatPipe = (function () {
    function DFormatPipe() {
    }
    DFormatPipe.prototype.transform = function (val, args) {
        var m = __WEBPACK_IMPORTED_MODULE_1_moment___default()(val, 'YYYYMMDD');
        if (m.year() === new Date().getFullYear()) {
            return m.format('DD MMM');
        }
        else {
            return m.format('DD MMM YYYY');
        }
    };
    DFormatPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'dFormat'
        })
    ], DFormatPipe);
    return DFormatPipe;
}());

//# sourceMappingURL=date-format.js.map

/***/ }),
/* 525 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CuteProgressBar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CuteProgressBar = (function () {
    function CuteProgressBar() {
    }
    CuteProgressBar.prototype.cssWidth = function () {
        // TODO: Need a way to immediately update this, perhaps instead of binding, have a method which will update the DOM directly...
        // TODO: Or need a way to trigger angular to run immediately, and not in a setTimeout()...
        if (this.of > 0)
            return (this.value / this.of * 100) + "%";
        return "0"; // TODO: Trigger an indeterminate animation
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])("value"),
        __metadata("design:type", Number)
    ], CuteProgressBar.prototype, "value", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])("of"),
        __metadata("design:type", Number)
    ], CuteProgressBar.prototype, "of", void 0);
    CuteProgressBar = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'cute-progress-bar',
            template: '<div class="cute-progress-indicator" [style.left]="cssWidth()"></div>'
        })
    ], CuteProgressBar);
    return CuteProgressBar;
}());

//# sourceMappingURL=cute-progress-bar.js.map

/***/ }),
/* 526 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BankAutoSync; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bank_link_local__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_ready__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bank_sync__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__bank_sync_utils__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_notifications__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_logger__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var BankAutoSync = (function () {
    function BankAutoSync(bankLinkLocal, appReady, engineFactory, dbms, bankSync, notifications) {
        var _this = this;
        this.bankLinkLocal = bankLinkLocal;
        this.engineFactory = engineFactory;
        this.dbms = dbms;
        this.bankSync = bankSync;
        this.notifications = notifications;
        this.log = __WEBPACK_IMPORTED_MODULE_8__services_logger__["a" /* Logger */].get('bank-auto-sync');
        appReady.ready.then(function () {
            setTimeout(function () {
                _this.log.info("Starting auto sync scheduler");
                _this.scheduleBankAutoSync();
            }, 10000);
        });
    }
    BankAutoSync.prototype.scheduleBankAutoSync = function () {
        var _this = this;
        setTimeout(function () { return _this.scheduleBankAutoSync(); }, 60000);
        this.dbms.dbs.forEach(function (db) {
            if (db.isActive()) {
                _this.autoSync(db);
            }
        });
    };
    /**
     * Runs the auto bank sync for all bank links with autosync for the DB< if they are past their scheduled time
     */
    BankAutoSync.prototype.autoSync = function (db) {
        var _this = this;
        var engine = this.engineFactory.getEngine(db);
        var bankLinks = engine.getBankLinks();
        bankLinks.forEach(function (bankLink) {
            var info = _this.bankLinkLocal.getInfo(bankLink.uuid);
            var timeDiffHours = info.lastSync == null ? Date.now() : (Date.now() - info.lastSync) / (1000 * 60 * 60);
            if (info.autoSync && !info.pauseAutoSync && timeDiffHours > 12 && _this.bankSync.activeSyncs.find(function (m) { return m.bankLink.uuid === bankLink.uuid; }) === undefined) {
                _this.log.info("Auto syncing bank link " + bankLink.name);
                var monitor_1 = __WEBPACK_IMPORTED_MODULE_6__bank_sync_utils__["a" /* BankSyncUtils */].createMonitorWithNotifications(_this.notifications);
                monitor_1.on('running-state-change').subscribe(function () {
                    if (monitor_1.running)
                        _this.notifications.show({ message: 'Syncing Bank Link ' + monitor_1.bankLink.name, category: 'bank-sync.' + monitor_1.bankLink.uuid });
                });
                _this.bankSync.sync(bankLink, engine, undefined, monitor_1, true);
            }
            if (info.autoSync && info.pauseAutoSync && timeDiffHours > 24) {
                _this.notifications.show({ message: 'Bank Link Syncing Paused for ' + bankLink.name, category: 'bank-sync.' + bankLink.uuid + 'auto-sync-paused' });
            }
        });
    };
    BankAutoSync = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__bank_link_local__["a" /* BankLinkLocal */], __WEBPACK_IMPORTED_MODULE_2__app_app_ready__["a" /* AppReady */], __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__["a" /* EngineFactory */], __WEBPACK_IMPORTED_MODULE_4__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_5__bank_sync__["a" /* BankSync */], __WEBPACK_IMPORTED_MODULE_7__services_notifications__["a" /* Notifications */]])
    ], BankAutoSync);
    return BankAutoSync;
}());

//# sourceMappingURL=bank-auto-sync.js.map

/***/ }),
/* 527 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Status; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_notifications__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Status = (function () {
    function Status(notificationService) {
        this.notificationService = notificationService;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", HTMLElement)
    ], Status.prototype, "header", void 0);
    Status = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'status',template:/*ion-inline-start:"c:\working\fb\ebudget\src\components\status\status.html"*/'<div class="status-indicator"><ion-icon name="ios-information-circle-outline"></ion-icon></div>'/*ion-inline-end:"c:\working\fb\ebudget\src\components\status\status.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_notifications__["a" /* Notifications */]])
    ], Status);
    return Status;
}());

//# sourceMappingURL=status.js.map

/***/ }),
/* 528 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReconciliationStatus; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notifications__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__configuration_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__db_dbms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_bank_account_bank_account__ = __webpack_require__(147);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ReconciliationStatus = (function () {
    function ReconciliationStatus(notifications, configuration, dbms, engineFactory) {
        var _this = this;
        this.notifications = notifications;
        this.configuration = configuration;
        this.dbms = dbms;
        this.engineFactory = engineFactory;
        dbms.dbInitialisedObservable().subscribe(function (db) {
            var engine = _this.engineFactory.getEngine(db);
            engine.bankTransactionUnreconciledDynamicView.on('rebuild', function (e) {
                if (!db.isActive())
                    return;
                _this.notifyReconciliationChange(engine);
            });
            db.on('db-activated').subscribe(function (dbEvent) {
                if (engine.bankTransactionUnreconciledDynamicView.data().length > 0) {
                    _this.notifyReconciliationChange(engine);
                }
            });
        });
    }
    ReconciliationStatus.prototype.notifyReconciliationChange = function (engine) {
        // TODO: Going to have to group and remember these by account!
        // Or set up and manage a few views with where clauses and monitor each one, I wonder how good our "rebuild" is.
        var accountId = engine.bankTransactionUnreconciledDynamicView.data().length > 0 ? engine.bankTransactionUnreconciledDynamicView.data()[0].accountId : null;
        var clickAction = accountId != null ? { type: 'page-nav', data: { page: __WEBPACK_IMPORTED_MODULE_5__pages_bank_account_bank_account__["a" /* BankAccountPage */], params: { budgetId: engine.db.id, accountId: accountId } } } : undefined;
        this.notifications.show({
            message: engine.bankTransactionUnreconciledDynamicView.data().length + ' bank transactions to reconcile',
            category: 'reconciliation-status',
            budgetId: engine.db.id,
            clickAction: clickAction
        });
    };
    ReconciliationStatus = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__notifications__["a" /* Notifications */], __WEBPACK_IMPORTED_MODULE_2__configuration_service__["a" /* Configuration */], __WEBPACK_IMPORTED_MODULE_4__db_dbms__["a" /* Dbms */], __WEBPACK_IMPORTED_MODULE_3__engine_engine_factory__["a" /* EngineFactory */]])
    ], ReconciliationStatus);
    return ReconciliationStatus;
}());

//# sourceMappingURL=reconciliation-status.js.map

/***/ })
],[403]);
//# sourceMappingURL=main.js.map