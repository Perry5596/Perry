ChatLib.chat("index.js is loading!"); // Debug
// --------------------------------- Debug Message ---------------------------------
register("command", () => {
    ChatLib.chat(
      `\n&3&lPerry&6Client &7Debug:
   &eCT Version: &7v${ChatTriggers.MODVERSION}
   &3Perry§6Client &7v${JSON.parse(FileLib.read("Perry", "metadata.json")).version}`
    );
  }).setCommandName("pcTest");

// --------------------------------- Imports ---------------------------------

import settings from "./config";
import location from "./utils/Location";

import "./features/General";
import "./features/Trophy";
import "./features/Commands";
import "./features/Dungeons";

import { version, consts } from "./utils/constants";
import { setRegisters } from "./utils/functions"
import { openGUI } from "./utils/overlay"
import { data } from "./utils/data";


// --------------------------------- Welcome Message ---------------------------------

if (data.first_time) {
  data.first_time = false; 
  data.save();

  ChatLib.chat("");
  ChatLib.chat(`&r&7&m--------------&r${ consts.PREFIX }&r&7&m--------------`)
  ChatLib.chat(`&aUse '/pc' For settings!`)
  ChatLib.chat(`&aUse '/pc commands' For commands!`);
  new TextComponent(`&aClick &3here&a to copy the GitHub link!`)
    .setClickAction("run_command")
    .setClickValue(`/ct copy https://github.com/Perry5596/Perry`)
    .chat()
  ChatLib.chat("");
};

// --------------------------------- Commands ---------------------------------

register("command", (arg) => {  
  if (!arg) {
    settings.openGUI();
    return;
  }
  arg = arg?.toLowerCase()
  
  switch (arg) {
    case "gui":
      openGUI();
      break;
    case "ver":
    case "version":
      ChatLib.chat(`${ consts.PREFIX } &bYou are currently on version &e${ version }`);
      break;
    case "commands":
      ChatLib.chat(`${ consts.PREFIX } &rWrite out commands here...`);
      break;
    case "reload":
      location.findWorld();
      ChatLib.chat(`${ consts.PREFIX } &aReloaded all registers!`);
      break;
    case "help":
      ChatLib.chat(`${ consts.PREFIX } &rWrite out help here...`);
    default:
      ChatLib.chat(`${consts.PREFIX} &r\n/pc => opens settings\n/pc gui => opens gui mover\n/pc version => gets the current Perry Client version\n/pc => see all commands\n/pc reload => reloads all registers in case they aren't working`)
  }
}).setCommandName(`pc`, true).setAliases("perry","perryclient","perryp_", "per").setTabCompletions("gui", "version", "commands", "reload", "help");

register("guiClosed", (event) => {
  if (event?.toString()?.includes("vigilance")) {
    setRegisters()
  }
});

// --------------------------------- Extra Triggers ---------------------------------
ChatLib.chat("index.js is done loading!");