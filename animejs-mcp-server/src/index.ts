import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "animejs-mcp-server",
  version: "1.0.0",
});

const DOCS_SUMMARY = `
# Anime.js v4.5.0 Documentation Summary
Anime.js is a lightweight JavaScript animation library with a simple, yet powerful API.
In version 4, the library has transitioned to a modular, tree-shakeable API.

## Installation
\`\`\`bash
npm install animejs
\`\`\`

## Key Import Syntax
Instead of importing a global \`anime\` object, you import named functions and utilities:
\`\`\`javascript
import { animate, createTimeline, stagger } from 'animejs';
\`\`\`

## Basic Usage
\`\`\`javascript
animate('.box', {
  translateX: 250,
  rotate: '1turn',
  duration: 800,
  ease: 'outQuad'
});
\`\`\`

For detailed information, use the \`get_api_ref\` tool with the topic you want to research.
`;

const TOPIC_DOCS: Record<string, string> = {
  animate: `
# animate(targets, parameters)
The core animation function in Anime.js v4.

## Target Selection
You can target elements via:
- CSS Selectors: \`'.el'\`
- DOM Elements: \`document.querySelector('.el')\`
- Nodelist: \`document.querySelectorAll('.el')\`
- JS Object properties: \`{ myVal: 0 }\`
- Arrays containing any of the above.

## Animatable Properties
- **CSS Properties**: Any CSS property (e.g., \`width: 100\`, \`backgroundColor: '#ff0000'\`).
- **Transforms**: \`translateX\`, \`translateY\`, \`translateZ\`, \`rotate\`, \`rotateX\`, \`rotateY\`, \`rotateZ\`, \`scale\`, \`scaleX\`, \`scaleY\`, \`scaleZ\`, \`skewX\`, \`skewY\`, \`perspective\`. Note: Transform values are rendered in a fixed order (\`perspective\` > \`translate\` > \`rotate\` > \`scale\` > \`skew\`).
- **Object Properties**: Any numeric property in a JS object.
- **DOM Attributes**: HTML attributes (e.g. \`value\` on input, SVG attributes).

## Parameters / Options
- \`duration\`: Milliseconds, function, or spring. (Default: \`1000\`)
- \`delay\`: Milliseconds or function. (Default: \`0\`)
- \`loopDelay\`: Delay in ms before repeating loop.
- \`ease\`: Easing name string or custom function. (Default: \`'outQuad'\`)
- \`loop\`: number of iterations or \`true\` for infinite.
- \`alternate\`: Boolean. Plays animation back and forth.
- \`autoplay\`: Boolean or ScrollObserver. Starts animation automatically.
- \`reversed\`: Starts animation in reverse.
- \`composition\`: \`'none' | 'replace' | 'blend'\`. Resolves overlapping animations.

## Keyframes
Anime.js supports percentage keyframes or duration-based keyframes:
\`\`\`javascript
// Percentage keyframes
animate('.el', {
  keyframes: {
    '0%': { translateX: 0, opacity: 0 },
    '50%': { translateX: 100, opacity: 0.5 },
    '100%': { translateX: 200, opacity: 1 }
  },
  duration: 2000
});

// Duration-based keyframes
animate('.el', {
  translateX: [
    { value: 100, duration: 500 },
    { value: 200, duration: 800 }
  ],
  duration: 1300
});
\`\`\`
`,
  timeline: `
# createTimeline(parameters)
Coordinated sequencing of multiple animations. Timelines are perfect for complex chain animations.

## Creation
\`\`\`javascript
import { createTimeline } from 'animejs';

const tl = createTimeline({
  defaults: {
    duration: 500,
    ease: 'outQuad'
  },
  loop: true
});
\`\`\`

## Adding Animations
Use \`tl.add(parameters, position)\`. The \`position\` parameter dictates *when* the animation starts:
- **No position**: Plays immediately after the previous animation ends.
- **Absolute Milliseconds (\`500\`)**: Plays at exactly 500ms into the timeline.
- **Relative (\`'+=200'\`, \`'-=150'\`)**: Plays relative to the end of the previous animation.
- **Start relative (\`'<<'\`)**: Plays at the exact start of the previous animation.
- **Combined start relative (\`'<<+=100'\`)**: Plays 100ms after the start of the previous animation.
- **Label (\`'myLabel'\`)**: Places or matches a label position.

## Example
\`\`\`javascript
tl.add({
  targets: '.header',
  translateY: [-50, 0],
  opacity: [0, 1]
})
.add({
  targets: '.content',
  translateY: [30, 0],
  opacity: [0, 1]
}, '-=200') // Starts 200ms before header finishes
.add({
  targets: '.footer',
  scale: [0.8, 1],
  opacity: [0, 1]
}, '+=100'); // Starts 100ms after content finishes
\`\`\`
`,
  stagger: `
# stagger(value, parameters)
Utility for distributing delay, duration, or property values progressively across multiple targets.

## Usage
\`\`\`javascript
import { stagger, animate } from 'animejs';

animate('.item', {
  translateX: 250,
  delay: stagger(100) // 0ms, 100ms, 200ms, 300ms...
});
\`\`\`

## Parameters
- **\`value\`**: Number (stagger step size) or Tuple \`[start, end]\` to distribute values between two numbers.
- **\`from\`**: E.g. \`'first'\`, \`'center'\`, \`'last'\`, \`'random'\`, or an index number.
- **\`grid\`**: Array \`[columns, rows]\`. Enables 2D grid calculations (stagger from a center cell).
- **\`axis\`**: \`'x'\` or \`'y'\` when using grid.
- **\`ease\`**: Distributes value spacing using an easing function curve.
- **\`reversed\`**: Reverses stagger order.
- **\`jitter\`**: Number or tuple \`[start, end]\` for randomized timing offsets.

## Examples
\`\`\`javascript
// Distribute duration from 500ms to 1500ms
stagger([500, 1500])

// Stagger from the center of a grid
stagger(150, { grid: [10, 5], from: 'center' })

// Stagger delay using exponential curve
stagger(100, { ease: 'inQuad' })
\`\`\`
`,
  svg: `
# SVG Animations in Anime.js v4
Anime.js provides helper functions to animate SVGs: path following, morphing, and line drawing.

## 1. Path Following (createMotionPath)
Targets can follow any SVG path:
\`\`\`javascript
import { createMotionPath, animate } from 'animejs';

const path = createMotionPath('.svg-route');

animate('.runner', {
  translateX: path('x'),
  translateY: path('y'),
  rotate: path('angle'),
  duration: 3000,
  ease: 'linear',
  loop: true
});
\`\`\`

## 2. Morphing (morphTo)
Morph SVG path shapes (must have the same number of points for smooth morphing):
\`\`\`javascript
import { morphTo, animate } from 'animejs';

animate('.polygon-shape', {
  d: morphTo('.target-polygon-shape'),
  duration: 1000,
  ease: 'inOutQuad'
});
\`\`\`

## 3. Line Drawing (createDrawable)
Creates drawing stroke effects on SVG elements (e.g. paths, circles, rectangles):
\`\`\`javascript
import { createDrawable, animate } from 'animejs';

// Initializes path lengths automatically
const drawable = createDrawable('.my-path');

animate('.my-path', {
  draw: '0 1', // Animates draw from '0 0' to '0 1' (fully drawn)
  duration: 2000,
  ease: 'easeInOutSine'
});
\`\`\`
`,
  easings: `
# Easings in Anime.js v4
Anime.js includes pre-defined easings, spring physics, step counts, and support for custom bezier curves.

## Preset Easings
- \`'linear'\`
- \`'inQuad'\`, \`'outQuad'\`, \`'inOutQuad'\`
- \`'inCubic'\`, \`'outCubic'\`, \`'inOutCubic'\`
- \`'inQuart'\`, \`'outQuart'\`, \`'inOutQuart'\`
- \`'inQuint'\`, \`'outQuint'\`, \`'inOutQuint'\`
- \`'inSine'\`, \`'outSine'\`, \`'inOutSine'\`
- \`'inCirc'\`, \`'outCirc'\`, \`'inOutCirc'\`
- \`'inExpo'\`, \`'outExpo'\`, \`'inOutExpo'\`
- \`'inBounce'\`, \`'outBounce'\`, \`'inOutBounce'\`
- \`'inBack'\`, \`'outBack'\`, \`'inOutBack'\`
- \`'inElastic'\`, \`'outElastic'\`, \`'inOutElastic'\`

## Parameters for Presets (e.g. Elastic/Back)
- \`'inBack(overshoot)'\`: Default overshoot is 1.7 (e.g. \`'inBack(2.5)'\`)
- \`'outElastic(amplitude, period)'\`: Defaults are \`1\` and \`.3\` (e.g. \`'outElastic(1.2, 0.4)'\`)

## Spring Physics (Physically-based Easing)
Springs provide highly realistic movement. Defined as a string or configuration object:
\`\`\`javascript
import { spring } from 'animejs/easings'; // or 'animejs'

// Via string parameter
animate('.ball', {
  translateY: 200,
  ease: 'spring(mass, stiffness, damping, velocity)' // e.g. 'spring(1, 100, 10, 0)'
});

// Via spring utility
animate('.ball', {
  translateY: 200,
  ease: spring({
    mass: 1.2,
    stiffness: 80,
    damping: 12,
    velocity: 0
  })
});
\`\`\`

## Steps
Divides animation into discrete jumps:
- \`'steps(numberOfSteps)'\` (e.g., \`'steps(5)'\`)

## Custom Cubic Bezier
- \`'cubic-bezier(x1, y1, x2, y2)'\` (e.g., \`'cubic-bezier(0.42, 0, 1.0, 1.0)'\`)
`,
  scroll: `
# Scroll-Linked Animations (ScrollObserver)
Anime.js v4 supports scroll-driven animations natively using ` + "`ScrollObserver`" + `.

## Using Scroll Sync with Autoplay
You can pass the scroll config to autoplay:
\`\`\`javascript
import { animate, scroll } from 'animejs';

animate('.box', {
  scale: [0.5, 2],
  opacity: [0.1, 1],
  autoplay: scroll({
    target: '.box', // Element tracking scroll position
    container: window, // Scroll container (default: window)
    axis: 'y', // Scroll axis ('x' or 'y')
    enter: 'top bottom', // Start: when top of target hits bottom of container
    leave: 'bottom top' // End: when bottom of target hits top of container
  })
});
\`\`\`

## ScrollObserver Class
For detailed callbacks:
\`\`\`javascript
import { ScrollObserver } from 'animejs';

const observer = new ScrollObserver({
  target: '.section',
  onEnter: () => console.log('Entered section!'),
  onLeave: () => console.log('Left section!'),
  onUpdate: (self) => {
    // self.progress (0 to 1 value of scroll completion)
    console.log('Scroll progress:', self.progress);
  }
});
\`\`\`
`,
  draggable: `
# Draggable in Anime.js v4
Enables interactive physics-based dragging of elements.

## Basic Usage
\`\`\`javascript
import { Draggable } from 'animejs';

const drag = new Draggable('.handle', {
  container: '.drag-boundary', // Bound drag to selector or coordinates
  x: true, // Enable dragging on X axis
  y: true, // Enable dragging on Y axis
  snap: 50, // Snap to grid size (50px)
  cursor: {
    onHover: 'grab',
    onGrab: 'grabbing'
  },
  onDrag: (self) => {
    console.log('Dragging x:', self.x, 'y:', self.y);
  },
  onRelease: (self) => {
    console.log('Released with velocity:', self.velocity);
  }
});
\`\`\`
`,
  controls: `
# Animation & Timeline Controls
Anime.js v4 provides methods on returned animation instances to control playback.

## Example Controls
\`\`\`javascript
const anim = animate('.box', {
  translateX: 250,
  autoplay: false // starts paused
});

// Control Methods
anim.play();      // Play from current progress
anim.pause();     // Pause
anim.restart();   // Restart from beginning
anim.reverse();   // Reverse direction
anim.seek(1500);  // Jump to 1500ms
anim.cancel();    // Resets to initial values, stops animation
anim.revert();    // Cancels and undoes inline styles
anim.complete();  // Immediately jumps to final frame and finishes
\`\`\`

## Promises (Async/Await)
Every animation/timeline instance exposes a \`then()\` method (resolves when complete):
\`\`\`javascript
await animate('.box', { translateX: 200 }).then();
console.log('Box animation completed!');
\`\`\`
`,
  callbacks: `
# Callbacks in Anime.js v4
Trigger code at specific animation milestones.

## Callbacks Options
- \`onBegin\`: Fired once, when the animation begins.
- \`onBeforeUpdate\`: Fired before every frame update.
- \`onUpdate\`: Fired on every frame update (after transforms/styles are set).
- \`onLoop\`: Fired every time a loop completes.
- \`onPause\`: Fired when paused.
- \`onComplete\`: Fired when animation finishes all iterations.
- \`onRender\`: Fired when properties are drawn.

## Callback Signature
All callbacks receive the animation instance as the first parameter:
\`\`\`javascript
animate('.box', {
  translateX: 250,
  onUpdate: (self) => {
    // self.progress is a value between 0 and 1
    console.log('Progress:', (self.progress * 100).toFixed(1) + '%');
  },
  onComplete: (self) => {
    console.log('Finished animation ID:', self.id);
  }
});
\`\`\`

## Callback Values (Function-based Parameters)
You can calculate values dynamically per-element. Note the v4 callback signature:
\`\`\`javascript
animate('.box', {
  translateX: (target, index, targets) => {
    // target: current DOM element
    // index: element index
    // targets: array of all targets
    return (index + 1) * 100;
  }
});
\`\`\`
`,
  layout: `
# Layout Animations (AutoLayout)
Layout transitions in Anime.js allow animating elements whose positions/sizes change due to DOM reflows (e.g. flexbox wraps, grid shifts, elements appended or removed).

## Usage
\`\`\`javascript
import { AutoLayout } from 'animejs';

const layout = new AutoLayout('.grid-container', {
  duration: 600,
  ease: 'outQuint'
});

// Perform layout modifications
document.querySelector('.card').remove();

// AutoLayout will capture the reflow and animate children smoothly
layout.update();
\`\`\`
`
};

