import { i as is_function } from '../common/index-bd131d6e.js';
import { c as cubicOut } from '../common/index-78b2aaa2.js';

function flip(node, animation, params) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;
    const scaleX = animation.from.width / node.clientWidth;
    const scaleY = animation.from.height / node.clientHeight;
    const dx = (animation.from.left - animation.to.left) / scaleX;
    const dy = (animation.from.top - animation.to.top) / scaleY;
    const d = Math.sqrt(dx * dx + dy * dy);
    const { delay = 0, duration = (d) => Math.sqrt(d) * 120, easing = cubicOut } = params;
    return {
        delay,
        duration: is_function(duration) ? duration(d) : duration,
        easing,
        css: (_t, u) => `transform: ${transform} translate(${u * dx}px, ${u * dy}px);`
    };
}

export { flip };
