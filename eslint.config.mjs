import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    ignores: [
      'node_modules',
      '.aws-sam'
    ]
  },
  {
    "rules": {
      "max-len": [
        "warn",
        {
          "code": 180,
          "ignoreStrings": true
        }
      ],
      "func-style": [
        "error",
        "declaration",
        {
          "allowArrowFunctions": true
        }
      ],
      "comma-dangle": [
        "error",
        "never"
      ],
      "require-jsdoc": 0,
      "linebreak-style": 0,
      "no-unused-vars": 0,
      "object-curly-spacing": ["error", "always", { "objectsInObjects": true }],
      "eol-last": 0,
      "no-undef": 0,
      "dot-notation": "error"
    }
  }
];