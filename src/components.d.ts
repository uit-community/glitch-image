/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface GlitchImage {
        "src": string;
    }
}
declare global {
    interface HTMLGlitchImageElement extends Components.GlitchImage, HTMLStencilElement {
    }
    var HTMLGlitchImageElement: {
        prototype: HTMLGlitchImageElement;
        new (): HTMLGlitchImageElement;
    };
    interface HTMLElementTagNameMap {
        "glitch-image": HTMLGlitchImageElement;
    }
}
declare namespace LocalJSX {
    interface GlitchImage {
        "src"?: string;
    }
    interface IntrinsicElements {
        "glitch-image": GlitchImage;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "glitch-image": LocalJSX.GlitchImage & JSXBase.HTMLAttributes<HTMLGlitchImageElement>;
        }
    }
}
