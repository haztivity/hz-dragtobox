/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Resource,ResourceController,$,EventEmitterFactory,DataOptions} from "@haztivity/core";
import "jquery-ui-dist/jquery-ui.js";
import "jq-dragtobox";
@Resource(
    {
        name:"HzDragtobox",
        dependencies:[
            $,
            EventEmitterFactory,
            DataOptions
        ]
    }
)
export class HzDragtoboxResource extends ResourceController {
    protected static readonly DEFAULTS = {
        
    };
    public static readonly NAMESPACE = "hzDragtobox";
    protected _DataOptions:DataOptions;
    protected _dragtoboxInstance:any;
    protected _isOpen:boolean=false;
    protected _id;
    protected _namespace;

    /**
     * Recurso de tooltip para Haztivity.
     * @param _$
     * @param _EventEmitterFactory
     * @param _ScormService
     */
    constructor(_$: JQueryStatic, _EventEmitterFactory, _DataOptions) {
        super(_$, _EventEmitterFactory);
        this._DataOptions = _DataOptions;
    }

    init(options, config?) {
        this._config = config;
        this._id = new Date().getTime();
        this._namespace = HzDragtoboxResource.NAMESPACE + this._id;
        this._options = options;
        this.refresh();
    }
    public refresh(){
        if(this._dragtoboxInstance){
            this._dragtoboxInstance.destroy();
        }

        let dragtoboxOptions = this._DataOptions.getDataOptions(this._$element, "hz-dragtobox");
        this._options.dragtoboxOptions = this._$.extend(true,{},HzDragtoboxResource.DEFAULTS, dragtoboxOptions);
        this._$element.dragtobox(this._options.dragtoboxOptions);
        this._dragtoboxInstance = this._$element.data("dragtoboxModel");
        this._assignEvents();
    }

    public getInstance(): any {
        return this._dragtoboxInstance;
    }
    public disable(){
        if(super.disable()){

        }
    }
    public enable(){
        if(super.enable()){

        }
    }

    protected _assignEvents(){
        this._$element.off("."+HzDragtoboxResource.NAMESPACE)
            .one("dragtobox:completed."+HzDragtoboxResource.NAMESPACE,this._onResourceDone.bind(this))
            .on("click."+HzDragtoboxResource.NAMESPACE+" hover."+HzDragtoboxResource.NAMESPACE,">*",this._onInteraction.bind(this));
    }
    protected _onInteraction(e){
        if(this.isDisabled()){
            e.stopPropagation();
        }
    }
    protected _onResourceDone (e){
        this._markAsCompleted();
    }
    public destroy(){
        if(this._dragtoboxInstance) {

        }
        super.destroy();
    }
}