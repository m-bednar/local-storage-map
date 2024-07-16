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

const clicksPerSession = new LocalStorageMap<number>('clicks', sessionStorage)
clicksPerSession.set('article', 0)
clicksPerSession.set('sidebar', 0)

// ... 
```

**Warning:** never store any sensitive information inside `localStorage`/`sessionStorage`.
