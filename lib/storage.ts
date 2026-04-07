import { type EditableEntry } from "@/lib/types";
import { generateSlug } from "@/lib/changelog";

const LOCAL_ENTRY_KEY = "shiplog-local-entries";

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadLocalEntries() {
  if (!isBrowser()) {
    return [] as EditableEntry[];
  }

  const raw = window.localStorage.getItem(LOCAL_ENTRY_KEY);

  if (!raw) {
    return [] as EditableEntry[];
  }

  try {
    return JSON.parse(raw) as EditableEntry[];
  } catch {
    return [] as EditableEntry[];
  }
}

export function saveLocalEntry(entry: EditableEntry) {
  if (!isBrowser()) {
    return null;
  }

  const entries = loadLocalEntries();
  const normalized: EditableEntry = {
    ...entry,
    slug: entry.slug || generateSlug(entry.title) || "untitled-release"
  };
  const nextEntries = [
    normalized,
    ...entries.filter((item) => item.slug !== normalized.slug)
  ];

  window.localStorage.setItem(LOCAL_ENTRY_KEY, JSON.stringify(nextEntries));

  return normalized;
}

export function removeLocalEntry(slug: string) {
  if (!isBrowser()) {
    return;
  }

  const entries = loadLocalEntries().filter((entry) => entry.slug !== slug);
  window.localStorage.setItem(LOCAL_ENTRY_KEY, JSON.stringify(entries));
}
