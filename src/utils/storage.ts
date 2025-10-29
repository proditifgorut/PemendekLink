import { Link, ClickEvent } from '../types/link';

const LINKS_KEY = 'shortener_links';
const CLICKS_KEY = 'shortener_clicks';

export const saveLinks = (links: Link[]): void => {
  localStorage.setItem(LINKS_KEY, JSON.stringify(links));
};

export const getLinks = (): Link[] => {
  const stored = localStorage.getItem(LINKS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveClick = (click: ClickEvent): void => {
  const clicks = getClicks();
  clicks.push(click);
  localStorage.setItem(CLICKS_KEY, JSON.stringify(clicks));
};

export const getClicks = (): ClickEvent[] => {
  const stored = localStorage.getItem(CLICKS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getClicksForLink = (shortCode: string): ClickEvent[] => {
  return getClicks().filter(click => click.shortCode === shortCode);
};
