<script lang="ts">
	import viteLogo from '/vite.svg';
	import { setContext } from 'svelte';
	import Counter from './lib/Counter.svelte';
	import {state} from './lib/State.svelte';

	setContext('state', state);
</script>

<main class="grid place-content-center h-screen">
	<div class="card shadow-sm bg-slate-700 p-5 pt-8">
		<div class="ml-auto mr-auto">
			<a href="https://vite.dev" target="_blank" rel="noreferrer">
				<img src={viteLogo} class="logo" alt="Vite Logo" />
			</a>
		</div>
		<div class="card-body">
			<p><Counter></Counter></p>
			<p><Counter></Counter></p>
			<p><Counter></Counter></p>
		</div>
	</div>
</main>

<style>
</style>
