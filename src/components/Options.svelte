<script lang="ts">
	import { onMount } from "svelte";

	let searchQuery: string = null;
	let tabs: chrome.tabs.Tab[] = [];

	let searchQueryInput: any;
	let resultsElement: any;

	let firstItemIndex: number = 0;
	let resultsShown: number = 11;
	let selectedIndex: number = 0;

	onMount(() => {
		searchQuery = "";
		onInputChange();
		searchQueryInput.focus();
	});

	function onKeyDown(e: KeyboardEvent) {
		if (e.code === "Enter") {
			e.preventDefault();
			chrome.tabs.update(tabs[selectedIndex].id, { active: true });

			// Moving up
		} else if (e.code === "Tab" && e.shiftKey && selectedIndex > 0) {
			e.preventDefault();
			selectedIndex -= 1;

			// Check if scrolling up is needed
			if (firstItemIndex == selectedIndex) {
				firstItemIndex -= 1;
				resultsElement.children[selectedIndex].scrollIntoView();
			}

			// Moving down
		} else if (e.code === "Tab" && !e.shiftKey && selectedIndex < tabs.length - 1) {
			e.preventDefault();
			selectedIndex += 1;

			// Check if scrolling down is needed
			if (firstItemIndex + resultsShown == selectedIndex) {
				firstItemIndex += 1;
				resultsElement.children[selectedIndex].scrollIntoView({
					block: "end",
				});
			}
		}
	}

	function onInputChange() {
		chrome.runtime.sendMessage(
			{ type: "query", body: searchQuery },
			//{ type: "query", body: "" },
			(response) => {
				selectedIndex = 0;
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
	<div class="results-container">
		<div class="results" bind:this={resultsElement}>
			{#each tabs as tab, i}
				<p class={i === selectedIndex ? "selected" : ""}>
					{i}. {tab.title}
				</p>
			{/each}
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
	}

	.container {
		padding: 8px;
		background-color: #282828;
		color: #fbf1c7;
		width: 600px;
		display: flex;
		flex-direction: column;
		/*overflow-y: hidden;*/
		overflow-x: hidden;
		font-family: monospace;
		font-size: 1rem;
	}

	.results-container {
		border: solid;
		border-color: #b16286;
	}

	.results {
		overflow-y: scroll;
		height: 308px;
	}

	.results::-webkit-scrollbar {
		display: none;
	}

	input {
		color: #fdf1c7;
		outline: none;
		border: solid;
		border-color: #b16286;
		background-color: #282828;
		font-family: monospace;
		margin-bottom: 10px;
		font-size: 1rem;
		padding: 4px;

		caret-color: #b16286;
	}

	.selected {
		background-color: #b16286;
	}

	p {
		margin: 0;
		padding: 4px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
