<script lang="ts">
	import viteLogo from '/vite.svg';
	import { setContext, onMount } from 'svelte';
	import {WebsocketProvider} from 'y-websocket';
	import { y, syncroState } from './lib/syncrostate/index.js';

	const state = syncroState({
		sync: async ({doc, synced}) => {
			const provider = new WebsocketProvider('ws://localhost:1234', 'document', doc);
			provider.on('status', event => {
				console.log(event.status);
			})
			provider.on('synced', () => {
				synced();
			})
		},
		schema: {
			script: y.array(
				y.object({
					time: y.string().pattern(/^[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{2}$/),
					nick: y.string(),
					command: y.string(),
					args: y.array(y.string())
				})
			)
		}
	});	

	onMount(() => {
		createScript(state);
	});

	function createScript(state) {
		state.script = [];
		state.script.push(createDialog("12:00:00.00", "Operator", "JOIN", "#namek"));
		state.script.push(createDialog("12:00:01.00", "Operator", "JOIN", "#earth"));
		state.script.push(createDialog("12:00:02.00", "Raditz", "JOIN", "#earth"));
		state.script.push(createDialog("12:00:03.00", "Raditz", "PRIVMSG", "#earth","aaaahhhh"));
		state.script.push(createDialog("12:00:04.00", "Nappa", "JOIN", "#earth"));
		state.script.push(createDialog("12:00:05.00", "Vegeta", "JOIN", "#earth"));
		state.script.push(createDialog("12:00:06.00", "Nappa", "PRIVMSG", "#earth","waaaaaaagh"));
		state.script.push(createDialog("12:00:07.00", "Vegeta", "PRIVMSG", "#earth","haaaaaaaah"));
		state.script.push(createDialog("12:00:08.00", "Ginyu", "JOIN", "#earth"));
		state.script.push(createDialog("12:00:09.00", "Ginyu", "PRIVMSG", "#earth","aaaaaugh"));
		state.script.push(createDialog("12:00:10.00", "Operator", "PRIVMSG", "#earth","On the next exciting episode"));
		state.script.push(createDialog("12:00:11.00", "Frieza", "JOIN", "#earth"));
		state.script.push(createDialog("12:00:12.00", "Frieza", "PRIVMSG", "#earth","aaaaaaaaaaaaaa"));
	}

	function createDialog(time:string, nick:string, command:string, ...args:string[]){
		return {time, nick, command, args};
	}

	setContext('state', state);

</script>

<main class="grid h-screen">
	<div class="card shadow-sm bg-slate-700 p-5 pt-8">
		<div class="ml-auto mr-auto">
			<a href="https://vite.dev" target="_blank" rel="noreferrer">
				<img src={viteLogo} class="logo" alt="Vite Logo" />
			</a>
		</div>
		{#if state.getState?.().synced}
			{#each state.script as dialog}
				<p>
					{dialog.time} {dialog.nick} {dialog.command} 
					{#each dialog.args as arg}
						{arg}&nbsp
					{/each}
				</p>
			{/each}
		{/if}
	</div>
</main>



<style>
</style>
