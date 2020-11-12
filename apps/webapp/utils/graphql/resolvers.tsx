let book = {
  name: 'The Hungarian Sausage',
  author: 'Ben Grunfeld',
};

export const resolvers = {
  Query: {
    book: () => book,
  },

  Mutation: {
    updateBook: (root, args) => {
      book.name = args.name;
      book.author = args.author;
      return book;
    },
  },
};
