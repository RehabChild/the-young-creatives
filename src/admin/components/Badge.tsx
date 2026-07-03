const styles: Record<string, string> = {
  new: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
  contacted: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300',
  in_progress: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
  closed: 'bg-paper-soft text-text-soft dark:bg-ink-soft',
  unread: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
  read: 'bg-paper-soft text-text-soft dark:bg-ink-soft',
};

export default function Badge({ label }: { label: string }) {
  const cls = styles[label] ?? 'bg-paper-soft text-text-soft dark:bg-ink-soft';
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${cls}`}>
      {label.replace('_', ' ')}
    </span>
  );
}
