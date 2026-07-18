/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'button--outline',
    'button--primary',
    'image-placeholder--landscape',
    'image-placeholder--portrait',
    'image-placeholder--square',
    'page-section--brand',
    'page-section--dark',
    'page-section--default',
    'page-section--subtle',
    'section-heading--center',
    'section-heading--left',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
