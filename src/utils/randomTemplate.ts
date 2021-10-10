import { Templates } from '../constants/playersTemplates';

export const isTemplates = (templates: Templates) =>
  templates && Array.isArray(templates) && templates.length !== 0;
export const randomTemplate = (templates: Templates) => {
  if (!isTemplates(templates)) {
    return null;
  }
  const MIN = 0;
  const MAX = templates.length - 1;
  const rand = MIN - 0.5 + Math.random() * (MAX - MIN + 1);
  return templates[Math.round(rand)];
};
