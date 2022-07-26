import Popup from "src/components/Popup.svelte";
import type { IStorage } from "src/types";

function restoreOptions() {
    chrome.storage.sync.get({ count: 0 } as IStorage, ({ count }: IStorage) => {
        const app = new Popup({
            target: document.body,
            props: { count },
        });
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