// Register Documentation Tools
server.tool(
  "get_docs_summary",
  {},
  async () => ({
    content: [{ type: "text", text: DOCS_SUMMARY }]
  })
);

server.tool(
  "get_api_ref",
  {
    topic: z.enum([
      "animate",
      "timeline",
      "stagger",
      "svg",
      "easings",
      "scroll",
      "draggable",
      "controls",
      "callbacks",
      "layout"
    ]).describe("The topic/API area of Anime.js you want to look up.")
  },
  async ({ topic }) => {
    const docs = TOPIC_DOCS[topic];
    if (!docs) {
      return {
        content: [{ type: "text", text: `Topic "${topic}" not found.` }],
        isError: true
      };
    }
    return {
      content: [{ type: "text", text: docs }]
    };
  }
);

// Animation Snippet Generator
server.tool(
  "generate_animation",
  {
    type: z.enum([
      "grid-stagger",
      "svg-path-follow",
      "svg-morph",
      "svg-line-drawing",
      "scroll-linked",
      "spring",
      "timeline-sequence",
      "text-split"
    ]).describe("The category of animation code to generate."),
    targets: z.string().default(".el").describe("The CSS selector targeting the animation elements."),
    options: z.record(z.any()).optional().describe("Optional configurations: e.g. { duration: 1000, colors: ['#ff0055', '#00ffcc'] }")
  },
  async ({ type, targets, options = {} }) => {
    let snippet = "";
    const duration = options.duration || 1200;
    const ease = options.ease || "outCubic";

    switch (type) {
      case "grid-stagger": {
        const columns = options.columns || 10;
        const rows = options.rows || 5;
        snippet = `
// 2D Grid Staggering
import { animate, stagger } from 'animejs';

animate('${targets}', {
  scale: [0.1, 1],
  opacity: [0, 1],
  delay: stagger(120, {
    grid: [${columns}, ${rows}],
    from: 'center'
  }),
  duration: ${duration},
  ease: '${ease}'
});
`;
        break;
      }
      case "svg-path-follow": {
        const pathSelector = options.pathSelector || ".motion-path";
        snippet = `
// SVG Path Following
import { animate, createMotionPath } from 'animejs';

const path = createMotionPath('${pathSelector}');

animate('${targets}', {
  translateX: path('x'),
  translateY: path('y'),
  rotate: path('angle'),
  duration: ${duration},
  ease: 'linear',
  loop: true
});
`;
        break;
      }
      case "svg-morph": {
        const pathTarget = options.pathTarget || ".shape-b";
        snippet = `
// SVG Shape Morphing
import { animate, morphTo } from 'animejs';

animate('${targets}', {
  d: morphTo('${pathTarget}'),
  duration: ${duration},
  ease: '${ease}'
});
`;
        break;
      }
      case "svg-line-drawing": {
        snippet = `
// SVG Line Drawing Effect
import { animate, createDrawable } from 'animejs';

// Setup paths to be drawable
createDrawable('${targets}');

animate('${targets}', {
  draw: '0 1', // Draws outline from start (0) to finish (1)
  duration: ${duration},
  ease: '${ease}'
});
`;
        break;
      }
      case "scroll-linked": {
        snippet = `
// Scroll-linked Animation
import { animate, scroll } from 'animejs';

animate('${targets}', {
  translateY: [-100, 0],
  opacity: [0, 1],
  autoplay: scroll({
    target: '${targets}',
    enter: 'top bottom', // starts when element top enters viewport bottom
    leave: 'bottom top', // finishes when element bottom exits viewport top
    axis: 'y'
  })
});
`;
        break;
      }
      case "spring": {
        const mass = options.mass || 1;
        const stiffness = options.stiffness || 100;
        const damping = options.damping || 10;
        snippet = `
// Physics-Based Spring Animation
import { animate } from 'animejs';
import { spring } from 'animejs/easings';

animate('${targets}', {
  scale: [0.5, 1.2, 1],
  ease: spring({
    mass: ${mass},
    stiffness: ${stiffness},
    damping: ${damping}
  })
});
`;
        break;
      }
      case "timeline-sequence": {
        snippet = `
// Modular Sequencing Timeline
import { createTimeline } from 'animejs';

const tl = createTimeline({
  defaults: {
    duration: 800,
    ease: 'outQuint'
  }
});

tl.add({
  targets: '.title',
  y: [-40, 0],
  opacity: [0, 1]
})
.add({
  targets: '.description',
  y: [20, 0],
  opacity: [0, 1]
}, '-=600') // Staggers title exit/description entry
.add({
  targets: '.btn-action',
  scale: [0.8, 1],
  opacity: [0, 1]
}, '<<+=300'); // Starts 300ms after description starts animating
`;
        break;
      }
      case "text-split": {
        snippet = `
// Text Splitter Effect
import { animate, TextSplitter, stagger } from 'animejs';

// Setup text splitter on your target element
const splitter = new TextSplitter('${targets}', {
  chars: true,
  words: true
});

animate(splitter.chars, {
  translateY: [20, 0],
  opacity: [0, 1],
  delay: stagger(40),
  duration: 600,
  ease: 'outQuad'
});
`;
        break;
      }
    }

    return {
      content: [{ type: "text", text: snippet.trim() }]
    };
  }
);

