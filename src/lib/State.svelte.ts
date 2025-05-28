import * as Y from 'yjs';
import {WebsocketProvider} from 'y-websocket';

// TODO replace this with a synchrostate tied to the YDoc...
export const state = $state({ count: 4 });

export const ydoc = new Y.Doc();
export const provider = new WebsocketProvider('ws://localhost:1234', 'document', ydoc);

createScript(ydoc);

provider.on('status', event => {
  console.log(event.status);
})

function createScript(ydoc: Y.Doc) {
  const script = ydoc.getArray<Y.Map<string | string[]>>('script');
  let dialog = [];
  dialog.push(createDialog("12:00:00.00", "Operator", "JOIN", "#namek"));
  dialog.push(createDialog("12:00:01.00", "Operator", "JOIN", "#earth"));
  dialog.push(createDialog("12:00:02.00", "Raditz", "JOIN", "#earth"));
  dialog.push(createDialog("12:00:03.00", "Raditz", "PRIVMSG", "#earth","aaaahhhh"));
  dialog.push(createDialog("12:00:04.00", "Nappa", "JOIN", "#earth"));
  dialog.push(createDialog("12:00:05.00", "Vegeta", "JOIN", "#earth"));
  dialog.push(createDialog("12:00:06.00", "Nappa", "PRIVMSG", "#earth","waaaaaaagh"));
  dialog.push(createDialog("12:00:07.00", "Vegeta", "PRIVMSG", "#earth","haaaaaaaah"));
  dialog.push(createDialog("12:00:08.00", "Ginyu", "JOIN", "#earth"));
  dialog.push(createDialog("12:00:09.00", "Ginyu", "PRIVMSG", "#earth","aaaaaugh"));
  dialog.push(createDialog("12:00:10.00", "Operator", "PRIVMSG", "#earth","On the next exciting episode"));
  dialog.push(createDialog("12:00:11.00", "Frieza", "JOIN", "#earth"));
  dialog.push(createDialog("12:00:12.00", "Frieza", "PRIVMSG", "#earth","aaaaaaaaaaaaaa"));
  script.push(dialog);
}

function createDialog(time:string, nick:string, command:string, ...args:string[]):Y.Map<string|string[]> {
  const line = new Y.Map<string | string[]>();
  line.set('time', time);
  line.set('nick', nick);
  line.set('command', command);
  line.set('args', args);
  return line;
}