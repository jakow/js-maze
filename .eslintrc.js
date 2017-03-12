module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    rules: {
    	'no-mixed-operators': 'off',
    	'no-plusplus': 'off',
	    'no-restricted-syntax': [
	      'error',
	      'LabeledStatement',
	      'WithStatement',
	    ],
	    'no-unused-vars': 'warn',
	    // 'no-continue': 'off',
    }
};
