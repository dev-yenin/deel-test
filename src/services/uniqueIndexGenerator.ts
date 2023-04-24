function* UniqueIndexGenerator() {
  let i = 0;

  while (true) {
    yield ++i;
  }
}

export const generateUniqueIndex = UniqueIndexGenerator();
