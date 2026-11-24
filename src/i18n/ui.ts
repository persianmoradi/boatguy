export const languages = ['da', 'en'] as const;
export type Lang = (typeof languages)[number];
