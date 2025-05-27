import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import * as Y from 'yjs';

const doc = new Y.Doc();

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
