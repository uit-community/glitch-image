import { Component, h, State, Prop } from "@stencil/core";
import classnames from "classnames";
import { pickRandomFromRange } from "../../utils/utils";

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

  @State() isEnabled: boolean = false;
  @State() glitchCount: number = 1;
  @State() glitchSequenceCount: number = 1;
  @State() glitchWidth: number[] = [];
  @State() glitchTop: number[] = [];
  @State() glitchLeft: number[] = [];

  componentWillLoad() {
    this.clearGlitch();
    this.isEnabled = true;

    setTimeout(() => {
      this.startGlitch();
    }, INITIAL_WAIT_TIME);
  }

  disconnectedCallback() {
    this.isEnabled = false;
  }

  startGlitch() {
    if (!this.isEnabled) {
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
        this.setGlitch(this.makeGlitch());
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
      glitchTop[i] = pickRandomFromRange(
        i === 0 ? 0 : glitchTop[i - 1] + glitchWidth[i - 1],
        100 - (MAX_GLITCH_WIDTH + OFFSET_GLITCH_WIDTH)
      );
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
        const clipTop =
          0 < i && i <= this.glitchTop.length
            ? this.glitchTop[i - 1] + this.glitchWidth[i - 1]
            : 0;
        const clipBottom = i < this.glitchTop.length ? this.glitchTop[i] : 100;

        return {
          "--gi-clip-top": `${clipTop}%`,
          "--gi-clip-bottom": `${clipBottom}%`,
        };
      });

      const glitchStyle = [...Array(this.glitchCount)].map((_, i) => {
        const clipTop = this.glitchTop[i];
        const clipBottom = this.glitchTop[i] + this.glitchWidth[i];

        return {
          "--gi-clip-top": `${clipTop}%`,
          "--gi-clip-bottom": `${clipBottom}%`,
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
