import data from './projects.json'

export const PROJECT_CATEGORIES = data.categories
export const PROJECTS = data.projects
export const GHL_PLACEHOLDER = data.ghlPlaceholder

export function categoryLabel(id) {
  return PROJECT_CATEGORIES.find((c) => c.id === id)?.label ?? id
}

/** @param {string} categoryId */
export function projectsInCategory(categoryId) {
  return PROJECTS.filter((p) => p.category === categoryId)
}
