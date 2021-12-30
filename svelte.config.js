import sveltePreprocess from 'svelte-preprocess'

console.log(process.env.MODE)

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess()
}
