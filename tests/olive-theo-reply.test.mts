import assert from 'node:assert/strict';
import test from 'node:test';
import { emptyReply, normalizeReply, validateReply } from '../app/olive-and-theo/utilities/reply.ts';

const attending = { ...emptyReply, name: 'Avery Santos', attendance: 'yes' as const };

test('full name and attendance are required; contact number is optional', () => {
  assert.ok(validateReply(emptyReply));
  assert.ok(validateReply({ ...attending, name: '   ' }));
  assert.ok(validateReply({ ...attending, attendance: '' }));
  assert.equal(validateReply(attending), null);
  assert.equal(validateReply({ ...attending, attendance: 'no' }), null);
});

test('optional contact accepts local and international formats and rejects malformed numbers', () => {
  for (const contact of ['', '  ', '0912 345 6789', '+63 (912) 345-6789']) {
    assert.equal(validateReply({ ...attending, contact }), null);
  }
  for (const contact of ['call me', '123', '+1'.repeat(12), '1234567890123456']) {
    assert.ok(validateReply({ ...attending, contact }));
  }
});

test('normalization trims name and optional contact without changing attendance', () => {
  assert.deepEqual(normalizeReply({ name: ' Avery Santos ', contact: ' +63 912 345 6789 ', attendance: 'no' }), {
    name: 'Avery Santos', contact: '+63 912 345 6789', attendance: 'no',
  });
});
