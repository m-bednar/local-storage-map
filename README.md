# LocalStorage Map

Convenient implementation of Map interface upon browser's localStorage.

- efficient
- minimalistic
- fully written in typescript
- unit-tested
- auto serialization/deserialization
- auto saving to localStorage

## Usage

Implements all methods from the `Map<string, VALUE>` type:

```typescript
import {LocalStorageMap} from 'local-storage-map'

const hoursOnHobbies = new LocalStorageMap<number>('hobbies')
hoursOnHobbies.set('running', 10)
hoursOnHobbies.set('swimming', 42)
hoursOnHobbies.set('cycling', 6)

hoursOnHobbies.has('swimming')     // true
hoursOnHobbies.get('running')      // 10
hoursOnHobbies.size                // 3

hoursOnHobbies.delete('swimming')
hoursOnHobbies.keys()              // IterableIterator{ 'running', 'cycling' }
hoursOnHobbies.values()            // IterableIterator{ 10, 6 }
hoursOnHobbies.clear()
```

It's iterable:

```typescript
for (const [key, value] of hoursOnHobbies) {
    console.log(key, value)
}
```

As it fully conforms to Map type, you can use it instead as super-type, so without the need for interface changes.
