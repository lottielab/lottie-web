import lottie from './main';

// SVG Renderer
import SVGRenderer from '../renderers/SVGRenderer';
import { registerRenderer } from '../renderers/renderersManager';

// Modifiers
import { ShapeModifiers } from '../utils/shapes/ShapeModifiers';
import TrimModifier from '../utils/shapes/TrimModifier';
// import PuckerAndBloatModifier from '../utils/shapes/PuckerAndBloatModifier';
// import RepeaterModifier from '../utils/shapes/RepeaterModifier';
// import RoundCornersModifier from '../utils/shapes/RoundCornersModifier';
// import ZigZagModifier from '../utils/shapes/ZigZagModifier';
// import OffsetPathModifier from '../utils/shapes/OffsetPathModifier';

// SVG effects
import { registerEffect } from '../elements/svgElements/SVGEffects';
// import SVGTintFilter from '../elements/svgElements/effects/SVGTintEffect';
// import SVGFillFilter from '../elements/svgElements/effects/SVGFillFilter';
// import SVGStrokeEffect from '../elements/svgElements/effects/SVGStrokeEffect';
// import SVGTritoneFilter from '../elements/svgElements/effects/SVGTritoneFilter';
// import SVGProLevelsFilter from '../elements/svgElements/effects/SVGProLevelsFilter';
import SVGDropShadowEffect from '../elements/svgElements/effects/SVGDropShadowEffect';
// import SVGMatte3Effect from '../elements/svgElements/effects/SVGMatte3Effect';
import SVGGaussianBlurEffect from '../elements/svgElements/effects/SVGGaussianBlurEffect';
// import SVGTransformEffect from '../elements/svgElements/effects/SVGTransformEffect';

// Registering renderers
registerRenderer('svg', SVGRenderer);

// Registering shape modifiers
ShapeModifiers.registerModifier('tm', TrimModifier);
// ShapeModifiers.registerModifier('pb', PuckerAndBloatModifier);
// ShapeModifiers.registerModifier('rp', RepeaterModifier);
// ShapeModifiers.registerModifier('rd', RoundCornersModifier);
// ShapeModifiers.registerModifier('zz', ZigZagModifier);
// ShapeModifiers.registerModifier('op', OffsetPathModifier);

// Registering effects
// registerEffect(20, SVGTintFilter, true);
// registerEffect(21, SVGFillFilter, true);
// registerEffect(22, SVGStrokeEffect, false);
// registerEffect(23, SVGTritoneFilter, true);
// registerEffect(24, SVGProLevelsFilter, true);
registerEffect(25, SVGDropShadowEffect, true);
// registerEffect(28, SVGMatte3Effect, false);
registerEffect(29, SVGGaussianBlurEffect, true);
// registerEffect(35, SVGTransformEffect, false);

export default lottie;
