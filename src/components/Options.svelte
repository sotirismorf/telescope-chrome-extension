<script lang="ts">
	import { onMount } from "svelte";

	let searchQuery: string = null;
	let tabs: chrome.tabs.Tab[] = [];

	let searchQueryInput: any;
	let selectedIndex: number = 0;

	onMount(() => {
		searchQuery = "";
		onInputChange();
		searchQueryInput.focus();
	});

	function onKeyDown(e: KeyboardEvent) {
		console.log(e);
		if (e.code === "Enter") {
			chrome.tabs.update(tabs[selectedIndex].id, { active: true });
		} else if (e.code === "Tab") {
			if (e.shiftKey && selectedIndex > 0) selectedIndex -= 1;
			else if (!e.shiftKey && selectedIndex < 8) selectedIndex += 1;
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
		bind:this={searchQueryInput}
		bind:value={searchQuery}
		on:input={onInputChange}
		on:keydown={onKeyDown}
		placeholder="Search for title"
		type="text"
	/>
	<div class="results">
		{#each tabs as tab, i}
			<p class="{ i === selectedIndex ? 'selected' : ''}">{tab.title}</p>
		{/each}
	</div>
</div>

<style>
	.container {
		width: 400px;
		display: flex;
		flex-direction: column;
		overflow-y: hidden;
		overflow-x: hidden;
		font-family: monospace;
		font-size: 1rem;
	}

	.results {
		border: solid;
		border-color: black;
		height: 300px;
	}

	input {
		font-family: monospace;
		border: solid;
		border-color: black;
		outline: none;
		margin-bottom: 10px;
		font-size: 1rem;
		padding: 4px;
	}

	.selected {
		background-color: red;
	}

	p {
		margin: 0;
		padding: 4px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
