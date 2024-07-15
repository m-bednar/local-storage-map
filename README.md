# LocalStorage Map 
Convinient implementation of Map interface upon browser's localStorage. 

- efficient 
- automatic serialization/deserialization
- automatic saving to localStorage
- fully written in typescript
- unit-tested

## Usage 
Implements all methods from the `Map<string, T>` type: 
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

and is iterable:
```typescript
for (const [key, value] of hoursOnHobbies) {
    console.log(key, value)
}
```
