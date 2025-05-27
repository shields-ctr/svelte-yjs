import * as Y from 'yjs';
import {WebsocketProvider} from 'y-websocket';

// TODO replace this with a synchrostate tied to the YDoc...
export const state = $state({ count: 4 });

export const ydoc = new Y.Doc();
export const provider = new WebsocketProvider('ws://localhost:1234', 'document', ydoc);

provider.on('status', event => {
  console.log(event.status);
})