// Configuration parameters validation
server.tool(
  "validate_parameters",
  {
    config: z.string().describe("A JSON string representing the Anime.js parameters object to validate.")
  },
  async ({ config }) => {
    let parsed: any;
    try {
      parsed = JSON.parse(config);
    } catch (err: any) {
      return {
        content: [{ type: "text", text: `Invalid JSON format: ${err.message}` }],
        isError: true
      };
    }

    const errors: string[] = [];
    const warnings: string[] = [];

    // Check v3 leftovers
    if (parsed.targets && typeof parsed.targets === "object" && !Array.isArray(parsed.targets)) {
      // It might be a valid object target, but worth calling out since v4 animate takes targets as the first argument
      warnings.push("Notice: In Anime.js v4, the animate() signature is animate(targets, parameters). Defining 'targets' inside the parameters object is deprecated and might not work as expected.");
    }

    // Check easing
    if (parsed.ease) {
      const validPresetEases = [
        "linear", "none", "in", "out", "inOut",
        "inQuad", "outQuad", "inOutQuad",
        "inCubic", "outCubic", "inOutCubic",
        "inQuart", "outQuart", "inOutQuart",
        "inQuint", "outQuint", "inOutQuint",
        "inSine", "outSine", "inOutSine",
        "inCirc", "outCirc", "inOutCirc",
        "inExpo", "outExpo", "inOutExpo",
        "inBounce", "outBounce", "inOutBounce",
        "inBack", "outBack", "inOutBack",
        "inElastic", "outElastic", "inOutElastic"
      ];

      const easeString = String(parsed.ease);
      const isPreset = validPresetEases.includes(easeString);
      const isSpring = easeString.startsWith("spring(") || easeString.includes("spring");
      const isBezier = easeString.startsWith("cubic-bezier(") || easeString.startsWith("cubicBezier");
      const isSteps = easeString.startsWith("steps(");

      if (!isPreset && !isSpring && !isBezier && !isSteps) {
        errors.push(`Invalid easing: "${easeString}". Easing should be a preset (e.g. 'outQuad'), spring (e.g. 'spring(1, 100, 10, 0)'), steps, cubic-bezier, or custom function.`);
      }
    }

    // Check composition
    if (parsed.composition && !["none", "replace", "blend"].includes(parsed.composition)) {
      errors.push(`Invalid composition: "${parsed.composition}". Allowed values are 'none', 'replace', or 'blend'.`);
    }

    // Check duration and delay types
    if (parsed.duration !== undefined && typeof parsed.duration !== "number" && typeof parsed.duration !== "string" && typeof parsed.duration !== "function") {
      errors.push("Duration must be a number (ms), a string (e.g. spring), or a callback function.");
    }
    if (parsed.delay !== undefined && typeof parsed.delay !== "number" && typeof parsed.delay !== "function") {
      errors.push("Delay must be a number (ms) or a callback function.");
    }

    // Return report
    let report = "### Anime.js Parameter Validation Report\n";
    if (errors.length === 0 && warnings.length === 0) {
      report += "✅ Parameter configuration is valid and follows Anime.js v4 syntax!";
    } else {
      if (errors.length > 0) {
        report += "\n❌ **Errors found:**\n" + errors.map(e => `- ${e}`).join("\n") + "\n";
      }
      if (warnings.length > 0) {
        report += "\n⚠️ **Warnings / Suggestions:**\n" + warnings.map(w => `- ${w}`).join("\n") + "\n";
      }
    }

    return {
      content: [{ type: "text", text: report }]
    };
  }
);

// Connect standard I/O transport
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("AnimeJS MCP Server running on stdio transport");
