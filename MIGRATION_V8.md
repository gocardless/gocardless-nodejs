# Migration Guide: v8.0.0

## Breaking Changes

### Metadata values must be strings

**Why**: The GoCardless API only accepts string values for metadata, but the TypeScript types previously allowed any JSON value. This caused confusing runtime errors. v8.0.0 fixes the types to match the API requirements.

**Impact**: Code that passes non-string values to `metadata` fields will fail TypeScript compilation.

---

## Quick Migration

### Option 1: Use Helper Functions (Recommended) ✅

The easiest way to migrate is using the new `toMetadata()` helper:

```typescript
import gocardless, { toMetadata } from 'gocardless-nodejs';

// ❌ BEFORE (v7.x) - Compiled but failed at runtime
client.customers.create({
  email: 'user@example.com',
  metadata: {
    user_id: 12345,           // number
    is_active: true,          // boolean
    tags: ['vip', 'premium']  // array
  }
});

// ✅ AFTER (v8.0.0) - One function call
client.customers.create({
  email: 'user@example.com',
  metadata: toMetadata({
    user_id: 12345,           // Auto-converts to "12345"
    is_active: true,          // Auto-converts to "true"
    tags: ['vip', 'premium']  // Auto-converts to '["vip","premium"]'
  })
});
```

### Option 2: Manual Conversion

If you prefer explicit control:

```typescript
client.customers.create({
  email: 'user@example.com',
  metadata: {
    user_id: String(12345),              // "12345"
    is_active: String(true),             // "true"
    tags: JSON.stringify(['vip', 'premium'])  // '["vip","premium"]'
  }
});
```

---

## Helper Functions Reference

### `toMetadata(obj)`

Converts an entire object to metadata format:

```typescript
import { toMetadata } from 'gocardless-nodejs';

const metadata = toMetadata({
  user_id: 12345,
  is_premium: true,
  signup_date: new Date('2024-01-15'),
  preferences: { theme: 'dark', lang: 'en' }
});

// Result:
// {
//   user_id: "12345",
//   is_premium: "true",
//   signup_date: "Mon Jan 15 2024 00:00:00 GMT+0000",
//   preferences: '{"theme":"dark","lang":"en"}'
// }
```

### `toMetadataValue(value)`

Converts a single value:

```typescript
import { toMetadataValue } from 'gocardless-nodejs';

toMetadataValue(12345);           // "12345"
toMetadataValue(true);            // "true"
toMetadataValue({ theme: 'dark' }); // '{"theme":"dark"}'
toMetadataValue(['a', 'b']);      // '["a","b"]'
```

### `isValidMetadata(obj)`

Type guard to check if metadata is valid:

```typescript
import { isValidMetadata } from 'gocardless-nodejs';

if (isValidMetadata(metadata)) {
  // TypeScript knows metadata is { [key: string]: string }
  await client.customers.create({ metadata });
}
```

### `parseMetadataValue(value, type)`

Parse metadata values back to their original types:

```typescript
import { parseMetadataValue } from 'gocardless-nodejs';

const customer = await client.customers.get('CU123');

// Parse back to original types
const userId = parseMetadataValue(customer.metadata.user_id, 'number');  // 12345
const isActive = parseMetadataValue(customer.metadata.is_active, 'boolean');  // true
const tags = parseMetadataValue(customer.metadata.tags, 'json');  // ['vip', 'premium']
```

---

## Common Migration Patterns

### Pattern 1: Numeric IDs

```typescript
// ❌ Before
metadata: { user_id: userId }

// ✅ After
metadata: { user_id: String(userId) }
// or
metadata: toMetadata({ user_id: userId })
```

### Pattern 2: Boolean Flags

```typescript
// ❌ Before
metadata: { is_premium: user.isPremium }

// ✅ After
metadata: { is_premium: user.isPremium ? 'true' : 'false' }
// or
metadata: toMetadata({ is_premium: user.isPremium })
```

### Pattern 3: Arrays/Lists

```typescript
// ❌ Before
metadata: { tags: ['vip', 'early_adopter'] }

// ✅ After
metadata: { tags: JSON.stringify(['vip', 'early_adopter']) }
// or
metadata: toMetadata({ tags: ['vip', 'early_adopter'] })
```

### Pattern 4: Nested Objects

```typescript
// ❌ Before
metadata: {
  preferences: {
    theme: 'dark',
    notifications: true
  }
}

// ✅ After
metadata: {
  preferences: JSON.stringify({
    theme: 'dark',
    notifications: true
  })
}
// or
metadata: toMetadata({
  preferences: { theme: 'dark', notifications: true }
})
```

### Pattern 5: Conditional Values

```typescript
// ❌ Before
metadata: {
  referral_code: user.referralCode || null
}

// ✅ After
metadata: {
  referral_code: user.referralCode ? String(user.referralCode) : 'null'
}
// or
metadata: toMetadata({
  referral_code: user.referralCode || null
})
```
