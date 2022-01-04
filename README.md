# Nekonames

Maps an array of unique full names to more compact but still unambiguous names. E.g:

```js
> Object.values(nekonames([
  "George Michael",
  "George Orwell",
  "George Martin",
  "George Raymond Richard Martin",
]))
[
  "George Michael",
  "George O.",
  "George Martin",
  "George R. R. M.",
]
```

See tests for more examples.

Module name etymology: nickname → nekename → nekoname 🐈
