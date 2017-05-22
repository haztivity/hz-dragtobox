"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var core_1 = require("@haztivity/core");
require("jquery-ui-dist/jquery-ui.js");
require("jq-fillgaps");
var HzFillgapsResource = HzFillgapsResource_1 = (function (_super) {
    __extends(HzFillgapsResource, _super);
    /**
     * Recurso de tooltip para Haztivity.
     * @param _$
     * @param _EventEmitterFactory
     * @param _ScormService
     */
    function HzFillgapsResource(_$, _EventEmitterFactory, _DataOptions) {
        var _this = _super.call(this, _$, _EventEmitterFactory) || this;
        _this._isOpen = false;
        _this._DataOptions = _DataOptions;
        return _this;
    }
    HzFillgapsResource.prototype.init = function (options, config) {
        this._config = config;
        this._id = new Date().getTime();
        this._namespace = HzFillgapsResource_1.NAMESPACE + this._id;
        this._options = options;
        this.refresh();
    };
    HzFillgapsResource.prototype.refresh = function () {
        if (this._fillgapsInstance) {
            this._fillgapsInstance.destroy();
        }
        debugger;
        var fillgapsOptions = this._DataOptions.getDataOptions(this._$element, "hz-fillgaps");
        this._options.fillgapsOptions = this._$.extend(true, {}, HzFillgapsResource_1.DEFAULTS, fillgapsOptions);
        this._$element.fillgaps(this._options.fillgapsOptions);
        this._fillgapsInstance = this._$element.data("fillgapsModel");
        this._assignEvents();
    };
    HzFillgapsResource.prototype.getInstance = function () {
        return this._fillgapsInstance;
    };
    HzFillgapsResource.prototype.disable = function () {
        if (_super.prototype.disable.call(this)) {
        }
    };
    HzFillgapsResource.prototype.enable = function () {
        if (_super.prototype.enable.call(this)) {
        }
    };
    HzFillgapsResource.prototype._assignEvents = function () {
        this._$element.off("." + HzFillgapsResource_1.NAMESPACE)
            .one("fillgaps:done." + HzFillgapsResource_1.NAMESPACE, this._onFlipDone.bind(this))
            .on("click." + HzFillgapsResource_1.NAMESPACE + " hover." + HzFillgapsResource_1.NAMESPACE, ">*", this._onInteraction.bind(this));
    };
    HzFillgapsResource.prototype._onInteraction = function (e) {
        if (this.isDisabled()) {
            e.stopPropagation();
        }
    };
    HzFillgapsResource.prototype._onFlipDone = function (e) {
        this._markAsCompleted();
    };
    HzFillgapsResource.prototype.destroy = function () {
        if (this._fillgapsInstance) {
        }
        _super.prototype.destroy.call(this);
    };
    return HzFillgapsResource;
}(core_1.ResourceController));
HzFillgapsResource.DEFAULTS = {};
HzFillgapsResource.NAMESPACE = "hzFillgaps";
HzFillgapsResource = HzFillgapsResource_1 = __decorate([
    core_1.Resource({
        name: "HzFillgaps",
        dependencies: [
            core_1.$,
            core_1.EventEmitterFactory,
            core_1.DataOptions
        ]
    })
], HzFillgapsResource);
exports.HzFillgapsResource = HzFillgapsResource;
var HzFillgapsResource_1;
//# sourceMappingURL=HzFillgapsResource.js.map