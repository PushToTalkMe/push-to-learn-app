module.exports = {
  main: {
    input: './api/schema.yaml',
    output: {
      target: './api/generated.ts',
      prettier: true,
      override: {
        mutator: {
          path: './api/api-instance.ts',
          name: 'createInstance',
        },
      },
    },
  },
};
