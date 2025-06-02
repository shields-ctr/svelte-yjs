<script lang="ts">
	import viteLogo from '/vite.svg';
	import { setContext, onMount } from 'svelte';
	import {WebsocketProvider} from 'y-websocket';
	import { y, syncroState } from './lib/syncrostate/index.js';
	import Dialog from './lib/Dialog.svelte';
	import Cast from './lib/Cast.svelte';

	// Create the syncrostate and add it to the application context
	const script = syncroState({
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
			dialog: y.array(
				y.object({
					id: y.number(),
					time: y.string().pattern(/^[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{2}$/),
					nick: y.string(),
					command: y.string(),
					args: y.array(y.string())
				})
			)
		}
	});
	setContext('script', script);

	// DEBUG initialize bot information with some defaults
	// eventually we'll want to get this stuff from the server's api.
	// possibly we might move some things like channels and users from the script- or at least make sure the script contains a subset...
	const bots = $state(['Raditz', 'Nappa', 'Vegeta', 'Ginyu', 'Frieza']);
	setContext('bots', bots);

	const channels = $state(["#namek", "#earth"]);
	setContext('channels', channels);

	const commands = ["JOIN", "PRIVMSG", "PART", "QUIT"];
	setContext('commands', commands);
	
	// DEBUG When the application mounts create an example script
	// (in the future we'll want to load it from local storage, then sync it with the server...)
	onMount(() => {
		createScript(script);
	});
	function createScript(script) {
		script.dialog = [];
		script.dialog.push(createLine(0,"12:00:00.00", "Operator", "JOIN", "#namek"));
		script.dialog.push(createLine(1,"12:00:01.00", "Operator", "JOIN", "#earth"));
		script.dialog.push(createLine(2,"12:00:02.00", "Raditz", "JOIN", "#earth"));
		script.dialog.push(createLine(3,"12:00:03.00", "Raditz", "PRIVMSG", "#earth","aaaahhhh"));
		script.dialog.push(createLine(4,"12:00:04.00", "Nappa", "JOIN", "#earth"));
		script.dialog.push(createLine(5,"12:00:05.00", "Vegeta", "JOIN", "#earth"));
		script.dialog.push(createLine(6,"12:00:06.00", "Nappa", "PRIVMSG", "#earth","waaaaaaagh"));
		script.dialog.push(createLine(7,"12:00:07.00", "Vegeta", "PRIVMSG", "#earth","haaaaaaaah"));
		script.dialog.push(createLine(8,"12:00:08.00", "Ginyu", "JOIN", "#earth"));
		script.dialog.push(createLine(9,"12:00:09.00", "Ginyu", "PRIVMSG", "#earth","aaaaaugh"));
		script.dialog.push(createLine(10,"12:00:10.00", "Operator", "PRIVMSG", "#earth","On the next exciting episode"));
		script.dialog.push(createLine(11,"12:00:11.00", "Frieza", "JOIN", "#earth"));
		script.dialog.push(createLine(12,"12:00:12.00", "Frieza", "PRIVMSG", "#earth","aaaaaaaaaaaaaa"));
	}
	function createLine(id: number, time:string, nick:string, command:string, ...args:string[]){
		return {id, time, nick, command, args};
	}

	
</script>

<main class="grid h-screen">

	<div class="card shadow-sm bg-slate-700 p-5 pt-8">
		<div class="ml-auto mr-auto">
			<a href="https://vite.dev" target="_blank" rel="noreferrer">
				<img src={viteLogo} class="logo" alt="Vite Logo" />
			</a>
		</div>
		<Dialog>

		</Dialog>
		<!-- {#if state.getState?.().synced}
			{#each state.script as dialog}
				<p>
					{dialog.time} {dialog.nick} {dialog.command} 
					{#each dialog.args as arg}
						{arg}&nbsp
					{/each}
				</p>
			{/each}
		{/if} -->
	</div>

	<!-- <div class="card shadow-sm bg-slate-700 p-5 pt-8">
		<Cast></Cast>
	</div> -->
</main>



<style>
</style>
