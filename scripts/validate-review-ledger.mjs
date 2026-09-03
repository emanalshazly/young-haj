import { readFileSync } from 'node:fs';

const ledger = JSON.parse(readFileSync(new URL('../docs/reviews/ledger.json', import.meta.url), 'utf8'));
const allowed = new Set(['pending', 'reviewed']);
const ids = new Set();
const errors = [];

for (const item of ledger.items ?? []) {
  if (!item.id || ids.has(item.id)) errors.push(`invalid or duplicate id: ${item.id ?? '<missing>'}`);
  ids.add(item.id);
  if (!allowed.has(item.status)) errors.push(`${item.id}: invalid status`);
  if (item.status === 'reviewed') {
    for (const field of ['reviewer', 'reviewerRole', 'reviewedAt', 'contentHash', 'scope', 'disposition']) {
      if (!item[field]) errors.push(`${item.id}: reviewed item missing ${field}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const pending = ledger.items.filter((item) => item.status === 'pending').length;
console.log(`PASS: ${ledger.items.length} ledger items are structurally valid.`);
console.log(pending ? `BLOCKED: ${pending} items await human domain review.` : 'PASS: all items have review receipts.');
