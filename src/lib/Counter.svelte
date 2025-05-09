<script>
	import { getContext } from 'svelte';

	let clicks = getContext('clicks');
</script>

<button
	onclick={() => {
		clicks.count++;
	}}
	class="btn"
>
	clicks: {clicks.count}
</button>
