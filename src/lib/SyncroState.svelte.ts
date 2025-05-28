import {WebsocketProvider} from 'y-websocket';
import { y, syncroState } from './syncrostate/index.js';
import type { ArrayValidator } from './syncrostate/schemas/array.js';
import type { ObjectValidator } from './syncrostate/schemas/object.js';
import type { SchemaOutput } from './syncrostate/schemas/schema.js';
import type { StringValidator } from './syncrostate/schemas/string.js';

/** I can't figure out how to use syncrostate with typescript despite a ton of definitions.
 * Only way that works (apart from spamming 'any')
 * is incredibly tedious and doesn't provide any more type safety than the schema I am typing.
 * Spent a day to get this to compile.
 * Immediate run time error. See below. */
type stateType = SchemaOutput<{
    script: ArrayValidator<ObjectValidator<{
        time: StringValidator<false, false>;
        nick: StringValidator<false, false>;
        command: StringValidator<false, false>;
        args: ArrayValidator<any>;
    }, false, false>, false, false>;
}>;

// Error; a syncrostate cannot be declared outside a svelte effect apparently?
// No idea. Fine, I'll toss this out and cram it all into a root svelte component.
// Maybe share it to sub-components via a context?
export const state = syncroState({
  sync: async ({doc, synced}) => {
    const provider = new WebsocketProvider('ws://localhost:1234', 'document', doc);
    provider.on('status', event => {
      console.log(event.status);
    })
    provider.on('sync', () => {
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

createScript(state);

function createScript(state: stateType) {
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