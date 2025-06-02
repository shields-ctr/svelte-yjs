<script>
  import { getContext } from 'svelte';

  let script = getContext('script');
  let users = getContext('bots');
  let channels = getContext('channels');

  function isSender(user, message) {
    return (Object.hasOwn(message, 'nick'))
      ? user.toLowerCase() == message.nick.toLowerCase()
      : false;
  }
  function isReceiver(channel, message) {
    return (Object.hasOwn(message, 'args') && message.args.length)
      ? channel.toLowerCase() == message.args[0].toLowerCase()
      : false;
  }
</script>

<table id="controls">
    <thead>
      <tr>
        <th></th>
        <th></th>
        {#each channels as channel}<th>
          {channel}
        </th>{/each}
        <th></th>
      </tr>
    </thead>
    <tbody>
    {#each users as user}<tr>
      <td>
        <input type="button" value="-" 
          onclick={(event)=>destroyUser(event, user)} />
      </td>
      <td>
        {user}
      </td>
      {#each channels as channel}<td>
        <input type="checkbox" id={user+'_'+(channel.replace('#',''))} 
          onclick={(event)=>toggle(event.target,user,channel)}>
      </td>{/each}
      <td>
        <form onsubmit={(event)=>sendMessage(event, user)}>
          <input type="text" name="message" placeholder="message to send" required />
          <input type="submit" value='>' />
          <select name="recipient" id="recipient">
            {#each channels as channel}
              <!-- {#if document.getElementById(user+'_'+(channel.replace('#','')))?.checked} -->
                <option value={channel}>{channel}</option>
              <!-- {/if} -->
            {/each}
          </select>
        </form>
      </td>
    </tr>{/each}
    <tr>
      <td colspan="2">
        <form onsubmit={createBot}>
          <input type="text" name="username" placeholder="new bot name" required />
          <input type="submit" value="+"/>
        </form> <!-- TODO add validator that sanitizes for http and irc names... -->
      </td>
      <td colspan={channels.length}>
        <form onsubmit={createChannel}>
          <input type="text" name="channelname" placeholder="new channel name" required />
          <input type="submit" value="+"/>
        </form>
      </td>
      <td></td>
    </tr>
    </tbody>
  </table>

  <style>
    th {
      vertical-align: middle;
      text-align: end;
      writing-mode: vertical-lr;
    }
    /* th:nth-child(n+2) { writing-mode: vertical-lr; } */
    form { padding: 0.25em; }

    td, th {
      margin: 0;
      padding: 0;
    }
  </style>