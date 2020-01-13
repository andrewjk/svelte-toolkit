module.exports = {
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.svelte$": [
            "svelte-jester",
            {
                "preprocess": true
            }
        ]
    },
    moduleFileExtensions: [
        "js",
        "svelte"
    ],
    setupFiles: [
        "jest-canvas-mock"
    ],
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect"
    ]
}
