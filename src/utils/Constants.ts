// Game constants
export const SIMULATION_TIMESTEP: number = 1000 / 60; // Simulate test at 60 FPS. Means that each update will happen every 1000/60 milliseconds.

// Screen constants

export const DEFAULT_DPI: number = 72; // Default DPI for screens.
export const MM_PER_INCH: number = 25.4;

// Patch constants

export const PATCH_OUTLINE_THICKNESS: number = 1;
export const PATCH_OUTLINE_COLOR: number = 0xFFFFFF;

// Keyboard constants

export const KEY_LEFT: string = "ArrowLeft";
export const KEY_RIGHT: string = "ArrowRight";
export const KEY_BACKSPACE: string = "Backspace";

// Font/text constants

export const PATCH_LABEL_COLOR: number = 0xFFFFFF;
export const TEXT_COLOR: number = 0x262626;

// Button constants

export const BUTTON_DISABLED_COLOR: number = 0xCAC9C9;
export const BUTTON_DISABLED_STROKE_COLOR: number = 0xA8A8A8;

export const SPRITE_BUTTON_DISABLE_TINT_COLOR: number = 0xFFFFFF;
export const SPRITE_BUTTON_CLICKED_TINT: number = 0xBBBBBB;
export const SPRITE_BUTTON_HOVER_COLOR: number = 0xCCCCCC;

export const TEXT_BUTTON_DROP_SHADOW_ANGLE: number = 90; // in degrees
export const TEXT_BUTTON_DROP_SHADOW_DISTANCE: number = 1.5;
export const TEXT_BUTTON_DROP_SHADOW_BLUR: number = 0;
export const TEXT_BUTTON_DROP_SHADOW_COLOR: number = 0x999999;

export const START_BUTTON_COLOR: number = 0x73C61A;
export const START_BUTTON_STROKE_COLOR: number = 0x51A40A;
export const START_BUTTON_HOVER_COLOR: number = 0x9BD855;

export const NEXT_BUTTON_COLOR: number = 0x93CEEF;
export const NEXT_BUTTON_STROKE_COLOR: number = 0x82BDDE;
export const NEXT_BUTTON_HOVER_COLOR: number = 0xBEE2F4;

// Tutorial constants

export const BLUE_TEXT_COLOR: number = 0x93CEEF;
export const GREEN_TEXT_COLOR: number = 0x7AB642;
export const RED_TEXT_COLOR: number = 0xE24040;
export const BACKGROUND_COLOR: number = 0xEAF5FC;
export const MAX_FEEDBACK_TIME: number = 2000; // in milliseconds

// Loading constants

export const LOADING_SPINNER_COLOR: number = 0xF6A117;

// Results bar constants

export const RESULTS_GREEN_COLOR: string = "#72B734";
export const RESULTS_RED_COLOR: string = "#E72F2F";
export const RESULTS_YELLOW_COLOR: string = "#EEE53F";
export const RESULTS_ORANGE_COLOR: string = "#F1983C";

// Filter constants

export const GLOW_FILTER_DISTANCE: number = 12;
export const GLOW_FILTER_MAX_STRENGTH: number = 1.5;
export const GLOW_FILTER_QUALITY: number = 0.5;
export const GLOW_FILTER_ANIMATION_SPEED: number = 0.25;