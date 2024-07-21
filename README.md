# LocalStorage Map

[![Static Badge](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/m-bednar/local-storage-map)
![NPM License](https://img.shields.io/npm/l/local-storage-map)
[![NPM Version](https://img.shields.io/npm/v/local-storage-map)](https://www.npmjs.com/package/local-storage-map)

Convenient implementation of `Map` interface upon browser's localStorage.

- 🚀 Efficient
- 📦 Minimalistic
- 💪 Written in Typescript 
- 🧪 Fully unit-tested 

## Usage

Implements all methods from the `Map<string, SerializableValue>` type:

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

And it's also iterable:

```typescript
for (const [key, value] of hoursOnHobbies) {
    console.log(key, value)
}
```

As it fully conforms to Map type, you can use it instead as super-type, so without the need for interface changes.

## Using different Storage 

You can also use different type of storage, if default `localStorage` is not suitable for your use-case. 

For example we can use `sessionStorage`:

```typescript
import {LocalStorageMap} from 'local-storage-map'

const clicksPerSession = new LocalStorageMap<boolean>('clicked', sessionStorage)
clicksPerSession.set('article', false)
clicksPerSession.set('sidebar', false)

// ... 
```

**Warning:** never store any sensitive information inside `localStorage`/`sessionStorage`.

## Modifying stored values

Objects and arrays stored in `LocalStorageMap` must be set again after modifying. Returned value is `readonly` for the purpose of 
informing the programmer, that the value cannot be modified directly. The preferred approach for setting object/array values is to get the value
and spread it into new object/array which is then set:

```typescript
import {LocalStorageMap} from 'local-storage-map'

const companySharesByCategory = new LocalStorageMap<Record<string, number>>('shares')
companySharesByCategory.set('technology', {
  amd: 1000,
  microsoft: 300,
  nvidia: 420
})

// Later in code...
const companyShares = companySharesByCategory.get('technology')
companySharesByCategory.set({ ...companyShares, microsoft: 350 })
```

## Dynamic value object

For convenience there is also a `DynamicStorageValue` object you can get from storage and later use.

```typescript
import {LocalStorageMap} from 'local-storage-map'

const storage = new LocalStorageMap<Record<string, number>>('general')
storage.set('clicks', 100)

// Later in code...
const clicks = storage.dynamic('clicks')
clicks.get()    // 100
clicks.set(200) // Automatically saved to storage
```

