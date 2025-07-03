import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

export default createConfigForNuxt({
  features: {
    typescript: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
  },
  dirs: {
    src: ["**/*.{ts,vue}", "!**/node_modules/**", "!**/dist/**", "!**/output/**", "!docker/**"],
  },
})
  .override("nuxt/vue/rules", {
    rules: {
      "vue/html-indent": ["error", 2],
      "vue/max-attributes-per-line": ["error", {
        singleline: { max: 1 },
        multiline: { max: 1 },
      }],
    },
  })
  .append({
    files: ["**/*.vue"],
    rules: {
      "no-undef": "off",
    },
  });
