<script lang="ts">
	import { onMount } from "svelte";

	let searchQuery: string = null;
	let tabs: chrome.tabs.Tab[] = [];

	let searchQueryInput: any;

	onMount(() => {
		searchQuery = "";
		onInputChange();
		searchQueryInput.focus();
	});
n
	let test = "";

	function onSubmit(e) {
		if (tabs.length === 0) return;
	}

	function onKeyDown(e: KeyboardEvent) {
		console.log(e);
		if (e.code === "Enter") {
			chrome.tabs.update(tabs[0].id, { active: true });
		} else if (e.code === "Tab") {
		}
	}

	function onInputChange() {
		chrome.runtime.sendMessage(
			{ type: "query", body: searchQuery },
			(response) => {
				tabs = response;
			}
		);
	}
</script>

<div class="container">
	<input
		on:submit={onSubmit}
		bind:this={searchQueryInput}
		bind:value={searchQuery}
		on:input={onInputChange}
		on:keydown={onKeyDown}
		type="text"
	/>
	{test}
	{#each tabs as tab}
		<p>{tab.title}</p>
	{/each}
</div>

<style>
	.container {
		width: 400px;
		height: 300px;
		overflow-y: scroll;
	}
</style>
