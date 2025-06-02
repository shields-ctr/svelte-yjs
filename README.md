# Notes

- Here is a default WebSocket server for Yjs; https://github.com/yjs/y-websocket-server
  - it can be forked and customized to add authentication and the like...
- There is a document inspector we can use to observe the raw Ydoc state;
  - https://github.com/yjs/yjs-inspector
  - https://inspector.yjs.dev/

# TODO

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

Build: `npm run build`