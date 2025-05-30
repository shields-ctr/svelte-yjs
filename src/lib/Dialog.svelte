<script>
  import { getContext } from 'svelte';

  let script = getContext('script');
  let users = getContext('bots');
  let channels = getContext('channels');
  const commands = getContext('commands');

  function isSender(user, message) {
      return (Object.hasOwn(message, 'nick'))
        ? user.toLowerCase() == message.nick.toLowerCase()
        : false;
    }
    function isReceiver(channel, message) {
      return (Object.hasOwn(message, 'args') && message.args.length)
        ? channel.toLowerCase() == message.args[0].toLowerCase()
        : false;
    }//{"prefix":"raditz!~u@2t4jjv3kfbf4q.irc","nick":"raditz","user":"~u","host":"2t4jjv3kfbf4q.irc","command":"JOIN","rawCommand":"JOIN","commandType":"normal","args":["#TM_C2"]}
    
</script>

<h1>Dialog</h1>

<!-- {#if script.getState?.().synced}
  {#each script.dialog as line}
    <p>
      {line.time} {line.nick} {line.command} 
      {#each line.args as arg}
        {arg}&nbsp
      {/each}
    </p>
  {/each}
{/if} -->

<table id="script">
    <thead>
      <tr>
        <th>time</th>
        {#each users as user}
        <th>{user}</th>
        {/each}
        <th>command</th>
        {#each channels as channel}
        <th>{channel}</th>
        {/each}
        <th>message</th>
      </tr>
    </thead>
    <tbody>
      {#each script.dialog as line}
      <tr class={line.command}>
        <td>
          <input type="text" 
            pattern="([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])"
            value={line.time} />
          <!-- <input type="time" 
            step="1"
            value={line.time}
          /> -->
          <!-- value={(new Date(line.time)).toTimeString().slice(0,8)} -->
        </td>
        {#each users as user}
        <td><input type="radio" 
              name={"user_"+line.id}
              checked={isSender(user, line)}>
        </td>
        {/each}
        <td>
          <select 
            id={"command_"+line.id}>
            {#each commands as command}
            <option value="command"
              selected={command==line.command}>
              {command}
            </option>
            {/each}
          </select>

        </td>
        {#each channels as channel}
        <td><input type="radio"
            name={"channel_"+line.id}
            onclick={(event)=>console.log(event)}
            checked={isReceiver(channel, line)} />
        </td>
        {/each}
        <td>
          <!-- {line.nick} -->
          <input type="text"
            value={(line.args.length>1) ? line.args.slice(1).join(',') : ''}/>
        </td>
        <!-- <td>{(line.args.length>0) ? line.args[0] : ''}</td> -->
        <!-- <td>{(line.args.length>1) ? line.args.slice(1).join(',') : ''}</td> -->
      </tr>
      {/each}
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