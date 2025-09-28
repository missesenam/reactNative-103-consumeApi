module.exports = {
  presets: ["babel-preset-expo"], // or "module:metro-react-native-babel-preset" if not Expo
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env", // 👈 this must match your import
        path: ".env", // 👈 make sure the file is at the root
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
