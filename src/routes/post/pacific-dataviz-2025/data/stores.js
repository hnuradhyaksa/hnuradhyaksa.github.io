// src/stores.js
import { writable } from 'svelte/store';

export const selectedYear = writable(2100);
export const selectedScenario = writable('Regional Rivalry');
export const selectedConfidence = writable('pessimistic');
export const selectedCountry = writable('Fiji');