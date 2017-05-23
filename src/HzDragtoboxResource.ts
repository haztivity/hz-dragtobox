/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Resource,ResourceController,$,EventEmitterFactory,DataOptions} from "@haztivity/core";
import "dragula";
import "jquery-ui";
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

    /**
     * Initialize the resource
     * @param options   Options for hz-dragtobox
     * @param config
     */
    init(options, config?) {
        this._config = config;
        this._options = options;
        this.refresh();
    }

    /**
     * Initialize the widget
     */
    public refresh(){
        //If there are a instance, destroy it
        if(this._dragtoboxInstance){
            this._dragtoboxInstance.destroy();
        }
        //Get the options for the widget
        let dragtoboxOptions = this._DataOptions.getDataOptions(this._$element, "jq-dragtobox");
        //merge with defaults
        this._options.dragtoboxOptions = this._$.extend(true,{},HzDragtoboxResource.DEFAULTS, dragtoboxOptions);
        //Create the widget
        this._$element.dragtobox(this._options.dragtoboxOptions);
        //store the instance
        this._dragtoboxInstance = this._$element.dragtobox("instance");
        this._assignEvents();
    }

    /**
     * Get the instance of the widget
     * @returns {any}
     */
    public getInstance(): any {
        return this._dragtoboxInstance;
    }

    /**
     * Disable the resource and the widget
     */
    public disable(){
        if(super.disable()){
            this._dragtoboxInstance.disable();
        }
    }

    /**
     * Enable the resource and the widget
     */
    public enable(){
        if(super.enable()){
            this._dragtoboxInstance.enable();
        }
    }

    /**
     * Assign the events to handle for the widget
     * @private
     */
    protected _assignEvents(){
        this._$element.off("."+HzDragtoboxResource.NAMESPACE)
            .one("dragtobox:completed."+HzDragtoboxResource.NAMESPACE,this._onResourceDone.bind(this));
    }

    /**
     * Invoked when the widget it's done. Mark the resource as completed and disable the widget
     * @param e
     * @private
     */
    protected _onResourceDone (e){
        this._dragtoboxInstance.disable();
        this._markAsCompleted();
    }

    /**
     * Destroy the resource
     */
    public destroy(){
        if(this._dragtoboxInstance) {
            this._dragtoboxInstance.destroy();
        }
        super.destroy();
    }
}