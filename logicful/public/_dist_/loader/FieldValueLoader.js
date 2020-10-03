import{isString as a,isObject as i}from"../guards/Guard.js";import{select as l}from"../util/Selection.js";export class FieldValueLoader{async load(t){return await this.loadValue(t.value??t.defaultValue)}async loadValue(t){if(t==null)return;if(a(t))return t;if(t.type==="remote")return await this.loadRemote(t);if(t.type==="local"){const e=t.value;return i(e)&&e.type==="remote"?await this.loadChildren(e):e}return t}async loadRemote(t){if(a(t))return t;const e=await fetch(t.value),s=await e.json();return t.selector?l(s,t.selector):s}async loadChildren(t){const e=Object.keys(t),s=await e.map(r=>this.loadValue(t[r])),n=await Promise.all(s),o={};for(let r=0;r<e.length;r++)o[e[r]]=n[r];return o}}
