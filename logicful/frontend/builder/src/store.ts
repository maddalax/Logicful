import { Writable, writable } from 'svelte/store';

export const stores : {selectedField : Writable<string | null> } = {
    selectedField : writable<string | null>(null)
}


