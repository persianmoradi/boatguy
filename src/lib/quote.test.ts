// Run with: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateQuote, staffEmail, customerEmail, FILE_LIMITS } from './quote.ts';

const good = { name: 'Ole', email: 'ole@example.com', location: 'Skovshoved Havn', length: '9,5', services: ['exterior', 'teak'], condition: 'average', lang: 'da' };
const jpg = (size = 1000) => ({ name: 'a.jpg', type: 'image/jpeg', size });

test('a complete request passes', () => {
  const r = validateQuote(good, [jpg()]);
  assert.equal(r.ok, true);
  assert.equal(r.data.length, 9.5);
});

test('missing and malformed fields are reported per field', () => {
  const r = validateQuote({ ...good, name: ' ', email: 'nope', location: '', length: '200', services: [] }, []);
  assert.equal(r.ok, false);
  assert.deepEqual(r.errors, { name: 'required', email: 'email', location: 'required', length: 'length', services: 'services' });
});

test('unknown services and enum values are dropped, not trusted', () => {
  const r = validateQuote({ ...good, services: ['exterior', '<script>'], condition: 'terrible' }, []);
  assert.deepEqual(r.data.services, ['exterior']);
  assert.equal(r.data.condition, 'average');
});

test('photo limits: count, type and size', () => {
  assert.equal(validateQuote(good, Array(FILE_LIMITS.count + 1).fill(jpg())).errors.photos, 'files');
  assert.equal(validateQuote(good, [{ name: 'x.exe', type: 'application/x-msdownload', size: 10 }]).errors.photos, 'fileType');
  assert.equal(validateQuote(good, [jpg(FILE_LIMITS.eachBytes + 1)]).errors.photos, 'fileSize');
  // HEIC with an empty type is accepted by extension; an untyped non-image is not
  assert.equal(validateQuote(good, [{ name: 'IMG_1.HEIC', type: '', size: 10 }]).ok, true);
  assert.equal(validateQuote(good, [{ name: 'notes.txt', type: '', size: 10 }]).errors.photos, 'fileType');
});

test('the staff email escapes what the customer typed', () => {
  const r = validateQuote({ ...good, message: '<img src=x onerror=alert(1)>' }, []);
  assert.ok(!staffEmail(r.data, 0).html.includes('<img'));
});

test('no estimate or price appears in the emails', () => {
  const d = validateQuote(good, []).data;
  for (const lang of ['da', 'en'] as const) {
    const mails = [staffEmail(d, 0).text, customerEmail({ ...d, lang }).text].join('\n');
    assert.ok(!/overslag|estimate|kr\./i.test(mails));
  }
});
