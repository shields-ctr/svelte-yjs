# Svelte Yjs

We'd like to incorporate collaborative editing capabilities into our application but a remaining hurdle is synchronizing the CRDT structures with the local reactive state; in our case Svelte5.

Curiously, much more demanding UI problems like code editors have great integration, but relatively more common use cases like replicating the state of a reactive UI don't appear to be well fleshed out yet. In retrospect, most CRDT research grew out of collaborative editors...

Anyways, the main idea is you need to make CRDT observers and reactive UI proxies keep each other synchronized. I made a half-hearted attempt with Svelte-Loro. It used coarse grained Svelte4 stores and I didn't even try to bridge Loro's delta encoding into Svelte updates... I found some other projects that took a similar approach which I became convinced was wrong because the mismatch in granularity and the inefficiencies that would create- especially for large documents like the ones I want to use.

Luckily this year's Svelte Hackathon featured a project which synchronizes Svelte5 runes with Yjs Documents; [SyncroState](https://syncrostate.pages.dev/) by [beynar](https://github.com/beynar). I haven't fully read the code but I did see fine grained proxies, which I think is the right way to approach this.

Also, the library provides schema definition and input validation features. Very forward thinking of the author; I have wondered for awhile now how CRDT implementors intend to structure and validate these documents. This goes a long way to providing that!

# Running the Example

This is meant to be a representative example for our application; in this case a script for IRC chat bots.

<!-- Not sure what's going on but I can't seem to install syncrostate.
As a temporary hack I cloned the project and copied its distribution...
``` console
git clone https://github.com/beynar/syncrostate.git
copy ./syncrostate/package/dist ./svelte-yjs/src/lib/syncrostate
npm install
``` -->

Start the Yjs-WebSocket provider which synchronizes named documents;
``` console
npm run wsp
```

Then spin up the Vite development server which will serve our client apps;
``` console
npm run dev
```

Then point a browser at http://localhost:5173 and duplicate the tab.
Edits in one window will affect the forms in all other windows!

There is no custom glue code, just a plain old svelte application; all the hassle is taken care of with Yjs and Syncrostate.

# Next steps

I need to think through how documents will be named, and also how to synchronize them with Browser Storage.
We'll tackle that outside this proof-of-concept example however.

# Notes

- Here is a default WebSocket server for Yjs; https://github.com/yjs/y-websocket-server
  - it can be forked and customized to add authentication and the like...
- There is a document inspector we can use to observe the raw Ydoc state;
  - https://github.com/yjs/yjs-inspector
  - https://inspector.yjs.dev/

<!--# TODO
- Client
  - [ ] csv upload of a script w/ room name
  - [ ] Have user supply a room name to coordinate documents
  - [ ] If room name exists in IndexedDb Provider, sync
  - [ ] If room name exists on WebSocket Provider, sync
  - [ ] allow user edits on future lines of dialog
- Server
  - 
  - [ ] allow playback edits from central server
      - ie. disabling sent dialog lines



# Boilerplate for single file svelte site

- Vite
- Svelte (NOT SvelteKit)
- [TailwindCSS](https://tailwindcss.com/docs/aspect-ratio)
- [DaisyUI](https://daisyui.com/components/)
- [vite-plugin-singlefile](https://www.npmjs.com/package/vite-plugin-singlefile)

## Running

Install: `npm i`

Dev: `npm run dev`

Build: `npm run build`-->