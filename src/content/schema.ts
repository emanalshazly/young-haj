import type { JourneyStep } from '../types';

export function validateJourneyContent(content: unknown): string[] {
  if (!Array.isArray(content)) return ['content must be an array'];

  const errors: string[] = [];
  const ids = new Set<string>();

  for (const candidate of content) {
    if (!candidate || typeof candidate !== 'object') {
      errors.push('content item must be an object');
      continue;
    }

    const item = candidate as Partial<JourneyStep>;
    const id = typeof item.id === 'string' && item.id.trim() ? item.id : '<missing-id>';
    if (ids.has(id)) errors.push(`${id}: duplicate id`);
    ids.add(id);

    if (!item.review || !['pending', 'reviewed'].includes(item.review.status)) {
      errors.push(`${id}: missing review status`);
    }
    if (item.review?.status === 'reviewed' && !item.review.receiptId) {
      errors.push(`${id}: reviewed content requires a receipt`);
    }
    if (!item.successMessage?.trim()) errors.push(`${id}: missing success message`);
    if (item.type === 'quiz') {
      const correctAnswers = item.options?.filter((option) => option.isCorrect).length ?? 0;
      if (!item.question?.trim()) errors.push(`${id}: missing quiz question`);
      if (correctAnswers !== 1) errors.push(`${id}: quiz requires exactly one correct option`);
    }
  }

  return errors;
}
