module.exports = {
    "extends": [
        "eslint:recommended",
        'plugin:react/recommended',
    ],
    "plugins": [
        "react",
        "import",
    ],
    "env": {
        "browser": true,
        "commonjs": true,
        "node": true,
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true,
        }
    },
    "rules": {
        "no-console": 0,    // allow console logging
        "indent": [ "error", 4, {
            SwitchCase: 1,  // allow case statements to be indented
        }],
        "semi": [ "error", "always" ],
        "react/jsx-indent": ["warn", 4],
        "react/jsx-closing-bracket-location": "warn",
        "react/void-dom-elements-no-children": "warn",
    }
};
