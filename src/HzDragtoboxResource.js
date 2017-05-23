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
require("dragula");
require("jquery-ui");
require("jq-dragtobox");
var HzDragtoboxResource = HzDragtoboxResource_1 = (function (_super) {
    __extends(HzDragtoboxResource, _super);
    /**
     * Recurso de tooltip para Haztivity.
     * @param _$
     * @param _EventEmitterFactory
     * @param _ScormService
     */
    function HzDragtoboxResource(_$, _EventEmitterFactory, _DataOptions) {
        var _this = _super.call(this, _$, _EventEmitterFactory) || this;
        _this._DataOptions = _DataOptions;
        return _this;
    }
    /**
     * Initialize the resource
     * @param options   Options for hz-dragtobox
     * @param config
     */
    HzDragtoboxResource.prototype.init = function (options, config) {
        this._config = config;
        this._options = options;
        this.refresh();
    };
    /**
     * Initialize the widget
     */
    HzDragtoboxResource.prototype.refresh = function () {
        //If there are a instance, destroy it
        if (this._dragtoboxInstance) {
            this._dragtoboxInstance.destroy();
        }
        //Get the options for the widget
        var dragtoboxOptions = this._DataOptions.getDataOptions(this._$element, "jq-dragtobox");
        //merge with defaults
        this._options.dragtoboxOptions = this._$.extend(true, {}, HzDragtoboxResource_1.DEFAULTS, dragtoboxOptions);
        //Create the widget
        this._$element.dragtobox(this._options.dragtoboxOptions);
        //store the instance
        this._dragtoboxInstance = this._$element.dragtobox("instance");
        this._assignEvents();
    };
    /**
     * Get the instance of the widget
     * @returns {any}
     */
    HzDragtoboxResource.prototype.getInstance = function () {
        return this._dragtoboxInstance;
    };
    /**
     * Disable the resource and the widget
     */
    HzDragtoboxResource.prototype.disable = function () {
        if (_super.prototype.disable.call(this)) {
            this._dragtoboxInstance.disable();
        }
    };
    /**
     * Enable the resource and the widget
     */
    HzDragtoboxResource.prototype.enable = function () {
        if (_super.prototype.enable.call(this)) {
            this._dragtoboxInstance.enable();
        }
    };
    /**
     * Assign the events to handle for the widget
     * @private
     */
    HzDragtoboxResource.prototype._assignEvents = function () {
        this._$element.off("." + HzDragtoboxResource_1.NAMESPACE)
            .one("dragtobox:completed." + HzDragtoboxResource_1.NAMESPACE, this._onResourceDone.bind(this));
    };
    /**
     * Invoked when the widget it's done. Mark the resource as completed and disable the widget
     * @param e
     * @private
     */
    HzDragtoboxResource.prototype._onResourceDone = function (e) {
        this._dragtoboxInstance.disable();
        this._markAsCompleted();
    };
    /**
     * Destroy the resource
     */
    HzDragtoboxResource.prototype.destroy = function () {
        if (this._dragtoboxInstance) {
            this._dragtoboxInstance.destroy();
        }
        _super.prototype.destroy.call(this);
    };
    return HzDragtoboxResource;
}(core_1.ResourceController));
HzDragtoboxResource.DEFAULTS = {};
HzDragtoboxResource.NAMESPACE = "hzDragtobox";
HzDragtoboxResource = HzDragtoboxResource_1 = __decorate([
    core_1.Resource({
        name: "HzDragtobox",
        dependencies: [
            core_1.$,
            core_1.EventEmitterFactory,
            core_1.DataOptions
        ]
    })
], HzDragtoboxResource);
exports.HzDragtoboxResource = HzDragtoboxResource;
var HzDragtoboxResource_1;
//# sourceMappingURL=HzDragtoboxResource.js.map