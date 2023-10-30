import { mergeArrays} from '../utils/arrays.js'
/**
 * @typedef { 'xs' | 's' | 'm' | 'l' | 'xl' } Measurement
 * @typedef { 'left' | 'right' | 'top' | 'bottom'} Direction
 *
 */

/**
 * @type {Array<Measurement>}
 */
const MEASUREMENTS = ["xs", "s", "m", "l", "xl"];

/**
 * @type {Array<Direction>}
 */
const DIRECTIONS = ["left", "right", "top", "bottom"];
/**
 * @type {Record<Measurement, string>}
 */
const MEASUREMENT_MAP = {
xs: '--sl-spacing-2x-small',
s: '--sl-spacing-x-small',
m: '--sl-spacing-medium',
l: '--sl-spacing-x-large',
xl: '--sl-spacing-3x-large',
}

const handleJoin = (direction, measurement) => /* css */`
:host([${direction}="${measurement}"]) div {
    padding-${direction}: var(${MEASUREMENT_MAP[measurement]})
}

`

const css = mergeArrays({
    arrays: [DIRECTIONS, MEASUREMENTS],
    join: handleJoin,
}).join("")

export const templateString = /* html */ `
<style>${css}</style>
<div><slot></slot></div>
`


const template = document.createElement("template")

template.innerHTML = templateString

/**
 * @element td-spacing
 * 
 * A Utility component that is used to add spacing around other components
 * 
 * @attr { 'xs' | 's' | 'm' | 'l' | 'xl' } left
 * @attr { 'xs' | 's' | 'm' | 'l' | 'xl' } right
 * @attr { 'xs' | 's' | 'm' | 'l' | 'xl' } top
 * @attr { 'xs' | 's' | 'm' | 'l' | 'xl' } bottom
 * 
 */

export class Spacing extends HTMLElement {
    #inner = this.attachShadow({ mode: "closed" })

    constructor() {
        super()
        const node = template.content.cloneNode(true)
        this.#inner.appendChild(node)
    }
}

customElements.define('td-spacing', Spacing)

export default Spacing

