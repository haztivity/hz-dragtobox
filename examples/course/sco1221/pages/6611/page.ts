/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import * as Prism "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-pug";
import {PageFactory, PageRegister, PageController} from "@haztivity/core";
import template from "./page.pug";
import {HzDragtoboxResource} from "../../../resources/HzDragtobox";

export let page: PageRegister = PageFactory.createPage(
    {
        name: "6611",
        resources: [
            HzDragtoboxResource
        ],
        template: template
    }
);
page.on(
    PageController.ON_SHOW, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
        Prism.highlightAll(false);
    }
);
page.on(
    PageController.ON_COMPLETE_CHANGE, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
        console.log("Completed change");
    }
);