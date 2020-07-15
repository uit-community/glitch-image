import { Component, h, State, Prop } from "@stencil/core";
import classnames from "classnames";

const INITIAL_WAIT_TIME = 1000;
const CLEAR_TIME = 100;
const MAX_GLITCH_COUNT = 4;
const MAX_GLITCH_SEQUENCE_COUNT = 3;
const MAX_GLITCH_FREQUENCY_MS = 2000;
const MAX_GLITCH_WIDTH = 5;
const OFFSET_GLITCH_WIDTH = 5;
const MAX_GLITCH_LEFT = 20;

@Component({
  tag: "glitch-image",
  styleUrl: "glitch-image.css",
  shadow: true,
})
export class GlitchImage {
  @Prop() src: string = "";

  @State() isEnable: boolean = false;
  @State() glitchCount: number = 1;
  @State() glitchSequenceCount: number = 1;
  @State() glitchWidth: number[] = [];
  @State() glitchTop: number[] = [];
  @State() glitchLeft: number[] = [];

  componentWillLoad() {
    this.clearGlitch();
    this.isEnable = true;

    setTimeout(() => {
      this.startGlitch();
    }, INITIAL_WAIT_TIME);
  }

  disconnectedCallback() {
    this.isEnable = false;
  }

  startGlitch() {
    if (!this.isEnable) {
      return;
    }
    const glitchWaitTime: number[] = [];
    this.glitchCount = Math.floor(Math.random() * MAX_GLITCH_COUNT) + 1;
    this.glitchSequenceCount =
      Math.floor(Math.random() * MAX_GLITCH_SEQUENCE_COUNT) + 1;

    for (let i = 0; i < this.glitchSequenceCount; i++) {
      const delaySeed = i + 1;
      glitchWaitTime[i] = Math.random() * (100 * delaySeed) + 100;

      setTimeout(() => {
        const { glitchWidth, glitchTop, glitchLeft } = this.makeGlitch();
        this.setGlitch({
          glitchWidth,
          glitchTop: glitchTop.sort(),
          glitchLeft,
        });
      }, glitchWaitTime[i]);
    }

    const maxWaitTime = Math.max.apply(null, glitchWaitTime);
    const clearTime = maxWaitTime + CLEAR_TIME;

    setTimeout(() => {
      this.clearGlitch();
    }, clearTime);

    setTimeout(() => {
      this.startGlitch();
    }, Math.random() * MAX_GLITCH_FREQUENCY_MS + clearTime);
  }

  makeGlitch() {
    const glitchWidth: number[] = [];
    const glitchTop: number[] = [];
    const glitchLeft: number[] = [];

    for (let i = 0; i < this.glitchCount; i++) {
      glitchWidth[i] = Math.random() * MAX_GLITCH_WIDTH + OFFSET_GLITCH_WIDTH;
      glitchTop[i] =
        Math.random() * (100 - MAX_GLITCH_WIDTH + OFFSET_GLITCH_WIDTH);
      glitchLeft[i] = Math.random() * (2 * MAX_GLITCH_LEFT) - MAX_GLITCH_LEFT;
    }

    return { glitchWidth, glitchTop, glitchLeft };
  }

  setGlitch({
    glitchWidth,
    glitchTop,
    glitchLeft,
  }: {
    glitchWidth: number[];
    glitchTop: number[];
    glitchLeft: number[];
  }) {
    this.glitchWidth = glitchWidth;
    this.glitchTop = glitchTop;
    this.glitchLeft = glitchLeft;
  }

  clearGlitch() {
    const glitchWidth = [];
    const glitchTop = [];
    const glitchLeft = [];

    for (let i = 0; i < this.glitchCount; i++) {
      glitchWidth[i] = 0;
      glitchTop[i] = 0;
      glitchLeft[i] = 0;
    }

    this.glitchWidth = glitchWidth;
    this.glitchTop = glitchTop;
    this.glitchLeft = glitchLeft;
  }

  render() {
    if (this.glitchWidth) {
      const baseStyle = [...Array(this.glitchCount + 1)].map((_, i) => {
        const clip12 =
          i > 0 ? this.glitchTop[i - 1] + this.glitchWidth[i - 1] : 0;
        const clip34 = i < this.glitchCount ? this.glitchTop[i] : 100;

        return {
          "--gi-clip-1": `${clip12}%`,
          "--gi-clip-2": `${clip12}%`,
          "--gi-clip-3": `${clip34}%`,
          "--gi-clip-4": `${clip34}%`,
        };
      });

      const glitchStyle = [...Array(this.glitchCount)].map((_, i) => {
        const clip12 = this.glitchTop[i];
        const clip34 = this.glitchTop[i - 1] + this.glitchWidth[i - 1];

        return {
          "--gi-clip-1": `${clip12}%`,
          "--gi-clip-2": `${clip12}%`,
          "--gi-clip-3": `${clip34}%`,
          "--gi-clip-4": `${clip34}%`,
          left: `${this.glitchLeft[i]}px`,
        };
      });

      return (
        <div class="container">
          {baseStyle.map((style, i) => (
            <img
              src={this.src}
              class={classnames("base-image", { absolute: i !== 0 })}
              style={style}
            />
          ))}
          {glitchStyle.map((style) => {
            const hueSeed = Math.random();
            return (
              <img
                src={this.src}
                class={classnames("base-image absolute glitch", {
                  red: hueSeed < 0.2,
                  blue: 0.8 < hueSeed,
                })}
                style={style}
              />
            );
          })}
        </div>
      );
    }
  }
}
