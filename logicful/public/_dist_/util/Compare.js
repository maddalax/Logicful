import{isObject as u,isString as n}from"../guards/Guard.js";export function stringEquals(r,t){return r==null&&t==null?!0:n(r)&&n(t)?r.toLowerCase().trim()===t.toLowerCase().trim():r===t}export function toNumberOrDefault(r){const t=parseFloat(r);return isNaN(t)?0:t}export function isEmptyOrNull(r){return r==null?!0:Array.isArray(r)?r.length===0:!0}export function isNullString(r){return r==null||r=="null"||r=="undefined"||r==null}export function nullOrEmpty(r){return r==null||r===""}export function fastEquals(r,t){return JSON.stringify(r)===JSON.stringify(t)}export function fastClone(r){return r==null||!u(r)?r:JSON.parse(JSON.stringify(r))}
