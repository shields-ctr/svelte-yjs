<script>
	import { getContext } from 'svelte';

	let state = getContext('state');
</script>

<button
	onclick={() => {
		state.count++;
	}}
	class="btn"
>
	state: {state.count}
</button>
